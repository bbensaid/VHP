import React from "react";
import { ArrowDownTrayIcon, CurrencyDollarIcon, UserGroupIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default async function GenericHospitalProfile({ 
  params 
}: { 
  params: Promise<{ state: string; hospital: string }> 
}) {
  const resolvedParams = await params;
  const stateSlug = resolvedParams.state;
  const hospitalSlug = resolvedParams.hospital;

  // Format Title
  const hospitalName = hospitalSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
           <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-1">
                Active Surveillance
              </div>
              <h1 className="text-3xl font-black text-slate-900">{hospitalName}</h1>
              <p className="text-slate-500 capitalize">{stateSlug}, USA • Acute Care Facility</p>
           </div>
           <button className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
              <ArrowDownTrayIcon className="w-4 h-4" /> Export
           </button>
        </div>

        {/* VITALS GRID */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-2 text-slate-400 mb-2">
                <CurrencyDollarIcon className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Margin</span>
             </div>
             <div className="text-3xl font-black text-emerald-600">+2.4%</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-2 text-slate-400 mb-2">
                <UserGroupIcon className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Census</span>
             </div>
             <div className="text-3xl font-black text-slate-900">48</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-2 text-slate-400 mb-2">
                <ExclamationTriangleIcon className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Risk</span>
             </div>
             <div className="text-3xl font-black text-amber-500">Medium</div>
          </div>
        </div>

      </div>
    </div>
  );
}