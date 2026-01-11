// app/dashboard/vermont/nvrh/page.tsx

import React from "react";
import Link from "next/link";

/**
 * HTR HOSPITAL PROFILE: NORTHEASTERN VERMONT REGIONAL HOSPITAL (NVRH)
 * Data Source: Oliver Wyman Act 167 Report (Aug 2024)
 */

export default function NVRHDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-800">
      
      {/* --- HEADER: IDENTITY & SHI SCORE --- */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link href="/dashboard/vermont" className="text-xs font-bold text-slate-400 hover:text-policy transition-colors uppercase tracking-widest">
                  ← Back to Vermont State
                </Link>
                <span className="text-slate-300">|</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Critical Access Hospital (CAH)
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Northeastern Vermont Regional Hospital
              </h1>
              <p className="text-sm text-slate-500">
                Service Area: St. Johnsbury, VT • Licensed Beds: 25 [cite: 1603]
              </p>
            </div>

            {/* HOSPITAL SHI SCORE */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-3 rounded-lg">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Hospital Health Index</div>
                <div className="text-sm text-red-600 font-bold">INSOLVENCY RISK</div>
              </div>
              <div className="h-12 w-12 flex items-center justify-center bg-red-600 text-white rounded font-black text-xl shadow-sm">
                38
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        
        {/* --- EXECUTIVE SUMMARY (The "Burning Platform") --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: The Financial Cliff */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-economics">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Economics</h3>
            <div className="text-3xl font-black text-slate-900 mb-1">-$75.5M</div>
            <div className="text-xs font-bold text-red-600 mb-4">Projected 5-Year Deficit </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Without reform, NVRH faces a cumulative deficit of $75.5M by 2028 to achieve a 3% margin. Expenses are growing at 8% while revenue lags. [cite: 1191]
            </p>
          </div>

          {/* Card 2: Operational Inefficiency */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-technology">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Operations</h3>
            <div className="text-3xl font-black text-slate-900 mb-1">32.7%</div>
            <div className="text-xs font-bold text-orange-600 mb-4">Avoidable ED Visits </div>
             <p className="text-sm text-slate-600 leading-relaxed">
              One-third of all Emergency Department visits are non-urgent. The system is functioning as a safety net clinic rather than an acute care facility. [cite: 1238, 1273]
            </p>
          </div>

           {/* Card 3: Community Equity Risk */}
           <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-policy">
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Equity Context</h3>
            <div className="text-3xl font-black text-slate-900 mb-1">High</div>
            <div className="text-xs font-bold text-slate-600 mb-4">Poverty & Food Insecurity [cite: 827]</div>
             <p className="text-sm text-slate-600 leading-relaxed">
              St. Johnsbury has the highest population below poverty level in the region. Reforms must protect access for vulnerable populations. [cite: 827]
            </p>
          </div>
        </div>

        {/* --- DEEP DIVE: CLINICAL TRANSFORMATION (The "Red Zone") --- */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Service Line Optimization <span className="text-slate-400 font-normal ml-2">(Quality & Safety)</span>
            </h2>
            <span className="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded text-xs font-bold uppercase">
              Action Required
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <p className="text-sm text-slate-600">
                <strong>The Issue:</strong> NVRH is performing complex surgeries at volumes far below the safety threshold. 
                HTR recommends <strong>regionalizing</strong> these procedures to high-volume centers (Dartmouth/UVM).
              </p>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="p-4 font-bold uppercase text-xs">Procedure</th>
                  <th className="p-4 font-bold uppercase text-xs">Annual Volume</th>
                  <th className="p-4 font-bold uppercase text-xs">Safety Status</th>
                  <th className="p-4 font-bold uppercase text-xs">HTR Recommendation </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="group hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Femoral Hernia Repair</td>
                  <td className="p-4 text-slate-600">&lt; 6</td>
                  <td className="p-4"><span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded text-xs">Unsafe Low Volume</span></td>
                  <td className="p-4 text-slate-800 font-bold">STOP performing immediately</td>
                </tr>
                <tr className="group hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Colectomy</td>
                  <td className="p-4 text-slate-600">15</td>
                  <td className="p-4"><span className="text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded text-xs">At Risk</span></td>
                  <td className="p-4 text-slate-800">Review: Grow volume or Stop</td>
                </tr>
                 <tr className="group hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Total Hip Replacement</td>
                  <td className="p-4 text-slate-600">165</td>
                  <td className="p-4"><span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded text-xs">Sustainable</span></td>
                  <td className="p-4 text-slate-400">Maintain & Monitor</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* --- STRATEGIC ROADMAP (The "So What?") --- */}
        <div className="grid md:grid-cols-2 gap-8">
           
           {/* Column 1: The "Save" Strategy (Re-capture) */}
           <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Growth Opportunities (Revenue Capture)
              </h3>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-sm text-slate-600 mb-4">
                  NVRH loses patients to other hospitals for services it <em>could</em> provide locally.
                  Recapturing this volume is essential for survival. [cite: 1454]
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-100">
                    <span className="font-bold text-green-900">Urology</span>
                    <span className="text-xs font-bold text-green-700 bg-white px-2 py-1 rounded">525 Discharges Leaking</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-100">
                    <span className="font-bold text-green-900">General Surgery</span>
                    <span className="text-xs font-bold text-green-700 bg-white px-2 py-1 rounded">426 Discharges Leaking</span>
                  </div>
                   <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-100">
                    <span className="font-bold text-green-900">Obstetrics (OB)</span>
                    <span className="text-xs font-bold text-green-700 bg-white px-2 py-1 rounded">205 Discharges Leaking</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                  Potential Revenue Impact: <span className="text-green-600 font-bold">+$4.7M / year</span> [cite: 1658]
                </div>
              </div>
           </div>

           {/* Column 2: The "Structural" Change (Consolidation) */}
           <div>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Structural Reform Plan
              </h3>
              <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold text-lg mb-4 text-indigo-400">HTR Prescription</h4>
                <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-indigo-500 font-bold text-lg">1</span>
                    <span>
                      <strong className="text-white block">Regional Specialty Group</strong>
                      Form a single medical group with <em>North Country Hospital</em> and <em>Gifford</em> to share specialists and reduce overhead. [cite: 1742]
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-indigo-500 font-bold text-lg">2</span>
                    <span>
                      <strong className="text-white block">Hospital at Home</strong>
                      Launch a consortium-based "Hospital at Home" model to decant inpatient beds and treat patients in the community. [cite: 1763]
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-indigo-500 font-bold text-lg">3</span>
                    <span>
                      <strong className="text-white block">Inpatient Dialysis</strong>
                      Start an inpatient dialysis unit to absorb volume if Newport (North Country) closes its unit. [cite: 1763]
                    </span>
                  </li>
                </ul>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}