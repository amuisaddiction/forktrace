import React from 'react';
import { Quote, HeartHandshake, CheckCircle2, Building2, ShieldCheck } from 'lucide-react';
import { BatchData } from '../../types/batch';

interface FarmerStoryCardProps {
  batch: BatchData;
}

export const FarmerStoryCard: React.FC<FarmerStoryCardProps> = ({ batch }) => {
  const { producers } = batch;

  return (
    <div className="bg-white rounded-3xl border border-sand p-6 sm:p-8 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-coral-600 bg-coral-50 px-2.5 py-0.5 rounded-full border border-coral-200">
            THE PEOPLE BEHIND THE HARVEST
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 mt-1.5">
            {producers.collectiveName}
          </h3>
        </div>
        <span className="font-mono text-xs text-muted hidden sm:inline-block">
          {producers.count} generational families
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Photo Column */}
        <div className="md:col-span-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md border-2 border-sand">
            <img
              src={producers.photoUrl}
              alt={`${producers.leadFarmerName} from ${producers.collectiveName}`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <span className="font-mono text-[10px] text-sage-300 uppercase tracking-widest">
                Lead Grower
              </span>
              <p className="font-serif text-lg font-bold">{producers.leadFarmerName}</p>
              <p className="text-xs text-sage-200">Somwarpet Hills, Coorg</p>
            </div>
          </div>
        </div>

        {/* Narrative & Fair Pay Column */}
        <div className="md:col-span-8 flex flex-col justify-between h-full space-y-4">
          {/* Quote */}
          <div className="bg-cream-100 p-5 rounded-2xl border border-sand/80 relative">
            <Quote className="w-8 h-8 text-coral-300 absolute -top-3 -left-2 opacity-50" />
            <p className="font-serif text-base sm:text-lg italic text-forest-900 relative z-10 leading-relaxed pl-3">
              "{producers.leadFarmerQuote}"
            </p>
            <div className="mt-3 pl-3 text-xs font-mono text-muted flex items-center gap-2">
              <span>— {producers.leadFarmerName}, Kodagu Growers Collective</span>
            </div>
          </div>

          {/* Collective Story */}
          <p className="text-sm text-muted leading-relaxed">
            {producers.communityStory}
          </p>

          {/* Fair Pay Direct Verification Badge */}
          <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sage-600 flex items-center justify-center text-white shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-forest-900">Direct Escrow Transfer Confirmed</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-xs text-muted">
                  {batch.producers.fairPayBenchmark}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="font-mono text-[10px] text-muted block uppercase">Bank Ledger Ref</span>
              <span className="font-mono text-xs font-bold text-forest-800 bg-white px-2 py-0.5 rounded border border-sand">
                {producers.directTransferConfirmationId}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 text-forest-800">
              <Building2 className="w-4 h-4 text-sage-600 shrink-0" />
              <span>{producers.collectiveModel}</span>
            </div>
            <div className="flex items-center gap-2 text-forest-800">
              <ShieldCheck className="w-4 h-4 text-coral-500 shrink-0" />
              <span>0% Intermediary Fee Deductions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

