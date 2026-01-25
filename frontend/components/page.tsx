import React from "react";
import { notFound } from "next/navigation";
import { RHTScorecard } from "@/components/dashboard/RHTScorecard";
import { rhtProgramData } from "@/lib/data/rht-program";

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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <span className="uppercase tracking-wider font-bold">Dashboard</span>
          <span>/</span>
          <span className="uppercase tracking-wider font-bold text-indigo-600">
            {stateData.stateName}
          </span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
          {stateData.stateName}
        </h1>
        <p className="text-xl text-slate-500 mt-2">
          Rural Health Transformation Profile
        </p>
      </div>

      <RHTScorecard stateSlug={id} />
    </div>
  );
}
