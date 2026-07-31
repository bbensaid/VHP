/**
 * Pillar-specific "From the Book" callout. Renders the standard FromTheBook
 * card with a chapter range, title, and editorial excerpt — all derived from
 * the taxonomy so each pillar page is a one-liner.
 *
 * Adding/editing a pillar's excerpt? Update PILLAR_EXCERPTS below. Adding a new
 * chapter to a pillar? Update lib/taxonomy/chapters.ts — the chapter range
 * here updates automatically.
 */

import FromTheBook from "./FromTheBook";
import { chaptersForPillar, type PillarId } from "@/lib/taxonomy";

/**
 * ⚠️ Chapter numbers in these excerpts must match `chapters.ts`.
 *
 * Nothing enforces that at runtime — the card's heading is computed from the
 * taxonomy while this prose is hand-written, so a stale number here makes the
 * card contradict its own heading. Every excerpt was previously off by two
 * (Preface and Introduction counted as chapters 1 and 2), and the Equity and
 * Operations entries described a second chapter that does not exist.
 * Corrected 2026-07-31; see ALIGNMENT_AUDIT_FINDINGS.md C-6.
 *
 * `scripts/audit-pillar-excerpts.mjs` verifies this file against chapters.ts.
 */
const PILLAR_EXCERPTS: Record<PillarId, { title: string; excerpt: string }> = {
  policy: {
    title: "The Policy Pillar — Legislative Architecture for Structural Reform",
    excerpt:
      "Vermont's Acts 167, 51, and 68 are examined as the definitive case study in how policy creates the mandatory architecture for transformation. Chapter 2 decodes the Oliver Wyman blueprint and the reform cascade; Chapter 3 covers CMMI models, 1115 waivers, and the H.R. 1 federal policy landscape.",
  },
  economics: {
    title: "The Economics Pillar — Global Budgets, Reference-Based Pricing, and Financial Reform",
    excerpt:
      "Chapter 6 dissects the fee-for-service trap, reference-based pricing mechanics, Maryland's decade of global-budget evidence, and how the AHEAD Model integrates with Act 68's mandate. Chapter 7 provides the VBC financial modeling toolkit: shared savings, APM readiness, and the 65-item contract review checklist.",
  },
  technology: {
    title: "The Technology Pillar — Data Infrastructure for a Transformed Health System",
    excerpt:
      "Chapter 4 covers VHCURES, Vermont's HIE governance shift (Act 62), FHIR interoperability, and AI governance before the risk arrives. Chapter 5 goes into implementation: AI scribe, remote patient monitoring, clinical decision support, and the AI Clinical Governance Lifecycle.",
  },
  clinical: {
    title: "The Clinical Pillar — Redesigning Care Delivery for a Transformed System",
    excerpt:
      "Chapter 8 covers Vermont's Blueprint for Health, the behavioral health crisis architecture, the Collaborative Care Model, and the PACE/long-term care gap. Chapter 9 provides the PCMH transformation playbook, HEDIS improvement methodology, and the Vermont clinical transformation toolkit.",
  },
  equity: {
    title: "The Equity Pillar — Closing Gaps, Not Just Averaging Them",
    excerpt:
      "Chapter 10 treats SDOH as a structural variable, not a downstream filter — covering Vermont's rural-urban divide, the Northeast Kingdom, the GLP-1 access crisis, and algorithmic bias in clinical AI. It then operationalizes equity measurement through stratified HEDIS, the HEROI Index, and VBC equity safeguards.",
  },
  operations: {
    title: "The Operations Pillar — Executing Hospital System Transformation",
    excerpt:
      "Chapter 11 covers the Vermont transformation operating model, the RHRC methodology for rural hospital technical assistance, regionalization across the 14-hospital system, the workforce crisis, and closing the $1,303 per-discharge administrative cost gap.",
  },
};

function formatChapterRange(nums: string[]): string {
  const numeric = nums
    .filter((n) => /^\d+$/.test(n))
    .map(Number)
    .sort((a, b) => a - b);
  if (numeric.length === 0) return "";
  if (numeric.length === 1) return `Chapter ${numeric[0]}`;
  if (numeric.length === 2) return `Chapters ${numeric[0]} & ${numeric[1]}`;
  // ≥3 contiguous chapters render as a range; non-contiguous lists out.
  const isContiguous = numeric.every((n, i) => i === 0 || n === numeric[i - 1] + 1);
  return isContiguous
    ? `Chapters ${numeric[0]}–${numeric[numeric.length - 1]}`
    : `Chapters ${numeric.join(", ")}`;
}

interface Props {
  pillarId: PillarId;
  href?: string;
}

export default function FromTheBookForPillar({ pillarId, href = "/book#chapters" }: Props) {
  const chapters = chaptersForPillar(pillarId);
  const range = formatChapterRange(chapters.map((c) => c.num));
  const { title, excerpt } = PILLAR_EXCERPTS[pillarId];

  return (
    <FromTheBook
      chapter={range}
      chapterTitle={title}
      excerpt={excerpt}
      href={href}
    />
  );
}
