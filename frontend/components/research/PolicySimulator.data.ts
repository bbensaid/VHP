/**
 * Static data and formatting helpers for PolicySimulator.
 *
 * Pure data + pure functions only — no React, no hooks. Imported by the shell
 * and by every tab file. Adding/editing a state, waiver type, or procedure?
 * Edit this file.
 */

export type Tab = "waiver" | "apm" | "expansion" | "transparency";

export const STATE_DATA: Record<
  string,
  {
    enrollees: number;
    perCapitaSpending: number;
    fmap: number;
    budgetPct: number;
    uninsuredRate: number;
    population: number;
  }
> = {
  Vermont: {
    enrollees: 218000,
    perCapitaSpending: 9800,
    fmap: 56.87,
    budgetPct: 28.4,
    uninsuredRate: 4.2,
    population: 647000,
  },
  "New York": {
    enrollees: 7800000,
    perCapitaSpending: 11200,
    fmap: 50.0,
    budgetPct: 35.1,
    uninsuredRate: 5.8,
    population: 19800000,
  },
  California: {
    enrollees: 14500000,
    perCapitaSpending: 7900,
    fmap: 50.0,
    budgetPct: 21.3,
    uninsuredRate: 7.2,
    population: 39200000,
  },
  Texas: {
    enrollees: 4900000,
    perCapitaSpending: 5600,
    fmap: 58.77,
    budgetPct: 18.9,
    uninsuredRate: 18.4,
    population: 30000000,
  },
  Ohio: {
    enrollees: 3100000,
    perCapitaSpending: 7200,
    fmap: 63.18,
    budgetPct: 26.7,
    uninsuredRate: 6.5,
    population: 11800000,
  },
  Michigan: {
    enrollees: 2800000,
    perCapitaSpending: 7800,
    fmap: 67.42,
    budgetPct: 29.8,
    uninsuredRate: 5.6,
    population: 10000000,
  },
};

export const WAIVER_TYPES = [
  {
    id: "global_commitment",
    label: "Global Commitment to Health (Vermont)",
    approvalBase: 0.82,
    cmsAlignment: "High",
  },
  {
    id: "dsrip",
    label: "DSRIP (NY/NJ/TX model)",
    approvalBase: 0.68,
    cmsAlignment: "Moderate",
  },
  {
    id: "community_engagement",
    label: "Community Engagement Requirements",
    approvalBase: 0.35,
    cmsAlignment: "Low",
  },
  {
    id: "expansion_premium",
    label: "Expansion with Premium",
    approvalBase: 0.55,
    cmsAlignment: "Moderate",
  },
  {
    id: "managed_care",
    label: "Managed Care",
    approvalBase: 0.72,
    cmsAlignment: "High",
  },
  {
    id: "behavioral_health",
    label: "Behavioral Health Focus",
    approvalBase: 0.78,
    cmsAlignment: "High",
  },
  {
    id: "global_budget",
    label: "Global Budget",
    approvalBase: 0.6,
    cmsAlignment: "Moderate",
  },
];

export const NON_EXPANSION_STATES: Record<
  string,
  {
    uninsuredRate: number;
    coverageGap: number;
    uncomp: number;
    population: number;
    fmap: number;
    label: string;
  }
> = {
  Texas: {
    uninsuredRate: 18.4,
    coverageGap: 1200000,
    uncomp: 5800000000,
    population: 30000000,
    fmap: 58.77,
    label: "Texas",
  },
  Florida: {
    uninsuredRate: 13.2,
    coverageGap: 780000,
    uncomp: 3900000000,
    population: 22600000,
    fmap: 55.14,
    label: "Florida",
  },
  Georgia: {
    uninsuredRate: 13.8,
    coverageGap: 410000,
    uncomp: 2100000000,
    population: 10900000,
    fmap: 67.19,
    label: "Georgia",
  },
  Tennessee: {
    uninsuredRate: 11.0,
    coverageGap: 190000,
    uncomp: 1200000000,
    population: 7100000,
    fmap: 66.57,
    label: "Tennessee",
  },
  Alabama: {
    uninsuredRate: 11.5,
    coverageGap: 165000,
    uncomp: 890000000,
    population: 5100000,
    fmap: 77.96,
    label: "Alabama",
  },
  Mississippi: {
    uninsuredRate: 13.4,
    coverageGap: 143000,
    uncomp: 720000000,
    population: 2960000,
    fmap: 77.96,
    label: "Mississippi",
  },
  SouthCarolina: {
    uninsuredRate: 12.1,
    coverageGap: 170000,
    uncomp: 980000000,
    population: 5300000,
    fmap: 70.54,
    label: "South Carolina",
  },
  Kansas: {
    uninsuredRate: 9.0,
    coverageGap: 96000,
    uncomp: 540000000,
    population: 2940000,
    fmap: 56.95,
    label: "Kansas",
  },
  Wisconsin: {
    uninsuredRate: 6.8,
    coverageGap: 89000,
    uncomp: 470000000,
    population: 5900000,
    fmap: 59.9,
    label: "Wisconsin",
  },
  Wyoming: {
    uninsuredRate: 10.8,
    coverageGap: 21000,
    uncomp: 130000000,
    population: 581000,
    fmap: 50.0,
    label: "Wyoming",
  },
};

export const PROCEDURES = [
  {
    id: "em",
    label: "Evaluation & Management",
    hopdRate: 180,
    ascRate: 80,
    officeRate: 75,
  },
  {
    id: "echo",
    label: "Echocardiogram",
    hopdRate: 890,
    ascRate: 420,
    officeRate: 310,
  },
  {
    id: "ptot",
    label: "PT/OT (per session)",
    hopdRate: 230,
    ascRate: 110,
    officeRate: 90,
  },
  {
    id: "colonoscopy",
    label: "Colonoscopy",
    hopdRate: 1850,
    ascRate: 620,
    officeRate: 520,
  },
  {
    id: "infusion",
    label: "Infusion Therapy (per hour)",
    hopdRate: 520,
    ascRate: 200,
    officeRate: 160,
  },
  {
    id: "lab",
    label: "Lab Services (per panel)",
    hopdRate: 180,
    ascRate: 95,
    officeRate: 60,
  },
];

export const NSA_SPECIALTIES = [
  "Emergency Medicine",
  "Anesthesiology",
  "Radiology",
  "Pathology",
  "Neonatology",
];

// ─── Formatting helpers ──────────────────────────────────────────────────────

export const fmt = (n: number, decimals = 1) =>
  n.toLocaleString("en-US", { maximumFractionDigits: decimals });

export const fmtM = (n: number) => {
  if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
};

export const fmtPct = (n: number) => `${n.toFixed(1)}%`;
