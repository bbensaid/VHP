"use client";

import { useState, useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { fmtUSD, fmtNum, fmtPct } from "../HTAStudio.data";

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1 — Budget Impact Model
// ══════════════════════════════════════════════════════════════════════════════

const CONDITIONS = [
  "Diabetes T2",
  "CHF",
  "COPD",
  "Depression",
  "CKD",
  "Oncology",
  "Rare Disease",
  "Hypertension",
];

const UPTAKE_SCENARIOS = {
  Slow: [0.05, 0.15, 0.25, 0.32, 0.38],
  Moderate: [0.1, 0.25, 0.4, 0.5, 0.58],
  Rapid: [0.2, 0.4, 0.6, 0.72, 0.8],
};

interface BIMState {
  interventionName: string;
  condition: string;
  totalPopulation: number;
  eligiblePct: number;
  socCost: number;
  newCost: number;
  uptakeScenario: "Slow" | "Moderate" | "Rapid";
  displacementPct: number;
  hospSavings: boolean;
  hospReductionPct: number;
  costPerHosp: number;
  hospBaseRate: number;
  edSavings: boolean;
  edReductionPct: number;
  costPerED: number;
  edBaseRate: number;
  coveredLives: number;
}

function calcBIM(s: BIMState) {
  const eligible = s.totalPopulation * (s.eligiblePct / 100);
  const uptake = UPTAKE_SCENARIOS[s.uptakeScenario];
  const years = [1, 2, 3, 4, 5];
  let cumulative = 0;
  const rows = years.map((yr, i) => {
    const treated = Math.round(eligible * uptake[i] * (s.displacementPct / 100));
    const drugCost = treated * s.newCost;
    const socOffset = treated * s.socCost;
    let offsetSavings = socOffset;
    if (s.hospSavings) {
      offsetSavings +=
        treated * s.hospBaseRate * (s.hospReductionPct / 100) * s.costPerHosp;
    }
    if (s.edSavings) {
      offsetSavings +=
        treated * s.edBaseRate * (s.edReductionPct / 100) * s.costPerED;
    }
    const net = drugCost - offsetSavings;
    cumulative += net;
    return { yr, treated, drugCost, offsetSavings, net, cumulative };
  });
  const total5yr = rows[4].cumulative;
  const pmpm =
    s.coveredLives > 0
      ? total5yr / s.coveredLives / 60
      : null;
  return { rows, total5yr, pmpm };
}

export function BudgetImpactTab() {
  const [s, setS] = useState<BIMState>({
    interventionName: "New GLP-1 Agent",
    condition: "Diabetes T2",
    totalPopulation: 500000,
    eligiblePct: 30,
    socCost: 4800,
    newCost: 12000,
    uptakeScenario: "Moderate",
    displacementPct: 60,
    hospSavings: true,
    hospReductionPct: 15,
    costPerHosp: 14000,
    hospBaseRate: 0.18,
    edSavings: true,
    edReductionPct: 10,
    costPerED: 2200,
    edBaseRate: 0.35,
    coveredLives: 250000,
  });

  const update = (key: keyof BIMState, val: unknown) =>
    setS((prev) => ({ ...prev, [key]: val }));

  const base = useMemo(() => calcBIM(s), [s]);
  const low = useMemo(
    () => calcBIM({ ...s, uptakeScenario: "Slow" }),
    [s]
  );
  const high = useMemo(
    () => calcBIM({ ...s, uptakeScenario: "Rapid" }),
    [s]
  );

  const over500M = Math.abs(base.total5yr) > 500_000_000;

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white border border-violet-100 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-violet-700 uppercase tracking-wide mb-4">
          Intervention Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Intervention Name
            </label>
            <input
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={s.interventionName}
              onChange={(e) => update("interventionName", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Target Condition
            </label>
            <select
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={s.condition}
              onChange={(e) => update("condition", e.target.value)}
            >
              {CONDITIONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Total Population Size
            </label>
            <input
              type="number"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={s.totalPopulation}
              onChange={(e) => update("totalPopulation", Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Eligible Population (% of total)
            </label>
            <input
              type="number"
              min={1}
              max={100}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={s.eligiblePct}
              onChange={(e) => update("eligiblePct", Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Standard of Care Cost (annual/patient)
            </label>
            <input
              type="number"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={s.socCost}
              onChange={(e) => update("socCost", Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              New Intervention Cost (annual/patient)
            </label>
            <input
              type="number"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={s.newCost}
              onChange={(e) => update("newCost", Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Market Uptake Scenario
            </label>
            <select
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={s.uptakeScenario}
              onChange={(e) =>
                update("uptakeScenario", e.target.value as "Slow" | "Moderate" | "Rapid")
              }
            >
              {Object.keys(UPTAKE_SCENARIOS).map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
            <p className="text-xs text-slate-400 mt-1">
              {s.uptakeScenario}:{" "}
              {UPTAKE_SCENARIOS[s.uptakeScenario]
                .map((v, i) => `Yr${i + 1}: ${fmtPct(v * 100, 0)}`)
                .join(", ")}
            </p>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Displacement: % Switching from SoC
            </label>
            <input
              type="number"
              min={1}
              max={100}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={s.displacementPct}
              onChange={(e) => update("displacementPct", Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Total Covered Lives (for PMPM)
            </label>
            <input
              type="number"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={s.coveredLives}
              onChange={(e) => update("coveredLives", Number(e.target.value))}
            />
          </div>
        </div>

        {/* Offsetting savings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
          {/* Hospitalization */}
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="hosp"
                checked={s.hospSavings}
                onChange={(e) => update("hospSavings", e.target.checked)}
                className="accent-violet-600"
              />
              <label htmlFor="hosp" className="text-sm font-medium text-slate-700">
                Offsetting: Reduced Hospitalizations
              </label>
            </div>
            {s.hospSavings && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    % Reduction
                  </label>
                  <input
                    type="number"
                    className="w-full border border-slate-200 rounded px-2 py-1 text-xs"
                    value={s.hospReductionPct}
                    onChange={(e) =>
                      update("hospReductionPct", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    Cost/Hosp
                  </label>
                  <input
                    type="number"
                    className="w-full border border-slate-200 rounded px-2 py-1 text-xs"
                    value={s.costPerHosp}
                    onChange={(e) =>
                      update("costPerHosp", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    Base Rate/pt
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    className="w-full border border-slate-200 rounded px-2 py-1 text-xs"
                    value={s.hospBaseRate}
                    onChange={(e) =>
                      update("hospBaseRate", Number(e.target.value))
                    }
                  />
                </div>
              </div>
            )}
          </div>
          {/* ED visits */}
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="ed"
                checked={s.edSavings}
                onChange={(e) => update("edSavings", e.target.checked)}
                className="accent-violet-600"
              />
              <label htmlFor="ed" className="text-sm font-medium text-slate-700">
                Offsetting: Reduced ED Visits
              </label>
            </div>
            {s.edSavings && (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    % Reduction
                  </label>
                  <input
                    type="number"
                    className="w-full border border-slate-200 rounded px-2 py-1 text-xs"
                    value={s.edReductionPct}
                    onChange={(e) =>
                      update("edReductionPct", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    Cost/ED Visit
                  </label>
                  <input
                    type="number"
                    className="w-full border border-slate-200 rounded px-2 py-1 text-xs"
                    value={s.costPerED}
                    onChange={(e) =>
                      update("costPerED", Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    Base Rate/pt
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    className="w-full border border-slate-200 rounded px-2 py-1 text-xs"
                    value={s.edBaseRate}
                    onChange={(e) =>
                      update("edBaseRate", Number(e.target.value))
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Affordability alert */}
      {over500M && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" size={18} />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              ICER Affordability Threshold Exceeded
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              The 5-year net budget impact ({fmtUSD(base.total5yr)}) exceeds the
              ICER affordability threshold of $500M. ICER guidance recommends
              policy mechanisms to manage population-level spend.
            </p>
          </div>
        </div>
      )}

      {/* 5-Year Projection Table */}
      <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-violet-50 border-b border-violet-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-violet-800">
            5-Year Budget Impact Projection — {s.interventionName}
          </h3>
          <span className="text-xs text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
            {s.uptakeScenario} Uptake
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[
                  "Year",
                  "Patients Treated",
                  "Drug/Intervention Cost",
                  "Offsetting Savings",
                  "Net Budget Impact",
                  "Cumulative Impact",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {base.rows.map((row) => (
                <tr
                  key={row.yr}
                  className="border-b border-slate-50 hover:bg-violet-50/30 transition-colors"
                >
                  <td className="px-4 py-2.5 font-medium text-slate-700">
                    Year {row.yr}
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">
                    {fmtNum(row.treated)}
                  </td>
                  <td className="px-4 py-2.5 text-slate-600">
                    {fmtUSD(row.drugCost)}
                  </td>
                  <td className="px-4 py-2.5 text-emerald-600">
                    {fmtUSD(row.offsetSavings)}
                  </td>
                  <td
                    className={`px-4 py-2.5 font-medium ${row.net > 0 ? "text-rose-600" : "text-emerald-600"}`}
                  >
                    {fmtUSD(row.net)}
                  </td>
                  <td
                    className={`px-4 py-2.5 font-semibold ${row.cumulative > 0 ? "text-rose-700" : "text-emerald-700"}`}
                  >
                    {fmtUSD(row.cumulative)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Total 5-Year Net Budget Impact</p>
          <p
            className={`text-2xl font-bold ${base.total5yr > 0 ? "text-rose-600" : "text-emerald-600"}`}
          >
            {fmtUSD(base.total5yr)}
          </p>
          <p className="text-xs text-slate-400 mt-1">Base case ({s.uptakeScenario})</p>
        </div>
        <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">Per-Member-Per-Month Impact</p>
          {base.pmpm !== null ? (
            <>
              <p
                className={`text-2xl font-bold ${base.pmpm > 0 ? "text-rose-600" : "text-emerald-600"}`}
              >
                {fmtUSD(base.pmpm)}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Over {fmtNum(s.coveredLives)} covered lives
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-400">Enter covered lives above</p>
          )}
        </div>
        <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">
            Eligible Population (Year 1)
          </p>
          <p className="text-2xl font-bold text-violet-700">
            {fmtNum(Math.round(s.totalPopulation * (s.eligiblePct / 100)))}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {s.eligiblePct}% of {fmtNum(s.totalPopulation)}
          </p>
        </div>
      </div>

      {/* Sensitivity analysis */}
      <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
          <h3 className="text-sm font-semibold text-violet-800">
            Sensitivity Analysis — Uptake Scenario Comparison (5-Year Cumulative)
          </h3>
        </div>
        <div className="p-4">
          {(
            [
              { label: "Slow Uptake", data: low, color: "bg-blue-400" },
              { label: "Moderate Uptake", data: base, color: "bg-violet-500" },
              { label: "Rapid Uptake", data: high, color: "bg-rose-500" },
            ] as const
          ).map(({ label, data, color }) => {
            const maxAbs = Math.max(
              Math.abs(low.total5yr),
              Math.abs(base.total5yr),
              Math.abs(high.total5yr),
              1
            );
            const pct = Math.min(
              100,
              (Math.abs(data.total5yr) / maxAbs) * 100
            );
            return (
              <div key={label} className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-600">
                    {label}
                  </span>
                  <span
                    className={`text-xs font-semibold ${data.total5yr > 0 ? "text-rose-600" : "text-emerald-600"}`}
                  >
                    {fmtUSD(data.total5yr)}
                  </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
