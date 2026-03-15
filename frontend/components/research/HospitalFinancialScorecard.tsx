"use client";

import { useState, useMemo } from "react";
import { CheckCircle, AlertTriangle, XCircle, TrendingDown } from "lucide-react";

type PeerGroup = "cah" | "rural_pps" | "urban_community" | "urban_tertiary";

const PEER_BENCHMARKS: Record<PeerGroup, {
  label: string;
  operatingMargin: number;
  dayCashOnHand: number;
  debtServiceCoverage: number;
  currentRatio: number;
  laborCostPct: number;
}> = {
  cah: {
    label: "Critical Access Hospital (CAH)",
    operatingMargin: 0.8,
    dayCashOnHand: 45,
    debtServiceCoverage: 2.0,
    currentRatio: 1.8,
    laborCostPct: 52,
  },
  rural_pps: {
    label: "Rural PPS Hospital",
    operatingMargin: 1.2,
    dayCashOnHand: 58,
    debtServiceCoverage: 2.5,
    currentRatio: 2.1,
    laborCostPct: 50,
  },
  urban_community: {
    label: "Urban Community Hospital",
    operatingMargin: 2.0,
    dayCashOnHand: 90,
    debtServiceCoverage: 3.2,
    currentRatio: 2.4,
    laborCostPct: 48,
  },
  urban_tertiary: {
    label: "Urban Tertiary / Academic",
    operatingMargin: 3.1,
    dayCashOnHand: 142,
    debtServiceCoverage: 4.0,
    currentRatio: 2.8,
    laborCostPct: 45,
  },
};

function scoreMetric(value: number, benchmark: number, direction: "higher" | "lower") {
  const ratio = direction === "higher" ? value / benchmark : benchmark / value;
  if (ratio >= 1.15) return "strong";
  if (ratio >= 0.85) return "adequate";
  if (ratio >= 0.60) return "weak";
  return "critical";
}

