"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { NationalMap } from "@/components/dashboard/NationalMap";
import type { PerformanceIndexProfile } from "@/lib/data/performance-index-data";
import {
  StarIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  BuildingLibraryIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { getScoreColor } from "@/lib/utils";

const REGION_MAP: Record<string, string> = {
  vermont: "Northeast", maine: "Northeast", new_hampshire: "Northeast", massachusetts: "Northeast", connecticut: "Northeast", rhode_island: "Northeast", new_york: "Northeast", pennsylvania: "Northeast", new_jersey: "Northeast", district_of_columbia: "Northeast",
  texas: "South", florida: "South", georgia: "South", north_carolina: "South", south_carolina: "South", virginia: "South", alabama: "South", mississippi: "South", louisiana: "South", tennessee: "South", kentucky: "South", arkansas: "South", oklahoma: "South",
  ohio: "Midwest", michigan: "Midwest", indiana: "Midwest", illinois: "Midwest", wisconsin: "Midwest", minnesota: "Midwest", iowa: "Midwest", missouri: "Midwest", kansas: "Midwest", nebraska: "Midwest", north_dakota: "Midwest", south_dakota: "Midwest",
  california: "West", washington: "West", oregon: "West", idaho: "West", montana: "West", wyoming: "West", colorado: "West", utah: "West", nevada: "West", arizona: "West", new_mexico: "West", alaska: "West", hawaii: "West",
};

interface Props {
  allStates: Record<string, PerformanceIndexProfile>;
}

export default function DashboardIndexClient({ allStates }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({ key: 'performanceScore', direction: 'desc' });

  const tableRows = useMemo(() => {
    let states = Object.values(allStates).filter(state =>
      state.stateName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRegion === "All" || (REGION_MAP[state.id] || "Other") === selectedRegion)
    );
    states.sort((a, b) => {
      if (sortConfig.key === 'stateName') {
        return sortConfig.direction === 'asc' ? a.stateName.localeCompare(b.stateName) : b.stateName.localeCompare(a.stateName);
      }
      const valA = a.performanceScore || -1;
      const valB = b.performanceScore || -1;
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return states;
  }, [allStates, searchQuery, selectedRegion, sortConfig]);

  const metrics = useMemo(() => {
    const statesWithScores = tableRows.filter(s => s.performanceScore);
    const totalScore = statesWithScores.reduce((acc, curr) => acc + (curr.performanceScore || 0), 0);
    return {
      averageScore: statesWithScores.length > 0 ? Math.round(totalScore / statesWithScores.length) : 0,
      leadingCount: statesWithScores.filter((s) => s.status === "Leading").length,
      atRiskCount: statesWithScores.filter((s) => s.status === "At Risk").length,
    };
  }, [tableRows]);

  const watchlist = useMemo(() => {
    return [...Object.values(allStates)]
      .sort((a, b) => a.performanceScore - b.performanceScore)
      .slice(0, 3);
  }, [allStates]);

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const totalCount = Object.keys(allStates).length;

  return (
    <div className="w-full font-sans text-slate-800 flex flex-col pb-20">
      {/* HEADER CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">Health System Performance Index</h1>
              <p className="text-slate-500 text-lg leading-relaxed">National analysis of value-based care readiness and system transformation.</p>
            </div>
            <div className="shrink-0">
              <Link
                href="/about/methodology"
                title="Learn how the HTR Performance Index is calculated."
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-200 hover:border-slate-300 hover:text-slate-700 transition-all"
              >
                <InformationCircleIcon className="w-4 h-4" />
                <span>Index Methodology</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative">
                <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="appearance-none bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-full pl-4 pr-10 py-2.5 cursor-pointer hover:border-indigo-500 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm">
                  <option value="All">All Regions</option>
                  <option value="Northeast">Northeast</option>
                  <option value="South">South</option>
                  <option value="Midwest">Midwest</option>
                  <option value="West">West</option>
                </select>
                <FunnelIcon className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
              <div className="relative flex-1 md:w-96">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search states..."
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 shadow-sm hover:bg-white hover:border-slate-300 transition-all"
                />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"><XMarkIcon className="w-4 h-4" /></button>}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl"><div className="flex items-center gap-2 text-indigo-600 mb-1"><ChartBarIcon className="w-4 h-4" /><span className="text-[10px] font-bold uppercase">Avg. Index Score</span></div><div className="text-2xl font-black text-slate-900">{metrics.averageScore}</div><div className="text-xs text-slate-500">Across {tableRows.length} states</div></div>
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl"><div className="flex items-center gap-2 text-emerald-600 mb-1"><StarIcon className="w-4 h-4" /><span className="text-[10px] font-bold uppercase">Leading States</span></div><div className="text-2xl font-black text-slate-900">{metrics.leadingCount}</div><div className="text-xs text-slate-500">Score 80+</div></div>
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl"><div className="flex items-center gap-2 text-red-600 mb-1"><ExclamationTriangleIcon className="w-4 h-4" /><span className="text-[10px] font-bold uppercase">At Risk States</span></div><div className="text-2xl font-black text-slate-900">{metrics.atRiskCount}</div><div className="text-xs text-slate-500">Score &lt;60</div></div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl"><div className="flex items-center gap-2 text-slate-500 mb-1"><BuildingLibraryIcon className="w-4 h-4" /><span className="text-[10px] font-bold uppercase">States Visible</span></div><div className="text-2xl font-black text-slate-900">{tableRows.length}</div><div className="text-xs text-slate-500">of {totalCount} total</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-full"><NationalMap data={allStates} searchQuery={searchQuery} selectedRegion={selectedRegion} /></div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Priority Watchlist</h3>
            {watchlist.map((state) => (
              <Link key={state.id} href={`/dashboard/${state.id}`} className="block bg-white p-5 rounded-xl border border-slate-200 border-l-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ borderLeftColor: getScoreColor(state.performanceScore) }}>
                <div className="flex justify-between items-start mb-2"><h4 className="font-black text-slate-900">{state.stateName}</h4><span className="text-lg font-bold" style={{ color: getScoreColor(state.performanceScore) }}>{state.performanceScore}</span></div>
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{state.narrative.summary}</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full"><div className="h-full rounded-full" style={{ width: `${state.performanceScore}%`, backgroundColor: getScoreColor(state.performanceScore) }}></div></div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200"><h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">State Performance Registry</h2><p className="text-xs text-slate-500">Showing {tableRows.length} states</p></div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
              <tr>
                <th className="p-4 pl-6 cursor-pointer" onClick={() => handleSort("stateName")}><div className="flex items-center gap-1">State {sortConfig?.key === 'stateName' && (sortConfig.direction === 'asc' ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />)}</div></th>
                <th className="p-4 cursor-pointer" onClick={() => handleSort("performanceScore")}><div className="flex items-center gap-1">Index Score {sortConfig?.key === 'performanceScore' && (sortConfig.direction === 'asc' ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />)}</div></th>
                <th className="p-4">Region</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableRows.map((state) => (
                <tr key={state.id} className="hover:bg-slate-50">
                  <td className="p-4 pl-6 font-bold text-slate-900">{state.stateName}</td>
                  <td className="p-4 font-mono font-bold" style={{ color: getScoreColor(state.performanceScore) }}>{state.performanceScore || 'N/A'}</td>
                  <td className="p-4 text-slate-500">{REGION_MAP[state.id] || "Other"}</td>
                  <td className="p-4">
                    {state.status ? (
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: getScoreColor(state.performanceScore) + '20', color: getScoreColor(state.performanceScore) }}>{state.status}</span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">No Data</span>
                    )}
                  </td>
                  <td className="p-4 text-right pr-6"><Link href={`/dashboard/${state.id}`} className="font-bold text-xs text-slate-400 group-hover:text-indigo-600">View Profile &rarr;</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
