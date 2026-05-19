"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, Activity, Heart, Shield } from "lucide-react";
import { fmt, fmtDollars } from "../WorkforceModeler.data";
import { Slider, SectionCard, MetricBox } from "../WorkforceModeler.atoms";

// TAB 2 DATA – NURSE STAFFING
// ─────────────────────────────────────────────────────────────────────────────

interface UnitDefaults {
  currentRatio: number;
  mandatedRatio: number;
  census: number;
  currentFTE: number;
  avgSalary: number;
  agencyProportion: number;
}

const UNIT_DEFAULTS: Record<string, UnitDefaults> = {
  ICU: {
    currentRatio: 2,
    mandatedRatio: 2,
    census: 24,
    currentFTE: 52,
    avgSalary: 105000,
    agencyProportion: 15,
  },
  "Med/Surg": {
    currentRatio: 6,
    mandatedRatio: 5,
    census: 36,
    currentFTE: 28,
    avgSalary: 82000,
    agencyProportion: 20,
  },
  "Emergency Department": {
    currentRatio: 4,
    mandatedRatio: 4,
    census: 32,
    currentFTE: 42,
    avgSalary: 95000,
    agencyProportion: 25,
  },
  "Labor & Delivery": {
    currentRatio: 2,
    mandatedRatio: 2,
    census: 14,
    currentFTE: 30,
    avgSalary: 98000,
    agencyProportion: 12,
  },
  Pediatrics: {
    currentRatio: 4,
    mandatedRatio: 4,
    census: 20,
    currentFTE: 22,
    avgSalary: 88000,
    agencyProportion: 18,
  },
  Telemetry: {
    currentRatio: 5,
    mandatedRatio: 4,
    census: 30,
    currentFTE: 28,
    avgSalary: 86000,
    agencyProportion: 22,
  },
  "Behavioral Health": {
    currentRatio: 6,
    mandatedRatio: 5,
    census: 18,
    currentFTE: 14,
    avgSalary: 78000,
    agencyProportion: 30,
  },
};

// TAB 2 – NURSE STAFFING RATIO SIMULATOR
// ─────────────────────────────────────────────────────────────────────────────

