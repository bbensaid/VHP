/**
 * APM Architecture Designer — the eight model types (book Appendix D.3:
 * "APM Architecture Designer (8 model types)") and the settlement engine they
 * drive. Pure functions, no React, so the parameters can be unit-tested
 * (scripts/test-apm-models.test.ts; run `npx tsx --test scripts/test-apm-models.test.ts`).
 *
 * Every default below is taken from the CMS (or Maryland HSCRC) document that
 * defines the real program the type stands for. The one exception is
 * "hybrid", which is this platform's illustrative blend and is labelled so.
 *
 * SOURCES
 *  [MSSP-MSR]  42 CFR 425.604(b) — one-sided MSR sliding scale by assigned
 *              beneficiaries (table ER31DE18.023, 83 FR 67816, Dec 31 2018).
 *  [MSSP-B]    42 CFR 425.605(d)(1)(i)-(ii) — BASIC Levels A/B (one-sided):
 *              shared savings up to 40% of all savings, payment may not
 *              exceed 10% of the updated benchmark.
 *  [MSSP-E]    42 CFR 425.610(d),(f),(e) — ENHANCED track: shared savings up
 *              to 75%, payment may not exceed 20% of the benchmark; shared loss
 *              rate = 1 − 0.75 × quality quotient, not less than 40% nor more
 *              than 75%; losses may not exceed 15% of the benchmark. MSR/MLR
 *              is an ACO election of 0–2% (2% used as the default).
 *  [TEAM]      CMS Transforming Episode Accountability Model (TEAM, began
 *              Jan 1 2026), 42 CFR 512 subpart; CMS fact sheets
 *              "TEAM Preliminary Target Price" and "TEAM Quality Scoring":
 *              Track 3 two-sided, stop-gain/stop-loss 20%; CMS discount factor
 *              2% (LEJR, SHFFT, spinal fusion) or 1.5% (CABG, major bowel);
 *              Composite Quality Score adjusts a positive reconciliation
 *              amount by up to 10% and a Track 3 negative amount by up to 10%.
 *  [REACH]     CMS Innovation Center, ACO REACH PY2026 Model Update — Quick
 *              Reference (https://www.cms.gov/aco-reach-model-performance-year-2026-model-update-quick-reference):
 *              Global first risk corridor narrowed from 25% to 10% of the
 *              benchmark; quality withhold raised from 2% to 5%. Remaining
 *              corridor bands and the 3.5% PY2025-26 Global discount from the
 *              ACO REACH financial methodology as summarised by Milliman
 *              ("ACO REACH PY2026: what is changing") and Pearl Health
 *              ("Exploring the Performance Year Discount"). Professional
 *              option: 50% shared savings/losses in the first corridor (<5%),
 *              35% (5–10%), 15% (10–15%), 5% (>15%); no discount.
 *              ASSUMPTION, labelled in the UI: for PY2026 Global the second
 *              band is taken as 10–35% at 50% (CMS moved only the first
 *              boundary; Milliman's worked example — 20% savings keeps 15% —
 *              confirms the 50% rate immediately above 10%).
 *  [HSCRC]     Maryland HSCRC, Quality-Based Reimbursement RY2026 final policy
 *              memo: maximum reward and maximum penalty 2% of inpatient
 *              revenue; reward/penalty cut point 41%.
 *  HCP-LAN     Health Care Payment Learning & Action Network, APM Framework
 *              (2017 refresh) — category labels only.
 */

export type ApmModelTypeId =
  | "ffs_baseline"
  | "shared_savings_one_sided"
  | "shared_savings_two_sided"
  | "episode_bundled"
  | "partial_capitation"
  | "full_capitation"
  | "global_budget"
  | "hybrid";

export type RiskArrangement = "none" | "one_sided" | "two_sided" | "full_risk";

/** A band of savings/losses, expressed as % of the benchmark, and the share
 *  of that band the provider keeps (risk corridor). */
export interface Corridor { upToPct: number; providerShare: number }

