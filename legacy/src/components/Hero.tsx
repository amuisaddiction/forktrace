import React, { useState } from 'react';
import { ArrowRight, QrCode, ShieldCheck, Search, Sparkles, MapPin, Coffee } from 'lucide-react';
import { DEMO_BATCH_ID } from '../data/batches';

interface HeroProps {
  onSearchBatch: (code: string) => void;
  onOpenQRScanner: () => void;
  isLoading: boolean;
  activeBatchCode: string;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchBatch,
  onOpenQRScanner,
  isLoading,
  activeBatchCode,
}) => {
  const [inputValue, setInputValue] = useState(DEMO_BATCH_ID);
  const [inputError, setInputError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setInputError(true);
      return;
    }
    setInputError(false);
    onSearchBatch(inputValue.trim().toUpperCase());
  };

  const handleChipClick = (code: string) => {
    setInputValue(code);
    setInputError(false);
    onSearchBatch(code);
  };

  return (
    <section id="trace-hero" className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-sage-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 -z-10 w-80 h-80 bg-coral-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description, Lookup Input */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage-100 border border-sage-300 text-forest-800 text-xs font-mono font-medium w-fit mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sage-600 animate-pulse" />
              <span>FOOD YOU CAN VERIFY · REAL-TIME PROVENANCE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-forest-900 tracking-tight leading-[1.08] mb-6">
              Know the journey<br />
              behind <em className="text-coral-500 not-italic italic font-normal">every bite.</em>
            </h1>

            {/* Short Explanation */}
            <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed mb-8">
              Scan a product, meet the people behind it, and see the verified path from hillside harvest to store shelf. Powered by cryptographic chain-of-custody proofs, fair-pay audits, and verified carbon metrics.
            </p>

            {/* Search / Lookup Box */}
            <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-sand shadow-lifted max-w-xl mb-4 transition-all focus-within:border-forest-800 focus-within:ring-2 focus-within:ring-forest-800/10">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 flex items-center">
                  <div className="absolute left-3.5 text-muted pointer-events-none">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      if (inputError) setInputError(false);
                    }}
                    placeholder="Enter Batch ID (e.g. FT-COF-2407)"
                    aria-label="Enter product batch ID to trace"
                    className={`w-full pl-11 pr-4 py-3 text-sm sm:text-base font-mono bg-cream-50 rounded-xl text-forest-900 placeholder:text-muted/60 border ${
                      inputError ? 'border-coral-500 bg-coral-50/30' : 'border-transparent'
                    } focus:outline-none transition-colors`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3.5 bg-forest-800 hover:bg-forest-900 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow active:scale-[0.98] disabled:opacity-75 disabled:cursor-wait"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Trace it</span>
                      <ArrowRight className="w-4 h-4 text-coral-400" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Demo code quick links */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted mb-8 max-w-xl">
              <span className="font-mono text-forest-800 font-semibold">Try sample batches:</span>
              <button
                type="button"
                onClick={() => handleChipClick(DEMO_BATCH_ID)}
                className={`px-2.5 py-1 rounded-md font-mono border transition-all ${
                  activeBatchCode === DEMO_BATCH_ID
                    ? 'bg-forest-800 text-white border-forest-800'
                    : 'bg-white text-forest-800 border-sand hover:border-forest-800'
                }`}
              >
                ☕ {DEMO_BATCH_ID} (Highland Coffee)
              </button>
              <button
                type="button"
                onClick={() => handleChipClick('FT-TEA-1082')}
                className={`px-2.5 py-1 rounded-md font-mono border transition-all ${
                  activeBatchCode === 'FT-TEA-1082'
                    ? 'bg-forest-800 text-white border-forest-800'
                    : 'bg-white text-forest-800 border-sand hover:border-forest-800'
                }`}
              >
                🍵 FT-TEA-1082 (Darjeeling Tea)
              </button>
              <button
                type="button"
                onClick={() => handleChipClick('FT-TEST-ERR')}
                className="px-2.5 py-1 rounded-md font-mono bg-cream-200 text-coral-700 border border-coral-200 hover:bg-coral-100 transition-all"
                title="Test how invalid codes show friendly error state"
              >
                ⚡ Test Invalid Code
              </button>
            </div>

            {/* Value props micro-cards */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-sand/80 max-w-xl">
              <div>
                <p className="font-mono text-xs text-coral-600 font-bold uppercase tracking-wider">Shoppers</p>
                <p className="text-xs text-forest-800 font-medium mt-0.5">Zero greenwashing. Real facts in 3 seconds.</p>
              </div>
              <div>
                <p className="font-mono text-xs text-sage-600 font-bold uppercase tracking-wider">Farmers</p>
                <p className="text-xs text-forest-800 font-medium mt-0.5">Recognition & direct +18% fair-pay premium.</p>
              </div>
              <div>
                <p className="font-mono text-xs text-forest-600 font-bold uppercase tracking-wider">Brands</p>
                <p className="text-xs text-forest-800 font-medium mt-0.5">EUDR & FSMA 204 audit readiness ready.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visually Strong Hero Card / QR Simulation Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Backing retro shadow card */}
              <div className="absolute inset-0 bg-sage-200 rounded-3xl translate-x-3 translate-y-3 -rotate-1 transition-transform" />

              {/* Main premium dark card */}
              <div className="relative bg-forest-800 text-white p-7 sm:p-8 rounded-3xl shadow-2xl border border-forest-700">
                
                {/* Card Top Header */}
                <div className="flex items-center justify-between border-b border-forest-700/80 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-coral-400" />
                    <span className="font-mono text-xs tracking-wider text-sage-200 font-medium uppercase">
                      CRYPTOGRAPHIC PASSPORT
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-forest-700 text-sage-300 px-2 py-0.5 rounded-full border border-forest-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Live Ledger
                  </span>
                </div>

                {/* QR Code Container with interactive hover & click */}
                <div 
                  onClick={onOpenQRScanner}
                  className="group relative cursor-pointer bg-white p-5 rounded-2xl flex flex-col items-center justify-center text-forest-900 transition-all hover:scale-[1.02] shadow-inner"
                  role="button"
                  tabIndex={0}
                  aria-label="Click to scan product QR code"
                >
                  <div className="relative w-48 h-48 sm:w-52 sm:h-52 bg-cream-50 rounded-xl p-3 border-2 border-forest-800/20 flex items-center justify-center overflow-hidden">
                    {/* Simulated SVG QR code with ForkTrace crest in the center */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-forest-900">
                      {/* Corner markers */}
                      <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="11" y="11" width="14" height="14" rx="2" fill="currentColor" />
                      
                      <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="75" y="11" width="14" height="14" rx="2" fill="currentColor" />

                      <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="11" y="75" width="14" height="14" rx="2" fill="currentColor" />

                      {/* Pattern dots */}
                      <rect x="37" y="7" width="5" height="5" fill="currentColor" />
                      <rect x="47" y="7" width="5" height="5" fill="currentColor" />
                      <rect x="57" y="7" width="5" height="5" fill="currentColor" />
                      
                      <rect x="37" y="17" width="5" height="5" fill="currentColor" />
                      <rect x="57" y="17" width="5" height="5" fill="currentColor" />
                      
                      <rect x="7" y="37" width="5" height="5" fill="currentColor" />
                      <rect x="17" y="37" width="5" height="5" fill="currentColor" />
                      <rect x="27" y="37" width="5" height="5" fill="currentColor" />
                      
                      <rect x="37" y="37" width="26" height="26" rx="4" fill="#17332C" />
                      <text x="50" y="53" textAnchor="middle" fill="#ED7252" fontSize="11" fontWeight="bold" fontFamily="Playfair Display">FT</text>
                      
                      <rect x="69" y="37" width="5" height="5" fill="currentColor" />
                      <rect x="79" y="37" width="5" height="5" fill="currentColor" />
                      <rect x="89" y="37" width="5" height="5" fill="currentColor" />

                      <rect x="37" y="69" width="5" height="5" fill="currentColor" />
                      <rect x="47" y="69" width="5" height="5" fill="currentColor" />
                      <rect x="57" y="69" width="5" height="5" fill="currentColor" />
                      <rect x="69" y="69" width="5" height="5" fill="currentColor" />
                      <rect x="79" y="79" width="5" height="5" fill="currentColor" />
                      <rect x="89" y="89" width="5" height="5" fill="currentColor" />
                    </svg>

                    {/* Animated scan line overlay */}
                    <div className="absolute inset-x-0 h-1 bg-coral-500 shadow-[0_0_8px_#ed7252] animate-bounce opacity-80 pointer-events-none" />
                  </div>

                  {/* QR overlay button on hover */}
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-forest-800 group-hover:text-coral-600 transition-colors">
                    <QrCode className="w-4 h-4" />
                    <span>Click to launch Camera / QR Scanner</span>
                  </div>
                </div>

                {/* Batch meta bar */}
                <div className="mt-5 pt-4 border-t border-forest-700">
                  <div className="flex items-center justify-between text-xs font-mono text-sage-300">
                    <span>BATCH CODE:</span>
                    <span className="font-bold text-coral-400 bg-forest-900 px-2 py-0.5 rounded border border-forest-700">
                      {DEMO_BATCH_ID}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-sage-200">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-coral-400" />
                      <span>Coorg (2,100 m)</span>
                    </div>
                    <div className="flex-1 mx-3 border-t border-dashed border-forest-600 relative">
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-forest-900 border border-coral-400 flex items-center justify-center">
                        <div className="w-1 h-1 bg-coral-400 rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coffee className="w-3.5 h-3.5 text-sage-300" />
                      <span>Retail Cup</span>
                    </div>
                  </div>
                </div>

                {/* Instant View Demo CTA */}
                <button
                  type="button"
                  onClick={() => onSearchBatch(DEMO_BATCH_ID)}
                  className="mt-5 w-full py-2.5 px-4 bg-coral-500 hover:bg-coral-600 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Inspect Highland Arabica Passport</span>
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
