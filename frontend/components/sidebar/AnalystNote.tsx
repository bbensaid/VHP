// components/sidebar/AnalystNote.tsx
import React from "react";

const AnalystNote: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6 relative overflow-hidden">
      {/* Decorative 'Quote' Mark */}
      <span className="absolute top-0 right-4 text-6xl text-slate-200 font-serif leading-none select-none">
        ”
      </span>

      <div className="relative z-10">
        <h3 className="font-extrabold text-indigo-600 uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
          Analyst's Notebook
        </h3>

        <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
          "Don't get distracted by the topline revenue in the Q4 Kaiser earnings
          report. The real story is the{" "}
          <span className="underline decoration-indigo-300 decoration-2">
            MLR (Medical Loss Ratio)
          </span>{" "}
          spiking to 89%. That is the signal that payer margins are compressing
          faster than anticipated."
        </p>

        <div className="mt-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-300"></div>{" "}
          {/* Placeholder for your Headshot */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-900 uppercase">
              The Editor
            </span>
            <span className="text-[9px] text-slate-500">Dec 12, 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystNote;
