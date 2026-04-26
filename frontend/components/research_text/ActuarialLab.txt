"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  DollarSign,
  Users,
  Activity,
  ChevronDown,
  ChevronUp,
  Info,
  Pill,
  BarChart2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "av" | "rating" | "adverse" | "ira";

interface AVInputs {
  deductible: number;
  oopMax: number;
  coinsurance: number;
  pcpCopay: number;
  specialistCopay: number;
  erCopay: number;
  urgentCareCopay: number;
  genericDrugCopay: number;
  preferredBrandCopay: number;
  nonPreferredBrandCopay: number;
  specialtyDrugCoins: number;
  drugDeductible: number;
  csrToggle: boolean;
}

interface RatingInputs {
  state: string;
  planType: string;
  targetMLR: number;
  expectedClaimsPMPM: number;
  adminLoad: number;
  profitMargin: number;
  riskCorridor: boolean;
  tobaccoSurcharge: number;
  geographicFactor: number;
  medianHouseholdIncome: number;
  employerContribution: number;
}

interface AdverseInputs {
  population: number;
  initialInsuredRate: number;
  avgHealthScore: number;
  communityRating: boolean;
  riskAdjustment: string;
  year1Increase: number;
  exitRatePer10: number;
  mandate: boolean;
  riskCorridors: boolean;
  reinsurance: boolean;
  csrPayments: boolean;
}

interface IRADrugData {
  name: string;
  launchPrice2021: number;
  currentListPrice: number;
  mfpReduction: number; // fraction e.g. 0.60 means MFP = 40% of list
  medicareSpending: number; // millions
}

const IRA_DRUGS: IRADrugData[] = [
  { name: "Eliquis (apixaban)", launchPrice2021: 5700, currentListPrice: 7120, mfpReduction: 0.56, medicareSpending: 16400 },
  { name: "Jardiance (empagliflozin)", launchPrice2021: 5800, currentListPrice: 6450, mfpReduction: 0.66, medicareSpending: 7100 },
  { name: "Xarelto (rivaroxaban)", launchPrice2021: 4900, currentListPrice: 6080, mfpReduction: 0.62, medicareSpending: 6100 },
  { name: "Januvia (sitagliptin)", launchPrice2021: 5500, currentListPrice: 6200, mfpReduction: 0.79, medicareSpending: 4200 },
  { name: "Farxiga (dapagliflozin)", launchPrice2021: 5400, currentListPrice: 6300, mfpReduction: 0.68, medicareSpending: 3100 },
  { name: "Entresto (sacubitril/valsartan)", launchPrice2021: 6900, currentListPrice: 8200, mfpReduction: 0.61, medicareSpending: 2900 },
  { name: "Enbrel (etanercept)", launchPrice2021: 58000, currentListPrice: 74000, mfpReduction: 0.75, medicareSpending: 2700 },
  { name: "Imbruvica (ibrutinib)", launchPrice2021: 148000, currentListPrice: 181000, mfpReduction: 0.58, medicareSpending: 2400 },
  { name: "Stelara (ustekinumab)", launchPrice2021: 95000, currentListPrice: 119000, mfpReduction: 0.66, medicareSpending: 2200 },
  { name: "Fiasp/NovoLog (insulin aspart)", launchPrice2021: 280, currentListPrice: 35, mfpReduction: 0.20, medicareSpending: 1800 },
];

// ─── Utility ──────────────────────────────────────────────────────────────────

const fmt = (n: number, decimals = 0) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

const fmtDollar = (n: number, decimals = 0) =>
  "$" + fmt(n, decimals);

const fmtPct = (n: number, decimals = 1) => fmt(n, decimals) + "%";

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

// ─── Slider component ─────────────────────────────────────────────────────────

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs font-medium text-slate-600">{label}</label>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
          {prefix}{fmt(value, step < 1 ? 1 : 0)}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
      />
      <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
        <span>{prefix}{fmt(min, 0)}{suffix}</span>
        <span>{prefix}{fmt(max, 0)}{suffix}</span>
      </div>
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg mb-2">
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mt-0.5 ${
          value ? "bg-emerald-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            value ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
      <div>
        <div className="text-sm font-medium text-slate-700">{label}</div>
        {description && <div className="text-xs text-slate-500">{description}</div>}
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  sub,
  color = "emerald",
  small,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: "emerald" | "amber" | "red" | "blue" | "purple";
  small?: boolean;
}) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    red: "bg-red-50 border-red-200 text-red-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
  };
  return (
    <div className={`border rounded-lg p-3 ${colorMap[color]}`}>
      <div className="text-xs font-medium opacity-70 mb-1">{label}</div>
      <div className={`font-bold ${small ? "text-lg" : "text-2xl"}`}>{value}</div>
      {sub && <div className="text-xs opacity-70 mt-0.5">{sub}</div>}
    </div>
  );
}

// ─── TAB 1: Actuarial Value Calculator ───────────────────────────────────────

