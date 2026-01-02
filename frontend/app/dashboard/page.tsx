// app/dashboard/page.tsx

import React from "react";
import Link from "next/link";

export const metadata = {
  title: "HTR Intelligence Hub | System Health Index",
  description: "National command center for health system performance tracking.",
};

export default function DashboardIndex() {
  return (
    <div className="min-h-screen pb-20 font-sans text-slate-800">
      
      {/* 1. HERO HEADER */}
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Intelligence <span className="text-slate-400 font-light">Hub</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          The national command center for the <strong>System Health Index (SHI)</strong>. 
          Track performance, identify distress signals, and monitor transformation velocity across state systems.
        </p>
      </div>

      {/* 2. ACTIVE ASSESSMENTS (Grid) */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Active State Assessments</h2>
          <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200 uppercase tracking-widest">
            1 Active Region
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CARD 1: VERMONT (Live) */}
          <Link href="/dashboard/vermont" className="group block h-full">
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-indigo-600 hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded border border-red-200 uppercase tracking-widest">
                  Critical
                </span>
              </div>
              
              <div className="mb-4">
                <div className="text-4xl mb-2">VT</div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Vermont Profile
                </h3>
                <p className="text-xs text-slate-400 font-mono uppercase mt-1">
                  Updated: Q4 2025
                </p>
              </div>

              <p className="text-sm text-slate-600 mb-6 flex-grow">
                Analysis of Act 167 impact, hospital solvency risks (NVRH), and regulatory fragmentation.
              </p>

              {/* Mini Score Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">SHI Score</span>
                <span className="text-2xl font-black text-slate-900">42<span className="text-sm text-slate-400 font-normal">/100</span></span>
              </div>
            </div>
          </Link>

          {/* CARD 2: COMING SOON (Placeholder) */}
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-6 flex flex-col justify-center items-center text-center h-full opacity-60">
            <div className="text-4xl mb-2 text-slate-300">NH</div>
            <h3 className="text-xl font-bold text-slate-400 mb-2">New Hampshire</h3>
            <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
              Data Pending
            </span>
          </div>

           {/* CARD 3: COMING SOON (Placeholder) */}
           <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-6 flex flex-col justify-center items-center text-center h-full opacity-60">
            <div className="text-4xl mb-2 text-slate-300">ME</div>
            <h3 className="text-xl font-bold text-slate-400 mb-2">Maine</h3>
            <span className="bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
              Data Pending
            </span>
          </div>

        </div>
      </div>

      {/* 3. QUICK LINKS / METHODOLOGY */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4 text-indigo-400">Methodology Note</h3>
          <p className="text-slate-300 mb-6 leading-relaxed">
            The System Health Index (SHI) aggregates data across three pillars: 
            <strong> Policy, Economics, and Technology</strong>. Scores are normalized against federal benchmarks.
          </p>
          <Link href="/htr-index" className="text-sm font-bold underline decoration-indigo-500 underline-offset-4 hover:text-indigo-400">
            Read Technical Documentation &rarr;
          </Link>
        </div>

        <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-100">
          <h3 className="text-xl font-bold mb-4 text-indigo-900">Request Coverage</h3>
          <p className="text-indigo-800 mb-6 leading-relaxed">
            Are you a state policymaker or hospital executive? Request a preliminary SHI assessment for your region.
          </p>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow-sm transition-colors text-sm">
            Contact Advisory Team
          </button>
        </div>
      </div>

    </div>
  );
}