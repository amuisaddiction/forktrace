"""
Pydantic typed models for ForkTrace FastAPI endpoints.
All data reflects synthetic outbreak investigations; no results are described as proven.
"""

from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str
    database: str
    graph: str
    batches_count: int
    cases_count: int


class CandidateRankingItem(BaseModel):
    batch_id: str
    recorded_cases: int
    inferred_cases: int
    recorded_meals: int
    inferred_meals: int
    weighted_cases: float
    weighted_exposed: float
    attack_rate: float
    coverage: float
    score: float
    conflicts: int
    linked_cases: int


class CompetingHypotheses(BaseModel):
    top_batch_id: Optional[str] = None
    runner_up_batch_id: Optional[str] = None
    only_top: List[str] = Field(default_factory=list)
    only_runner_up: List[str] = Field(default_factory=list)
    both: List[str] = Field(default_factory=list)
    unexplained: List[str] = Field(default_factory=list)
    counts: Dict[str, int] = Field(default_factory=dict)


class ReviewScopeItem(BaseModel):
    place_id: str
    place_labels: List[str] = Field(default_factory=list)
    reason: str
    is_shipment_destination: bool
    has_conflict: bool


class EvidencePathItem(BaseModel):
    case_id: str
    meal_id: str
    evidence_type: str
    batch_id: str
    restaurant_id: Optional[str] = None
    shipment_id: Optional[str] = None


class ProductItem(BaseModel):
    id: str
    name: str
    batch: str


class AffectedDestinationItem(BaseModel):
    place_id: str
    place_labels: List[str] = Field(default_factory=list)
    shipment_id: str
    shipment_day: int


class RecallProposal(BaseModel):
    batch_id: str
    ingredient: str
    supplier: str
    shelf_life: int
    affected_products: List[ProductItem] = Field(default_factory=list)
    affected_places: List[AffectedDestinationItem] = Field(default_factory=list)
    review_scope: List[ReviewScopeItem] = Field(default_factory=list)
    recommended_actions: List[str] = Field(default_factory=list)
    synthetic_disclaimer: str


class InvestigationResponse(BaseModel):
    status: str
    data_notice: str
    total_cases: int
    leading_candidate: Optional[str] = None
    runner_up: Optional[str] = None
    lead_ratio: float
    confidence: str
    rankings: List[CandidateRankingItem] = Field(default_factory=list)
    leading_candidate_info: Optional[Dict[str, Any]] = None
    evidence_paths: List[EvidencePathItem] = Field(default_factory=list)
    affected_destinations: List[AffectedDestinationItem] = Field(default_factory=list)
    affected_products: List[ProductItem] = Field(default_factory=list)
    conflicts: List[Dict[str, Any]] = Field(default_factory=list)
    all_conflicts: List[Dict[str, Any]] = Field(default_factory=list)
    competing_hypotheses: CompetingHypotheses
    review_scope: List[ReviewScopeItem] = Field(default_factory=list)
    recall_proposal: Optional[RecallProposal] = None
    cypher_queries: Dict[str, str] = Field(default_factory=dict)


class EvidenceDetailResponse(BaseModel):
    batch_id: str
    batch_info: Optional[Dict[str, Any]] = None
    evidence_paths: List[EvidencePathItem] = Field(default_factory=list)
    affected_destinations: List[AffectedDestinationItem] = Field(default_factory=list)
    affected_products: List[ProductItem] = Field(default_factory=list)
    conflicts: List[Dict[str, Any]] = Field(default_factory=list)
    recorded_cases_count: int
    inferred_cases_count: int
    total_linked_cases: int


class RemoveShipmentRequest(BaseModel):
    batch_id: str = Field(..., description="Batch identifier, e.g. SP-2041")
    place_id: str = Field(..., description="Destination place/restaurant ID, e.g. R3")


class RemoveShipmentResponse(BaseModel):
    status: str
    deleted_count: int
    batch_id: str
    place_id: str
    message: str


class ResetResponse(BaseModel):
    status: str
    stats: Dict[str, int]
    message: str


class ApproveRecallRequest(BaseModel):
    batch_id: str = Field(..., description="Target batch identifier for simulated recall")
    approved_by: str = Field(default="Investigation Lead", description="Name or role approving the action")
    notes: Optional[str] = Field(default="", description="Optional audit notes or rationale")


class RecallActionResponse(BaseModel):
    id: str
    batch_id: str
    approved_by: str
    timestamp: str
    status: str
    notes: Optional[str] = None
    synthetic_disclaimer: str