export interface ApmModelType {
  id: ApmModelTypeId;
  label: string;
  hcpLan: string;
  realProgram: string;
  /** How settlement works. */
  mechanism: "none" | "flat" | "corridor" | "full_retention";
  riskArrangement: RiskArrangement;
  /** CMS discount taken off the benchmark before settlement (% of benchmark). */
  discountPct: number;
  corridors?: Corridor[];
  /** Flat-mechanism defaults (also loaded into the sliders). */
  upsideShare: number;
  downsideShare: number;
  msr: number;
  mlr: number;
  savingsCap: number;
  lossCap: number;
  /** MSSP one-sided: MSR comes from the beneficiary sliding scale. */
  msrFromLives?: boolean;
  /** MSSP ENHANCED: loss rate = 1 − 0.75 × quality, bounded 40–75%. */
  lossRateFromQuality?: boolean;
  quality: "none" | "withhold" | "cqs" | "symmetric";
  qualityWithhold: number;
  qualityThreshold: number;
  paymentFlow: string;
  source: string;
}

const PROFESSIONAL_CORRIDORS: Corridor[] = [
  { upToPct: 5, providerShare: 0.5 },
  { upToPct: 10, providerShare: 0.35 },
  { upToPct: 15, providerShare: 0.15 },
  { upToPct: Infinity, providerShare: 0.05 },
];
const GLOBAL_CORRIDORS_PY2026: Corridor[] = [
  { upToPct: 10, providerShare: 1.0 },
  { upToPct: 35, providerShare: 0.5 },
  { upToPct: 50, providerShare: 0.25 },
  { upToPct: Infinity, providerShare: 0.1 },
];

