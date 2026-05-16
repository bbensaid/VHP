"use client";

import Link from "next/link";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

interface LabHelpBadgeProps {
  toolName: string;
  guideSection?: string; // anchor on the getting-started page, e.g. "#research-lab"
  tip?: string; // one-line inline tooltip
  className?: string;
}

/**
 * A small help badge that appears next to any Research Lab tool header.
 * Clicking it opens the Getting Started guide anchored to the research-lab section.
 * Pass `tip` for an inline hover tooltip.
 */
export default function LabHelpBadge({
  toolName,
  guideSection = "#role-guides",
  tip,
  className = "",
}: LabHelpBadgeProps) {
  const href = `/academy/getting-started${guideSection}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      title={tip ?? `Learn how to use ${toolName}`}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors ${className}`}
    >
      <QuestionMarkCircleIcon className="w-3 h-3" />
      How to use this tool
    </Link>
  );
}
