"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { PerformanceIndexProfile } from "@/lib/data/performance-index-data";
import { getScoreColor } from "@/lib/utils";

interface Props {
  allStates: Record<string, PerformanceIndexProfile>;
}

const METRICS = [
  { key: "performanceScore",              label: "Overall Score",          format: (v: number) => v?.toFixed(1) },
  { key: "metrics.policy.vbpAdoption",    label: "VBP Adoption",           format: (v: number) => `${v ?? "—"}%` },
  { key: "metrics.policy.telehealth",     label: "Telehealth Policy",      format: (v: number) => `${v ?? "—"}%` },
  { key: "metrics.economics.spendingPerCapita", label: "Spending/Capita",  format: (v: number) => v ? `$${v.toLocaleString()}` : "—" },
  { key: "metrics.economics.insuranceCoverage", label: "Insurance Coverage", format: (v: number) => `${v ?? "—"}%` },
  { key: "metrics.technology.ehrAdoption",label: "EHR Adoption",           format: (v: number) => `${v ?? "—"}%` },
  { key: "metrics.technology.broadbandAccess", label: "Broadband Access",  format: (v: number) => `${v ?? "—"}%` },
  { key: "metrics.clinical.preventiveCare", label: "Preventive Care",      format: (v: number) => `${v ?? "—"}%` },
  { key: "metrics.clinical.readmissionRate", label: "Readmission Rate",    format: (v: number) => `${v ?? "—"}%` },
  { key: "metrics.equity.racialEquityGap", label: "Racial Equity Gap",     format: (v: number) => `${v ?? "—"}` },
  { key: "metrics.equity.sdohIntegration", label: "SDOH Integration",      format: (v: number) => `${v ?? "—"}%` },
];

function getNestedValue(obj: PerformanceIndexProfile, path: string): number {
  return path.split(".").reduce((acc: unknown, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj) as number;
}

const STATUS_COLORS: Record<string, string> = {
  Leading:  "bg-emerald-100 text-emerald-700",
  Improving:"bg-indigo-100 text-indigo-700",
  Stable:   "bg-slate-100 text-slate-600",
  "At Risk":"bg-rose-100 text-rose-700",
};

export default function CompareClient({ allStates }: Props) {
  const stateList = useMemo(() =>
    Object.values(allStates).sort((a, b) => a.stateName.localeCompare(b.stateName)),
    [allStates]
  );

  const [selected, setSelected] = useState<string[]>(["vermont", "massachusetts"]);
  const [search, setSearch] = useState("");
  const [highlightBest, setHighlightBest] = useState(true);

  const filtered = stateList.filter(s =>
    s.stateName.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(id: string) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 4 ? [...prev, id] : prev
    );
  }

  const comparedStates = selected
    .map(id => allStates[id])
    .filter(Boolean);

  // For each metric, find the best (highest) value among compared states
  const bestValues = useMemo(() => {
    const map: Record<string, number> = {};
    for (const metric of METRICS) {
      const values = comparedStates
        .map(s => getNestedValue(s, metric.key))
        .filter(v => v != null && !isNaN(v));
      if (values.length) {
        // For readmission rate and spending, lower is better
        const lowerBetter = metric.key.includes("readmission") || metric.key.includes("spending");
        map[metric.key] = lowerBetter ? Math.min(...values) : Math.max(...values);
      }
    }
    return map;
  }, [comparedStates]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="mb-2">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-500 hover:text-indigo-600">
            ← Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-1">State Peer Comparison</h1>
        <p className="text-slate-500 mb-8">Select up to 4 states to compare side-by-side across all performance dimensions.</p>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* State selector */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sticky top-24">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                Select States ({selected.length}/4)
              </h2>
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filter states…"
                aria-label="Filter states"
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 mb-3"
              />
              <ul className="space-y-1 max-h-96 overflow-y-auto pr-1">
                {filtered.map(state => {
                  const isSelected = selected.includes(state.id);
                  const isDisabled = !isSelected && selected.length >= 4;
                  return (
                    <li key={state.id}>
                      <button
                        onClick={() => toggle(state.id)}
                        disabled={isDisabled}
                        aria-pressed={isSelected}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : isDisabled
                            ? "text-slate-300 cursor-not-allowed"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {state.stateName}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <label className="flex items-center gap-2 mt-4 text-xs text-slate-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={highlightBest}
                  onChange={e => setHighlightBest(e.target.checked)}
                  className="accent-indigo-600"
                />
                Highlight best value
              </label>
            </div>
          </aside>

          {/* Comparison table */}
          <div className="flex-1 overflow-x-auto">
            {comparedStates.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                Select at least one state to begin comparison.
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

                {/* State header row */}
                <div className="grid border-b border-slate-200"
                  style={{ gridTemplateColumns: `200px repeat(${comparedStates.length}, 1fr)` }}>
                  <div className="p-4 bg-slate-50 border-r border-slate-100" />
                  {comparedStates.map(state => (
                    <div key={state.id} className="p-4 text-center border-r border-slate-100 last:border-r-0">
                      <Link
                        href={`/dashboard/${state.id}`}
                        className="font-black text-slate-900 hover:text-indigo-600 transition-colors text-sm block"
                      >
                        {state.stateName}
                      </Link>
                      <span className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mt-1 ${STATUS_COLORS[state.status] ?? STATUS_COLORS.Stable}`}>
                        {state.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Metric rows */}
                {METRICS.map((metric, idx) => (
                  <div
                    key={metric.key}
                    className={`grid border-b border-slate-100 last:border-b-0 ${idx % 2 === 0 ? "" : "bg-slate-50/50"}`}
                    style={{ gridTemplateColumns: `200px repeat(${comparedStates.length}, 1fr)` }}
                  >
                    <div className="p-3 pl-5 text-xs font-semibold text-slate-600 border-r border-slate-100 flex items-center">
                      {metric.label}
                    </div>
                    {comparedStates.map(state => {
                      const raw = getNestedValue(state, metric.key);
                      const isBest = highlightBest && bestValues[metric.key] === raw && raw != null;
                      const displayScore = metric.key === "performanceScore";

                      return (
                        <div key={state.id} className={`p-3 text-center border-r border-slate-100 last:border-r-0 ${isBest ? "bg-emerald-50" : ""}`}>
                          <span
                            className={`text-sm font-bold ${displayScore ? "" : ""}`}
                            style={displayScore ? { color: getScoreColor(raw) } : undefined}
                          >
                            {raw != null ? metric.format(raw) : "—"}
                          </span>
                          {isBest && (
                            <span className="ml-1 text-[9px] font-black text-emerald-600 uppercase">best</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Narrative summary row */}
                <div
                  className="grid border-t-2 border-slate-200 bg-slate-50"
                  style={{ gridTemplateColumns: `200px repeat(${comparedStates.length}, 1fr)` }}
                >
                  <div className="p-4 pl-5 text-xs font-semibold text-slate-600 border-r border-slate-100 flex items-center">
                    Summary
                  </div>
                  {comparedStates.map(state => (
                    <div key={state.id} className="p-4 border-r border-slate-100 last:border-r-0">
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-4">
                        {state.narrative?.summary || "No summary available."}
                      </p>
                      <Link href={`/dashboard/${state.id}`} className="text-xs text-indigo-600 font-semibold hover:underline mt-2 block">
                        Full profile →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
