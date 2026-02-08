"use client";

import { useState } from "react";
import { US_STATES_DATA } from "@/lib/data/states";
import { StateHealthData } from "@/types";

export default function StateMonitor() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Stable'>('All');

  // Filter Logic
  const filteredStates = US_STATES_DATA.filter((state) => {
    const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || state.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            National Health Pulse
          </h3>
          <span className="text-xs font-mono text-slate-400">LIVE FEED</span>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search state..." 
            className="flex-1 bg-white border border-slate-200 text-sm rounded-md px-3 py-2 outline-none focus:border-indigo-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="bg-white border border-slate-200 text-sm rounded-md px-2 py-2 outline-none focus:border-indigo-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="All">All Status</option>
            <option value="Critical">Critical</option>
            <option value="Stable">Stable</option>
          </select>
        </div>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredStates.map((state) => (
          <StateCard key={state.code} state={state} />
        ))}
        
        {filteredStates.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            No states found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-component for cleaner rendering
function StateCard({ state }: { state: StateHealthData }) {
  const statusColors = {
    Critical: "bg-red-50 text-red-700 border-red-100",
    Warning: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Stable: "bg-green-50 text-green-700 border-green-100",
    Improving: "bg-blue-50 text-blue-700 border-blue-100",
  };

  const trendIcon = {
    up: "↑",
    down: "↓",
    flat: "→",
  };

  const trendColor = {
    up: "text-green-600",
    down: "text-red-600",
    flat: "text-slate-400",
  };

  return (
    <div className="p-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group bg-white">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-slate-900">{state.name}</h4>
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${statusColors[state.status]}`}>
            {state.status}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-slate-800">{state.score}</div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">HTR Score</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-50 text-xs">
        <div>
          <span className="text-slate-500 block">Margin</span>
          <span className={`font-mono font-medium ${state.hospitalMargin < 0 ? 'text-red-600' : 'text-green-600'}`}>
            {state.hospitalMargin > 0 ? '+' : ''}{state.hospitalMargin}%
          </span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 block">Trend</span>
          <span className={`font-bold ${trendColor[state.trend]}`}>
            {trendIcon[state.trend]} {state.trend === 'up' ? 'Improving' : state.trend === 'down' ? 'Declining' : 'Stable'}
          </span>
        </div>
      </div>
    </div>
  );
}