export const APM_MODEL_TYPES: ApmModelType[] = [
  {
    id: "ffs_baseline",
    label: "Fee-for-Service Baseline",
    hcpLan: "HCP-LAN Category 1",
    realProgram: "Traditional Medicare FFS",
    mechanism: "none",
    riskArrangement: "none",
    discountPct: 0,
    upsideShare: 0, downsideShare: 0, msr: 0, mlr: 0, savingsCap: 5, lossCap: 5,
    quality: "none", qualityWithhold: 0, qualityThreshold: 60,
    paymentFlow: "Claims paid per service; no reconciliation against a benchmark, so lower spending earns the provider nothing and higher spending costs it nothing.",
    source: "HCP-LAN APM Framework, Category 1",
  },
  {
    id: "shared_savings_one_sided",
    label: "Shared Savings — One-Sided",
    hcpLan: "HCP-LAN Category 3A",
    realProgram: "Medicare Shared Savings Program, BASIC Level A/B",
    mechanism: "flat",
    riskArrangement: "one_sided",
    discountPct: 0,
    upsideShare: 40, downsideShare: 0, msr: 3.0, mlr: 0, savingsCap: 10, lossCap: 5,
    msrFromLives: true,
    quality: "none", qualityWithhold: 0, qualityThreshold: 60,
    paymentFlow: "FFS continues; at year-end savings below the benchmark that clear the size-based MSR are shared at up to 40%, capped at 10% of the benchmark. No repayment of losses.",
    source: "42 CFR 425.604(b), 425.605(d)(1)(i)-(ii)",
  },
  {
    id: "shared_savings_two_sided",
    label: "Shared Savings — Two-Sided",
    hcpLan: "HCP-LAN Category 3B",
    realProgram: "Medicare Shared Savings Program, ENHANCED track",
    mechanism: "flat",
    riskArrangement: "two_sided",
    discountPct: 0,
    upsideShare: 75, downsideShare: 40, msr: 2.0, mlr: 2.0, savingsCap: 20, lossCap: 15,
    lossRateFromQuality: true,
    quality: "none", qualityWithhold: 0, qualityThreshold: 60,
    paymentFlow: "FFS continues; savings beyond the elected MSR are shared at up to 75% (cap 20% of benchmark); losses beyond the MLR are repaid at 1 − 0.75 × quality (40–75%), capped at 15% of benchmark.",
    source: "42 CFR 425.610(d)-(f)",
  },
  {
    id: "episode_bundled",
    label: "Episode / Bundled Payment",
    hcpLan: "HCP-LAN Category 3B",
    realProgram: "CMS TEAM, Track 3 (LEJR discount)",
    mechanism: "flat",
    riskArrangement: "two_sided",
    discountPct: 2.0,
    upsideShare: 100, downsideShare: 100, msr: 0, mlr: 0, savingsCap: 20, lossCap: 20,
    quality: "cqs", qualityWithhold: 10, qualityThreshold: 0,
    paymentFlow: "Episode target price = benchmark × (1 − 2% CMS discount). Actual episode spend is reconciled against it; the hospital keeps or repays 100% of the difference up to a 20% stop-gain/stop-loss, adjusted up to 10% by the Composite Quality Score.",
    source: "CMS TEAM final rule (42 CFR 512); TEAM target price and quality scoring fact sheets",
  },
  {
    id: "partial_capitation",
    label: "Partial Capitation",
    hcpLan: "HCP-LAN Category 4A",
    realProgram: "ACO REACH, Professional option (Primary Care Capitation)",
    mechanism: "corridor",
    riskArrangement: "two_sided",
    discountPct: 0,
    corridors: PROFESSIONAL_CORRIDORS,
    upsideShare: 50, downsideShare: 50, msr: 0, mlr: 0, savingsCap: 100, lossCap: 100,
    quality: "withhold", qualityWithhold: 5, qualityThreshold: 60,
    paymentFlow: "Primary care is paid as a monthly capitation; total cost of care is reconciled against the benchmark with 50% sharing in the first 5% band, tapering through risk corridors. 5% quality withhold earned back on quality.",
    source: "CMS ACO REACH PY2026 Model Update; ACO REACH financial methodology (Professional)",
  },
  {
    id: "full_capitation",
    label: "Full Capitation",
    hcpLan: "HCP-LAN Category 4B",
    realProgram: "ACO REACH, Global option (Total Care Capitation)",
    mechanism: "corridor",
    riskArrangement: "full_risk",
    discountPct: 3.5,
    corridors: GLOBAL_CORRIDORS_PY2026,
    upsideShare: 100, downsideShare: 100, msr: 0, mlr: 0, savingsCap: 100, lossCap: 100,
    quality: "withhold", qualityWithhold: 5, qualityThreshold: 60,
    paymentFlow: "Benchmark is cut by the 3.5% Global discount and paid prospectively as capitation; the ACO keeps 100% of savings or losses up to 10% of benchmark (PY2026), then 50% / 25% / 10% in higher corridors. 5% quality withhold.",
    source: "CMS ACO REACH PY2026 Model Update; ACO REACH financial methodology (Global)",
  },
  {
    id: "global_budget",
    label: "Global Budget",
    hcpLan: "HCP-LAN Category 4B",
    realProgram: "Maryland / AHEAD hospital global budget",
    mechanism: "full_retention",
    riskArrangement: "full_risk",
    discountPct: 0,
    upsideShare: 100, downsideShare: 100, msr: 0, mlr: 0, savingsCap: 100, lossCap: 100,
    quality: "symmetric", qualityWithhold: 2, qualityThreshold: 41,
    paymentFlow: "Annual revenue is fixed in advance regardless of volume: every dollar of utilization avoided is kept and every dollar of excess is absorbed. Quality adjusts revenue ±2% (HSCRC QBR, cut point 41%).",
    source: "Maryland HSCRC QBR RY2026 final policy; Maryland TCOC / CMS AHEAD hospital global budgets",
  },
  {
    id: "hybrid",
    label: "Hybrid (illustrative)",
    hcpLan: "Platform illustrative blend",
    realProgram: "No single CMS program — platform example",
    mechanism: "flat",
    riskArrangement: "two_sided",
    discountPct: 0,
    upsideShare: 65, downsideShare: 30, msr: 2.0, mlr: 2.0, savingsCap: 15, lossCap: 10,
    quality: "withhold", qualityWithhold: 3, qualityThreshold: 60,
    paymentFlow: "Platform's illustrative two-sided blend: every parameter is a free slider. Not a CMS program's defaults.",
    source: "Illustrative — set your own parameters",
  },
];

