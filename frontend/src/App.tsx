import React, { useEffect, useState } from 'react';
import {
  fetchInvestigation,
  fetchEvidenceDetail,
  removeShipmentDemo,
  resetDemo,
  approveRecall,
  fetchRecallActions,
} from './api';
import {
  InvestigationResponse,
  EvidenceDetailResponse,
  RecallActionResponse,
} from './types';

export default function App() {
  const [data, setData] = useState<InvestigationResponse | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [evidence, setEvidence] = useState<EvidenceDetailResponse | null>(null);
  const [recallActions, setRecallActions] = useState<RecallActionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showCypher, setShowCypher] = useState<boolean>(false);
  const [approvedAction, setApprovedAction] = useState<RecallActionResponse | null>(null);

  const loadData = async (preserveSelected = true) => {
    try {
      setLoading(true);
      setError(null);
      const [inv, actions] = await Promise.all([
        fetchInvestigation(),
        fetchRecallActions().catch(() => []),
      ]);
      setData(inv);
      setRecallActions(actions);

      const targetBatch = preserveSelected && selectedBatchId
        ? selectedBatchId
        : inv.leading_candidate;

      setSelectedBatchId(targetBatch);
      if (targetBatch) {
        try {
          const ev = await fetchEvidenceDetail(targetBatch);
          setEvidence(ev);
        } catch {
          setEvidence(null);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to connect to ForkTrace API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(false);
  }, []);

  const handleSelectBatch = async (batchId: string) => {
    setSelectedBatchId(batchId);
    try {
      const ev = await fetchEvidenceDetail(batchId);
      setEvidence(ev);
    } catch (err: any) {
      setToast({ type: 'error', message: `Could not load evidence for ${batchId}: ${err.message}` });
    }
  };

  const handleRemoveShipment = async () => {
    if (!window.confirm('Simulate missing shipment? This removes the SP-2041 → R3 shipment edge from FalkorDB to demonstrate conflict detection when kitchen records exist without shipping logs.')) {
      return;
    }
    try {
      setActionLoading(true);
      const res = await removeShipmentDemo('SP-2041', 'R3');
      setToast({
        type: 'success',
        message: `Simulated shipment deletion: ${res.message}. Kitchen records now flag a conflict at R3.`,
      });
      await loadData(true);
    } catch (err: any) {
      setToast({ type: 'error', message: `Shipment removal failed: ${err.message}` });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset outbreak demo scenario? This will restore FalkorDB to the pristine seeded baseline scenario.')) {
      return;
    }
    try {
      setActionLoading(true);
      await resetDemo();
      setToast({
        type: 'success',
        message: 'Graph restored to pristine seeded baseline from scenario.json.',
      });
      await loadData(false);
    } catch (err: any) {
      setToast({ type: 'error', message: `Reset failed: ${err.message}` });
    } finally {
      setActionLoading(false);
    }
  };

  const handleApproveRecall = async () => {
    if (!data?.leading_candidate) return;
    try {
      setActionLoading(true);
      const action = await approveRecall(
        data.leading_candidate,
        'Director of Food Safety',
        'Simulated containment order initiated for leading candidate batch',
      );
      setApprovedAction(action);
      setToast({
        type: 'success',
        message: `RecallAction persisted in FalkorDB: Action ID ${action.id} targeting ${action.batch_id}.`,
      });
      const updated = await fetchRecallActions();
      setRecallActions(updated);
    } catch (err: any) {
      setToast({ type: 'error', message: `Recall approval failed: ${err.message}` });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="app-container">
        <div className="loading-box">
          <div className="spinner"></div>
          <h2>Investigating Outbreak Data in FalkorDB...</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            Querying connected evidence paths, shipment networks, and kitchen lot logs.
          </p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="app-container">
        <div className="error-box">
          <h2 style={{ color: 'var(--accent-danger)' }}>Backend API Connection Error</h2>
          <p style={{ marginTop: '12px', color: 'var(--text-muted)' }}>{error}</p>
          <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => loadData(false)}>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const topCandidate = data?.rankings[0];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo-area">
          <div className="brand-icon">F</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="brand-title">ForkTrace</span>
              <span className="brand-tag">Graph Outbreak Intelligence</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Connected Source Investigation • Powered by FalkorDB Graph Analytics
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>FalkorDB Cloud Active</span>
        </div>
      </header>

      {/* Synthetic Outbreak Simulation Notice */}
      <div className="notice-banner">
        <span>ℹ️</span>
        <div>
          <strong>Synthetic Outbreak Simulation:</strong> All data analyzed is synthetic benchmark data.
          ForkTrace surfaces <strong>statistical leading candidates</strong> and <strong>suspected sources</strong> with graph evidence paths; results are never described as proven or certain.
        </div>
      </div>

      {/* Notifications / Toast */}
      {toast && (
        <div className={`status-toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '16px' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Primary Actions Toolbar */}
      <div className="toolbar">
        <div className="btn-group">
          <button
            className="btn btn-primary"
            onClick={handleApproveRecall}
            disabled={actionLoading || !data?.leading_candidate}
            title="Records a formal RecallAction node in FalkorDB"
          >
            Approve Simulated Recall for {data?.leading_candidate || 'Candidate'}
          </button>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-cypher"
            onClick={() => setShowCypher(!showCypher)}
          >
            {showCypher ? 'Hide Cypher Queries' : 'Show Cypher Queries'}
          </button>
          <button className="btn" onClick={() => loadData(true)} disabled={actionLoading}>
            Refresh
          </button>
        </div>
      </div>

      {/* Demo Controls Section */}
      <div className="demo-controls-card">
        <div className="demo-controls-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>⚙️</span>
              <span style={{ fontWeight: 600, fontSize: '14px', color: '#fbbf24' }}>Demo Controls (Simulation & Anomaly Testing)</span>
              <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', fontSize: '11px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                Protected by DEMO_MODE
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
              Simulate supply chain anomalies (missing shipment logs) or restore graph to baseline. Requires confirmation.
            </p>
          </div>
          <div className="btn-group">
            <button
              className="btn btn-danger btn-sm"
              onClick={handleRemoveShipment}
              disabled={actionLoading}
              title="Deletes the shipment edge between SP-2041 and R3 to demonstrate missing shipment conflict detection"
            >
              Simulate Remove SP-2041 → R3 Shipment
            </button>
            <button
              className="btn btn-sm"
              onClick={handleReset}
              disabled={actionLoading}
              title="Reloads scenario.json into FalkorDB"
            >
              Reset Demo Scenario
            </button>
          </div>
        </div>
      </div>

      {/* Cypher Transparency Drawer */}
      {showCypher && data?.cypher_queries && (
        <div className="section" style={{ borderColor: 'var(--accent-purple)' }}>
          <div className="section-header">
            <div>
              <h3 className="section-title" style={{ color: '#c084fc' }}>FalkorDB Cypher Queries (Real Query Transparency)</h3>
              <p className="section-subtitle">Exact Cypher statements executed by the investigation engine</p>
            </div>
            <button className="btn" onClick={() => setShowCypher(false)}>Close</button>
          </div>
          <div className="cypher-container">
            {Object.entries(data.cypher_queries).map(([name, query]) => (
              <div key={name} className="cypher-block">
                <div className="cypher-title">{name}</div>
                <pre>{query}</pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Investigation Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Total Outbreak Cases</div>
          <div className="metric-value">{data?.total_cases ?? 0}</div>
        </div>

        <div className="metric-card highlight">
          <div className="metric-label">Leading Candidate (Suspected)</div>
          <div className="metric-value" style={{ color: '#60a5fa' }}>
            {data?.leading_candidate || 'None'}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Lead Ratio (Top / Second)</div>
          <div className="metric-value">
            {data?.lead_ratio ? data.lead_ratio.toFixed(2) : '1.00'}x
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Investigation Confidence</div>
          <div style={{ marginTop: '6px' }}>
            <span className={`confidence-badge confidence-${data?.confidence || 'insufficient'}`}>
              {data?.confidence || 'insufficient'}
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Top Batch Score / Attack Rate</div>
          <div className="metric-value" style={{ fontSize: '18px' }}>
            Score: {topCandidate ? topCandidate.score.toFixed(3) : '0.000'}
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', fontWeight: 400 }}>
              Attack: {topCandidate ? `${(topCandidate.attack_rate * 100).toFixed(1)}%` : '0%'}
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Graph Conflicts Flagged</div>
          <div className="metric-value" style={{ color: data?.all_conflicts?.length ? '#ef4444' : '#10b981' }}>
            {data?.all_conflicts?.length ?? 0}
          </div>
        </div>
      </div>

      {/* Candidate Rankings Table */}
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Candidate Batch Rankings</h2>
            <p className="section-subtitle">
              Ranked by composite score (Attack Rate × Coverage). Recorded and inferred evidence kept strictly separate.
            </p>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Batch ID</th>
                <th>Recorded Cases</th>
                <th>Inferred Cases</th>
                <th>Recorded Meals</th>
                <th>Inferred Meals</th>
                <th>Attack Rate</th>
                <th>Coverage</th>
                <th>Score</th>
                <th>Conflicts</th>
                <th>Inspection</th>
              </tr>
            </thead>
            <tbody>
              {data?.rankings.map((c, idx) => {
                const isSelected = selectedBatchId === c.batch_id;
                return (
                  <tr key={c.batch_id} className={isSelected ? 'selected-row' : ''}>
                    <td style={{ fontWeight: 600 }}>#{idx + 1}</td>
                    <td className="code-cell" style={{ fontWeight: 700 }}>{c.batch_id}</td>
                    <td>
                      <span className="badge badge-rec">{c.recorded_cases}</span>
                    </td>
                    <td>
                      <span className="badge badge-inf">{c.inferred_cases}</span>
                    </td>
                    <td>{c.recorded_meals}</td>
                    <td>{c.inferred_meals}</td>
                    <td>{(c.attack_rate * 100).toFixed(1)}%</td>
                    <td>{(c.coverage * 100).toFixed(1)}%</td>
                    <td style={{ fontWeight: 700, color: idx === 0 ? '#60a5fa' : 'inherit' }}>
                      {c.score.toFixed(4)}
                    </td>
                    <td>
                      {c.conflicts > 0 ? (
                        <span className="badge badge-conflict">{c.conflicts} conflict(s)</span>
                      ) : (
                        <span style={{ color: 'var(--text-dim)' }}>0</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn"
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                        onClick={() => handleSelectBatch(c.batch_id)}
                      >
                        {isSelected ? 'Viewing Evidence' : 'Inspect Evidence'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Competing Hypotheses Comparison */}
      {data?.competing_hypotheses && (
        <div className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Competing Hypotheses Breakdown</h2>
              <p className="section-subtitle">
                Case-level comparison between leading candidate ({data.leading_candidate}) and runner-up ({data.runner_up || 'None'})
              </p>
            </div>
          </div>
          <div className="hypo-grid">
            <div className="hypo-box">
              <div className="metric-label" style={{ color: '#60a5fa' }}>Only Top ({data.leading_candidate})</div>
              <div className="hypo-number" style={{ color: '#60a5fa' }}>{data.competing_hypotheses.counts.only_top}</div>
              <div className="hypo-chips">
                {data.competing_hypotheses.only_top.map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>

            <div className="hypo-box">
              <div className="metric-label" style={{ color: '#fbbf24' }}>Both Candidates</div>
              <div className="hypo-number" style={{ color: '#fbbf24' }}>{data.competing_hypotheses.counts.both}</div>
              <div className="hypo-chips">
                {data.competing_hypotheses.both.map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>

            <div className="hypo-box">
              <div className="metric-label" style={{ color: '#c084fc' }}>Only Runner-Up ({data.runner_up})</div>
              <div className="hypo-number" style={{ color: '#c084fc' }}>{data.competing_hypotheses.counts.only_runner_up}</div>
              <div className="hypo-chips">
                {data.competing_hypotheses.only_runner_up.map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>

            <div className="hypo-box">
              <div className="metric-label" style={{ color: '#94a3b8' }}>Unexplained Cases</div>
              <div className="hypo-number" style={{ color: '#94a3b8' }}>{data.competing_hypotheses.counts.unexplained}</div>
              <div className="hypo-chips">
                {data.competing_hypotheses.unexplained.map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Grid: Review Scope & Affected Network */}
      <div className="grid-2col">
        {/* Review Scope & Conflicts */}
        <div className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Audit Review Scope & Conflicts</h2>
              <p className="section-subtitle">
                Shipment destinations of {data?.leading_candidate} plus any restaurant with missing shipment records
              </p>
            </div>
          </div>
          <div className="scope-list">
            {data?.review_scope.map((item) => (
              <div key={item.place_id} className={`scope-item ${item.has_conflict ? 'has-conflict' : ''}`}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="scope-place">{item.place_id}</span>
                    {item.place_labels.map((lbl) => (
                      <span key={lbl} className="chip">{lbl}</span>
                    ))}
                    {item.has_conflict && (
                      <span className="badge badge-conflict">MISSING SHIPMENT RECORD</span>
                    )}
                  </div>
                  <div className="scope-reason">{item.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affected Destinations & Downstream Products */}
        <div className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Affected Destinations & Products</h2>
              <p className="section-subtitle">Supply chain impact for batch {selectedBatchId || data?.leading_candidate}</p>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Downstream Packaged Products:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
              {(evidence?.affected_products || data?.affected_products)?.map((p) => (
                <div key={p.id} style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border)', padding: '6px 10px', borderRadius: '6px', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{p.id}:</span> <strong>{p.name}</strong>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Verified Direct Shipment Destinations:</h4>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Destination</th>
                    <th>Shipment ID</th>
                    <th>Day</th>
                  </tr>
                </thead>
                <tbody>
                  {(evidence?.affected_destinations || data?.affected_destinations)?.map((d) => (
                    <tr key={d.shipment_id}>
                      <td className="code-cell">{d.place_id}</td>
                      <td className="code-cell">{d.shipment_id}</td>
                      <td>Day {d.shipment_day}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Paths Table */}
      <div className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              Evidence Paths: {selectedBatchId || data?.leading_candidate}
            </h2>
            <p className="section-subtitle">
              Case-to-meal-to-batch exposure graph records. Distinguishes direct kitchen logs from shipment-inferred windows.
            </p>
          </div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Meal ID</th>
                <th>Evidence Type</th>
                <th>Batch</th>
                <th>Restaurant</th>
                <th>Shipment ID</th>
              </tr>
            </thead>
            <tbody>
              {(evidence?.evidence_paths || data?.evidence_paths || []).slice(0, 20).map((ep, idx) => (
                <tr key={`${ep.case_id}-${ep.meal_id}-${idx}`}>
                  <td className="code-cell" style={{ fontWeight: 600 }}>{ep.case_id}</td>
                  <td className="code-cell">{ep.meal_id}</td>
                  <td>
                    <span className={`badge ${ep.evidence_type === 'RECORDED' ? 'badge-rec' : 'badge-inf'}`}>
                      {ep.evidence_type}
                    </span>
                  </td>
                  <td className="code-cell">{ep.batch_id}</td>
                  <td className="code-cell">{ep.restaurant_id || '—'}</td>
                  <td className="code-cell">{ep.shipment_id || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(evidence?.evidence_paths || data?.evidence_paths || []).length > 20 && (
            <div style={{ textAlign: 'center', padding: '10px', color: 'var(--text-dim)', fontSize: '12px' }}>
              Showing first 20 evidence paths
            </div>
          )}
        </div>
      </div>

      {/* Simulated Recall Proposal & Audit Actions */}
      {data?.recall_proposal && (
        <div className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Simulated Recall Proposal (Containment Plan)</h2>
              <p className="section-subtitle">Non-destructive proposal generated from graph evidence</p>
            </div>
          </div>

          <div className="recall-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <strong>Target Batch:</strong> <span className="code-cell">{data.recall_proposal.batch_id}</span> ({data.recall_proposal.ingredient} from {data.recall_proposal.supplier})
              </div>
              <div>
                <strong>Shelf Life:</strong> {data.recall_proposal.shelf_life} days
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Recommended Containment Actions:</div>
              <ul className="action-list">
                {data.recall_proposal.recommended_actions.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--text-dim)', fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
              {data.recall_proposal.synthetic_disclaimer}
            </p>
          </div>

          {/* Approved Actions in Graph */}
          {recallActions.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                FalkorDB Persisted Recall Actions ({recallActions.length}):
              </h4>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Action ID</th>
                      <th>Target Batch</th>
                      <th>Approved By</th>
                      <th>Timestamp</th>
                      <th>Status</th>
                      <th>Disclaimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recallActions.map((ra) => (
                      <tr key={ra.id}>
                        <td className="code-cell">{ra.id}</td>
                        <td className="code-cell" style={{ fontWeight: 700 }}>{ra.batch_id}</td>
                        <td>{ra.approved_by}</td>
                        <td style={{ fontSize: '11px' }}>{ra.timestamp}</td>
                        <td>
                          <span className="badge badge-rec">{ra.status}</span>
                        </td>
                        <td style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                          {ra.synthetic_disclaimer}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

