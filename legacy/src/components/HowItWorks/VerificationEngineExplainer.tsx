import React from 'react';
import { 
  Cpu, 
  KeyRound, 
  DatabaseZap, 
  Smartphone, 
  ShieldCheck
} from 'lucide-react';

export const VerificationEngineExplainer: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Edge Capture & Geotagging',
      subtitle: 'At the Farm Gate',
      description: 'Growers and field agronomists log lot weights, Brix sugar content, and parcel GPS coordinates using offline-capable mobile devices.',
      tech: 'W3C Verifiable Credentials · GPS Hardware Attestation',
      icon: <Smartphone className="w-5 h-5 text-sage-600" />,
    },
    {
      num: '02',
      title: 'Dual Cryptographic Signatures',
      subtitle: 'During Custody Transfer',
      description: 'Every physical handoff (from farmer to wet mill, to roaster, to courier) requires a dual-key digital handshake. Neither party can forge single-sided entries.',
      tech: 'Ed25519 Asymmetric Signatures · Timestamps',
      icon: <KeyRound className="w-5 h-5 text-coral-500" />,
    },
    {
      num: '03',
      title: 'Decentralized Audit Anchoring',
      subtitle: 'Immutable Merkle Root',
      description: 'Individual checkpoint hashes are compiled into a cryptographic Merkle tree and anchored to an immutable decentralized audit register.',
      tech: 'Zero-Knowledge Proofs · ISO 14067 & SA8000 Checks',
      icon: <DatabaseZap className="w-5 h-5 text-forest-700" />,
    },
    {
      num: '04',
      title: 'Consumer Passport Resolution',
      subtitle: 'Instant Shelf Verification',
      description: 'When shoppers scan the package QR, ForkTrace retrieves the signed proofs, validates the Merkle root, and renders the human-friendly story in under 400 milliseconds.',
      tech: 'Sub-400ms Edge Resolver · No App Required',
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <section id="how-it-works-section" className="py-16 sm:py-24 bg-cream-200/60 border-t border-sand scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-sage-700 bg-white px-3 py-1 rounded-full border border-sand mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
            <span>CRYPTOGRAPHIC ENGINE ARCHITECTURE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight">
            How We Verify Every Step
          </h2>
          <p className="text-sm sm:text-base text-muted mt-3 leading-relaxed">
            From the coffee branch in Coorg to your cup in Bengaluru, here is how ForkTrace mathematically guarantees provenance without relying on blind trust.
          </p>
        </div>

        {/* 4-Step Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-sand p-6 shadow-soft hover:shadow-lifted transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-2xl font-bold text-coral-500">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center border border-sand group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                </div>

                <span className="font-mono text-[11px] text-muted uppercase tracking-wider block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="font-serif text-lg font-bold text-forest-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Tech tag footer */}
              <div className="mt-6 pt-4 border-t border-sand/80">
                <span className="font-mono text-[10px] text-forest-700 font-semibold block leading-tight">
                  {step.tech}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Philosophy Quote Banner */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="font-mono text-xs text-muted">
            "Don't trust. Verify with a single camera tap."
          </p>
        </div>

      </div>
    </section>
  );
};

