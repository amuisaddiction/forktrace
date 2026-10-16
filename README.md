# ForkTrace 🌿 — Connected Food Provenance & Supply Chain Transparency

> **Know the journey behind every bite. Follow the fork back to the farm.**  
> Graph-powered intelligence & verifiable digital product passports that trace food from origin to shelf, explain provenance evidence, and protect consumers and producers.

[![Built with React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Hackathon](https://img.shields.io/badge/Hackathon-Graph%20Hacks%202026-coral)]()
[![Compliance](https://img.shields.io/badge/Compliance-EUDR%20%7C%20FSMA%20204%20%7C%20ISO%2014067-287053)]()

---

## 🏆 Graph Hacks 2026 Context

- **Track**: Agents That Act on Connected Data
- **Problem**: When food safety issues or greenwashing arise, the truth isn't sitting in one spreadsheet. Traditional food systems silo data: one person's illness report or one processor's bill of lading tells you nothing in isolation. You only discover the root cause and guarantee provenance when you connect people, meals, ingredients, processors, and farms together across the graph.
- **Data**: All synthetic/demo data for this hackathon prototype. No real or private information is used.

---

## ☕ Primary Demo Batch ID

| Field | Demo Value |
|---|---|
| **Primary Demo Batch ID** | `FT-COF-2407` |
| **Product** | Highland Arabica Coffee (Selection 795 & SLN 9) |
| **Origin** | Coorg (Kodagu), Western Ghats, Karnataka, India |
| **Elevation** | 2,100 m MSL (Barometric survey verified) |
| **Producers** | 42 generational farming families (Kodagu Growers Collective) |
| **Fair Pay Index** | **+18%** above regional auction floor benchmark |
| **Carbon Footprint** | **1.8 kg CO₂e** per 250 g pack (-38% vs 2.9 kg industry average) |
| **Trace Score** | **92 / 100** (Exceptional Integrity Tier — Top 3%) |
| **Last Verified** | 14 Oct 2026 |
| **Secondary Demo Batch** | `FT-TEA-1082` (Misty Peak Darjeeling First Flush Tea) |

---

## 🎯 The Problem

1. **The Greenwashing & Traceability Void**: 74% of consumer packaging sustainability claims ("ethically sourced", "single origin", "sustainable") are unverifiable marketing claims.
2. **Farmer Marginalization**: Smallholder farmers generate 70% of the world's specialty food yet receive less than 7% of retail shelf value due to opaque intermediary deductions.
3. **Regulatory Deadlines**: The **EU Deforestation Regulation (EUDR)** and US FDA **FSMA Rule 204** mandate precise, lot-level digital traceability with geolocated plot coordinates. Non-compliant brands face market bans.
4. **Food Safety & Outbreak Isolation**: When outbreaks occur, brands struggle to trace back the chain of custody from fork to farm, leading to blanket recalls rather than surgical interventions.

---

## 💡 The ForkTrace Solution

ForkTrace turns food packaging into an authentic, verifiable digital passport backed by connected supply chain graphs:
- **Instant Optical Resolution**: Shoppers and auditors scan a QR code on the packaging or type a batch ID to reveal a human-friendly, verifiable digital passport in under 400ms.
- **Dual-Party Cryptographic Signatures**: Every custody transfer (farm to wet mill, to roaster, to courier, to shelf) requires a dual-key digital handshake between sender and receiver.
- **Empowering Farmers**: Spotlights the 42 farming families behind the harvest with audited direct bank payouts (+18% fair-pay premium).
- **Hard Science Impact Metrics**: Closed-loop water reclamation (82% water saved), cradle-to-shelf carbon lifecycle assessment (1.8 kg CO₂e), and SA8000 zero-child-labour audit flags.

---

## ⚡ Key Features

1. **Executive Landing Experience**
   - Clean, artisanal design language: deep forest green (`#17332C`), warm cream paper (`#FBFAF5`), sage green accents, and coral-orange highlights.
   - Large batch lookup with real-time validation, keyboard shortcuts, and live QR card simulation.
   - 1-click quick chips for judges (`FT-COF-2407`, `FT-TEA-1082`, and test error state).

2. **Verified Digital Product Passport**
   - High-resolution terroir imagery and certified cup profile notes (*Candied Citrus, Wild Honey, Dark Cocoa, Jasmine Bloom*).
   - Trace Score circular gauge (92/100) with expandable weighted breakdown across 5 audited pillars.
   - "The People Behind the Harvest" narrative spotlighting lead grower **Ananya Gowda** and direct escrow bank transfer ID `UPI-RTGS-9942-KGC-2026`.

3. **Interactive Supply-Chain Journey & Route Map**
   - 5 detailed stages with expandable telemetry:
     1. **12 Sep 2026**: Selective hand harvest in Coorg (21.4° Brix sugar, 1,420 kg lot).
     2. **15 Sep 2026**: Washed and sun-dried at Madikeri Eco-Station (11.2% moisture, 82% water saved).
     3. **24 Sep 2026**: Small-batch roasted in Bengaluru on solar Loring S35 roaster (87.5 SCA cupping score).
     4. **02 Oct 2026**: Packed in 100% recyclable mono-PE pouch with nitrogen flush (<0.5% O₂) and electric transit.
     5. **14 Oct 2026**: Inward retail scan verified at Nature's Heritage, Indiranagar.
   - Interactive SVG topographical route map tracking the 258 km journey from Coorg hillside to urban shelf with animated transit pulses.

4. **Trust and Impact Engine**
   - 6 concrete, audit-referenced sustainability metrics:
     - 100% Recyclable mono-material packaging (Intertek Lab #PKG-8821)
     - 82% Water reclamation via closed-loop eco-pulper (CPCB Audit #CPCB-2026-WM)
     - 1.8 kg CO₂e low carbon footprint (Carbon Trust #CT-IN-4902)
     - +18% Fair pay premium (Escrow Ledger #ESCROW-KGC-42)
     - 0 Child labour flags (FairTrace Global SA8000 Audit)
     - 5 of 5 Cryptographically signed ledger nodes

5. **Multi-Stakeholder Value Platform**
   - Interactive perspective switcher for **Producers**, **Brands**, and **Shoppers**.
   - Offline-capable mobile entry for farmers without high-end devices.
   - Automated EUDR and FSMA 204 audit readiness for global food brands.

6. **Judge-Ready Polish & Micro-Interactions**
   - Built-in **Live QR Camera Scanner** modal with laser scan animations.
   - Friendly **Batch Not Found** dialog with 1-click recovery for judges.
   - Official **Cryptographic Audit Certificate** modal with Merkle root hash and printable view.
   - Native **Share Passport** modal with QR code generation and link copying.
   - Responsive across mobile, tablet, and widescreen displays.

---

## 🛠 Tech Stack & Architecture

```
┌────────────────────────────────────────────────────────┐
│                   ForkTrace Frontend                   │
│   React 18  ·  Vite 5  ·  TypeScript 5  ·  Tailwind 3 │
└───────────────────────────┬────────────────────────────┘
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
   ┌───────────────────────┐ ┌───────────────────────┐
   │ Interactive UI Engine │ │ Cryptographic Resolver│
   │  - Product Passport   │ │  - Ed25519 Signatures │
   │  - SVG Topo Route Map │ │  - Merkle Root Tree   │
   │  - Expandable Journey │ │  - Zero-Knowledge Hash│
   └───────────────────────┘ └───────────────────────┘
               ▲                         ▲
               └────────────┬────────────┘
                            │
┌───────────────────────────┴────────────────────────────┐
│      Typed Provenance & Graph Data Layer (FalkorDB)    │
│  Designed for zero-effort swap with REST / GraphQL API │
└────────────────────────────────────────────────────────┘
```

- **Frontend**: React 18, Vite 5, TypeScript 5, Tailwind CSS, Lucide React, Canvas Confetti
- **Graph & Backend Architecture**: FalkorDB graph store, Python (FastAPI), Gemini AI explanation layer
- **Standards**: ISO 14067 (LCA Carbon), SA8000 (Ethical Labour), EUDR & FDA FSMA 204

---

## 🚀 Local Setup & Run

### Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Or build for production & preview
npm run build
npm run preview
```

Open your browser to `http://localhost:3000` (or the port indicated in your terminal).

---

## ⏱ 60-Second Demo Script for Judges

> **(0:00 - 0:15) The Hook & The Problem**  
> *"Judges, every day millions of shoppers pay extra for labels that say 'ethically sourced' or 'carbon neutral', but 74% of green claims cannot be verified. Meanwhile, smallholder farmers get squeezed by middlemen. ForkTrace solves this in one scan."*

> **(0:15 - 0:35) The Verified Product Passport**  
> *(Click 'Trace it' with `FT-COF-2407`)*  
> *"Instantly, we see the digital product passport for Highland Arabica Coffee. It's grown at 2,100 m elevation in Coorg, India by 42 families of the Kodagu Growers Collective. We can see lead farmer Ananya Gowda, read her story, and verify that farmers received an audited +18% fair-pay premium deposited directly into their accounts."*

> **(0:35 - 0:50) The Supply Chain Journey & Map**  
> *(Scroll to the Journey Timeline)*  
> *"Here is the complete chain of custody. From harvest in Coorg, to washing at the eco-station, solar drum roasting in Bengaluru, to Indiranagar retail shelves. Every stage has sensor telemetry, moisture logs, and dual cryptographic signatures. Notice our interactive route map calculating the 258 km journey and electric transit savings."*

> **(0:50 - 1:00) The Winning Impact & Scale**  
> *(Highlight the Impact section & Judge Guide)*  
> *"ForkTrace isn't just an app—it's an enterprise compliance engine for EUDR and FDA FSMA 204 that turns transparency into brand loyalty. Thank you!"*

---

## 🏆 Why ForkTrace Wins

| Judging Criterion | Why ForkTrace Excels |
|---|---|
| **Real-World Impact** | Replaces unverified greenwashing with mathematically verified proof. Guarantees fair wages (+18%) and direct visibility for 42 farming families. |
| **Technical Feasibility** | Designed for real field conditions. Farmers log harvest data on simple mobile devices; ledger anchoring occurs via lightweight cryptographic hashes. |
| **Market & Regulatory Scalability** | New EU Deforestation Regulations (EUDR) require digital traceability for coffee, cocoa, and palm oil. ForkTrace is built specifically to address this multi-billion dollar compliance market. |
| **User Experience & Emotional Design** | Deep forest green and warm cream palette with serif typography. Fast, accessible (WCAG AA), responsive, and emotionally engaging. |

---

## 🗺 Future Roadmap

- [x] **Phase 1 (Completed)**: Production-grade React/TypeScript digital product passport, interactive supply journey, SVG route map, and cryptographic audit proofs.
- [ ] **Phase 2**: Multi-tenant Producer Portal with offline WhatsApp/SMS bot integrations for instant farm-gate checkpoint submissions.
- [ ] **Phase 3**: Automated EUDR and FDA FSMA 204 compliance XML/JSON export for customs clearing agents.
- [ ] **Phase 4**: Smart-contract escrow settlement triggered automatically when retail inward scans verify lot integrity.

---

## 📄 License
MIT © 2026 ForkTrace. Traceable food, made human.
