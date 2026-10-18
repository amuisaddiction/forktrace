import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { DEMO_BATCH_ID } from '../data/batches';

interface FooterProps {
  onSelectBatch: (code: string) => void;
  onOpenJudgesGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectBatch, onOpenJudgesGuide }) => {
  return (
    <footer className="bg-forest-950 text-white border-t border-forest-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-forest-800">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-2 group cursor-pointer inline-flex">
              <div className="w-8 h-8 rounded-lg bg-forest-800 flex items-center justify-center text-white">
                <span className="font-serif font-bold text-lg text-coral-500">f</span>
                <span className="font-serif font-bold text-lg text-sage-100">t</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                fork<span className="text-coral-500">trace</span>
                <span className="inline-block w-2 h-2 rounded-full bg-sage-500 ml-1.5" />
              </span>
            </a>

            <p className="text-xs sm:text-sm text-sage-300 max-w-sm leading-relaxed">
              ForkTrace is the next-generation food traceability and digital product passport platform. We connect regenerative smallholders, specialty processors, and conscious shoppers through cryptographic proof.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-sage-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero-knowledge supply-chain cryptography</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-coral-400 block">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-xs text-sage-200">
              <li>
                <a href="#trace-hero" className="hover:text-white transition-colors">Trace a Product</a>
              </li>
              <li>
                <a href="#passport-section" className="hover:text-white transition-colors">Digital Product Passport</a>
              </li>
              <li>
                <a href="#timeline-section" className="hover:text-white transition-colors">Supply Chain Route & Milestones</a>
              </li>
              <li>
                <a href="#impact-section" className="hover:text-white transition-colors">Verified Sustainability Metrics</a>
              </li>
              <li>
                <a href="#stakeholders-section" className="hover:text-white transition-colors">For Producers & Brands</a>
              </li>
              <li>
                <a href="#how-it-works-section" className="hover:text-white transition-colors">Verification Architecture</a>
              </li>
            </ul>
          </div>

          {/* Hackathon Demo Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-coral-400 block">
              Hackathon Demonstration
            </span>
            <p className="text-xs text-sage-300">
              Built with React, Vite, TypeScript, and Tailwind CSS.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => onSelectBatch(DEMO_BATCH_ID)}
                className="inline-flex items-center justify-between p-2.5 rounded-xl bg-forest-900 border border-forest-800 text-xs font-mono text-white hover:bg-forest-800 transition-colors text-left"
              >
                <span>☕ Load Demo: {DEMO_BATCH_ID}</span>
                <span className="text-[10px] text-coral-400">Highland Coffee ➔</span>
              </button>

              <button
                type="button"
                onClick={onOpenJudgesGuide}
                className="inline-flex items-center justify-between p-2.5 rounded-xl bg-coral-950/60 border border-coral-800/80 text-xs text-coral-200 hover:bg-coral-900/60 transition-colors text-left"
              >
                <span className="flex items-center gap-1.5 font-sans font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-coral-400" />
                  Judge's 60s Pitch Script
                </span>
                <span className="text-[10px] font-mono text-coral-300">Read ➔</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-sage-400">
          <div>
            © 2026 FORKTRACE · TRACEABLE FOOD, MADE HUMAN.
          </div>
          <div className="flex items-center gap-4">
            <span>WCAG 2.1 AA Accessible</span>
            <span>·</span>
            <span>ISO 14067 Ready</span>
            <span>·</span>
            <span>EUDR & FSMA 204</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
