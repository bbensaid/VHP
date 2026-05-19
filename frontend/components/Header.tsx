"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import BackendStatus from "./BackendStatus";
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
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import { useVoice } from "@/components/VoiceContext";

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

import { PILLARS, type PillarId } from "@/lib/taxonomy";

// Header mega-menu items are more verbose than the sidebar (they carry a `desc`
// per item). Pillar identity comes from taxonomy; per-item descriptions are
// header-specific copy.

interface MegaMenuItem {
  href: string;
  label: string;
  desc: string;
}

const PILLAR_MENU_ITEMS: Record<PillarId, MegaMenuItem[]> = {
  policy: [
    { href: "/policy/regulation", label: "Regulation & Legislation", desc: "Federal & state rule-making analysis" },
    { href: "/policy/mandates", label: "Public Health Mandates", desc: "Coverage requirements & enforcement" },
    { href: "/policy/global", label: "Global & Comparative Policy", desc: "International health system benchmarks" },
    { href: "/policy/feasibility", label: "Policy Feasibility Studies", desc: "Implementation viability assessments" },
  ],
  economics: [
    { href: "/economics/value", label: "Value-Based Care Models", desc: "APMs, bundled payments & outcomes" },
    { href: "/economics/market", label: "Market & Finance", desc: "Payer dynamics & cost structures" },
    { href: "/economics/cea", label: "Labor & Workforce Strategy", desc: "Staffing trends & compensation analysis" },
    { href: "/economics/investment", label: "Healthcare Investment Trends", desc: "M&A, PE activity & capital flows" },
  ],
  technology: [
    { href: "/technology/ai", label: "AI & Machine Learning", desc: "Clinical AI, NLP & decision support" },
    { href: "/technology/digital", label: "Digital Health & Telemedicine", desc: "RPM, virtual care & app ecosystems" },
    { href: "/technology/security", label: "Data Security & Governance", desc: "HIPAA, interoperability & trust frameworks" },
    { href: "/technology/workflow", label: "Tech-Enabled Workflow", desc: "Automation & operational efficiency" },
  ],
  clinical: [
    { href: "/clinical/hah", label: "Hospital-at-Home", desc: "Acute care delivery outside hospital walls" },
    { href: "/clinical/precision", label: "Precision Medicine", desc: "Genomics, biomarkers & targeted therapy" },
    { href: "/clinical/virtual", label: "Virtual Care Models", desc: "Asynchronous & synchronous care design" },
    { href: "/clinical/genomics", label: "Genomics & Predictive Medicine", desc: "Pharmacogenomics, polygenic risk scores & AI early warning" },
    { href: "/clinical/population", label: "Population Health Management", desc: "Chronic disease at scale, risk stratification & preventive care" },
  ],
  equity: [
    { href: "/equity/sdoh", label: "SDOH Integration", desc: "Social drivers embedded in care models" },
    { href: "/equity/bias", label: "Algorithmic Bias", desc: "Fairness audits & model accountability" },
    { href: "/equity/access", label: "Access Disparity", desc: "Rural, racial & economic access gaps" },
  ],
  operations: [
    { href: "/operations/revenue-cycle", label: "Revenue Cycle Management", desc: "Billing, coding, claims & denial management" },
    { href: "/operations/workforce", label: "Workforce & Human Capital", desc: "Staffing, credentialing & labor strategy" },
    { href: "/operations/compliance", label: "Quality, Compliance & Risk", desc: "Accreditation, HIPAA & patient safety" },
    { href: "/operations/supply-chain", label: "Supply Chain & Infrastructure", desc: "Procurement, logistics & facilities" },
    { href: "/operations/payer-network", label: "Payer & Network Operations", desc: "Utilization management & network contracting" },
  ],
};

// Generated from PILLARS — same shape as the previous hand-written array so the
// IntelligencePanel render below works unchanged.
const pillars = PILLARS.map((p) => ({
  id: p.id,
  label: p.label,
  href: p.href,
  color: p.color,
  dot: p.classes.dot,
  accent: p.classes.headerColor,
  hoverBg: p.classes.hoverBg,
  desc: p.desc,
  items: PILLAR_MENU_ITEMS[p.id],
}));