export function getModelType(id: string): ApmModelType {
  return APM_MODEL_TYPES.find((m) => m.id === id) ?? APM_MODEL_TYPES[APM_MODEL_TYPES.length - 1];
}

/** 42 CFR 425.604(b): one-sided MSR by assigned beneficiaries, linear between
 *  the low-end and high-end values within each band. */
const MSR_BANDS: { lo: number; hi: number; msrLo: number; msrHi: number }[] = [
  { lo: 500, hi: 999, msrLo: 12.2, msrHi: 8.7 },
  { lo: 1000, hi: 2999, msrLo: 8.7, msrHi: 5.0 },
  { lo: 3000, hi: 4999, msrLo: 5.0, msrHi: 3.9 },
  { lo: 5000, hi: 5999, msrLo: 3.9, msrHi: 3.6 },
  { lo: 6000, hi: 6999, msrLo: 3.6, msrHi: 3.4 },
  { lo: 7000, hi: 7999, msrLo: 3.4, msrHi: 3.2 },
  { lo: 8000, hi: 8999, msrLo: 3.2, msrHi: 3.1 },
  { lo: 9000, hi: 9999, msrLo: 3.1, msrHi: 3.0 },
  { lo: 10000, hi: 14999, msrLo: 3.0, msrHi: 2.7 },
  { lo: 15000, hi: 19999, msrLo: 2.7, msrHi: 2.5 },
  { lo: 20000, hi: 49999, msrLo: 2.5, msrHi: 2.2 },
  { lo: 50000, hi: 59999, msrLo: 2.2, msrHi: 2.0 },
];
export function msspOneSidedMsr(lives: number): number {
  if (lives < 500) return 12.2;
  if (lives >= 60000) return 2.0;
  const b = MSR_BANDS.find((x) => lives >= x.lo && lives <= x.hi)!;
  const t = (lives - b.lo) / (b.hi - b.lo);
  return Math.round((b.msrLo + (b.msrHi - b.msrLo) * t) * 100) / 100;
}

/** Apply risk corridors to an absolute savings/loss amount. */
export function applyCorridors(amount: number, benchmark: number, corridors: Corridor[]): number {
  const pct = (Math.abs(amount) / benchmark) * 100;
  let kept = 0;
  let prev = 0;
  for (const c of corridors) {
    if (pct <= prev) break;
    const band = Math.min(pct, c.upToPct) - prev;
    kept += band * c.providerShare;
    prev = c.upToPct;
  }
  return Math.sign(amount) * (kept / 100) * benchmark;
}

export interface ApmInputs {
  attributedLives: number;
  benchmarkPMPM: number;
  actualSpendPct: number; // actual spend as % of the UNDISCOUNTED benchmark
  qualityScore: number;   // 0-100
  upsideShare: number;
  downsideShare: number;
  msr: number;
  mlr: number;
  savingsCap: number;
  lossCap: number;
  qualityWithhold: number;
  qualityThreshold: number;
  /** Only honoured for the illustrative hybrid type; every CMS type fixes its own. */
  riskArrangement?: RiskArrangement;
}

export interface ApmResult {
  totalBenchmark: number;
  discountAmount: number;
  targetBenchmark: number;
  totalActual: number;
  grossSavings: number;      // vs the target (after discount)
  grossSavingsPct: number;
  effectiveMsr: number;
  effectiveLossRate: number;
  msrMet: boolean;
  mlrTriggered: boolean;
  netACOPosition: number;    // before quality
  qualityAdjustment: number;
  finalPosition: number;
  pmpmEquivalent: number;
  breakEvenActualPct: number;
  withholdAmount: number;
}

