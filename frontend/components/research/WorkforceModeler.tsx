"use client";

import { useState, useMemo } from "react";
import {
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  MapPin,
  Activity,
  Heart,
  Stethoscope,
  BarChart2,
  RefreshCw,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Info,
  Zap,
  Shield,
  Home,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type Tab = "supply" | "staffing" | "turnover" | "rural";

// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3 DATA – TURNOVER ROI
// ─────────────────────────────────────────────────────────────────────────────

interface RoleDefaults {
  salary: number;
  turnoverRate: number;
  recruitCost: number;
  onboardCost: number;
  vacancyDays: number;
  agencyFillPremium: number;
  benchmark: string;
}

const ROLE_DEFAULTS: Record<string, RoleDefaults> = {
  RN: {
    salary: 85000,
    turnoverRate: 22,
    recruitCost: 5000,
    onboardCost: 10000,
    vacancyDays: 75,
    agencyFillPremium: 120,
    benchmark: "~22% national avg",
  },
  Physician: {
    salary: 300000,
    turnoverRate: 6,
    recruitCost: 40000,
    onboardCost: 30000,
    vacancyDays: 120,
    agencyFillPremium: 180,
    benchmark: "~6% national avg",
  },
  "Advanced Practice Provider": {
    salary: 130000,
    turnoverRate: 14,
    recruitCost: 15000,
    onboardCost: 12000,
    vacancyDays: 90,
    agencyFillPremium: 150,
    benchmark: "~14% national avg",
  },
  Technician: {
    salary: 55000,
    turnoverRate: 28,
    recruitCost: 3000,
    onboardCost: 5000,
    vacancyDays: 45,
    agencyFillPremium: 80,
    benchmark: "~28% national avg",
  },
  "Clinical Support": {
    salary: 42000,
    turnoverRate: 32,
    recruitCost: 2500,
    onboardCost: 4000,
    vacancyDays: 30,
    agencyFillPremium: 60,
    benchmark: "~32% national avg",
  },
};

const RETENTION_PROGRAMS: Record<
  string,
  { costPerEmployee: number; turnoverReduction: number }
> = {
  "Loan Repayment": { costPerEmployee: 10000, turnoverReduction: 8 },
  "Sign-on Bonus": { costPerEmployee: 8000, turnoverReduction: 5 },
  "Flexible Scheduling": { costPerEmployee: 1200, turnoverReduction: 12 },
  "Childcare Subsidy": { costPerEmployee: 3600, turnoverReduction: 9 },
  "Mental Health EAP Expansion": { costPerEmployee: 800, turnoverReduction: 6 },
  "Advancement Pathways": { costPerEmployee: 2500, turnoverReduction: 14 },
  "Wage Increase (5%)": { costPerEmployee: 4250, turnoverReduction: 18 },
};

// ─────────────────────────────────────────────────────────────────────────────
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

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtDollars(n: number) {
  if (Math.abs(n) >= 1_000_000)
    return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000)
    return `$${Math.round(n / 1000)}K`;
  return `$${Math.round(n)}`;
}

function Pill({
  label,
  color,
}: {
  label: string;
  color: "green" | "red" | "amber" | "blue" | "orange";
}) {
  const cls = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    amber: "bg-amber-100 text-amber-800",
    blue: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
  }[color];
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  info,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
  info?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-xs text-slate-600 font-medium flex items-center gap-1">
          {label}
          {info && (
            <span title={info} className="cursor-help text-slate-400">
              <Info size={11} />
            </span>
          )}
        </label>
        <span className="text-xs font-bold text-orange-700">
          {unit === "$"
            ? fmtDollars(value)
            : `${fmt(value, step < 1 ? 1 : 0)}${unit ?? ""}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full accent-orange-500 cursor-pointer"
      />
    </div>
  );
}

function SectionCard({
  title,
  children,
  accent = false,
}: {
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border ${accent ? "border-orange-200 bg-orange-50" : "border-gray-200 bg-white"} p-4`}
    >
      <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}

