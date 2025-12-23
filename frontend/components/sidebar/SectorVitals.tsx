// components/sidebar/SectorVitals.tsx
import React from "react";

const SectorVitals: React.FC = () => {
  const metrics = [
    {
      label: "Median Hospital Margin",
      value: "-1.2%",
      trend: "down",
      change: "0.4%",
      context: "Rolling 12m",
    },
    {
      label: "Contract Labor Rate",
      value: "$115/hr",
      trend: "up",
      change: "5.2%",
      context: "YoY Nat. Avg",
    },
    {
      label: "VBC Claims Penetration",
      value: "34%",
      trend: "flat",
      change: "0.1%",
      context: "% of Total Rev",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
        <span className="text-xl">📉</span>
        <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">
          Sector Vitals
        </h3>
      </div>

      <div className="space-y-4">
        {metrics.map((m, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-semibold text-slate-600">
                {m.label}
              </span>
              <span className="text-xs text-slate-400">{m.context}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {m.value}
              </span>

              <div
                className={`flex items-center text-xs font-bold ${
                  m.trend === "down"
                    ? "text-red-600"
                    : m.trend === "up"
                    ? "text-amber-600"
                    : "text-slate-400"
                }`}
              >
                {m.trend === "down" && "↘"}
                {m.trend === "up" && "↗"}
                {m.trend === "flat" && "–"}
                <span className="ml-1">{m.change}</span>
              </div>
            </div>
            {/* Tiny progress bar visual */}
            <div className="w-full h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
              <div
                className={`h-full ${
                  index === 0
                    ? "w-[20%] bg-red-500"
                    : index === 1
                    ? "w-[70%] bg-amber-500"
                    : "w-[34%] bg-slate-400"
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorVitals;
