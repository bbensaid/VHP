"use client";

import { useState, useEffect } from "react";

type StateRow = {
  state_id: string;
  state_name: string;
  state_code: string;
  health_status: string;
  trend: string;
  composite_score: number;
  hospital_margin: number | null;
  uninsured_rate: number | null;
};

export default function StateMonitor() {
  const [states, setStates] = useState<StateRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"All" | "Critical" | "Stable">("All");

  useEffect(() => {
    fetch("/api/state-metrics")
      .then((r) => r.json())
      .then(setStates)
      .catch(console.error);
  }, []);

  const filteredStates = states.filter((state) => {
    const matchesSearch = state.state_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || state.health_status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            National Health Pulse
          </h3>
          <span className="text-xs font-mono text-slate-600">LIVE FEED</span>
        </div>
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
            onChange={(e) => setFilter(e.target.value as "All" | "Critical" | "Stable")}
          >
            <option value="All">All Status</option>
            <option value="Critical">Critical</option>
            <option value="Stable">Stable</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredStates.length === 0 && states.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">Loading…</div>
        )}
        {filteredStates.length === 0 && states.length > 0 && (
          <div className="text-center py-10 text-slate-600 text-sm">No states found matching your criteria.</div>
        )}
        {filteredStates.map((state) => (
          <StateCard key={state.state_code} state={state} />
        ))}
      </div>
    </div>
  );
}

function StateCard({ state }: { state: StateRow }) {
  const statusColors: Record<string, string> = {
    Critical: "bg-red-50 text-red-700 border-red-100",
    Warning: "bg-yellow-50 text-yellow-700 border-yellow-100",
    Stable: "bg-green-50 text-green-700 border-green-100",
    Improving: "bg-blue-50 text-blue-700 border-blue-100",
  };
  const trendIcon: Record<string, string> = { up: "↑", down: "↓", flat: "→" };
  const trendColor: Record<string, string> = { up: "text-green-600", down: "text-red-600", flat: "text-slate-500" };
  const trendLabel: Record<string, string> = { up: "Improving", down: "Declining", flat: "Stable" };
  const margin = state.hospital_margin ?? 0;

  return (
    <div className="p-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer bg-white">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-slate-900">{state.state_name}</h4>
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${statusColors[state.health_status] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
            {state.health_status}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-slate-800">{state.composite_score}</div>
          <div className="text-[10px] text-slate-600 uppercase tracking-wider">HTR Score</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-50 text-xs">
        <div>
          <span className="text-slate-500 block">Margin</span>
          <span className={`font-mono font-medium ${margin < 0 ? "text-red-600" : "text-green-600"}`}>
            {margin > 0 ? "+" : ""}{margin}%
          </span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 block">Trend</span>
          <span className={`font-bold ${trendColor[state.trend] ?? "text-slate-500"}`}>
            {trendIcon[state.trend] ?? "→"} {trendLabel[state.trend] ?? state.trend}
          </span>
        </div>
      </div>
    </div>
  );
}
