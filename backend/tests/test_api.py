"""
API Integration tests using FastAPI TestClient against FalkorDB Cloud.
Tests verify endpoints, input validation, RecallAction graph persistence,
and simulated demo mutations with automatic cleanup.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.investigator import reset
from tests.oracle import Oracle


@pytest.fixture(scope="module")
def client(graph):
    """Provides a TestClient with verified database connection."""
    with TestClient(app) as test_client:
        yield test_client


def test_api_health_endpoint(client: TestClient):
    """GET /health must return healthy status and database metrics."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["database"] == "connected"
    assert data["batches_count"] > 0
    assert data["cases_count"] > 0


def test_api_investigate_endpoint(client: TestClient, scenario_data: dict):
    """GET /investigate returns full investigation results with planted candidate leading."""
    response = client.get("/investigate")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "completed"
    assert data["leading_candidate"] == scenario_data["planted"]
    assert "data_notice" in data
    assert len(data["rankings"]) > 0
    assert "competing_hypotheses" in data
    assert "review_scope" in data
    assert "cypher_queries" in data


def test_api_evidence_endpoint_success(client: TestClient, scenario_data: dict):
    """GET /evidence/{batch_id} returns evidence paths and affected products for a valid batch."""
    planted = scenario_data["planted"]
    response = client.get(f"/evidence/{planted}")
    assert response.status_code == 200
    data = response.json()
    assert data["batch_id"] == planted
    assert len(data["evidence_paths"]) > 0
    assert len(data["affected_destinations"]) > 0
    assert len(data["affected_products"]) > 0


def test_api_evidence_endpoint_not_found(client: TestClient):
    """GET /evidence/{batch_id} returns 404 for an unknown batch ID."""
    response = client.get("/evidence/UNKNOWN-BATCH-999")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_api_recall_approval_and_listing(client: TestClient, scenario_data: dict, graph):
    """POST /recall/approve creates a parameterized RecallAction node in FalkorDB,
    which is then queryable via GET /recall/actions.
    """
    planted = scenario_data["planted"]
    try:
        # 1. 404 on unknown batch
        bad_resp = client.post(
            "/recall/approve",
            json={"batch_id": "NONEXISTENT", "approved_by": "Test Auditor"},
        )
        assert bad_resp.status_code == 404

        # 2. 201 on valid batch
        resp = client.post(
            "/recall/approve",
            json={
                "batch_id": planted,
                "approved_by": "Safety Officer",
                "notes": "Simulated precautionary containment",
            },
        )
        assert resp.status_code == 201
        action = resp.json()
        assert action["batch_id"] == planted
        assert action["approved_by"] == "Safety Officer"
        assert action["status"] == "APPROVED"
        assert "synthetic" in action["synthetic_disclaimer"].lower()

        # 3. GET /recall/actions returns the new action
        list_resp = client.get("/recall/actions")
        assert list_resp.status_code == 200
        actions = list_resp.json()
        assert any(a["id"] == action["id"] for a in actions)

    finally:
        # Cleanup: delete created RecallAction nodes to keep graph clean
        graph.query("MATCH (ra:RecallAction) DETACH DELETE ra")


def test_api_demo_mutation_and_reset(client: TestClient, scenario_data: dict, graph):
    """POST /demo/remove-shipment simulates a missing shipment record;
    POST /demo/reset restores the graph to the baseline state.
    """
    planted = scenario_data["planted"]
    target_place = "R3"

    try:
        # 1. Remove shipment
        resp = client.post(
            "/demo/remove-shipment",
            json={"batch_id": planted, "place_id": target_place},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["deleted_count"] >= 1
        assert data["batch_id"] == planted
        assert data["place_id"] == target_place

        # 2. Verify investigation now flags conflict and missing shipment reason
        inv_resp = client.get("/investigate")
        assert inv_resp.status_code == 200
        inv_data = inv_resp.json()
        r3_scope = next((s for s in inv_data["review_scope"] if s["place_id"] == target_place), None)
        assert r3_scope is not None
        assert r3_scope["reason"] == "kitchen records show this batch, but the shipment record is missing"

        # 3. Reset via API endpoint
        reset_resp = client.post("/demo/reset")
        assert reset_resp.status_code == 200
        assert reset_resp.json()["status"] == "completed"

        # 4. Verify post-reset state has 0 conflicts
        inv_clean = client.get("/investigate").json()
        assert len(inv_clean["all_conflicts"]) == 0

    finally:
        # Guarantee baseline reset
        reset(graph=graph)

