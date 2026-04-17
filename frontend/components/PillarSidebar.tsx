"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── PILLAR CONFIGURATION ─────────────────────────────────────────────────────
const PILLAR_CONFIG: Record<string, {
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
  activeBg: string;
  activeText: string;
  hoverBg: string;
  items: { href: string; label: string }[];
  labItems: { href: string; label: string }[];
}> = {
  policy: {
    label: "Policy",
    color: "text-sky-700", bg: "bg-sky-50", border: "border-sky-200",
    dot: "bg-sky-500", activeBg: "bg-sky-100", activeText: "text-sky-800", hoverBg: "hover:bg-sky-50",
    items: [
      { href: "/policy/regulation",  label: "Regulation & Legislation" },
      { href: "/policy/mandates",    label: "Public Health Mandates" },
      { href: "/policy/global",      label: "Global & Comparative Policy" },
      { href: "/policy/feasibility", label: "Policy Feasibility Studies" },
    ],
    labItems: [
      { href: "/research-lab/policy-quality?tab=policy",           label: "Policy Simulator" },
      { href: "/research-lab/knowledge-workspace?tab=leaderboard", label: "Innovation Leaderboard" },
    ],
  },
  economics: {
    label: "Economics",
    color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200",
    dot: "bg-emerald-500", activeBg: "bg-emerald-100", activeText: "text-emerald-800", hoverBg: "hover:bg-emerald-50",
    items: [
      { href: "/economics/value",      label: "Value-Based Care Models" },
      { href: "/economics/market",     label: "Market & Finance" },
      { href: "/economics/cea",        label: "Labor & Workforce Strategy" },
      { href: "/economics/investment", label: "Healthcare Investment Trends" },
    ],
    labItems: [
      { href: "/research-lab/payment-models?tab=apm-design",  label: "APM Design Lab" },
      { href: "/research-lab/payment-models?tab=apm-calc",    label: "Shared Savings Calculator" },
      { href: "/research-lab/payment-models?tab=cea",         label: "CEA Calculator" },
      { href: "/research-lab/policy-quality?tab=scorecard",   label: "Hospital Financial Stress Test" },
      { href: "/research-lab/policy-quality?tab=hta",         label: "HTA Studio" },
      { href: "/research-lab/policy-quality?tab=actuarial",   label: "Actuarial Lab" },
    ],
  },
  technology: {
    label: "Technology",
    color: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200",
    dot: "bg-indigo-500", activeBg: "bg-indigo-100", activeText: "text-indigo-800", hoverBg: "hover:bg-indigo-50",
    items: [
      { href: "/technology/ai",       label: "AI & Machine Learning" },
      { href: "/technology/digital",  label: "Digital Health & Telemedicine" },
      { href: "/technology/security", label: "Data Security & Governance" },
      { href: "/technology/workflow", label: "Tech-Enabled Workflow" },
    ],
    labItems: [
      { href: "/research-lab/interoperability?tab=fhir", label: "FHIR Interoperability Lab" },
      { href: "/research-lab/technology-ai?tab=ai",      label: "AI Clinical Governance Lab" },
      { href: "/research-lab/technology-ai?tab=digital", label: "Digital Health Lab" },
    ],
  },
  clinical: {
    label: "Clinical",
    color: "text-red-700", bg: "bg-red-50", border: "border-red-200",
    dot: "bg-red-500", activeBg: "bg-red-100", activeText: "text-red-800", hoverBg: "hover:bg-red-50",
    items: [
      { href: "/clinical/hah",       label: "Hospital-at-Home" },
      { href: "/clinical/precision", label: "Precision Medicine" },
      { href: "/clinical/virtual",   label: "Virtual Care Models" },
    ],
    labItems: [
      { href: "/research-lab/interoperability?tab=risk",         label: "Risk Stratification Engine" },
      { href: "/research-lab/policy-quality?tab=quality",        label: "Clinical Quality Optimizer" },
      { href: "/research-lab/knowledge-workspace?tab=workforce", label: "Workforce Modeler" },
    ],
  },
  equity: {
    label: "Equity",
    color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200",
    dot: "bg-violet-500", activeBg: "bg-violet-100", activeText: "text-violet-800", hoverBg: "hover:bg-violet-50",
    items: [
      { href: "/equity/sdoh",   label: "SDOH Integration" },
      { href: "/equity/bias",   label: "Algorithmic Bias" },
      { href: "/equity/access", label: "Access Disparity" },
    ],
    labItems: [
      { href: "/research-lab/population-equity?tab=population", label: "Population Health Modeler" },
      { href: "/research-lab/population-equity?tab=equity",     label: "Health Equity Studio" },
    ],
  },
  operations: {
    label: "Operations",
    color: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200",
    dot: "bg-teal-500", activeBg: "bg-teal-100", activeText: "text-teal-800", hoverBg: "hover:bg-teal-50",
    items: [
      { href: "/operations/revenue-cycle", label: "Revenue Cycle Management" },
      { href: "/operations/workforce",     label: "Workforce & Human Capital" },
      { href: "/operations/compliance",    label: "Quality, Compliance & Risk" },
      { href: "/operations/supply-chain",  label: "Supply Chain & Infrastructure" },
      { href: "/operations/payer-network", label: "Payer & Network Operations" },
    ],
    labItems: [
      { href: "/research-lab/knowledge-workspace?tab=scorecard", label: "Transformation Scorecard" },
      { href: "/research-lab/knowledge-workspace?tab=readiness", label: "VBC Readiness Assessment" },
      { href: "/research-lab/knowledge-workspace?tab=evidence",  label: "Evidence Library" },
      { href: "/research-lab/knowledge-workspace?tab=workspace", label: "Research Workspace" },
    ],
  },
};

