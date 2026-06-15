// frontend/components/HomeSidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { StarIcon } from "@heroicons/react/24/solid";
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
import {
  PILLARS,
  PROGRAMS,
  PROGRAM_GROUPS,
  getTool,
  type Pillar,
  type PillarId,
} from "@/lib/taxonomy";
import { useBrand } from "@/components/BrandContext";

interface FeaturedCourse {
  slug: string;
  title: string;
  subtitle: string | null;
  estimated_hours: number;
}

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

// ─── PILLAR-SECTION CONFIG ────────────────────────────────────────────────────
// View-local choices: which icon each pillar uses in this nav, the topic
// sub-pages to surface (intelligence hub anchors), and the curated list of
// Research Lab tools to expose for that pillar. The pillar identity, colors,
// and accent classes come from lib/taxonomy/pillars.ts. The lab tool details
// (label, href) come from lib/taxonomy/tools.ts via id lookup.

const PILLAR_ICON: Record<PillarId, React.ComponentType<{ className?: string }>> = {
  policy: BuildingLibraryIcon,
  economics: BanknotesIcon,
  technology: CpuChipIcon,
  clinical: HeartIcon,
  equity: ScaleIcon,
  operations: Cog6ToothIcon,
};

interface PillarSidebarConfig {
  intelligenceItems: PillarItem[];
  labToolIds: string[];
}

const PILLAR_CONFIG: Record<PillarId, PillarSidebarConfig> = {
  policy: {
    intelligenceItems: [
      { href: "/policy/regulation",  label: "Regulation & Legislation" },
      { href: "/policy/mandates",    label: "Public Health Mandates" },
      { href: "/policy/global",      label: "Global & Comparative Policy" },
      { href: "/policy/feasibility", label: "Policy Feasibility Studies" },
    ],
    labToolIds: ["policy-simulator", "medicaid-wr-calculator", "hr1-cliff", "innovation-leaderboard"],
  },
  economics: {
    intelligenceItems: [
      { href: "/economics/value",      label: "Value-Based Care Models" },
      { href: "/economics/market",     label: "Market & Finance" },
      { href: "/economics/cea",        label: "Labor & Workforce Strategy" },
      { href: "/economics/investment", label: "Healthcare Investment Trends" },
    ],
    labToolIds: [
      "apm-design-lab", "shared-savings-calc", "cea-calculator", "global-budget-modeler",
      "hospital-stress-test", "hta-studio", "actuarial-lab",
    ],
  },
  technology: {
    intelligenceItems: [
      { href: "/technology/ai",       label: "AI & Machine Learning" },
      { href: "/technology/digital",  label: "Digital Health & Telemedicine" },
      { href: "/technology/security", label: "Data Security & Governance" },
      { href: "/technology/workflow", label: "Tech-Enabled Workflow" },
    ],
    labToolIds: ["fhir-lab", "emr-ehr-lab", "statewide-ehr-lab", "clinical-data-exchange", "ai-governance-lab", "digital-health-lab"],
  },
  clinical: {
    intelligenceItems: [
      { href: "/clinical/hah",        label: "Hospital-at-Home" },
      { href: "/clinical/precision",  label: "Precision Medicine" },
      { href: "/clinical/virtual",    label: "Virtual Care Models" },
      { href: "/clinical/genomics",   label: "Genomics & Predictive Medicine" },
      { href: "/clinical/population", label: "Population Health Management" },
    ],
    labToolIds: [
      "risk-stratification-engine", "risk-stratification-methodology",
      "vbc-quality-measures", "high-low-value-care", "clinical-quality-optimizer", "workforce-modeler",
    ],
  },
  equity: {
    intelligenceItems: [
      { href: "/equity/sdoh",   label: "SDOH Integration" },
      { href: "/vermont-sdoh",  label: "Vermont SDOH & Social Services" },
      { href: "/equity/bias",   label: "Algorithmic Bias" },
      { href: "/equity/access", label: "Access Disparity" },
    ],
    labToolIds: ["population-modeler", "equity-studio"],
  },
  operations: {
    intelligenceItems: [
      { href: "/operations/revenue-cycle", label: "Revenue Cycle Management" },
      { href: "/operations/workforce",     label: "Workforce & Human Capital" },
      { href: "/operations/compliance",    label: "Quality, Compliance & Risk" },
      { href: "/operations/supply-chain",  label: "Supply Chain & Infrastructure" },
      { href: "/operations/payer-network", label: "Payer & Network Operations" },
    ],
    labToolIds: ["transformation-scorecard", "vbc-readiness", "evidence-library", "research-workspace", "cin-shared-services", "ems-transformation"],
  },
};

