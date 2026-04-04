"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import NavDropdown from "./NavDropdown";
import {
  Bars3Icon,
  XMarkIcon,
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useTicker } from "@/components/TickerContext";
import { useSidebar } from "@/components/SidebarContext";
import TickerStrip from "@/components/TickerStrip";
import { usePathname } from "next/navigation";

// ─── COMPANY DROPDOWN (top bar) ─────────────────────────────────────────────
const companyItems = [
  { href: "/about", label: "About HTR" },
  { href: "/mission", label: "Mission & Vision" },
  { href: "/values", label: "Core Values" },
  { href: "/about/framework", label: "Our Framework" },
  { href: "/about/methodology", label: "Our Methodology" },
  { href: "/advisory/contact", label: "Contact Us" },
];

// ─── MEGA-MENU DATA ──────────────────────────────────────────────────────────

const pillars = [
  {
    id: "policy",
    label: "Policy",
    href: "/policy",
    color: "sky",
    dot: "bg-sky-500",
    accent: "text-sky-700",
    hoverBg: "hover:bg-sky-50",
    desc: "Regulation, mandates & global health law",
    items: [
      { href: "/policy/regulation", label: "Regulation & Legislation", desc: "Federal & state rule-making analysis" },
      { href: "/policy/mandates", label: "Public Health Mandates", desc: "Coverage requirements & enforcement" },
      { href: "/policy/global", label: "Global & Comparative Policy", desc: "International health system benchmarks" },
      { href: "/policy/feasibility", label: "Policy Feasibility Studies", desc: "Implementation viability assessments" },
    ],
  },
  {
    id: "economics",
    label: "Economics",
    href: "/economics",
    color: "emerald",
    dot: "bg-emerald-500",
    accent: "text-emerald-700",
    hoverBg: "hover:bg-emerald-50",
    desc: "Value-based care, markets & investment",
    items: [
      { href: "/economics/value", label: "Value-Based Care Models", desc: "APMs, bundled payments & outcomes" },
      { href: "/economics/market", label: "Market & Finance", desc: "Payer dynamics & cost structures" },
      { href: "/economics/cea", label: "Labor & Workforce Strategy", desc: "Staffing trends & compensation analysis" },
      { href: "/economics/investment", label: "Healthcare Investment Trends", desc: "M&A, PE activity & capital flows" },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    href: "/technology",
    color: "indigo",
    dot: "bg-indigo-500",
    accent: "text-indigo-700",
    hoverBg: "hover:bg-indigo-50",
    desc: "AI, digital health & data governance",
    items: [
      { href: "/technology/ai", label: "AI & Machine Learning", desc: "Clinical AI, NLP & decision support" },
      { href: "/technology/digital", label: "Digital Health & Telemedicine", desc: "RPM, virtual care & app ecosystems" },
      { href: "/technology/security", label: "Data Security & Governance", desc: "HIPAA, interoperability & trust frameworks" },
      { href: "/technology/workflow", label: "Tech-Enabled Workflow", desc: "Automation & operational efficiency" },
    ],
  },
  {
    id: "clinical",
    label: "Clinical",
    href: "/clinical",
    color: "red",
    dot: "bg-red-500",
    accent: "text-red-700",
    hoverBg: "hover:bg-red-50",
    desc: "Hospital-at-home, precision & virtual care",
    items: [
      { href: "/clinical/hah", label: "Hospital-at-Home", desc: "Acute care delivery outside hospital walls" },
      { href: "/clinical/precision", label: "Precision Medicine", desc: "Genomics, biomarkers & targeted therapy" },
      { href: "/clinical/virtual", label: "Virtual Care Models", desc: "Asynchronous & synchronous care design" },
    ],
  },
  {
    id: "equity",
    label: "Equity",
    href: "/equity",
    color: "amber",
    dot: "bg-amber-500",
    accent: "text-amber-700",
    hoverBg: "hover:bg-amber-50",
    desc: "SDOH, algorithmic bias & access disparity",
    items: [
      { href: "/equity/sdoh", label: "SDOH Integration", desc: "Social drivers embedded in care models" },
      { href: "/equity/bias", label: "Algorithmic Bias", desc: "Fairness audits & model accountability" },
      { href: "/equity/access", label: "Access Disparity", desc: "Rural, racial & economic access gaps" },
    ],
  },
];

type MegaMenuType = "intelligence" | "learn" | "analyze" | "states" | "advise" | null;

// ─── MEGA-MENU PANELS ────────────────────────────────────────────────────────

function IntelligencePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-6">
      <div className="grid grid-cols-5 gap-8">
        {pillars.map((p) => (
          <div key={p.id}>
            {/* Section header — same style as LEARN/ANALYZE/ADVISE */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className={`w-2 h-2 rounded-full ${p.dot} shrink-0`} />
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                {p.label}
              </p>
            </div>
            <div className="space-y-1">
              {/* Pillar overview — first item links to pillar root */}
              <Link
                href={p.href}
                onClick={onClose}
                className={`flex flex-col px-3 py-2.5 rounded-lg ${p.hoverBg} transition-colors group`}
              >
                <span className={`text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:${p.accent}`}>
                  {p.label} Overview
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{p.desc}</span>
              </Link>
              {/* Sub-items */}
              {p.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex flex-col px-3 py-2.5 rounded-lg ${p.hoverBg} transition-colors group`}
                >
                  <span className={`text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:${p.accent}`}>
                    {item.label}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-6">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Quick Access
        </span>
        {[
          { href: "/trending-topics", label: "Trending Topics" },
          { href: "/advisory/reports", label: "Latest Reports" },
          { href: "/search", label: "Search Intelligence" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
          >
            {link.label} →
          </Link>
        ))}
      </div>
    </div>
  );
}

function LearnPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-6">
      <div className="grid grid-cols-3 gap-8">
        {/* Start Here */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Start Here
          </p>
          <div className="space-y-1">
            <Link
              href="/academy"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-sky-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-700">
                Academy Hub
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Your full learning center
              </span>
            </Link>
            <Link
              href="/academy"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-sky-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-700">
                Personalized Learning
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                AI-powered paths tailored to you
              </span>
            </Link>
            <Link
              href="/academy/tracks"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-sky-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-700">
                Learning Tracks
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Structured multi-course programs
              </span>
            </Link>
          </div>
        </div>

        {/* Browse by Format */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Browse by Format
          </p>
          <div className="space-y-1">
            {[
              { href: "/academy/courses", label: "Courses", desc: "In-depth learning modules" },
              { href: "/academy/webinars", label: "Webinars", desc: "Live & recorded expert sessions" },
              { href: "/academy/case-studies", label: "Case Studies", desc: "Real-world transformation stories" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-sky-50 transition-colors group"
              >
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-700">
                  {item.label}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Reference */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Reference
          </p>
          <div className="space-y-1">
            <Link
              href="/academy/glossary"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-sky-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-700">
                Glossary
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Healthcare terminology A–Z
              </span>
            </Link>
            <Link
              href="/academy/faculty"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-sky-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-700">
                Faculty
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Meet our expert instructors
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyzePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-6">
      <div className="grid grid-cols-3 gap-8">
        {/* Interactive Tools */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Interactive Tools
          </p>
          <div className="space-y-1">
            <Link
              href="/research-lab"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-amber-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-700">
                Research Lab
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                19 interactive analytical tools
              </span>
            </Link>
            <Link
              href="/htr-simulator"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-amber-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-700">
                HTR Simulator
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                5-pillar transformation scenario modeler
              </span>
            </Link>
            <Link
              href="/hti-dashboard"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-amber-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-700">
                HTI Dashboard
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Health Transformation Index metrics
              </span>
            </Link>
          </div>
        </div>

        {/* Data & Signals */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Data &amp; Signals
          </p>
          <div className="space-y-1">
            <Link
              href="/trending-topics"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-emerald-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700">
                Trending Topics
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Real-time intelligence signals
              </span>
            </Link>
            <Link
              href="/the-wire"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-emerald-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700">
                The Wire
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Live health industry news feed
              </span>
            </Link>
            <Link
              href="/investment-tracker"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-emerald-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700">
                Investment Tracker
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                M&amp;A, PE &amp; capital flow monitoring
              </span>
            </Link>
          </div>
        </div>

        {/* Media & Reference */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Media &amp; Reference
          </p>
          <div className="space-y-1">
            <Link
              href="/multimedia"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-amber-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-700">
                Multimedia
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Videos, presentations &amp; infographics
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-6 py-6">
      <div className="grid grid-cols-2 gap-8" style={{ minWidth: "480px" }}>
        {/* State Initiatives */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            State Initiatives
          </p>
          <div className="space-y-1">
            <Link
              href="/vermont-act-167"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-rose-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-rose-700">
                Vermont Act 167
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Hospital transformation &amp; Oliver Wyman Report
              </span>
            </Link>
            <Link
              href="/california-calaim"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-rose-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-rose-700">
                California CalAIM
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                $6.7B Medi-Cal transformation
              </span>
            </Link>
            <Link
              href="/states"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-rose-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-rose-700">
                All States Explorer
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                50-state health reform map
              </span>
            </Link>
          </div>
        </div>
        {/* Dashboards & Models */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Dashboards &amp; Models
          </p>
          <div className="space-y-1">
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-rose-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-rose-700">
                50-State RHTP Dashboard
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Rural hospital performance index
              </span>
            </Link>
            <Link
              href="/ahead-model"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-rose-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-rose-700">
                AHEAD Model
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                All-payer total cost of care (6 states)
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvisePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-6">
      <div className="grid grid-cols-3 gap-8">
        {/* Advisory Services */}
        <div className="col-span-2">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Advisory Services
          </p>
          <div className="grid grid-cols-2 gap-1">
            {[
              { href: "/advisory", label: "Advisory Hub", desc: "Overview of all services" },
              { href: "/advisory/consulting", label: "Strategic Consulting", desc: "Full enterprise strategy" },
              { href: "/advisory/research", label: "Custom Research", desc: "Tailored analysis & insights" },
              { href: "/advisory/financial-audit", label: "Financial Audit", desc: "Reimbursement & cost analysis" },
              { href: "/advisory/regulatory", label: "Regulatory Counsel", desc: "Compliance & policy guidance" },
              { href: "/advisory/it-consulting", label: "IT Consulting", desc: "Tech strategy & implementation" },
              { href: "/advisory/training", label: "Training & Education", desc: "Executive programs" },
              { href: "/advisory/independent-review", label: "Independent Review", desc: "Third-party validation" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-700">
                  {item.label}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Connect & Community */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Connect &amp; Community
          </p>
          <div className="space-y-1">
            <Link
              href="/connect-hub"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-700">
                Connect Hub
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Networking & peer connections
              </span>
            </Link>
            <Link
              href="/community"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-700">
                Community
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Forums, events & collaboration
              </span>
            </Link>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              href="/advisory/contact"
              onClick={onClose}
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 px-4 rounded-lg transition-colors"
            >
              Book a Discovery Call →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN HEADER COMPONENT ───────────────────────────────────────────────────

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isStudio = pathname?.startsWith("/studio");

  const [dateString, setDateString] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuType>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isHeaderVisible, setHeaderVisible } = useTicker();
  const { toggleLeft, toggleRight, setLeftOpen, setRightOpen } = useSidebar();
  const isChatPage = pathname === "/chat";

  const handleToggleLeft = () => {
    if (isChatPage) { setLeftOpen(true); router.push("/"); } else { toggleLeft(); }
  };
  const handleToggleRight = () => {
    if (isChatPage) { setRightOpen(true); router.push("/"); } else { toggleRight(); }
  };

  const [headlines, setHeadlines] = useState<{ text: string; url: string }[]>([
    { text: "Loading Intelligence...", url: "#" },
  ]);

  useEffect(() => {
    setDateString(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );

    async function fetchTicker() {
      try {
        const res = await fetch("/api/ticker");
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        if (data.headlines && Array.isArray(data.headlines) && data.headlines.length > 0) {
          setHeadlines(data.headlines);
        }
      } catch {
        setHeadlines([
          { text: "INSOLVENCY ALERT: NVRH projects $75M Deficit", url: "/dashboard/vermont/nvrh" },
          { text: "MARKET MOVER: Medicare Advantage Denials Rise 12%", url: "/economics/market" },
          { text: "STATE PROFILE: Vermont Rated CRITICAL (42/100)", url: "/dashboard/vermont" },
        ]);
      }
    }
    fetchTicker();
  }, []);

  // Close mega menu on navigation
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setMobileMenuOpen(false);
    setSearchQuery("");
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const openMegaMenu = (type: MegaMenuType) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setActiveMegaMenu(type);
  };

  const closeMegaMenu = () => {
    megaMenuTimeoutRef.current = setTimeout(() => setActiveMegaMenu(null), 150);
  };

  const cancelClose = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
  };

  const megaMenuItems: { type: MegaMenuType; label: string; activeCheck: string }[] = [
    { type: "intelligence", label: "INTELLIGENCE", activeCheck: "/policy,/economics,/technology,/clinical,/equity" },
    { type: "learn", label: "LEARN", activeCheck: "/academy" },
    { type: "analyze", label: "ANALYZE & TOOLS", activeCheck: "/research-lab,/htr-simulator,/hti-dashboard,/trending-topics,/multimedia,/the-wire,/investment-tracker" },
    { type: "states", label: "STATES & PROGRAMS", activeCheck: "/states,/vermont-act-167,/california-calaim,/dashboard,/ahead-model" },
    { type: "advise", label: "ADVISORY & SERVICES", activeCheck: "/advisory,/connect-hub,/connect,/community" },
  ];

  const isMenuActive = (activeCheck: string) =>
    activeCheck.split(",").some((p) => {
      const path = p.trim();
      return path && (pathname === path || pathname.startsWith(path + "/"));
    });

  return (
    <header className="sticky top-0 z-50 flex flex-col font-sans bg-white dark:bg-slate-900">
      {/* 1. TOP BAR */}
      <div className="bg-black text-zinc-300 text-[10px] font-bold tracking-wider uppercase py-1 border-b border-neutral-800 w-full relative z-50">
        <div className="w-full px-4 flex items-center h-full gap-0">
          <div className="w-85 shrink-0 flex items-center">
            <span className="hidden lg:block opacity-70 whitespace-nowrap">{dateString}</span>
          </div>
          <div className="flex-1 flex items-center overflow-hidden min-w-0 pr-32">
            <TickerStrip
              tickerData={{ headlines }}
              isVisible={isHeaderVisible}
              onToggle={() => setHeaderVisible(!isHeaderVisible)}
              label="DAILY INSIGHT"
              theme="dark"
              transparent={true}
            />
          </div>
          <div className="hidden lg:flex items-center gap-6 whitespace-nowrap">
            <Link href="/faq" className="text-white hover:text-zinc-300 transition-colors">
              FAQ
            </Link>
            <div className="h-3 w-px bg-neutral-700" />
            <NavDropdown
              label="COMPANY"
              items={companyItems}
              buttonClassName="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase hover:text-zinc-300 transition-colors text-white"
            />
            <div className="h-3 w-px bg-neutral-700" />
            <Link href="/login" className="text-white hover:text-zinc-300 transition-colors">
              Login
            </Link>
            <Link
              href="/subscribe"
              className="bg-white text-black px-3 py-0.5 rounded-sm hover:bg-zinc-100 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV BAR */}
      <div className="bg-white dark:bg-slate-900 py-1 border-b border-slate-200 dark:border-slate-700 w-full relative">
        <div className="w-full px-4 flex items-center gap-0">

          {/* LEFT: Toggle + Logo — w-125 matches AppShell breadcrumbs spacer for column alignment */}
          <div className="w-125 shrink-0 flex items-center gap-3">
            {!isStudio && (
              <button
                onClick={handleToggleLeft}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-md transition-colors"
                title="Toggle Navigation"
                aria-label="Toggle navigation sidebar"
              >
                <Bars3BottomLeftIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            )}
            <Link href="/" className="z-50 relative">
              <Logo />
            </Link>
          </div>

          {/* NAV: Mega-menu buttons — starts at same x as SYSTEM VITALS in AppShell sticky bar */}
          <nav className="hidden xl:flex items-center gap-6 h-8 shrink-0 mr-4 -ml-40">
            {megaMenuItems.map(({ type, label, activeCheck }) => {
              const active = isMenuActive(activeCheck);
              const isOpen = activeMegaMenu === type;
              return (
                <div key={type} className="relative">
                  <button
                    onMouseEnter={() => openMegaMenu(type)}
                    onMouseLeave={closeMegaMenu}
                    onClick={() => setActiveMegaMenu(isOpen ? null : type)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setActiveMegaMenu(null);
                      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveMegaMenu(isOpen ? null : type); }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-extrabold uppercase tracking-wide rounded-md transition-all duration-150 ${
                      isOpen
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
                    }`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={`megamenu-${type}`}
                  >
                    {label}
                    <ChevronDownIcon
                      className={`w-3 h-3 opacity-60 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {/* Panel drops down aligned to this button's left edge */}
                  {isOpen && (
                    <div
                      id={`megamenu-${type}`}
                      role="region"
                      aria-label={`${type} navigation`}
                      className="absolute top-full left-0 z-50 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl w-auto min-w-max"
                      onMouseEnter={cancelClose}
                      onMouseLeave={closeMegaMenu}
                      onKeyDown={(e) => { if (e.key === "Escape") setActiveMegaMenu(null); }}
                    >
                      {type === "intelligence" && <IntelligencePanel onClose={() => setActiveMegaMenu(null)} />}
                      {type === "learn" && <LearnPanel onClose={() => setActiveMegaMenu(null)} />}
                      {type === "analyze" && <AnalyzePanel onClose={() => setActiveMegaMenu(null)} />}
                      {type === "states" && <StatesPanel onClose={() => setActiveMegaMenu(null)} />}
                      {type === "advise" && <AdvisePanel onClose={() => setActiveMegaMenu(null)} />}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* SEARCH: fills all remaining space */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 min-w-0">
            <div className="relative w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearchQuery("")}
                placeholder="Search articles, modules, definitions…"
                className="w-full pl-9 pr-24 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 focus:bg-white dark:focus:bg-slate-700 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-[10px] font-bold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded text-slate-400 dark:text-slate-500 hidden lg:block">⌘K</span>
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-default px-2.5 py-1 rounded-md transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* RIGHT: w-87.5 mirrors AppShell right spacer — search flex-1 ends at same x as tickers */}
          <div className="w-87.5 shrink-0 flex items-center justify-end gap-1">
            <DarkModeToggle />
            {!isStudio && (
              <button
                onClick={handleToggleRight}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-md transition-colors"
                title="Toggle AI Analyst"
                aria-label="Toggle AI Analyst sidebar"
              >
                <Bars3BottomRightIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            )}
            <div className="xl:hidden">
              <button
                className="p-2 text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="w-8 h-8" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="w-8 h-8" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-xl xl:hidden flex flex-col animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto"
          >
            {/* Mobile Search */}
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, modules, definitions…"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 px-4 py-2.5 rounded-lg transition-colors shrink-0"
                >
                  Go
                </button>
              </form>
            </div>

            {/* Mobile section headers */}
            {[
              {
                key: "intelligence",
                label: "INTELLIGENCE",
                children: pillars.map((p) => ({
                  label: p.label,
                  href: p.href,
                  sub: p.items,
                })),
              },
              {
                key: "learn",
                label: "LEARN",
                children: [
                  { label: "Personalized Learning", href: "/academy/personalized-learning", sub: [] },
                  { label: "Learning Tracks", href: "/academy/tracks", sub: [] },
                  { label: "Courses", href: "/academy/courses", sub: [] },
                  { label: "Webinars", href: "/academy/webinars", sub: [] },
                  { label: "Case Studies", href: "/academy/case-studies", sub: [] },
                  { label: "Glossary", href: "/academy/glossary", sub: [] },
                  { label: "Faculty", href: "/academy/faculty", sub: [] },
                ],
              },
              {
                key: "analyze",
                label: "ANALYZE & TOOLS",
                children: [
                  { label: "Research Lab", href: "/research-lab", sub: [] },
                  { label: "HTR Simulator", href: "/htr-simulator", sub: [] },
                  { label: "HTI Dashboard", href: "/hti-dashboard", sub: [] },
                  { label: "The Wire", href: "/the-wire", sub: [] },
                  { label: "Investment Tracker", href: "/investment-tracker", sub: [] },
                  { label: "Trending Topics", href: "/trending-topics", sub: [] },
                  { label: "Multimedia", href: "/multimedia", sub: [] },
                ],
              },
              {
                key: "states",
                label: "STATES & PROGRAMS",
                children: [
                  { label: "Vermont Act 167", href: "/vermont-act-167", sub: [] },
                  { label: "California CalAIM", href: "/california-calaim", sub: [] },
                  { label: "All States Explorer", href: "/states", sub: [] },
                  { label: "50-State Dashboard", href: "/dashboard", sub: [] },
                  { label: "AHEAD Model", href: "/ahead-model", sub: [] },
                ],
              },
              {
                key: "advise",
                label: "ADVISORY & SERVICES",
                children: [
                  { label: "Advisory Hub", href: "/advisory", sub: [] },
                  { label: "Strategic Consulting", href: "/advisory/consulting", sub: [] },
                  { label: "Custom Research", href: "/advisory/research", sub: [] },
                  { label: "Connect Hub", href: "/connect-hub", sub: [] },
                ],
              },
            ].map((section) => (
              <div key={section.key} className="border-b border-slate-100 dark:border-slate-700 last:border-0">
                <button
                  onClick={() =>
                    setMobileSection(mobileSection === section.key ? null : section.key)
                  }
                  className="w-full flex items-center justify-between px-4 py-3 font-black text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  {section.label}
                  <ChevronDownIcon
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileSection === section.key ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileSection === section.key && (
                  <div className="py-2">
                    {section.children.map((child) => (
                      <div key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-6 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
                        >
                          {child.label}
                        </Link>
                        {child.sub.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block pl-10 pr-4 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth + Quick Links */}
            <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-4 flex flex-col gap-3">
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-bold py-2.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/subscribe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 rounded-lg transition-colors"
                >
                  Subscribe
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
                <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-600">FAQ</Link>
                <span>·</span>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-600">About</Link>
                <span>·</span>
                <Link href="/advisory/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-600">Contact</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
