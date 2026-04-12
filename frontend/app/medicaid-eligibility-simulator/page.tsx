"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// ── 2026 Vermont FPL base amounts (annual) ────────────────────────────────────
// Source: HHS 2026 poverty guidelines (48 contiguous states)
const FPL_BASE = 15650;   // 1-person household
const FPL_INCR = 5500;    // each additional person

function getFPL(householdSize: number): number {
  return FPL_BASE + FPL_INCR * Math.max(0, householdSize - 1);
}

// ── Program eligibility logic ──────────────────────────────────────────────────

type EligibilityResult = {
  program: string;
  eligible: "likely" | "possibly" | "unlikely";
  reason: string;
  details: string;
  color: string;
  badge: string;
  applyUrl?: string;
};

interface SimInputs {
  // Step 1 — residency
  isVermont: boolean;
  isCitizen: boolean;  // US citizen or qualified immigrant
  // Step 2 — household
  householdSize: number;
  // Step 3 — income
  annualIncome: number;
  // Step 4 — demographics
  hasChildren: boolean;
  childrenUnder19: number;
  isPregnant: boolean;
  isPostpartum: boolean;  // within 12 months
  age: number;
  isDisabled: boolean;
  isBlind: boolean;
  isFosterCareYouth: boolean; // aged out of foster care under 26
  // Step 5 — insurance
  hasEmployerInsurance: boolean;
  hasMedicare: boolean;
}

