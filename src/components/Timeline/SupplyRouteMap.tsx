import React, { useState } from 'react';
import { MapPin, Compass, Truck } from 'lucide-react';
import { RouteCheckpoint } from '../../types/batch';

interface SupplyRouteMapProps {
  route: RouteCheckpoint[];
}

export const SupplyRouteMap: React.FC<SupplyRouteMapProps> = ({ route }) => {
  const [selectedPoint, setSelectedPoint] = useState<RouteCheckpoint | null>(route[0] || null);

  return (
    <div className="bg-forest-900 text-white rounded-3xl p-6 sm:p-7 shadow-lifted border border-forest-700 relative overflow-hidden flex flex-col justify-between">
      
      {/* Top Map Header */}
      <div>
        <div className="flex items-center justify-between border-b border-forest-800 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-coral-400" />
            <span className="font-mono text-xs uppercase tracking-wider text-sage-200 font-semibold">
              GEOLOCATED SUPPLY ROUTE
            </span>
          </div>
          <span className="text-[11px] font-mono text-sage-300 bg-forest-800 px-2 py-0.5 rounded border border-forest-700">
            ~258 km Total Transit
          </span>
        </div>

        <p className="text-xs text-sage-200/90 leading-relaxed mb-4">
          Verified GPS transit trail from hillside plantation through processing & roasting to urban retail destination.
        </p>
      </div>

      {/* SVG Canvas Map Visual */}
      <div className="relative w-full h-56 sm:h-64 bg-forest-950/70 rounded-2xl border border-forest-800/80 p-4 overflow-hidden my-2 flex items-center justify-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 map-grid-pattern opacity-40 pointer-events-none" />

        {/* Ambient glow in corner */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-coral-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Topographic elevation curves simulation in SVG */}
        <svg viewBox="0 0 400 240" className="w-full h-full relative z-10 overflow-visible">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5b8266" />
              <stop offset="50%" stopColor="#ed7252" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Contour elevation background lines */}
          <path
            d="M 10 200 C 60 160, 110 220, 180 180 S 300 130, 390 100"
            fill="none"
            stroke="#20453a"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 10 140 C 90 90, 160 150, 240 100 S 340 70, 390 40"
            fill="none"
            stroke="#1c3e34"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Main Transit Path connecting Coorg to Bengaluru */}
          {/* Points: cp1(60, 180) -> cp2(130, 150) -> cp3(230, 105) -> cp4(300, 80) -> cp5(355, 55) */}
          <path
            d="M 60 185 C 95 165, 110 155, 135 150 S 200 120, 230 105 S 275 90, 300 80 S 335 65, 355 55"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="6 4"
            className="animate-pulse"
          />

          {/* Interactive Checkpoint Markers */}
          {/* CP 1: Coorg Highlands */}
          <g 
            className="cursor-pointer group" 
            onClick={() => setSelectedPoint(route[0])}
            tabIndex={0}
            role="button"
            aria-label="Coorg Highlands"
          >
            <circle cx="60" cy="185" r="14" fill="#287053" fillOpacity="0.25" className="animate-ping" />
            <circle cx="60" cy="185" r="8" fill="#17332C" stroke="#287053" strokeWidth="3" />
            <circle cx="60" cy="185" r="3" fill="#ffffff" />
            <text x="60" y="212" textAnchor="middle" fill="#d5e0d1" fontSize="10" fontFamily="DM Mono" fontWeight="bold">
              Coorg (Origin)
            </text>
            <text x="60" y="224" textAnchor="middle" fill="#8fad87" fontSize="8" fontFamily="Plus Jakarta Sans">
              2,100 m
            </text>
          </g>

          {/* CP 2: Madikeri Wet Mill */}
          <g 
            className="cursor-pointer group" 
            onClick={() => setSelectedPoint(route[1])}
            tabIndex={0}
            role="button"
            aria-label="Madikeri Eco-Station"
          >
            <circle cx="135" cy="150" r="6" fill="#17332C" stroke="#5b8266" strokeWidth="2.5" />
            <circle cx="135" cy="150" r="2.5" fill="#fbaea0" />
            <text x="135" y="136" textAnchor="middle" fill="#8fad87" fontSize="9" fontFamily="DM Mono">
              Madikeri
            </text>
          </g>

          {/* CP 3: Bengaluru Roastery */}
          <g 
            className="cursor-pointer group" 
            onClick={() => setSelectedPoint(route[2])}
            tabIndex={0}
            role="button"
            aria-label="Bengaluru Roastery"
          >
            <circle cx="230" cy="105" r="14" fill="#ed7252" fillOpacity="0.2" className="animate-ping" />
            <circle cx="230" cy="105" r="8" fill="#17332C" stroke="#ed7252" strokeWidth="3" />
            <circle cx="230" cy="105" r="3" fill="#ffffff" />
            <text x="230" y="88" textAnchor="middle" fill="#fed5ca" fontSize="10" fontFamily="DM Mono" fontWeight="bold">
              Roastery (BLR)
            </text>
            <text x="230" y="99" textAnchor="middle" fill="#8fad87" fontSize="8" fontFamily="Plus Jakarta Sans">
              920 m
            </text>
          </g>

          {/* CP 4: Logistics Hub */}
          <g 
            className="cursor-pointer group" 
            onClick={() => setSelectedPoint(route[3])}
            tabIndex={0}
            role="button"
            aria-label="Whitefield Logistics Hub"
          >
            <circle cx="300" cy="80" r="6" fill="#17332C" stroke="#5b8266" strokeWidth="2.5" />
            <circle cx="300" cy="80" r="2" fill="#38bdf8" />
            <text x="300" y="68" textAnchor="middle" fill="#8fad87" fontSize="9" fontFamily="DM Mono">
              EV Hub
            </text>
          </g>

          {/* CP 5: Retail Partner Store */}
          <g 
            className="cursor-pointer group" 
            onClick={() => setSelectedPoint(route[4])}
            tabIndex={0}
            role="button"
            aria-label="Retail Store"
          >
            <circle cx="355" cy="55" r="14" fill="#38bdf8" fillOpacity="0.3" className="animate-ping" />
            <circle cx="355" cy="55" r="9" fill="#17332C" stroke="#38bdf8" strokeWidth="3" />
            <circle cx="355" cy="55" r="3.5" fill="#ffffff" />
            <text x="355" y="40" textAnchor="middle" fill="#bae6fd" fontSize="10" fontFamily="DM Mono" fontWeight="bold">
              Retail Store
            </text>
            <text x="355" y="50" textAnchor="middle" fill="#8fad87" fontSize="8" fontFamily="Plus Jakarta Sans">
              Indiranagar
            </text>
          </g>
        </svg>

        {/* Legend in corner */}
        <div className="absolute bottom-2 left-2 bg-forest-900/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono text-sage-300 border border-forest-800 flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sage-500" /> Origin
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-coral-500" /> Roastery
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-400" /> Shelf
          </span>
        </div>
      </div>

      {/* Selected Node Details Box */}
      {selectedPoint && (
        <div className="mt-4 p-4 rounded-xl bg-forest-800/90 border border-forest-700 transition-all">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-coral-400 font-bold uppercase">{selectedPoint.role}</span>
            <span className="font-mono text-sage-300 text-[11px]">{selectedPoint.date}</span>
          </div>
          <h4 className="font-serif text-base font-bold text-white">
            {selectedPoint.name}
          </h4>
          <p className="text-xs text-sage-200 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-coral-400 shrink-0" />
            <span>{selectedPoint.location}</span>
          </p>
        </div>
      )}

      {/* Transit Carbon Metric */}
      <div className="mt-4 pt-3 border-t border-forest-800 flex items-center justify-between text-xs text-sage-300">
        <div className="flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-coral-400" />
          <span>Electric Fleet Transit</span>
        </div>
        <span className="font-mono font-bold text-emerald-400">44 kg CO₂e Saved</span>
      </div>

    </div>
  );
};
