"use client";

import { useState, useMemo } from "react";
import {
  Users,
  MapPin,
  BarChart2,
  Calculator,
  ChevronDown,
  ChevronUp,
  Info,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Minus,
} from "lucide-react";

// ─── Utility helpers ───────────────────────────────────────────────────────────
function fmt(n: number, decimals = 0) {
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}
function fmtUSD(n: number) {
  return "$" + fmt(Math.round(n));
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

// ─── TAB 1 DATA ────────────────────────────────────────────────────────────────
// disparity ratios relative to White non-Hispanic (1.0 = parity)
// values sourced from CDC / AHRQ national benchmarks
const HEALTH_OUTCOMES = [
  {
    label: "Diabetes Prevalence",
    unit: "% adults",
    baselineWhite: 7.4,
    perEventCost: 16_750,
    groups: {
      white: { ratio: 1.0, label: "White (non-Hispanic)" },
      black: { ratio: 1.68, label: "Black/African American" },
      hispanic: { ratio: 1.62, label: "Hispanic/Latino" },
      asian: { ratio: 0.89, label: "Asian/Pacific Islander" },
      aian: { ratio: 2.05, label: "American Indian/Alaska Native" },
    },
    decomp: { income: 28, insurance: 18, access: 14, quality: 12, structural: 28 },
  },
  {
    label: "Hypertension Control",
    unit: "% uncontrolled",
    baselineWhite: 24.0,
    perEventCost: 9_400,
    groups: {
      white: { ratio: 1.0, label: "White (non-Hispanic)" },
      black: { ratio: 1.52, label: "Black/African American" },
      hispanic: { ratio: 1.31, label: "Hispanic/Latino" },
      asian: { ratio: 0.95, label: "Asian/Pacific Islander" },
      aian: { ratio: 1.44, label: "American Indian/Alaska Native" },
    },
    decomp: { income: 20, insurance: 22, access: 18, quality: 20, structural: 20 },
  },
  {
    label: "Maternal Mortality",
    unit: "per 100,000 live births",
    baselineWhite: 14.1,
    perEventCost: 1_200_000,
    groups: {
      white: { ratio: 1.0, label: "White (non-Hispanic)" },
      black: { ratio: 2.98, label: "Black/African American" },
      hispanic: { ratio: 1.17, label: "Hispanic/Latino" },
      asian: { ratio: 0.85, label: "Asian/Pacific Islander" },
      aian: { ratio: 2.27, label: "American Indian/Alaska Native" },
    },
    decomp: { income: 18, insurance: 20, access: 15, quality: 22, structural: 25 },
  },
  {
    label: "Infant Mortality",
    unit: "per 1,000 live births",
    baselineWhite: 4.4,
    perEventCost: 890_000,
    groups: {
      white: { ratio: 1.0, label: "White (non-Hispanic)" },
      black: { ratio: 2.22, label: "Black/African American" },
      hispanic: { ratio: 0.97, label: "Hispanic/Latino" },
      asian: { ratio: 0.70, label: "Asian/Pacific Islander" },
      aian: { ratio: 1.91, label: "American Indian/Alaska Native" },
    },
    decomp: { income: 25, insurance: 15, access: 18, quality: 17, structural: 25 },
  },
  {
    label: "Cancer Screening Rates",
    unit: "% unscreened",
    baselineWhite: 22.0,
    perEventCost: 48_000,
    groups: {
      white: { ratio: 1.0, label: "White (non-Hispanic)" },
      black: { ratio: 1.18, label: "Black/African American" },
      hispanic: { ratio: 1.42, label: "Hispanic/Latino" },
      asian: { ratio: 1.35, label: "Asian/Pacific Islander" },
      aian: { ratio: 1.60, label: "American Indian/Alaska Native" },
    },
    decomp: { income: 22, insurance: 28, access: 20, quality: 12, structural: 18 },
  },
  {
    label: "Mental Health Access",
    unit: "% unmet need",
    baselineWhite: 18.5,
    perEventCost: 7_200,
    groups: {
      white: { ratio: 1.0, label: "White (non-Hispanic)" },
      black: { ratio: 1.44, label: "Black/African American" },
      hispanic: { ratio: 1.58, label: "Hispanic/Latino" },
      asian: { ratio: 0.81, label: "Asian/Pacific Islander" },
      aian: { ratio: 1.72, label: "American Indian/Alaska Native" },
    },
    decomp: { income: 20, insurance: 25, access: 22, quality: 15, structural: 18 },
  },
  {
    label: "COVID-19 Hospitalization",
    unit: "age-adj rate per 100K",
    baselineWhite: 78.0,
    perEventCost: 22_000,
    groups: {
      white: { ratio: 1.0, label: "White (non-Hispanic)" },
      black: { ratio: 2.78, label: "Black/African American" },
      hispanic: { ratio: 3.01, label: "Hispanic/Latino" },
      asian: { ratio: 1.61, label: "Asian/Pacific Islander" },
      aian: { ratio: 3.45, label: "American Indian/Alaska Native" },
    },
    decomp: { income: 30, insurance: 15, access: 12, quality: 10, structural: 33 },
  },
  {
    label: "Opioid Overdose",
    unit: "per 100,000",
    baselineWhite: 24.0,
    perEventCost: 165_000,
    groups: {
      white: { ratio: 1.0, label: "White (non-Hispanic)" },
      black: { ratio: 1.21, label: "Black/African American" },
      hispanic: { ratio: 0.78, label: "Hispanic/Latino" },
      asian: { ratio: 0.32, label: "Asian/Pacific Islander" },
      aian: { ratio: 1.89, label: "American Indian/Alaska Native" },
    },
    decomp: { income: 26, insurance: 18, access: 20, quality: 14, structural: 22 },
  },
  {
    label: "Life Expectancy",
    unit: "years below White avg",
    baselineWhite: 76.4,
    perEventCost: 150_000,
    groups: {
      white: { ratio: 1.0, label: "White (non-Hispanic)" },
      black: { ratio: 0.928, label: "Black/African American" },
      hispanic: { ratio: 1.031, label: "Hispanic/Latino" },
      asian: { ratio: 1.074, label: "Asian/Pacific Islander" },
      aian: { ratio: 0.903, label: "American Indian/Alaska Native" },
    },
    decomp: { income: 30, insurance: 15, access: 12, quality: 12, structural: 31 },
  },
  {
    label: "Preventable Hospitalization",
    unit: "per 100,000",
    baselineWhite: 1_420,
    perEventCost: 11_500,
    groups: {
      white: { ratio: 1.0, label: "White (non-Hispanic)" },
      black: { ratio: 2.48, label: "Black/African American" },
      hispanic: { ratio: 1.74, label: "Hispanic/Latino" },
      asian: { ratio: 0.78, label: "Asian/Pacific Islander" },
      aian: { ratio: 2.12, label: "American Indian/Alaska Native" },
    },
    decomp: { income: 24, insurance: 22, access: 18, quality: 16, structural: 20 },
  },
];

// ─── TAB 2 DATA ────────────────────────────────────────────────────────────────
const URBAN_RURAL_TYPES = [
  { label: "Metropolitan Large (>1M)", value: "metro_large" },
  { label: "Metropolitan Small (250K–1M)", value: "metro_small" },
  { label: "Micropolitan (10K–50K)", value: "micro" },
  { label: "Small Rural (2.5K–10K)", value: "small_rural" },
  { label: "Isolated Rural (<2.5K)", value: "isolated_rural" },
];

const SERVICE_TYPES = [
  { label: "Primary Care", value: "primary" },
  { label: "Behavioral Health", value: "behavioral" },
  { label: "OB/GYN", value: "obgyn" },
  { label: "Specialty Care", value: "specialty" },
  { label: "Emergency", value: "emergency" },
  { label: "Dental", value: "dental" },
  { label: "Pharmacy", value: "pharmacy" },
];

type UrbanKey = "metro_large" | "metro_small" | "micro" | "small_rural" | "isolated_rural";
type ServiceKey = "primary" | "behavioral" | "obgyn" | "specialty" | "emergency" | "dental" | "pharmacy";

const GEO_DATA: Record<UrbanKey, Record<ServiceKey, {
  accessRate: number;
  providerDensity: number;
  hpsa: "Yes" | "Partial" | "No";
  waitTime: string;
  uninsuredRate: number;
}>> = {
  metro_large: {
    primary:    { accessRate: 94, providerDensity: 9.2, hpsa: "No",      waitTime: "8 days",  uninsuredRate: 9  },
    behavioral: { accessRate: 82, providerDensity: 5.4, hpsa: "Partial", waitTime: "23 days", uninsuredRate: 9  },
    obgyn:      { accessRate: 91, providerDensity: 4.1, hpsa: "No",      waitTime: "12 days", uninsuredRate: 9  },
    specialty:  { accessRate: 89, providerDensity: 12.8,hpsa: "No",      waitTime: "18 days", uninsuredRate: 9  },
    emergency:  { accessRate: 98, providerDensity: 3.2, hpsa: "No",      waitTime: "2.8 hrs", uninsuredRate: 9  },
    dental:     { accessRate: 79, providerDensity: 6.1, hpsa: "Partial", waitTime: "14 days", uninsuredRate: 9  },
    pharmacy:   { accessRate: 97, providerDensity: 8.9, hpsa: "No",      waitTime: "Same day",uninsuredRate: 9  },
  },
  metro_small: {
    primary:    { accessRate: 88, providerDensity: 7.4, hpsa: "No",      waitTime: "11 days", uninsuredRate: 11 },
    behavioral: { accessRate: 71, providerDensity: 3.8, hpsa: "Partial", waitTime: "31 days", uninsuredRate: 11 },
    obgyn:      { accessRate: 83, providerDensity: 3.2, hpsa: "No",      waitTime: "17 days", uninsuredRate: 11 },
    specialty:  { accessRate: 78, providerDensity: 9.2, hpsa: "No",      waitTime: "24 days", uninsuredRate: 11 },
    emergency:  { accessRate: 96, providerDensity: 2.8, hpsa: "No",      waitTime: "3.4 hrs", uninsuredRate: 11 },
    dental:     { accessRate: 68, providerDensity: 4.8, hpsa: "Partial", waitTime: "18 days", uninsuredRate: 11 },
    pharmacy:   { accessRate: 92, providerDensity: 7.1, hpsa: "No",      waitTime: "Same day",uninsuredRate: 11 },
  },
  micro: {
    primary:    { accessRate: 72, providerDensity: 4.9, hpsa: "Partial", waitTime: "16 days", uninsuredRate: 14 },
    behavioral: { accessRate: 48, providerDensity: 1.9, hpsa: "Yes",     waitTime: "52 days", uninsuredRate: 14 },
    obgyn:      { accessRate: 61, providerDensity: 1.8, hpsa: "Partial", waitTime: "28 days", uninsuredRate: 14 },
    specialty:  { accessRate: 55, providerDensity: 4.7, hpsa: "Partial", waitTime: "38 days", uninsuredRate: 14 },
    emergency:  { accessRate: 89, providerDensity: 1.8, hpsa: "No",      waitTime: "4.8 hrs", uninsuredRate: 14 },
    dental:     { accessRate: 52, providerDensity: 2.8, hpsa: "Yes",     waitTime: "25 days", uninsuredRate: 14 },
    pharmacy:   { accessRate: 78, providerDensity: 4.2, hpsa: "Partial", waitTime: "1 day",   uninsuredRate: 14 },
  },
  small_rural: {
    primary:    { accessRate: 54, providerDensity: 2.9, hpsa: "Yes",     waitTime: "22 days", uninsuredRate: 18 },
    behavioral: { accessRate: 28, providerDensity: 0.8, hpsa: "Yes",     waitTime: "74 days", uninsuredRate: 18 },
    obgyn:      { accessRate: 34, providerDensity: 0.7, hpsa: "Yes",     waitTime: "45 days", uninsuredRate: 18 },
    specialty:  { accessRate: 32, providerDensity: 1.8, hpsa: "Yes",     waitTime: "58 days", uninsuredRate: 18 },
    emergency:  { accessRate: 71, providerDensity: 0.9, hpsa: "Partial", waitTime: "7.2 hrs", uninsuredRate: 18 },
    dental:     { accessRate: 38, providerDensity: 1.4, hpsa: "Yes",     waitTime: "38 days", uninsuredRate: 18 },
    pharmacy:   { accessRate: 61, providerDensity: 2.2, hpsa: "Yes",     waitTime: "2 days",  uninsuredRate: 18 },
  },
  isolated_rural: {
    primary:    { accessRate: 31, providerDensity: 1.4, hpsa: "Yes",     waitTime: "34 days", uninsuredRate: 22 },
    behavioral: { accessRate: 14, providerDensity: 0.3, hpsa: "Yes",     waitTime: "98 days", uninsuredRate: 22 },
    obgyn:      { accessRate: 18, providerDensity: 0.3, hpsa: "Yes",     waitTime: "68 days", uninsuredRate: 22 },
    specialty:  { accessRate: 16, providerDensity: 0.7, hpsa: "Yes",     waitTime: "82 days", uninsuredRate: 22 },
    emergency:  { accessRate: 48, providerDensity: 0.5, hpsa: "Yes",     waitTime: "12.4 hrs",uninsuredRate: 22 },
    dental:     { accessRate: 22, providerDensity: 0.6, hpsa: "Yes",     waitTime: "56 days", uninsuredRate: 22 },
    pharmacy:   { accessRate: 38, providerDensity: 0.9, hpsa: "Yes",     waitTime: "3 days",  uninsuredRate: 22 },
  },
};

const INTERVENTIONS = [
  { label: "Telehealth Expansion", minGain: 15, maxGain: 30, costPerPct: 42_000 },
  { label: "Rural Health Clinic",  minGain: 10, maxGain: 20, costPerPct: 185_000 },
  { label: "FQHC (new site)",      minGain: 20, maxGain: 25, costPerPct: 620_000 },
  { label: "Mobile Health Unit",   minGain:  5, maxGain: 15, costPerPct: 95_000  },
  { label: "Loan Repayment Prog.", minGain:  8, maxGain: 12, costPerPct: 78_000  },
];

// ─── TAB 3 DATA ────────────────────────────────────────────────────────────────
const SDOH_DOMAINS = [
  {
    id: "economic",
    label: "Economic Stability",
    color: "amber",
    indicators: [
      { id: "poverty",      label: "Income Poverty %",       national: 12.8, higherIsBetter: false, unit: "%" },
      { id: "unemployment", label: "Unemployment %",          national: 3.7,  higherIsBetter: false, unit: "%" },
      { id: "housing_cost", label: "Housing Cost Burden %",  national: 29.4, higherIsBetter: false, unit: "%" },
    ],
  },
  {
    id: "education",
    label: "Education Access",
    color: "orange",
    indicators: [
      { id: "hs_completion",   label: "HS Completion %",        national: 91.1, higherIsBetter: true,  unit: "%" },
      { id: "higher_ed",       label: "Higher Education %",     national: 35.5, higherIsBetter: true,  unit: "%" },
      { id: "reading_prof",    label: "Reading Proficiency %",  national: 67.0, higherIsBetter: true,  unit: "%" },
    ],
  },
  {
    id: "social",
    label: "Social Context",
    color: "yellow",
    indicators: [
      { id: "isolation",       label: "Social Isolation %",     national: 22.0, higherIsBetter: false, unit: "%" },
      { id: "language",        label: "Language Barriers %",    national: 8.4,  higherIsBetter: false, unit: "%" },
      { id: "incarceration",   label: "Incarceration Rate",     national: 355,  higherIsBetter: false, unit: "per 100K" },
    ],
  },
  {
    id: "health",
    label: "Health & Healthcare",
    color: "red",
    indicators: [
      { id: "uninsured",       label: "Uninsured %",            national: 8.6,  higherIsBetter: false, unit: "%" },
      { id: "disability",      label: "Disability Rate %",      national: 13.0, higherIsBetter: false, unit: "%" },
      { id: "mh_ratio",        label: "MH Provider Ratio",      national: 280,  higherIsBetter: true,  unit: "pop:provider" },
    ],
  },
  {
    id: "neighborhood",
    label: "Neighborhood/Environment",
    color: "lime",
    indicators: [
      { id: "food_desert",     label: "Food Desert %",          national: 19.2, higherIsBetter: false, unit: "%" },
      { id: "air_quality",     label: "Air Quality Index",      national: 42.0, higherIsBetter: false, unit: "AQI" },
      { id: "housing_quality", label: "Housing Quality % poor", national: 14.5, higherIsBetter: false, unit: "%" },
    ],
  },
];

// Lookup: SDOH score (0-100) → expected outcomes
function sdohToOutcomes(score: number) {
  // score 100 = best; 0 = worst
  const le = 66.0 + (score / 100) * 14.0;          // 66–80 yrs
  const dm = 18.0 - (score / 100) * 10.5;           // 7.5–18 %
  const dep = 28.0 - (score / 100) * 14.0;          // 14–28 %
  const im = 10.0 - (score / 100) * 6.0;            // 4–10 per 1K
  return { lifeExpectancy: le, diabetesRate: dm, depressionRate: dep, infantMortality: im };
}

const SDOH_INTERVENTIONS = [
  { label: "Housing Subsidy",             costPerPerson: 8_400,  impactFactor: 0.18, healthCostAvoidance: 3_200  },
  { label: "Food Pantry / SNAP Enroll.",  costPerPerson: 1_200,  impactFactor: 0.08, healthCostAvoidance: 940   },
  { label: "Job Training Program",        costPerPerson: 5_800,  impactFactor: 0.14, healthCostAvoidance: 2_400  },
  { label: "Early Childhood Education",   costPerPerson: 9_500,  impactFactor: 0.22, healthCostAvoidance: 5_100  },
  { label: "Legal Aid Services",          costPerPerson: 2_200,  impactFactor: 0.07, healthCostAvoidance: 1_600  },
  { label: "Transportation Vouchers",     costPerPerson: 780,    impactFactor: 0.06, healthCostAvoidance: 1_100  },
];

// ─── TAB 4 DATA ────────────────────────────────────────────────────────────────
const EQUITY_EXAMPLES = [
  {
    label: "Asthma Mgmt — Low-Income Urban",
    interventionCost: 1_850, controlCost: 3_400,
    qalyIntervention: 0.72, qalyControl: 0.58,
    disadvantage: 2.5, equityWeightIdx: 2,
    financialSavings: 980_000, socialValue: 1_400_000, programCost: 820_000,
  },
  {
    label: "Maternal Health Program",
    interventionCost: 4_200, controlCost: 1_100,
    qalyIntervention: 0.91, qalyControl: 0.68,
    disadvantage: 2.0, equityWeightIdx: 1,
    financialSavings: 2_400_000, socialValue: 3_100_000, programCost: 1_800_000,
  },
  {
    label: "SUD Treatment — Rural Areas",
    interventionCost: 6_800, controlCost: 1_200,
    qalyIntervention: 1.14, qalyControl: 0.59,
    disadvantage: 2.8, equityWeightIdx: 3,
    financialSavings: 1_650_000, socialValue: 2_800_000, programCost: 1_100_000,
  },
];

const EQUITY_WEIGHTS = [
  { label: "Unweighted (1.0×)", multiplier: 1.0 },
  { label: "Modest (1.5×)",     multiplier: 1.5 },
  { label: "Moderate (2.0×)",   multiplier: 2.0 },
  { label: "Strong (3.0×)",     multiplier: 3.0 },
];

const WTP_THRESHOLDS_ICER = [
  { label: "NICE (UK)",     value: 30_000,  color: "text-emerald-600" },
  { label: "ICER Standard", value: 100_000, color: "text-sky-600"     },
  { label: "ICER High",     value: 150_000, color: "text-amber-600"   },
  { label: "CMS Informal",  value: 200_000, color: "text-rose-600"    },
];

// ─── Sub-component: tooltip pill ──────────────────────────────────────────────
function Pill({ children, color = "amber" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    amber: "bg-amber-100 text-amber-800",
    red:   "bg-red-100 text-red-800",
    green: "bg-emerald-100 text-emerald-800",
    gray:  "bg-gray-100 text-gray-600",
    blue:  "bg-sky-100 text-sky-800",
    orange:"bg-orange-100 text-orange-800",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${map[color] ?? map.amber}`}>
      {children}
    </span>
  );
}

// ─── Section header helper ─────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-2">
      {children}
    </p>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1 — Racial & Ethnic Disparity Calculator
// ══════════════════════════════════════════════════════════════════════════════
function DisparityCalculator() {
  const [outcomeIdx, setOutcomeIdx] = useState(0);
  const [pop, setPop] = useState({ white: 60, black: 13, hispanic: 19, asian: 6, aian: 2 });
  const [decomp, setDecomp] = useState<Record<string, number>>({});
  const [showDecomp, setShowDecomp] = useState(false);

  const outcome = HEALTH_OUTCOMES[outcomeIdx];

  // keep decomp sliders local or reset when outcome changes
  const activeDecomp = {
    income:     decomp.income     ?? outcome.decomp.income,
    insurance:  decomp.insurance  ?? outcome.decomp.insurance,
    access:     decomp.access     ?? outcome.decomp.access,
    quality:    decomp.quality    ?? outcome.decomp.quality,
    structural: decomp.structural ?? outcome.decomp.structural,
  };

  const results = useMemo(() => {
    const groups = Object.entries(outcome.groups) as [string, { ratio: number; label: string }][];
    const popMap: Record<string, number> = { white: pop.white, black: pop.black, hispanic: pop.hispanic, asian: pop.asian, aian: pop.aian };
    const total = Object.values(popMap).reduce((a, b) => a + b, 0);

    // Weighted rate
    let weightedRate = 0;
    let excessEvents = 0;
    const baseRate = outcome.baselineWhite;

    groups.forEach(([key, g]) => {
      const pct = (popMap[key] ?? 0) / 100;
      const rate = baseRate * g.ratio;
      weightedRate += pct * rate;
      if (g.ratio > 1) excessEvents += pct * (rate - baseRate);
    });

    // population-weighted disparity index (vs all-white scenario)
    const allWhiteRate = baseRate;
    const disparityIndex = total > 0 ? ((weightedRate - allWhiteRate) / allWhiteRate) * 100 : 0;
    const excessEventsScaled = excessEvents * 100_000; // per 100K
    const costOfDisparity = excessEventsScaled * outcome.perEventCost;

    // If disparities eliminated
    const livesSaved = excessEventsScaled;
    const costSavings = costOfDisparity;

    return { weightedRate, disparityIndex, excessEventsScaled, costOfDisparity, livesSaved, costSavings, groups, popMap, baseRate };
  }, [outcome, pop]);

  function handlePopChange(key: string, val: number) {
    setPop((prev) => {
      const next = { ...prev, [key]: val };
      return next;
    });
    setDecomp({});
  }

  const popTotal = pop.white + pop.black + pop.hispanic + pop.asian + pop.aian;

  const groupKeys = ["white", "black", "hispanic", "asian", "aian"] as const;

  function barColor(ratio: number) {
    if (ratio > 1.05) return "bg-red-500";
    if (ratio < 0.95) return "bg-emerald-500";
    return "bg-gray-400";
  }
  function barPill(ratio: number) {
    if (ratio > 1.05) return <Pill color="red">{ratio.toFixed(2)}× excess risk</Pill>;
    if (ratio < 0.95) return <Pill color="green">{ratio.toFixed(2)}× lower risk</Pill>;
    return <Pill color="gray">Reference</Pill>;
  }

  const maxRatio = Math.max(...groupKeys.map((k) => outcome.groups[k].ratio));

  return (
    <div className="space-y-6">
      {/* Outcome selector */}
      <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
        <SectionLabel>Select Health Outcome</SectionLabel>
        <select
          className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          value={outcomeIdx}
          onChange={(e) => { setOutcomeIdx(Number(e.target.value)); setDecomp({}); }}
        >
          {HEALTH_OUTCOMES.map((o, i) => (
            <option key={i} value={i}>{o.label}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-400">National benchmark (White non-Hispanic): {fmt(outcome.baselineWhite, 1)} {outcome.unit}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Disparity bars */}
        <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
          <SectionLabel>National Disparity Profile</SectionLabel>
          <div className="space-y-3">
            {groupKeys.map((key) => {
              const g = outcome.groups[key];
              const pct = (g.ratio / maxRatio) * 100;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-medium text-gray-700 w-44 truncate">{g.label}</span>
                    <div className="flex items-center gap-1.5">
                      {barPill(g.ratio)}
                      <span className="text-xs text-gray-500">{fmt(outcome.baselineWhite * g.ratio, 1)}</span>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${barColor(g.ratio)}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-gray-400 italic">Bar length proportional to disparity ratio relative to highest group.</p>
        </div>

        {/* Population composition sliders */}
        <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
          <SectionLabel>Local Population Composition</SectionLabel>
          {(Object.keys(pop) as (keyof typeof pop)[]).map((key) => {
            const label = outcome.groups[key].label;
            return (
              <div key={key} className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-0.5">
                  <span className="truncate w-44">{label}</span>
                  <span className="font-semibold text-amber-700">{pop[key]}%</span>
                </div>
                <input
                  type="range" min={0} max={100} step={1}
                  value={pop[key]}
                  onChange={(e) => handlePopChange(key, Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            );
          })}
          <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${Math.abs(popTotal - 100) > 0.5 ? "text-red-600" : "text-emerald-600"}`}>
            {Math.abs(popTotal - 100) > 0.5
              ? <><AlertTriangle size={12} /> Total: {popTotal}% — must equal 100%</>
              : <><CheckCircle size={12} /> Total: 100%</>}
          </div>
        </div>
      </div>

      {/* Calculated metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Population-Weighted Rate", value: fmt(results.weightedRate, 2), sub: outcome.unit },
          { label: "Disparity Index", value: (results.disparityIndex >= 0 ? "+" : "") + fmt(results.disparityIndex, 1) + "%", sub: "vs all-White scenario" },
          { label: "Excess Events (per 100K)", value: fmt(results.excessEventsScaled, 0), sub: "attributable to disparity" },
          { label: "Cost of Disparity", value: fmtUSD(results.costOfDisparity), sub: "per 100K population/yr" },
        ].map((card) => (
          <div key={card.label} className="bg-amber-50 rounded-xl border border-amber-200 p-3">
            <p className="text-xs text-amber-700 font-medium leading-tight">{card.label}</p>
            <p className="text-xl font-bold text-amber-900 mt-1">{card.value}</p>
            <p className="text-xs text-amber-500 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Elimination scenario */}
      <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl border border-emerald-200 p-4">
        <SectionLabel>If Disparities Were Eliminated</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-700">{fmt(results.livesSaved, 0)}</p>
            <p className="text-xs text-gray-600 mt-0.5">Excess events prevented<br />(per 100K population)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-700">{fmtUSD(results.costSavings)}</p>
            <p className="text-xs text-gray-600 mt-0.5">Annual cost savings<br />(per 100K population)</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-700">{fmtUSD(results.costSavings / 100)}</p>
            <p className="text-xs text-gray-600 mt-0.5">Per-capita savings<br />(per 100K population)</p>
          </div>
        </div>
      </div>

      {/* Decomposition */}
      <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
        <button
          className="flex items-center gap-2 w-full text-left text-sm font-semibold text-amber-800"
          onClick={() => setShowDecomp(!showDecomp)}
        >
          <BarChart2 size={15} />
          Disparity Decomposition Analysis
          {showDecomp ? <ChevronUp size={14} className="ml-auto" /> : <ChevronDown size={14} className="ml-auto" />}
        </button>
        {showDecomp && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-gray-500">Adjust estimated % of disparity attributable to each factor (must sum to 100%).</p>
            {(["income", "insurance", "access", "quality", "structural"] as const).map((factor) => {
              const labels: Record<string, string> = {
                income: "Income / Socioeconomic",
                insurance: "Insurance Coverage",
                access: "Geographic Access",
                quality: "Care Quality",
                structural: "Structural / Historical",
              };
              const colors: Record<string, string> = {
                income: "bg-amber-400", insurance: "bg-orange-400", access: "bg-yellow-400",
                quality: "bg-red-400", structural: "bg-rose-500",
              };
              const val = activeDecomp[factor];
              return (
                <div key={factor}>
                  <div className="flex justify-between text-xs text-gray-700 mb-0.5">
                    <span>{labels[factor]}</span>
                    <span className="font-semibold">{val}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range" min={0} max={100} step={1}
                      value={val}
                      onChange={(e) => setDecomp((p) => ({ ...activeDecomp, ...p, [factor]: Number(e.target.value) }))}
                      className="flex-1 accent-amber-500"
                    />
                    <div className="h-3 w-20 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[factor]} rounded-full`} style={{ width: `${val}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={`text-xs font-semibold mt-1 ${
              Math.abs(Object.values(activeDecomp).reduce((a, b) => a + b, 0) - 100) > 2
                ? "text-red-600" : "text-emerald-600"
            }`}>
              Total: {Object.values(activeDecomp).reduce((a, b) => a + b, 0)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2 — Geographic Access Gap Analyzer
// ══════════════════════════════════════════════════════════════════════════════
function GeoAccessAnalyzer() {
  const [urbanKey, setUrbanKey] = useState<UrbanKey>("metro_large");
  const [serviceKey, setServiceKey] = useState<ServiceKey>("primary");
  const [activeInterventions, setActiveInterventions] = useState<number[]>([]);

  const data = GEO_DATA[urbanKey][serviceKey];

  // Geo access score: weighted composite
  const baseScore = useMemo(() => {
    const accessWeight = 0.35;
    const densityMax = 12;
    const densityScore = Math.min(data.providerDensity / densityMax, 1) * 100;
    const hpsaScore = data.hpsa === "No" ? 100 : data.hpsa === "Partial" ? 55 : 10;
    const waitRaw = parseInt(data.waitTime) || 0;
    const waitScore = Math.max(0, 100 - waitRaw * 1.2);
    const insuredScore = 100 - data.uninsuredRate * 2;
    return (
      data.accessRate * accessWeight +
      densityScore * 0.25 +
      hpsaScore * 0.15 +
      waitScore * 0.15 +
      insuredScore * 0.10
    );
  }, [data]);

  const totalGain = useMemo(() => {
    return activeInterventions.reduce((acc, i) => {
      const iv = INTERVENTIONS[i];
      return acc + (iv.minGain + iv.maxGain) / 2;
    }, 0);
  }, [activeInterventions]);

  const finalScore = Math.min(100, baseScore + totalGain * 0.6);

  function toggleIntervention(idx: number) {
    setActiveInterventions((prev) =>
      prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]
    );
  }

  const hpsaColor = { Yes: "bg-red-500", Partial: "bg-amber-400", No: "bg-emerald-500" };
  const hpsaText  = { Yes: "text-red-700", Partial: "text-amber-700", No: "text-emerald-700" };

  function ScoreMeter({ score, label }: { score: number; label: string }) {
    const color = score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-amber-400" : score >= 30 ? "bg-orange-500" : "bg-red-500";
    return (
      <div>
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>{label}</span>
          <span className="font-bold">{fmt(score, 0)}/100</span>
        </div>
        <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${score}%` }} />
        </div>
      </div>
    );
  }

  // HPSA intensity visualization across all urban types for selected service
  const hpsaIntensity: Record<UrbanKey, number> = {
    metro_large:    GEO_DATA.metro_large[serviceKey].hpsa   === "No" ? 0 : GEO_DATA.metro_large[serviceKey].hpsa   === "Partial" ? 1 : 2,
    metro_small:    GEO_DATA.metro_small[serviceKey].hpsa   === "No" ? 0 : GEO_DATA.metro_small[serviceKey].hpsa   === "Partial" ? 1 : 2,
    micro:          GEO_DATA.micro[serviceKey].hpsa          === "No" ? 0 : GEO_DATA.micro[serviceKey].hpsa          === "Partial" ? 1 : 2,
    small_rural:    GEO_DATA.small_rural[serviceKey].hpsa    === "No" ? 0 : GEO_DATA.small_rural[serviceKey].hpsa    === "Partial" ? 1 : 2,
    isolated_rural: GEO_DATA.isolated_rural[serviceKey].hpsa === "No" ? 0 : GEO_DATA.isolated_rural[serviceKey].hpsa === "Partial" ? 1 : 2,
  };

  const hpsaBg = ["bg-emerald-200", "bg-amber-300", "bg-red-400"];
  const hpsaBgLabel = ["No shortage", "Partial shortage", "Full HPSA shortage"];

  return (
    <div className="space-y-6">
      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
          <SectionLabel>Rural-Urban Continuum</SectionLabel>
          <div className="space-y-1">
            {URBAN_RURAL_TYPES.map((u) => (
              <button
                key={u.value}
                onClick={() => setUrbanKey(u.value as UrbanKey)}
                className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                  urbanKey === u.value
                    ? "bg-amber-500 text-white font-semibold"
                    : "hover:bg-amber-50 text-gray-700"
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
          <SectionLabel>Service Type</SectionLabel>
          <div className="space-y-1">
            {SERVICE_TYPES.map((s) => (
              <button
                key={s.value}
                onClick={() => setServiceKey(s.value as ServiceKey)}
                className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                  serviceKey === s.value
                    ? "bg-amber-500 text-white font-semibold"
                    : "hover:bg-amber-50 text-gray-700"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Access Rate", value: `${data.accessRate}%` },
          { label: "Provider Density", value: `${data.providerDensity}/10K` },
          { label: "HPSA Designation", value: data.hpsa, hpsa: true },
          { label: "Avg Wait Time", value: data.waitTime },
          { label: "Uninsured Rate", value: `${data.uninsuredRate}%` },
        ].map((card) => (
          <div key={card.label} className="bg-amber-50 rounded-xl border border-amber-200 p-3 text-center">
            <p className="text-xs text-amber-600 font-medium">{card.label}</p>
            {card.hpsa ? (
              <p className={`text-lg font-bold mt-1 ${hpsaText[data.hpsa]}`}>{card.value}</p>
            ) : (
              <p className="text-lg font-bold text-amber-900 mt-1">{card.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Access score */}
      <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm space-y-3">
        <SectionLabel>Geographic Access Score (0–100)</SectionLabel>
        <ScoreMeter score={baseScore} label="Baseline Score" />
        {activeInterventions.length > 0 && (
          <ScoreMeter score={finalScore} label="Score After Interventions" />
        )}
      </div>

      {/* Intervention modeler */}
      <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
        <SectionLabel>Intervention Modeler</SectionLabel>
        <p className="text-xs text-gray-400 mb-3">Select interventions to model access improvement. Gains are additive up to 100.</p>
        <div className="space-y-2">
          {INTERVENTIONS.map((iv, i) => {
            const active = activeInterventions.includes(i);
            const gain = (iv.minGain + iv.maxGain) / 2;
            return (
              <button
                key={i}
                onClick={() => toggleIntervention(i)}
                className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg border transition-colors ${
                  active
                    ? "bg-amber-100 border-amber-400 text-amber-900 font-semibold"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-amber-50"
                }`}
              >
                <span>{iv.label}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-emerald-600 font-bold">+{iv.minGain}–{iv.maxGain}% access</span>
                  <span className="text-gray-400">{fmtUSD(iv.costPerPct)}/ppt</span>
                  {active && <CheckCircle size={13} className="text-amber-600" />}
                </div>
              </button>
            );
          })}
        </div>
        {activeInterventions.length > 0 && (
          <div className="mt-3 bg-amber-50 rounded-lg p-3 text-xs text-amber-800">
            <span className="font-semibold">Projected total gain: +{fmt(totalGain, 0)} ppt access</span>
            {" · "}
            Total cost per ppt: {fmtUSD(
              activeInterventions.reduce((s, i) => s + INTERVENTIONS[i].costPerPct, 0) / activeInterventions.length
            )}
          </div>
        )}
      </div>

      {/* HPSA shortage visualization */}
      <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
        <SectionLabel>HPSA Shortage Intensity — {SERVICE_TYPES.find((s) => s.value === serviceKey)?.label}</SectionLabel>
        <div className="flex gap-2 mt-2">
          {(Object.keys(hpsaIntensity) as UrbanKey[]).map((uk) => {
            const intensity = hpsaIntensity[uk];
            const isActive = uk === urbanKey;
            return (
              <div
                key={uk}
                className={`flex-1 rounded-lg p-2 text-center transition-all ${hpsaBg[intensity]} ${isActive ? "ring-2 ring-amber-500" : ""}`}
              >
                <p className="text-xs font-semibold text-gray-800 leading-tight">
                  {URBAN_RURAL_TYPES.find((u) => u.value === uk)?.label.split(" ")[0]}
                </p>
                <p className="text-xs text-gray-700 mt-0.5">{hpsaBgLabel[intensity]}</p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 mt-2 justify-end">
          {hpsaBg.map((c, i) => (
            <div key={i} className="flex items-center gap-1 text-xs text-gray-500">
              <div className={`w-3 h-3 rounded-full ${c}`} />
              {hpsaBgLabel[i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3 — SDOH Composite Scoring & ROI
// ══════════════════════════════════════════════════════════════════════════════
function SDOHComposite() {
  type IndicatorValues = Record<string, number>;
  const defaultValues: IndicatorValues = {
    poverty: 16.2, unemployment: 5.1, housing_cost: 34.0,
    hs_completion: 87.0, higher_ed: 28.0, reading_prof: 61.0,
    isolation: 26.0, language: 6.8, incarceration: 420,
    uninsured: 12.0, disability: 16.0, mh_ratio: 410,
    food_desert: 24.0, air_quality: 51.0, housing_quality: 18.0,
  };
  const [values, setValues] = useState<IndicatorValues>(defaultValues);
  const [interventionIdx, setInterventionIdx] = useState(0);
  const [coveragePct, setCoveragePct] = useState(30);
  const [popSize, setPopSize] = useState(50_000);

  const sdohScore = useMemo(() => {
    let total = 0;
    let count = 0;
    SDOH_DOMAINS.forEach((domain) => {
      domain.indicators.forEach((ind) => {
        const local = values[ind.id] ?? ind.national;
        const national = ind.national;
        let normalized: number;
        if (ind.higherIsBetter) {
          normalized = Math.min(local / national, 1.5) / 1.5 * 100;
        } else {
          const ratio = local / national;
          normalized = Math.max(0, (2 - ratio) / 2 * 100);
        }
        total += normalized;
        count++;
      });
    });
    return total / count;
  }, [values]);

  const outcomes = useMemo(() => sdohToOutcomes(sdohScore), [sdohScore]);
  const intervention = SDOH_INTERVENTIONS[interventionIdx];

  const roiResults = useMemo(() => {
    const coveredPop = popSize * (coveragePct / 100);
    const programCost = coveredPop * intervention.costPerPerson;
    const healthCostAvoidanceTot = coveredPop * intervention.healthCostAvoidance;
    const qalyGained = coveredPop * intervention.impactFactor * 0.08;
    const socialROI = (healthCostAvoidanceTot + qalyGained * 50_000) / programCost;
    return { coveredPop, programCost, healthCostAvoidanceTot, qalyGained, socialROI };
  }, [intervention, coveragePct, popSize]);

  function scoreColor(score: number) {
    if (score >= 70) return "text-emerald-600";
    if (score >= 50) return "text-amber-600";
    if (score >= 30) return "text-orange-600";
    return "text-red-600";
  }
  function scoreBg(score: number) {
    if (score >= 70) return "bg-emerald-500";
    if (score >= 50) return "bg-amber-400";
    if (score >= 30) return "bg-orange-500";
    return "bg-red-500";
  }
  function scoreLabel(score: number) {
    if (score >= 70) return "Low Deprivation";
    if (score >= 50) return "Moderate Deprivation";
    if (score >= 30) return "High Deprivation";
    return "Severe Deprivation";
  }

  return (
    <div className="space-y-6">
      {/* Domain inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {SDOH_DOMAINS.map((domain) => (
          <div key={domain.id} className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
            <SectionLabel>{domain.label}</SectionLabel>
            <div className="space-y-2">
              {domain.indicators.map((ind) => {
                const local = values[ind.id] ?? ind.national;
                const isGood = ind.higherIsBetter ? local >= ind.national : local <= ind.national;
                return (
                  <div key={ind.id} className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 w-36 truncate">{ind.label}</span>
                    <input
                      type="number"
                      className="w-20 border border-amber-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400 text-right"
                      value={local}
                      step={ind.unit === "per 100K" || ind.unit === "pop:provider" ? 10 : 0.1}
                      onChange={(e) => setValues((p) => ({ ...p, [ind.id]: parseFloat(e.target.value) || 0 }))}
                    />
                    <span className="text-xs text-gray-400 w-20">{ind.unit}</span>
                    <span className={`text-xs font-semibold ml-auto ${isGood ? "text-emerald-600" : "text-red-600"}`}>
                      {isGood ? "▲" : "▼"} Natl: {ind.national}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Composite score */}
      <div className="bg-white rounded-xl border border-amber-100 p-5 shadow-sm">
        <SectionLabel>Composite SDOH Score</SectionLabel>
        <div className="flex items-end gap-4 mb-3">
          <div>
            <p className={`text-5xl font-extrabold ${scoreColor(sdohScore)}`}>{fmt(sdohScore, 0)}</p>
            <p className="text-sm text-gray-500">/100 — {scoreLabel(sdohScore)}</p>
          </div>
          <div className="flex-1">
            <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${scoreBg(sdohScore)} rounded-full transition-all duration-500`}
                style={{ width: `${sdohScore}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>0 (Severe deprivation)</span>
              <span>100 (Optimal)</span>
            </div>
          </div>
        </div>

        {/* Expected outcomes */}
        <SectionLabel>Expected Health Outcomes at This SDOH Score</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Life Expectancy",   value: `${fmt(outcomes.lifeExpectancy, 1)} yrs` },
            { label: "Diabetes Rate",     value: `${fmt(outcomes.diabetesRate, 1)}%` },
            { label: "Depression Rate",   value: `${fmt(outcomes.depressionRate, 1)}%` },
            { label: "Infant Mortality",  value: `${fmt(outcomes.infantMortality, 1)}/1K` },
          ].map((o) => (
            <div key={o.label} className="bg-amber-50 rounded-lg border border-amber-100 p-2 text-center">
              <p className="text-xs text-amber-600">{o.label}</p>
              <p className="text-lg font-bold text-amber-900">{o.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SDOH ROI Calculator */}
      <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
        <SectionLabel>SDOH Intervention ROI Calculator</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-600 font-medium block mb-1">Intervention</label>
            <select
              className="w-full border border-amber-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={interventionIdx}
              onChange={(e) => setInterventionIdx(Number(e.target.value))}
            >
              {SDOH_INTERVENTIONS.map((iv, i) => (
                <option key={i} value={i}>{iv.label}</option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">Cost/person: {fmtUSD(intervention.costPerPerson)}</p>
          </div>
          <div>
            <label className="text-xs text-gray-600 font-medium block mb-1">Population Size</label>
            <input
              type="number" min={1000} step={1000}
              className="w-full border border-amber-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={popSize}
              onChange={(e) => setPopSize(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 font-medium block mb-1">Coverage: {coveragePct}%</label>
            <input
              type="range" min={5} max={100} step={5}
              className="w-full accent-amber-500 mt-2"
              value={coveragePct}
              onChange={(e) => setCoveragePct(Number(e.target.value))}
            />
            <p className="text-xs text-gray-400">{fmt(roiResults.coveredPop, 0)} people served</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Program Cost",          value: fmtUSD(roiResults.programCost) },
            { label: "Health Cost Avoidance",  value: fmtUSD(roiResults.healthCostAvoidanceTot) },
            { label: "QALYs Gained",           value: fmt(roiResults.qalyGained, 0) },
            { label: "Social ROI",             value: `${fmt(roiResults.socialROI, 2)}×` },
          ].map((r) => (
            <div key={r.label} className={`rounded-xl border p-3 text-center ${
              r.label === "Social ROI"
                ? roiResults.socialROI >= 1 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
                : "bg-amber-50 border-amber-200"
            }`}>
              <p className="text-xs text-gray-500 font-medium">{r.label}</p>
              <p className={`text-xl font-bold mt-1 ${
                r.label === "Social ROI"
                  ? roiResults.socialROI >= 1 ? "text-emerald-700" : "text-red-700"
                  : "text-amber-900"
              }`}>{r.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4 — Equity-Weighted ICER Calculator
// ══════════════════════════════════════════════════════════════════════════════
function EquityICER() {
  const [exampleIdx, setExampleIdx] = useState(-1);

  const [interventionCost, setInterventionCost] = useState(1850);
  const [controlCost, setControlCost]           = useState(3400);
  const [qalyIntervention, setQalyIntervention] = useState(0.72);
  const [qalyControl, setQalyControl]           = useState(0.58);
  const [disadvantage, setDisadvantage]         = useState(2.0);
  const [equityWeightIdx, setEquityWeightIdx]   = useState(1);
  const [financialSavings, setFinancialSavings] = useState(980_000);
  const [socialValue, setSocialValue]           = useState(1_400_000);
  const [programCost, setProgramCost]           = useState(820_000);

  function loadExample(i: number) {
    setExampleIdx(i);
    const e = EQUITY_EXAMPLES[i];
    setInterventionCost(e.interventionCost);
    setControlCost(e.controlCost);
    setQalyIntervention(e.qalyIntervention);
    setQalyControl(e.qalyControl);
    setDisadvantage(e.disadvantage);
    setEquityWeightIdx(e.equityWeightIdx);
    setFinancialSavings(e.financialSavings);
    setSocialValue(e.socialValue);
    setProgramCost(e.programCost);
  }

  const results = useMemo(() => {
    const costDiff  = interventionCost - controlCost;
    const qalyDiff  = qalyIntervention - qalyControl;
    if (qalyDiff === 0) return null;

    const standardICER = costDiff / qalyDiff;

    // Equity-weighted QALY = qalyDiff × equity_multiplier × disadvantage_factor
    const equityMult = EQUITY_WEIGHTS[equityWeightIdx].multiplier;
    const equityQALY = qalyDiff * equityMult * (disadvantage / 2);
    const equityICER = costDiff / equityQALY;

    // At which equity weight does it cross each threshold?
    const crossings = WTP_THRESHOLDS_ICER.map((thr) => {
      // equityICER = costDiff / (qalyDiff * mult * (disadv/2)) <= thr
      // mult >= costDiff / (qalyDiff * (disadv/2) * thr)
      const minMult = costDiff / (qalyDiff * (disadvantage / 2) * thr.value);
      const crosses = EQUITY_WEIGHTS.find((w) => w.multiplier >= minMult);
      return { ...thr, minMult: minMult.toFixed(2), crossesAt: crosses?.label ?? "Beyond 3×" };
    });

    // HEROI
    const heroi = (financialSavings + socialValue) / programCost;

    return { standardICER, equityICER, equityMult, crossings, heroi, costDiff, qalyDiff, equityQALY };
  }, [interventionCost, controlCost, qalyIntervention, qalyControl, disadvantage, equityWeightIdx, financialSavings, socialValue, programCost]);

  function icerColor(icer: number) {
    if (icer <= 100_000) return "text-emerald-600";
    if (icer <= 150_000) return "text-amber-600";
    if (icer <= 200_000) return "text-orange-600";
    return "text-red-600";
  }

  function NumInput({
    label, value, onChange, step = 100, prefix = "", suffix = "",
  }: {
    label: string; value: number; onChange: (v: number) => void;
    step?: number; prefix?: string; suffix?: string;
  }) {
    return (
      <div>
        <label className="text-xs text-gray-600 font-medium block mb-1">{label}</label>
        <div className="flex items-center border border-amber-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-amber-400">
          {prefix && <span className="px-2 text-xs text-gray-400 bg-amber-50 border-r border-amber-200">{prefix}</span>}
          <input
            type="number" step={step}
            className="flex-1 px-2 py-2 text-sm focus:outline-none"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          />
          {suffix && <span className="px-2 text-xs text-gray-400 bg-amber-50 border-l border-amber-200">{suffix}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Example presets */}
      <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
        <SectionLabel>Pre-Loaded Examples</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {EQUITY_EXAMPLES.map((e, i) => (
            <button
              key={i}
              onClick={() => loadExample(i)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                exampleIdx === i
                  ? "bg-amber-500 text-white border-amber-500 font-semibold"
                  : "border-amber-200 text-amber-700 hover:bg-amber-50"
              }`}
            >
              {e.label}
            </button>
          ))}
          <button
            onClick={() => setExampleIdx(-1)}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
          >
            Clear / Custom
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm space-y-3">
          <SectionLabel>Standard ICER Inputs</SectionLabel>
          <NumInput label="Intervention Cost (per patient)" value={interventionCost} onChange={setInterventionCost} prefix="$" />
          <NumInput label="Control Cost (per patient)"      value={controlCost}      onChange={setControlCost}      prefix="$" />
          <NumInput label="QALYs Gained — Intervention"     value={qalyIntervention} onChange={setQalyIntervention} step={0.01} />
          <NumInput label="QALYs Gained — Control"          value={qalyControl}      onChange={setQalyControl}      step={0.01} />
        </div>

        <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm space-y-3">
          <SectionLabel>Equity Adjustment</SectionLabel>
          <div>
            <label className="text-xs text-gray-600 font-medium block mb-1">
              Population Disadvantage Level: <span className="text-amber-700 font-bold">{disadvantage.toFixed(1)}</span>
              {" "}(1 = average, 3 = severely disadvantaged)
            </label>
            <input
              type="range" min={1} max={3} step={0.1}
              className="w-full accent-amber-500"
              value={disadvantage}
              onChange={(e) => setDisadvantage(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 font-medium block mb-1">Equity Weight</label>
            <div className="grid grid-cols-2 gap-1.5">
              {EQUITY_WEIGHTS.map((w, i) => (
                <button
                  key={i}
                  onClick={() => setEquityWeightIdx(i)}
                  className={`text-xs px-2 py-1.5 rounded-lg border transition-colors ${
                    equityWeightIdx === i
                      ? "bg-amber-500 text-white border-amber-500 font-semibold"
                      : "border-amber-200 text-gray-700 hover:bg-amber-50"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">
              Equity weighting gives extra value to health gains in disadvantaged populations, effectively lowering the ICER threshold requirement.
            </p>
          </div>
        </div>
      </div>

      {/* ICER results */}
      {results ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              <p className="text-xs text-amber-700 font-medium">Standard ICER</p>
              <p className={`text-3xl font-extrabold mt-1 ${icerColor(Math.abs(results.standardICER))}`}>
                {results.standardICER < 0 ? "Dominant" : fmtUSD(results.standardICER)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">per QALY gained (unadjusted)</p>
            </div>
            <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
              <p className="text-xs text-orange-700 font-medium">Equity-Weighted ICER</p>
              <p className={`text-3xl font-extrabold mt-1 ${icerColor(Math.abs(results.equityICER))}`}>
                {results.equityICER < 0 ? "Dominant" : fmtUSD(results.equityICER)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {EQUITY_WEIGHTS[equityWeightIdx].label} · disadv. {disadvantage.toFixed(1)}×
              </p>
            </div>
            <div className={`rounded-xl border p-4 ${results.heroi >= 1 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
              <p className={`text-xs font-medium ${results.heroi >= 1 ? "text-emerald-700" : "text-red-700"}`}>HEROI Ratio</p>
              <p className={`text-3xl font-extrabold mt-1 ${results.heroi >= 1 ? "text-emerald-700" : "text-red-700"}`}>
                {fmt(results.heroi, 2)}×
              </p>
              <p className="text-xs text-gray-400 mt-0.5">(Fin. savings + social value) / program cost</p>
            </div>
          </div>

          {/* HEROI inputs */}
          <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
            <SectionLabel>HEROI Inputs</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <NumInput label="Financial Savings from Disparity Reduction" value={financialSavings} onChange={setFinancialSavings} step={10000} prefix="$" />
              <NumInput label="Social Value Estimate (WTP for equity)" value={socialValue} onChange={setSocialValue} step={10000} prefix="$" />
              <NumInput label="Total Program Cost" value={programCost} onChange={setProgramCost} step={10000} prefix="$" />
            </div>
          </div>

          {/* Threshold crossings */}
          <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
            <SectionLabel>Cost-Effectiveness Threshold Analysis</SectionLabel>
            <p className="text-xs text-gray-400 mb-3">
              At which equity weight multiplier does the intervention cross each threshold?
            </p>
            <div className="space-y-2">
              {results.crossings.map((c) => (
                <div key={c.label} className="flex items-center gap-3 text-sm">
                  <span className={`w-28 font-semibold ${c.color}`}>{c.label}</span>
                  <span className="text-gray-400 text-xs">{fmtUSD(c.value)}/QALY</span>
                  <div className="flex-1 h-0.5 bg-gray-100" />
                  <span className="text-xs text-gray-500">Needs ≥ {c.minMult}× weight</span>
                  <Pill color={
                    parseFloat(c.minMult) <= EQUITY_WEIGHTS[equityWeightIdx].multiplier ? "green" : "gray"
                  }>
                    {parseFloat(c.minMult) <= EQUITY_WEIGHTS[equityWeightIdx].multiplier ? "✓ Crosses" : "Not yet"} at {EQUITY_WEIGHTS[equityWeightIdx].label}
                  </Pill>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 text-center text-amber-700 text-sm">
          QALY difference cannot be zero — please enter distinct QALY values.
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "disparity",  label: "Disparity Calculator",    icon: Users,      short: "Disparity"  },
  { id: "geo",        label: "Geographic Access Gap",   icon: MapPin,     short: "Geo Access" },
  { id: "sdoh",       label: "SDOH Composite & ROI",    icon: BarChart2,  short: "SDOH"       },
  { id: "icer",       label: "Equity-Weighted ICER",    icon: Calculator, short: "ICER"       },
];

export default function HealthEquityStudio() {
  const [activeTab, setActiveTab] = useState("disparity");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white px-4 sm:px-8 py-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-white/20 rounded-lg">
              <BarChart2 size={22} />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Health Equity Analysis Studio</h1>
          </div>
          <p className="text-amber-100 text-sm max-w-2xl">
            Interactive tools for measuring racial disparities, geographic access gaps, social determinants of health, and equity-weighted cost-effectiveness analysis.
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-amber-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  active
                    ? "border-amber-500 text-amber-700"
                    : "border-transparent text-gray-500 hover:text-amber-600 hover:border-amber-200"
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        {activeTab === "disparity" && (
          <>
            <div className="flex items-start gap-2 mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              <Info size={14} className="mt-0.5 shrink-0" />
              <span>
                Disparity ratios sourced from CDC National Health Interview Survey, AHRQ National Healthcare Quality & Disparities Report, and peer-reviewed literature. Adjust local population sliders to calculate community-specific impact.
              </span>
            </div>
            <DisparityCalculator />
          </>
        )}
        {activeTab === "geo" && (
          <>
            <div className="flex items-start gap-2 mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              <Info size={14} className="mt-0.5 shrink-0" />
              <span>
                Access metrics derived from HRSA Area Health Resources File, USDA Rural-Urban Continuum Codes, and HPSA designation data. Intervention cost estimates from published rural health literature.
              </span>
            </div>
            <GeoAccessAnalyzer />
          </>
        )}
        {activeTab === "sdoh" && (
          <>
            <div className="flex items-start gap-2 mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              <Info size={14} className="mt-0.5 shrink-0" />
              <span>
                Enter your community's indicator values. The composite SDOH score (0–100) maps to expected health outcomes via evidence-based regressions. ROI calculations use peer-reviewed social return on investment frameworks.
              </span>
            </div>
            <SDOHComposite />
          </>
        )}
        {activeTab === "icer" && (
          <>
            <div className="flex items-start gap-2 mb-5 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              <Info size={14} className="mt-0.5 shrink-0" />
              <span>
                Equity-weighted ICER follows the distributional cost-effectiveness analysis (DCEA) framework. Equity weights reflect societal preference for reducing health inequality (Cookson et al., 2017). HEROI adapts social return on investment methodology for health equity contexts.
              </span>
            </div>
            <EquityICER />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-8">
        <p className="text-center text-xs text-gray-400">
          Health Equity Analysis Studio — For research and policy planning use only. Not a substitute for primary data analysis or clinical guidance.
        </p>
      </div>
    </div>
  );
}
