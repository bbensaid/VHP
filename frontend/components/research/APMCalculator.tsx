"use client";

import { useState, useMemo, useCallback } from "react";
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from "lucide-react";
import { applyCorridors, msspOneSidedMsr, type Corridor } from "./APMDesignLab.models";

// Model parameters corrected 2026-10-08 to the governing CMS rules (the same
// sources as APMDesignLab.models.ts): MSSP "Track 1" (retired 2019) at 50% was
// wrong — the one-sided BASIC levels pay up to 40% with a 10% cap and a
// beneficiary-size MSR (42 CFR 425.604(b), 425.605); ENHANCED caps gains at
// 20% (not 15%) and its loss rate is 1 − 0.75 × quality, 40–75% (not a flat
// 30%), 42 CFR 425.610; ACO REACH Global has no 5% stop-loss — it settles
// through risk corridors (100% to 10% of benchmark in PY2026, then 50/25/10%)
// after a 3.5% discount, with a 5% quality withhold (CMS PY2026 Quick
// Reference); BPCI Advanced ended 12/31/2025 and was succeeded by TEAM
// (Track 3: 2% LEJR discount, 20% stop-gain/stop-loss).
type CalcModel = {
  id: string; label: string; msr: number; sharingRate: number; lossShare: number;
  qualityWithhold: number; capGainPct: number; stopLossPct: number; desc: string;
  discountPct?: number; corridors?: Corridor[]; msrFromLives?: boolean; lossRateFromQuality?: boolean;
};
const APM_MODELS: CalcModel[] = [
  {
    id: "mssp1",
    label: "MSSP BASIC Level A/B (One-Sided)",
    msr: 0.03,         // replaced at run time by the 42 CFR 425.604(b) sliding scale
    msrFromLives: true,
    sharingRate: 0.40, // up to 40% of savings
    lossShare: 0,
    qualityWithhold: 0,
    capGainPct: 0.10,  // payment may not exceed 10% of benchmark
    stopLossPct: 0,
    desc: "Entry-level ACO track. No downside risk. Up to 40% of savings once the size-based MSR (2.0–3.9% for 5,000–60,000 lives) is met; capped at 10% of benchmark.",
  },
  {
    id: "mssp2",
    label: "MSSP ENHANCED (Two-Sided)",
    msr: 0.02,         // ACO-elected symmetric MSR/MLR, 0–2%
    sharingRate: 0.75,
    lossShare: 0.40,   // replaced at run time by 1 − 0.75 × quality, bounded 40–75%
    lossRateFromQuality: true,
    qualityWithhold: 0,
    capGainPct: 0.20,
    stopLossPct: 0.15,
    desc: "Highest-risk MSSP track. Up to 75% of savings (cap 20% of benchmark); losses shared at 1 − 0.75 × quality (40–75%), capped at 15% of benchmark.",
  },
  {
    id: "aco_reach",
    label: "ACO REACH Global (PY2026)",
    msr: 0,
    sharingRate: 1.0,
    lossShare: 1.0,
    qualityWithhold: 0.05,
    capGainPct: 1.0,
    stopLossPct: 0,
    discountPct: 0.035,
    corridors: [
      { upToPct: 10, providerShare: 1.0 },
      { upToPct: 35, providerShare: 0.5 },
      { upToPct: 50, providerShare: 0.25 },
      { upToPct: Infinity, providerShare: 0.1 },
    ],
    desc: "Full-risk REACH option. 3.5% discount off the benchmark; ACO keeps 100% of savings or losses up to 10% of benchmark, then 50% / 25% / 10% through risk corridors. 5% quality withhold.",
  },
  {
    id: "bpci",
    label: "TEAM Track 3 (Episode-Based)",
    msr: 0,
    sharingRate: 1.0,
    lossShare: 1.0,
    qualityWithhold: 0,
    capGainPct: 0.20,  // 20% stop-gain
    stopLossPct: 0.20, // 20% stop-loss
    discountPct: 0.02, // LEJR / SHFFT / spinal fusion discount (1.5% for CABG, bowel)
    desc: "CMS's mandatory episode model from 2026 (successor to BPCI Advanced, which ended 2025). Target = benchmark less 2% discount; 100% of the difference reconciled, within a 20% stop-gain / stop-loss.",
  },
  {
    id: "custom",
    label: "Custom Model",
    msr: 0.01,
    sharingRate: 0.60,
    lossShare: 0.20,
    qualityWithhold: 0.02,
    capGainPct: 0.12,
    stopLossPct: 0.10,
    desc: "Define your own sharing rate, MSR, stop-loss, and risk parameters.",
  },
];

