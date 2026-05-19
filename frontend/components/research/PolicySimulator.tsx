"use client";

/**
 * Medicaid & State Health Policy Simulator — shell.
 *
 * This file used to be ~2,200 lines. It is now a thin shell that mounts the
 * four tab components. Each tab lives in PolicySimulator.tabs/. Static data
 * is in PolicySimulator.data.ts. Shared UI atoms (SliderRow, StatCard, …)
 * are in PolicySimulator.atoms.tsx.
 *
 * To add a tab: write the body in PolicySimulator.tabs/<name>.tsx, import the
 * `<TabName>Tab` export here, extend the Tab union in PolicySimulator.data.ts,
 * add an entry to TABS, and switch on it below.
 */

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  Globe,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { Tab } from "./PolicySimulator.data";
import { WaiverTab } from "./PolicySimulator.tabs/waiver";
import { APMTab } from "./PolicySimulator.tabs/apm";
import { ExpansionTab } from "./PolicySimulator.tabs/expansion";
import { TransparencyTab } from "./PolicySimulator.tabs/transparency";

const TABS: { id: Tab; label: string; icon: React.ReactNode; short: string }[] = [
  { id: "waiver",       label: "1115 Waiver Modeler",   short: "1115 Waiver",   icon: <Globe size={16} /> },
  { id: "apm",          label: "Global Budget Designer", short: "Global Budget", icon: <BarChart2 size={16} /> },
  { id: "expansion",    label: "Expansion Calculator",  short: "Expansion",     icon: <Users size={16} /> },
  { id: "transparency", label: "Price Transparency",    short: "Transparency",  icon: <ShieldCheck size={16} /> },
];

export default function PolicySimulator() {
  const [activeTab, setActiveTab] = useState<Tab>("waiver");

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="bg-sky-600 text-white rounded-lg p-2 flex-shrink-0">
              <Activity size={22} />
            </div>
            <div>
              <h1 className="ty-h3 font-bold text-slate-900 leading-tight">
                Medicaid &amp; State Health Policy Simulator
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Interactive modeling tools for 1115 waivers, all-payer budgets,
                Medicaid expansion, and price transparency analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-sky-600 text-sky-700"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === "waiver" && <WaiverTab />}
        {activeTab === "apm" && <APMTab />}
        {activeTab === "expansion" && <ExpansionTab />}
        {activeTab === "transparency" && <TransparencyTab />}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-400 flex items-start gap-2">
          <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            This simulator is for policy education and research purposes only.
            All projections are modeled estimates based on published literature
            and publicly available data. They do not constitute actuarial,
            legal, or financial advice. Actual outcomes will vary based on
            state-specific conditions, federal regulatory changes, and
            implementation factors.
          </p>
        </div>
      </div>
    </div>
  );
}
