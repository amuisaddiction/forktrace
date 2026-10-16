import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PassportHeader } from './components/ProductPassport/PassportHeader';
import { ProvenanceStats } from './components/ProductPassport/ProvenanceStats';
import { TraceScoreCard } from './components/ProductPassport/TraceScoreCard';
import { ProductStoryCard } from './components/ProductPassport/ProductStoryCard';
import { FarmerStoryCard } from './components/ProductPassport/FarmerStoryCard';
import { SupplyChainTimeline } from './components/Timeline/SupplyChainTimeline';
import { ImpactSection } from './components/TrustImpact/ImpactSection';
import { ForProducersAndBrands } from './components/Stakeholders/ForProducersAndBrands';
import { VerificationEngineExplainer } from './components/HowItWorks/VerificationEngineExplainer';
import { QRScannerModal } from './components/Modals/QRScannerModal';
import { BatchNotFoundModal } from './components/Modals/BatchNotFoundModal';
import { CertificateModal } from './components/Modals/CertificateModal';
import { ShareModal } from './components/Modals/ShareModal';
import { JudgesDemoDrawer } from './components/Modals/JudgesDemoDrawer';
import { Footer } from './components/Footer';
import { BATCH_DATABASE, DEMO_BATCH_ID } from './data/batches';
import { BatchData, TimelineEvent } from './types/batch';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [currentBatchCode, setCurrentBatchCode] = useState<string>(DEMO_BATCH_ID);
  const [currentBatch, setCurrentBatch] = useState<BatchData>(BATCH_DATABASE[DEMO_BATCH_ID]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('Querying cryptographic ledger...');

  // Modals
  const [qrScannerOpen, setQrScannerOpen] = useState<boolean>(false);
  const [notFoundOpen, setNotFoundOpen] = useState<boolean>(false);
  const [failedSearchCode, setFailedSearchCode] = useState<string>('');
  const [certificateOpen, setCertificateOpen] = useState<boolean>(false);
  const [selectedProofEvent, setSelectedProofEvent] = useState<TimelineEvent | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [judgesGuideOpen, setJudgesGuideOpen] = useState<boolean>(false);

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // URL query parameter check on initial load (e.g. ?batch=FT-COF-2407)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const batchParam = params.get('batch');
    if (batchParam && BATCH_DATABASE[batchParam.toUpperCase()]) {
      handleSelectBatch(batchParam.toUpperCase(), false);
    }
  }, []);

  // Keyboard shortcut: ESC closes open modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQrScannerOpen(false);
        setNotFoundOpen(false);
        setCertificateOpen(false);
        setShareModalOpen(false);
        setJudgesGuideOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#287053', '#ED7252', '#FBF8F3', '#8FAD87'],
      disableForReducedMotion: true,
    });
  };

  const handleSelectBatch = (code: string, scroll = true) => {
    const upperCode = code.trim().toUpperCase();
    setIsLoading(true);
    setLoadingStep('Querying decentralized audit ledger...');

    setTimeout(() => {
      setLoadingStep('Decrypting verified batch passport...');
      
      setTimeout(() => {
        setIsLoading(false);
        const match = BATCH_DATABASE[upperCode];

        if (match) {
          setCurrentBatchCode(upperCode);
          setCurrentBatch(match);
          showToast(`Verified passport loaded: ${match.code} (${match.name})`, 'success');
          triggerCelebration();

          if (scroll) {
            const passportEl = document.getElementById('passport-section');
            if (passportEl) {
              passportEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        } else {
          setFailedSearchCode(upperCode);
          setNotFoundOpen(true);
          showToast(`Batch "${upperCode}" not found in registry`, 'error');
        }
      }, 350);
    }, 350);
  };

  const handleOpenEventProof = (event: TimelineEvent) => {
    setSelectedProofEvent(event);
    setCertificateOpen(true);
  };

  const handleOpenBatchCertificate = () => {
    setSelectedProofEvent(null);
    setCertificateOpen(true);
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 text-forest-800 flex flex-col selection:bg-coral-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        onSelectBatch={(code) => handleSelectBatch(code)}
        onOpenQRScanner={() => setQrScannerOpen(true)}
        onOpenJudgesGuide={() => setJudgesGuideOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Hero Section with batch lookup input and interactive card */}
        <Hero
          onSearchBatch={(code) => handleSelectBatch(code)}
          onOpenQRScanner={() => setQrScannerOpen(true)}
          isLoading={isLoading}
          activeBatchCode={currentBatchCode}
        />

        {/* Loading overlay during lookup */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white p-7 rounded-3xl border border-sand shadow-2xl max-w-sm w-full mx-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-forest-800 text-coral-400 flex items-center justify-center mx-auto mb-4 animate-spin">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-forest-900">
                Verifying Cryptographic Ledger
              </h4>
              <p className="font-mono text-xs text-muted mt-1.5 animate-pulse">
                {loadingStep}
              </p>
            </div>
          </div>
        )}

        {/* Product Passport Section */}
        <section id="passport-section" className="py-12 sm:py-16 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Passport Header with batch info & actions */}
            <PassportHeader
              batch={currentBatch}
              onOpenCertificate={handleOpenBatchCertificate}
              onOpenShareModal={() => setShareModalOpen(true)}
            />

            {/* 4 Provenance Key Statistics */}
            <ProvenanceStats batch={currentBatch} />

            {/* Trace Score Card with expandable breakdown */}
            <TraceScoreCard
              batch={currentBatch}
              onOpenHowWeVerify={handleScrollToHowItWorks}
            />

            {/* Terroir & Tasting Profile Card */}
            <ProductStoryCard batch={currentBatch} />

            {/* People Behind the Harvest Card */}
            <FarmerStoryCard batch={currentBatch} />

          </div>
        </section>

        {/* Interactive Supply-Chain Timeline & Route Map */}
        <SupplyChainTimeline
          batch={currentBatch}
          onOpenProofModal={handleOpenEventProof}
        />

        {/* Trust & Impact Section (6 concrete metrics) */}
        <ImpactSection batch={currentBatch} />

        {/* For Producers & Brands Interactive Tabs */}
        <ForProducersAndBrands />

        {/* How It Works Cryptographic Architecture Explainer */}
        <VerificationEngineExplainer />

      </main>

      {/* Footer */}
      <Footer
        onSelectBatch={(code) => handleSelectBatch(code)}
        onOpenJudgesGuide={() => setJudgesGuideOpen(true)}
      />

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={qrScannerOpen}
        onClose={() => setQrScannerOpen(false)}
        onScanSuccess={(code) => handleSelectBatch(code)}
      />

      {/* Batch Not Found / Friendly Error State Modal */}
      <BatchNotFoundModal
        isOpen={notFoundOpen}
        onClose={() => setNotFoundOpen(false)}
        searchedCode={failedSearchCode}
        onSelectBatch={(code) => handleSelectBatch(code)}
      />

      {/* Cryptographic Certificate & Proof Modal */}
      <CertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        batch={currentBatch}
        selectedEvent={selectedProofEvent}
      />

      {/* Share Passport Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        batch={currentBatch}
      />

      {/* Hackathon Judges Pitch & Demo Drawer */}
      <JudgesDemoDrawer
        isOpen={judgesGuideOpen}
        onClose={() => setJudgesGuideOpen(false)}
        onSelectBatch={(code) => handleSelectBatch(code)}
        onOpenQRScanner={() => setQrScannerOpen(true)}
      />

      {/* Floating Feedback Toast */}
      {toast && (
        <div 
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-forest-900 text-white text-xs sm:text-sm font-medium shadow-2xl border border-forest-700 animate-slideUp"
          role="status"
          aria-live="polite"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <span className="w-2 h-2 rounded-full bg-coral-500 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
};
