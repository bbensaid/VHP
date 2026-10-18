"use client";

// Fifty-state dashboard. Rebuilt 2026-10-17 on sourced indicators (lib/data/state-indicators.ts); the earlier
// "Health System Performance Index" scores, "Leading / At Risk" labels and watchlist had no source.

import React, { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  INDICATORS, INDICATOR_SOURCES, INDICATORS_GENERATED, STATE_INDICATORS, slugFor, rankOf, type Indicator,
} from "@/lib/data/state-indicators";

const NationalMap = dynamic(
  () => import("@/components/dashboard/NationalMap").then((m) => m.NationalMap),
  { ssr: false, loading: () => <div className="animate-pulse bg-slate-200 rounded-xl h-96" /> }
);

const REGIONS: Record<string, string[]> = {
  Northeast: ["VT", "ME", "NH", "MA", "CT", "RI", "NY", "PA", "NJ"],
  South: ["TX", "FL", "GA", "NC", "SC", "VA", "AL", "MS", "LA", "TN", "KY", "AR", "OK", "WV", "MD", "DE"],
  Midwest: ["OH", "MI", "IN", "IL", "WI", "MN", "IA", "MO", "KS", "NE", "ND", "SD"],
  West: ["CA", "WA", "OR", "ID", "MT", "WY", "CO", "UT", "NV", "AZ", "NM", "AK", "HI"],
};
const regionOf = (code: string) => Object.entries(REGIONS).find(([, cs]) => cs.includes(code))?.[0] ?? "Other";
const mapId = (code: string) => STATE_INDICATORS[code].name.toLowerCase().replace(/\s+/g, "_");

