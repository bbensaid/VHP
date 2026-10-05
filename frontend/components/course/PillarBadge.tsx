import type { Pillar } from "@/types/course";

const PILLAR_CONFIG: Record<Pillar, { label: string; className: string }> = {
  general:    { label: "Introduction",      className: "bg-slate-50 text-slate-700 border border-slate-200" },
  policy:     { label: "Policy Pillar",     className: "bg-blue-50 text-blue-800 border border-blue-200" },
  technology: { label: "Technology Pillar", className: "bg-indigo-50 text-indigo-800 border border-indigo-200" },
  economics:  { label: "Economics Pillar",  className: "bg-emerald-50 text-emerald-800 border border-emerald-200" },
  clinical:   { label: "Clinical Pillar",   className: "bg-red-50 text-red-800 border border-red-200" },
  equity:     { label: "Equity Imperative", className: "bg-violet-50 text-violet-800 border border-violet-200" },
  operations: { label: "Operations Pillar", className: "bg-amber-50 text-amber-800 border border-amber-200" },
};

export function PillarBadge({
  pillar,
  size = "sm",
}: {
  pillar: Pillar;
  size?: "xs" | "sm" | "md";
}) {
  const config = PILLAR_CONFIG[pillar];
  const sizeClass =
    size === "xs" ? "text-[10px] px-2 py-0.5"
    : size === "md" ? "text-sm px-3 py-1"
    : "text-xs px-2.5 py-0.5";

  return (
    <span className={`inline-flex items-center rounded font-medium tracking-wide ${sizeClass} ${config.className}`}>
      {config.label}
    </span>
  );
}
