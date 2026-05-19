"use client";

import { useState } from "react";
import { ShareIcon, CheckIcon } from "@heroicons/react/24/outline";

/**
 * Copy-to-clipboard button for the current simulator URL. The URL already
 * encodes the scenario as ?recs=... and (optionally) ?tab=... — we just
 * surface a friendly "Share" affordance so users don't have to know to copy
 * from the address bar.
 *
 * Shows a transient "Copied!" confirmation after a successful copy.
 */
export default function ShareScenarioButton() {
  const [copied, setCopied] = useState(false);

  async function share() {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    try {
      // Prefer the native share sheet on mobile; fall back to clipboard.
      if (navigator.share) {
        await navigator.share({ url, title: "HTR Act 167 Simulator scenario" });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // User cancelled the share sheet, or clipboard write was denied. No-op.
    }
  }

  return (
    <button
      onClick={share}
      type="button"
      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-violet-700 bg-violet-50 border border-violet-200 hover:bg-violet-100 px-2.5 py-1 rounded-lg transition-all"
      title="Copy this scenario URL to clipboard"
    >
      {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <ShareIcon className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Share scenario"}
    </button>
  );
}
