"use client";

import React from "react";
import { BuildingOfficeIcon, DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

export default function GenericHospitalProfile() {
  const params = useParams();
  // Safe fallback if params are still loading
  const hospitalName = params?.hospital ? String(params.hospital).replace('-', ' ').toUpperCase() : "HOSPITAL PROFILE";
  const stateName = params?.state ? String(params.state).toUpperCase() : "STATE";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      {/* GENERIC HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-slate-200">
                    Standard Surveillance
                </span>
                </div>
                <h1 className="text-3xl font-black text-slate-900">{hospitalName}</h1>
                <p className="text-slate-500">{stateName} • General Acute Care • <span className="text-emerald-600 font-bold">Stable Status</span></p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        {/* EMPTY STATE - NO SIMULATION AVAILABLE */}
        <div className="max-w-lg mx-auto bg-white p-10 rounded-2xl border border-slate-200 border-dashed shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <BuildingOfficeIcon className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No Active Intervention</h2>
            <p className="text-slate-500 text-sm mb-6">
                This facility is currently reporting stable operating metrics. No Act 167 simulation or solvency intervention is required at this time.
            </p>
            <button className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-slate-800 transition-colors">
                <DocumentMagnifyingGlassIcon className="w-4 h-4" />
                View Standard Filing (PDF)
            </button>
        </div>
      </div>
    </div>
  );
}