export function computeApm(model: ApmModelType, p: ApmInputs): ApmResult {
  const memberMonths = p.attributedLives * 12;
  const totalBenchmark = memberMonths * p.benchmarkPMPM;
  const discountAmount = totalBenchmark * (model.discountPct / 100);
  const targetBenchmark = totalBenchmark - discountAmount;
  const totalActual = totalBenchmark * (p.actualSpendPct / 100);
  const grossSavings = targetBenchmark - totalActual;
  const grossSavingsPct = targetBenchmark > 0 ? (grossSavings / targetBenchmark) * 100 : 0;

  const effectiveMsr = model.msrFromLives ? msspOneSidedMsr(p.attributedLives) : p.msr;
  const effectiveLossRate = model.lossRateFromQuality
    ? Math.min(0.75, Math.max(0.4, 1 - 0.75 * (p.qualityScore / 100))) * 100
    : p.downsideShare;

  const risk = model.id === "hybrid" && p.riskArrangement ? p.riskArrangement : model.riskArrangement;
  let netACOPosition = 0;
  let msrMet = false;
  let mlrTriggered = false;

  if (model.mechanism === "flat") {
    if (grossSavings > 0) {
      msrMet = grossSavings >= targetBenchmark * (effectiveMsr / 100);
      if (msrMet) {
        netACOPosition = Math.min(
          grossSavings * (p.upsideShare / 100),
          targetBenchmark * (p.savingsCap / 100),
        );
      }
    } else if (risk !== "one_sided" && risk !== "none") {
      mlrTriggered = Math.abs(grossSavings) >= targetBenchmark * (p.mlr / 100);
      if (mlrTriggered) {
        netACOPosition = -Math.min(
          Math.abs(grossSavings) * (effectiveLossRate / 100),
          targetBenchmark * (p.lossCap / 100),
        );
      }
    }
  } else if (model.mechanism === "corridor" && model.corridors) {
    netACOPosition = applyCorridors(grossSavings, targetBenchmark, model.corridors);
    msrMet = grossSavings > 0;
    mlrTriggered = grossSavings < 0;
  } else if (model.mechanism === "full_retention") {
    netACOPosition = grossSavings;
    msrMet = grossSavings > 0;
    mlrTriggered = grossSavings < 0;
  }

  const withholdAmount = targetBenchmark * (p.qualityWithhold / 100);
  let qualityAdjustment = 0;
  if (model.quality === "withhold") {
    qualityAdjustment = p.qualityScore < p.qualityThreshold ? -withholdAmount : 0;
  } else if (model.quality === "symmetric") {
    qualityAdjustment = p.qualityScore >= p.qualityThreshold ? withholdAmount : -withholdAmount;
  } else if (model.quality === "cqs") {
    // TEAM CQS: a positive reconciliation amount is reduced by up to 10% as
    // quality falls; a Track 3 repayment is reduced by up to 10% as quality
    // rises. Scaled linearly on the 0-100 quality score (CMS scales on the
    // CQS percentile; linear is this tool's simplification).
    const pct = p.qualityWithhold / 100;
    if (netACOPosition > 0) {
      qualityAdjustment = -netACOPosition * pct * (1 - p.qualityScore / 100);
    } else if (netACOPosition < 0) {
      qualityAdjustment = -netACOPosition * pct * (p.qualityScore / 100);
    }
  }
  const finalPosition = netACOPosition + qualityAdjustment;

  const msrForBreakEven = model.mechanism === "flat" ? effectiveMsr : 0;
  const breakEvenActualPct = (1 - model.discountPct / 100) * (100 - msrForBreakEven);

  return {
    totalBenchmark, discountAmount, targetBenchmark, totalActual,
    grossSavings, grossSavingsPct, effectiveMsr, effectiveLossRate,
    msrMet, mlrTriggered, netACOPosition, qualityAdjustment, finalPosition,
    pmpmEquivalent: memberMonths > 0 ? finalPosition / memberMonths : 0,
    breakEvenActualPct, withholdAmount,
  };
}
