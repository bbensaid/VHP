import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { rhtProgramData } from "@/lib/data/rht-program";
import { 
  ArrowLeftIcon, 
  BuildingOffice2Icon,
  CpuChipIcon
} from "@heroicons/react/24/outline";

// Force static generation for known states
export async function generateStaticParams() {
  return Object.keys(rhtProgramData).map((slug) => ({
    state: slug,
  }));
}

export default function GenericSystemHealth({ params }: { params: { state: string } }) {
  const stateSlug = params.state.toLowerCase();
  const data = rhtProgramData[stateSlug];

  if (!data) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* 1. BREADCRUMBS */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-2 text-xs font-medium text-slate-500 sticky top-0 z-10">
        <Link href="/dashboard" className="hover:text-indigo-600">USA</Link>
        <span>/</span>
        <Link href={`/dashboard/${stateSlug}`} className="hover:text-indigo-600">{data.stateName} Strategy</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold">System Operations</span>
      </div>

      {/* 2. HEADER */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <div className="bg-white border-l-4 border-indigo-500 p-8 rounded-r-xl shadow-sm">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
                     Live System Monitoring
                   </span>
                </div>
                <h1 className="text-3xl font-black text-slate-900">{data.stateName} System Health</h1>
                <p className="text-slate-500 mt-2 max-w-xl">
                   Operational tracking for the {data.awardAmount} federal investment.
                </p>
              </div>
              <div className="bg-slate-50 px-6 py-4 rounded-lg border border-slate-100 text-center">
                 <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Data Integrity</div>
                 <div className="text-2xl font-black text-indigo-600">98.4%</div>
                 <div className="text-[10px] text-green-600">Real-time Feed Active</div>
              </div>
           </div>
        </div>

        {/* 3. METRICS GRID (Derived from RHT Data) */}
        <div className="grid md:grid-cols-3 gap-6">
           {data.metrics.map((m, i) => (
             <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                   <div className="bg-indigo-50 p-2 rounded-md text-indigo-600">
                      <CpuChipIcon className="w-6 h-6" />
                   </div>
                   <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                      m.status === 'Achieved' ? 'bg-emerald-100 text-emerald-700' : 
                      m.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                      'bg-slate-100 text-slate-500'
                   }`}>
                      {m.status}
                   </span>
                </div>
                <div className="text-2xl font-black text-slate-900 mb-1">{m.target || "Tracking"}</div>
                <div className="text-sm font-medium text-slate-500">{m.label}</div>
             </div>
           ))}
        </div>

        {/* 4. HOSPITAL REGISTRY PLACEHOLDER */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Participating Facilities</h2>
            <button className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded transition-colors">
               + Add Facility Data
            </button>
          </div>

          <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
             <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <BuildingOffice2Icon className="w-8 h-8 text-slate-300" />
             </div>
             <h3 className="text-lg font-bold text-slate-900">Facility-Level Data Ingestion</h3>
             <p className="text-slate-500 max-w-md mx-auto mt-2 text-sm">
                Detailed P&L and operational data for {data.stateName} hospitals is currently being ingested via the HIE connector.
             </p>
          </div>
        </section>

      </div>
    </div>
  );
}