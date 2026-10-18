import React from 'react';
import { 
  PackageCheck, 
  Droplets, 
  Leaf, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Info
} from 'lucide-react';
import { BatchData } from '../../types/batch';

interface ImpactSectionProps {
  batch: BatchData;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ batch }) => {

  // Map icon strings to Lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case 'PackageCheck':
        return <PackageCheck className="w-5 h-5 text-coral-500" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-sky-500" />;
      case 'Leaf':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'HandCoins':
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-coral-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-forest-700" />;
      case 'CheckCircle2':
      default:
        return <CheckCircle2 className="w-5 h-5 text-sage-600" />;
    }
  };

  return (
    <section id="impact-section" className="py-16 sm:py-20 bg-sage-50/60 border-y border-sand/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-sage-700 bg-white px-3 py-1 rounded-full border border-sand shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-coral-500" />
            <span>REAL EVIDENCE · NO GREENWASHING</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight">
            Better Food, Backed by Proof.
          </h2>
          <p className="text-sm sm:text-base text-muted mt-3 leading-relaxed">
            Every impact claim is measured against accredited international standards, independent laboratory tests, and verifiable escrow payment records.
          </p>
        </div>

        {/* 6 Core Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batch.sustainabilityFacts.map((fact, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-sand p-6 shadow-soft hover:shadow-lifted transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center border border-sand group-hover:scale-105 transition-transform">
                    {getIcon(fact.icon)}
                  </div>
                  <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Claim
                  </span>
                </div>

                {/* Primary Metric Number */}
                <div className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 tracking-tight mb-1">
                  {fact.metric}
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-base text-forest-800 mb-2">
                  {fact.title}
                </h3>

                {/* Simple Language Explanation */}
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {fact.explanation}
                </p>
              </div>

              {/* Bottom Verification Source */}
              <div className="mt-5 pt-4 border-t border-sand/70">
                <div className="flex items-start gap-2 text-[11px] font-mono text-muted bg-cream-50 p-2.5 rounded-xl border border-sand/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-forest-800 font-semibold truncate">
                      {fact.verificationMethod.split('#')[0]}
                    </span>
                    <span className="text-muted block text-[10px]">
                      Record #{fact.verificationMethod.split('#')[1] || 'VERIFIED'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Transparent Standards Callout */}
        <div className="mt-12 bg-white rounded-3xl border border-sand p-6 sm:p-8 shadow-soft flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-forest-800 flex items-center justify-center text-white shrink-0">
              <Info className="w-6 h-6 text-coral-400" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-forest-900">
                Our Non-Negotiable Transparency Standard
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-0.5 max-w-2xl leading-relaxed">
                ForkTrace explicitly prohibits unverified carbon credits, self-declared fair pay, and unverifiable claims. All metrics require third-party audit trail proofs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="font-mono text-xs text-forest-800 bg-cream-200 px-3.5 py-2 rounded-xl border border-sand flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>EUDR & FSMA 204 Ready</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
