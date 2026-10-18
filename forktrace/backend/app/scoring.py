"""
Pure scoring and confidence estimation functions for synthetic foodborne outbreak data.

Note:
All data analyzed by ForkTrace is synthetic. Results identify a "leading candidate"
or "suspected source" with statistical evidence; results are never described as
"proven" or as identifying a "culprit".
"""

from typing import Any, Dict, List, Optional
from app.config import settings


def compute_weighted_cases(
    recorded_cases: int,
    inferred_cases: int,
    inferred_weight: float = 0.5,
) -> float:
    """Compute weighted cases: recorded_cases + inferred_weight * inferred_cases."""
    return float(recorded_cases) + float(inferred_weight) * float(inferred_cases)


def compute_weighted_exposed(
    recorded_meals: int,
    inferred_meals: int,
    inferred_weight: float = 0.5,
) -> float:
    """Compute weighted exposed meals: recorded_meals + inferred_weight * inferred_meals."""
    return float(recorded_meals) + float(inferred_weight) * float(inferred_meals)


def compute_attack_rate(weighted_cases: float, weighted_exposed: float) -> float:
    """Compute attack rate: weighted_cases / weighted_exposed.
    Explicitly handles zero denominator (returns 0.0).
    """
    if weighted_exposed <= 0.0:
        return 0.0
    return float(weighted_cases) / float(weighted_exposed)


def compute_coverage(weighted_cases: float, total_cases: int) -> float:
    """Compute outbreak coverage: weighted_cases / total_cases.
    Explicitly handles zero denominator (returns 0.0).
    """
    if total_cases <= 0:
        return 0.0
    return float(weighted_cases) / float(total_cases)


def compute_score(attack_rate: float, coverage: float) -> float:
    """Compute candidate source score: attack_rate * coverage."""
    return float(attack_rate) * float(coverage)


def compute_lead_ratio(top_score: float, second_score: float) -> float:
    """Compute lead ratio: top_score / second_score.
    Explicitly handles zero denominator:
    - If second_score <= 0 and top_score > 0: returns float('inf')
    - If both are 0: returns 1.0
    """
    if second_score <= 0.0:
        return float("inf") if top_score > 0.0 else 1.0
    return float(top_score) / float(second_score)


def classify_confidence(
    top_linked_cases: int,
    lead_ratio: float,
    attack_rate: float,
    conflicts: int = 0,
    min_cases: Optional[int] = None,
    high_lead_ratio: Optional[float] = None,
    high_attack: Optional[float] = None,
    low_lead_ratio: Optional[float] = None,
) -> str:
    """Classify investigation confidence for the leading candidate batch.

    Rules:
    - 'insufficient' if top linked cases < min_cases (default 5).
    - 'high' only if lead_ratio >= high_lead_ratio (default 2.0)
      AND attack_rate >= high_attack (default 0.7)
      AND conflicts == 0.
    - 'low' if lead_ratio < low_lead_ratio (default 1.2).
    - otherwise 'medium'.
    """
    mc = min_cases if min_cases is not None else settings.min_cases
    hlr = high_lead_ratio if high_lead_ratio is not None else settings.high_lead_ratio
    ha = high_attack if high_attack is not None else settings.high_attack
    llr = low_lead_ratio if low_lead_ratio is not None else settings.low_lead_ratio

    if top_linked_cases < mc:
        return "insufficient"

    if lead_ratio >= hlr and attack_rate >= ha and conflicts == 0:
        return "high"

    if lead_ratio < llr:
        return "low"

    return "medium"


def score_batch(
    batch_id: str,
    recorded_cases: int,
    inferred_cases: int,
    recorded_meals: int,
    inferred_meals: int,
    total_cases: int,
    conflicts: int = 0,
    linked_cases: Optional[int] = None,
    inferred_weight: Optional[float] = None,
) -> Dict[str, Any]:
    """Compute all outbreak metrics for a single batch."""
    weight = inferred_weight if inferred_weight is not None else settings.inferred_weight
    w_cases = compute_weighted_cases(recorded_cases, inferred_cases, weight)
    w_exposed = compute_weighted_exposed(recorded_meals, inferred_meals, weight)
    ar = compute_attack_rate(w_cases, w_exposed)
    cov = compute_coverage(w_cases, total_cases)
    sc = compute_score(ar, cov)

    total_linked = linked_cases if linked_cases is not None else (recorded_cases + inferred_cases)

    return {
        "batch_id": batch_id,
        "recorded_cases": recorded_cases,
        "inferred_cases": inferred_cases,
        "recorded_meals": recorded_meals,
        "inferred_meals": inferred_meals,
        "weighted_cases": w_cases,
        "weighted_exposed": w_exposed,
        "attack_rate": ar,
        "coverage": cov,
        "score": sc,
        "conflicts": conflicts,
        "linked_cases": total_linked,
    }


def rank_candidates(
    batches: List[Dict[str, Any]],
    total_cases: int,
    inferred_weight: Optional[float] = None,
    min_cases: Optional[int] = None,
    high_lead_ratio: Optional[float] = None,
    high_attack: Optional[float] = None,
    low_lead_ratio: Optional[float] = None,
) -> Dict[str, Any]:
    """Score and rank all batches, determining the leading candidate and confidence.

    Returns structured ranking results including lead ratio and confidence.
    """
    scored = [
        score_batch(
            batch_id=b["batch_id"],
            recorded_cases=b.get("recorded_cases", 0),
            inferred_cases=b.get("inferred_cases", 0),
            recorded_meals=b.get("recorded_meals", 0),
            inferred_meals=b.get("inferred_meals", 0),
            total_cases=total_cases,
            conflicts=b.get("conflicts", 0),
            linked_cases=b.get("linked_cases"),
            inferred_weight=inferred_weight,
        )
        for b in batches
    ]

    scored.sort(key=lambda x: (-x["score"], -x["attack_rate"], -x["coverage"], x["batch_id"]))

    if not scored:
        return {
            "rankings": [],
            "leading_candidate": None,
            "lead_ratio": 1.0,
            "confidence": "insufficient",
        }

    top = scored[0]
    second_score = scored[1]["score"] if len(scored) > 1 else 0.0
    lead_ratio = compute_lead_ratio(top["score"], second_score)

    conf = classify_confidence(
        top_linked_cases=top["linked_cases"],
        lead_ratio=lead_ratio,
        attack_rate=top["attack_rate"],
        conflicts=top["conflicts"],
        min_cases=min_cases,
        high_lead_ratio=high_lead_ratio,
        high_attack=high_attack,
        low_lead_ratio=low_lead_ratio,
    )

    return {
        "rankings": scored,
        "leading_candidate": top["batch_id"],
        "top_score": top["score"],
        "second_score": second_score,
        "lead_ratio": lead_ratio,
        "confidence": conf,
    }

