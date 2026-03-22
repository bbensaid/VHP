"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Activity,
  Users,
  Sliders,
  Grid3X3,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Heart,
  Info,
} from "lucide-react";

// ─────────────────────────────────────────────
// SHARED TYPES
// ─────────────────────────────────────────────

type Tab = "hcc" | "population" | "model" | "comorbidity";

// ─────────────────────────────────────────────
// TAB 1 DATA – HCC CONDITIONS
// ─────────────────────────────────────────────

interface HCCCondition {
  id: string;
  label: string;
  raf: number;
  category: string;
}

const HCC_CONDITIONS: HCCCondition[] = [
  // Diabetes
  { id: "hcc18", label: "Diabetes with Chronic Complications", raf: 0.302, category: "Diabetes" },
  { id: "hcc19", label: "Diabetes without Complication", raf: 0.105, category: "Diabetes" },
  // Cardiovascular
  { id: "hcc85", label: "Congestive Heart Failure (CHF)", raf: 0.331, category: "Cardiovascular" },
  { id: "hcc86", label: "Acute Myocardial Infarction", raf: 0.199, category: "Cardiovascular" },
  { id: "hcc108", label: "Vascular Disease", raf: 0.288, category: "Cardiovascular" },
  // Pulmonary
  { id: "hcc111", label: "Chronic Obstructive Pulmonary Disease (COPD)", raf: 0.335, category: "Pulmonary" },
  // Metabolic
  { id: "hcc22", label: "Morbid Obesity", raf: 0.273, category: "Metabolic" },
  // Behavioral
  { id: "hcc58", label: "Major Depressive Disorder", raf: 0.212, category: "Behavioral Health" },
  { id: "hcc188", label: "Schizophrenia", raf: 0.379, category: "Behavioral Health" },
  // Renal
  { id: "hcc134", label: "Dialysis Status (ESRD)", raf: 0.493, category: "Renal" },
  { id: "hcc155", label: "Chronic Kidney Disease Stage 5", raf: 0.289, category: "Renal" },
  // Cancer
  { id: "hcc8", label: "Metastatic Cancer and Acute Leukemia", raf: 2.659, category: "Cancer" },
  { id: "hcc9", label: "Lung / Other Severe Cancers", raf: 1.024, category: "Cancer" },
  { id: "hcc10", label: "Lymphoma and Other Cancers", raf: 0.665, category: "Cancer" },
  { id: "hcc11", label: "Colorectal / Bladder / Other Cancer", raf: 0.304, category: "Cancer" },
  // Musculoskeletal
  { id: "hcc40", label: "Rheumatoid Arthritis / Inflammatory Connective Tissue Disease", raf: 0.421, category: "Musculoskeletal" },
  // Wounds
  { id: "hcc161", label: "Pressure Ulcer Stage 4", raf: 2.227, category: "Wounds" },
  // Neurological
  { id: "hcc77", label: "Multiple Sclerosis", raf: 0.522, category: "Neurological" },
  { id: "hcc79", label: "Seizure Disorders / Convulsions", raf: 0.262, category: "Neurological" },
  { id: "hcc166", label: "Severe Head Injury", raf: 0.412, category: "Neurological" },
];

// Demographic base RAF lookup (simplified CMS v28 approximation)
function getDemographicRAF(age: number, gender: "M" | "F"): number {
  if (age < 45) return gender === "M" ? 0.18 : 0.17;
  if (age < 55) return gender === "M" ? 0.21 : 0.20;
  if (age < 60) return gender === "M" ? 0.27 : 0.25;
  if (age < 65) return gender === "M" ? 0.32 : 0.30;
  if (age < 70) return gender === "M" ? 0.38 : 0.36;
  if (age < 75) return gender === "M" ? 0.47 : 0.44;
  if (age < 80) return gender === "M" ? 0.58 : 0.55;
  if (age < 85) return gender === "M" ? 0.72 : 0.69;
  if (age < 90) return gender === "M" ? 0.89 : 0.86;
  return gender === "M" ? 1.05 : 1.02;
}

const HCC_CATEGORIES = Array.from(new Set(HCC_CONDITIONS.map((c) => c.category)));

// ─────────────────────────────────────────────
// TAB 1 COMPONENT
// ─────────────────────────────────────────────