// ─── VERMONT PRESET SCENARIOS ─────────────────────────────────────────────────
const VERMONT_APM_PRESETS = [
  {
    id: "ahead_fy28",
    label: "Vermont Act 68 Global Budget (FY2028; formerly AHEAD)",
    badge: "Act 68 · Mandatory",
    modelIdx: 2, // ACO REACH (closest to global budget full risk)
    attributedLives: 52_000,
    benchmarkPMPM: 1_040,
    actualSpendPct: 96.5,
    qualityScore: 88,
    adminCostPMPM: 22,
  },
  {
    id: "blueprint_aco",
    label: "Vermont Blueprint ACO (Current)",
    badge: "Medicare · All-Payer",
    modelIdx: 1, // MSSP Enhanced
    attributedLives: 28_000,
    benchmarkPMPM: 980,
    actualSpendPct: 97.2,
    qualityScore: 82,
    adminCostPMPM: 16,
  },
  {
    id: "medicaid_aco",
    label: "Vermont Medicaid ACO",
    badge: "Medicaid · DVHA",
    modelIdx: 2, // ACO REACH (full risk analog)
    attributedLives: 185_000,
    benchmarkPMPM: 620,
    actualSpendPct: 98.1,
    qualityScore: 78,
    adminCostPMPM: 14,
  },
  {
    id: "rural_hospital_cah",
    label: "Small Rural Hospital (CAH)",
    badge: "CAH · Act 68 Exempt from Global Budget",
    modelIdx: 0, // MSSP Track 1
    attributedLives: 4_200,
    benchmarkPMPM: 1_120,
    actualSpendPct: 95.8,
    qualityScore: 80,
    adminCostPMPM: 28,
  },
];


