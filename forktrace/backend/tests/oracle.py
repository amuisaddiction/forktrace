import json
from pathlib import Path
from typing import Dict, List, Any, Optional

class Oracle:
    """Pure Python reference implementation of outbreak evidence rules.
    Reads ONLY scenario.json (no DB).
    """

    def __init__(self, data: Optional[Dict[str, Any]] = None, filepath: Optional[Path] = None):
        if data is not None:
            self.data = data
        elif filepath:
            with open(filepath, "r", encoding="utf-8") as f:
                self.data = json.load(f)
        else:
            default_path = Path(__file__).resolve().parent.parent / "data" / "scenario.json"
            with open(default_path, "r", encoding="utf-8") as f:
                self.data = json.load(f)

        self.batches = {b["id"]: b for b in self.data["batches"]}
        self.ships = self.data["ships"]
        self.meals = {m["id"]: m for m in self.data["meals"]}
        self.cases = self.data["cases"]
        self.products_list = self.data.get("products", [])

        # Precompute shipment map: (batch_id, dest_id) -> list of shipments
        self.ship_map = {}
        for s in self.ships:
            self.ship_map.setdefault((s["batch"], s["dest"]), []).append(s)

        # Precompute meal cases: meal_id -> list of case_ids
        self.meal_cases = {}
        for c in self.cases:
            self.meal_cases.setdefault(c["meal"], []).append(c["id"])

    def total_cases(self) -> int:
        return len(self.cases)

    def rank_recorded(self) -> List[Dict[str, Any]]:
        results = []
        for b_id, b in self.batches.items():
            rec_meals = set()
            rec_cases = set()
            for m in self.data["meals"]:
                if b_id in m.get("rec", {}).values():
                    rec_meals.add(m["id"])
                    for c_id in self.meal_cases.get(m["id"], []):
                        rec_cases.add(c_id)
            results.append({
                "batch_id": b_id,
                "exposed_meals": len(rec_meals),
                "cases": len(rec_cases),
            })
        results.sort(key=lambda x: (-x["cases"], -x["exposed_meals"], x["batch_id"]))
        return results

    def rank_inferred(self) -> List[Dict[str, Any]]:
        results = []
        for b_id, b in self.batches.items():
            ing = b["ing"]
            shelf = b["shelf"]
            inf_meals = set()
            inf_cases = set()
            for m in self.data["meals"]:
                if ing in m["ings"]:
                    # Rule: If a meal has a recorded batch for that ingredient,
                    # never infer another batch of that ingredient for it.
                    if ing in m.get("rec", {}):
                        continue
                    # Check shipment window: ship_day <= meal_day <= ship_day + shelf
                    dest = m["rest"]
                    matching_ships = self.ship_map.get((b_id, dest), [])
                    if any(s["day"] <= m["day"] <= s["day"] + shelf for s in matching_ships):
                        inf_meals.add(m["id"])
                        for c_id in self.meal_cases.get(m["id"], []):
                            inf_cases.add(c_id)
            results.append({
                "batch_id": b_id,
                "exposed_meals": len(inf_meals),
                "cases": len(inf_cases),
            })
        results.sort(key=lambda x: (-x["cases"], -x["exposed_meals"], x["batch_id"]))
        return results

    def cases_recorded(self, batch_id: str) -> List[str]:
        cases = set()
        for m in self.data["meals"]:
            if batch_id in m.get("rec", {}).values():
                for c_id in self.meal_cases.get(m["id"], []):
                    cases.add(c_id)
        return sorted(list(cases))

    def cases_inferred(self, batch_id: str) -> List[str]:
        b = self.batches[batch_id]
        ing = b["ing"]
        shelf = b["shelf"]
        cases = set()
        for m in self.data["meals"]:
            if ing in m["ings"]:
                if ing in m.get("rec", {}):
                    continue
                dest = m["rest"]
                matching_ships = self.ship_map.get((batch_id, dest), [])
                if any(s["day"] <= m["day"] <= s["day"] + shelf for s in matching_ships):
                    for c_id in self.meal_cases.get(m["id"], []):
                        cases.add(c_id)
        return sorted(list(cases))

    def conflicts(self) -> List[Dict[str, Any]]:
        conflicts_list = []
        for m in self.data["meals"]:
            for ing, b_id in m.get("rec", {}).items():
                b = self.batches.get(b_id)
                shelf = b["shelf"] if b else 0
                matching_ships = self.ship_map.get((b_id, m["rest"]), [])
                has_valid_shipment = any(s["day"] <= m["day"] <= s["day"] + shelf for s in matching_ships)
                if not has_valid_shipment:
                    conflicts_list.append({
                        "meal_id": m["id"],
                        "meal_day": m["day"],
                        "restaurant_id": m["rest"],
                        "batch_id": b_id
                    })
        conflicts_list.sort(key=lambda x: (x["meal_id"], x["batch_id"]))
        return conflicts_list

    def affected(self, batch_id: str) -> List[Dict[str, Any]]:
        places = []
        for s in self.ships:
            if s["batch"] == batch_id:
                dest = s["dest"]
                place_type = "restaurant" if dest.startswith("R") else "store"
                places.append({
                    "place_id": dest,
                    "place_labels": ["Place", place_type.capitalize()],
                    "shipment_id": s["id"],
                    "shipment_day": s["day"],
                })
        places.sort(key=lambda x: (x["shipment_day"], x["place_id"]))
        return places

    def products(self, batch_id: str) -> List[Dict[str, Any]]:
        return [p for p in self.products_list if p["batch"] == batch_id]

    def batch_info(self, batch_id: str) -> Optional[Dict[str, Any]]:
        b = self.batches.get(batch_id)
        if not b:
            return None
        return {
            "batch_id": b["id"],
            "shelf_life": b["shelf"],
            "ingredient": b["ing"],
            "supplier": b["supplier"],
        }

