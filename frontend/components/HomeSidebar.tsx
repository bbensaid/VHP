// frontend/components/HomeSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  BuildingLibraryIcon,
  HeartIcon,
  ScaleIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

interface HomeSidebarProps {
  onNavigate?: () => void;
}

// ─── TYPES ────────────────────────────────────────────────────────────────────
type RegularItem = {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  groupLabel?: string; // when set, renders a divider + mini-header before this item
};

type PillarItem = {
  href: string;
  label: string;
};

type Section = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  headerColor: string;
  headerBg: string;
  borderAccent: string;
  hoverBg: string;
  divideColor: string;
  activeItemBg: string;
  dot: string;
  // pillar sections — show intelligence content + research lab tools
  isPillarSection?: boolean;
  overviewHref?: string;
  intelligenceItems?: PillarItem[];
  labItems?: PillarItem[];
  // regular sections — flat item list
  items?: RegularItem[];
};

// ─── SECTIONS ─────────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [

  // ── PILLAR 1: POLICY ───────────────────────────────────────────────────────
  {
    id: "policy", label: "Policy",
    icon: BuildingLibraryIcon,
    dot: "bg-sky-500",
    headerColor: "text-sky-700", headerBg: "bg-sky-100",
    borderAccent: "border-sky-400", hoverBg: "hover:bg-sky-50",
    divideColor: "divide-sky-100", activeItemBg: "bg-sky-100",
    isPillarSection: true,
    overviewHref: "/policy",
    intelligenceItems: [
      { href: "/policy/regulation",  label: "Regulation & Legislation" },
      { href: "/policy/mandates",    label: "Public Health Mandates" },
      { href: "/policy/global",      label: "Global & Comparative Policy" },
      { href: "/policy/feasibility", label: "Policy Feasibility Studies" },
    ],
    labItems: [
      { href: "/research-lab/policy-quality?tab=policy",           label: "Policy Simulator" },
      { href: "/research-lab/policy-quality?tab=medicaid-wr",      label: "Work Requirements Calculator" },
      { href: "/research-lab/policy-quality?tab=hr1-cliff",        label: "H.R. 1 Cliff Scenario" },
      { href: "/research-lab/knowledge-workspace?tab=leaderboard", label: "Innovation Leaderboard" },
    ],
  },

  // ── PILLAR 2: ECONOMICS ────────────────────────────────────────────────────
  {
    id: "economics", label: "Economics",
    icon: BanknotesIcon,
    dot: "bg-emerald-500",
    headerColor: "text-emerald-700", headerBg: "bg-emerald-100",
    borderAccent: "border-emerald-400", hoverBg: "hover:bg-emerald-50",
    divideColor: "divide-emerald-100", activeItemBg: "bg-emerald-100",
    isPillarSection: true,
    overviewHref: "/economics",
    intelligenceItems: [
      { href: "/economics/value",      label: "Value-Based Care Models" },
      { href: "/economics/market",     label: "Market & Finance" },
      { href: "/economics/cea",        label: "Labor & Workforce Strategy" },
      { href: "/economics/investment", label: "Healthcare Investment Trends" },
    ],
    labItems: [
      { href: "/research-lab/payment-models?tab=apm-design",   label: "APM Design Lab" },
      { href: "/research-lab/payment-models?tab=apm-calc",    label: "Shared Savings Calculator" },
      { href: "/research-lab/payment-models?tab=cea",         label: "CEA Calculator" },
      { href: "/research-lab/payment-models?tab=gb-transition", label: "Global Budget Transition Modeler" },
      { href: "/research-lab/policy-quality?tab=scorecard",   label: "Hospital Financial Stress Test" },
      { href: "/research-lab/policy-quality?tab=hta",         label: "HTA Studio" },
      { href: "/research-lab/policy-quality?tab=actuarial",   label: "Actuarial Lab" },
    ],
  },

  // ── PILLAR 3: TECHNOLOGY ───────────────────────────────────────────────────
  {
    id: "technology", label: "Technology",
    icon: CpuChipIcon,
    dot: "bg-indigo-500",
    headerColor: "text-indigo-700", headerBg: "bg-indigo-100",
    borderAccent: "border-indigo-400", hoverBg: "hover:bg-indigo-50",
    divideColor: "divide-indigo-100", activeItemBg: "bg-indigo-100",
    isPillarSection: true,
    overviewHref: "/technology",
    intelligenceItems: [
      { href: "/technology/ai",       label: "AI & Machine Learning" },
      { href: "/technology/digital",  label: "Digital Health & Telemedicine" },
      { href: "/technology/security", label: "Data Security & Governance" },
      { href: "/technology/workflow", label: "Tech-Enabled Workflow" },
    ],
    labItems: [
      { href: "/research-lab/interoperability?tab=fhir",          label: "FHIR Interoperability Lab" },
      { href: "/research-lab/vbc-clinical-quality?tab=hl7",       label: "Clinical Data Exchange Lab" },
      { href: "/research-lab/technology-ai?tab=ai",               label: "AI Clinical Governance Lab" },
      { href: "/research-lab/technology-ai?tab=digital",          label: "Digital Health Lab" },
    ],
  },

  // ── PILLAR 4: CLINICAL ─────────────────────────────────────────────────────
  {
    id: "clinical", label: "Clinical",
    icon: HeartIcon,
    dot: "bg-red-500",
    headerColor: "text-red-700", headerBg: "bg-red-100",
    borderAccent: "border-red-400", hoverBg: "hover:bg-red-50",
    divideColor: "divide-red-100", activeItemBg: "bg-red-100",
    isPillarSection: true,
    overviewHref: "/clinical",
    intelligenceItems: [
      { href: "/clinical/hah",        label: "Hospital-at-Home" },
      { href: "/clinical/precision",  label: "Precision Medicine" },
      { href: "/clinical/virtual",    label: "Virtual Care Models" },
      { href: "/clinical/genomics",   label: "Genomics & Predictive Medicine" },
      { href: "/clinical/population", label: "Population Health Management" },
    ],
    labItems: [
      { href: "/research-lab/interoperability?tab=risk",             label: "Risk Stratification Engine" },
      { href: "/research-lab/vbc-clinical-quality?tab=risk",         label: "Risk Stratification Methodology" },
      { href: "/research-lab/vbc-clinical-quality?tab=quality",      label: "VBC Quality Measures" },
      { href: "/research-lab/vbc-clinical-quality?tab=value",        label: "High vs. Low Value Care" },
      { href: "/research-lab/policy-quality?tab=quality",            label: "Clinical Quality Optimizer" },
      { href: "/research-lab/knowledge-workspace?tab=workforce",     label: "Workforce Modeler" },
    ],
  },

  // ── PILLAR 5: EQUITY ───────────────────────────────────────────────────────
  {
    id: "equity", label: "Equity",
    icon: ScaleIcon,
    dot: "bg-violet-500",
    headerColor: "text-violet-700", headerBg: "bg-violet-100",
    borderAccent: "border-violet-400", hoverBg: "hover:bg-violet-50",
    divideColor: "divide-violet-100", activeItemBg: "bg-violet-100",
    isPillarSection: true,
    overviewHref: "/equity",
    intelligenceItems: [
      { href: "/equity/sdoh",        label: "SDOH Integration" },
      { href: "/vermont-sdoh",       label: "Vermont SDOH & Social Services" },
      { href: "/equity/bias",        label: "Algorithmic Bias" },
      { href: "/equity/access",      label: "Access Disparity" },
    ],
    labItems: [
      { href: "/research-lab/population-equity?tab=population", label: "Population Health Modeler" },
      { href: "/research-lab/population-equity?tab=equity",     label: "Health Equity Studio" },
    ],
  },

  // ── PILLAR 6: OPERATIONS ───────────────────────────────────────────────────
  {
    id: "operations", label: "Operations",
    icon: Cog6ToothIcon,
    dot: "bg-teal-500",
    headerColor: "text-teal-700", headerBg: "bg-teal-100",
    borderAccent: "border-teal-400", hoverBg: "hover:bg-teal-50",
    divideColor: "divide-teal-100", activeItemBg: "bg-teal-100",
    isPillarSection: true,
    overviewHref: "/operations",
    intelligenceItems: [
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

  // ── ACADEMY ────────────────────────────────────────────────────────────────
  {
    id: "learn", label: "Academy",
    icon: AcademicCapIcon,
    dot: "bg-sky-500",
    headerColor: "text-sky-700", headerBg: "bg-sky-100",
    borderAccent: "border-sky-500", hoverBg: "hover:bg-sky-100",
    divideColor: "divide-sky-100", activeItemBg: "bg-sky-100",
    items: [
      { href: "/academy/personalized-learning", label: "Personalized Learning",   icon: SparklesIcon },
      { href: "/academy/tracks",                label: "Learning Tracks",          icon: TableCellsIcon },
      { href: "/academy/courses",               label: "Courses",                  icon: BookOpenIcon },
      { href: "/academy/webinars",              label: "Webinars",                 icon: PresentationChartLineIcon },
      { href: "/academy/case-studies",          label: "Case Studies",             icon: DocumentTextIcon },
      { href: "/academy/glossary",              label: "Glossary",                 icon: BookOpenIcon },
      { href: "/academy/medicaid",              label: "Medicaid Learning Center", icon: DocumentTextIcon },
      { href: "/academy/faculty",               label: "Faculty",                  icon: UsersIcon },
    ],
  },

  // ── TOOLS ─────────────────────────────────────────────────────────────────
  {
    id: "tools", label: "Tools",
    icon: WrenchScrewdriverIcon,
    dot: "bg-amber-500",
    headerColor: "text-amber-700", headerBg: "bg-amber-100",
    borderAccent: "border-amber-500", hoverBg: "hover:bg-amber-100",
    divideColor: "divide-amber-100", activeItemBg: "bg-amber-100",
    items: [
      { href: "/about/framework",                label: "Six-Pillar Map",       icon: BeakerIcon },
      { href: "/htr-simulator",                  label: "HTR Simulator",       icon: CpuChipIcon },
      { href: "/medicaid-eligibility-simulator", label: "Medicaid Eligibility", icon: DocumentTextIcon },
      { href: "/hti-dashboard",                  label: "HTI Dashboard",       icon: TableCellsIcon },
      { href: "/the-wire",                       label: "The Wire",            icon: BoltIcon },
      { href: "/investment-tracker",             label: "Investment Tracker",   icon: BanknotesIcon },
      { href: "/transformation-friction-index",  label: "Friction Index",       icon: BeakerIcon },
      { href: "/impact-simulation",              label: "Impact Simulation",    icon: SparklesIcon },
      { href: "/multimedia",                     label: "Multimedia",          icon: FilmIcon },
      { href: "/trending-topics",                label: "Trending Topics",     icon: ArrowTrendingUpIcon },
    ],
  },

  // ── STATES & PROGRAMS ──────────────────────────────────────────────────────
  {
    id: "states", label: "States & Programs",
    icon: MapPinIcon,
    dot: "bg-rose-500",
    headerColor: "text-rose-700", headerBg: "bg-rose-100",
    borderAccent: "border-rose-500", hoverBg: "hover:bg-rose-100",
    divideColor: "divide-rose-100", activeItemBg: "bg-rose-100",
    items: [
      // Vermont Programs
      { href: "/vermont-medicaid",               label: "Vermont Medicaid",               icon: DocumentTextIcon,        groupLabel: "Vermont Programs" },
      { href: "/vermont-blueprint",              label: "Blueprint for Health",           icon: HeartIcon },
      { href: "/vermont-vcci",                   label: "Vermont VCCI",                   icon: HeartIcon },
      { href: "/vermont-sash",                   label: "SASH Program",                   icon: HeartIcon },
      { href: "/vermont-designated-agencies",    label: "Designated Agencies (MH/SUD)",   icon: UsersIcon },
      { href: "/vermont-sdoh",                   label: "SDOH & Social Services",         icon: UsersIcon },
      { href: "/vermont-act-167",                label: "Vermont Act 167 (2022)",          icon: MapPinIcon },
      { href: "/vermont-act-68",                 label: "Vermont Act 68 (2025)",           icon: MapPinIcon },
      { href: "/vermont-act-68/simulator",       label: "Act 68 Simulator",               icon: TableCellsIcon },
      { href: "/ahead-model",                    label: "AHEAD Model",                    icon: DocumentTextIcon },
      { href: "/vermont-rht-program",            label: "RHT Program ($195M)",            icon: DocumentTextIcon },
      { href: "/dashboard/vermont/hospitals",    label: "VT Hospital Profiles",           icon: TableCellsIcon },
      { href: "/bed-capacity",                   label: "Bed Capacity & Transfer",        icon: TableCellsIcon },
      { href: "/vermont-legislative-resources",          label: "Legislative Reports Library",    icon: BookOpenIcon },
      { href: "/research-lab/vbc-clinical-quality?tab=risk",    label: "VCCI Risk Stratification Lab",   icon: BeakerIcon },
      { href: "/research-lab/vbc-clinical-quality?tab=quality", label: "VBC Quality Measures Lab",       icon: BeakerIcon },
      // Other States & Federal Programs
      { href: "/california-calaim",              label: "California CalAIM",              icon: MapPinIcon,              groupLabel: "Other States & Federal" },
      { href: "/oregon-cco",                     label: "Oregon CCO 3.0",                  icon: MapPinIcon },
      { href: "/states",                         label: "All States Explorer",            icon: GlobeAmericasIcon },
      { href: "/dashboard",                      label: "50-State Dashboard",             icon: TableCellsIcon },
      { href: "/dashboard/simulator",            label: "CMS Rural Transformation",       icon: TableCellsIcon },
    ],
  },

  // ── PRO-BONO ADVISORY & SERVICES ──────────────────────────────────────────
  {
    id: "advisory", label: "Advisory & Services",
    icon: BriefcaseIcon,
    dot: "bg-indigo-500",
    headerColor: "text-indigo-700", headerBg: "bg-indigo-100",
    borderAccent: "border-indigo-500", hoverBg: "hover:bg-indigo-100",
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
      { href: "/connect",                     label: "HTR Connect",           icon: UsersIcon },
      { href: "/connect/directory",           label: "Member Directory",      icon: UsersIcon },
      { href: "/community",                   label: "Community",             icon: UsersIcon },
    ],
  },
];

