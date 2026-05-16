"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { HOSPITALS } from "@/app/vermont-act-167/simulator/data";

const URGENCY_COLORS: Record<string, string> = {
  urgent:      "bg-rose-100 text-rose-700 border-rose-200",
  major:       "bg-orange-100 text-orange-700 border-orange-200",
  significant: "bg-amber-100 text-amber-700 border-amber-200",
  modest:      "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const METRICS = [
  { key: "operatingMarginPct",         label: "Operating Margin",        format: (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`, lowerBetter: false },
  { key: "annualLossM",                label: "Annual Loss ($M)",         format: (v: number) => v === 0 ? "Profitable" : `-$${v.toFixed(1)}M`, lowerBetter: true },
  { key: "projectedLoss2028M",         label: "2028 Projected Loss ($M)", format: (v: number) => v === 0 ? "Profitable" : `-$${v.toFixed(1)}M`, lowerBetter: true },
  { key: "beds",                       label: "Licensed Beds",            format: (v: number) => v.toLocaleString(), lowerBetter: false },
  { key: "icuBeds",                    label: "ICU Beds",                 format: (v: number) => String(v), lowerBetter: false },
  { key: "annualAdmissions",           label: "Annual Admissions",        format: (v: number) => v.toLocaleString(), lowerBetter: false },
  { key: "annualEDVisits",             label: "Annual ED Visits",         format: (v: number) => v.toLocaleString(), lowerBetter: false },
  { key: "fteCount",                   label: "Total FTEs",               format: (v: number) => v.toLocaleString(), lowerBetter: false },
  { key: "popOver65Pct",              label: "Pop. Over 65 (%)",         format: (v: number) => `${v.toFixed(1)}%`, lowerBetter: false },
  { key: "avgTravelToNextHospitalMin", label: "Travel to Next Hospital",  format: (v: number) => `${v} min`, lowerBetter: false },
  { key: "lowIncomePct",              label: "Low Income (%)",           format: (v: number) => `${v.toFixed(1)}%`, lowerBetter: false },
  { key: "noCarPct",                  label: "No Car (%)",               format: (v: number) => `${v.toFixed(1)}%`, lowerBetter: false },
];

function getVal(h: (typeof HOSPITALS)[0], key: string): number {
  return (h as unknown as Record<string, number>)[key] ?? 0;
}

export default function HospitalCompareClient() {
  const [mode, setMode] = useState<"list" | "compare">("list");
  const [selected, setSelected] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<string>("operatingMarginPct");
  const [sortAsc, setSortAsc] = useState(true);
  const [highlightBest, setHighlightBest] = useState(true);

  const sorted = useMemo(() =>
    [...HOSPITALS].sort((a, b) => {
      const av = getVal(a, sortKey);
      const bv = getVal(b, sortKey);
      return sortAsc ? av - bv : bv - av;
    }),
    [sortKey, sortAsc]
  );

  function toggleSelect(id: string) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  }

  function handleSort(key: string) {
    if (sortKey === key) setSortAsc(a => !a);
    else { setSortKey(key); setSortAsc(true); }
  }

  const comparedHospitals = useMemo(() =>
    HOSPITALS.filter(h => selected.includes(h.id)),
    [selected]
  );

  const bestValues = useMemo(() => {
    const map: Record<string, number> = {};
    for (const m of METRICS) {
      const vals = comparedHospitals.map(h => getVal(h, m.key)).filter(v => !isNaN(v));
      if (vals.length) map[m.key] = m.lowerBetter ? Math.min(...vals) : Math.max(...vals);
    }
    return map;
  }, [comparedHospitals]);

  const handleExportCSV = () => {
    const targets = mode === "compare" && comparedHospitals.length > 0 ? comparedHospitals : HOSPITALS;
    const rows: string[][] = [
      ["Hospital", "Short Name", "City", "HSA", "Urgency", ...METRICS.map(m => m.label)],
    ];
    for (const h of targets) {
      rows.push([
        h.name, h.shortName, h.city, h.hsa, h.urgency,
        ...METRICS.map(m => String(getVal(h, m.key))),
      ]);
    }
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `vermont-hospitals-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/dashboard/vermont" className="text-xs font-semibold text-slate-500 hover:text-indigo-600">
                ← Vermont Dashboard
              </Link>
            </div>
            <h1 className="text-2xl font-black text-slate-900">Vermont Hospital System</h1>
            <p className="text-sm text-slate-500">14 hospitals · Act 167 financial data · Oliver Wyman Report</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setMode("list")}
              className={`text-xs font-bold px-4 py-2 rounded-lg border transition-colors ${mode === "list" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-300 text-slate-600 hover:bg-slate-50"}`}
            >
              All Hospitals
            </button>
            <button
              onClick={() => { setMode("compare"); if (selected.length === 0) setSelected([HOSPITALS[5].id, HOSPITALS[6].id]); }}
              className={`text-xs font-bold px-4 py-2 rounded-lg border transition-colors ${mode === "compare" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-300 text-slate-600 hover:bg-slate-50"}`}
            >
              Compare {selected.length > 0 ? `(${selected.length})` : ""}
            </button>
            <button
              onClick={handleExportCSV}
              className="text-xs font-bold px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Export hospital data as CSV"
            >
              ↓ CSV
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* LIST MODE */}
        {mode === "list" && (
          <div className="space-y-4">
            {/* Sort bar */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sort by:</span>
              {[
                { key: "operatingMarginPct", label: "Margin" },
                { key: "annualLossM", label: "Annual Loss" },
                { key: "beds", label: "Beds" },
                { key: "annualEDVisits", label: "ED Volume" },
                { key: "avgTravelToNextHospitalMin", label: "Isolation" },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSort(opt.key)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                    sortKey === opt.key
                      ? "bg-slate-800 text-white border-slate-800"
                      : "border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {opt.label} {sortKey === opt.key ? (sortAsc ? "↑" : "↓") : ""}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400 mb-1">
              Click any hospital to add it to a comparison (up to 4). Then switch to Compare mode.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {sorted.map(h => {
                const isSelected = selected.includes(h.id);
                return (
                  <button
                    key={h.id}
                    onClick={() => toggleSelect(h.id)}
                    className={`text-left bg-white rounded-xl border-2 p-5 transition-all hover:shadow-md ${
                      isSelected ? "border-indigo-500 ring-2 ring-indigo-100" : "border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="font-black text-slate-900 text-sm leading-snug">{h.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{h.city}, VT · {h.hsa}</div>
                      </div>
                      <span className={`shrink-0 text-[10px] font-bold uppercase px-2 py-1 rounded border ${URGENCY_COLORS[h.urgency]}`}>
                        {h.urgency}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className={`text-lg font-black ${h.operatingMarginPct < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                          {h.operatingMarginPct > 0 ? "+" : ""}{h.operatingMarginPct.toFixed(1)}%
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wide">Margin</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-black text-slate-800">{h.beds}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wide">Beds</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-black text-slate-800">{h.annualEDVisits.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wide">ED Visits</div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="mt-3 text-[10px] font-black text-indigo-600 text-center uppercase tracking-wider">
                        ✓ Added to comparison
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selected.length > 0 && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-bold px-6 py-3 rounded-full shadow-xl flex items-center gap-3 z-50">
                <span>{selected.length} hospital{selected.length > 1 ? "s" : ""} selected</span>
                <button
                  onClick={() => setMode("compare")}
                  className="bg-white text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black hover:bg-indigo-50 transition-colors"
                >
                  Compare →
                </button>
                <button onClick={() => setSelected([])} className="text-indigo-200 text-xs hover:text-white">
                  Clear
                </button>
              </div>
            )}
          </div>
        )}

        {/* COMPARE MODE */}
        {mode === "compare" && (
          <div className="space-y-6">
            {/* Hospital selector chips */}
            <div>
              <p className="text-xs text-slate-500 mb-3">Select up to 4 hospitals to compare. Click to toggle.</p>
              <div className="flex flex-wrap gap-2">
                {HOSPITALS.map(h => {
                  const isSelected = selected.includes(h.id);
                  const isDisabled = !isSelected && selected.length >= 4;
                  return (
                    <button
                      key={h.id}
                      onClick={() => toggleSelect(h.id)}
                      disabled={isDisabled}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : isDisabled
                          ? "border-slate-100 text-slate-300 cursor-not-allowed"
                          : "border-slate-300 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {h.shortName}
                    </button>
                  );
                })}
              </div>
              <label className="flex items-center gap-2 mt-3 text-xs text-slate-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={highlightBest}
                  onChange={e => setHighlightBest(e.target.checked)}
                  className="accent-indigo-600"
                />
                Highlight best value per metric
              </label>
            </div>

            {comparedHospitals.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                Select at least one hospital above to begin comparison.
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                {/* Hospital header row */}
                <div
                  className="grid border-b-2 border-slate-200 bg-slate-50"
                  style={{ gridTemplateColumns: `180px repeat(${comparedHospitals.length}, 1fr)` }}
                >
                  <div className="p-4 text-xs font-black uppercase tracking-widest text-slate-400 flex items-end border-r border-slate-200">
                    Metric
                  </div>
                  {comparedHospitals.map(h => (
                    <div key={h.id} className="p-4 text-center border-r border-slate-200 last:border-r-0">
                      <div className="font-black text-slate-900 text-sm leading-snug">{h.shortName}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{h.city}</div>
                      <span className={`inline-block mt-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${URGENCY_COLORS[h.urgency]}`}>
                        {h.urgency}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Metric rows */}
                {METRICS.map((metric, idx) => (
                  <div
                    key={metric.key}
                    className={`grid border-b border-slate-100 last:border-b-0 ${idx % 2 === 0 ? "" : "bg-slate-50/40"}`}
                    style={{ gridTemplateColumns: `180px repeat(${comparedHospitals.length}, 1fr)` }}
                  >
                    <div className="p-3 pl-5 text-xs font-semibold text-slate-600 border-r border-slate-100 flex items-center">
                      {metric.label}
                    </div>
                    {comparedHospitals.map(h => {
                      const raw = getVal(h, metric.key);
                      const isBest = highlightBest && bestValues[metric.key] === raw;
                      const isMargin = metric.key === "operatingMarginPct";
                      return (
                        <div
                          key={h.id}
                          className={`p-3 text-center border-r border-slate-100 last:border-r-0 ${isBest ? "bg-emerald-50" : ""}`}
                        >
                          <span className={`text-sm font-bold ${
                            isMargin
                              ? raw < 0 ? "text-rose-600" : "text-emerald-600"
                              : "text-slate-800"
                          }`}>
                            {metric.format(raw)}
                          </span>
                          {isBest && (
                            <span className="ml-1 text-[9px] font-black text-emerald-600 uppercase">best</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}

                {/* Services row */}
                <div
                  className="grid border-t-2 border-slate-200 bg-slate-50"
                  style={{ gridTemplateColumns: `180px repeat(${comparedHospitals.length}, 1fr)` }}
                >
                  <div className="p-4 pl-5 text-xs font-semibold text-slate-600 border-r border-slate-100 flex items-start pt-5">
                    Services
                  </div>
                  {comparedHospitals.map(h => (
                    <div key={h.id} className="p-4 border-r border-slate-100 last:border-r-0">
                      <div className="flex flex-wrap gap-1">
                        {h.services.map(s => (
                          <span key={s} className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Act 167 link row */}
                <div
                  className="grid border-t border-slate-100"
                  style={{ gridTemplateColumns: `180px repeat(${comparedHospitals.length}, 1fr)` }}
                >
                  <div className="p-4 pl-5 text-xs font-semibold text-slate-500 border-r border-slate-100 flex items-center">
                    Analysis
                  </div>
                  {comparedHospitals.map(h => (
                    <div key={h.id} className="p-4 text-center border-r border-slate-100 last:border-r-0">
                      <Link
                        href={`/vermont-act-167/simulator`}
                        className="text-xs text-violet-700 font-bold hover:underline"
                      >
                        Act 167 Simulator →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
