// frontend/components/HomeSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  UsersIcon,
  ChevronRightIcon,
  FilmIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  GlobeAmericasIcon,
  CpuChipIcon,
  BookOpenIcon,
  BeakerIcon,
  PresentationChartLineIcon,
  DocumentTextIcon,
  SparklesIcon,
  TableCellsIcon,
  BookmarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface HomeSidebarProps {
  onNavigate?: () => void;
}

// ─── INTELLIGENCE PILLARS ─────────────────────────────────────────────────────
const pillars = [
  {
    id: "policy", label: "Policy", href: "/policy",
    dot: "bg-sky-500", accent: "text-sky-700",
    items: [
      { href: "/policy/regulation", label: "Regulation & Legislation" },
      { href: "/policy/mandates", label: "Public Health Mandates" },
      { href: "/policy/global", label: "Global & Comparative Policy" },
      { href: "/policy/feasibility", label: "Policy Feasibility Studies" },
    ],
  },
  {
    id: "economics", label: "Economics", href: "/economics",
    dot: "bg-emerald-500", accent: "text-emerald-700",
    items: [
      { href: "/economics/value", label: "Value-Based Care Models" },
      { href: "/economics/market", label: "Market & Finance" },
      { href: "/economics/cea", label: "Labor & Workforce Strategy" },
      { href: "/economics/investment", label: "Healthcare Investment Trends" },
    ],
  },
  {
    id: "technology", label: "Technology", href: "/technology",
    dot: "bg-indigo-500", accent: "text-indigo-700",
    items: [
      { href: "/technology/ai", label: "AI & Machine Learning" },
      { href: "/technology/digital", label: "Digital Health & Telemedicine" },
      { href: "/technology/security", label: "Data Security & Governance" },
      { href: "/technology/workflow", label: "Tech-Enabled Workflow" },
    ],
  },
  {
    id: "clinical", label: "Clinical", href: "/clinical",
    dot: "bg-red-500", accent: "text-red-700",
    items: [
      { href: "/clinical/hah", label: "Hospital-at-Home" },
      { href: "/clinical/precision", label: "Precision Medicine" },
      { href: "/clinical/virtual", label: "Virtual Care Models" },
    ],
  },
  {
    id: "equity", label: "Equity", href: "/equity",
    dot: "bg-amber-500", accent: "text-amber-700",
    items: [
      { href: "/equity/sdoh", label: "SDOH Integration" },
      { href: "/equity/bias", label: "Algorithmic Bias" },
      { href: "/equity/access", label: "Access Disparity" },
    ],
  },
];

// ─── SECTION DATA ─────────────────────────────────────────────────────────────
type SectionItem = {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  desc?: string;
};

type Section = {
  id: string;
  label: string;
  headerColor: string;
  headerBg: string;
  borderAccent: string;
  hoverBg: string;
  divideColor: string;
  activeItemBg: string;
  isPillars?: boolean;
  items?: SectionItem[];
};