// ─── ROUTE → SECTION HELPER ───────────────────────────────────────────────────
function getSectionForPath(path: string, searchParams: URLSearchParams | null): string | null {
  if (path === "/policy"     || path.startsWith("/policy/"))     return "policy";
  if (path === "/economics"  || path.startsWith("/economics/"))  return "economics";
  if (path === "/technology" || path.startsWith("/technology/")) return "technology";
  if (path === "/clinical"   || path.startsWith("/clinical/"))   return "clinical";
  if (path === "/equity"     || path.startsWith("/equity/"))     return "equity";
  if (path === "/operations" || path.startsWith("/operations/")) return "operations";

  if (path === "/research-lab/policy-quality")      return "policy";
  if (path === "/research-lab/payment-models")      return "economics";
  if (path === "/research-lab/interoperability")    return "technology";
  if (path === "/research-lab/technology-ai")       return "technology";
  if (path === "/research-lab/population-equity")   return "equity";
  if (path === "/research-lab/vbc-clinical-quality") {
    const t = searchParams?.get("tab");
    if (t === "hl7") return "technology";
    return "clinical";
  }
  if (path === "/research-lab/knowledge-workspace") {
    if (searchParams?.get("tab") === "leaderboard") return "policy";
    return "operations";
  }

  if (path === "/academy" || path.startsWith("/academy/")) return "learn";

  const statesPrefixes = ["/vermont-medicaid", "/vermont-blueprint", "/vermont-vcci", "/vermont-sash", "/vermont-sdoh", "/vermont-designated-agencies", "/vermont-legislative-resources", "/vermont-act-167", "/vermont-act-68", "/vermont-rht-program", "/california-calaim", "/oregon-cco", "/states", "/dashboard", "/ahead-model", "/bed-capacity"];
  if (statesPrefixes.some((p) => path === p || path.startsWith(p + "/"))) return "states";

  const toolsPrefixes = ["/htr-simulator", "/medicaid-eligibility-simulator", "/hti-dashboard", "/the-wire", "/investment-tracker", "/transformation-friction-index", "/impact-simulation", "/multimedia", "/trending-topics"];
  if (toolsPrefixes.some((p) => path === p || path.startsWith(p + "/"))) return "tools";

  const advisoryPrefixes = ["/advisory", "/connect", "/community"];
  if (advisoryPrefixes.some((p) => path === p || path.startsWith(p + "/"))) return "advisory";

  return null;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const SETUP_SEQUENCE = "setup";

export default function HomeSidebar({ onNavigate }: HomeSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    let typed = "";
    const handler = (e: KeyboardEvent) => {
      typed += e.key.toLowerCase();
      if (typed.length > SETUP_SEQUENCE.length) typed = typed.slice(-SETUP_SEQUENCE.length);
      if (typed === SETUP_SEQUENCE) setShowSetup(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    const s = getSectionForPath(pathname, searchParams);
    return s ? [s] : [];
  });

  const isActive  = (href: string) => pathname === href;

  const isLabActive = (href: string) => {
    const [path, query] = href.split("?");
    if (pathname !== path) return false;
    if (!query) return true;
    // Strict check: current search params must contain the key/value pairs in the href
    const expectedParams = new URLSearchParams(query);
    return Array.from(expectedParams.entries()).every(([k, v]) => searchParams.get(k) === v);
  };

  useEffect(() => {
    const section = getSectionForPath(pathname, searchParams);
    if (section) {
      setExpandedSections((prev) =>
        prev.includes(section) ? prev : [...prev, section]
      );
    }
  }, [pathname, searchParams]);

  const handleSectionClick = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleCollapseAll = () => setExpandedSections([]);

  const hasAnythingOpen = expandedSections.length > 0;

  return (
    <div className="pt-2">

      {/* ── Collapse All ──────────────────────────────────────────────────── */}
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

      {/* ── Section list ──────────────────────────────────────────────────── */}
      <div>
        {SECTIONS.map((section) => {
          const isOpen = expandedSections.includes(section.id);
          const SectionIcon = section.icon;

          return (
            <div key={section.id} className="mb-0.5">

              {/* L1 header — pillar: label is a Link, chevron is a toggle button */}
              {/* Single unified row — same markup for both pillar and regular sections */}
              <div className={`flex items-center px-2 h-8 rounded-xl transition-colors ${
                isOpen ? `${section.headerBg} dark:bg-slate-800` : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}>
                {/* Clickable label area */}
                {section.isPillarSection ? (
                  <Link
                    href={section.overviewHref!}
                    onClick={() => {
                      if (!expandedSections.includes(section.id)) handleSectionClick(section.id);
                      onNavigate?.();
                    }}
                    className="flex items-center gap-2 flex-1 min-w-0"
                  >
                    <span className={`w-5 h-5 rounded-md ${section.headerBg} flex items-center justify-center shrink-0`}>
                      <SectionIcon className={`w-3 h-3 ${section.headerColor}`} />
                    </span>
                    <span className={`text-[13px] font-semibold tracking-wide truncate ${
                      isOpen ? section.headerColor : "text-slate-600 dark:text-slate-300"
                    }`}>
                      {section.label}
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className="flex items-center gap-2 flex-1 min-w-0 text-left"
                  >
                    <span className={`w-5 h-5 rounded-md ${section.headerBg} flex items-center justify-center shrink-0`}>
                      <SectionIcon className={`w-3 h-3 ${section.headerColor}`} />
                    </span>
                    <span className={`text-[13px] font-semibold tracking-wide truncate ${
                      isOpen ? section.headerColor : "text-slate-600 dark:text-slate-300"
                    }`}>
                      {section.label}
                    </span>
                  </button>
                )}
                {/* Chevron toggle — same for both */}
                <button
                  onClick={() => handleSectionClick(section.id)}
                  className="shrink-0 ml-1"
                  aria-label={isOpen ? "Collapse" : "Expand"}
                >
                  <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isOpen ? `${section.headerColor} rotate-0` : "text-slate-400 -rotate-90"
                  }`} />
                </button>
              </div>

              {/* L2 drawer */}
              {isOpen && (
                <div className={`mt-1 ml-2 border-l-2 ${section.borderAccent} bg-white dark:bg-slate-800/60 rounded-r-xl rounded-b-xl overflow-hidden shadow-sm`}>

                  {/* ── PILLAR SECTION: intelligence items + lab items ── */}
                  {section.isPillarSection && (
                    <div>

                      {/* Intelligence items */}
                      <div className="divide-y divide-slate-100 dark:divide-slate-700/50 py-1">
                        {section.intelligenceItems!.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={`flex items-center gap-2.5 pl-5 pr-3 py-2 transition-colors group ${
                              isActive(item.href)
                                ? section.activeItemBg
                                : `bg-white dark:bg-slate-800/60 ${section.hoverBg}`
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full shrink-0 ${section.dot}`} />
                            <span className={`text-[12px] leading-snug transition-colors ${
                              isActive(item.href)
                                ? `font-semibold ${section.headerColor}`
                                : "font-normal text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white"
                            }`}>
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>

                      {/* Research Lab — distinct banded section */}
                      <div className={`border-t-2 ${section.borderAccent} bg-slate-50 dark:bg-slate-900/60`}>
                        <div className="flex items-center gap-1.5 pl-5 pr-3 pt-2 pb-1">
                          <BeakerIcon className={`w-3 h-3 shrink-0 ${section.headerColor}`} />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${section.headerColor}`}>
                            Research Lab
                          </span>
                        </div>
                        <div className="divide-y divide-slate-200 dark:divide-slate-700/50 pb-2">
                          {section.labItems!.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={onNavigate}
                              className={`flex items-center gap-2.5 pl-6 pr-3 py-2 transition-colors group ${
                                isLabActive(item.href)
                                  ? section.activeItemBg
                                  : `bg-slate-50 dark:bg-slate-900/60 ${section.hoverBg}`
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-sm shrink-0 ${section.dot} opacity-60`} />
                              <span className={`text-[12px] leading-snug transition-colors ${
                                isLabActive(item.href)
                                  ? `font-semibold ${section.headerColor}`
                                  : `font-normal text-slate-600 dark:text-slate-400 group-hover:${section.headerColor} dark:group-hover:text-slate-200`
                              }`}>
                                {item.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── REGULAR SECTION: flat item list ─────────────────── */}
                  {!section.isPillarSection && section.items && (
                    <div className="py-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={`${item.href}-${item.label}`}>
                            {/* Optional group divider + label */}
                            {item.groupLabel && (
                              <div className={`flex items-center gap-2 pl-5 pr-3 pt-3 pb-1 border-t ${section.divideColor} mt-1`}>
                                <span className={`text-[9px] font-black uppercase tracking-widest ${section.headerColor} opacity-70`}>
                                  {item.groupLabel}
                                </span>
                              </div>
                            )}
                            <Link
                              href={item.href}
                              onClick={onNavigate}
                              className={`flex items-center gap-2.5 pl-5 pr-3 py-1.5 transition-colors group ${
                                isActive(item.href)
                                  ? section.activeItemBg
                                  : `bg-white dark:bg-slate-800/60 ${section.hoverBg}`
                              }`}
                            >
                              {Icon && (
                                <Icon className={`w-3.5 h-3.5 shrink-0 ${section.headerColor} opacity-60`} />
                              )}
                              <span className={`text-[12px] leading-snug transition-colors ${
                                isActive(item.href)
                                  ? `font-medium ${section.headerColor}`
                                  : "font-normal text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                              }`}>
                                {item.label}
                              </span>
                            </Link>
                          </div>
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
          className={`flex items-center px-2 h-8 rounded-xl transition-colors ${
            isActive("/saved")
              ? "bg-slate-100 dark:bg-slate-700"
              : "hover:bg-slate-100 dark:hover:bg-slate-700"
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <BookmarkIcon className="w-3 h-3 text-slate-500 dark:text-slate-400" />
            </span>
            <span className="text-[13px] font-semibold tracking-wide text-slate-600 dark:text-slate-300">
              My Library
            </span>
          </span>
        </Link>

        {showSetup && (
          <>
            <div className="border-t border-slate-200 dark:border-slate-700 my-2" />
            <Link
              href="/setup"
              onClick={onNavigate}
              className={`flex items-center px-2 h-8 rounded-xl transition-colors ${
                isActive("/setup") ? "bg-amber-100" : "hover:bg-amber-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-amber-100 flex items-center justify-center shrink-0">
                  <span className="text-[10px]">⚙️</span>
                </span>
                <span className="text-[13px] font-semibold tracking-wide text-amber-700">
                  Setup
                </span>
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