// ─── VERMONT'S 14 HOSPITALS (book Appendix D.4: "Vermont data for 14 hospitals
// pre-loaded") ────────────────────────────────────────────────────────────────
// No per-hospital attributed-lives or benchmark-PMPM figure is published for
// Vermont hospitals (OneCare Vermont reported attribution statewide by payer,
// never by hospital, and dissolved at the end of 2025). These presets are
// therefore DERIVED from two real public datasets, and labelled as such:
//
//  benchmarkPMPM = CMS Medicare Geographic Variation Public Use File, 2024
//    (Original Medicare, county level, released 2026; data.cms.gov dataset
//    6219697b-8f6c-4164-bed4-cd9317c58ebc), TOT_MDCR_PYMT_PC — actual total
//    Medicare payment per Original-Medicare beneficiary — for the hospital's
//    home county, ÷ 12. Beneficiary-weighted where two counties are combined.
//  attributedLives = that county's Original Medicare beneficiaries
//    (BENES_OM_CNT) × 51.56%, Vermont's last published ACO Medicare
//    attribution rate: OneCare Vermont FY2025 budget, average Medicare
//    attribution 51,354 (OCV FY25 Budget Presentation to GMCB, 11/13/2024)
//    ÷ 99,597 Vermont Original Medicare beneficiaries (same CMS file, 2024).
//    Rounded to 50.
//  County → hospital mapping (a county proxy for the hospital service area):
//    one county per hospital, except Windham (BMH / Grace Cottage) and
//    Windsor (Springfield / Mt. Ascutney), split by each pair's GMCB FY2025
//    operating-revenue share; Essex is joined to Caledonia (NVRH, St.
//    Johnsbury HSA) and Grand Isle to Chittenden (UVMMC, Burlington HSA).
//    The 14 rows allocate all 99,597 Vermont Original Medicare beneficiaries.
//  Limits: Medicare-only (no Medicaid/commercial lives), county not HSA
//    boundaries (e.g. part of Windsor County is served by Dartmouth-Hitchcock
//    in NH), and actual spend vs benchmark is left at 100% — no hospital-level
//    performance figure exists, so the reader sets it.
const VERMONT_HOSPITAL_APM_PRESETS = [
  { id: "bmh", label: "Brattleboro Memorial Hospital", counties: "Windham (80%)", originalMedicareBenes: 6591, attributedLives: 3400, benchmarkPMPM: 967, perCapita2024: 11603.16 },
  { id: "cvmc", label: "Central VT Medical Center", counties: "Washington", originalMedicareBenes: 10282, attributedLives: 5300, benchmarkPMPM: 950, perCapita2024: 11404.4 },
  { id: "copley", label: "Copley Hospital", counties: "Lamoille", originalMedicareBenes: 3776, attributedLives: 1950, benchmarkPMPM: 1008, perCapita2024: 12101.24 },
  { id: "gifford", label: "Gifford Medical Center", counties: "Orange", originalMedicareBenes: 5286, attributedLives: 2750, benchmarkPMPM: 989, perCapita2024: 11863.69 },
  { id: "grace_cottage", label: "Grace Cottage Hospital", counties: "Windham (20%)", originalMedicareBenes: 1669, attributedLives: 850, benchmarkPMPM: 967, perCapita2024: 11603.16 },
  { id: "mt_ascutney", label: "Mt. Ascutney Hospital & Health Ctr", counties: "Windsor (52%)", originalMedicareBenes: 5415, attributedLives: 2800, benchmarkPMPM: 1007, perCapita2024: 12081.09 },
  { id: "north_country", label: "North Country Hospital", counties: "Orleans", originalMedicareBenes: 4757, attributedLives: 2450, benchmarkPMPM: 884, perCapita2024: 10613.82 },
  { id: "nvrh", label: "NVRH — Northeastern VT Regional", counties: "Caledonia + Essex", originalMedicareBenes: 6261, attributedLives: 3250, benchmarkPMPM: 904, perCapita2024: 10843.69 },
  { id: "nmc", label: "Northwestern Medical Center", counties: "Franklin", originalMedicareBenes: 6667, attributedLives: 3450, benchmarkPMPM: 932, perCapita2024: 11187.98 },
  { id: "porter", label: "Porter Medical Center", counties: "Addison", originalMedicareBenes: 5520, attributedLives: 2850, benchmarkPMPM: 1035, perCapita2024: 12418.49 },
  { id: "rutland", label: "Rutland Regional Medical Center", counties: "Rutland", originalMedicareBenes: 11099, attributedLives: 5700, benchmarkPMPM: 983, perCapita2024: 11794.53 },
  { id: "springfield", label: "Springfield Hospital", counties: "Windsor (48%)", originalMedicareBenes: 5022, attributedLives: 2600, benchmarkPMPM: 1007, perCapita2024: 12081.09 },
  { id: "svmc", label: "Southwestern VT Medical Center", counties: "Bennington", originalMedicareBenes: 6803, attributedLives: 3500, benchmarkPMPM: 934, perCapita2024: 11204.19 },
  { id: "uvmmc", label: "UVM Medical Center", counties: "Chittenden + Grand Isle", originalMedicareBenes: 20449, attributedLives: 10550, benchmarkPMPM: 931, perCapita2024: 11176.22 },
];
const HOSPITAL_PRESET_SOURCE =
  "CMS Medicare Geographic Variation PUF 2024 (county) × OneCare FY2025 Medicare attribution rate (51.56%)";

function fmt(n: number, dec = 0) {
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}
function fmtUSD(n: number) {
  // Sign goes before the "$": found live via the Net ACO Position banner, which
  // passes raw (possibly negative) netPosition and rendered "$-6.77M" for a loss
  // instead of "-$6.77M". Call sites that already pass Math.abs() + their own
  // "+"/"−" prefix are unaffected since abs(n) === n there.
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return sign + "$" + (abs / 1_000_000).toFixed(2) + "M";
  return sign + "$" + fmt(abs);
}