function buildPillarSection(pillar: Pillar): Section {
  const cfg = PILLAR_CONFIG[pillar.id];
  return {
    id: pillar.id, label: pillar.label,
    icon: PILLAR_ICON[pillar.id],
    dot: pillar.classes.dot,
    headerColor: pillar.classes.headerColor, headerBg: pillar.classes.headerBg,
    borderAccent: pillar.classes.borderAccent, hoverBg: pillar.classes.hoverBg,
    divideColor: pillar.classes.divideColor, activeItemBg: pillar.classes.activeItemBg,
    isPillarSection: true,
    overviewHref: pillar.href,
    intelligenceItems: cfg.intelligenceItems,
    labItems: cfg.labToolIds.map((id) => {
      const t = getTool(id);
      return { href: t.href, label: t.label };
    }),
  };
}

// ─── PROGRAM ICON MAP (view-local) ────────────────────────────────────────────
// Programs come from lib/taxonomy/programs.ts; the sidebar chooses an icon per
// program based on what it represents.

const PROGRAM_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  "vermont-medicaid":            DocumentTextIcon,
  "vermont-blueprint":           HeartIcon,
  "vermont-vcci":                HeartIcon,
  "vermont-sash":                HeartIcon,
  "vermont-designated-agencies": UsersIcon,
  "vermont-sdoh":                UsersIcon,
  "vermont-act-167":             MapPinIcon,
  "vermont-act-68":              MapPinIcon,
  "vermont-act-68-simulator":    TableCellsIcon,
  "ahead-model":                 DocumentTextIcon,
  "vermont-rht-program":         DocumentTextIcon,
  "vermont-hospital-profiles":   TableCellsIcon,
  "bed-capacity":                TableCellsIcon,
  "vermont-legislative-resources": BookOpenIcon,
  "california-calaim":           MapPinIcon,
  "oregon-cco":                  MapPinIcon,
  "states-explorer":             GlobeAmericasIcon,
  "fifty-state-dashboard":       TableCellsIcon,
  "cms-rural-simulator":         TableCellsIcon,
};

