// frontend/app/states/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getAllStateInitiatives, STATE_INITIATIVES } from "@/lib/data/state-initiatives-data";

// react-simple-maps + d3-geo are ~150 KB combined. Load on demand so the
// /states page above-the-fold renders without waiting on the map.
const StateInitiativesMap = dynamic(
  () => import("@/components/states/StateInitiativesMap").then((m) => m.StateInitiativesMap),
  { ssr: false, loading: () => <div className="h-96 bg-slate-100 rounded-xl animate-pulse" /> }
);
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const REGIONS = ["All", "Northeast", "South", "Midwest", "West"] as const;
type Region = (typeof REGIONS)[number];

export default function StatesPage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<Region>("All");

  const allStates = useMemo(() => getAllStateInitiatives(), []);

  const filtered = useMemo(() => {
    return allStates.filter((s) => {
      const matchesSearch =
        s.stateName.toLowerCase().includes(search.toLowerCase()) ||
        s.initiatives.some(
          (i) =>
            i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
        );
      const matchesRegion = region === "All" || s.region === region;
      return matchesSearch && matchesRegion;
    });
  }, [allStates, search, region]);

  const totalInitiatives = allStates.reduce((sum, s) => sum + s.initiatives.length, 0);

  return (
    <div className="w-full font-sans text-slate-800 flex flex-col pb-20">

      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-200 py-4 px-8 mb-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold px-2.5 py-1 rounded-full mb-1.5">
              <MapPinIcon className="w-3 h-3" />
              State Health Initiatives
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">State-by-State Health Reform</h1>
          </div>
          <div className="flex gap-6 text-sm shrink-0">
            <div>
              <span className="text-2xl font-black text-indigo-600">{allStates.length}</span>
              <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wide mt-0.5">States</span>
            </div>
            <div className="w-px bg-slate-200" />
            <div>
              <span className="text-2xl font-black text-indigo-600">{totalInitiatives}</span>
              <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wide mt-0.5">Initiatives</span>
            </div>
            <div className="w-px bg-slate-200" />
            <div>
              <span className="text-2xl font-black text-indigo-600">4</span>
              <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wide mt-0.5">Regions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 space-y-10">

        {/* ── Interactive Map ───────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-900">Interactive State Map</h2>
            <p className="text-sm text-slate-500 mt-0.5">Click any state to explore its health reform initiatives</p>
          </div>
          <div className="p-2">
            <StateInitiativesMap data={STATE_INITIATIVES} />
          </div>
        </div>

        {/* ── Filter bar ───────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search states or initiatives…"
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative shrink-0">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as Region)}
              className="appearance-none bg-white border border-slate-200 text-sm font-semibold text-slate-700 rounded-full pl-4 pr-10 py-2.5 cursor-pointer hover:border-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r === "All" ? "All Regions" : r}
                </option>
              ))}
            </select>
            <FunnelIcon className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* ── State Grid ───────────────────────────────────────────── */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            {filtered.length} state{filtered.length !== 1 ? "s" : ""}
            {region !== "All" && ` · ${region}`}
            {search && ` matching "${search}"`}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((state) => (
              <Link
                key={state.stateId}
                href={`/states/${state.stateId}`}
                className="group bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${state.heroColor}`}>
                        {state.stateAbbr}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                        {state.region}
                      </span>
                    </div>
                    <h3 className="font-black text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {state.stateName}
                    </h3>
                  </div>
                  <span className="shrink-0 text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full px-2.5 py-1">
                    {state.initiatives.length} initiative{state.initiatives.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{state.summary}</p>
                <div className="flex flex-wrap gap-1">
                  {state.initiatives.slice(0, 3).map((initiative) => (
                    <span
                      key={initiative.id}
                      className="text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-2 py-0.5"
                    >
                      {initiative.type}
                    </span>
                  ))}
                  {state.initiatives.length > 3 && (
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-200 rounded-full px-2 py-0.5">
                      +{state.initiatives.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-indigo-500 text-xs font-bold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore initiatives
                  <ArrowRightIcon className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <MapPinIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No states match your search.</p>
              <button onClick={() => { setSearch(""); setRegion("All"); }} className="mt-2 text-indigo-600 text-sm hover:underline">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
