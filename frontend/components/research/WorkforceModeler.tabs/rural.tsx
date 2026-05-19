"use client";

import { useState, useMemo } from "react";
import { TrendingDown, MapPin } from "lucide-react";
import { fmt, fmtDollars } from "../WorkforceModeler.data";
import { Pill, Slider, SectionCard, MetricBox } from "../WorkforceModeler.atoms";

// TAB 4 DATA – RURAL WORKFORCE
// ─────────────────────────────────────────────────────────────────────────────

interface StateRuralData {
  ruralPct: number;
  primaryCarePer10k: number;
  mentalHealthPer100k: number;
  obgynPer100k: number;
  hospitalClosures: number;
  uninsuredRate: number;
  hpsaDesignations: number;
}

const STATE_RURAL_DATA: Record<string, StateRuralData> = {
  Vermont: {
    ruralPct: 61,
    primaryCarePer10k: 9.2,
    mentalHealthPer100k: 180,
    obgynPer100k: 8.1,
    hospitalClosures: 2,
    uninsuredRate: 4.2,
    hpsaDesignations: 14,
  },
  Mississippi: {
    ruralPct: 51,
    primaryCarePer10k: 4.8,
    mentalHealthPer100k: 72,
    obgynPer100k: 3.2,
    hospitalClosures: 7,
    uninsuredRate: 18.4,
    hpsaDesignations: 88,
  },
  Montana: {
    ruralPct: 44,
    primaryCarePer10k: 6.1,
    mentalHealthPer100k: 110,
    obgynPer100k: 5.4,
    hospitalClosures: 4,
    uninsuredRate: 9.8,
    hpsaDesignations: 52,
  },
  "West Virginia": {
    ruralPct: 51,
    primaryCarePer10k: 5.9,
    mentalHealthPer100k: 95,
    obgynPer100k: 4.1,
    hospitalClosures: 5,
    uninsuredRate: 6.2,
    hpsaDesignations: 44,
  },
  "North Dakota": {
    ruralPct: 40,
    primaryCarePer10k: 7.2,
    mentalHealthPer100k: 130,
    obgynPer100k: 6.8,
    hospitalClosures: 3,
    uninsuredRate: 7.1,
    hpsaDesignations: 28,
  },
  Kentucky: {
    ruralPct: 42,
    primaryCarePer10k: 5.4,
    mentalHealthPer100k: 88,
    obgynPer100k: 4.8,
    hospitalClosures: 6,
    uninsuredRate: 5.8,
    hpsaDesignations: 62,
  },
  Texas: {
    ruralPct: 12,
    primaryCarePer10k: 5.1,
    mentalHealthPer100k: 82,
    obgynPer100k: 3.9,
    hospitalClosures: 26,
    uninsuredRate: 18.4,
    hpsaDesignations: 312,
  },
  California: {
    ruralPct: 5,
    primaryCarePer10k: 8.4,
    mentalHealthPer100k: 210,
    obgynPer100k: 10.2,
    hospitalClosures: 8,
    uninsuredRate: 7.2,
    hpsaDesignations: 178,
  },
  Maine: {
    ruralPct: 62,
    primaryCarePer10k: 8.8,
    mentalHealthPer100k: 165,
    obgynPer100k: 7.6,
    hospitalClosures: 3,
    uninsuredRate: 5.5,
    hpsaDesignations: 21,
  },
  Alabama: {
    ruralPct: 41,
    primaryCarePer10k: 5.2,
    mentalHealthPer100k: 78,
    obgynPer100k: 4.0,
    hospitalClosures: 8,
    uninsuredRate: 10.2,
    hpsaDesignations: 74,
  },
};