export default function APMCalculator() {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [modelIdx, setModelIdx] = useState(0);
  const [attributedLives, setAttributedLives] = useState(8000);
  const [benchmarkPMPM, setBenchmarkPMPM] = useState(1050);
  const [actualSpendPct, setActualSpendPct] = useState(96); // % of benchmark (96 = 4% savings)
  const [qualityScore, setQualityScore] = useState(85);    // 0-100
  const [adminCostPMPM, setAdminCostPMPM] = useState(18);

  function loadHospitalPreset(id: string) {
    const h = VERMONT_HOSPITAL_APM_PRESETS.find(x => x.id === id);
    if (!h) return;
    // Population and benchmark only — the APM model and quality/admin inputs
    // stay as the reader set them, since no hospital-level contract is public.
    setActivePreset("hosp_" + id);
    setAttributedLives(h.attributedLives);
    setBenchmarkPMPM(h.benchmarkPMPM);
    setActualSpendPct(100);
  }
  const activeHospital = activePreset?.startsWith("hosp_")
    ? VERMONT_HOSPITAL_APM_PRESETS.find(x => "hosp_" + x.id === activePreset)
    : undefined;

  function loadPreset(id: string) {
    const p = VERMONT_APM_PRESETS.find(x => x.id === id);
    if (!p) return;
    setActivePreset(id);
    setModelIdx(p.modelIdx);
    setAttributedLives(p.attributedLives);
    setBenchmarkPMPM(p.benchmarkPMPM);
    setActualSpendPct(p.actualSpendPct);
    setQualityScore(p.qualityScore);
    setAdminCostPMPM(p.adminCostPMPM);
  }

  // Custom model params
  const [customMSR, setCustomMSR] = useState(1.0);
  const [customSharing, setCustomSharing] = useState(60);
  const [customLoss, setCustomLoss] = useState(20);
  const [customQW, setCustomQW] = useState(2);
  const [customStopLoss, setCustomStopLoss] = useState(10);

  const model = APM_MODELS[modelIdx];
  // Wrapped in useMemo so the results memo below sees a stable reference unless
  // a model parameter actually changed. Without this, `effectiveModel` is a new
  // object on every render and the downstream memo recomputes unconditionally.
  const effectiveModel = useMemo(() => {
    return modelIdx === APM_MODELS.length - 1
      ? { ...model, msr: customMSR / 100, sharingRate: customSharing / 100, lossShare: customLoss / 100, qualityWithhold: customQW / 100, stopLossPct: customStopLoss / 100 }
      : model;
  }, [model, modelIdx, customMSR, customSharing, customLoss, customQW, customStopLoss]);

  // One pure evaluation of the contract at a given actual-spend assumption.
  // Used for the point estimate AND for the pessimistic/base/optimistic spread.
  const evaluate = useCallback((spendPct: number) => {
    const fullBenchmark   = attributedLives * benchmarkPMPM * 12;
    // CMS discount (REACH Global, TEAM) comes off the benchmark before settlement.
    const annualBenchmark = fullBenchmark * (1 - (effectiveModel.discountPct ?? 0));
    const actualSpend     = fullBenchmark * (spendPct / 100);
    const grossSavings    = annualBenchmark - actualSpend;
    const savingsRate     = grossSavings / annualBenchmark;
    const msr = effectiveModel.msrFromLives ? msspOneSidedMsr(attributedLives) / 100 : effectiveModel.msr;
    const lossShare = effectiveModel.lossRateFromQuality
      ? Math.min(0.75, Math.max(0.4, 1 - 0.75 * (qualityScore / 100)))
      : effectiveModel.lossShare;

    // Apply MSR (and, symmetrically, the MLR for two-sided MSSP)
    const netSavings = savingsRate >= msr ? grossSavings : 0;
    const netLoss    = grossSavings < 0 && Math.abs(savingsRate) >= (effectiveModel.lossRateFromQuality ? msr : 0) ? Math.abs(grossSavings) : 0;

    // Quality adjustment: below 70 = withhold applied
    const qualityMultiplier = qualityScore >= 70
      ? 1
      : 1 - effectiveModel.qualityWithhold;

    // Shared savings earned (cap at capGainPct * benchmark)
    const maxSharedSavings = annualBenchmark * effectiveModel.capGainPct;
    // Risk-corridor models (REACH) keep a tapering share of each band instead
    // of a flat sharing rate.
    const corridorKept = effectiveModel.corridors && grossSavings > 0
      ? applyCorridors(grossSavings, annualBenchmark, effectiveModel.corridors)
      : null;
    const sharedSavingsBeforeCap = (corridorKept ?? netSavings * effectiveModel.sharingRate) * qualityMultiplier;
    const sharedSavings = Math.min(sharedSavingsBeforeCap, maxSharedSavings);

    // Loss payment (if in deficit), capped by the contract's stop-loss ceiling.
    // stopLossPct is expressed as a share of annual benchmark revenue, the same
    // way capGainPct caps the upside. 0 means "no stop-loss defined" — which in
    // a one-sided model is moot, since lossShare is 0 there anyway.
    const maxLossExposure = effectiveModel.stopLossPct > 0
      ? annualBenchmark * effectiveModel.stopLossPct
      : Infinity;
    const lossPaymentBeforeCap = effectiveModel.corridors && netLoss > 0
      ? Math.abs(applyCorridors(-netLoss, annualBenchmark, effectiveModel.corridors))
      : netLoss * lossShare;
    const lossPayment = Math.min(lossPaymentBeforeCap, maxLossExposure);
    const stopLossBinding = lossPaymentBeforeCap > maxLossExposure;

    // Admin costs
    const totalAdminCost = adminCostPMPM * attributedLives * 12;

    // Net position
    const netPosition = sharedSavings - lossPayment - totalAdminCost;

    // Per-member-per-month equivalents
    const netPositionPMPM = attributedLives > 0 ? netPosition / (attributedLives * 12) : 0;

    // Break-even admin cost cover
    const breakEvenSavingsPct = totalAdminCost > 0 && annualBenchmark > 0
      ? (totalAdminCost / (annualBenchmark * effectiveModel.sharingRate)) * 100
      : 0;

    return {
      spendPct,
      annualBenchmark,
      actualSpend,
      grossSavings,
      savingsRate,
      netSavings,
      sharedSavingsBeforeCap,
      sharedSavings,
      maxSharedSavings,
      lossPaymentBeforeCap,
      lossPayment,
      maxLossExposure,
      stopLossBinding,
      capBinding: sharedSavingsBeforeCap > maxSharedSavings,
      totalAdminCost,
      netPosition,
      netPositionPMPM,
      breakEvenSavingsPct,
      qualityMultiplier,
      msr,
      lossShare,
      aboveMSR: savingsRate >= msr,
    };
  }, [attributedLives, benchmarkPMPM, qualityScore, adminCostPMPM, effectiveModel]);

  const results = useMemo(() => evaluate(actualSpendPct), [evaluate, actualSpendPct]);

  // ── Pessimistic / base / optimistic spread ──────────────────────────────────
  // The single assumption that drives netSavings/netLoss is actual spend as a %
  // of benchmark. We flex the *savings margin* (the distance from benchmark) by
  // ±20%, with a 1.0pp floor so the band never collapses to nothing when the
  // base case sits exactly on benchmark.
  const SPREAD = 0.20;
  const scenarios = useMemo(() => {
    const margin = actualSpendPct - 100;          // negative = under benchmark
    const swing  = Math.max(Math.abs(margin) * SPREAD, 1.0);
    const clamp  = (v: number) => Math.min(115, Math.max(80, v));
    return [
      { key: "pessimistic", label: "Pessimistic", note: `Spend ${clamp(actualSpendPct + swing).toFixed(1)}% of benchmark`, r: evaluate(clamp(actualSpendPct + swing)) },
      { key: "base",        label: "Base Case",   note: `Spend ${actualSpendPct.toFixed(1)}% of benchmark`,               r: results },
      { key: "optimistic",  label: "Optimistic",  note: `Spend ${clamp(actualSpendPct - swing).toFixed(1)}% of benchmark`, r: evaluate(clamp(actualSpendPct - swing)) },
    ];
  }, [evaluate, actualSpendPct, results]);

  const isProfit = results.netPosition >= 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">

        {/* ── INPUTS ── */}
        <div className="lg:col-span-2 p-6 space-y-5">

          {/* Vermont Presets */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-3">Vermont Scenarios <span className="normal-case font-semibold text-emerald-600">(illustrative)</span></p>
            <div className="space-y-1.5">
              {VERMONT_APM_PRESETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => loadPreset(p.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-xs transition-all ${
                    activePreset === p.id
                      ? "bg-emerald-600 border-emerald-700 text-white font-bold"
                      : "bg-white border-emerald-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                >
                  <div className="font-bold">{p.label}</div>
                  <div className={`text-[10px] mt-0.5 ${activePreset === p.id ? "text-emerald-100" : "text-slate-400"}`}>{p.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Vermont's 14 hospitals — derived Medicare presets */}
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4" data-testid="apm-hospital-presets">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-sky-700">Vermont&apos;s 14 Hospitals · Medicare</p>
              <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">DERIVED</span>
            </div>
            <select
              aria-label="Vermont hospital preset"
              value={activeHospital?.id ?? ""}
              onChange={e => e.target.value && loadHospitalPreset(e.target.value)}
              className="w-full text-xs border border-sky-200 rounded-lg px-2 py-2 bg-white text-slate-700"
            >
              <option value="">Choose a hospital…</option>
              {VERMONT_HOSPITAL_APM_PRESETS.map(h => (
                <option key={h.id} value={h.id}>{h.label}</option>
              ))}
            </select>
            {activeHospital && (
              <p className="text-[10px] text-slate-600 mt-2 leading-relaxed" data-testid="apm-hospital-derivation">
                {activeHospital.counties} County · {fmt(activeHospital.originalMedicareBenes)} Original Medicare
                beneficiaries × 51.56% attribution = <strong>{fmt(activeHospital.attributedLives)} lives</strong>;
                2024 Medicare spend ${fmt(activeHospital.perCapita2024)}/beneficiary ÷ 12 ={" "}
                <strong>${activeHospital.benchmarkPMPM} PMPM</strong>. Actual spend starts at 100% of benchmark — set your own.
              </p>
            )}
            <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">
              No per-hospital attribution or benchmark is published for Vermont, so these are derived:
              {" "}{HOSPITAL_PRESET_SOURCE}. County is a proxy for the hospital service area; Medicare lives only.
            </p>
          </div>

          {/* Model Selector */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">APM Model</label>
            <div className="space-y-2">
              {APM_MODELS.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setModelIdx(i)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm transition-all ${
                    modelIdx === i
                      ? "bg-sky-50 border-sky-300 text-sky-800 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="font-semibold">{m.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom model params */}
          {modelIdx === APM_MODELS.length - 1 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Custom Parameters</p>
              {[
                { label: "Sharing Rate (%)", value: customSharing, set: setCustomSharing, min: 0, max: 100 },
                { label: "Loss Share (%)", value: customLoss, set: setCustomLoss, min: 0, max: 100 },
                { label: "Min Savings Rate (%)", value: customMSR, set: setCustomMSR, min: 0, max: 5, step: 0.1 },
                { label: "Quality Withhold (%)", value: customQW, set: setCustomQW, min: 0, max: 10, step: 0.5 },
                { label: "Stop-Loss Ceiling (% of benchmark)", value: customStopLoss, set: setCustomStopLoss, min: 0, max: 30, step: 0.5 },
              ].map(f => (
                <div key={f.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{f.label}</span>
                    <span className="font-bold text-slate-800">{f.value}%</span>
                  </div>
                  <input type="range" min={f.min} max={f.max} step={f.step ?? 1} value={f.value}
                    onChange={e => f.set(parseFloat(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-amber-200 accent-amber-600 cursor-pointer" />
                </div>
              ))}
            </div>
          )}

          {/* Core inputs */}
          {[
            { label: "Attributed Lives", value: attributedLives, set: setAttributedLives, min: 500, max: 100000, step: 500, format: (v: number) => fmt(v) },
            { label: "Benchmark PMPM ($)", value: benchmarkPMPM, set: setBenchmarkPMPM, min: 400, max: 2500, step: 10, format: (v: number) => "$" + v },
            { label: "Actual Spend (% of Benchmark)", value: actualSpendPct, set: setActualSpendPct, min: 80, max: 115, step: 0.5, format: (v: number) => v + "%" },
            { label: "Quality Score (0–100)", value: qualityScore, set: setQualityScore, min: 0, max: 100, step: 1, format: (v: number) => v },
            { label: "ACO Admin Cost PMPM ($)", value: adminCostPMPM, set: setAdminCostPMPM, min: 0, max: 100, step: 1, format: (v: number) => "$" + v },
          ].map(f => (
            <div key={f.label}>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-slate-600">{f.label}</label>
                <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{f.format(f.value)}</span>
              </div>
              <input type="range" min={f.min} max={f.max} step={f.step ?? 1} value={f.value}
                onChange={e => f.set(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-sky-600 cursor-pointer" />
            </div>
          ))}
        </div>

        {/* ── RESULTS ── */}
        <div className="lg:col-span-3 p-6 space-y-5 bg-slate-50/50">

          {/* Net Position Banner */}
          <div className={`rounded-2xl p-5 border ${isProfit ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Net ACO Position</p>
                <p className={`text-4xl font-black ${isProfit ? "text-emerald-700" : "text-rose-600"}`}>
                  {isProfit ? "+" : ""}{fmtUSD(results.netPosition)}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {fmtUSD(results.netPositionPMPM)}/member/month
                  {" · "}
                  {model.label}
                </p>
              </div>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isProfit ? "bg-emerald-100" : "bg-rose-100"}`}>
                {isProfit
                  ? <TrendingUp size={28} className="text-emerald-600" />
                  : <TrendingDown size={28} className="text-rose-500" />
                }
              </div>
            </div>
          </div>

          {/* Waterfall breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Financial Waterfall</h4>
            <div className="space-y-3">
              {[
                { label: "Annual Benchmark Spend", value: results.annualBenchmark, color: "text-slate-700", barColor: "bg-slate-300" },
                { label: "Actual ACO Spend", value: results.actualSpend, color: results.actualSpend < results.annualBenchmark ? "text-emerald-600" : "text-rose-500", barColor: results.actualSpend < results.annualBenchmark ? "bg-emerald-400" : "bg-rose-400" },
                { label: "Gross Savings (Deficit)", value: results.grossSavings, color: results.grossSavings >= 0 ? "text-emerald-600" : "text-rose-500", barColor: results.grossSavings >= 0 ? "bg-emerald-500" : "bg-rose-500" },
                { label: effectiveModel.corridors ? "Shared Savings Earned (risk corridors)" : `Shared Savings Earned (${(effectiveModel.sharingRate * 100).toFixed(0)}% share)`, value: results.sharedSavings, color: "text-sky-600", barColor: "bg-sky-500" },
                { label: results.stopLossBinding ? `Loss Payment to CMS (stop-loss capped at ${(effectiveModel.stopLossPct * 100).toFixed(0)}%)` : "Loss Payment to CMS", value: -results.lossPayment, color: "text-rose-500", barColor: "bg-rose-400" },
                { label: "ACO Admin Costs", value: -results.totalAdminCost, color: "text-amber-600", barColor: "bg-amber-400" },
              ].map(row => {
                const maxVal = results.annualBenchmark;
                const barWidth = maxVal > 0 ? Math.min(Math.abs(row.value) / maxVal * 100, 100) : 0;
                return (
                  <div key={row.label} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-600 truncate">{row.label}</span>
                        <span className={`font-bold shrink-0 ml-2 ${row.color}`}>
                          {row.value >= 0 ? "" : "−"}{fmtUSD(Math.abs(row.value))}
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${row.barColor} transition-all duration-500`} style={{ width: `${barWidth}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                <span className="text-sm font-black text-slate-800">Net ACO Position</span>
                <span className={`text-lg font-black ${isProfit ? "text-emerald-700" : "text-rose-600"}`}>
                  {isProfit ? "+" : ""}{fmtUSD(results.netPosition)}
                </span>
              </div>
            </div>
          </div>

          {/* Scenario spread: pessimistic / base / optimistic */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-baseline justify-between mb-4 gap-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Scenario Spread</h4>
              <span className="text-[10px] text-slate-400">Savings margin flexed ±{(SPREAD * 100).toFixed(0)}%</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scenarios.map(s => {
                const good = s.r.netPosition >= 0;
                const isBase = s.key === "base";
                return (
                  <div
                    key={s.key}
                    className={`rounded-xl border p-4 ${
                      isBase
                        ? "bg-sky-50 border-sky-300 ring-1 ring-sky-200"
                        : good ? "bg-emerald-50/60 border-emerald-200" : "bg-rose-50/60 border-rose-200"
                    }`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                    <p className={`text-2xl font-black mt-1 ${good ? "text-emerald-700" : "text-rose-600"}`}>
                      {good ? "+" : "−"}{fmtUSD(Math.abs(s.r.netPosition))}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{s.note}</p>
                    <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Gross shared savings</span>
                        <span className="font-bold text-slate-700">{fmtUSD(s.r.sharedSavingsBeforeCap)}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Net of withhold &amp; cap</span>
                        <span className="font-bold text-sky-700">{fmtUSD(s.r.sharedSavings)}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Loss payment</span>
                        <span className="font-bold text-rose-500">
                          {s.r.lossPayment > 0 ? "−" + fmtUSD(s.r.lossPayment) : fmtUSD(0)}
                          {s.r.stopLossBinding && <span className="ml-1 text-[9px] font-black uppercase text-rose-400">capped</span>}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Admin costs</span>
                        <span className="font-bold text-amber-600">−{fmtUSD(s.r.totalAdminCost)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
              The gap between <span className="font-bold text-slate-500">gross</span> and{" "}
              <span className="font-bold text-slate-500">net</span> shared savings is the quality withhold and the{" "}
              {(effectiveModel.capGainPct * 100).toFixed(0)}% gain cap biting. Downside is limited by the{" "}
              {effectiveModel.stopLossPct > 0
                ? `${(effectiveModel.stopLossPct * 100).toFixed(0)}% stop-loss ceiling (${fmtUSD(results.maxLossExposure)})`
                : "absence of downside risk in this model"}.
            </p>
          </div>

          {/* Alerts */}
          <div className="space-y-2">
            {!results.aboveMSR && results.grossSavings > 0 && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                Savings rate ({(results.savingsRate * 100).toFixed(1)}%) is below the MSR ({(results.msr * 100).toFixed(1)}%). No shared savings earned.
              </div>
            )}
            {results.qualityMultiplier < 1 && (
              <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                Quality score ({qualityScore}) is below 70. Quality withhold of {(effectiveModel.qualityWithhold * 100).toFixed(0)}% applied to shared savings.
              </div>
            )}
            {results.stopLossBinding && (
              <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                Stop-loss binding: the {(results.lossShare * 100).toFixed(0)}% loss share would owe{" "}
                {fmtUSD(results.lossPaymentBeforeCap)}, but the {(effectiveModel.stopLossPct * 100).toFixed(0)}% ceiling
                limits exposure to {fmtUSD(results.maxLossExposure)}.
              </div>
            )}
            {results.breakEvenSavingsPct > 0 && (
              <div className="flex items-start gap-2 p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-700">
                <DollarSign size={14} className="shrink-0 mt-0.5" />
                Break-even: ACO must achieve ≥{results.breakEvenSavingsPct.toFixed(1)}% savings vs. benchmark to cover admin costs.
              </div>
            )}
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed">
            Model parameters from 42 CFR 425.604–425.610 (MSSP), the CMS ACO REACH PY2026 model update, and the
            CMS TEAM final rule. Quality withhold applied when score &lt;70 (a simplification of each program&apos;s
            quality scoring).
            All projections are illustrative estimates for planning purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