const SECTIONS: Section[] = [
  {
    id: "intelligence", label: "Intelligence",
    headerColor: "text-slate-600", headerBg: "bg-slate-100",
    borderAccent: "border-l-slate-500", hoverBg: "hover:bg-slate-50",
    divideColor: "divide-slate-100", activeItemBg: "bg-slate-50",
    isPillars: true,
  },
  {
    id: "learn", label: "Learn",
    headerColor: "text-sky-700", headerBg: "bg-sky-50",
    borderAccent: "border-l-sky-500", hoverBg: "hover:bg-sky-50",
    divideColor: "divide-sky-100", activeItemBg: "bg-sky-50",
    items: [
      { href: "/academy", label: "Academy Hub", icon: AcademicCapIcon },
      { href: "/academy", label: "Personalized Learning", icon: SparklesIcon, desc: "AI-powered paths" },
      { href: "/academy/tracks", label: "Learning Tracks", icon: TableCellsIcon },
      { href: "/academy/courses", label: "Courses", icon: BookOpenIcon },
      { href: "/academy/webinars", label: "Webinars", icon: PresentationChartLineIcon },
      { href: "/academy/case-studies", label: "Case Studies", icon: DocumentTextIcon },
      { href: "/academy/glossary", label: "Glossary", icon: BookOpenIcon },
    ],
  },
  {
    id: "analyze", label: "Analyze & Tools",
    headerColor: "text-amber-700", headerBg: "bg-amber-50",
    borderAccent: "border-l-amber-500", hoverBg: "hover:bg-amber-50",
    divideColor: "divide-amber-100", activeItemBg: "bg-amber-50",
    items: [
      { href: "/research-lab", label: "Research Lab", icon: BeakerIcon, desc: "19 interactive tools" },
      { href: "/htr-simulator", label: "HTR Simulator", icon: CpuChipIcon, desc: "5-pillar scenario modeler" },
      { href: "/hti-dashboard", label: "HTI Dashboard", icon: DocumentTextIcon },
      { href: "/multimedia", label: "Multimedia", icon: FilmIcon },
      { href: "/trending-topics", label: "Trending Topics", icon: ArrowTrendingUpIcon },
    ],
  },
  {
    id: "states", label: "States & Programs",
    headerColor: "text-rose-700", headerBg: "bg-rose-50",
    borderAccent: "border-l-rose-500", hoverBg: "hover:bg-rose-50",
    divideColor: "divide-rose-100", activeItemBg: "bg-rose-50",
    items: [
      { href: "/vermont-act-167", label: "Vermont Act 167", icon: MapPinIcon },
      { href: "/california-calaim", label: "California CalAIM", icon: MapPinIcon },
      { href: "/states", label: "All States Explorer", icon: GlobeAmericasIcon },
      { href: "/dashboard", label: "50-State Dashboard", icon: TableCellsIcon, desc: "Rural Health Transformation" },
      { href: "/ahead-model", label: "AHEAD Model", icon: DocumentTextIcon, desc: "All-payer cost of care" },
    ],
  },
  {
    id: "advisory", label: "Advisory & Services",
    headerColor: "text-indigo-700", headerBg: "bg-indigo-50",
    borderAccent: "border-l-indigo-500", hoverBg: "hover:bg-indigo-50",
    divideColor: "divide-indigo-100", activeItemBg: "bg-indigo-50",
    items: [
      { href: "/advisory", label: "Advisory Hub", icon: BriefcaseIcon },
      { href: "/advisory/consulting", label: "Strategic Consulting", icon: BriefcaseIcon },
      { href: "/advisory/research", label: "Custom Research", icon: BeakerIcon },
      { href: "/advisory/financial-audit", label: "Financial Audit", icon: DocumentTextIcon },
      { href: "/advisory/regulatory", label: "Regulatory Counsel", icon: BookOpenIcon },
      { href: "/advisory/it-consulting", label: "IT Consulting", icon: CpuChipIcon },
      { href: "/advisory/training", label: "Training & Education", icon: AcademicCapIcon },
      { href: "/advisory/independent-review", label: "Independent Review", icon: DocumentTextIcon },
      { href: "/connect-hub", label: "Connect Hub", icon: UsersIcon },
      { href: "/community", label: "Community", icon: UsersIcon },
    ],
  },
];

// ─── ROUTE → SECTION/PILLAR HELPERS ──────────────────────────────────────────
function getSectionForPath(path: string): string | null {
  const intelligencePrefixes = ["/policy", "/economics", "/technology", "/clinical", "/equity"];
  if (intelligencePrefixes.some((p) => path === p || path.startsWith(p + "/"))) return "intelligence";
  if (path === "/academy" || path.startsWith("/academy/")) return "learn";
  const analyzePrefixes = ["/research-lab", "/htr-simulator", "/hti-dashboard", "/multimedia", "/trending-topics"];
  if (analyzePrefixes.some((p) => path === p || path.startsWith(p + "/"))) return "analyze";
  const statesPrefixes = ["/vermont-act-167", "/california-calaim", "/states", "/dashboard", "/ahead-model"];
  if (statesPrefixes.some((p) => path === p || path.startsWith(p + "/"))) return "states";
  const advisoryPrefixes = ["/advisory", "/connect-hub", "/community"];
  if (advisoryPrefixes.some((p) => path === p || path.startsWith(p + "/"))) return "advisory";
  return null;
}

