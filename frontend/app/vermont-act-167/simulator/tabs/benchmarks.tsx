"use client";

import { useState } from "react";
import { STATE_BENCHMARKS } from "../data";
import { InfoCard } from "../atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 7: STATE BENCHMARKS — sourced comparisons only (rebuilt 2026-10-17; the
// earlier derived "impact scores" had no source and were removed)
// ─────────────────────────────────────────────────────────────────────────────

export function StateBenchmarks() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <InfoCard variant="info">
        <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-2">What other states have done</div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Hospital price caps and global budgets in other states, with results only where a published evaluation or state
          regulator reports them. Each card names its source.
        </p>
      </InfoCard>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {STATE_BENCHMARKS.map((b) => (
          <button
            key={b.state}
            onClick={() => setSelected(selected === b.state ? null : b.state)}
            className={`text-left p-4 border rounded-xl transition-all ${selected === b.state ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
          >
            <div className="text-base font-black text-slate-900">{b.state}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{b.model} · since {b.year}</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{b.scope}</p>
            <ul className="mt-2 space-y-1 list-disc pl-4">
              {b.results.map((r) => (
                <li key={r} className="text-xs text-slate-700">{r}</li>
              ))}
            </ul>
            <p className="text-[10px] text-slate-400 mt-3">Source: {b.source}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
