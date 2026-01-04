import React from "react";
import Link from "next/link";
import { 
  ArrowLeftIcon, 
  ExclamationTriangleIcon, 
  CurrencyDollarIcon, 
  ScissorsIcon,
  BuildingOffice2Icon
} from "@heroicons/react/24/outline";

/**
 * VERMONT SYSTEM HEALTH & OPERATIONS
 * Source: Oliver Wyman Act 167 Report
 */

export default function VermontSystemHealth() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* 1. BREADCRUMBS */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/dashboard" className="hover:text-indigo-600">USA</Link>
          <span>/</span>
          <Link href="/dashboard/vermont" className="hover:text-indigo-600">Vermont Strategy</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">System Health (Operations)</span>
        </div>
        <Link 
           href="/dashboard/vermont" 
           className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide"
        >
          <ArrowLeftIcon className="w-3 h-3" /> Back to Strategy
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* 2. THE CRISIS HEADER */}
        <div className="bg-white border-l-4 border-red-600 p-8 rounded-r-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                 Act 167 Assessment
               </span>
               <span className="text-slate-400 text-xs font-mono">Source: Oliver Wyman Report (Aug 2024)</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900">Hospital Transformation Watchlist</h1>
            <p className="text-slate-500 mt-2 max-w-xl">
              9 of 14 hospitals are operating at a negative margin. The system faces a projected <strong>$2.4B cumulative deficit</strong> by 2030 without immediate restructuring.
            </p>
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">System Risk Score</div>
             <div className="text-5xl font-black text-red-600">CRITICAL</div>
          </div>
        </div>

        {/* 3. COHORT 1: IMMEDIATE RESTRUCTURING */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-black text-slate-900">Cohort 1: Solvency Risk (Immediate Action)</h2>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="p-5">Facility</th>
                  <th className="p-5">Financial Vitals (2023)</th>
                  <th className="p-5">Operational Inefficiency</th>
                  <th className="p-5 text-red-600">Wyman Recommendation ("Kill List")</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                
                {/* NVRH */}
                <tr className="group hover:bg-slate-50 transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <BuildingOffice2Icon className="w-4 h-4 text-slate-400" />
                      Northeastern VT Regional
                    </div>
                    <div className="text-slate-500 text-xs ml-6">St. Johnsbury, VT</div>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-red-600">-8.9% Margin</div>
                    <div className="text-xs text-slate-400">($8.8M Loss)</div>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-slate-900">37.0%</div>
                    <div className="text-xs text-slate-400">Avoidable ED Visits</div>
                  </td>
                  <td className="p-5">
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2 text-slate-600 text-xs">
                        <ScissorsIcon className="w-3 h-3 text-red-400 mt-0.5" /> Stop Joint Replacement
                      </li>
                      <li className="flex items-start gap-2 text-slate-600 text-xs">
                        <ScissorsIcon className="w-3 h-3 text-red-400 mt-0.5" /> Stop Spinal Surgery
                      </li>
                    </ul>
                  </td>
                  <td className="p-5">
                    <Link href="/dashboard/vermont/nvrh" className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded transition-colors shadow-sm">
                      Deep Dive
                    </Link>
                  </td>
                </tr>

                {/* NORTH COUNTRY */}
                <tr className="group hover:bg-slate-50 transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <BuildingOffice2Icon className="w-4 h-4 text-slate-400" />
                      North Country Hospital
                    </div>
                    <div className="text-slate-500 text-xs ml-6">Newport, VT</div>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-red-600">-8.9% Margin</div>
                    <div className="text-xs text-slate-400">($8.8M Loss)</div>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-slate-900">37.0%</div>
                    <div className="text-xs text-slate-400">Avoidable ED Visits</div>
                  </td>
                  <td className="p-5">
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2 text-slate-600 text-xs">
                        <ScissorsIcon className="w-3 h-3 text-red-400 mt-0.5" /> Stop Total Joint Replacement
                      </li>
                      <li className="flex items-start gap-2 text-slate-600 text-xs">
                        <ScissorsIcon className="w-3 h-3 text-red-400 mt-0.5" /> Convert IP Beds to Psych
                      </li>
                    </ul>
                  </td>
                  <td className="p-5">
                    <button disabled className="text-xs font-bold text-slate-400 border border-slate-200 px-3 py-1.5 rounded cursor-not-allowed">
                      Analysis Pending
                    </button>
                  </td>
                </tr>

                {/* SPRINGFIELD */}
                <tr className="group hover:bg-slate-50 transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <BuildingOffice2Icon className="w-4 h-4 text-slate-400" />
                      Springfield Hospital
                    </div>
                    <div className="text-slate-500 text-xs ml-6">Springfield, VT</div>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-orange-600">-0.9% Margin</div>
                    <div className="text-xs text-slate-400">($0.6M Loss)</div>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-slate-900">30.5%</div>
                    <div className="text-xs text-slate-400">Avoidable ED Visits</div>
                  </td>
                  <td className="p-5">
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2 text-slate-600 text-xs">
                        <ScissorsIcon className="w-3 h-3 text-red-400 mt-0.5" /> Convert ED to 16hr Urgent Care
                      </li>
                      <li className="flex items-start gap-2 text-slate-600 text-xs">
                        <ScissorsIcon className="w-3 h-3 text-red-400 mt-0.5" /> Stop Femoral Hernia Repair
                      </li>
                    </ul>
                  </td>
                  <td className="p-5">
                    <button disabled className="text-xs font-bold text-slate-400 border border-slate-200 px-3 py-1.5 rounded cursor-not-allowed">
                      Analysis Pending
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}