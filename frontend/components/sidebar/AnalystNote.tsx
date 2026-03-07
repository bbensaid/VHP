import React from "react";
import Link from "next/link";

interface NoteData {
  headline: string;
  content: any;
  author: string;
}

export default function AnalystNote({ data }: { data: NoteData | null }) {
  if (!data) return null;

  // Mock data for sparkline
  const trendData = [40, 35, 55, 50, 65, 70, 75, 72, 85, 90];
  const width = 60;
  const height = 20;
  const max = Math.max(...trendData);
  const min = Math.min(...trendData);
  const points = trendData
    .map((d, i) => {
      const x = (i / (trendData.length - 1)) * width;
      const y = height - ((d - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  // Structured metrics to replace narrative
  const metrics = [
    { label: "Active Cohorts", value: "47", context: "States" },
    { label: "Program Value", value: "$9.5B", context: "Allocated" },
    { label: "Critical Alerts", value: "2", context: "VT, CA", isAlert: true },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm mb-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
          <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">
            RHTP Monitor
          </h3>
        </div>
        <Link
          href="/dashboard"
          className="text-[10px] font-bold text-indigo-600 hover:underline"
        >
          View Dashboard &rarr;
        </Link>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {metrics.map((m, i) => (
          <div key={i}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs font-semibold text-slate-600">
                {m.label}
              </span>
              <span className="text-xs text-slate-500">{m.context}</span>
            </div>
            <div className="flex justify-between items-end">
              <span
                className={`text-2xl font-black tracking-tight ${m.isAlert ? "text-rose-600" : "text-slate-900"}`}
              >
                {m.value}
              </span>
            </div>
            {/* Tiny progress bar visual similar to Sector Vitals */}
            <div className="w-full h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
              <div
                className={`h-full ${m.isAlert ? "w-[90%] bg-rose-500" : "w-[60%] bg-indigo-500"}`}
              ></div>
            </div>
          </div>
        ))}

        {/* Footer with Sparkline */}
        <div className="flex items-end justify-between pt-3 border-t border-slate-50 mt-4">
          <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase">
            {data.author}
          </span>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">
              30-Day Trend
            </span>
            <svg width={width} height={height} className="overflow-visible">
              <polyline
                points={points}
                fill="none"
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={width} cy="0" r="2" fill="#6366f1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}