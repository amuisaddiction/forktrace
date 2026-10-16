import React from 'react';
import { X, ArrowRight, ShieldAlert, Coffee } from 'lucide-react';
import { DEMO_BATCH_ID } from '../../data/batches';

interface BatchNotFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchedCode: string;
  onSelectBatch: (code: string) => void;
}

export const BatchNotFoundModal: React.FC<BatchNotFoundModalProps> = ({
  isOpen,
  onClose,
  searchedCode,
  onSelectBatch,
}) => {
  if (!isOpen) return null;

  const handleSelectDemo = (code: string) => {
    onSelectBatch(code);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-fadeIn"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="notfound-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-sand relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted hover:text-forest-900 hover:bg-cream-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-coral-100 flex items-center justify-center text-coral-600 mb-5 border border-coral-200">
          <ShieldAlert className="w-8 h-8 text-coral-500" />
        </div>

        {/* Title */}
        <h3 id="notfound-modal-title" className="font-serif text-2xl font-bold text-forest-900 tracking-tight">
          Batch Code Not Found
        </h3>

        {/* Explanation */}
        <p className="text-sm text-muted mt-2 leading-relaxed">
          We could not locate an active cryptographic passport for <code className="font-mono text-coral-600 font-bold bg-coral-50 px-2 py-0.5 rounded border border-coral-200">{searchedCode || 'unknown'}</code> in the ForkTrace registry.
        </p>

        <div className="bg-cream-100 p-3.5 rounded-xl border border-sand/80 my-4 text-xs text-forest-800 leading-relaxed">
          <p>
            <strong>Why did this happen?</strong> Only authentic agricultural batches that pass unannounced ethical audits and accredited wet-mill custody handshakes are issued cryptographic passports.
          </p>
        </div>

        {/* 1-Click Recovery Recommendation */}
        <div className="mt-5 space-y-3">
          <span className="font-mono text-xs font-bold uppercase text-forest-800 block">
            Try our verified hackathon demo batches:
          </span>

          <button
            type="button"
            onClick={() => handleSelectDemo(DEMO_BATCH_ID)}
            className="w-full p-4 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-sm flex items-center justify-between transition-all shadow-md group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-forest-700 flex items-center justify-center text-coral-400">
                <Coffee className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block font-mono text-coral-400 font-bold text-xs">{DEMO_BATCH_ID}</span>
                <span className="text-xs text-sage-200">Highland Arabica Coffee · Coorg (2,100 m)</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-coral-400 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => handleSelectDemo('FT-TEA-1082')}
            className="w-full p-3.5 rounded-2xl bg-cream-100 hover:bg-cream-200 text-forest-900 font-medium text-xs flex items-center justify-between border border-sand transition-all group"
          >
            <div className="flex items-center gap-2.5 text-left">
              <span className="font-mono font-bold">FT-TEA-1082</span>
              <span className="text-muted">· Darjeeling First Flush Tea (Kurseong)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2.5 text-xs font-semibold text-muted hover:text-forest-900 transition-colors"
        >
          Dismiss and re-enter code
        </button>

      </div>
    </div>
  );
};
