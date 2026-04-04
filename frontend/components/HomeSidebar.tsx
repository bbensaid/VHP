// frontend/components/HomeSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  UsersIcon,
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
  BoltIcon,
  BanknotesIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

interface HomeSidebarProps {
  onNavigate?: () => void;
}

// ─── INTELLIGENCE PILLARS ─────────────────────────────────────────────────────
const pillars = [
  {
    id: "policy", label: "Policy", href: "/policy",
    dot: "bg-sky-500", accent: "text-sky-700", rail: "border-l-sky-400",
    items: [
      { href: "/policy/regulation", label: "Regulation & Legislation" },
      { href: "/policy/mandates", label: "Public Health Mandates" },
      { href: "/policy/global", label: "Global & Comparative Policy" },
      { href: "/policy/feasibility", label: "Policy Feasibility Studies" },
    ],
  },
  {
    id: "economics", label: "Economics", href: "/economics",
    dot: "bg-emerald-500", accent: "text-emerald-700", rail: "border-l-emerald-400",
    items: [
      { href: "/economics/value", label: "Value-Based Care Models" },
      { href: "/economics/market", label: "Market & Finance" },
      { href: "/economics/cea", label: "Labor & Workforce Strategy" },
      { href: "/economics/investment", label: "Healthcare Investment Trends" },
    ],
  },
  {
    id: "technology", label: "Technology", href: "/technology",
    dot: "bg-indigo-500", accent: "text-indigo-700", rail: "border-l-indigo-400",
    items: [
      { href: "/technology/ai", label: "AI & Machine Learning" },
      { href: "/technology/digital", label: "Digital Health & Telemedicine" },
      { href: "/technology/security", label: "Data Security & Governance" },
      { href: "/technology/workflow", label: "Tech-Enabled Workflow" },
    ],
  },
  {
    id: "clinical", label: "Clinical", href: "/clinical",
    dot: "bg-red-500", accent: "text-red-700", rail: "border-l-red-400",
    items: [
      { href: "/clinical/hah", label: "Hospital-at-Home" },
      { href: "/clinical/precision", label: "Precision Medicine" },
      { href: "/clinical/virtual", label: "Virtual Care Models" },
    ],
  },
  {
    id: "equity", label: "Equity", href: "/equity",
    dot: "bg-amber-500", accent: "text-amber-700", rail: "border-l-amber-400",
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
  icon: React.ComponentType<{ className?: string }>;
  headerColor: string;
  headerBg: string;
  collapsedBg: string;
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
    icon: LightBulbIcon,
    headerColor: "text-slate-600", headerBg: "bg-slate-100", collapsedBg: "bg-slate-50",
    borderAccent: "border-l-slate-500", hoverBg: "hover:bg-slate-100",
    divideColor: "divide-slate-100", activeItemBg: "bg-slate-100",
    isPillars: true,
  },
  {
    id: "learn", label: "Learn",
    icon: AcademicCapIcon,
    headerColor: "text-sky-700", headerBg: "bg-sky-100", collapsedBg: "bg-sky-50/70",
    borderAccent: "border-l-sky-500", hoverBg: "hover:bg-sky-100",
    divideColor: "divide-sky-100", activeItemBg: "bg-sky-100",
    items: [
      { href: "/academy/personalized-learning", label: "Personalized Learning", icon: SparklesIcon },
      { href: "/academy/tracks",                label: "Learning Tracks",        icon: TableCellsIcon },
      { href: "/academy/courses",               label: "Courses",                icon: BookOpenIcon },
      { href: "/academy/webinars",              label: "Webinars",               icon: PresentationChartLineIcon },
      { href: "/academy/case-studies",          label: "Case Studies",           icon: DocumentTextIcon },
      { href: "/academy/glossary",              label: "Glossary",               icon: BookOpenIcon },
      { href: "/academy/faculty",               label: "Faculty",                icon: UsersIcon },
    ],
  },
  {
    id: "analyze", label: "Analyze & Tools",
    icon: BeakerIcon,
    headerColor: "text-amber-700", headerBg: "bg-amber-100", collapsedBg: "bg-amber-50/70",
    borderAccent: "border-l-amber-500", hoverBg: "hover:bg-amber-100",
    divideColor: "divide-amber-100", activeItemBg: "bg-amber-100",
    items: [
      { href: "/research-lab/interoperability",    label: "Interoperability & Risk",   icon: BeakerIcon },
      { href: "/research-lab/payment-models",      label: "Payment Models & VBC",      icon: DocumentTextIcon },
      { href: "/research-lab/population-equity",   label: "Population & Equity",       icon: UsersIcon },
      { href: "/research-lab/policy-quality",      label: "Policy & Quality Sciences", icon: DocumentTextIcon },
      { href: "/research-lab/technology-ai",       label: "Technology & AI",           icon: CpuChipIcon },
      { href: "/research-lab/knowledge-workspace", label: "Knowledge & Workspace",     icon: BookOpenIcon },
      { href: "/htr-simulator",                    label: "HTR Simulator",             icon: CpuChipIcon },
      { href: "/hti-dashboard",                    label: "HTI Dashboard",             icon: DocumentTextIcon },
      { href: "/the-wire",                          label: "The Wire",                  icon: BoltIcon },
      { href: "/investment-tracker",               label: "Investment Tracker",         icon: BanknotesIcon },
      { href: "/multimedia",                       label: "Multimedia",                icon: FilmIcon },
      { href: "/trending-topics",                  label: "Trending Topics",           icon: ArrowTrendingUpIcon },
    ],
  },
  {
    id: "states", label: "States & Programs",
    icon: MapPinIcon,
    headerColor: "text-rose-700", headerBg: "bg-rose-100", collapsedBg: "bg-rose-50/70",
    borderAccent: "border-l-rose-500", hoverBg: "hover:bg-rose-100",
    divideColor: "divide-rose-100", activeItemBg: "bg-rose-100",
    items: [
      { href: "/vermont-act-167",   label: "Vermont Act 167",    icon: MapPinIcon },
      { href: "/california-calaim", label: "California CalAIM",  icon: MapPinIcon },
      { href: "/states",            label: "All States Explorer", icon: GlobeAmericasIcon },
      { href: "/dashboard",         label: "50-State Dashboard", icon: TableCellsIcon },
      { href: "/ahead-model",       label: "AHEAD Model",        icon: DocumentTextIcon },
    ],
  },
  {
    id: "advisory", label: "Advisory & Services",
    icon: BriefcaseIcon,
    headerColor: "text-indigo-700", headerBg: "bg-indigo-100", collapsedBg: "bg-indigo-50/70",
    borderAccent: "border-l-indigo-500", hoverBg: "hover:bg-indigo-100",
    divideColor: "divide-indigo-100", activeItemBg: "bg-indigo-100",
    items: [
      { href: "/advisory",                    label: "Advisory Hub",          icon: BriefcaseIcon },
      { href: "/advisory/consulting",         label: "Strategic Consulting",  icon: BriefcaseIcon },
      { href: "/advisory/research",           label: "Custom Research",       icon: BeakerIcon },
      { href: "/advisory/financial-audit",    label: "Financial Audit",       icon: DocumentTextIcon },
      { href: "/advisory/regulatory",         label: "Regulatory Counsel",    icon: BookOpenIcon },
      { href: "/advisory/it-consulting",      label: "IT Consulting",         icon: CpuChipIcon },
      { href: "/advisory/training",           label: "Training & Education",  icon: AcademicCapIcon },
      { href: "/advisory/independent-review", label: "Independent Review",    icon: DocumentTextIcon },
      { href: "/connect-hub",                 label: "Connect Hub",           icon: UsersIcon },
      { href: "/connect",                     label: "HTR Connect",           icon: UsersIcon },
      { href: "/connect/directory",           label: "Member Directory",      icon: UsersIcon },
      { href: "/community",                   label: "Community",             icon: UsersIcon },
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
  const advisoryPrefixes = ["/advisory", "/connect-hub", "/connect", "/community"];
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
  useEffect(() => {
    const section = getSectionForPath(pathname);
    const pillar = getPillarForPath(pathname);
    if (section) setExpandedSections((prev) => prev.includes(section) ? prev : [...prev, section]);
    if (pillar)  setExpandedPillars((prev)  => prev.includes(pillar)  ? prev : [...prev, pillar]);
  }, [pathname]);

  // ── Click handlers ────────────────────────────────────────────────────────
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

  const handleCollapseAll = () => {
    setExpandedSections([]);
    setExpandedPillars([]);
  };

  const hasAnythingOpen = expandedSections.length > 0;

  return (
    <div className="pt-2">

      {/* ── Collapse All ────────────────────────────────────────────────── */}
      {hasAnythingOpen && (
        <div className="flex justify-end mb-2 px-1">
          <button
            onClick={handleCollapseAll}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ChevronDownIcon className="w-3 h-3 rotate-180" />
            Collapse all
          </button>
        </div>
      )}

      {/* ── L1: Section list ─────────────────────────────────────────────── */}
      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const isOpen = expandedSections.includes(section.id);
          const SectionIcon = section.icon;

          return (
            <div key={section.id}>
              {/* L1 header button */}
              <button
                onClick={() => handleSectionClick(section.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 ${section.borderAccent} transition-colors text-left ${
                  isOpen ? section.headerBg : `${section.collapsedBg} dark:bg-slate-800 ${section.hoverBg}`
                }`}
              >
                <span className="flex items-center gap-2">
                  <SectionIcon className={`w-4 h-4 shrink-0 ${section.headerColor}`} />
                  <span className={`text-[11px] font-black uppercase tracking-[0.13em] ${section.headerColor}`}>
                    {section.label}
                  </span>
                </span>
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                    isOpen ? `${section.headerColor} rotate-0` : "text-slate-400 -rotate-90"
                  }`}
                />
              </button>

              {/* ── L2 drawer: indented + colored rail ───────────────────── */}
              {isOpen && (
                <div className={`mt-1.5 ml-2 border-l-4 ${section.borderAccent} bg-white dark:bg-slate-800/60 rounded-r-xl rounded-b-xl overflow-hidden shadow-sm`}>

                  {/* ── INTELLIGENCE: nested pillar accordion ──────────── */}
                  {section.isPillars && (
                    <div className="divide-y divide-slate-100/80 dark:divide-slate-700/50 py-1">
                      {pillars.map((pillar) => {
                        const pillarOpen = expandedPillars.includes(pillar.id);
                        return (
                          <div key={pillar.id}>

                            {/* L2 pillar button */}
                            <button
                              onClick={() => handlePillarClick(pillar.id)}
                              className="w-full flex items-center justify-between pl-5 pr-3 py-2.5 transition-colors text-left hover:bg-slate-50 dark:hover:bg-slate-700/50"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`w-2 h-2 rounded-full shrink-0 ${pillar.dot}`} />
                                <span className={`text-[12px] font-bold ${pillar.accent}`}>
                                  {pillar.label}
                                </span>
                              </div>
                              <ChevronDownIcon
                                className={`w-3 h-3 shrink-0 transition-transform duration-200 ${
                                  pillarOpen ? `${pillar.accent} rotate-0` : "text-slate-300 dark:text-slate-600 -rotate-90"
                                }`}
                              />
                            </button>

                            {/* L3: pillar sub-items, indented further */}
                            {pillarOpen && (
                              <div className={`ml-5 border-l-2 ${pillar.rail} bg-slate-50/80 dark:bg-slate-900 mb-1`}>
                                {/* Pillar overview link */}
                                <Link
                                  href={pillar.href}
                                  onClick={onNavigate}
                                  className={`flex items-center pl-4 pr-2 py-1.5 border-b border-slate-100 dark:border-slate-700 group ${
                                    isActive(pillar.href) ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-white dark:hover:bg-slate-800"
                                  }`}
                                >
                                  <span className={`text-[10px] font-bold uppercase tracking-widest ${pillar.accent} group-hover:underline`}>
                                    {pillar.label} Overview
                                  </span>
                                </Link>
                                {/* L3 sub-items */}
                                <div className="divide-y divide-slate-100/60 dark:divide-slate-700/50">
                                  {pillar.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={onNavigate}
                                      className={`flex items-center pl-4 pr-2 py-2 transition-colors group ${
                                        isActive(item.href) ? "bg-slate-100 dark:bg-slate-700" : "hover:bg-white dark:hover:bg-slate-800"
                                      }`}
                                    >
                                      <span className={`text-[11px] leading-snug transition-colors ${
                                        isActive(item.href)
                                          ? `font-semibold ${pillar.accent}`
                                          : "font-normal text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
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

                  {/* ── ALL OTHER SECTIONS: flat item list ────────────── */}
                  {!section.isPillars && section.items && (
                    <div className={`divide-y ${section.divideColor} py-1`}>
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={`${item.href}-${item.label}`}
                            href={item.href}
                            onClick={onNavigate}
                            className={`flex items-center gap-2.5 pl-5 pr-3 py-2 transition-colors group ${
                              isActive(item.href)
                                ? section.activeItemBg
                                : `bg-white dark:bg-slate-800/60 ${section.hoverBg}`
                            }`}
                          >
                            {Icon && (
                              <Icon className={`w-3.5 h-3.5 shrink-0 ${section.headerColor} opacity-60`} />
                            )}
                            <span className={`text-[13px] font-medium leading-snug transition-colors ${
                              isActive(item.href)
                                ? `font-semibold ${section.headerColor}`
                                : "text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100"
                            }`}>
                              {item.label}
                            </span>
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
          className={`flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-slate-400 transition-colors ${
            isActive("/saved") ? "bg-slate-100 dark:bg-slate-700" : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
          }`}
        >
          <span className="flex items-center gap-2">
            <BookmarkIcon className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.13em] text-slate-500 dark:text-slate-400">
              My Library
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
