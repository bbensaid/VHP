"use client";

import { useState, useMemo } from "react";
import {
  HOSPITALS, RECOMMENDATIONS, COUNTY_DATA,
  type Recommendation,
} from "../data";
import { Badge, InfoCard, PillarGauge, MetricCard, TabBtn } from "../atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4: EQUITY & ACCESS ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────

// Static; hoisted to module scope so countyData's memo has a stable dependency.
const TRANSPORT_MULTIPLIERS = { baseline: 1.0, enhanced: 0.65, full: 0.35 };

export function EquityAnalysis({ selectedRecs }: { selectedRecs: Set<string> }) {
  const [view, setView] = useState<"county" | "population" | "transport">("county");
  const [transportScenario, setTransportScenario] = useState<"baseline" | "enhanced" | "full">("baseline");

  const countyData = useMemo(() => {
    return COUNTY_DATA.map((c) => {
      const hasHospitalRec = RECOMMENDATIONS.some((r) =>
        r.sourceHospitals.includes(c.primaryHospital) && selectedRecs.has(r.id)
      );
      const hospital = HOSPITALS.find((h) => h.id === c.primaryHospital);
      const adjustedTravelTime = c.travelTimeToHospitalMin * (hasHospitalRec && hospital?.urgency === "urgent" ? 1.6 : 1);
      const accessScore = Math.max(0, 100 - (c.noVehiclePct * 1.5) - (c.belowPovertyPct * 0.8) - (adjustedTravelTime * 0.4) * TRANSPORT_MULTIPLIERS[transportScenario]);
      return { ...c, adjustedTravelTime, accessScore, hasHospitalRec, hospital };
    });
  }, [selectedRecs, transportScenario]);

  const atRiskPopulation = useMemo(() => {
    const atRisk = HOSPITALS.filter((h) => h.urgency === "urgent" || h.urgency === "major");
    return atRisk.reduce((s, h) => s + h.populationHSA, 0);
  }, []);

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex gap-2 flex-wrap">
        {(["county", "population", "transport"] as const).map((v) => (
          <TabBtn key={v} active={view === v} onClick={() => setView(v)}>
            {v === "county" ? "🗺 County Access Map" : v === "population" ? "👥 Vulnerable Populations" : "🚐 Transportation Analysis"}
          </TabBtn>
        ))}
      </div>

      {/* Key equity metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard value={atRiskPopulation.toLocaleString()} label="HSA Population at Risk" sublabel="8 hospitals (urgent/major)" color="text-rose-600" />
        <MetricCard value="21%" label="No Vehicle Avg" sublabel="At-risk hospital HSAs" color="text-amber-600" />
        <MetricCard value="30%" label="Age 65+ Avg" sublabel="At-risk hospital HSAs" color="text-orange-600" />
        <MetricCard value="52 min" label="Max Distance" sublabel="Grace Cottage → BMH" color="text-red-600" />
      </div>

      {/* County View */}
      {view === "county" && (
        <div className="space-y-4">
          <InfoCard>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Vermont County Access Equity Scores</div>
            <div className="space-y-3">
              {countyData.sort((a, b) => a.accessScore - b.accessScore).map((c) => (
                <div key={c.county} className={`p-3 rounded-lg ${c.accessScore < 50 ? "bg-red-50 border border-red-200" : c.accessScore < 70 ? "bg-amber-50 border border-amber-100" : "bg-slate-50"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs font-black text-slate-800">{c.county} County</span>
                      {c.hasHospitalRec && (
                        <Badge color="bg-violet-100 text-violet-700 ml-2">Reform Impact</Badge>
                      )}
                    </div>
                    <div className={`text-lg font-black ${c.accessScore < 50 ? "text-red-600" : c.accessScore < 70 ? "text-amber-600" : "text-emerald-600"}`}>
                      {Math.round(c.accessScore)}<span className="text-xs font-normal">/100</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
                    <div><div className="font-black text-slate-700">{c.population.toLocaleString()}</div><div className="text-slate-400">Population</div></div>
                    <div><div className={`font-black ${c.over65Pct > 28 ? "text-orange-600" : "text-slate-700"}`}>{c.over65Pct}%</div><div className="text-slate-400">65+ years</div></div>
                    <div><div className={`font-black ${c.noVehiclePct > 15 ? "text-red-600" : "text-slate-700"}`}>{c.noVehiclePct}%</div><div className="text-slate-400">No vehicle</div></div>
                    <div><div className={`font-black ${c.belowPovertyPct > 18 ? "text-red-600" : "text-slate-700"}`}>{c.belowPovertyPct}%</div><div className="text-slate-400">Below poverty</div></div>
                    <div><div className={`font-black ${c.travelTimeToHospitalMin > 35 ? "text-red-600" : "text-slate-700"}`}>{c.travelTimeToHospitalMin} min</div><div className="text-slate-400">Travel time</div></div>
                  </div>
                  <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.accessScore < 50 ? "bg-red-400" : c.accessScore < 70 ? "bg-amber-400" : "bg-emerald-400"}`}
                      style={{ width: `${c.accessScore}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-4 text-[10px] text-slate-400">
              <span className="flex gap-1 items-center"><span className="w-3 h-2 bg-red-400 rounded" /> High Risk (&lt;50)</span>
              <span className="flex gap-1 items-center"><span className="w-3 h-2 bg-amber-400 rounded" /> Moderate (50–70)</span>
              <span className="flex gap-1 items-center"><span className="w-3 h-2 bg-emerald-400 rounded" /> Good (&gt;70)</span>
            </div>
          </InfoCard>
        </div>
      )}

      {/* Population Vulnerability */}
      {view === "population" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Vulnerable Population Groups — Vermont</div>
              {[
                { group: "Uninsured / Underinsured", count: "28,000", pct: 4.4, risk: "medium", note: "Concentrated in rural HSAs" },
                { group: "Age 65+ without vehicle", count: "18,400", pct: 2.9, risk: "high", note: "Critical for hospital restructuring" },
                { group: "Below poverty line", count: "52,000", pct: 8.3, risk: "high", note: "Spans urban and rural VT" },
                { group: "Non-English speaking", count: "22,000", pct: 3.5, risk: "medium", note: "Spanish, Somali, Vietnamese, Bosnian" },
                { group: "Disability (non-institutionalized)", count: "68,000", pct: 10.8, risk: "high", note: "Transportation and access barriers" },
                { group: "Dialysis patients (3x/wk)", count: "1,200", pct: 0.2, risk: "critical", note: "Life-critical transport need" },
                { group: "Serious mental illness", count: "14,000", pct: 2.2, risk: "high", note: "Psychiatric bed shortage affects directly" },
                { group: "Migrant agricultural workers", count: "8,000", pct: 1.3, risk: "medium", note: "Seasonal, often undocumented, no insurance" },
              ].map((item) => (
                <div key={item.group} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <div className="text-xs font-bold text-slate-800">{item.group}</div>
                    <div className="text-[10px] text-slate-400">{item.note}</div>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <div className="text-xs font-black text-slate-700">{item.count}</div>
                      <div className="text-[9px] text-slate-400">{item.pct}% of VT pop</div>
                    </div>
                    <Badge color={item.risk === "critical" ? "bg-red-100 text-red-700" : item.risk === "high" ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}>
                      {item.risk}
                    </Badge>
                  </div>
                </div>
              ))}
            </InfoCard>

            <InfoCard>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Equity Impact by Recommendation</div>
              {RECOMMENDATIONS.sort((a, b) => b.pillars.equity.score - a.pillars.equity.score).slice(0, 8).map((rec) => (
                <div key={rec.id} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-800 leading-tight">{rec.shortTitle}</div>
                    <div className="text-[10px] text-slate-400">{rec.pillars.equity.headline.slice(0, 70)}…</div>
                  </div>
                  <div className="shrink-0">
                    <PillarGauge score={rec.pillars.equity.score} direction={rec.pillars.equity.direction} label="" color="text-violet-700" />
                  </div>
                </div>
              ))}
            </InfoCard>
          </div>
        </div>
      )}

      {/* Transportation Analysis */}
      {view === "transport" && (
        <div className="space-y-4">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Transportation Investment Scenario</div>
            <div className="flex gap-2">
              {(["baseline", "enhanced", "full"] as const).map((s) => (
                <TabBtn key={s} active={transportScenario === s} onClick={() => setTransportScenario(s)}>
                  {s === "baseline" ? "🔴 Baseline (No Change)" : s === "enhanced" ? "🟡 Enhanced Transport" : "🟢 Full Transportation System"}
                </TabBtn>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MetricCard
              value={transportScenario === "baseline" ? "$0" : transportScenario === "enhanced" ? "$8M" : "$24M"}
              label="Annual Investment"
              sublabel="State + Federal match"
              color="text-amber-700"
            />
            <MetricCard
              value={transportScenario === "baseline" ? "25%" : transportScenario === "enhanced" ? "12%" : "5%"}
              label="Missed Appt Rate"
              sublabel="Due to transport barriers"
              color={transportScenario === "baseline" ? "text-red-600" : transportScenario === "enhanced" ? "text-amber-600" : "text-emerald-600"}
            />
            <MetricCard
              value={transportScenario === "baseline" ? "High" : transportScenario === "enhanced" ? "Medium" : "Low"}
              label="Restructuring Risk"
              sublabel="From access gaps"
              color={transportScenario === "baseline" ? "text-red-600" : transportScenario === "enhanced" ? "text-amber-600" : "text-emerald-600"}
            />
          </div>

          <InfoCard variant={transportScenario === "baseline" ? "warn" : transportScenario === "enhanced" ? "default" : "success"}>
            <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Transportation Coverage by At-Risk Hospital HSA</div>
            <div className="space-y-3">
              {HOSPITALS.filter((h) => h.urgency === "urgent" || h.urgency === "major").map((h) => {
                const coverage = transportScenario === "baseline" ? 100 - h.noCarPct : transportScenario === "enhanced" ? Math.min(90, 100 - h.noCarPct * 0.4) : Math.min(98, 100 - h.noCarPct * 0.1);
                return (
                  <div key={h.id}>
                    <div className="flex justify-between mb-1">
                      <div>
                        <span className="text-xs font-bold text-slate-700">{h.name}</span>
                        <span className="text-[10px] text-slate-400 ml-2">{h.avgTravelToNextHospitalMin}min to next hospital</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black ${coverage < 70 ? "text-red-600" : coverage < 85 ? "text-amber-600" : "text-emerald-600"}`}>{Math.round(coverage)}% covered</span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${coverage < 70 ? "bg-red-400" : coverage < 85 ? "bg-amber-400" : "bg-emerald-400"}`}
                        style={{ width: `${coverage}%` }} />
                    </div>
                    {transportScenario === "baseline" && h.noCarPct > 18 && (
                      <div className="text-[10px] text-red-600 mt-0.5">⚠ {h.noCarPct}% of HSA residents lack vehicle — {Math.round(h.populationHSA * h.noCarPct / 100).toLocaleString()} people with no transport access</div>
                    )}
                  </div>
                );
              })}
            </div>
          </InfoCard>

          <InfoCard variant="info">
            <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-3">Research Evidence: Transportation & Health Outcomes</div>
            <div className="space-y-2">
              {[
                { stat: "25–42%", finding: "Higher chronic disease complication rates among patients with transportation barriers (RWJF 2019)" },
                { stat: "3.6M", finding: "Americans miss or delay medical care each year due to transportation barriers (TransCen Inc. 2016)" },
                { stat: "28%", finding: "Reduction in avoidable hospitalizations when NEMT programs are well-funded (Medicaid Journal 2021)" },
                { stat: "$6,800", finding: "Annual healthcare cost savings per patient when medical transport needs are met vs. unmet (Anthem, 2018)" },
              ].map(({ stat, finding }) => (
                <div key={stat} className="flex gap-3">
                  <div className="text-lg font-black text-blue-700 shrink-0 w-14 text-right">{stat}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{finding}</div>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>
      )}
    </div>
  );
}
