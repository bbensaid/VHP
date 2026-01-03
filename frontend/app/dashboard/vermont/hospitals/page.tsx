import React from "react";
import Link from "next/link";

/**
 * SYSTEM HEALTH INDEX (SHI) & HOSPITAL WATCHLIST
 * Relocated from original dashboard view.
 */

export default function VermontSystemHealth() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-800">
      
      {/* 1. UPDATED BREADCRUMBS */}
      <div className="bg-white border-b border-slate-200 px-8 py-3 flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/dashboard" className="hover:text-indigo-600">USA Dashboard</Link>
        <span>/</span>
        <Link href="/dashboard/vermont" className="hover:text-indigo-600">Vermont (State Profile)</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">System Health & Hospitals</span>
      </div>

      {/* --- ORIGINAL HEADER SECTION --- */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-red-100">
                  Operational Crisis Mode
                </span>
                <span className="text-slate-400 text-xs font-mono">
                  Data: Q1 2026 (Oliver Wyman)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                System Health Breakdown
              </h1>
            </div>
            
            {/* TOP LEVEL SCORE CARD */}
            <div className="flex items-center gap-6 bg-slate-900 text-white p-4 rounded-lg shadow-xl">
              <div className="text-right">
                <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">State Health Index</div>
                <div className="text-xs text-red-400 font-bold">CRITICAL CONDITION</div>
              </div>
              <div className="h-16 w-16 flex items-center justify-center bg-red-600 rounded-full border-4 border-slate-800 text-2xl font-black">
                42
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        
        {/* --- PILLAR BREAKDOWN (Original Code) --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          
          {/* 1. ECONOMICS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-economics">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg font-bold text-economics">Economics</h3>
              <span className="text-3xl font-black text-slate-900">28<span className="text-sm text-slate-400 font-normal">/100</span></span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
              <div className="bg-economics h-full w-[28%]"></div>
            </div>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">⚠</span>
                <span>
                  <strong>Premium Spike:</strong> Commercial premiums rose <span className="text-red-600 font-bold">108%</span> in 6 years.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-500 font-bold">⚠</span>
                <span>
                  <strong>Insolvency:</strong> 9 of 14 hospitals currently operating at a negative margin.
                </span>
              </li>
            </ul>
          </div>

          {/* 2. POLICY */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-policy">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg font-bold text-policy">Policy</h3>
              <span className="text-3xl font-black text-slate-900">45<span className="text-sm text-slate-400 font-normal">/100</span></span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
              <div className="bg-policy h-full w-[45%]"></div>
            </div>
             <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">!</span>
                <span>
                  <strong>Fragmented Governance:</strong> Conflict between AHS and GMCB regulatory authority.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>
                  <strong>Legislative Will:</strong> <span className="font-bold">Act 167</span> passed.
                </span>
              </li>
            </ul>
          </div>

          {/* 3. TECHNOLOGY */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-technology">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg font-bold text-technology">Technology</h3>
              <span className="text-3xl font-black text-slate-900">53<span className="text-sm text-slate-400 font-normal">/100</span></span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
              <div className="bg-technology h-full w-[53%]"></div>
            </div>
             <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="text-orange-500 font-bold">!</span>
                <span>
                  <strong>Interoperability:</strong> "OneCare" participation is voluntary.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span>
                  <strong>Telehealth:</strong> High adoption during COVID.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- HOSPITAL WATCHLIST (Original Code) --- */}
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Hospital Transformation Watchlist</h2>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">
                Action Required
              </span>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Facility</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Drill Down</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* ROW 1: NVRH */}
                  <tr className="group hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">Northeastern VT Regional</td>
                    <td className="p-4 text-red-600 font-medium">Insolvency Risk</td>
                    <td className="p-4">
                      {/* This links deeper to the NVRH Profile */}
                      <Link 
                        href="/dashboard/vermont/nvrh" 
                        className="inline-block whitespace-nowrap text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wide border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-50 transition-colors"
                      >
                        View Profile &rarr;
                      </Link>
                    </td>
                  </tr>

                  {/* ROW 2: NORTH COUNTRY */}
                  <tr className="group hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">North Country Hospital</td>
                    <td className="p-4 text-red-600 font-medium">$29M Loss Projected</td>
                    <td className="p-4">
                      <span className="text-xs text-slate-400 font-medium cursor-not-allowed">Analysis Pending</span>
                    </td>
                  </tr>
                  {/* ... other rows ... */}
                </tbody>
              </table>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="md:col-span-1">
             <div className="bg-slate-900 text-white p-6 rounded-xl relative overflow-hidden">
                <h3 className="font-bold text-lg mb-4 text-indigo-400">Strategic Rx</h3>
                <ol className="space-y-4 text-sm text-slate-300 list-decimal list-outside ml-4">
                  <li><span className="text-white font-bold">Consolidate Surgery:</span> Halt low-volume procedures.</li>
                  <li><span className="text-white font-bold">Housing First:</span> Allocate Medicaid funds to housing.</li>
                </ol>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}