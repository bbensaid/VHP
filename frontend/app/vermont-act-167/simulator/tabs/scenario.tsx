"use client";

import { useState, useMemo } from "react";
import {
  HOSPITALS, RECOMMENDATIONS, PILLARS,
  CATEGORY_LABELS, CATEGORY_COLORS,
  type Recommendation, type PillarKey,
} from "../data";
import { Badge, InfoCard, PillarGauge } from "../atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1: SCENARIO BUILDER
// ─────────────────────────────────────────────────────────────────────────────

export function ScenarioBuilder({ selected, onToggle, onSelectAll, onClearAll, onViewRoadmap }: {
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onViewRoadmap: () => void;
}) {
  const [expandedRec, setExpandedRec] = useState<string | null>(null);

  const categories = Array.from(new Set(RECOMMENDATIONS.map((r) => r.category)));

  const totals = useMemo(() => {
    const active = RECOMMENDATIONS.filter((r) => selected.has(r.id));
    const pillars: Record<PillarKey, number> = { policy: 0, technology: 0, financial: 0, equity: 0, clinical: 0 };
    let totalInvestment = 0;
    let totalSavings = 0;
    active.forEach((r) => {
      PILLARS.forEach(({ key }) => {
        pillars[key] += r.pillars[key].score;
      });
      PILLARS.forEach(({ key }) => {
        totalInvestment += r.pillars[key].investmentM ?? 0;
        totalSavings += r.pillars[key].annualSavingsM ?? 0;
      });
    });
    const n = active.length || 1;
    return { pillars: Object.fromEntries(Object.entries(pillars).map(([k, v]) => [k, Math.round(v / n)])) as Record<PillarKey, number>, totalInvestment: Math.round(totalInvestment), totalSavings: Math.round(totalSavings), count: active.length };
  }, [selected]);

  return (
    <div className="space-y-6">
      {/* Quick Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={onSelectAll} className="px-4 py-2 text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors">
          Select All Recommendations
        </button>
        <button onClick={onClearAll} className="px-4 py-2 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors">
          Clear Selection
        </button>
        {selected.size > 0 && (
          <button onClick={onViewRoadmap} className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
            View Implementation Roadmap →
          </button>
        )}
        <div className="text-xs text-slate-400 ml-auto">
          {selected.size > 0 ? <><strong className="text-violet-700">{selected.size}</strong> of {RECOMMENDATIONS.length} recommendations selected</> : `${RECOMMENDATIONS.length} recommendations modeled`}
        </div>
      </div>

      {/* Impact Summary */}
      {selected.size > 0 && (
        <InfoCard variant="info">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-1">Scenario Impact Summary</div>
              <p className="text-sm text-slate-600">{selected.size} recommendation{selected.size !== 1 ? "s" : ""} selected</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-right">
              <div>
                <div className="text-xl font-black text-emerald-700">${totals.totalSavings}M</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Est. Annual Savings</div>
              </div>
              <div>
                <div className="text-xl font-black text-amber-700">${totals.totalInvestment}M</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Total Investment</div>
              </div>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            {PILLARS.map(({ key, label, color }) => (
              <PillarGauge
                key={key}
                score={totals.pillars[key]}
                direction={totals.pillars[key] >= 70 ? "positive" : totals.pillars[key] >= 45 ? "mixed" : "negative"}
                label={label.split(" ")[0]}
                color={color}
              />
            ))}
          </div>
        </InfoCard>
      )}

      {/* Recommendation Checklist */}
      {categories.map((cat) => {
        const recs = RECOMMENDATIONS.filter((r) => r.category === cat);
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <Badge color={CATEGORY_COLORS[cat]}>{CATEGORY_LABELS[cat]}</Badge>
              <span className="text-xs text-slate-400">{recs.length} recommendation{recs.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="space-y-2">
              {recs.map((rec) => {
                const isSelected = selected.has(rec.id);
                const isExpanded = expandedRec === rec.id;
                const avgScore = Math.round(PILLARS.reduce((s, { key }) => s + rec.pillars[key].score, 0) / 5);
                return (
                  <div key={rec.id} className={`border rounded-xl transition-all ${isSelected ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white"}`}>
                    <div className="flex items-start gap-3 p-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggle(rec.id)}
                        className="mt-0.5 w-4 h-4 accent-violet-600 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <span className="text-sm font-bold text-slate-900">{rec.title}</span>
                              <Badge color={rec.priority === "critical" ? "bg-red-100 text-red-700" : rec.priority === "high" ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"}>
                                {rec.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{rec.description}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                            <div className="text-lg font-black text-slate-800">{avgScore}</div>
                            <div className="text-[10px] text-slate-400">avg impact</div>
                            <button
                              onClick={() => setExpandedRec(isExpanded ? null : rec.id)}
                              className="text-[11px] font-bold text-violet-600 hover:text-violet-800 mt-1"
                            >
                              {isExpanded ? "▲ Hide" : "▼ Details"}
                            </button>
                          </div>
                        </div>
                        {/* Year range */}
                        <div className="mt-2 flex gap-2 items-center">
                          <span className="text-[10px] text-slate-400">Year {rec.implementationYears[0] === 0 ? "1" : rec.implementationYears[0] + 1}–{rec.implementationYears[1] + 1}</span>
                          {rec.sourceHospitals.length > 0 && (
                            <span className="text-[10px] text-slate-400">· {rec.sourceHospitals.map(id => HOSPITALS.find(h => h.id === id)?.shortName).join(", ")}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Pillar Details */}
                    {isExpanded && (
                      <div className="border-t border-slate-200 p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
                        {PILLARS.map(({ key, label, bgColor, color }) => {
                          const p = rec.pillars[key];
                          return (
                            <div key={key} className={`rounded-lg p-3 ${bgColor}`}>
                              <div className={`text-[10px] font-black uppercase tracking-widest ${color} mb-1`}>{label.split(" ")[0]}</div>
                              <div className={`text-xl font-black ${color} mb-1`}>{p.score}<span className="text-xs">/100</span></div>
                              <p className="text-[10px] text-slate-600 leading-tight mb-2">{p.headline}</p>
                              <div className="text-[10px] text-slate-500">{p.timeline}</div>
                              {p.investmentM !== undefined && p.investmentM > 0 && (
                                <div className="text-[10px] text-amber-700 font-bold mt-1">Invest: ${p.investmentM}M</div>
                              )}
                              {p.annualSavingsM !== undefined && p.annualSavingsM > 0 && (
                                <div className="text-[10px] text-emerald-700 font-bold">Save: ${p.annualSavingsM}M/yr</div>
                              )}
                              <ul className="mt-2 space-y-0.5">
                                {p.actions.slice(0, 3).map((a, i) => (
                                  <li key={i} className="text-[9px] text-slate-500 flex gap-1"><span className="shrink-0 mt-0.5">▸</span><span>{a}</span></li>
                                ))}
                                {p.actions.length > 3 && <li className="text-[9px] text-slate-400 italic">+{p.actions.length - 3} more actions</li>}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
