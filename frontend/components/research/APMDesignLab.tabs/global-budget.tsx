"use client";

import { useState, useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { fmt, fmtUSD, fmtPct } from "../APMDesignLab.data";
import { SectionCard, SliderField, StatBox } from "../APMDesignLab.atoms";

// ─── TAB 3: Global Budget Simulator ─────────────────────────────────────────

export function GlobalBudgetSimulator() {
  const [growthRate, setGrowthRate] = useState(3.5);
  const [baseSpending, setBaseSpending] = useState(2000); // in $M
  const [popGrowth, setPopGrowth] = useState(0.5);
  const [inflationRate, setInflationRate] = useState(5.0);
  const [hospitalTrend, setHospitalTrend] = useState(4.5);
  const [physicianTrend, setPhysicianTrend] = useState(3.5);
  const [pharmTrend, setPharmTrend] = useState(8.0);
  const [applySDOH, setApplySDOH] = useState(false);
  const [sdohOffset, setSdohOffset] = useState(1.0);

  const results = useMemo(() => {
    const base = baseSpending * 1_000_000; // convert M to $

    // Composite unconstrained trend (weighted)
    const hospitalWeight = 0.45;
    const physicianWeight = 0.30;
    const pharmWeight = 0.15;
    const otherWeight = 0.10;
    const compositeTrend =
      hospitalTrend * hospitalWeight +
      physicianTrend * physicianWeight +
      pharmTrend * pharmWeight +
      inflationRate * otherWeight;

    const effectiveTrend = applySDOH
      ? Math.max(0, compositeTrend - sdohOffset)
      : compositeTrend;

    const years = [1, 2, 3, 4, 5];
    const projection = years.map((yr) => {
      const cappedBudget = base * Math.pow(1 + growthRate / 100, yr);
      const unconstrainedSpend =
        base *
        Math.pow(1 + effectiveTrend / 100, yr) *
        Math.pow(1 + popGrowth / 100, yr);
      const cumulativeSavings = unconstrainedSpend - cappedBudget;
      const requiredEfficiency =
        ((unconstrainedSpend - cappedBudget) / unconstrainedSpend) * 100;
      return {
        year: `Y${yr}`,
        cappedBudget,
        unconstrainedSpend,
        cumulativeSavings,
        requiredEfficiency,
      };
    });

    return { projection, compositeTrend, effectiveTrend };
  }, [
    growthRate,
    baseSpending,
    popGrowth,
    inflationRate,
    hospitalTrend,
    physicianTrend,
    pharmTrend,
    applySDOH,
    sdohOffset,
  ]);

  const maxSpend = Math.max(
    ...results.projection.map((p) => p.unconstrainedSpend)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-5">
        <SectionCard title="Global Budget Parameters">
          <SliderField
            label="Global Budget Growth Rate (Annual)"
            value={growthRate}
            min={0}
            max={6}
            step={0.1}
            onChange={setGrowthRate}
            display={`${growthRate.toFixed(1)}% / yr`}
          />
          <SliderField
            label="Base Year Total Spending"
            value={baseSpending}
            min={500}
            max={10000}
            step={100}
            onChange={setBaseSpending}
            display={`$${fmt(baseSpending)}M`}
          />
          <SliderField
            label="Population Growth"
            value={popGrowth}
            min={-1}
            max={3}
            step={0.1}
            onChange={setPopGrowth}
            display={fmtPct(popGrowth)}
          />
        </SectionCard>

        <SectionCard title="Healthcare Trend Inputs">
          <SliderField
            label="General Healthcare Inflation"
            value={inflationRate}
            min={3}
            max={8}
            step={0.1}
            onChange={setInflationRate}
            display={`${inflationRate.toFixed(1)}%`}
          />
          <SliderField
            label="Hospital Cost Trend"
            value={hospitalTrend}
            min={2}
            max={8}
            step={0.1}
            onChange={setHospitalTrend}
            display={`${hospitalTrend.toFixed(1)}%`}
          />
          <SliderField
            label="Physician Cost Trend"
            value={physicianTrend}
            min={2}
            max={7}
            step={0.1}
            onChange={setPhysicianTrend}
            display={`${physicianTrend.toFixed(1)}%`}
          />
          <SliderField
            label="Pharmaceutical Trend"
            value={pharmTrend}
            min={5}
            max={15}
            step={0.1}
            onChange={setPharmTrend}
            display={`${pharmTrend.toFixed(1)}%`}
          />
        </SectionCard>

        <SectionCard title="SDOH Investment Offset">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setApplySDOH(!applySDOH)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                applySDOH ? "bg-emerald-600" : "bg-gray-700"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  applySDOH ? "translate-x-5" : ""
                }`}
              />
            </button>
            <span className="text-slate-300 text-sm">
              Apply SDOH Investment Offset
            </span>
          </div>
          {applySDOH && (
            <SliderField
              label="Trend Reduction from SDOH Investment"
              value={sdohOffset}
              min={0.5}
              max={2}
              step={0.1}
              onChange={setSdohOffset}
              display={`-${sdohOffset.toFixed(1)}% trend offset`}
            />
          )}
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Composite Unconstrained Trend</span>
              <span className="text-yellow-400 font-mono">
                {results.compositeTrend.toFixed(2)}%
              </span>
            </div>
            {applySDOH && (
              <div className="flex justify-between text-sm mt-1">
                <span className="text-slate-400">Effective Trend (post-SDOH)</span>
                <span className="text-emerald-400 font-mono">
                  {results.effectiveTrend.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <div className="space-y-5">
        <SectionCard title="5-Year Projection">
          <div className="space-y-3">
            {results.projection.map((yr) => {
              const isUnsustainable = yr.requiredEfficiency > 5;
              const isWarning = yr.requiredEfficiency > 3;
              return (
                <div
                  key={yr.year}
                  className={`rounded-xl border p-4 ${
                    isUnsustainable
                      ? "border-red-700 bg-red-900/20"
                      : isWarning
                      ? "border-yellow-700 bg-yellow-900/20"
                      : "border-gray-700 bg-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-200 font-bold text-sm">
                      {yr.year}
                    </span>
                    {isUnsustainable && (
                      <span className="text-red-400 text-xs flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Feasibility Alert
                      </span>
                    )}
                    {isWarning && !isUnsustainable && (
                      <span className="text-yellow-400 text-xs flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Challenging
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <div className="text-slate-500">Capped Budget</div>
                      <div className="text-emerald-400 font-mono">
                        {fmtUSD(yr.cappedBudget)}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Unconstrained Spend</div>
                      <div className="text-yellow-400 font-mono">
                        {fmtUSD(yr.unconstrainedSpend)}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Cumulative Savings</div>
                      <div className="text-slate-200 font-mono">
                        {fmtUSD(yr.cumulativeSavings)}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Required Efficiency</div>
                      <div
                        className={`font-mono ${
                          isUnsustainable
                            ? "text-red-400"
                            : isWarning
                            ? "text-yellow-400"
                            : "text-slate-200"
                        }`}
                      >
                        {yr.requiredEfficiency.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  {/* Glide path bars */}
                  <div className="space-y-1.5">
                    <div>
                      <div className="text-slate-500 text-xs mb-0.5">
                        Budget Cap
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${(yr.cappedBudget / maxSpend) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs mb-0.5">
                        Unconstrained
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: `${(yr.unconstrainedSpend / maxSpend) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Cumulative Savings Summary">
          <div className="grid grid-cols-1 gap-3">
            <StatBox
              label="5-Year Total Savings (Cumulative)"
              value={fmtUSD(
                results.projection.reduce(
                  (sum, yr) => sum + yr.cumulativeSavings,
                  0
                )
              )}
              sub="vs unconstrained trend"
              positive={
                results.projection.reduce(
                  (sum, yr) => sum + yr.cumulativeSavings,
                  0
                ) > 0
              }
            />
          </div>
          {results.projection[4].requiredEfficiency > 5 && (
            <div className="mt-4 bg-red-900/30 border border-red-700 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-red-400 text-sm font-bold mb-1">
                    Feasibility Warning
                  </div>
                  <p className="text-slate-300 text-xs">
                    Year 5 requires{" "}
                    {results.projection[4].requiredEfficiency.toFixed(1)}%
                    efficiency improvement. Research suggests health systems can
                    realistically achieve 2–4% per year. Consider raising the
                    growth rate or applying SDOH offsets to create a more
                    achievable glide path.
                  </p>
                </div>
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
