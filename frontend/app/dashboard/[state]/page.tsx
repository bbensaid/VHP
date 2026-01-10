import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { rhtProgramData } from "@/lib/data/rht-program";
import { RHTScorecard } from "@/components/dashboard/RHTScorecard";
import { ChartBarIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export async function generateStaticParams() {
  return Object.keys(rhtProgramData).map((slug) => ({
    state: slug,
  }));
}

export default function DynamicStatePage({ params }: { params: { state: string } }) {
  const stateSlug = params.state.toLowerCase();
  const stateData = rhtProgramData[stateSlug];

  if (!stateData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center font-sans">
        <h1 className="text-3xl font-black text-slate-300 mb-4">DATA PENDING</h1>
        <p className="text-slate-500 max-w-md mb-8">
          The RHT profile for <span className="font-bold capitalize">{stateSlug}</span> has not yet been ingested into the platform.
        </p>
        <Link href="/dashboard" className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-2">
          <ArrowLeftIcon className="w-4 h-4" /> Return to National Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* BREADCRUMBS REMOVED (Handled by Global Layout) */}

      <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-2">FY2026 Transformation Cohort</div>
            <h1 className="text-4xl font-black text-slate-900">{stateData.stateName} Intelligence Profile</h1>
            <p className="text-slate-500 mt-2 max-w-2xl">
              Federal award scope, strategic initiatives, and performance targets for the Rural Health Transformation (RHT) program.
            </p>
          </div>

          {/* DYNAMIC DRILL DOWN BUTTON */}
          <div className="flex gap-4">
             <Link 
               href={`/dashboard/${stateSlug}/hospitals`} 
               className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md px-5 py-3 rounded-lg transition-all"
             >
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-md group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <ChartBarIcon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Current Reality</div>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">System Health & Operations &rarr;</div>
                </div>
             </Link>
          </div>
        </div>

        {/* SCORECARD */}
        <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
           <RHTScorecard stateSlug={stateSlug} />
        </div>

      </div>
    </div>
  );
}