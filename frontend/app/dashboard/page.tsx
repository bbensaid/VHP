"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { NationalMap } from "@/components/dashboard/NationalMap";
import Sidebar from "@/components/Sidebar";
import { rhtProgramData } from "@/lib/data/rht-program";
import {
  ArrowUpRightIcon,
  ExclamationCircleIcon,
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

// REGION MAPPING
const REGION_MAP: Record<string, string> = {
  vermont: "Northeast",
  maine: "Northeast",
  new_hampshire: "Northeast",
  massachusetts: "Northeast",
  connecticut: "Northeast",
  rhode_island: "Northeast",
  new_york: "Northeast",
  pennsylvania: "Northeast",
  new_jersey: "Northeast",
  texas: "South",
  florida: "South",
  georgia: "South",
  north_carolina: "South",
  south_carolina: "South",
  virginia: "South",
  alabama: "South",
  mississippi: "South",
  louisiana: "South",
  tennessee: "South",
  kentucky: "South",
  arkansas: "South",
  oklahoma: "South",
  ohio: "Midwest",
  michigan: "Midwest",
  indiana: "Midwest",
  illinois: "Midwest",
  wisconsin: "Midwest",
  minnesota: "Midwest",
  iowa: "Midwest",
  missouri: "Midwest",
  kansas: "Midwest",
  nebraska: "Midwest",
  north_dakota: "Midwest",
  south_dakota: "Midwest",
  california: "West",
  washington: "West",
  oregon: "West",
  idaho: "West",
  montana: "West",
  wyoming: "West",
  colorado: "West",
  utah: "West",
  nevada: "West",
  arizona: "West",
  new_mexico: "West",
  alaska: "West",
  hawaii: "West",
};

export default function DashboardIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // FILTER LOGIC
  const filteredStates = useMemo(() => {
    const allStates = Object.values(rhtProgramData);

    return allStates.filter((state) => {
      const matchesSearch = state.stateName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const region = REGION_MAP[state.id] || "Other";
      const matchesRegion =
        selectedRegion === "All" || region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  // DYNAMIC METRICS
  const metrics = useMemo(() => {
    // 1. Calculate Grand Total (All Data)
    const allStates = Object.values(rhtProgramData);
    const grandTotal = allStates.reduce((acc, curr) => {
      const val = parseInt(curr.awardAmount.replace(/[^0-9]/g, "")) || 0;
      return acc + val;
    }, 0);

    // 2. Calculate Filtered Total
    const total = filteredStates.reduce((acc, curr) => {
      const val = parseInt(curr.awardAmount.replace(/[^0-9]/g, "")) || 0;
      return acc + val;
    }, 0);

    const criticalCount = filteredStates.filter(
      (s) => s.status === "At Risk"
    ).length;
    return { total, grandTotal, criticalCount };
  }, [filteredStates]);

  const watchlist = filteredStates.slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col lg:flex-row relative">
      {/* MOBILE BACKDROP */}
      <div
        className={`fixed inset-0 bg-slate-900/50 z-30 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* EXPAND BUTTON (Sticky, Floating outside sidebar) */}
      <div
        className={`sticky top-24 z-50 w-0 h-10 ${isSidebarOpen ? "hidden" : "block"}`}
      >
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute -left-20 top-0 p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-500 hover:text-indigo-600 transition-all flex flex-row items-center gap-2 animate-pulse hover:animate-none"
          title="Expand Sidebar"
        >
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Expand
          </span>
        </button>
      </div>

      {/* SIDEBAR (Left, Fixed Width) */}
      <div
        className={`
          bg-white transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 z-40 rounded-xl border border-slate-200 sticky top-24 max-h-[calc(100vh-6rem)] flex flex-col
          ${isSidebarOpen ? "w-80 shadow-[4px_0_24px_rgba(0,0,0,0.02)] opacity-100 ml-4 lg:ml-0" : "w-0 border-none opacity-0"}
        `}
      >
        {/* HIDE BUTTON (Inside Sidebar) */}
        <div className="flex-shrink-0 p-2 sticky top-0 bg-white z-50 flex justify-end border-b border-slate-100">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2"
            title="Collapse Sidebar"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Hide
            </span>
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full flex-1 overflow-y-auto p-6 pt-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          <Sidebar
            noteData={{
              headline: "Dashboard Intelligence",
              content:
                "Real-time surveillance of the RHT program indicates a 15% increase in active awards this quarter. Monitor the 'At Risk' cohorts in the Northeast for potential intervention requirements.",
              author: "System Admin",
            }}
          />
        </div>

        {/* Scroll Fade Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      </div>

      <div className="flex-1 min-w-0">
        {/* NATIONAL HUD */}
        <div className="border-b border-slate-200 sticky top-0 bg-white/95 backdrop-blur z-20 flex items-start">
          <div className="flex-1 max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900">
                  National Platform
                </h1>
                <p className="text-slate-500 mt-1">
                  FY2026 Rural Health Transformation Surveillance
                </p>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-lg pl-4 pr-10 py-2.5 cursor-pointer hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
                  >
                    <option value="All">All Regions</option>
                    <option value="Northeast">Northeast</option>
                    <option value="South">South</option>
                    <option value="Midwest">Midwest</option>
                    <option value="West">West</option>
                  </select>
                  <FunnelIcon className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                </div>

                <div className="relative flex-1 md:w-96">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search states..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all placeholder:text-slate-400"
                  />
                  <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* LIVE METRICS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl transition-all">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <CurrencyDollarIcon className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Active Awards
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900 animate-in fade-in">
                  ${(metrics.total / 1000000).toFixed(0)}M
                </div>
                <div className="text-xs text-slate-500">
                  {metrics.total !== metrics.grandTotal
                    ? `of $${(metrics.grandTotal / 1000000).toFixed(0)}M Total`
                    : "Total Program Value"}
                </div>
              </div>
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl transition-all">
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    System Alerts
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {metrics.criticalCount}
                </div>
                <div className="text-xs text-slate-500">Requires Attention</div>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <BuildingLibraryIcon className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Cohorts Visible
                  </span>
                </div>
                <div className="text-2xl font-black text-slate-900">
                  {filteredStates.length}
                </div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <ArrowUpRightIcon className="w-3 h-3" /> Filter Active
                </div>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRegion("All");
                }}
                className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col justify-center items-center text-center hover:border-indigo-300 transition-colors cursor-pointer group"
              >
                <div className="text-indigo-600 font-bold text-sm group-hover:underline">
                  Reset View
                </div>
                <div className="text-[10px] text-slate-400">Clear Filters</div>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 2. THE REACTIVE MAP (WIRED UP) */}
            <div className="lg:col-span-2 h-full">
              <NationalMap
                searchQuery={searchQuery}
                selectedRegion={selectedRegion}
              />
            </div>

            {/* WATCHLIST */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  Priority Watchlist
                </h3>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full uppercase">
                  Top {watchlist.length} Results
                </span>
              </div>

              {watchlist.length > 0 ? (
                watchlist.map((state) => (
                  <Link
                    key={state.id}
                    href={`/dashboard/${state.id}`}
                    className={`block bg-white p-5 rounded-xl border border-slate-200 border-l-4 shadow-sm hover:shadow-md hover:translate-x-1 transition-all ${
                      state.status === "At Risk"
                        ? "border-l-red-500"
                        : "border-l-amber-400"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-slate-900">
                        {state.stateName}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          state.status === "At Risk"
                            ? "bg-red-50 text-red-600 border border-red-100"
                            : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}
                      >
                        {state.status === "At Risk" ? "CRITICAL" : "WATCH"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mb-3 line-clamp-2">
                      {state.strategicFocus}
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${state.status === "At Risk" ? "bg-red-500 w-[42%]" : "bg-amber-400 w-[62%]"}`}
                      ></div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                  <p className="text-sm text-slate-400 font-bold">
                    No states match filters
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 3. REGISTRY TABLE */}
          <div className="w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                  National Registry
                </h2>
                <p className="text-xs text-slate-500">
                  Showing {filteredStates.length} Cohorts
                </p>
              </div>
            </div>

            <div className="bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="p-4 pl-6">State</th>
                    <th className="p-4">RHT Award (FY26)</th>
                    <th className="p-4">Region</th>
                    <th className="p-4">Strategic Focus</th>
                    <th className="p-4 text-right pr-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStates.length > 0 ? (
                    filteredStates.map((state) => (
                      <tr
                        key={state.id}
                        className="hover:bg-slate-50 transition-colors group"
                      >
                        <td className="p-4 pl-6 font-bold text-slate-900">
                          {state.stateName}
                        </td>
                        <td className="p-4 text-slate-600 font-mono">
                          {state.awardAmount}
                        </td>
                        <td className="p-4 text-slate-500">
                          <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                            {REGION_MAP[state.id] || "Other"}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 line-clamp-1">
                          {state.strategicFocus}
                        </td>
                        <td className="p-4 text-right pr-6">
                          <Link
                            href={`/dashboard/${state.id}`}
                            className="text-slate-400 group-hover:text-indigo-600 font-bold text-xs uppercase tracking-wide transition-colors"
                          >
                            View Profile &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-12 text-center text-slate-400 font-medium"
                      >
                        No results found for "{searchQuery}" in {selectedRegion}
                        .
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
