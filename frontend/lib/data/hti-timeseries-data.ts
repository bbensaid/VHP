/**
 * HTI Time-Series Data — Quarterly snapshots per state
 * Enables trend analysis, trajectory scoring, and projection modeling.
 *
 * Each quarter stores the 6 domain scores (same dimensions as HTI_WEIGHTS).
 * Quarter keys: "Q1-2023", "Q2-2023", ... "Q4-2024", "Q1-2025"
 */

export type QuarterlySnapshot = {
  quarter: string;     // "Q1-2023"
  composite: number;   // Composite HTI score 0-100
  digital: number;
  vbc: number;         // Value-Based Care
  equity: number;      // Social Determinants
  outcomes: number;    // Clinical Excellence
  experience: number;  // Patient Experience
  workforce: number;   // Workforce Wellness
};

export type StateTimeSeries = {
  stateId: string;
  stateName: string;
  region: string;
  snapshots: QuarterlySnapshot[];
  // Additional clinical/economic metrics beyond the 6 HTI domains
  clinicalMetrics: {
    preventableHospitalizationRate: number;   // per 100k
    maternalMortalityRate: number;            // per 100k live births
    cancerScreeningRate: number;              // % of eligible patients
    mentalHealthAccessRate: number;           // % of need met
    primaryCareDensity: number;               // PCPs per 10k population
    opioidOverdoseDeaths: number;             // per 100k
    uncompensatedCareRatio: number;           // % of total hospital costs
  };
  economicMetrics: {
    spendingPerCapita: number;               // USD
    medicalInflationRate: number;            // % annual
    uninsuredRate: number;                   // %
    medicaidExpansion: boolean;
    operatingMarginAvg: number;              // % hospital operating margin
    payerMixCommercial: number;              // % commercial payer
    workforceTurnoverRate: number;           // % annual
  };
};

// ─── NATIONAL BENCHMARK ──────────────────────────────────────────────────────

export const nationalBenchmark: QuarterlySnapshot[] = [
  { quarter: "Q1-2023", composite: 61, digital: 65, vbc: 52, equity: 48, outcomes: 72, experience: 68, workforce: 55 },
  { quarter: "Q2-2023", composite: 62, digital: 67, vbc: 54, equity: 49, outcomes: 73, experience: 69, workforce: 56 },
  { quarter: "Q3-2023", composite: 63, digital: 68, vbc: 55, equity: 50, outcomes: 74, experience: 70, workforce: 57 },
  { quarter: "Q4-2023", composite: 64, digital: 70, vbc: 57, equity: 51, outcomes: 75, experience: 71, workforce: 57 },
  { quarter: "Q1-2024", composite: 65, digital: 72, vbc: 59, equity: 52, outcomes: 76, experience: 72, workforce: 58 },
  { quarter: "Q2-2024", composite: 66, digital: 74, vbc: 61, equity: 54, outcomes: 77, experience: 73, workforce: 59 },
  { quarter: "Q3-2024", composite: 67, digital: 75, vbc: 62, equity: 55, outcomes: 78, experience: 74, workforce: 60 },
  { quarter: "Q4-2024", composite: 68, digital: 77, vbc: 64, equity: 56, outcomes: 79, experience: 75, workforce: 61 },
  { quarter: "Q1-2025", composite: 69, digital: 78, vbc: 65, equity: 57, outcomes: 80, experience: 76, workforce: 62 },
];

// ─── TOP-PERFORMING STATES ───────────────────────────────────────────────────

