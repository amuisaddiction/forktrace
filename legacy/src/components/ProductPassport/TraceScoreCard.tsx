import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BatchData } from '../../types/batch';

interface TraceScoreCardProps {
  batch: BatchData;
  onOpenHowWeVerify?: () => void;
}

export const TraceScoreCard: React.FC<TraceScoreCardProps> = ({ batch, onOpenHowWeVerify }) => {
  const [expanded, setExpanded] = useState(false);
  const score = batch.metrics.traceScore; // 92

  // SVG circular gauge calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl border border-sand p-6 sm:p-8 shadow-soft mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left: Score Gauge and Main Pitch */}
        <div className="flex items-center gap-6">
          {/* Circular SVG Gauge */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-sage-100"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress stroke */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-sage-600 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Score inside circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-forest-900">
              <span className="font-serif text-3xl font-bold leading-none">{score}</span>
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider font-semibold mt-0.5">
                / 100
              </span>
            </div>
          </div>

          {/* Explanation */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-sage-600 bg-sage-50 px-2 py-0.5 rounded border border-sage-200">
                TRACE INTEGRITY SCORE
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                Exceptional Tier
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-forest-900">
              92 / 100 Verified Trace Rating
            </h3>

            <p className="text-sm text-muted max-w-xl mt-1 leading-relaxed">
              Batch <strong className="text-forest-800 font-mono">{batch.code}</strong> ranks in the top 3% of audited ethical food systems worldwide. Every claim is mathematically confirmed by satellite verification, farm-gate bank receipts, and sensor-logged roastery telemetry.
            </p>
          </div>
        </div>

        {/* Right: Expand Breakdown Button & How We Verify Link */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-sand">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sand bg-cream-50 hover:bg-cream-200 text-forest-900 font-semibold text-xs transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
            aria-expanded={expanded}
          >
            <span>{expanded ? 'Hide Score Breakdown' : 'View Score Breakdown'}</span>
            {expanded ? <ChevronUp className="w-4 h-4 text-forest-700" /> : <ChevronDown className="w-4 h-4 text-forest-700" />}
          </button>

          {onOpenHowWeVerify && (
            <button
              onClick={onOpenHowWeVerify}
              className="text-xs text-sage-700 hover:text-forest-900 font-medium underline inline-flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" />
              <span>How ForkTrace verifies this</span>
            </button>
          )}
        </div>

      </div>

      {/* Expandable Breakdown Drawer */}
      {expanded && (
        <div className="mt-6 pt-6 border-t border-sand/80 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
            <span>AUDITED PILLAR</span>
            <span>SCORE & WEIGHT</span>
          </div>

          <div className="space-y-3">
            {batch.scoreBreakdown.map((item, index) => (
              <div key={index} className="bg-cream-50 p-4 rounded-xl border border-sand/70">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sage-600" />
                    <span className="font-semibold text-sm text-forest-900">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted">Weight: {item.weight}</span>
                    <span className="font-mono text-sm font-bold text-forest-900 bg-white px-2 py-0.5 rounded border border-sand">
                      {item.score} / 100
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-sand/50 h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className="bg-forest-800 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.score}%` }}
                  />
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-sage-50 border border-sage-200 p-3.5 rounded-xl text-xs text-forest-800 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
            <p>
              <strong>Zero subjective marketing points:</strong> ForkTrace algorithms compute trace scores exclusively from cryptographically anchored records, lab certificates, and verified bank payouts.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