// ─── HELPERS (exported so AppShell and Header can reuse) ─────────────────────
const PILLAR_IDS = Object.keys(PILLAR_CONFIG);

export function getPillarFromPath(path: string): string | null {
  for (const p of PILLAR_IDS) {
    if (path === `/${p}` || path.startsWith(`/${p}/`)) return p;
  }
  return null;
}

export function isPillarPath(path: string): boolean {
  return getPillarFromPath(path) !== null;
}

export function getPillarLabel(path: string): string {
  const id = getPillarFromPath(path);
  return id ? PILLAR_CONFIG[id].label : "Pillar";
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function PillarSidebar() {
  const pathname = usePathname();
  const pillarId = getPillarFromPath(pathname);
  if (!pillarId) return null;

  const config = PILLAR_CONFIG[pillarId];
  const isActive = (href: string) => pathname === href;
  const isLabActive = (href: string) => pathname === href.split("?")[0];
  const otherPillars = PILLAR_IDS.filter((id) => id !== pillarId);

  return (
    <div className="pt-2">

      {/* ── Pillar header ─────────────────────────────────────────────────── */}
      <div className={`px-3 py-3 mb-4 rounded-xl ${config.bg} border ${config.border}`}>
        <p className={`text-[10px] font-black uppercase tracking-widest ${config.color} mb-1.5`}>
          Domain Pillar
        </p>
        <Link
          href={`/${pillarId}`}
          className={`flex items-center gap-2 text-base font-black ${config.color} hover:underline`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${config.dot} shrink-0`} />
          {config.label}
        </Link>
      </div>

      {/* ── Intelligence sub-pages ────────────────────────────────────────── */}
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 px-3">
        Intelligence
      </p>
      <div className="space-y-0.5 mb-5">
        {config.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive(item.href)
                ? `${config.activeBg} ${config.activeText} font-bold`
                : `text-slate-600 ${config.hoverBg} hover:text-slate-900`
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* ── Research Lab tools ────────────────────────────────────────────── */}
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 px-3">
        Research Lab
      </p>
      <div className="space-y-0.5 mb-6">
        {config.labItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              isLabActive(item.href)
                ? `${config.activeBg} ${config.activeText} font-bold`
                : `text-slate-600 ${config.hoverBg} hover:text-slate-900`
            }`}
          >
            <span className="text-[10px]">⚗</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* ── Other pillars ─────────────────────────────────────────────────── */}
      <div className="border-t border-slate-200 pt-4">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 px-3">
          Other Domains
        </p>
        <div className="space-y-0.5">
          {otherPillars.map((id) => {
            const cfg = PILLAR_CONFIG[id];
            return (
              <Link
                key={id}
                href={`/${id}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span className={`w-2 h-2 rounded-full ${cfg.dot} shrink-0`} />
                {cfg.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Framework Map ─────────────────────────────────────────────────── */}
      <div className="border-t border-slate-200 pt-4 mt-2">
        <Link
          href="/about/framework"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 transition-colors font-semibold"
        >
          <span className="text-base leading-none">🕸️</span>
          Six-Pillar Dependency Map
        </Link>
      </div>

    </div>
  );
}
