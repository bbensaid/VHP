/**
 * Shared UI atoms used by all PolicySimulator tabs.
 *
 * SectionTitle, StatCard, SliderRow, SelectRow, ToggleRow, ResultBar.
 * Pure presentational. No state, no data dependencies. Imported by every tab.
 */

import { Info } from "lucide-react";
import { fmtM } from "./PolicySimulator.data";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
      {children}
    </h3>
  );
}

export function StatCard({
  label,
  value,
  sub,
  color = "sky",
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
  icon?: React.ReactNode;
}) {
  const colors: Record<string, string> = {
    sky: "bg-sky-50 border-sky-200 text-sky-700",
    green: "bg-emerald-50 border-emerald-200 text-emerald-700",
    red: "bg-red-50 border-red-200 text-red-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    slate: "bg-slate-50 border-slate-200 text-slate-700",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
  };
  return (
    <div className={`rounded-lg border p-4 ${colors[color] ?? colors.sky}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium opacity-70 mb-1">{label}</p>
          <p className="text-xl font-bold">{value}</p>
          {sub && <p className="text-xs opacity-60 mt-0.5">{sub}</p>}
        </div>
        {icon && <div className="opacity-50">{icon}</div>}
      </div>
    </div>
  );
}

export function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  tooltip,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  tooltip?: string;
}) {
  const display = format ? format(value) : String(value);
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm text-slate-600 flex items-center gap-1">
          {label}
          {tooltip && (
            <span title={tooltip} className="cursor-help text-slate-400">
              <Info size={13} />
            </span>
          )}
        </label>
        <span className="text-sm font-semibold text-sky-700 min-w-[60px] text-right">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
      />
      <div className="flex justify-between text-xs text-slate-400 mt-0.5">
        <span>{format ? format(min) : String(min)}</span>
        <span>{format ? format(max) : String(max)}</span>
      </div>
    </div>
  );
}

export function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block ty-body text-slate-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-slate-600">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${value ? "bg-sky-600" : "bg-slate-300"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

export function ResultBar({
  label,
  value,
  max,
  color = "sky",
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const colors: Record<string, string> = {
    sky: "bg-sky-500",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
    indigo: "bg-indigo-500",
  };
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-slate-600 mb-0.5">
        <span>{label}</span>
        <span className="font-semibold">{fmtM(value)}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colors[color] ?? colors.sky} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
