"use client";

import { useState, useMemo } from "react";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";

// ─── Reference QALY values for common conditions ──────────────────────────────
const CONDITION_PRESETS = [
  { label: "Custom", costPerPatient: 0, efficacyRate: 0, qalyGain: 0 },
  { label: "Type 2 Diabetes — Intensive Glycemic Control", costPerPatient: 4200, efficacyRate: 62, qalyGain: 0.18 },
  { label: "Heart Failure — Remote Monitoring Program", costPerPatient: 2800, efficacyRate: 45, qalyGain: 0.22 },
  { label: "COPD — Pulmonary Rehab (12-week)", costPerPatient: 3500, efficacyRate: 55, qalyGain: 0.14 },
  { label: "Colorectal Cancer Screening (colonoscopy)", costPerPatient: 1850, efficacyRate: 90, qalyGain: 0.31 },
  { label: "Hypertension — Community Pharmacist Program", costPerPatient: 420, efficacyRate: 70, qalyGain: 0.12 },
  { label: "Depression — Collaborative Care Model (CoCM)", costPerPatient: 1200, efficacyRate: 58, qalyGain: 0.28 },
  { label: "Opioid Use Disorder — MAT (MOUD)", costPerPatient: 5600, efficacyRate: 50, qalyGain: 0.45 },
  { label: "Breast Cancer Screening (mammography)", costPerPatient: 310, efficacyRate: 85, qalyGain: 0.08 },
  { label: "Sepsis — Early Warning AI System", costPerPatient: 6800, efficacyRate: 38, qalyGain: 0.62 },
  { label: "Hospital-at-Home (Acute Care)", costPerPatient: 8200, efficacyRate: 72, qalyGain: 0.19 },
  { label: "Pharmacogenomics-Guided Prescribing", costPerPatient: 2400, efficacyRate: 48, qalyGain: 0.16 },
];

// WTP thresholds (USD/QALY)
const WTP_THRESHOLDS = [
  { label: "NICE (UK)", value: 30000, color: "text-emerald-600" },
  { label: "ICER Standard", value: 100000, color: "text-sky-600" },
  { label: "ICER High", value: 150000, color: "text-amber-600" },
  { label: "CMS Informal", value: 200000, color: "text-rose-600" },
];

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

function fmtUSD(n: number) {
  return "$" + fmt(Math.round(n));
}