function AVCalculator() {
  const [inputs, setInputs] = useState<AVInputs>({
    deductible: 1500,
    oopMax: 7000,
    coinsurance: 20,
    pcpCopay: 25,
    specialistCopay: 50,
    erCopay: 350,
    urgentCareCopay: 75,
    genericDrugCopay: 10,
    preferredBrandCopay: 45,
    nonPreferredBrandCopay: 95,
    specialtyDrugCoins: 30,
    drugDeductible: 0,
    csrToggle: false,
  });

  const set = (key: keyof AVInputs, value: number | boolean) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const result = useMemo(() => {
    // Simplified AV estimation algorithm
    // Base AV from OOP max (lower OOP = higher AV)
    const oopFactor = 1 - inputs.oopMax / 18200; // 18200 = 2x ACA max
    let av = 0.50 + oopFactor * 0.30; // range ~50-80%

    // Deductible drag: each $1,000 ≈ -4% AV
    av -= (inputs.deductible / 1000) * 0.04;

    // Drug deductible drag
    av -= (inputs.drugDeductible / 500) * 0.01;

    // Coinsurance drag: 20% coin ≈ standard; more = lower AV
    av -= ((inputs.coinsurance - 20) / 100) * 0.10;

    // Copay adjustments (lower copays = higher AV)
    // PCP: $30 is reference
    av += ((30 - inputs.pcpCopay) / 100) * 0.03;
    // Specialist: $60 is reference
    av += ((60 - inputs.specialistCopay) / 200) * 0.02;
    // ER: $350 is reference
    av += ((350 - inputs.erCopay) / 1000) * 0.01;
    // Generic drug: $15 is reference
    av += ((15 - inputs.genericDrugCopay) / 100) * 0.02;
    // Preferred brand: $50 is reference
    av += ((50 - inputs.preferredBrandCopay) / 200) * 0.01;
    // Specialty drug coinsurance drag
    av -= ((inputs.specialtyDrugCoins - 25) / 100) * 0.01;

    // CSR adjustment for silver plans
    if (inputs.csrToggle) {
      av = Math.min(av + 0.073, 0.94); // CSR 87% or 94% variant
    }

    av = clamp(av, 0.45, 0.97);

    // Determine metallic tier
    let tier = "Sub-Bronze";
    let tierColor: "red" | "amber" | "emerald" | "blue" | "purple" = "red";
    if (av >= 0.88) { tier = "Platinum"; tierColor = "purple"; }
    else if (av >= 0.78) { tier = "Gold"; tierColor = "blue"; }
    else if (av >= 0.68) { tier = "Silver"; tierColor = "emerald"; }
    else if (av >= 0.56) { tier = "Bronze"; tierColor = "amber"; }

    // Silver benchmark comparison (standard silver: 70% AV)
    const benchmarkAV = 0.70;
    const diff = (av - benchmarkAV) * 100;

    // Estimated PMPM impact (rough: each 1% AV ~ $4 PMPM in medical costs paid by plan)
    const pmpmImpact = diff * 4;

    return { av: av * 100, tier, tierColor, diff, pmpmImpact };
  }, [inputs]);

  // Tier bar visual
  const tiers = [
    { name: "Bronze", min: 56, max: 68, color: "bg-amber-400" },
    { name: "Silver", min: 68, max: 78, color: "bg-emerald-400" },
    { name: "Gold", min: 78, max: 88, color: "bg-blue-400" },
    { name: "Platinum", min: 88, max: 100, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
        <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-emerald-800">
          <strong>Actuarial Value (AV)</strong> represents the percentage of total allowed healthcare costs that a health plan pays for a standard population. Higher AV = richer benefits and higher premiums. ACA requires plans to fall within metallic tiers (±2% de minimis tolerance).
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-600" />
            Benefit Design Inputs
          </h3>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Medical Cost Sharing</p>
            <Slider label="Annual Deductible" value={inputs.deductible} min={0} max={8700} step={100} prefix="$" onChange={(v) => set("deductible", v)} />
            <Slider label="Out-of-Pocket Maximum" value={inputs.oopMax} min={500} max={9100} step={100} prefix="$" onChange={(v) => set("oopMax", v)} />
            <Slider label="Coinsurance (after deductible)" value={inputs.coinsurance} min={0} max={50} suffix="%" onChange={(v) => set("coinsurance", v)} />
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Copayments</p>
            <Slider label="Primary Care Visit" value={inputs.pcpCopay} min={0} max={75} prefix="$" onChange={(v) => set("pcpCopay", v)} />
            <Slider label="Specialist Visit" value={inputs.specialistCopay} min={0} max={150} prefix="$" onChange={(v) => set("specialistCopay", v)} />
            <Slider label="Emergency Room" value={inputs.erCopay} min={0} max={500} step={25} prefix="$" onChange={(v) => set("erCopay", v)} />
            <Slider label="Urgent Care" value={inputs.urgentCareCopay} min={0} max={150} prefix="$" onChange={(v) => set("urgentCareCopay", v)} />
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Pharmacy Benefits</p>
            <Slider label="Generic Drug Copay" value={inputs.genericDrugCopay} min={0} max={30} prefix="$" onChange={(v) => set("genericDrugCopay", v)} />
            <Slider label="Preferred Brand Copay" value={inputs.preferredBrandCopay} min={0} max={75} prefix="$" onChange={(v) => set("preferredBrandCopay", v)} />
            <Slider label="Non-Preferred Brand Copay" value={inputs.nonPreferredBrandCopay} min={0} max={150} prefix="$" onChange={(v) => set("nonPreferredBrandCopay", v)} />
            <Slider label="Specialty Drug Coinsurance" value={inputs.specialtyDrugCoins} min={0} max={50} suffix="%" onChange={(v) => set("specialtyDrugCoins", v)} />
            <Slider label="Separate Drug Deductible" value={inputs.drugDeductible} min={0} max={500} step={50} prefix="$" onChange={(v) => set("drugDeductible", v)} />
          </div>

          <div className="mt-4">
            <Toggle
              label="Cost-Sharing Reduction (CSR)"
              value={inputs.csrToggle}
              onChange={(v) => set("csrToggle", v)}
              description="Applies CSR subsidy to enhance silver plan AV to 87% or 94% for eligible enrollees."
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* AV Gauge */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Actuarial Value Result</h3>

            {/* Big AV number */}
            <div className="text-center mb-6">
              <div className="text-7xl font-black text-emerald-700">{fmtPct(result.av, 1)}</div>
              <div className={`text-xl font-bold mt-2 ${
                result.tierColor === "purple" ? "text-purple-700" :
                result.tierColor === "blue" ? "text-blue-700" :
                result.tierColor === "emerald" ? "text-emerald-700" :
                result.tierColor === "amber" ? "text-amber-700" : "text-red-700"
              }`}>
                {result.tier} Plan
              </div>
              {inputs.csrToggle && (
                <div className="text-xs text-emerald-600 mt-1 font-medium">CSR Enhancement Applied</div>
              )}
            </div>

            {/* Tier range bar */}
            <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div className="absolute inset-0 flex">
                <div className="bg-amber-400 flex-none" style={{ width: "12%" }}>
                  <span className="text-[9px] text-white font-bold flex items-center justify-center h-full">Bronze</span>
                </div>
                <div className="bg-emerald-400 flex-none" style={{ width: "10%" }}>
                  <span className="text-[9px] text-white font-bold flex items-center justify-center h-full">Silver</span>
                </div>
                <div className="bg-blue-400 flex-none" style={{ width: "10%" }}>
                  <span className="text-[9px] text-white font-bold flex items-center justify-center h-full">Gold</span>
                </div>
                <div className="bg-purple-500 flex-none" style={{ width: "12%" }}>
                  <span className="text-[9px] text-white font-bold flex items-center justify-center h-full">Platinum</span>
                </div>
                <div className="bg-gray-200 flex-1" />
              </div>
              {/* Marker */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-gray-900 rounded"
                style={{ left: `${Math.max(0, Math.min(100, result.av - 45))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>45%</span>
              <span>56% Bronze</span>
              <span>68% Silver</span>
              <span>78% Gold</span>
              <span>88% Platinum</span>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-3">
            <StatBox
              label="Plan AV"
              value={fmtPct(result.av, 1)}
              sub={result.tier + " tier"}
              color={result.tierColor}
            />
            <StatBox
              label="vs. Silver Benchmark"
              value={(result.diff >= 0 ? "+" : "") + fmtPct(result.diff, 1)}
              sub="vs 70% AV benchmark"
              color={result.diff >= 0 ? "emerald" : "amber"}
            />
            <StatBox
              label="Est. PMPM Impact"
              value={(result.pmpmImpact >= 0 ? "+" : "") + fmtDollar(result.pmpmImpact, 0)}
              sub="vs. standard silver PMPM"
              color={result.pmpmImpact >= 0 ? "blue" : "amber"}
            />
            <StatBox
              label="Member Cost Share"
              value={fmtPct(100 - result.av, 1)}
              sub="patient responsibility"
              color="purple"
            />
          </div>

          {/* ACA Metallic Tier Reference */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">ACA Metallic Tier Targets</h4>
            <div className="space-y-2">
              {[
                { tier: "Bronze", target: 60, color: "bg-amber-400", range: "56-68%" },
                { tier: "Silver", target: 70, color: "bg-emerald-400", range: "68-78%" },
                { tier: "Gold", target: 80, color: "bg-blue-400", range: "78-88%" },
                { tier: "Platinum", target: 90, color: "bg-purple-500", range: "88-100%" },
              ].map((t) => (
                <div key={t.tier} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm flex-none ${t.color}`} />
                  <span className="text-xs font-medium text-slate-700 w-16">{t.tier}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${t.color} rounded-full`}
                      style={{ width: `${t.target}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-20 text-right">{t.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB 2: Premium Rating Workbench ─────────────────────────────────────────

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

// ACA 3:1 age bands — relative factor where 21-64 non-tobacco = 1.000
const AGE_BANDS = [
  { label: "0-20", factor: 0.635 },
  { label: "21-30", factor: 0.800 },
  { label: "31-40", factor: 1.000 },
  { label: "41-50", factor: 1.278 },
  { label: "51-60", factor: 1.786 },
  { label: "61-64", factor: 3.000 },
];

const DEFAULT_MEMBER_MONTHS = [2000, 5000, 8000, 7000, 5000, 3000];

function PremiumRating() {
  const [inputs, setInputs] = useState<RatingInputs>({
    state: "Vermont",
    planType: "PPO",
    targetMLR: 85,
    expectedClaimsPMPM: 450,
    adminLoad: 12,
    profitMargin: 3,
    riskCorridor: false,
    tobaccoSurcharge: 0,
    geographicFactor: 1.0,
    medianHouseholdIncome: 62000,
    employerContribution: 70,
  });
  const [memberMonths, setMemberMonths] = useState<number[]>(DEFAULT_MEMBER_MONTHS);

  const set = (key: keyof RatingInputs, value: string | number | boolean) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const result = useMemo(() => {
    // Base premium PMPM for age 31-40 (index factor = 1.000)
    const loadFactor = 1 / (inputs.targetMLR / 100); // e.g. 1/0.85 = 1.176
    const basePMPM = inputs.expectedClaimsPMPM * loadFactor * inputs.geographicFactor;

    // Premium by age band
    const premiumByBand = AGE_BANDS.map((b) => ({
      ...b,
      premium: basePMPM * b.factor,
      premiumTobacco: basePMPM * b.factor * (1 + inputs.tobaccoSurcharge / 100),
    }));

    // Weighted average premium
    const totalMM = memberMonths.reduce((a, b) => a + b, 0) || 1;
    const weightedAvgPremium =
      premiumByBand.reduce((sum, b, i) => sum + b.premium * (memberMonths[i] || 0), 0) / totalMM;

    // Admin & profit
    const adminPMPM = basePMPM * (inputs.adminLoad / 100);
    const profitPMPM = basePMPM * (inputs.profitMargin / 100);

    // Affordability (annual premium for single)
    const annualPremium = weightedAvgPremium * 12;
    const employeeShare = annualPremium * (1 - inputs.employerContribution / 100);
    const affordabilityPct = (employeeShare / inputs.medianHouseholdIncome) * 100;
    const acaThreshold = 9.12; // 2024

    // Medicaid eligibility estimate (income <= 138% FPL)
    // FPL 2024 ≈ $15,060 individual; 138% = $20,783
    const medicaidEligiblePct = Math.max(0, Math.min(60, (25000 / inputs.medianHouseholdIncome) * 25));

    return {
      basePMPM,
      premiumByBand,
      weightedAvgPremium,
      adminPMPM,
      profitPMPM,
      annualPremium,
      employeeShare,
      affordabilityPct,
      acaThreshold,
      affordable: affordabilityPct <= acaThreshold,
      medicaidEligiblePct,
      totalMM,
    };
  }, [inputs, memberMonths]);

  const stateRegs: Record<string, string> = {
    Vermont: "Vermont uses community rating with merged individual/small group market. Green Mountain Care Board oversees rates.",
    California: "Covered California uses standardized plans. California allows 10:1 age bands (vs federal 3:1).",
    "New York": "New York uses pure community rating — no age rating allowed. State-specific AV standards.",
    Massachusetts: "Commonwealth Connector operates the exchange. Tobacco surcharge prohibited.",
  };
  const stateNote = stateRegs[inputs.state] || `${inputs.state} follows federal ACA rating rules. State insurance department reviews filings.`;

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
        <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-emerald-800">
          <strong>Premium Rating</strong> involves setting health insurance premiums to cover expected claims, administrative costs, and margin while complying with ACA rating restrictions (3:1 age ratio, no gender rating, max 50% tobacco surcharge).
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs column */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-600" />
              Rate Development Inputs
            </h3>

            <div className="mb-3">
              <label className="text-xs font-medium text-slate-600 block mb-1">Service Area (State)</label>
              <select
                value={inputs.state}
                onChange={(e) => set("state", e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {US_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="mb-3">
              <label className="text-xs font-medium text-slate-600 block mb-1">Plan Type</label>
              <select
                value={inputs.planType}
                onChange={(e) => set("planType", e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {["HMO", "PPO", "EPO", "HDHP/HSA"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="mb-3">
              <label className="text-xs font-medium text-slate-600 block mb-1">Rating Methodology</label>
              <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>Community Rating (single rate)</option>
                <option>Modified Community (age-rated)</option>
                <option>Experience Rating (group-specific)</option>
              </select>
            </div>

            <div className="mt-4 space-y-1">
              <Slider label="Target MLR" value={inputs.targetMLR} min={80} max={90} suffix="%" onChange={(v) => set("targetMLR", v)} />
              <Slider label="Expected Claims PMPM" value={inputs.expectedClaimsPMPM} min={250} max={800} step={10} prefix="$" onChange={(v) => set("expectedClaimsPMPM", v)} />
              <Slider label="Administrative Load" value={inputs.adminLoad} min={5} max={25} suffix="%" onChange={(v) => set("adminLoad", v)} />
              <Slider label="Profit Margin Target" value={inputs.profitMargin} min={0} max={10} suffix="%" onChange={(v) => set("profitMargin", v)} />
              <Slider label="Geographic Factor" value={inputs.geographicFactor} min={0.85} max={1.3} step={0.01} onChange={(v) => set("geographicFactor", v)} />
              <Slider label="Tobacco Surcharge" value={inputs.tobaccoSurcharge} min={0} max={50} suffix="%" onChange={(v) => set("tobaccoSurcharge", v)} />
              <Slider label="Employer Contribution" value={inputs.employerContribution} min={0} max={100} suffix="%" onChange={(v) => set("employerContribution", v)} />
              <Slider label="Median Household Income" value={inputs.medianHouseholdIncome} min={20000} max={150000} step={1000} prefix="$" onChange={(v) => set("medianHouseholdIncome", v)} />
            </div>

            <Toggle
              label="Risk Corridor Protection"
              value={inputs.riskCorridor}
              onChange={(v) => set("riskCorridor", v)}
              description="Limits insurer gains/losses to ±3% of target"
            />
          </div>

          {/* State regulatory note */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-blue-700 mb-1">State Regulatory Context</div>
            <div className="text-xs text-blue-800">{stateNote}</div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Age band table */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Premium by Age Band (ACA 3:1 Ratio)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs text-slate-500 font-medium pb-2">Age Band</th>
                    <th className="text-right text-xs text-slate-500 font-medium pb-2">Rating Factor</th>
                    <th className="text-right text-xs text-slate-500 font-medium pb-2">Non-Tobacco PMPM</th>
                    <th className="text-right text-xs text-slate-500 font-medium pb-2">Tobacco PMPM</th>
                    <th className="text-right text-xs text-slate-500 font-medium pb-2">Member Months</th>
                  </tr>
                </thead>
                <tbody>
                  {result.premiumByBand.map((band, i) => (
                    <tr key={band.label} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-2 font-medium text-slate-700">{band.label}</td>
                      <td className="text-right text-slate-600">{band.factor.toFixed(3)}</td>
                      <td className="text-right font-semibold text-emerald-700">{fmtDollar(band.premium, 2)}</td>
                      <td className="text-right text-amber-700">
                        {inputs.tobaccoSurcharge > 0 ? fmtDollar(band.premiumTobacco, 2) : "—"}
                      </td>
                      <td className="text-right">
                        <input
                          type="number"
                          value={memberMonths[i]}
                          onChange={(e) => {
                            const next = [...memberMonths];
                            next[i] = Number(e.target.value);
                            setMemberMonths(next);
                          }}
                          className="w-20 text-right text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-emerald-50">
                    <td colSpan={2} className="py-2 font-semibold text-emerald-800 text-sm">Weighted Average</td>
                    <td className="text-right font-bold text-emerald-800 text-sm">{fmtDollar(result.weightedAvgPremium, 2)}</td>
                    <td />
                    <td className="text-right text-xs text-slate-500">{fmt(result.totalMM)} MM</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Premium build-up */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Premium Build-Up (PMPM)</h3>
            <div className="space-y-2">
              {[
                { label: "Expected Claims", value: inputs.expectedClaimsPMPM, color: "bg-emerald-500", pct: (inputs.expectedClaimsPMPM / result.basePMPM) * 100 },
                { label: "Administrative Load", value: result.adminPMPM, color: "bg-blue-400", pct: (inputs.adminLoad / 100) * 100 / (1 / (inputs.targetMLR / 100)) },
                { label: "Profit Margin", value: result.profitPMPM, color: "bg-purple-400", pct: (inputs.profitMargin / 100) * 100 / (1 / (inputs.targetMLR / 100)) },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="text-xs text-slate-600 w-36">{item.label}</div>
                  <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${Math.min(100, item.pct)}%` }} />
                  </div>
                  <div className="text-xs font-semibold text-slate-800 w-20 text-right">{fmtDollar(item.value, 2)}</div>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-800">Total Base Premium PMPM</span>
                <span className="text-lg font-black text-emerald-700">{fmtDollar(result.basePMPM, 2)}</span>
              </div>
            </div>
          </div>

          {/* Affordability */}
          <div className="grid grid-cols-2 gap-3">
            <StatBox label="Annual Premium (Single)" value={fmtDollar(result.annualPremium, 0)} sub="employer+employee combined" color="emerald" />
            <StatBox label="Employee Share (Annual)" value={fmtDollar(result.employeeShare, 0)} sub={`${fmt(100 - inputs.employerContribution)}% of premium`} color="blue" />
            <StatBox
              label="ACA Affordability"
              value={fmtPct(result.affordabilityPct, 1)}
              sub={`${result.affordable ? "AFFORDABLE" : "UNAFFORDABLE"} (threshold: 9.12%)`}
              color={result.affordable ? "emerald" : "red"}
            />
            <StatBox
              label="Est. Medicaid-Eligible"
              value={fmtPct(result.medicaidEligiblePct, 0)}
              sub="of enrollment at this income level"
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB 3: Adverse Selection & Risk Pool Dynamics ───────────────────────────

function AdverseSelection() {
  const [inputs, setInputs] = useState<AdverseInputs>({
    population: 100000,
    initialInsuredRate: 70,
    avgHealthScore: 1.1,
    communityRating: true,
    riskAdjustment: "Moderate",
    year1Increase: 15,
    exitRatePer10: 8,
    sick_stayRate: 96,
    mandate: false,
    riskCorridors: false,
    reinsurance: false,
    csrPayments: false,
  } as AdverseInputs & { sick_stayRate: number });

  const set = (key: keyof AdverseInputs | "sick_stayRate", value: number | boolean | string) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const simulation = useMemo(() => {
    const years = [0, 1, 2, 3, 4, 5];
    const riskAdjFactor =
      inputs.riskAdjustment === "Strong" ? 0.7 :
      inputs.riskAdjustment === "Moderate" ? 0.5 :
      inputs.riskAdjustment === "Weak" ? 0.25 : 0;

    // Stabilization reduction in exit rate
    let exitRateMultiplier = 1.0;
    if (inputs.mandate) exitRateMultiplier *= 0.70;
    if (inputs.riskCorridors) exitRateMultiplier *= 0.85;
    if (inputs.reinsurance) exitRateMultiplier *= 0.80;
    if (inputs.csrPayments) exitRateMultiplier *= 0.90;

    const effectiveExitRate = inputs.exitRatePer10 * exitRateMultiplier;

    // Simulate 5 years
    let insuredRate = inputs.initialInsuredRate;
    let healthScore = inputs.avgHealthScore;
    let premium = 400; // base PMPM in dollars
    let deathSpiral = false;

    // For healthy vs sick split: assume sick = top 20% of cost, stay rate 96%
    const rows: {
      year: number;
      insuredRate: number;
      healthScore: number;
      premium: number;
      premiumIncrease: number;
      deathSpiral: boolean;
    }[] = [];

    rows.push({ year: 0, insuredRate, healthScore, premium, premiumIncrease: 0, deathSpiral: false });

    for (let y = 1; y <= 5; y++) {
      const prevPremium = premium;
      const premiumIncreasePct = y === 1 ? inputs.year1Increase : Math.max(5, inputs.year1Increase * (healthScore - 0.9) * 1.5);
      premium = prevPremium * (1 + premiumIncreasePct / 100);

      // Exit rate: healthy members exit per 10% premium increase
      const premiumIncreaseUnits = premiumIncreasePct / 10;
      const healthyExitPct = effectiveExitRate * premiumIncreaseUnits / 100;

      // Adjust insured rate (mostly healthy leave)
      insuredRate = Math.max(10, insuredRate * (1 - healthyExitPct * 0.8));

      // Risk pool composition worsens
      const riskPoolDeterioration = (1 - riskAdjFactor) * healthyExitPct * 0.5;
      healthScore = Math.min(2.5, healthScore + riskPoolDeterioration);

      // Community rating spreads cost; if not CR, healthy can find cheaper alternatives
      if (!inputs.communityRating) {
        insuredRate = Math.max(10, insuredRate * (1 - healthyExitPct * 0.2)); // additional exit
      }

      if (insuredRate < 40 && !deathSpiral) deathSpiral = true;
      rows.push({
        year: y,
        insuredRate: Math.round(insuredRate * 10) / 10,
        healthScore: Math.round(healthScore * 100) / 100,
        premium: Math.round(premium),
        premiumIncrease: Math.round(premiumIncreasePct * 10) / 10,
        deathSpiral,
      });
    }

    return rows;
  }, [inputs]);

  const deathSpiralYear = simulation.find((r) => r.deathSpiral)?.year;
  const lastYear = simulation[simulation.length - 1];

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
        <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-emerald-800">
          <strong>Adverse Selection</strong> occurs when sicker individuals disproportionately enroll in insurance while healthier individuals opt out, causing premiums to rise and creating a "death spiral." Risk adjustment, mandates, and reinsurance are key stabilizers.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Market Conditions
            </h3>
            <Slider label="Total Insurable Population" value={inputs.population} min={10000} max={1000000} step={10000} onChange={(v) => set("population", v)} />
            <Slider label="Initial Insured Rate" value={inputs.initialInsuredRate} min={10} max={100} suffix="%" onChange={(v) => set("initialInsuredRate", v)} />
            <Slider label="Avg Health Status Score" value={inputs.avgHealthScore} min={0.5} max={2.0} step={0.05} onChange={(v) => set("avgHealthScore", v)} />

            <div className="mb-3">
              <label className="text-xs font-medium text-slate-600 block mb-1">Risk Adjustment Program</label>
              <select
                value={inputs.riskAdjustment}
                onChange={(e) => set("riskAdjustment", e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {["Strong", "Moderate", "Weak", "None"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            <Toggle label="Community Rating" value={inputs.communityRating} onChange={(v) => set("communityRating", v)} description="Single rate for all members regardless of health status" />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Premium Dynamics</h3>
            <Slider label="Year 1 Premium Increase" value={inputs.year1Increase} min={0} max={50} suffix="%" onChange={(v) => set("year1Increase", v)} />
            <Slider label="Healthy Exit Rate per 10% Increase" value={inputs.exitRatePer10} min={1} max={20} suffix="%" onChange={(v) => set("exitRatePer10", v)} />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-3">Stabilization Interventions</h3>
            <Toggle label="Individual Mandate" value={inputs.mandate} onChange={(v) => set("mandate", v)} description="Reduces exit rate by ~30%" />
            <Toggle label="Risk Corridors" value={inputs.riskCorridors} onChange={(v) => set("riskCorridors", v)} description="Limits insurer losses, stabilizes premiums" />
            <Toggle label="Reinsurance Program" value={inputs.reinsurance} onChange={(v) => set("reinsurance", v)} description="Covers high-cost outliers, reduces premium trend" />
            <Toggle label="CSR Payments" value={inputs.csrPayments} onChange={(v) => set("csrPayments", v)} description="Keeps low-income members enrolled" />
          </div>
        </div>

        {/* Simulation results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Death spiral alert */}
          {deathSpiralYear && (
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-red-800">Death Spiral Triggered in Year {deathSpiralYear}</div>
                <div className="text-sm text-red-700 mt-1">
                  Healthy insured rate dropped below 40%. The risk pool is unsustainable. Enable stabilization interventions to prevent collapse.
                </div>
              </div>
            </div>
          )}

          {!deathSpiralYear && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex gap-3">
              <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-800">
                <strong>Market Stable:</strong> Risk pool remains viable through the 5-year simulation window. Insured rate stays above the 40% death spiral threshold.
              </div>
            </div>
          )}

          {/* 5-year table */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-4">5-Year Risk Pool Simulation</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs text-slate-500 font-medium pb-2">Year</th>
                    <th className="text-right text-xs text-slate-500 font-medium pb-2">Insured Rate</th>
                    <th className="text-right text-xs text-slate-500 font-medium pb-2">Health Score</th>
                    <th className="text-right text-xs text-slate-500 font-medium pb-2">Premium PMPM</th>
                    <th className="text-right text-xs text-slate-500 font-medium pb-2">Premium Δ</th>
                    <th className="text-center text-xs text-slate-500 font-medium pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {simulation.map((row) => (
                    <tr
                      key={row.year}
                      className={`border-b border-gray-50 ${row.deathSpiral ? "bg-red-50" : "hover:bg-gray-50"}`}
                    >
                      <td className="py-2.5 font-semibold text-slate-700">Year {row.year}</td>
                      <td className={`text-right font-medium ${row.insuredRate < 40 ? "text-red-700" : row.insuredRate < 60 ? "text-amber-700" : "text-emerald-700"}`}>
                        {fmtPct(row.insuredRate, 1)}
                      </td>
                      <td className={`text-right ${row.healthScore > 1.5 ? "text-red-700" : row.healthScore > 1.2 ? "text-amber-700" : "text-emerald-700"}`}>
                        {row.healthScore.toFixed(2)}
                      </td>
                      <td className="text-right font-semibold text-slate-800">{fmtDollar(row.premium)}</td>
                      <td className={`text-right ${row.premiumIncrease > 20 ? "text-red-700" : row.premiumIncrease > 10 ? "text-amber-700" : "text-emerald-700"}`}>
                        {row.year > 0 ? "+" + fmtPct(row.premiumIncrease, 1) : "—"}
                      </td>
                      <td className="text-center">
                        {row.deathSpiral ? (
                          <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">SPIRAL</span>
                        ) : row.year === 0 ? (
                          <span className="text-xs bg-gray-100 text-slate-600 px-2 py-0.5 rounded-full">Baseline</span>
                        ) : (
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Stable</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual trend bars */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-slate-800 mb-4">Premium Trend (Year-over-Year)</h3>
            <div className="space-y-2">
              {simulation.slice(1).map((row) => (
                <div key={row.year} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-12">Year {row.year}</span>
                  <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                    <div
                      className={`h-full rounded transition-all ${row.premiumIncrease > 20 ? "bg-red-500" : row.premiumIncrease > 10 ? "bg-amber-400" : "bg-emerald-500"}`}
                      style={{ width: `${Math.min(100, (row.premiumIncrease / 50) * 100)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold w-16 text-right ${row.premiumIncrease > 20 ? "text-red-700" : row.premiumIncrease > 10 ? "text-amber-700" : "text-emerald-700"}`}>
                    +{fmtPct(row.premiumIncrease, 1)}
                  </span>
                </div>
              ))}
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-200">
              <StatBox label="5-Yr Cumulative Increase" value={fmtPct(((lastYear.premium - simulation[0].premium) / simulation[0].premium) * 100, 0)} color="amber" small />
              <StatBox label="Final Insured Rate" value={fmtPct(lastYear.insuredRate, 1)} color={lastYear.insuredRate < 40 ? "red" : "emerald"} small />
              <StatBox label="Final Health Score" value={lastYear.healthScore.toFixed(2)} sub="1.0 = average" color={lastYear.healthScore > 1.5 ? "red" : "emerald"} small />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB 4: Medicare Drug Pricing (IRA 2022) ─────────────────────────────────

// CPI assumption for inflation rebate
const CPI_2021_TO_NOW = 1.16; // ~16% cumulative CPI from 2021-2026

function IRASec({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-base font-semibold text-slate-800">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-gray-100">{children}</div>}
    </div>
  );
}

function MedicareDrugPricing() {
  const [selectedDrugIdx, setSelectedDrugIdx] = useState(0);
  const [customMedicareSpending, setCustomMedicareSpending] = useState<number | null>(null);
  const [patientAnnualDrugCost, setPatientAnnualDrugCost] = useState(8000);
  const [patientIncomeLevel, setPatientIncomeLevel] = useState<"low" | "mid" | "high">("mid");

  // Section C
  const [inflDrugName, setInflDrugName] = useState("Humira (adalimumab)");
  const [launch2021, setLaunch2021] = useState(72000);
  const [currentPrice, setCurrentPrice] = useState(89000);

  const drug = IRA_DRUGS[selectedDrugIdx];
  const medicareSpending = customMedicareSpending ?? drug.medicareSpending;

  // Section A calculations
  const mfp = drug.currentListPrice * (1 - drug.mfpReduction);
  const federalSavings = medicareSpending * drug.mfpReduction; // millions
  const beneficiaryOOPSavings = mfpReduction_beneficiaryOOP(drug, mfp, patientAnnualDrugCost);
  const manufacturerRevLoss = federalSavings * 0.7; // simplified

  function mfpReduction_beneficiaryOOP(d: IRADrugData, mfp: number, annualCost: number) {
    // 20% coinsurance in Part D catastrophic; OOP cap $2,000 in 2025+
    const oldOOP = Math.min(annualCost * 0.20, 3800);
    const newOOP = Math.min(annualCost * (mfp / d.currentListPrice) * 0.20, 2000);
    return Math.max(0, oldOOP - newOOP);
  }

  // Section B: Part D redesign
  const partDOOP = useMemo(() => {
    const cost = patientAnnualDrugCost;

    // OLD structure (pre-2025)
    const oldDeductible = Math.min(cost, 545); // 2024 deductible
    let oldRemaining = cost - oldDeductible;

    const oldInitialPhaseLimit = 4660 - 545; // 2024 ICL
    const oldInitialOOP = Math.min(oldRemaining, oldInitialPhaseLimit) * 0.25;
    oldRemaining = Math.max(0, oldRemaining - oldInitialPhaseLimit);

    // Donut hole (coverage gap): 25% of drug costs
    const oldDonutLimit = 7400 - 4660;
    const oldDonutOOP = Math.min(oldRemaining, oldDonutLimit) * 0.25;
    oldRemaining = Math.max(0, oldRemaining - oldDonutLimit);

    // Catastrophic: 5% coinsurance
    const oldCatastrophicOOP = oldRemaining * 0.05;

    const oldTotalOOP = oldDeductible + oldInitialOOP + oldDonutOOP + oldCatastrophicOOP;

    // NEW structure (2025+)
    const newDeductible = Math.min(cost, 590); // 2025
    let newRemaining = cost - newDeductible;

    const newInitialPhaseLimit = 2000 - newDeductible;
    const newInitialOOP = Math.min(newRemaining, newInitialPhaseLimit) * 0.25;

    // No donut hole. OOP cap = $2,000
    const newTotalOOP = Math.min(newDeductible + newInitialOOP, 2000);

    // Low income subsidy adjustments
    const liSubsidy = patientIncomeLevel === "low" ? 0.85 : patientIncomeLevel === "mid" ? 0.30 : 0;

    const oldFinalOOP = oldTotalOOP * (1 - liSubsidy);
    const newFinalOOP = newTotalOOP * (1 - liSubsidy);

    // Determine spending phase (new)
    let newPhase = "Deductible";
    if (cost > 2000) newPhase = "Catastrophic (No Donut Hole)";
    else if (cost > 590) newPhase = "Initial Coverage";

    // Determine spending phase (old)
    let oldPhase = "Deductible";
    if (cost > 7400) oldPhase = "Catastrophic";
    else if (cost > 4660) oldPhase = "Coverage Gap (Donut Hole)";
    else if (cost > 545) oldPhase = "Initial Coverage";

    return { oldTotalOOP: oldFinalOOP, newTotalOOP: newFinalOOP, savings: Math.max(0, oldFinalOOP - newFinalOOP), oldPhase, newPhase };
  }, [patientAnnualDrugCost, patientIncomeLevel]);

  // Section C: Inflation rebate
  const inflationRebate = useMemo(() => {
    if (launch2021 <= 0) return null;
    const allowedPrice = launch2021 * CPI_2021_TO_NOW;
    const excessPct = Math.max(0, ((currentPrice - allowedPrice) / allowedPrice) * 100);
    const rebatePerUnit = Math.max(0, currentPrice - allowedPrice);
    const rebatePct = (rebatePerUnit / currentPrice) * 100;
    return { allowedPrice, excessPct, rebatePerUnit, rebatePct };
  }, [launch2021, currentPrice]);

  return (
    <div className="space-y-4">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
        <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-emerald-800">
          <strong>Inflation Reduction Act (IRA) 2022</strong> enacted three major drug pricing reforms: Medicare negotiation of Maximum Fair Prices for high-cost drugs, Part D benefit redesign with a $2,000 OOP cap, and inflation rebates when drug prices exceed CPI.
        </div>
      </div>

      {/* Section A */}
      <IRASec title="Section A — Medicare Negotiation & Maximum Fair Price (MFP)">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Select Drug (2026 Negotiation List)</label>
            <select
              value={selectedDrugIdx}
              onChange={(e) => { setSelectedDrugIdx(Number(e.target.value)); setCustomMedicareSpending(null); }}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
            >
              {IRA_DRUGS.map((d, i) => <option key={d.name} value={i}>{d.name}</option>)}
            </select>

            {/* Drug price comparison */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Current List Price (annual)</span>
                <span className="font-bold text-slate-800">{fmtDollar(drug.currentListPrice, 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Maximum Fair Price (MFP)</span>
                <span className="font-bold text-emerald-700">{fmtDollar(mfp, 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">MFP Discount</span>
                <span className="font-bold text-emerald-800">{fmtPct(drug.mfpReduction * 100, 0)} off list price</span>
              </div>
              <div className="h-px bg-gray-200" />
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>List Price</span>
                  <span>MFP</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden relative">
                  <div
                    className="absolute left-0 h-full bg-red-400 rounded-l-full"
                    style={{ width: `${drug.mfpReduction * 100}%` }}
                  />
                  <div
                    className="absolute h-full bg-emerald-500 rounded-r-full"
                    style={{ left: `${drug.mfpReduction * 100}%`, right: 0 }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>{fmtPct(drug.mfpReduction * 100, 0)} saved</span>
                  <span>{fmtPct((1 - drug.mfpReduction) * 100, 0)} of list price</span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <Slider
                label="Medicare Part D Spending (millions)"
                value={medicareSpending}
                min={500}
                max={20000}
                step={100}
                prefix="$"
                suffix="M"
                onChange={(v) => setCustomMedicareSpending(v)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <StatBox label="Federal Savings from MFP" value={fmtDollar(federalSavings, 0) + "M"} sub="annual Medicare savings" color="emerald" />
            <StatBox label="Beneficiary OOP Savings" value={fmtDollar(beneficiaryOOPSavings, 0) + "/yr"} sub="per patient on this drug" color="blue" />
            <StatBox label="Manufacturer Revenue Impact" value={"-" + fmtDollar(manufacturerRevLoss, 0) + "M"} sub="estimated annual revenue reduction" color="red" />
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
              <strong>Note:</strong> MFP estimates reflect CMS 2026 negotiation targets. Actual negotiated prices are subject to manufacturer negotiations and statutory caps (65-75% of non-federal average manufacturer price for small molecule drugs with 9-13 years post-approval).
            </div>
          </div>
        </div>
      </IRASec>

      {/* Section B */}
      <IRASec title="Section B — Part D Benefit Redesign (2025+): No Donut Hole, $2,000 OOP Cap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <Slider label="Annual Drug Costs (total allowed)" value={patientAnnualDrugCost} min={0} max={30000} step={500} prefix="$" onChange={setPatientAnnualDrugCost} />

            <div className="mb-4">
              <label className="text-xs font-medium text-slate-600 block mb-1">Income Level (Low-Income Subsidy)</label>
              <div className="flex gap-2">
                {(["low", "mid", "high"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setPatientIncomeLevel(lvl)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg capitalize transition-colors ${
                      patientIncomeLevel === lvl
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                    }`}
                  >
                    {lvl === "low" ? "Low (LIS)" : lvl === "mid" ? "Middle" : "High"}
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {patientIncomeLevel === "low" ? "Low-Income Subsidy: 85% OOP reduction" :
                 patientIncomeLevel === "mid" ? "Partial subsidy: 30% OOP reduction" :
                 "No subsidy — full cost sharing"}
              </div>
            </div>

            {/* Spending phase visualization */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs font-semibold text-slate-700 mb-3">Spending Phase Comparison</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs w-16 text-slate-500">Old 2024</span>
                  <div className={`flex-1 px-2 py-1 rounded text-xs font-medium text-center ${
                    partDOOP.oldPhase.includes("Catastrophic") ? "bg-red-100 text-red-700" :
                    partDOOP.oldPhase.includes("Donut") ? "bg-amber-100 text-amber-700" :
                    partDOOP.oldPhase.includes("Initial") ? "bg-blue-100 text-blue-700" :
                    "bg-gray-200 text-slate-600"
                  }`}>
                    {partDOOP.oldPhase}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-16 text-slate-500">New 2025</span>
                  <div className={`flex-1 px-2 py-1 rounded text-xs font-medium text-center ${
                    partDOOP.newPhase.includes("Catastrophic") ? "bg-purple-100 text-purple-700" :
                    partDOOP.newPhase.includes("Initial") ? "bg-emerald-100 text-emerald-700" :
                    "bg-gray-200 text-slate-600"
                  }`}>
                    {partDOOP.newPhase}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <StatBox label="OOP Under Old Design" value={fmtDollar(partDOOP.oldTotalOOP, 0)} sub="deductible + initial + gap + catastrophic" color="red" />
            <StatBox label="OOP Under New Design" value={fmtDollar(partDOOP.newTotalOOP, 0)} sub="deductible + initial, $2,000 cap" color="emerald" />
            <StatBox
              label="Annual OOP Savings"
              value={fmtDollar(partDOOP.savings, 0)}
              sub="per beneficiary from IRA redesign"
              color={partDOOP.savings > 0 ? "blue" : "amber"}
            />

            {/* Structure comparison chart */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs font-semibold text-slate-700 mb-3">Part D Structure Comparison</div>
              <div className="space-y-2 text-xs">
                {[
                  { phase: "Deductible", old: "$545", new: "$590", change: "Slight increase" },
                  { phase: "Initial Coverage", old: "25% coins.", new: "25% coins.", change: "Same" },
                  { phase: "Coverage Gap", old: "25% coins.", new: "Eliminated", change: "REMOVED" },
                  { phase: "Catastrophic", old: "5% coins.", new: "OOP Cap $2,000", change: "Major improvement" },
                  { phase: "OOP Max", old: "No cap (unlimited)", new: "$2,000 hard cap", change: "Key protection" },
                ].map((row) => (
                  <div key={row.phase} className="grid grid-cols-4 gap-1 items-center">
                    <div className="text-slate-600 font-medium">{row.phase}</div>
                    <div className="text-red-600 bg-red-50 rounded px-1 py-0.5 text-center">{row.old}</div>
                    <div className="text-emerald-700 bg-emerald-50 rounded px-1 py-0.5 text-center">{row.new}</div>
                    <div className="text-slate-500 text-[10px]">{row.change}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </IRASec>

      {/* Section C */}
      <IRASec title="Section C — Inflation Rebate Calculator">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="mb-3">
              <label className="text-xs font-medium text-slate-600 block mb-1">Drug Name</label>
              <input
                type="text"
                value={inflDrugName}
                onChange={(e) => setInflDrugName(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <Slider
              label="2021 Launch / Reference Price (annual)"
              value={launch2021}
              min={1000}
              max={300000}
              step={1000}
              prefix="$"
              onChange={setLaunch2021}
            />
            <Slider
              label="Current List Price (annual)"
              value={currentPrice}
              min={1000}
              max={300000}
              step={1000}
              prefix="$"
              onChange={setCurrentPrice}
            />

            {inflationRebate && (
              <div className="bg-gray-50 rounded-xl p-4 mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">2021 Reference Price</span>
                  <span className="font-bold">{fmtDollar(launch2021, 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">CPI-Adjusted Allowed Price</span>
                  <span className="font-bold text-blue-700">{fmtDollar(inflationRebate.allowedPrice, 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Assumed CPI Increase</span>
                  <span className="font-medium">{fmtPct((CPI_2021_TO_NOW - 1) * 100, 0)} (2021-2026)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Current List Price</span>
                  <span className={`font-bold ${currentPrice > inflationRebate.allowedPrice ? "text-red-600" : "text-emerald-600"}`}>
                    {fmtDollar(currentPrice, 0)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {inflationRebate && (
              <>
                {inflationRebate.excessPct > 0 ? (
                  <>
                    <StatBox
                      label="Excess Price Increase"
                      value={"+" + fmtPct(inflationRebate.excessPct, 1)}
                      sub="above CPI-allowed increase"
                      color="red"
                    />
                    <StatBox
                      label="Rebate Owed per Unit"
                      value={fmtDollar(inflationRebate.rebatePerUnit, 0)}
                      sub="paid back to Medicare per unit sold"
                      color="amber"
                    />
                    <StatBox
                      label="Rebate as % of List Price"
                      value={fmtPct(inflationRebate.rebatePct, 1)}
                      sub="manufacturer must rebate this % of revenue"
                      color="purple"
                    />
                  </>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <div className="font-semibold text-emerald-800">No Inflation Rebate Owed</div>
                    <div className="text-sm text-emerald-700 mt-1">
                      Current list price ({fmtDollar(currentPrice, 0)}) is at or below the CPI-adjusted allowed price ({fmtDollar(inflationRebate.allowedPrice, 0)}). No rebate required.
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-xl p-4 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-700 mb-2">IRA Inflation Rebate Mechanics</div>
                  <div>• Applies to drugs covered under Medicare Parts B and D</div>
                  <div>• Measured against 2021 benchmark prices (or year of first sale)</div>
                  <div>• Excess price increase above CPI-U triggers mandatory rebate to CMS</div>
                  <div>• Rebate rate escalates for larger excess increases (up to 100% of excess)</div>
                  <div>• Creates strong disincentive for above-inflation list price increases</div>
                </div>
              </>
            )}
          </div>
        </div>
      </IRASec>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    id: "av",
    label: "AV Calculator",
    icon: <Calculator className="w-4 h-4" />,
    desc: "Design benefit structures & calculate actuarial value",
  },
  {
    id: "rating",
    label: "Premium Rating",
    icon: <DollarSign className="w-4 h-4" />,
    desc: "Rate development & affordability analysis",
  },
  {
    id: "adverse",
    label: "Adverse Selection",
    icon: <Activity className="w-4 h-4" />,
    desc: "Risk pool dynamics & death spiral simulation",
  },
  {
    id: "ira",
    label: "Medicare Drug (IRA)",
    icon: <Pill className="w-4 h-4" />,
    desc: "IRA 2022 drug pricing reform impact",
  },
];

export default function ActuarialLab() {
  const [activeTab, setActiveTab] = useState<Tab>("av");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Actuarial & Insurance Design Lab</h1>
              <p className="text-emerald-200 text-sm">Health benefit design, premium rating, risk pool modeling, and drug pricing reform analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                    : "border-transparent text-slate-600 hover:text-slate-800 hover:border-gray-300"
                }`}
              >
                <span className={activeTab === tab.id ? "text-emerald-600" : "text-slate-400"}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab description */}
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="text-sm text-slate-500 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          {TABS.find((t) => t.id === activeTab)?.desc}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {activeTab === "av" && <AVCalculator />}
        {activeTab === "rating" && <PremiumRating />}
        {activeTab === "adverse" && <AdverseSelection />}
        {activeTab === "ira" && <MedicareDrugPricing />}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto text-xs text-slate-400 text-center">
          Actuarial & Insurance Design Lab — Vermont Health Platform. For analytical and educational purposes. Calculations are simplified models;
          consult a credentialed actuary (ASA/FSA) for regulatory filings. AV calculations use a simplified algorithm, not the CMS ACTUARIAL VALUE CALCULATOR.
        </div>
      </div>
    </div>
  );
}
