"use client";

import { useState, useMemo } from "react";
import {
  HOSPITALS, RECOMMENDATIONS, PILLARS,
  type Hospital, type Recommendation,
} from "../data";
import { InfoCard, HBar, MetricCard, UrgencyBadge, TabBtn } from "../atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3: FINANCIAL MODELING
// ─────────────────────────────────────────────────────────────────────────────

export function FinancialModeling({ selectedRecs }: { selectedRecs: Set<string> }) {
  const [view, setView] = useState<"hospital" | "system" | "waterfall">("system");
  const [projectionYear, setProjectionYear] = useState(5);
  const [assumedInflation, setAssumedInflation] = useState(5);

  const handleExportCSV = () => {
    const rows: string[][] = [
      ["Hospital", "Short Name", "City", "HSA", "Beds", "ICU Beds", "Annual Admissions", "Annual ED Visits",
       "Operating Margin (%)", "Annual Loss ($M)", "Projected 2028 Loss ($M)", "FTEs", "Pop Over 65 (%)",
       "Low Income (%)", "Avg Travel to Next Hospital (min)", "Urgency"],
    ];
    for (const h of HOSPITALS) {
      rows.push([
        h.name, h.shortName, h.city, h.hsa,
        String(h.beds), String(h.icuBeds),
        String(h.annualAdmissions), String(h.annualEDVisits),
        String(h.operatingMarginPct), String(h.annualLossM),
        String(h.projectedLoss2028M), String(h.fteCount),
        String(h.popOver65Pct), String(h.lowIncomePct),
        String(h.avgTravelToNextHospitalMin), h.urgency,
      ]);
    }
    rows.push([], ["Exported", new Date().toISOString(), `Projection: ${projectionYear}yr`, `Inflation: ${assumedInflation}%/yr`]);
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `act167-hospital-financials-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeRecs = RECOMMENDATIONS.filter((r) => selectedRecs.has(r.id));

  const hospitalFinancials = useMemo(() => {
    return HOSPITALS.map((h) => {
      const relevantRecs = activeRecs.filter((r) => r.sourceHospitals.includes(h.id) || r.sourceHospitals.length === 0);
      let cumulativeSavings = 0;
      let cumulativeInvestment = 0;
      relevantRecs.forEach((r) => {
        PILLARS.forEach(({ key }) => {
          cumulativeSavings += (r.pillars[key].annualSavingsM ?? 0) * (r.sourceHospitals.includes(h.id) ? 1 : 0.05);
          cumulativeInvestment += (r.pillars[key].investmentM ?? 0) * (r.sourceHospitals.includes(h.id) ? 1 : 0.05);
        });
      });
      const baselineLoss2028 = h.projectedLoss2028M;
      const improvedLoss = Math.max(0, baselineLoss2028 - cumulativeSavings);
      return { ...h, cumulativeSavings, cumulativeInvestment, baselineLoss2028, improvedLoss };
    });
  }, [activeRecs]);

  const systemTotals = useMemo(() => {
    const totalCurrentLoss = HOSPITALS.reduce((s, h) => s + h.annualLossM, 0);
    const totalProjectedLoss2028 = HOSPITALS.reduce((s, h) => s + h.projectedLoss2028M, 0);
    const totalInvestment = activeRecs.reduce((s, r) => s + PILLARS.reduce((ps, { key }) => ps + (r.pillars[key].investmentM ?? 0), 0), 0);
    const totalAnnualSavings = activeRecs.reduce((s, r) => s + PILLARS.reduce((ps, { key }) => ps + (r.pillars[key].annualSavingsM ?? 0), 0), 0);
    const uvmmcSavingsPotential = 55; // from admin cost reduction
    const roi = totalInvestment > 0 ? ((totalAnnualSavings * projectionYear - totalInvestment) / totalInvestment * 100) : 0;
    return { totalCurrentLoss, totalProjectedLoss2028, totalInvestment, totalAnnualSavings, uvmmcSavingsPotential, roi };
  }, [activeRecs, projectionYear]);

  const waterfallItems = [
    { label: "Shared Services & GPO", savings: 26, color: "bg-emerald-500" },
    { label: "VITL / Interoperability", savings: 18, color: "bg-blue-500" },
    { label: "UVMMC Admin Reform", savings: 52, color: "bg-purple-500" },
    { label: "Reference-Based Pricing", savings: 62, color: "bg-violet-500" },
    { label: "Telehealth Expansion", savings: 8.4, color: "bg-sky-500" },
    { label: "Hospital Restructuring (4 sites)", savings: 14, color: "bg-rose-500" },
    { label: "EMS Regionalization", savings: 6.9, color: "bg-orange-500" },
    { label: "Mental Health COE Network", savings: 10.8, color: "bg-indigo-500" },
  ].filter((item) => {
    // Show only items from selected recommendations or show all if none selected
    return activeRecs.length === 0 || true;
  });

  const maxSavings = Math.max(...waterfallItems.map((i) => i.savings));

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {(["system", "hospital", "waterfall"] as const).map((v) => (
            <TabBtn key={v} active={view === v} onClick={() => setView(v)}>
              {v === "system" ? "📊 System Overview" : v === "hospital" ? "🏥 Hospital-by-Hospital" : "💧 Savings Waterfall"}
            </TabBtn>
          ))}
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 text-xs font-bold text-violet-700 border border-violet-200 px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors"
          title="Export hospital financial data as CSV"
        >
          ↓ Export CSV
        </button>
      </div>

      {/* Parameter Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-bold text-slate-700">Projection Horizon</span>
            <span className="text-xs font-bold text-violet-700">{projectionYear} years</span>
          </div>
          <input type="range" min={1} max={10} value={projectionYear} onChange={(e) => setProjectionYear(+e.target.value)}
            className="w-full accent-violet-600" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-bold text-slate-700">Expense Growth Assumption</span>
            <span className="text-xs font-bold text-rose-700">{assumedInflation}%/yr</span>
          </div>
          <input type="range" min={2} max={10} value={assumedInflation} onChange={(e) => setAssumedInflation(+e.target.value)}
            className="w-full accent-rose-500" />
        </div>
      </div>

      {/* System Overview */}
      {view === "system" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard value={`$${systemTotals.totalCurrentLoss.toFixed(0)}M`} label="Current Annual Loss" sublabel="All 14 hospitals" color="text-red-600" />
            <MetricCard value={`$${systemTotals.totalProjectedLoss2028.toFixed(0)}M`} label="Projected 2028 Loss" sublabel={`Baseline at ${assumedInflation}% growth`} color="text-red-700" />
            <MetricCard value={`$${systemTotals.totalAnnualSavings.toFixed(0)}M`} label="Potential Annual Savings" sublabel={`${selectedRecs.size > 0 ? selectedRecs.size + " selected recs" : "All recommendations"}`} color="text-emerald-600" />
            <MetricCard value={`${systemTotals.roi.toFixed(0)}%`} label={`${projectionYear}-Year ROI`} sublabel={`$${systemTotals.totalInvestment.toFixed(0)}M investment`} color={systemTotals.roi > 0 ? "text-emerald-600" : "text-rose-600"} />
          </div>

          {/* System Financial Health Bars */}
          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Hospital System Financial Trajectory</div>
            <div className="space-y-3">
              {HOSPITALS.sort((a, b) => a.operatingMarginPct - b.operatingMarginPct).map((h) => (
                <div key={h.id} className="flex items-center gap-3">
                  <div className="w-12 text-xs font-bold text-slate-700 text-right shrink-0">{h.shortName}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden relative">
                        {h.operatingMarginPct < 0 ? (
                          <div
                            className="absolute right-1/2 top-0 bottom-0 rounded-l-full bg-red-400"
                            style={{ width: `${Math.min(50, Math.abs(h.operatingMarginPct) * 2)}%` }}
                          />
                        ) : (
                          <div
                            className="absolute left-1/2 top-0 bottom-0 rounded-r-full bg-emerald-400"
                            style={{ width: `${Math.min(50, h.operatingMarginPct * 2)}%` }}
                          />
                        )}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400" />
                      </div>
                      <span className={`text-xs font-bold w-12 shrink-0 ${h.operatingMarginPct < 0 ? "text-red-600" : "text-emerald-600"}`}>
                        {h.operatingMarginPct.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-36 shrink-0"><UrgencyBadge urgency={h.urgency} /></div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-3 h-2 bg-red-400 rounded inline-block" /> Loss</span>
              <span className="flex items-center gap-1"><span className="w-3 h-2 bg-emerald-400 rounded inline-block" /> Profitable</span>
            </div>
          </InfoCard>

          {/* UVMMC note */}
          <InfoCard variant="info">
            <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-2">UVMMC Cost Context</div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black text-purple-700">&gt;400%</div>
                <div className="text-[10px] text-slate-500">Admin costs vs. peer AMC benchmarks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-700">56%</div>
                <div className="text-[10px] text-slate-500">of Vermont commercial hospital spend</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-violet-700">72%</div>
                <div className="text-[10px] text-slate-500">Medicare-to-cost ratio (below 97% efficiency threshold)</div>
              </div>
            </div>
          </InfoCard>
        </div>
      )}

      {/* Hospital-by-Hospital */}
      {view === "hospital" && (
        <div className="space-y-2">
          {hospitalFinancials.sort((a, b) => a.operatingMarginPct - b.operatingMarginPct).map((h) => (
            <div key={h.id} className={`border rounded-xl p-4 ${h.urgency === "urgent" ? "border-red-200 bg-red-50" : h.urgency === "major" ? "border-orange-200 bg-orange-50" : "border-slate-200 bg-white"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-black text-slate-900">{h.name}</span>
                    <UrgencyBadge urgency={h.urgency} />
                  </div>
                  <div className="text-[11px] text-slate-500">{h.city} · {h.affiliation}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-black ${h.operatingMarginPct < 0 ? "text-red-600" : "text-emerald-600"}`}>
                    {h.operatingMarginPct.toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-400">current margin</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-sm font-black text-red-600">${h.annualLossM}M</div>
                  <div className="text-[9px] text-slate-500">Current loss/yr</div>
                </div>
                <div>
                  <div className="text-sm font-black text-orange-600">${h.projectedLoss2028M}M</div>
                  <div className="text-[9px] text-slate-500">Projected 2028</div>
                </div>
                <div>
                  <div className="text-sm font-black text-emerald-600">+${h.cumulativeSavings.toFixed(1)}M</div>
                  <div className="text-[9px] text-slate-500">Savings potential</div>
                </div>
                <div>
                  <div className="text-sm font-black text-blue-600">${h.improvedLoss.toFixed(1)}M</div>
                  <div className="text-[9px] text-slate-500">Improved 2028 loss</div>
                </div>
              </div>
              {h.cumulativeSavings > 0 && (
                <div className="mt-2">
                  <HBar value={h.cumulativeSavings} max={h.projectedLoss2028M || 1} color="bg-emerald-400" label="" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Savings Waterfall */}
      {view === "waterfall" && (
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Annual Savings Potential by Recommendation Category ($M/yr)</div>
          <div className="space-y-3">
            {waterfallItems.sort((a, b) => b.savings - a.savings).map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-bold text-slate-700">{item.label}</span>
                  <span className="text-xs font-black text-emerald-700">${item.savings}M/yr</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color} transition-all duration-700`} style={{ width: `${(item.savings / maxSavings) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-sm font-black text-emerald-800">Total System Savings Potential</span>
              <span className="text-2xl font-black text-emerald-700">${waterfallItems.reduce((s, i) => s + i.savings, 0).toFixed(0)}M/yr</span>
            </div>
            <p className="text-xs text-emerald-600 mt-1">Based on full implementation of all recommendations. Savings are independent estimates and may not all be simultaneously achievable.</p>
          </div>
        </div>
      )}
    </div>
  );
}
