"use client";

import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/outline";

interface UpgradePromptProps {
  /** Context shown above the CTA — what is the user missing? */
  title?: string;
  description?: string;
  /** If true, renders inline (no fade gradient). Default: false (full paywall). */
  inline?: boolean;
  /** Where the user came from — passed to /pricing for back-navigation. */
  from?: string;
}

/**
 * UpgradePrompt — shown when a free/anonymous user tries to access gated content.
 *
 * Variants:
 *   - Paywall (default): full-width gradient fade-out overlay, anchored to bottom of article preview.
 *   - Inline: compact banner, used in dashboards and feature callouts.
 */
export default function UpgradePrompt({
  title = "Continue reading with a Subscriber plan",
  description = "Get unlimited access to all policy analyses, the AI Analyst, state dashboards, and the full report library.",
  inline = false,
  from,
}: UpgradePromptProps) {
  const pricingUrl = `/pricing${from ? `?from=${encodeURIComponent(from)}` : ""}`;

  if (inline) {
    return (
      <div className="flex items-start gap-4 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
          <LockClosedIcon className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-indigo-900">{title}</p>
          <p className="text-xs text-indigo-700 mt-0.5">{description}</p>
        </div>
        <Link
          href={pricingUrl}
          className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
        >
          Upgrade
        </Link>
      </div>
    );
  }

  // Full paywall with gradient fade
  return (
    <div className="relative">
      {/* Fade gradient */}
      <div
        className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-transparent to-white pointer-events-none"
        aria-hidden="true"
      />
      {/* CTA card */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xl max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
          <LockClosedIcon className="w-6 h-6 text-indigo-600" />
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2">{title}</h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">{description}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={pricingUrl}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            View plans — from $19/mo
          </Link>
          <Link
            href="/signup"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Start free — 7 days
          </Link>
        </div>

        <p className="text-xs text-slate-400 mt-4">
          Cancel anytime. No credit card required for free trial.
        </p>
      </div>
    </div>
  );
}
