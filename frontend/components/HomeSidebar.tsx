// frontend/components/HomeSidebar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  UsersIcon,
  ChevronUpIcon,
  ChevronDownIcon,
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
} from "@heroicons/react/24/outline";

interface HomeSidebarProps {
  onNavigate?: () => void;
}

const pillarData = [
  {
    id: "policy",
    label: "Policy",
    href: "/policy",
    dot: "bg-sky-500",
    activeText: "text-sky-700",
    activeBg: "bg-sky-50",
    hoverBg: "hover:bg-sky-50",
    subHover: "hover:bg-sky-50 hover:text-sky-800",
    activeSubBg: "bg-sky-50",
    activeSubText: "text-sky-700 font-bold",
    items: [
      { href: "/policy/regulation", label: "Regulation & Legislation" },
      { href: "/policy/mandates", label: "Public Health Mandates" },
      { href: "/policy/global", label: "Global & Comparative Policy" },
      { href: "/policy/feasibility", label: "Policy Feasibility Studies" },
    ],
  },
  {
    id: "economics",
    label: "Economics",
    href: "/economics",
    dot: "bg-emerald-500",
    activeText: "text-emerald-700",
    activeBg: "bg-emerald-50",
    hoverBg: "hover:bg-emerald-50",
    subHover: "hover:bg-emerald-50 hover:text-emerald-800",
    activeSubBg: "bg-emerald-50",
    activeSubText: "text-emerald-700 font-bold",
    items: [
      { href: "/economics/value", label: "Value-Based Care Models" },
      { href: "/economics/market", label: "Market & Finance" },
      { href: "/economics/cea", label: "Labor & Workforce Strategy" },
      { href: "/economics/investment", label: "Healthcare Investment Trends" },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    href: "/technology",
    dot: "bg-indigo-500",
    activeText: "text-indigo-700",
    activeBg: "bg-indigo-50",
    hoverBg: "hover:bg-indigo-50",
    subHover: "hover:bg-indigo-50 hover:text-indigo-800",
    activeSubBg: "bg-indigo-50",
    activeSubText: "text-indigo-700 font-bold",
    items: [
      { href: "/technology/ai", label: "AI & Machine Learning" },
      { href: "/technology/digital", label: "Digital Health & Telemedicine" },
      { href: "/technology/security", label: "Data Security & Governance" },
      { href: "/technology/workflow", label: "Tech-Enabled Workflow" },
    ],
  },
  {
    id: "clinical",
    label: "Clinical",
    href: "/clinical",
    dot: "bg-red-500",
    activeText: "text-red-700",
    activeBg: "bg-red-50",
    hoverBg: "hover:bg-red-50",
    subHover: "hover:bg-red-50 hover:text-red-800",
    activeSubBg: "bg-red-50",
    activeSubText: "text-red-700 font-bold",
    items: [
      { href: "/clinical/hah", label: "Hospital-at-Home" },
      { href: "/clinical/precision", label: "Precision Medicine" },
      { href: "/clinical/virtual", label: "Virtual Care Models" },
    ],
  },
  {
    id: "equity",
    label: "Equity",
    href: "/equity",
    dot: "bg-amber-500",
    activeText: "text-amber-700",
    activeBg: "bg-amber-50",
    hoverBg: "hover:bg-amber-50",
    subHover: "hover:bg-amber-50 hover:text-amber-800",
    activeSubBg: "bg-amber-50",
    activeSubText: "text-amber-700 font-bold",
    items: [
      { href: "/equity/sdoh", label: "SDOH Integration" },
      { href: "/equity/bias", label: "Algorithmic Bias" },
      { href: "/equity/access", label: "Access Disparity" },
    ],
  },
];

export default function HomeSidebar({ onNavigate }: HomeSidebarProps) {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const topSentinelRef = useRef<HTMLDivElement>(null);

  // Which pillar accordions are expanded
  const [expandedPillars, setExpandedPillars] = useState<Set<string>>(
    new Set<string>()
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Auto-expand the active pillar on route change
  useEffect(() => {
    const activePillar = pillarData.find((p) =>
      pathname.startsWith(`/${p.id}`)
    );
    if (activePillar) {
      setExpandedPillars((prev) => {
        const next = new Set(prev);
        next.add(activePillar.id);
        return next;
      });
    }
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowBackToTop(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (topSentinelRef.current) observer.observe(topSentinelRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector(".overflow-y-auto");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const togglePillar = (id: string) => {
    setExpandedPillars((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className="relative flex flex-col h-full min-h-full">
      <div
        ref={topSentinelRef}
        className="absolute top-0 left-0 w-full h-1 pointer-events-none"
      />
      <div>
        <div className="space-y-3">

          {/* ── INTELLIGENCE ─────────────────────────────────────────── */}
          <div className="rounded-xl overflow-hidden border border-slate-200 border-l-4 border-l-slate-500 shadow-sm">
            <div className="bg-slate-100 px-3 py-2 border-b border-slate-200">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
                Intelligence
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {pillarData.map((pillar) => {
                const isExpanded = expandedPillars.has(pillar.id);
                const isPillarActive = pathname.startsWith(`/${pillar.id}`);
                return (
                  <div key={pillar.id}>
                    {/* Pillar row */}
                    <div
                      className={`flex items-center transition-colors ${
                        isPillarActive ? pillar.activeBg : "bg-white"
                      } ${!isPillarActive ? pillar.hoverBg : ""}`}
                    >
                      <Link
                        href={pillar.href}
                        onClick={onNavigate}
                        className="flex items-center gap-3 px-3 py-2.5 flex-1 min-w-0"
                      >
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${pillar.dot}`}
                        />
                        <span
                          className={`text-sm font-bold ${
                            isPillarActive
                              ? pillar.activeText
                              : "text-slate-700"
                          }`}
                        >
                          {pillar.label}
                        </span>
                      </Link>
                      <button
                        onClick={() => togglePillar(pillar.id)}
                        className="px-3 py-2.5 text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${pillar.label}`}
                      >
                        <ChevronDownIcon
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Subcategories accordion */}
                    {isExpanded && (
                      <div className="border-t border-slate-100">
                        {pillar.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={`flex items-center gap-2 pl-7 pr-3 py-2 text-xs transition-colors ${
                              isActive(item.href)
                                ? `${pillar.activeSubBg} ${pillar.activeSubText}`
                                : `text-slate-500 bg-slate-50 ${pillar.subHover}`
                            }`}
                          >
                            <ChevronRightIcon className="w-2.5 h-2.5 shrink-0 opacity-40" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── LEARN ────────────────────────────────────────────────── */}
          <div className="rounded-xl overflow-hidden border border-sky-200 border-l-4 border-l-sky-500 shadow-sm">
            <div className="bg-sky-50 px-3 py-2 border-b border-sky-200">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-sky-700">
                Learn
              </span>
            </div>
            <div className="divide-y divide-sky-100">
              <Link
                href="/academy"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  pathname === "/academy"
                    ? "bg-sky-50"
                    : "bg-white hover:bg-sky-50"
                }`}
              >
                <AcademicCapIcon className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                  Academy Hub
                </span>
              </Link>
              <Link
                href="/academy"
                onClick={onNavigate}
                className="flex items-center gap-3 px-3 py-2.5 transition-colors group bg-white hover:bg-sky-50"
              >
                <SparklesIcon className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 block leading-tight">
                    Personalized Learning
                  </span>
                  <span className="text-[10px] text-slate-400">
                    AI-powered paths
                  </span>
                </div>
              </Link>
              <Link
                href="/academy/tracks"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/academy/tracks")
                    ? "bg-sky-50"
                    : "bg-white hover:bg-sky-50"
                }`}
              >
                <TableCellsIcon className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                  Learning Tracks
                </span>
              </Link>
              <Link
                href="/academy/courses"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/academy/courses")
                    ? "bg-sky-50"
                    : "bg-white hover:bg-sky-50"
                }`}
              >
                <BookOpenIcon className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                  Courses
                </span>
              </Link>
              <Link
                href="/academy/webinars"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/academy/webinars")
                    ? "bg-sky-50"
                    : "bg-white hover:bg-sky-50"
                }`}
              >
                <PresentationChartLineIcon className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                  Webinars
                </span>
              </Link>
              <Link
                href="/academy/case-studies"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/academy/case-studies")
                    ? "bg-sky-50"
                    : "bg-white hover:bg-sky-50"
                }`}
              >
                <DocumentTextIcon className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                  Case Studies
                </span>
              </Link>
              <Link
                href="/academy/glossary"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/academy/glossary")
                    ? "bg-sky-50"
                    : "bg-white hover:bg-sky-50"
                }`}
              >
                <BookOpenIcon className="w-4 h-4 text-sky-300 shrink-0" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                  Glossary
                </span>
              </Link>
            </div>
          </div>

          {/* ── ANALYZE & TOOLS ──────────────────────────────────────── */}
          <div className="rounded-xl overflow-hidden border border-amber-200 border-l-4 border-l-amber-500 shadow-sm">
            <div className="bg-amber-50 px-3 py-2 border-b border-amber-200">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-amber-700">
                Analyze &amp; Tools
              </span>
            </div>
            <div className="divide-y divide-amber-100">
              <Link
                href="/research-lab"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/research-lab")
                    ? "bg-amber-50"
                    : "bg-white hover:bg-amber-50"
                }`}
              >
                <BeakerIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 block leading-tight">
                    Research Lab
                  </span>
                  <span className="text-[10px] text-slate-400">
                    19 interactive tools
                  </span>
                </div>
              </Link>
              <Link
                href="/htr-simulator"
                onClick={onNavigate}
                title="HTR Simulator — model health transformation scenarios across all 5 pillars"
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/htr-simulator")
                    ? "bg-amber-50"
                    : "bg-white hover:bg-amber-50"
                }`}
              >
                <CpuChipIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 block leading-tight">
                    HTR Simulator
                  </span>
                  <span className="text-[10px] text-slate-400">
                    5-pillar scenario modeler
                  </span>
                </div>
              </Link>
              <Link
                href="/dashboard"
                onClick={onNavigate}
                title="50-State Dashboard — Rural Health Transformation program data"
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/dashboard")
                    ? "bg-amber-50"
                    : "bg-white hover:bg-amber-50"
                }`}
              >
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <Image
                    src="/rhtp-icon.png"
                    alt=""
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 block leading-tight">
                    50-State Dashboard
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Rural Health Transformation
                  </span>
                </div>
              </Link>
              <Link
                href="/ahead-model"
                onClick={onNavigate}
                title="AHEAD Model — CMS all-payer total cost of care model"
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/ahead-model")
                    ? "bg-amber-50"
                    : "bg-white hover:bg-amber-50"
                }`}
              >
                <div className="w-4 h-4 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black flex items-center justify-center shrink-0">
                  AH
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 block leading-tight">
                    AHEAD Model
                  </span>
                  <span className="text-[10px] text-slate-400">
                    All-payer cost of care
                  </span>
                </div>
              </Link>
              <Link
                href="/multimedia"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/multimedia")
                    ? "bg-amber-50"
                    : "bg-white hover:bg-amber-50"
                }`}
              >
                <FilmIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                  Multimedia
                </span>
              </Link>
              <Link
                href="/trending-topics"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/trending-topics")
                    ? "bg-amber-50"
                    : "bg-white hover:bg-amber-50"
                }`}
              >
                <ArrowTrendingUpIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                  Trending Topics
                </span>
              </Link>
            </div>
          </div>

          {/* ── STATE INITIATIVES ────────────────────────────────────── */}
          <div className="rounded-xl overflow-hidden border border-rose-200 border-l-4 border-l-rose-500 shadow-sm">
            <div className="bg-rose-50 px-3 py-2 border-b border-rose-200">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-rose-700">
                State Initiatives
              </span>
            </div>
            <div className="divide-y divide-rose-100">
              <Link
                href="/vermont-act-167"
                onClick={onNavigate}
                title="Vermont Act 167 — Hospital transformation & Oliver Wyman Report"
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/vermont-act-167")
                    ? "bg-rose-50"
                    : "bg-white hover:bg-rose-50"
                }`}
              >
                <MapPinIcon className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-tight">
                  Vermont Act 167
                </span>
              </Link>
              <Link
                href="/california-calaim"
                onClick={onNavigate}
                title="CalAIM — California's $6.7B Medi-Cal transformation"
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/california-calaim")
                    ? "bg-rose-50"
                    : "bg-white hover:bg-rose-50"
                }`}
              >
                <div className="w-4 h-4 rounded bg-rose-100 text-rose-700 text-[9px] font-black flex items-center justify-center shrink-0">
                  CA
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-tight">
                  California CalAIM
                </span>
              </Link>
              <Link
                href="/states"
                onClick={onNavigate}
                title="Explore health reform initiatives across all 50 states"
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/states")
                    ? "bg-rose-50"
                    : "bg-white hover:bg-rose-50"
                }`}
              >
                <GlobeAmericasIcon className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 leading-tight">
                  All States Explorer
                </span>
              </Link>
            </div>
          </div>

          {/* ── ADVISORY & SERVICES ──────────────────────────────────── */}
          <div className="rounded-xl overflow-hidden border border-indigo-200 border-l-4 border-l-indigo-500 shadow-sm">
            <div className="bg-indigo-50 px-3 py-2 border-b border-indigo-200">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-700">
                Advisory &amp; Services
              </span>
            </div>
            <div className="divide-y divide-indigo-100">
              <Link
                href="/advisory"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/advisory") || isActive("/advisory-hub")
                    ? "bg-indigo-50"
                    : "bg-white hover:bg-indigo-50"
                }`}
              >
                <BriefcaseIcon className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                  Advisory Hub
                </span>
              </Link>
              <Link
                href="/connect-hub"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                  isActive("/connect-hub")
                    ? "bg-indigo-50"
                    : "bg-white hover:bg-indigo-50"
                }`}
              >
                <UsersIcon className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                  Connect Hub
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="sticky bottom-0 bg-white pt-4 pb-6 mt-auto border-t border-slate-100 z-20 -mx-4 px-4 -mb-4">
        <button
          onClick={scrollToTop}
          className={`w-full flex items-center justify-center gap-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all duration-300 text-[10px] font-bold uppercase tracking-wider overflow-hidden ${
            showBackToTop
              ? "opacity-100 max-h-10 py-2"
              : "opacity-0 max-h-0 py-0 pointer-events-none"
          }`}
        >
          <ChevronUpIcon className="w-3 h-3" />
          Back to Top
        </button>
      </div>
    </aside>
  );
}
