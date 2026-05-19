"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { fmt } from "../WorkforceModeler.data";
import { Slider, SectionCard, MetricBox } from "../WorkforceModeler.atoms";

// TAB 1 DATA – PHYSICIAN SUPPLY & DEMAND
// ─────────────────────────────────────────────────────────────────────────────

interface SpecialtyData {
  currentFTE: number;
  annualGrads: number;
  retirementRate: number; // %
  imgContribution: number;
  population: number;
  demandPerProvider: number; // population per FTE
}

const SPECIALTY_DEFAULTS: Record<string, SpecialtyData> = {
  "Family Medicine": {
    currentFTE: 109000,
    annualGrads: 4800,
    retirementRate: 3.5,
    imgContribution: 800,
    population: 330000000,
    demandPerProvider: 3029,
  },
  "Internal Medicine": {
    currentFTE: 135000,
    annualGrads: 8000,
    retirementRate: 3.5,
    imgContribution: 3200,
    population: 330000000,
    demandPerProvider: 2444,
  },
  "General Surgery": {
    currentFTE: 26000,
    annualGrads: 1200,
    retirementRate: 3.8,
    imgContribution: 400,
    population: 330000000,
    demandPerProvider: 12692,
  },
  Orthopedics: {
    currentFTE: 20700,
    annualGrads: 800,
    retirementRate: 3.2,
    imgContribution: 150,
    population: 330000000,
    demandPerProvider: 15942,
  },
  Cardiology: {
    currentFTE: 22000,
    annualGrads: 2000,
    retirementRate: 4.0,
    imgContribution: 600,
    population: 330000000,
    demandPerProvider: 15000,
  },
  Psychiatry: {
    currentFTE: 33000,
    annualGrads: 1900,
    retirementRate: 4.5,
    imgContribution: 1200,
    population: 330000000,
    demandPerProvider: 10000,
  },
  "Emergency Medicine": {
    currentFTE: 41000,
    annualGrads: 2200,
    retirementRate: 3.0,
    imgContribution: 300,
    population: 330000000,
    demandPerProvider: 8049,
  },
  "OB/GYN": {
    currentFTE: 19000,
    annualGrads: 1300,
    retirementRate: 4.2,
    imgContribution: 700,
    population: 165000000,
    demandPerProvider: 8684,
  },
  Pediatrics: {
    currentFTE: 33000,
    annualGrads: 2800,
    retirementRate: 3.5,
    imgContribution: 500,
    population: 74000000,
    demandPerProvider: 2242,
  },
  Oncology: {
    currentFTE: 13300,
    annualGrads: 700,
    retirementRate: 3.8,
    imgContribution: 400,
    population: 330000000,
    demandPerProvider: 24812,
  },
  Neurology: {
    currentFTE: 16700,
    annualGrads: 900,
    retirementRate: 3.5,
    imgContribution: 800,
    population: 330000000,
    demandPerProvider: 19760,
  },
  Radiology: {
    currentFTE: 34000,
    annualGrads: 1100,
    retirementRate: 3.3,
    imgContribution: 600,
    population: 330000000,
    demandPerProvider: 9706,
  },
};

const SPECIALTIES = Object.keys(SPECIALTY_DEFAULTS);

const GEO_SCOPE_MULTIPLIERS: Record<string, number> = {
  National: 1.0,
  Northeast: 0.18,
  Southeast: 0.22,
  Midwest: 0.21,
  West: 0.24,
  Rural: 0.14,
  Urban: 0.56,
};

// TAB 1 – PHYSICIAN SUPPLY & DEMAND PROJECTOR
// ─────────────────────────────────────────────────────────────────────────────

