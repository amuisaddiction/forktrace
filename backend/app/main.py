"""
ForkTrace FastAPI Backend Application.
Investigates synthetic foodborne outbreak data in FalkorDB.
"""

from contextlib import asynccontextmanager
from datetime import datetime, timezone
import uuid
from typing import List, Dict, Any, Optional

from fastapi import FastAPI, HTTPException, status, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db import get_graph, check_connection
from app.loader import load_from_file
from app import queries
from app.investigator import (
    investigate,
    remove_shipment,
    reset,
    compute_review_scope,
)
from app.models import (
    HealthResponse,
    InvestigationResponse,
    EvidenceDetailResponse,
    RemoveShipmentRequest,
    RemoveShipmentResponse,
    ResetResponse,
    ApproveRecallRequest,
    RecallActionResponse,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Auto-seed graph only when the graph is empty."""
    is_ok, _ = check_connection()
    if is_ok:
        try:
            g = get_graph()
            res = g.ro_query("MATCH (b:Batch) RETURN count(b)")
            count = int(res.result_set[0][0]) if res.result_set else 0
            if count == 0 and settings.scenario_path.exists():
                load_from_file(g, settings.scenario_path)
        except Exception:
            pass
    yield


app = FastAPI(
    title="ForkTrace Outbreak Investigation API",
    description="FalkorDB graph-powered foodborne outbreak source investigation API for synthetic data.",
    version="1.0.0",
    lifespan=lifespan,
)

# Enable CORS for local dev & dashboard access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


api_router = APIRouter()


@api_router.get("/health", response_model=HealthResponse, summary="System Health Check")
def health_check():
    """Verify database connection and report basic entity counts."""
    is_ok, err_msg = check_connection()
    if not is_ok:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"FalkorDB connection failed: {err_msg}",
        )

    g = get_graph()
    try:
        b_res = g.ro_query("MATCH (b:Batch) RETURN count(b)")
        b_count = int(b_res.result_set[0][0]) if b_res.result_set else 0

        c_res = g.ro_query("MATCH (c:Case) RETURN count(c)")
        c_count = int(c_res.result_set[0][0]) if c_res.result_set else 0
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error querying FalkorDB: {e}",
        )

    return HealthResponse(
        status="healthy",
        database="connected",
        graph=settings.falkordb_graph,
        batches_count=b_count,
        cases_count=c_count,
    )


@api_router.get("/investigate", response_model=InvestigationResponse, summary="Run Complete Investigation")
def run_investigation():
    """Perform full investigative analysis on FalkorDB outbreak graph data.
    Identifies leading candidate, computes confidence, competing hypotheses, review scope,
    and simulated recall proposal.
    """
    g = get_graph()
    try:
        report = investigate(graph=g)
        return report
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Investigation failed: {e}",
        )


@api_router.get("/evidence/{batch_id}", response_model=EvidenceDetailResponse, summary="Batch Evidence Details")
def get_batch_evidence(batch_id: str):
    """Retrieve detailed evidence paths, affected destinations, products, and conflicts
    for a specific batch.
    """
    g = get_graph()
    b_info = queries.batch_info(g, batch_id)
    if not b_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Batch '{batch_id}' not found in outbreak graph.",
        )

    evidence_paths = queries.evidence_path(g, batch_id, limit=100)
    affected_dests = queries.affected(g, batch_id)
    affected_prods = queries.products(g, batch_id)
    all_conf = queries.conflicts(g)
    batch_conf = [c for c in all_conf if c["batch_id"] == batch_id]

    rec_cases = queries.cases_recorded(g, batch_id)
    inf_cases = queries.cases_inferred(g, batch_id)
    total_linked = len(set(rec_cases) | set(inf_cases))

    return EvidenceDetailResponse(
        batch_id=batch_id,
        batch_info=b_info,
        evidence_paths=evidence_paths,
        affected_destinations=affected_dests,
        affected_products=affected_prods,
        conflicts=batch_conf,
        recorded_cases_count=len(rec_cases),
        inferred_cases_count=len(inf_cases),
        total_linked_cases=total_linked,
    )


@api_router.post("/demo/remove-shipment", response_model=RemoveShipmentResponse, summary="Simulated Shipment Deletion")
def demo_remove_shipment(payload: RemoveShipmentRequest):
    """Simulate missing shipment records (e.g. kitchen records exist without shipping log).
    Deletes the shipment between batch_id and place_id in FalkorDB.
    """
    g = get_graph()
    deleted = remove_shipment(payload.batch_id, payload.place_id, graph=g)
    return RemoveShipmentResponse(
        status="completed",
        deleted_count=deleted,
        batch_id=payload.batch_id,
        place_id=payload.place_id,
        message=f"Removed {deleted} shipment(s) carrying {payload.batch_id} to {payload.place_id}.",
    )


@api_router.post("/demo/reset", response_model=ResetResponse, summary="Restore Baseline Scenario")
def demo_reset():
    """Wipe and restore the FalkorDB graph to the pristine seeded scenario."""
    g = get_graph()
    try:
        stats = reset(graph=g)
        return ResetResponse(
            status="completed",
            stats=stats,
            message="Graph restored to pristine seeded scenario.",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to reset scenario: {e}",
        )


@api_router.post("/recall/approve", response_model=RecallActionResponse, status_code=status.HTTP_201_CREATED, summary="Approve Simulated Recall Action")
def approve_recall(payload: ApproveRecallRequest):
    """Approve a simulated recall action for a suspected source batch.
    Creates a parameterized `RecallAction` node in FalkorDB with timestamp,
    disclaimer, and target batch linkage.
    """
    g = get_graph()
    b_info = queries.batch_info(g, payload.batch_id)
    if not b_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Batch '{payload.batch_id}' not found in outbreak graph.",
        )

    action_id = f"RA-{uuid.uuid4().hex[:8].upper()}"
    now_iso = datetime.now(timezone.utc).isoformat()
    disclaimer = "Simulated recall action based on synthetic outbreak data; not a proven accusation."

    create_cypher = """
    MATCH (b:Batch {id: $batch_id})
    CREATE (ra:RecallAction {
        id: $action_id,
        batch_id: $batch_id,
        approved_by: $approved_by,
        timestamp: $timestamp,
        status: 'APPROVED',
        notes: $notes,
        synthetic_disclaimer: $disclaimer
    })
    CREATE (ra)-[rel:TARGETS]->(b)
    RETURN ra.id, ra.batch_id, ra.approved_by, ra.timestamp, ra.status, ra.notes, ra.synthetic_disclaimer
    """

    res = g.query(
        create_cypher,
        {
            "action_id": action_id,
            "batch_id": payload.batch_id,
            "approved_by": payload.approved_by,
            "timestamp": now_iso,
            "notes": payload.notes or "",
            "disclaimer": disclaimer,
        },
    )

    if not res.result_set:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to record RecallAction in graph.",
        )

    row = res.result_set[0]
    return RecallActionResponse(
        id=str(row[0]),
        batch_id=str(row[1]),
        approved_by=str(row[2]),
        timestamp=str(row[3]),
        status=str(row[4]),
        notes=str(row[5]) if row[5] else None,
        synthetic_disclaimer=str(row[6]),
    )


@api_router.get("/recall/actions", response_model=List[RecallActionResponse], summary="List Approved Recall Actions")
def list_recall_actions():
    """Retrieve all approved RecallAction records from FalkorDB."""
    g = get_graph()
    q = """
    MATCH (ra:RecallAction)-[rel:TARGETS]->(b:Batch)
    RETURN ra.id, ra.batch_id, ra.approved_by, ra.timestamp, ra.status, ra.notes, ra.synthetic_disclaimer
    ORDER BY ra.timestamp DESC
    """
    res = g.ro_query(q)
    actions = []
    for row in res.result_set:
        actions.append(
            RecallActionResponse(
                id=str(row[0]),
                batch_id=str(row[1]),
                approved_by=str(row[2]),
                timestamp=str(row[3]),
                status=str(row[4]),
                notes=str(row[5]) if row[5] else None,
                synthetic_disclaimer=str(row[6]),
            )
        )
    return actions


# Mount router both with and without '/api' prefix so that production Vercel
# routing (which preserves the /api path) and direct local requests are both supported.
app.include_router(api_router, prefix="/api")
app.include_router(api_router)

