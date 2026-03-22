"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  BarChart2,
  DollarSign,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Heart,
  Building2,
  Globe,
  Info,
  ArrowRight,
  Scale,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";

// ─── TYPE HELPERS ────────────────────────────────────────────────────────────

type Tab = "waiver" | "apm" | "expansion" | "transparency";

// ─── STATIC DATA ─────────────────────────────────────────────────────────────

const STATE_DATA: Record<
  string,
  {
    enrollees: number;
    perCapitaSpending: number;
    fmap: number;
    budgetPct: number;
    uninsuredRate: number;
    population: number;
  }
> = {
  Vermont: {
    enrollees: 218000,
    perCapitaSpending: 9800,
    fmap: 56.87,
    budgetPct: 28.4,
    uninsuredRate: 4.2,
    population: 647000,
  },
  "New York": {
    enrollees: 7800000,
    perCapitaSpending: 11200,
    fmap: 50.0,
    budgetPct: 35.1,
    uninsuredRate: 5.8,
    population: 19800000,
  },
  California: {
    enrollees: 14500000,
    perCapitaSpending: 7900,
    fmap: 50.0,
    budgetPct: 21.3,
    uninsuredRate: 7.2,
    population: 39200000,
  },
  Texas: {
    enrollees: 4900000,
    perCapitaSpending: 5600,
    fmap: 58.77,
    budgetPct: 18.9,
    uninsuredRate: 18.4,
    population: 30000000,
  },
  Ohio: {
    enrollees: 3100000,
    perCapitaSpending: 7200,
    fmap: 63.18,
    budgetPct: 26.7,
    uninsuredRate: 6.5,
    population: 11800000,
  },
  Michigan: {
    enrollees: 2800000,
    perCapitaSpending: 7800,
    fmap: 67.42,
    budgetPct: 29.8,
    uninsuredRate: 5.6,
    population: 10000000,
  },
};

const WAIVER_TYPES = [
  {
    id: "global_commitment",
    label: "Global Commitment to Health (Vermont)",
    approvalBase: 0.82,
    cmsAlignment: "High",
  },
  {
    id: "dsrip",
    label: "DSRIP (NY/NJ/TX model)",
    approvalBase: 0.68,
    cmsAlignment: "Moderate",
  },
  {
    id: "community_engagement",
    label: "Community Engagement Requirements",
    approvalBase: 0.35,
    cmsAlignment: "Low",
  },
  {
    id: "expansion_premium",
    label: "Expansion with Premium",
    approvalBase: 0.55,
    cmsAlignment: "Moderate",
  },
  {
    id: "managed_care",
    label: "Managed Care",
    approvalBase: 0.72,
    cmsAlignment: "High",
  },
  {
    id: "behavioral_health",
    label: "Behavioral Health Focus",
    approvalBase: 0.78,
    cmsAlignment: "High",
  },
  {
    id: "global_budget",
    label: "Global Budget",
    approvalBase: 0.6,
    cmsAlignment: "Moderate",
  },
];

const NON_EXPANSION_STATES: Record<
  string,
  {
    uninsuredRate: number;
    coverageGap: number;
    uncomp: number;
    population: number;
    fmap: number;
    label: string;
  }
> = {
  Texas: {
    uninsuredRate: 18.4,
    coverageGap: 1200000,
    uncomp: 5800000000,
    population: 30000000,
    fmap: 58.77,
    label: "Texas",
  },
  Florida: {
    uninsuredRate: 13.2,
    coverageGap: 780000,
    uncomp: 3900000000,
    population: 22600000,
    fmap: 55.14,
    label: "Florida",
  },
  Georgia: {
    uninsuredRate: 13.8,
    coverageGap: 410000,
    uncomp: 2100000000,
    population: 10900000,
    fmap: 67.19,
    label: "Georgia",
  },
  Tennessee: {
    uninsuredRate: 11.0,
    coverageGap: 190000,
    uncomp: 1200000000,
    population: 7100000,
    fmap: 66.57,
    label: "Tennessee",
  },
  Alabama: {
    uninsuredRate: 11.5,
    coverageGap: 165000,
    uncomp: 890000000,
    population: 5100000,
    fmap: 77.96,
    label: "Alabama",
  },
  Mississippi: {
    uninsuredRate: 13.4,
    coverageGap: 143000,
    uncomp: 720000000,
    population: 2960000,
    fmap: 77.96,
    label: "Mississippi",
  },
  SouthCarolina: {
    uninsuredRate: 12.1,
    coverageGap: 170000,
    uncomp: 980000000,
    population: 5300000,
    fmap: 70.54,
    label: "South Carolina",
  },
  Kansas: {
    uninsuredRate: 9.0,
    coverageGap: 96000,
    uncomp: 540000000,
    population: 2940000,
    fmap: 56.95,
    label: "Kansas",
  },
  Wisconsin: {
    uninsuredRate: 6.8,
    coverageGap: 89000,
    uncomp: 470000000,
    population: 5900000,
    fmap: 59.9,
    label: "Wisconsin",
  },
  Wyoming: {
    uninsuredRate: 10.8,
    coverageGap: 21000,
    uncomp: 130000000,
    population: 581000,
    fmap: 50.0,
    label: "Wyoming",
  },
};

const PROCEDURES = [
  {
    id: "em",
    label: "Evaluation & Management",
    hopdRate: 180,
    ascRate: 80,
    officeRate: 75,
  },
  {
    id: "echo",
    label: "Echocardiogram",
    hopdRate: 890,
    ascRate: 420,
    officeRate: 310,
  },
  {
    id: "ptot",
    label: "PT/OT (per session)",
    hopdRate: 230,
    ascRate: 110,
    officeRate: 90,
  },
  {
    id: "colonoscopy",
    label: "Colonoscopy",
    hopdRate: 1850,
    ascRate: 620,
    officeRate: 520,
  },
  {
    id: "infusion",
    label: "Infusion Therapy (per hour)",
    hopdRate: 520,
    ascRate: 200,
    officeRate: 160,
  },
  {
    id: "lab",
    label: "Lab Services (per panel)",
    hopdRate: 180,
    ascRate: 95,
    officeRate: 60,
  },
];

const NSA_SPECIALTIES = [
  "Emergency Medicine",
  "Anesthesiology",
  "Radiology",
  "Pathology",
  "Neonatology",
];

// ─── FORMATTING HELPERS ──────────────────────────────────────────────────────

const fmt = (n: number, decimals = 1) =>
  n.toLocaleString("en-US", { maximumFractionDigits: decimals });

const fmtM = (n: number) => {
  if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
};

const fmtPct = (n: number) => `${n.toFixed(1)}%`;

// ─── SHARED UI ATOMS ─────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
      {children}
    </h3>
  );
}