function HCCCalculator() {
  const [age, setAge] = useState(67);
  const [gender, setGender] = useState<"M" | "F">("M");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(HCC_CATEGORIES));

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const toggleCat = useCallback((cat: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }, []);

  const { demoRAF, conditionRAF, totalRAF } = useMemo(() => {
    const demoRAF = getDemographicRAF(age, gender);
    const conditionRAF = HCC_CONDITIONS.filter((c) => selected.has(c.id)).reduce(
      (sum, c) => sum + c.raf,
      0
    );
    return { demoRAF, conditionRAF, totalRAF: demoRAF + conditionRAF };
  }, [age, gender, selected]);

  const monthlyPayment = totalRAF * 950;
  const annualPayment = monthlyPayment * 12;

  const tier =
    totalRAF < 1.0
      ? { label: "Low Risk", color: "text-green-600", bg: "bg-green-100" }
      : totalRAF < 1.5
      ? { label: "Average Risk", color: "text-yellow-600", bg: "bg-yellow-100" }
      : totalRAF < 2.5
      ? { label: "High Risk", color: "text-orange-600", bg: "bg-orange-100" }
      : { label: "Very High Risk", color: "text-red-700", bg: "bg-red-100" };

  const barPct = Math.min((totalRAF / 4) * 100, 100);
  const benchmarkPct = (1.0 / 4) * 100;

  const selectedConditions = HCC_CONDITIONS.filter((c) => selected.has(c.id));

  return (
    <div className="space-y-6">
      {/* Explanation banner */}
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex gap-3">
        <Info className="text-rose-500 mt-0.5 shrink-0" size={18} />
        <p className="text-sm text-rose-800">
          <strong>HCC v28 Risk Adjustment Factor (RAF)</strong> — CMS uses Hierarchical Condition
          Categories to adjust Medicare Advantage capitated payments. A RAF of 1.0 represents the
          average beneficiary. Higher scores reflect greater expected cost and trigger higher monthly
          payments to plans. Scores are additive across demographic base and condition categories.
        </p>
      </div>

      {/* Demographics */}
      <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-rose-900 mb-4 text-sm uppercase tracking-wide">
          Demographic Inputs
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Age: <span className="text-rose-600 font-bold">{age}</span>
            </label>
            <input
              type="range"
              min={18}
              max={99}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-rose-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>18</span><span>99</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">Gender</label>
            <div className="flex gap-3">
              {(["M", "F"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                    gender === g
                      ? "bg-rose-600 text-white border-rose-600"
                      : "border-slate-200 text-slate-600 hover:border-rose-300"
                  }`}
                >
                  {g === "M" ? "Male" : "Female"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Demographic base RAF:{" "}
          <span className="font-semibold text-rose-700">{demoRAF.toFixed(3)}</span>
        </div>
      </div>

      {/* Conditions */}
      <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-rose-900 mb-4 text-sm uppercase tracking-wide">
          Chronic Condition Checklist (HCC v28)
        </h3>
        <div className="space-y-2">
          {HCC_CATEGORIES.map((cat) => {
            const conditions = HCC_CONDITIONS.filter((c) => c.category === cat);
            const isOpen = expandedCats.has(cat);
            const selectedInCat = conditions.filter((c) => selected.has(c.id)).length;
            return (
              <div key={cat} className="border border-rose-100 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCat(cat)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-rose-50 hover:bg-rose-100 transition-colors"
                >
                  <span className="text-sm font-medium text-rose-900">{cat}</span>
                  <div className="flex items-center gap-2">
                    {selectedInCat > 0 && (
                      <span className="text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full">
                        {selectedInCat}
                      </span>
                    )}
                    {isOpen ? (
                      <ChevronUp size={14} className="text-rose-500" />
                    ) : (
                      <ChevronDown size={14} className="text-rose-500" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="divide-y divide-rose-50">
                    {conditions.map((c) => (
                      <label
                        key={c.id}
                        className={`flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-rose-50 transition-colors ${
                          selected.has(c.id) ? "bg-rose-50" : "bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selected.has(c.id)}
                            onChange={() => toggle(c.id)}
                            className="accent-rose-600 w-4 h-4"
                          />
                          <div>
                            <div className="text-sm text-slate-700">{c.label}</div>
                            <div className="text-xs text-slate-400">{c.id.toUpperCase()}</div>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            c.raf >= 1
                              ? "bg-red-100 text-red-700"
                              : c.raf >= 0.4
                              ? "bg-orange-100 text-orange-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          +{c.raf.toFixed(3)}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-rose-700 to-rose-900 rounded-xl p-6 text-white shadow-lg">
        <h3 className="font-bold text-lg mb-5">RAF Score Results</h3>

        {/* Score bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs mb-1.5 text-rose-200">
            <span>0.0</span>
            <span>1.0 (benchmark)</span>
            <span>2.5</span>
            <span>4.0</span>
          </div>
          <div className="relative h-5 bg-rose-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-300 rounded-full transition-all duration-500"
              style={{ width: `${barPct}%` }}
            />
            {/* Benchmark marker */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white opacity-70"
              style={{ left: `${benchmarkPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-sm font-bold text-white">
              Total RAF: <span className="text-rose-200">{totalRAF.toFixed(3)}</span>
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tier.bg} ${tier.color}`}
            >
              {tier.label}
            </span>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-rose-200 mb-1">Demographic Base</div>
            <div className="text-xl font-bold">{demoRAF.toFixed(3)}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-rose-200 mb-1">Condition RAF</div>
            <div className="text-xl font-bold">{conditionRAF.toFixed(3)}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-rose-200 mb-1">Total RAF</div>
            <div className="text-xl font-bold">{totalRAF.toFixed(3)}</div>
          </div>
        </div>

        {/* Payment */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-rose-200 mb-1">Est. Monthly Payment</div>
            <div className="text-xl font-bold">
              ${monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-rose-300 mt-0.5">RAF × $950 base rate</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-rose-200 mb-1">Est. Annual Payment</div>
            <div className="text-xl font-bold">
              ${annualPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        {/* Contributing conditions */}
        {selectedConditions.length > 0 && (
          <div className="mt-5 bg-white/10 rounded-lg p-4">
            <div className="text-xs text-rose-200 font-semibold uppercase mb-3">
              Contributing Conditions
            </div>
            <div className="space-y-2">
              {selectedConditions
                .sort((a, b) => b.raf - a.raf)
                .map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <div
                      className="h-2 bg-rose-300 rounded"
                      style={{ width: `${Math.min((c.raf / 3) * 100, 100)}%` }}
                    />
                    <span className="text-xs text-white whitespace-nowrap">
                      {c.label.split(" ").slice(0, 3).join(" ")} (+{c.raf.toFixed(3)})
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB 2 COMPONENT – POPULATION RISK SEGMENTATION
// ─────────────────────────────────────────────

const TIER_COSTS: Record<string, number> = {
  "Very Low": 1800,
  Low: 3200,
  Moderate: 8500,
  High: 22000,
  "Very High": 68000,
};

const TIER_COLORS: Record<string, string> = {
  "Very Low": "bg-green-400",
  Low: "bg-emerald-400",
  Moderate: "bg-yellow-400",
  High: "bg-orange-500",
  "Very High": "bg-red-600",
};

const TIER_TEXT: Record<string, string> = {
  "Very Low": "text-green-700",
  Low: "text-emerald-700",
  Moderate: "text-yellow-700",
  High: "text-orange-700",
  "Very High": "text-red-700",
};

interface TierDist {
  "Very Low": number;
  Low: number;
  Moderate: number;
  High: number;
  "Very High": number;
}

function PopulationSegmentation() {
  const [panelSize, setPanelSize] = useState(5000);
  const [payer, setPayer] = useState({ Medicare: 40, Medicaid: 25, Commercial: 30, Uninsured: 5 });
  const [tierDist, setTierDist] = useState<TierDist>({
    "Very Low": 20,
    Low: 30,
    Moderate: 30,
    High: 15,
    "Very High": 5,
  });
  const [prevalence, setPrevalence] = useState({
    Diabetes: 28,
    CHF: 12,
    COPD: 15,
    CKD: 18,
    Depression: 22,
    "Substance Use": 10,
  });
  const [sdoh, setSdoh] = useState({
    "Housing instability": 12,
    "Food insecurity": 18,
    "Transportation barriers": 15,
  });

  const tierSum = Object.values(tierDist).reduce((a, b) => a + b, 0);

  const adjustTier = (key: keyof TierDist, val: number) => {
    setTierDist((prev) => ({ ...prev, [key]: val }));
  };

  const metrics = useMemo(() => {
    const tiers = Object.entries(tierDist) as [keyof TierDist, number][];
    const tierCounts = tiers.map(([label, pct]) => ({
      label,
      count: Math.round((pct / 100) * panelSize),
      cost: TIER_COSTS[label],
      pct,
    }));
    const totalCost = tierCounts.reduce((sum, t) => sum + t.count * t.cost, 0);
    const highRisk = tierCounts
      .filter((t) => t.label === "High" || t.label === "Very High")
      .reduce((s, t) => s + t.count, 0);
    const savingsIfReduced = tierCounts
      .filter((t) => t.label === "High" || t.label === "Very High")
      .reduce((s, t) => {
        const reduced = Math.round(t.count * 0.1);
        const savings = reduced * (t.cost - TIER_COSTS["Moderate"]);
        return s + savings;
      }, 0);
    return { tierCounts, totalCost, highRisk, savingsIfReduced };
  }, [tierDist, panelSize]);

  return (
    <div className="space-y-6">
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex gap-3">
        <Info className="text-rose-500 mt-0.5 shrink-0" size={18} />
        <p className="text-sm text-rose-800">
          Configure your virtual patient panel to model population-level cost and risk. Annual cost
          benchmarks (Low: $3,200 / Moderate: $8,500 / High: $22,000 / Very High: $68,000) are
          derived from AHRQ MEPS and CMS claims data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Panel size */}
        <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-rose-900 mb-4 text-sm uppercase tracking-wide">
            Panel Configuration
          </h3>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Total Panel Size:{" "}
              <span className="font-bold text-rose-700">{panelSize.toLocaleString()}</span> patients
            </label>
            <input
              type="range"
              min={500}
              max={50000}
              step={500}
              value={panelSize}
              onChange={(e) => setPanelSize(Number(e.target.value))}
              className="w-full accent-rose-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>500</span><span>50,000</span>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-xs font-medium text-slate-600 mb-3">Payer Mix</div>
            {(Object.keys(payer) as (keyof typeof payer)[]).map((k) => (
              <div key={k} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{k}</span>
                  <span className="font-semibold text-rose-700">{payer[k]}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={payer[k]}
                  onChange={(e) => setPayer((prev) => ({ ...prev, [k]: Number(e.target.value) }))}
                  className="w-full accent-rose-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tier distribution */}
        <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-rose-900 text-sm uppercase tracking-wide">
              Risk Tier Distribution
            </h3>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                Math.abs(tierSum - 100) < 1
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              Total: {tierSum}%
            </span>
          </div>
          {(Object.keys(tierDist) as (keyof TierDist)[]).map((tier) => (
            <div key={tier} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className={`font-medium ${TIER_TEXT[tier]}`}>{tier}</span>
                <span className="text-slate-500">
                  {tierDist[tier]}% ={" "}
                  <strong>{Math.round((tierDist[tier] / 100) * panelSize).toLocaleString()}</strong>{" "}
                  pts
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                value={tierDist[tier]}
                onChange={(e) => adjustTier(tier, Number(e.target.value))}
                className="w-full accent-rose-600"
              />
            </div>
          ))}

          {/* Visual segmentation bar */}
          <div className="mt-4 h-6 flex rounded-full overflow-hidden">
            {(Object.entries(tierDist) as [keyof TierDist, number][]).map(([label, pct]) => (
              <div
                key={label}
                className={`${TIER_COLORS[label]} transition-all duration-300`}
                style={{ width: `${pct}%` }}
                title={`${label}: ${pct}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {(Object.entries(tierDist) as [keyof TierDist, number][]).map(([label]) => (
              <div key={label} className="flex items-center gap-1">
                <div className={`w-2.5 h-2.5 rounded-full ${TIER_COLORS[label]}`} />
                <span className="text-xs text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Condition prevalence & SDOH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-rose-900 mb-4 text-sm uppercase tracking-wide">
            Estimated Condition Prevalence
          </h3>
          {(Object.keys(prevalence) as (keyof typeof prevalence)[]).map((k) => (
            <div key={k} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">{k}</span>
                <span className="font-semibold text-rose-700">
                  {prevalence[k]}% ≈{" "}
                  {Math.round((prevalence[k] / 100) * panelSize).toLocaleString()} pts
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                value={prevalence[k]}
                onChange={(e) =>
                  setPrevalence((prev) => ({ ...prev, [k]: Number(e.target.value) }))
                }
                className="w-full accent-rose-600"
              />
            </div>
          ))}
        </div>

        <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-rose-900 mb-4 text-sm uppercase tracking-wide">
            SDOH Risk Factors
          </h3>
          {(Object.keys(sdoh) as (keyof typeof sdoh)[]).map((k) => (
            <div key={k} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">{k}</span>
                <span className="font-semibold text-rose-700">
                  {sdoh[k]}% ≈ {Math.round((sdoh[k] / 100) * panelSize).toLocaleString()} pts
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                value={sdoh[k]}
                onChange={(e) => setSdoh((prev) => ({ ...prev, [k]: Number(e.target.value) }))}
                className="w-full accent-rose-600"
              />
            </div>
          ))}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="text-xs text-amber-800 font-semibold mb-1">SDOH Complexity Index</div>
            <div className="text-sm text-amber-900">
              {(
                (Object.values(sdoh).reduce((a, b) => a + b, 0) /
                  (Object.keys(sdoh).length * 50)) *
                100
              ).toFixed(0)}
              % of panel at elevated social risk
            </div>
          </div>
        </div>
      </div>

      {/* Results dashboard */}
      <div className="bg-gradient-to-br from-rose-700 to-rose-900 rounded-xl p-6 text-white shadow-lg">
        <h3 className="font-bold text-lg mb-5">Population Cost & Risk Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-xs text-rose-200 mb-1">Total Annual Cost</div>
            <div className="text-2xl font-bold">
              ${(metrics.totalCost / 1_000_000).toFixed(1)}M
            </div>
            <div className="text-xs text-rose-300 mt-0.5">Estimated panel spend</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-xs text-rose-200 mb-1">Cost per Patient</div>
            <div className="text-2xl font-bold">
              ${Math.round(metrics.totalCost / panelSize).toLocaleString()}
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-xs text-rose-200 mb-1">High / Very High Risk</div>
            <div className="text-2xl font-bold">{metrics.highRisk.toLocaleString()}</div>
            <div className="text-xs text-rose-300 mt-0.5">Rising risk patients</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-xs text-rose-200 mb-1">10% Intervention Savings</div>
            <div className="text-2xl font-bold">
              ${(metrics.savingsIfReduced / 1_000_000).toFixed(2)}M
            </div>
            <div className="text-xs text-rose-300 mt-0.5">If high risk ↓ 10%</div>
          </div>
        </div>

        {/* Per-tier breakdown */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-xs text-rose-200 font-semibold uppercase mb-3">
            Cost by Risk Tier
          </div>
          <div className="space-y-2">
            {metrics.tierCounts.map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                <span className="text-xs w-20 text-rose-200">{t.label}</span>
                <div className="flex-1 h-3 bg-rose-950 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${TIER_COLORS[t.label]} rounded-full`}
                    style={{ width: `${Math.min(((t.count * t.cost) / metrics.totalCost) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-white font-semibold w-24 text-right">
                  ${((t.count * t.cost) / 1_000_000).toFixed(2)}M
                </span>
                <span className="text-xs text-rose-300 w-16 text-right">
                  {t.count.toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB 3 COMPONENT – CUSTOM RISK MODEL BUILDER
// ─────────────────────────────────────────────

interface RiskVariable {
  id: string;
  name: string;
  dataType: "binary" | "numeric" | "category";
  weight: number;
  direction: "higher_risk" | "higher_protective";
  min?: number;
  max?: number;
  categories?: string[];
  testValue: string | number;
}

const DEFAULT_VARIABLES: RiskVariable[] = [
  { id: "v1", name: "Prior ED Visits (12 mo)", dataType: "numeric", weight: 20, direction: "higher_risk", min: 0, max: 20, testValue: 0 },
  { id: "v2", name: "Diabetes Diagnosis", dataType: "binary", weight: 15, direction: "higher_risk", testValue: "No" },
  { id: "v3", name: "CHF Diagnosis", dataType: "binary", weight: 18, direction: "higher_risk", testValue: "No" },
  { id: "v4", name: "Age (years)", dataType: "numeric", weight: 12, direction: "higher_risk", min: 18, max: 99, testValue: 50 },
  { id: "v5", name: "PCP Visits (12 mo)", dataType: "numeric", weight: 10, direction: "higher_protective", min: 0, max: 12, testValue: 4 },
  { id: "v6", name: "Medication Adherence %", dataType: "numeric", weight: 8, direction: "higher_protective", min: 0, max: 100, testValue: 80 },
  { id: "v7", name: "Depression Screening Positive", dataType: "binary", weight: 7, direction: "higher_risk", testValue: "No" },
  { id: "v8", name: "Food Insecurity", dataType: "binary", weight: 5, direction: "higher_risk", testValue: "No" },
  { id: "v9", name: "Charlson Score", dataType: "numeric", weight: 10, direction: "higher_risk", min: 0, max: 20, testValue: 0 },
  { id: "v10", name: "Housing Instability", dataType: "binary", weight: 5, direction: "higher_risk", testValue: "No" },
];

const MODEL_TEMPLATES: Record<string, RiskVariable[]> = {
  "ED Superutilizer Model": [
    { id: "v1", name: "Prior ED Visits (12 mo)", dataType: "numeric", weight: 30, direction: "higher_risk", min: 0, max: 20, testValue: 0 },
    { id: "v2", name: "Substance Use Disorder", dataType: "binary", weight: 20, direction: "higher_risk", testValue: "No" },
    { id: "v3", name: "Behavioral Health Diagnosis", dataType: "binary", weight: 15, direction: "higher_risk", testValue: "No" },
    { id: "v4", name: "Housing Instability", dataType: "binary", weight: 15, direction: "higher_risk", testValue: "No" },
    { id: "v5", name: "PCP Attribution", dataType: "binary", weight: 10, direction: "higher_protective", testValue: "Yes" },
    { id: "v6", name: "Prior Inpatient Admissions (12 mo)", dataType: "numeric", weight: 10, direction: "higher_risk", min: 0, max: 10, testValue: 0 },
    ...DEFAULT_VARIABLES.slice(6),
  ],
  "Readmission Risk Model": [
    { id: "v1", name: "Prior 30-Day Readmission", dataType: "binary", weight: 25, direction: "higher_risk", testValue: "No" },
    { id: "v2", name: "CHF Diagnosis", dataType: "binary", weight: 20, direction: "higher_risk", testValue: "No" },
    { id: "v3", name: "Discharge Disposition: SNF", dataType: "binary", weight: 15, direction: "higher_risk", testValue: "No" },
    { id: "v4", name: "Medications at Discharge", dataType: "numeric", weight: 10, direction: "higher_risk", min: 0, max: 30, testValue: 5 },
    { id: "v5", name: "Follow-up Appointment Scheduled", dataType: "binary", weight: 15, direction: "higher_protective", testValue: "Yes" },
    { id: "v6", name: "Charlson Score", dataType: "numeric", weight: 15, direction: "higher_risk", min: 0, max: 20, testValue: 0 },
    ...DEFAULT_VARIABLES.slice(6),
  ],
  "Chronic Disease Progression Model": [
    { id: "v1", name: "HbA1c Level", dataType: "numeric", weight: 20, direction: "higher_risk", min: 4, max: 14, testValue: 7 },
    { id: "v2", name: "eGFR (mL/min)", dataType: "numeric", weight: 20, direction: "higher_protective", min: 10, max: 120, testValue: 75 },
    { id: "v3", name: "Systolic BP (mmHg)", dataType: "numeric", weight: 15, direction: "higher_risk", min: 90, max: 200, testValue: 130 },
    { id: "v4", name: "BMI", dataType: "numeric", weight: 10, direction: "higher_risk", min: 15, max: 60, testValue: 28 },
    { id: "v5", name: "Smoking Status: Current", dataType: "binary", weight: 10, direction: "higher_risk", testValue: "No" },
    { id: "v6", name: "Medication Adherence %", dataType: "numeric", weight: 15, direction: "higher_protective", min: 0, max: 100, testValue: 80 },
    { id: "v7", name: "Annual PCP Visits", dataType: "numeric", weight: 10, direction: "higher_protective", min: 0, max: 12, testValue: 4 },
    ...DEFAULT_VARIABLES.slice(7),
  ],
};

function normalizeValue(v: RiskVariable): number {
  if (v.dataType === "binary") {
    const isRisk = v.direction === "higher_risk";
    const isYes = String(v.testValue) === "Yes";
    return isRisk ? (isYes ? 1 : 0) : isYes ? 0 : 1;
  }
  const min = v.min ?? 0;
  const max = v.max ?? 100;
  const val = Math.min(Math.max(Number(v.testValue), min), max);
  const normalized = (val - min) / (max - min);
  return v.direction === "higher_risk" ? normalized : 1 - normalized;
}

function CustomModelBuilder() {
  const [variables, setVariables] = useState<RiskVariable[]>(DEFAULT_VARIABLES);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const loadTemplate = (name: string) => {
    setSelectedTemplate(name);
    setVariables(MODEL_TEMPLATES[name]);
  };

  const updateVar = (id: string, field: keyof RiskVariable, value: unknown) => {
    setVariables((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const totalWeight = variables.reduce((s, v) => s + v.weight, 0);

  const { compositeScore, contributors } = useMemo(() => {
    if (totalWeight === 0) return { compositeScore: 0, contributors: [] };
    const scores = variables.map((v) => {
      const norm = normalizeValue(v);
      const contribution = (v.weight / totalWeight) * norm * 100;
      return { ...v, norm, contribution };
    });
    const composite = scores.reduce((s, v) => s + v.contribution, 0);
    const sorted = [...scores].sort((a, b) => b.contribution - a.contribution);
    return { compositeScore: composite, contributors: sorted.slice(0, 5) };
  }, [variables, totalWeight]);

  const riskLevel =
    compositeScore < 20
      ? { label: "Very Low", color: "text-green-600", bg: "bg-green-100" }
      : compositeScore < 40
      ? { label: "Low", color: "text-emerald-600", bg: "bg-emerald-100" }
      : compositeScore < 60
      ? { label: "Moderate", color: "text-yellow-600", bg: "bg-yellow-100" }
      : compositeScore < 80
      ? { label: "High", color: "text-orange-600", bg: "bg-orange-100" }
      : { label: "Very High", color: "text-red-700", bg: "bg-red-100" };

  return (
    <div className="space-y-6">
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex gap-3">
        <Info className="text-rose-500 mt-0.5 shrink-0" size={18} />
        <p className="text-sm text-rose-800">
          Build a weighted composite risk score. Weights should reflect{" "}
          <strong>evidence-based effect sizes</strong> — e.g., derived from logistic regression
          coefficients, literature review, or clinical expert consensus. Weights are normalized
          internally so relative values matter most.
        </p>
      </div>

      {/* Template loader */}
      <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-rose-900 mb-3 text-sm uppercase tracking-wide">
          Load Pre-Built Model Template
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(MODEL_TEMPLATES).map((name) => (
            <button
              key={name}
              onClick={() => loadTemplate(name)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                selectedTemplate === name
                  ? "bg-rose-600 text-white border-rose-600"
                  : "border-rose-200 text-rose-700 hover:bg-rose-50"
              }`}
            >
              {name}
            </button>
          ))}
          <button
            onClick={() => { setSelectedTemplate(""); setVariables(DEFAULT_VARIABLES); }}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50"
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Variable editor */}
      <div className="bg-white border border-rose-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
          <h3 className="font-semibold text-rose-900 text-sm uppercase tracking-wide">
            Model Variables
          </h3>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              Math.abs(totalWeight - 100) < 5
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            Total weight: {totalWeight}
          </span>
        </div>
        <div className="divide-y divide-rose-50">
          {variables.map((v) => (
            <div key={v.id} className="px-5 py-4 grid grid-cols-12 gap-3 items-center">
              {/* Variable name */}
              <div className="col-span-4">
                <input
                  className="w-full text-sm border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-rose-400"
                  value={v.name}
                  onChange={(e) => updateVar(v.id, "name", e.target.value)}
                />
              </div>
              {/* Type */}
              <div className="col-span-2">
                <select
                  className="w-full text-xs border border-slate-200 rounded px-1.5 py-1.5 focus:outline-none focus:border-rose-400"
                  value={v.dataType}
                  onChange={(e) => updateVar(v.id, "dataType", e.target.value)}
                >
                  <option value="binary">Binary</option>
                  <option value="numeric">Numeric</option>
                  <option value="category">Category</option>
                </select>
              </div>
              {/* Weight */}
              <div className="col-span-2">
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="w-full text-sm border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-rose-400"
                    value={v.weight}
                    onChange={(e) => updateVar(v.id, "weight", Math.max(0, Math.min(100, Number(e.target.value))))}
                  />
                  <span className="text-xs text-slate-400">wt</span>
                </div>
              </div>
              {/* Direction */}
              <div className="col-span-2">
                <select
                  className="w-full text-xs border border-slate-200 rounded px-1.5 py-1.5 focus:outline-none focus:border-rose-400"
                  value={v.direction}
                  onChange={(e) => updateVar(v.id, "direction", e.target.value)}
                >
                  <option value="higher_risk">↑ = More Risk</option>
                  <option value="higher_protective">↑ = Less Risk</option>
                </select>
              </div>
              {/* Test value */}
              <div className="col-span-2">
                {v.dataType === "binary" ? (
                  <select
                    className="w-full text-xs border border-slate-200 rounded px-1.5 py-1.5 focus:outline-none focus:border-rose-400"
                    value={String(v.testValue)}
                    onChange={(e) => updateVar(v.id, "testValue", e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                ) : (
                  <input
                    type="number"
                    min={v.min}
                    max={v.max}
                    className="w-full text-xs border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:border-rose-400"
                    value={Number(v.testValue)}
                    onChange={(e) => updateVar(v.id, "testValue", Number(e.target.value))}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-2 bg-slate-50 text-xs text-slate-400">
          Columns: Variable Name | Data Type | Weight | Direction | Test Patient Value
        </div>
      </div>

      {/* Score output */}
      <div className="bg-gradient-to-br from-rose-700 to-rose-900 rounded-xl p-6 text-white shadow-lg">
        <h3 className="font-bold text-lg mb-5">Composite Risk Score</h3>
        <div className="flex items-end gap-6 mb-6">
          <div>
            <div className="text-5xl font-bold">{compositeScore.toFixed(1)}</div>
            <div className="text-rose-200 text-sm mt-1">out of 100</div>
          </div>
          <div className={`px-4 py-2 rounded-full ${riskLevel.bg} ${riskLevel.color} font-bold`}>
            {riskLevel.label} Risk
          </div>
        </div>

        {/* Score bar */}
        <div className="h-4 bg-rose-950 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${compositeScore}%` }}
          />
        </div>

        {/* Top drivers */}
        <div className="bg-white/10 rounded-lg p-4">
          <div className="text-xs text-rose-200 font-semibold uppercase mb-3">
            Top Score Drivers
          </div>
          <div className="space-y-2">
            {contributors.map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="text-xs text-rose-200 w-40 truncate">{c.name}</span>
                <div className="flex-1 h-2.5 bg-rose-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-300 rounded-full"
                    style={{ width: `${Math.min((c.contribution / 40) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-white w-10 text-right">
                  {c.contribution.toFixed(1)}
                </span>
                <span className={`text-xs w-14 text-right ${c.direction === "higher_risk" ? "text-red-300" : "text-green-300"}`}>
                  {c.direction === "higher_risk" ? "▲ Risk" : "▼ Risk"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {totalWeight !== 100 && (
          <div className="mt-4 flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-lg px-4 py-2">
            <AlertTriangle size={14} className="text-amber-300" />
            <span className="text-xs text-amber-200">
              Weights sum to {totalWeight} (not 100). Score is still calculated via normalization,
              but consider adjusting weights for clarity.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB 4 COMPONENT – COMORBIDITY CLUSTERING
// ─────────────────────────────────────────────

const CONDITIONS_10 = ["Diabetes", "HTN", "CHF", "COPD", "CKD", "Depression", "Obesity", "AFib", "CAD", "Stroke"];

// Co-occurrence matrix (upper triangle, symmetric)
const CO_OCCUR: Record<string, number> = {
  "Diabetes-HTN": 68, "Diabetes-CHF": 29, "Diabetes-COPD": 18, "Diabetes-CKD": 38,
  "Diabetes-Depression": 24, "Diabetes-Obesity": 52, "Diabetes-AFib": 14, "Diabetes-CAD": 33,
  "Diabetes-Stroke": 19, "HTN-CHF": 44, "HTN-COPD": 22, "HTN-CKD": 51, "HTN-Depression": 21,
  "HTN-Obesity": 49, "HTN-AFib": 37, "HTN-CAD": 58, "HTN-Stroke": 31, "CHF-COPD": 35,
  "CHF-CKD": 52, "CHF-Depression": 28, "CHF-Obesity": 33, "CHF-AFib": 48, "CHF-CAD": 61,
  "CHF-Stroke": 22, "COPD-CKD": 18, "COPD-Depression": 31, "COPD-Obesity": 27, "COPD-AFib": 21,
  "COPD-CAD": 26, "COPD-Stroke": 14, "CKD-Depression": 19, "CKD-Obesity": 31, "CKD-AFib": 29,
  "CKD-CAD": 37, "CKD-Stroke": 24, "Depression-Obesity": 35, "Depression-AFib": 16,
  "Depression-CAD": 22, "Depression-Stroke": 20, "Obesity-AFib": 23, "Obesity-CAD": 31,
  "Obesity-Stroke": 17, "AFib-CAD": 42, "AFib-Stroke": 36, "CAD-Stroke": 29,
};

function getCoOccur(a: string, b: string): number {
  if (a === b) return 100;
  const key = `${a}-${b}`;
  const rkey = `${b}-${a}`;
  return CO_OCCUR[key] ?? CO_OCCUR[rkey] ?? 0;
}

const CONDITION_META: Record<string, { topComorbidities: string[]; avgRAF: number; annualCost: number }> = {
  Diabetes:   { topComorbidities: ["HTN (68%)", "Obesity (52%)", "CKD (38%)"], avgRAF: 0.302, annualCost: 14400 },
  HTN:        { topComorbidities: ["CAD (58%)", "CKD (51%)", "Obesity (49%)"], avgRAF: 0.18, annualCost: 8200 },
  CHF:        { topComorbidities: ["CAD (61%)", "AFib (48%)", "CKD (52%)"], avgRAF: 0.331, annualCost: 26500 },
  COPD:       { topComorbidities: ["CHF (35%)", "Depression (31%)", "Obesity (27%)"], avgRAF: 0.335, annualCost: 18300 },
  CKD:        { topComorbidities: ["HTN (51%)", "CHF (52%)", "Diabetes (38%)"], avgRAF: 0.289, annualCost: 21700 },
  Depression: { topComorbidities: ["Obesity (35%)", "COPD (31%)", "Diabetes (24%)"], avgRAF: 0.212, annualCost: 12400 },
  Obesity:    { topComorbidities: ["Diabetes (52%)", "HTN (49%)", "Depression (35%)"], avgRAF: 0.273, annualCost: 9800 },
  AFib:       { topComorbidities: ["CAD (42%)", "Stroke (36%)", "CHF (48%)"], avgRAF: 0.22, annualCost: 15600 },
  CAD:        { topComorbidities: ["HTN (58%)", "CHF (61%)", "AFib (42%)"], avgRAF: 0.25, annualCost: 19200 },
  Stroke:     { topComorbidities: ["AFib (36%)", "HTN (31%)", "CAD (29%)"], avgRAF: 0.31, annualCost: 31400 },
};

function coOccurColor(pct: number): string {
  if (pct === 100) return "bg-rose-200 text-rose-900";
  if (pct >= 60) return "bg-red-100 text-red-800";
  if (pct >= 40) return "bg-orange-100 text-orange-800";
  if (pct >= 25) return "bg-yellow-100 text-yellow-800";
  if (pct >= 10) return "bg-green-50 text-green-800";
  return "bg-slate-50 text-slate-500";
}

// ─── Elixhauser conditions ───────────────────
interface ElixhauserCondition {
  id: string;
  label: string;
  readmissionPoints: number;
}

const ELIXHAUSER_CONDITIONS: ElixhauserCondition[] = [
  { id: "e1", label: "Congestive Heart Failure", readmissionPoints: 7 },
  { id: "e2", label: "Cardiac Arrhythmias", readmissionPoints: 5 },
  { id: "e3", label: "Valvular Disease", readmissionPoints: -1 },
  { id: "e4", label: "Pulmonary Circulation Disorders", readmissionPoints: 4 },
  { id: "e5", label: "Peripheral Vascular Disorders", readmissionPoints: 2 },
  { id: "e6", label: "Hypertension (uncomplicated)", readmissionPoints: -1 },
  { id: "e7", label: "Hypertension (complicated)", readmissionPoints: 0 },
  { id: "e8", label: "Paralysis", readmissionPoints: 3 },
  { id: "e9", label: "Other Neurological Disorders", readmissionPoints: 6 },
  { id: "e10", label: "Chronic Pulmonary Disease", readmissionPoints: 3 },
  { id: "e11", label: "Diabetes (uncomplicated)", readmissionPoints: 0 },
  { id: "e12", label: "Diabetes (complicated)", readmissionPoints: 1 },
  { id: "e13", label: "Hypothyroidism", readmissionPoints: 0 },
  { id: "e14", label: "Renal Failure", readmissionPoints: 6 },
  { id: "e15", label: "Liver Disease", readmissionPoints: 4 },
  { id: "e16", label: "Peptic Ulcer Disease (no bleeding)", readmissionPoints: 0 },
  { id: "e17", label: "AIDS / HIV", readmissionPoints: 0 },
  { id: "e18", label: "Lymphoma", readmissionPoints: 7 },
  { id: "e19", label: "Metastatic Cancer", readmissionPoints: 9 },
  { id: "e20", label: "Solid Tumor without Metastasis", readmissionPoints: 4 },
  { id: "e21", label: "Rheumatoid Arthritis / Collagen Vascular", readmissionPoints: 0 },
  { id: "e22", label: "Coagulopathy", readmissionPoints: 3 },
  { id: "e23", label: "Obesity", readmissionPoints: -4 },
  { id: "e24", label: "Weight Loss", readmissionPoints: 6 },
  { id: "e25", label: "Fluid and Electrolyte Disorders", readmissionPoints: 5 },
  { id: "e26", label: "Blood Loss Anemia", readmissionPoints: -2 },
  { id: "e27", label: "Deficiency Anemia", readmissionPoints: -2 },
  { id: "e28", label: "Alcohol Abuse", readmissionPoints: 0 },
  { id: "e29", label: "Drug Abuse", readmissionPoints: -7 },
  { id: "e30", label: "Psychoses", readmissionPoints: -5 },
];

// ─── Charlson conditions ─────────────────────
interface CharlsonCondition {
  id: string;
  label: string;
  weight: number;
}

const CHARLSON_CONDITIONS: CharlsonCondition[] = [
  { id: "c1", label: "Myocardial Infarction", weight: 1 },
  { id: "c2", label: "Congestive Heart Failure", weight: 1 },
  { id: "c3", label: "Peripheral Vascular Disease", weight: 1 },
  { id: "c4", label: "Cerebrovascular Disease (Stroke / TIA)", weight: 1 },
  { id: "c5", label: "Dementia", weight: 1 },
  { id: "c6", label: "Chronic Pulmonary Disease", weight: 1 },
  { id: "c7", label: "Connective Tissue Disease", weight: 1 },
  { id: "c8", label: "Peptic Ulcer Disease", weight: 1 },
  { id: "c9", label: "Mild Liver Disease", weight: 1 },
  { id: "c10", label: "Diabetes without End-Organ Damage", weight: 1 },
  { id: "c11", label: "Hemiplegia", weight: 2 },
  { id: "c12", label: "Moderate / Severe Renal Disease", weight: 2 },
  { id: "c13", label: "Diabetes with End-Organ Damage", weight: 2 },
  { id: "c14", label: "Tumor (any, non-metastatic)", weight: 2 },
  { id: "c15", label: "Leukemia", weight: 2 },
  { id: "c16", label: "Lymphoma", weight: 2 },
  { id: "c17", label: "Moderate / Severe Liver Disease", weight: 3 },
  { id: "c18", label: "Metastatic Solid Tumor", weight: 6 },
  { id: "c19", label: "AIDS / HIV", weight: 6 },
];

// 10-year survival lookup (approximated from Charlson 1987 paper + age adjustment)
function charlsonSurvival(score: number, age: number): number {
  const ageFactor = Math.floor((age - 40) / 10) * 0.9; // per decade above 40
  const totalScore = score + ageFactor;
  if (totalScore <= 0) return 98;
  if (totalScore <= 1) return 96;
  if (totalScore <= 2) return 90;
  if (totalScore <= 3) return 77;
  if (totalScore <= 4) return 53;
  if (totalScore <= 5) return 21;
  return 0;
}

function ComorbidityVisualizer() {
  const [hoveredCell, setHoveredCell] = useState<{ row: string; col: string } | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [elixSelected, setElixSelected] = useState<Set<string>>(new Set());
  const [charlsonSelected, setCharlsonSelected] = useState<Set<string>>(new Set());
  const [charlsonAge, setCharlsonAge] = useState(65);

  const toggleElix = (id: string) => {
    setElixSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleCharlson = (id: string) => {
    setCharlsonSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const elixScore = ELIXHAUSER_CONDITIONS.filter((e) => elixSelected.has(e.id)).reduce(
    (s, e) => s + e.readmissionPoints,
    0
  );
  const elixReadmission = Math.min(Math.max(5 + elixScore * 1.8, 2), 55);

  const charlsonScore = CHARLSON_CONDITIONS.filter((c) => charlsonSelected.has(c.id)).reduce(
    (s, c) => s + c.weight,
    0
  );
  const survival10yr = charlsonSurvival(charlsonScore, charlsonAge);

  return (
    <div className="space-y-6">
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex gap-3">
        <Info className="text-rose-500 mt-0.5 shrink-0" size={18} />
        <p className="text-sm text-rose-800">
          The comorbidity matrix shows pairwise co-occurrence rates from Medicare FFS claims data.
          Click any condition name to see detailed comorbidity profile. Rates represent percentage of
          patients with condition A who also have condition B.
        </p>
      </div>

      {/* Matrix */}
      <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-rose-900 mb-4 text-sm uppercase tracking-wide">
          Comorbidity Co-Occurrence Matrix (%)
        </h3>
        <div className="overflow-x-auto">
          <table className="text-xs border-collapse">
            <thead>
              <tr>
                <th className="w-24 p-1" />
                {CONDITIONS_10.map((col) => (
                  <th key={col} className="p-1 text-center">
                    <button
                      onClick={() => setSelectedCondition(selectedCondition === col ? null : col)}
                      className={`writing-mode-vertical px-1 py-1 rounded text-xs font-medium transition-colors ${
                        selectedCondition === col
                          ? "bg-rose-600 text-white"
                          : "text-slate-600 hover:text-rose-600"
                      }`}
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}
                    >
                      {col}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONDITIONS_10.map((row) => (
                <tr key={row}>
                  <td className="p-1">
                    <button
                      onClick={() => setSelectedCondition(selectedCondition === row ? null : row)}
                      className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors text-right w-full ${
                        selectedCondition === row
                          ? "bg-rose-600 text-white"
                          : "text-slate-600 hover:text-rose-600"
                      }`}
                    >
                      {row}
                    </button>
                  </td>
                  {CONDITIONS_10.map((col) => {
                    const pct = getCoOccur(row, col);
                    const isHovered =
                      hoveredCell?.row === row && hoveredCell?.col === col;
                    return (
                      <td key={col} className="p-0.5">
                        <div
                          onMouseEnter={() => setHoveredCell({ row, col })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-12 h-10 flex items-center justify-center rounded text-xs font-semibold cursor-default transition-all ${coOccurColor(pct)} ${isHovered ? "ring-2 ring-rose-400 scale-105" : ""}`}
                        >
                          {row === col ? "—" : `${pct}%`}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          {[
            { label: "≥60% Very High", cls: "bg-red-100 text-red-800" },
            { label: "40–60% High", cls: "bg-orange-100 text-orange-800" },
            { label: "25–40% Moderate", cls: "bg-yellow-100 text-yellow-800" },
            { label: "10–25% Low", cls: "bg-green-50 text-green-800" },
            { label: "<10% Rare", cls: "bg-slate-50 text-slate-500" },
          ].map((l) => (
            <span key={l.label} className={`text-xs px-2 py-0.5 rounded ${l.cls}`}>
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* Selected condition details */}
      {selectedCondition && CONDITION_META[selectedCondition] && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-rose-900 mb-3">{selectedCondition} — Comorbidity Profile</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-rose-600 font-semibold uppercase mb-2">
                Top 3 Comorbidities
              </div>
              <ul className="space-y-1">
                {CONDITION_META[selectedCondition].topComorbidities.map((c) => (
                  <li key={c} className="text-sm text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs text-rose-600 font-semibold uppercase mb-2">Avg HCC RAF</div>
              <div className="text-2xl font-bold text-rose-900">
                {CONDITION_META[selectedCondition].avgRAF.toFixed(3)}
              </div>
              <div className="text-xs text-slate-500 mt-1">CMS v28 contribution</div>
            </div>
            <div>
              <div className="text-xs text-rose-600 font-semibold uppercase mb-2">
                Typical Annual Cost
              </div>
              <div className="text-2xl font-bold text-rose-900">
                ${CONDITION_META[selectedCondition].annualCost.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-1">Medicare FFS average</div>
            </div>
          </div>
        </div>
      )}

      {/* Elixhauser */}
      <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-rose-900 mb-2 text-sm uppercase tracking-wide">
          Elixhauser Comorbidity Score
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          The Elixhauser index uses 30 comorbidities to predict in-hospital mortality and 30-day
          readmission. Toggle conditions present at admission.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5 mb-5">
          {ELIXHAUSER_CONDITIONS.map((e) => (
            <label
              key={e.id}
              className="flex items-start gap-2 cursor-pointer hover:text-rose-700 text-sm text-slate-600 py-0.5"
            >
              <input
                type="checkbox"
                checked={elixSelected.has(e.id)}
                onChange={() => toggleElix(e.id)}
                className="accent-rose-600 mt-0.5 shrink-0"
              />
              <span>{e.label}</span>
              <span
                className={`ml-auto text-xs font-bold shrink-0 ${
                  e.readmissionPoints > 0 ? "text-red-600" : e.readmissionPoints < 0 ? "text-green-600" : "text-slate-400"
                }`}
              >
                {e.readmissionPoints > 0 ? `+${e.readmissionPoints}` : e.readmissionPoints}
              </span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 bg-rose-50 border border-rose-200 rounded-lg p-4">
          <div>
            <div className="text-xs text-rose-600 font-semibold uppercase mb-1">
              Elixhauser Score
            </div>
            <div className="text-3xl font-bold text-rose-900">{elixScore}</div>
            <div className="text-xs text-slate-500 mt-1">
              {elixSelected.size} conditions selected
            </div>
          </div>
          <div>
            <div className="text-xs text-rose-600 font-semibold uppercase mb-1">
              Est. 30-Day Readmission Risk
            </div>
            <div className="text-3xl font-bold text-rose-900">{elixReadmission.toFixed(1)}%</div>
            <div className="h-2 bg-rose-200 rounded-full mt-2">
              <div
                className="h-full bg-rose-600 rounded-full transition-all duration-300"
                style={{ width: `${(elixReadmission / 55) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Charlson */}
      <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-rose-900 mb-2 text-sm uppercase tracking-wide">
          Charlson Comorbidity Index (CCI)
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          The Charlson index assigns weighted scores to 19 conditions to estimate 10-year survival
          probability. Originally developed at Cornell (1987); widely used in clinical research.
        </p>

        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Patient Age: <span className="font-bold text-rose-700">{charlsonAge}</span>
          </label>
          <input
            type="range"
            min={18}
            max={99}
            value={charlsonAge}
            onChange={(e) => setCharlsonAge(Number(e.target.value))}
            className="w-64 accent-rose-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 mb-5">
          {CHARLSON_CONDITIONS.map((c) => (
            <label
              key={c.id}
              className="flex items-center gap-2 cursor-pointer hover:text-rose-700 text-sm text-slate-600 py-0.5"
            >
              <input
                type="checkbox"
                checked={charlsonSelected.has(c.id)}
                onChange={() => toggleCharlson(c.id)}
                className="accent-rose-600 shrink-0"
              />
              <span className="flex-1">{c.label}</span>
              <span
                className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                  c.weight >= 6
                    ? "bg-red-100 text-red-700"
                    : c.weight >= 3
                    ? "bg-orange-100 text-orange-700"
                    : c.weight === 2
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                +{c.weight}
              </span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 bg-rose-50 border border-rose-200 rounded-lg p-4">
          <div>
            <div className="text-xs text-rose-600 font-semibold uppercase mb-1">CCI Score</div>
            <div className="text-3xl font-bold text-rose-900">{charlsonScore}</div>
            <div className="text-xs text-slate-500 mt-1">
              {charlsonSelected.size} conditions · Age {charlsonAge}
            </div>
          </div>
          <div>
            <div className="text-xs text-rose-600 font-semibold uppercase mb-1">
              Est. 10-Year Survival
            </div>
            <div className="text-3xl font-bold text-rose-900">{survival10yr}%</div>
            <div className="h-2 bg-rose-200 rounded-full mt-2">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${survival10yr}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {survival10yr >= 90
                ? "Excellent prognosis"
                : survival10yr >= 70
                ? "Moderate prognosis"
                : survival10yr >= 40
                ? "Guarded prognosis"
                : "Poor prognosis"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ReactNode; subtitle: string }[] = [
  {
    id: "hcc",
    label: "HCC Risk Score Calculator",
    icon: <Activity size={16} />,
    subtitle: "CMS v28 RAF scoring",
  },
  {
    id: "population",
    label: "Population Risk Segmentation",
    icon: <Users size={16} />,
    subtitle: "Panel cost modeling",
  },
  {
    id: "model",
    label: "Custom Risk Model Builder",
    icon: <Sliders size={16} />,
    subtitle: "Weighted composite score",
  },
  {
    id: "comorbidity",
    label: "Comorbidity Clustering",
    icon: <Grid3X3 size={16} />,
    subtitle: "Matrix + Elixhauser + Charlson",
  },
];

export default function RiskStratificationEngine() {
  const [activeTab, setActiveTab] = useState<Tab>("hcc");

  return (
    <div className="max-w-6xl mx-auto font-sans">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-rose-600 rounded-lg flex items-center justify-center">
            <Heart size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Risk Stratification Engine</h1>
            <p className="text-sm text-slate-500">
              Interactive sandbox for clinical risk modeling — Vermont Health Platform Research Lab
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <span className="text-xs bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full font-medium">
            CMS HCC v28
          </span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
            Population Health
          </span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
            Elixhauser · Charlson
          </span>
          <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
            <AlertTriangle size={11} /> Research Use Only
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-start px-4 py-3 rounded-xl border transition-all text-left ${
              activeTab === tab.id
                ? "bg-rose-600 text-white border-rose-600 shadow-md"
                : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:bg-rose-50"
            }`}
          >
            <div className={`flex items-center gap-2 mb-1 font-semibold text-xs ${activeTab === tab.id ? "text-white" : "text-rose-700"}`}>
              {tab.icon}
              <span>{tab.id === "hcc" ? "HCC Calculator" : tab.id === "population" ? "Population" : tab.id === "model" ? "Model Builder" : "Comorbidity"}</span>
            </div>
            <span className={`text-xs ${activeTab === tab.id ? "text-rose-200" : "text-slate-400"}`}>
              {tab.subtitle}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "hcc" && <HCCCalculator />}
        {activeTab === "population" && <PopulationSegmentation />}
        {activeTab === "model" && <CustomModelBuilder />}
        {activeTab === "comorbidity" && <ComorbidityVisualizer />}
      </div>

      {/* Footer disclaimer */}
      <div className="mt-8 border-t border-slate-200 pt-4 flex items-start gap-2">
        <TrendingUp size={14} className="text-slate-400 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-400">
          All calculations are estimates for research and educational purposes only. CMS RAF values
          reflect HCC v28 (2024). Cost benchmarks derived from AHRQ MEPS and CMS Medicare FFS data.
          Charlson survival estimates based on the original 1987 Charlson cohort study. Do not use
          for clinical decision-making, billing, or regulatory compliance without validation.
        </p>
      </div>
    </div>
  );
}
