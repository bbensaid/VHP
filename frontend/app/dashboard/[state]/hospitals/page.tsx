import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { rhtProgramData } from "@/lib/data/rht-program";
import { 
  BuildingOffice2Icon,
  CpuChipIcon,
  ServerStackIcon,
  SignalIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

export async function generateStaticParams() {
  return Object.keys(rhtProgramData).map((slug) => ({
    state: slug,
  }));
}

export default async function GenericSystemHealth({ params }: { params: Promise<{ state: string }> }) {
  const resolvedParams = await params;
  const stateSlug = resolvedParams.state.toLowerCase();
  const data = rhtProgramData[stateSlug];

  if (!data) return notFound();

  // MOCK DATA GENERATOR
  const mockHospitals = [
    { name: `${data.stateName} General`, slug: `${data.stateName.toLowerCase().replace(/\s+/g, '-')}-general`, city: "Capital City", type: "Acute Care", status: "Active", risk: "Low" },
    { name: `North ${data.stateName} Medical`, slug: `north-${data.stateName.toLowerCase().replace(/\s+/g, '-')}-medical`, city: "Highland", type: "Critical Access", status: "Active", risk: "Medium" },
    { name: `${data.stateName} Valley Health`, slug: `${data.stateName.toLowerCase().replace(/\s+/g, '-')}-valley`, city: "Riverdale", type: "Critical Access", status: "Warning", risk: "High" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        
        {/* HEADER */}
        <div className="bg-white border-l-4 border-indigo-500 p-8 rounded-r-xl shadow-sm">
           <h1 className="text-3xl font-black text-slate-900">{data.stateName} System Health</h1>
           <p className="text-slate-500">Operational tracking for the {data.awardAmount} federal investment.</p>
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
                {mockHospitals.map((hospital, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 pl-6 font-bold text-slate-900">
                       {/* THIS LINK MUST MATCH THE FOLDER STRUCTURE */}
                       <Link 
                         href={`/dashboard/${stateSlug}/hospitals/${hospital.slug}`}
                         className="flex items-center gap-2 hover:text-indigo-600"
                       >
                          <BuildingOffice2Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                          {hospital.name}
                       </Link>
                    </td>
                    <td className="p-4 text-slate-500">{hospital.city}</td>
                    <td className="p-4 text-emerald-600 font-bold">{hospital.status}</td>
                    <td className="p-4 text-right pr-6">{hospital.risk}</td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}