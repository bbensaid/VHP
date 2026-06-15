"use client";

/**
 * Shared UI atoms for WorkforceModeler tabs: Pill, Slider, SectionCard, MetricBox.
 */

import { Info } from "lucide-react";
import { fmt, fmtDollars } from "./WorkforceModeler.data";

export function Pill({
  label,
  color,
}: {
  label: string;
  color: "green" | "red" | "amber" | "blue" | "orange";
}) {
  const cls = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    amber: "bg-amber-100 text-amber-800",
    blue: "bg-blue-100 text-blue-800",
    orange: "bg-orange-100 text-orange-800",
  }[color];
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  info,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
  info?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-xs text-slate-600 font-medium flex items-center gap-1">
          {label}
          {info && (
            <span title={info} className="cursor-help text-slate-400">
              <Info size={11} />
            </span>
          )}
        </label>
        <span className="text-xs font-bold text-orange-700">
          {unit === "$"
            ? fmtDollars(value)
            : `${fmt(value, step < 1 ? 1 : 0)}${unit ?? ""}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full accent-orange-500 cursor-pointer"
      />
    </div>
  );
}

export function SectionCard({
  title,
  children,
  accent = false,
}: {
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border ${accent ? "border-orange-200 bg-orange-50" : "border-gray-200 bg-white"} p-4`}
    >
      <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}

export function MetricBox({
  label,
  value,
  sub,
  color = "neutral",
  large = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: "green" | "red" | "amber" | "neutral" | "orange";
  large?: boolean;
}) {
  const valueColor = {
    green: "text-green-700",
    red: "text-red-700",
    amber: "text-amber-700",
    neutral: "text-slate-900",
    orange: "text-orange-700",
  }[color];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 flex flex-col gap-0.5">
      <p className="text-xs text-slate-500 leading-tight">{label}</p>
      <p className={`${large ? "text-xl" : "text-base"} font-bold ${valueColor}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
}