export default function CEACalculator() {
  const [preset, setPreset] = useState(0);
  const [costPerPatient, setCostPerPatient] = useState(4200);
  const [efficacyRate, setEfficacyRate] = useState(62);
  const [qalyGain, setQalyGain] = useState(0.18);
  const [populationSize, setPopulationSize] = useState(10000);
  const [timeHorizonYears, setTimeHorizonYears] = useState(5);
  const [discountRate, setDiscountRate] = useState(3);
  const [comparatorCost, setComparatorCost] = useState(0);

  const results = useMemo(() => {
    const effectivePct = efficacyRate / 100;
    // Responders = patients who benefit
    const responders = Math.round(populationSize * effectivePct);
    // NNT = 1 / Absolute Risk Reduction
    const nnt = effectivePct > 0 ? 1 / effectivePct : Infinity;
    // Total program cost
    const totalCost = costPerPatient * populationSize;
    // Incremental cost (vs comparator)
    const incrementalCost = totalCost - comparatorCost * populationSize;
    // Total QALYs gained
    const totalQALYs = responders * qalyGain;
    // Discounted QALYs (simple discount)
    const discountFactor = timeHorizonYears > 1
      ? ((1 - Math.pow(1 + discountRate / 100, -timeHorizonYears)) / (discountRate / 100))
      : 1;
    const discountedQALYs = totalQALYs * (discountRate > 0 ? discountFactor / timeHorizonYears : 1);
    // ICER = incremental cost / incremental QALY
    const icer = discountedQALYs > 0 ? incrementalCost / discountedQALYs : Infinity;
    // Break-even: years until QALYs offset cost (simplified)
    const annualQALYsGained = totalQALYs / timeHorizonYears;
    const costPerQALYPerYear = annualQALYsGained > 0 ? incrementalCost / annualQALYsGained : Infinity;

    return {
      responders,
      nnt: isFinite(nnt) ? nnt : null,
      totalCost,
      incrementalCost,
      totalQALYs,
      discountedQALYs,
      icer,
      costPerQALYPerYear,
      annualQALYsGained,
    };
  }, [costPerPatient, efficacyRate, qalyGain, populationSize, timeHorizonYears, discountRate, comparatorCost]);

  function applyPreset(idx: number) {
    setPreset(idx);
    if (idx === 0) return;
    const p = CONDITION_PRESETS[idx];
    setCostPerPatient(p.costPerPatient);
    setEfficacyRate(p.efficacyRate);
    setQalyGain(p.qalyGain);
  }

  const icerStatus = () => {
    const v = results.icer;
    if (!isFinite(v) || v <= 0) return { label: "Not Calculable", color: "text-slate-400", bg: "bg-slate-50 border-slate-200" };
    if (v < 30000)  return { label: "Highly Cost-Effective", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" };
    if (v < 100000) return { label: "Cost-Effective (ICER Standard)", color: "text-sky-700", bg: "bg-sky-50 border-sky-200" };
    if (v < 150000) return { label: "Borderline — Requires Justification", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" };
    if (v < 200000) return { label: "High Cost — CMS Informal Threshold", color: "text-orange-700", bg: "bg-orange-50 border-orange-200" };
    return { label: "Not Cost-Effective at Standard Thresholds", color: "text-rose-700", bg: "bg-rose-50 border-rose-200" };
  };

  const status = icerStatus();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">

        {/* ── INPUTS ── */}
        <div className="lg:col-span-2 p-6 space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Condition Preset
            </label>
            <select
              value={preset}
              onChange={e => applyPreset(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CONDITION_PRESETS.map((p, i) => (
                <option key={i} value={i}>{p.label}</option>
              ))}
            </select>
          </div>

          {[
            { label: "Cost Per Patient ($)", value: costPerPatient, set: setCostPerPatient, min: 0, max: 500000, step: 100, format: (v: number) => "$" + fmt(v) },
            { label: "Efficacy Rate (% responding)", value: efficacyRate, set: setEfficacyRate, min: 1, max: 100, step: 1, format: (v: number) => v + "%" },
            { label: "QALY Gain Per Responder", value: qalyGain, set: setQalyGain, min: 0.01, max: 2, step: 0.01, format: (v: number) => v.toFixed(2) },
            { label: "Population Size", value: populationSize, set: setPopulationSize, min: 100, max: 1000000, step: 100, format: (v: number) => fmt(v) },
            { label: "Time Horizon (years)", value: timeHorizonYears, set: setTimeHorizonYears, min: 1, max: 30, step: 1, format: (v: number) => v + " yr" },
            { label: "Discount Rate (%)", value: discountRate, set: setDiscountRate, min: 0, max: 10, step: 0.5, format: (v: number) => v + "%" },
            { label: "Comparator Cost Per Patient ($)", value: comparatorCost, set: setComparatorCost, min: 0, max: 100000, step: 100, format: (v: number) => "$" + fmt(v) },
          ].map(field => (
            <div key={field.label}>
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-600">{field.label}</label>
                <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {field.format(field.value)}
                </span>
              </div>
              <input
                type="range"
                min={field.min} max={field.max} step={field.step}
                value={field.value}
                onChange={e => field.set(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-300 mt-0.5">
                <span>{field.format(field.min)}</span>
                <span>{field.format(field.max)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── RESULTS ── */}
        <div className="lg:col-span-3 p-6 space-y-6 bg-slate-50/50">

          {/* ICER Verdict */}
          <div className={`rounded-2xl border p-5 ${status.bg}`}>
            <div className="flex items-start gap-3">
              {results.icer < 100000
                ? <CheckCircle size={20} className={`shrink-0 mt-0.5 ${status.color}`} />
                : <AlertTriangle size={20} className={`shrink-0 mt-0.5 ${status.color}`} />
              }
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">ICER Verdict</p>
                <p className={`text-xl font-black ${status.color}`}>{status.label}</p>
                <p className="text-sm text-slate-500 mt-1">
                  ICER = <strong>{isFinite(results.icer) ? fmtUSD(results.icer) : "∞"} / QALY</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Total Program Cost", value: fmtUSD(results.totalCost), sub: `${fmt(populationSize)} patients × ${fmtUSD(costPerPatient)}`, color: "text-slate-800" },
              { label: "Incremental Cost vs Comparator", value: fmtUSD(results.incrementalCost), sub: "Net cost above status quo", color: results.incrementalCost > 0 ? "text-rose-600" : "text-emerald-600" },
              { label: "Patients Who Respond", value: fmt(results.responders), sub: `of ${fmt(populationSize)} treated (${efficacyRate}% efficacy)`, color: "text-emerald-700" },
              { label: "NNT (Number Needed to Treat)", value: results.nnt ? results.nnt.toFixed(1) : "N/A", sub: "Patients treated per 1 benefit", color: "text-sky-700" },
              { label: "Total QALYs Gained", value: fmt(results.totalQALYs, 1), sub: `Discounted: ${fmt(results.discountedQALYs, 1)} QALYs`, color: "text-indigo-700" },
              { label: "Cost per QALY (ICER)", value: isFinite(results.icer) ? fmtUSD(results.icer) : "∞", sub: `Over ${timeHorizonYears}-year horizon at ${discountRate}% discount`, color: status.color },
            ].map(card => (
              <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{card.label}</p>
                <p className={`text-2xl font-black ${card.color} leading-none mb-1`}>{card.value}</p>
                <p className="text-[10px] text-slate-400 leading-snug">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* WTP Threshold Comparison */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Info size={14} className="text-slate-400" />
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Willingness-to-Pay Threshold Comparison</h4>
            </div>
            <div className="space-y-3">
              {WTP_THRESHOLDS.map(threshold => {
                const pct = isFinite(results.icer) && results.icer > 0
                  ? Math.min((results.icer / threshold.value) * 100, 200)
                  : 0;
                const below = isFinite(results.icer) && results.icer <= threshold.value;
                return (
                  <div key={threshold.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">{threshold.label}</span>
                      <span className={`font-bold ${below ? "text-emerald-600" : "text-rose-500"}`}>
                        {fmtUSD(threshold.value)} {below ? "✓ Below" : "✗ Exceeds"}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${below ? "bg-emerald-500" : "bg-rose-400"}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed">
            <strong>Methodology:</strong> ICER = Incremental Cost / Incremental QALYs. QALYs discounted at {discountRate}%/yr over {timeHorizonYears} years.
            Comparator assumed to be standard of care at ${fmt(comparatorCost)}/patient. This tool is for educational and planning purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
