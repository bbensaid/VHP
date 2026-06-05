// lib/advisory-data.ts
// Single source of truth for all Advisory service content.
// Drives: landing page grid, services catalog, hub tabs, contact form, header nav.

export interface EngagementStep {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  includes: string[];
  highlight?: boolean;
}

export type Pillar = "policy" | "economics" | "technology" | "clinical" | "equity" | "operations";

export interface AdvisoryService {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  href: string;
  clientTypes: string[];
  deliverables: string[];
  processSteps: EngagementStep[];
  tiers: PricingTier[];
  pillars: Pillar[];
  scope: string;
  typicalDuration: string;
  startingPrice: string;
  bestFor: string;
}

export interface AdvisoryStat {
  value: string;
  label: string;
}

export interface ClientSegment {
  name: string;
  icon: string;
  description: string;
}

// ─── PILLAR COLORS (for cross-reference) ────────────────────────────────────
export const PILLAR_STYLES: Record<Pillar, { bg: string; text: string; border: string; label: string }> = {
  policy:     { bg: "bg-sky-100",    text: "text-sky-700",    border: "border-sky-200",    label: "Policy" },
  economics:  { bg: "bg-emerald-100",text: "text-emerald-700",border: "border-emerald-200",label: "Economics" },
  technology: { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-200", label: "Technology" },
  clinical:   { bg: "bg-red-100",    text: "text-red-700",    border: "border-red-200",    label: "Clinical" },
  equity:     { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-200", label: "Equity" },
  operations: { bg: "bg-teal-100",   text: "text-teal-700",   border: "border-teal-200",   label: "Operations" },
};

// ─── ADVISORY STATS BAR ──────────────────────────────────────────────────────
export const ADVISORY_STATS: AdvisoryStat[] = [
  { value: "200+",  label: "Engagements Completed" },
  { value: "$2.4B+",label: "Client Spend Advised" },
  { value: "8",     label: "Service Lines" },
  { value: "94%",   label: "Client Retention Rate" },
  { value: "6",     label: "Pillars of Expertise" },
];

// ─── CLIENT SEGMENTS ─────────────────────────────────────────────────────────
export const CLIENT_SEGMENTS: ClientSegment[] = [
  { name: "Health Systems & IDNs",         icon: "🏥", description: "Multi-site health systems, academic medical centers, and integrated delivery networks navigating scale and complexity." },
  { name: "Payers & Insurers",             icon: "🛡️", description: "Commercial plans, Medicare Advantage organizations, and Medicaid managed care entities optimizing medical economics." },
  { name: "Independent Providers",         icon: "🩺", description: "Physician groups, FQHCs, rural critical access hospitals, and specialty practices building sustainable business models." },
  { name: "State & Federal Government",    icon: "🏛️", description: "Medicaid agencies, health departments, CMS innovation programs, and legislative staff shaping health policy." },
  { name: "Private Equity & Investors",    icon: "📈", description: "PE firms, venture investors, and growth equity funds performing due diligence and portfolio value creation in healthcare." },
  { name: "Academic Medical Centers",      icon: "🎓", description: "Research hospitals and university health systems balancing clinical mission, education, research, and financial sustainability." },
];

// ─── 8 ADVISORY SERVICES ──────────────────────────────────────────────
export const ADVISORY_SERVICES: AdvisoryService[] = [
  // ── 1. STRATEGIC CONSULTING ──────────────────────────────────────────────
  {
    id: "consulting",
    title: "Strategic Consulting",
    shortDescription:
      "Partner with C-suite executives to design resilient operational frameworks across all six pillars — from regulatory strategy and value-based care models to clinical transformation, health equity, and operational execution.",
    icon: "🏛️",
    accentBg: "bg-fuchsia-100",
    accentText: "text-fuchsia-700",
    accentBorder: "border-fuchsia-200",
    href: "/advisory/consulting",
    clientTypes: ["Health Systems", "Payers", "Physician Groups", "PE-Backed Providers"],
    deliverables: [
      "Multi-year Strategic Plan (board-ready)",
      "Regulatory Compliance Roadmap",
      "Value-Based Care Transition Blueprint",
      "Digital & Clinical Technology Strategy",
      "Health Equity Assessment & Action Plan",
      "M&A Target Screening & Integration Playbook",
      "Executive Workshop Facilitation",
      "Quarterly Progress Reviews",
    ],
    processSteps: [
      { stepNumber: 1, title: "Discovery & Baseline Audit", description: "Assess current state across all six pillars — policy exposure, financial performance, technology maturity, clinical outcomes, equity gaps, and operational readiness.", duration: "2–3 weeks" },
      { stepNumber: 2, title: "Strategy Design", description: "Co-develop strategic options with leadership. Map tradeoffs, prioritize initiatives, and build the long-range plan.", duration: "3–4 weeks" },
      { stepNumber: 3, title: "Implementation Roadmap", description: "Translate strategy into a 12–36 month execution roadmap with milestones, owners, and KPIs.", duration: "2 weeks" },
      { stepNumber: 4, title: "Ongoing Advisory", description: "Quarterly strategy reviews, board presentations, and course-correction as market conditions evolve.", duration: "Retainer" },
    ],
    tiers: [
      { name: "Strategy Sprint", price: "$45,000", description: "Focused 6-week strategic assessment on one pillar domain.", includes: ["Baseline audit", "Strategic options memo", "Recommendations briefing", "Executive presentation"], highlight: false },
      { name: "Full Engagement", price: "$120,000+", description: "Comprehensive multi-pillar strategy engagement over 3–6 months.", includes: ["All 6-pillar assessment", "Board-ready strategic plan", "Implementation roadmap", "3 quarterly check-ins"], highlight: true },
      { name: "Executive Retainer", price: "$18,000/mo", description: "Dedicated principal advisor on a monthly retainer for ongoing counsel.", includes: ["Monthly strategy sessions", "On-call analyst access", "Document review", "Board presentation support"], highlight: false },
    ],
    pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"],
    scope: "Enterprise strategy across all 6 pillars",
    typicalDuration: "3–6 months",
    startingPrice: "$45,000",
    bestFor: "C-Suite, Board",
  },

  // ── 2. CUSTOM RESEARCH ────────────────────────────────────────────────────
  {
    id: "research",
    title: "Custom Research & Analysis",
    shortDescription:
      "Commission bespoke intelligence on any healthcare question — from state-level telehealth policy forecasts to the clinical economics of precision medicine programs.",
    icon: "📈",
    accentBg: "bg-rose-100",
    accentText: "text-rose-700",
    accentBorder: "border-rose-200",
    href: "/advisory/research",
    clientTypes: ["Strategy Teams", "Investors", "Government Agencies", "Academic Researchers"],
    deliverables: [
      "Market Feasibility Study (new service lines, facilities)",
      "Policy Impact Financial Model (simulated P&L effects)",
      "Competitive Landscape Analysis",
      "Workforce & Labor Economics Report",
      "Technology Vendor Evaluation Matrix",
      "State-Specific Regulatory Landscape Brief",
      "Clinical Program ROI Analysis",
      "SDOH & Equity Needs Assessment",
    ],
    processSteps: [
      { stepNumber: 1, title: "Research Brief Alignment", description: "Define the precise research question, scope, methodology, and deliverable format.", duration: "1 week" },
      { stepNumber: 2, title: "Data Collection & Literature Review", description: "Leverage proprietary HTR data, CMS datasets, state all-payer claims, peer-reviewed literature, and primary interviews.", duration: "2–4 weeks" },
      { stepNumber: 3, title: "Analysis & Modeling", description: "Apply quantitative models (regression, simulation, scenario analysis) and qualitative synthesis.", duration: "2–3 weeks" },
      { stepNumber: 4, title: "Report Delivery & Debrief", description: "Written report with executive summary, full methodology appendix, and a live debrief session.", duration: "1 week" },
    ],
    tiers: [
      { name: "Research Brief", price: "$15,000", description: "2-week rapid intelligence memo on a focused question.", includes: ["Literature synthesis", "Data analysis", "10–15 page memo", "30-min debrief"], highlight: false },
      { name: "Full Research Engagement", price: "$40,000", description: "Comprehensive 6–8 week custom research project.", includes: ["Full methodology", "Primary interviews", "Financial modeling", "Full report + appendix", "Debrief + presentation"], highlight: true },
      { name: "Research Retainer", price: "$8,000/mo", description: "On-demand research support for teams with ongoing intelligence needs.", includes: ["Up to 3 briefs/quarter", "Priority turnaround", "Data access", "Analyst on-call"], highlight: false },
    ],
    pillars: ["policy", "economics", "technology", "clinical", "equity"],
    scope: "Bespoke research on any healthcare question",
    typicalDuration: "4–8 weeks",
    startingPrice: "$15,000",
    bestFor: "Strategy teams, Investors",
  },

  // ── 3. IT PROJECT CONSULTING ──────────────────────────────────────────────
  {
    id: "it-consulting",
    title: "Health IT Project Consulting",
    shortDescription:
      "End-to-end advisory for EHR implementations, interoperability programs, AI adoption, and digital health transformation — protecting your investment against vendor over-promise and scope creep.",
    icon: "⚙️",
    accentBg: "bg-indigo-100",
    accentText: "text-indigo-700",
    accentBorder: "border-indigo-200",
    href: "/advisory/it-consulting",
    clientTypes: ["Health System CIOs", "Digital Transformation Officers", "State HIT Coordinators", "Hospital IT Directors"],
    deliverables: [
      "EHR Selection & Procurement Advisory (Epic, Oracle Health, Meditech, athenahealth)",
      "FHIR API & Interoperability Architecture Plan",
      "AI/ML Governance Framework",
      "Digital Health PMO Charter & OKRs",
      "3-Year Technology Roadmap",
      "Go-Live Risk Assessment Report",
      "Vendor SLA Scorecard & Escalation Protocol",
      "Post-Implementation Optimization Review",
    ],
    processSteps: [
      { stepNumber: 1, title: "Current State Assessment", description: "Inventory all existing systems, map data flows, interview clinical and operational stakeholders, identify integration debt.", duration: "2 weeks" },
      { stepNumber: 2, title: "Strategy & Vendor Selection", description: "Build vendor scoring matrices, architecture recommendations, total cost of ownership models, and risk register.", duration: "3–4 weeks" },
      { stepNumber: 3, title: "Implementation Oversight", description: "Embedded or remote program management — weekly status reports, milestone tracking, vendor escalations, change management.", duration: "3–18 months" },
      { stepNumber: 4, title: "Post-Go-Live Stabilization", description: "90-day hyper-care support, adoption dashboards, issue triage, and lessons-learned debrief for the next wave.", duration: "90 days" },
    ],
    tiers: [
      { name: "Advisory Sprint", price: "$25,000", description: "30-day assessment + strategy document for a specific IT initiative.", includes: ["Current state audit", "Vendor shortlist", "Architecture memo", "Risk register"], highlight: false },
      { name: "Program Oversight", price: "From $75,000", description: "6-month part-time embedded advisory for active implementations.", includes: ["Weekly status reporting", "Vendor management support", "Go-live risk tracking", "Board updates"], highlight: true },
      { name: "Full PMO Partnership", price: "Custom", description: "Dedicated advisory team for multi-year, large-scale EHR or digital transformation programs.", includes: ["Full-time or fractional PMO", "Multi-workstream management", "Contract negotiations", "Executive steering support"], highlight: false },
    ],
    pillars: ["technology", "clinical", "economics"],
    scope: "Health IT program management & advisory",
    typicalDuration: "6 months–2 years",
    startingPrice: "$25,000",
    bestFor: "CIOs, Digital Officers",
  },

  // ── 4. INDEPENDENT PROJECT REVIEWS ───────────────────────────────────────
  {
    id: "independent-review",
    title: "Independent Project Reviews",
    shortDescription:
      "When a project is over budget, behind schedule, or producing unexpected outcomes, you need an independent voice. Our forensic-grade project assessments deliver the truth — with a path forward.",
    icon: "🔍",
    accentBg: "bg-amber-100",
    accentText: "text-amber-700",
    accentBorder: "border-amber-200",
    href: "/advisory/independent-review",
    clientTypes: ["Hospital Boards", "CFOs", "State Oversight Agencies", "Private Equity Portfolio Teams"],
    deliverables: [
      "Project Health Scorecard (scope, schedule, budget, risk, quality)",
      "Vendor Contract Review & Compliance Analysis",
      "Confidential Stakeholder Interview Matrix",
      "Root Cause Analysis Report",
      "Remediation Roadmap with Prioritized Actions",
      "Board-Ready Executive Summary",
      "Expert Witness Testimony Support (if litigation involved)",
      "Lessons-Learned & Future Prevention Framework",
    ],
    processSteps: [
      { stepNumber: 1, title: "Intake, NDA & Scoping", description: "Define review scope, secure confidentiality agreements, identify all relevant documentation and stakeholders.", duration: "Week 1" },
      { stepNumber: 2, title: "Document Discovery", description: "Collect and analyze project artifacts: contracts, change orders, PMP documents, financial records, meeting minutes, correspondence.", duration: "Weeks 1–2" },
      { stepNumber: 3, title: "Stakeholder Interviews", description: "Conduct structured confidential interviews at all levels — from frontline staff to executive sponsors and vendor teams.", duration: "Weeks 2–3" },
      { stepNumber: 4, title: "Findings & Remediation Report", description: "Present findings briefing to board/leadership, deliver full written report with remediation roadmap.", duration: "Week 4" },
    ],
    tiers: [
      { name: "Standard Review", price: "$40,000", description: "4-week independent assessment of a project up to 18 months in scope.", includes: ["Document review", "Up to 15 interviews", "Full written report", "Board briefing", "Remediation roadmap"], highlight: false },
      { name: "Complex / Litigation", price: "$75,000–$150,000", description: "Multi-year programs, disputed contracts, or matters involving legal or regulatory proceedings.", includes: ["Extended discovery", "Unlimited interviews", "Expert witness support", "Deposition preparation", "Court-ready documentation"], highlight: true },
      { name: "Board Retainer", price: "$12,000/quarter", description: "Quarterly independent program health reviews for boards overseeing large transformation portfolios.", includes: ["Quarterly health scorecard", "Trend analysis", "Executive briefing", "Risk flag alerts"], highlight: false },
    ],
    pillars: ["technology", "economics", "policy", "clinical"],
    scope: "Forensic project assessment & remediation",
    typicalDuration: "4–8 weeks",
    startingPrice: "$40,000",
    bestFor: "CFOs, Boards",
  },

  // ── 5. CAPABILITY ASSESSMENTS ─────────────────────────────────────────────
  {
    id: "capability-assessment",
    title: "Capability & Maturity Assessments",
    shortDescription:
      "Before embarking on transformation, organizations need an honest answer: Are we ready? Our Organizational Readiness Framework (ORF) benchmarks your maturity across 7 critical domains using proprietary peer data.",
    icon: "📊",
    accentBg: "bg-sky-100",
    accentText: "text-sky-700",
    accentBorder: "border-sky-200",
    href: "/advisory/capability-assessment",
    clientTypes: ["Health Systems Planning Transformation", "Organizations Pursuing CMS Innovation Models", "Boards Evaluating VBC Readiness", "Grant Applicants"],
    deliverables: [
      "ORF Maturity Scorecard (1–5 scale across 7 domains)",
      "Peer Benchmarking vs. HTR's National Health System Database",
      "Gap Analysis with Prioritization Matrix",
      "Board-Ready Strategic Readiness Report",
      "12-Month Capability Development Roadmap",
      "Half-Day Executive Findings Workshop",
      "Domain-Specific Improvement Playbooks",
      "CMS Innovation Model Readiness Certification Brief",
    ],
    processSteps: [
      { stepNumber: 1, title: "ORF Framework Orientation", description: "Align leadership on the 7 assessment domains, scoring methodology, and peer comparison approach.", duration: "Week 1" },
      { stepNumber: 2, title: "Data Collection", description: "Administer structured surveys, review organizational documents, and conduct leadership interviews across all 7 domains.", duration: "Weeks 1–3" },
      { stepNumber: 3, title: "Scoring & Peer Benchmarking", description: "Score each domain against HTR's ORF framework and benchmark against peer organizations using our proprietary national dataset.", duration: "Week 3–4" },
      { stepNumber: 4, title: "Report Delivery & Workshop", description: "Deliver written readiness report and facilitate a half-day executive workshop to build consensus on priorities.", duration: "Week 5" },
    ],
    tiers: [
      { name: "Core Assessment", price: "$30,000", description: "3-domain focused assessment (you choose which domains), 4-week turnaround.", includes: ["3-domain scoring", "Peer benchmarking", "Gap analysis", "Readiness memo"], highlight: false },
      { name: "Comprehensive", price: "$55,000", description: "Full 7-domain ORF assessment with complete peer benchmarking.", includes: ["All 7 domains", "Full peer benchmarking", "Board-ready report", "Executive workshop"], highlight: true },
      { name: "Pre-Transformation Package", price: "$80,000", description: "Full assessment plus 6-month capability development advisory.", includes: ["Full ORF assessment", "6-month follow-on advisory", "Quarterly maturity re-scoring", "Implementation support"], highlight: false },
    ],
    pillars: ["policy", "economics", "technology", "clinical", "equity"],
    scope: "Organizational readiness & maturity benchmarking",
    typicalDuration: "5–8 weeks",
    startingPrice: "$30,000",
    bestFor: "Transformation leads, Grant applicants",
  },

  // ── 6. FINANCIAL AUDITING ─────────────────────────────────────────────────
  {
    id: "financial-audit",
    title: "Financial Auditing & Revenue Cycle",
    shortDescription:
      "Deep operational and financial performance reviews targeting the economic leakage points unique to healthcare: denial rates, payer mix optimization, coding accuracy, and cost-per-episode analysis.",
    icon: "💰",
    accentBg: "bg-emerald-100",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200",
    href: "/advisory/financial-audit",
    clientTypes: ["Hospital CFOs", "Payer Finance Teams", "PE-Backed Provider Groups", "State Medicaid Agencies"],
    deliverables: [
      "Revenue Cycle End-to-End Assessment (charges through collections)",
      "Coding Accuracy & Clinical Documentation Audit",
      "Payer Contract Performance Review",
      "Department-Level Cost Structure Analysis",
      "Staffing Efficiency Benchmarking (vs. HFMA and CMS standards)",
      "Denial Management Root Cause Report",
      "Live Financial Performance Dashboard (Excel/BI workbook)",
      "CFO Recommendations Memo with ROI Projections",
    ],
    processSteps: [
      { stepNumber: 1, title: "Data Access & Scope Confirmation", description: "Collect EHR financial data, payer contracts, GL exports, denial reports, and staffing files under NDA.", duration: "Week 1" },
      { stepNumber: 2, title: "Revenue Cycle Analysis", description: "Audit charge capture, coding accuracy, billing workflows, denial patterns, and days-in-AR vs. benchmarks.", duration: "Weeks 2–4" },
      { stepNumber: 3, title: "Cost & Efficiency Benchmarking", description: "Compare department-level costs, staffing ratios, and labor productivity against HFMA Peer Comparison and CMS cost reports.", duration: "Weeks 3–5" },
      { stepNumber: 4, title: "Findings Delivery", description: "CFO briefing with full written report, live financial dashboard, and prioritized recommendations with projected ROI.", duration: "Week 6" },
    ],
    tiers: [
      { name: "Rapid Review", price: "$35,000", description: "Revenue cycle focus only, 30-day turnaround.", includes: ["AR & denial analysis", "Coding spot audit", "Top-5 findings memo", "CFO briefing"], highlight: false },
      { name: "Full Financial Audit", price: "$65,000–$100,000", description: "All modules — revenue cycle, cost structure, staffing, payer contracts — over 6–8 weeks.", includes: ["All 4 audit modules", "Live dashboard", "Full written report", "HFMA benchmarking", "Implementation roadmap"], highlight: true },
      { name: "Payer Contract Optimization", price: "$20,000", description: "Stand-alone payer contract performance review and renegotiation strategy.", includes: ["Contract performance analysis", "Rate benchmark comparison", "Renegotiation talking points", "Contract strategy memo"], highlight: false },
    ],
    pillars: ["economics", "policy", "clinical"],
    scope: "Revenue cycle, cost structure & payer performance",
    typicalDuration: "4–8 weeks",
    startingPrice: "$20,000",
    bestFor: "CFOs, Medicaid agencies",
  },

  // ── 7. REGULATORY & LEGISLATIVE ADVISORY ──────────────────────────────────
  {
    id: "regulatory",
    title: "Regulatory & Legislative Advisory",
    shortDescription:
      "Advising government regulators, legislative staff, and public health agencies on designing, implementing, and evaluating health policy — translating clinical, technological, and economic realities into actionable frameworks.",
    icon: "⚖️",
    accentBg: "bg-slate-100",
    accentText: "text-slate-700",
    accentBorder: "border-slate-200",
    href: "/advisory/regulatory",
    clientTypes: ["State Medicaid Directors", "Health Department Commissioners", "Legislative Staff", "CMS / ONC / CMMI", "Advocacy Organizations"],
    deliverables: [
      "Regulatory Impact Analysis (for proposed rules & legislation)",
      "Policy Drafting Support (legislative language, rule text, NPRM comments)",
      "Stakeholder Comment Analysis & Synthesis",
      "Expert Testimony Preparation & Delivery",
      "Implementation Feasibility Review",
      "Compliance Framework Design for Novel Programs",
      "All-Payer Model & Global Budget Design Support",
      "AI-in-Clinical-Care Governance Frameworks for Regulators",
    ],
    processSteps: [
      { stepNumber: 1, title: "Policy Context Review", description: "Understand the regulatory environment, stakeholder landscape, and policy objectives driving the request.", duration: "Week 1" },
      { stepNumber: 2, title: "Evidence Synthesis", description: "Review peer-reviewed literature, existing regulations, state-level case studies, and stakeholder input to build the evidentiary base.", duration: "Weeks 1–3" },
      { stepNumber: 3, title: "Regulatory Options Analysis", description: "Design and compare policy design alternatives, model likely impacts, and assess implementation tradeoffs.", duration: "Weeks 3–4" },
      { stepNumber: 4, title: "Deliverable Production", description: "Produce white papers, draft regulatory language, testimony, briefing materials, or implementation guides as required.", duration: "Week 5+" },
    ],
    tiers: [
      { name: "Policy Brief", price: "$15,000", description: "Focused 2-week rapid evidence memo on a specific regulatory question.", includes: ["Literature synthesis", "Data analysis", "12–20 page brief", "Virtual debrief"], highlight: false },
      { name: "Regulatory Design Support", price: "$40,000–$80,000", description: "Multi-month support for rulemaking, program design, or legislative drafting.", includes: ["Full evidence review", "Options analysis", "Draft language", "Stakeholder comment analysis", "Ongoing revisions"], highlight: true },
      { name: "Legislative Retainer", price: "$10,000/month", description: "On-call access to senior advisors throughout a legislative session or rulemaking cycle.", includes: ["Unlimited quick-turn briefs", "Testimony preparation", "Stakeholder meeting support", "Weekly intelligence updates"], highlight: false },
    ],
    pillars: ["policy", "economics", "clinical", "equity", "technology"],
    scope: "Government advisory & regulatory design",
    typicalDuration: "2 weeks–12 months",
    startingPrice: "$15,000",
    bestFor: "State agencies, Legislators",
  },

  // ── 8. TRAINING & EXECUTIVE EDUCATION ────────────────────────────────────
  {
    id: "training",
    title: "Training & Executive Education",
    shortDescription:
      "Healthcare-specific professional development that bridges the gap between policy awareness and operational execution — from project management fundamentals to domain-area expertise across all 6 pillars.",
    icon: "🎓",
    accentBg: "bg-purple-100",
    accentText: "text-purple-700",
    accentBorder: "border-purple-200",
    href: "/advisory/training",
    clientTypes: ["Health System L&D Teams", "C-Suite Executives", "Clinical Informaticists", "State Agency Staff", "Medical Group Managers"],
    deliverables: [
      "Customized Training Curriculum & Facilitator Guide",
      "Participant Workbooks & Reference Materials",
      "Case Study Library (anonymized real engagements)",
      "Pre/Post Knowledge Assessment Tools",
      "Executive Coaching Session Notes & Action Plans",
      "Certificate of Completion (CEU-eligible where applicable)",
      "Post-Training 30-Day Support Access",
      "Custom Curriculum Development for Organizations",
    ],
    processSteps: [
      { stepNumber: 1, title: "Needs Assessment", description: "Identify knowledge gaps, audience profiles, learning objectives, and preferred delivery format.", duration: "1 week" },
      { stepNumber: 2, title: "Curriculum Design", description: "Build customized curriculum using HTR's 6-pillar framework, practitioner-led content, and real case studies.", duration: "2–3 weeks" },
      { stepNumber: 3, title: "Delivery", description: "Facilitate workshops, virtual cohorts, or 1:1 executive sessions. Record sessions for async access where licensed.", duration: "1 day–2 weeks" },
      { stepNumber: 4, title: "Reinforcement & Assessment", description: "Administer post-training assessments, issue certificates, and provide 30-day follow-on Q&A access.", duration: "30 days" },
    ],
    tiers: [
      { name: "Workshop (On-Site)", price: "$12,000–$18,000", description: "Half-day or full-day on-site workshop for up to 25 participants.", includes: ["Custom curriculum", "Participant materials", "Facilitator-led delivery", "Certificate of completion"], highlight: false },
      { name: "Executive Program", price: "$22,000", description: "Full-day or 2-day intensive executive education program.", includes: ["C-suite tailored content", "Case study sessions", "Executive workbook", "Action planning workshop", "30-day follow-on"], highlight: true },
      { name: "Virtual Cohort License", price: "$8,000/quarter", description: "Quarterly virtual training cohort license for an entire organization.", includes: ["4 virtual sessions/quarter", "Async recordings", "All participant materials", "Up to 50 learners"], highlight: false },
    ],
    pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"],
    scope: "Professional development across all 6 pillars",
    typicalDuration: "1 day–ongoing",
    startingPrice: "$8,000",
    bestFor: "HR/L&D, Executives",
  },
];

// ─── NAV ITEMS (for Header.tsx advisory dropdown) ────────────────────────────
export const ADVISORY_NAV_ITEMS = [
  { href: "/advisory",                    label: "Advisory (Overview)" },
  { href: "/advisory/services",           label: "All Services" },
  { href: "/advisory/it-consulting",      label: "IT Project Consulting" },
  { href: "/advisory/independent-review", label: "Independent Project Reviews" },
  { href: "/advisory/capability-assessment", label: "Capability Assessments" },
  { href: "/advisory/financial-audit",    label: "Financial Auditing" },
  { href: "/advisory/regulatory",         label: "Regulatory & Legislative" },
  { href: "/advisory/training",           label: "Training & Education" },
  { href: "/advisory/consulting",         label: "Strategic Consulting" },
  { href: "/advisory/research",           label: "Custom Research" },
  { href: "/advisory/approach",           label: "How We Work" },
  { href: "/advisory/contact",            label: "Start an Engagement →" },
];