function computeResults(inputs: SimInputs): EligibilityResult[] {
  const results: EligibilityResult[] = [];
  const fpl = getFPL(inputs.householdSize);
  const fplPct = inputs.annualIncome > 0 ? (inputs.annualIncome / fpl) * 100 : 0;

  // ── Disqualifying conditions ───────────────────────────────────────────────
  if (!inputs.isVermont) {
    return [{
      program: "Vermont Medicaid",
      eligible: "unlikely",
      reason: "Vermont residency required",
      details: "All Vermont Medicaid programs require you to live in Vermont. If you recently moved to Vermont, you may apply immediately upon establishing residency.",
      color: "border-slate-200",
      badge: "bg-slate-100 text-slate-600",
    }];
  }
  if (!inputs.isCitizen) {
    return [{
      program: "Vermont Medicaid",
      eligible: "possibly",
      reason: "Immigration status affects eligibility",
      details: "Vermont offers full Medicaid to U.S. citizens and many qualified immigrants (lawful permanent residents, refugees, asylees, etc.). Some programs may have 5-year waiting periods. Undocumented residents may qualify for Emergency Medicaid for urgent care. Contact Vermont Health Connect for a full review.",
      color: "border-amber-200",
      badge: "bg-amber-100 text-amber-700",
      applyUrl: "https://healthconnect.vermont.gov",
    }];
  }

  // ── Standard Adult Medicaid (138% FPL) ────────────────────────────────────
  if (inputs.age >= 19 && inputs.age <= 64 && !inputs.hasMedicare) {
    if (fplPct <= 138) {
      results.push({
        program: "Medicaid for Adults",
        eligible: "likely",
        reason: `Your income (${fplPct.toFixed(0)}% FPL) is at or below the 138% FPL threshold`,
        details: "Covers doctor visits, hospital care, prescriptions, mental health, substance use treatment, dental, and vision. No premiums. No cost-sharing for most services.",
        color: "border-rose-300",
        badge: "bg-rose-100 text-rose-700",
        applyUrl: "https://healthconnect.vermont.gov",
      });
    } else if (fplPct <= 200) {
      results.push({
        program: "Medicaid for Adults",
        eligible: "unlikely",
        reason: `Your income (${fplPct.toFixed(0)}% FPL) exceeds the 138% FPL limit`,
        details: "You may qualify for subsidized coverage through Vermont Health Connect. At 139–400% FPL you are likely eligible for premium tax credits on a Qualified Health Plan.",
        color: "border-slate-200",
        badge: "bg-slate-100 text-slate-600",
        applyUrl: "https://healthconnect.vermont.gov",
      });
    }
  }

  // ── Dr. Dynasaur — Children ────────────────────────────────────────────────
  if (inputs.hasChildren && inputs.childrenUnder19 > 0) {
    // Children's FPL calculated on household including children
    if (fplPct <= 317) {
      results.push({
        program: `Dr. Dynasaur (${inputs.childrenUnder19} child${inputs.childrenUnder19 > 1 ? "ren" : ""})`,
        eligible: "likely",
        reason: `Household income (${fplPct.toFixed(0)}% FPL) is at or below the 317% FPL threshold for children`,
        details: "Comprehensive coverage for all children ages 0–18: preventive care, dental, vision, mental health, prescriptions, hospital care. No premiums for families below 225% FPL; small premiums above that.",
        color: "border-sky-300",
        badge: "bg-sky-100 text-sky-700",
        applyUrl: "https://healthconnect.vermont.gov",
      });
    } else {
      results.push({
        program: `Dr. Dynasaur (children)`,
        eligible: "unlikely",
        reason: `Household income (${fplPct.toFixed(0)}% FPL) exceeds the 317% FPL limit`,
        details: "Your children may still qualify for subsidized coverage through Vermont Health Connect at reduced premiums.",
        color: "border-slate-200",
        badge: "bg-slate-100 text-slate-600",
        applyUrl: "https://healthconnect.vermont.gov",
      });
    }
  }

  // ── Dr. Dynasaur — Pregnancy ───────────────────────────────────────────────
  if (inputs.isPregnant) {
    if (fplPct <= 208) {
      results.push({
        program: "Dr. Dynasaur — Pregnancy",
        eligible: "likely",
        reason: `Income (${fplPct.toFixed(0)}% FPL) is at or below the 208% FPL threshold for pregnant women`,
        details: "Full Medicaid coverage beginning with pregnancy confirmation through 60 days postpartum (see Postpartum extension below). Covers all prenatal care, labor & delivery, and newborn care.",
        color: "border-violet-300",
        badge: "bg-violet-100 text-violet-700",
        applyUrl: "https://healthconnect.vermont.gov",
      });
    } else {
      results.push({
        program: "Dr. Dynasaur — Pregnancy",
        eligible: "unlikely",
        reason: `Income (${fplPct.toFixed(0)}% FPL) exceeds the 208% FPL threshold`,
        details: "You may still qualify for subsidized maternity coverage through Vermont Health Connect. Contact Vermont Health Connect to review your options.",
        color: "border-slate-200",
        badge: "bg-slate-100 text-slate-600",
        applyUrl: "https://healthconnect.vermont.gov",
      });
    }
  }

  // ── Postpartum Medicaid (12-month extension) ───────────────────────────────
  if (inputs.isPostpartum) {
    if (fplPct <= 208) {
      results.push({
        program: "Postpartum Medicaid (12 months)",
        eligible: "likely",
        reason: "Vermont extended postpartum Medicaid to 12 months in 2022",
        details: "If you recently gave birth and were enrolled in Medicaid during pregnancy, coverage continues automatically for 12 full months postpartum. No new application needed.",
        color: "border-violet-300",
        badge: "bg-violet-100 text-violet-700",
        applyUrl: "https://dvha.vermont.gov",
      });
    }
  }

  // ── AABD Medicaid ──────────────────────────────────────────────────────────
  if (inputs.age >= 65 || inputs.isBlind || inputs.isDisabled) {
    if (fplPct <= 100) {
      results.push({
        program: "AABD Medicaid (Aged, Blind & Disabled)",
        eligible: "likely",
        reason: `Income (${fplPct.toFixed(0)}% FPL) is within the AABD program limit`,
        details: "Covers all standard Medicaid benefits plus long-term care services. An asset test applies (generally $2,000 individual / $3,000 couple). SSI recipients are automatically eligible. May coordinate with Medicare.",
        color: "border-amber-300",
        badge: "bg-amber-100 text-amber-700",
        applyUrl: "https://dvha.vermont.gov/members/applying-for-vermont-medicaid",
      });
    } else if (fplPct <= 150) {
      results.push({
        program: "AABD Medicaid (Aged, Blind & Disabled)",
        eligible: "possibly",
        reason: `Income (${fplPct.toFixed(0)}% FPL) may be within AABD limits after allowable deductions`,
        details: "AABD uses a modified income calculation that may allow certain deductions. An eligibility worker can review your full circumstances. Asset tests also apply.",
        color: "border-amber-200",
        badge: "bg-amber-50 text-amber-600",
        applyUrl: "https://dvha.vermont.gov/members/applying-for-vermont-medicaid",
      });
    }
  }

  // ── Choices for Care ──────────────────────────────────────────────────────
  if (inputs.age >= 65 || inputs.isDisabled) {
    results.push({
      program: "Choices for Care (LTSS)",
      eligible: "possibly",
      reason: "Age or disability status may qualify you — functional assessment required",
      details: "Choices for Care provides personal care, adult day services, and residential care for people who need nursing-facility-level assistance but want to remain at home or in the community. Eligibility requires a functional assessment (ADL evaluation) in addition to income screening. Income limit is ~300% SSI ($2,742/mo individual).",
      color: "border-teal-200",
      badge: "bg-teal-50 text-teal-700",
      applyUrl: "https://ahs.vermont.gov/adrc",
    });
  }

  // ── Foster Care Youth ─────────────────────────────────────────────────────
  if (inputs.isFosterCareYouth && inputs.age < 26) {
    results.push({
      program: "Former Foster Care Youth Medicaid",
      eligible: "likely",
      reason: "Vermont extends Medicaid to former foster care youth up to age 26",
      details: "If you were in Vermont foster care and aged out of the system, you qualify for Medicaid regardless of income until age 26. No income test applies.",
      color: "border-emerald-300",
      badge: "bg-emerald-100 text-emerald-700",
      applyUrl: "https://healthconnect.vermont.gov",
    });
  }

  // ── Vermont Premium Assistance ────────────────────────────────────────────
  if (inputs.hasEmployerInsurance && fplPct <= 300 && fplPct > 138) {
    results.push({
      program: "Vermont Premium Assistance (VPA)",
      eligible: "possibly",
      reason: "Employer insurance plus income level may qualify you for premium assistance",
      details: "If your employer offers health insurance, Vermont may pay your share of premiums and out-of-pocket costs if this is cost-effective for the state. An eligibility worker determines if your employer plan qualifies.",
      color: "border-indigo-200",
      badge: "bg-indigo-50 text-indigo-700",
      applyUrl: "https://healthconnect.vermont.gov",
    });
  }

  // ── Medicare Savings Programs ─────────────────────────────────────────────
  if (inputs.hasMedicare) {
    if (fplPct <= 135) {
      results.push({
        program: "Medicare Savings Program (MSP)",
        eligible: "likely",
        reason: "Medicare enrollment plus low income may qualify you for help with Medicare costs",
        details: "Vermont's Medicare Savings Programs (QMB, SLMB, QI) pay some or all of your Medicare Part B premiums, deductibles, and copays. QMB covers Part A and B cost-sharing. Eligibility is separate from standard Medicaid.",
        color: "border-emerald-300",
        badge: "bg-emerald-100 text-emerald-700",
        applyUrl: "https://dvha.vermont.gov/members/medicare-savings-programs",
      });
    }
    if (inputs.isDisabled || inputs.age >= 65) {
      results.push({
        program: "Dual Eligible — Full Medicaid",
        eligible: fplPct <= 100 ? "likely" : "possibly",
        reason: "Having both Medicare and Medicaid ('dual eligible') provides the most complete coverage",
        details: "If you qualify for both Medicare and full Medicaid, Vermont coordinates benefits so Medicaid pays costs Medicare doesn't cover — including long-term care, dental, vision, and most cost-sharing. Apply for both and let Vermont determine your full dual eligibility.",
        color: "border-emerald-200",
        badge: "bg-emerald-50 text-emerald-600",
        applyUrl: "https://dvha.vermont.gov",
      });
    }
  }

  if (results.length === 0) {
    results.push({
      program: "No direct Medicaid match found",
      eligible: "unlikely",
      reason: `Income (${fplPct.toFixed(0)}% FPL) and the entered circumstances don't match current Vermont Medicaid thresholds`,
      details: "You may still qualify for subsidized coverage through Vermont Health Connect at 139–400% FPL. Contact Vermont Health Connect to review all options including Qualified Health Plans and Advance Premium Tax Credits.",
      color: "border-slate-200",
      badge: "bg-slate-100 text-slate-600",
      applyUrl: "https://healthconnect.vermont.gov",
    });
  }

  return results;
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-500">Step {step} of {total}</span>
        <span className="text-xs text-slate-400">{Math.round((step / total) * 100)}% complete</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full">
        <div
          className="h-1.5 bg-rose-500 rounded-full transition-all duration-500"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

// ── Radio option ──────────────────────────────────────────────────────────────

function RadioOption({
  label,
  checked,
  onChange,
  name,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
        checked
          ? "border-rose-500 bg-rose-50"
          : "border-slate-200 bg-white hover:border-rose-200"
      }`}
      aria-pressed={checked}
      name={name}
    >
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
        checked ? "border-rose-500" : "border-slate-300"
      }`}>
        {checked && <div className="w-2 h-2 rounded-full bg-rose-500" />}
      </div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </button>
  );
}

