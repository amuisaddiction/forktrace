import React from 'react';
import { MapPin, Users, HeartHandshake, Leaf } from 'lucide-react';
import { BatchData } from '../../types/batch';

interface ProvenanceStatsProps {
  batch: BatchData;
}

export const ProvenanceStats: React.FC<ProvenanceStatsProps> = ({ batch }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      
      {/* 1. Origin Card */}
      <div className="bg-white rounded-2xl border border-sand p-5 shadow-soft hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-sage-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-sage-600">
                VERIFIED ORIGIN
              </span>
              <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center text-sage-700">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-2xl font-bold text-forest-900 tracking-tight">
              {batch.origin.region}
            </div>
            <div className="text-xs text-muted mt-1">
              {batch.origin.state}, {batch.origin.country}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sand/80 flex items-center justify-between text-xs">
            <span className="font-mono text-forest-800 font-semibold bg-cream-200 px-2 py-0.5 rounded">
              ⛰ {batch.origin.elevation}
            </span>
            <span className="text-muted text-[11px] font-mono">{batch.origin.gpsCoords.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* 2. Producers Card */}
      <div className="bg-white rounded-2xl border border-sand p-5 shadow-soft hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-sage-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-sage-600">
                PRODUCERS
              </span>
              <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center text-sage-700">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-2xl font-bold text-forest-900 tracking-tight">
              {batch.producers.count} Farmers
            </div>
            <div className="text-xs text-muted mt-1 truncate" title={batch.producers.collectiveName}>
              {batch.producers.collectiveName}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sand/80 flex items-center justify-between text-xs">
            <span className="text-forest-800 font-medium">Direct Trade Union</span>
            <span className="text-sage-600 font-mono font-bold text-[11px]">100% Direct</span>
          </div>
        </div>
      </div>

      {/* 3. Fair Pay Card */}
      <div className="bg-white rounded-2xl border border-sand p-5 shadow-soft hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-coral-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-coral-600">
                FAIR PAY INDEX
              </span>
              <div className="w-8 h-8 rounded-lg bg-coral-100 flex items-center justify-center text-coral-600">
                <HeartHandshake className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-2xl font-bold text-forest-900 tracking-tight flex items-baseline gap-1">
              <span>+{batch.metrics.fairPayPercent}%</span>
              <span className="text-xs font-sans font-normal text-muted">premium</span>
            </div>
            <div className="text-xs text-muted mt-1">
              above local benchmark
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sand/80 flex items-center justify-between text-xs">
            <span className="text-forest-800 font-medium">Direct Bank Settlement</span>
            <span className="text-coral-600 font-mono font-bold text-[11px]">✓ Audited</span>
          </div>
        </div>
      </div>

      {/* 4. Carbon Footprint Card */}
      <div className="bg-white rounded-2xl border border-sand p-5 shadow-soft hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-sage-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110" />
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-sage-600">
                CARBON FOOTPRINT
              </span>
              <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center text-sage-700">
                <Leaf className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-2xl font-bold text-forest-900 tracking-tight">
              {batch.metrics.carbonKgPerPack} <span className="text-sm font-sans font-normal text-muted">kg CO₂e</span>
            </div>
            <div className="text-xs text-muted mt-1">
              per {batch.packSize}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sand/80 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-medium">
              -38% vs avg ({batch.metrics.carbonIndustryBenchmark} kg)
            </span>
            <span className="text-sage-600 font-mono font-bold text-[11px]">ISO 14067</span>
          </div>
        </div>
      </div>

    </div>
  );
};
