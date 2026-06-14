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
    chapters: ["3"],
  },
  {
    id: "medicaid-wr-calculator",
    label: "Work Requirements Calculator",
    href: "/research-lab/policy-quality?tab=medicaid-wr",
    pillars: ["policy"],
    chapters: ["3"],
  },
  {
    id: "hr1-cliff",
    label: "H.R. 1 Cliff Scenario",
    href: "/research-lab/policy-quality?tab=hr1-cliff",
    pillars: ["policy"],
    chapters: ["3"],
  },
  {
    id: "innovation-leaderboard",
    label: "Innovation Leaderboard",
    href: "/research-lab/knowledge-workspace?tab=leaderboard",
    pillars: ["policy"],
    chapters: ["13"],
  },
  {
    id: "clinical-quality-optimizer",
    label: "Clinical Quality Optimizer",
    href: "/research-lab/policy-quality?tab=quality",
    pillars: ["clinical"],
    chapters: ["9"],
  },

  // ── Payment Models bench ──────────────────────────────────────────────
  {
    id: "apm-design-lab",
    label: "APM Design Lab",
    href: "/research-lab/payment-models?tab=apm-design",
    pillars: ["economics"],
    chapters: ["6", "7"],
  },
  {
    id: "shared-savings-calc",
    label: "Shared Savings Calculator",
    href: "/research-lab/payment-models?tab=apm-calc",
    pillars: ["economics"],
    chapters: ["7"],
  },
  {
    id: "cea-calculator",
    label: "CEA Calculator",
    href: "/research-lab/payment-models?tab=cea",
    pillars: ["economics"],
    chapters: ["7"],
  },
  {
    id: "global-budget-modeler",
    label: "Global Budget Transition Modeler",
    href: "/research-lab/payment-models?tab=gb-transition",
    pillars: ["economics"],
    chapters: ["6"],
  },
  {
    id: "hospital-stress-test",
    label: "Hospital Financial Stress Test",
    href: "/research-lab/policy-quality?tab=scorecard",
    pillars: ["economics", "operations"],
    chapters: ["7", "11"],
  },
  {
    id: "hta-studio",
    label: "HTA Studio",
    href: "/research-lab/policy-quality?tab=hta",
    pillars: ["economics"],
  },
  {
    id: "actuarial-lab",
    label: "Actuarial Lab",
    href: "/research-lab/policy-quality?tab=actuarial",
    pillars: ["economics"],
  },

  // ── Technology & AI bench ─────────────────────────────────────────────
  {
    id: "fhir-lab",
    label: "FHIR Interoperability Lab",
    href: "/research-lab/interoperability?tab=fhir",
    pillars: ["technology"],
    chapters: ["4", "5"],
  },
  {
    id: "clinical-data-exchange",
    label: "Clinical Data Exchange Lab",
    href: "/research-lab/vbc-clinical-quality?tab=hl7",
    pillars: ["technology"],
    chapters: ["5"],
  },
  {
    id: "ai-governance-lab",
    label: "AI Clinical Governance Lab",
    href: "/research-lab/technology-ai?tab=ai",
    pillars: ["technology"],
    chapters: ["5"],
  },
  {
    id: "digital-health-lab",
    label: "Digital Health Lab",
    href: "/research-lab/technology-ai?tab=digital",
    pillars: ["technology"],
    chapters: ["5"],
  },

  // ── VBC, Clinical & Quality bench ─────────────────────────────────────
  {
    id: "risk-stratification-engine",
    label: "Risk Stratification Engine",
    href: "/research-lab/interoperability?tab=risk",
    pillars: ["clinical", "equity"],
    chapters: ["8", "9"],
  },
  {
    id: "risk-stratification-methodology",
    label: "Risk Stratification Methodology",
    href: "/research-lab/vbc-clinical-quality?tab=risk",
    pillars: ["clinical"],
    chapters: ["8", "9"],
  },
  {
    id: "vbc-quality-measures",
    label: "VBC Quality Measures",
    href: "/research-lab/vbc-clinical-quality?tab=quality",
    pillars: ["clinical"],
    chapters: ["9"],
  },
  {
    id: "high-low-value-care",
    label: "High vs. Low Value Care",
    href: "/research-lab/vbc-clinical-quality?tab=value",
    pillars: ["clinical"],
    chapters: ["9"],
  },

  // ── Population & Equity bench ─────────────────────────────────────────
  {
    id: "population-modeler",
    label: "Population Health Modeler",
    href: "/research-lab/population-equity?tab=population",
    pillars: ["equity", "clinical"],
    chapters: ["10"],
  },
  {
    id: "equity-studio",
    label: "Health Equity Studio",
    href: "/research-lab/population-equity?tab=equity",
    pillars: ["equity"],
    chapters: ["10"],
  },

  // ── Knowledge & Workspace bench ───────────────────────────────────────
  {
    id: "transformation-scorecard",
    label: "Transformation Scorecard",
    href: "/research-lab/knowledge-workspace?tab=scorecard",
    pillars: ["operations"],
    chapters: ["11", "15"],
  },
  {
    id: "vbc-readiness",
    label: "VBC Readiness Assessment",
    href: "/research-lab/knowledge-workspace?tab=readiness",
    pillars: ["operations", "economics"],
    chapters: ["7", "11"],
  },
  {
    id: "evidence-library",
    label: "Evidence Library",
    href: "/research-lab/knowledge-workspace?tab=evidence",
    pillars: ["operations"],
    chapters: ["11"],
  },
  {
    id: "research-workspace",
    label: "Research Workspace",
    href: "/research-lab/knowledge-workspace?tab=workspace",
    pillars: ["operations"],
  },
  {
    id: "workforce-modeler",
    label: "Workforce Modeler",
    href: "/research-lab/knowledge-workspace?tab=workforce",
    pillars: ["clinical", "operations"],
    chapters: ["11"],
  },

  // ── Top-level simulators & dashboards ─────────────────────────────────
  {
    id: "framework-map",
    label: "Six-Pillar Map",
    href: "/about/framework",
    pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"],
    chapters: ["1"],
  },
  {
    id: "htr-simulator",
    label: "HTR Simulator",
    href: "/htr-simulator",
    pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"],
    chapters: ["1"],
  },
  {
    id: "transformation-friction-index",
    label: "Transformation Friction Index",
    href: "/transformation-friction-index",
    pillars: ["policy", "operations"],
    chapters: ["1", "15"],
  },
  {
    id: "investment-tracker",
    label: "Investment Tracker",
    href: "/investment-tracker",
    pillars: ["economics"],
    chapters: ["7"],
  },
  {
    id: "hti-dashboard",
    label: "HTI Dashboard",
    href: "/hti-dashboard",
    pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"],
    chapters: ["13"],
  },
  {
    id: "medicaid-eligibility-simulator",
    label: "Medicaid Eligibility Simulator",
    href: "/medicaid-eligibility-simulator",
    pillars: ["policy", "equity"],
    chapters: ["3"],
  },
  {
    id: "impact-simulation",
    label: "Impact Simulation",
    href: "/impact-simulation",
    pillars: ["policy", "economics", "clinical", "operations"],
    chapters: ["1", "15"],
  },
  {
    id: "the-wire",
    label: "The Wire",
    href: "/the-wire",
    pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"],
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
