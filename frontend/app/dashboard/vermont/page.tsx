import React from "react";
import Link from "next/link";
import { RHTScorecard } from "@/components/dashboard/RHTScorecard";
import { ArrowRightIcon, BuildingOffice2Icon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function VermontRHTLanding() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. BREADCRUMBS */}
      <div className="bg-white border-b border-slate-200 px-8 py-3 flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/dashboard" className="hover:text-indigo-600">USA Dashboard</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">Vermont (State Profile)</span>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">

        {/* 2. HEADER & ACTION MENU */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-2">FY2026 Transformation Cohort</div>
            <h1 className="text-4xl font-black text-slate-900">Vermont Intelligence Profile</h1>
            <p className="text-slate-500 mt-2 max-w-2xl">
              Federal award scope, strategic initiatives, and performance targets for the Rural Health Transformation (RHT) program.
            </p>
          </div>

          {/* DRILL DOWN BUTTONS */}
          <div className="flex gap-4">
             <Link 
               href="/dashboard/vermont/hospitals" 
               className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md px-5 py-3 rounded-lg transition-all"
             >
                <div className="bg-red-50 text-red-600 p-2 rounded-md group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <ChartBarIcon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Current Reality</div>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">System Health & Hospitals &rarr;</div>
                </div>
             </Link>
          </div>
        </div>

        {/* 3. THE RHT SCORECARD (Separated Content) */}
        <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
           <RHTScorecard stateSlug="vermont" />
        </div>

      </div>
    </div>
  );
}