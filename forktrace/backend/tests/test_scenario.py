import pytest
from scripts.generate_scenario import build
from tests.oracle import Oracle

def test_scenario_deterministic():
    """Verify scenario generation is strictly deterministic across repeated runs."""
    run1 = build(seed=2026)
    run2 = build(seed=2026)
    assert run1 == run2, "Scenario build(2026) must be strictly deterministic"

def test_scenario_matches_committed_json(scenario_data):
    """Verify that committed data/scenario.json exactly matches build(2026)."""
    fresh = build(seed=2026)
    assert fresh == scenario_data, "scenario.json must exactly equal build(seed=2026)"

def test_true_batches_inside_shipment_window(scenario_data):
    """Sanity assert: every true batch in every meal was delivered to that restaurant within shelf-life window."""
    batches = {b["id"]: b for b in scenario_data["batches"]}
    ships = scenario_data["ships"]
    ship_map = {}
    for s in ships:
        ship_map.setdefault((s["batch"], s["dest"]), []).append(s)

    for m in scenario_data["meals"]:
        for ing, b_id in m["true"].items():
            b = batches[b_id]
            matching_ships = ship_map.get((b_id, m["rest"]), [])
            assert any(
                s["day"] <= m["day"] <= s["day"] + b["shelf"] for s in matching_ships
            ), f"Meal {m['id']} on day {m['day']} at {m['rest']} has true batch {b_id} outside shipment window"

def test_oracle_matches_scenario_computation(scenario_data, oracle: Oracle):
    """Verify Oracle dynamically recomputes all metrics from scenario.json with zero hard-coded numbers."""
    # 1. Total counts match raw scenario records
    assert oracle.total_cases() == len(scenario_data["cases"])
    assert len(oracle.meals) == len(scenario_data["meals"])
    assert len(oracle.batches) == len(scenario_data["batches"])

    # 2. Case to meal mapping from raw data
    meal_to_cases = {}
    for c in scenario_data["cases"]:
        meal_to_cases.setdefault(c["meal"], []).append(c["id"])

    # 3. Shipment map from raw data
    ship_map = {}
    for s in scenario_data["ships"]:
        ship_map.setdefault((s["batch"], s["dest"]), []).append(s)

    # 4. Check each batch's recorded, inferred, and conflict metrics against raw scenario data
    for b in scenario_data["batches"]:
        b_id = b["id"]
        shelf = b["shelf"]
        ing = b["ing"]

        # Directly compute recorded meals and cases from raw scenario data
        expected_rec_meals = {
            m["id"] for m in scenario_data["meals"] if b_id in m.get("rec", {}).values()
        }
        expected_rec_cases = {
            c_id for m_id in expected_rec_meals for c_id in meal_to_cases.get(m_id, [])
        }

        # Compare oracle cases_recorded
        assert set(oracle.cases_recorded(b_id)) == expected_rec_cases

        # Compare oracle rank_recorded entry
        rec_stat = next(r for r in oracle.rank_recorded() if r["batch_id"] == b_id)
        assert rec_stat["exposed_meals"] == len(expected_rec_meals)
        assert rec_stat["cases"] == len(expected_rec_cases)

        # Directly compute inferred meals and cases from raw scenario data
        expected_inf_meals = set()
        expected_inf_cases = set()
        for m in scenario_data["meals"]:
            if ing in m["ings"]:
                # If meal recorded any batch for this ingredient, do not infer
                if ing in m.get("rec", {}):
                    continue
                # Check shipment delivery within shelf window
                dest = m["rest"]
                matching_ships = ship_map.get((b_id, dest), [])
                if any(s["day"] <= m["day"] <= s["day"] + shelf for s in matching_ships):
                    expected_inf_meals.add(m["id"])
                    for c_id in meal_to_cases.get(m["id"], []):
                        expected_inf_cases.add(c_id)

        # Compare oracle cases_inferred
        assert set(oracle.cases_inferred(b_id)) == expected_inf_cases

        # Compare oracle rank_inferred entry
        inf_stat = next(r for r in oracle.rank_inferred() if r["batch_id"] == b_id)
        assert inf_stat["exposed_meals"] == len(expected_inf_meals)
        assert inf_stat["cases"] == len(expected_inf_cases)

    # 5. Check conflicts dynamically computed from raw data
    expected_conflicts = []
    for m in scenario_data["meals"]:
        for ing, b_id in m.get("rec", {}).items():
            b = next(x for x in scenario_data["batches"] if x["id"] == b_id)
            matching_ships = ship_map.get((b_id, m["rest"]), [])
            valid = any(s["day"] <= m["day"] <= s["day"] + b["shelf"] for s in matching_ships)
            if not valid:
                expected_conflicts.append((m["id"], b_id))

    oracle_conflicts = [(c["meal_id"], c["batch_id"]) for c in oracle.conflicts()]
    assert sorted(oracle_conflicts) == sorted(expected_conflicts)

def test_planted_batch_relative_properties(oracle: Oracle):
    """Verify relative property: the batch in scenario JSON field 'planted' ranks first by attack rate.
    Zero hard-coded expected counts or thresholds.
    """
    planted_id = oracle.data["planted"]
    assert planted_id in oracle.batches

    # Calculate attack rates (cases / exposed_meals) for all batches with recorded exposures
    rec_ranks = oracle.rank_recorded()
    attack_rates = {
        r["batch_id"]: (r["cases"] / r["exposed_meals"])
        for r in rec_ranks
        if r["exposed_meals"] > 0
    }

    # Order batches by attack rate descending
    ranked_by_rate = sorted(attack_rates.items(), key=lambda x: (-x[1], x[0]))
    top_batch_id, top_rate = ranked_by_rate[0]

    # Relative property 1: planted batch must rank #1
    assert top_batch_id == planted_id, (
        f"Planted batch '{planted_id}' must rank first by attack rate. Rankings: {ranked_by_rate}"
    )

    # Relative property 2: strictly exceeds runner-up attack rate
    if len(ranked_by_rate) > 1:
        runner_up_rate = ranked_by_rate[1][1]
        assert top_rate > runner_up_rate, (
            f"Planted batch attack rate ({top_rate:.3f}) must strictly exceed runner-up ({runner_up_rate:.3f})"
        )

    # Relative property 3: planted batch has zero conflicts in baseline scenario
    planted_conflicts = [c for c in oracle.conflicts() if c["batch_id"] == planted_id]
    assert len(planted_conflicts) == 0, f"Planted batch {planted_id} should have 0 conflicts"
