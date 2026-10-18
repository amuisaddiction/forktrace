import {
  HealthResponse,
  InvestigationResponse,
  EvidenceDetailResponse,
  RecallActionResponse,
} from './types';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    let errorDetail = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.detail) {
        errorDetail = data.detail;
      }
    } catch {
      // Use fallback errorDetail
    }
    throw new Error(errorDetail);
  }

  return res.json();
}

export async function fetchHealth(): Promise<HealthResponse> {
  return request<HealthResponse>('/api/health');
}

export async function fetchInvestigation(): Promise<InvestigationResponse> {
  return request<InvestigationResponse>('/api/investigate');
}

export async function fetchEvidenceDetail(batchId: string): Promise<EvidenceDetailResponse> {
  return request<EvidenceDetailResponse>(`/api/evidence/${encodeURIComponent(batchId)}`);
}

export async function removeShipmentDemo(batchId: string, placeId: string): Promise<{
  status: string;
  deleted_count: number;
  batch_id: string;
  place_id: string;
  message: string;
}> {
  return request('/api/demo/remove-shipment', {
    method: 'POST',
    body: JSON.stringify({ batch_id: batchId, place_id: placeId }),
  });
}

export async function resetDemo(): Promise<{
  status: string;
  stats: Record<string, number>;
  message: string;
}> {
  return request('/api/demo/reset', {
    method: 'POST',
  });
}

export async function approveRecall(
  batchId: string,
  approvedBy = 'Health & Safety Lead',
  notes = 'Simulated precaution based on top candidate evidence',
): Promise<RecallActionResponse> {
  return request<RecallActionResponse>('/api/recall/approve', {
    method: 'POST',
    body: JSON.stringify({
      batch_id: batchId,
      approved_by: approvedBy,
      notes: notes,
    }),
  });
}

export async function fetchRecallActions(): Promise<RecallActionResponse[]> {
  return request<RecallActionResponse[]>('/api/recall/actions');
}

