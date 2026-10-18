"""
Unit tests for pure scoring and confidence estimation.

These tests use synthetic/arbitrary test data and do NOT hard-code
any scenario.json counts or expected results.
"""

import math
import pytest
from app.scoring import (
    compute_weighted_cases,
    compute_weighted_exposed,
    compute_attack_rate,
    compute_coverage,
    compute_score,
    compute_lead_ratio,
    classify_confidence,
    score_batch,
    rank_candidates,
)


def test_weighted_cases_formula():
    """Verify weighted_cases = recorded_cases + 0.5 * inferred_cases."""
    assert compute_weighted_cases(10, 4, inferred_weight=0.5) == 12.0
    assert compute_weighted_cases(0, 6, inferred_weight=0.5) == 3.0
    assert compute_weighted_cases(7, 0, inferred_weight=0.5) == 7.0
    # Custom weight
    assert compute_weighted_cases(10, 4, inferred_weight=0.25) == 11.0


def test_weighted_exposed_formula():
    """Verify weighted_exposed = recorded_meals + 0.5 * inferred_meals."""
    assert compute_weighted_exposed(20, 10, inferred_weight=0.5) == 25.0
    assert compute_weighted_exposed(0, 8, inferred_weight=0.5) == 4.0
    assert compute_weighted_exposed(15, 0, inferred_weight=0.5) == 15.0


def test_attack_rate_formula():
    """Verify attack_rate = weighted_cases / weighted_exposed with zero-safe handling."""
    assert compute_attack_rate(12.0, 24.0) == pytest.approx(0.5)
    assert compute_attack_rate(0.0, 20.0) == 0.0
    # Explicit zero denominator
    assert compute_attack_rate(10.0, 0.0) == 0.0
    assert compute_attack_rate(0.0, 0.0) == 0.0


def test_coverage_formula():
    """Verify coverage = weighted_cases / total_cases with zero-safe handling."""
    assert compute_coverage(15.0, 30) == pytest.approx(0.5)
    assert compute_coverage(0.0, 50) == 0.0
    # Explicit zero denominator
    assert compute_coverage(10.0, 0) == 0.0
    assert compute_coverage(0.0, 0) == 0.0


def test_score_formula():
    """Verify score = attack_rate * coverage."""
    ar = 0.8
    cov = 0.5
    assert compute_score(ar, cov) == pytest.approx(0.4)
    assert compute_score(0.0, 0.5) == 0.0
    assert compute_score(0.8, 0.0) == 0.0


def test_lead_ratio_formula():
    """Verify lead_ratio = top_score / second_score with zero handling."""
    assert compute_lead_ratio(0.6, 0.3) == pytest.approx(2.0)
    assert compute_lead_ratio(0.5, 0.25) == pytest.approx(2.0)
    # Zero second score
    assert compute_lead_ratio(0.4, 0.0) == float("inf")
    # Both zero
    assert compute_lead_ratio(0.0, 0.0) == 1.0


def test_confidence_insufficient_cases():
    """Confidence must be 'insufficient' if linked cases < min_cases (default 5)."""
    # 4 cases < 5: even with perfect lead ratio and attack rate, must be insufficient
    assert classify_confidence(
        top_linked_cases=4,
        lead_ratio=3.0,
        attack_rate=0.9,
        conflicts=0,
        min_cases=5,
    ) == "insufficient"

    assert classify_confidence(
        top_linked_cases=0,
        lead_ratio=5.0,
        attack_rate=1.0,
        conflicts=0,
        min_cases=5,
    ) == "insufficient"


def test_confidence_high_criteria():
    """Confidence is 'high' ONLY if lead_ratio >= 2.0, attack_rate >= 0.7, conflicts == 0."""
    # Clearly above all thresholds
    assert classify_confidence(
        top_linked_cases=20,
        lead_ratio=2.5,
        attack_rate=0.85,
        conflicts=0,
        min_cases=5,
        high_lead_ratio=2.0,
        high_attack=0.7,
    ) == "high"

    # Exactly at boundary
    assert classify_confidence(
        top_linked_cases=5,
        lead_ratio=2.0,
        attack_rate=0.7,
        conflicts=0,
        min_cases=5,
        high_lead_ratio=2.0,
        high_attack=0.7,
    ) == "high"