function getPillarForPath(path: string): string | null {
  if (path === "/policy" || path.startsWith("/policy/")) return "policy";
  if (path === "/economics" || path.startsWith("/economics/")) return "economics";
  if (path === "/technology" || path.startsWith("/technology/")) return "technology";
  if (path === "/clinical" || path.startsWith("/clinical/")) return "clinical";
  if (path === "/equity" || path.startsWith("/equity/")) return "equity";
  return null;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function HomeSidebar({ onNavigate }: HomeSidebarProps) {
  const pathname = usePathname();

  // Arrays of open IDs — multiple sections and pillars can be open at once.
  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    const s = getSectionForPath(pathname);
    return s ? [s] : [];
  });
  const [expandedPillars, setExpandedPillars] = useState<string[]>(() => {
    const p = getPillarForPath(pathname);
    return p ? [p] : [];
  });

  // Exact match only — never color a parent route just because a child is active
  const isActive = (href: string) => pathname === href;

  // On route change: ADD the new section/pillar if not already present.
  // Never remove — the user controls collapse manually by clicking again.
  useEffect(() => {
    const section = getSectionForPath(pathname);
    const pillar = getPillarForPath(pathname);
    if (section) setExpandedSections((prev) => prev.includes(section) ? prev : [...prev, section]);
    if (pillar)  setExpandedPillars((prev)  => prev.includes(pillar)  ? prev : [...prev, pillar]);
  }, [pathname]);

  // ── Click handlers — toggle one ID without touching the others ────────────
  const handleSectionClick = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  const handlePillarClick = (pillarId: string) => {
    setExpandedPillars((prev) =>
      prev.includes(pillarId) ? prev.filter((id) => id !== pillarId) : [...prev, pillarId]
    );
  };

  return (
    <div className="pt-2">

      {/* ── L1: Section list ─────────────────────────────────────────── */}
      <div className="space-y-1.5">
        {SECTIONS.map((section) => {
          const isOpen = expandedSections.includes(section.id);
          const sectionData = section;

          return (
            <div key={section.id}>
              {/* L1 button */}
              <button
                onClick={() => handleSectionClick(section.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-200 border-l-4 ${sectionData.borderAccent} transition-colors text-left ${isOpen ? sectionData.headerBg : `bg-white ${sectionData.hoverBg}`}`}
              >
                <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${sectionData.headerColor}`}>
                  {section.label}
                </span>
                <ChevronDownIcon
                  className={`w-3 h-3 transition-transform duration-200 ${
                    isOpen ? `${sectionData.headerColor} rotate-0` : "text-slate-400 -rotate-90"
                  }`}
                />
              </button>

              {/* L2 accordion — expands inline, pushes siblings down */}
              {isOpen && (
                <div className="mt-1 rounded-xl border border-slate-200 shadow-sm overflow-hidden">

                  {/* ── INTELLIGENCE: pillar list ─────────────────────── */}
                  {sectionData.isPillars && (
                    <div className="divide-y divide-slate-100">
                      {pillars.map((pillar) => {
                        const pillarOpen = expandedPillars.includes(pillar.id);
                        return (
                          <div key={pillar.id}>
                            {/* Pillar row */}
                            <button
                              onClick={() => handlePillarClick(pillar.id)}
                              className="w-full flex items-center justify-between px-3 py-2.5 transition-colors text-left bg-white hover:bg-slate-50"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`w-2 h-2 rounded-full shrink-0 ${pillar.dot}`} />
                                <span className={`text-sm font-bold ${pillar.accent}`}>
                                  {pillar.label}
                                </span>
                              </div>
                              <ChevronDownIcon
                                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                                  pillarOpen ? `${pillar.accent} rotate-0` : "text-slate-300 -rotate-90"
                                }`}
                              />
                            </button>

                            {/* L3 accordion — pillar sub-items */}
                            {pillarOpen && (
                              <div className="border-t border-slate-100 bg-slate-50/60">
                                {/* Pillar overview link */}
                                <Link
                                  href={pillar.href}
                                  onClick={onNavigate}
                                  className={`flex items-center gap-2.5 px-4 py-2 border-b border-slate-100 group ${
                                    isActive(pillar.href) ? "bg-slate-100" : "hover:bg-slate-100"
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${pillar.dot}`} />
                                  <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${pillar.accent} group-hover:underline`}>
                                    {pillar.label} Overview
                                  </span>
                                </Link>
                                {/* Sub-items */}
                                <div className="divide-y divide-slate-100">
                                  {pillar.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={onNavigate}
                                      className={`flex items-center gap-2.5 px-5 py-2.5 transition-colors group ${
                                        isActive(item.href) ? "bg-slate-100" : "hover:bg-slate-100"
                                      }`}
                                    >
                                      <ChevronRightIcon className="w-3 h-3 text-slate-300 shrink-0" />
                                      <span className={`text-sm font-bold leading-tight group-hover:text-slate-900 ${
                                        isActive(item.href) ? "text-slate-900" : "text-slate-700"
                                      }`}>
                                        {item.label}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* ── ALL OTHER SECTIONS: flat item list ───────────── */}
                  {!sectionData.isPillars && sectionData.items && (
                    <div className={`divide-y ${sectionData.divideColor}`}>
                      {sectionData.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={`${item.href}-${item.label}`}
                            href={item.href}
                            onClick={onNavigate}
                            className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                              isActive(item.href)
                                ? sectionData.activeItemBg
                                : `bg-white ${sectionData.hoverBg}`
                            }`}
                          >
                            {Icon && (
                              <Icon className={`w-4 h-4 shrink-0 ${sectionData.headerColor}`} />
                            )}
                            <div className="min-w-0">
                              <span className={`text-sm font-bold block leading-tight group-hover:text-slate-900 ${
                                isActive(item.href) ? "text-slate-900" : "text-slate-700"
                              }`}>
                                {item.label}
                              </span>
                              {item.desc && (
                                <span className="text-[10px] text-slate-400">{item.desc}</span>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* My Library — direct link, no sub-items */}
        <Link
          href="/saved"
          onClick={onNavigate}
          className={`flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-200 border-l-4 border-l-slate-400 transition-colors ${
            isActive("/saved") ? "bg-slate-100" : "bg-white hover:bg-slate-50"
          }`}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
            My Library
          </span>
          <BookmarkIcon className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>
    </div>
  );
}
