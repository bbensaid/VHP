"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { XMarkIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const TOUR_KEY = "htr_platform_tour_v1";

interface TourStep {
  title: string;
  body: string;
  target?: string; // CSS selector for the element to highlight
  position: "center" | "top" | "bottom-right";
  path?: string; // navigate to this path before showing the step
  cta?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Welcome to HTR — let's take a quick tour",
    body: "This 2-minute tour shows you the five most important things on the platform. You can exit at any time.",
    position: "center",
  },
  {
    title: "The Six-Pillar Navigation",
    body: "Every piece of content, tool, and analysis on HTR maps to one of six pillars: Policy, Economics, Technology, Clinical, Equity, and Operations. Use the top navigation to browse by pillar.",
    target: "nav",
    position: "bottom-right",
  },
  {
    title: "The AI Analyst",
    body: "The AI Analyst is on the right side of every page. Ask it anything — research questions, where to find a tool, what a policy means. It knows the entire platform and responds in plain language.",
    position: "bottom-right",
    cta: "Try the AI Analyst",
  },
  {
    title: "Research Lab — 21 Modeling Tools",
    body: "The Research Lab has tools for APM design, actuarial modeling, policy simulation, health equity analysis, hospital financial stress testing, and more. Built for quantitative work.",
    position: "center",
    path: "/research-lab",
  },
  {
    title: "Save to My Library",
    body: "See a bookmark icon on any page or tool. Click it to save to My Library — your personal collection of research, tools, and analyses.",
    position: "center",
  },
  {
    title: "You're ready",
    body: "That's the tour. The best next step: go to the Welcome page, set your role, and let the AI Analyst guide you in. Your full role-specific guide is in the Academy's Getting Started section.",
    position: "center",
    cta: "Go to Getting Started",
  },
];

interface TooltipProps {
  step: TourStep;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
}

function TourTooltip({ step, index, total, onNext, onPrev, onExit }: TooltipProps) {
  const router = useRouter();
  const isLast = index === total - 1;
  const isFirst = index === 0;

  const handleCta = () => {
    if (isLast) {
      router.push("/academy/getting-started");
      onExit();
    } else if (step.cta === "Try the AI Analyst") {
      router.push("/chat");
      onNext();
    } else {
      onNext();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm animate-in slide-in-from-bottom-4 duration-300 border border-slate-100 dark:border-slate-700">

        {/* Progress bar */}
        <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-t-2xl overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>

        <div className="p-6">
          {/* Step counter + close */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {index + 1} / {total}
            </span>
            <button
              onClick={onExit}
              className="text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 transition-colors"
              aria-label="Exit tour"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-2 leading-snug">
            {step.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
            {step.body}
          </p>

          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={onPrev}
              disabled={isFirst}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-0 disabled:pointer-events-none transition-colors px-2 py-1"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              Back
            </button>

            <div className="flex items-center gap-2">
              {step.cta ? (
                <button
                  onClick={handleCta}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
                >
                  {step.cta}
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              ) : null}
              <button
                onClick={isLast ? onExit : onNext}
                className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors px-2 py-1"
              >
                {isLast ? "Done" : (step.cta ? "Skip" : "Next")}
                {!isLast && <ArrowRightIcon className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlatformTour() {
  const [isActive, setIsActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  // Auto-trigger for new users who completed the onboarding modal
  useEffect(() => {
    const tourDone = localStorage.getItem(TOUR_KEY);
    const onboardingDone = localStorage.getItem("htr_onboarding_v1");

    // Only show after the onboarding modal is done and tour hasn't been seen
    if (!tourDone && onboardingDone && onboardingDone !== "dismissed") {
      const t = setTimeout(() => setIsActive(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const exit = useCallback(() => {
    localStorage.setItem(TOUR_KEY, JSON.stringify({ completedAt: new Date().toISOString() }));
    setIsActive(false);
    setStepIndex(0);
  }, []);

  const next = useCallback(() => {
    const nextIdx = stepIndex + 1;
    if (nextIdx >= TOUR_STEPS.length) {
      exit();
      return;
    }
    const nextStep = TOUR_STEPS[nextIdx];
    if (nextStep.path && pathname !== nextStep.path) {
      router.push(nextStep.path);
    }
    setStepIndex(nextIdx);
  }, [stepIndex, exit, pathname, router]);

  const prev = useCallback(() => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }, [stepIndex]);

  if (!isActive) return null;

  const currentStep = TOUR_STEPS[stepIndex];

  return (
    <TourTooltip
      step={currentStep}
      index={stepIndex}
      total={TOUR_STEPS.length}
      onNext={next}
      onPrev={prev}
      onExit={exit}
    />
  );
}

// Export a hook so any component can trigger the tour manually
export function usePlatformTour() {
  const startTour = () => {
    localStorage.removeItem(TOUR_KEY);
    window.location.reload();
  };
  return { startTour };
}
