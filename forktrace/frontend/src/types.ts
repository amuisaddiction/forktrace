export interface CandidateRankingItem {
  batch_id: string;
  recorded_cases: number;
  inferred_cases: number;
  recorded_meals: number;
  inferred_meals: number;
  weighted_cases: number;
  weighted_exposed: number;
  attack_rate: number;
  coverage: number;
  score: number;
  conflicts: number;
  linked_cases: number;
}

export interface CompetingHypotheses {
  top_batch_id: string | null;
  runner_up_batch_id: string | null;
  only_top: string[];
  only_runner_up: string[];
  both: string[];
  unexplained: string[];
  counts: {
    only_top: number;
    only_runner_up: number;
    both: number;
    unexplained: number;
    total_cases: number;
  };
}

export interface ReviewScopeItem {
  place_id: string;
  place_labels: string[];
  reason: string;
  is_shipment_destination: boolean;
  has_conflict: boolean;
}

export interface EvidencePathItem {
  case_id: string;
  meal_id: string;
  evidence_type: 'RECORDED' | 'INFERRED';
  batch_id: string;
  restaurant_id: string | null;
  shipment_id: string | null;
}

export interface ProductItem {
  id: string;
  name: string;
  batch: string;
}

export interface AffectedDestinationItem {
  place_id: string;
  place_labels: string[];
  shipment_id: string;
  shipment_day: number;
}

export interface RecallProposal {
  batch_id: string;
  ingredient: string;
  supplier: string;
  shelf_life: number;
  affected_products: ProductItem[];
  affected_places: AffectedDestinationItem[];
  review_scope: ReviewScopeItem[];
  recommended_actions: string[];
  synthetic_disclaimer: string;
}

export interface BatchInfo {
  batch_id: string;
  shelf_life: number;
  ingredient: string;
  supplier: string;
}

export interface InvestigationResponse {
  status: string;
  data_notice: string;
  total_cases: number;
  leading_candidate: string | null;
  runner_up: string | null;
  lead_ratio: number;
  confidence: 'high' | 'medium' | 'low' | 'insufficient';
  rankings: CandidateRankingItem[];
  leading_candidate_info: BatchInfo | null;
  evidence_paths: EvidencePathItem[];
  affected_destinations: AffectedDestinationItem[];
  affected_products: ProductItem[];
  conflicts: Array<{
    meal_id: string;
    meal_day: number;
    restaurant_id: string;
    batch_id: string;
  }>;
  all_conflicts: Array<{
    meal_id: string;
    meal_day: number;
    restaurant_id: string;
    batch_id: string;
  }>;
  competing_hypotheses: CompetingHypotheses;
  review_scope: ReviewScopeItem[];
  recall_proposal: RecallProposal | null;
  cypher_queries: Record<string, string>;
}

export interface EvidenceDetailResponse {
  batch_id: string;
  batch_info: BatchInfo | null;
  evidence_paths: EvidencePathItem[];
  affected_destinations: AffectedDestinationItem[];
  affected_products: ProductItem[];
  conflicts: Array<{
    meal_id: string;
    meal_day: number;
    restaurant_id: string;
    batch_id: string;
  }>;
  recorded_cases_count: number;
  inferred_cases_count: number;
  total_linked_cases: number;
}

export interface RecallActionResponse {
  id: string;
  batch_id: string;
  approved_by: string;
  timestamp: string;
  status: string;
  notes: string | null;
  synthetic_disclaimer: string;
}

export interface HealthResponse {
  status: string;
  database: string;
  graph: string;
  batches_count: number;
  cases_count: number;
}
