"use client";

import { useState } from "react";
import { STATE_BENCHMARKS } from "../data";
import { InfoCard, HBar, MetricCard } from "../atoms";

// ─────────────────────────────────────────────────────────────────────────────
// TAB 7: STATE BENCHMARKS
// ─────────────────────────────────────────────────────────────────────────────

export function StateBenchmarks() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedBenchmark = STATE_BENCHMARKS.find((b) => b.state === selected);

  return (
    <div className="space-y-6">
      <InfoCard variant="info">
        <div className="text-xs font-black uppercase tracking-widest text-blue-700 mb-2">Research Foundations</div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Vermont is not alone. Multiple states have implemented healthcare consolidation, rural hospital transformation, and payment reform with measurable results.
          The scenarios below draw on peer-reviewed research, state health department reports, RWJF analyses, and CMS evaluation data.
        </p>
      </InfoCard>

      {/* State Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {STATE_BENCHMARKS.map((b) => (
          <button
            key={b.state}
            onClick={() => setSelected(selected === b.state ? null : b.state)}
            className={`text-left p-4 border rounded-xl transition-all ${selected === b.state ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-base font-black text-slate-900">{b.state}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{b.model}</div>
                <div className="text-[10px] text-slate-400">Since {b.year} · {b.source.split("(")[0]}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-black text-rose-600">-{b.hospitalConsolidation}%</div>
                <div className="text-[9px] text-slate-400">Hospitals</div>
              </div>
              <div>
                <div className="text-sm font-black text-emerald-600">-{b.costReduction}%</div>
                <div className="text-[9px] text-slate-400">Total Cost</div>
              </div>
              <div>
                <div className="text-sm font-black text-blue-600">+{b.qualityImprovement}%</div>
                <div className="text-[9px] text-slate-400">Quality</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1">
              <HBar value={b.ruralAccessScore} max={100} color="bg-amber-400" label="Rural Access" sublabel={`${b.ruralAccessScore}/100`} />
              <HBar value={b.equityImprovement} max={35} color="bg-violet-400" label="Equity Impvmt" sublabel={`+${b.equityImprovement}%`} />
            </div>
          </button>
        ))}
      </div>

      {/* Expanded State Detail */}
      {selectedBenchmark && (
        <InfoCard>
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">
            {selectedBenchmark.state} — Key Lessons for Vermont
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2">Measurable Outcomes</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: `-${selectedBenchmark.hospitalConsolidation}%`, l: "Acute hospital count", color: "text-rose-600" },
                  { v: `-${selectedBenchmark.costReduction}%`, l: "System cost reduction", color: "text-emerald-600" },
                  { v: `-${selectedBenchmark.adminCostReduction}%`, l: "Admin cost reduction", color: "text-blue-600" },
                  { v: `${selectedBenchmark.ruralAccessScore}/100`, l: "Rural access score", color: "text-amber-600" },
                  { v: `+${selectedBenchmark.qualityImprovement}%`, l: "Quality improvement", color: "text-violet-600" },
                  { v: `+${selectedBenchmark.equityImprovement}%`, l: "Disparity reduction", color: "text-indigo-600" },
                ].map(({ v, l, color }) => (
                  <MetricCard key={l} value={v} label={l} color={color} />
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2">Key Lessons Applicable to Vermont</div>
              <ul className="space-y-2">
                {selectedBenchmark.keyLessons.map((lesson) => (
                  <li key={lesson} className="flex gap-2 text-xs text-slate-600">
                    <span className="text-emerald-500 shrink-0 mt-0.5">▸</span>
                    {lesson}
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-[10px] text-slate-400">Source: {selectedBenchmark.source}</div>
            </div>
          </div>
        </InfoCard>
      )}

      {/* Academic Research Section */}
      <InfoCard>
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Key Academic Research Supporting Vermont&apos;s Transformation</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { citation: "Birkmeyer et al., NEJM 2002", finding: "Volume-outcome relationship in complex surgery: 20% lower mortality at high-volume vs. low-volume centers", relevance: "Supports COE surgical regionalization" },
            { citation: "Levine et al., NEJM 2020", finding: "Hospital-at-Home: equivalent or superior outcomes vs. acute hospitalization for eligible conditions", relevance: "Supports Hospital-at-Home expansion" },
            { citation: "Haber et al., NEJM 2019", finding: "Maryland global budget model: reduced hospital spending growth by 3.2% without quality decline", relevance: "Validates global budget model for Vermont" },
            { citation: "Desai et al., Circulation 2017", finding: "Remote monitoring for CHF patients: 28% reduction in 30-day readmissions", relevance: "Supports telehealth/remote monitoring investment" },
            { citation: "RWJF, 2019", finding: "Transportation barriers associated with 25–42% higher chronic disease complication rates", relevance: "Supports medical transport investment" },
            { citation: "Dartmouth Atlas, 2020", finding: "Vermont ranks 9th worst nationally for specialty care access in rural areas — wait times 8–16 weeks", relevance: "Establishes urgency for COE and telehealth access" },
            { citation: "MedPAC, 2024", finding: "Medicare payment-to-cost ratio below 97% indicates poor cost efficiency; UVMMC at 72%", relevance: "Validates UVMMC cost reduction target" },
            { citation: "Sullivan Cotter, 2023", finding: ">75% of UVMMC clinical FTEs below 50th percentile for physician productivity benchmarks", relevance: "Supports UVMMC physician productivity reform" },
          ].map(({ citation, finding, relevance }) => (
            <div key={citation} className="p-3 bg-slate-50 rounded-lg">
              <div className="text-[10px] font-black text-violet-700 mb-0.5">{citation}</div>
              <div className="text-xs text-slate-600 mb-1">{finding}</div>
              <div className="text-[10px] text-emerald-700 font-bold">Vermont relevance: {relevance}</div>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}
