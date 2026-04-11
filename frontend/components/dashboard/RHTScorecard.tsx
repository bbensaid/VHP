import React from "react";
import type { RHTProfile } from "@/lib/data/rht-program";
import {
  CurrencyDollarIcon,
  LightBulbIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { formatCompactCurrency } from "@/lib/utils";

interface RHTScorecardProps {
  data: RHTProfile;
}

export const RHTScorecard: React.FC<RHTScorecardProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-lg">
        RHT Program data not available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header: Funding & Focus */}
      <div className="bg-white text-slate-900 rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 opacity-80">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                FY26 RHT Program
              </span>
              <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
              <span className="text-xs uppercase text-slate-500">{data.stateName} Cohort</span>
            </div>
            <h2 className="text-2xl font-black">{data.strategicFocus}</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-3xl leading-relaxed">
              {data.description}
            </p>
          </div>
          <div className="bg-slate-50 px-5 py-3 rounded-lg border border-slate-100 min-w-[180px]">
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <CurrencyDollarIcon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Awarded</span>
            </div>
            <div
              className="text-3xl font-bold cursor-help"
              title={new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(
                typeof data.awardAmount === "string"
                  ? parseFloat(data.awardAmount.replace(/[^0-9.-]+/g, ""))
                  : data.awardAmount,
              )}
            >
              {formatCompactCurrency(data.awardAmount)}
            </div>
          </div>
        </div>
      </div>

      {/* Strategy & Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Initiatives */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center gap-2">
            <LightBulbIcon className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800">
              Transformation Initiatives
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {data.initiatives.map((init) => (
              <div key={init.title} className="p-5 hover:bg-slate-50 transition-colors">
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  {init.title}
                </h4>
                <p className="ty-body text-slate-600 leading-relaxed">
                  {init.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-slate-800">Review Metrics</h3>
          </div>
          <div className="p-5 space-y-5">
            {data.metrics.map((m) => (
              <div key={m.label} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-700">
                    {m.label}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      m.status === "Achieved"
                        ? "bg-emerald-100 text-emerald-700"
                        : m.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Target:{" "}
                    <span className="font-mono text-slate-900 font-bold">
                      {m.target || "N/A"}
                    </span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.status === "Achieved" ? "w-full bg-emerald-500" : "w-1/3 bg-blue-500"}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
