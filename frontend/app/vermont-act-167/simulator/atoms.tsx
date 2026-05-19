"use client";

/**
 * UI primitives for the Act 167 simulator tabs.
 * Badge, SectionTitle, InfoCard, PillarGauge, HBar, MetricCard, UrgencyBadge,
 * TabBtn, TimelineRow.
 */

import type { Hospital } from "./data";

export function Badge({ children, color = "bg-slate-100 text-slate-700" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${color}`}>
      {children}
    </span>
  );
}

export function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-black text-slate-900">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-slate-500 ml-7">{subtitle}</p>}
    </div>
  );
}

export function InfoCard({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "warn" | "info" | "success" }) {
  const styles = {
    default: "bg-white border border-slate-200",
    warn: "bg-amber-50 border border-amber-200",
    info: "bg-blue-50 border border-blue-200",
    success: "bg-emerald-50 border border-emerald-200",
  };
  return <div className={`rounded-xl p-5 ${styles[variant]}`}>{children}</div>;
}

// ── Pillar Score Gauge ─────────────────────────────────────────────────────
export function PillarGauge({ score, direction, label, color }: { score: number; direction: "positive" | "mixed" | "negative"; label: string; color: string }) {
  const dirColor = direction === "positive" ? "#10b981" : direction === "mixed" ? "#f59e0b" : "#ef4444";
  const circumference = 2 * Math.PI * 28;
  const progress = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="28" fill="none" stroke="#e2e8f0" strokeWidth="6" />
        <circle
          cx="36" cy="36" r="28" fill="none"
          stroke={dirColor} strokeWidth="6"
          strokeDasharray={`${progress} ${circumference - progress}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
        <text x="36" y="40" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">{score}</text>
      </svg>
      <span className="text-[11px] font-bold text-slate-600 text-center leading-tight max-w-[80px]">{label}</span>
    </div>
  );
}

// ── Horizontal Bar ─────────────────────────────────────────────────────────
export function HBar({ value, max, color, label, sublabel }: { value: number; max: number; color: string; label: string; sublabel?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-xs font-bold text-slate-700">{label}</span>
        {sublabel && <span className="text-[11px] text-slate-400">{sublabel}</span>}
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ── Metric Card ──────────────────────────────────────────────────────────
export function MetricCard({ value, label, sublabel, color }: { value: string; label: string; sublabel?: string; color?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
      <div className={`text-2xl font-black mb-0.5 ${color ?? "text-slate-900"}`}>{value}</div>
      <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">{label}</div>
      {sublabel && <div className="text-[10px] text-slate-400 mt-0.5">{sublabel}</div>}
    </div>
  );
}

// ── Urgency Badge ─────────────────────────────────────────────────────────
export function UrgencyBadge({ urgency }: { urgency: Hospital["urgency"] }) {
  const styles = {
    urgent: "bg-red-100 text-red-700",
    major: "bg-orange-100 text-orange-700",
    significant: "bg-yellow-100 text-yellow-700",
    modest: "bg-emerald-100 text-emerald-700",
  };
  return <Badge color={styles[urgency]}>{urgency === "urgent" ? "⚠ Urgent Restructuring" : urgency === "major" ? "Major Changes" : urgency === "significant" ? "Significant Changes" : "Modest Changes"}</Badge>;
}

// ── Tab Button ────────────────────────────────────────────────────────────
export function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
        active ? "bg-violet-700 text-white shadow" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

// ── Timeline Row ──────────────────────────────────────────────────────────
export function TimelineRow({ label, start, end, color }: { label: string; start: number; end: number; color: string }) {
  const left = (start / 5) * 100;
  const width = ((end - start) / 5) * 100;
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="w-44 text-xs text-slate-600 text-right shrink-0 leading-tight">{label}</div>
      <div className="flex-1 relative h-5">
        <div className="absolute inset-y-0 left-0 right-0 bg-slate-100 rounded" />
        <div
          className={`absolute inset-y-1 rounded ${color}`}
          style={{ left: `${left}%`, width: `${Math.max(3, width)}%` }}
        />
      </div>
    </div>
  );
}
