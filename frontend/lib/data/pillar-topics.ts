/**
 * Per-pillar topic cards and related-tool entries for the pillar overview pages.
 *
 * The pillar overview pages (/clinical, /economics, /technology, /equity,
 * /policy) all share the same structural skeleton: hero → FromTheBook callout
 * → grid of topic cards → tools-and-data grid → latest reports → subscribe CTA.
 *
 * The skeleton lives in components/PillarOverview.tsx; the per-pillar data
 * lives here. Adding a pillar topic? Edit this file.
 */

import type { PillarId } from "@/lib/taxonomy";

export interface PillarTopic {
  /** Display label for the card heading. */
  label: string;
  /** Destination route for the card link. */
  href: string;
  /** One-line teaser shown directly below the heading. */
  description: string;
  /** Three short bullets ("scope includes"). */
  details: string[];
  /** Longer paragraph of editorial scope at the bottom of the card. */
  scope: string;
}

export interface PillarToolLink {
  href: string;
  emoji: string;
  title: string;
  desc: string;
}

export interface PillarOverviewContent {
  /** Small uppercase eyebrow above the H1, e.g. "Clinical Innovation". */
  eyebrow: string;
  /** Page H1, e.g. "Clinical Hub". */
  title: string;
  /** Lede paragraph under the H1. */
  tagline: string;
  /** How many columns to use for the topic grid at the xl breakpoint. */
  topicGridXlCols?: 3 | 4 | 5;
  /** The topic cards themselves. */
  topics: PillarTopic[];
  /** "Tools & Data for X" section at the bottom. Usually 4 entries. */
  tools: PillarToolLink[];
}

