"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Calculator,
  BarChart2,
  Activity,
  FlaskConical,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Minus,
  Play,
  RefreshCw,
} from "lucide-react";

// ─── Utility formatters ────────────────────────────────────────────────────────
function fmtUSD(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000)
    return (n < 0 ? "-$" : "$") + (abs / 1_000_000_000).toFixed(2) + "B";
  if (abs >= 1_000_000)
    return (n < 0 ? "-$" : "$") + (abs / 1_000_000).toFixed(2) + "M";
  return (
    (n < 0 ? "-$" : "$") +
    abs.toLocaleString("en-US", { maximumFractionDigits: 0 })
  );
}

function fmtNum(n: number, d = 0): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

function fmtPct(n: number, d = 1): string {
  return n.toFixed(d) + "%";
}

// ─── Tab definitions ───────────────────────────────────────────────────────────
const TABS = [
  { id: "bim", label: "Budget Impact Model", icon: Calculator },
  { id: "mcda", label: "MCDA", icon: BarChart2 },
  { id: "psa", label: "Probabilistic SA", icon: Activity },
  { id: "threshold", label: "Threshold & Surrogate", icon: FlaskConical },
];

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

function BudgetImpactTab() {
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

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2 — Multi-Criteria Decision Analysis (MCDA)
// ══════════════════════════════════════════════════════════════════════════════

const CRITERIA = [
  {
    id: "effectiveness",
    label: "Clinical Effectiveness",
    desc: "Strength of clinical trial evidence",
    defaultWeight: 25,
    anchors: ["1 = No evidence", "5 = Moderate RCT", "10 = Multiple RCTs, strong effect"],
  },
  {
    id: "safety",
    label: "Safety Profile",
    desc: "Adverse event burden",
    defaultWeight: 15,
    anchors: ["1 = Serious AEs common", "5 = Manageable AEs", "10 = Excellent safety"],
  },
  {
    id: "costEffectiveness",
    label: "Cost-Effectiveness",
    desc: "ICER relative to WTP threshold",
    defaultWeight: 20,
    anchors: ["1 = ICER >$300K", "5 = ICER ~$150K", "10 = ICER <$50K"],
  },
  {
    id: "budgetImpact",
    label: "Budget Impact",
    desc: "Magnitude of payer budget impact",
    defaultWeight: 10,
    anchors: ["1 = >$1B/yr", "5 = $100M-500M", "10 = <$10M/yr"],
  },
  {
    id: "equity",
    label: "Equity Impact",
    desc: "Benefits for disadvantaged populations",
    defaultWeight: 10,
    anchors: ["1 = Worsens disparities", "5 = Neutral", "10 = Strongly reduces disparities"],
  },
  {
    id: "patientPref",
    label: "Patient Preference / QoL",
    desc: "Patient-reported outcomes and quality of life",
    defaultWeight: 8,
    anchors: ["1 = Poor QoL / patient burden", "5 = Moderate improvement", "10 = Major QoL benefit"],
  },
  {
    id: "feasibility",
    label: "Implementation Feasibility",
    desc: "Ease of adoption in health systems",
    defaultWeight: 7,
    anchors: ["1 = Major infrastructure needed", "5 = Moderate changes", "10 = Plug-and-play"],
  },
  {
    id: "innovation",
    label: "Innovation / Unmet Need",
    desc: "Addresses gap with no current alternatives",
    defaultWeight: 5,
    anchors: ["1 = Many alternatives exist", "5 = Some alternatives", "10 = First-in-class / orphan"],
  },
];

interface Alternative {
  name: string;
  scores: Record<string, number>;
}

function MCDATab() {
  const [weights, setWeights] = useState<Record<string, number>>(
    Object.fromEntries(CRITERIA.map((c) => [c.id, c.defaultWeight]))
  );
  const [alternatives, setAlternatives] = useState<Alternative[]>([
    {
      name: "Intervention A",
      scores: Object.fromEntries(CRITERIA.map((c) => [c.id, 7])),
    },
    {
      name: "Intervention B",
      scores: Object.fromEntries(CRITERIA.map((c) => [c.id, 5])),
    },
    {
      name: "Intervention C",
      scores: Object.fromEntries(CRITERIA.map((c) => [c.id, 3])),
    },
  ]);
  const [activeAlt, setActiveAlt] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  const mcdaScores = useMemo(
    () =>
      alternatives.map((alt) => {
        const weighted = CRITERIA.reduce((sum, c) => {
          return sum + (alt.scores[c.id] * weights[c.id]) / 100;
        }, 0);
        return { ...alt, total: weighted };
      }),
    [alternatives, weights]
  );

  const updateWeight = (id: string, val: number) =>
    setWeights((prev) => ({ ...prev, [id]: val }));

  const updateScore = (altIdx: number, criterionId: string, val: number) => {
    setAlternatives((prev) => {
      const next = [...prev];
      next[altIdx] = {
        ...next[altIdx],
        scores: { ...next[altIdx].scores, [criterionId]: val },
      };
      return next;
    });
  };

  const updateAltName = (idx: number, name: string) =>
    setAlternatives((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], name };
      return next;
    });

  const altColors = ["violet", "blue", "emerald"] as const;
  const colorMap = {
    violet: {
      bg: "bg-violet-500",
      light: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
      badge: "bg-violet-100 text-violet-800",
    },
    blue: {
      bg: "bg-blue-500",
      light: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-800",
    },
    emerald: {
      bg: "bg-emerald-500",
      light: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-800",
    },
  };

  function decisionCategory(score: number) {
    if (score >= 7) return { label: "Recommend", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (score >= 5) return { label: "Conditional", color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { label: "Do Not Recommend", color: "text-rose-600 bg-rose-50 border-rose-200" };
  }

  return (
    <div className="space-y-6">
      {/* Weight editor */}
      <div className="bg-white border border-violet-100 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-violet-700 uppercase tracking-wide">
            Criterion Weights
          </h3>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${Math.abs(totalWeight - 100) < 0.5 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
          >
            Total: {totalWeight.toFixed(0)}%{" "}
            {Math.abs(totalWeight - 100) < 0.5 ? "(valid)" : "(must = 100%)"}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CRITERIA.map((c) => (
            <div key={c.id} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-medium text-slate-700">
                    {c.label}
                  </span>
                  <span className="text-xs font-semibold text-violet-600">
                    {weights[c.id]}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={weights[c.id]}
                  onChange={(e) => updateWeight(c.id, Number(e.target.value))}
                  className="w-full accent-violet-600 h-1.5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative tabs */}
      <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 flex items-center gap-0 px-4 pt-3">
          {alternatives.map((alt, i) => (
            <button
              key={i}
              onClick={() => setActiveAlt(i)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${activeAlt === i ? `border-${altColors[i]}-500 text-${altColors[i]}-700` : "border-transparent text-slate-500 hover:text-slate-700"}`}
            >
              {alt.name}
            </button>
          ))}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="ml-auto text-xs text-violet-600 hover:text-violet-800 px-3 py-1 rounded-full bg-violet-50 hover:bg-violet-100 transition-colors"
          >
            {showComparison ? "Hide" : "Show"} Comparison
          </button>
        </div>

        <div className="p-5">
          <div className="mb-4">
            <input
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-400"
              value={alternatives[activeAlt].name}
              onChange={(e) => updateAltName(activeAlt, e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {CRITERIA.map((c) => {
              const score = alternatives[activeAlt].scores[c.id];
              const weighted = (score * weights[c.id]) / 100;
              return (
                <div key={c.id}>
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <span className="text-sm font-medium text-slate-700">
                        {c.label}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">
                        ({c.desc})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-500">
                        Score: {score}/10
                      </span>
                      <span className="text-xs font-semibold text-violet-600">
                        Weighted: {weighted.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={score}
                      onChange={(e) =>
                        updateScore(activeAlt, c.id, Number(e.target.value))
                      }
                      className="flex-1 accent-violet-600 h-2"
                    />
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden shrink-0">
                      <div
                        className="h-full bg-violet-500 rounded-full"
                        style={{ width: `${(score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {c.anchors[0]} · {c.anchors[1]} · {c.anchors[2]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comparison table */}
      {showComparison && (
        <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
            <h3 className="text-sm font-semibold text-violet-800">
              Side-by-Side MCDA Comparison
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-600 w-48">
                    Criterion
                  </th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-slate-500">
                    Weight
                  </th>
                  {alternatives.map((alt, i) => (
                    <th
                      key={i}
                      className={`px-4 py-2.5 text-xs font-semibold ${colorMap[altColors[i]].text}`}
                    >
                      {alt.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CRITERIA.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-4 py-2 text-xs text-slate-700">
                      {c.label}
                    </td>
                    <td className="px-4 py-2 text-xs text-center text-slate-500">
                      {weights[c.id]}%
                    </td>
                    {alternatives.map((alt, i) => {
                      const s = alt.scores[c.id];
                      const best = Math.max(...alternatives.map((a) => a.scores[c.id]));
                      return (
                        <td key={i} className="px-4 py-2 text-xs text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded font-medium ${s === best ? colorMap[altColors[i]].badge : "text-slate-600"}`}
                          >
                            {s}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="border-t-2 border-violet-200 bg-violet-50">
                  <td className="px-4 py-2.5 text-sm font-bold text-violet-800">
                    MCDA Total Score
                  </td>
                  <td className="px-4 py-2.5" />
                  {mcdaScores.map((alt, i) => {
                    const cat = decisionCategory(alt.total);
                    return (
                      <td key={i} className="px-4 py-2.5 text-center">
                        <div className="text-base font-bold text-violet-900">
                          {(alt.total).toFixed(2)}/10
                        </div>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded border font-medium ${cat.color}`}
                        >
                          {cat.label}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bar chart visualization */}
      <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-violet-50 border-b border-violet-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-violet-800">
            Criterion Scores — {alternatives[activeAlt].name}
          </h3>
          <span className="text-xs text-violet-600">
            MCDA Total:{" "}
            <strong>{mcdaScores[activeAlt].total.toFixed(2)}</strong>/10
          </span>
        </div>
        <div className="p-5 space-y-2">
          {CRITERIA.map((c) => {
            const raw = alternatives[activeAlt].scores[c.id];
            const weighted = (raw * weights[c.id]) / 100;
            return (
              <div key={c.id} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-40 shrink-0 text-right">
                  {c.label}
                </span>
                <div className="flex-1 flex gap-1 items-center">
                  <div className="flex-1 h-4 bg-slate-100 rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-violet-200 rounded-sm"
                      style={{ width: `${(raw / 10) * 100}%` }}
                    />
                  </div>
                  <div className="flex-1 h-4 bg-slate-100 rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-violet-600 rounded-sm"
                      style={{ width: `${(weighted / 10) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-slate-400 w-24 shrink-0">
                  {raw}/10 → {weighted.toFixed(2)}
                </span>
              </div>
            );
          })}
          <div className="flex items-center gap-3 pt-2 border-t border-slate-100 mt-2">
            <span className="text-xs w-40 shrink-0 text-right" />
            <div className="flex gap-4 flex-1">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-violet-200" />
                <span className="text-xs text-slate-500">Unweighted score</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-violet-600" />
                <span className="text-xs text-slate-500">Weighted score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2×2 Decision Grid */}
      <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
          <h3 className="text-sm font-semibold text-violet-800">
            Decision Support Matrix — Cost-Effectiveness vs MCDA Score
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            X-axis: cost-effectiveness score; Y-axis: overall MCDA score
          </p>
        </div>
        <div className="p-5">
          <div
            className="relative border border-slate-200 rounded-xl overflow-hidden"
            style={{ height: 280 }}
          >
            {/* Quadrant labels */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
              <div className="flex items-center justify-center text-xs font-medium text-amber-500 opacity-60 border-b border-r border-dashed border-slate-200">
                Low CE, High MCDA
              </div>
              <div className="flex items-center justify-center text-xs font-medium text-emerald-600 opacity-60 border-b border-l border-dashed border-slate-200">
                High CE, High MCDA
                <br />
                ✓ Recommend
              </div>
              <div className="flex items-center justify-center text-xs font-medium text-rose-500 opacity-60 border-t border-r border-dashed border-slate-200">
                Low CE, Low MCDA
              </div>
              <div className="flex items-center justify-center text-xs font-medium text-blue-500 opacity-60 border-t border-l border-dashed border-slate-200">
                High CE, Low MCDA
              </div>
            </div>

            {/* Axis labels */}
            <div className="absolute bottom-1 left-0 right-0 flex justify-between px-4 pointer-events-none">
              <span className="text-xs text-slate-400">Low Cost-Effectiveness</span>
              <span className="text-xs text-slate-400">High Cost-Effectiveness →</span>
            </div>

            {/* Dots */}
            {mcdaScores.map((alt, i) => {
              const ceScore = alternatives[i].scores["costEffectiveness"];
              const mcda = alt.total;
              const xPct = (ceScore / 10) * 100;
              const yPct = 100 - (mcda / 10) * 100;
              return (
                <div
                  key={i}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `calc(${xPct}% - 24px)`,
                    top: `calc(${yPct}% - 24px)`,
                  }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md border-2 border-white ${altColors[i] === "violet" ? "bg-violet-500" : altColors[i] === "blue" ? "bg-blue-500" : "bg-emerald-500"}`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-xs font-medium text-slate-600 whitespace-nowrap mt-0.5">
                    {alt.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3 — Probabilistic Sensitivity Analysis (Monte Carlo)
// ══════════════════════════════════════════════════════════════════════════════

type DistType = "Normal" | "Beta" | "Gamma" | "Log-normal";

interface PSAParam {
  mean: number;
  sd: number;
  dist: DistType;
}

interface PSAInputs {
  intCost: PSAParam;
  compCost: PSAParam;
  intQALY: PSAParam;
  compQALY: PSAParam;
}

interface PSAResults {
  icers: number[];
  meanICER: number;
  ciLow: number;
  ciHigh: number;
  ceProb: Record<number, number>;
  nmb100k: number;
  tornadoRows: { label: string; low: number; high: number; base: number }[];
}

// Box-Muller normal sampler
function sampleNormal(mean: number, sd: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + sd * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Gamma sampler (Marsaglia-Tsang method, shape k = (mean/sd)^2, scale = sd^2/mean)
function sampleGamma(mean: number, sd: number): number {
  if (mean <= 0 || sd <= 0) return mean;
  const k = (mean / sd) ** 2;
  const theta = (sd ** 2) / mean;
  if (k < 1) {
    const g = sampleGamma(mean + sd * Math.sqrt(1 / k), sd);
    return g * Math.pow(Math.random(), 1 / k);
  }
  const d = k - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x = sampleNormal(0, 1);
    let v = 1 + c * x;
    if (v <= 0) continue;
    v = v * v * v;
    const u = Math.random();
    if (u < 1 - 0.0331 * (x * x) * (x * x)) return d * v * theta;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v)))
      return d * v * theta;
  }
}

// Beta sampler via Gamma
function sampleBeta(mean: number, sd: number): number {
  if (mean <= 0 || mean >= 1) return Math.max(0.001, Math.min(0.999, mean));
  const varClamped = Math.min(sd * sd, mean * (1 - mean) * 0.99);
  const alpha = mean * (mean * (1 - mean) / varClamped - 1);
  const beta = (1 - mean) * (mean * (1 - mean) / varClamped - 1);
  const ga = sampleGamma(alpha, Math.sqrt(alpha));
  const gb = sampleGamma(beta, Math.sqrt(beta));
  return ga / (ga + gb);
}

function sampleLogNormal(mean: number, sd: number): number {
  const mu = Math.log(mean ** 2 / Math.sqrt(sd ** 2 + mean ** 2));
  const sigma = Math.sqrt(Math.log(1 + sd ** 2 / mean ** 2));
  return Math.exp(sampleNormal(mu, sigma));
}

function sample(p: PSAParam): number {
  switch (p.dist) {
    case "Normal":
      return sampleNormal(p.mean, p.sd);
    case "Beta":
      return sampleBeta(p.mean, p.sd);
    case "Gamma":
      return sampleGamma(p.mean, p.sd);
    case "Log-normal":
      return sampleLogNormal(p.mean, p.sd);
  }
}

const WTP_THRESHOLDS_PSA = [50000, 100000, 150000, 200000];

function PSATab() {
  const [inputs, setInputs] = useState<PSAInputs>({
    intCost: { mean: 45000, sd: 8000, dist: "Gamma" },
    compCost: { mean: 12000, sd: 3000, dist: "Gamma" },
    intQALY: { mean: 0.85, sd: 0.12, dist: "Beta" },
    compQALY: { mean: 0.62, sd: 0.10, dist: "Beta" },
  });
  const [results, setResults] = useState<PSAResults | null>(null);
  const [running, setRunning] = useState(false);
  const [iterations] = useState(1000);

  const updateParam = (
    key: keyof PSAInputs,
    field: keyof PSAParam,
    val: number | DistType
  ) => {
    setInputs((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: val },
    }));
  };

  const runSimulation = useCallback(() => {
    setRunning(true);
    setTimeout(() => {
      // Run 1000 Monte Carlo iterations
      const icers: number[] = [];
      for (let i = 0; i < iterations; i++) {
        const ic = Math.max(0, sample(inputs.intCost));
        const cc = Math.max(0, sample(inputs.compCost));
        const iq = Math.max(0.001, sample(inputs.intQALY));
        const cq = Math.max(0.001, sample(inputs.compQALY));
        const deltaCost = ic - cc;
        const deltaQALY = iq - cq;
        const icer = deltaQALY !== 0 ? deltaCost / deltaQALY : Infinity;
        icers.push(icer);
      }

      // Sort for CI
      const sorted = [...icers].filter((v) => isFinite(v)).sort((a, b) => a - b);
      const n = sorted.length;
      const meanICER = sorted.reduce((s, v) => s + v, 0) / n;
      const ciLow = sorted[Math.floor(n * 0.025)];
      const ciHigh = sorted[Math.floor(n * 0.975)];

      // CE probability at thresholds
      const ceProb: Record<number, number> = {};
      WTP_THRESHOLDS_PSA.forEach((wtp) => {
        ceProb[wtp] = icers.filter((v) => v <= wtp).length / iterations;
      });

      // NMB at $100K
      const intCostBase = inputs.intCost.mean;
      const compCostBase = inputs.compCost.mean;
      const intQBase = inputs.intQALY.mean;
      const compQBase = inputs.compQALY.mean;
      const nmb100k =
        100000 * (intQBase - compQBase) - (intCostBase - compCostBase);

      // Tornado — deterministic SA, vary each parameter ±20%
      const baseICER =
        (intCostBase - compCostBase) /
        Math.max(0.001, intQBase - compQBase);

      const tornadoRows = [
        {
          label: "Intervention Cost",
          low:
            (intCostBase * 0.8 - compCostBase) /
            Math.max(0.001, intQBase - compQBase),
          high:
            (intCostBase * 1.2 - compCostBase) /
            Math.max(0.001, intQBase - compQBase),
          base: baseICER,
        },
        {
          label: "Comparator Cost",
          low:
            (intCostBase - compCostBase * 0.8) /
            Math.max(0.001, intQBase - compQBase),
          high:
            (intCostBase - compCostBase * 1.2) /
            Math.max(0.001, intQBase - compQBase),
          base: baseICER,
        },
        {
          label: "Intervention QALYs",
          low:
            (intCostBase - compCostBase) /
            Math.max(0.001, intQBase * 0.8 - compQBase),
          high:
            (intCostBase - compCostBase) /
            Math.max(0.001, intQBase * 1.2 - compQBase),
          base: baseICER,
        },
        {
          label: "Comparator QALYs",
          low:
            (intCostBase - compCostBase) /
            Math.max(0.001, intQBase - compQBase * 0.8),
          high:
            (intCostBase - compCostBase) /
            Math.max(0.001, intQBase - compQBase * 1.2),
          base: baseICER,
        },
      ].sort((a, b) => {
        const rangeA = Math.abs(a.high - a.low);
        const rangeB = Math.abs(b.high - b.low);
        return rangeB - rangeA;
      });

      setResults({ icers, meanICER, ciLow, ciHigh, ceProb, nmb100k, tornadoRows });
      setRunning(false);
    }, 50);
  }, [inputs, iterations]);

  const DIST_OPTIONS: DistType[] = ["Normal", "Beta", "Gamma", "Log-normal"];

  const paramRows: { key: keyof PSAInputs; label: string }[] = [
    { key: "intCost", label: "Intervention Cost ($)" },
    { key: "compCost", label: "Comparator Cost ($)" },
    { key: "intQALY", label: "Intervention QALYs" },
    { key: "compQALY", label: "Comparator QALYs" },
  ];

  // CEAC data points
  const ceacPoints = useMemo(() => {
    if (!results) return [];
    const wtps = [0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 250000, 300000];
    return wtps.map((wtp) => ({
      wtp,
      prob: results.icers.filter((v) => v <= wtp).length / iterations,
    }));
  }, [results, iterations]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white border border-violet-100 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-violet-700 uppercase tracking-wide mb-4">
          Base Case Parameters
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                  Parameter
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                  Mean
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                  Std. Deviation
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                  Distribution
                </th>
              </tr>
            </thead>
            <tbody>
              {paramRows.map(({ key, label }) => (
                <tr key={key} className="border-b border-slate-50">
                  <td className="px-3 py-2 text-slate-700 font-medium whitespace-nowrap">
                    {label}
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      step={key.includes("QALY") ? 0.01 : 1000}
                      className="w-28 border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                      value={inputs[key].mean}
                      onChange={(e) =>
                        updateParam(key, "mean", Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      step={key.includes("QALY") ? 0.01 : 500}
                      className="w-28 border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                      value={inputs[key].sd}
                      onChange={(e) =>
                        updateParam(key, "sd", Number(e.target.value))
                      }
                    />
                  </td>
                  <td className="px-3 py-2">
                    <select
                      className="border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                      value={inputs[key].dist}
                      onChange={(e) =>
                        updateParam(key, "dist", e.target.value as DistType)
                      }
                    >
                      {DIST_OPTIONS.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={runSimulation}
            disabled={running}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {running ? (
              <RefreshCw size={15} className="animate-spin" />
            ) : (
              <Play size={15} />
            )}
            {running ? "Running..." : `Run ${iterations.toLocaleString()} Iterations`}
          </button>
          <p className="text-xs text-slate-400">
            Monte Carlo simulation using Math.random() — samples from specified
            distributions for each parameter
          </p>
        </div>
      </div>

      {results && (
        <>
          {/* Key results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 mb-1">Mean ICER</p>
              <p className="text-xl font-bold text-violet-700">
                {results.meanICER < 0
                  ? "Dominant"
                  : fmtUSD(results.meanICER) + "/QALY"}
              </p>
            </div>
            <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 mb-1">95% Credible Interval</p>
              <p className="text-sm font-bold text-slate-700">
                {fmtUSD(results.ciLow)} — {fmtUSD(results.ciHigh)}
              </p>
            </div>
            <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 mb-1">
                Prob. CE at $100K WTP
              </p>
              <p className="text-xl font-bold text-emerald-600">
                {fmtPct(results.ceProb[100000] * 100)}
              </p>
            </div>
            <div className="bg-white border border-violet-100 rounded-xl p-4 shadow-sm">
              <p className="text-xs text-slate-500 mb-1">NMB at $100K WTP</p>
              <p
                className={`text-xl font-bold ${results.nmb100k >= 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                {fmtUSD(results.nmb100k)}
              </p>
            </div>
          </div>

          {/* CE probability table */}
          <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
              <h3 className="text-sm font-semibold text-violet-800">
                Cost-Effectiveness Probability at WTP Thresholds
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {WTP_THRESHOLDS_PSA.map((wtp) => {
                  const prob = results.ceProb[wtp];
                  return (
                    <div key={wtp} className="border border-slate-100 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-1">
                        WTP = {fmtUSD(wtp)}/QALY
                      </p>
                      <p
                        className={`text-lg font-bold ${prob >= 0.5 ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        {fmtPct(prob * 100)}
                      </p>
                      <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${prob >= 0.5 ? "bg-emerald-400" : "bg-rose-400"}`}
                          style={{ width: `${prob * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CEAC */}
          <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
              <h3 className="text-sm font-semibold text-violet-800">
                Cost-Effectiveness Acceptability Curve (CEAC)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Proportion of iterations where intervention is cost-effective at
                each WTP threshold
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">
                      WTP Threshold
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">
                      % Cost-Effective
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 w-48">
                      Visualization
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ceacPoints.map(({ wtp, prob }) => (
                    <tr key={wtp} className="border-b border-slate-50 hover:bg-violet-50/30">
                      <td className="px-4 py-2 text-slate-700 font-medium">
                        {wtp === 0 ? "$0" : fmtUSD(wtp)}
                      </td>
                      <td
                        className={`px-4 py-2 font-semibold ${prob >= 0.5 ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        {fmtPct(prob * 100)}
                      </td>
                      <td className="px-4 py-2">
                        <div className="h-3 w-44 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${prob >= 0.5 ? "bg-violet-500" : "bg-rose-300"}`}
                            style={{ width: `${prob * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tornado Diagram */}
          <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
              <h3 className="text-sm font-semibold text-violet-800">
                Tornado Diagram — Deterministic Sensitivity Analysis (±20%)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Parameters sorted by influence on base-case ICER
              </p>
            </div>
            <div className="p-5 space-y-4">
              {results.tornadoRows.map((row) => {
                const allVals = results.tornadoRows.flatMap((r) => [
                  r.low, r.high,
                ]).filter(isFinite);
                const absMax = Math.max(...allVals.map(Math.abs), 1);
                const lowPct = isFinite(row.low)
                  ? Math.min(100, (Math.abs(row.low) / absMax) * 50)
                  : 50;
                const highPct = isFinite(row.high)
                  ? Math.min(100, (Math.abs(row.high) / absMax) * 50)
                  : 50;
                const lowLeft = row.low < row.base;
                return (
                  <div key={row.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-700 w-40">
                        {row.label}
                      </span>
                      <span className="text-xs text-slate-400">
                        Low:{" "}
                        {isFinite(row.low)
                          ? fmtUSD(row.low) + "/QALY"
                          : "N/A"}{" "}
                        | High:{" "}
                        {isFinite(row.high)
                          ? fmtUSD(row.high) + "/QALY"
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex h-5 rounded-full overflow-hidden bg-slate-100">
                      <div
                        className="bg-blue-300 h-full"
                        style={{ width: `${lowLeft ? highPct : lowPct}%` }}
                      />
                      <div className="w-0.5 bg-slate-400 h-full" />
                      <div
                        className="bg-violet-400 h-full"
                        style={{ width: `${lowLeft ? lowPct : highPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-blue-300" />
                  <span className="text-xs text-slate-500">Low value (−20%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-violet-400" />
                  <span className="text-xs text-slate-500">High value (+20%)</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!results && !running && (
        <div className="bg-violet-50 border border-violet-100 rounded-xl p-8 text-center">
          <Activity size={36} className="text-violet-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-violet-700">
            Configure parameters above and click Run Simulation
          </p>
          <p className="text-xs text-violet-400 mt-1">
            1,000 Monte Carlo iterations will be computed in your browser
          </p>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4 — Threshold & Surrogate Endpoint Analysis
// ══════════════════════════════════════════════════════════════════════════════

const SURROGATE_ENDPOINTS = [
  {
    id: "hba1c",
    label: "HbA1c Reduction (%)",
    unit: "% reduction",
    qalyPerUnit: 0.04,
    clinicalFactor: 0.21,
    clinicalEvent: "reduction in diabetes complications",
    validationStrength: "Strong" as const,
    note: "UKPDS meta-analysis: each 1% HbA1c reduction → 0.04 QALY gain",
    studies: [
      "UKPDS 35 (BMJ 2000)",
      "Stratton et al. (BMJ 2000)",
      "ACCORD, ADVANCE trials",
    ],
  },
  {
    id: "ldl",
    label: "LDL Reduction (mmol/L)",
    unit: "mmol/L reduction",
    qalyPerUnit: 0.05,
    clinicalFactor: 0.22,
    clinicalEvent: "reduction in major CV events",
    validationStrength: "Strong" as const,
    note: "CTT Collaboration: each 1 mmol/L LDL reduction → 22% CV event reduction",
    studies: [
      "CTT Collaboration (Lancet 2010)",
      "FOURIER trial",
      "ODYSSEY OUTCOMES",
    ],
  },
  {
    id: "sbp",
    label: "Systolic BP Reduction (mmHg)",
    unit: "mmHg reduction",
    qalyPerUnit: 0.01,
    clinicalFactor: 0.02,
    clinicalEvent: "reduction in stroke risk per 5 mmHg",
    validationStrength: "Strong" as const,
    note: "BPLTTC: 5 mmHg SBP reduction → ~10% stroke risk reduction",
    studies: [
      "BPLTTC (Lancet 2021)",
      "SPRINT trial",
      "HOT trial meta-analysis",
    ],
  },
  {
    id: "pfs",
    label: "Progression-Free Survival (months)",
    unit: "months PFS gain",
    qalyPerUnit: 0.035,
    clinicalFactor: 0.18,
    clinicalEvent: "improvement in OS (uncertain correlation)",
    validationStrength: "Moderate" as const,
    note: "PFS-OS correlation varies by tumor type; modest overall. ~0.035 QALY/month PFS.",
    studies: [
      "Prasad & Gale (JAMA Oncol 2016)",
      "Buyse et al. surrogate analysis",
      "FDA 2021 surrogate endpoint table",
    ],
  },
  {
    id: "tumor_response",
    label: "Tumor Response Rate (%)",
    unit: "% ORR increase",
    qalyPerUnit: 0.003,
    clinicalFactor: 0.12,
    clinicalEvent: "improvement in OS (weak correlation)",
    validationStrength: "Weak" as const,
    note: "ORR-OS correlation weak in most solid tumors. 1% ORR increase ≈ 0.003 QALY.",
    studies: [
      "Kemp et al. (BMJ 2015)",
      "Haslam et al. (JAMA Oncol 2019)",
    ],
  },
  {
    id: "cd4",
    label: "CD4 Count Increase (cells/μL)",
    unit: "cells/μL gain",
    qalyPerUnit: 0.0003,
    clinicalFactor: 0.015,
    clinicalEvent: "reduction in AIDS-defining events",
    validationStrength: "Strong" as const,
    note: "HIV: CD4 increase strongly predicts clinical outcomes. Per 100 cells/μL.",
    studies: [
      "CASCADE Collaboration",
      "START trial",
      "TEMPRANO trial",
    ],
  },
  {
    id: "egfr",
    label: "eGFR Change (mL/min/1.73m²)",
    unit: "mL/min/1.73m² improvement",
    qalyPerUnit: 0.006,
    clinicalFactor: 0.08,
    clinicalEvent: "reduction in kidney failure risk",
    validationStrength: "Moderate" as const,
    note: "CKD: eGFR slope predicts ESRD. Each 1 mL/min improvement ≈ 0.006 QALY.",
    studies: [
      "CREDENCE trial",
      "DAPA-CKD trial",
      "Thompson et al. (CJASN 2019)",
    ],
  },
  {
    id: "bone_density",
    label: "Bone Density (T-score change)",
    unit: "T-score improvement",
    qalyPerUnit: 0.02,
    clinicalFactor: 0.30,
    clinicalEvent: "reduction in fracture risk",
    validationStrength: "Moderate" as const,
    note: "Osteoporosis: 1 SD T-score improvement → ~30% fracture risk reduction.",
    studies: [
      "Kanis et al. (Osteoporosis Int 2008)",
      "FRAX validation studies",
      "HORIZON trial",
    ],
  },
];

const VALIDATION_COLORS = {
  Strong: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Moderate: "bg-amber-100 text-amber-700 border-amber-200",
  Weak: "bg-rose-100 text-rose-700 border-rose-200",
};

function ThresholdTab() {
  // Price-effectiveness threshold
  const [drugName, setDrugName] = useState("Novel SGLT2 Inhibitor");
  const [qalyGain, setQalyGain] = useState(0.15);
  const [wtp, setWtp] = useState(100000);
  const [listPrice, setListPrice] = useState(18000);
  const [comparatorCost, setComparatorCost] = useState(3000);

  // Surrogate endpoint
  const [selectedSurrogate, setSelectedSurrogate] = useState(
    SURROGATE_ENDPOINTS[0].id
  );
  const [surrogateChange, setSurrogateChange] = useState(1.0);

  const endpoint = SURROGATE_ENDPOINTS.find((e) => e.id === selectedSurrogate)!;

  const maxCEPrice = wtp * qalyGain + comparatorCost;
  const discount =
    listPrice > 0
      ? Math.max(0, ((listPrice - maxCEPrice) / listPrice) * 100)
      : 0;
  const isCE = listPrice <= maxCEPrice;

  const estimatedQALY = surrogateChange * endpoint.qalyPerUnit;
  const clinicalBenefit = surrogateChange * endpoint.clinicalFactor;

  return (
    <div className="space-y-6">
      {/* Price-effectiveness threshold */}
      <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
          <h3 className="text-sm font-semibold text-violet-800">
            Price-Effectiveness Threshold Calculator
          </h3>
          <p className="text-xs text-violet-500 mt-0.5">
            Maximum price at which an intervention is cost-effective at a given
            WTP
          </p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Drug / Intervention Name
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                QALY Gain Estimate (from trials)
              </label>
              <input
                type="number"
                step={0.01}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={qalyGain}
                onChange={(e) => setQalyGain(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                WTP Threshold ($/QALY)
              </label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={wtp}
                onChange={(e) => setWtp(Number(e.target.value))}
              >
                {[50000, 100000, 150000, 200000].map((v) => (
                  <option key={v} value={v}>
                    ${v.toLocaleString()}/QALY
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Comparator Cost (annual, $)
              </label>
              <input
                type="number"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={comparatorCost}
                onChange={(e) => setComparatorCost(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Manufacturer List Price (annual, $)
              </label>
              <input
                type="number"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={listPrice}
                onChange={(e) => setListPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Results */}
          <div
            className={`rounded-xl border-2 p-5 ${isCE ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}
          >
            <div className="flex items-start gap-3 mb-4">
              {isCE ? (
                <CheckCircle
                  className="text-emerald-500 mt-0.5 shrink-0"
                  size={20}
                />
              ) : (
                <AlertTriangle
                  className="text-rose-500 mt-0.5 shrink-0"
                  size={20}
                />
              )}
              <div>
                <p
                  className={`text-base font-semibold ${isCE ? "text-emerald-800" : "text-rose-800"}`}
                >
                  {isCE
                    ? `${drugName} IS cost-effective at ${fmtUSD(wtp)}/QALY WTP`
                    : `${drugName} is NOT cost-effective at ${fmtUSD(wtp)}/QALY WTP`}
                </p>
                <p
                  className={`text-sm mt-1 ${isCE ? "text-emerald-700" : "text-rose-700"}`}
                >
                  At {fmtUSD(wtp)}/QALY WTP with {qalyGain} QALYs gained, this
                  intervention is cost-effective if priced below{" "}
                  <strong>{fmtUSD(maxCEPrice)}</strong> per year.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <p className="text-xs text-slate-500 mb-0.5">CE Price Ceiling</p>
                <p className="text-xl font-bold text-violet-700">
                  {fmtUSD(maxCEPrice)}/yr
                </p>
                <p className="text-xs text-slate-400">
                  = {fmtUSD(wtp)} × {qalyGain} QALYs + {fmtUSD(comparatorCost)}{" "}
                  SoC cost
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <p className="text-xs text-slate-500 mb-0.5">
                  Manufacturer List Price
                </p>
                <p className="text-xl font-bold text-slate-700">
                  {fmtUSD(listPrice)}/yr
                </p>
                <p className="text-xs text-slate-400">
                  {isCE
                    ? `${fmtUSD(maxCEPrice - listPrice)} below CE ceiling`
                    : `${fmtUSD(listPrice - maxCEPrice)} above CE ceiling`}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100">
                <p className="text-xs text-slate-500 mb-0.5">
                  Required Discount
                </p>
                <p
                  className={`text-xl font-bold ${isCE ? "text-emerald-600" : "text-rose-600"}`}
                >
                  {isCE ? "None required" : `${discount.toFixed(1)}%`}
                </p>
                <p className="text-xs text-slate-400">
                  {isCE
                    ? "Priced below CE threshold"
                    : `To reach CE ceiling of ${fmtUSD(maxCEPrice)}`}
                </p>
              </div>
            </div>
          </div>

          {/* Multi-WTP summary table */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              Summary across WTP thresholds
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                    WTP Threshold
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                    CE Price Ceiling
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                    Required Discount
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">
                    CE?
                  </th>
                </tr>
              </thead>
              <tbody>
                {[50000, 100000, 150000, 200000].map((w) => {
                  const ceiling = w * qalyGain + comparatorCost;
                  const disc = Math.max(
                    0,
                    ((listPrice - ceiling) / listPrice) * 100
                  );
                  const ce = listPrice <= ceiling;
                  return (
                    <tr
                      key={w}
                      className="border-b border-slate-50 hover:bg-violet-50/30"
                    >
                      <td className="px-3 py-2 font-medium text-slate-700">
                        {fmtUSD(w)}/QALY
                      </td>
                      <td className="px-3 py-2 text-violet-700 font-semibold">
                        {fmtUSD(ceiling)}
                      </td>
                      <td className="px-3 py-2">
                        {ce ? (
                          <span className="text-emerald-600 text-xs">
                            None
                          </span>
                        ) : (
                          <span className="text-rose-600 font-medium">
                            {disc.toFixed(1)}%
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {ce ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                            <CheckCircle size={12} /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-rose-600 font-semibold">
                            <AlertTriangle size={12} /> No
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Surrogate endpoint translation */}
      <div className="bg-white border border-violet-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-violet-50 border-b border-violet-100">
          <h3 className="text-sm font-semibold text-violet-800">
            Surrogate-to-Clinical Endpoint Translation
          </h3>
          <p className="text-xs text-violet-500 mt-0.5">
            Translation factors from landmark meta-analyses and regulatory
            guidance
          </p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Surrogate Endpoint
              </label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={selectedSurrogate}
                onChange={(e) => setSelectedSurrogate(e.target.value)}
              >
                {SURROGATE_ENDPOINTS.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    {ep.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Observed Change from Trial ({endpoint.unit})
              </label>
              <input
                type="number"
                step={0.1}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                value={surrogateChange}
                onChange={(e) => setSurrogateChange(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Endpoint card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-slate-800">
                  {endpoint.label}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">{endpoint.note}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${VALIDATION_COLORS[endpoint.validationStrength]}`}
              >
                {endpoint.validationStrength} Validation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                <p className="text-xs text-slate-500 mb-1">Surrogate Change</p>
                <p className="text-xl font-bold text-violet-700">
                  {surrogateChange} {endpoint.unit.split(" ")[0]}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                <p className="text-xs text-slate-500 mb-1">
                  Estimated QALY Gain
                </p>
                <p className="text-xl font-bold text-emerald-700">
                  {estimatedQALY.toFixed(3)} QALYs
                </p>
                <p className="text-xs text-slate-400">
                  × {endpoint.qalyPerUnit} QALY/{endpoint.unit.split(" ")[0]}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                <p className="text-xs text-slate-500 mb-1">Clinical Benefit</p>
                <p className="text-xl font-bold text-blue-700">
                  {fmtPct(clinicalBenefit * 100)}
                </p>
                <p className="text-xs text-slate-400">
                  {endpoint.clinicalEvent}
                </p>
              </div>
            </div>

            {/* Uncertainty flag */}
            <div
              className={`rounded-lg px-3 py-2 border text-xs ${VALIDATION_COLORS[endpoint.validationStrength]}`}
            >
              <strong>Surrogate Validity Grade: {endpoint.validationStrength}</strong>
              {endpoint.validationStrength === "Strong" &&
                " — Well-validated surrogate with consistent clinical endpoint correlation across multiple RCTs."}
              {endpoint.validationStrength === "Moderate" &&
                " — Moderate evidence of surrogate validity; correlation with clinical endpoints demonstrated but with important uncertainty."}
              {endpoint.validationStrength === "Weak" &&
                " — Weak surrogate validation. Clinical endpoint effect may not follow surrogate change. Use with caution in HTA submissions."}
            </div>

            {/* Published studies */}
            <div className="mt-3">
              <p className="text-xs font-semibold text-slate-600 mb-1">
                Supporting Evidence:
              </p>
              <ul className="space-y-0.5">
                {endpoint.studies.map((study) => (
                  <li key={study} className="text-xs text-slate-500 flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                    {study}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* All surrogates reference table */}
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
              Reference — All Surrogate Translation Factors
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-3 py-2 text-left font-semibold text-slate-600">
                      Surrogate
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-600">
                      QALY/unit
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-600">
                      Clinical Impact
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-600">
                      Validation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SURROGATE_ENDPOINTS.map((ep) => (
                    <tr
                      key={ep.id}
                      className={`border-b border-slate-50 hover:bg-violet-50/30 cursor-pointer ${selectedSurrogate === ep.id ? "bg-violet-50" : ""}`}
                      onClick={() => setSelectedSurrogate(ep.id)}
                    >
                      <td className="px-3 py-2 font-medium text-slate-700">
                        {ep.label}
                      </td>
                      <td className="px-3 py-2 text-violet-700 font-semibold">
                        {ep.qalyPerUnit}
                      </td>
                      <td className="px-3 py-2 text-slate-500">
                        {fmtPct(ep.clinicalFactor * 100)} {ep.clinicalEvent}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-1.5 py-0.5 rounded border font-semibold ${VALIDATION_COLORS[ep.validationStrength]}`}
                        >
                          {ep.validationStrength}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Root Component
// ══════════════════════════════════════════════════════════════════════════════

export default function HTAStudio() {
  const [activeTab, setActiveTab] = useState("bim");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-900 via-violet-800 to-purple-800 text-white px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <FlaskConical size={24} className="text-violet-300" />
            <h1 className="text-xl font-bold tracking-tight">
              HTA Studio
            </h1>
            <span className="text-xs bg-violet-700 text-violet-200 px-2 py-0.5 rounded-full font-medium">
              ICER / NICE Methodology
            </span>
          </div>
          <p className="text-sm text-violet-300">
            Health Technology Assessment analytical toolkit — Budget impact
            modeling, MCDA, probabilistic sensitivity analysis, and surrogate
            endpoint translation
          </p>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    active
                      ? "border-violet-600 text-violet-700 bg-violet-50/50"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info size={12} />
            <span>
              {activeTab === "bim" &&
                "Budget Impact Model — Projects population-level cost impact over 5 years per ICER affordability framework"}
              {activeTab === "mcda" &&
                "Multi-Criteria Decision Analysis — Weighted scoring across 8 HTA dimensions per NICE Citizens Council guidance"}
              {activeTab === "psa" &&
                "Probabilistic Sensitivity Analysis — Monte Carlo simulation to characterize decision uncertainty per ISPOR guidelines"}
              {activeTab === "threshold" &&
                "Threshold & Surrogate Analysis — CE price thresholds and surrogate endpoint translation per CADTH/ICER methods"}
            </span>
          </div>
        </div>

        {activeTab === "bim" && <BudgetImpactTab />}
        {activeTab === "mcda" && <MCDATab />}
        {activeTab === "psa" && <PSATab />}
        {activeTab === "threshold" && <ThresholdTab />}
      </div>
    </div>
  );
}
