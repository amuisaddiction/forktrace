import React, { useState } from 'react';
import { X, QrCode, Camera, Sparkles } from 'lucide-react';
import { DEMO_BATCH_ID } from '../../data/batches';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (batchCode: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
}) => {
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = (code: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScanSuccess(code);
      onClose();
    }, 700);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-sand relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted hover:text-forest-900 hover:bg-cream-200 transition-colors"
          aria-label="Close QR Scanner"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center">
            <QrCode className="w-5 h-5 text-coral-400" />
          </div>
          <div>
            <h3 id="qr-modal-title" className="font-serif text-xl font-bold text-forest-900">
              Scan Product QR Code
            </h3>
            <p className="text-xs text-muted">Point your phone camera or select a demo tag</p>
          </div>
        </div>

        {/* Viewfinder simulation box */}
        <div className="relative w-full aspect-square bg-forest-900 rounded-2xl overflow-hidden flex flex-col items-center justify-center border-2 border-forest-700 shadow-inner my-4">
          
          {/* Laser scanning beam */}
          <div className="absolute inset-x-0 h-1 bg-coral-500 shadow-[0_0_12px_#ed7252] animate-bounce opacity-90 z-20" />

          {/* Viewfinder Target Reticle */}
          <div className="relative w-48 h-48 border-2 border-white/30 rounded-2xl flex items-center justify-center">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-coral-500 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-coral-500 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-coral-500 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-coral-500 rounded-br-lg" />

            {/* Central icon */}
            <div className="text-center text-white/70">
              <Camera className="w-10 h-10 mx-auto mb-2 text-sage-300 animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider block text-sage-200">
                {isScanning ? 'Decrypting Code...' : 'Align QR Within Frame'}
              </span>
            </div>
          </div>

          {/* Bottom status badge */}
          <div className="absolute bottom-3 inset-x-0 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/80 text-[10px] font-mono text-sage-300 border border-forest-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Camera Feed Active · Real-time Optical Lens
            </span>
          </div>

        </div>

        {/* Instant 1-Click Demo QR Triggers */}
        <div className="space-y-2 mt-4">
          <span className="text-[11px] font-mono text-muted uppercase font-bold block">
            Or test instant simulated scan:
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSimulateScan(DEMO_BATCH_ID)}
              disabled={isScanning}
              className="p-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold flex items-center justify-between transition-all group"
            >
              <div className="text-left">
                <span className="block font-mono text-coral-400 font-bold">{DEMO_BATCH_ID}</span>
                <span className="text-[10px] text-sage-300">Highland Coffee</span>
              </div>
              <Sparkles className="w-4 h-4 text-coral-400 group-hover:scale-110 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => handleSimulateScan('FT-TEA-1082')}
              disabled={isScanning}
              className="p-3 rounded-xl bg-cream-200 hover:bg-cream-300 text-forest-900 text-xs font-semibold flex items-center justify-between border border-sand transition-all group"
            >
              <div className="text-left">
                <span className="block font-mono font-bold">FT-TEA-1082</span>
                <span className="text-[10px] text-muted">Darjeeling Tea</span>
              </div>
              <Sparkles className="w-4 h-4 text-forest-700 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
