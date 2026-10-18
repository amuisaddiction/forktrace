from pathlib import Path
from typing import Dict, List, Any, Optional

QUERIES_DIR = Path(__file__).resolve().parent / "queries"

def load_query(filename: str) -> str:
    path = QUERIES_DIR / filename
    with open(path, "r", encoding="utf-8") as f:
        return f.read().strip()

QUERIES: Dict[str, str] = {
    "rank_recorded": load_query("rank_recorded.cypher"),
    "rank_inferred": load_query("rank_inferred.cypher"),
    "cases_recorded": load_query("cases_recorded.cypher"),
    "cases_inferred": load_query("cases_inferred.cypher"),
    "affected": load_query("affected.cypher"),
    "products": load_query("products.cypher"),
    "evidence_path": load_query("evidence_path.cypher"),
    "conflicts": load_query("conflicts.cypher"),
    "batch_info": load_query("batch_info.cypher"),
    "total_cases": load_query("total_cases.cypher"),
}

def rank_recorded(graph) -> List[Dict[str, Any]]:
    res = graph.ro_query(QUERIES["rank_recorded"])
    return [
        {"batch_id": row[0], "exposed_meals": int(row[1]), "cases": int(row[2])}
        for row in res.result_set
    ]

def rank_inferred(graph) -> List[Dict[str, Any]]:
    res = graph.ro_query(QUERIES["rank_inferred"])
    return [
        {"batch_id": row[0], "exposed_meals": int(row[1]), "cases": int(row[2])}
        for row in res.result_set
    ]

def cases_recorded(graph, batch_id: str) -> List[str]:
    res = graph.ro_query(QUERIES["cases_recorded"], {"batch_id": batch_id})
    return sorted(list({str(row[1]) for row in res.result_set}))

def cases_inferred(graph, batch_id: str) -> List[str]:
    res = graph.ro_query(QUERIES["cases_inferred"], {"batch_id": batch_id})
    return sorted(list({str(row[1]) for row in res.result_set}))

def affected(graph, batch_id: str) -> List[Dict[str, Any]]:
    res = graph.ro_query(QUERIES["affected"], {"batch_id": batch_id})
    return [
        {
            "place_id": row[0],
            "place_labels": row[1] if isinstance(row[1], list) else [row[1]],
            "shipment_id": row[2],
            "shipment_day": int(row[3]),
        }
        for row in res.result_set
    ]

def products(graph, batch_id: str) -> List[Dict[str, Any]]:
    res = graph.ro_query(QUERIES["products"], {"batch_id": batch_id})
    return [
        {"id": row[0], "name": row[1], "batch": row[2]}
        for row in res.result_set
    ]

def evidence_path(graph, batch_id: str, limit: int = 20) -> List[Dict[str, Any]]:
    res = graph.ro_query(QUERIES["evidence_path"], {"batch_id": batch_id, "limit": limit})
    return [
        {
            "case_id": row[0],
            "meal_id": row[1],
            "evidence_type": row[2],
            "batch_id": row[3],
            "restaurant_id": row[4],
            "shipment_id": row[5],
        }
        for row in res.result_set
    ]

def conflicts(graph) -> List[Dict[str, Any]]:
    res = graph.ro_query(QUERIES["conflicts"])
    return [
        {
            "meal_id": row[0],
            "meal_day": int(row[1]),
            "restaurant_id": row[2],
            "batch_id": row[3],
        }
        for row in res.result_set
    ]

def batch_info(graph, batch_id: str) -> Optional[Dict[str, Any]]:
    res = graph.ro_query(QUERIES["batch_info"], {"batch_id": batch_id})
    if not res.result_set:
        return None
    row = res.result_set[0]
    return {
        "batch_id": row[0],
        "shelf_life": int(row[1]),
        "ingredient": row[2],
        "supplier": row[3],
    }

def total_cases(graph) -> int:
    res = graph.ro_query(QUERIES["total_cases"])
    if not res.result_set:
        return 0
    return int(res.result_set[0][0])

