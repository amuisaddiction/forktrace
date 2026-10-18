"""
Investigation engine for FalkorDB connected outbreak data.

Executes graph queries, computes candidate scores and confidence, compares
competing hypotheses, assesses review scopes and conflicts, and generates
simulated recall proposals.

Disclaimer:
All data analyzed by ForkTrace is synthetic. Results identify a "leading candidate"
or "suspected source" with statistical evidence; results are never described as
"proven" or as identifying a "culprit".
"""

from typing import Any, Dict, List, Optional
from app.db import get_graph
from app import queries
from app.config import settings
from app.loader import load_from_file
from app.scoring import rank_candidates


def remove_shipment(batch_id: str, place_id: str, graph=None) -> int:
    """Delete the shipment record between batch_id and place_id from FalkorDB.
    Used for demo simulations and resilience testing.
    """
    g = graph if graph is not None else get_graph()
    q = """
    MATCH (s:Shipment)-[cr:CARRIES]->(b:Batch {id: $batch_id}),
          (s)-[del:DELIVERED_TO]->(p:Place {id: $place_id})
    DETACH DELETE s
    RETURN count(s) AS deleted
    """
    res = g.query(q, {"batch_id": batch_id, "place_id": place_id})
    if res.result_set:
        return int(res.result_set[0][0])
    return 0


def reset(graph=None) -> Dict[str, int]:
    """Restore the FalkorDB graph to the pristine seeded state from scenario.json."""
    g = graph if graph is not None else get_graph()
    return load_from_file(g, settings.scenario_path)


def get_all_case_ids(graph) -> List[str]:
    """Retrieve sorted list of all case IDs in the outbreak graph."""
    res = graph.ro_query("MATCH (c:Case) RETURN c.id ORDER BY c.id ASC")
    return [str(row[0]) for row in res.result_set]


def compute_candidates(graph, total_cases: Optional[int] = None) -> Dict[str, Any]:
    """Run real Cypher queries for recorded and inferred evidence across all batches,
    then score and rank candidates with recorded and inferred counts kept separate.
    """
    tot_cases = total_cases if total_cases is not None else queries.total_cases(graph)
    rec_ranks = {r["batch_id"]: r for r in queries.rank_recorded(graph)}
    inf_ranks = {r["batch_id"]: r for r in queries.rank_inferred(graph)}
    all_conf = queries.conflicts(graph)

    batch_ids = sorted(list(set(rec_ranks.keys()) | set(inf_ranks.keys())))
    batches_data = []
    for bid in batch_ids:
        rec = rec_ranks.get(bid, {"exposed_meals": 0, "cases": 0})
        inf = inf_ranks.get(bid, {"exposed_meals": 0, "cases": 0})
        conf_count = sum(1 for c in all_conf if c["batch_id"] == bid)
        cases_rec = queries.cases_recorded(graph, bid)
        cases_inf = queries.cases_inferred(graph, bid)
        linked_cases = len(set(cases_rec) | set(cases_inf))

        batches_data.append({
            "batch_id": bid,
            "recorded_cases": rec["cases"],
            "inferred_cases": inf["cases"],
            "recorded_meals": rec["exposed_meals"],
            "inferred_meals": inf["exposed_meals"],
            "conflicts": conf_count,
            "linked_cases": linked_cases,
        })

    ranking_result = rank_candidates(batches_data, total_cases=tot_cases)
    rankings = ranking_result["rankings"]
    runner_up = rankings[1]["batch_id"] if len(rankings) > 1 else None

    return {
        "rankings": rankings,
        "leading_candidate": ranking_result["leading_candidate"],
        "runner_up": runner_up,
        "top_score": ranking_result.get("top_score", 0.0),
        "second_score": ranking_result.get("second_score", 0.0),
        "lead_ratio": ranking_result["lead_ratio"],
        "confidence": ranking_result["confidence"],
    }


def compute_competing_hypotheses(
    graph,
    top_batch_id: str,
    runner_up_batch_id: Optional[str] = None,
    all_case_ids: Optional[List[str]] = None,
) -> Dict[str, Any]:
    """Compare the leading candidate hypothesis against the runner-up hypothesis.

    Categorizes all outbreak cases into:
    - only_top: explained only by the top candidate
    - only_runner_up: explained only by the runner-up
    - both: explained by both candidates
    - unexplained: explained by neither candidate
    """
    top_cases = set(queries.cases_recorded(graph, top_batch_id)) | set(queries.cases_inferred(graph, top_batch_id))
    if runner_up_batch_id:
        runner_cases = set(queries.cases_recorded(graph, runner_up_batch_id)) | set(queries.cases_inferred(graph, runner_up_batch_id))
    else:
        runner_cases = set()

    all_cases = set(all_case_ids if all_case_ids is not None else get_all_case_ids(graph))

    only_top = sorted(list(top_cases - runner_cases))
    only_runner_up = sorted(list(runner_cases - top_cases))
    both = sorted(list(top_cases & runner_cases))
    unexplained = sorted(list(all_cases - (top_cases | runner_cases)))

    return {
        "top_batch_id": top_batch_id,
        "runner_up_batch_id": runner_up_batch_id,
        "only_top": only_top,
        "only_runner_up": only_runner_up,
        "both": both,
        "unexplained": unexplained,
        "counts": {
            "only_top": len(only_top),
            "only_runner_up": len(only_runner_up),
            "both": len(both),
            "unexplained": len(unexplained),
            "total_cases": len(all_cases),
        },
    }