export default function DashboardIndexClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [indKey, setIndKey] = useState("insured");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" }>({ key: "insured", dir: "desc" });
  const ind = INDICATORS.find((i) => i.key === indKey) as Indicator;

  const codes = useMemo(
    () => Object.keys(STATE_INDICATORS).filter((c) =>
      STATE_INDICATORS[c].name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRegion === "All" || regionOf(c) === selectedRegion)),
    [searchQuery, selectedRegion],
  );

  const rows = useMemo(() => {
    const byKey = INDICATORS.find((i) => i.key === sort.key);
    return [...codes].sort((a, b) => {
      if (!byKey) return sort.dir === "asc" ? STATE_INDICATORS[a].name.localeCompare(STATE_INDICATORS[b].name) : STATE_INDICATORS[b].name.localeCompare(STATE_INDICATORS[a].name);
      const va = byKey.get(STATE_INDICATORS[a]) ?? -Infinity, vb = byKey.get(STATE_INDICATORS[b]) ?? -Infinity;
      return sort.dir === "asc" ? va - vb : vb - va;
    });
  }, [codes, sort]);

  const mapValues = useMemo(
    () => Object.fromEntries(Object.keys(STATE_INDICATORS).map((c) => [mapId(c), ind.get(STATE_INDICATORS[c])])),
    [ind],
  );
  const hrefForMapId = (id: string) => `/dashboard/${id.replace(/_/g, "-")}`;
  const vtRank = rankOf(ind, "VT");
  const expanded = Object.values(STATE_INDICATORS).filter((s) => s.medicaidExpansion).length;
  const brfssYears = [...new Set(Object.values(STATE_INDICATORS).map((s) => s.brfss?.year).filter(Boolean))].sort().join("/");

  const th = (key: string, label: string) => (
    <th className="p-3 cursor-pointer whitespace-nowrap" onClick={() => setSort((c) => ({ key, dir: c.key === key && c.dir === "desc" ? "asc" : "desc" }))}>
      <span className="inline-flex items-center gap-1">{label}{sort.key === key && (sort.dir === "asc" ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />)}</span>
    </th>
  );

  return (
    <div className="w-full font-sans text-slate-800 flex flex-col pb-20">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 shadow-sm">
        <h1 className="ty-h1 font-black text-slate-900 tracking-tight mb-3">Fifty-State Dashboard</h1>
        <p className="text-slate-500 text-lg leading-relaxed max-w-3xl">
          Coverage, access, hospital and federal-program indicators for every state, each shown as its source reports it.
          Pick an indicator to map it; open a state for its full profile.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl"><div className="text-[10px] font-bold uppercase text-indigo-600 mb-1">Medicaid expansion</div><div className="text-2xl font-black text-slate-900">{expanded} of 50</div><div className="text-xs text-slate-500">states (KFF)</div></div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl"><div className="text-[10px] font-bold uppercase text-slate-500 mb-1">AHEAD Model</div><div className="text-2xl font-black text-slate-900">5</div><div className="text-xs text-slate-500">participants; Vermont withdrew July 2026</div></div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl"><div className="text-[10px] font-bold uppercase text-slate-500 mb-1">RHT awards, FY2026</div><div className="text-2xl font-black text-slate-900">$10B</div><div className="text-xs text-slate-500">all 50 states (CMS)</div></div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl"><div className="text-[10px] font-bold uppercase text-slate-500 mb-1">Vermont on this indicator</div><div className="text-2xl font-black text-slate-900">{vtRank ? `#${vtRank.rank}` : "—"}</div><div className="text-xs text-slate-500">of {vtRank?.of ?? 50}, highest value first</div></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <select value={indKey} onChange={(e) => { setIndKey(e.target.value); setSort({ key: e.target.value, dir: "desc" }); }}
          className="bg-white border border-slate-300 text-sm font-bold text-slate-700 rounded-full px-4 py-2.5">
          {INDICATORS.map((i) => <option key={i.key} value={i.key}>{i.label}</option>)}
        </select>
        <div className="relative">
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="appearance-none bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-full pl-4 pr-10 py-2.5">
            {["All", ...Object.keys(REGIONS)].map((r) => <option key={r} value={r}>{r === "All" ? "All Regions" : r}</option>)}
          </select>
          <FunnelIcon className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
        </div>
        <div className="relative flex-1 min-w-[200px] md:max-w-sm">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search states..."
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-full" />
          {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400"><XMarkIcon className="w-4 h-4" /></button>}
        </div>
      </div>
      {ind.note && <p className="text-xs text-slate-500 mb-4">{ind.note}</p>}

      <div className="mb-10">
        <NationalMap values={mapValues} label={ind.label} format={ind.format} hrefFor={hrefForMapId} searchQuery={searchQuery} selectedRegion={selectedRegion} />
      </div>

      <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200"><h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">All indicators</h2><p className="text-xs text-slate-500">Showing {rows.length} states · click a column to sort</p></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase">
              <tr>{th("name", "State")}{INDICATORS.map((i) => <React.Fragment key={i.key}>{th(i.key, i.label)}</React.Fragment>)}<th className="p-3">Medicaid expansion</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((c) => {
                const s = STATE_INDICATORS[c];
                return (
                  <tr key={c} className={c === "VT" ? "bg-indigo-50/50" : "hover:bg-slate-50"}>
                    <td className="p-3 font-bold text-slate-900 whitespace-nowrap"><Link href={`/dashboard/${slugFor(c)}`} className="hover:text-indigo-700">{s.name}</Link></td>
                    {INDICATORS.map((i) => { const v = i.get(s); return <td key={i.key} className={`p-3 font-mono ${i.key === indKey ? "font-bold text-indigo-700" : "text-slate-600"}`}>{v == null ? "—" : i.format(v)}</td>; })}
                    <td className="p-3 text-slate-600">{s.medicaidExpansion ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-[11px] text-slate-500 leading-relaxed">
        <p className="font-bold text-slate-600 mb-1">Sources (built {INDICATORS_GENERATED})</p>
        <ul className="space-y-0.5">
          <li><a className="underline" href={INDICATOR_SOURCES.brfss.url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES.brfss.label}</a> — survey year {brfssYears}; adults 18+.</li>
          <li><a className="underline" href={INDICATOR_SOURCES.cms.url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES.cms.label}</a> — hospital counts and overall star ratings.</li>
          <li><a className="underline" href={INDICATOR_SOURCES.rht.url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES.rht.label}</a>.</li>
          <li><a className="underline" href={INDICATOR_SOURCES.kff.url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES.kff.label}</a>.</li>
          <li><a className="underline" href={INDICATOR_SOURCES.ahead.url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES.ahead.label}</a>.</li>
        </ul>
        <p className="mt-2">Map shading divides states into fifths on the selected indicator; it does not rank states as better or worse.</p>
      </div>
    </div>
  );
}
