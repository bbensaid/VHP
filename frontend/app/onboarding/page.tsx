"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import {
  ChartBarIcon,
  SparklesIcon,
  BeakerIcon,
  DocumentTextIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ROLES = [
  { id: "clinician",   label: "Clinician / Provider",      desc: "Physician, NP, PA, nurse, therapist" },
  { id: "admin",       label: "Health System Leader",       desc: "Hospital administrator, CFO, CMO" },
  { id: "policy",      label: "Policy Professional",        desc: "State/federal government, advocacy" },
  { id: "payer",       label: "Payer / Insurance",          desc: "Health plan, ACO, MCO staff" },
  { id: "student",     label: "Student / Researcher",       desc: "Graduate student or academic researcher" },
  { id: "consultant",  label: "Consultant / Advisor",       desc: "Healthcare consulting, strategy" },
  { id: "other",       label: "Other",                      desc: "Something else entirely" },
];

const ROLE_HIGHLIGHTS: Record<string, { icon: React.ElementType; label: string; href: string }[]> = {
  clinician: [
    { icon: DocumentTextIcon, label: "Clinical policy analyses",    href: "/policy" },
    { icon: ChartBarIcon,     label: "State performance dashboard", href: "/dashboard" },
    { icon: SparklesIcon,     label: "Ask the AI Analyst",          href: "/chat" },
  ],
  admin: [
    { icon: ChartBarIcon,     label: "State performance dashboard", href: "/dashboard" },
    { icon: SparklesIcon,     label: "Ask the AI Analyst",          href: "/chat" },
    { icon: BeakerIcon,       label: "Hospital Financial Scorecard",href: "/research-lab/policy-quality" },
  ],
  policy: [
    { icon: DocumentTextIcon, label: "Policy analysis library",     href: "/policy" },
    { icon: BeakerIcon,       label: "Policy Simulator",            href: "/research-lab/policy-quality" },
    { icon: SparklesIcon,     label: "Ask the AI Analyst",          href: "/chat" },
  ],
  payer: [
    { icon: BeakerIcon,       label: "APM Design Lab",              href: "/research-lab/payment-models" },
    { icon: ChartBarIcon,     label: "State performance dashboard", href: "/dashboard" },
    { icon: SparklesIcon,     label: "Ask the AI Analyst",          href: "/chat" },
  ],
  student: [
    { icon: AcademicCapIcon,  label: "Academy courses",             href: "/academy" },
    { icon: BeakerIcon,       label: "Research Lab tools",          href: "/research-lab" },
    { icon: SparklesIcon,     label: "Ask the AI Analyst",          href: "/chat" },
  ],
  consultant: [
    { icon: BeakerIcon,       label: "Research Lab",                href: "/research-lab" },
    { icon: DocumentTextIcon, label: "Policy analysis library",     href: "/policy" },
    { icon: SparklesIcon,     label: "Ask the AI Analyst",          href: "/chat" },
  ],
  other: [
    { icon: SparklesIcon,     label: "Ask the AI Analyst",          href: "/chat" },
    { icon: ChartBarIcon,     label: "State performance dashboard", href: "/dashboard" },
    { icon: DocumentTextIcon, label: "Policy analysis library",     href: "/policy" },
  ],
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [orgName, setOrgName] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSaveAndContinue() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({
        org_name: orgName,
        onboarding_role: selectedRole,
        onboarding_complete: true,
      }).eq("id", user.id);
    }
    setSaving(false);
    setStep(3);
  }

  const highlights = ROLE_HIGHLIGHTS[selectedRole] || ROLE_HIGHLIGHTS.other;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">

        {/* Progress */}
        <div className="flex gap-2 mb-8 justify-center">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 w-16 rounded-full transition-colors ${s <= step ? "bg-indigo-600" : "bg-slate-200"}`}
            />
          ))}
        </div>

        {/* Step 1: Role */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-900">Welcome! Tell us about yourself.</h1>
              <p className="text-slate-500 mt-2 text-sm">This helps us personalize your experience.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    selectedRole === role.id
                      ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                      : "border-slate-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  <div className="font-bold text-slate-900">{role.label}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{role.desc}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => selectedRole && setStep(2)}
              disabled={!selectedRole}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Organization */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-900">Where do you work?</h1>
              <p className="text-slate-500 mt-2 text-sm">Optional — helps us tailor content to your sector.</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Organization name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Hospital, health plan, state agency…"
                />
              </div>
              <button
                onClick={handleSaveAndContinue}
                disabled={saving}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-colors disabled:opacity-60"
              >
                {saving ? "Setting up…" : "Continue →"}
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-full text-sm text-slate-400 hover:text-slate-600 py-2"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Personalized "Start here" */}
        {step === 3 && (
          <div>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-7 h-7 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-black text-slate-900">You&apos;re all set!</h1>
              <p className="text-slate-500 mt-2 text-sm">Here&apos;s where we recommend starting.</p>
            </div>
            <div className="space-y-3 mb-8">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <Link
                    key={h.href}
                    href={h.href}
                    className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                      {h.label}
                    </span>
                    <span className="ml-auto text-slate-300 group-hover:text-indigo-400 text-lg">→</span>
                  </Link>
                );
              })}
            </div>
            <button
              onClick={() => router.push("/account")}
              className="w-full text-sm text-slate-400 hover:text-slate-600 py-2"
            >
              Go to my account
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
