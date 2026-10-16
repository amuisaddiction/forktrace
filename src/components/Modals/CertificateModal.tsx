import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Copy, Check, Printer, Lock } from 'lucide-react';
import { BatchData, TimelineEvent } from '../../types/batch';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: BatchData;
  selectedEvent?: TimelineEvent | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  batch,
  selectedEvent,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isEventProof = !!selectedEvent;
  const recordId = selectedEvent ? selectedEvent.proof.recordId : batch.code;
  const title = selectedEvent ? selectedEvent.title : batch.name;

  const handleCopyHash = () => {
    const textToCopy = selectedEvent ? selectedEvent.proof.signatureHash : batch.cryptoProof.rootMerkleHash;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl border border-sand relative overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-muted hover:text-forest-900 hover:bg-cream-200 transition-colors"
          aria-label="Close certificate modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Watermark Header */}
        <div className="border-b-2 border-dashed border-sand pb-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-forest-800 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-coral-400" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-forest-900">ForkTrace Audit Certificate</span>
                <span className="font-mono text-[10px] text-muted block">Decentralized Provenance Standard v2.0</span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                VERIFIED AUTHENTIC
              </span>
            </div>
          </div>

          <div className="bg-cream-100 p-4 rounded-2xl border border-sand flex flex-col sm:flex-row justify-between gap-3 text-xs">
            <div>
              <span className="font-mono text-[10px] text-muted uppercase block">Certified Entity / Lot</span>
              <strong className="text-forest-900 text-sm font-serif block">{title}</strong>
              <span className="font-mono text-muted">ID: {recordId}</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="font-mono text-[10px] text-muted uppercase block">Registry Timestamp</span>
              <strong className="font-mono text-forest-900 block">{selectedEvent ? selectedEvent.proof.timestamp : batch.cryptoProof.timestamp}</strong>
              <span className="text-muted text-[11px]">Ledger Block #{batch.cryptoProof.ledgerBlock}</span>
            </div>
          </div>
        </div>

        {/* Cryptographic Details Grid */}
        <div className="space-y-4 text-xs">
          
          {/* Merkle Hash / Signature */}
          <div className="bg-cream-50 p-4 rounded-xl border border-sand">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted font-bold uppercase">
                <Lock className="w-3.5 h-3.5 text-coral-500" />
                <span>{isEventProof ? 'Cryptographic Checkpoint Signature' : 'Root Merkle Anchor Hash'}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyHash}
                className="text-sage-700 hover:text-forest-900 font-mono text-[11px] flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Hash'}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-forest-900 bg-white p-2.5 rounded-lg border border-sand break-all">
              {selectedEvent ? selectedEvent.proof.signatureHash : batch.cryptoProof.rootMerkleHash}
            </div>
          </div>

          {/* Dual Attestation Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-cream-50 border border-sand">
              <span className="font-mono text-[10px] text-muted uppercase block">Primary Validator</span>
              <p className="font-bold text-forest-900 mt-0.5">
                {selectedEvent ? selectedEvent.proof.verifiedBy : batch.cryptoProof.auditor}
              </p>
              <p className="text-[11px] text-muted mt-1">
                Role: {selectedEvent?.proof.inspectorRole || 'Decentralized Audit Network Council'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-cream-50 border border-sand">
              <span className="font-mono text-[10px] text-muted uppercase block">Cryptographic Scheme</span>
              <p className="font-mono font-bold text-forest-900 mt-0.5">
                {batch.cryptoProof.signatureAlgorithm}
              </p>
              <p className="text-[11px] text-muted mt-1">
                Zero-Knowledge Proof Anchor verified
              </p>
            </div>
          </div>

          {/* Sensor Attestations (if event proof) */}
          {selectedEvent?.proof.sensorData && (
            <div className="p-3.5 rounded-xl bg-sage-50 border border-sage-200">
              <span className="font-mono text-[10px] text-sage-800 font-bold uppercase block mb-2">
                Hardware-Attested Sensor Logs
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                {Object.entries(selectedEvent.proof.sensorData).map(([k, v]) => (
                  <div key={k} className="bg-white p-2 rounded border border-sage-200">
                    <span className="text-muted block text-[10px]">{k}</span>
                    <strong className="text-forest-900">{v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance & Standards Seal */}
          <div className="p-3.5 rounded-xl bg-cream-100 border border-sand text-muted text-[11px] leading-relaxed">
            <p>
              This certificate constitutes an unalterable proof of origin, custody, and environmental compliance under ISO 14067 (Carbon Footprint of Products) and SA8000 social accountability frameworks.
            </p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-5 border-t border-sand flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-sand bg-cream-50 hover:bg-cream-200 text-forest-800 text-xs font-semibold transition-colors"
          >
            <Printer className="w-4 h-4 text-forest-700" />
            <span>Print Official Record</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