export const stateTimeSeries: StateTimeSeries[] = [
  {
    stateId: "vermont",
    stateName: "Vermont",
    region: "Northeast",
    snapshots: [
      { quarter: "Q1-2023", composite: 76, digital: 80, vbc: 78, equity: 68, outcomes: 82, experience: 75, workforce: 70 },
      { quarter: "Q2-2023", composite: 77, digital: 82, vbc: 79, equity: 69, outcomes: 83, experience: 76, workforce: 71 },
      { quarter: "Q3-2023", composite: 78, digital: 83, vbc: 80, equity: 70, outcomes: 84, experience: 77, workforce: 72 },
      { quarter: "Q4-2023", composite: 79, digital: 85, vbc: 82, equity: 71, outcomes: 85, experience: 78, workforce: 73 },
      { quarter: "Q1-2024", composite: 80, digital: 86, vbc: 84, equity: 72, outcomes: 86, experience: 79, workforce: 74 },
      { quarter: "Q2-2024", composite: 81, digital: 87, vbc: 85, equity: 73, outcomes: 87, experience: 80, workforce: 75 },
      { quarter: "Q3-2024", composite: 81, digital: 88, vbc: 86, equity: 74, outcomes: 87, experience: 81, workforce: 75 },
      { quarter: "Q4-2024", composite: 82, digital: 89, vbc: 87, equity: 75, outcomes: 88, experience: 82, workforce: 76 },
      { quarter: "Q1-2025", composite: 82, digital: 90, vbc: 88, equity: 75, outcomes: 88, experience: 82, workforce: 76 },
    ],
    clinicalMetrics: {
      preventableHospitalizationRate: 820,
      maternalMortalityRate: 14.2,
      cancerScreeningRate: 78,
      mentalHealthAccessRate: 62,
      primaryCareDensity: 16.4,
      opioidOverdoseDeaths: 18.5,
      uncompensatedCareRatio: 3.2,
    },
    economicMetrics: {
      spendingPerCapita: 10820,
      medicalInflationRate: 4.1,
      uninsuredRate: 4.2,
      medicaidExpansion: true,
      operatingMarginAvg: 1.8,
      payerMixCommercial: 44,
      workforceTurnoverRate: 18.2,
    },
  },
  {
    stateId: "massachusetts",
    stateName: "Massachusetts",
    region: "Northeast",
    snapshots: [
      { quarter: "Q1-2023", composite: 80, digital: 86, vbc: 82, equity: 70, outcomes: 88, experience: 80, workforce: 72 },
      { quarter: "Q2-2023", composite: 80, digital: 87, vbc: 82, equity: 71, outcomes: 88, experience: 81, workforce: 72 },
      { quarter: "Q3-2023", composite: 81, digital: 88, vbc: 83, equity: 72, outcomes: 89, experience: 81, workforce: 73 },
      { quarter: "Q4-2023", composite: 82, digital: 89, vbc: 84, equity: 73, outcomes: 90, experience: 82, workforce: 74 },
      { quarter: "Q1-2024", composite: 83, digital: 90, vbc: 85, equity: 74, outcomes: 91, experience: 83, workforce: 75 },
      { quarter: "Q2-2024", composite: 83, digital: 91, vbc: 86, equity: 75, outcomes: 91, experience: 84, workforce: 75 },
      { quarter: "Q3-2024", composite: 84, digital: 92, vbc: 87, equity: 76, outcomes: 92, experience: 84, workforce: 76 },
      { quarter: "Q4-2024", composite: 85, digital: 92, vbc: 88, equity: 77, outcomes: 93, experience: 85, workforce: 77 },
      { quarter: "Q1-2025", composite: 85, digital: 93, vbc: 88, equity: 78, outcomes: 93, experience: 86, workforce: 78 },
    ],
    clinicalMetrics: {
      preventableHospitalizationRate: 710,
      maternalMortalityRate: 11.8,
      cancerScreeningRate: 82,
      mentalHealthAccessRate: 71,
      primaryCareDensity: 19.2,
      opioidOverdoseDeaths: 28.4,
      uncompensatedCareRatio: 2.8,
    },
    economicMetrics: {
      spendingPerCapita: 11940,
      medicalInflationRate: 4.4,
      uninsuredRate: 3.1,
      medicaidExpansion: true,
      operatingMarginAvg: 2.4,
      payerMixCommercial: 52,
      workforceTurnoverRate: 16.4,
    },
  },
  {
    stateId: "minnesota",
    stateName: "Minnesota",
    region: "Midwest",
    snapshots: [
      { quarter: "Q1-2023", composite: 74, digital: 78, vbc: 72, equity: 65, outcomes: 82, experience: 78, workforce: 68 },
      { quarter: "Q2-2023", composite: 75, digital: 79, vbc: 73, equity: 66, outcomes: 83, experience: 79, workforce: 69 },
      { quarter: "Q3-2023", composite: 76, digital: 80, vbc: 74, equity: 67, outcomes: 84, experience: 79, workforce: 70 },
      { quarter: "Q4-2023", composite: 77, digital: 81, vbc: 75, equity: 68, outcomes: 85, experience: 80, workforce: 71 },
      { quarter: "Q1-2024", composite: 78, digital: 82, vbc: 76, equity: 69, outcomes: 85, experience: 81, workforce: 72 },
      { quarter: "Q2-2024", composite: 78, digital: 83, vbc: 77, equity: 70, outcomes: 86, experience: 82, workforce: 72 },
      { quarter: "Q3-2024", composite: 79, digital: 84, vbc: 78, equity: 71, outcomes: 87, experience: 82, workforce: 73 },
      { quarter: "Q4-2024", composite: 80, digital: 85, vbc: 79, equity: 72, outcomes: 87, experience: 83, workforce: 74 },
      { quarter: "Q1-2025", composite: 80, digital: 86, vbc: 80, equity: 73, outcomes: 88, experience: 84, workforce: 75 },
    ],
    clinicalMetrics: {
      preventableHospitalizationRate: 760,
      maternalMortalityRate: 13.0,
      cancerScreeningRate: 80,
      mentalHealthAccessRate: 68,
      primaryCareDensity: 17.1,
      opioidOverdoseDeaths: 14.2,
      uncompensatedCareRatio: 2.9,
    },
    economicMetrics: {
      spendingPerCapita: 9840,
      medicalInflationRate: 3.9,
      uninsuredRate: 4.8,
      medicaidExpansion: true,
      operatingMarginAvg: 3.1,
      payerMixCommercial: 55,
      workforceTurnoverRate: 17.1,
    },
  },
  {
    stateId: "california",
    stateName: "California",
    region: "West",
    snapshots: [
      { quarter: "Q1-2023", composite: 70, digital: 82, vbc: 68, equity: 55, outcomes: 74, experience: 72, workforce: 62 },
      { quarter: "Q2-2023", composite: 71, digital: 83, vbc: 69, equity: 56, outcomes: 75, experience: 73, workforce: 63 },
      { quarter: "Q3-2023", composite: 72, digital: 84, vbc: 71, equity: 57, outcomes: 76, experience: 73, workforce: 63 },
      { quarter: "Q4-2023", composite: 73, digital: 85, vbc: 72, equity: 58, outcomes: 76, experience: 74, workforce: 64 },
      { quarter: "Q1-2024", composite: 74, digital: 86, vbc: 74, equity: 59, outcomes: 77, experience: 75, workforce: 65 },
      { quarter: "Q2-2024", composite: 75, digital: 87, vbc: 75, equity: 60, outcomes: 78, experience: 76, workforce: 66 },
      { quarter: "Q3-2024", composite: 75, digital: 88, vbc: 76, equity: 61, outcomes: 79, experience: 76, workforce: 66 },
      { quarter: "Q4-2024", composite: 76, digital: 89, vbc: 77, equity: 62, outcomes: 79, experience: 77, workforce: 67 },
      { quarter: "Q1-2025", composite: 77, digital: 90, vbc: 78, equity: 63, outcomes: 80, experience: 78, workforce: 68 },
    ],
    clinicalMetrics: {
      preventableHospitalizationRate: 880,
      maternalMortalityRate: 22.8,
      cancerScreeningRate: 74,
      mentalHealthAccessRate: 55,
      primaryCareDensity: 14.8,
      opioidOverdoseDeaths: 19.2,
      uncompensatedCareRatio: 4.8,
    },
    economicMetrics: {
      spendingPerCapita: 10240,
      medicalInflationRate: 5.2,
      uninsuredRate: 6.2,
      medicaidExpansion: true,
      operatingMarginAvg: 0.8,
      payerMixCommercial: 48,
      workforceTurnoverRate: 22.4,
    },
  },
  {
    stateId: "texas",
    stateName: "Texas",
    region: "South",
    snapshots: [
      { quarter: "Q1-2023", composite: 52, digital: 58, vbc: 44, equity: 38, outcomes: 62, experience: 58, workforce: 48 },
      { quarter: "Q2-2023", composite: 53, digital: 60, vbc: 45, equity: 39, outcomes: 63, experience: 59, workforce: 49 },
      { quarter: "Q3-2023", composite: 54, digital: 61, vbc: 46, equity: 40, outcomes: 64, experience: 60, workforce: 50 },
      { quarter: "Q4-2023", composite: 54, digital: 62, vbc: 47, equity: 40, outcomes: 64, experience: 61, workforce: 50 },
      { quarter: "Q1-2024", composite: 55, digital: 63, vbc: 48, equity: 41, outcomes: 65, experience: 62, workforce: 51 },
      { quarter: "Q2-2024", composite: 56, digital: 64, vbc: 49, equity: 42, outcomes: 66, experience: 62, workforce: 52 },
      { quarter: "Q3-2024", composite: 57, digital: 65, vbc: 50, equity: 43, outcomes: 67, experience: 63, workforce: 53 },
      { quarter: "Q4-2024", composite: 57, digital: 66, vbc: 51, equity: 43, outcomes: 67, experience: 64, workforce: 53 },
      { quarter: "Q1-2025", composite: 58, digital: 67, vbc: 52, equity: 44, outcomes: 68, experience: 65, workforce: 54 },
    ],
    clinicalMetrics: {
      preventableHospitalizationRate: 1240,
      maternalMortalityRate: 34.2,
      cancerScreeningRate: 60,
      mentalHealthAccessRate: 38,
      primaryCareDensity: 9.4,
      opioidOverdoseDeaths: 12.8,
      uncompensatedCareRatio: 8.4,
    },
    economicMetrics: {
      spendingPerCapita: 8120,
      medicalInflationRate: 5.8,
      uninsuredRate: 18.4,
      medicaidExpansion: false,
      operatingMarginAvg: -0.4,
      payerMixCommercial: 42,
      workforceTurnoverRate: 26.8,
    },
  },
  {
    stateId: "florida",
    stateName: "Florida",
    region: "South",
    snapshots: [
      { quarter: "Q1-2023", composite: 55, digital: 60, vbc: 50, equity: 42, outcomes: 65, experience: 60, workforce: 52 },
      { quarter: "Q2-2023", composite: 56, digital: 61, vbc: 51, equity: 43, outcomes: 65, experience: 61, workforce: 52 },
      { quarter: "Q3-2023", composite: 56, digital: 62, vbc: 52, equity: 43, outcomes: 66, experience: 62, workforce: 53 },
      { quarter: "Q4-2023", composite: 57, digital: 63, vbc: 53, equity: 44, outcomes: 66, experience: 62, workforce: 54 },
      { quarter: "Q1-2024", composite: 58, digital: 64, vbc: 54, equity: 45, outcomes: 67, experience: 63, workforce: 55 },
      { quarter: "Q2-2024", composite: 59, digital: 65, vbc: 55, equity: 46, outcomes: 68, experience: 64, workforce: 55 },
      { quarter: "Q3-2024", composite: 59, digital: 66, vbc: 56, equity: 46, outcomes: 68, experience: 65, workforce: 56 },
      { quarter: "Q4-2024", composite: 60, digital: 67, vbc: 57, equity: 47, outcomes: 69, experience: 65, workforce: 57 },
      { quarter: "Q1-2025", composite: 61, digital: 68, vbc: 58, equity: 48, outcomes: 70, experience: 66, workforce: 58 },
    ],
    clinicalMetrics: {
      preventableHospitalizationRate: 1100,
      maternalMortalityRate: 28.6,
      cancerScreeningRate: 64,
      mentalHealthAccessRate: 44,
      primaryCareDensity: 11.2,
      opioidOverdoseDeaths: 24.8,
      uncompensatedCareRatio: 6.2,
    },
    economicMetrics: {
      spendingPerCapita: 8680,
      medicalInflationRate: 5.4,
      uninsuredRate: 13.6,
      medicaidExpansion: false,
      operatingMarginAvg: 0.2,
      payerMixCommercial: 40,
      workforceTurnoverRate: 24.2,
    },
  },
  {
    stateId: "new_york",
    stateName: "New York",
    region: "Northeast",
    snapshots: [
      { quarter: "Q1-2023", composite: 68, digital: 74, vbc: 66, equity: 58, outcomes: 76, experience: 70, workforce: 62 },
      { quarter: "Q2-2023", composite: 69, digital: 75, vbc: 67, equity: 59, outcomes: 77, experience: 71, workforce: 63 },
      { quarter: "Q3-2023", composite: 70, digital: 76, vbc: 68, equity: 60, outcomes: 77, experience: 72, workforce: 64 },
      { quarter: "Q4-2023", composite: 71, digital: 77, vbc: 69, equity: 61, outcomes: 78, experience: 72, workforce: 65 },
      { quarter: "Q1-2024", composite: 72, digital: 78, vbc: 70, equity: 62, outcomes: 79, experience: 73, workforce: 65 },
      { quarter: "Q2-2024", composite: 72, digital: 79, vbc: 71, equity: 62, outcomes: 79, experience: 74, workforce: 66 },
      { quarter: "Q3-2024", composite: 73, digital: 80, vbc: 72, equity: 63, outcomes: 80, experience: 74, workforce: 67 },
      { quarter: "Q4-2024", composite: 74, digital: 81, vbc: 73, equity: 64, outcomes: 81, experience: 75, workforce: 68 },
      { quarter: "Q1-2025", composite: 74, digital: 82, vbc: 74, equity: 65, outcomes: 81, experience: 76, workforce: 68 },
    ],
    clinicalMetrics: {
      preventableHospitalizationRate: 920,
      maternalMortalityRate: 20.4,
      cancerScreeningRate: 76,
      mentalHealthAccessRate: 60,
      primaryCareDensity: 15.6,
      opioidOverdoseDeaths: 30.2,
      uncompensatedCareRatio: 5.4,
    },
    economicMetrics: {
      spendingPerCapita: 12480,
      medicalInflationRate: 4.8,
      uninsuredRate: 5.8,
      medicaidExpansion: true,
      operatingMarginAvg: -0.8,
      payerMixCommercial: 46,
      workforceTurnoverRate: 20.8,
    },
  },
  {
    stateId: "ohio",
    stateName: "Ohio",
    region: "Midwest",
    snapshots: [
      { quarter: "Q1-2023", composite: 60, digital: 64, vbc: 56, equity: 50, outcomes: 70, experience: 64, workforce: 56 },
      { quarter: "Q2-2023", composite: 61, digital: 65, vbc: 57, equity: 51, outcomes: 71, experience: 65, workforce: 57 },
      { quarter: "Q3-2023", composite: 62, digital: 66, vbc: 58, equity: 52, outcomes: 72, experience: 66, workforce: 58 },
      { quarter: "Q4-2023", composite: 63, digital: 68, vbc: 59, equity: 52, outcomes: 72, experience: 66, workforce: 58 },
      { quarter: "Q1-2024", composite: 64, digital: 69, vbc: 60, equity: 53, outcomes: 73, experience: 67, workforce: 59 },
      { quarter: "Q2-2024", composite: 64, digital: 70, vbc: 61, equity: 54, outcomes: 74, experience: 68, workforce: 60 },
      { quarter: "Q3-2024", composite: 65, digital: 71, vbc: 62, equity: 55, outcomes: 74, experience: 69, workforce: 61 },
      { quarter: "Q4-2024", composite: 66, digital: 72, vbc: 63, equity: 56, outcomes: 75, experience: 69, workforce: 61 },
      { quarter: "Q1-2025", composite: 67, digital: 73, vbc: 64, equity: 57, outcomes: 76, experience: 70, workforce: 62 },
    ],
    clinicalMetrics: {
      preventableHospitalizationRate: 1040,
      maternalMortalityRate: 24.8,
      cancerScreeningRate: 68,
      mentalHealthAccessRate: 50,
      primaryCareDensity: 12.4,
      opioidOverdoseDeaths: 42.6,
      uncompensatedCareRatio: 5.8,
    },
    economicMetrics: {
      spendingPerCapita: 8920,
      medicalInflationRate: 4.6,
      uninsuredRate: 7.2,
      medicaidExpansion: true,
      operatingMarginAvg: 0.6,
      payerMixCommercial: 50,
      workforceTurnoverRate: 21.4,
    },
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Get the latest snapshot for a state */
export function getLatestSnapshot(stateId: string): QuarterlySnapshot | null {
  const s = stateTimeSeries.find(s => s.stateId === stateId);
  if (!s) return null;
  return s.snapshots[s.snapshots.length - 1];
}

/** Compute trend velocity: score change from first to last snapshot */
export function getTrendVelocity(stateId: string): number {
  const s = stateTimeSeries.find(s => s.stateId === stateId);
  if (!s || s.snapshots.length < 2) return 0;
  return s.snapshots[s.snapshots.length - 1].composite - s.snapshots[0].composite;
}

/** Linear regression projection for next N quarters */
export function projectScore(snapshots: QuarterlySnapshot[], quarters: number): number[] {
  const n = snapshots.length;
  if (n < 2) return [];
  const xs = snapshots.map((_, i) => i);
  const ys = snapshots.map(s => s.composite);
  const sumX = xs.reduce((a, b) => a + b, 0);
  const sumY = ys.reduce((a, b) => a + b, 0);
  const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0);
  const sumX2 = xs.reduce((a, x) => a + x * x, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return Array.from({ length: quarters }, (_, i) => {
    const projected = intercept + slope * (n + i);
    return Math.min(100, Math.max(0, Math.round(projected * 10) / 10));
  });
}
