"use client";

/**
 * HTA Studio — shell.
 *
 * 2,227 lines collapsed to a thin shell. Each of the four tabs lives in
 * HTAStudio.tabs/. Shared formatters in HTAStudio.data.ts.
 *
 * Tabs: Budget Impact Model, MCDA, Probabilistic SA, Threshold & Surrogate.
 */

import { useState } from "react";
import {
  Calculator,
  BarChart2,
  Activity,
  FlaskConical,
  Info,
} from "lucide-react";
import { BudgetImpactTab } from "./HTAStudio.tabs/bim";
import { MCDATab } from "./HTAStudio.tabs/mcda";
import { PSATab } from "./HTAStudio.tabs/psa";
import { ThresholdTab } from "./HTAStudio.tabs/threshold";

const TABS = [
  { id: "bim",       label: "Budget Impact Model",     icon: Calculator },
  { id: "mcda",      label: "MCDA",                    icon: BarChart2 },
  { id: "psa",       label: "Probabilistic SA",        icon: Activity },
  { id: "threshold", label: "Threshold & Surrogate",   icon: FlaskConical },
];

const TAB_BLURBS: Record<string, string> = {
  bim:       "Budget Impact Model — Projects population-level cost impact over 5 years per ICER affordability framework",
  mcda:      "Multi-Criteria Decision Analysis — Weighted scoring across 8 HTA dimensions per NICE Citizens Council guidance",
  psa:       "Probabilistic Sensitivity Analysis — Monte Carlo simulation to characterize decision uncertainty per ISPOR guidelines",
  threshold: "Threshold & Surrogate Analysis — CE price thresholds and surrogate endpoint translation per CADTH/ICER methods",
};

export default function HTAStudio() {
  const [activeTab, setActiveTab] = useState("bim");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-r from-violet-900 via-violet-800 to-purple-800 text-white px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <FlaskConical size={24} className="text-violet-300" />
            <h1 className="text-xl font-bold tracking-tight">HTA Studio</h1>
            <span className="text-xs bg-violet-700 text-violet-200 px-2 py-0.5 rounded-full font-medium">
              ICER / NICE Methodology
            </span>
          </div>
          <p className="text-sm text-violet-300">
            Health Technology Assessment analytical toolkit — Budget impact modeling, MCDA, probabilistic sensitivity analysis, and surrogate endpoint translation
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    active
                      ? "border-violet-600 text-violet-700 bg-violet-50/50"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info size={12} />
            <span>{TAB_BLURBS[activeTab]}</span>
          </div>
        </div>

        {activeTab === "bim" && <BudgetImpactTab />}
        {activeTab === "mcda" && <MCDATab />}
        {activeTab === "psa" && <PSATab />}
        {activeTab === "threshold" && <ThresholdTab />}
      </div>
    </div>
  );
}
