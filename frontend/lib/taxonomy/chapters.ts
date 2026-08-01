/**
 * Book chapters of *Transforming American Healthcare* and their platform map.
 *
 * THIS IS THE CRITICAL FILE for book↔platform alignment. The book changes often;
 * this is the one place every other surface reads from:
 *   - /book page chapter browser
 *   - FromTheBook callouts on pillar pages
 *   - AI Analyst chapter-context attachments
 *   - Future Reader Mode (/read/[chapter])
 *
 * When the book moves: update this file. Everything else follows.
 *
 * Chapter IDs reference the actual chapter number ("1", "10", "16", or the
 * non-numeric "preface"/"introduction"). `platformLinks` reference tool IDs
 * from tools.ts (preferred) or direct program/page IDs.
 */

import type { PillarId } from "./pillars";
import type { Tool } from "./tools";
import { TOOLS } from "./tools";

export type ChapterGroup =
  | "Foundations"
  | "Policy Pillar"
  | "Technology Pillar"
  | "Economics Pillar"
  | "Clinical Pillar"
  | "Equity Pillar"
  | "Operations Pillar"
  | "Future & Strategy";

export interface PlatformLink {
  label: string;
  href: string;
}

export interface Chapter {
  /** Chapter number as a string — "Preface", "Introduction", "1", "2", … */
  num: string;
  title: string;
  desc: string;
  group: ChapterGroup;
  pillar: PillarId | null;
  /**
   * Mix of tool IDs (resolved against tools.ts) and ad-hoc {label, href} pairs.
   * Strings are treated as tool IDs; objects are used verbatim.
   */
  platformLinks: ReadonlyArray<string | PlatformLink>;
}

