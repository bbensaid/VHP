import Link from "next/link";
import {
  BookOpenIcon,
  BuildingLibraryIcon,
  BanknotesIcon,
  CpuChipIcon,
  HeartIcon,
  ScaleIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
  AcademicCapIcon,
  BeakerIcon,
  MapPinIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "The Book | Transforming American Healthcare — HTR",
  description:
    "Transforming American Healthcare: A Six-Pillar Framework for System Transformation. The intellectual foundation of the HTR Platform — 20 chapters covering Policy, Economics, Technology, Clinical, Equity, and Operations.",
};

// ─── CHAPTER DATA ─────────────────────────────────────────────────────────────

const CHAPTERS = [
  // Foundations
  {
    group: "Foundations",
    groupColor: "bg-slate-100 text-slate-700",
    chapters: [
      {
        num: "Preface",
        title: "A System at the Breaking Point",
        desc: "Why American healthcare is not just expensive but structurally failing — and why incremental adjustment can no longer substitute for transformation.",
        pillar: null,
        platformLinks: [{ label: "About HTR", href: "/about" }, { label: "Our Framework", href: "/about/framework" }],
      },
      {
        num: "Introduction",
        title: "What Transformation Actually Means",
        desc: "The Six-Pillar Framework introduced. Why all six pillars must move together — and the Vermont Thread that runs through the entire book.",
        pillar: null,
        platformLinks: [{ label: "Six-Pillar Map", href: "/about/framework" }, { label: "HTR Simulator", href: "/htr-simulator" }],
      },
      {
        num: "Chapter 1",
        title: "The Six-Pillar Framework",
        desc: "The 15 dependency relationships between pillars. The failure cascade when any single pillar is missing. How to use the dependency map as an analytical and investment-prioritization tool.",
        pillar: null,
        platformLinks: [
          { label: "Six-Pillar Map", href: "/about/framework" },
          { label: "HTR Simulator", href: "/htr-simulator" },
          { label: "Transformation Friction Index", href: "/transformation-friction-index" },
        ],
      },
      {
        num: "Chapter 2",
        title: "The Execution Sequence: Why Order Is Not Optional",
        desc: "The OneCare Vermont failure as a sequencing autopsy. Why Technology must precede Economics. The six stages of execution and the chicken-and-egg resolution.",
        pillar: null,
        platformLinks: [
          { label: "Vermont VCCI", href: "/vermont-vcci" },
          { label: "AHEAD Model", href: "/ahead-model" },
          { label: "Impact Simulation", href: "/impact-simulation" },
        ],
      },
      {
        num: "Chapter 3",
        title: "The Execution Sequence in Practice",
        desc: "Sequencing decisions, failure prevention, and Vermont's implementation timeline. Three principles: critical path, parallel work, and equity as a design constraint.",
        pillar: null,
        platformLinks: [
          { label: "Vermont Act 68 (2025)", href: "/vermont-act-68" },
          { label: "Act 68 Simulator", href: "/vermont-act-68/simulator" },
          { label: "Policy Quality Lab", href: "/research-lab/policy-quality?tab=policy" },
        ],
      },
    ],
  },
  // Policy
  {
    group: "Policy Pillar",
    groupColor: "bg-sky-100 text-sky-700",
    chapters: [
      {
        num: "Chapter 4",
        title: "The Policy Pillar — Legislative Architecture for Structural Reform",
        desc: "The Oliver Wyman System Redesign Blueprint. Vermont Act 167 (2022) as the diagnostic mandate. Act 68 (2025) as the operational mandate. Global budget architecture and reference-based pricing.",
        pillar: "policy",
        platformLinks: [
          { label: "Vermont Act 167", href: "/vermont-act-167" },
          { label: "Vermont Act 68 (2025)", href: "/vermont-act-68" },
          { label: "Vermont RHT Program", href: "/vermont-rht-program" },
          { label: "Policy Overview", href: "/policy" },
        ],
      },
      {
        num: "Chapter 5",
        title: "The Policy Pillar in Practice — CMMI Models, Waiver Strategy, and the Federal-State Interface",
        desc: "CMMI model landscape (2026). Section 1115 waivers and budget neutrality. Prior authorization reform (H.R. 1). The Medicaid policy landscape and H.R. 1 implications.",
        pillar: "policy",
        platformLinks: [
          { label: "Policy Simulator", href: "/research-lab/policy-quality?tab=policy" },
          { label: "H.R. 1 Cliff Scenario", href: "/research-lab/policy-quality?tab=hr1-cliff" },
          { label: "Medicaid Work Requirements Calculator", href: "/research-lab/policy-quality?tab=medicaid-wr" },
          { label: "Vermont Medicaid", href: "/vermont-medicaid" },
        ],
      },
    ],
  },
  // Technology
  {
    group: "Technology Pillar",
    groupColor: "bg-indigo-100 text-indigo-700",
    chapters: [
      {
        num: "Chapter 6",
        title: "The Technology Pillar — Data Infrastructure for a Transformed Health System",
        desc: "VHCURES, VITL, the 2025 HIE governance shift (Act 62). FHIR interoperability, the Vermont CIN, statewide EHR feasibility, and AI governance before the risk arrives.",
        pillar: "technology",
        platformLinks: [
          { label: "Technology Overview", href: "/technology" },
          { label: "AI & Machine Learning", href: "/technology/ai" },
          { label: "Data Security & Governance", href: "/technology/security" },
          { label: "FHIR Interoperability Lab", href: "/research-lab/interoperability?tab=fhir" },
        ],
      },
      {
        num: "Chapter 7",
        title: "The Technology Pillar in Practice — FHIR, AI Governance, and Clinical Decision Support",
        desc: "FHIR implementation reality. AI scribe, remote patient monitoring, telehealth, and diagnostic AI. The AI Clinical Governance Lifecycle. Alert fatigue and CDS effectiveness.",
        pillar: "technology",
        platformLinks: [
          { label: "Clinical Data Exchange Lab", href: "/research-lab/vbc-clinical-quality?tab=hl7" },
          { label: "AI Clinical Governance Lab", href: "/research-lab/technology-ai?tab=ai" },
          { label: "Digital Health Lab", href: "/research-lab/technology-ai?tab=digital" },
        ],
      },
    ],
  },
  // Economics
  {
    group: "Economics Pillar",
    groupColor: "bg-emerald-100 text-emerald-700",
    chapters: [
      {
        num: "Chapter 8",
        title: "The Economics Pillar — Global Budgets, Reference-Based Pricing, and Financial Reform",
        desc: "The fee-for-service trap. Vermont's four attempts at global budgets. Maryland's decade of evidence. AHEAD Model integration with Act 68. Hospital financial modeling.",
        pillar: "economics",
        platformLinks: [
          { label: "AHEAD Model", href: "/ahead-model" },
          { label: "Vermont Act 68 (2025)", href: "/vermont-act-68" },
          { label: "APM Design Lab", href: "/research-lab/payment-models?tab=apm-design" },
          { label: "Global Budget Modeler", href: "/research-lab/payment-models?tab=gb-transition" },
        ],
      },
      {
        num: "Chapter 9",
        title: "The Economics Pillar in Practice — VBC Financial Modeling and APM Readiness",
        desc: "Shared savings calculations. Risk stratification as the economic engine. VBC readiness assessment (six domains). Contract analysis — the 65-item VBC contract review checklist.",
        pillar: "economics",
        platformLinks: [
          { label: "Shared Savings Calculator", href: "/research-lab/payment-models?tab=apm-calc" },
          { label: "CEA Calculator", href: "/research-lab/payment-models?tab=cea" },
          { label: "Hospital Financial Stress Test", href: "/research-lab/policy-quality?tab=scorecard" },
          { label: "VBC Readiness Assessment", href: "/research-lab/knowledge-workspace?tab=readiness" },
        ],
      },
    ],
  },
  // Clinical
  {
    group: "Clinical Pillar",
    groupColor: "bg-red-100 text-red-700",
    chapters: [
      {
        num: "Chapter 10",
        title: "The Clinical Pillar — Redesigning Care Delivery for a Transformed System",
        desc: "Vermont Blueprint for Health — 15 years of evidence. Behavioral health crisis and the three-layer architecture. Collaborative Care Model. The PACE model and Vermont's long-term care gap.",
        pillar: "clinical",
        platformLinks: [
          { label: "Vermont Blueprint for Health", href: "/vermont-blueprint" },
          { label: "Vermont VCCI", href: "/vermont-vcci" },
          { label: "Vermont SASH Program", href: "/vermont-sash" },
          { label: "Clinical Overview", href: "/clinical" },
        ],
      },
      {
        num: "Chapter 11",
        title: "The Clinical Pillar in Practice — Care Model Implementation and Quality Mechanics",
        desc: "PCMH transformation playbook. Blueprint field staff model. HEDIS improvement methodology — Vermont context. Deploying the Collaborative Care Model operationally.",
        pillar: "clinical",
        platformLinks: [
          { label: "Risk Stratification Methodology", href: "/research-lab/vbc-clinical-quality?tab=risk" },
          { label: "VBC Quality Measures", href: "/research-lab/vbc-clinical-quality?tab=quality" },
          { label: "High vs. Low Value Care", href: "/research-lab/vbc-clinical-quality?tab=value" },
          { label: "Clinical Quality Optimizer", href: "/research-lab/policy-quality?tab=quality" },
        ],
      },
    ],
  },
  // Equity
  {
    group: "Equity Pillar",
    groupColor: "bg-violet-100 text-violet-700",
    chapters: [
      {
        num: "Chapter 12",
        title: "The Equity Pillar — Closing Gaps, Not Just Averaging Them",
        desc: "SDOH as a structural variable, not a downstream filter. Vermont's 8 SDOH domains. Algorithmic bias in clinical AI. Access disparity in rural Vermont.",
        pillar: "equity",
        platformLinks: [
          { label: "Vermont SDOH & Social Services", href: "/vermont-sdoh" },
          { label: "SDOH Integration", href: "/equity/sdoh" },
          { label: "Algorithmic Bias", href: "/equity/bias" },
          { label: "Health Equity Studio", href: "/research-lab/population-equity?tab=equity" },
        ],
      },
      {
        num: "Chapter 13",
        title: "The Equity Pillar in Practice — HEDIS Equity Measurement, HEROI, and SDOH Screening",
        desc: "HEDIS equity stratification. HEROI (Health Equity ROI Index). SDOH screening at scale. Vermont's equity measurement framework and gap-closing strategy.",
        pillar: "equity",
        platformLinks: [
          { label: "Population Health Modeler", href: "/research-lab/population-equity?tab=population" },
          { label: "Health Equity Studio", href: "/research-lab/population-equity?tab=equity" },
          { label: "VCCI Risk Stratification Lab", href: "/research-lab/vbc-clinical-quality?tab=risk" },
        ],
      },
    ],
  },
  // Operations
  {
    group: "Operations Pillar",
    groupColor: "bg-teal-100 text-teal-700",
    chapters: [
      {
        num: "Chapter 14",
        title: "The Operations Pillar — Executing Hospital System Transformation",
        desc: "Revenue cycle management under global budgets. HCC coding accuracy as a financial lever. Workforce strategy and credentialing. Supply chain and compliance in a transformed system.",
        pillar: "operations",
        platformLinks: [
          { label: "Operations Overview", href: "/operations" },
          { label: "Revenue Cycle Management", href: "/operations/revenue-cycle" },
          { label: "Workforce & Human Capital", href: "/operations/workforce" },
          { label: "Transformation Scorecard", href: "/research-lab/knowledge-workspace?tab=scorecard" },
        ],
      },
      {
        num: "Chapter 15",
        title: "The Operations Pillar in Practice — Revenue Cycle, HCC Coding, and Administrative Efficiency",
        desc: "30 operational levers for cost reduction. HCC coding walkthrough. Denial management. The administrative cost gap that global budgets must close.",
        pillar: "operations",
        platformLinks: [
          { label: "VBC Readiness Assessment", href: "/research-lab/knowledge-workspace?tab=readiness" },
          { label: "Evidence Library", href: "/research-lab/knowledge-workspace?tab=evidence" },
          { label: "Vermont Hospital Profiles", href: "/dashboard/vermont/hospitals" },
        ],
      },
    ],
  },
  // Future & Strategy
  {
    group: "Future & Strategy",
    groupColor: "bg-amber-100 text-amber-700",
    chapters: [
      {
        num: "Chapter 16",
        title: "Infrastructure for Knowledge Transfer and Implementation",
        desc: "How health systems build the internal capacity to execute transformation — learning infrastructure, workforce development, and the platform for ongoing adaptation.",
        pillar: null,
        platformLinks: [
          { label: "Academy Hub", href: "/academy" },
          { label: "Learning Tracks", href: "/academy/tracks" },
          { label: "Advisory & Services", href: "/advisory" },
        ],
      },
      {
        num: "Chapter 17",
        title: "The Future of Healthcare Transformation — 2026 and Beyond",
        desc: "What Vermont proves about what is nationally replicable. The transformation horizon: AI, demographic aging, federal policy uncertainty, and the states that will follow Vermont's lead.",
        pillar: null,
        platformLinks: [
          { label: "Innovation Leaderboard", href: "/research-lab/knowledge-workspace?tab=leaderboard" },
          { label: "HTI Dashboard", href: "/hti-dashboard" },
          { label: "Trending Topics", href: "/trending-topics" },
        ],
      },
      {
        num: "Chapter 18",
        title: "Political Sustainability — Protecting Transformation Across Election Cycles",
        desc: "How to build transformation that survives political transition. Coalition strategy, evidence production, and the institutional anchors that make reform durable.",
        pillar: null,
        platformLinks: [
          { label: "Vermont Legislative Resources", href: "/vermont-legislative-resources" },
          { label: "Policy Feasibility Studies", href: "/policy/feasibility" },
        ],
      },
      {
        num: "Chapter 19",
        title: "Healthcare Transformation as Portfolio Management",
        desc: "Applying PMI project management discipline to system transformation. Risk registers, dependency tracking, milestone gates, and the transformation portfolio office.",
        pillar: null,
        platformLinks: [
          { label: "Impact Simulation", href: "/impact-simulation" },
          { label: "Transformation Scorecard", href: "/research-lab/knowledge-workspace?tab=scorecard" },
          { label: "Transformation Friction Index", href: "/transformation-friction-index" },
        ],
      },
      {
        num: "Chapter 20",
        title: "The AHS Restructuring Roadmap — A Six-Pillar Framework for System Redesign",
        desc: "Vermont's Agency of Human Services restructuring as a live six-pillar implementation case. Written directly for state leaders executing the Act 68 agenda.",
        pillar: null,
        platformLinks: [
          { label: "Vermont Act 68 (2025)", href: "/vermont-act-68" },
          { label: "Vermont RHT Program ($195M)", href: "/vermont-rht-program" },
          { label: "AHEAD Model", href: "/ahead-model" },
          { label: "Vermont Designated Agencies", href: "/vermont-designated-agencies" },
        ],
      },
    ],
  },
];