function StatCard({
  label,
  value,
  sub,
  color = "sky",
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  const colors: Record<string, string> = {
    sky: "bg-sky-50 border-sky-200 text-sky-700",
    green: "bg-emerald-50 border-emerald-200 text-emerald-700",
    red: "bg-red-50 border-red-200 text-red-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    slate: "bg-slate-50 border-slate-200 text-slate-700",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
  };
  return (
    <div className={`rounded-lg border p-4 ${colors[color] ?? colors.sky}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium opacity-70 mb-1">{label}</p>
          <p className="text-xl font-bold">{value}</p>
          {sub && <p className="text-xs opacity-60 mt-0.5">{sub}</p>}
        </div>
        {icon && <div className="opacity-50">{icon}</div>}
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  tooltip,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  tooltip?: string;
}) {
  const display = format ? format(value) : String(value);
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm text-slate-600 flex items-center gap-1">
          {label}
          {tooltip && (
            <span title={tooltip} className="cursor-help text-slate-400">
              <Info size={13} />
            </span>
          )}
        </label>
        <span className="text-sm font-semibold text-sky-700 min-w-[60px] text-right">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
      />
      <div className="flex justify-between text-xs text-slate-400 mt-0.5">
        <span>{format ? format(min) : String(min)}</span>
        <span>{format ? format(max) : String(max)}</span>
      </div>
    </div>
  );
}

function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-slate-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-slate-600">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${value ? "bg-sky-600" : "bg-slate-300"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

function ResultBar({
  label,
  value,
  max,
  color = "sky",
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const colors: Record<string, string> = {
    sky: "bg-sky-500",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
    indigo: "bg-indigo-500",
  };
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-slate-600 mb-0.5">
        <span>{label}</span>
        <span className="font-semibold">{fmtM(value)}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colors[color] ?? colors.sky} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── TAB 1: 1115 WAIVER MODELER ──────────────────────────────────────────────

function WaiverTab() {
  const [waiverType, setWaiverType] = useState("global_commitment");
  const [selectedState, setSelectedState] = useState("Vermont");
  const [expansionPct, setExpansionPct] = useState(10);
  const [mcPenetration, setMcPenetration] = useState(60);
  const [sdohSetAside, setSdohSetAside] = useState(2);
  const [communityReq, setCommunityReq] = useState("none");
  const [workReq, setWorkReq] = useState(false);
  const [premiums, setPremiums] = useState(0);
  const [benefitLimit, setBenefitLimit] = useState("none");

  const stateData = STATE_DATA[selectedState];
  const waiverInfo = WAIVER_TYPES.find((w) => w.id === waiverType)!;

  const results = useMemo(() => {
    const baseEnrollees = stateData.enrollees;
    const perCapita = stateData.perCapitaSpending;
    const fmapRate = stateData.fmap / 100;
    const uninsuredPop =
      (stateData.uninsuredRate / 100) * stateData.population;

    // Enrollment changes
    const expansionGain = Math.round(uninsuredPop * (expansionPct / 100));

    // Losses from requirements
    let requirementLoss = 0;
    if (workReq) requirementLoss += baseEnrollees * 0.08;
    if (communityReq === "20h") requirementLoss += baseEnrollees * 0.04;
    if (communityReq === "80h") requirementLoss += baseEnrollees * 0.06;
    if (premiums >= 20) requirementLoss += baseEnrollees * 0.02;
    if (premiums >= 50) requirementLoss += baseEnrollees * 0.03;
    if (premiums >= 80) requirementLoss += baseEnrollees * 0.04;

    const netEnrollmentChange = expansionGain - requirementLoss;
    const newTotalEnrollees = baseEnrollees + netEnrollmentChange;

    // 5-year spending
    const baseSpend = baseEnrollees * perCapita;
    const newSpend = newTotalEnrollees * perCapita * 1.02; // slight per-capita increase for newly eligible
    const totalSpendChange5yr = (newSpend - baseSpend) * 5;

    const federalShare = totalSpendChange5yr * 0.9; // expansion at 90% FMAP
    const stateShare = totalSpendChange5yr * 0.1;

    // SDOH savings (reduces hospitalizations)
    const sdohSavings =
      newSpend * (sdohSetAside / 100) * 0.3 * 5; // 30 cents on dollar returned

    // MC efficiency savings
    const mcSavings = newSpend * ((mcPenetration / 100) * 0.05) * 5; // 5% efficiency at 100% MC

    // Uncompensated care reduction
    const ucReduction = expansionGain * 2800; // avg uncompensated care per newly-insured

    // Hospital financial impact
    const hospitalGain = expansionGain * perCapita * 0.6 * 0.85; // 60% hospital share, 85 Medicaid-to-cost ratio
    const hospitalLoss = requirementLoss * perCapita * 0.6;

    // ER visits change (reduction from better primary care)
    const erReduction = Math.round(expansionGain * 0.18); // 0.18 ER visits/person/year reduction
    const prevHospReduction = Math.round(expansionGain * 0.055);

    // Approval likelihood
    let approvalScore = waiverInfo.approvalBase;
    if (workReq) approvalScore -= 0.25;
    if (communityReq === "80h") approvalScore -= 0.1;
    if (sdohSetAside >= 2) approvalScore += 0.05;
    if (mcPenetration >= 70) approvalScore += 0.04;
    if (premiums >= 50) approvalScore -= 0.08;
    approvalScore = Math.max(0.05, Math.min(0.98, approvalScore));

    return {
      expansionGain: Math.round(expansionGain),
      requirementLoss: Math.round(requirementLoss),
      netEnrollmentChange: Math.round(netEnrollmentChange),
      newTotalEnrollees: Math.round(newTotalEnrollees),
      totalSpendChange5yr,
      federalShare,
      stateShare,
      sdohSavings,
      mcSavings,
      ucReduction,
      hospitalGain,
      hospitalLoss,
      erReduction,
      prevHospReduction,
      approvalScore,
      baseSpend,
    };
  }, [
    stateData,
    waiverType,
    expansionPct,
    mcPenetration,
    sdohSetAside,
    communityReq,
    workReq,
    premiums,
    benefitLimit,
  ]);

  const approvalColor =
    results.approvalScore >= 0.65
      ? "green"
      : results.approvalScore >= 0.4
        ? "amber"
        : "red";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT PANEL */}
      <div className="lg:col-span-1 space-y-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Waiver Configuration</SectionTitle>
          <SelectRow
            label="Waiver Type"
            value={waiverType}
            options={WAIVER_TYPES.map((w) => ({ value: w.id, label: w.label }))}
            onChange={setWaiverType}
          />
          <SelectRow
            label="State"
            value={selectedState}
            options={Object.keys(STATE_DATA).map((s) => ({
              value: s,
              label: s,
            }))}
            onChange={setSelectedState}
          />

          <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 mb-4 text-xs text-sky-800 space-y-1">
            <div className="flex justify-between">
              <span>Medicaid Enrollees</span>
              <span className="font-bold">
                {stateData.enrollees.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Per-Capita Spending</span>
              <span className="font-bold">
                ${stateData.perCapitaSpending.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>FMAP Rate</span>
              <span className="font-bold">{stateData.fmap}%</span>
            </div>
            <div className="flex justify-between">
              <span>Medicaid % of State Budget</span>
              <span className="font-bold">{stateData.budgetPct}%</span>
            </div>
            <div className="flex justify-between">
              <span>Uninsured Rate</span>
              <span className="font-bold">{stateData.uninsuredRate}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Waiver Design Parameters</SectionTitle>
          <SliderRow
            label="Coverage Expansion"
            value={expansionPct}
            min={0}
            max={25}
            step={1}
            onChange={setExpansionPct}
            format={(v) => `+${v}% uninsured`}
            tooltip="% of currently uninsured population newly covered"
          />
          <SliderRow
            label="Managed Care Penetration"
            value={mcPenetration}
            min={0}
            max={100}
            step={5}
            onChange={setMcPenetration}
            format={(v) => `${v}%`}
          />
          <SliderRow
            label="SDOH Investment Set-Aside"
            value={sdohSetAside}
            min={0}
            max={5}
            step={0.5}
            onChange={setSdohSetAside}
            format={(v) => `${v}%`}
            tooltip="% of total spending directed to social determinants"
          />
          <SliderRow
            label="Premiums (above 138% FPL)"
            value={premiums}
            min={0}
            max={100}
            step={5}
            onChange={setPremiums}
            format={(v) => `$${v}/mo`}
          />

          <SelectRow
            label="Community Engagement Requirement"
            value={communityReq}
            options={[
              { value: "none", label: "None" },
              { value: "20h", label: "20 hrs/week" },
              { value: "80h", label: "80 hrs/month" },
            ]}
            onChange={setCommunityReq}
          />
          <SelectRow
            label="Benefit Limitations"
            value={benefitLimit}
            options={[
              { value: "none", label: "None" },
              { value: "dental", label: "Dental Carve-Out" },
              { value: "vision", label: "Vision Carve-Out" },
              { value: "transport", label: "Non-Emergency Transport" },
            ]}
            onChange={setBenefitLimit}
          />
          <ToggleRow
            label="Work Requirement"
            value={workReq}
            onChange={setWorkReq}
          />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="lg:col-span-2 space-y-5">
        {/* Approval Likelihood Banner */}
        <div
          className={`rounded-xl border p-5 ${approvalColor === "green" ? "bg-emerald-50 border-emerald-200" : approvalColor === "amber" ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-1">
                CMS Approval Likelihood
              </p>
              <p
                className={`text-3xl font-bold ${approvalColor === "green" ? "text-emerald-700" : approvalColor === "amber" ? "text-amber-700" : "text-red-700"}`}
              >
                {fmtPct(results.approvalScore * 100)}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Based on {waiverInfo.label} — CMS Alignment:{" "}
                <span className="font-semibold">{waiverInfo.cmsAlignment}</span>
                {workReq && (
                  <span className="ml-2 text-red-600">
                    ⚠ Work requirements reduce likelihood
                  </span>
                )}
              </p>
            </div>
            <div
              className={`text-6xl font-black opacity-20 ${approvalColor === "green" ? "text-emerald-700" : approvalColor === "amber" ? "text-amber-700" : "text-red-700"}`}
            >
              {approvalColor === "green"
                ? "✓"
                : approvalColor === "amber"
                  ? "~"
                  : "✗"}
            </div>
          </div>
          <div className="mt-3 w-full bg-white/60 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-700 ${approvalColor === "green" ? "bg-emerald-500" : approvalColor === "amber" ? "bg-amber-500" : "bg-red-500"}`}
              style={{ width: `${results.approvalScore * 100}%` }}
            />
          </div>
        </div>

        {/* 5-Year Enrollment Impact */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>5-Year Enrollment Impact</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              label="New Enrollees (Expansion)"
              value={`+${results.expansionGain.toLocaleString()}`}
              color="green"
              icon={<Users size={20} />}
            />
            <StatCard
              label="Lost Enrollees (Requirements)"
              value={`-${results.requirementLoss.toLocaleString()}`}
              color={results.requirementLoss > 0 ? "red" : "slate"}
              icon={<TrendingDown size={20} />}
            />
            <StatCard
              label="Net Enrollment Change"
              value={`${results.netEnrollmentChange >= 0 ? "+" : ""}${results.netEnrollmentChange.toLocaleString()}`}
              color={results.netEnrollmentChange >= 0 ? "sky" : "red"}
              icon={<Activity size={20} />}
            />
            <StatCard
              label="Total Enrollees (Yr 5)"
              value={results.newTotalEnrollees.toLocaleString()}
              color="slate"
              icon={<Users size={20} />}
            />
          </div>
        </div>

        {/* Financial Impact */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>5-Year Financial Impact</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <div className="grid grid-cols-1 gap-3">
                <StatCard
                  label="Total Spending Change"
                  value={fmtM(results.totalSpendChange5yr)}
                  sub="5-year cumulative"
                  color={results.totalSpendChange5yr > 0 ? "amber" : "green"}
                  icon={<DollarSign size={20} />}
                />
                <StatCard
                  label="Federal Share (90% FMAP expansion)"
                  value={fmtM(results.federalShare)}
                  color="sky"
                  icon={<Building2 size={20} />}
                />
                <StatCard
                  label="State Net Cost"
                  value={fmtM(results.stateShare)}
                  sub="Before offsets"
                  color="indigo"
                  icon={<DollarSign size={20} />}
                />
              </div>
            </div>
            <div>
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    Savings & Offsets
                  </p>
                  <ResultBar
                    label="SDOH Investment Return"
                    value={results.sdohSavings}
                    max={Math.max(
                      results.sdohSavings,
                      results.mcSavings,
                      results.ucReduction
                    )}
                    color="green"
                  />
                  <ResultBar
                    label="Managed Care Efficiency"
                    value={results.mcSavings}
                    max={Math.max(
                      results.sdohSavings,
                      results.mcSavings,
                      results.ucReduction
                    )}
                    color="sky"
                  />
                  <ResultBar
                    label="Uncompensated Care Reduction"
                    value={results.ucReduction}
                    max={Math.max(
                      results.sdohSavings,
                      results.mcSavings,
                      results.ucReduction
                    )}
                    color="indigo"
                  />
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    Hospital Financial Impact (Yr 5)
                  </p>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-emerald-700">Revenue Gain</span>
                    <span className="font-bold text-emerald-700">
                      {fmtM(results.hospitalGain)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-600">Revenue Loss (disenroll)</span>
                    <span className="font-bold text-red-600">
                      -{fmtM(results.hospitalLoss)}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between text-sm font-bold">
                    <span>Net Hospital Impact</span>
                    <span
                      className={
                        results.hospitalGain - results.hospitalLoss >= 0
                          ? "text-emerald-700"
                          : "text-red-600"
                      }
                    >
                      {fmtM(results.hospitalGain - results.hospitalLoss)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Population Health Impact */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Population Health Metrics (5-Year)</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              label="ER Visit Reduction"
              value={`-${results.erReduction.toLocaleString()}`}
              sub="visits avoided/year"
              color="green"
              icon={<Activity size={20} />}
            />
            <StatCard
              label="Preventable Hospitalizations"
              value={`-${results.prevHospReduction.toLocaleString()}`}
              sub="avoided/year"
              color="green"
              icon={<Heart size={20} />}
            />
            <StatCard
              label="Estimated Lives Saved"
              value={`~${Math.round(results.netEnrollmentChange > 0 ? results.netEnrollmentChange / 455 : 0)}`}
              sub="~1 per 455 newly insured"
              color="sky"
              icon={<Heart size={20} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB 2: ALL-PAYER MODEL / GLOBAL BUDGET DESIGNER ─────────────────────────

function APMTab() {
  const [baseSpend, setBaseSpend] = useState(3500); // in millions
  const [growthCap, setGrowthCap] = useState(3.5);
  const [projectedTrend, setProjectedTrend] = useState(6.5);
  const [hospitalPct, setHospitalPct] = useState(40);
  const [physicianPct, setPhysicianPct] = useState(28);
  const [drugPct, setDrugPct] = useState(14);
  const [qualityPool, setQualityPool] = useState(2);
  const [sdohPool, setSdohPool] = useState(1);
  const [medicare, setMedicare] = useState(true);
  const [medicaid, setMedicaid] = useState(true);
  const [commercial, setCommercial] = useState(true);
  const [selfPay, setSelfPay] = useState(false);
  const [compareMode, setCompareMode] = useState(false);

  const otherPct = Math.max(0, 100 - hospitalPct - physicianPct - drugPct);

  const projection = useMemo(() => {
    const years = Array.from({ length: 10 }, (_, i) => i + 1);
    let capBudget = baseSpend * 1e6;
    let trendBudget = baseSpend * 1e6;
    let cumSavings = 0;
    const rows = years.map((yr) => {
      capBudget *= 1 + growthCap / 100;
      trendBudget *= 1 + projectedTrend / 100;
      const savings = trendBudget - capBudget;
      cumSavings += savings;
      const qualityAlloc = capBudget * (qualityPool / 100);
      const sdohAlloc = capBudget * (sdohPool / 100);
      const productivityNeeded =
        ((projectedTrend - growthCap) / (growthCap + 100)) * 100;
      return {
        year: 2025 + yr,
        capBudget,
        trendBudget,
        savings,
        cumSavings,
        qualityAlloc,
        sdohAlloc,
        productivityNeeded,
      };
    });
    return rows;
  }, [baseSpend, growthCap, projectedTrend, qualityPool, sdohPool]);

  const payerCount = [medicare, medicaid, commercial, selfPay].filter(
    Boolean
  ).length;

  const finalRow = projection[9];
  const cumSavingsTotal = projection.reduce((s, r) => s + r.savings, 0);

  // VT ACO comparison benchmarks (approximate)
  const vtBenchmarks = {
    growthTarget: 3.5,
    actualGrowth: 4.2,
    qualityScore: 78,
    sdohInvestment: 1.2,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT PANEL */}
      <div className="lg:col-span-1 space-y-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Global Budget Parameters</SectionTitle>
          <SliderRow
            label="Base Year Spending"
            value={baseSpend}
            min={500}
            max={20000}
            step={100}
            onChange={setBaseSpend}
            format={(v) => `$${v}M`}
          />
          <SliderRow
            label="Annual Growth Cap"
            value={growthCap}
            min={0}
            max={6}
            step={0.1}
            onChange={setGrowthCap}
            format={(v) => `${v.toFixed(1)}%`}
            tooltip="Maximum allowed spending growth per year"
          />
          <SliderRow
            label="Projected Unconstrained Trend"
            value={projectedTrend}
            min={4}
            max={9}
            step={0.1}
            onChange={setProjectedTrend}
            format={(v) => `${v.toFixed(1)}%`}
            tooltip="What spending would grow without a budget cap"
          />
          {projectedTrend <= growthCap && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3 text-xs text-amber-700">
              Growth cap must be below projected trend to generate savings
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Spending Allocation</SectionTitle>
          <SliderRow
            label="Hospital Spending"
            value={hospitalPct}
            min={30}
            max={50}
            step={1}
            onChange={setHospitalPct}
            format={(v) => `${v}%`}
          />
          <SliderRow
            label="Physician Spending"
            value={physicianPct}
            min={20}
            max={35}
            step={1}
            onChange={setPhysicianPct}
            format={(v) => `${v}%`}
          />
          <SliderRow
            label="Drug Spending"
            value={drugPct}
            min={10}
            max={20}
            step={1}
            onChange={setDrugPct}
            format={(v) => `${v}%`}
          />
          <div className="bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-600 flex justify-between">
            <span>Other (remainder)</span>
            <span className="font-bold">{otherPct}%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Incentive Pools</SectionTitle>
          <SliderRow
            label="Quality Incentive Pool"
            value={qualityPool}
            min={0}
            max={5}
            step={0.25}
            onChange={setQualityPool}
            format={(v) => `${v}%`}
            tooltip="% of global budget withheld for quality performance"
          />
          <SliderRow
            label="SDOH Investment Pool"
            value={sdohPool}
            min={0}
            max={3}
            step={0.25}
            onChange={setSdohPool}
            format={(v) => `${v}%`}
            tooltip="% directed to social determinants of health programs"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>All-Payer Participation</SectionTitle>
          <ToggleRow label="Medicare" value={medicare} onChange={setMedicare} />
          <ToggleRow label="Medicaid" value={medicaid} onChange={setMedicaid} />
          <ToggleRow
            label="Commercial"
            value={commercial}
            onChange={setCommercial}
          />
          <ToggleRow label="Self-Pay" value={selfPay} onChange={setSelfPay} />
          <div className="text-xs text-slate-500 mt-2">
            {payerCount} of 4 payers participating
            {payerCount < 3 && (
              <span className="text-amber-600 ml-1">
                — limited all-payer alignment
              </span>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Comparison Mode</SectionTitle>
          <ToggleRow
            label="Vermont ACO Report Card"
            value={compareMode}
            onChange={setCompareMode}
          />
          {compareMode && (
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>VT Growth Target</span>
                <span className="font-bold text-sky-700">
                  {vtBenchmarks.growthTarget}%
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VT Actual Growth</span>
                <span
                  className={`font-bold ${vtBenchmarks.actualGrowth > vtBenchmarks.growthTarget ? "text-red-600" : "text-emerald-600"}`}
                >
                  {vtBenchmarks.actualGrowth}%
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VT Quality Score</span>
                <span className="font-bold">{vtBenchmarks.qualityScore}/100</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VT SDOH Investment</span>
                <span className="font-bold">
                  {vtBenchmarks.sdohInvestment}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="lg:col-span-2 space-y-5">
        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="10-Year Cap Budget (Yr 10)"
            value={fmtM(finalRow.capBudget)}
            color="sky"
            icon={<Globe size={20} />}
          />
          <StatCard
            label="Cumulative Savings"
            value={fmtM(cumSavingsTotal)}
            sub="vs. unconstrained trend"
            color="green"
            icon={<TrendingDown size={20} />}
          />
          <StatCard
            label="Quality Pool (Yr 10)"
            value={fmtM(finalRow.qualityAlloc)}
            sub="annual"
            color="indigo"
            icon={<ShieldCheck size={20} />}
          />
          <StatCard
            label="SDOH Pool (Yr 10)"
            value={fmtM(finalRow.sdohAlloc)}
            sub="annual"
            color="amber"
            icon={<Heart size={20} />}
          />
        </div>

        {/* Productivity requirement */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Annual Efficiency Requirement</SectionTitle>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-black text-sky-600">
              {fmtPct(projectedTrend - growthCap)}
            </div>
            <div className="text-sm text-slate-600">
              <p>
                Productivity improvement needed annually to close the gap
                between the{" "}
                <span className="font-semibold text-sky-700">
                  {growthCap.toFixed(1)}% cap
                </span>{" "}
                and{" "}
                <span className="font-semibold text-red-600">
                  {projectedTrend.toFixed(1)}% trend
                </span>
                .
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {projectedTrend - growthCap > 4
                  ? "Very aggressive — may require structural transformation"
                  : projectedTrend - growthCap > 2
                    ? "Challenging — significant operational changes needed"
                    : "Achievable — moderate process improvement required"}
              </p>
            </div>
          </div>
        </div>

        {/* 10-year projection table */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>10-Year Projection</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 pr-3 text-slate-500 font-semibold">
                    Year
                  </th>
                  <th className="text-right py-2 pr-3 text-slate-500 font-semibold">
                    Cap Budget
                  </th>
                  <th className="text-right py-2 pr-3 text-slate-500 font-semibold">
                    Trend (Unconstrained)
                  </th>
                  <th className="text-right py-2 pr-3 text-sky-600 font-semibold">
                    Annual Savings
                  </th>
                  <th className="text-right py-2 pr-3 text-emerald-600 font-semibold">
                    Cumulative Savings
                  </th>
                  <th className="text-right py-2 text-indigo-600 font-semibold">
                    Quality + SDOH
                  </th>
                </tr>
              </thead>
              <tbody>
                {projection.map((row, i) => (
                  <tr
                    key={row.year}
                    className={`border-b border-slate-50 ${i % 2 === 0 ? "bg-slate-50/50" : ""}`}
                  >
                    <td className="py-1.5 pr-3 font-semibold text-slate-700">
                      {row.year}
                    </td>
                    <td className="py-1.5 pr-3 text-right text-sky-700">
                      {fmtM(row.capBudget)}
                    </td>
                    <td className="py-1.5 pr-3 text-right text-red-500">
                      {fmtM(row.trendBudget)}
                    </td>
                    <td className="py-1.5 pr-3 text-right text-sky-600 font-semibold">
                      {row.savings > 0 ? fmtM(row.savings) : "—"}
                    </td>
                    <td className="py-1.5 pr-3 text-right text-emerald-600 font-semibold">
                      {row.cumSavings > 0 ? fmtM(row.cumSavings) : "—"}
                    </td>
                    <td className="py-1.5 text-right text-indigo-600">
                      {fmtM(row.qualityAlloc + row.sdohAlloc)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hospital budget corridor */}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <SectionTitle>Hospital-Specific Budget Corridor</SectionTitle>
          <div className="grid grid-cols-3 gap-3">
            {["Hospital", "Physician", "Drug"].map((sector, i) => {
              const pcts = [hospitalPct, physicianPct, drugPct];
              const alloc = (finalRow.capBudget * pcts[i]) / 100;
              const floor = alloc * 0.97;
              const ceiling = alloc * 1.03;
              return (
                <div
                  key={sector}
                  className="bg-slate-50 rounded-lg p-3 text-center"
                >
                  <p className="text-xs text-slate-500 font-semibold uppercase mb-2">
                    {sector}
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {fmtM(alloc)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Floor: {fmtM(floor)}
                  </p>
                  <p className="text-xs text-slate-400">
                    Ceiling: {fmtM(ceiling)}
                  </p>
                  <p className="text-xs text-sky-600 mt-1 font-semibold">
                    {pcts[i]}% of global budget
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB 3: MEDICAID EXPANSION IMPACT CALCULATOR ─────────────────────────────

function ExpansionTab() {
  const stateKeys = Object.keys(NON_EXPANSION_STATES);
  const [primaryState, setPrimaryState] = useState("Texas");
  const [compare2, setCompare2] = useState("Florida");
  const [compare3, setCompare3] = useState("Georgia");
  const [expandType, setExpandType] = useState<"full" | "partial">("full");
  const [showComparison, setShowComparison] = useState(false);

  function calcExpansion(
    stateKey: string,
    type: "full" | "partial"
  ) {
    const s = NON_EXPANSION_STATES[stateKey];
    const multiplier = type === "partial" ? 0.6 : 1.0;

    const newEnrollees = Math.round(s.coverageGap * multiplier * 1.1); // 110% take-up
    const perCapitaCost = 6200; // avg new enrollee cost
    const totalCost = newEnrollees * perCapitaCost;
    const federalCost = totalCost * 0.9;
    const stateCost = totalCost * 0.1;

    const ucReduction = s.uncomp * 0.45 * multiplier;
    // Medicaid multiplier: every $1 Medicaid = $1.8 economic activity
    const economicActivity = federalCost * 1.8;
    // Jobs: $1M creates ~10 healthcare jobs
    const jobsCreated = Math.round(federalCost / 1e6 / 10) * 1000; // approximate
    // Net budget: stateCost - ucReduction - medicaidSavings - taxRevenue
    const otherStateSavings = stateCost * 0.15; // savings in mental health, corrections, etc.
    const taxRevenue = economicActivity * 0.04;
    const netBudgetImpact = stateCost - ucReduction - otherStateSavings - taxRevenue;

    const livesSaved = Math.round(newEnrollees / 455);
    const mortalityReduction =
      (livesSaved / (s.population * (s.uninsuredRate / 100))) * 100;

    return {
      newEnrollees,
      federalCost,
      stateCost,
      ucReduction,
      economicActivity,
      jobsCreated,
      netBudgetImpact,
      livesSaved,
      mortalityReduction,
    };
  }

  const primaryResults = useMemo(
    () => calcExpansion(primaryState, expandType),
    [primaryState, expandType]
  );
  const r2 = useMemo(
    () => calcExpansion(compare2, expandType),
    [compare2, expandType]
  );
  const r3 = useMemo(
    () => calcExpansion(compare3, expandType),
    [compare3, expandType]
  );

  const stateOpts = stateKeys.map((k) => ({
    value: k,
    label: NON_EXPANSION_STATES[k].label,
  }));

  function CompareColumn({
    stateKey,
    results,
    highlight = false,
  }: {
    stateKey: string;
    results: ReturnType<typeof calcExpansion>;
    highlight?: boolean;
  }) {
    const s = NON_EXPANSION_STATES[stateKey];
    return (
      <div
        className={`rounded-xl border p-4 flex-1 ${highlight ? "border-sky-400 bg-sky-50/30" : "border-slate-200 bg-white"}`}
      >
        <p
          className={`text-base font-bold mb-3 ${highlight ? "text-sky-700" : "text-slate-700"}`}
        >
          {s.label}
        </p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">Uninsured Rate</span>
            <span className="font-bold text-red-600">
              {fmtPct(s.uninsuredRate)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">Coverage Gap</span>
            <span className="font-bold">
              {s.coverageGap.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">UC Burden</span>
            <span className="font-bold">{fmtM(s.uncomp)}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1 pt-1">
            <span className="text-slate-500 font-semibold">New Enrollees</span>
            <span className="font-bold text-sky-700">
              {results.newEnrollees.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">Federal Cost</span>
            <span className="font-bold text-slate-700">
              {fmtM(results.federalCost)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">State Cost</span>
            <span className="font-bold text-amber-700">
              {fmtM(results.stateCost)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">UC Reduction</span>
            <span className="font-bold text-emerald-700">
              -{fmtM(results.ucReduction)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">Economic Activity</span>
            <span className="font-bold text-emerald-700">
              {fmtM(results.economicActivity)}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500">Jobs Created</span>
            <span className="font-bold text-emerald-700">
              ~{results.jobsCreated.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500 font-semibold">
              Net Budget Impact
            </span>
            <span
              className={`font-bold ${results.netBudgetImpact <= 0 ? "text-emerald-700" : "text-red-600"}`}
            >
              {results.netBudgetImpact <= 0 ? "-" : "+"}
              {fmtM(Math.abs(results.netBudgetImpact))}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1">
            <span className="text-slate-500 font-semibold">Lives Saved/yr</span>
            <span className="font-bold text-sky-700">
              ~{results.livesSaved.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Mortality Reduction</span>
            <span className="font-bold text-sky-700">
              {results.mortalityReduction.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    );
  }

  const s = NON_EXPANSION_STATES[primaryState];

  return (
    <div className="space-y-6">
      {/* Controls row */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <SelectRow
            label="Primary State (Non-Expansion)"
            value={primaryState}
            options={stateOpts}
            onChange={setPrimaryState}
          />
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Expansion Type
            </label>
            <div className="flex gap-2">
              {(["full", "partial"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setExpandType(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors ${expandType === t ? "bg-sky-600 text-white border-sky-600" : "bg-white text-slate-600 border-slate-200 hover:border-sky-400"}`}
                >
                  {t === "full" ? "Full (138% FPL)" : "Partial (100% FPL)"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`w-full py-2 rounded-lg text-sm font-semibold border transition-colors ${showComparison ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-400"}`}
            >
              {showComparison ? "Hide" : "Show"} 3-State Comparison
            </button>
          </div>
        </div>
      </div>

      {/* Current status banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <p className="text-sm font-semibold text-red-700 mb-2">
          Current Status — {s.label} (Non-Expansion State)
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-red-500">Uninsured Rate</p>
            <p className="text-2xl font-black text-red-700">
              {fmtPct(s.uninsuredRate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-red-500">Coverage Gap Population</p>
            <p className="text-2xl font-black text-red-700">
              {s.coverageGap.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-red-500">Hospital Uncompensated Care</p>
            <p className="text-2xl font-black text-red-700">
              {fmtM(s.uncomp)}
            </p>
          </div>
        </div>
      </div>

      {/* Primary results */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="New Enrollees"
          value={primaryResults.newEnrollees.toLocaleString()}
          color="sky"
          icon={<Users size={20} />}
        />
        <StatCard
          label="Federal Cost (90% FMAP)"
          value={fmtM(primaryResults.federalCost)}
          color="slate"
          icon={<Building2 size={20} />}
        />
        <StatCard
          label="State Cost (10% FMAP)"
          value={fmtM(primaryResults.stateCost)}
          color="amber"
          icon={<DollarSign size={20} />}
        />
        <StatCard
          label="Net Budget Impact"
          value={`${primaryResults.netBudgetImpact <= 0 ? "-" : "+"}${fmtM(Math.abs(primaryResults.netBudgetImpact))}`}
          sub="After offsets & tax revenue"
          color={primaryResults.netBudgetImpact <= 0 ? "green" : "red"}
          icon={<TrendingDown size={20} />}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="UC Care Reduction"
          value={fmtM(primaryResults.ucReduction)}
          color="green"
          icon={<Building2 size={20} />}
        />
        <StatCard
          label="Economic Activity"
          value={fmtM(primaryResults.economicActivity)}
          color="indigo"
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          label="Estimated Lives Saved/yr"
          value={`~${primaryResults.livesSaved.toLocaleString()}`}
          sub="1 per 455 newly insured"
          color="sky"
          icon={<Heart size={20} />}
        />
        <StatCard
          label="Jobs Created"
          value={`~${primaryResults.jobsCreated.toLocaleString()}`}
          color="green"
          icon={<Users size={20} />}
        />
      </div>

      {/* 3-state comparison */}
      {showComparison && (
        <div>
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <SelectRow
                label="Compare State 2"
                value={compare2}
                options={stateOpts.filter((o) => o.value !== primaryState)}
                onChange={setCompare2}
              />
            </div>
            <div className="flex-1">
              <SelectRow
                label="Compare State 3"
                value={compare3}
                options={stateOpts.filter(
                  (o) => o.value !== primaryState && o.value !== compare2
                )}
                onChange={setCompare3}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <CompareColumn
              stateKey={primaryState}
              results={primaryResults}
              highlight
            />
            <CompareColumn stateKey={compare2} results={r2} />
            <CompareColumn stateKey={compare3} results={r3} />
          </div>
        </div>
      )}

      {/* Methodology note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs text-slate-500">
          <span className="font-semibold">Methodology:</span> Enrollment based
          on Kaiser Family Foundation coverage gap estimates. Federal/state cost
          split assumes 90% FMAP for ACA expansion population. Lives saved
          estimate from Sommers et al. (2012, 2014) mortality studies (~1 per
          455 newly insured). Economic multiplier of 1.8x from Dranove et al.
          Net budget impact = state cost − hospital UC reduction − other program
          savings (15% of state cost) − income/sales tax revenue (4% of
          economic activity).
        </p>
      </div>
    </div>
  );
}

// ─── TAB 4: PRICE TRANSPARENCY & SITE-NEUTRAL ────────────────────────────────

const PT_REQUIREMENTS = [
  {
    id: "mrf",
    label: "Machine-Readable File (MRF) posted publicly",
    weight: 25,
  },
  {
    id: "consumer",
    label: "Consumer-facing price estimator tool",
    weight: 20,
  },
  {
    id: "300services",
    label: "300 shoppable services with negotiated rates",
    weight: 20,
  },
  {
    id: "cms_format",
    label: "CMS-required file format and naming convention",
    weight: 10,
  },
  {
    id: "update",
    label: "Files updated at least annually (monthly for MRF)",
    weight: 10,
  },
  {
    id: "payer_names",
    label: "All payer and plan names clearly identified",
    weight: 8,
  },
  {
    id: "historical",
    label: "Historical allowed amounts included",
    weight: 7,
  },
];

function TransparencyTab() {
  const [hospitalName, setHospitalName] = useState("");
  const [ptChecked, setPtChecked] = useState<Record<string, boolean>>({});

  // Site-neutral
  const [selectedProc, setSelectedProc] = useState("echo");
  const [volume, setVolume] = useState(500);
  const [currentSetting, setCurrentSetting] = useState<
    "hopd" | "asc" | "office"
  >("hopd");

  // NSA
  const [nsaSpecialty, setNsaSpecialty] = useState("Emergency Medicine");
  const [nsaVolume, setNsaVolume] = useState(2000);
  const [nsaAvgCharge, setNsaAvgCharge] = useState(8500);
  const [qpaPct, setQpaPct] = useState(40);

  const procData = PROCEDURES.find((p) => p.id === selectedProc)!;

  const ptScore = useMemo(() => {
    let score = 0;
    PT_REQUIREMENTS.forEach((r) => {
      if (ptChecked[r.id]) score += r.weight;
    });
    return score;
  }, [ptChecked]);

  const ptGrade =
    ptScore >= 85
      ? { label: "Compliant", color: "green" }
      : ptScore >= 60
        ? { label: "Partial", color: "amber" }
        : { label: "Non-Compliant", color: "red" };

  const siteNeutral = useMemo(() => {
    const rateMap = {
      hopd: procData.hopdRate,
      asc: procData.ascRate,
      office: procData.officeRate,
    };
    const currentRate = rateMap[currentSetting];
    const neutralRate = procData.officeRate; // site-neutral = lowest rate
    const commercialMultiplier = 1.5;

    const currentMedicareRevenue = currentRate * volume;
    const neutralMedicareRevenue = neutralRate * volume;
    const revenueReduction = currentMedicareRevenue - neutralMedicareRevenue;

    const currentCommercialRevenue = currentRate * commercialMultiplier * volume;
    const neutralCommercialRevenue =
      neutralRate * commercialMultiplier * volume;
    const commercialReduction =
      currentCommercialRevenue - neutralCommercialRevenue;

    return {
      currentRate,
      neutralRate,
      currentMedicareRevenue,
      neutralMedicareRevenue,
      revenueReduction,
      currentCommercialRevenue,
      neutralCommercialRevenue,
      commercialReduction,
      totalReduction: revenueReduction + commercialReduction,
    };
  }, [procData, volume, currentSetting]);

  const nsa = useMemo(() => {
    const qpa = nsaAvgCharge * (qpaPct / 100);
    const revenueBefore = nsaVolume * nsaAvgCharge;
    const revenueAfter = nsaVolume * qpa;
    const revenueReduction = revenueBefore - revenueAfter;
    const patientSavings = revenueReduction * 0.35; // patient portion vs prior billing
    return { qpa, revenueBefore, revenueAfter, revenueReduction, patientSavings };
  }, [nsaVolume, nsaAvgCharge, qpaPct]);

  return (
    <div className="space-y-6">
      {/* SECTION 1: Price Transparency Compliance */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="text-sky-600" size={20} />
          <h3 className="text-base font-bold text-slate-800">
            Price Transparency Compliance Checker
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm text-slate-600 mb-1">
                Hospital / Health System Name
              </label>
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="e.g., University of Vermont Medical Center"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="space-y-2">
              {PT_REQUIREMENTS.map((req) => (
                <label
                  key={req.id}
                  className="flex items-start gap-2.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={!!ptChecked[req.id]}
                    onChange={(e) =>
                      setPtChecked((prev) => ({
                        ...prev,
                        [req.id]: e.target.checked,
                      }))
                    }
                    className="mt-0.5 accent-sky-600 w-4 h-4"
                  />
                  <div className="flex-1">
                    <span className="text-sm text-slate-700 group-hover:text-sky-700">
                      {req.label}
                    </span>
                    <span className="ml-2 text-xs text-slate-400">
                      ({req.weight} pts)
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {ptChecked[req.id] ? (
                      <CheckCircle size={15} className="text-emerald-500" />
                    ) : (
                      <XCircle size={15} className="text-red-300" />
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div
              className={`rounded-xl border p-5 text-center mb-4 ${ptGrade.color === "green" ? "bg-emerald-50 border-emerald-200" : ptGrade.color === "amber" ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"}`}
            >
              <p className="text-xs text-slate-500 font-semibold uppercase mb-1">
                {hospitalName || "Hospital"} Compliance Score
              </p>
              <p
                className={`text-5xl font-black mb-1 ${ptGrade.color === "green" ? "text-emerald-600" : ptGrade.color === "amber" ? "text-amber-600" : "text-red-600"}`}
              >
                {ptScore}
              </p>
              <p
                className={`text-sm font-bold ${ptGrade.color === "green" ? "text-emerald-600" : ptGrade.color === "amber" ? "text-amber-600" : "text-red-600"}`}
              >
                {ptGrade.label}
              </p>
              <div className="mt-3 w-full bg-white/60 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${ptGrade.color === "green" ? "bg-emerald-500" : ptGrade.color === "amber" ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${ptScore}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                Gap Analysis
              </p>
              {PT_REQUIREMENTS.filter((r) => !ptChecked[r.id]).length === 0 ? (
                <p className="text-sm text-emerald-600 font-semibold">
                  All requirements met. Full compliance achieved.
                </p>
              ) : (
                <ul className="space-y-1">
                  {PT_REQUIREMENTS.filter((r) => !ptChecked[r.id]).map((r) => (
                    <li
                      key={r.id}
                      className="flex items-start gap-1.5 text-xs text-slate-600"
                    >
                      <ArrowRight
                        size={12}
                        className="text-red-400 mt-0.5 flex-shrink-0"
                      />
                      <span>
                        {r.label}{" "}
                        <span className="text-red-500 font-semibold">
                          (-{r.weight} pts)
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3 text-xs text-slate-400">
                CMS penalty: up to $300/day for non-compliance ($109,500/year)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Site-Neutral Payment Impact */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="text-sky-600" size={20} />
          <h3 className="text-base font-bold text-slate-800">
            Site-Neutral Payment Impact Analyzer
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SelectRow
              label="Procedure"
              value={selectedProc}
              options={PROCEDURES.map((p) => ({
                value: p.id,
                label: p.label,
              }))}
              onChange={setSelectedProc}
            />
            <SliderRow
              label="Annual Procedure Volume"
              value={volume}
              min={50}
              max={10000}
              step={50}
              onChange={setVolume}
              format={(v) => v.toLocaleString()}
            />
            <div className="mb-4">
              <label className="block text-sm text-slate-600 mb-2">
                Current Setting
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "hopd", label: "HOPD" },
                    { id: "asc", label: "ASC" },
                    { id: "office", label: "Office" },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSetting(s.id)}
                    className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${currentSetting === s.id ? "bg-sky-600 text-white border-sky-600" : "bg-white text-slate-600 border-slate-200 hover:border-sky-400"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rate table */}
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                Medicare Rates — {procData.label}
              </p>
              {[
                {
                  label: "Hospital Outpatient (HOPD)",
                  rate: procData.hopdRate,
                  key: "hopd",
                },
                { label: "Ambulatory Surgery Center", rate: procData.ascRate, key: "asc" },
                {
                  label: "Physician Office",
                  rate: procData.officeRate,
                  key: "office",
                },
              ].map((row) => (
                <div
                  key={row.key}
                  className={`flex justify-between items-center py-1.5 border-b border-slate-200 last:border-0 text-sm ${currentSetting === row.key ? "font-bold text-sky-700" : "text-slate-600"}`}
                >
                  <span>{row.label}</span>
                  <div className="flex items-center gap-2">
                    <span>${row.rate.toLocaleString()}</span>
                    {row.key === "office" && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-semibold">
                        Site-Neutral
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Current Medicare Revenue"
                value={fmtM(siteNeutral.currentMedicareRevenue)}
                color="sky"
              />
              <StatCard
                label="Under Site-Neutral"
                value={fmtM(siteNeutral.neutralMedicareRevenue)}
                color="slate"
              />
              <StatCard
                label="Medicare Revenue Reduction"
                value={fmtM(siteNeutral.revenueReduction)}
                color={siteNeutral.revenueReduction > 0 ? "red" : "green"}
                icon={<TrendingDown size={18} />}
              />
              <StatCard
                label="Commercial Impact (150% Medicare)"
                value={fmtM(siteNeutral.commercialReduction)}
                color={siteNeutral.commercialReduction > 0 ? "amber" : "green"}
                icon={<DollarSign size={18} />}
              />
            </div>
            <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 text-xs text-sky-800">
              <span className="font-bold block mb-1">Total Revenue Impact:</span>
              <span className="text-2xl font-black text-sky-700">
                -{fmtM(siteNeutral.totalReduction)}
              </span>
              <span className="block mt-0.5 text-sky-600 text-xs">
                (Medicare + Commercial combined annual impact)
              </span>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 text-xs text-slate-600">
              <p className="font-semibold text-slate-700 mb-2">
                Advocacy Analysis
              </p>
              <p className="mb-2">
                <span className="font-semibold text-red-600">
                  Hospital position:
                </span>{" "}
                HOPD rates reflect higher overhead, regulatory burden (EMTALA,
                24/7 care), and standby capacity that physician offices do not
                bear. Site-neutral payment threatens hospital cross-subsidization
                of money-losing services and could force closures.
              </p>
              <p>
                <span className="font-semibold text-emerald-700">
                  Patient/CMS position:
                </span>{" "}
                Patients pay higher cost-sharing at HOPDs. Site-neutral saves
                Medicare and patients money without evidence of quality
                difference. MedPAC estimates $10B+ annual savings from full
                site-neutrality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: No Surprises Act Impact */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="text-sky-600" size={20} />
          <h3 className="text-base font-bold text-slate-800">
            Surprise Billing — No Surprises Act Impact
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SelectRow
              label="Specialty"
              value={nsaSpecialty}
              options={NSA_SPECIALTIES.map((s) => ({ value: s, label: s }))}
              onChange={setNsaSpecialty}
            />
            <SliderRow
              label="Annual Out-of-Network Billing Volume"
              value={nsaVolume}
              min={100}
              max={20000}
              step={100}
              onChange={setNsaVolume}
              format={(v) => v.toLocaleString()}
            />
            <SliderRow
              label="Average Out-of-Network Charge"
              value={nsaAvgCharge}
              min={500}
              max={50000}
              step={500}
              onChange={setNsaAvgCharge}
              format={(v) => `$${v.toLocaleString()}`}
            />
            <SliderRow
              label="QPA as % of Charge"
              value={qpaPct}
              min={15}
              max={80}
              step={1}
              onChange={setQpaPct}
              format={(v) => `${v}%`}
              tooltip="Qualified Payment Amount — typically 50th percentile in-network rate. Enters IDR as starting point."
            />
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Revenue Before NSA"
                value={fmtM(nsa.revenueBefore)}
                color="slate"
                icon={<DollarSign size={18} />}
              />
              <StatCard
                label="Revenue After NSA (QPA)"
                value={fmtM(nsa.revenueAfter)}
                color="sky"
                icon={<DollarSign size={18} />}
              />
              <StatCard
                label="Physician Revenue Reduction"
                value={fmtM(nsa.revenueReduction)}
                sub={`${fmtPct(100 - qpaPct)} reduction`}
                color="red"
                icon={<TrendingDown size={18} />}
              />
              <StatCard
                label="Patient Savings"
                value={fmtM(nsa.patientSavings)}
                sub="est. patient portion"
                color="green"
                icon={<Heart size={18} />}
              />
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-xs text-slate-600">
              <p className="font-semibold text-slate-700 mb-1">
                NSA Context — {nsaSpecialty}
              </p>
              <p>
                The QPA (${nsa.qpa.toLocaleString()}) serves as the starting
                offer in Independent Dispute Resolution (IDR). Arbitrators must
                consider QPA as the primary factor, then consider additional
                criteria (training, experience, market share). The NSA caps
                out-of-network patient cost-sharing at in-network amounts,
                eliminating balance billing.
              </p>
              <p className="mt-2 text-sky-700">
                Estimated gross reduction in {nsaSpecialty} out-of-network
                revenue:{" "}
                <span className="font-bold">{fmtM(nsa.revenueReduction)}</span>{" "}
                annually ({fmtPct(100 - qpaPct)} from pre-NSA baseline).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: React.ReactNode; short: string }[] =
  [
    {
      id: "waiver",
      label: "1115 Waiver Modeler",
      short: "1115 Waiver",
      icon: <Globe size={16} />,
    },
    {
      id: "apm",
      label: "Global Budget Designer",
      short: "Global Budget",
      icon: <BarChart2 size={16} />,
    },
    {
      id: "expansion",
      label: "Expansion Calculator",
      short: "Expansion",
      icon: <Users size={16} />,
    },
    {
      id: "transparency",
      label: "Price Transparency",
      short: "Transparency",
      icon: <ShieldCheck size={16} />,
    },
  ];

export default function PolicySimulator() {
  const [activeTab, setActiveTab] = useState<Tab>("waiver");

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="bg-sky-600 text-white rounded-lg p-2 flex-shrink-0">
              <Activity size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">
                Medicaid & State Health Policy Simulator
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Interactive modeling tools for 1115 waivers, all-payer budgets,
                Medicaid expansion, and price transparency analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-sky-600 text-sky-700"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === "waiver" && <WaiverTab />}
        {activeTab === "apm" && <APMTab />}
        {activeTab === "expansion" && <ExpansionTab />}
        {activeTab === "transparency" && <TransparencyTab />}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-400 flex items-start gap-2">
          <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            This simulator is for policy education and research purposes only.
            All projections are modeled estimates based on published literature
            and publicly available data. They do not constitute actuarial,
            legal, or financial advice. Actual outcomes will vary based on
            state-specific conditions, federal regulatory changes, and
            implementation factors.
          </p>
        </div>
      </div>
    </div>
  );
}
