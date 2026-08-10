/**
 * Research Lab tools, simulators, and indices on the HTR Platform.
 *
 * This file is the canonical reference for "what tools exist on the platform."
 * The book's Appendix E ("Tool List") is generated from this. The HomeSidebar's
 * lab section, the pillar pages' "tools & data" footer, and the book's chapter
 * platform links all resolve here by `id`.
 *
 * Adding a new tool? Add an entry here. Then reference it by id from chapters.ts
 * and any pillar metadata that uses it.
 */

import type { PillarId } from "./pillars";

export interface Tool {
  id: string;
  label: string;
  href: string;
  // Which pillar(s) the tool belongs to. A tool can belong to multiple pillars
  // (e.g., Risk Stratification is Clinical + Equity).
  pillars: PillarId[];
  // Book chapter numbers this tool implements. Used by the book page to surface
  // platform links per chapter.
  chapters?: string[];
  // Short description for tool catalog pages / hover cards. Optional — many
  // tools are documented inline at their target URL.
  desc?: string;
  // Lifecycle. "active" tools are linked from the sidebar; "preview" are
  // launched but not yet promoted; "deprecated" are kept reachable but hidden.
  status?: "active" | "preview" | "deprecated";
}

export const TOOLS: readonly Tool[] = [
  // ── Policy & Quality bench ────────────────────────────────────────────
  {
    id: "policy-simulator",
    label: "Policy Simulator",
    href: "/research-lab/policy-quality?tab=policy",
    pillars: ["policy"],
    // Ch 2's "Work This Chapter on the Platform" table sends readers here to
    // model waiver / global-budget design; ch 3 uses it for CMMI models.
    chapters: ["2", "3"],
    desc: "Model 1115 waivers, global budgets, and Medicaid expansion scenarios.",
  },
  {
    id: "medicaid-wr-calculator",
    label: "Work Requirements Calculator",
    href: "/research-lab/policy-quality?tab=medicaid-wr",
    pillars: ["policy"],
    chapters: ["3"],
    desc: "Model coverage loss and hospital revenue impact from H.R. 1 Medicaid work requirements, state by state.",
  },
  {
    id: "hr1-cliff",
    label: "H.R. 1 Cliff Scenario",
    href: "/research-lab/policy-quality?tab=hr1-cliff",
    pillars: ["policy"],
    chapters: ["3"],
    desc: "Model the post-2030 Medicaid funding cliff created by H.R. 1 FMAP phase-downs, state-by-state.",
  },
  {
    id: "innovation-leaderboard",
    label: "Innovation Leaderboard",
    href: "/research-lab/knowledge-workspace?tab=leaderboard",
    pillars: ["policy"],
    chapters: ["13"],
    desc: "Rank all 50 states on health transformation and innovation activity.",
  },
  {
    id: "clinical-quality-optimizer",
    label: "Clinical Quality Optimizer",
    href: "/research-lab/policy-quality?tab=quality",
    pillars: ["clinical"],
    chapters: ["9"],
    desc: "Simulate HEDIS measures, predict CMS Star Ratings, optimize MIPS scores.",
  },

  // ── Payment Models bench ──────────────────────────────────────────────
  {
    id: "apm-design-lab",
    label: "APM Design Lab",
    href: "/research-lab/payment-models?tab=apm-design",
    pillars: ["economics"],
    chapters: ["6", "7"],
    desc: "Design novel APMs — episode bundles, global budgets, benchmark waterfalls.",
  },
  {
    id: "shared-savings-calc",
    label: "Shared Savings Calculator",
    href: "/research-lab/payment-models?tab=apm-calc",
    pillars: ["economics"],
    chapters: ["7"],
    desc: "Model MSSP, ACO REACH, and global budget shared savings scenarios.",
  },
  {
    id: "cea-calculator",
    label: "CEA Calculator",
    href: "/research-lab/payment-models?tab=cea",
    pillars: ["economics"],
    chapters: ["7"],
    desc: "Calculate cost per QALY, NNT, and break-even timeline for any intervention.",
  },
  {
    id: "global-budget-modeler",
    label: "Global Budget Transition Modeler",
    href: "/research-lab/payment-models?tab=gb-transition",
    pillars: ["economics"],
    chapters: ["6"],
    desc: "Model revenue and operating margin through the transition from fee-for-service to a global budget.",
  },
  {
    id: "hospital-stress-test",
    label: "Hospital Financial Stress Test",
    href: "/research-lab/policy-quality?tab=scorecard",
    // Featured in the ch 6, 7 and 11 "Work This Chapter" tables.
    pillars: ["economics", "operations"],
    chapters: ["6", "7", "11"],
    desc: "Stress-test hospital financials against payer mix, Medicaid cuts, and global budget scenarios.",
  },
  {
    id: "hta-studio",
    label: "HTA Studio",
    href: "/research-lab/policy-quality?tab=hta",
    pillars: ["economics"],
    desc: "Build budget impact models and run Monte Carlo PSA with 1,000 iterations.",
  },
  {
    id: "actuarial-lab",
    label: "Actuarial Lab",
    href: "/research-lab/policy-quality?tab=actuarial",
    pillars: ["economics"],
    desc: "Calculate ACA actuarial value, model adverse selection, and IRA drug pricing.",
  },

  // ── Technology & AI bench ─────────────────────────────────────────────
  {
    id: "fhir-lab",
    label: "FHIR Interoperability Lab",
    href: "/research-lab/interoperability?tab=fhir",
    pillars: ["technology"],
    chapters: ["4", "5"],
    desc: "Build and validate FHIR R4 resources, test CDS Hooks, check ONC compliance.",
  },
  {
    id: "clinical-data-exchange",
    label: "Clinical Data Exchange Lab",
    href: "/research-lab/vbc-clinical-quality?tab=hl7",
    pillars: ["technology"],
    chapters: ["5"],
    desc: "Annotated HL7 v2 messages (ADT/ORU), FHIR R4 bundles, HL7↔FHIR bridge, and USCDI v3 data element browser — anchored to 8 Vermont patient scenarios.",
  },
  {
    id: "emr-ehr-lab",
    label: "EMR/EHR Lab",
    href: "/research-lab/interoperability?tab=emr",
    pillars: ["technology"],
    chapters: ["4"],
    desc: "Model EHR adoption cost & ROI, compare major vendors, audit USCDI data quality, and walk a simulated clinical encounter.",
  },
  {
    id: "statewide-ehr-lab",
    label: "Statewide EHR Deployment Modeler",
    href: "/research-lab/interoperability?tab=statewide-ehr",
    pillars: ["technology"],
    chapters: ["4"],
    desc: "Model the Act 167 feasibility question: a single statewide EHR vs. FHIR interoperability across Vermont's existing platforms — 10-year TCO, data timeliness, disruption, and vendor lock-in.",
  },
  {
    id: "ai-governance-lab",
    label: "AI Clinical Governance Lab",
    href: "/research-lab/technology-ai?tab=ai",
    pillars: ["technology"],
    chapters: ["5"],
    desc: "Compare predictive models, detect algorithmic bias, build AI governance frameworks.",
  },
  {
    id: "digital-health-lab",
    label: "Digital Health Lab",
    href: "/research-lab/technology-ai?tab=digital",
    pillars: ["technology"],
    chapters: ["5"],
    desc: "Calculate RPM ROI, model telehealth utilization, optimize EHR interoperability.",
  },

  // ── VBC, Clinical & Quality bench ─────────────────────────────────────
  {
    id: "risk-stratification-engine",
    label: "Risk Stratification Engine",
    href: "/research-lab/interoperability?tab=risk",
    // Ch 4's "Work This Chapter" table features this as a Technology-pillar
    // tool ("you cannot manage a budget for a population you cannot see");
    // chs 8-9 use it for panel-level care management.
    pillars: ["technology", "clinical", "equity"],
    chapters: ["4", "8", "9"],
    desc: "Apply HCC v28 RAF scoring and segment populations by clinical complexity.",
  },
  {
    id: "risk-stratification-methodology",
    label: "Risk Stratification Methodology",
    href: "/research-lab/vbc-clinical-quality?tab=risk",
    pillars: ["clinical"],
    chapters: ["8", "9"],
    desc: "Step-by-step HCC v28 RAF calculation per patient, population tier pyramid, and comparison of HCC vs. ACG vs. CDPS vs. Charlson algorithms.",
  },
  {
    id: "vbc-quality-measures",
    label: "VBC Quality Measures",
    href: "/research-lab/vbc-clinical-quality?tab=quality",
    // Featured in both ch 8 and ch 9 "Work This Chapter" tables.
    pillars: ["clinical"],
    chapters: ["8", "9"],
    desc: "HEDIS panel with numerator/denominator logic, 30-day readmission (CMS RSRR), and AHRQ PQI avoidable ED analysis — 8 Vermont patient scenarios.",
  },
  {
    id: "high-low-value-care",
    label: "High vs. Low Value Care",
    href: "/research-lab/vbc-clinical-quality?tab=value",
    pillars: ["clinical"],
    chapters: ["9"],
    desc: "A1C/BP panel management with VBC savings calculations, Choosing Wisely scan, and TCOC decomposition by service category.",
  },

  // ── Population & Equity bench ─────────────────────────────────────────
  {
    id: "population-modeler",
    label: "Population Health Modeler",
    href: "/research-lab/population-equity?tab=population",
    pillars: ["equity", "clinical"],
    chapters: ["10"],
    desc: "Run Markov chain disease progression models and SIR epidemic dynamics.",
  },
  {
    id: "equity-studio",
    label: "Health Equity Studio",
    href: "/research-lab/population-equity?tab=equity",
    pillars: ["equity"],
    chapters: ["10"],
    desc: "Analyze disparities across 10 outcomes and compute equity-weighted ICER via HEROI.",
  },

  // ── Knowledge & Workspace bench ───────────────────────────────────────
  {
    id: "transformation-scorecard",
    label: "Transformation Scorecard",
    href: "/research-lab/knowledge-workspace?tab=scorecard",
    pillars: ["operations"],
    chapters: ["11", "15"],
    desc: "Executive six-pillar dashboard — score all six pillars with Vermont AHEAD milestone tracking.",
  },
  {
    id: "vbc-readiness",
    label: "VBC Readiness Assessment",
    href: "/research-lab/knowledge-workspace?tab=readiness",
    pillars: ["operations", "economics"],
    chapters: ["7", "11"],
    desc: "30-dimension, 6-domain self-assessment producing a readiness score and prioritized gap analysis. Vermont AHEAD presets included.",
  },
  {
    id: "evidence-library",
    label: "Evidence Library",
    href: "/research-lab/knowledge-workspace?tab=evidence",
    pillars: ["operations"],
    chapters: ["11", "12"],
    desc: "Search 25 landmark CEA/CUA studies and 20 CMMI innovation model summaries.",
  },
  {
    id: "research-workspace",
    label: "Research Workspace",
    href: "/research-lab/knowledge-workspace?tab=workspace",
    pillars: ["operations"],
    chapters: ["12"],
    desc: "Save scenarios, build structured reports, manage citations, and export findings.",
  },
  {
    id: "workforce-modeler",
    label: "Workforce Modeler",
    href: "/research-lab/knowledge-workspace?tab=workforce",
    pillars: ["clinical", "operations"],
    chapters: ["11"],
    desc: "Project physician and nursing supply/demand across 12 specialties over 10 years.",
  },
  {
    id: "cin-shared-services",
    label: "CIN & Shared Services Modeler",
    href: "/research-lab/knowledge-workspace?tab=cin",
    pillars: ["operations", "economics"],
    chapters: ["11"],
    desc: "Model Vermont's RHT-funded Clinically Integrated Network: shared billing/coding/credentialing/HR/IT and group purchasing across the 14 hospitals vs. the $1,303/discharge admin-cost premium.",
  },
  {
    id: "ems-transformation",
    label: "EMS Transformation Modeler",
    href: "/research-lab/knowledge-workspace?tab=ems",
    pillars: ["operations"],
    chapters: ["11"],
    desc: "Model Vermont's RHT EMS investment: regionalizing 31 agencies and community-paramedicine treat-and-refer ED diversion, with global-budget margin impact.",
  },

  // ── Top-level simulators & dashboards ─────────────────────────────────
  {
    id: "framework-map",
    label: "Six-Pillar Map",
    href: "/about/framework",
    pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"],
    chapters: ["1", "16"],
    desc: "Explore the Six-Pillar Framework — the conceptual map connecting Policy, Economics, Technology, Clinical, Equity, and Operations.",
  },
  {
    id: "htr-simulator",
    label: "HTR Simulator",
    href: "/htr-simulator",
    pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"],
    // Featured in the ch 1, 13, 14, 15 and 16 platform tables.
    chapters: ["1", "13", "14", "15", "16"],
    desc: "Model health transformation readiness across all six HTR pillars for any organization or state.",
  },
  {
    id: "transformation-friction-index",
    label: "Transformation Friction Index",
    href: "/transformation-friction-index",
    pillars: ["policy", "operations"],
    chapters: ["1", "14", "15"],
    desc: "Quantify implementation barriers to health transformation across all six pillars for any state or organization.",
  },
  {
    id: "investment-tracker",
    label: "Investment Tracker",
    href: "/investment-tracker",
    pillars: ["economics"],
    chapters: ["7", "15"],
    desc: "Track healthcare M&A, VC, PE, and strategic partnership activity by sector, geography, and deal size.",
  },
  {
    id: "hti-dashboard",
    label: "HTI Dashboard",
    href: "/hti-dashboard",
    pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"],
    chapters: ["13", "15", "16"],
    desc: "Interactive Health Transformation Index scoring engine — composite scores, sub-indices, and state rankings.",
  },
  {
    id: "medicaid-eligibility-simulator",
    label: "Medicaid Eligibility Simulator",
    href: "/medicaid-eligibility-simulator",
    pillars: ["policy", "equity"],
    chapters: ["3"],
    desc: "Screen Vermont Medicaid eligibility step-by-step by income, household size, age, and demographics.",
  },
  {
    id: "impact-simulation",
    label: "Impact Simulation",
    href: "/impact-simulation",
    pillars: ["policy", "economics", "clinical", "operations"],
    chapters: ["1", "15"],
    desc: "Model cross-pillar impact of payment reform, care delivery change, technology adoption, workforce strategy, equity interventions, and policy shifts.",
  },
  {
    id: "the-wire",
    label: "The Wire",
    href: "/the-wire",
    pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"],
    // A live news feed, so it is not chapter-bound — but chs 13 and 14 send
    // readers to it explicitly as an early-warning instrument.
    chapters: ["13", "14"],
    desc: "Real-time curated feed of the most important healthcare policy, economics, and transformation news signals.",
  },
] as const;

export function getTool(id: string): Tool {
  const t = TOOLS.find((t) => t.id === id);
  if (!t) throw new Error(`Unknown tool id: ${id}`);
  return t;
}

export function toolsForChapter(chapterNum: string): readonly Tool[] {
  return TOOLS.filter((t) => t.chapters?.includes(chapterNum));
}

export function toolsForPillar(pillar: PillarId): readonly Tool[] {
  return TOOLS.filter((t) => t.pillars.includes(pillar));
}