const RURAL_INTERVENTIONS = [
  {
    id: "j1visa",
    label: "J-1 Visa Waiver Slots",
    costLow: 0,
    costHigh: 0,
    physicianIncrease: 6.5,
    accessImprovement: 5,
    pipeline: "Immediate",
    description: "Federal policy — no direct state cost",
  },
  {
    id: "nhsc",
    label: "National Health Service Corps",
    costLow: 50000,
    costHigh: 130000,
    physicianIncrease: 4,
    accessImprovement: 8,
    pipeline: "2 years",
    description: "$50K–$130K loan repayment, 2-year commitment",
  },
  {
    id: "stateloan",
    label: "State Loan Repayment Supplement",
    costLow: 30000,
    costHigh: 30000,
    physicianIncrease: 3,
    accessImprovement: 6,
    pipeline: "1–2 years",
    description: "$30K per provider from state funds",
  },
  {
    id: "ruraltrain",
    label: "Rural Training Track (Residency)",
    costLow: 200000,
    costHigh: 200000,
    physicianIncrease: 15,
    accessImprovement: 18,
    pipeline: "7–10 years",
    description: "$200K/resident, long-term pipeline investment",
  },
  {
    id: "telehealth",
    label: "Telehealth Infrastructure",
    costLow: 500000,
    costHigh: 2000000,
    physicianIncrease: 0,
    accessImprovement: 40,
    pipeline: "6–18 months",
    description: "Capital investment, 30–50% access improvement",
  },
  {
    id: "chw",
    label: "Community Health Worker Expansion",
    costLow: 45000,
    costHigh: 45000,
    physicianIncrease: 0,
    accessImprovement: 20,
    pipeline: "Immediate",
    description: "$45K/FTE, +20% care access for underserved",
  },
  {
    id: "fqhc",
    label: "FQHC Expansion",
    costLow: 650000,
    costHigh: 2000000,
    physicianIncrease: 3,
    accessImprovement: 25,
    pipeline: "12–24 months",
    description: "5,000–15,000 additional patients served",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────────────────────
// TAB 4 – RURAL WORKFORCE DISTRIBUTION & INCENTIVE MODELER
// ─────────────────────────────────────────────────────────────────────────────

export function RuralWorkforceTab() {
  const [selectedState, setSelectedState] = useState("Vermont");
  const [stateData, setStateData] = useState<StateRuralData>(
    STATE_RURAL_DATA["Vermont"]
  );
  const [activeInterventions, setActiveInterventions] = useState<Set<string>>(
    new Set()
  );

  const handleStateChange = (s: string) => {
    setSelectedState(s);
    setStateData(STATE_RURAL_DATA[s]);
    setActiveInterventions(new Set());
  };

  const toggleIntervention = (id: string) => {
    setActiveInterventions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // HPSA score calculation (simplified HRSA methodology)
  const hpsaScore = useMemo(() => {
    const ratioScore =
      stateData.primaryCarePer10k < 3
        ? 4
        : stateData.primaryCarePer10k < 5
        ? 3
        : stateData.primaryCarePer10k < 7
        ? 2
        : stateData.primaryCarePer10k < 9
        ? 1
        : 0;
    const povertyScore =
      stateData.uninsuredRate > 15
        ? 3
        : stateData.uninsuredRate > 10
        ? 2
        : stateData.uninsuredRate > 6
        ? 1
        : 0;
    const ruralScore =
      stateData.ruralPct > 50 ? 3 : stateData.ruralPct > 30 ? 2 : 1;
    const closureScore = Math.min(3, Math.floor(stateData.hospitalClosures / 2));

    return ratioScore * 5 + povertyScore * 3 + ruralScore * 2 + closureScore;
  }, [stateData]);

  const combinedImpact = useMemo(() => {
    const active = RURAL_INTERVENTIONS.filter((i) =>
      activeInterventions.has(i.id)
    );
    if (active.length === 0)
      return {
        totalCost: 0,
        physicianIncrease: 0,
        accessImprovement: 0,
        patientsServed: 0,
        federalSavings: 0,
        costPerPatient: 0,
        hpsaImprovement: 0,
      };

    const totalCost = active.reduce(
      (sum, i) => sum + (i.costLow + i.costHigh) / 2,
      0
    );

    // Compound effect (diminishing returns for overlapping interventions)
    const rawPhysicianIncrease = active.reduce(
      (sum, i) => sum + i.physicianIncrease,
      0
    );
    const physicianIncrease = rawPhysicianIncrease * (active.length > 3 ? 0.8 : 1);

    const rawAccessImprovement = active.reduce(
      (sum, i) => sum + i.accessImprovement,
      0
    );
    const accessImprovement = Math.min(85, rawAccessImprovement * 0.75);

    // Estimate patients: rural population × access improvement
    const ruralPop =
      (stateData.ruralPct / 100) *
      (selectedState === "Texas"
        ? 30000000
        : selectedState === "California"
        ? 39000000
        : 650000);
    const patientsServed = Math.round(ruralPop * (accessImprovement / 100) * 0.2);

    // Federal savings: $1,200 per additional patient served (ED avoidance, reduced travel)
    const federalSavings = patientsServed * 1200;

    const costPerPatient =
      patientsServed > 0 ? totalCost / patientsServed : 0;

    const hpsaImprovement = Math.min(
      hpsaScore,
      Math.round(physicianIncrease / 3)
    );

    return {
      totalCost,
      physicianIncrease,
      accessImprovement,
      patientsServed,
      federalSavings,
      costPerPatient,
      hpsaImprovement,
    };
  }, [activeInterventions, stateData, selectedState, hpsaScore]);

  const hpsaRisk =
    hpsaScore >= 14 ? "Critical" : hpsaScore >= 8 ? "High" : "Moderate";
  const hpsaColor =
    hpsaScore >= 14
      ? ("red" as const)
      : hpsaScore >= 8
      ? ("amber" as const)
      : ("green" as const);

  return (
    <div className="space-y-5">
      {/* State Selector */}
      <SectionCard title="State Selection">
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(STATE_RURAL_DATA).map((s) => (
            <button
              key={s}
              onClick={() => handleStateChange(s)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                selectedState === s
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-slate-600 border-gray-300 hover:border-orange-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Current State Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <MetricBox
            label="Rural Population"
            value={`${stateData.ruralPct}%`}
            sub="of state total"
            color={stateData.ruralPct > 40 ? "amber" : "neutral"}
          />
          <MetricBox
            label="Primary Care / 10K"
            value={stateData.primaryCarePer10k.toFixed(1)}
            sub="rural (natl avg: 6.8)"
            color={stateData.primaryCarePer10k < 5 ? "red" : stateData.primaryCarePer10k < 7 ? "amber" : "green"}
          />
          <MetricBox
            label="Mental Health / 100K"
            value={stateData.mentalHealthPer100k}
            sub="rural providers"
            color={stateData.mentalHealthPer100k < 90 ? "red" : "amber"}
          />
          <MetricBox
            label="OB/GYN / 100K"
            value={stateData.obgynPer100k.toFixed(1)}
            sub="rural coverage"
            color={stateData.obgynPer100k < 5 ? "red" : "amber"}
          />
          <MetricBox
            label="Hospital Closures"
            value={stateData.hospitalClosures}
            sub="last 10 years"
            color={stateData.hospitalClosures > 5 ? "red" : stateData.hospitalClosures > 2 ? "amber" : "green"}
          />
          <MetricBox
            label="Uninsured Rate"
            value={`${stateData.uninsuredRate}%`}
            sub="rural population"
            color={stateData.uninsuredRate > 12 ? "red" : stateData.uninsuredRate > 7 ? "amber" : "green"}
          />
        </div>
      </SectionCard>

      {/* Adjustable Metrics */}
      <SectionCard title="Adjust State Parameters">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Slider
              label="Rural Population %"
              value={stateData.ruralPct}
              min={2}
              max={75}
              step={1}
              unit="%"
              onChange={(v) => setStateData((p) => ({ ...p, ruralPct: v }))}
            />
            <Slider
              label="Primary Care Physicians / 10,000 rural"
              value={stateData.primaryCarePer10k}
              min={1}
              max={20}
              step={0.1}
              unit=" per 10K"
              onChange={(v) =>
                setStateData((p) => ({ ...p, primaryCarePer10k: v }))
              }
            />
            <Slider
              label="Mental Health Providers / 100,000 rural"
              value={stateData.mentalHealthPer100k}
              min={20}
              max={400}
              step={5}
              unit=" per 100K"
              onChange={(v) =>
                setStateData((p) => ({ ...p, mentalHealthPer100k: v }))
              }
            />
          </div>
          <div className="space-y-3">
            <Slider
              label="OB/GYN / 100,000 rural"
              value={stateData.obgynPer100k}
              min={1}
              max={20}
              step={0.1}
              unit=" per 100K"
              onChange={(v) => setStateData((p) => ({ ...p, obgynPer100k: v }))}
            />
            <Slider
              label="Rural Hospital Closures (last 10 yrs)"
              value={stateData.hospitalClosures}
              min={0}
              max={30}
              step={1}
              onChange={(v) =>
                setStateData((p) => ({ ...p, hospitalClosures: v }))
              }
            />
            <Slider
              label="Rural Uninsured Rate"
              value={stateData.uninsuredRate}
              min={1}
              max={30}
              step={0.1}
              unit="%"
              onChange={(v) =>
                setStateData((p) => ({ ...p, uninsuredRate: v }))
              }
            />
          </div>
        </div>
      </SectionCard>

      {/* HPSA Score */}
      <div
        className={`flex items-start gap-4 rounded-xl border p-4 ${
          hpsaScore >= 14
            ? "bg-red-50 border-red-200"
            : hpsaScore >= 8
            ? "bg-amber-50 border-amber-200"
            : "bg-green-50 border-green-200"
        }`}
      >
        <div className="text-center shrink-0">
          <p className="text-3xl font-black text-slate-900">{hpsaScore}</p>
          <p className="text-xs font-semibold text-slate-500">HPSA Score</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-bold text-slate-800">
              Shortage Severity: {hpsaRisk}
            </p>
            <Pill
              label={hpsaRisk}
              color={hpsaColor === "red" ? "red" : hpsaColor === "amber" ? "amber" : "green"}
            />
          </div>
          <p className="text-xs text-slate-600">
            Score calculated from provider-to-population ratio, poverty/uninsured
            rate, rural proportion, and hospital closure pressure. HRSA designates
            areas scoring ≥8 as HPSAs eligible for federal funding and J-1 waivers.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            HPSA designations in {selectedState}:{" "}
            <span className="font-semibold">
              {stateData.hpsaDesignations} areas
            </span>
          </p>
        </div>
      </div>

      {/* Intervention Modeler */}
      <SectionCard title="Intervention Modeler — Select Interventions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {RURAL_INTERVENTIONS.map((intv) => {
            const active = activeInterventions.has(intv.id);
            return (
              <button
                key={intv.id}
                onClick={() => toggleIntervention(intv.id)}
                className={`text-left flex items-start gap-3 px-3 py-3 rounded-xl border transition-colors ${
                  active
                    ? "bg-orange-50 border-orange-400"
                    : "bg-white border-gray-200 hover:border-orange-300"
                }`}
              >
                <div
                  className={`mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    active
                      ? "border-orange-500 bg-orange-500"
                      : "border-gray-300"
                  }`}
                >
                  {active && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-semibold leading-tight ${active ? "text-orange-700" : "text-slate-800"}`}
                  >
                    {intv.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {intv.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <span className="text-xs bg-gray-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {intv.costLow === 0
                        ? "No cost"
                        : intv.costLow === intv.costHigh
                        ? fmtDollars(intv.costLow)
                        : `${fmtDollars(intv.costLow)}–${fmtDollars(intv.costHigh)}`}
                    </span>
                    {intv.physicianIncrease > 0 && (
                      <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                        +{intv.physicianIncrease}% physicians
                      </span>
                    )}
                    <span className="text-xs bg-green-50 text-green-700 px-1.5 py-0.5 rounded">
                      +{intv.accessImprovement}% access
                    </span>
                    <span className="text-xs bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded">
                      {intv.pipeline}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </SectionCard>

      {/* Combined Impact */}
      {activeInterventions.size > 0 ? (
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
            Combined Intervention Impact ({activeInterventions.size} selected)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <MetricBox
              label="Total Investment"
              value={fmtDollars(combinedImpact.totalCost)}
              sub="Mid-range estimate"
              color="amber"
              large
            />
            <MetricBox
              label="Physician Workforce Increase"
              value={`+${combinedImpact.physicianIncrease.toFixed(1)}%`}
              sub="Combined effect (adj. for overlap)"
              color="green"
              large
            />
            <MetricBox
              label="Access Improvement"
              value={`+${combinedImpact.accessImprovement.toFixed(0)}%`}
              sub="Combined access gain"
              color="green"
              large
            />
            <MetricBox
              label="Additional Patients Served"
              value={fmt(combinedImpact.patientsServed)}
              sub="Estimated annual"
              color="orange"
              large
            />
            <MetricBox
              label="Federal Savings"
              value={fmtDollars(combinedImpact.federalSavings)}
              sub="ED avoidance + reduced travel"
              color="green"
              large
            />
            <MetricBox
              label="Cost Per Additional Patient"
              value={
                combinedImpact.costPerPatient > 0
                  ? fmtDollars(combinedImpact.costPerPatient)
                  : "—"
              }
              sub="Investment efficiency"
              color={combinedImpact.costPerPatient < 500 ? "green" : "amber"}
              large
            />
          </div>
          {combinedImpact.hpsaImprovement > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <TrendingDown size={18} className="text-green-600 shrink-0" />
              <p className="text-sm text-green-800">
                <span className="font-bold">
                  HPSA Score projected to improve by {combinedImpact.hpsaImprovement} points
                </span>{" "}
                — from {hpsaScore} to {Math.max(0, hpsaScore - combinedImpact.hpsaImprovement)} with selected interventions.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center">
          <MapPin size={24} className="text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500">
            Select one or more interventions above to model their combined impact.
          </p>
        </div>
      )}
    </div>
  );
}
