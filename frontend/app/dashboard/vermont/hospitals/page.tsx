import React from "react";
import Link from "next/link";
import { 
  BuildingOffice2Icon,
  SignalIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

export default function VermontHospitalList() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        
        {/* HEADER */}
        <div className="bg-white border-l-4 border-red-500 p-8 rounded-r-xl shadow-sm">
           <h1 className="text-3xl font-black text-slate-900">Vermont System Health</h1>
           <p className="text-slate-500">Act 167 Stabilization & Transformation Network</p>
        </div>

        {/* REGISTRY TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
           <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                <tr>
                  <th className="p-4 pl-6">Facility Name</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* NVRH (The Hero Link) */}
                <tr className="hover:bg-slate-50 transition-colors group bg-red-50/30">
                    <td className="p-4 pl-6 font-bold text-slate-900">
                       <Link 
                         href="/dashboard/vermont/hospitals/nvrh"
                         className="flex items-center gap-2 hover:text-indigo-600"
                       >
                          <BuildingOffice2Icon className="w-4 h-4 text-red-500" />
                          Northeastern Vermont Regional (NVRH)
                       </Link>
                    </td>
                    <td className="p-4 text-slate-500">St. Johnsbury</td>
                    <td className="p-4 text-amber-600 font-bold flex items-center gap-1">
                        <SignalIcon className="w-4 h-4" /> Act 167 Active
                    </td>
                    <td className="p-4 text-right pr-6 text-red-600 font-bold">
                        CRITICAL
                    </td>
                </tr>

                {/* Other Vermont Hospitals (Generic) */}
                <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 pl-6 font-bold text-slate-900">
                       <Link 
                         href="/dashboard/vermont/hospitals/uvm-medical"
                         className="flex items-center gap-2 hover:text-indigo-600"
                       >
                          <BuildingOffice2Icon className="w-4 h-4 text-slate-400" />
                          UVM Medical Center
                       </Link>
                    </td>
                    <td className="p-4 text-slate-500">Burlington</td>
                    <td className="p-4 text-emerald-600 font-bold">Stable</td>
                    <td className="p-4 text-right pr-6 text-slate-400">Low</td>
                </tr>
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}