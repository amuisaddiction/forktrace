import React, { useState } from 'react';
import { QrCode, Sparkles, Menu, X, ShieldCheck, Coffee } from 'lucide-react';
import { DEMO_BATCH_ID } from '../data/batches';

interface NavbarProps {
  onSelectBatch: (code: string) => void;
  onOpenQRScanner: () => void;
  onOpenJudgesGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectBatch,
  onOpenQRScanner,
  onOpenJudgesGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md border-b border-sand/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-forest-800 rounded-lg p-1"
            aria-label="ForkTrace Home"
          >
            <div className="w-9 h-9 rounded-xl bg-forest-800 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-xl text-coral-500">f</span>
              <span className="font-serif font-bold text-xl text-sage-100">t</span>
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-forest-800">
              fork<span className="text-coral-500">trace</span>
              <span className="inline-block w-2 h-2 rounded-full bg-sage-600 ml-1.5 animate-pulse" />
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            <button
              onClick={() => handleNavClick('trace-hero')}
              className="text-sm font-medium text-muted hover:text-forest-800 transition-colors focus:outline-none focus:underline"
            >
              Trace Product
            </button>
            <button
              onClick={() => handleNavClick('passport-section')}
              className="text-sm font-medium text-muted hover:text-forest-800 transition-colors focus:outline-none focus:underline"
            >
              Product Passport
            </button>
            <button
              onClick={() => handleNavClick('timeline-section')}
              className="text-sm font-medium text-muted hover:text-forest-800 transition-colors focus:outline-none focus:underline"
            >
              Supply Journey
            </button>
            <button
              onClick={() => handleNavClick('impact-section')}
              className="text-sm font-medium text-muted hover:text-forest-800 transition-colors focus:outline-none focus:underline"
            >
              Trust & Impact
            </button>
            <button
              onClick={() => handleNavClick('stakeholders-section')}
              className="text-sm font-medium text-muted hover:text-forest-800 transition-colors focus:outline-none focus:underline"
            >
              For Producers & Brands
            </button>
            <button
              onClick={() => handleNavClick('how-it-works-section')}
              className="text-sm font-medium text-muted hover:text-forest-800 transition-colors focus:outline-none focus:underline"
            >
              How It Works
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Judge Guide pill */}
            <button
              onClick={onOpenJudgesGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-coral-50 text-coral-700 border border-coral-200 hover:bg-coral-100 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-coral-500"
              title="Open hackathon judges pitch & demo walkthrough"
            >
              <Sparkles className="w-3.5 h-3.5 text-coral-500" />
              <span>Judge's Guide (60s Pitch)</span>
            </button>

            {/* Scan QR Modal CTA */}
            <button
              onClick={onOpenQRScanner}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium text-forest-800 border border-sand bg-white hover:bg-cream-200 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
              aria-label="Scan Batch QR Code"
            >
              <QrCode className="w-4 h-4 text-forest-800" />
              <span className="hidden md:inline">Scan QR</span>
            </button>

            {/* Quick Demo Batch CTA */}
            <button
              onClick={() => onSelectBatch(DEMO_BATCH_ID)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-forest-800 text-white hover:bg-forest-700 transition-all shadow-sm hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-forest-800"
            >
              <Coffee className="w-3.5 h-3.5 text-coral-400" />
              <span>Demo: {DEMO_BATCH_ID}</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenQRScanner}
              className="p-2 rounded-lg text-forest-800 border border-sand bg-white"
              aria-label="Scan QR Code"
            >
              <QrCode className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-forest-800 hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-forest-800"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-cream-100 border-b border-sand px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => handleNavClick('trace-hero')}
              className="text-left px-3 py-2 text-sm font-medium text-forest-800 rounded-md hover:bg-cream-200"
            >
              Trace Product
            </button>
            <button
              onClick={() => handleNavClick('passport-section')}
              className="text-left px-3 py-2 text-sm font-medium text-forest-800 rounded-md hover:bg-cream-200"
            >
              Product Passport
            </button>
            <button
              onClick={() => handleNavClick('timeline-section')}
              className="text-left px-3 py-2 text-sm font-medium text-forest-800 rounded-md hover:bg-cream-200"
            >
              Supply Journey Timeline
            </button>
            <button
              onClick={() => handleNavClick('impact-section')}
              className="text-left px-3 py-2 text-sm font-medium text-forest-800 rounded-md hover:bg-cream-200"
            >
              Trust & Impact
            </button>
            <button
              onClick={() => handleNavClick('stakeholders-section')}
              className="text-left px-3 py-2 text-sm font-medium text-forest-800 rounded-md hover:bg-cream-200"
            >
              For Producers & Brands
            </button>
            <button
              onClick={() => handleNavClick('how-it-works-section')}
              className="text-left px-3 py-2 text-sm font-medium text-forest-800 rounded-md hover:bg-cream-200"
            >
              How It Works
            </button>
          </div>

          <div className="pt-3 border-t border-sand flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJudgesGuide();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-coral-50 border border-coral-200 text-coral-700 font-semibold text-xs"
            >
              <Sparkles className="w-4 h-4 text-coral-500" />
              <span>Judge's 60-Second Demo Pitch</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectBatch(DEMO_BATCH_ID);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-forest-800 text-white font-semibold text-xs"
            >
              <ShieldCheck className="w-4 h-4 text-sage-400" />
              <span>Load Verified Batch {DEMO_BATCH_ID}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
