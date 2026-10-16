import React, { useState } from 'react';
import { TimelineEventCard } from './TimelineEventCard';
import { SupplyRouteMap } from './SupplyRouteMap';
import { BatchData, TimelineEvent } from '../../types/batch';
import { Route, CheckCheck, ChevronsUpDown } from 'lucide-react';

interface SupplyChainTimelineProps {
  batch: BatchData;
  onOpenProofModal: (event: TimelineEvent) => void;
}

export const SupplyChainTimeline: React.FC<SupplyChainTimelineProps> = ({
  batch,
  onOpenProofModal,
}) => {
  // Track open state for each event ID. By default, open the first event (Harvest) and the last (Retail)
  const [openEventIds, setOpenEventIds] = useState<Record<string, boolean>>({
    'event-1': true,
    'event-5': true,
    'tea-event-1': true,
  });

  const allOpen = batch.timeline.every((e) => openEventIds[e.id]);

  const toggleAll = () => {
    if (allOpen) {
      setOpenEventIds({});
    } else {
      const all: Record<string, boolean> = {};
      batch.timeline.forEach((e) => {
        all[e.id] = true;
      });
      setOpenEventIds(all);
    }
  };

  const toggleEvent = (id: string) => {
    setOpenEventIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="timeline-section" className="py-12 sm:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-sand">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-sage-600 mb-2">
              <Route className="w-4 h-4 text-sage-600" />
              <span>SUPPLY-CHAIN JOURNEY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 tracking-tight">
              From Hillside to Home
            </h2>
            <p className="text-sm text-muted max-w-xl mt-1 leading-relaxed">
              Every stage was independently verified and cryptographically stamped with time, location, and handler credentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleAll}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-sand bg-white hover:bg-cream-200 text-forest-800 font-semibold text-xs transition-colors shadow-2xs"
            >
              <ChevronsUpDown className="w-4 h-4 text-forest-700" />
              <span>{allOpen ? 'Collapse All Stages' : 'Expand All Stages'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Left = Timeline, Right = Map Route & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Interactive Timeline Items */}
          <div className="lg:col-span-7">
            <ol className="relative" aria-label="Supply Chain Milestones">
              {batch.timeline.map((event, index) => (
                <TimelineEventCard
                  key={event.id}
                  event={event}
                  isOpen={!!openEventIds[event.id]}
                  onToggle={() => toggleEvent(event.id)}
                  onOpenProofModal={onOpenProofModal}
                  index={index}
                  totalEvents={batch.timeline.length}
                />
              ))}
            </ol>
          </div>

          {/* Right: Map Visual & Quick Checkpoint Stats */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <SupplyRouteMap route={batch.route} />

            {/* Quick Summary Box */}
            <div className="bg-white p-5 rounded-2xl border border-sand shadow-soft">
              <div className="flex items-center gap-2 mb-2">
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-serif font-bold text-forest-900 text-base">
                  Chain-of-Custody Integrity Guarantee
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Zero custody gaps: The handoff from Kodagu Growers Collective to the Cauvery Wet Mill, Bengaluru Roastery, and Retail partner used dual-party cryptographic handshakes.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
