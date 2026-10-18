import json
from pathlib import Path
from typing import Dict, Any, Optional

def wipe_graph(graph) -> None:
    """Wipe all nodes and edges from the graph, including RecallAction audit nodes."""
    try:
        graph.query("MATCH (ra:RecallAction) DETACH DELETE ra")
    except Exception:
        pass
    try:
        graph.delete()
    except Exception:
        pass
    try:
        graph.query("MATCH (n) DETACH DELETE n")
    except Exception:
        pass

def load_scenario(graph, data: Dict[str, Any]) -> Dict[str, int]:
    """Wipe and reload the graph from scenario data using parameterized Cypher.
    All relationships are explicitly named and queries use parameters (no string concatenation).
    """
    wipe_graph(graph)

    # 1. Suppliers
    suppliers = [{"name": s} for s in sorted(list({b["supplier"] for b in data["batches"]}))]
    q_suppliers = "UNWIND $suppliers AS s MERGE (sup:Supplier {name: s.name})"
    graph.query(q_suppliers, {"suppliers": suppliers})

    # 2. Ingredients
    ings = [{"name": ing} for ing in data["ings"]]
    q_ings = "UNWIND $ings AS ing MERGE (i:Ingredient {name: ing.name})"
    graph.query(q_ings, {"ings": ings})

    # 3. Batches with (Supplier)-[:SUPPLIES]->(Batch)-[:OF]->(Ingredient)
    batches = [
        {"id": b["id"], "shelf": b["shelf"], "supplier": b["supplier"], "ing": b["ing"]}
        for b in data["batches"]
    ]
    q_batches = """
    UNWIND $batches AS b
    MERGE (bat:Batch {id: b.id, shelf: b.shelf})
    WITH b, bat
    MATCH (sup:Supplier {name: b.supplier}), (i:Ingredient {name: b.ing})
    MERGE (sup)-[rel_sup:SUPPLIES]->(bat)
    MERGE (bat)-[rel_of:OF]->(i)
    """
    graph.query(q_batches, {"batches": batches})

    # 4. Products with (Product)-[:MADE_FROM]->(Batch)
    products = data.get("products", [])
    if products:
        q_products = """
        UNWIND $products AS p
        MERGE (prd:Product {id: p.id, name: p.name})
        WITH p, prd
        MATCH (b:Batch {id: p.batch})
        MERGE (prd)-[rel_mf:MADE_FROM]->(b)
        """
        graph.query(q_products, {"products": products})

    # 5. Places: Restaurants and Stores (multi-label nodes)
    rests = data["rests"]
    q_rests = "UNWIND $rests AS r MERGE (p:Place:Restaurant {id: r, type: 'restaurant'})"
    graph.query(q_rests, {"rests": rests})

    stores = data["stores"]
    q_stores = "UNWIND $stores AS st MERGE (p:Place:Store {id: st, type: 'store'})"
    graph.query(q_stores, {"stores": stores})

    # 6. Shipments: (Shipment)-[:CARRIES]->(Batch), (Shipment)-[:DELIVERED_TO]->(Place)
    ships = [
        {"id": s["id"], "day": s["day"], "batch": s["batch"], "dest": s["dest"]}
        for s in data["ships"]
    ]
    q_ships = """
    UNWIND $ships AS s
    MERGE (ship:Shipment {id: s.id, day: s.day})
    WITH s, ship
    MATCH (b:Batch {id: s.batch}), (p:Place {id: s.dest})
    MERGE (ship)-[rel_c:CARRIES]->(b)
    MERGE (ship)-[rel_del:DELIVERED_TO]->(p)
    """
    graph.query(q_ships, {"ships": ships})

    # 7. Meals: (Meal)-[:SERVED_AT]->(Restaurant)
    meals = [
        {"id": m["id"], "day": m["day"], "dish": m["dish"], "rest": m["rest"]}
        for m in data["meals"]
    ]
    q_meals = """
    UNWIND $meals AS m
    MERGE (meal:Meal {id: m.id, day: m.day, dish: m.dish})
    WITH m, meal
    MATCH (r:Restaurant {id: m.rest})
    MERGE (meal)-[rel_sa:SERVED_AT]->(r)
    """
    graph.query(q_meals, {"meals": meals})

    # 8. Meal Ingredients: (Meal)-[:CONTAINS]->(Ingredient)
    meal_ings = [
        {"meal_id": m["id"], "ingredient": ing}
        for m in data["meals"]
        for ing in m["ings"]
    ]
    q_meal_ings = """
    UNWIND $meal_ings AS mi
    MATCH (m:Meal {id: mi.meal_id}), (i:Ingredient {name: mi.ingredient})
    MERGE (m)-[rel_ct:CONTAINS]->(i)
    """
    graph.query(q_meal_ings, {"meal_ings": meal_ings})

    # 9. Recorded Batches: (Meal)-[:SERVED_BATCH]->(Batch)
    meal_batches = [
        {"meal_id": m["id"], "batch_id": b}
        for m in data["meals"]
        for b in m.get("rec", {}).values()
    ]
    if meal_batches:
        q_meal_batches = """
        UNWIND $meal_batches AS mb
        MATCH (m:Meal {id: mb.meal_id}), (b:Batch {id: mb.batch_id})
        MERGE (m)-[rel_sb:SERVED_BATCH]->(b)
        """
        graph.query(q_meal_batches, {"meal_batches": meal_batches})

    # 10. Cases: (Case)-[:ATE]->(Meal)
    cases = [{"id": c["id"], "meal": c["meal"]} for c in data["cases"]]
    q_cases = """
    UNWIND $cases AS c
    MERGE (cs:Case {id: c.id})
    WITH c, cs
    MATCH (m:Meal {id: c.meal})
    MERGE (cs)-[rel_ate:ATE]->(m)
    """
    graph.query(q_cases, {"cases": cases})

    # Return summary stats
    return {
        "suppliers": len(suppliers),
        "ingredients": len(ings),
        "batches": len(batches),
        "products": len(products),
        "places": len(rests) + len(stores),
        "shipments": len(ships),
        "meals": len(meals),
        "cases": len(cases),
    }

def load_from_file(graph, filepath: Path) -> Dict[str, int]:
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
    return load_scenario(graph, data)