export const CHAPTERS: readonly Chapter[] = [
  // ── Foundations ─────────────────────────────────────────────────────────
  {
    num: "Preface",
    title: "A System at the Breaking Point",
    desc: "Why American healthcare is not just expensive but structurally failing — and why incremental adjustment can no longer substitute for transformation.",
    group: "Foundations",
    pillar: null,
    platformLinks: [
      { label: "About HTR", href: "/about" },
      { label: "Our Framework", href: "/about/framework" },
    ],
  },
  {
    num: "Introduction",
    title: "What Transformation Actually Means",
    desc: "The Six-Pillar Framework introduced. Why all six pillars must move together — and the Vermont Thread that runs through the entire book.",
    group: "Foundations",
    pillar: null,
    platformLinks: ["framework-map", "htr-simulator"],
  },
  {
    num: "1",
    title: "The Six-Pillar Framework and the Execution Sequence",
    desc: "The six pillars defined, their 15 dependency relationships, and the failure cascade when any one is missing. Then the execution sequence: the OneCare Vermont failure as a sequencing autopsy, why Technology must precede Economics, the six stages, and the three sequencing principles in practice.",
    group: "Foundations",
    pillar: null,
    platformLinks: ["framework-map", "htr-simulator", "transformation-friction-index"],
  },

  // ── Policy Pillar ───────────────────────────────────────────────────────
  {
    num: "2",
    title: "The Policy Pillar — Legislative Architecture for Structural Reform",
    desc: "The Oliver Wyman System Redesign Blueprint. Vermont Act 167 (2022) as the diagnostic mandate. Act 68 (2025) as the operational mandate. Global budget architecture and reference-based pricing.",
    group: "Policy Pillar",
    pillar: "policy",
    platformLinks: [
      { label: "Vermont Act 167", href: "/vermont-act-167" },
      { label: "Vermont Act 51 (2023)", href: "/vermont-act-51" },
      { label: "Vermont Act 68 (2025)", href: "/vermont-act-68" },
      { label: "Vermont RHT Program", href: "/vermont-rht-program" },
      { label: "Policy Overview", href: "/policy" },
      "policy-simulator",
    ],
  },
  {
    num: "3",
    title: "The Policy Pillar in Practice — CMMI Models, Waiver Strategy, and the Federal-State Interface",
    desc: "CMMI model landscape (2026). Section 1115 waivers and budget neutrality. Prior authorization reform. The Medicaid policy landscape and H.R. 1 implications.",
    group: "Policy Pillar",
    pillar: "policy",
    platformLinks: [
      "policy-simulator",
      "hr1-cliff",
      "medicaid-wr-calculator",
      { label: "Vermont Medicaid", href: "/vermont-medicaid" },
    ],
  },

  // ── Technology Pillar ───────────────────────────────────────────────────
  {
    num: "4",
    title: "The Technology Pillar — Data Infrastructure for a Transformed Health System",
    desc: "VHCURES, VITL, and the HIE governance shift. FHIR interoperability, the Vermont CIN, statewide EHR feasibility, and AI governance before the risk arrives.",
    group: "Technology Pillar",
    pillar: "technology",
    platformLinks: [
      { label: "Technology Overview", href: "/technology" },
      { label: "Vermont UHDS", href: "/vermont-uhds" },
      { label: "AI & Machine Learning", href: "/technology/ai" },
      { label: "Data Security & Governance", href: "/technology/security" },
      "fhir-lab",
      "emr-ehr-lab",
      "statewide-ehr-lab",
    ],
  },
  {
    num: "5",
    title: "The Technology Pillar in Practice — FHIR, AI Governance, and Clinical Decision Support",
    desc: "FHIR implementation reality. AI scribe, remote patient monitoring, telehealth, and diagnostic AI. The AI Clinical Governance Lifecycle. Alert fatigue and CDS effectiveness.",
    group: "Technology Pillar",
    pillar: "technology",
    platformLinks: ["clinical-data-exchange", "ai-governance-lab", "digital-health-lab"],
  },

  // ── Economics Pillar ────────────────────────────────────────────────────
  {
    num: "6",
    title: "The Economics Pillar — Global Budgets, Reference-Based Pricing, and Financial Reform",
    desc: "The fee-for-service trap. Reference-based pricing mechanics. Hospital global budgets and Maryland's decade of evidence. AHEAD Model integration with Act 68. Hospital financial modeling.",
    group: "Economics Pillar",
    pillar: "economics",
    platformLinks: [
      { label: "AHEAD Model", href: "/ahead-model" },
      { label: "Vermont Act 68 (2025)", href: "/vermont-act-68" },
      "apm-design-lab",
      "global-budget-modeler",
    ],
  },
  {
    num: "7",
    title: "The Economics Pillar in Practice — VBC Financial Modeling and APM Readiness",
    desc: "Shared savings calculations. Risk stratification as the economic engine. The 30-dimension VBC readiness assessment (six domains). APM contract analysis for financial risk.",
    group: "Economics Pillar",
    pillar: "economics",
    platformLinks: ["shared-savings-calc", "cea-calculator", "hospital-stress-test", "vbc-readiness"],
  },

  // ── Clinical Pillar ─────────────────────────────────────────────────────
  {
    num: "8",
    title: "The Clinical Pillar — Redesigning Care Delivery for a Transformed System",
    desc: "Vermont Blueprint for Health — two decades of evidence. The behavioral health crisis and the three-layer architecture. Collaborative Care Model. Care for Vermont's aging population.",
    group: "Clinical Pillar",
    pillar: "clinical",
    platformLinks: [
      { label: "Vermont Blueprint for Health", href: "/vermont-blueprint" },
      { label: "Vermont VCCI", href: "/vermont-vcci" },
      { label: "Vermont SASH Program", href: "/vermont-sash" },
      { label: "Clinical Overview", href: "/clinical" },
    ],
  },
  {
    num: "9",
    title: "The Clinical Pillar in Practice — Care Model Implementation, Quality Mechanics, and the Vermont Clinical Transformation Toolkit",
    desc: "PCMH transformation playbook. Blueprint field staff model. HEDIS improvement methodology — Vermont context. Deploying the Collaborative Care Model operationally. The care transition protocol.",
    group: "Clinical Pillar",
    pillar: "clinical",
    platformLinks: [
      "risk-stratification-methodology",
      "vbc-quality-measures",
      "high-low-value-care",
      "clinical-quality-optimizer",
    ],
  },

  // ── Equity Pillar ───────────────────────────────────────────────────────
  {
    num: "10",
    title: "The Equity Pillar — Closing Gaps, Not Just Averaging Them",
    desc: "Why average outcomes are the wrong target. Vermont's equity landscape and disparity root-cause taxonomy. Rural equity, the GLP-1 access crisis, and measuring equity with HEROI and HEDIS stratification.",
    group: "Equity Pillar",
    pillar: "equity",
    platformLinks: [
      { label: "Vermont SDOH & Social Services", href: "/vermont-sdoh" },
      { label: "SDOH Integration", href: "/equity/sdoh" },
      { label: "Algorithmic Bias", href: "/equity/bias" },
      "equity-studio",
    ],
  },

  // ── Operations Pillar ───────────────────────────────────────────────────
  {
    num: "11",
    title: "The Operations Pillar — Executing Hospital System Transformation",
    desc: "Revenue cycle management under global budgets. HCC coding accuracy as a financial lever. The administrative cost gap. Workforce strategy, supply chain, and compliance in a transformed system.",
    group: "Operations Pillar",
    pillar: "operations",
    platformLinks: [
      { label: "Operations Overview", href: "/operations" },
      { label: "Revenue Cycle Management", href: "/operations/revenue-cycle" },
      { label: "Workforce & Human Capital", href: "/operations/workforce" },
      "transformation-scorecard",
      "cin-shared-services",
      "ems-transformation",
    ],
  },

  // ── Future & Strategy ───────────────────────────────────────────────────
  {
    num: "12",
    title: "Infrastructure for Knowledge Transfer and Implementation",
    desc: "How health systems build the internal capacity to execute transformation — learning infrastructure, workforce development, the HTR Platform toolkit, and a framework for selecting advisory support.",
    group: "Future & Strategy",
    pillar: null,
    platformLinks: [
      { label: "Academy Hub", href: "/academy" },
      { label: "Learning Tracks", href: "/academy/tracks" },
      { label: "Advisory & Services", href: "/advisory" },
    ],
  },
  {
    num: "13",
    title: "The Future of Healthcare Transformation — 2026, What Vermont Proves, and What Remains",
    desc: "Vermont's six-pillar scorecard (April 2026). Five forces shaping the next decade. The six-pillar forecast 2026–2035 and Vermont's two ten-year trajectories.",
    group: "Future & Strategy",
    pillar: null,
    platformLinks: ["innovation-leaderboard", "hti-dashboard", { label: "Trending Topics", href: "/trending-topics" }],
  },
  {
    num: "14",
    title: "Political Sustainability — Protecting Transformation Across Election Cycles",
    desc: "Why political sustainability is an analytical problem, not only a political one. The structural durability of Vermont's reform architecture, early-warning signals of political risk, and organizational risk-management strategies.",
    group: "Future & Strategy",
    pillar: null,
    platformLinks: [
      { label: "Vermont Legislative Resources", href: "/vermont-legislative-resources" },
      { label: "Policy Feasibility Studies", href: "/policy/feasibility" },
    ],
  },
  {
    num: "15",
    title: "Healthcare Transformation as Portfolio Management — Applying PMI Standards to Six-Pillar Reform",
    desc: "Project, program, and portfolio levels. Vermont's 19-component transformation portfolio. The portfolio risk register, benefits realization, and the case for a transformation portfolio office.",
    group: "Future & Strategy",
    pillar: null,
    platformLinks: ["impact-simulation", "transformation-scorecard", "transformation-friction-index"],
  },
  {
    num: "16",
    title: "The AHS Restructuring Roadmap — A Six-Pillar Framework for System Architects",
    desc: "Vermont's Agency of Human Services restructuring as a live six-pillar implementation case. The statutory mandate of Act 68, the redesigned AHS operating model, and a framework for the 2028 Statewide Strategic Plan.",
    group: "Future & Strategy",
    pillar: null,
    platformLinks: [
      { label: "Vermont Act 68 (2025)", href: "/vermont-act-68" },
      { label: "Vermont RHT Program ($195M)", href: "/vermont-rht-program" },
      { label: "AHEAD Model", href: "/ahead-model" },
      { label: "Vermont Designated Agencies", href: "/vermont-designated-agencies" },
    ],
  },
] as const;