type MegaMenuType = "intelligence" | "learn" | "tools" | "states" | "advise" | null;

// ─── MEGA-MENU PANELS ────────────────────────────────────────────────────────


function IntelligencePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-8 py-6">
      <div className="grid grid-cols-6 gap-6" style={{ width: "min(1200px, 92vw)" }}>
        {pillars.map((p) => {
          return (
            <div key={p.id}>
              <div className="flex items-center gap-1.5 mb-4">
                <span className={`w-2 h-2 rounded-full ${p.dot} shrink-0`} />
                <p className={`text-xs font-black uppercase tracking-widest ${p.accent}`}>{p.label}</p>
              </div>
              <div className="space-y-1">
                {/* Pillar overview */}
                <Link href={p.href} onClick={onClose}
                  className={`flex flex-col px-3 py-2.5 rounded-lg ${p.hoverBg} transition-colors group`}>
                  <span className={`text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:${p.accent}`}>{p.label} Overview</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{p.desc}</span>
                </Link>
                {/* Intelligence sub-items */}
                {p.items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={onClose}
                    className={`flex flex-col px-3 py-2.5 rounded-lg ${p.hoverBg} transition-colors group`}>
                    <span className={`text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:${p.accent}`}>{item.label}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LearnPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-3 gap-8">
        {/* Start Here */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-rose-600 mb-3">
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
          <p className="text-xs font-black uppercase tracking-widest text-rose-600 mb-3">
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
          <p className="text-xs font-black uppercase tracking-widest text-rose-600 mb-3">
            Reference
          </p>
          <div className="space-y-1">
            <Link
              href="/book"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors group border border-indigo-100 bg-indigo-50/50"
            >
              <span className="flex items-center gap-1.5 text-sm font-bold text-indigo-800 dark:text-indigo-300 group-hover:text-indigo-900">
                <span className="text-base">📖</span>
                The Book
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                <em>Transforming American Healthcare</em> — 20 chapters, 6 pillars
              </span>
            </Link>
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
              href="/academy/medicaid"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-rose-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-rose-700">
                Medicaid Learning Center
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                Vermont Medicaid courses, webinars &amp; glossary
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

function ToolsPanel({ onClose }: { onClose: () => void }) {
  const hdr = "text-xs font-black uppercase tracking-widest text-rose-600 mb-3";
  const sec = "mt-5 pt-4 border-t border-slate-100 dark:border-slate-700";
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-3 gap-8">

        {/* Simulators */}
        <div>
          <p className={hdr}>Simulators</p>
          <div className="space-y-1">
            {[
              { href: "/htr-simulator", label: "HTR Simulator", desc: "6-pillar transformation scenario modeler" },
              { href: "/medicaid-eligibility-simulator", label: "Medicaid Eligibility", desc: "Vermont Medicaid screening — 5 steps" },
              { href: "/impact-simulation", label: "Impact Simulation", desc: "Cross-pillar scenario modeling" },
              { href: "/transformation-friction-index", label: "Friction Index", desc: "Policy complexity vs. operational readiness" },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose}
                className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-amber-50 transition-colors group">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-700">{item.label}</span>
                <span className="text-xs text-slate-400 mt-0.5">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Data & Signals */}
        <div>
          <p className={hdr}>Data &amp; Signals</p>
          <div className="space-y-1">
            {[
              { href: "/trending-topics", label: "Trending Topics", desc: "Real-time intelligence signals" },
              { href: "/the-wire", label: "The Wire", desc: "Live health industry news feed" },
              { href: "/investment-tracker", label: "Investment Tracker", desc: "M&A, PE & capital flow monitoring" },
              { href: "/hti-dashboard", label: "HTI Dashboard", desc: "Health Transformation Index metrics" },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose}
                className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-emerald-50 transition-colors group">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700">{item.label}</span>
                <span className="text-xs text-slate-400 mt-0.5">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Media + Research Lab */}
        <div>
          <p className={hdr}>Media</p>
          <div className="space-y-1">
            <Link href="/multimedia" onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-amber-50 transition-colors group">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-700">Multimedia</span>
              <span className="text-xs text-slate-400 mt-0.5">Videos, presentations &amp; infographics</span>
            </Link>
          </div>
          <div className={sec}>
            <p className={hdr}>Research Lab</p>
            {[
              { href: "/research-lab", label: "All 24 Lab Tools", desc: "Browse the full analytical tool directory" },
              { href: "/research-lab/vbc-clinical-quality?tab=hl7", label: "Clinical Data Exchange Lab", desc: "HL7 v2, FHIR R4, USCDI — 8 Vermont patient scenarios" },
              { href: "/research-lab/vbc-clinical-quality?tab=quality", label: "VBC Quality Measures", desc: "HEDIS, 30-day readmissions, avoidable ED" },
              { href: "/research-lab/vbc-clinical-quality?tab=value", label: "High vs. Low Value Care", desc: "A1C/BP panel mgmt, Choosing Wisely, TCOC" },
              { href: "/research-lab/vbc-clinical-quality?tab=risk", label: "Risk Stratification Methodology", desc: "HCC walkthrough, CDPS, VCCI scoring, algorithm comparison" },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose}
                className="flex flex-col px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors group mb-0.5">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-700">{item.label}</span>
                <span className="text-xs text-slate-400 mt-0.5">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function StatesPanel({ onClose }: { onClose: () => void }) {
  const linkCls = "flex flex-col px-3 py-2.5 rounded-lg hover:bg-rose-50 transition-colors group";
  const titleCls = "text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-rose-700";
  const descCls = "text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-snug";
  const hdr = "text-xs font-black uppercase tracking-widest text-rose-600 mb-3";
  const sec = "mt-5 pt-4 border-t border-slate-100 dark:border-slate-700";

  const vtPrograms = [
    { href: "/vermont-medicaid",             label: "Vermont Medicaid",              desc: "Programs, eligibility & enrollment guide" },
    { href: "/vermont-blueprint",            label: "Blueprint for Health",           desc: "128 PCMHs, Community Health Teams, Mental Health Integration — Vermont's primary care backbone" },
    { href: "/vermont-vcci",                 label: "Vermont VCCI",                   desc: "Chronic Care Initiative — intensive case management for Vermont's top 5% highest-cost Medicaid members" },
    { href: "/vermont-rht-program",          label: "Vermont RHT Program",            desc: "$195M federal Rural Health Transformation award — financing Vermont's Act 68 agenda" },
    { href: "/vermont-sash",                 label: "SASH Program",                   desc: "Support and Services at Home — housing-based care coordination for 13,000+ Vermont seniors" },
    { href: "/vermont-designated-agencies",  label: "Designated Agencies (MH/SUD)",   desc: "Vermont's 11 regional non-profit Designated Agencies providing community mental health & SUD services" },
    { href: "/vermont-sdoh",                 label: "SDOH & Social Services",         desc: "Vermont's 8 SDOH domains, 2-1-1 Vermont, community action agencies — with clinical program connections" },
    { href: "/vermont-act-167",              label: "Vermont Act 167 (2022)",          desc: "Hospital transformation & Oliver Wyman analysis" },
    { href: "/vermont-act-68",               label: "Vermont Act 68 (2025)",           desc: "Next-generation VBC legislation & global budget reform" },
    { href: "/vermont-act-68/simulator",     label: "Act 68 Simulator",               desc: "Model Act 68 financial scenarios for Vermont hospitals" },
    { href: "/ahead-model",                  label: "AHEAD Model",                    desc: "All-payer total cost of care model — 6 states" },
    { href: "/dashboard/vermont/hospitals",  label: "Vermont Hospital Profiles",      desc: "Financial & quality profiles for Vermont hospitals" },
    { href: "/bed-capacity",                 label: "Bed Capacity & Transfer",        desc: "Real-time bed availability & interfacility routing" },
    { href: "/vermont-legislative-resources", label: "Legislative Reports Library",   desc: "GMCB reports, AHS Act 68 monthly updates, Blueprint annual reports, House committee testimony" },
  ];
  const half = Math.ceil(vtPrograms.length / 2);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-3 gap-8">

        {/* Col 1: Vermont Programs — first half */}
        <div>
          <p className={hdr}>Vermont Programs</p>
          <div className="space-y-0.5">
            {vtPrograms.slice(0, half).map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose} className={linkCls}>
                <span className={titleCls}>{item.label}</span>
                <span className={descCls}>{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Col 2: Vermont Programs — second half (continuation) */}
        <div>
          <p className={hdr} aria-hidden="true">&nbsp;</p>
          <div className="space-y-0.5">
            {vtPrograms.slice(half).map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose} className={linkCls}>
                <span className={titleCls}>{item.label}</span>
                <span className={descCls}>{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Other State Models → Dashboards & Simulators */}
        <div>
          <p className={hdr}>Other State Models</p>
          <div className="space-y-0.5">
            {[
              { href: "/california-calaim",   label: "California CalAIM",              desc: "$6.7B Medi-Cal transformation — SDOH, justice re-entry, Enhanced Care Mgmt" },
              { href: "/oregon-cco",          label: "Oregon CCO 3.0",                  desc: "Coordinated Care Organizations — Medicaid global budget model" },
              { href: "/states",              label: "All States Explorer",             desc: "50-state health reform initiatives map" },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose} className={linkCls}>
                <span className={titleCls}>{item.label}</span>
                <span className={descCls}>{item.desc}</span>
              </Link>
            ))}
          </div>
          <div className={sec}>
            <p className={hdr}>Dashboards &amp; Simulators</p>
            <div className="space-y-0.5">
              {[
                { href: "/dashboard",           label: "50-State RHTP Dashboard",        desc: "Rural hospital performance index — national view" },
                { href: "/dashboard/simulator", label: "CMS Rural Health Transformation", desc: "Model CMS rural health transformation scenarios" },
                { href: "/research-lab/vbc-clinical-quality?tab=risk", label: "VCCI Risk Stratification Lab", desc: "CDPS scoring, composite risk tiers & Vermont VCCI patient scenarios" },
                { href: "/research-lab/vbc-clinical-quality?tab=quality", label: "VBC Quality Measures Lab",  desc: "HEDIS, 30-day readmissions & avoidable ED for Vermont populations" },
              ].map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose} className={linkCls}>
                  <span className={titleCls}>{item.label}</span>
                  <span className={descCls}>{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function AdvisePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-3 gap-8">
        {/* Pro-Bono Advisory Services */}
        <div className="col-span-2">
          <p className="text-xs font-black uppercase tracking-widest text-rose-600 mb-3">
            Pro-Bono Advisory Services
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
          <p className="text-xs font-black uppercase tracking-widest text-rose-600 mb-3">
            Connect &amp; Community
          </p>
          <div className="space-y-1">
            <Link
              href="/connect"
              onClick={onClose}
              className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors group"
            >
              <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-700">
                HTR Connect
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

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [dateString, setDateString] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMegaMenu, setActiveMegaMenu] = useState<MegaMenuType>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isHeaderVisible, setHeaderVisible, headlines } = useTicker();
  const { toggleLeft, toggleRight, setLeftOpen, setRightOpen } = useSidebar();
  const voice = useVoice();
  const isChatPage = pathname === "/chat";

  // Inject voice transcript into header search — skip /chat (handled there)
  // and /search (the search page has its own input that handles injection directly)
  useEffect(() => {
    if (!voice.pendingInjection) return;
    if (pathname === "/chat" || pathname === "/search") return;
    setSearchQuery(voice.pendingInjection);
    voice.clearInjection();
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [voice.pendingInjection, pathname, voice]);
  const isWelcomePage = pathname === "/welcome";
  const showLeftToggle = !isStudio;

  const handleToggleLeft = () => {
    if (isChatPage) { setLeftOpen(true); router.push("/"); } else { toggleLeft(); }
  };
  const handleToggleRight = () => {
    if (isChatPage) { setRightOpen(true); router.push("/"); } else { toggleRight(); }
  };

  useEffect(() => {
    setDateString(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
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
    { type: "intelligence", label: "PILLARS", activeCheck: "/policy,/economics,/technology,/clinical,/equity,/operations,/research-lab" },
    { type: "learn", label: "ACADEMY", activeCheck: "/academy" },
    { type: "tools", label: "TOOLS", activeCheck: "/htr-simulator,/hti-dashboard,/trending-topics,/multimedia,/the-wire,/investment-tracker,/medicaid-eligibility-simulator,/transformation-friction-index,/impact-simulation" },
    { type: "states", label: "STATES & PROGRAMS", activeCheck: "/states,/vermont-act-167,/vermont-act-68,/vermont-medicaid,/vermont-rht-program,/vermont-blueprint,/vermont-vcci,/vermont-sash,/vermont-sdoh,/vermont-designated-agencies,/vermont-legislative-resources,/california-calaim,/oregon-cco,/dashboard,/ahead-model,/bed-capacity" },
    { type: "advise", label: "PRO-BONO ADVISORY & SERVICES", activeCheck: "/advisory,/connect,/community" },
  ];

  const isMenuActive = (activeCheck: string) =>
    activeCheck.split(",").some((p) => {
      const path = p.trim();
      return path && (pathname === path || pathname.startsWith(path + "/"));
    });

  if (isWelcomePage) return null;

  return (
    <header className="sticky top-0 z-50 flex flex-col font-sans bg-white dark:bg-slate-900" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      {/* 1. TOP BAR — hidden on mobile, visible lg+ */}
      <div className="hidden lg:block bg-black text-zinc-300 text-[10px] font-bold tracking-wider uppercase py-1 border-b border-neutral-800 w-full relative z-50">
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
              duration={300}
            />
          </div>
          <div className="hidden lg:flex items-center gap-6 whitespace-nowrap">
            <Link href="/book" className="flex items-center gap-1.5 text-white hover:text-zinc-300 transition-colors font-bold">
              <span className="text-[10px]">📖</span>
              THE BOOK
            </Link>
            <div className="h-3 w-px bg-neutral-700" />
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
      <div className="bg-white dark:bg-slate-900 py-1 border-b border-slate-200 dark:border-slate-700 w-full">
        <div className="w-full px-4 flex items-center gap-0 relative">

          {/* LEFT: Toggle + Logo — w-125 matches AppShell breadcrumbs spacer for column alignment */}
          <div className="w-125 shrink-0 flex items-center gap-2 md:gap-3">
            {showLeftToggle && (
              <button
                onClick={handleToggleLeft}
                className="flex items-center gap-1.5 px-2 py-2 md:p-2 text-slate-600 hover:bg-slate-100 rounded-md transition-colors min-w-11 min-h-11 justify-center"
                title="Toggle Navigation"
                aria-label="Toggle navigation sidebar"
              >
                <Bars3BottomLeftIcon className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wide xl:hidden hidden sm:inline">Menu</span>
              </button>
            )}
            <Link href="/" className="z-50 relative">
              <Logo />
            </Link>
          </div>

          {/* NAV: Mega-menu buttons */}
          <nav className="hidden xl:flex items-center gap-6 h-8 shrink-0 mr-4 -ml-40">
            {megaMenuItems.map(({ type, label, activeCheck }) => {
              const active = isMenuActive(activeCheck);
              const isOpen = activeMegaMenu === type;
              // Wide panels (states, intelligence) are rendered outside the button's relative div
              // via the sibling portal below — only narrow panels render here
              const renderInline = type !== "states" && type !== "intelligence";
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
                  {/* Inline panels: learn, tools, advise — anchor left of button */}
                  {isOpen && renderInline && (
                    <div
                      id={`megamenu-${type}`}
                      role="region"
                      aria-label={`${type} navigation`}
                      className="absolute top-full left-0 z-50 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl overflow-y-auto max-h-[80vh] w-auto min-w-max max-w-[95vw]"
                      onMouseEnter={cancelClose}
                      onMouseLeave={closeMegaMenu}
                      onKeyDown={(e) => { if (e.key === "Escape") setActiveMegaMenu(null); }}
                    >
                      {type === "learn" && <LearnPanel onClose={() => setActiveMegaMenu(null)} />}
                      {type === "tools" && <ToolsPanel onClose={() => setActiveMegaMenu(null)} />}
                      {type === "advise" && <AdvisePanel onClose={() => setActiveMegaMenu(null)} />}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Wide mega-menu panels — rendered from the full-width row so they can anchor left/right correctly */}
          {(activeMegaMenu === "states" || activeMegaMenu === "intelligence") && (
            <div
              id={`megamenu-${activeMegaMenu}`}
              role="region"
              aria-label={`${activeMegaMenu} navigation`}
              className={`absolute top-full z-50 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl overflow-y-auto max-h-[80vh] w-auto min-w-max max-w-[95vw] ${
                "left-0"
              }`}
              onMouseEnter={cancelClose}
              onMouseLeave={closeMegaMenu}
              onKeyDown={(e) => { if (e.key === "Escape") setActiveMegaMenu(null); }}
            >
              {activeMegaMenu === "intelligence" && <IntelligencePanel onClose={() => setActiveMegaMenu(null)} />}
              {activeMegaMenu === "states" && <StatesPanel onClose={() => setActiveMegaMenu(null)} />}
            </div>
          )}

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
                {mounted && voice.isSupported && (
                  <button
                    type="button"
                    onClick={voice.toggleListening}
                    title={voice.isListening ? "Stop voice input (Cmd+Shift+V)" : "Voice search (Cmd+Shift+V)"}
                    className={`p-1 rounded transition-colors ${voice.isListening ? "text-rose-500 animate-pulse" : "text-slate-400 hover:text-indigo-600"}`}
                  >
                    <MicrophoneIcon className="w-4 h-4" />
                  </button>
                )}
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
          <div className="w-87.5 shrink-0 flex items-center justify-end gap-2">
            <span className="hidden md:inline-flex">
              <BackendStatus />
            </span>
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
                className="flex items-center gap-1.5 px-3 py-2 min-h-11 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors font-bold text-xs uppercase tracking-wide border border-slate-200 dark:border-slate-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <>
                    <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                    <span className="hidden sm:inline">Close</span>
                  </>
                ) : (
                  <>
                    <Bars3Icon className="w-5 h-5" aria-hidden="true" />
                    <span className="hidden sm:inline">All Topics</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU — rendered in-flow inside the sticky header so it pushes page content down */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 xl:hidden flex flex-col animate-in slide-in-from-top-2 duration-200 max-h-[75vh] overflow-y-auto shadow-lg"
          >
            {/* Mobile Search — pinned at top */}
            <div className="px-4 py-3 border-b-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-0 z-10">
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
                    className="w-full pl-9 pr-3 py-3 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 px-5 py-3 rounded-lg transition-colors shrink-0 min-h-12"
                >
                  Go
                </button>
              </form>
            </div>

            {/* Mobile section accordions */}
            {[
              {
                key: "learn",
                label: "Academy & Learning",
                emoji: "🎓",
                children: [
                  { label: "📖 The Book — Transforming American Healthcare", href: "/book", sub: [] },
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
                key: "tools",
                label: "Tools & Data",
                emoji: "🧪",
                children: [
                  { label: "HTR Simulator", href: "/htr-simulator", sub: [] },
                  { label: "Medicaid Eligibility", href: "/medicaid-eligibility-simulator", sub: [] },
                  { label: "Impact Simulation", href: "/impact-simulation", sub: [] },
                  { label: "Friction Index", href: "/transformation-friction-index", sub: [] },
                  { label: "HTI Dashboard", href: "/hti-dashboard", sub: [] },
                  { label: "The Wire", href: "/the-wire", sub: [] },
                  { label: "Investment Tracker", href: "/investment-tracker", sub: [] },
                  { label: "Trending Topics", href: "/trending-topics", sub: [] },
                  { label: "Multimedia", href: "/multimedia", sub: [] },
                  { label: "All 24 Research Lab Tools", href: "/research-lab", sub: [] },
                  { label: "Clinical Data Exchange Lab", href: "/research-lab/vbc-clinical-quality?tab=hl7", sub: [] },
                  { label: "Risk Stratification Methodology", href: "/research-lab/vbc-clinical-quality?tab=risk", sub: [] },
                  { label: "VBC Quality Measures", href: "/research-lab/vbc-clinical-quality?tab=quality", sub: [] },
                  { label: "High vs. Low Value Care", href: "/research-lab/vbc-clinical-quality?tab=value", sub: [] },
                ],
              },
              {
                key: "intelligence",
                label: "Pillars of Intelligence",
                emoji: "📚",
                children: pillars.map((p) => ({
                  label: p.label,
                  href: p.href,
                  sub: p.items,
                })),
              },
              {
                key: "states",
                label: "States & Programs",
                emoji: "🗺️",
                children: [
                  { label: "Vermont Medicaid", href: "/vermont-medicaid", sub: [] },
                  { label: "Blueprint for Health", href: "/vermont-blueprint", sub: [] },
                  { label: "Vermont VCCI", href: "/vermont-vcci", sub: [] },
                  { label: "Vermont RHT Program ($195M)", href: "/vermont-rht-program", sub: [] },
                  { label: "SASH Program", href: "/vermont-sash", sub: [] },
                  { label: "Designated Agencies (MH/SUD)", href: "/vermont-designated-agencies", sub: [] },
                  { label: "SDOH & Social Services", href: "/vermont-sdoh", sub: [] },
                  { label: "Vermont Act 167 (2022)", href: "/vermont-act-167", sub: [] },
                  { label: "Vermont Act 68 (2025)", href: "/vermont-act-68", sub: [] },
                  { label: "Act 68 Simulator", href: "/vermont-act-68/simulator", sub: [] },
                  { label: "AHEAD Model", href: "/ahead-model", sub: [] },
                  { label: "Vermont Hospital Profiles", href: "/dashboard/vermont/hospitals", sub: [] },
                  { label: "Bed Capacity & Transfer", href: "/bed-capacity", sub: [] },
                  { label: "Legislative Reports Library", href: "/vermont-legislative-resources", sub: [] },
                  { label: "California CalAIM", href: "/california-calaim", sub: [] },
                  { label: "Oregon CCO 3.0", href: "/oregon-cco", sub: [] },
                  { label: "All States Explorer", href: "/states", sub: [] },
                  { label: "50-State Dashboard", href: "/dashboard", sub: [] },
                  { label: "CMS Rural Health Transformation", href: "/dashboard/simulator", sub: [] },
                ],
              },
              {
                key: "advise",
                label: "Pro-Bono Advisory & Services",
                emoji: "💼",
                children: [
                  { label: "Advisory Hub", href: "/advisory", sub: [] },
                  { label: "Strategic Consulting", href: "/advisory/consulting", sub: [] },
                  { label: "Custom Research", href: "/advisory/research", sub: [] },
                  { label: "HTR Connect", href: "/connect", sub: [] },
                ],
              },
            ].map((section) => (
              <div key={section.key} className="border-b border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => setMobileSection(mobileSection === section.key ? null : section.key)}
                  className="w-full flex items-center justify-between px-4 py-4 min-h-14 font-bold text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl leading-none">{section.emoji}</span>
                    {section.label}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${mobileSection === section.key ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileSection === section.key && (
                  <div className="bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                    {section.children.map((child) => (
                      <div key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center px-6 py-3.5 min-h-12 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
                        >
                          {child.label}
                        </Link>
                        {child.sub.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center pl-10 pr-4 py-3 min-h-11 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
                          >
                            <ChevronRightIcon className="w-3 h-3 mr-2 shrink-0 text-slate-300" />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth buttons */}
            <div className="bg-slate-50 dark:bg-slate-800 px-4 py-4 flex flex-col gap-3">
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-bold py-3 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-colors min-h-12 flex items-center justify-center"
                >
                  Log In
                </Link>
                <Link
                  href="/subscribe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-3 rounded-xl transition-colors min-h-12 flex items-center justify-center"
                >
                  Subscribe
                </Link>
              </div>
              <div className="flex items-center justify-center gap-5 text-xs text-slate-400 dark:text-slate-500 pt-1">
                <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-600 dark:hover:text-slate-300">FAQ</Link>
                <span>·</span>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-600 dark:hover:text-slate-300">About</Link>
                <span>·</span>
                <Link href="/advisory/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-600 dark:hover:text-slate-300">Contact</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
