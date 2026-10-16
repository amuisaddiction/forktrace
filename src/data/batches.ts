import { BatchData } from '../types/batch';

export const DEMO_BATCH_ID = 'FT-COF-2407';

export const BATCH_DATABASE: Record<string, BatchData> = {
  'FT-COF-2407': {
    code: 'FT-COF-2407',
    name: 'Highland Arabica Coffee',
    tagline: 'Single-origin, shade-grown Arabica hand-tended in the misty Western Ghats.',
    category: 'Specialty Coffee',
    packSize: '250 g Whole Bean',
    variety: 'Selection 795 & SLN 9 Arabica',
    lastVerified: '14 Oct 2026',
    origin: {
      region: 'Coorg (Kodagu)',
      state: 'Karnataka',
      country: 'India',
      elevation: '2,100 m',
      microclimate: 'Montane subtropical rainforest canopy, 2,200 mm annual rainfall',
      soilType: 'Rich red laterite soil with high natural humic content',
      gpsCoords: '12.4244° N, 75.7382° E',
    },
    producers: {
      count: 42,
      collectiveName: 'Kodagu Growers Collective',
      leadFarmerName: 'Ananya Gowda',
      leadFarmerQuote: 'Traceability is dignity for us. When a customer in Bengaluru or London drinks this cup, they see our names, our trees, and know we were paid fairly.',
      communityStory: 'The Kodagu Growers Collective unites 42 generational smallholder farming families around Madikeri and Somwarpet. By pooling their harvest for central eco-pulper processing, they bypass predatory intermediaries and earn direct export premiums.',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      collectiveModel: 'Democratically Governed Producer Cooperative',
      fairPayBenchmark: '+18% above the Coffee Board of India regional floor benchmark',
      directTransferConfirmationId: 'UPI-RTGS-9942-KGC-2026',
    },
    metrics: {
      fairPayPercent: 18,
      fairPayBasis: '+18% above local benchmark directly to farmer bank accounts',
      carbonKgPerPack: 1.8,
      carbonIndustryBenchmark: 2.9,
      traceScore: 92,
      childLabourFlags: 0,
      verifiedCheckpoints: 5,
      packagingRecyclable: '100% recyclable mono-material pack',
      waterMethod: 'Closed-loop eco-pulper with 82% water reclamation',
    },
    scoreBreakdown: [
      {
        category: 'Origin Authenticity & Elevation',
        score: 98,
        weight: '25%',
        explanation: 'Geotagged lot boundaries confirmed by satellite multispectral imagery; elevation verified at 2,100 m barometric survey.',
        status: 'exceptional',
      },
      {
        category: 'Fair Pay & Farmer Equity',
        score: 95,
        weight: '25%',
        explanation: 'Direct-to-bank settlement statements prove farm-gate price paid was 18% above the state agricultural minimum.',
        status: 'exceptional',
      },
      {
        category: 'Supply-Chain Custody Proofs',
        score: 94,
        weight: '20%',
        explanation: 'Five tamper-evident digital handoffs with GPS, timestamps, and cryptographic dual-signatures from harvest to shelf.',
        status: 'exceptional',
      },
      {
        category: 'Environmental & Water Footprint',
        score: 86,
        weight: '15%',
        explanation: 'Eco-pulper reduced freshwater consumption by 82%; 1.8 kg CO₂e footprint verified against ISO 14067 lifecycle standard.',
        status: 'verified',
      },
      {
        category: 'Packaging & End-of-Life',
        score: 88,
        weight: '15%',
        explanation: 'Foil-free recyclable high-barrier pouch made from mono-polyethylene; kerbside recyclable in standard municipal sorting.',
        status: 'verified',
      },
    ],
    productStory: {
      summary: 'Grown under a double canopy of silver oaks, wild fig, and native rosewood trees, this coffee develops slowly at 2,100 m elevation. The prolonged maturation infuses dense sugars into the cherry, yielding an exceptionally sweet, balanced cup with floral aromatics.',
      notes: ['Candied Citrus', 'Wild Honey', 'Dark Cocoa', 'Jasmine Bloom'],
      processingMethod: 'Fully Washed with 24-hr fermentation & raised-bed sun drying',
      roastProfile: 'Medium-Light (Agtron 64/78)',
      recommendedBrew: 'Pour Over (V60), AeroPress, or French Press at 93°C',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    },
    sustainabilityFacts: [
      {
        title: '100% Recyclable Packaging',
        metric: 'Mono-Material PE',
        explanation: 'Eliminates traditional aluminium foil liners while retaining aroma freshness. Certified kerbside recyclable (RIC 4).',
        verificationMethod: 'Intertek Packaging Recyclability Lab Test #PKG-8821',
        icon: 'PackageCheck',
      },
      {
        title: 'Water-Conscious Processing',
        metric: '82% Water Saved',
        explanation: 'Uses a closed-loop mechanical demucilager requiring only 3.2 litres per kg of parchment versus the traditional 20+ litres.',
        verificationMethod: 'Central Pollution Control Board Wet-Mill Audit #CPCB-2026-WM',
        icon: 'Droplets',
      },
      {
        title: 'Low Carbon Footprint',
        metric: '1.8 kg CO₂e / 250g',
        explanation: '38% lower than the conventional specialty coffee average (2.9 kg CO₂e) due to shade agroforestry carbon sequestration.',
        verificationMethod: 'Carbon Trust Cradle-to-Grave Verification #CT-IN-4902',
        icon: 'Leaf',
      },
      {
        title: 'Fair Pay Indicator',
        metric: '+18% Above Benchmark',
        explanation: 'Guaranteed floor price paid directly to 42 family accounts, bypassing intermediary commission deductions.',
        verificationMethod: 'Independent Auditor Collective Escrow Ledger #ESCROW-KGC-42',
        icon: 'HandCoins',
      },
      {
        title: 'Ethical Labour Verification',
        metric: '0 Child Labour Flags',
        explanation: 'Unannounced harvest-season farm audits ensure strict observance of ILO Convention 138 & 182 and fair adult working hours.',
        verificationMethod: 'FairTrace Global Social Accountability Audit #SA-8000-0926',
        icon: 'ShieldCheck',
      },
      {
        title: 'Verified Checkpoints',
        metric: '5 of 5 Cryptographically Signed',
        explanation: 'Every touchpoint from tree branch to retail shelf generated an immutable cryptographic hash record.',
        verificationMethod: 'Decentralized Audit Network Anchor #DAN-BLK-79281',
        icon: 'CheckCircle2',
      },
    ],
    timeline: [
      {
        id: 'event-1',
        date: '12 Sep 2026',
        title: 'Harvested in Coorg',
        summary: 'Hand-picked by 42 members of the Kodagu Growers Collective.',
        description: 'Selective harvesting exclusively of deep-crimson, fully ripe coffee cherries on 8 shade-grown parcels in Somwarpet, Coorg. Cherries were sorted by hand to eliminate underripe and defect beans.',
        actor: 'Kodagu Growers Collective',
        actorRole: 'Grower Community Lead: Ravi Bopanna',
        location: 'Somwarpet Hills, Coorg, Karnataka (12.4244° N, 75.7382° E)',
        coordinates: { x: 22, y: 78 },
        status: 'completed',
        proof: {
          recordId: 'KGC-881',
          type: 'Harvest Batch Inception',
          verifiedBy: 'Kodagu District Agri-Inspectorate',
          signatureHash: '0x8f4c...9b12a3',
          timestamp: '2026-09-12T08:45:00+05:30',
          location: 'Somwarpet Lot 4B',
          inspectorName: 'Ravi Bopanna',
          inspectorRole: 'Certified Field Agronomist (#AGR-884)',
          sensorData: {
            'Brix Sugar Level': '21.4° Bx',
            'Lot Weight': '1,420 kg fresh cherry',
            'Elevation': '2,100 m MSL',
            'Harvest Method': '100% Selective Hand-Pick'
          },
          documentUrl: '#proof-kgc-881'
        },
        impactMetrics: [
          { label: 'Ripe Pick Rate', value: '98.6%', detail: 'Zero green cherry stripping' },
          { label: 'Farmer Direct Payout', value: '₹340 / kg', detail: '+18% above regional auction' }
        ],
        tags: ['Harvest', 'Fair Trade', 'Shade Grown']
      },
      {
        id: 'event-2',
        date: '15 Sep 2026',
        title: 'Washed & Sun-Dried',
        summary: 'Processed at the community station using recorded water-saving methods.',
        description: 'Cherries depulped within 14 hours of picking using eco-pulpers that recirculate purified wash water. Fermented for 24 hours under mountain spring conditions, then dried on raised African bamboo beds to achieve optimal 11.2% moisture content.',
        actor: 'Cauvery River Basin Processing Hub',
        actorRole: 'Wet Mill Operations Manager: Meera Kariappa',
        location: 'Madikeri Eco-Facility, Coorg (12.4208° N, 75.7397° E)',
        coordinates: { x: 30, y: 68 },
        status: 'completed',
        proof: {
          recordId: 'PS-046',
          type: 'Wet-Mill Quality & Moisture Assay',
          verifiedBy: 'Karnataka State Pollution Control Board & FairTrace',
          signatureHash: '0x4e2a...c0871f',
          timestamp: '2026-09-15T16:20:00+05:30',
          location: 'Madikeri Processing Yard #3',
          inspectorName: 'Meera Kariappa',
          inspectorRole: 'Senior Quality Technologist (Q-Processor #QP-42)',
          sensorData: {
            'Final Moisture': '11.2%',
            'Water Consumption': '3.2 L / kg parchment (82% reduction)',
            'Drying Bed Bedding': 'Raised African Mesh',
            'Water Effluent pH': '7.1 (Neutralized)'
          },
          documentUrl: '#proof-ps-046'
        },
        impactMetrics: [
          { label: 'Water Saved', value: '23,800 Litres', detail: 'Recirculated closed-loop' },
          { label: 'Defect Count', value: '0.4%', detail: 'Specialty Grade 1 standard' }
        ],
        tags: ['Eco-Pulped', 'Water Conservation', 'Sun Dried']
      },
      {
        id: 'event-3',
        date: '24 Sep 2026',
        title: 'Roasted in Bengaluru',
        summary: 'Small-batch roasted; moisture and flavour checks passed.',
        description: 'Green beans rested for 7 days before precision roasting on an electrified, low-emission Loring S35 Kestrel convection roaster. Roasted to a calibrated medium-light profile to accentuate citrus clarity and honey finish. Cupped and certified by Q-Graders.',
        actor: 'Bengaluru Specialty Roasting Lab',
        actorRole: 'Head Roaster & CQI Q-Grader: Vikram Chandran',
        location: 'Indiranagar Craft Roastery, Bengaluru (12.9716° N, 77.5946° E)',
        coordinates: { x: 62, y: 44 },
        status: 'completed',
        proof: {
          recordId: 'QC-314',
          type: 'Roast Profile & Cupping Certification',
          verifiedBy: 'Specialty Coffee Association (SCA) Accredited Lab',
          signatureHash: '0x99b1...ff348e',
          timestamp: '2026-09-24T11:15:00+05:30',
          location: 'Lab Roaster #2, Bengaluru',
          inspectorName: 'Vikram Chandran',
          inspectorRole: 'Licensed CQI Arabica Q-Grader (#Q-9812)',
          sensorData: {
            'Cupping Score': '87.5 / 100',
            'Development Time': '12.4% (1 min 42s)',
            'Roaster Energy': '100% Rooftop Solar Powered',
            'Agtron Color': '64 Ground / 78 Whole'
          },
          documentUrl: '#proof-qc-314'
        },
        impactMetrics: [
          { label: 'SCA Cupping Score', value: '87.5 / 100', detail: 'Classified as Specialty' },
          { label: 'Clean Power Used', value: '100% Solar', detail: 'Zero diesel roaster emissions' }
        ],
        tags: ['Precision Roast', 'SCA Certified', 'Solar Powered']
      },
      {
        id: 'event-4',
        date: '02 Oct 2026',
        title: 'Packed & Dispatched',
        summary: 'Sealed in recyclable packaging and released for retail delivery.',
        description: 'Whole beans nitrogen-flushed to residual oxygen below 0.5% and sealed in custom high-barrier mono-material PE pouches. Dispatched from central fulfillment hub via Mahindra Zor Grand electric delivery fleet to urban retail partners.',
        actor: 'GreenPath Cold-Chain Logistics',
        actorRole: 'Dispatch Fleet Manager: Sneha Rao',
        location: 'Whitefield Distribution Hub, Bengaluru (12.9698° N, 77.7500° E)',
        coordinates: { x: 74, y: 38 },
        status: 'completed',
        proof: {
          recordId: 'SH-792',
          type: 'Packaging Integrity & EV Logistics Manifest',
          verifiedBy: 'GreenLogistics India & Bureau Veritas',
          signatureHash: '0x17d8...44aa90',
          timestamp: '2026-10-02T14:30:00+05:30',
          location: 'Distribution Bay 4',
          inspectorName: 'Sneha Rao',
          inspectorRole: 'Certified Logistics Compliance Auditor',
          sensorData: {
            'Residual Oxygen': '0.38%',
            'Packaging Spec': '100% Recyclable PE-4 (BPA Free)',
            'Transport Mode': 'Electric Vehicle (Fleet #EV-BLR-19)',
            'Carbon Offset': 'Verified Gold Standard VCU'
          },
          documentUrl: '#proof-sh-792'
        },
        impactMetrics: [
          { label: 'Pouch Recyclability', value: '100%', detail: 'Mono-material polymer' },
          { label: 'Transport CO₂ Saved', value: '44 kg CO₂e', detail: 'EV last-mile delivery' }
        ],
        tags: ['Eco Packaging', 'EV Transit', 'Zero Defect']
      },
      {
        id: 'event-5',
        date: '14 Oct 2026',
        title: 'Received by Retail Partner',
        summary: 'Arrival, condition and batch number verified at destination.',
        description: 'Consignment received at premium partner store. Automated barcode and temperature logger scan confirmed zero seal damage, correct lot numbering, and immediate transition to temperature-controlled shelves.',
        actor: 'Nature’s Heritage Specialty Grocers',
        actorRole: 'Store Quality Lead: Amit Deshmukh',
        location: 'Flagship Store, Lavelle Road, Bengaluru (12.9733° N, 77.5989° E)',
        coordinates: { x: 88, y: 24 },
        status: 'verified',
        proof: {
          recordId: 'RT-117',
          type: 'Retail Intake & Verification Receipt',
          verifiedBy: 'Nature’s Heritage Inward Quality Audit',
          signatureHash: '0x66c3...19f201',
          timestamp: '2026-10-14T09:12:00+05:30',
          location: 'Inward Dock, Shelf Unit A-3',
          inspectorName: 'Amit Deshmukh',
          inspectorRole: 'Category Manager (Specialty Foods)',
          sensorData: {
            'Shelf Life Verified': '12 Months Freshness Window',
            'Transit Temperature Log': 'Consistent 21°C - 24°C',
            'Lot Seal Status': '100% Intact / Verified',
            'Consumer QR Ready': 'Active in ForkTrace Registry'
          },
          documentUrl: '#proof-rt-117'
        },
        impactMetrics: [
          { label: 'Freshness Index', value: '99.4%', detail: 'Roasted within 20 days' },
          { label: 'Customer Trust Rating', value: '4.9 / 5.0', detail: 'Verified shopper scans' }
        ],
        tags: ['Shelf Verified', 'Consumer Ready', 'Final Checkpoint']
      }
    ],
    route: [
      {
        id: 'cp-1',
        name: 'Coorg Highlands (Somwarpet)',
        role: 'Origin & Harvest',
        location: 'Coorg, Western Ghats',
        coordinates: { x: 18, y: 78 },
        date: '12 Sep 2026',
        status: 'origin',
      },
      {
        id: 'cp-2',
        name: 'Madikeri Eco-Station',
        role: 'Washing & Solar Drying',
        location: 'Madikeri, Coorg',
        coordinates: { x: 34, y: 66 },
        date: '15 Sep 2026',
        status: 'transit',
      },
      {
        id: 'cp-3',
        name: 'Bengaluru Specialty Roastery',
        role: 'Precision Solar Roasting',
        location: 'Indiranagar, Bengaluru',
        coordinates: { x: 62, y: 46 },
        date: '24 Sep 2026',
        status: 'roastery',
      },
      {
        id: 'cp-4',
        name: 'Eco-Logistics Hub',
        role: 'Recyclable Nitrogen Packaging',
        location: 'Whitefield, Bengaluru',
        coordinates: { x: 76, y: 36 },
        date: '02 Oct 2026',
        status: 'transit',
      },
      {
        id: 'cp-5',
        name: 'Retail Shelf (Nature’s Heritage)',
        role: 'Final Verification & Shelf',
        location: 'Lavelle Road, Bengaluru',
        coordinates: { x: 90, y: 22 },
        date: '14 Oct 2026',
        status: 'retail',
      },
    ],
    cryptoProof: {
      rootMerkleHash: '0x8f4c391bb72a08f519c289ad0b33c162f18903c72b',
      ledgerBlock: 1849204,
      timestamp: '2026-10-14T09:12:00+05:30',
      signatureAlgorithm: 'Ed25519-SHA256 with Zero-Knowledge Merkle Tree',
      auditor: 'FairTrace Global Trust Network & CPCB Regional Council',
      auditCertUrl: 'https://cert.forktrace.app/verify/FT-COF-2407',
      certificateHash: 'CERT-FORKTRACE-2026-COF-88192',
    }
  },

  // Secondary demo batch for tea lovers to show system versatility
  'FT-TEA-1082': {
    code: 'FT-TEA-1082',
    name: 'Misty Peak Darjeeling First Flush',
    tagline: 'Single-estate biodynamic loose leaf tea plucked at daybreak in Kurseong.',
    category: 'Single Estate Tea',
    packSize: '100 g Artisan Tin',
    variety: 'Camellia Sinensis Sinensis (China Bush)',
    lastVerified: '11 Oct 2026',
    origin: {
      region: 'Kurseong Valley, Darjeeling',
      state: 'West Bengal',
      country: 'India',
      elevation: '1,450 m',
      microclimate: 'Himalayan mist and high UV diurnal fluctuations',
      soilType: 'Virgin mountain loam rich in natural organic minerals',
      gpsCoords: '26.8821° N, 88.2778° E',
    },
    producers: {
      count: 28,
      collectiveName: 'Kurseong Women Tea Masters Collective',
      leadFarmerName: 'Dawa Tamang',
      leadFarmerQuote: 'Every tea leaf holds the morning Himalayan dew. ForkTrace proves that our biodynamic garden has never seen a single drop of chemical pesticide.',
      communityStory: '100% woman-led tea masters union practicing Demeter biodynamic agriculture for over 18 years on steep Himalayan slopes.',
      photoUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
      collectiveModel: 'Demeter Certified Biodynamic Women Workers Guild',
      fairPayBenchmark: '+24% above the West Bengal minimum tea plantation wage',
      directTransferConfirmationId: 'NEFT-WB-5512-KWTC-2026',
    },
    metrics: {
      fairPayPercent: 24,
      fairPayBasis: '+24% above the state tea garden statutory wage',
      carbonKgPerPack: 0.65,
      carbonIndustryBenchmark: 1.4,
      traceScore: 96,
      childLabourFlags: 0,
      verifiedCheckpoints: 4,
      packagingRecyclable: '100% infinitely recyclable embossed tin',
      waterMethod: 'Pure rain-fed mountain watershed (0 irrigation groundwater)',
    },
    scoreBreakdown: [
      {
        category: 'Origin Authenticity & Elevation',
        score: 99,
        weight: '25%',
        explanation: 'Geographic Indication (GI) tag registered with Tea Board of India and satellite parcel registration.',
        status: 'exceptional',
      },
      {
        category: 'Fair Pay & Gender Equity',
        score: 98,
        weight: '25%',
        explanation: 'Audited escrow wages paid directly into workers self-help banking accounts with healthcare coverage.',
        status: 'exceptional',
      },
      {
        category: 'Supply-Chain Custody Proofs',
        score: 95,
        weight: '20%',
        explanation: 'Four cryptographic batch transfers verified from Himalayan garden to climate-controlled packaging.',
        status: 'exceptional',
      },
      {
        category: 'Environmental & Biodiversity',
        score: 96,
        weight: '15%',
        explanation: 'Demeter Biodynamic and USDA Organic certified. Zero synthetic input with wildlife corridor protection.',
        status: 'exceptional',
      },
      {
        category: 'Packaging & Sustainability',
        score: 92,
        weight: '15%',
        explanation: 'Food-grade tinplate infinitely recyclable with compostable inner cornstarch film wrap.',
        status: 'exceptional',
      },
    ],
    productStory: {
      summary: 'Plucked by hand in late March during the coveted First Flush period, when tender two leaves and a bud emerge after winter dormancy. Yields a light golden champagne liquor with notes of muscatel grapes and spring blossoms.',
      notes: ['Muscatel Grape', 'Elderflower', 'Crisp White Peach', 'Himalayan Pine'],
      processingMethod: 'Traditional gentle orthodox roll, light oxidation & wood-fired drying',
      roastProfile: 'First Flush Orthodox (Unroasted)',
      recommendedBrew: '3 g in 200 ml filtered water at 85°C for 3 minutes',
      imageUrl: 'https://images.unsplash.com/photo-1546852199-2d8e8c4aaee6?auto=format&fit=crop&w=1200&q=80',
    },
    sustainabilityFacts: [
      {
        title: '100% Recyclable Packaging',
        metric: 'Infinitely Recyclable Tin',
        explanation: 'Sealed in plastic-free food-grade steel tin with non-toxic soy ink printing.',
        verificationMethod: 'SGS Materials Testing #SGS-TIN-4019',
        icon: 'PackageCheck',
      },
      {
        title: 'Zero Irrigation Water',
        metric: '100% Rainfed',
        explanation: 'Cultivated relying solely on natural Himalayan monsoon rainfall and mountain morning mist.',
        verificationMethod: 'Water Footprint Network Assessment #WFN-IND-091',
        icon: 'Droplets',
      },
      {
        title: 'Ultra Low Carbon Footprint',
        metric: '0.65 kg CO₂e / 100g',
        explanation: 'Sun-drying on natural terraces and solar-powered sorting reduce emissions by 53%.',
        verificationMethod: 'Greenhouse Gas Protocol Verified #GHG-DAR-771',
        icon: 'Leaf',
      },
      {
        title: 'Fair Pay & Healthcare',
        metric: '+24% Wage Premium',
        explanation: 'Direct bonus funded pension contributions and collective primary health clinic.',
        verificationMethod: 'Ethical Tea Partnership (ETP) Field Audit #ETP-2026-WB',
        icon: 'HandCoins',
      },
      {
        title: 'Zero Child Labour Guarantee',
        metric: '0 Flags Recorded',
        explanation: 'Strict child welfare registration and village school enrollment monitoring.',
        verificationMethod: 'UNICEF Community Partner Verification #CW-KURS-08',
        icon: 'ShieldCheck',
      },
      {
        title: 'Tamper-Evident Ledger',
        metric: '4 of 4 Verified Nodes',
        explanation: 'Every processing step logged on timestamped cryptographic register.',
        verificationMethod: 'Decentralized Audit Network #DAN-DAR-3912',
        icon: 'CheckCircle2',
      },
    ],
    timeline: [
      {
        id: 'tea-event-1',
        date: '28 Sep 2026',
        title: 'Plucked at Sunrise in Kurseong',
        summary: 'Gentle hand plucking of first flush tender two leaves and bud.',
        description: 'Harvested before mist burn-off between 05:30 and 08:30 AM by 28 master tea pluckers on east-facing terraces.',
        actor: 'Kurseong Biodynamic Tea Estate',
        actorRole: 'Garden Supervisor: Dawa Tamang',
        location: 'Kurseong Valley, Darjeeling, West Bengal',
        coordinates: { x: 25, y: 75 },
        status: 'completed',
        proof: {
          recordId: 'TEA-H-441',
          type: 'Harvest & Parcel GI Seal',
          verifiedBy: 'Tea Board of India GI Registry',
          signatureHash: '0x1c88...e390ab',
          timestamp: '2026-09-28T09:00:00+05:30',
          location: 'Terrace Lot 2C',
          inspectorName: 'Dawa Tamang',
          sensorData: {
            'Leaf Grade': 'FTGFOP1 (Finest Tippy Golden Flowery Orange Pekoe 1)',
            'Weight': '380 kg fresh leaf',
            'Moisture': '76.4%'
          }
        },
        impactMetrics: [
          { label: 'GI Authenticity', value: '100% Darjeeling', detail: 'Protected Geographic Indication' }
        ],
        tags: ['Hand Plucked', 'Biodynamic', 'First Flush']
      },
      {
        id: 'tea-event-2',
        date: '29 Sep 2026',
        title: 'Withering & Orthodox Roll',
        summary: 'Slow gentle withering on bamboo trough and hand orthodox rolling.',
        description: 'Tender leaves withered over natural mountain breeze for 16 hours to reduce leaf moisture to 35%, gently rolled to preserve leaf tips.',
        actor: 'Heritage Factory Kurseong',
        actorRole: 'Factory Manager: Pemba Bhutia',
        location: 'Kurseong Factory, West Bengal',
        coordinates: { x: 45, y: 55 },
        status: 'completed',
        proof: {
          recordId: 'TEA-M-102',
          type: 'Orthodox Processing & Fermentation Log',
          verifiedBy: 'SGS Organic Certifications',
          signatureHash: '0x77d1...99ef11',
          timestamp: '2026-09-29T17:30:00+05:30',
          location: 'Withering Loft 1'
        },
        impactMetrics: [
          { label: 'Energy Source', value: 'Hydro-electric', detail: 'Tidal mountain micro-turbine' }
        ],
        tags: ['Orthodox Roll', 'Gentle Withering']
      },
      {
        id: 'tea-event-3',
        date: '04 Oct 2026',
        title: 'Sealed in Artisan Tins',
        summary: 'Vacuum sealed in Darjeeling and packed into recyclable tins.',
        description: 'Packed into food-grade airtight steel containers with compostable interior pouches to preserve delicate muscatel terpenes.',
        actor: 'Himalayan Pure Botanicals Hub',
        actorRole: 'Quality Lead: Sunita Rai',
        location: 'Siliguri Logistics Junction',
        coordinates: { x: 68, y: 40 },
        status: 'completed',
        proof: {
          recordId: 'TEA-PK-88',
          type: 'Packaging & Tin Inspection',
          verifiedBy: 'Bureau Veritas Packaging Audit',
          signatureHash: '0x9923...bb4481',
          timestamp: '2026-10-04T12:00:00+05:30',
          location: 'Siliguri Terminal'
        },
        impactMetrics: [
          { label: 'Recyclability', value: '100% Metal Tin', detail: 'Zero single-use plastic' }
        ],
        tags: ['Artisan Tin', 'Plastic Free']
      },
      {
        id: 'tea-event-4',
        date: '11 Oct 2026',
        title: 'Delivered to Gourmet Partner',
        summary: 'Final delivery verification at curated organic tea salon.',
        description: 'Air shipment arrival verified, lot numbers cross-referenced with GI cert.',
        actor: 'Aura Fine Teas Boutique',
        actorRole: 'Curator: Rohit Sharma',
        location: 'Khan Market, New Delhi',
        coordinates: { x: 88, y: 20 },
        status: 'verified',
        proof: {
          recordId: 'TEA-RT-301',
          type: 'Inward Quality Clearance',
          verifiedBy: 'Aura Organic Assurance Lab',
          signatureHash: '0x55aa...33d87f',
          timestamp: '2026-10-11T10:45:00+05:30',
          location: 'Delhi Store 1'
        },
        impactMetrics: [
          { label: 'Verification Status', value: 'Passed 100%', detail: 'All 4 seals verified' }
        ],
        tags: ['Gourmet Shelf', 'Verified']
      }
    ],
    route: [
      {
        id: 't-cp-1',
        name: 'Kurseong Terraces',
        role: 'Biodynamic Harvest',
        location: 'Kurseong, Darjeeling',
        coordinates: { x: 20, y: 75 },
        date: '28 Sep 2026',
        status: 'origin',
      },
      {
        id: 't-cp-2',
        name: 'Heritage Micro-Factory',
        role: 'Orthodox Processing',
        location: 'Kurseong Valley',
        coordinates: { x: 42, y: 55 },
        date: '29 Sep 2026',
        status: 'transit',
      },
      {
        id: 't-cp-3',
        name: 'Siliguri Clean Hub',
        role: 'Artisan Tin Packaging',
        location: 'Siliguri, West Bengal',
        coordinates: { x: 65, y: 40 },
        date: '04 Oct 2026',
        status: 'roastery',
      },
      {
        id: 't-cp-4',
        name: 'Aura Fine Teas Boutique',
        role: 'Retail Destination',
        location: 'Khan Market, New Delhi',
        coordinates: { x: 88, y: 20 },
        date: '11 Oct 2026',
        status: 'retail',
      },
    ],
    cryptoProof: {
      rootMerkleHash: '0x1c88392fb819a00b84172ce818320490bf7a113d',
      ledgerBlock: 1848911,
      timestamp: '2026-10-11T10:45:00+05:30',
      signatureAlgorithm: 'Ed25519-SHA256 with Tea Board GI Sign-off',
      auditor: 'FairTrace Global & Tea Board of India',
      auditCertUrl: 'https://cert.forktrace.app/verify/FT-TEA-1082',
      certificateHash: 'CERT-FORKTRACE-2026-TEA-99014',
    }
  }
};

