import React, { useState } from 'react';
import { X, Share2, Copy, Check } from 'lucide-react';
import { BatchData } from '../../types/batch';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: BatchData;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, batch }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}${window.location.pathname}?batch=${batch.code}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `ForkTrace: ${batch.name} (${batch.code})`,
        text: `Inspect the verified farm-to-cup journey of ${batch.name} from Coorg, India.`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-sand relative text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted hover:text-forest-900 hover:bg-cream-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-12 h-12 rounded-2xl bg-coral-50 border border-coral-200 flex items-center justify-center text-coral-600 mx-auto mb-3">
          <Share2 className="w-6 h-6 text-coral-500" />
        </div>

        <h3 id="share-modal-title" className="font-serif text-xl font-bold text-forest-900">
          Share Product Passport
        </h3>
        <p className="text-xs text-muted mt-1">
          {batch.name} · {batch.code}
        </p>

        {/* QR Code Container */}
        <div className="bg-cream-100 p-5 rounded-2xl border border-sand my-5 inline-block mx-auto">
          <div className="w-36 h-36 bg-white p-2 rounded-xl border border-sand/70 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-forest-900">
              <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="11" width="14" height="14" rx="2" fill="currentColor" />
              <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="75" y="11" width="14" height="14" rx="2" fill="currentColor" />
              <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="75" width="14" height="14" rx="2" fill="currentColor" />
              <rect x="37" y="37" width="26" height="26" rx="4" fill="#17332C" />
              <text x="50" y="53" textAnchor="middle" fill="#ED7252" fontSize="11" fontWeight="bold">FT</text>
              <rect x="40" y="12" width="6" height="6" fill="currentColor" />
              <rect x="52" y="12" width="6" height="6" fill="currentColor" />
              <rect x="12" y="40" width="6" height="6" fill="currentColor" />
              <rect x="12" y="52" width="6" height="6" fill="currentColor" />
              <rect x="70" y="40" width="6" height="6" fill="currentColor" />
              <rect x="82" y="70" width="6" height="6" fill="currentColor" />
              <rect x="40" y="75" width="6" height="6" fill="currentColor" />
            </svg>
          </div>
          <span className="font-mono text-[10px] text-muted block mt-2">
            Scan to view verified passport
          </span>
        </div>

        {/* Share Link input */}
        <div className="flex items-center gap-2 bg-cream-50 p-2 rounded-xl border border-sand mb-4">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="text-xs font-mono bg-transparent text-forest-800 flex-1 pl-2 outline-none select-all truncate"
          />
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-forest-800 hover:bg-forest-900 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Native Web Share Button */}
        <button
          type="button"
          onClick={handleNativeShare}
          className="w-full py-2.5 bg-coral-500 hover:bg-coral-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          Share with Friends / Team
        </button>

      </div>
    </div>
  );
};
