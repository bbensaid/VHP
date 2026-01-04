import React from "react";
import Link from "next/link";
import { 
  ArrowLeftIcon, 
  ExclamationTriangleIcon, 
  CurrencyDollarIcon, 
  ScissorsIcon 
} from "@heroicons/react/24/outline";

/**
 * VERMONT SYSTEM HEALTH & HOSPITAL WATCHLIST
 * Source: Oliver Wyman Act 167 Report (Aug 2024)
 * Focus: Financial Solvency, Operational Waste, and Service Rationalization
 */

// --- DATA STRUCTURE: THE HOSPITAL COHORTS ---

const cohortCritical = [
  {
    name: "North Country Hospital",
    location: "Newport",
    status: "CRITICAL",
    margin2023: "-8.9%",
    lossAmount: "$8.8M",
    projectedLoss2028: "$28.9M",
    avoidableED: "37.0%", // Highest in state
    actionPlan: [
      "Stop Joint Replacement",
      "Stop Spinal Surgery",
      "Convert IP Beds to Psych/Geriatric"
    ]
  },
  {
    name: "Gifford Medical Center",
    location: "Randolph",
    status: "HIGH RISK",
    margin2023: "-8.3%",
    lossAmount: "$4.7M",
    projectedLoss2028: "$6.0M",
    avoidableED: "28.5%",
    actionPlan: [
      "Stop Colectomy",
      "Stop Lysis of Adhesions",
      "Merge Back-Office with CVMC"
    ]
  },
  {
    name: "Springfield Hospital",
    location: "Springfield",
    status: "HIGH RISK",
    margin2023: "-0.9%",
    lossAmount: "$0.6M",
    projectedLoss2028: "$10.4M",
    avoidableED: "30.5%",
    actionPlan: [
      "Convert ED to Urgent Care (16hr)",
      "Stop Femoral Hernia Repair",
      "Regionalize with Brattleboro"
    ]
  }
];

const cohortSystem = [
  {
    name: "UVM Medical Center",
    location: "Burlington",
    status: "STABLE (COST DRIVER)",
    margin2023: "+3.1%",
    lossAmount: "+$64.6M",
    projectedLoss2028: "N/A",
    avoidableED: "N/A", // Not the primary issue
    issue: "Admin Cost >400% Benchmarks",
    actionPlan: [
      "Immediate Admin Cost Reduction",
      "Stop Accepting Low-Acuity Transfers",
      "Raise Phys. Productivity >60th %ile"
    ]
  },
  {
    name: "Porter Medical Center",
    location: "Middlebury",
    status: "AT RISK (FUTURE)",
    margin2023: "+7.6%",
    lossAmount: "+$9.0M",
    projectedLoss2028: "-$10.8M", // Reverses to loss
    avoidableED: "31.2%",
    actionPlan: [
      "Full Back-Office Integration (UVM)",
      "Stop Non-Emergent Colectomy",
      "Capture Births from Burlington"
    ]
  }
];

export default function VermontHospitalWatchlist() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* 1. BREADCRUMBS & NAVIGATION */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/dashboard" className="hover:text-indigo-600">USA</Link>
          <span>/</span>
          <Link href="/dashboard/vermont" className="hover:text-indigo-600">Vermont Profile</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Hospital Watchlist</span>
        </div>
        <Link 
           href="/dashboard/vermont" 
           className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide"
        >
          <ArrowLeftIcon className="w-3 h-3" /> Back to Strategy
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* 2. THE GAP ANALYSIS (RHT MONEY vs. REALITY) */}
        <div className="grid md:grid-cols-2 gap-6">
           {/* THE SOLUTION (RHT) */}
           <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><CurrencyDollarIcon className="w-24 h-24" /></div>
              <div className="relative z-10">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1">Federal Solution (FY26)</div>
                <div className="text-4xl font-black mb-2">$195,000,000</div>
                <p className="text-indigo-200 text-sm max-w-sm">
                  RHT Award allocated for Regionalization & Global Budget Transformation.
                </p>
              </div>
           </div>

           {/* THE PROBLEM (DEFICIT) */}
           <div className="bg-white border border-red-200 p-6 rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-red-100"><ExclamationTriangleIcon className="w-24 h-24" /></div>
              <div className="relative z-10">
                <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">System Insolvency Risk (5-Yr)</div>
                <div className="text-4xl font-black text-slate-900 mb-2">-$2,400,000,000</div>
                <p className="text-slate-500 text-sm max-w-sm">
                  Projected cumulative deficit by 2030 if current operational inefficiencies persist (Source: Wyman).
                </p>
              </div>
           </div>
        </div>

        {/* 3. COHORT 1: THE "BLEEDING EDGE" (TABLE) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-black text-slate-900">Cohort 1: Immediate Restructuring Required</h2>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Solvency Critical
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="p-5">Facility</th>
                  <th className="p-5">2023 Margin (Loss)</th>
                  <th className="p-5">Inefficiency (Avoidable ED)</th>
                  <th className="p-5 text-red-600">"Kill List" (Services to Stop)</th>
                  <th className="p-5">Drill Down</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {cohortCritical.map((h, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors">
                    <td className="p-5">
                      <div className="font-bold text-slate-900">{h.name}</div>
                      <div className="text-slate-500 text-xs">{h.location}</div>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-red-600">{h.margin2023}</div>
                      <div className="text-xs text-slate-400">({h.lossAmount})</div>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-slate-900">{h.avoidableED}</div>
                      <div className="text-xs text-slate-400">of all visits</div>
                    </td>
                    <td className="p-5">
                      <ul className="space-y-1">
                        {h.actionPlan.map((action, j) => (
                          <li key={j} className="flex items-start gap-2 text-slate-600 text-xs font-medium">
                            <ScissorsIcon className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-5">
                      <Link 
                        href={`/dashboard/vermont/${h.name === "Northeastern VT Regional" || h.location === "Newport" ? "nvrh" : "#"}`}
                        className={`inline-block px-3 py-1 rounded border text-xs font-bold uppercase tracking-wide transition-colors ${
                          h.location === "Newport" 
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300" 
                          : "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed opacity-50"
                        }`}
                      >
                        {h.location === "Newport" ? "View Profile" : "No Data"}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. COHORT 2: THE "COST DRIVERS" (TABLE) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-black text-slate-900">Cohort 2: System Cost Drivers</h2>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Inefficiency Focus
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="p-5">Facility</th>
                  <th className="p-5">Current Margin</th>
                  <th className="p-5">Primary Operational Failure</th>
                  <th className="p-5 text-indigo-600">Transformation Mandate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {cohortSystem.map((h, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors">
                    <td className="p-5">
                      <div className="font-bold text-slate-900">{h.name}</div>
                      <div className="text-slate-500 text-xs">{h.location}</div>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-emerald-600">{h.margin2023}</div>
                      <div className="text-xs text-slate-400">({h.lossAmount})</div>
                    </td>
                    <td className="p-5">
                      {h.avoidableED !== "N/A" ? (
                         <div>
                           <span className="font-bold text-slate-900">{h.avoidableED}</span> Avoidable ED
                         </div>
                      ) : (
                        <div className="font-bold text-red-600">{h.issue}</div>
                      )}
                    </td>
                    <td className="p-5">
                      <ul className="space-y-1">
                        {h.actionPlan.map((action, j) => (
                          <li key={j} className="flex items-start gap-2 text-slate-600 text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}