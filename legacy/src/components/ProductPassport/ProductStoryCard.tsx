import React from 'react';
import { Sparkles, Coffee, Flame, CupSoda, Mountain } from 'lucide-react';
import { BatchData } from '../../types/batch';

interface ProductStoryCardProps {
  batch: BatchData;
}

export const ProductStoryCard: React.FC<ProductStoryCardProps> = ({ batch }) => {
  const { productStory } = batch;

  return (
    <div className="bg-white rounded-3xl border border-sand p-6 sm:p-8 shadow-soft mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Narrative & Tasting Profile */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sage-600 bg-sage-100 px-2.5 py-0.5 rounded-full border border-sage-200">
              TERROIR & CUP PROFILE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 mt-2">
              Cultivated in Mist. Balanced in the Cup.
            </h3>
            <p className="text-sm text-muted leading-relaxed mt-3">
              {productStory.summary}
            </p>
          </div>

          {/* Tasting Notes Chips */}
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-800 block mb-2.5">
              Certified Cupping Notes:
            </span>
            <div className="flex flex-wrap gap-2">
              {productStory.notes.map((note, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream-200 border border-sand text-xs font-semibold text-forest-900 shadow-2xs hover:bg-coral-50 hover:border-coral-200 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-coral-500" />
                  <span>{note}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Technical Processing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-sand text-xs">
            <div className="p-3 bg-cream-50 rounded-xl border border-sand/70">
              <div className="flex items-center gap-1.5 text-sage-700 font-mono text-[11px] font-bold uppercase">
                <Mountain className="w-3.5 h-3.5" />
                <span>Elevation</span>
              </div>
              <p className="font-bold text-forest-900 mt-1">{batch.origin.elevation}</p>
              <p className="text-[11px] text-muted">Highland Microclimate</p>
            </div>

            <div className="p-3 bg-cream-50 rounded-xl border border-sand/70">
              <div className="flex items-center gap-1.5 text-sage-700 font-mono text-[11px] font-bold uppercase">
                <Coffee className="w-3.5 h-3.5" />
                <span>Processing</span>
              </div>
              <p className="font-bold text-forest-900 mt-1 truncate" title={productStory.processingMethod}>
                Washed & Sun-Dried
              </p>
              <p className="text-[11px] text-muted">Eco-Pulped Closed Loop</p>
            </div>

            <div className="p-3 bg-cream-50 rounded-xl border border-sand/70">
              <div className="flex items-center gap-1.5 text-sage-700 font-mono text-[11px] font-bold uppercase">
                <Flame className="w-3.5 h-3.5" />
                <span>Roast Profile</span>
              </div>
              <p className="font-bold text-forest-900 mt-1 truncate" title={productStory.roastProfile}>
                Medium-Light
              </p>
              <p className="text-[11px] text-muted">Solar Powered Drum</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted font-sans bg-cream-100 p-3 rounded-xl border border-sand/80">
            <CupSoda className="w-4 h-4 text-coral-500 shrink-0" />
            <span>
              <strong>Brewer's Recommendation:</strong> {productStory.recommendedBrew}
            </span>
          </div>
        </div>

        {/* High-Resolution Photography */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] shadow-md border-2 border-sand group">
            <img
              src={productStory.imageUrl}
              alt={batch.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent flex items-end p-5 text-white">
              <div className="flex items-center justify-between w-full">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-sage-300">
                    Harvest Lot Photo
                  </span>
                  <p className="font-serif text-sm font-semibold">{batch.origin.region}, Western Ghats</p>
                </div>
                <span className="font-mono text-xs bg-forest-900/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20 text-sage-200">
                  {batch.origin.gpsCoords}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
