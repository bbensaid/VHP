"use client";

import { useState, useMemo } from "react";
import {
  Building2,
  DollarSign,
  Heart,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { NON_EXPANSION_STATES, fmtM, fmtPct } from "../PolicySimulator.data";
import { StatCard, SelectRow } from "../PolicySimulator.atoms";

export function ExpansionTab() {
  const stateKeys = Object.keys(NON_EXPANSION_STATES);
  const [primaryState, setPrimaryState] = useState("Texas");
  const [compare2, setCompare2] = useState("Florida");
  const [compare3, setCompare3] = useState("Georgia");
  const [expandType, setExpandType] = useState<"full" | "partial">("full");
  const [showComparison, setShowComparison] = useState(false);

  function calcExpansion(
    stateKey: string,
    type: "full" | "partial"
  ) {
    const s = NON_EXPANSION_STATES[stateKey];
    const multiplier = type === "partial" ? 0.6 : 1.0;

    const newEnrollees = Math.round(s.coverageGap * multiplier * 1.1); // 110% take-up
    const perCapitaCost = 6200; // avg new enrollee cost
    const totalCost = newEnrollees * perCapitaCost;
    const federalCost = totalCost * 0.9;
    const stateCost = totalCost * 0.1;

    const ucReduction = s.uncomp * 0.45 * multiplier;
    // Medicaid multiplier: every $1 Medicaid = $1.8 economic activity
    const economicActivity = federalCost * 1.8;
    // Jobs: $1M creates ~10 healthcare jobs
    const jobsCreated = Math.round(federalCost / 1e6 / 10) * 1000; // approximate
    // Net budget: stateCost - ucReduction - medicaidSavings - taxRevenue
    const otherStateSavings = stateCost * 0.15; // savings in mental health, corrections, etc.
    const taxRevenue = economicActivity * 0.04;
    const netBudgetImpact = stateCost - ucReduction - otherStateSavings - taxRevenue;

    const livesSaved = Math.round(newEnrollees / 455);
    const mortalityReduction =
      (livesSaved / (s.population * (s.uninsuredRate / 100))) * 100;

    return {
      newEnrollees,
      federalCost,
      stateCost,
      ucReduction,
      economicActivity,
      jobsCreated,
      netBudgetImpact,
      livesSaved,
      mortalityReduction,
    };
  }

  const primaryResults = useMemo(
    () => calcExpansion(primaryState, expandType),
    [primaryState, expandType]
  );
  const r2 = useMemo(
    () => calcExpansion(compare2, expandType),
    [compare2, expandType]
  );
  const r3 = useMemo(
    () => calcExpansion(compare3, expandType),
    [compare3, expandType]
  );

  const stateOpts = stateKeys.map((k) => ({
    value: k,
    label: NON_EXPANSION_STATES[k].label,
  }));

  function CompareColumn({
    stateKey,
    results,
    highlight = false,
  }: {
    stateKey: string;
    results: ReturnType<typeof calcExpansion>;
    highlight?: boolean;
  }) {
    const s = NON_EXPANSION_STATES[stateKey];
    return (
      <div
        className={`rounded-xl border p-4 flex-1 ${highlight ? "border-sky-400 bg-sky-50/30" : "border-slate-200 bg-white"}`}
      >
        <p
          className={`text-base font-bold mb-3 ${highlight ? "text-sky-700" : "text-slate-700"}`}
        >
          {s.label}
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">Uninsured Rate</span>
            <span className="font-bold text-red-600">
              {fmtPct(s.uninsuredRate)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">Coverage Gap</span>
            <span className="font-bold">
              {s.coverageGap.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">UC Burden</span>
            <span className="font-bold">{fmtM(s.uncomp)}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1 pt-1">
            <span className="text-slate-500 font-semibold">New Enrollees</span>
            <span className="font-bold text-sky-700">
              {results.newEnrollees.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">Federal Cost</span>
            <span className="font-bold text-slate-700">
              {fmtM(results.federalCost)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">State Cost</span>
            <span className="font-bold text-amber-700">
              {fmtM(results.stateCost)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">UC Reduction</span>
            <span className="font-bold text-emerald-700">
              -{fmtM(results.ucReduction)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">Economic Activity</span>
            <span className="font-bold text-emerald-700">
              {fmtM(results.economicActivity)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">Jobs Created</span>
            <span className="font-bold text-emerald-700">
              ~{results.jobsCreated.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500 font-semibold">
              Net Budget Impact
            </span>
            <span
              className={`font-bold ${results.netBudgetImpact <= 0 ? "text-emerald-700" : "text-red-600"}`}
            >
              {results.netBudgetImpact <= 0 ? "-" : "+"}
              {fmtM(Math.abs(results.netBudgetImpact))}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500 font-semibold">Lives Saved/yr</span>
            <span className="font-bold text-sky-700">
              ~{results.livesSaved.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Mortality Reduction</span>
            <span className="font-bold text-sky-700">
              {results.mortalityReduction.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  const s = NON_EXPANSION_STATES[primaryState];

  return (
    <div className="space-y-6">
      {/* Controls row */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <SelectRow
            label="Primary State (Non-Expansion)"
            value={primaryState}
            options={stateOpts}
            onChange={setPrimaryState}
          />
          <div>
            <label className="block ty-body text-slate-600 mb-1">
              Expansion Type
            </label>
            <div className="flex gap-2">
              {(["full", "partial"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setExpandType(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${expandType === t ? "bg-sky-600 text-white border-sky-600" : "bg-white text-slate-600 border-slate-200 hover:border-sky-400"}`}
                >
                  {t === "full" ? "Full (138% FPL)" : "Partial (100% FPL)"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`w-full py-2 rounded-lg text-sm font-semibold border transition-colors ${showComparison ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-400"}`}
            >
              {showComparison ? "Hide" : "Show"} 3-State Comparison
            </button>
          </div>
        </div>
      </div>

      {/* Current status banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <p className="text-sm font-semibold text-red-700 mb-2">
          Current Status — {s.label} (Non-Expansion State)
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-red-500">Uninsured Rate</p>
            <p className="text-2xl font-black text-red-700">
              {fmtPct(s.uninsuredRate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-red-500">Coverage Gap Population</p>
            <p className="text-2xl font-black text-red-700">
              {s.coverageGap.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-red-500">Hospital Uncompensated Care</p>
            <p className="text-2xl font-black text-red-700">
              {fmtM(s.uncomp)}
            </p>
          </div>
        </div>
      </div>

      {/* Primary results */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="New Enrollees"
          value={primaryResults.newEnrollees.toLocaleString()}
          color="sky"
          icon={<Users size={20} />}
        />
        <StatCard
          label="Federal Cost (90% FMAP)"
          value={fmtM(primaryResults.federalCost)}
          color="slate"
          icon={<Building2 size={20} />}
        />
        <StatCard
          label="State Cost (10% FMAP)"
          value={fmtM(primaryResults.stateCost)}
          color="amber"
          icon={<DollarSign size={20} />}
        />
        <StatCard
          label="Net Budget Impact"
          value={`${primaryResults.netBudgetImpact <= 0 ? "-" : "+"}${fmtM(Math.abs(primaryResults.netBudgetImpact))}`}
          sub="After offsets & tax revenue"
          color={primaryResults.netBudgetImpact <= 0 ? "green" : "red"}
          icon={<TrendingDown size={20} />}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="UC Care Reduction"
          value={fmtM(primaryResults.ucReduction)}
          color="green"
          icon={<Building2 size={20} />}
        />
        <StatCard
          label="Economic Activity"
          value={fmtM(primaryResults.economicActivity)}
          color="indigo"
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          label="Estimated Lives Saved/yr"
          value={`~${primaryResults.livesSaved.toLocaleString()}`}
          sub="1 per 455 newly insured"
          color="sky"
          icon={<Heart size={20} />}
        />
        <StatCard
          label="Jobs Created"
          value={`~${primaryResults.jobsCreated.toLocaleString()}`}
          color="green"
          icon={<Users size={20} />}
        />
      </div>

      {/* 3-state comparison */}
      {showComparison && (
        <div>
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <SelectRow
                label="Compare State 2"
                value={compare2}
                options={stateOpts.filter((o) => o.value !== primaryState)}
                onChange={setCompare2}
              />
            </div>
            <div className="flex-1">
              <SelectRow
                label="Compare State 3"
                value={compare3}
                options={stateOpts.filter(
                  (o) => o.value !== primaryState && o.value !== compare2
                )}
                onChange={setCompare3}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <CompareColumn
              stateKey={primaryState}
              results={primaryResults}
              highlight
            />
            <CompareColumn stateKey={compare2} results={r2} />
            <CompareColumn stateKey={compare3} results={r3} />
          </div>
        </div>
      )}

      {/* Methodology note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs text-slate-500">
          <span className="font-semibold">Methodology:</span> Enrollment based
          on Kaiser Family Foundation coverage gap estimates. Federal/state cost
          split assumes 90% FMAP for ACA expansion population. Lives saved
          estimate from Sommers et al. (2012, 2014) mortality studies (~1 per
          455 newly insured). Economic multiplier of 1.8x from Dranove et al.
          Net budget impact = state cost − hospital UC reduction − other program
          savings (15% of state cost) − income/sales tax revenue (4% of
          economic activity).
        </p>
      </div>
    </div>
  );
}

