"use client";

/**
 * Shared UI atoms for APMDesignLab tabs.
 * SectionCard, Label, SliderField, SelectField, StatBox, ViabilityBadge.
 */


// ─── Shared UI Primitives ────────────────────────────────────────────────────

export function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-900 border border-gray-700 rounded-xl p-5 ${className}`}
    >
      <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function Label({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-1">
      <span className="text-slate-300 text-sm font-medium">{children}</span>
      {sub && <span className="ml-2 text-slate-500 text-xs">{sub}</span>}
    </div>
  );
}

export function SliderField({
  label,
  sub,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
}: {
  label: string;
  sub?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <Label sub={sub}>{label}</Label>
        <span className="text-emerald-300 font-mono text-sm font-bold">
          {display !== undefined ? display : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
      />
      <div className="flex justify-between text-slate-600 text-xs mt-0.5">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export function SelectField({
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
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-600 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
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

export function StatBox({
  label,
  value,
  sub,
  positive,
  neutral,
}: {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
  neutral?: boolean;
}) {
  const color =
    neutral
      ? "text-slate-200"
      : positive === true
      ? "text-emerald-400"
      : "text-red-400";
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className={`text-xl font-bold font-mono ${color}`}>{value}</div>
      {sub && <div className="text-slate-500 text-xs mt-1">{sub}</div>}
    </div>
  );
}

export function ViabilityBadge({
  status,
  reason,
}: {
  status: "green" | "amber" | "red";
  reason: string;
}) {
  const cfg = {
    green: {
      bg: "bg-emerald-900/40 border-emerald-600",
      dot: "bg-emerald-400",
      text: "text-emerald-300",
      label: "Viable",
    },
    amber: {
      bg: "bg-yellow-900/40 border-yellow-600",
      dot: "bg-yellow-400",
      text: "text-yellow-300",
      label: "Marginal",
    },
    red: {
      bg: "bg-red-900/40 border-red-700",
      dot: "bg-red-400",
      text: "text-red-300",
      label: "At Risk",
    },
  }[status];
  return (
    <div className={`border rounded-xl p-4 ${cfg.bg}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-3 h-3 rounded-full ${cfg.dot} animate-pulse`} />
        <span className={`font-bold text-sm ${cfg.text}`}>
          Model Viability: {cfg.label}
        </span>
      </div>
      <p className="text-slate-300 text-sm">{reason}</p>
    </div>
  );
}
