"use client";

/**
 * Shared client-side primitives for ResearchWorkspace tabs.
 * - useLocalStorage: persistence hook (used by every tab)
 * - StatusBadge, PriorityDot, CategoryBadge: small presentational badges
 */

import { useState, useCallback } from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import type { ScenarioStatus, NotePriority } from "./ResearchWorkspace.data";

export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });
  const set = useCallback(
    (v: T) => {
      setState(v);
      try {
        localStorage.setItem(key, JSON.stringify(v));
      } catch { /* ignore quota / disabled storage */ }
    },
    [key]
  );
  return [state, set];
}

export function StatusBadge({ status }: { status: ScenarioStatus }) {
  const config = {
    Draft: { color: "bg-amber-100 text-amber-700", icon: Clock },
    "In Review": { color: "bg-sky-100 text-sky-700", icon: AlertCircle },
    Final: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  } as const;
  const { color, icon: Icon } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${color}`}>
      <Icon size={11} />
      {status}
    </span>
  );
}

export function PriorityDot({ priority }: { priority: NotePriority }) {
  const colors = {
    Low: "bg-slate-300",
    Medium: "bg-amber-400",
    High: "bg-rose-500",
  } as const;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
      <span className={`w-2 h-2 rounded-full ${colors[priority]}`} />
      {priority}
    </span>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    "CEA Analysis": "bg-violet-50 text-violet-700 border-violet-200",
    "APM Modeling": "bg-sky-50 text-sky-700 border-sky-200",
    "Risk Stratification": "bg-rose-50 text-rose-700 border-rose-200",
    "Population Health": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Policy Analysis": "bg-indigo-50 text-indigo-700 border-indigo-200",
    "Financial Audit": "bg-amber-50 text-amber-700 border-amber-200",
    "Quality Optimization": "bg-teal-50 text-teal-700 border-teal-200",
    "Method Note": "bg-sky-50 text-sky-700 border-sky-200",
    "Data Finding": "bg-emerald-50 text-emerald-700 border-emerald-200",
    Assumption: "bg-amber-50 text-amber-700 border-amber-200",
    Limitation: "bg-rose-50 text-rose-700 border-rose-200",
    Citation: "bg-violet-50 text-violet-700 border-violet-200",
    Todo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    Question: "bg-slate-50 text-slate-700 border-slate-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${colorMap[category] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
      {category}
    </span>
  );
}
