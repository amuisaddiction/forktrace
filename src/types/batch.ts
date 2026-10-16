export interface TimelineProof {
  recordId: string;
  type: string;
  verifiedBy: string;
  signatureHash: string;
  timestamp: string;
  location: string;
  inspectorName?: string;
  inspectorRole?: string;
  sensorData?: Record<string, string | number>;
  documentUrl?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  summary: string;
  description: string;
  actor: string;
  actorRole: string;
  location: string;
  coordinates: { x: number; y: number }; // percentage coords on interactive route visual
  status: 'completed' | 'in_transit' | 'verified';
  proof: TimelineProof;
  impactMetrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  tags: string[];
}

export interface RouteCheckpoint {
  id: string;
  name: string;
  role: string;
  location: string;
  coordinates: { x: number; y: number };
  date: string;
  status: 'origin' | 'transit' | 'roastery' | 'retail';
}

export interface ProducerInfo {
  count: number;
  collectiveName: string;
  leadFarmerName: string;
  leadFarmerQuote: string;
  communityStory: string;
  photoUrl: string;
  collectiveModel: string;
  fairPayBenchmark: string;
  directTransferConfirmationId: string;
}

export interface ScoreCategory {
  category: string;
  score: number;
  weight: string;
  explanation: string;
  status: 'exceptional' | 'verified' | 'good';
}

export interface BatchData {
  code: string;
  name: string;
  tagline: string;
  category: string;
  packSize: string;
  variety: string;
  lastVerified: string;
  origin: {
    region: string;
    state: string;
    country: string;
    elevation: string;
    microclimate: string;
    soilType: string;
    gpsCoords: string;
  };
  producers: ProducerInfo;
  metrics: {
    fairPayPercent: number; // e.g. 18 (+18%)
    fairPayBasis: string;
    carbonKgPerPack: number; // e.g. 1.8
    carbonIndustryBenchmark: number; // e.g. 2.9
    traceScore: number; // e.g. 92
    childLabourFlags: number; // 0
    verifiedCheckpoints: number; // 5
    packagingRecyclable: string;
    waterMethod: string;
  };
  scoreBreakdown: ScoreCategory[];
  productStory: {
    summary: string;
    notes: string[];
    processingMethod: string;
    roastProfile: string;
    recommendedBrew: string;
    imageUrl: string;
  };
  sustainabilityFacts: {
    title: string;
    metric: string;
    explanation: string;
    verificationMethod: string;
    icon: string;
  }[];
  timeline: TimelineEvent[];
  route: RouteCheckpoint[];
  cryptoProof: {
    rootMerkleHash: string;
    ledgerBlock: number;
    timestamp: string;
    signatureAlgorithm: string;
    auditor: string;
    auditCertUrl: string;
    certificateHash: string;
  };
}

