"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { XMarkIcon, SparklesIcon, ChartBarIcon, AcademicCapIcon, NewspaperIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const STORAGE_KEY = "htr_onboarding_v1";

const PILLARS = [
  { id: "policy", label: "Policy", dot: "bg-sky-500", desc: "Legislation & regulation" },
  { id: "economics", label: "Economics", dot: "bg-emerald-500", desc: "Value-based care & markets" },
  { id: "technology", label: "Technology", dot: "bg-indigo-500", desc: "AI, digital health & data" },
  { id: "clinical", label: "Clinical", dot: "bg-red-500", desc: "Hospital care & delivery" },
  { id: "equity", label: "Equity", dot: "bg-violet-500", desc: "SDOH & access disparity" },
];

const ROLES = [
  { id: "executive", label: "Healthcare Executive", icon: "🏥" },
  { id: "policy", label: "Policy Analyst", icon: "📋" },
  { id: "clinician", label: "Clinician", icon: "🩺" },
  { id: "researcher", label: "Researcher / Academic", icon: "🔬" },
  { id: "consultant", label: "Consultant", icon: "💼" },
  { id: "student", label: "Student", icon: "🎓" },
  { id: "investor", label: "Investor", icon: "📈" },
  { id: "other", label: "Other", icon: "👤" },
];

type Step = "welcome" | "role" | "pillars" | "explore";

const STEPS: Step[] = ["welcome", "role", "pillars", "explore"];

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedPillars, setSelectedPillars] = useState<string[]>([]);

  useEffect(() => {
    // Disabled — set as completed so it never shows
    localStorage.setItem(STORAGE_KEY, "dismissed");
  }, []);

  const complete = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completedAt: new Date().toISOString(),
      role: selectedRole,
      pillars: selectedPillars,
    }));
    setIsOpen(false);
  };

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setIsOpen(false);
  };

  const togglePillar = (id: string) => {
    setSelectedPillars((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const stepIndex = STEPS.indexOf(step);
  const canNext =
    step === "welcome" ||
    (step === "role" && selectedRole !== null) ||
    (step === "pillars" && selectedPillars.length > 0) ||
    step === "explore";

  const next = () => {
    const nextIdx = stepIndex + 1;
    if (nextIdx < STEPS.length) setStep(STEPS[nextIdx]);
    else complete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-(--z-modal) flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden animate-in slide-in-from-bottom-4 duration-300">

        {/* Progress bar */}
        <div className="h-1 bg-slate-100 dark:bg-slate-700">
          <div
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
          aria-label="Skip onboarding"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="p-8">

          {/* STEP: Welcome */}
          {step === "welcome" && (
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <SparklesIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-3">Welcome to HTR</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Health Transformation Review is your intelligence platform for understanding and navigating U.S. healthcare reform across six dimensions.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                {[
                  { icon: NewspaperIcon, label: "The Wire", desc: "Real-time intelligence feed" },
                  { icon: SparklesIcon, label: "AI Analyst", desc: "Ask any healthcare question" },
                  { icon: ChartBarIcon, label: "Research Lab", desc: "24 analytical tools" },
                  { icon: AcademicCapIcon, label: "Academy", desc: "Structured learning paths" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <Icon className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{label}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Role */}
          {step === "role" && (
            <div>
              <h2 className="ty-h3 font-black text-slate-900 dark:text-slate-100 mb-1">What best describes you?</h2>
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">We&apos;ll tailor your experience to your role.</p>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-left transition-all ${
                      selectedRole === role.id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800"
                    }`}
                  >
                    <span className="text-lg">{role.icon}</span>
                    <span className={`text-sm font-semibold ${selectedRole === role.id ? "text-indigo-700 dark:text-indigo-400" : "text-slate-700 dark:text-slate-200"}`}>
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Pillars */}
          {step === "pillars" && (
            <div>
              <h2 className="ty-h3 font-black text-slate-900 dark:text-slate-100 mb-1">Choose your focus areas</h2>
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">Select one or more pillars to personalize your feed.</p>
              <div className="space-y-2">
                {PILLARS.map((pillar) => {
                  const selected = selectedPillars.includes(pillar.id);
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => togglePillar(pillar.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        selected ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30" : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800"
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${pillar.dot} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-bold ${selected ? "text-indigo-700 dark:text-indigo-400" : "text-slate-800 dark:text-slate-100"}`}>
                          {pillar.label}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">{pillar.desc}</span>
                      </div>
                      {selected && (
                        <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP: Explore */}
          {step === "explore" && (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-3">You&apos;re all set!</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Your preferences have been saved. Here are the best places to start:
              </p>
              <div className="space-y-2 text-left mb-6">
                {[
                  { href: "/", label: "Home Feed", desc: "Latest intelligence across all pillars" },
                  { href: "/chat", label: "Ask the AI Analyst", desc: "Get answers to any healthcare question" },
                  { href: "/academy", label: "Personalized Learning", desc: "Your AI-curated learning path" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={complete}
                    className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-xl group transition-colors"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">{item.label}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{item.desc}</p>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Footer nav */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-1">
              {STEPS.map((s, i) => (
                <span
                  key={s}
                  className={`w-2 h-2 rounded-full transition-colors ${i <= stepIndex ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-700"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {stepIndex > 0 && step !== "explore" && (
                <button
                  onClick={() => setStep(STEPS[stepIndex - 1])}
                  className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 px-3 py-2 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={next}
                disabled={!canNext}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-default text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
              >
                {step === "explore" ? "Start Exploring" : "Continue"}
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