function MetricBox({
  label,
  value,
  sub,
  color = "neutral",
  large = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: "green" | "red" | "amber" | "neutral" | "orange";
  large?: boolean;
}) {
  const valueColor = {
    green: "text-green-700",
    red: "text-red-700",
    amber: "text-amber-700",
    neutral: "text-slate-900",
    orange: "text-orange-700",
  }[color];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 flex flex-col gap-0.5">
      <p className="text-xs text-slate-500 leading-tight">{label}</p>
      <p className={`${large ? "text-xl" : "text-base"} font-bold ${valueColor}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1 – PHYSICIAN SUPPLY & DEMAND PROJECTOR
// ─────────────────────────────────────────────────────────────────────────────

function PhysicianSupplyTab() {
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

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2 – NURSE STAFFING RATIO SIMULATOR
// ─────────────────────────────────────────────────────────────────────────────

function NurseStaffingTab() {
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

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3 – WORKFORCE TURNOVER & ROI CALCULATOR
// ─────────────────────────────────────────────────────────────────────────────

function TurnoverROITab() {
  const [role, setRole] = useState("RN");
  const [orgSize, setOrgSize] = useState(500);
  const [roleParams, setRoleParams] = useState(ROLE_DEFAULTS["RN"]);
  const [retentionProgram, setRetentionProgram] = useState("Flexible Scheduling");
  const [programCoverage, setProgramCoverage] = useState(100); // % of workforce covered

  const handleRoleChange = (r: string) => {
    setRole(r);
    setRoleParams(ROLE_DEFAULTS[r]);
  };

  const turnoverResults = useMemo(() => {
    const totalComp =
      roleParams.salary * (1 + roleParams.turnoverRate / 100 / 100); // rough, just use salary
    const benefitsCost = roleParams.salary * 0.3;

    // Daily rate for vacancy calculation
    const dailyRate = roleParams.salary / 260;
    const vacancyLoss = dailyRate * roleParams.vacancyDays * 0.4; // 40% productivity gap
    const agencyFillCost =
      ((roleParams.salary / 260) * (1 + roleParams.agencyFillPremium / 100)) *
      roleParams.vacancyDays;
    const qualityImpact = roleParams.salary * 0.05; // 5% salary equivalent in quality losses

    const costPerTurnover =
      roleParams.recruitCost +
      roleParams.onboardCost +
      vacancyLoss +
      agencyFillCost +
      qualityImpact;

    const annualTurnovers = Math.round(
      orgSize * (roleParams.turnoverRate / 100)
    );
    const totalAnnualCost = annualTurnovers * costPerTurnover;

    return {
      benefitsCost,
      vacancyLoss,
      agencyFillCost,
      qualityImpact,
      costPerTurnover,
      annualTurnovers,
      totalAnnualCost,
    };
  }, [role, orgSize, roleParams]);

  const roiResults = useMemo(() => {
    const prog = RETENTION_PROGRAMS[retentionProgram];
    const coveredEmployees = Math.round(orgSize * (programCoverage / 100));
    const programCost = coveredEmployees * prog.costPerEmployee;

    const newTurnoverRate =
      roleParams.turnoverRate * (1 - prog.turnoverReduction / 100);
    const turnoversAvoided =
      orgSize * ((roleParams.turnoverRate - newTurnoverRate) / 100);
    const savingsFromPrevention =
      turnoversAvoided * turnoverResults.costPerTurnover;

    const netROI = savingsFromPrevention - programCost;
    const roiPct = programCost > 0 ? (netROI / programCost) * 100 : 0;
    const breakEvenMonths =
      savingsFromPrevention > 0
        ? (programCost / (savingsFromPrevention / 12))
        : 0;

    return {
      programCost,
      turnoversAvoided,
      savingsFromPrevention,
      netROI,
      roiPct,
      breakEvenMonths,
      newTurnoverRate,
      coveredEmployees,
    };
  }, [retentionProgram, programCoverage, orgSize, roleParams, turnoverResults]);

  return (
    <div className="space-y-5">
      {/* Role + Org Config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard title="Role Configuration">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-600 font-medium block mb-1">
                Role Type
              </label>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(ROLE_DEFAULTS).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
                      role === r
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-slate-600 border-gray-300 hover:border-orange-300"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Benchmark: {ROLE_DEFAULTS[role].benchmark}
              </p>
            </div>
            <Slider
              label="Organization Workforce Size"
              value={orgSize}
              min={50}
              max={5000}
              step={50}
              unit=" FTE"
              onChange={setOrgSize}
            />
            <Slider
              label="Annual Base Salary"
              value={roleParams.salary}
              min={30000}
              max={500000}
              step={1000}
              unit="$"
              onChange={(v) => setRoleParams((p) => ({ ...p, salary: v }))}
            />
            <Slider
              label="Annual Turnover Rate"
              value={roleParams.turnoverRate}
              min={1}
              max={50}
              step={0.5}
              unit="%"
              onChange={(v) =>
                setRoleParams((p) => ({ ...p, turnoverRate: v }))
              }
            />
          </div>
        </SectionCard>

        <SectionCard title="Turnover Cost Factors">
          <div className="space-y-3">
            <Slider
              label="Recruitment / Search Cost"
              value={roleParams.recruitCost}
              min={0}
              max={100000}
              step={500}
              unit="$"
              onChange={(v) =>
                setRoleParams((p) => ({ ...p, recruitCost: v }))
              }
            />
            <Slider
              label="Onboarding & Training Cost"
              value={roleParams.onboardCost}
              min={0}
              max={75000}
              step={500}
              unit="$"
              onChange={(v) =>
                setRoleParams((p) => ({ ...p, onboardCost: v }))
              }
            />
            <Slider
              label="Vacancy Duration"
              value={roleParams.vacancyDays}
              min={15}
              max={180}
              step={5}
              unit=" days"
              onChange={(v) =>
                setRoleParams((p) => ({ ...p, vacancyDays: v }))
              }
            />
            <Slider
              label="Agency / Locum Fill Premium"
              value={roleParams.agencyFillPremium}
              min={0}
              max={250}
              step={5}
              unit="% over base"
              onChange={(v) =>
                setRoleParams((p) => ({ ...p, agencyFillPremium: v }))
              }
            />
          </div>
        </SectionCard>
      </div>

      {/* Turnover Cost Breakdown */}
      <SectionCard title="Cost Per Turnover Event — Breakdown">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Recruitment", value: roleParams.recruitCost },
            { label: "Onboarding", value: roleParams.onboardCost },
            { label: "Productivity Loss", value: turnoverResults.vacancyLoss },
            { label: "Agency Fill", value: turnoverResults.agencyFillCost },
            { label: "Quality Impact", value: turnoverResults.qualityImpact },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-orange-50 rounded-lg p-3 text-center border border-orange-100"
            >
              <p className="text-xs text-orange-600 font-medium">{item.label}</p>
              <p className="text-base font-bold text-orange-800">
                {fmtDollars(item.value)}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricBox
          label="Cost Per Turnover"
          value={fmtDollars(turnoverResults.costPerTurnover)}
          sub="Total cost per separation"
          color="red"
          large
        />
        <MetricBox
          label="Annual Turnovers"
          value={fmt(turnoverResults.annualTurnovers)}
          sub={`At ${roleParams.turnoverRate}% rate`}
          color="amber"
          large
        />
        <MetricBox
          label="Total Annual Turnover Cost"
          value={fmtDollars(turnoverResults.totalAnnualCost)}
          sub="Organization-wide burden"
          color="red"
          large
        />
        <MetricBox
          label="Per-FTE Turnover Burden"
          value={fmtDollars(turnoverResults.totalAnnualCost / orgSize)}
          sub="Cost spread across all staff"
          color="amber"
          large
        />
      </div>

      {/* Retention Program ROI */}
      <SectionCard title="Retention Program ROI Analysis" accent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">
              Retention Intervention
            </label>
            <select
              value={retentionProgram}
              onChange={(e) => setRetentionProgram(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              {Object.keys(RETENTION_PROGRAMS).map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <div className="mt-2 bg-white rounded-lg border border-orange-200 p-2 text-xs text-slate-600">
              <p>
                <span className="font-semibold">Est. cost/employee/yr:</span>{" "}
                {fmtDollars(RETENTION_PROGRAMS[retentionProgram].costPerEmployee)}
              </p>
              <p>
                <span className="font-semibold">Est. turnover reduction:</span>{" "}
                {RETENTION_PROGRAMS[retentionProgram].turnoverReduction}%
              </p>
            </div>
          </div>
          <div>
            <Slider
              label="Program Coverage (% of workforce)"
              value={programCoverage}
              min={10}
              max={100}
              step={5}
              unit="%"
              onChange={setProgramCoverage}
            />
            <p className="text-xs text-slate-500 mt-1">
              Covering {fmt(roiResults.coveredEmployees)} of {fmt(orgSize)} FTE
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricBox
            label="Program Cost"
            value={fmtDollars(roiResults.programCost)}
            sub="Annual investment"
            color="amber"
            large
          />
          <MetricBox
            label="Turnovers Prevented"
            value={fmt(roiResults.turnoversAvoided, 1)}
            sub={`Rate: ${roiResults.newTurnoverRate.toFixed(1)}% → ${roleParams.turnoverRate.toFixed(1)}%`}
            color="green"
            large
          />
          <MetricBox
            label="Savings Generated"
            value={fmtDollars(roiResults.savingsFromPrevention)}
            sub="Turnover cost avoided"
            color="green"
            large
          />
          <MetricBox
            label="Net ROI"
            value={fmtDollars(roiResults.netROI)}
            sub={`${roiResults.roiPct.toFixed(0)}% return on investment`}
            color={roiResults.netROI >= 0 ? "green" : "red"}
            large
          />
        </div>

        <div className="mt-3 flex items-center gap-2 bg-white rounded-lg border border-orange-200 px-4 py-3">
          <RefreshCw size={16} className="text-orange-500" />
          <p className="text-sm text-slate-700">
            <span className="font-semibold text-orange-700">Break-even:</span>{" "}
            {roiResults.breakEvenMonths > 0
              ? `${roiResults.breakEvenMonths.toFixed(1)} months`
              : "Program self-funding immediately"}
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4 – RURAL WORKFORCE DISTRIBUTION & INCENTIVE MODELER
// ─────────────────────────────────────────────────────────────────────────────

function RuralWorkforceTab() {
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

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ReactNode; short: string }[] =
  [
    {
      id: "supply",
      label: "Physician Supply & Demand",
      icon: <Stethoscope size={15} />,
      short: "Supply & Demand",
    },
    {
      id: "staffing",
      label: "Nurse Staffing Ratios",
      icon: <Users size={15} />,
      short: "Staffing Ratios",
    },
    {
      id: "turnover",
      label: "Turnover & ROI",
      icon: <DollarSign size={15} />,
      short: "Turnover ROI",
    },
    {
      id: "rural",
      label: "Rural Workforce",
      icon: <MapPin size={15} />,
      short: "Rural Workforce",
    },
  ];

export default function WorkforceModeler() {
  const [activeTab, setActiveTab] = useState<Tab>("supply");

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-white/20 rounded-lg p-1.5">
              <BarChart2 size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Workforce & Supply Modeling
            </h1>
            <Pill label="Interactive" color="amber" />
          </div>
          <p className="text-orange-100 text-sm ml-12">
            Evidence-based tools for healthcare workforce planning, staffing
            optimization, and rural access strategy.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === "supply" && <PhysicianSupplyTab />}
        {activeTab === "staffing" && <NurseStaffingTab />}
        {activeTab === "turnover" && <TurnoverROITab />}
        {activeTab === "rural" && <RuralWorkforceTab />}
      </div>
    </div>
  );
}