// ── Helpers ────────────────────────────────────────────────────────────────

/** Resolve a `string | PlatformLink` entry to a concrete {label, href}. */
export function resolvePlatformLink(
  entry: string | PlatformLink,
  toolLookup: ReadonlyArray<Tool> = TOOLS
): PlatformLink {
  if (typeof entry !== "string") return entry;
  const tool = toolLookup.find((t) => t.id === entry);
  if (!tool) throw new Error(`Unknown tool id in chapter platformLinks: ${entry}`);
  return { label: tool.label, href: tool.href };
}

/** All chapter groups in their canonical display order. */
export const CHAPTER_GROUPS: readonly ChapterGroup[] = [
  "Foundations",
  "Policy Pillar",
  "Technology Pillar",
  "Economics Pillar",
  "Clinical Pillar",
  "Equity Pillar",
  "Operations Pillar",
  "Future & Strategy",
] as const;

export function chaptersByGroup(group: ChapterGroup): Chapter[] {
  return CHAPTERS.filter((c) => c.group === group);
}

export function chaptersForPillar(pillar: PillarId): Chapter[] {
  return CHAPTERS.filter((c) => c.pillar === pillar);
}

/** Look up a chapter by its `num` ("1"–"16", "Preface", …). Case-insensitive. */
export function getChapter(num: string): Chapter | undefined {
  const n = num.trim().toLowerCase();
  return CHAPTERS.find((c) => c.num.toLowerCase() === n);
}
