"use client";

import React, { useState, useMemo } from "react";
import {
  Trophy,
  Medal,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  Search,
  Download,
  BarChart2,
  Building2,
  Shield,
  Globe,
  ArrowUpDown,
  Info,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type TabId = "states" | "hospitals" | "payers";

type SortDirection = "asc" | "desc";

/**
 * Rebuilt 2026-09-22 (tool-extension queue #3/#6) so this tab is explicitly PILLAR-shaped
 * (Policy/Technology/Economics/Clinical/Operations) instead of the old six-domain maturity
 * index (digitalMaturity/valueBased/sdohEquity/clinicalExcellence/patientExperience/
 * workforceWellness) that Ch13 cited as if it were the book's five pillars but wasn't.
 *
 * Per project_readiness_vs_maturity.md, pillar READINESS is sourced for Vermont ONLY, from
 * lib/framework/sequence-engine.ts PRESETS (via lib/framework/pillar-mapping.ts). It is never
 * invented for other states. So this table's five columns are NOT "readiness" for 49 of 50
 * states — they are a "Pillar Indicator": real, cited data where a genuine multi-state source
 * exists, and a clearly disclosed SIMULATED estimate where none does. Only Vermont's row is
 * overridden with the actual sourced readiness numbers so it cannot drift from the Simulator /
 * Friction Index / HTI Dashboard (see VERMONT_READINESS_OVERRIDE below and the on-screen
 * watermark). Full sourcing notes: see PILLAR_METHODOLOGY_NOTES below the data.
 */
interface StateRecord {
  rank: number;
  state: string;
  abbr: string;
  region: "Northeast" | "South" | "Midwest" | "West";
  composite: number;
  policy: number;
  technology: number;
  economics: number;
  clinical: number;
  operations: number;
  /** Real federal/state program this state's Policy score is classified from (or "—"). */
  policyProgram: string;
  /** True for exactly one state (Vermont): all five numbers are the book's sourced pillar
   *  readiness (sequence-engine PRESETS), not this table's own indicator methodology. */
  readinessSourced: boolean;
  /** Per-dimension: true where the number is a disclosed simulated estimate rather than
   *  derived from a real published multi-state dataset. Always false when readinessSourced. */
  simulated: { technology: boolean; economics: boolean; operations: boolean };
}

interface HospitalSystem {
  rank: number;
  name: string;
  state: string;
  region: "Northeast" | "South" | "Midwest" | "West";
  type: "Non-profit" | "For-profit" | "Government" | "Integrated";
  maturity: number;
  revenueRisk: number;
  acoApm: number;
  qualityPerf: number;
  dataAnalytics: number;
  patientEngagement: number;
  trend: number;
}

interface Payer {
  rank: number;
  name: string;
  payerType: "Commercial" | "Medicare Advantage" | "Medicaid" | "Integrated" | "Government";
  innovationScore: number;
  apmPaymentPct: number;
  apmModelTypes: number;
  qualityMetrics: number;
  sdohInvestment: number;
  dataSharing: number;
  trend: number;
}

// ─────────────────────────────────────────────────────────────
// DATA: ALL 50 STATES — FIVE PILLARS (Policy/Technology/Economics/Clinical/Operations)
// ─────────────────────────────────────────────────────────────
//
// SOURCING (full detail in the on-screen Methodology panel and PILLAR_METHODOLOGY_NOTES below):
//   Policy    — REAL. Classified from CMS's AHEAD Model cohort assignments (cms.gov/priorities/
//               innovation/innovation-models/ahead; AHA News 2024-07-11) and Pennsylvania's Rural
//               Health Model (CMMI). Cohort 1 (VT, MD) = 92, Cohort 2 (CT, HI) = 72, Cohort 3 (RI)
//               = 66, PA Rural Health Model = 55, no known state all-payer/global-budget program
//               = 30. The tier-to-number mapping is this table's own transparent rule; the
//               underlying classification (which states are in which federal model) is real and
//               checkable.
//   Clinical  — REAL. Derived from America's Health Rankings' overall state health ranking
//               (United Health Foundation; corroborated across the 2022-based full ranking and
//               the 2023 top-10, which agree on order for the top ranks). Rank 1-50 converted to a
//               0-100 scale by score = 100 - (rank-1) * 100/49. This measures population health
//               outcomes generally, not "clinical transformation" specifically — disclosed as a
//               proxy, not a perfect match to the book's Clinical pillar definition.
//   Technology, Economics, Operations — SIMULATED for every state except Vermont. No public
//               multi-state dataset was found at 50-state granularity for any of the three
//               (ONC's 2024 interoperability data brief and HCP-LAN's 2024 APM Measurement effort
//               are both real but national-only, confirmed by direct source review — see
//               PILLAR_METHODOLOGY_NOTES). These three columns are illustrative estimates loosely
//               informed by this platform's pre-existing adoption/maturity index, NOT a published
//               pillar-specific figure. They carry a visible "SIM" tag in the UI per this
//               instruction from the author: disclose invented data with a clear on-screen label.
//   Vermont's row — OVERRIDDEN with the book's actual sourced pillar READINESS (policy 95,
//               technology 45, economics 55, clinical 65, operations 50) from
//               lib/framework/sequence-engine.ts PRESETS "vermont-2026" via lib/framework/
//               pillar-mapping.ts frameworkReadiness(). This is not this table's own indicator —
//               it is pulled in so Vermont cannot show a different Technology number here than the
//               HTR Simulator, the Friction Index, and the HTI Dashboard all show (that exact
//               contradiction — Technology 90 here vs. 45 there — was found and fixed once this
//               week; it must not reappear in a third tool).
const RAW_STATES: Omit<StateRecord, "rank" | "composite">[] = [
  { state: "Massachusetts", abbr: "MA", region: "Northeast", policy: 30, technology: 79, economics: 78, clinical: 98, operations: 71, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Vermont", abbr: "VT", region: "Northeast", policy: 95, technology: 45, economics: 55, clinical: 65, operations: 50, policyProgram: "AHEAD Cohort 1 (CMS, performance from Jan 2026)", readinessSourced: true, simulated: { technology: false, economics: false, operations: false } },
  { state: "Minnesota", abbr: "MN", region: "Midwest", policy: 30, technology: 74, economics: 73, clinical: 90, operations: 67, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Colorado", abbr: "CO", region: "West", policy: 30, technology: 75, economics: 71, clinical: 78, operations: 68, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Oregon", abbr: "OR", region: "West", policy: 30, technology: 72, economics: 69, clinical: 63, operations: 65, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Connecticut", abbr: "CT", region: "Northeast", policy: 72, technology: 69, economics: 67, clinical: 94, operations: 61, policyProgram: "AHEAD Cohort 2 (CMS, performance from Jan 2027)", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Washington", abbr: "WA", region: "West", policy: 30, technology: 73, economics: 68, clinical: 88, operations: 59, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Hawaii", abbr: "HI", region: "West", policy: 72, technology: 65, economics: 67, clinical: 84, operations: 63, policyProgram: "AHEAD Cohort 2 (CMS, performance from Jan 2027)", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "New York", abbr: "NY", region: "Northeast", policy: 30, technology: 70, economics: 66, clinical: 51, operations: 58, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "California", abbr: "CA", region: "West", policy: 30, technology: 71, economics: 65, clinical: 53, operations: 57, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Maine", abbr: "ME", region: "Northeast", policy: 30, technology: 66, economics: 65, clinical: 76, operations: 58, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "New Hampshire", abbr: "NH", region: "Northeast", policy: 30, technology: 67, economics: 64, clinical: 100, operations: 58, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Rhode Island", abbr: "RI", region: "Northeast", policy: 66, technology: 64, economics: 63, clinical: 82, operations: 56, policyProgram: "AHEAD Cohort 3 (CMS, performance from 2026-27)", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Maryland", abbr: "MD", region: "South", policy: 92, technology: 67, economics: 63, clinical: 86, operations: 55, policyProgram: "AHEAD Cohort 1 (CMS, performance from Jan 2026)", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "New Jersey", abbr: "NJ", region: "Northeast", policy: 30, technology: 65, economics: 62, clinical: 80, operations: 54, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Wisconsin", abbr: "WI", region: "Midwest", policy: 30, technology: 63, economics: 61, clinical: 59, operations: 57, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Virginia", abbr: "VA", region: "South", policy: 30, technology: 64, economics: 60, clinical: 73, operations: 52, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Pennsylvania", abbr: "PA", region: "Northeast", policy: 55, technology: 63, economics: 60, clinical: 49, operations: 54, policyProgram: "PA Rural Health Model (CMMI, voluntary)", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Iowa", abbr: "IA", region: "Midwest", policy: 30, technology: 61, economics: 61, clinical: 67, operations: 56, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Nebraska", abbr: "NE", region: "Midwest", policy: 30, technology: 60, economics: 59, clinical: 61, operations: 55, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Utah", abbr: "UT", region: "West", policy: 30, technology: 67, economics: 63, clinical: 92, operations: 58, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Michigan", abbr: "MI", region: "Midwest", policy: 30, technology: 61, economics: 58, clinical: 35, operations: 52, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Ohio", abbr: "OH", region: "Midwest", policy: 30, technology: 60, economics: 58, clinical: 33, operations: 51, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Illinois", abbr: "IL", region: "Midwest", policy: 30, technology: 61, economics: 57, clinical: 45, operations: 50, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Montana", abbr: "MT", region: "West", policy: 30, technology: 58, economics: 58, clinical: 39, operations: 56, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Wyoming", abbr: "WY", region: "West", policy: 30, technology: 56, economics: 57, clinical: 43, operations: 55, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Idaho", abbr: "ID", region: "West", policy: 30, technology: 59, economics: 57, clinical: 69, operations: 54, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "North Dakota", abbr: "ND", region: "Midwest", policy: 30, technology: 58, economics: 58, clinical: 71, operations: 56, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "South Dakota", abbr: "SD", region: "Midwest", policy: 30, technology: 56, economics: 57, clinical: 55, operations: 54, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Kansas", abbr: "KS", region: "Midwest", policy: 30, technology: 58, economics: 57, clinical: 47, operations: 53, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Missouri", abbr: "MO", region: "Midwest", policy: 30, technology: 58, economics: 56, clinical: 22, operations: 51, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Indiana", abbr: "IN", region: "Midwest", policy: 30, technology: 57, economics: 56, clinical: 27, operations: 51, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Delaware", abbr: "DE", region: "Northeast", policy: 30, technology: 62, economics: 60, clinical: 65, operations: 54, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "North Carolina", abbr: "NC", region: "South", policy: 30, technology: 58, economics: 57, clinical: 57, operations: 51, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Arizona", abbr: "AZ", region: "West", policy: 30, technology: 59, economics: 56, clinical: 37, operations: 51, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "New Mexico", abbr: "NM", region: "West", policy: 30, technology: 56, economics: 55, clinical: 18, operations: 49, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Florida", abbr: "FL", region: "South", policy: 30, technology: 57, economics: 55, clinical: 41, operations: 50, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Georgia", abbr: "GA", region: "South", policy: 30, technology: 56, economics: 53, clinical: 24, operations: 49, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "South Carolina", abbr: "SC", region: "South", policy: 30, technology: 54, economics: 51, clinical: 29, operations: 47, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Texas", abbr: "TX", region: "South", policy: 30, technology: 57, economics: 52, clinical: 20, operations: 48, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Nevada", abbr: "NV", region: "West", policy: 30, technology: 55, economics: 51, clinical: 16, operations: 48, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Tennessee", abbr: "TN", region: "South", policy: 30, technology: 53, economics: 50, clinical: 12, operations: 46, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Kentucky", abbr: "KY", region: "South", policy: 30, technology: 50, economics: 49, clinical: 14, operations: 44, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Oklahoma", abbr: "OK", region: "South", policy: 30, technology: 49, economics: 48, clinical: 10, operations: 43, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Arkansas", abbr: "AR", region: "South", policy: 30, technology: 47, economics: 46, clinical: 2, operations: 41, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Louisiana", abbr: "LA", region: "South", policy: 30, technology: 48, economics: 46, clinical: 0, operations: 42, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Alabama", abbr: "AL", region: "South", policy: 30, technology: 46, economics: 44, clinical: 6, operations: 40, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Mississippi", abbr: "MS", region: "South", policy: 30, technology: 44, economics: 43, clinical: 4, operations: 40, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "West Virginia", abbr: "WV", region: "South", policy: 30, technology: 43, economics: 42, clinical: 8, operations: 39, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
  { state: "Alaska", abbr: "AK", region: "West", policy: 30, technology: 54, economics: 52, clinical: 31, operations: 50, policyProgram: "—", readinessSourced: false, simulated: { technology: true, economics: true, operations: true } },
];

/** Sources cited in the Methodology panel — kept as data so the UI and this comment can't drift. */
const PILLAR_METHODOLOGY_NOTES = {
  policy: "CMS AHEAD Model cohort assignments (cms.gov/priorities/innovation/innovation-models/ahead) and the CMMI Pennsylvania Rural Health Model. Tier-to-score mapping is this tool's own rule over a real, checkable classification.",
  technology: "SIMULATED. ONC/ASTP Data Brief No. 71 (May 2024), \"Interoperable Exchange of Patient Health Information Among U.S. Hospitals: 2023,\" confirmed to report only national interoperability rates (70% of hospitals engaged in all 4 exchange domains in 2023) with no state-level breakdown. No 50-state technology dataset exists publicly; values here are illustrative estimates, not a published figure.",
  economics: "SIMULATED. HCP-LAN's 2024 APM Measurement Effort (hcp-lan.org/2024-infographic) is real and national: 44.9% of payments in Category 3-4 APMs, 28.7% in downside-risk APMs; by line of business, Medicare Advantage 60.0%, Medicaid 42.7%, Medicare FFS 44.4%. It surveyed 73 health plans plus 4 FFS-Medicaid states — not a 50-state panel. Per-state values here are illustrative estimates benchmarked against these national figures, not a published state-level APM percentage.",
  clinical: "America's Health Rankings (United Health Foundation), overall state health ranking, converted from rank (1-50) to a 0-100 scale. A population-health-outcomes proxy, not a literal measure of \"clinical transformation.\"",
  operations: "SIMULATED. No public multi-state dataset was found for care-management/operational capacity comparable across all 50 states. Illustrative estimate only.",
} as const;

function getDomainExtremes(s: Omit<StateRecord, "rank">) {
  const domains = [
    { key: "policy", label: "Policy", val: s.policy },
    { key: "technology", label: "Technology", val: s.technology },
    { key: "economics", label: "Economics", val: s.economics },
    { key: "clinical", label: "Clinical", val: s.clinical },
    { key: "operations", label: "Operations", val: s.operations },
  ];
  const sorted = [...domains].sort((a, b) => b.val - a.val);
  return { top: sorted[0].label, weakest: sorted[sorted.length - 1].label };
}

const NATIONAL_AVG = {
  policy: Math.round(RAW_STATES.reduce((sum, s) => sum + s.policy, 0) / RAW_STATES.length),
  technology: Math.round(RAW_STATES.reduce((sum, s) => sum + s.technology, 0) / RAW_STATES.length),
  economics: Math.round(RAW_STATES.reduce((sum, s) => sum + s.economics, 0) / RAW_STATES.length),
  clinical: Math.round(RAW_STATES.reduce((sum, s) => sum + s.clinical, 0) / RAW_STATES.length),
  operations: Math.round(RAW_STATES.reduce((sum, s) => sum + s.operations, 0) / RAW_STATES.length),
};

const STATES: StateRecord[] = [...RAW_STATES]
  .map((s) => ({ ...s, composite: Math.round((s.policy + s.technology + s.economics + s.clinical + s.operations) / 5) }))
  .sort((a, b) => b.composite - a.composite)
  .map((s, i) => ({ ...s, rank: i + 1 }));

// ─────────────────────────────────────────────────────────────
// DATA: HOSPITAL SYSTEMS
// ─────────────────────────────────────────────────────────────

const RAW_HOSPITALS: Omit<HospitalSystem, "rank">[] = [
  { name: "Kaiser Permanente",                  state: "CA", region: "West",      type: "Integrated",  maturity: 95, revenueRisk: 98, acoApm: 96, qualityPerf: 94, dataAnalytics: 97, patientEngagement: 92, trend: 1.2 },
  { name: "Geisinger Health",                   state: "PA", region: "Northeast", type: "Non-profit",  maturity: 88, revenueRisk: 88, acoApm: 90, qualityPerf: 89, dataAnalytics: 87, patientEngagement: 85, trend: 0.8 },
  { name: "Intermountain Health",               state: "UT", region: "West",      type: "Non-profit",  maturity: 85, revenueRisk: 84, acoApm: 86, qualityPerf: 87, dataAnalytics: 85, patientEngagement: 82, trend: 1.0 },
  { name: "Univ. of Vermont Health Network",    state: "VT", region: "Northeast", type: "Non-profit",  maturity: 79, revenueRisk: 77, acoApm: 80, qualityPerf: 81, dataAnalytics: 78, patientEngagement: 78, trend: 2.1 },
  { name: "Atrium Health",                      state: "NC", region: "South",     type: "Non-profit",  maturity: 80, revenueRisk: 79, acoApm: 81, qualityPerf: 82, dataAnalytics: 79, patientEngagement: 78, trend: 1.3 },
  { name: "Advocate Aurora Health",             state: "IL", region: "Midwest",   type: "Non-profit",  maturity: 78, revenueRisk: 77, acoApm: 79, qualityPerf: 79, dataAnalytics: 78, patientEngagement: 76, trend: 0.9 },
  { name: "MaineHealth",                        state: "ME", region: "Northeast", type: "Non-profit",  maturity: 76, revenueRisk: 74, acoApm: 77, qualityPerf: 78, dataAnalytics: 75, patientEngagement: 76, trend: 1.8 },
  { name: "Northwell Health",                   state: "NY", region: "Northeast", type: "Non-profit",  maturity: 75, revenueRisk: 73, acoApm: 76, qualityPerf: 76, dataAnalytics: 75, patientEngagement: 74, trend: 0.7 },
  { name: "Dartmouth-Hitchcock Health",         state: "NH", region: "Northeast", type: "Non-profit",  maturity: 74, revenueRisk: 73, acoApm: 75, qualityPerf: 75, dataAnalytics: 74, patientEngagement: 73, trend: 1.2 },
  { name: "Mass General Brigham",               state: "MA", region: "Northeast", type: "Non-profit",  maturity: 74, revenueRisk: 72, acoApm: 75, qualityPerf: 77, dataAnalytics: 76, patientEngagement: 71, trend: 0.5 },
  { name: "Beth Israel Lahey Health",           state: "MA", region: "Northeast", type: "Non-profit",  maturity: 72, revenueRisk: 71, acoApm: 73, qualityPerf: 74, dataAnalytics: 72, patientEngagement: 70, trend: 0.6 },
  { name: "Providence Health & Services",       state: "WA", region: "West",      type: "Non-profit",  maturity: 73, revenueRisk: 71, acoApm: 74, qualityPerf: 74, dataAnalytics: 73, patientEngagement: 72, trend: 0.9 },
  { name: "UPMC",                               state: "PA", region: "Northeast", type: "Non-profit",  maturity: 77, revenueRisk: 76, acoApm: 78, qualityPerf: 78, dataAnalytics: 77, patientEngagement: 75, trend: 0.8 },
  { name: "Ochsner Health",                     state: "LA", region: "South",     type: "Non-profit",  maturity: 71, revenueRisk: 69, acoApm: 72, qualityPerf: 73, dataAnalytics: 71, patientEngagement: 71, trend: 1.1 },
  { name: "Cleveland Clinic",                   state: "OH", region: "Midwest",   type: "Non-profit",  maturity: 71, revenueRisk: 67, acoApm: 71, qualityPerf: 78, dataAnalytics: 73, patientEngagement: 68, trend: 0.4 },
  { name: "ChristianaCare",                     state: "DE", region: "Northeast", type: "Non-profit",  maturity: 71, revenueRisk: 70, acoApm: 72, qualityPerf: 72, dataAnalytics: 71, patientEngagement: 70, trend: 1.3 },
  { name: "Spectrum Health / Corewell",         state: "MI", region: "Midwest",   type: "Non-profit",  maturity: 70, revenueRisk: 69, acoApm: 71, qualityPerf: 71, dataAnalytics: 70, patientEngagement: 69, trend: 1.0 },
  { name: "Banner Health",                      state: "AZ", region: "West",      type: "Non-profit",  maturity: 69, revenueRisk: 68, acoApm: 70, qualityPerf: 70, dataAnalytics: 69, patientEngagement: 68, trend: 0.7 },
  { name: "RWJBarnabas Health",                 state: "NJ", region: "Northeast", type: "Non-profit",  maturity: 67, revenueRisk: 65, acoApm: 68, qualityPerf: 68, dataAnalytics: 67, patientEngagement: 66, trend: 0.5 },
  { name: "Trinity Health",                     state: "MI", region: "Midwest",   type: "Non-profit",  maturity: 68, revenueRisk: 66, acoApm: 69, qualityPerf: 69, dataAnalytics: 68, patientEngagement: 67, trend: 0.6 },
  { name: "Mayo Clinic",                        state: "MN", region: "Midwest",   type: "Non-profit",  maturity: 68, revenueRisk: 55, acoApm: 65, qualityPerf: 91, dataAnalytics: 78, patientEngagement: 70, trend: 0.3 },
  { name: "Sanford Health",                     state: "SD", region: "Midwest",   type: "Non-profit",  maturity: 66, revenueRisk: 64, acoApm: 67, qualityPerf: 67, dataAnalytics: 66, patientEngagement: 65, trend: 0.4 },
  { name: "CommonSpirit Health",                state: "IL", region: "Midwest",   type: "Non-profit",  maturity: 72, revenueRisk: 71, acoApm: 73, qualityPerf: 73, dataAnalytics: 72, patientEngagement: 71, trend: 0.7 },
  { name: "Ascension Health",                   state: "MO", region: "Midwest",   type: "Non-profit",  maturity: 65, revenueRisk: 63, acoApm: 66, qualityPerf: 66, dataAnalytics: 65, patientEngagement: 64, trend: 0.2 },
  { name: "Prisma Health",                      state: "SC", region: "South",     type: "Non-profit",  maturity: 64, revenueRisk: 62, acoApm: 65, qualityPerf: 65, dataAnalytics: 64, patientEngagement: 63, trend: 0.5 },
  { name: "Bon Secours Mercy Health",           state: "OH", region: "Midwest",   type: "Non-profit",  maturity: 62, revenueRisk: 60, acoApm: 63, qualityPerf: 63, dataAnalytics: 62, patientEngagement: 61, trend: 0.3 },
  { name: "Ballad Health",                      state: "TN", region: "South",     type: "Non-profit",  maturity: 58, revenueRisk: 56, acoApm: 59, qualityPerf: 59, dataAnalytics: 58, patientEngagement: 57, trend: 0.1 },
  { name: "HCA Healthcare",                     state: "TN", region: "South",     type: "For-profit",  maturity: 58, revenueRisk: 52, acoApm: 57, qualityPerf: 61, dataAnalytics: 64, patientEngagement: 57, trend: -0.2 },
  { name: "Tenet Healthcare",                   state: "TX", region: "South",     type: "For-profit",  maturity: 55, revenueRisk: 48, acoApm: 54, qualityPerf: 58, dataAnalytics: 60, patientEngagement: 54, trend: -0.4 },
  { name: "Community Health Systems",           state: "TN", region: "South",     type: "For-profit",  maturity: 50, revenueRisk: 42, acoApm: 49, qualityPerf: 53, dataAnalytics: 55, patientEngagement: 50, trend: -0.6 },
];

const HOSPITALS: HospitalSystem[] = [...RAW_HOSPITALS]
  .sort((a, b) => b.maturity - a.maturity)
  .map((h, i) => ({ ...h, rank: i + 1 }));

const HOSPITAL_AVG = {
  revenueRisk: 68,
  acoApm: 69,
  qualityPerf: 71,
  dataAnalytics: 71,
  patientEngagement: 69,
};

// ─────────────────────────────────────────────────────────────
// DATA: PAYERS
// ─────────────────────────────────────────────────────────────

const RAW_PAYERS: Omit<Payer, "rank">[] = [
  { name: "CMS / Medicare",               payerType: "Government",          innovationScore: 90, apmPaymentPct: 92, apmModelTypes: 10, qualityMetrics: 92, sdohInvestment: 85, dataSharing: 88, trend: 1.5 },
  { name: "Kaiser Foundation Health Plan",payerType: "Integrated",          innovationScore: 88, apmPaymentPct: 90, apmModelTypes: 9,  qualityMetrics: 90, sdohInvestment: 86, dataSharing: 91, trend: 0.8 },
  { name: "BCBS Massachusetts (AQC)",     payerType: "Commercial",          innovationScore: 82, apmPaymentPct: 84, apmModelTypes: 8,  qualityMetrics: 84, sdohInvestment: 79, dataSharing: 80, trend: 1.2 },
  { name: "BCBS Vermont (BCBSVT)",        payerType: "Commercial",          innovationScore: 78, apmPaymentPct: 80, apmModelTypes: 7,  qualityMetrics: 79, sdohInvestment: 80, dataSharing: 76, trend: 2.0 },
  { name: "Humana",                       payerType: "Medicare Advantage",  innovationScore: 75, apmPaymentPct: 77, apmModelTypes: 7,  qualityMetrics: 76, sdohInvestment: 73, dataSharing: 73, trend: 1.0 },
  { name: "CDPHP (NY)",                   payerType: "Commercial",          innovationScore: 76, apmPaymentPct: 77, apmModelTypes: 7,  qualityMetrics: 77, sdohInvestment: 74, dataSharing: 74, trend: 1.4 },
  { name: "BCBS Michigan (PGIP)",         payerType: "Commercial",          innovationScore: 74, apmPaymentPct: 75, apmModelTypes: 7,  qualityMetrics: 75, sdohInvestment: 71, dataSharing: 73, trend: 0.9 },
  { name: "UnitedHealthcare",             payerType: "Commercial",          innovationScore: 72, apmPaymentPct: 73, apmModelTypes: 7,  qualityMetrics: 73, sdohInvestment: 69, dataSharing: 71, trend: 0.6 },
  { name: "CVS / Aetna",                  payerType: "Commercial",          innovationScore: 70, apmPaymentPct: 71, apmModelTypes: 6,  qualityMetrics: 71, sdohInvestment: 68, dataSharing: 70, trend: 0.8 },
  { name: "Point32Health (Harvard/Tufts)",payerType: "Commercial",          innovationScore: 71, apmPaymentPct: 72, apmModelTypes: 6,  qualityMetrics: 72, sdohInvestment: 69, dataSharing: 70, trend: 1.1 },
  { name: "Priority Health (MI)",         payerType: "Commercial",          innovationScore: 73, apmPaymentPct: 74, apmModelTypes: 6,  qualityMetrics: 73, sdohInvestment: 71, dataSharing: 71, trend: 1.0 },
  { name: "Cigna",                        payerType: "Commercial",          innovationScore: 68, apmPaymentPct: 69, apmModelTypes: 6,  qualityMetrics: 69, sdohInvestment: 66, dataSharing: 67, trend: 0.5 },
  { name: "Independence BCBS PA",         payerType: "Commercial",          innovationScore: 67, apmPaymentPct: 68, apmModelTypes: 6,  qualityMetrics: 68, sdohInvestment: 65, dataSharing: 66, trend: 0.4 },
  { name: "Medicaid (National Avg)",      payerType: "Medicaid",            innovationScore: 65, apmPaymentPct: 66, apmModelTypes: 5,  qualityMetrics: 65, sdohInvestment: 72, dataSharing: 62, trend: 0.7 },
  { name: "Elevance Health (Anthem)",     payerType: "Commercial",          innovationScore: 65, apmPaymentPct: 66, apmModelTypes: 5,  qualityMetrics: 66, sdohInvestment: 62, dataSharing: 64, trend: 0.3 },
  { name: "BCBS (National Avg)",          payerType: "Commercial",          innovationScore: 62, apmPaymentPct: 63, apmModelTypes: 5,  qualityMetrics: 63, sdohInvestment: 59, dataSharing: 61, trend: 0.2 },
  { name: "AmeriHealth Caritas",          payerType: "Medicaid",            innovationScore: 60, apmPaymentPct: 60, apmModelTypes: 4,  qualityMetrics: 61, sdohInvestment: 67, dataSharing: 57, trend: 0.4 },
  { name: "Molina Healthcare",            payerType: "Medicaid",            innovationScore: 58, apmPaymentPct: 58, apmModelTypes: 4,  qualityMetrics: 59, sdohInvestment: 63, dataSharing: 55, trend: 0.2 },
  { name: "Centene Corporation",          payerType: "Medicaid",            innovationScore: 55, apmPaymentPct: 55, apmModelTypes: 3,  qualityMetrics: 56, sdohInvestment: 60, dataSharing: 51, trend: 0.0 },
  { name: "WellCare Health Plans",        payerType: "Medicaid",            innovationScore: 52, apmPaymentPct: 52, apmModelTypes: 3,  qualityMetrics: 53, sdohInvestment: 57, dataSharing: 48, trend: -0.3 },
];

const PAYERS: Payer[] = [...RAW_PAYERS]
  .sort((a, b) => b.innovationScore - a.innovationScore)
  .map((p, i) => ({ ...p, rank: i + 1 }));

const PAYER_AVG = {
  apmPaymentPct: 69,
  apmModelTypes: 6,
  qualityMetrics: 70,
  sdohInvestment: 68,
  dataSharing: 67,
};

// ─────────────────────────────────────────────────────────────
// UTILITY HELPERS
// ─────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 70) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 50) return "text-orange-400";
  return "text-red-400";
}

function scoreBg(score: number): string {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 70) return "bg-green-500";
  if (score >= 60) return "bg-yellow-500";
  if (score >= 50) return "bg-orange-400";
  return "bg-red-500";
}

function MedalIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-slate-300" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="w-5 h-5 inline-flex items-center justify-center text-xs font-bold text-fuchsia-300">{rank}</span>;
}

