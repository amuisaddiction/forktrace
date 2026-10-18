import pytest
from app import queries
from tests.oracle import Oracle

def test_total_cases_equals_oracle(graph, oracle: Oracle):
    """FalkorDB total_cases query must exactly match Oracle count."""
    db_total = queries.total_cases(graph)
    oracle_total = oracle.total_cases()
    assert db_total == oracle_total, f"Expected {oracle_total} total cases, got {db_total}"

def test_rank_recorded_equals_oracle(graph, oracle: Oracle):
    """FalkorDB rank_recorded query results must EQUAL the oracle for recorded counts."""
    db_ranks = queries.rank_recorded(graph)
    oracle_ranks = oracle.rank_recorded()
    assert db_ranks == oracle_ranks, f"rank_recorded mismatch:\nDB: {db_ranks}\nOracle: {oracle_ranks}"

def test_rank_inferred_equals_oracle(graph, oracle: Oracle):
    """FalkorDB rank_inferred query results must EQUAL the oracle for inferred counts."""
    db_ranks = queries.rank_inferred(graph)
    oracle_ranks = oracle.rank_inferred()
    assert db_ranks == oracle_ranks, f"rank_inferred mismatch:\nDB: {db_ranks}\nOracle: {oracle_ranks}"

def test_cases_recorded_equals_oracle(graph, oracle: Oracle):
    """For every batch, cases_recorded from FalkorDB must match Oracle cases."""
    for b_id in oracle.batches.keys():
        db_cases = queries.cases_recorded(graph, b_id)
        oracle_cases = oracle.cases_recorded(b_id)
        assert db_cases == oracle_cases, f"cases_recorded mismatch for batch {b_id}"

def test_cases_inferred_equals_oracle(graph, oracle: Oracle):
    """For every batch, cases_inferred from FalkorDB must match Oracle cases."""
    for b_id in oracle.batches.keys():
        db_cases = queries.cases_inferred(graph, b_id)
        oracle_cases = oracle.cases_inferred(b_id)
        assert db_cases == oracle_cases, f"cases_inferred mismatch for batch {b_id}"

def test_conflicts_equals_oracle(graph, oracle: Oracle):
    """FalkorDB conflicts query must EQUAL the oracle conflicts."""
    db_conflicts = queries.conflicts(graph)
    oracle_conflicts = oracle.conflicts()
    assert db_conflicts == oracle_conflicts, f"conflicts mismatch:\nDB: {db_conflicts}\nOracle: {oracle_conflicts}"

def test_affected_equals_oracle(graph, oracle: Oracle):
    """FalkorDB affected query must match Oracle places and shipments."""
    for b_id in oracle.batches.keys():
        db_affected = queries.affected(graph, b_id)
        oracle_affected = oracle.affected(b_id)
        assert db_affected == oracle_affected, f"affected mismatch for batch {b_id}"

def test_products_equals_oracle(graph, oracle: Oracle):
    """FalkorDB products query must match Oracle products list."""
    for b_id in oracle.batches.keys():
        db_products = queries.products(graph, b_id)
        oracle_products = oracle.products(b_id)
        assert db_products == oracle_products, f"products mismatch for batch {b_id}"

def test_batch_info_equals_oracle(graph, oracle: Oracle):
    """FalkorDB batch_info query must match Oracle batch metadata."""
    for b_id in oracle.batches.keys():
        db_info = queries.batch_info(graph, b_id)
        oracle_info = oracle.batch_info(b_id)
        assert db_info == oracle_info, f"batch_info mismatch for batch {b_id}"

def test_evidence_path_query(graph, oracle: Oracle):
    """Verify evidence_path query returns structured records with limit."""
    planted = oracle.data["planted"]
    paths = queries.evidence_path(graph, planted, limit=10)
    assert len(paths) <= 10
    for p in paths:
        assert "case_id" in p
        assert "meal_id" in p
        assert p["evidence_type"] in ("RECORDED", "INFERRED")
        assert p["batch_id"] == planted

