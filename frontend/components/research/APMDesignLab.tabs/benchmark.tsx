"use client";

import { useState, useMemo } from "react";
import { CheckCircle, XCircle, Info, ArrowRight } from "lucide-react";
import { fmt, fmtUSD } from "../APMDesignLab.data";
import { SectionCard, SliderField } from "../APMDesignLab.atoms";

// ─── TAB 4: Benchmark Methodology Comparison ─────────────────────────────────

const BENCHMARK_METHODS = [
  { id: "regional", label: "Regional Trending", color: "emerald" },
  { id: "national", label: "National Trending", color: "blue" },
  { id: "blended", label: "Blended", color: "purple" },
  { id: "mssp", label: "CMS MSSP Methodology", color: "yellow" },
];

const COLOR_CLASSES: Record<
  string,
  { border: string; bg: string; text: string; bar: string }
> = {
  emerald: {
    border: "border-emerald-700",
    bg: "bg-emerald-900/20",
    text: "text-emerald-400",
    bar: "bg-emerald-500",
  },
  blue: {
    border: "border-blue-700",
    bg: "bg-blue-900/20",
    text: "text-blue-400",
    bar: "bg-blue-500",
  },
  purple: {
    border: "border-purple-700",
    bg: "bg-purple-900/20",
    text: "text-purple-400",
    bar: "bg-purple-500",
  },
  yellow: {
    border: "border-yellow-700",
    bg: "bg-yellow-900/20",
    text: "text-yellow-400",
    bar: "bg-yellow-500",
  },
};

