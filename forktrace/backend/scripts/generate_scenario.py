import random
import json
from pathlib import Path

def build(seed=2026):
    r = random.Random(seed)
    ings = ["spinach", "lettuce", "tomato", "chicken"]
    batches = [
        dict(id="SP-2041", ing="spinach", supplier="Greenvale Farms", shelf=6),
        dict(id="SP-2042", ing="spinach", supplier="Greenvale Farms", shelf=6),
        dict(id="LT-118", ing="lettuce", supplier="Sunfield Produce", shelf=5),
        dict(id="TM-77", ing="tomato", supplier="Redbarn Growers", shelf=6),
        dict(id="CH-330", ing="chicken", supplier="Birchwood Poultry", shelf=4),
    ]
    rests = ["R1", "R2", "R3", "R4", "R5", "R6"]
    stores = ["ST1", "ST2"]
    ships = []

    def ship(b, dest, day):
        ships.append(dict(id=f"S{len(ships)+1:02d}", batch=b, dest=dest, day=day))

    for d in ["R1", "R2", "R3", "R4", "ST1", "ST2"]:
        ship("SP-2041", d, 2)
    for d in ["R4", "R5", "R6"]:
        ship("SP-2042", d, 2)
    for d in ["R1", "R2", "R6", "R5"]:
        ship("LT-118", d, 3)
    for d in ["R3", "R4", "R6", "R2", "R1"]:
        ship("TM-77", d, 3)
    for d in ["R6", "R5"]:
        ship("CH-330", d, 4)

    dishes = {
        "Spinach Salad": ["spinach", "tomato"],
        "Caesar": ["lettuce", "chicken"],
        "Garden Bowl": ["lettuce", "tomato"],
        "Chicken Wrap": ["chicken", "lettuce", "tomato"],
    }
    by_ing = {}
    for s in ships:
        b = [x for x in batches if x["id"] == s["batch"]][0]
        by_ing.setdefault((s["dest"], b["ing"]), []).append(b["id"])

    meals = []
    cases = []
    for rest in rests:
        for day in range(4, 9):
            for k in range(4):
                feas = [d for d, il in dishes.items() if all((rest, i) in by_ing for i in il)]
                if not feas:
                    continue
                dish = r.choice(feas)
                m = dict(
                    id=f"M{len(meals)+1:03d}",
                    rest=rest,
                    day=day,
                    dish=dish,
                    ings=dishes[dish],
                    true={},
                    rec={},
                )
                ok = True
                for ing in m["ings"]:
                    opts = by_ing.get((rest, ing))
                    if not opts:
                        ok = False
                        break
                    m["true"][ing] = r.choice(opts)
                if not ok:
                    continue
                for ing, b in m["true"].items():
                    if r.random() < 0.75:
                        m["rec"][ing] = b
                meals.append(m)

    for m in meals:
        sick = ("SP-2041" in m["true"].values() and r.random() < 0.8) or (
            "CH-330" in m["true"].values() and m["rest"] == "R6" and r.random() < 0.6
        )
        if sick:
            cases.append(dict(id=f"C{len(cases)+1:02d}", meal=m["id"]))

    # Sanity assert that every true batch is inside its shipment window
    batch_map = {b["id"]: b for b in batches}
    ship_map = {}
    for s in ships:
        ship_map.setdefault((s["batch"], s["dest"]), []).append(s)

    for m in meals:
        for ing, b_id in m["true"].items():
            b = batch_map[b_id]
            matching_ships = ship_map.get((b_id, m["rest"]), [])
            assert any(
                s["day"] <= m["day"] <= s["day"] + b["shelf"] for s in matching_ships
            ), f"Meal {m['id']} on day {m['day']} at {m['rest']} has true batch {b_id} outside shipment window"

    # Products list: 1-2 products per batch
    products = [
        dict(id="PRD-01", name="Greenvale Fresh Baby Spinach 250g", batch="SP-2041"),
        dict(id="PRD-02", name="Greenvale Organic Spinach Clamshell 500g", batch="SP-2041"),
        dict(id="PRD-03", name="Greenvale Farmhouse Crisp Spinach 300g", batch="SP-2042"),
        dict(id="PRD-04", name="Sunfield Romaine Hearts 3-Pack", batch="LT-118"),
        dict(id="PRD-05", name="Sunfield Artisan Crisp Lettuce Mix", batch="LT-118"),
        dict(id="PRD-06", name="Redbarn Vine-Ripened Cluster Tomatoes", batch="TM-77"),
        dict(id="PRD-07", name="Redbarn Organic Cherry Tomatoes 250g", batch="TM-77"),
        dict(id="PRD-08", name="Birchwood Diced Chicken Breast Cutlets", batch="CH-330"),
        dict(id="PRD-09", name="Birchwood Herb-Seasoned Chicken Strips", batch="CH-330"),
    ]

    return dict(
        batches=batches,
        ings=ings,
        rests=rests,
        stores=stores,
        ships=ships,
        meals=meals,
        cases=cases,
        planted="SP-2041",
        products=products,
    )

def main():
    scenario = build(seed=2026)
    out_dir = Path(__file__).resolve().parent.parent / "data"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / "scenario.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(scenario, f, indent=2)
    print(f"Generated scenario with {len(scenario['meals'])} meals and {len(scenario['cases'])} cases.")
    print(f"Saved to: {out_file}")

if __name__ == "__main__":
    main()