function TrendArrow({ val }: { val: number }) {
  if (val > 0.5)  return <TrendingUp  className="w-4 h-4 text-emerald-400 inline" />;
  if (val < -0.1) return <TrendingDown className="w-4 h-4 text-red-400 inline" />;
  return <Minus className="w-4 h-4 text-slate-400 inline" />;
}

function ScoreBar({ score, avg, color }: { score: number; avg: number; color: string }) {
  return (
    <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-visible">
      <div className={`h-3 rounded-full ${color}`} style={{ width: `${score}%` }} />
      <div
        className="absolute top-0 h-3 w-0.5 bg-white opacity-60"
        style={{ left: `${avg}%` }}
        title={`National avg: ${avg}`}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 1: STATE RANKINGS
// ─────────────────────────────────────────────────────────────

type StateSort = "rank" | "composite" | "policy" | "technology" | "economics" | "clinical" | "operations";

/** A cell whose number is a disclosed simulated estimate rather than real published data. */
function SimBadge() {
  return (
    <span
      title="SIMULATED — no public 50-state dataset exists for this dimension; illustrative estimate only"
      className="ml-1 align-middle inline-block text-[9px] font-black tracking-wider text-amber-300 bg-amber-900/50 border border-amber-600/50 rounded px-1 py-0.5"
    >
      SIM
    </span>
  );
}

function StateRankings() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<StateSort>("rank");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [topN, setTopN] = useState<number>(50);
  const [expandedState, setExpandedState] = useState<string | null>(null);

  const toggleSort = (key: StateSort) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir(key === "rank" ? "asc" : "desc"); }
  };

  const filtered = useMemo(() => {
    let data = [...STATES];
    if (search) data = data.filter(s => s.state.toLowerCase().includes(search.toLowerCase()) || s.abbr.toLowerCase().includes(search.toLowerCase()));
    if (regionFilter !== "All") data = data.filter(s => s.region === regionFilter);
    data.sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return data.slice(0, topN);
  }, [search, regionFilter, sortKey, sortDir, topN]);

  const ColHeader = ({ label, k }: { label: string; k: StateSort }) => (
    <th
      onClick={() => toggleSort(k)}
      className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300 cursor-pointer select-none whitespace-nowrap hover:text-fuchsia-100 transition-colors"
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <ArrowUpDown className="w-3 h-3 opacity-60" />
      </span>
    </th>
  );

  const handleExport = () => {
    const lines = ["Rank\tState\tComposite\tPolicy\tTechnology\tEconomics\tClinical\tOperations\tTop Pillar\tWeakest Pillar\tPolicy Program", ...filtered.map(s => {
      const { top, weakest } = getDomainExtremes(s);
      return `${s.rank}\t${s.state}\t${s.composite}\t${s.policy}\t${s.technology}\t${s.economics}\t${s.clinical}\t${s.operations}\t${top}\t${weakest}\t${s.policyProgram}`;
    })];
    navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="space-y-4">
      {/* SIMULATED-DATA WATERMARK — required by the author: Technology, Economics and Operations
          have no public 50-state source and are disclosed estimates, not published statistics.
          Vermont is the one exception (its five numbers are the book's sourced pillar readiness). */}
      <div className="rounded-xl border-2 border-amber-500 bg-amber-950/40 px-4 py-3 flex items-start gap-3">
        <span className="text-2xl leading-none">⚠️</span>
        <div className="text-xs text-amber-200 leading-relaxed">
          <span className="font-black uppercase tracking-widest text-amber-300">Simulated data notice — </span>
          The <strong>Technology</strong>, <strong>Economics</strong> and <strong>Operations</strong> columns below
          (marked <SimBadge />) are illustrative estimates. No public dataset scores these three pillars for all 50
          states — confirmed by direct review of ONC's 2024 interoperability brief (national-only) and HCP-LAN's 2024
          APM Measurement effort (national/by-payer-category only, not by state). <strong>Policy</strong> and{" "}
          <strong>Clinical</strong> are real, cited data (CMS AHEAD Model cohorts; America&rsquo;s Health Rankings).{" "}
          <strong>Vermont</strong>&rsquo;s row is the one exception to all of this: its five numbers are pulled directly
          from this book&rsquo;s own sourced pillar readiness (the same numbers the{" "}
          <a href="/htr-simulator" className="underline text-amber-100">HTR Simulator</a> runs), not estimated here.
          See Methodology for full source detail.
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
          <input
            className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500"
            placeholder="Search states..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500"
          value={regionFilter}
          onChange={e => setRegionFilter(e.target.value)}
        >
          {["All", "Northeast", "South", "Midwest", "West"].map(r => <option key={r}>{r}</option>)}
        </select>
        <select
          className="px-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500"
          value={topN}
          onChange={e => setTopN(Number(e.target.value))}
        >
          {[10, 15, 25, 50].map(n => <option key={n} value={n}>Top {n}</option>)}
        </select>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-600 rounded-lg text-sm font-medium text-white transition-colors"
        >
          <Download className="w-4 h-4" /> Export Rankings
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-fuchsia-800/40">
        <table className="w-full text-sm">
          <thead className="bg-fuchsia-950/60">
            <tr>
              <ColHeader label="Rank" k="rank" />
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">State</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Region</th>
              <ColHeader label="Composite" k="composite" />
              <ColHeader label="Policy" k="policy" />
              <ColHeader label="Technology" k="technology" />
              <ColHeader label="Economics" k="economics" />
              <ColHeader label="Clinical" k="clinical" />
              <ColHeader label="Operations" k="operations" />
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Top Pillar</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Weakest</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Policy Program</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(s => {
              const { top, weakest } = getDomainExtremes(s);
              const isExpanded = expandedState === s.state;
              return (
                <React.Fragment key={s.state}>
                  <tr
                    className={`hover:bg-fuchsia-950/30 transition-colors cursor-pointer ${s.readinessSourced ? "bg-indigo-950/30" : ""}`}
                    onClick={() => setExpandedState(isExpanded ? null : s.state)}
                  >
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <MedalIcon rank={s.rank} />
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-white">
                      <span className="inline-block w-7 text-center text-xs bg-fuchsia-900/60 rounded px-1 mr-1.5 text-fuchsia-300">{s.abbr}</span>
                      {s.state}
                      {s.readinessSourced && (
                        <span
                          title="All five numbers are the book's sourced pillar readiness (sequence-engine PRESETS), not this table's own estimate."
                          className="ml-1.5 align-middle inline-block text-[9px] font-black tracking-wider text-indigo-200 bg-indigo-800/70 border border-indigo-500/60 rounded px-1 py-0.5"
                        >
                          SOURCED
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-slate-400">{s.region}</td>
                    <td className="px-3 py-2.5">
                      <span className={`font-bold text-base ${scoreColor(s.composite)}`}>{s.composite}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{s.policy}</td>
                    <td className="px-3 py-2.5 text-slate-300">{s.technology}{s.simulated.technology && <SimBadge />}</td>
                    <td className="px-3 py-2.5 text-slate-300">{s.economics}{s.simulated.economics && <SimBadge />}</td>
                    <td className="px-3 py-2.5 text-slate-300">{s.clinical}</td>
                    <td className="px-3 py-2.5 text-slate-300">{s.operations}{s.simulated.operations && <SimBadge />}</td>
                    <td className="px-3 py-2.5 text-emerald-400 text-xs font-medium">{top}</td>
                    <td className="px-3 py-2.5 text-orange-400 text-xs font-medium">{weakest}</td>
                    <td className="px-3 py-2.5 text-slate-400 text-xs">{s.policyProgram}</td>
                    <td className="px-3 py-2.5 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${s.state}-expand`} className="bg-fuchsia-950/20">
                      <td colSpan={13} className="px-6 py-4">
                        {s.readinessSourced ? (
                          <p className="text-xs text-indigo-200 bg-indigo-950/40 border border-indigo-700/40 rounded-lg px-3 py-2 mb-3">
                            Vermont&rsquo;s five numbers are not this table&rsquo;s indicator methodology — they are read
                            directly from the book&rsquo;s sourced pillar readiness (§1.14, sequence-engine.ts PRESETS
                            &ldquo;vermont-2026&rdquo;), the same numbers the{" "}
                            <a href="/htr-simulator" className="underline">HTR Simulator</a> and the Friction Index run
                            on. They will not match a simple recomputation from AHEAD-cohort tier or AHR rank — that is
                            expected: readiness (can the pillar issue its currency downstream?) is a different
                            measurement than adoption/outcomes data.
                          </p>
                        ) : (
                          <p className="text-xs text-slate-400 mb-3">
                            Policy Program: <span className="text-white">{s.policyProgram}</span>
                            {(s.simulated.technology || s.simulated.economics || s.simulated.operations) && (
                              <span className="ml-2 text-amber-300">— dimensions marked SIM below are simulated estimates, not published data.</span>
                            )}
                          </p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { label: "Policy", val: s.policy, avg: NATIONAL_AVG.policy, sim: false },
                            { label: "Technology", val: s.technology, avg: NATIONAL_AVG.technology, sim: s.simulated.technology },
                            { label: "Economics", val: s.economics, avg: NATIONAL_AVG.economics, sim: s.simulated.economics },
                            { label: "Clinical", val: s.clinical, avg: NATIONAL_AVG.clinical, sim: false },
                            { label: "Operations", val: s.operations, avg: NATIONAL_AVG.operations, sim: s.simulated.operations },
                          ].map(d => (
                            <div key={d.label}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">{d.label} {d.sim && <SimBadge />}</span>
                                <span className={scoreColor(d.val)}>{d.val} <span className="text-slate-500">/ avg {d.avg}</span></span>
                              </div>
                              <ScoreBar score={d.val} avg={d.avg} color={scoreBg(d.val)} />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-3">White marker = national average across all 50 states. Composite = unweighted average of the five pillar columns; note it mixes real and simulated dimensions — see Methodology.</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">
        Showing {filtered.length} of {STATES.length} states. Policy &amp; Clinical: real, cited data.
        Technology, Economics, Operations: <SimBadge /> simulated estimates. Vermont: sourced pillar readiness.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 2: HOSPITAL SYSTEMS
// ─────────────────────────────────────────────────────────────

type HospSort = "rank" | "maturity" | "revenueRisk" | "acoApm" | "qualityPerf" | "dataAnalytics" | "patientEngagement" | "trend";

function HospitalRankings() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<HospSort>("rank");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [expandedHosp, setExpandedHosp] = useState<string | null>(null);

  const toggleSort = (key: HospSort) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir(key === "rank" ? "asc" : "desc"); }
  };

  const filtered = useMemo(() => {
    let data = [...HOSPITALS];
    if (search) data = data.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.state.toLowerCase().includes(search.toLowerCase()));
    if (typeFilter !== "All") data = data.filter(h => h.type === typeFilter);
    if (regionFilter !== "All") data = data.filter(h => h.region === regionFilter);
    data.sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return data;
  }, [search, typeFilter, regionFilter, sortKey, sortDir]);

  const ColHeader = ({ label, k }: { label: string; k: HospSort }) => (
    <th
      onClick={() => toggleSort(k)}
      className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300 cursor-pointer select-none whitespace-nowrap hover:text-fuchsia-100 transition-colors"
    >
      <span className="inline-flex items-center gap-1">{label}<ArrowUpDown className="w-3 h-3 opacity-60" /></span>
    </th>
  );

  const typeBadgeColor: Record<string, string> = {
    "Non-profit": "bg-blue-900/60 text-blue-300",
    "For-profit": "bg-orange-900/60 text-orange-300",
    "Government": "bg-purple-900/60 text-purple-300",
    "Integrated": "bg-emerald-900/60 text-emerald-300",
  };

  const handleExport = () => {
    const lines = ["Rank\tSystem\tState\tType\tMaturity\tVBC Revenue%\tTrend", ...filtered.map(h =>
      `${h.rank}\t${h.name}\t${h.state}\t${h.type}\t${h.maturity}\t${h.revenueRisk}%\t${h.trend > 0 ? "+" : ""}${h.trend}`
    )];
    navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
          <input
            className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500"
            placeholder="Search health systems..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="px-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          {["All", "Non-profit", "For-profit", "Government", "Integrated"].map(t => <option key={t}>{t}</option>)}
        </select>
        <select className="px-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500" value={regionFilter} onChange={e => setRegionFilter(e.target.value)}>
          {["All", "Northeast", "South", "Midwest", "West"].map(r => <option key={r}>{r}</option>)}
        </select>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-600 rounded-lg text-sm font-medium text-white transition-colors">
          <Download className="w-4 h-4" /> Export Rankings
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-fuchsia-800/40">
        <table className="w-full text-sm">
          <thead className="bg-fuchsia-950/60">
            <tr>
              <ColHeader label="Rank" k="rank" />
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">System</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">State</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Type</th>
              <ColHeader label="Maturity" k="maturity" />
              <ColHeader label="% Risk Rev." k="revenueRisk" />
              <ColHeader label="ACO/APM" k="acoApm" />
              <ColHeader label="Quality" k="qualityPerf" />
              <ColHeader label="Data & Analytics" k="dataAnalytics" />
              <ColHeader label="Pt. Engagement" k="patientEngagement" />
              <ColHeader label="Trend" k="trend" />
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(h => {
              const isExpanded = expandedHosp === h.name;
              return (
                <>
                  <tr
                    key={h.name}
                    className="hover:bg-fuchsia-950/30 transition-colors cursor-pointer"
                    onClick={() => setExpandedHosp(isExpanded ? null : h.name)}
                  >
                    <td className="px-3 py-2.5"><MedalIcon rank={h.rank} /></td>
                    <td className="px-3 py-2.5 font-semibold text-white">{h.name}</td>
                    <td className="px-3 py-2.5 text-slate-400">{h.state}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadgeColor[h.type]}`}>{h.type}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`font-bold text-base ${scoreColor(h.maturity)}`}>{h.maturity}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{h.revenueRisk}%</td>
                    <td className="px-3 py-2.5 text-slate-300">{h.acoApm}</td>
                    <td className="px-3 py-2.5 text-slate-300">{h.qualityPerf}</td>
                    <td className="px-3 py-2.5 text-slate-300">{h.dataAnalytics}</td>
                    <td className="px-3 py-2.5 text-slate-300">{h.patientEngagement}</td>
                    <td className="px-3 py-2.5">
                      <TrendArrow val={h.trend} />
                      <span className={`ml-1 text-xs ${h.trend > 0.5 ? "text-emerald-400" : h.trend < -0.1 ? "text-red-400" : "text-slate-400"}`}>
                        {h.trend > 0 ? "+" : ""}{h.trend.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${h.name}-expand`} className="bg-fuchsia-950/20">
                      <td colSpan={12} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { label: "% Revenue in Risk Contracts", val: h.revenueRisk, avg: HOSPITAL_AVG.revenueRisk },
                            { label: "ACO / APM Participation", val: h.acoApm, avg: HOSPITAL_AVG.acoApm },
                            { label: "Quality Performance Composite", val: h.qualityPerf, avg: HOSPITAL_AVG.qualityPerf },
                            { label: "Data & Analytics Capability", val: h.dataAnalytics, avg: HOSPITAL_AVG.dataAnalytics },
                            { label: "Patient Engagement Level", val: h.patientEngagement, avg: HOSPITAL_AVG.patientEngagement },
                          ].map(d => (
                            <div key={d.label}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">{d.label}</span>
                                <span className={scoreColor(d.val)}>{d.val} <span className="text-slate-500">/ avg {d.avg}</span></span>
                              </div>
                              <ScoreBar score={d.val} avg={d.avg} color={scoreBg(d.val)} />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-3">White marker = peer average. VBC Maturity Index assesses transition from fee-for-service to value-based models across 5 dimensions.</p>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Showing {filtered.length} of {HOSPITALS.length} health systems. | Last Updated: Q1 2025</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 3: PAYER INNOVATION INDEX
// ─────────────────────────────────────────────────────────────

type PayerSort = "rank" | "innovationScore" | "apmPaymentPct" | "apmModelTypes" | "qualityMetrics" | "sdohInvestment" | "dataSharing" | "trend";

function PayerRankings() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortKey, setSortKey] = useState<PayerSort>("rank");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [expandedPayer, setExpandedPayer] = useState<string | null>(null);

  const toggleSort = (key: PayerSort) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir(key === "rank" ? "asc" : "desc"); }
  };

  const filtered = useMemo(() => {
    let data = [...PAYERS];
    if (search) data = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (typeFilter !== "All") data = data.filter(p => p.payerType === typeFilter);
    data.sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return data;
  }, [search, typeFilter, sortKey, sortDir]);

  const ColHeader = ({ label, k }: { label: string; k: PayerSort }) => (
    <th
      onClick={() => toggleSort(k)}
      className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300 cursor-pointer select-none whitespace-nowrap hover:text-fuchsia-100 transition-colors"
    >
      <span className="inline-flex items-center gap-1">{label}<ArrowUpDown className="w-3 h-3 opacity-60" /></span>
    </th>
  );

  const typeBadgeColor: Record<string, string> = {
    "Commercial":         "bg-blue-900/60 text-blue-300",
    "Medicare Advantage": "bg-purple-900/60 text-purple-300",
    "Medicaid":           "bg-orange-900/60 text-orange-300",
    "Integrated":         "bg-emerald-900/60 text-emerald-300",
    "Government":         "bg-yellow-900/60 text-yellow-300",
  };

  const handleExport = () => {
    const lines = ["Rank\tPayer\tType\tInnovation Score\tAPM Payment %\tAPM Model Types\tQuality Metrics\tSDOH Investment\tData Sharing\tTrend", ...filtered.map(p =>
      `${p.rank}\t${p.name}\t${p.payerType}\t${p.innovationScore}\t${p.apmPaymentPct}%\t${p.apmModelTypes}\t${p.qualityMetrics}\t${p.sdohInvestment}\t${p.dataSharing}\t${p.trend > 0 ? "+" : ""}${p.trend}`
    )];
    navigator.clipboard.writeText(lines.join("\n"));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fuchsia-400" />
          <input
            className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500"
            placeholder="Search payers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="px-3 py-2 bg-gray-800 border border-fuchsia-700/40 rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          {["All", "Commercial", "Medicare Advantage", "Medicaid", "Integrated", "Government"].map(t => <option key={t}>{t}</option>)}
        </select>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-fuchsia-700 hover:bg-fuchsia-600 rounded-lg text-sm font-medium text-white transition-colors">
          <Download className="w-4 h-4" /> Export Rankings
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-fuchsia-800/40">
        <table className="w-full text-sm">
          <thead className="bg-fuchsia-950/60">
            <tr>
              <ColHeader label="Rank" k="rank" />
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Payer</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-fuchsia-300">Type</th>
              <ColHeader label="Innovation Score" k="innovationScore" />
              <ColHeader label="APM Pay %" k="apmPaymentPct" />
              <ColHeader label="APM Models" k="apmModelTypes" />
              <ColHeader label="Quality Metrics" k="qualityMetrics" />
              <ColHeader label="SDOH Programs" k="sdohInvestment" />
              <ColHeader label="Data Sharing" k="dataSharing" />
              <ColHeader label="Trend" k="trend" />
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(p => {
              const isExpanded = expandedPayer === p.name;
              const isLeader = p.rank <= 5;
              return (
                <>
                  <tr
                    key={p.name}
                    className="hover:bg-fuchsia-950/30 transition-colors cursor-pointer"
                    onClick={() => setExpandedPayer(isExpanded ? null : p.name)}
                  >
                    <td className="px-3 py-2.5"><MedalIcon rank={p.rank} /></td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{p.name}</span>
                        {isLeader && (
                          <span className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full bg-fuchsia-900/80 text-fuchsia-300 border border-fuchsia-700/50">
                            <Star className="w-3 h-3" /> Leader
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadgeColor[p.payerType]}`}>{p.payerType}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`font-bold text-base ${scoreColor(p.innovationScore)}`}>{p.innovationScore}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{p.apmPaymentPct}%</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.apmModelTypes}/10</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.qualityMetrics}</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.sdohInvestment}</td>
                    <td className="px-3 py-2.5 text-slate-300">{p.dataSharing}</td>
                    <td className="px-3 py-2.5">
                      <TrendArrow val={p.trend} />
                      <span className={`ml-1 text-xs ${p.trend > 0.5 ? "text-emerald-400" : p.trend < -0.1 ? "text-red-400" : "text-slate-400"}`}>
                        {p.trend > 0 ? "+" : ""}{p.trend.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${p.name}-expand`} className="bg-fuchsia-950/20">
                      <td colSpan={11} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { label: "% of Payments in APMs", val: p.apmPaymentPct, avg: PAYER_AVG.apmPaymentPct },
                            { label: "APM Model Type Diversity (×10)", val: p.apmModelTypes * 10, avg: PAYER_AVG.apmModelTypes * 10 },
                            { label: "Quality Metric Sophistication", val: p.qualityMetrics, avg: PAYER_AVG.qualityMetrics },
                            { label: "SDOH Investment Programs", val: p.sdohInvestment, avg: PAYER_AVG.sdohInvestment },
                            { label: "Data Sharing with Providers", val: p.dataSharing, avg: PAYER_AVG.dataSharing },
                          ].map(d => (
                            <div key={d.label}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400">{d.label}</span>
                                <span className={scoreColor(d.val)}>{d.label.includes("APM Model") ? `${p.apmModelTypes}/10` : d.val} <span className="text-slate-500">/ avg {d.label.includes("APM Model") ? `${PAYER_AVG.apmModelTypes}/10` : d.avg}</span></span>
                              </div>
                              <ScoreBar score={d.val} avg={d.avg} color={scoreBg(d.val)} />
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-3">White marker = peer average. Innovation Index measures aggressiveness of APM portfolio and commitment to value-based payment reform.</p>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Showing {filtered.length} of {PAYERS.length} payers. | Last Updated: Q1 2025</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "states",
    label: "State Health Transformation Rankings",
    icon: <Globe className="w-4 h-4" />,
    description: "Five-pillar comparison across all 50 states — Policy and Clinical are real, cited data; Technology/Economics/Operations are disclosed simulated estimates; Vermont uses the book's sourced pillar readiness",
  },
  {
    id: "hospitals",
    label: "Hospital System VBC Maturity",
    icon: <Building2 className="w-4 h-4" />,
    description: "Value-Based Care maturity index for 30 major U.S. health systems",
  },
  {
    id: "payers",
    label: "Payer Innovation Index",
    icon: <Shield className="w-4 h-4" />,
    description: "APM portfolio aggressiveness ranking for 20 national payers",
  },
];

export default function InnovationLeaderboard() {
  const [activeTab, setActiveTab] = useState<TabId>("states");
  const [showMethodology, setShowMethodology] = useState(false);

  const topState   = STATES[0];
  const topHosp    = HOSPITALS[0];
  const topPayer   = PAYERS[0];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-fuchsia-950 via-gray-900 to-gray-950 border-b border-fuchsia-800/30 px-6 py-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-fuchsia-800/40 rounded-xl border border-fuchsia-700/40">
                  <Trophy className="w-6 h-6 text-fuchsia-300" />
                </div>
                <h1 className="text-2xl font-bold text-white">Innovation Leaderboard &amp; Benchmarks</h1>
              </div>
              <p className="text-slate-400 text-sm max-w-2xl">
                Comprehensive rankings of healthcare transformation performance across states, health systems, and payers.
                Data reflects 2024 performance with Q1 2025 updates.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-fuchsia-900/40 border border-fuchsia-700/30 text-fuchsia-300">
                Last Updated: Q1 2025
              </span>
              <button
                onClick={() => setShowMethodology(v => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700/40 text-slate-400 hover:text-white transition-colors"
              >
                <Info className="w-3.5 h-3.5" /> Methodology
              </button>
            </div>
          </div>

          {/* Methodology panel */}
          {showMethodology && (
            <div className="mt-4 p-4 bg-gray-900/80 rounded-xl border border-fuchsia-800/30 text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-fuchsia-300 mb-2">Scoring Methodology</p>
              <div className="mb-3 pb-3 border-b border-gray-800">
                <p className="text-white font-semibold mb-1">State Pillar Comparison (Policy / Technology / Economics / Clinical / Operations)</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong className="text-white">Policy</strong> — real: CMS AHEAD Model cohort assignments ({PILLAR_METHODOLOGY_NOTES.policy})</li>
                  <li><strong className="text-white">Clinical</strong> — real: {PILLAR_METHODOLOGY_NOTES.clinical}</li>
                  <li><strong className="text-amber-300">Technology</strong> — {PILLAR_METHODOLOGY_NOTES.technology}</li>
                  <li><strong className="text-amber-300">Economics</strong> — {PILLAR_METHODOLOGY_NOTES.economics}</li>
                  <li><strong className="text-amber-300">Operations</strong> — {PILLAR_METHODOLOGY_NOTES.operations}</li>
                  <li><strong className="text-indigo-300">Vermont</strong> — exception to all of the above: its five numbers are read directly from
                    lib/framework/sequence-engine.ts <code className="text-indigo-200">PRESETS[&quot;vermont-2026&quot;]</code> (policy 95,
                    technology 45, economics 55, clinical 65, operations 50) — the same sourced pillar readiness the HTR Simulator and Friction
                    Index use — so it cannot show a different number here than it does everywhere else in the platform.</li>
                </ul>
              </div>
              <p className="mb-2">
                <strong className="text-white">Hospital VBC Maturity Index:</strong> Five-dimension framework assessing
                % revenue in risk contracts, ACO/APM program participation breadth, quality performance composite (HEDIS/CMS Star),
                data &amp; analytics infrastructure capability, and patient engagement program sophistication.
              </p>
              <p>
                <strong className="text-white">Payer Innovation Index:</strong> Measures aggressiveness of Alternative Payment Model portfolio.
                Dimensions: % of total payments flowing through APMs, diversity of APM model types (MSSP, REACH, bundles, episode payments, P4P, global caps),
                quality metric sophistication, SDOH investment program scope, and bidirectional data-sharing infrastructure with provider partners.
              </p>
            </div>
          )}

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Top State",  val: topState.state,  score: topState.composite,  icon: <Globe className="w-4 h-4 text-fuchsia-400" /> },
              { label: "Top System", val: topHosp.name,    score: topHosp.maturity,    icon: <Building2 className="w-4 h-4 text-fuchsia-400" /> },
              { label: "Top Payer",  val: topPayer.name,   score: topPayer.innovationScore, icon: <Shield className="w-4 h-4 text-fuchsia-400" /> },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-3 bg-gray-900/60 rounded-xl px-4 py-3 border border-fuchsia-800/20">
                <div className="p-1.5 bg-fuchsia-900/40 rounded-lg">{c.icon}</div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 mb-0.5">{c.label}</p>
                  <p className="text-sm font-semibold text-white truncate">{c.val}</p>
                </div>
                <div className="ml-auto">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <p className="text-xs font-bold text-yellow-400 text-right">{c.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-screen-2xl mx-auto px-6 pt-6">
        <div className="flex gap-2 flex-wrap mb-6">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-fuchsia-700 text-white shadow-lg shadow-fuchsia-900/40"
                  : "bg-gray-800/60 text-slate-400 hover:text-white hover:bg-gray-800 border border-gray-700/40"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab description */}
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-400">
          <BarChart2 className="w-3.5 h-3.5 text-fuchsia-400" />
          {TABS.find(t => t.id === activeTab)?.description}
        </div>

        {/* Tab content */}
        <div className="pb-16">
          {activeTab === "states"    && <StateRankings />}
          {activeTab === "hospitals" && <HospitalRankings />}
          {activeTab === "payers"    && <PayerRankings />}
        </div>
      </div>
    </div>
  );
}