export function BenchmarkComparison() {
  const [attributedLives, setAttributedLives] = useState(10000);
  const [historicalPMPM, setHistoricalPMPM] = useState(1100);
  const [regionalTrend, setRegionalTrend] = useState(4.2);
  const [nationalTrend, setNationalTrend] = useState(3.1);
  const [blendRatio, setBlendRatio] = useState(50); // % regional
  const [actualSpendPct, setActualSpendPct] = useState(95);
  const [sharingRate, setSharingRate] = useState(65);
  const [msr, setMsr] = useState(2.0);

  const results = useMemo(() => {
    const totalActual =
      attributedLives * historicalPMPM * 12 * (actualSpendPct / 100);

    const calcMethod = (benchmarkPMPM: number) => {
      const totalBenchmark = attributedLives * benchmarkPMPM * 12;
      const grossSavings = totalBenchmark - totalActual;
      const grossSavingsPct = (grossSavings / totalBenchmark) * 100;
      const msrThreshold = totalBenchmark * (msr / 100);
      const msrMet = grossSavings >= msrThreshold;
      const sharedSavings = msrMet
        ? grossSavings * (sharingRate / 100)
        : 0;
      return {
        benchmarkPMPM,
        totalBenchmark,
        grossSavings,
        grossSavingsPct,
        sharedSavings,
        msrMet,
      };
    };

    const regionalPMPM = historicalPMPM * (1 + regionalTrend / 100);
    const nationalPMPM = historicalPMPM * (1 + nationalTrend / 100);
    const blendedPMPM =
      regionalPMPM * (blendRatio / 100) +
      nationalPMPM * (1 - blendRatio / 100);
    // MSSP adds sequencing adjustments (~1.5% haircut on regional)
    const msspPMPM = regionalPMPM * 0.985;

    const regional = calcMethod(regionalPMPM);
    const national = calcMethod(nationalPMPM);
    const blended = calcMethod(blendedPMPM);
    const mssp = calcMethod(msspPMPM);

    const methods = [
      { id: "regional", ...regional },
      { id: "national", ...national },
      { id: "blended", ...blended },
      { id: "mssp", ...mssp },
    ];

    // Find best
    const best = methods.reduce((a, b) =>
      a.sharedSavings > b.sharedSavings ? a : b
    );

    // Recommendation
    const regionalVsNational = regionalTrend - nationalTrend;
    let recommendation = "";
    if (regionalVsNational > 1.5) {
      recommendation = `Your regional trend (${regionalTrend.toFixed(1)}%) is significantly higher than national (${nationalTrend.toFixed(1)}%). Regional trending creates a more favorable benchmark. ${
        best.id === "regional"
          ? `Regional trending generates ${fmtUSD(
              regional.sharedSavings - national.sharedSavings
            )} more in shared savings than national trending.`
          : ""
      }`;
    } else if (nationalTrend > regionalTrend) {
      recommendation = `National trend (${nationalTrend.toFixed(1)}%) exceeds your regional trend (${regionalTrend.toFixed(1)}%). A national or blended benchmark may be most advantageous. National trending generates ${fmtUSD(
        national.sharedSavings - regional.sharedSavings
      )} more than pure regional trending.`;
    } else {
      recommendation = `Regional and national trends are similar. A blended approach provides stability and generates comparable shared savings across methodologies.`;
    }

    return { methods, best, recommendation, totalActual };
  }, [
    attributedLives,
    historicalPMPM,
    regionalTrend,
    nationalTrend,
    blendRatio,
    actualSpendPct,
    sharingRate,
    msr,
  ]);

  const maxSharedSavings = Math.max(
    ...results.methods.map((m) => Math.abs(m.sharedSavings))
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Inputs */}
        <div className="space-y-5">
          <SectionCard title="Common Inputs">
            <SliderField
              label="Attributed Lives"
              value={attributedLives}
              min={500}
              max={50000}
              step={500}
              onChange={setAttributedLives}
              display={fmt(attributedLives)}
            />
            <SliderField
              label="Historical PMPM"
              value={historicalPMPM}
              min={400}
              max={2500}
              step={10}
              onChange={setHistoricalPMPM}
              display={`$${fmt(historicalPMPM)}`}
            />
            <SliderField
              label="Regional Trend Rate"
              value={regionalTrend}
              min={0}
              max={10}
              step={0.1}
              onChange={setRegionalTrend}
              display={`${regionalTrend.toFixed(1)}%`}
            />
            <SliderField
              label="National Medicare Trend"
              value={nationalTrend}
              min={0}
              max={10}
              step={0.1}
              onChange={setNationalTrend}
              display={`${nationalTrend.toFixed(1)}%`}
            />
            <SliderField
              label="Blended Ratio (% Regional)"
              value={blendRatio}
              min={0}
              max={100}
              onChange={setBlendRatio}
              display={`${blendRatio}% Regional`}
            />
            <SliderField
              label="Actual Spend (% of Historical)"
              value={actualSpendPct}
              min={75}
              max={115}
              step={0.5}
              onChange={setActualSpendPct}
              display={`${actualSpendPct.toFixed(1)}%`}
            />
            <SliderField
              label="Sharing Rate"
              value={sharingRate}
              min={0}
              max={100}
              onChange={setSharingRate}
              display={`${sharingRate}%`}
            />
            <SliderField
              label="Minimum Savings Rate (MSR)"
              value={msr}
              min={0}
              max={5}
              step={0.1}
              onChange={setMsr}
              display={`${msr.toFixed(1)}%`}
            />
          </SectionCard>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.methods.map((method) => {
              const meta = BENCHMARK_METHODS.find((m) => m.id === method.id)!;
              const colors = COLOR_CLASSES[meta.color];
              const isBest = method.id === results.best.id;
              const barPct =
                maxSharedSavings > 0
                  ? (Math.abs(method.sharedSavings) / maxSharedSavings) * 100
                  : 0;
              return (
                <div
                  key={method.id}
                  className={`rounded-xl border p-4 ${colors.border} ${
                    colors.bg
                  } ${isBest ? "ring-2 ring-offset-1 ring-offset-gray-950 ring-emerald-500" : ""}`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className={`text-sm font-bold ${colors.text}`}>
                      {meta.label}
                    </h4>
                    {isBest && (
                      <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        BEST
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Benchmark PMPM</span>
                      <span className="text-slate-200 font-mono">
                        ${method.benchmarkPMPM.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Benchmark</span>
                      <span className="text-slate-200 font-mono">
                        {fmtUSD(method.totalBenchmark)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gross Savings</span>
                      <span
                        className={`font-mono ${
                          method.grossSavings >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {fmtUSD(method.grossSavings)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Net Position</span>
                      <span
                        className={`font-mono ${
                          method.grossSavingsPct >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {method.grossSavingsPct.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">MSR Met</span>
                      <span>
                        {method.msrMet ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 inline" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 inline" />
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Shared Savings</span>
                      <span
                        className={`font-mono font-bold ${colors.text}`}
                      >
                        {fmtUSD(method.sharedSavings)}
                      </span>
                    </div>
                  </div>
                  {/* Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-900 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${colors.bar}`}
                        style={{ width: `${Math.max(barPct, 1)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendation */}
          <div className="bg-gray-900 border border-emerald-700 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-emerald-400 font-bold text-sm mb-2">
                  Methodology Recommendation
                </h4>
                <p className="text-slate-300 text-sm">{results.recommendation}</p>
                <div className="mt-3 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 text-sm font-medium">
                    Best methodology:{" "}
                    {
                      BENCHMARK_METHODS.find(
                        (m) => m.id === results.best.id
                      )?.label
                    }{" "}
                    — {fmtUSD(results.best.sharedSavings)} shared savings
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actual Spend Reference */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="text-slate-400 text-xs uppercase tracking-wide mb-2">
              Actual Total Spending (All Methods)
            </div>
            <div className="text-2xl font-bold font-mono text-slate-200">
              {fmtUSD(results.totalActual)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