def test_confidence_not_high_when_conflicts_exist():
    """High criteria failing because conflicts > 0 falls to medium."""
    assert classify_confidence(
        top_linked_cases=20,
        lead_ratio=3.0,
        attack_rate=0.85,
        conflicts=1,
        min_cases=5,
        high_lead_ratio=2.0,
        high_attack=0.7,
        low_lead_ratio=1.2,
    ) == "medium"


def test_confidence_not_high_when_attack_rate_below_threshold():
    """High criteria failing because attack_rate < 0.7 falls to medium."""
    assert classify_confidence(
        top_linked_cases=20,
        lead_ratio=2.5,
        attack_rate=0.69,
        conflicts=0,
        min_cases=5,
        high_lead_ratio=2.0,
        high_attack=0.7,
        low_lead_ratio=1.2,
    ) == "medium"


def test_confidence_not_high_when_lead_ratio_below_high_threshold():
    """High criteria failing because lead_ratio < 2.0 falls to medium (or low if < 1.2)."""
    assert classify_confidence(
        top_linked_cases=20,
        lead_ratio=1.9,
        attack_rate=0.85,
        conflicts=0,
        min_cases=5,
        high_lead_ratio=2.0,
        high_attack=0.7,
        low_lead_ratio=1.2,
    ) == "medium"


def test_confidence_low_when_lead_ratio_under_low_threshold():
    """Confidence is 'low' if lead_ratio < 1.2."""
    assert classify_confidence(
        top_linked_cases=20,
        lead_ratio=1.1,
        attack_rate=0.8,
        conflicts=0,
        min_cases=5,
        low_lead_ratio=1.2,
    ) == "low"

    assert classify_confidence(
        top_linked_cases=10,
        lead_ratio=0.95,
        attack_rate=0.75,
        conflicts=0,
        min_cases=5,
        low_lead_ratio=1.2,
    ) == "low"


def test_score_batch_structure():
    """score_batch returns all required statistical metrics."""
    res = score_batch(
        batch_id="TEST-01",
        recorded_cases=8,
        inferred_cases=4,
        recorded_meals=10,
        inferred_meals=8,
        total_cases=20,
        conflicts=0,
    )
    assert res["batch_id"] == "TEST-01"
    assert res["weighted_cases"] == 10.0  # 8 + 0.5 * 4
    assert res["weighted_exposed"] == 14.0  # 10 + 0.5 * 8
    assert res["attack_rate"] == pytest.approx(10.0 / 14.0)
    assert res["coverage"] == pytest.approx(10.0 / 20.0)
    assert res["score"] == pytest.approx((10.0 / 14.0) * (10.0 / 20.0))
    assert res["conflicts"] == 0
    assert res["linked_cases"] == 12


def test_rank_candidates_ordering_and_leading_candidate():
    """rank_candidates ranks batches descending by score and reports leading candidate."""
    mock_batches = [
        {
            "batch_id": "BATCH-B",
            "recorded_cases": 5,
            "inferred_cases": 2,
            "recorded_meals": 20,
            "inferred_meals": 10,
            "conflicts": 0,
        },
        {
            "batch_id": "BATCH-A",
            "recorded_cases": 15,
            "inferred_cases": 6,
            "recorded_meals": 20,
            "inferred_meals": 4,
            "conflicts": 0,
        },
    ]

    result = rank_candidates(mock_batches, total_cases=30)
    rankings = result["rankings"]
    assert len(rankings) == 2
    # BATCH-A has higher score and must rank first
    assert rankings[0]["batch_id"] == "BATCH-A"
    assert rankings[1]["batch_id"] == "BATCH-B"
    assert result["leading_candidate"] == "BATCH-A"
    assert result["top_score"] > result["second_score"]
    assert result["lead_ratio"] == pytest.approx(result["top_score"] / result["second_score"])


def test_rank_candidates_empty_input():
    """Empty candidate list produces safe defaults."""
    result = rank_candidates([], total_cases=30)
    assert result["rankings"] == []
    assert result["leading_candidate"] is None
    assert result["confidence"] == "insufficient"


def test_zero_cases_and_zero_exposed_batches():
    """Batches with zero exposure or zero cases produce zero scores safely."""
    res = score_batch(
        batch_id="ZERO-01",
        recorded_cases=0,
        inferred_cases=0,
        recorded_meals=0,
        inferred_meals=0,
        total_cases=0,
    )
    assert res["weighted_cases"] == 0.0
    assert res["weighted_exposed"] == 0.0
    assert res["attack_rate"] == 0.0
    assert res["coverage"] == 0.0
    assert res["score"] == 0.0