export function PhysicianSupplyTab() {
  const [specialty, setSpecialty] = useState("Family Medicine");
  const [geoScope, setGeoScope] = useState("National");
  const [popGrowthRate, setPopGrowthRate] = useState(0.7);
  const [agingFactor, setAgingFactor] = useState(17);
  const [telemedicineOffset, setTelemedicineOffset] = useState(5);
  const [scopeExpansion, setScopeExpansion] = useState(10);
  const [interventions, setInterventions] = useState({
    gmeExpansion: false,
    loanRepayment: false,
    imgExpansion: false,
    scopeReform: false,
  });
  const [supplyParams, setSupplyParams] = useState<SpecialtyData>(
    SPECIALTY_DEFAULTS["Family Medicine"]
  );

  // Sync supply params when specialty changes
  const handleSpecialtyChange = (s: string) => {
    setSpecialty(s);
    setSupplyParams(SPECIALTY_DEFAULTS[s]);
  };

  const geoMult = GEO_SCOPE_MULTIPLIERS[geoScope];

  const projection = useMemo(() => {
    const years = Array.from({ length: 11 }, (_, i) => i);
    const rows: {
      year: number;
      baseSupply: number;
      interventionSupply: number;
      baseDemand: number;
      baseGap: number;
      interventionGap: number;
      baseGapPct: number;
      interventionGapPct: number;
    }[] = [];

    const initSupply = supplyParams.currentFTE * geoMult;
    const grads = supplyParams.annualGrads * geoMult;
    const imgBase = supplyParams.imgContribution * geoMult;
    const retRate = supplyParams.retirementRate / 100;

    const initPop = supplyParams.population * geoMult;
    const demandPerProvider = supplyParams.demandPerProvider;

    // Intervention bonuses
    const extraGrads = interventions.gmeExpansion ? 2000 * geoMult : 0;
    const ruralRetentionBonus = interventions.loanRepayment ? 0.05 : 0;
    const extraImg = interventions.imgExpansion ? 3000 * geoMult : 0;
    const scopeReformReduction = interventions.scopeReform ? 15 : 0;

    for (const yr of years) {
      // Base supply: starts + cumulative net additions
      const baseSupply =
        initSupply * Math.pow(1 - retRate, yr) +
        (grads + imgBase) *
          (1 - Math.pow(1 - retRate, yr)) /
          retRate;

      const interventionSupply =
        initSupply * Math.pow(1 - retRate * (1 - ruralRetentionBonus), yr) +
        (grads + extraGrads + imgBase + extraImg) *
          (1 -
            Math.pow(1 - retRate * (1 - ruralRetentionBonus), yr)) /
          (retRate * (1 - ruralRetentionBonus));

      const pop = initPop * Math.pow(1 + popGrowthRate / 100, yr);
      const agingMultiplier = 1 + (agingFactor - 15) * 0.008;
      const teleMult = 1 - telemedicineOffset / 100;
      const baseScopeMult = 1 - scopeExpansion / 100;
      const interventionScopeMult =
        1 - (scopeExpansion + scopeReformReduction) / 100;

      const baseDemand =
        (pop / demandPerProvider) * agingMultiplier * teleMult * baseScopeMult;
      const interventionDemand =
        (pop / demandPerProvider) *
        agingMultiplier *
        teleMult *
        interventionScopeMult;

      rows.push({
        year: yr,
        baseSupply: Math.round(baseSupply),
        interventionSupply: Math.round(interventionSupply),
        baseDemand: Math.round(baseDemand),
        baseGap: Math.round(baseSupply - baseDemand),
        interventionGap: Math.round(interventionSupply - interventionDemand),
        baseGapPct:
          baseDemand > 0
            ? ((baseSupply - baseDemand) / baseDemand) * 100
            : 0,
        interventionGapPct:
          interventionDemand > 0
            ? ((interventionSupply - interventionDemand) / interventionDemand) *
              100
            : 0,
      });
    }

    return rows;
  }, [specialty, geoScope, supplyParams, popGrowthRate, agingFactor, telemedicineOffset, scopeExpansion, interventions]);

  const yr10Base = projection[10];
  const hpsaThreshold = -3500 * geoMult;
  const isHPSA = yr10Base.baseGap < hpsaThreshold;
  const isHPSAWithPolicy = yr10Base.interventionGap < hpsaThreshold;

  function toggleIntervention(key: keyof typeof interventions) {
    setInterventions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Specialty + Geo */}
        <SectionCard title="Specialty & Geography">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-600 font-medium block mb-1">
                Specialty
              </label>
              <select
                value={specialty}
                onChange={(e) => handleSpecialtyChange(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                {SPECIALTIES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600 font-medium block mb-1">
                Geographic Scope
              </label>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(GEO_SCOPE_MULTIPLIERS).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGeoScope(g)}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
                      geoScope === g
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-slate-600 border-gray-300 hover:border-orange-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Supply Inputs */}
        <SectionCard title="Base Supply Inputs (AAMC Data)">
          <div className="space-y-3">
            <Slider
              label="Current Active Physicians (FTE)"
              value={supplyParams.currentFTE}
              min={1000}
              max={200000}
              step={500}
              onChange={(v) =>
                setSupplyParams((p) => ({ ...p, currentFTE: v }))
              }
            />
            <Slider
              label="Annual New Graduates"
              value={supplyParams.annualGrads}
              min={100}
              max={15000}
              step={100}
              onChange={(v) =>
                setSupplyParams((p) => ({ ...p, annualGrads: v }))
              }
            />
            <Slider
              label="Annual Retirement Rate"
              value={supplyParams.retirementRate}
              min={1}
              max={8}
              step={0.1}
              unit="%"
              onChange={(v) =>
                setSupplyParams((p) => ({ ...p, retirementRate: v }))
              }
            />
            <Slider
              label="Annual IMG Contribution"
              value={supplyParams.imgContribution}
              min={0}
              max={8000}
              step={100}
              onChange={(v) =>
                setSupplyParams((p) => ({ ...p, imgContribution: v }))
              }
            />
          </div>
        </SectionCard>

        {/* Demand Inputs */}
        <SectionCard title="Demand Inputs">
          <div className="space-y-3">
            <Slider
              label="Population Growth Rate"
              value={popGrowthRate}
              min={0}
              max={3}
              step={0.1}
              unit="%/yr"
              onChange={setPopGrowthRate}
            />
            <Slider
              label="Population 65+ (Aging Factor)"
              value={agingFactor}
              min={10}
              max={35}
              step={0.5}
              unit="%"
              info="Higher aging = more demand. National avg ~17%."
              onChange={setAgingFactor}
            />
            <Slider
              label="Telemedicine Demand Offset"
              value={telemedicineOffset}
              min={0}
              max={20}
              step={1}
              unit="%"
              info="Reduction in in-person demand from telehealth"
              onChange={setTelemedicineOffset}
            />
            <Slider
              label="Scope of Practice Expansion (NP/PA substitution)"
              value={scopeExpansion}
              min={0}
              max={30}
              step={1}
              unit="%"
              info="Estimated % of demand met by NPs/PAs"
              onChange={setScopeExpansion}
            />
          </div>
        </SectionCard>

        {/* Policy Interventions */}
        <SectionCard title="Policy Interventions (Toggle)" accent>
          <div className="space-y-2">
            {(
              [
                ["gmeExpansion", "GME Expansion (+2,000 slots nationwide)"],
                ["loanRepayment", "Loan Repayment (+5% rural retention)"],
                ["imgExpansion", "IMG Pathway Expansion (+3,000/yr)"],
                ["scopeReform", "Scope of Practice Reform (+15% substitution)"],
              ] as [keyof typeof interventions, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => toggleIntervention(key)}
                className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg border transition-colors ${
                  interventions[key]
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-slate-700 border-gray-300 hover:border-orange-300"
                }`}
              >
                <span className="text-left font-medium">{label}</span>
                {interventions[key] ? (
                  <CheckCircle size={16} />
                ) : (
                  <XCircle size={16} className="text-slate-400" />
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-orange-600 mt-2">
            Active interventions are reflected in the "With Policy" column.
          </p>
        </SectionCard>
      </div>

      {/* HPSA Alert */}
      {isHPSA && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertTriangle size={18} className="text-red-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-bold text-red-700">
              HPSA Designation Alert — Year 10
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              Projected shortage ({fmt(Math.abs(yr10Base.baseGap))} FTE) exceeds
              HRSA HPSA threshold. {isHPSAWithPolicy ? "Policy interventions do not resolve shortage." : "Policy interventions bring shortage below threshold."}
            </p>
          </div>
        </div>
      )}

      {/* Projection Table */}
      <SectionCard title="10-Year Supply & Demand Projection">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-3 text-slate-500 font-semibold">Year</th>
                <th className="text-right py-2 px-2 text-slate-500 font-semibold">Supply (Base)</th>
                <th className="text-right py-2 px-2 text-slate-500 font-semibold">Supply (Policy)</th>
                <th className="text-right py-2 px-2 text-slate-500 font-semibold">Demand</th>
                <th className="text-right py-2 px-2 text-orange-600 font-semibold">Gap (Base)</th>
                <th className="text-right py-2 px-2 text-orange-600 font-semibold">Gap (Policy)</th>
                <th className="text-right py-2 px-2 text-slate-500 font-semibold">Gap%</th>
              </tr>
            </thead>
            <tbody>
              {projection.map((row) => (
                <tr
                  key={row.year}
                  className={`border-b border-gray-100 ${row.year === 10 ? "bg-orange-50 font-bold" : ""}`}
                >
                  <td className="py-1.5 pr-3 text-slate-700">
                    {row.year === 0 ? "Baseline" : `+${row.year}`}
                  </td>
                  <td className="py-1.5 px-2 text-right text-slate-700">
                    {fmt(row.baseSupply)}
                  </td>
                  <td className="py-1.5 px-2 text-right text-blue-700">
                    {fmt(row.interventionSupply)}
                  </td>
                  <td className="py-1.5 px-2 text-right text-slate-700">
                    {fmt(row.baseDemand)}
                  </td>
                  <td
                    className={`py-1.5 px-2 text-right font-semibold ${
                      row.baseGap >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {row.baseGap >= 0 ? "+" : ""}
                    {fmt(row.baseGap)}
                  </td>
                  <td
                    className={`py-1.5 px-2 text-right font-semibold ${
                      row.interventionGap >= 0 ? "text-green-600" : "text-orange-600"
                    }`}
                  >
                    {row.interventionGap >= 0 ? "+" : ""}
                    {fmt(row.interventionGap)}
                  </td>
                  <td
                    className={`py-1.5 px-2 text-right ${
                      row.baseGapPct >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {row.baseGapPct >= 0 ? "+" : ""}
                    {row.baseGapPct.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricBox
          label="Year 10 Base Gap"
          value={`${yr10Base.baseGap >= 0 ? "+" : ""}${fmt(yr10Base.baseGap)}`}
          sub="FTE"
          color={yr10Base.baseGap >= 0 ? "green" : "red"}
          large
        />
        <MetricBox
          label="Year 10 Policy Gap"
          value={`${yr10Base.interventionGap >= 0 ? "+" : ""}${fmt(yr10Base.interventionGap)}`}
          sub="FTE"
          color={yr10Base.interventionGap >= 0 ? "green" : "amber"}
          large
        />
        <MetricBox
          label="Policy Improvement"
          value={`${fmt(yr10Base.interventionGap - yr10Base.baseGap)}`}
          sub="FTE added by policy"
          color="orange"
        />
        <MetricBox
          label="HPSA Risk"
          value={isHPSAWithPolicy ? "Persists" : isHPSA ? "Mitigated" : "None"}
          sub="Year 10 assessment"
          color={isHPSAWithPolicy ? "red" : isHPSA ? "amber" : "green"}
        />
      </div>
    </div>
  );
}
