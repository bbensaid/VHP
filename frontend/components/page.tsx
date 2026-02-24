import React from "react";
import { notFound } from "next/navigation";
import { RHTScorecard } from "@/components/dashboard/RHTScorecard";
import { rhtProgramData } from "@/lib/data/rht-program";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Generate static params for all states in the data file to ensure they are buildable
export async function generateStaticParams() {
  return Object.keys(rhtProgramData).map((slug) => ({
    id: slug,
  }));
}

export default async function StateDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stateData = rhtProgramData[id.toLowerCase()];

  if (!stateData) {
    return notFound();
  }

  return (
    <div className="w-full font-sans text-slate-800 flex flex-col pb-20">
      {/* HEADER CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        
        <div className="relative z-10">
          <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6">
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to Dashboard
          </Link>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded border border-indigo-100">
                State Profile
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
              {stateData.stateName}
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Rural Health Transformation Profile
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <RHTScorecard stateSlug={id} />
      </div>
    </div>
  );
}