const STATUS_CONFIG = {
  strong:   { label: "Strong",   icon: CheckCircle,   color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", bar: "bg-emerald-500" },
  adequate: { label: "Adequate", icon: CheckCircle,   color: "text-sky-600",     bg: "bg-sky-50 border-sky-200",         bar: "bg-sky-400" },
  weak:     { label: "Weak",     icon: AlertTriangle, color: "text-amber-600",   bg: "bg-amber-50 border-amber-200",     bar: "bg-amber-400" },
  critical: { label: "Critical", icon: XCircle,       color: "text-rose-600",    bg: "bg-rose-50 border-rose-200",       bar: "bg-rose-500" },
};

function fmt(n: number, dec = 1) { return n.toLocaleString("en-US", { maximumFractionDigits: dec }); }
function fmtUSD(n: number) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(1) + "M";
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function HospitalFinancialScorecard() {
  const [peerGroup, setPeerGroup] = useState<PeerGroup>("cah");

  // Base financials
  const [totalRevenue,    setTotalRevenue]    = useState(48_000_000);
  const [operatingExpense, setOperatingExpense] = useState(47_400_000);
  const [cashOnHand,      setCashOnHand]      = useState(5_800_000);
  const [annualDebtService, setAnnualDebtService] = useState(1_200_000);
  const [currentAssets,   setCurrentAssets]   = useState(8_200_000);
  const [currentLiabilities, setCurrentLiabilities] = useState(4_100_000);
  const [laborCost,       setLaborCost]       = useState(24_000_000);

  // Stress test parameters
  const [medicaidCutPct, setMedicaidCutPct] = useState(0);
  const [volumeChangePct, setVolumeChangePct] = useState(0);
  const [travelNurseIncreasePct, setTravelNurseIncreasePct] = useState(0);

  const bench = PEER_BENCHMARKS[peerGroup];

  const results = useMemo(() => {
    // Stress adjustments
    const revenueAdj    = totalRevenue    * (1 + volumeChangePct / 100) * (1 - medicaidCutPct / 100 * 0.15); // Medicaid is ~15% of net rev
    const laborAdj      = laborCost       * (1 + travelNurseIncreasePct / 100 * 0.12); // Travel nurses ~12% of labor
    const expenseAdj    = operatingExpense - laborCost + laborAdj;
    const dailyExpense  = expenseAdj / 365;
    const adjustedMargin = ((revenueAdj - expenseAdj) / revenueAdj) * 100;

    return {
      operatingMargin: adjustedMargin,
      dayCashOnHand: dailyExpense > 0 ? cashOnHand / dailyExpense : 0,
      debtServiceCoverage: annualDebtService > 0
        ? (revenueAdj - expenseAdj + annualDebtService) / annualDebtService
        : 0,
      currentRatio: currentLiabilities > 0 ? currentAssets / currentLiabilities : 0,
      laborCostPct: revenueAdj > 0 ? (laborAdj / revenueAdj) * 100 : 0,
      revenueAdj,
      expenseAdj,
      netIncome: revenueAdj - expenseAdj,
    };
  }, [totalRevenue, operatingExpense, cashOnHand, annualDebtService, currentAssets, currentLiabilities,
      laborCost, medicaidCutPct, volumeChangePct, travelNurseIncreasePct]);

  const metrics = [
    { label: "Operating Margin", value: results.operatingMargin, benchmark: bench.operatingMargin, unit: "%", direction: "higher" as const, format: (v: number) => fmt(v, 1) + "%" },
    { label: "Days Cash on Hand", value: results.dayCashOnHand, benchmark: bench.dayCashOnHand, unit: "days", direction: "higher" as const, format: (v: number) => fmt(v, 0) + " days" },
    { label: "Debt Service Coverage", value: results.debtServiceCoverage, benchmark: bench.debtServiceCoverage, unit: "×", direction: "higher" as const, format: (v: number) => fmt(v, 2) + "×" },
    { label: "Current Ratio", value: results.currentRatio, benchmark: bench.currentRatio, unit: "×", direction: "higher" as const, format: (v: number) => fmt(v, 2) + "×" },
    { label: "Labor Cost % of Revenue", value: results.laborCostPct, benchmark: bench.laborCostPct, unit: "%", direction: "lower" as const, format: (v: number) => fmt(v, 1) + "%" },
  ];

  const scores = metrics.map(m => scoreMetric(m.value, m.benchmark, m.direction));
  const criticalCount  = scores.filter(s => s === "critical").length;
  const weakCount      = scores.filter(s => s === "weak").length;
  const overallStatus  = criticalCount >= 2 ? "critical" : criticalCount >= 1 ? "weak" : weakCount >= 2 ? "weak" : "adequate";
  const OverallIcon    = STATUS_CONFIG[overallStatus].icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">

        {/* ── INPUTS ── */}
        <div className="lg:col-span-2 p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Peer Group</label>
            <div className="grid grid-cols-1 gap-2">
              {(Object.entries(PEER_BENCHMARKS) as [PeerGroup, typeof PEER_BENCHMARKS[PeerGroup]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setPeerGroup(key)}
                  className={`text-left px-3 py-2 rounded-xl border text-sm transition-all ${
                    peerGroup === key
                      ? "bg-indigo-50 border-indigo-300 text-indigo-800 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Base Financials</p>
          {[
            { label: "Total Net Revenue", value: totalRevenue, set: setTotalRevenue, min: 5_000_000, max: 500_000_000, step: 1_000_000 },
            { label: "Total Operating Expense", value: operatingExpense, set: setOperatingExpense, min: 5_000_000, max: 500_000_000, step: 1_000_000 },
            { label: "Cash & Investments", value: cashOnHand, set: setCashOnHand, min: 0, max: 100_000_000, step: 500_000 },
            { label: "Annual Debt Service", value: annualDebtService, set: setAnnualDebtService, min: 0, max: 50_000_000, step: 100_000 },
            { label: "Current Assets", value: currentAssets, set: setCurrentAssets, min: 1_000_000, max: 200_000_000, step: 500_000 },
            { label: "Current Liabilities", value: currentLiabilities, set: setCurrentLiabilities, min: 1_000_000, max: 200_000_000, step: 500_000 },
            { label: "Total Labor Costs", value: laborCost, set: setLaborCost, min: 1_000_000, max: 300_000_000, step: 500_000 },
          ].map(f => (
            <div key={f.label}>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-bold text-slate-600">{f.label}</label>
                <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{fmtUSD(f.value)}</span>
              </div>
              <input type="range" min={f.min} max={f.max} step={f.step} value={f.value}
                onChange={e => f.set(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none bg-slate-200 accent-indigo-600 cursor-pointer" />
            </div>
          ))}

          {/* Stress Test */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">Stress Test Scenarios</p>
            {[
              { label: "Medicaid Rate Cut (%)", value: medicaidCutPct, set: setMedicaidCutPct, min: 0, max: 20 },
              { label: "Volume Change (%)", value: volumeChangePct, set: setVolumeChangePct, min: -30, max: 20 },
              { label: "Travel Nurse Labor Increase (%)", value: travelNurseIncreasePct, set: setTravelNurseIncreasePct, min: 0, max: 100 },
            ].map(f => (
              <div key={f.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{f.label}</span>
                  <span className={`font-bold ${f.value > 0 && f.label.includes("Cut") ? "text-rose-600" : f.value < 0 ? "text-rose-600" : f.value > 0 ? "text-amber-600" : "text-slate-400"}`}>
                    {f.value > 0 ? "+" : ""}{f.value}%
                  </span>
                </div>
                <input type="range" min={f.min} max={f.max} step={1} value={f.value}
                  onChange={e => f.set(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none bg-rose-200 accent-rose-600 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        {/* ── SCORECARD ── */}
        <div className="lg:col-span-3 p-6 space-y-5 bg-slate-50/50">

          {/* Overall status */}
          <div className={`rounded-2xl p-5 border ${STATUS_CONFIG[overallStatus].bg}`}>
            <div className="flex items-center gap-3">
              <OverallIcon size={22} className={`shrink-0 ${STATUS_CONFIG[overallStatus].color}`} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Overall Financial Health</p>
                <p className={`text-2xl font-black ${STATUS_CONFIG[overallStatus].color}`}>
                  {STATUS_CONFIG[overallStatus].label} — {bench.label}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Net income: <strong className={results.netIncome >= 0 ? "text-emerald-600" : "text-rose-500"}>{fmtUSD(results.netIncome)}</strong>
                  {" · "}Rev: {fmtUSD(results.revenueAdj)} · Exp: {fmtUSD(results.expenseAdj)}
                </p>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="space-y-3">
            {metrics.map((m, i) => {
              const status = scores[i];
              const cfg = STATUS_CONFIG[status];
              const Icon = cfg.icon;
              const barPct = Math.min((m.value / (m.benchmark * 2)) * 100, 100);
              const benchBarPct = 50; // benchmark is always at 50%

              return (
                <div key={m.label} className={`bg-white rounded-xl border p-4 ${status === "critical" || status === "weak" ? "border-rose-200" : "border-slate-200"}`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Icon size={14} className={`shrink-0 ${cfg.color}`} />
                        <span className="text-xs font-black text-slate-700">{m.label}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-xl font-black ${cfg.color}`}>{m.format(m.value)}</span>
                      <p className="text-[10px] text-slate-400">peer median: {m.format(m.benchmark)}</p>
                    </div>
                  </div>
                  {/* Bar showing value vs benchmark */}
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`absolute h-full rounded-full transition-all duration-500 ${cfg.bar}`}
                      style={{ width: `${barPct}%` }} />
                    {/* Benchmark marker */}
                    <div className="absolute top-0 h-full w-0.5 bg-slate-400"
                      style={{ left: `${benchBarPct}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-300 mt-0.5">
                    <span>0</span>
                    <span>Peer Median</span>
                    <span>2×</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stress test impact note */}
          {(medicaidCutPct > 0 || volumeChangePct !== 0 || travelNurseIncreasePct > 0) && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              <TrendingDown size={14} className="shrink-0 mt-0.5" />
              Stress test active — results reflect a {medicaidCutPct > 0 ? `${medicaidCutPct}% Medicaid cut` : ""}
              {medicaidCutPct > 0 && volumeChangePct !== 0 ? ", " : ""}
              {volumeChangePct !== 0 ? `${volumeChangePct > 0 ? "+" : ""}${volumeChangePct}% volume change` : ""}
              {travelNurseIncreasePct > 0 ? `${medicaidCutPct > 0 || volumeChangePct !== 0 ? ", " : ""}+${travelNurseIncreasePct}% travel nurse labor increase` : ""}.
            </div>
          )}

          <p className="text-[10px] text-slate-400 leading-relaxed">
            Peer benchmarks based on AHA Annual Survey 2024 and Kaufman Hall National Hospital Flash Report.
            Stress-test parameters apply proportional adjustments. For planning purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
