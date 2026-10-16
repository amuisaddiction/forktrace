import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  Timer, 
  CheckCircle2, 
  Coffee,
  Zap
} from 'lucide-react';
import { DEMO_BATCH_ID } from '../../data/batches';

interface JudgesDemoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBatch: (code: string) => void;
  onOpenQRScanner: () => void;
}

export const JudgesDemoDrawer: React.FC<JudgesDemoDrawerProps> = ({
  isOpen,
  onClose,
  onSelectBatch,
  onOpenQRScanner,
}) => {
  const [activeTab, setActiveTab] = useState<'pitch' | 'wins' | 'architecture'>('pitch');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="judges-drawer-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl border border-sand relative overflow-y-auto max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted hover:text-forest-900 hover:bg-cream-200 transition-colors"
          aria-label="Close judges guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-coral-50 border border-coral-200 flex items-center justify-center text-coral-600">
            <Trophy className="w-6 h-6 text-coral-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-coral-600 font-bold bg-coral-50 px-2 py-0.5 rounded border border-coral-200">
                HACKATHON JUDGING KIT
              </span>
              <span className="font-mono text-xs text-muted">60-Second Tour</span>
            </div>
            <h3 id="judges-drawer-title" className="font-serif text-2xl font-bold text-forest-900">
              Why ForkTrace Wins
            </h3>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-sand pb-3 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('pitch')}
            className={`pb-2 px-3 border-b-2 transition-all ${
              activeTab === 'pitch'
                ? 'border-forest-800 text-forest-900 font-bold'
                : 'border-transparent text-muted hover:text-forest-800'
            }`}
          >
            60s Demo Script
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wins')}
            className={`pb-2 px-3 border-b-2 transition-all ${
              activeTab === 'wins'
                ? 'border-forest-800 text-forest-900 font-bold'
                : 'border-transparent text-muted hover:text-forest-800'
            }`}
          >
            Why It Wins
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`pb-2 px-3 border-b-2 transition-all ${
              activeTab === 'architecture'
                ? 'border-forest-800 text-forest-900 font-bold'
                : 'border-transparent text-muted hover:text-forest-800'
            }`}
          >
            Tech Architecture
          </button>
        </div>

        {/* Tab 1: 60-Second Demo Pitch */}
        {activeTab === 'pitch' && (
          <div className="space-y-4 text-xs sm:text-sm text-forest-800 leading-relaxed">
            <div className="bg-cream-100 p-4 rounded-2xl border border-sand">
              <div className="flex items-center gap-2 text-coral-600 font-mono text-xs font-bold uppercase mb-2">
                <Timer className="w-4 h-4" />
                <span>The 60-Second Pitch for Judges</span>
              </div>
              <p className="italic font-serif text-base text-forest-900 leading-relaxed">
                "Judges, every year millions of consumers pay a premium for 'sustainable' food, yet 74% of green claims are unverifiable or outright greenwashing. Meanwhile, generational farmers receive less than 7% of retail value."
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-sand">
                <strong className="text-forest-900 block font-sans">0:00 - 0:15 | The Problem & The Solution</strong>
                <p className="text-muted text-xs mt-0.5">
                  ForkTrace turns food packaging into an authentic digital passport. Enter or scan batch code <code className="font-mono text-coral-600 font-bold">{DEMO_BATCH_ID}</code>.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-sand">
                <strong className="text-forest-900 block font-sans">0:15 - 0:35 | The Verified Product Passport</strong>
                <p className="text-muted text-xs mt-0.5">
                  See the verified origin in Coorg at 2,100 m elevation, meet lead farmer Ananya Gowda and the 42 families of the Kodagu Growers Collective, and verify their audited +18% fair-pay bank settlement.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-sand">
                <strong className="text-forest-900 block font-sans">0:35 - 0:50 | Interactive Supply Journey & Map</strong>
                <p className="text-muted text-xs mt-0.5">
                  Expand each of the 5 verified milestones from harvest to eco-pulper to solar roasting in Bengaluru to retail shelf. Each has dual cryptographic signatures and lab telemetry.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-sand">
                <strong className="text-forest-900 block font-sans">0:50 - 1:00 | Business Model & Compliance Value</strong>
                <p className="text-muted text-xs mt-0.5">
                  ForkTrace automates EUDR (EU Deforestation Regulation) and FDA FSMA 204 compliance for food brands while giving farmers direct market recognition.
                </p>
              </div>
            </div>

            {/* Quick Action buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onSelectBatch(DEMO_BATCH_ID);
                  onClose();
                }}
                className="px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Coffee className="w-3.5 h-3.5 text-coral-400" />
                <span>Run Demo Batch: {DEMO_BATCH_ID}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenQRScanner();
                }}
                className="px-4 py-2.5 bg-cream-200 hover:bg-cream-300 text-forest-900 rounded-xl text-xs font-semibold border border-sand flex items-center gap-1.5 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-coral-500" />
                <span>Test Live QR Scanner</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Why It Wins */}
        {activeTab === 'wins' && (
          <div className="space-y-4 text-xs sm:text-sm text-forest-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-cream-50 rounded-2xl border border-sand">
                <div className="flex items-center gap-2 text-forest-900 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real-World Impact</span>
                </div>
                <p className="text-muted text-xs leading-relaxed">
                  Direct +18% bank payout to smallholder farmers and verified 82% water reclamation in wet mills. Proven data over marketing fluff.
                </p>
              </div>

              <div className="p-4 bg-cream-50 rounded-2xl border border-sand">
                <div className="flex items-center gap-2 text-forest-900 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Technical Feasibility</span>
                </div>
                <p className="text-muted text-xs leading-relaxed">
                  Works on low-cost Android hardware at the farm gate with offline caching, syncing when cell connectivity returns.
                </p>
              </div>

              <div className="p-4 bg-cream-50 rounded-2xl border border-sand">
                <div className="flex items-center gap-2 text-forest-900 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Regulatory Tailwind</span>
                </div>
                <p className="text-muted text-xs leading-relaxed">
                  EUDR mandates geolocated traceability for coffee, cocoa, and palm oil. ForkTrace makes compliance a turnkey competitive moat.
                </p>
              </div>

              <div className="p-4 bg-cream-50 rounded-2xl border border-sand">
                <div className="flex items-center gap-2 text-forest-900 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Premium Consumer UX</span>
                </div>
                <p className="text-muted text-xs leading-relaxed">
                  No generic dashboard templates. Warm cream, deep forest green, and serif typography designed to evoke artisanal craftsmanship.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Tech Architecture */}
        {activeTab === 'architecture' && (
          <div className="space-y-4 text-xs sm:text-sm text-forest-800">
            <div className="bg-forest-900 text-white p-5 rounded-2xl border border-forest-800 font-mono text-xs">
              <p className="text-coral-400 font-bold mb-2">// ForkTrace Architecture Stack</p>
              <ul className="space-y-1.5 text-sage-200">
                <li>• UI: React 18 + Vite 5 + TypeScript + Tailwind CSS</li>
                <li>• Data Layer: Strongly-typed mock database ready for REST/GraphQL</li>
                <li>• Cryptographic Proof: Ed25519-SHA256 signatures & Merkle root hashes</li>
                <li>• Compliance Standards: ISO 14067 (LCA Carbon), SA8000, EUDR</li>
                <li>• Accessibility: WCAG AA compliant contrast, semantic HTML5, keyboard flow</li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-sand flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-forest-900 text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
