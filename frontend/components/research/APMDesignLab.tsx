"use client";

/**
 * APM Design Lab — shell.
 *
 * 1,894 lines collapsed to a thin shell. Each of the four tabs lives in
 * APMDesignLab.tabs/. Shared atoms in APMDesignLab.atoms.tsx, formatters in
 * APMDesignLab.data.ts.
 */

import { useState } from "react";
import { DollarSign, Activity, BarChart2, Globe, Layers } from "lucide-react";
import { APMArchitectureDesigner } from "./APMDesignLab.tabs/architecture";
import { EpisodeDesigner } from "./APMDesignLab.tabs/episode";
import { GlobalBudgetSimulator } from "./APMDesignLab.tabs/global-budget";
import { BenchmarkComparison } from "./APMDesignLab.tabs/benchmark";

const TABS = [
  { id: "architect", label: "APM Architecture",     short: "Architect",     icon: Layers },
  { id: "episode",   label: "Episode Designer",     short: "Episode",       icon: Activity },
  { id: "global",    label: "Global Budget",        short: "Global Budget", icon: Globe },
  { id: "benchmark", label: "Benchmark Comparison", short: "Benchmarks",    icon: BarChart2 },
];

export default function APMDesignLab() {
  const [activeTab, setActiveTab] = useState("architect");

  return (
    <div className="bg-gray-950 text-slate-100 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
      {/* Header */}
      <div className="bg-linear-to-r from-gray-900 to-gray-950 border-b border-gray-800 px-6 py-5">
        <div className="flex items-center gap-3 mb-1">
          <DollarSign className="w-6 h-6 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">APM Design Lab</h2>
          <span className="bg-emerald-900/50 border border-emerald-700 text-emerald-300 text-xs font-medium px-2 py-0.5 rounded-full">
            Advanced
          </span>
        </div>
        <p className="text-slate-400 text-sm">
          Design, model, and stress-test Alternative Payment Model structures with real financial logic
        </p>
      </div>

      {/* Tab Bar */}
      <div className="border-b border-gray-800 bg-gray-900 overflow-x-auto">
        <div className="flex min-w-max">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-emerald-500 text-emerald-400 bg-gray-950/50"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-gray-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "architect" && <APMArchitectureDesigner />}
        {activeTab === "episode"   && <EpisodeDesigner />}
        {activeTab === "global"    && <GlobalBudgetSimulator />}
        {activeTab === "benchmark" && <BenchmarkComparison />}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 px-6 py-3 bg-gray-900/50">
        <p className="text-slate-600 text-xs">
          APM Design Lab — All calculations are illustrative and for analytical purposes only. Financial projections depend on actual contract terms, risk corridors, and CMS regulatory guidance.
        </p>
      </div>
    </div>
  );
}