export function NurseStaffingTab() {
  const [unitType, setUnitType] = useState("Med/Surg");
  const [params, setParams] = useState(UNIT_DEFAULTS["Med/Surg"]);
  const [agencyPremium, setAgencyPremium] = useState(120); // % premium over staff rate

  const handleUnitChange = (u: string) => {
    setUnitType(u);
    setParams(UNIT_DEFAULTS[u]);
  };

  const results = useMemo(() => {
    const benefitsMult = 1.3;
    const staffCostPerRN = params.avgSalary * benefitsMult;
    const agencyCostPerRN =
      staffCostPerRN * (1 + agencyPremium / 100);

    // RNs currently on staff vs agency
    const currentStaffRNs = params.currentFTE * (1 - params.agencyProportion / 100);
    const currentAgencyRNs = params.currentFTE * (params.agencyProportion / 100);

    // RNs needed under mandate
    const rnNeeded = Math.ceil(params.census / params.mandatedRatio);
    const additionalFTE = Math.max(0, rnNeeded - params.currentFTE);

    // Current annual labor cost
    const currentCost =
      currentStaffRNs * staffCostPerRN + currentAgencyRNs * agencyCostPerRN;

    // New cost: assume additional FTE hired as staff
    const newStaffRNs = currentStaffRNs + additionalFTE;
    const newCost = newStaffRNs * staffCostPerRN + currentAgencyRNs * agencyCostPerRN;
    const additionalCost = newCost - currentCost;

    // Quality outcomes per extra patient per nurse beyond safe ratio
    const overloadPatients = Math.max(
      0,
      params.currentRatio - params.mandatedRatio
    );
    const mortalityRiskReduction = overloadPatients * 7;
    const burnoutReduction = overloadPatients * 23;
    const medErrorReduction = overloadPatients * 15;
    const fallReduction = overloadPatients * 8;

    // Revenue/quality savings
    // Readmission penalty avoidance: ~$15K per readmission prevented
    // Assume 1% mortality reduction → 2 fewer readmissions per 100 patients per year
    const annualPatients = params.census * 365 / 5; // avg 5-day LOS
    const readmissionsAvoided = (mortalityRiskReduction / 100) * 0.3 * annualPatients;
    const readmissionSavings = readmissionsAvoided * 15000;

    // Turnover savings: mandate → lower burnout → turnover reduction
    const turnoverReductionPct = burnoutReduction * 0.4; // each 1% burnout → 0.4% turnover
    const turnoversAvoided = (turnoverReductionPct / 100) * params.currentFTE;
    const turnoverSavings = turnoversAvoided * 82000;

    const totalQualitySavings = readmissionSavings + turnoverSavings;
    const netCost = additionalCost - totalQualitySavings;

    return {
      rnNeeded,
      additionalFTE,
      currentCost,
      additionalCost,
      readmissionsAvoided,
      readmissionSavings,
      turnoverSavings,
      totalQualitySavings,
      netCost,
      overloadPatients,
      mortalityRiskReduction,
      burnoutReduction,
      medErrorReduction,
      fallReduction,
      staffCostPerRN,
      agencyCostPerRN,
    };
  }, [params, agencyPremium]);

  return (
    <div className="space-y-5">
      {/* Unit Selector */}
      <SectionCard title="Unit Type">
        <div className="flex flex-wrap gap-2">
          {Object.keys(UNIT_DEFAULTS).map((u) => (
            <button
              key={u}
              onClick={() => handleUnitChange(u)}
              className={`text-sm px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                unitType === u
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-slate-700 border-gray-300 hover:border-orange-300"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Staffing Parameters */}
        <SectionCard title="Staffing Parameters">
          <div className="space-y-3">
            <Slider
              label="Current Staffing Ratio (patients:nurse)"
              value={params.currentRatio}
              min={1}
              max={8}
              step={1}
              unit=":1"
              onChange={(v) => setParams((p) => ({ ...p, currentRatio: v }))}
            />
            <Slider
              label="Proposed Mandated Ratio (patients:nurse)"
              value={params.mandatedRatio}
              min={1}
              max={8}
              step={1}
              unit=":1"
              onChange={(v) => setParams((p) => ({ ...p, mandatedRatio: v }))}
            />
            <Slider
              label="Average Daily Census (patients)"
              value={params.census}
              min={5}
              max={100}
              step={1}
              onChange={(v) => setParams((p) => ({ ...p, census: v }))}
            />
            <Slider
              label="Current FTE RNs"
              value={params.currentFTE}
              min={5}
              max={200}
              step={1}
              onChange={(v) => setParams((p) => ({ ...p, currentFTE: v }))}
            />
          </div>
        </SectionCard>

        {/* Financial Parameters */}
        <SectionCard title="Financial Parameters">
          <div className="space-y-3">
            <Slider
              label="Average RN Base Salary"
              value={params.avgSalary}
              min={60000}
              max={130000}
              step={1000}
              unit="$"
              onChange={(v) => setParams((p) => ({ ...p, avgSalary: v }))}
            />
            <Slider
              label="Agency/Travel Nurse Premium"
              value={agencyPremium}
              min={50}
              max={200}
              step={5}
              unit="% over staff rate"
              info="Typical range: 50–200% above staff nurse rate"
              onChange={setAgencyPremium}
            />
            <Slider
              label="Current Agency Proportion"
              value={params.agencyProportion}
              min={0}
              max={60}
              step={1}
              unit="%"
              onChange={(v) =>
                setParams((p) => ({ ...p, agencyProportion: v }))
              }
            />
            <div className="bg-orange-50 rounded-lg p-3 text-xs text-orange-700 space-y-1">
              <p>
                <span className="font-semibold">Staff cost (w/ benefits):</span>{" "}
                {fmtDollars(results.staffCostPerRN)}/yr
              </p>
              <p>
                <span className="font-semibold">Agency cost (w/ benefits):</span>{" "}
                {fmtDollars(results.agencyCostPerRN)}/yr
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Quality Impact Panel */}
      <SectionCard title="Quality Outcome Correlation (Evidence-Based)" accent>
        <p className="text-xs text-slate-500 mb-3">
          Current ratio ({params.currentRatio}:1) vs proposed mandate (
          {params.mandatedRatio}:1) — each extra patient beyond safe ratio:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Mortality Risk",
              value: results.mortalityRiskReduction,
              icon: <Heart size={14} />,
              unit: "% reduction",
              color: "text-red-600",
            },
            {
              label: "Nurse Burnout",
              value: results.burnoutReduction,
              icon: <Activity size={14} />,
              unit: "% reduction",
              color: "text-orange-600",
            },
            {
              label: "Medication Errors",
              value: results.medErrorReduction,
              icon: <AlertTriangle size={14} />,
              unit: "% reduction",
              color: "text-amber-600",
            },
            {
              label: "Patient Falls",
              value: results.fallReduction,
              icon: <Shield size={14} />,
              unit: "% reduction",
              color: "text-blue-600",
            },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white rounded-lg border border-gray-200 p-3 text-center"
            >
              <div
                className={`flex justify-center mb-1 ${m.color}`}
              >
                {m.icon}
              </div>
              <p
                className={`text-xl font-bold ${m.color}`}
              >
                {m.value > 0 ? `-${m.value}%` : "—"}
              </p>
              <p className="text-xs text-slate-500">{m.label}</p>
              <p className="text-xs text-slate-400">{m.unit}</p>
            </div>
          ))}
        </div>
        {results.overloadPatients === 0 && (
          <p className="text-xs text-green-600 mt-2 font-medium">
            Current ratio already meets mandate — no additional quality burden.
          </p>
        )}
      </SectionCard>

      {/* Financial Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricBox
          label="RNs Needed (Mandate)"
          value={fmt(results.rnNeeded)}
          sub={`${fmt(results.additionalFTE)} additional FTE`}
          color="orange"
          large
        />
        <MetricBox
          label="Additional Labor Cost"
          value={fmtDollars(results.additionalCost)}
          sub="Annual gross cost of mandate"
          color={results.additionalCost > 0 ? "red" : "green"}
          large
        />
        <MetricBox
          label="Quality Savings"
          value={fmtDollars(results.totalQualitySavings)}
          sub={`${fmt(results.readmissionsAvoided, 0)} readmissions avoided`}
          color="green"
          large
        />
        <MetricBox
          label="Net Cost of Mandate"
          value={fmtDollars(results.netCost)}
          sub="After quality savings"
          color={results.netCost <= 0 ? "green" : "amber"}
          large
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <MetricBox
          label="Readmission Savings"
          value={fmtDollars(results.readmissionSavings)}
          sub={`${fmt(results.readmissionsAvoided, 1)} readmissions prevented`}
          color="green"
        />
        <MetricBox
          label="Turnover Savings"
          value={fmtDollars(results.turnoverSavings)}
          sub="From reduced burnout → lower attrition"
          color="green"
        />
      </div>
    </div>
  );
}
