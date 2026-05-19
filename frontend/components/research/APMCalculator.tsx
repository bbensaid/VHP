"use client";

import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from "lucide-react";

const APM_MODELS = [
  {
    id: "mssp1",
    label: "MSSP Track 1 (One-Sided Risk)",
    msr: 0.02,         // Minimum Savings Rate
    sharingRate: 0.50, // 50% shared savings
    lossShare: 0,      // No downside risk
    qualityWithhold: 0,
    capGainPct: 0.10,  // Max shared savings 10% of benchmark
    desc: "Entry-level ACO model. No downside risk. ACO keeps 50% of savings above MSR.",
  },
  {
    id: "mssp2",
    label: "MSSP Enhanced (Two-Sided Risk)",
    msr: 0,
    sharingRate: 0.75,
    lossShare: 0.30,
    qualityWithhold: 0.025,
    capGainPct: 0.15,
    desc: "Enhanced MSSP with downside risk. Higher sharing rate (75%) but 30% loss exposure.",
  },
  {
    id: "aco_reach",
    label: "ACO REACH (Global Risk)",
    msr: 0,
    sharingRate: 1.0,
    lossShare: 1.0,
    qualityWithhold: 0.05,
    capGainPct: 1.0,
    desc: "Full global risk model. ACO keeps/absorbs 100% of savings or losses vs. benchmark.",
  },
  {
    id: "bpci",
    label: "BPCI-Advanced (Episode-Based)",
    msr: 0,
    sharingRate: 1.0,
    lossShare: 1.0,
    qualityWithhold: 0,
    capGainPct: 1.0,
    desc: "Per-episode payment model. Net payment based on actual vs. target episode price.",
  },
  {
    id: "custom",
    label: "Custom Model",
    msr: 0.01,
    sharingRate: 0.60,
    lossShare: 0.20,
    qualityWithhold: 0.02,
    capGainPct: 0.12,
    desc: "Define your own sharing rate, MSR, and risk parameters.",
  },
];

// ─── VERMONT PRESET SCENARIOS ─────────────────────────────────────────────────
const VERMONT_APM_PRESETS = [
  {
    id: "ahead_fy28",
    label: "Vermont AHEAD Global Budget (FY2028)",
    badge: "All-payer · Mandatory",
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
    label: "Small Rural Hospital (CAH AHEAD Participant)",
    badge: "CAH · Act 68 Exempt from Global Budget",
    modelIdx: 0, // MSSP Track 1
    attributedLives: 4_200,
    benchmarkPMPM: 1_120,
    actualSpendPct: 95.8,
    qualityScore: 80,
    adminCostPMPM: 28,
  },
];

function fmt(n: number, dec = 0) {
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}
function fmtUSD(n: number) {
  if (Math.abs(n) >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  return "$" + fmt(Math.round(n));
}

export default function APMCalculator() {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [modelIdx, setModelIdx] = useState(0);
  const [attributedLives, setAttributedLives] = useState(8000);
  const [benchmarkPMPM, setBenchmarkPMPM] = useState(1050);
  const [actualSpendPct, setActualSpendPct] = useState(96); // % of benchmark (96 = 4% savings)
  const [qualityScore, setQualityScore] = useState(85);    // 0-100
  const [adminCostPMPM, setAdminCostPMPM] = useState(18);

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

  const model = APM_MODELS[modelIdx];
  // Wrapped in useMemo so the results memo below sees a stable reference unless
  // a model parameter actually changed. Without this, `effectiveModel` is a new
  // object on every render and the downstream memo recomputes unconditionally.
  const effectiveModel = useMemo(() => {
    return modelIdx === APM_MODELS.length - 1
      ? { ...model, msr: customMSR / 100, sharingRate: customSharing / 100, lossShare: customLoss / 100, qualityWithhold: customQW / 100 }
      : model;
  }, [model, modelIdx, customMSR, customSharing, customLoss, customQW]);

  const results = useMemo(() => {
    const annualBenchmark = attributedLives * benchmarkPMPM * 12;
    const actualSpend     = annualBenchmark * (actualSpendPct / 100);
    const grossSavings    = annualBenchmark - actualSpend;
    const savingsRate     = grossSavings / annualBenchmark;

    // Apply MSR
    const netSavings = savingsRate >= effectiveModel.msr ? grossSavings : 0;
    const netLoss    = grossSavings < 0 ? Math.abs(grossSavings) : 0;

    // Quality adjustment: below 70 = withhold applied
    const qualityMultiplier = qualityScore >= 70
      ? 1
      : 1 - effectiveModel.qualityWithhold;

    // Shared savings earned (cap at capGainPct * benchmark)
    const maxSharedSavings = annualBenchmark * effectiveModel.capGainPct;
    const sharedSavingsBeforeCap = netSavings * effectiveModel.sharingRate * qualityMultiplier;
    const sharedSavings = Math.min(sharedSavingsBeforeCap, maxSharedSavings);

    // Loss payment (if in deficit)
    const lossPayment = netLoss * effectiveModel.lossShare;

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
      annualBenchmark,
      actualSpend,
      grossSavings,
      savingsRate,
      netSavings,
      sharedSavings,
      lossPayment,
      totalAdminCost,
      netPosition,
      netPositionPMPM,
      breakEvenSavingsPct,
      qualityMultiplier,
      aboveMSR: savingsRate >= effectiveModel.msr,
    };
  }, [attributedLives, benchmarkPMPM, actualSpendPct, qualityScore, adminCostPMPM, effectiveModel]);

  const isProfit = results.netPosition >= 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">

        {/* ── INPUTS ── */}
        <div className="lg:col-span-2 p-6 space-y-5">

          {/* Vermont Presets */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-3">Vermont Scenarios</p>
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
                { label: `Shared Savings Earned (${(effectiveModel.sharingRate * 100).toFixed(0)}% share)`, value: results.sharedSavings, color: "text-sky-600", barColor: "bg-sky-500" },
                { label: "Loss Payment to CMS", value: -results.lossPayment, color: "text-rose-500", barColor: "bg-rose-400" },
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

          {/* Alerts */}
          <div className="space-y-2">
            {!results.aboveMSR && results.grossSavings > 0 && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                Savings rate ({(results.savingsRate * 100).toFixed(1)}%) is below the MSR ({(effectiveModel.msr * 100).toFixed(1)}%). No shared savings earned.
              </div>
            )}
            {results.qualityMultiplier < 1 && (
              <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                Quality score ({qualityScore}) is below 70. Quality withhold of {(effectiveModel.qualityWithhold * 100).toFixed(0)}% applied to shared savings.
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
            Based on CY2025 CMS MSSP and ACO REACH model parameters. Quality withhold applied when score &lt;70.
            All projections are illustrative estimates for planning purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
