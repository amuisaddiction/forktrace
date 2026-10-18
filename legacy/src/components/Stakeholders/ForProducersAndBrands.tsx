import React, { useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  FileCheck, 
  CheckCircle2, 
  Smartphone, 
  Coins, 
  ShieldCheck, 
  TrendingUp, 
  QrCode, 
  Sparkles,
  Layers
} from 'lucide-react';

export const ForProducersAndBrands: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'producers' | 'brands' | 'shoppers'>('producers');

  return (
    <section id="stakeholders-section" className="py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-forest-800 bg-cream-200 px-3 py-1 rounded-full border border-sand mb-3">
            <Layers className="w-3.5 h-3.5 text-coral-500" />
            <span>BUILT FOR THE WHOLE ECOSYSTEM</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight">
            Trust Should Be Easy to Verify.
          </h2>
          <p className="text-sm sm:text-base text-muted mt-3 leading-relaxed">
            Traceability fails when it's built only for corporate auditors. ForkTrace connects farmers, brands, and shoppers in one transparent, human loop.
          </p>

          {/* Interactive Audience Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-white rounded-2xl border border-sand shadow-sm max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('producers')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'producers'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-muted hover:text-forest-900'
              }`}
            >
              For Producers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('brands')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'brands'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-muted hover:text-forest-900'
              }`}
            >
              For Brands
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shoppers')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'shoppers'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-muted hover:text-forest-900'
              }`}
            >
              For Shoppers
            </button>
          </div>
        </div>

        {/* Tab 1: For Producers */}
        {activeTab === 'producers' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            
            <div className="bg-white rounded-3xl border border-sand p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-forest-800 mb-5">
                  <Smartphone className="w-6 h-6 text-sage-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  Zero-Friction Mobile Checkpoints
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Farmers and millers don't need complex ERPs. Log harvest weights, Brix sugar readings, and moisture logs directly via WhatsApp bots, offline-first PWA, or simple voice prompts.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand text-xs font-mono text-sage-700 font-medium">
                ✓ Works on basic Android devices in remote hills
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-sand p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-coral-100 flex items-center justify-center text-coral-700 mb-5">
                  <Coins className="w-6 h-6 text-coral-500" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  Earn Direct Recognition & Premiums
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  When sustainability is proven rather than assumed, buyers pay guaranteed premiums. Regenerative practices, water conservation, and shade-canopy upkeep translate into audited +18% to +24% higher farm-gate pay.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand text-xs font-mono text-coral-700 font-medium">
                ✓ Cryptographic escrow confirms direct payout
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-sand p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-forest-100 flex items-center justify-center text-forest-800 mb-5">
                  <ShieldCheck className="w-6 h-6 text-forest-700" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  Build Verifiable Producer Reputation
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Every batch certified on ForkTrace contributes to a persistent, grower-owned digital portfolio. Cooperatives can present verified quality history to global specialty buyers without predatory brokers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand text-xs font-mono text-forest-700 font-medium">
                ✓ Portable provenance history across harvest seasons
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: For Brands */}
        {activeTab === 'brands' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            
            <div className="bg-white rounded-3xl border border-sand p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-forest-100 flex items-center justify-center text-forest-800 mb-5">
                  <QrCode className="w-6 h-6 text-coral-500" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  Transform Packaging into an Experience
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Replace static barcode boxes with an emotional, interactive digital passport. Shoppers scan at the shelf or breakfast table to discover tasting notes, farmer faces, and exact harvest coordinates.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand text-xs font-mono text-forest-700 font-medium">
                ✓ Average engagement time: 2 min 40 sec per scan
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-sand p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-forest-800 mb-5">
                  <FileCheck className="w-6 h-6 text-sage-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  Automated Regulatory Compliance
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Prepare painlessly for the EU Deforestation Regulation (EUDR) and US FDA FSMA Rule 204. Geolocation polygon plots, harvest dates, and chain-of-custody records export in 1 click for customs inspection.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand text-xs font-mono text-sage-700 font-medium">
                ✓ 100% audit-ready documentation
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-sand p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-coral-100 flex items-center justify-center text-coral-700 mb-5">
                  <TrendingUp className="w-6 h-6 text-coral-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  Protect Against Greenwashing Claims
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  With regulatory crackdowns on vague "eco-friendly" buzzwords, ForkTrace gives marketing teams unassailable, mathematical proof for every carbon, water, and fair-pay claim on the box.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand text-xs font-mono text-coral-700 font-medium">
                ✓ Backed by ISO 14067 & SA8000 lab assays
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: For Shoppers */}
        {activeTab === 'shoppers' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
            
            <div className="bg-white rounded-3xl border border-sand p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-coral-100 flex items-center justify-center text-coral-700 mb-5">
                  <ShoppingBag className="w-6 h-6 text-coral-500" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  Shop with Unshakable Confidence
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Stop wondering if that "single origin" label is legitimate. See the exact mountain elevation, harvest date, and farmer collective in 3 seconds before buying.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand text-xs font-mono text-coral-700 font-medium">
                ✓ No app download needed — instant web scan
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-sand p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-forest-800 mb-5">
                  <Users className="w-6 h-6 text-sage-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  Meet the Hands That Fed You
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Connect emotionally with real growers like Ananya Gowda in Coorg. Read their words, hear their community story, and know your purchase supported fair compensation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand text-xs font-mono text-sage-700 font-medium">
                ✓ 42 farming families celebrated by name
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-sand p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-forest-100 flex items-center justify-center text-forest-800 mb-5">
                  <Sparkles className="w-6 h-6 text-forest-700" />
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  Vote with Every Dollar
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Rewarding brands that invest in closed-loop water systems and living wages transforms agriculture. Every scan sends a market signal that transparency matters.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sand text-xs font-mono text-forest-700 font-medium">
                ✓ 100% recyclable, verified packaging
              </div>
            </div>

          </div>
        )}

        {/* Big Contrast Narrative Banner */}
        <div className="mt-12 bg-forest-900 text-white rounded-3xl p-8 sm:p-12 shadow-retro-forest border border-forest-800 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-coral-400 font-bold block mb-3">
              THE CORE DIFFERENCE
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              "Traditional food systems hide the mess.<br />ForkTrace celebrates the care."
            </h3>
            <p className="text-sm sm:text-base text-sage-200 leading-relaxed mb-6">
              When a supply chain is opaque, the lowest bidder wins at the expense of soil, water, and human dignity. By turning traceability into a consumer superpower, ForkTrace makes ethics the most profitable choice for food brands.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-mono text-sage-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-coral-400" /> Zero Siloed Data
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-coral-400" /> Immutable Proofs
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-coral-400" /> Human Storytelling
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
