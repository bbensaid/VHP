"use client";

import { useState, useMemo } from "react";

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

export function MCDATab() {
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
