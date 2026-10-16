import React from 'react';
import { 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  UserCheck, 
  FileText, 
  Activity, 
  ExternalLink
} from 'lucide-react';
import { TimelineEvent } from '../../types/batch';

interface TimelineEventCardProps {
  event: TimelineEvent;
  isOpen: boolean;
  onToggle: () => void;
  onOpenProofModal: (event: TimelineEvent) => void;
  index: number;
  totalEvents: number;
}

export const TimelineEventCard: React.FC<TimelineEventCardProps> = ({
  event,
  isOpen,
  onToggle,
  onOpenProofModal,
  index,
  totalEvents,
}) => {
  return (
    <li className="relative pl-6 sm:pl-10 pb-8 last:pb-2 group">
      {/* Vertical line connecting events */}
      {index < totalEvents - 1 && (
        <div 
          className={`absolute left-[11px] sm:left-[19px] top-6 bottom-0 w-0.5 transition-colors ${
            isOpen ? 'bg-coral-400' : 'bg-sand'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Timeline Dot Indicator */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} checkpoint: ${event.title}`}
        className={`absolute left-0 sm:left-2 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          isOpen
            ? 'bg-coral-500 border-coral-500 text-white scale-110 shadow-sm'
            : 'bg-white border-sage-600 text-sage-600 group-hover:border-forest-800'
        }`}
      >
        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-white' : 'bg-sage-600'}`} />
      </button>

      {/* Card Header / Summary Trigger */}
      <div 
        onClick={onToggle}
        className={`bg-white rounded-2xl border transition-all cursor-pointer p-4 sm:p-5 ${
          isOpen 
            ? 'border-forest-800/40 shadow-soft ring-1 ring-forest-800/10' 
            : 'border-sand hover:border-forest-800/20 hover:shadow-2xs'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-4">
          
          <div className="flex-1">
            {/* Date & Location Pill */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded border border-coral-200">
                {event.date}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted font-medium">
                <MapPin className="w-3 h-3 text-muted" />
                <span className="truncate max-w-[220px] sm:max-w-none">{event.location}</span>
              </span>
            </div>

            {/* Title & Actor */}
            <h4 className="font-serif text-lg sm:text-xl font-bold text-forest-900 leading-snug">
              {event.title}
            </h4>

            <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
              {event.summary}
            </p>
          </div>

          {/* Right Action: Record ID & Chevron */}
          <div className="flex items-center gap-3 shrink-0 pt-1">
            <span className="hidden sm:inline-block font-mono text-[11px] text-muted bg-cream-100 px-2.5 py-1 rounded-md border border-sand">
              #{event.proof.recordId}
            </span>
            <div className={`p-1.5 rounded-lg transition-transform ${isOpen ? 'rotate-180 bg-cream-200' : 'bg-cream-100'}`}>
              <ChevronDown className="w-4 h-4 text-forest-800" />
            </div>
          </div>

        </div>

        {/* Expanded Detailed Section */}
        {isOpen && (
          <div className="mt-5 pt-5 border-t border-sand/80 space-y-4 animate-fadeIn">
            
            {/* Description */}
            <p className="text-sm text-forest-800 leading-relaxed bg-cream-50/70 p-3.5 rounded-xl border border-sand/60">
              {event.description}
            </p>

            {/* People Involved & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cream-100/60 border border-sand/60">
                <UserCheck className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] text-muted uppercase block">Responsible Actor</span>
                  <strong className="text-forest-900 block font-medium">{event.actor}</strong>
                  <span className="text-muted text-[11px]">{event.actorRole}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cream-100/60 border border-sand/60">
                <ShieldCheck className="w-4 h-4 text-coral-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] text-muted uppercase block">Auditing Body</span>
                  <strong className="text-forest-900 block font-medium">{event.proof.verifiedBy}</strong>
                  <span className="text-muted text-[11px]">Inspector: {event.proof.inspectorName || 'Automated Node'}</span>
                </div>
              </div>
            </div>

            {/* Sensor & Assay Telemetry (if available) */}
            {event.proof.sensorData && (
              <div className="bg-sage-50/70 p-4 rounded-xl border border-sage-200">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sage-800 uppercase mb-2.5">
                  <Activity className="w-3.5 h-3.5 text-sage-600" />
                  <span>Telemetry & Sensor Proofs</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {Object.entries(event.proof.sensorData).map(([key, val]) => (
                    <div key={key} className="bg-white p-2.5 rounded-lg border border-sage-200/60">
                      <span className="text-[10px] font-mono text-muted block uppercase truncate">{key}</span>
                      <span className="font-bold font-mono text-forest-900 block text-xs mt-0.5">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Impact Metric Chips */}
            {event.impactMetrics.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {event.impactMetrics.map((metric, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cream-200 rounded-lg text-xs border border-sand">
                    <span className="text-muted">{metric.label}:</span>
                    <strong className="text-forest-900 font-mono">{metric.value}</strong>
                    <span className="text-[10px] text-muted">({metric.detail})</span>
                  </div>
                ))}
              </div>
            )}

            {/* Verification Proof Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-sand/70 text-xs">
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
                <span>Proof Hash:</span>
                <span className="bg-cream-100 px-2 py-0.5 rounded border border-sand text-forest-800">
                  {event.proof.signatureHash}
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Dual-Signed
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProofModal(event);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-medium text-xs transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-coral-400" />
                <span>View Full Verification Record</span>
                <ExternalLink className="w-3 h-3 text-sage-300 ml-0.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </li>
  );
};