def compute_review_scope(graph, batch_id: str) -> List[Dict[str, Any]]:
    """Determine the audit review scope for a batch:
    All shipment destinations of the suspected batch PLUS any restaurant where
    kitchen lot records log the batch without a valid shipment record.

    Human-readable reasons clearly state the cause for inclusion in the scope.
    """
    dests = queries.affected(graph, batch_id)
    dest_map = {d["place_id"]: d for d in dests}

    all_conf = queries.conflicts(graph)
    batch_conflicts = [c for c in all_conf if c["batch_id"] == batch_id]
    conflict_restaurants = {c["restaurant_id"] for c in batch_conflicts}

    review_scope = []

    # 1. Places that received shipments
    for place_id, d in sorted(dest_map.items()):
        has_conf = place_id in conflict_restaurants
        if has_conf:
            reason = "kitchen records show this batch, but delivery dates conflict with shipment window"
        else:
            reason = f"Verified shipment destination: received shipment {d['shipment_id']} on day {d['shipment_day']}"
        review_scope.append({
            "place_id": place_id,
            "place_labels": d.get("place_labels", []),
            "reason": reason,
            "is_shipment_destination": True,
            "has_conflict": has_conf,
        })

    # 2. Conflicted restaurants missing a shipment record
    for r_id in sorted(conflict_restaurants):
        if r_id not in dest_map:
            review_scope.append({
                "place_id": r_id,
                "place_labels": ["Restaurant", "Place"],
                "reason": "kitchen records show this batch, but the shipment record is missing",
                "is_shipment_destination": False,
                "has_conflict": True,
            })

    review_scope.sort(key=lambda x: x["place_id"])
    return review_scope


def build_recall_proposal(
    graph,
    batch_id: str,
    review_scope: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """Generate structured simulated recall proposal data.
    Provides targeted containment scope and action items without writing to the database.
    """
    b_info = queries.batch_info(graph, batch_id)
    prods = queries.products(graph, batch_id)
    dests = queries.affected(graph, batch_id)

    return {
        "batch_id": batch_id,
        "ingredient": b_info["ingredient"] if b_info else "unknown",
        "supplier": b_info["supplier"] if b_info else "unknown",
        "shelf_life": b_info["shelf_life"] if b_info else 0,
        "affected_products": prods,
        "affected_places": dests,
        "review_scope": review_scope,
        "recommended_actions": [
            "Quarantine all remaining inventory for suspected source batch",
            "Notify commercial kitchens and retail partners in review scope",
            "Halt distribution and recall downstream affected products",
            "Audit kitchen receiving logs for restaurants flagged with missing shipments",
        ],
        "synthetic_disclaimer": "This is a simulated recall proposal based on synthetic data. ForkTrace identifies the statistical leading candidate; results do not represent proven guilt.",
    }


def investigate(graph=None) -> Dict[str, Any]:
    """Execute complete investigative analysis on connected outbreak data in FalkorDB."""
    g = graph if graph is not None else get_graph()
    total_cases_count = queries.total_cases(g)
    candidate_analysis = compute_candidates(g, total_cases=total_cases_count)

    leading_candidate = candidate_analysis["leading_candidate"]
    runner_up = candidate_analysis.get("runner_up")

    if leading_candidate:
        info = queries.batch_info(g, leading_candidate)
        evidence = queries.evidence_path(g, leading_candidate, limit=50)
        destinations = queries.affected(g, leading_candidate)
        prods = queries.products(g, leading_candidate)
        scope = compute_review_scope(g, leading_candidate)
        hypotheses = compute_competing_hypotheses(g, leading_candidate, runner_up)
        recall = build_recall_proposal(g, leading_candidate, scope)
    else:
        info = None
        evidence = []
        destinations = []
        prods = []
        scope = []
        hypotheses = {}
        recall = {}

    all_conf = queries.conflicts(g)
    top_conflicts = [c for c in all_conf if c["batch_id"] == leading_candidate] if leading_candidate else []

    return {
        "status": "completed",
        "data_notice": "Analyzed synthetic foodborne outbreak data in FalkorDB; leading candidate identified by connected evidence.",
        "total_cases": total_cases_count,
        "leading_candidate": leading_candidate,
        "runner_up": runner_up,
        "lead_ratio": candidate_analysis["lead_ratio"],
        "confidence": candidate_analysis["confidence"],
        "rankings": candidate_analysis["rankings"],
        "leading_candidate_info": info,
        "evidence_paths": evidence,
        "affected_destinations": destinations,
        "affected_products": prods,
        "conflicts": top_conflicts,
        "all_conflicts": all_conf,
        "competing_hypotheses": hypotheses,
        "review_scope": scope,
        "recall_proposal": recall,
        "cypher_queries": queries.QUERIES,
    }