export const PILLAR_OVERVIEW: Partial<Record<PillarId, PillarOverviewContent>> = {
  // ── CLINICAL ────────────────────────────────────────────────────────────
  clinical: {
    eyebrow: "Clinical Innovation",
    title: "Clinical Hub",
    tagline: "Advancing care delivery through innovation, precision, and new care models.",
    topicGridXlCols: 5,
    topics: [
      {
        label: "Hospital-at-Home",
        href: "/clinical/hah",
        description: "Acute care delivery in the home setting.",
        details: ["CMS Waiver", "Remote Monitoring", "Logistics"],
        scope: "Examining the clinical and operational expansion of Hospital-at-Home programs, including regulatory waivers and patient safety outcomes.",
      },
      {
        label: "Precision Medicine",
        href: "/clinical/precision",
        description: "Genomics and personalized treatment plans.",
        details: ["Genomics", "Targeted Therapies", "Biomarkers"],
        scope: "Updates on the integration of genomic data into clinical practice, advancements in targeted therapies, and the economics of precision medicine.",
      },
      {
        label: "Genomics & Predictive Medicine",
        href: "/clinical/genomics",
        description: "PGx, germline sequencing, polygenic risk scores, and AI clinical prediction.",
        details: ["Pharmacogenomics", "Polygenic Risk Scores", "AI Early Warning"],
        scope: "Deep-dive into pharmacogenomics (CYP2D6, CYP2C19), germline variant classification (ACMG), tumor genomics, and AI-driven deterioration prediction tools.",
      },
      {
        label: "Virtual Care Models",
        href: "/clinical/virtual",
        description: "Hybrid care delivery and virtual nursing.",
        details: ["Virtual Nursing", "Asynchronous Care", "Tele-ICU"],
        scope: "Analysis of evolving virtual care models beyond basic telehealth, including virtual nursing units, tele-ICU, and asynchronous specialty consults.",
      },
      {
        label: "Population Health",
        href: "/clinical/population",
        description: "Managing chronic disease at scale.",
        details: ["Chronic Care Mgmt", "Preventive Screenings", "Risk Stratification"],
        scope: "Strategies for managing large patient populations, improving chronic disease outcomes, and implementing effective preventive care programs.",
      },
    ],
    tools: [
      { href: "/research-lab/population-equity", emoji: "👥", title: "Population & Equity Lab", desc: "Risk stratification models, chronic care analytics & equity dashboards" },
      { href: "/htr-simulator", emoji: "⚙️", title: "HTR Simulator", desc: "Score clinical quality & outcomes in your transformation scenario" },
      { href: "/dashboard", emoji: "🗺️", title: "50-State Dashboard", desc: "Hospital-level clinical performance data across all RHTP participants" },
      { href: "/research-lab", emoji: "🧪", title: "Full Research Lab", desc: "All 21 tools including clinical decision support & care model analysis" },
    ],
  },

  // ── ECONOMICS ───────────────────────────────────────────────────────────
  economics: {
    eyebrow: "Health Economics",
    title: "Economics Hub",
    tagline: "Analyzing the financial drivers of healthcare transformation, from value-based care to market consolidation.",
    topicGridXlCols: 4,
    topics: [
      {
        label: "Value-Based Care Models",
        href: "/economics/value",
        description: "Shifting from fee-for-service to outcomes-based reimbursement.",
        details: ["Risk Adjustment", "Capitation & Global Budgets", "Outcome Measurement"],
        scope: "Analyzes the financial mechanics of alternative payment models (APMs). We cover risk adjustment methodologies, the transition to global budgets, and the operational requirements for success in downside risk arrangements. This section also tracks CMS innovation models and commercial payer trends.",
      },
      {
        label: "Market & Finance",
        href: "/economics/market",
        description: "Analyzing market consolidation, M&A, and financial health.",
        details: ["Mergers & Acquisitions", "Payer-Provider Dynamics", "Capital Investment Trends"],
        scope: "Tracks the shifting landscape of healthcare ownership and market power. We examine hospital mergers, vertical integration between payers and providers, and the financial health of rural vs. urban systems. Topics include antitrust scrutiny, margin pressure analysis, and cost-of-capital trends.",
      },
      {
        label: "Labor & Workforce Strategy",
        href: "/economics/cea",
        description: "Economic analysis of workforce shortages, compensation, and burnout.",
        details: ["Compensation Analysis", "Burnout & Retention Metrics", "Scope of Practice Laws"],
        scope: "Investigates the economic impact of the clinical workforce crisis. We analyze trends in travel nursing costs, physician compensation models, and the ROI of retention initiatives. This section also explores the economic implications of scope-of-practice expansion and automation in labor substitution.",
      },
      {
        label: "Healthcare Investment Trends",
        href: "/economics/investment",
        description: "Tracking private equity, venture capital, and public market activity.",
        details: ["Digital Health Funding", "Private Equity Activity", "Biotech Valuations"],
        scope: "Monitors the flow of capital into the healthcare sector. We track venture capital funding for digital health, private equity roll-ups of physician practices, and public market valuations of health-tech companies. This includes analysis of exit strategies and the impact of interest rates on deal flow.",
      },
    ],
    tools: [
      { href: "/research-lab/payment-models", emoji: "💰", title: "Payment Models Lab", desc: "APM Design, Global Budget Modeler, Shared Savings & CEA calculators" },
      { href: "/investment-tracker", emoji: "📈", title: "Investment Tracker", desc: "M&A, PE activity, capital flows & digital-health rounds in real time" },
      { href: "/hti-dashboard", emoji: "📊", title: "HTI Dashboard", desc: "State-level Health Transformation Index across all six pillars" },
      { href: "/research-lab", emoji: "🧪", title: "Full Research Lab", desc: "All 21 tools including financial stress test & HTA Studio" },
    ],
  },

  // ── TECHNOLOGY ──────────────────────────────────────────────────────────
  technology: {
    eyebrow: "Health Technology",
    title: "Technology Hub",
    tagline: "Tracking the digital transformation of healthcare delivery and operations.",
    topicGridXlCols: 4,
    topics: [
      {
        label: "AI & Machine Learning",
        href: "/technology/ai",
        description: "Applications of AI in diagnostics, operations, and care.",
        details: ["Generative AI", "Predictive Analytics", "NLP"],
        scope: "Exploring the transformative potential of artificial intelligence in healthcare, from LLMs in clinical documentation to predictive models for patient risk.",
      },
      {
        label: "Digital Health & Telemedicine",
        href: "/technology/digital",
        description: "Remote care platforms and digital therapeutics.",
        details: ["RPM", "Telehealth Platforms", "DTx"],
        scope: "Analysis of the digital health ecosystem, including remote patient monitoring trends, virtual care adoption, and the efficacy of digital therapeutics.",
      },
      {
        label: "Data Security & Governance",
        href: "/technology/security",
        description: "Cybersecurity, interoperability, and data privacy.",
        details: ["Cybersecurity", "HIPAA Compliance", "Interoperability"],
        scope: "Critical updates on healthcare cybersecurity threats, ransomware defense strategies, and the evolving landscape of health data interoperability standards.",
      },
      {
        label: "Tech-Enabled Workflow",
        href: "/technology/workflow",
        description: "Automation and tools to reduce clinical burnout.",
        details: ["RPA", "EHR Optimization", "Clinical Decision Support"],
        scope: "Focusing on technologies that streamline hospital operations, optimize EHR usability, and automate administrative tasks to support the workforce.",
      },
    ],
    tools: [
      { href: "/research-lab/interoperability", emoji: "🔗", title: "Interoperability Lab", desc: "FHIR, EMR/EHR adoption & vendor analysis, risk stratification & data-exchange tools" },
      { href: "/research-lab/technology-ai", emoji: "🤖", title: "Technology & AI Lab", desc: "AI Clinical Governance Lab + Digital Health Lab" },
      { href: "/the-wire", emoji: "📡", title: "The Wire", desc: "Daily intelligence feed on AI, cybersecurity & digital health" },
      { href: "/research-lab", emoji: "🧪", title: "Full Research Lab", desc: "All 21 tools including FHIR maturity assessment & AI lifecycle audit" },
    ],
  },

  // ── EQUITY ──────────────────────────────────────────────────────────────
  equity: {
    eyebrow: "Health Equity",
    title: "Equity Hub",
    tagline: "Ensuring fair and just opportunities for health across all populations.",
    topicGridXlCols: 4,
    topics: [
      {
        label: "SDOH Integration",
        href: "/equity/sdoh",
        description: "Addressing social drivers of health outcomes.",
        details: ["Housing", "Food Security", "Transportation"],
        scope: "Strategies for integrating Social Determinants of Health (SDOH) data into clinical workflows and reimbursement models.",
      },
      {
        label: "Algorithmic Bias",
        href: "/equity/bias",
        description: "Ensuring fairness in AI and clinical algorithms.",
        details: ["AI Ethics", "Bias Audits", "Inclusive Data"],
        scope: "Investigating bias in healthcare algorithms and AI tools, with a focus on regulatory standards and ethical AI deployment.",
      },
      {
        label: "Access Disparity",
        href: "/equity/access",
        description: "Closing gaps in underserved and under-resourced care.",
        details: ["Underserved Communities", "Medicaid Access", "Safety Net"],
        scope: "Analysis of healthcare access barriers across underserved communities — rural, urban, and suburban — including provider shortages, insurance coverage gaps, and geographic isolation.",
      },
      {
        label: "Community Engagement",
        href: "/equity/community",
        description: "Building trust and partnerships with local communities.",
        details: ["CBO Partnerships", "Health Literacy", "Trust Building"],
        scope: "Best practices for engaging communities in health initiatives, building trust, and partnering with Community-Based Organizations (CBOs).",
      },
    ],
    tools: [
      { href: "/research-lab/population-equity", emoji: "👥", title: "Population & Equity Lab", desc: "Population Health Modeler + Health Equity Studio" },
      { href: "/vermont-sdoh", emoji: "🍁", title: "Vermont SDOH", desc: "Vermont's 8 SDOH domains and 2-1-1 referral network" },
      { href: "/hti-dashboard", emoji: "📊", title: "HTI Dashboard", desc: "Equity-stratified outcomes across all states" },
      { href: "/research-lab", emoji: "🧪", title: "Full Research Lab", desc: "All 21 tools including HEROI and equity-stratified HEDIS" },
    ],
  },

  // ── POLICY ──────────────────────────────────────────────────────────────
  policy: {
    eyebrow: "Health Policy",
    title: "Policy Hub",
    tagline: "Navigating the complex landscape of healthcare regulation, legislation, and compliance.",
    topicGridXlCols: 4,
    topics: [
      {
        label: "Regulation & Legislation",
        href: "/policy/regulation",
        description: "Tracking federal and state legislative changes affecting healthcare.",
        details: ["CMS Rules", "State Bills", "Compliance"],
        scope: "Analysis of new bills, finalized rules from CMS/HHS, and state-level legislative trends impacting provider operations and reimbursement.",
      },
      {
        label: "Public Health Mandates",
        href: "/policy/mandates",
        description: "Monitoring executive orders and public health directives.",
        details: ["Emergency Orders", "Vaccine Policy", "Reporting Req."],
        scope: "Coverage of federal and state mandates, including emergency preparedness requirements and public health reporting standards.",
      },
      {
        label: "Global & Comparative Policy",
        href: "/policy/global",
        description: "Insights from international health systems and policy frameworks.",
        details: ["EU Health Data", "UK NHS Reforms", "Global Pharma"],
        scope: "Comparative analysis of health policies from the EU, UK, and Asia to identify best practices and potential regulatory shifts in the US.",
      },
      {
        label: "Policy Feasibility Studies",
        href: "/policy/feasibility",
        description: "Assessing the implementation viability of proposed reforms.",
        details: ["Impact Analysis", "Cost-Benefit", "Stakeholder Review"],
        scope: "Deep dives into the operational and financial feasibility of proposed healthcare reforms, including single-payer models and price transparency.",
      },
    ],
    tools: [
      { href: "/research-lab/policy-quality", emoji: "🏛️", title: "Policy & Quality Lab", desc: "Policy Simulator, H.R. 1 Cliff Scenario, Work Requirements Calculator" },
      { href: "/vermont-act-68", emoji: "🍁", title: "Vermont Act 68", desc: "Mandatory global budgets — the most legislatively complete state reform" },
      { href: "/ahead-model", emoji: "📋", title: "AHEAD Model", desc: "Medicare's entry into state-level all-payer alignment" },
      { href: "/research-lab", emoji: "🧪", title: "Full Research Lab", desc: "All 21 tools including Innovation Leaderboard and feasibility studies" },
    ],
  },
};
