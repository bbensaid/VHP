"use client";

import { useState, useMemo } from "react";
import {
  Globe,
  Heart,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { fmtM, fmtPct } from "../PolicySimulator.data";
import {
  SectionTitle,
  StatCard,
  SliderRow,
  ToggleRow,
} from "../PolicySimulator.atoms";

export function APMTab() {
  const [baseSpend, setBaseSpend] = useState(3500); // in millions
  const [growthCap, setGrowthCap] = useState(3.5);
  const [projectedTrend, setProjectedTrend] = useState(6.5);
  const [hospitalPct, setHospitalPct] = useState(40);
  const [physicianPct, setPhysicianPct] = useState(28);
  const [drugPct, setDrugPct] = useState(14);
  const [qualityPool, setQualityPool] = useState(2);
  const [sdohPool, setSdohPool] = useState(1);
  const [medicare, setMedicare] = useState(true);
  const [medicaid, setMedicaid] = useState(true);
  const [commercial, setCommercial] = useState(true);
  const [selfPay, setSelfPay] = useState(false);
  const [compareMode, setCompareMode] = useState(false);

  const otherPct = Math.max(0, 100 - hospitalPct - physicianPct - drugPct);

  const projection = useMemo(() => {
    const years = Array.from({ length: 10 }, (_, i) => i + 1);
    let capBudget = baseSpend * 1e6;
    let trendBudget = baseSpend * 1e6;
    let cumSavings = 0;
    const rows = years.map((yr) => {
      capBudget *= 1 + growthCap / 100;
      trendBudget *= 1 + projectedTrend / 100;
      const savings = trendBudget - capBudget;
      cumSavings += savings;
      const qualityAlloc = capBudget * (qualityPool / 100);
      const sdohAlloc = capBudget * (sdohPool / 100);
      const productivityNeeded =
        ((projectedTrend - growthCap) / (growthCap + 100)) * 100;
      return {
        year: 2025 + yr,
        capBudget,
        trendBudget,
        savings,
        cumSavings,
        qualityAlloc,
        sdohAlloc,
        productivityNeeded,
      };
    });
    return rows;
  }, [baseSpend, growthCap, projectedTrend, qualityPool, sdohPool]);

  const payerCount = [medicare, medicaid, commercial, selfPay].filter(
    Boolean
  ).length;

  const finalRow = projection[9];
  const cumSavingsTotal = projection.reduce((s, r) => s + r.savings, 0);

  // VT ACO comparison benchmarks (approximate)
  const vtBenchmarks = {
    growthTarget: 3.5,
    actualGrowth: 4.2,
    qualityScore: 78,
    sdohInvestment: 1.2,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT PANEL */}
      <div className="lg:col-span-1 space-y-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Global Budget Parameters</SectionTitle>
          <SliderRow
            label="Base Year Spending"
            value={baseSpend}
            min={500}
            max={20000}
            step={100}
            onChange={setBaseSpend}
            format={(v) => `$${v}M`}
          />
          <SliderRow
            label="Annual Growth Cap"
            value={growthCap}
            min={0}
            max={6}
            step={0.1}
            onChange={setGrowthCap}
            format={(v) => `${v.toFixed(1)}%`}
            tooltip="Maximum allowed spending growth per year"
          />
          <SliderRow
            label="Projected Unconstrained Trend"
            value={projectedTrend}
            min={4}
            max={9}
            step={0.1}
            onChange={setProjectedTrend}
            format={(v) => `${v.toFixed(1)}%`}
            tooltip="What spending would grow without a budget cap"
          />
          {projectedTrend <= growthCap && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3 text-xs text-amber-700">
              Growth cap must be below projected trend to generate savings
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Spending Allocation</SectionTitle>
          <SliderRow
            label="Hospital Spending"
            value={hospitalPct}
            min={30}
            max={50}
            step={1}
            onChange={setHospitalPct}
            format={(v) => `${v}%`}
          />
          <SliderRow
            label="Physician Spending"
            value={physicianPct}
            min={20}
            max={35}
            step={1}
            onChange={setPhysicianPct}
            format={(v) => `${v}%`}
          />
          <SliderRow
            label="Drug Spending"
            value={drugPct}
            min={10}
            max={20}
            step={1}
            onChange={setDrugPct}
            format={(v) => `${v}%`}
          />
          <div className="bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-600 flex justify-between">
            <span>Other (remainder)</span>
            <span className="font-bold">{otherPct}%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Incentive Pools</SectionTitle>
          <SliderRow
            label="Quality Incentive Pool"
            value={qualityPool}
            min={0}
            max={5}
            step={0.25}
            onChange={setQualityPool}
            format={(v) => `${v}%`}
            tooltip="% of global budget withheld for quality performance"
          />
          <SliderRow
            label="SDOH Investment Pool"
            value={sdohPool}
            min={0}
            max={3}
            step={0.25}
            onChange={setSdohPool}
            format={(v) => `${v}%`}
            tooltip="% directed to social determinants of health programs"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>All-Payer Participation</SectionTitle>
          <ToggleRow label="Medicare" value={medicare} onChange={setMedicare} />
          <ToggleRow label="Medicaid" value={medicaid} onChange={setMedicaid} />
          <ToggleRow
            label="Commercial"
            value={commercial}
            onChange={setCommercial}
          />
          <ToggleRow label="Self-Pay" value={selfPay} onChange={setSelfPay} />
          <div className="text-xs text-slate-500 mt-2">
            {payerCount} of 4 payers participating
            {payerCount < 3 && (
              <span className="text-amber-600 ml-1">
                — limited all-payer alignment
              </span>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Comparison Mode</SectionTitle>
          <ToggleRow
            label="Vermont ACO Report Card"
            value={compareMode}
            onChange={setCompareMode}
          />
          {compareMode && (
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>VT Growth Target</span>
                <span className="font-bold text-sky-700">
                  {vtBenchmarks.growthTarget}%
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VT Actual Growth</span>
                <span
                  className={`font-bold ${vtBenchmarks.actualGrowth > vtBenchmarks.growthTarget ? "text-red-600" : "text-emerald-600"}`}
                >
                  {vtBenchmarks.actualGrowth}%
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VT Quality Score</span>
                <span className="font-bold">{vtBenchmarks.qualityScore}/100</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VT SDOH Investment</span>
                <span className="font-bold">
                  {vtBenchmarks.sdohInvestment}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="lg:col-span-2 space-y-5">
        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="10-Year Cap Budget (Yr 10)"
            value={fmtM(finalRow.capBudget)}
            color="sky"
            icon={<Globe size={20} />}
          />
          <StatCard
            label="Cumulative Savings"
            value={fmtM(cumSavingsTotal)}
            sub="vs. unconstrained trend"
            color="green"
            icon={<TrendingDown size={20} />}
          />
          <StatCard
            label="Quality Pool (Yr 10)"
            value={fmtM(finalRow.qualityAlloc)}
            sub="annual"
            color="indigo"
            icon={<ShieldCheck size={20} />}
          />
          <StatCard
            label="SDOH Pool (Yr 10)"
            value={fmtM(finalRow.sdohAlloc)}
            sub="annual"
            color="amber"
            icon={<Heart size={20} />}
          />
        </div>

        {/* Productivity requirement */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Annual Efficiency Requirement</SectionTitle>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black text-sky-600">
              {fmtPct(projectedTrend - growthCap)}
            </div>
            <div className="text-sm text-slate-600">
              <p>
                Productivity improvement needed annually to close the gap
                between the{" "}
                <span className="font-semibold text-sky-700">
                  {growthCap.toFixed(1)}% cap
                </span>{" "}
                and{" "}
                <span className="font-semibold text-red-600">
                  {projectedTrend.toFixed(1)}% trend
                </span>
                .
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {projectedTrend - growthCap > 4
                  ? "Very aggressive — may require structural transformation"
                  : projectedTrend - growthCap > 2
                    ? "Challenging — significant operational changes needed"
                    : "Achievable — moderate process improvement required"}
              </p>
            </div>
          </div>
        </div>

        {/* 10-year projection table */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>10-Year Projection</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 pr-3 text-slate-500 font-semibold">
                    Year
                  </th>
                  <th className="text-right py-2 pr-3 text-slate-500 font-semibold">
                    Cap Budget
                  </th>
                  <th className="text-right py-2 pr-3 text-slate-500 font-semibold">
                    Trend (Unconstrained)
                  </th>
                  <th className="text-right py-2 pr-3 text-sky-600 font-semibold">
                    Annual Savings
                  </th>
                  <th className="text-right py-2 pr-3 text-emerald-600 font-semibold">
                    Cumulative Savings
                  </th>
                  <th className="text-right py-2 text-indigo-600 font-semibold">
                    Quality + SDOH
                  </th>
                </tr>
              </thead>
              <tbody>
                {projection.map((row, i) => (
                  <tr
                    key={row.year}
                    className={`border-b border-slate-50 ${i % 2 === 0 ? "bg-slate-50/50" : ""}`}
                  >
                    <td className="py-1.5 pr-3 font-semibold text-slate-700">
                      {row.year}
                    </td>
                    <td className="py-1.5 pr-3 text-right text-sky-700">
                      {fmtM(row.capBudget)}
                    </td>
                    <td className="py-1.5 pr-3 text-right text-red-500">
                      {fmtM(row.trendBudget)}
                    </td>
                    <td className="py-1.5 pr-3 text-right text-sky-600 font-semibold">
                      {row.savings > 0 ? fmtM(row.savings) : "—"}
                    </td>
                    <td className="py-1.5 pr-3 text-right text-emerald-600 font-semibold">
                      {row.cumSavings > 0 ? fmtM(row.cumSavings) : "—"}
                    </td>
                    <td className="py-1.5 text-right text-indigo-600">
                      {fmtM(row.qualityAlloc + row.sdohAlloc)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hospital budget corridor */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Hospital-Specific Budget Corridor</SectionTitle>
          <div className="grid grid-cols-3 gap-3">
            {["Hospital", "Physician", "Drug"].map((sector, i) => {
              const pcts = [hospitalPct, physicianPct, drugPct];
              const alloc = (finalRow.capBudget * pcts[i]) / 100;
              const floor = alloc * 0.97;
              const ceiling = alloc * 1.03;
              return (
                <div
                  key={sector}
                  className="bg-slate-50 rounded-lg p-3 text-center"
                >
                  <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                    {sector}
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {fmtM(alloc)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Floor: {fmtM(floor)}
                  </p>
                  <p className="text-xs text-slate-400">
                    Ceiling: {fmtM(ceiling)}
                  </p>
                  <p className="text-xs text-sky-600 mt-1 font-semibold">
                    {pcts[i]}% of global budget
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