function buildProgramsSection(): Section {
  // Two curated VCCI lab tools live inside States & Programs as direct
  // shortcuts — they're labs, but they're Vermont-specific so they appear here.
  const vcciLabTools = ["risk-stratification-methodology", "vbc-quality-measures"].map((id) => {
    const t = getTool(id);
    return { href: t.href, label: id === "risk-stratification-methodology" ? "VCCI Risk Stratification Lab" : "VBC Quality Measures Lab", icon: BeakerIcon };
  });

  const items: RegularItem[] = [];
  PROGRAM_GROUPS.forEach((group) => {
    const groupPrograms = PROGRAMS.filter((p) => p.group === group);
    groupPrograms.forEach((p, i) => {
      items.push({
        href: p.href,
        label: p.label,
        icon: PROGRAM_ICON[p.id] ?? MapPinIcon,
        // groupLabel renders a divider + mini-header before the item; only the
        // first item of each group gets one.
        groupLabel: i === 0 ? group : undefined,
      });
    });
    // After Vermont Programs, insert two VCCI lab shortcuts (Vermont-flavored
    // research lab tools that practitioners reach for from this menu).
    if (group === "Vermont Programs") {
      vcciLabTools.forEach((t) => items.push(t));
    }
  });

  return {
    id: "states", label: "States & Programs",
    icon: MapPinIcon,
    dot: "bg-rose-500",
    headerColor: "text-rose-700", headerBg: "bg-rose-100",
    borderAccent: "border-rose-500", hoverBg: "hover:bg-rose-100",
    divideColor: "divide-rose-100", activeItemBg: "bg-rose-100",
    items,
  };
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  // Pillar sections — generated from taxonomy
  ...PILLARS.map(buildPillarSection),

  // ── ACADEMY ────────────────────────────────────────────────────────────────
  {
    id: "learn", label: "Academy",
    icon: AcademicCapIcon,
    dot: "bg-sky-500",
    headerColor: "text-sky-700", headerBg: "bg-sky-100",
    borderAccent: "border-sky-500", hoverBg: "hover:bg-sky-100",
    divideColor: "divide-sky-100", activeItemBg: "bg-sky-100",
    items: [
      { href: "/academy/tracks/welcome-htr-framework", label: "Welcome & the HTR Framework", icon: SparklesIcon },
      { href: "/academy/personalized-learning", label: "Personalized Learning",   icon: SparklesIcon },
      { href: "/academy/tracks",                label: "Courses",                  icon: TableCellsIcon },
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

  // ── STATES & PROGRAMS — generated from taxonomy ────────────────────────────
  buildProgramsSection(),

  // ── ADVISORY SERVICES ──────────────────────────────────────────────
  {
    id: "advisory", label: "Advisory Services",
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

  // Program prefixes derived from the taxonomy — adding a program in
  // lib/taxonomy/programs.ts automatically updates this match.
  const statesPrefixes = PROGRAMS.map((p) => p.href.split("?")[0]);
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
  const { config: brand } = useBrand();
  // On the "review" brand the advisory section is removed entirely.
  const sections = SECTIONS.filter((s) => brand.showAdvisory || s.id !== "advisory");
  const [showSetup, setShowSetup] = useState(false);
  const [featuredCourse, setFeaturedCourse] = useState<FeaturedCourse | null>(null);

  useEffect(() => {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    fetch(
      `${SUPABASE_URL}/rest/v1/courses?is_featured=eq.true&is_published=eq.true&select=slug,title,subtitle,estimated_hours&limit=1`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    )
      .then((r) => r.json())
      .then((rows) => { if (rows?.[0]) setFeaturedCourse(rows[0]); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let typed = "";
    const handler = (e: KeyboardEvent) => {
      if (!e.key || e.key.length !== 1) return;
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

      {/* ── The Book — pinned high-visibility entry ────────────────────── */}
      <div className="mb-2 px-1">
        <Link
          href="/book"
          onClick={onNavigate}
          className={`flex items-center gap-2 px-2 h-9 rounded-xl transition-colors border ${
            isActive("/book")
              ? "bg-indigo-100 border-indigo-200"
              : "bg-gradient-to-r from-indigo-50 to-slate-50 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50"
          }`}
        >
          <span className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
            <BookOpenIcon className="w-3 h-3 text-white" />
          </span>
          <span className={`text-[13px] font-semibold tracking-wide truncate flex-1 ${
            isActive("/book") ? "text-indigo-700" : "text-indigo-700"
          }`}>
            The Book
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 shrink-0">
            New
          </span>
        </Link>
      </div>

      <div className="mb-2 border-t border-slate-100" />

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
        {sections.map((section) => {
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
                      {/* Featured course card — only inside Academy section */}
                      {section.id === "learn" && featuredCourse && (
                        <div className="px-3 pb-2 pt-1">
                          <p className="text-[9px] font-black uppercase tracking-widest text-sky-600 mb-1.5 pl-1">Featured Course</p>
                          <Link
                            href={`/academy/tracks/${featuredCourse.slug}`}
                            onClick={onNavigate}
                            className={`block rounded-xl overflow-hidden border transition-all group ${
                              isActive(`/academy/tracks/${featuredCourse.slug}`)
                                ? "border-sky-400 shadow-md"
                                : "border-sky-200 hover:border-sky-400 hover:shadow-md"
                            }`}
                          >
                            <div className="bg-linear-to-br from-sky-700 to-indigo-800 px-3 py-3">
                              <div className="flex items-center gap-1 mb-1.5">
                                <StarIcon className="w-3 h-3 text-amber-300 shrink-0" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-sky-300">Featured</span>
                              </div>
                              <p className="text-[11px] font-bold text-white leading-snug group-hover:text-sky-100 transition-colors">
                                {featuredCourse.title}
                              </p>
                              {featuredCourse.subtitle && (
                                <p className="text-[10px] text-sky-300 leading-snug mt-0.5 line-clamp-2">
                                  {featuredCourse.subtitle}
                                </p>
                              )}
                            </div>
                            <div className="bg-sky-50 px-3 py-1.5 flex items-center justify-between">
                              {featuredCourse.estimated_hours > 0 && (
                                <span className="text-[10px] text-sky-600 font-medium">~{featuredCourse.estimated_hours}h</span>
                              )}
                              <span className="text-[10px] font-bold text-sky-700 group-hover:text-sky-800 ml-auto">
                                Start →
                              </span>
                            </div>
                          </Link>
                        </div>
                      )}
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
          href="/library"
          onClick={onNavigate}
          className={`flex items-center px-2 h-8 rounded-xl transition-colors ${
            isActive("/library")
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