// ─── PILLAR ICON MAP ──────────────────────────────────────────────────────────

const PILLAR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  policy: BuildingLibraryIcon,
  economics: BanknotesIcon,
  technology: CpuChipIcon,
  clinical: HeartIcon,
  equity: ScaleIcon,
  operations: Cog6ToothIcon,
};

const PILLAR_COLORS: Record<string, { dot: string; text: string; bg: string }> = {
  policy:     { dot: "bg-sky-500",    text: "text-sky-700",    bg: "bg-sky-50" },
  economics:  { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  technology: { dot: "bg-indigo-500", text: "text-indigo-700", bg: "bg-indigo-50" },
  clinical:   { dot: "bg-red-500",    text: "text-red-700",    bg: "bg-red-50" },
  equity:     { dot: "bg-violet-500", text: "text-violet-700", bg: "bg-violet-50" },
  operations: { dot: "bg-teal-500",   text: "text-teal-700",   bg: "bg-teal-50" },
};

// ─── READER PROFILES ─────────────────────────────────────────────────────────

const READER_PROFILES = [
  {
    label: "Policy Professional",
    emoji: "🏛️",
    desc: "Start with Chapters 4–5 (Policy), then Chapter 2 (Sequencing) and Chapter 18 (Political Sustainability).",
    startHref: "/policy",
    startLabel: "Policy Intelligence →",
  },
  {
    label: "Healthcare Executive",
    emoji: "📊",
    desc: "Start with Chapters 8–9 (Economics), then Chapters 14–15 (Operations) and Chapter 19 (Portfolio Management).",
    startHref: "/economics",
    startLabel: "Economics Intelligence →",
  },
  {
    label: "Vermont Practitioner",
    emoji: "🍁",
    desc: "Chapters 4, 10, and 20 are written directly for you. Vermont programs and clinical transformation are your primary thread.",
    startHref: "/vermont-medicaid",
    startLabel: "Vermont Programs →",
  },
  {
    label: "Student or Researcher",
    emoji: "🔬",
    desc: "Start with Chapter 1 (Framework), Chapter 2 (Sequencing), and the Research Lab tools that correspond to each pillar.",
    startHref: "/research-lab",
    startLabel: "Research Lab →",
  },
];

// ─── KEY CONCEPTS ─────────────────────────────────────────────────────────────

const KEY_CONCEPTS = [
  { term: "Six-Pillar Framework", def: "Policy, Economics, Technology, Clinical, Equity, Operations — must move together. Addressed in Chapter 1.", href: "/about/framework" },
  { term: "The 15 Dependency Relationships", def: "The structural interdependencies between pillars that determine execution order and failure risk.", href: "/about/framework" },
  { term: "Execution Sequence", def: "Why Policy → Technology → Economics → Clinical → Equity → Operations is non-negotiable. Chapters 2–3.", href: "/htr-simulator" },
  { term: "The OneCare Failure", def: "Vermont's ACO failure used as a sequencing autopsy — economics without technology readiness.", href: "/vermont-vcci" },
  { term: "Vermont Thread", def: "Vermont's Acts 167 & 68, Blueprint, VCCI, AHEAD, and RHT Program as the book's primary teaching case.", href: "/vermont-act-68" },
  { term: "The AHEAD Model", def: "Medicare's entry into Vermont's total cost of care reform — integrating with Act 68's global budget mandate.", href: "/ahead-model" },
  { term: "Reference-Based Pricing", def: "The pricing architecture that precedes global budgets — anchoring payments to a transparent reference.", href: "/economics/value" },
  { term: "VBC Readiness (6 Domains)", def: "The six organizational readiness dimensions any health system must score before assuming value-based risk.", href: "/research-lab/knowledge-workspace?tab=readiness" },
  { term: "Failure Cascade", def: "How a gap in one pillar triggers compounding failures across the other five.", href: "/transformation-friction-index" },
  { term: "AHS Restructuring Roadmap", def: "Vermont's Agency of Human Services restructuring as a live Chapter 20 six-pillar case study.", href: "/vermont-act-68" },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function BookPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">

      {/* HERO ─────────────────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white p-8 md:p-14 mb-12 shadow-2xl">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest text-white/80">
              Health Transformation Review
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-xs font-black uppercase tracking-widest text-indigo-200">
              Book — v28
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
            Transforming<br className="hidden md:block" /> American Healthcare
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-medium mb-2">
            A Six-Pillar Framework for System Transformation
          </p>
          <p className="text-sm text-white/50 mb-8 max-w-2xl">
            The intellectual foundation of the HTR Platform. 20 chapters covering the complete theory and practice of healthcare system transformation — with Vermont as the primary teaching case.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            {[
              { n: "20", label: "Chapters" },
              { n: "6", label: "Pillars" },
              { n: "380+", label: "Pages" },
              { n: "15", label: "Dependency Relationships" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white">{s.n}</div>
                <div className="text-xs text-white/50 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/HTR_Book_v28_Final2.pdf"
              download="Transforming_American_Healthcare_HTR.pdf"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg shadow-black/20"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download PDF
            </a>
            <a
              href="/HTR_Book_v28_Final2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors"
            >
              <BookOpenIcon className="w-4 h-4" />
              Read Online
            </a>
            <Link
              href="#chapters"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors"
            >
              Browse Chapters
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* BOOK + PLATFORM ALIGNMENT ─────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-indigo-900 mb-2">
                Book &amp; Platform — Total Alignment
              </h2>
              <p className="text-sm text-indigo-800 leading-relaxed mb-4">
                Every chapter maps directly to a section of this platform. The book provides the intellectual framework, evidence base, and practitioner guidance. The platform provides the interactive tools, real-time data, research lab, and Vermont-specific intelligence. Together they form a complete system.
              </p>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Appendix G of the book — <em>"A Reader&apos;s Guide to the Health Transformation Review Platform"</em> — maps each reader profile and chapter to specific platform paths. Every pillar, tool, and Vermont program on this platform has a corresponding chapter in the book.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF EMBED ─────────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Read the Full Book</h2>
          <a
            href="/HTR_Book_v28_Final2.pdf"
            download="Transforming_American_Healthcare_HTR.pdf"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowDownTrayIcon className="w-3.5 h-3.5" />
            Download PDF
          </a>
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
          <iframe
            src="/HTR_Book_v28_Final2.pdf"
            className="w-full"
            style={{ height: "700px" }}
            title="Transforming American Healthcare — HTR Book"
          />
        </div>
      </section>

      {/* READER PROFILES ──────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Where to Start — by Reader Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {READER_PROFILES.map((p) => (
            <div key={p.label} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{p.emoji}</span>
                <span className="font-black text-slate-800 text-sm">{p.label}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{p.desc}</p>
              <Link href={p.startHref} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline">
                {p.startLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* KEY CONCEPTS ──────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Key Concepts From the Book</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {KEY_CONCEPTS.map((c) => (
            <Link
              key={c.term}
              href={c.href}
              className="flex gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
              <div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 leading-snug">{c.term}</div>
                <div className="text-xs text-slate-500 leading-relaxed mt-0.5">{c.def}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CHAPTER BROWSER ──────────────────────────────────────────────────── */}
      <section id="chapters">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-3">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Chapter Browser</h2>
          <span className="text-slate-400 font-normal text-base normal-case">All 20 chapters — mapped to the platform</span>
        </div>

        <div className="space-y-8">
          {CHAPTERS.map((group) => (
            <div key={group.group}>
              {/* Group header */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-widest ${group.groupColor}`}>
                  {group.group}
                </span>
              </div>

              {/* Chapter cards */}
              <div className="space-y-3">
                {group.chapters.map((ch) => {
                  const pillarColors = ch.pillar ? PILLAR_COLORS[ch.pillar] : null;
                  const PillarIcon = ch.pillar ? PILLAR_ICONS[ch.pillar] : null;

                  return (
                    <div
                      key={ch.num}
                      className={`rounded-xl border bg-white p-5 hover:shadow-sm transition-all ${
                        pillarColors ? `border-l-4 border-l-[currentColor] border-slate-200` : "border-slate-200"
                      }`}
                      style={pillarColors ? { borderLeftColor: undefined } : undefined}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        {/* Left: chapter info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                              {ch.num}
                            </span>
                            {ch.pillar && pillarColors && PillarIcon && (
                              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${pillarColors.bg} ${pillarColors.text}`}>
                                <PillarIcon className="w-3 h-3" />
                                {ch.pillar.charAt(0).toUpperCase() + ch.pillar.slice(1)}
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm font-black text-slate-800 leading-snug mb-2">
                            {ch.title}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {ch.desc}
                          </p>
                        </div>

                        {/* Right: platform links */}
                        <div className="shrink-0 min-w-[180px]">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-1.5">
                            Platform
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {ch.platformLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 transition-all"
                              >
                                {link.label}
                                <ArrowRightIcon className="w-2.5 h-2.5 opacity-50" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORM CTA ─────────────────────────────────────────────────────── */}
      <section className="mt-14 mb-4">
        <div className="rounded-2xl bg-slate-900 text-white p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-black mb-3">
            Explore the Platform That Accompanies the Book
          </h2>
          <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-2xl">
            Every concept in the book has an interactive counterpart here — research lab tools, state program profiles, data dashboards, and a Six-Pillar dependency map. The platform keeps the analysis current as policy evolves.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/about/framework", label: "Six-Pillar Map", icon: "🕸️" },
              { href: "/research-lab", label: "Research Lab", icon: "🧪" },
              { href: "/vermont-act-68", label: "Vermont Act 68", icon: "🍁" },
              { href: "/htr-simulator", label: "HTR Simulator", icon: "⚙️" },
              { href: "/academy", label: "Academy", icon: "🎓" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
