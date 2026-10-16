import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, Share2, FileCheck2 } from 'lucide-react';
import { BatchData } from '../../types/batch';

interface PassportHeaderProps {
  batch: BatchData;
  onOpenCertificate: () => void;
  onOpenShareModal: () => void;
}

export const PassportHeader: React.FC<PassportHeaderProps> = ({
  batch,
  onOpenCertificate,
  onOpenShareModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(batch.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="bg-white rounded-3xl border border-sand p-6 sm:p-8 shadow-soft mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-sand">
        
        {/* Left: Product Name, Batch, and Last Verified */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sage-600 bg-sage-100 px-2.5 py-0.5 rounded-full border border-sage-200">
              VERIFIED PRODUCT PASSPORT
            </span>
            <span className="font-mono text-xs text-muted">
              Category: <strong className="text-forest-800">{batch.category}</strong>
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 tracking-tight">
            {batch.name}
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs sm:text-sm text-muted">
            <span className="font-mono font-semibold text-forest-800 flex items-center gap-1.5">
              Batch ID:
              <span className="bg-cream-200 px-2 py-0.5 rounded text-forest-900 border border-sand font-mono">
                {batch.code}
              </span>
            </span>
            <span>·</span>
            <span>Variety: <strong className="text-forest-800 font-sans">{batch.variety}</strong></span>
            <span>·</span>
            <span>Last Verified: <strong className="text-forest-800 font-mono">{batch.lastVerified}</strong></span>
          </div>
        </div>

        {/* Right: Verified Cryptographic Badge */}
        <div className="flex items-center gap-4 bg-sage-50 border border-sage-200/90 rounded-2xl p-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-forest-800 flex items-center justify-center text-sage-100 shadow-sm shrink-0">
            <ShieldCheck className="w-7 h-7 text-sage-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-forest-900">Cryptographically Verified</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-muted mt-0.5 max-w-xs">
              5 tamper-proof ledger checkpoints signed by accredited third-party certifiers.
            </p>
          </div>
        </div>

      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Copy batch code button */}
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sand bg-cream-50 hover:bg-cream-200 text-forest-800 font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted" />
                <span>Copy Batch ID</span>
              </>
            )}
          </button>

          {/* Share passport modal trigger */}
          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sand bg-cream-50 hover:bg-cream-200 text-forest-800 font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-muted" />
            <span>Share Passport QR</span>
          </button>

          {/* View Audit Certificate */}
          <button
            onClick={onOpenCertificate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sand bg-cream-50 hover:bg-cream-200 text-forest-800 font-medium transition-colors"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-sage-600" />
            <span>View Cryptographic Certificate</span>
          </button>
        </div>

        {/* Live hash display */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-muted">
          <span>Merkle Root:</span>
          <span className="bg-cream-100 px-2 py-0.5 rounded border border-sand text-forest-800 truncate max-w-[180px]">
            {batch.cryptoProof.rootMerkleHash}
          </span>
          <button 
            onClick={onOpenCertificate}
            className="text-sage-700 hover:text-forest-900 underline ml-1"
            title="Inspect cryptographic proof"
          >
            Audit Proof ↗
          </button>
        </div>
      </div>
    </div>
  );
};
