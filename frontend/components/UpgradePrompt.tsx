"use client";

import Link from "next/link";
import { LockClosedIcon, SparklesIcon, ChartBarIcon, AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/24/outline";

type Tier = "subscriber" | "student" | "professional" | "advisory";

interface UpgradePromptProps {
  required: Tier;
  feature?: string;
  compact?: boolean;
}

const TIER_CONFIG: Record<Tier, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  subline: string;
  perks: string[];
  cta: string;
  ctaHref: string;
  ctaStyle: string;
  secondaryCta?: string;
  secondaryHref?: string;
}> = {
  subscriber: {
    label: "Subscriber",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    badgeColor: "bg-indigo-100 text-indigo-700",
    icon: SparklesIcon,
    headline: "This feature requires a subscription",
    subline: "Unlock the full intelligence platform — AI chat, live content feeds, and analytical tools.",
    perks: [
      "Full AI Analyst powered by Llama 3.3 70b",
      "The Wire — real-time healthcare intelligence",
      "Research Lab — 24 interactive tools",
      "Unlimited policy analysis access",
    ],
    cta: "Subscribe Now",
    ctaHref: "/subscribe",
    ctaStyle: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondaryCta: "View Plans",
    secondaryHref: "/subscribe#plans",
  },
  student: {
    label: "Student",
    color: "text-sky-700",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    badgeColor: "bg-sky-100 text-sky-700",
    icon: AcademicCapIcon,
    headline: "Academy access required",
    subline: "Enroll in the HTR Academy to access courses, certifications, and personalized learning paths.",
    perks: [
      "Personalized AI learning paths",
      "Structured multi-course tracks",
      "Certifications & credentials",
      "Case study library",
    ],
    cta: "Get Academy Access",
    ctaHref: "/subscribe?plan=student",
    ctaStyle: "bg-sky-600 hover:bg-sky-700 text-white",
    secondaryCta: "Browse Free Content",
    secondaryHref: "/academy",
  },
  professional: {
    label: "Professional",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-700",
    icon: ChartBarIcon,
    headline: "Professional tier required",
    subline: "Access the full analytical suite with agentic AI tools for deep healthcare intelligence.",
    perks: [
      "Agentic AI with tool-use capabilities",
      "Advanced simulation & scenario modeling",
      "Full Research Lab suite",
      "Priority access to new tools",
    ],
    cta: "Upgrade to Professional",
    ctaHref: "/subscribe?plan=professional",
    ctaStyle: "bg-emerald-600 hover:bg-emerald-700 text-white",
    secondaryCta: "Compare Plans",
    secondaryHref: "/subscribe#plans",
  },
  advisory: {
    label: "Advisory",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    badgeColor: "bg-amber-100 text-amber-700",
    icon: BriefcaseIcon,
    headline: "Advisory tier required",
    subline: "This feature is available exclusively to HTR Advisory clients with dedicated expert support.",
    perks: [
      "Claude Sonnet 4.6 — most powerful AI model",
      "Dedicated advisory team access",
      "Custom research & analysis",
      "Executive briefings & reports",
    ],
    cta: "Book a Discovery Call",
    ctaHref: "/advisory/contact",
    ctaStyle: "bg-amber-600 hover:bg-amber-700 text-white",
    secondaryCta: "Learn About Advisory",
    secondaryHref: "/advisory",
  },
};

export default function UpgradePrompt({ required, feature, compact = false }: UpgradePromptProps) {
  const config = TIER_CONFIG[required];
  const Icon = config.icon;

  if (compact) {
    return (
      <div className={`rounded-xl border ${config.borderColor} ${config.bgColor} px-4 py-4 flex items-start gap-3`}>
        <LockClosedIcon className={`w-5 h-5 mt-0.5 shrink-0 ${config.color}`} />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold ${config.color}`}>
            {feature ? `${feature} requires ${config.label}` : config.headline}
          </p>
          <p className="text-xs text-slate-500 mt-0.5 mb-2">{config.subline}</p>
          <Link
            href={config.ctaHref}
            className={`inline-block text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${config.ctaStyle}`}
          >
            {config.cta} →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border-2 ${config.borderColor} ${config.bgColor} p-8 max-w-lg mx-auto text-center`}>
      {/* Badge */}
      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${config.badgeColor} mb-4`}>
        <LockClosedIcon className="w-3 h-3" />
        {config.label} Feature
      </span>

      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl ${config.bgColor} border-2 ${config.borderColor} flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-8 h-8 ${config.color}`} />
      </div>

      <h3 className="ty-h3 font-black text-slate-900 mb-2">
        {feature ? `${feature} is a ${config.label} Feature` : config.headline}
      </h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{config.subline}</p>

      {/* Perks */}
      <ul className="text-left space-y-2 mb-6">
        {config.perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2.5 text-sm text-slate-700">
            <span className={`w-4 h-4 rounded-full ${config.badgeColor} flex items-center justify-center shrink-0`}>
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            {perk}
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="flex flex-col gap-2">
        <Link
          href={config.ctaHref}
          className={`block w-full text-center text-sm font-bold py-3 px-6 rounded-xl transition-colors ${config.ctaStyle}`}
        >
          {config.cta}
        </Link>
        {config.secondaryCta && (
          <Link
            href={config.secondaryHref!}
            className="block w-full text-center text-sm font-semibold text-slate-500 hover:text-slate-700 py-2 transition-colors"
          >
            {config.secondaryCta}
          </Link>
        )}
      </div>
    </div>
  );
}
