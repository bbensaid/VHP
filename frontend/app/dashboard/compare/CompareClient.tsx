"use client";

// Rebuilt 2026-10-17 on sourced indicators (lib/data/state-indicators.ts); the earlier comparison used the unsourced
// Performance Index scores and "Leading / At Risk" labels.

import { useMemo, useState } from "react";
import Link from "next/link";
import { INDICATORS, INDICATOR_SOURCES, STATE_INDICATORS, slugFor } from "@/lib/data/state-indicators";

export default function CompareClient() {
  const all = useMemo(() => Object.keys(STATE_INDICATORS).sort((a, b) => STATE_INDICATORS[a].name.localeCompare(STATE_INDICATORS[b].name)), []);
  const [selected, setSelected] = useState<string[]>(["VT", "ME", "NH"]);
  const [search, setSearch] = useState("");
  const toggle = (c: string) => setSelected((p) => (p.includes(c) ? p.filter((x) => x !== c) : p.length < 4 ? [...p, c] : p));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-indigo-600">← Fifty-state dashboard</Link>
      <h1 className="ty-h1 font-black text-slate-900 mt-4 mb-2">Compare States</h1>
      <p className="text-slate-500 mb-6">Pick up to four states. Every value is as its source reports it; there is no composite score.</p>

      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter states..." className="w-full md:w-80 mb-3 px-4 py-2 text-sm border border-slate-200 rounded-full" />
      <div className="flex flex-wrap gap-2 mb-8">
        {all.filter((c) => STATE_INDICATORS[c].name.toLowerCase().includes(search.toLowerCase())).map((c) => (
          <button key={c} onClick={() => toggle(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${selected.includes(c) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"}`}>
            {STATE_INDICATORS[c].name}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr><th className="p-3">Indicator</th>{selected.map((c) => <th key={c} className="p-3"><Link href={`/dashboard/${slugFor(c)}`} className="hover:text-indigo-700">{STATE_INDICATORS[c].name}</Link></th>)}<th className="p-3">Source</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INDICATORS.map((ind) => (
                <tr key={ind.key}>
                  <td className="p-3 font-semibold text-slate-700">{ind.label}</td>
                  {selected.map((c) => { const v = ind.get(STATE_INDICATORS[c]); return <td key={c} className="p-3 font-mono">{v == null ? "—" : ind.format(v)}</td>; })}
                  <td className="p-3 text-xs"><a className="underline text-slate-500" href={INDICATOR_SOURCES[ind.source].url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES[ind.source].label}</a></td>
                </tr>
              ))}
              <tr>
                <td className="p-3 font-semibold text-slate-700">Medicaid expansion</td>
                {selected.map((c) => <td key={c} className="p-3">{STATE_INDICATORS[c].medicaidExpansion ? "Adopted" : "Not adopted"}</td>)}
                <td className="p-3 text-xs"><a className="underline text-slate-500" href={INDICATOR_SOURCES.kff.url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES.kff.label}</a></td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-700">AHEAD Model</td>
                {selected.map((c) => <td key={c} className="p-3">{STATE_INDICATORS[c].ahead ?? "—"}</td>)}
                <td className="p-3 text-xs"><a className="underline text-slate-500" href={INDICATOR_SOURCES.ahead.url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES.ahead.label}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
