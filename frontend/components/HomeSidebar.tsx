// frontend/components/HomeSidebar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
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
} from "@heroicons/react/24/outline";

const L2_WIDTH = 240;
const L3_WIDTH = 220;
const PANEL_GAP = 6;

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

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function HomeSidebar({ onNavigate }: HomeSidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [sidebarRight, setSidebarRight] = useState(296);
  const [l2Top, setL2Top] = useState(0);
  const [l3Top, setL3Top] = useState(0);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Close on route change
  useEffect(() => {
    setActiveSection(null);
    setActivePillar(null);
  }, [pathname]);

  // Measure sidebar right edge dynamically (accounts for sticky/fixed positioning)
  useEffect(() => {
    const measure = () => {
      if (sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect();
        // +16 compensates for CollapsibleSidebar's px-4 right padding
        setSidebarRight(rect.right + 16);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Close panels when clicking outside HomeSidebar's DOM tree
  useEffect(() => {
    if (!activeSection) return;
    const handler = (e: MouseEvent) => {
      if (!sidebarRef.current?.contains(e.target as Node)) {
        setActiveSection(null);
        setActivePillar(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [activeSection]);

  const close = () => {
    setActiveSection(null);
    setActivePillar(null);
  };

  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    if (activeSection === sectionId) { close(); return; }
    const top = (e.currentTarget as HTMLElement).getBoundingClientRect().top;
    setL2Top(top);
    setActiveSection(sectionId);
    setActivePillar(null);
  };

  const handlePillarClick = (pillarId: string, e: React.MouseEvent) => {
    if (activePillar === pillarId) { setActivePillar(null); return; }
    const top = (e.currentTarget as HTMLElement).getBoundingClientRect().top;
    setL3Top(top);
    setActivePillar(pillarId);
  };

  const activeSectionData = SECTIONS.find(s => s.id === activeSection);
  const activePillarData = pillars.find(p => p.id === activePillar);

  return (
    <div ref={sidebarRef} className="pt-2">

      {/* ── L1: Section list ─────────────────────────────────────────── */}
      <div className="space-y-1.5">
        {SECTIONS.map((section) => {
          const isOpen = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={(e) => handleSectionClick(section.id, e)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-slate-200 border-l-4 ${section.borderAccent} transition-colors text-left ${
                isOpen ? section.headerBg : `bg-white ${section.hoverBg}`
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${section.headerColor}`}>
                {section.label}
              </span>
              <ChevronRightIcon
                className={`w-3 h-3 transition-transform duration-150 ${
                  isOpen ? `${section.headerColor} rotate-90` : "text-slate-400"
                }`}
              />
            </button>
          );
        })}

        {/* My Library — direct link, no flyout */}
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

      {/* ── L2: Flyout panel ─────────────────────────────────────────── */}
      {activeSection && activeSectionData && (
        <div
          className="fixed z-50 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden"
          style={{
            left: sidebarRight + PANEL_GAP,
            top: l2Top,
            width: L2_WIDTH,
            maxHeight: `calc(100vh - ${l2Top}px - 16px)`,
            overflowY: "auto",
          }}
        >
          {/* Panel header */}
          <div className={`px-3 py-2 border-b border-slate-100 ${activeSectionData.headerBg} sticky top-0`}>
            <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${activeSectionData.headerColor}`}>
              {activeSectionData.label}
            </span>
          </div>

          {/* INTELLIGENCE — pillar list with right-chevron for L3 */}
          {activeSectionData.isPillars && (
            <div className="divide-y divide-slate-100">
              {pillars.map((pillar) => (
                <button
                  key={pillar.id}
                  onClick={(e) => handlePillarClick(pillar.id, e)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 transition-colors text-left ${
                    activePillar === pillar.id ? "bg-slate-50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${pillar.dot}`} />
                    <span className="text-sm font-bold text-slate-700">{pillar.label}</span>
                  </div>
                  <ChevronRightIcon
                    className={`w-3 h-3 shrink-0 transition-colors ${
                      activePillar === pillar.id ? pillar.accent : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}

          {/* All other sections — flat item list */}
          {!activeSectionData.isPillars && activeSectionData.items && (
            <div className={`divide-y ${activeSectionData.divideColor}`}>
              {activeSectionData.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    onClick={() => { close(); onNavigate?.(); }}
                    className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                      isActive(item.href)
                        ? activeSectionData.activeItemBg
                        : `bg-white ${activeSectionData.hoverBg}`
                    }`}
                  >
                    {Icon && (
                      <Icon className={`w-4 h-4 shrink-0 ${activeSectionData.headerColor}`} />
                    )}
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 block leading-tight">
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

      {/* ── L3: Pillar sub-items flyout (INTELLIGENCE only) ──────────── */}
      {activePillarData && (
        <div
          className="fixed z-50 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden"
          style={{
            left: sidebarRight + PANEL_GAP + L2_WIDTH + PANEL_GAP,
            top: l3Top,
            width: L3_WIDTH,
            maxHeight: `calc(100vh - ${l3Top}px - 16px)`,
          }}
        >
          {/* Header links to pillar overview page */}
          <Link
            href={activePillarData.href}
            onClick={() => { close(); onNavigate?.(); }}
            className="flex items-center gap-2.5 px-3 py-2.5 border-b border-slate-100 bg-slate-50 group"
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${activePillarData.dot}`} />
            <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${activePillarData.accent} group-hover:underline`}>
              {activePillarData.label} Overview
            </span>
          </Link>
          <div className="divide-y divide-slate-100">
            {activePillarData.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { close(); onNavigate?.(); }}
                className={`flex items-center gap-2.5 px-3 py-2.5 transition-colors group ${
                  isActive(item.href) ? "bg-slate-50" : "hover:bg-slate-50"
                }`}
              >
                <ChevronRightIcon className="w-3 h-3 text-slate-300 shrink-0" />
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-tight">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
