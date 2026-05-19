"use client";

/**
 * Workforce & Supply Modeling — shell.
 *
 * 2,194 lines collapsed. Each tab lives in WorkforceModeler.tabs/.
 * Shared atoms in WorkforceModeler.atoms.tsx, formatters in WorkforceModeler.data.ts.
 */

import { useState } from "react";
import {
  BarChart2,
  DollarSign,
  MapPin,
  Stethoscope,
  Users,
} from "lucide-react";
import type { Tab } from "./WorkforceModeler.data";
import { Pill } from "./WorkforceModeler.atoms";
import { PhysicianSupplyTab } from "./WorkforceModeler.tabs/supply";
import { NurseStaffingTab } from "./WorkforceModeler.tabs/staffing";
import { TurnoverROITab } from "./WorkforceModeler.tabs/turnover";
import { RuralWorkforceTab } from "./WorkforceModeler.tabs/rural";

const TABS: { id: Tab; label: string; icon: React.ReactNode; short: string }[] = [
  { id: "supply",   label: "Physician Supply & Demand", icon: <Stethoscope size={15} />, short: "Supply & Demand" },
  { id: "staffing", label: "Nurse Staffing Ratios",     icon: <Users size={15} />,       short: "Staffing Ratios" },
  { id: "turnover", label: "Turnover & ROI",            icon: <DollarSign size={15} />,  short: "Turnover ROI" },
  { id: "rural",    label: "Rural Workforce",           icon: <MapPin size={15} />,      short: "Rural Workforce" },
];

export default function WorkforceModeler() {
  const [activeTab, setActiveTab] = useState<Tab>("supply");

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="bg-linear-to-r from-orange-600 to-amber-500 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-white/20 rounded-lg p-1.5">
              <BarChart2 size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Workforce &amp; Supply Modeling
            </h1>
            <Pill label="Interactive" color="amber" />
          </div>
          <p className="text-orange-100 text-sm ml-12">
            Evidence-based tools for healthcare workforce planning, staffing optimization, and rural access strategy.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-gray-300"
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

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === "supply"   && <PhysicianSupplyTab />}
        {activeTab === "staffing" && <NurseStaffingTab />}
        {activeTab === "turnover" && <TurnoverROITab />}
        {activeTab === "rural"    && <RuralWorkforceTab />}
      </div>
    </div>
  );
}