// ── Number input ──────────────────────────────────────────────────────────────

function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  prefix,
  suffix,
  helpText,
}: {
  label: string;
  value: number | string;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  prefix?: string;
  suffix?: string;
  helpText?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
      {helpText && <p className="text-xs text-slate-400 mb-2">{helpText}</p>}
      <div className="flex items-center gap-2">
        {prefix && <span className="text-slate-500 font-semibold">{prefix}</span>}
        <input
          type="number"
          min={min ?? 0}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full border-2 border-slate-200 focus:border-rose-400 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-colors"
        />
        {suffix && <span className="text-slate-500 font-semibold">{suffix}</span>}
      </div>
    </div>
  );
}

// ── Result card ───────────────────────────────────────────────────────────────

function ResultCard({ result }: { result: EligibilityResult }) {
  const Icon =
    result.eligible === "likely"
      ? CheckCircleIcon
      : result.eligible === "possibly"
      ? ExclamationTriangleIcon
      : XCircleIcon;

  const iconColor =
    result.eligible === "likely"
      ? "text-emerald-500"
      : result.eligible === "possibly"
      ? "text-amber-500"
      : "text-slate-400";

  const label =
    result.eligible === "likely"
      ? "Likely eligible"
      : result.eligible === "possibly"
      ? "Possibly eligible"
      : "Unlikely eligible";

  return (
    <div className={`bg-white border-2 ${result.color} rounded-xl p-5`}>
      <div className="flex items-start gap-3 mb-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor}`} />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${result.badge}`}>
              {result.program}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wide ${iconColor}`}>
              {label}
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-700 mb-1">{result.reason}</p>
          <p className="text-xs text-slate-500 leading-relaxed">{result.details}</p>
        </div>
      </div>
      {result.applyUrl && (
        <div className="ml-8">
          <a
            href={result.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-800 underline underline-offset-2"
          >
            Apply / Learn More
            <ArrowTopRightOnSquareIcon className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}

// ── FPL indicator ─────────────────────────────────────────────────────────────

function FPLIndicator({ annualIncome, householdSize }: { annualIncome: number; householdSize: number }) {
  const fpl = getFPL(householdSize);
  const pct = annualIncome > 0 ? Math.round((annualIncome / fpl) * 100) : 0;
  const barWidth = Math.min(pct, 320);

  const zones = [
    { label: "AABD", pct: 100, color: "bg-amber-400" },
    { label: "Adult Medicaid", pct: 138, color: "bg-rose-400" },
    { label: "Pregnant", pct: 208, color: "bg-violet-400" },
    { label: "Dr. Dynasaur", pct: 317, color: "bg-sky-400" },
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs font-bold text-slate-600">Your income as % of Federal Poverty Level</span>
        <span className={`text-lg font-black ${pct <= 138 ? "text-emerald-600" : pct <= 317 ? "text-amber-600" : "text-slate-700"}`}>
          {pct}% FPL
        </span>
      </div>
      <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full transition-all duration-700"
          style={{ width: `${Math.min(barWidth / 320 * 100, 100)}%` }}
        />
        {zones.map((z) => (
          <div
            key={z.label}
            className="absolute top-0 bottom-0 w-px bg-white/70"
            style={{ left: `${Math.min(z.pct / 320 * 100, 100)}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {zones.map((z) => (
          <span key={z.label} className="flex items-center gap-1 text-[10px] text-slate-500">
            <span className={`inline-block w-2 h-2 rounded-full ${z.color}`} />
            {z.pct}% {z.label}
          </span>
        ))}
      </div>
      <p className="text-[11px] text-slate-400 mt-2">
        2026 FPL for household of {householdSize}: ${fpl.toLocaleString()}/year
      </p>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

const TOTAL_STEPS = 5;

const defaultInputs: SimInputs = {
  isVermont: true,
  isCitizen: true,
  householdSize: 1,
  annualIncome: 0,
  hasChildren: false,
  childrenUnder19: 0,
  isPregnant: false,
  isPostpartum: false,
  age: 30,
  isDisabled: false,
  isBlind: false,
  isFosterCareYouth: false,
  hasEmployerInsurance: false,
  hasMedicare: false,
};

export default function MedicaidEligibilitySimulatorPage() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<SimInputs>(defaultInputs);
  const [results, setResults] = useState<EligibilityResult[] | null>(null);

  const set = <K extends keyof SimInputs>(key: K, value: SimInputs[K]) =>
    setInputs((prev) => ({ ...prev, [key]: value }));

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else {
      setResults(computeResults(inputs));
      setStep(TOTAL_STEPS + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
    else if (results !== null) { setResults(null); setStep(TOTAL_STEPS); }
  };

  const handleReset = () => { setInputs(defaultInputs); setStep(1); setResults(null); };

  const likelyCount = results?.filter((r) => r.eligible === "likely").length ?? 0;
  const possiblyCount = results?.filter((r) => r.eligible === "possibly").length ?? 0;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded border border-amber-200">
            Analyze & Tools
          </span>
          <span className="bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-rose-200">
            Vermont Only · 2026
          </span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-3 leading-tight">
          Vermont Medicaid<br />Eligibility Simulator
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
          Answer 5 short questions to get an instant preliminary determination of which Vermont Medicaid programs you or your family may qualify for.
        </p>
        <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <ExclamationTriangleIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-800 leading-relaxed">
            <strong>Screening tool only.</strong> This simulator provides preliminary guidance based on general rules. It is not an official eligibility determination. Only the Vermont Department for Children and Families (DCF) and DVHA can make official determinations. Always apply through{" "}
            <a href="https://healthconnect.vermont.gov" target="_blank" rel="noopener noreferrer" className="underline underline-offset-1">Vermont Health Connect</a> for an official decision.
          </p>
        </div>
      </div>

      {/* ── RESULTS ──────────────────────────────────────────────────── */}
      {results !== null && (
        <div>
          {/* Summary */}
          <div className={`rounded-2xl p-6 mb-6 ${likelyCount > 0 ? "bg-emerald-50 border border-emerald-200" : possiblyCount > 0 ? "bg-amber-50 border border-amber-200" : "bg-slate-50 border border-slate-200"}`}>
            <div className="flex items-center gap-3 mb-2">
              {likelyCount > 0
                ? <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                : possiblyCount > 0
                ? <ExclamationTriangleIcon className="w-6 h-6 text-amber-500" />
                : <XCircleIcon className="w-6 h-6 text-slate-400" />
              }
              <h2 className="font-black text-slate-900 text-lg">
                {likelyCount > 0
                  ? `${likelyCount} program${likelyCount > 1 ? "s" : ""} likely match your profile`
                  : possiblyCount > 0
                  ? "Possible eligibility — further review recommended"
                  : "No direct Medicaid match found"}
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {likelyCount > 0
                ? "Based on your answers, you appear to meet the income and categorical requirements for the programs below. Apply through Vermont Health Connect to receive an official determination."
                : possiblyCount > 0
                ? "Your situation has some factors that may qualify you. A Vermont eligibility worker can review your full circumstances and make an official determination."
                : "Based on your inputs, you may not qualify for standard Medicaid. You may be eligible for subsidized plans through Vermont Health Connect."}
            </p>
          </div>

          {/* FPL indicator */}
          <FPLIndicator annualIncome={inputs.annualIncome} householdSize={inputs.householdSize} />

          {/* Program results */}
          <div className="space-y-3 mb-8">
            {results.map((r, i) => <ResultCard key={i} result={r} />)}
          </div>

          {/* Next steps */}
          <div className="bg-slate-950 rounded-2xl p-6 text-white mb-6">
            <h3 className="font-black text-sm mb-4">Next Steps</h3>
            <ol className="space-y-2">
              {[
                { n: "1", text: "Apply at Vermont Health Connect for an official determination", url: "https://healthconnect.vermont.gov" },
                { n: "2", text: "Call 1-855-899-9600 to speak with an enrollment specialist", url: null },
                { n: "3", text: "Learn more about each program in the Medicaid Learning Center", url: "/academy/medicaid" },
                { n: "4", text: "Ask our AI Analyst specific questions about your situation", url: "/chat" },
              ].map((s) => (
                <li key={s.n} className="flex gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center shrink-0 text-[10px] font-black">{s.n}</span>
                  <span>
                    {s.url ? (
                      s.url.startsWith("http") ? (
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">{s.text}</a>
                      ) : (
                        <Link href={s.url} className="underline underline-offset-2 hover:text-white">{s.text}</Link>
                      )
                    ) : s.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl border-2 border-slate-200 text-sm font-bold text-slate-600 hover:border-rose-300 hover:text-rose-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      )}

      {/* ── WIZARD STEPS ─────────────────────────────────────────────── */}
      {results === null && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <ProgressBar step={step} total={TOTAL_STEPS} />

          {/* STEP 1 — Residency & Citizenship */}
          {step === 1 && (
            <div>
              <h2 className="font-black text-slate-900 text-lg mb-1">Residency & Citizenship</h2>
              <p className="text-xs text-slate-400 mb-6">Vermont Medicaid requires Vermont residency and US citizenship or qualified immigration status.</p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Do you currently live in Vermont?</p>
                  <div className="space-y-2">
                    <RadioOption label="Yes, I live in Vermont" checked={inputs.isVermont} onChange={() => set("isVermont", true)} name="vermont" />
                    <RadioOption label="No, I live in another state" checked={!inputs.isVermont} onChange={() => set("isVermont", false)} name="vermont" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Are you a U.S. citizen or a qualified immigrant?</p>
                  <p className="text-[11px] text-slate-400 mb-2">Qualified immigrants include lawful permanent residents, refugees, asylees, and certain other categories.</p>
                  <div className="space-y-2">
                    <RadioOption label="Yes, I am a U.S. citizen or qualified immigrant" checked={inputs.isCitizen} onChange={() => set("isCitizen", true)} name="citizen" />
                    <RadioOption label="No / I am unsure of my immigration status" checked={!inputs.isCitizen} onChange={() => set("isCitizen", false)} name="citizen" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — Household */}
          {step === 2 && (
            <div>
              <h2 className="font-black text-slate-900 text-lg mb-1">Household Composition</h2>
              <p className="text-xs text-slate-400 mb-6">Household size determines your Federal Poverty Level (FPL) threshold. Include everyone you file taxes with or share expenses with.</p>
              <div className="space-y-5">
                <NumberInput
                  label="Total household size (including yourself)"
                  value={inputs.householdSize}
                  onChange={(v) => set("householdSize", Math.max(1, v))}
                  min={1}
                  max={20}
                  helpText="Count yourself, your spouse/partner, and any dependents living with you."
                />
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Do any children under age 19 live in your household?</p>
                  <div className="space-y-2">
                    <RadioOption label="Yes" checked={inputs.hasChildren} onChange={() => set("hasChildren", true)} name="children" />
                    <RadioOption label="No" checked={!inputs.hasChildren} onChange={() => { set("hasChildren", false); set("childrenUnder19", 0); }} name="children" />
                  </div>
                </div>
                {inputs.hasChildren && (
                  <NumberInput
                    label="How many children under age 19?"
                    value={inputs.childrenUnder19}
                    onChange={(v) => set("childrenUnder19", Math.max(0, v))}
                    min={0}
                    max={20}
                  />
                )}
              </div>
            </div>
          )}

          {/* STEP 3 — Income */}
          {step === 3 && (
            <div>
              <h2 className="font-black text-slate-900 text-lg mb-1">Household Income</h2>
              <p className="text-xs text-slate-400 mb-6">Vermont uses MAGI-based income for most programs: wages, salaries, tips, self-employment, unemployment, Social Security (taxable portion), and most other income.</p>
              <div className="space-y-5">
                <NumberInput
                  label="Total annual household income (before taxes)"
                  value={inputs.annualIncome || ""}
                  onChange={(v) => set("annualIncome", v)}
                  min={0}
                  prefix="$"
                  helpText="Enter the combined gross income of all household members. For monthly income, multiply by 12."
                />
                {inputs.annualIncome > 0 && (
                  <FPLIndicator annualIncome={inputs.annualIncome} householdSize={inputs.householdSize} />
                )}
              </div>
            </div>
          )}

          {/* STEP 4 — Demographics */}
          {step === 4 && (
            <div>
              <h2 className="font-black text-slate-900 text-lg mb-1">Your Situation</h2>
              <p className="text-xs text-slate-400 mb-6">These factors determine which Medicaid programs you may be eligible for beyond standard adult coverage.</p>
              <div className="space-y-4">
                <NumberInput
                  label="Your age"
                  value={inputs.age}
                  onChange={(v) => set("age", Math.max(0, v))}
                  min={0}
                  max={120}
                  suffix="years old"
                />
                {[
                  { label: "Are you currently pregnant?", key: "isPregnant" as const },
                  { label: "Did you give birth within the past 12 months?", key: "isPostpartum" as const },
                  { label: "Do you have a disability that prevents substantial work?", key: "isDisabled" as const },
                  { label: "Are you legally blind?", key: "isBlind" as const },
                  { label: "Did you age out of Vermont foster care (under age 26)?", key: "isFosterCareYouth" as const },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <p className="text-sm font-semibold text-slate-700 mb-2">{label}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => set(key, true)}
                        className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${inputs[key] ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-200 text-slate-500 hover:border-rose-200"}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => set(key, false)}
                        className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${!inputs[key] ? "border-slate-400 bg-slate-50 text-slate-700" : "border-slate-200 text-slate-400 hover:border-slate-300"}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 — Insurance */}
          {step === 5 && (
            <div>
              <h2 className="font-black text-slate-900 text-lg mb-1">Current Insurance</h2>
              <p className="text-xs text-slate-400 mb-6">Existing coverage affects which programs you may qualify for and how benefits are coordinated.</p>
              <div className="space-y-4">
                {[
                  { label: "Does your employer offer health insurance?", key: "hasEmployerInsurance" as const, note: "Even if you haven't enrolled, having an employer offer may affect eligibility for Premium Assistance." },
                  { label: "Are you currently enrolled in Medicare?", key: "hasMedicare" as const, note: "Medicare enrollment opens access to Medicare Savings Programs (MSP) and dual eligibility." },
                ].map(({ label, key, note }) => (
                  <div key={key}>
                    <p className="text-sm font-semibold text-slate-700 mb-1">{label}</p>
                    <p className="text-[11px] text-slate-400 mb-2">{note}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => set(key, true)}
                        className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${inputs[key] ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-200 text-slate-500 hover:border-rose-200"}`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => set(key, false)}
                        className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${!inputs[key] ? "border-slate-400 bg-slate-50 text-slate-700" : "border-slate-200 text-slate-400 hover:border-slate-300"}`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-5 py-3 rounded-xl border-2 border-slate-200 text-sm font-bold text-slate-600 hover:border-slate-300 transition-colors"
              >
                ← Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold transition-colors"
            >
              {step < TOTAL_STEPS ? "Continue →" : "Show My Results →"}
            </button>
          </div>
        </div>
      )}

      {/* ── FOOTER NOTE ──────────────────────────────────────────────── */}
      <div className="mt-6 text-center">
        <p className="text-[11px] text-slate-400 mb-2">
          Need help understanding your results?
        </p>
        <div className="flex justify-center gap-4 text-xs">
          <Link href="/vermont-medicaid" className="text-rose-600 hover:text-rose-800 underline underline-offset-2">Vermont Medicaid Hub</Link>
          <Link href="/academy/medicaid" className="text-sky-600 hover:text-sky-800 underline underline-offset-2">Learning Center</Link>
          <Link href="/chat" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2">Ask AI Analyst</Link>
        </div>
      </div>
    </div>
  );
}
