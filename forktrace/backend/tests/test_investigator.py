"""
Integration tests for investigator engine and simulated shipment removal.

Uses real FalkorDB Cloud queries without hard-coded counts, verifying
the missing-shipment resilience rule and competing hypothesis partitioning.
"""

import copy
import pytest
from app.investigator import (
    investigate,
    remove_shipment,
    reset,
    compute_candidates,
    compute_competing_hypotheses,
    compute_review_scope,
    build_recall_proposal,
)
from app import queries
from app.config import settings
from tests.oracle import Oracle


def test_investigate_baseline(graph, oracle: Oracle, scenario_data: dict):
    """Verify baseline investigation output against Oracle reference properties."""
    result = investigate(graph)

    # 1. Total cases match
    assert result["total_cases"] == len(scenario_data["cases"])

    # 2. Planted batch ranks first as the leading candidate
    planted = scenario_data["planted"]
    assert result["leading_candidate"] == planted

    # 3. Confidence rule verification from actual returned numbers
    lead_ratio = result["lead_ratio"]
    top_candidate = result["rankings"][0]
    attack_rate = top_candidate["attack_rate"]
    conflicts_count = top_candidate["conflicts"]

    if lead_ratio < settings.high_lead_ratio:
        assert result["confidence"] != "high"

    if lead_ratio < settings.low_lead_ratio:
        assert result["confidence"] == "low"
    elif lead_ratio >= settings.high_lead_ratio and attack_rate >= settings.high_attack and conflicts_count == 0:
        assert result["confidence"] == "high"
    else:
        assert result["confidence"] == "medium"

    # 4. Competing hypotheses partitions all cases
    hypotheses = result["competing_hypotheses"]
    counts = hypotheses["counts"]
    partition_sum = (
        counts["only_top"]
        + counts["only_runner_up"]
        + counts["both"]
        + counts["unexplained"]
    )
    assert partition_sum == result["total_cases"]

    # 5. Review scope contains shipment destinations
    destinations = {d["place_id"] for d in result["affected_destinations"]}
    scope_places = {s["place_id"] for s in result["review_scope"]}
    assert destinations.issubset(scope_places)

    # 6. Structured recall proposal
    recall = result["recall_proposal"]
    assert recall["batch_id"] == planted
    assert len(recall["affected_products"]) > 0
    assert "synthetic_disclaimer" in recall

    # 7. Cypher text transparency
    assert "rank_recorded" in result["cypher_queries"]
    assert "rank_inferred" in result["cypher_queries"]


def test_missing_shipment_rule_and_reset(graph, oracle: Oracle, scenario_data: dict):
    """Verify missing-shipment rule when SP-2041 -> R3 shipment is deleted:
    - recorded counts stay unchanged
    - inferred counts match oracle recomputed on modified data
    - conflict flagged for SP-2041 at R3
    - R3 remains in review scope with missing-shipment reason
    - reset restores the seeded baseline
    """
    planted = scenario_data["planted"]  # SP-2041
    target_place = "R3"

    try:
        # Step 1: Remove shipment in FalkorDB
        deleted_count = remove_shipment(planted, target_place, graph=graph)
        assert deleted_count >= 1

        # Step 2: Recorded evidence stays unchanged
        db_rec_ranks = queries.rank_recorded(graph)
        oracle_rec_ranks = oracle.rank_recorded()
        assert db_rec_ranks == oracle_rec_ranks

        # Step 3: Inferred evidence matches oracle recomputed on modified scenario data
        mod_scenario = copy.deepcopy(scenario_data)
        mod_scenario["ships"] = [
            s for s in mod_scenario["ships"]
            if not (s["batch"] == planted and s["dest"] == target_place)
        ]
        mod_oracle = Oracle(mod_scenario)
        db_inf_ranks = queries.rank_inferred(graph)
        assert db_inf_ranks == mod_oracle.rank_inferred()

        # Step 4: Conflict is flagged for SP-2041 at R3
        conflicts = queries.conflicts(graph)
        r3_conflicts = [
            c for c in conflicts
            if c["batch_id"] == planted and c["restaurant_id"] == target_place
        ]
        assert len(r3_conflicts) > 0

        # Step 5: R3 remains in review scope with missing-shipment reason
        scope = compute_review_scope(graph, planted)
        r3_scope_entry = next((s for s in scope if s["place_id"] == target_place), None)
        assert r3_scope_entry is not None
        assert r3_scope_entry["reason"] == "kitchen records show this batch, but the shipment record is missing"
        assert r3_scope_entry["has_conflict"] is True
        assert r3_scope_entry["is_shipment_destination"] is False

    finally:
        # Step 6: Reset restores graph to baseline
        reset_stats = reset(graph=graph)
        assert reset_stats["batches"] == len(scenario_data["batches"])
        # Verify conflicts are 0 after reset
        assert len(queries.conflicts(graph)) == 0
        # Verify inferred matches original oracle again
        assert queries.rank_inferred(graph) == oracle.rank_inferred()

