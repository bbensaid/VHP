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
 * Chapter IDs reference the actual chapter number ("1", "10", "20", or the
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
    title: "The Six-Pillar Framework",
    desc: "The 15 dependency relationships between pillars. The failure cascade when any single pillar is missing. How to use the dependency map as an analytical and investment-prioritization tool.",
    group: "Foundations",
    pillar: null,
    platformLinks: ["framework-map", "htr-simulator", "transformation-friction-index"],
  },
  {
    num: "2",
    title: "The Execution Sequence: Why Order Is Not Optional",
    desc: "The OneCare Vermont failure as a sequencing autopsy. Why Technology must precede Economics. The six stages of execution and the chicken-and-egg resolution.",
    group: "Foundations",
    pillar: null,
    platformLinks: [
      { label: "Vermont VCCI", href: "/vermont-vcci" },
      { label: "AHEAD Model", href: "/ahead-model" },
      "impact-simulation",
    ],
  },
  {
    num: "3",
    title: "The Execution Sequence in Practice",
    desc: "Sequencing decisions, failure prevention, and Vermont's implementation timeline. Three principles: critical path, parallel work, and equity as a design constraint.",
    group: "Foundations",
    pillar: null,
    platformLinks: [
      { label: "Vermont Act 68 (2025)", href: "/vermont-act-68" },
      { label: "Act 68 Simulator", href: "/vermont-act-68/simulator" },
      "policy-simulator",
    ],
  },

  // ── Policy Pillar ───────────────────────────────────────────────────────
  {
    num: "4",
    title: "The Policy Pillar — Legislative Architecture for Structural Reform",
    desc: "The Oliver Wyman System Redesign Blueprint. Vermont Act 167 (2022) as the diagnostic mandate. Act 68 (2025) as the operational mandate. Global budget architecture and reference-based pricing.",
    group: "Policy Pillar",
    pillar: "policy",
    platformLinks: [
      { label: "Vermont Act 167", href: "/vermont-act-167" },
      { label: "Vermont Act 68 (2025)", href: "/vermont-act-68" },
      { label: "Vermont RHT Program", href: "/vermont-rht-program" },
      { label: "Policy Overview", href: "/policy" },
    ],
  },
  {
    num: "5",
    title: "The Policy Pillar in Practice — CMMI Models, Waiver Strategy, and the Federal-State Interface",
    desc: "CMMI model landscape (2026). Section 1115 waivers and budget neutrality. Prior authorization reform (H.R. 1). The Medicaid policy landscape and H.R. 1 implications.",
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
    num: "6",
    title: "The Technology Pillar — Data Infrastructure for a Transformed Health System",
    desc: "VHCURES, VITL, the 2025 HIE governance shift (Act 62). FHIR interoperability, the Vermont CIN, statewide EHR feasibility, and AI governance before the risk arrives.",
    group: "Technology Pillar",
    pillar: "technology",
    platformLinks: [
      { label: "Technology Overview", href: "/technology" },
      { label: "AI & Machine Learning", href: "/technology/ai" },
      { label: "Data Security & Governance", href: "/technology/security" },
      "fhir-lab",
    ],
  },
  {
    num: "7",
    title: "The Technology Pillar in Practice — FHIR, AI Governance, and Clinical Decision Support",
    desc: "FHIR implementation reality. AI scribe, remote patient monitoring, telehealth, and diagnostic AI. The AI Clinical Governance Lifecycle. Alert fatigue and CDS effectiveness.",
    group: "Technology Pillar",
    pillar: "technology",
    platformLinks: ["clinical-data-exchange", "ai-governance-lab", "digital-health-lab"],
  },

  // ── Economics Pillar ────────────────────────────────────────────────────
  {
    num: "8",
    title: "The Economics Pillar — Global Budgets, Reference-Based Pricing, and Financial Reform",
    desc: "The fee-for-service trap. Vermont's four attempts at global budgets. Maryland's decade of evidence. AHEAD Model integration with Act 68. Hospital financial modeling.",
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
    num: "9",
    title: "The Economics Pillar in Practice — VBC Financial Modeling and APM Readiness",
    desc: "Shared savings calculations. Risk stratification as the economic engine. VBC readiness assessment (six domains). Contract analysis — the 65-item VBC contract review checklist.",
    group: "Economics Pillar",
    pillar: "economics",
    platformLinks: ["shared-savings-calc", "cea-calculator", "hospital-stress-test", "vbc-readiness"],
  },

  // ── Clinical Pillar ─────────────────────────────────────────────────────
  {
    num: "10",
    title: "The Clinical Pillar — Redesigning Care Delivery for a Transformed System",
    desc: "Vermont Blueprint for Health — 15 years of evidence. Behavioral health crisis and the three-layer architecture. Collaborative Care Model. The PACE model and Vermont's long-term care gap.",
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
    num: "11",
    title: "The Clinical Pillar in Practice — Care Model Implementation and Quality Mechanics",
    desc: "PCMH transformation playbook. Blueprint field staff model. HEDIS improvement methodology — Vermont context. Deploying the Collaborative Care Model operationally.",
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
    num: "12",
    title: "The Equity Pillar — Closing Gaps, Not Just Averaging Them",
    desc: "SDOH as a structural variable, not a downstream filter. Vermont's 8 SDOH domains. Algorithmic bias in clinical AI. Access disparity in rural Vermont.",
    group: "Equity Pillar",
    pillar: "equity",
    platformLinks: [
      { label: "Vermont SDOH & Social Services", href: "/vermont-sdoh" },
      { label: "SDOH Integration", href: "/equity/sdoh" },
      { label: "Algorithmic Bias", href: "/equity/bias" },
      "equity-studio",
    ],
  },
  {
    num: "13",
    title: "The Equity Pillar in Practice — HEDIS Equity Measurement, HEROI, and SDOH Screening",
    desc: "HEDIS equity stratification. HEROI (Health Equity ROI Index). SDOH screening at scale. Vermont's equity measurement framework and gap-closing strategy.",
    group: "Equity Pillar",
    pillar: "equity",
    platformLinks: ["population-modeler", "equity-studio", "risk-stratification-methodology"],
  },

  // ── Operations Pillar ───────────────────────────────────────────────────
  {
    num: "14",
    title: "The Operations Pillar — Executing Hospital System Transformation",
    desc: "Revenue cycle management under global budgets. HCC coding accuracy as a financial lever. Workforce strategy and credentialing. Supply chain and compliance in a transformed system.",
    group: "Operations Pillar",
    pillar: "operations",
    platformLinks: [
      { label: "Operations Overview", href: "/operations" },
      { label: "Revenue Cycle Management", href: "/operations/revenue-cycle" },
      { label: "Workforce & Human Capital", href: "/operations/workforce" },
      "transformation-scorecard",
    ],
  },
  {
    num: "15",
    title: "The Operations Pillar in Practice — Revenue Cycle, HCC Coding, and Administrative Efficiency",
    desc: "30 operational levers for cost reduction. HCC coding walkthrough. Denial management. The administrative cost gap that global budgets must close.",
    group: "Operations Pillar",
    pillar: "operations",
    platformLinks: [
      "vbc-readiness",
      "evidence-library",
      { label: "Vermont Hospital Profiles", href: "/dashboard/vermont/hospitals" },
    ],
  },

  // ── Future & Strategy ───────────────────────────────────────────────────
  {
    num: "16",
    title: "Infrastructure for Knowledge Transfer and Implementation",
    desc: "How health systems build the internal capacity to execute transformation — learning infrastructure, workforce development, and the platform for ongoing adaptation.",
    group: "Future & Strategy",
    pillar: null,
    platformLinks: [
      { label: "Academy Hub", href: "/academy" },
      { label: "Learning Tracks", href: "/academy/tracks" },
      { label: "Advisory & Services", href: "/advisory" },
    ],
  },
  {
    num: "17",
    title: "The Future of Healthcare Transformation — 2026 and Beyond",
    desc: "What Vermont proves about what is nationally replicable. The transformation horizon: AI, demographic aging, federal policy uncertainty, and the states that will follow Vermont's lead.",
    group: "Future & Strategy",
    pillar: null,
    platformLinks: ["innovation-leaderboard", "hti-dashboard", { label: "Trending Topics", href: "/trending-topics" }],
  },
  {
    num: "18",
    title: "Political Sustainability — Protecting Transformation Across Election Cycles",
    desc: "How to build transformation that survives political transition. Coalition strategy, evidence production, and the institutional anchors that make reform durable.",
    group: "Future & Strategy",
    pillar: null,
    platformLinks: [
      { label: "Vermont Legislative Resources", href: "/vermont-legislative-resources" },
      { label: "Policy Feasibility Studies", href: "/policy/feasibility" },
    ],
  },
  {
    num: "19",
    title: "Healthcare Transformation as Portfolio Management",
    desc: "Applying PMI project management discipline to system transformation. Risk registers, dependency tracking, milestone gates, and the transformation portfolio office.",
    group: "Future & Strategy",
    pillar: null,
    platformLinks: ["impact-simulation", "transformation-scorecard", "transformation-friction-index"],
  },
  {
    num: "20",
    title: "The AHS Restructuring Roadmap — A Six-Pillar Framework for System Redesign",
    desc: "Vermont's Agency of Human Services restructuring as a live six-pillar implementation case. Written directly for state leaders executing the Act 68 agenda.",
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

/** Look up a chapter by its `num` ("1"–"20", "Preface", …). Case-insensitive. */
export function getChapter(num: string): Chapter | undefined {
  const n = num.trim().toLowerCase();
  return CHAPTERS.find((c) => c.num.toLowerCase() === n);
}
