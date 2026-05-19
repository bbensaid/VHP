"use client";

/**
 * Research Workspace — shell.
 *
 * 1,912 lines collapsed to a thin shell. Each tab lives in ResearchWorkspace.tabs/.
 * Types, constants, sample data, and pure helpers in ResearchWorkspace.data.ts.
 * useLocalStorage hook + status/category/priority badges in ResearchWorkspace.atoms.tsx.
 */

import { useState } from "react";
import {
  BarChart2,
  FileText,
  FolderOpen,
  StickyNote,
} from "lucide-react";
import { ScenarioManager } from "./ResearchWorkspace.tabs/scenarios";
import { ReportBuilder } from "./ResearchWorkspace.tabs/report";
import { ComparisonDashboard } from "./ResearchWorkspace.tabs/comparison";
import { ResearchNotes } from "./ResearchWorkspace.tabs/notes";

type TabId = "scenarios" | "report" | "comparison" | "notes";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "scenarios",  label: "Scenario Manager",   icon: <FolderOpen className="w-4 h-4" /> },
  { id: "report",     label: "Report Builder",     icon: <FileText className="w-4 h-4" /> },
  { id: "comparison", label: "Comparison",         icon: <BarChart2 className="w-4 h-4" /> },
  { id: "notes",      label: "Notes & Citations",  icon: <StickyNote className="w-4 h-4" /> },
];

export default function ResearchWorkspace() {
  const [activeTab, setActiveTab] = useState<TabId>("scenarios");

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Workspace header */}
      <div className="bg-linear-to-r from-slate-800 to-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-semibold text-lg flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-slate-300" />
              Research Workspace
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Collaboration and export layer for Vermont Health Platform analysis
            </p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-lg font-mono">
            Auto-saved · localStorage
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-slate-800 text-slate-800 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "scenarios"  && <ScenarioManager />}
        {activeTab === "report"     && <ReportBuilder />}
        {activeTab === "comparison" && <ComparisonDashboard />}
        {activeTab === "notes"      && <ResearchNotes />}
      </div>
    </div>
  );
}
