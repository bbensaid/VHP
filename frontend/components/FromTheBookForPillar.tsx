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

const PILLAR_EXCERPTS: Record<PillarId, { title: string; excerpt: string }> = {
  policy: {
    title: "The Policy Pillar — Legislative Architecture for Structural Reform",
    excerpt:
      "Vermont's Acts 167 and 68 are examined as the definitive case study in how policy creates the mandatory architecture for transformation. Chapter 4 decodes the Oliver Wyman blueprint; Chapter 5 covers CMMI models, 1115 waivers, and the H.R. 1 federal policy landscape.",
  },
  economics: {
    title: "The Economics Pillar — Global Budgets, Reference-Based Pricing, and Financial Reform",
    excerpt:
      "Chapter 8 dissects Vermont's four attempts at global budgets, Maryland's decade of evidence, and how the AHEAD Model integrates with Act 68's mandate. Chapter 9 provides the VBC financial modeling toolkit: shared savings, APM readiness, and the 65-item contract review checklist.",
  },
  technology: {
    title: "The Technology Pillar — Data Infrastructure for a Transformed Health System",
    excerpt:
      "Chapter 6 covers VHCURES, Vermont's HIE governance shift (Act 62), FHIR compliance, and AI governance before the risk arrives. Chapter 7 goes into implementation: AI scribe, remote patient monitoring, clinical decision support, and the AI Clinical Governance Lifecycle.",
  },
  clinical: {
    title: "The Clinical Pillar — Redesigning Care Delivery for a Transformed System",
    excerpt:
      "Chapter 10 covers Vermont's Blueprint for Health (15 years of evidence), the behavioral health crisis architecture, Collaborative Care Model, and the PACE/long-term care gap. Chapter 11 provides the PCMH transformation playbook, HEDIS improvement methodology, and the Vermont clinical transformation toolkit.",
  },
  equity: {
    title: "The Equity Pillar — Closing Gaps, Not Just Averaging Them",
    excerpt:
      "Chapter 12 treats SDOH as a structural variable, not a downstream filter — covering Vermont's 8 SDOH domains, algorithmic bias in clinical AI, and rural access disparity. Chapter 13 operationalizes equity measurement through HEDIS stratification, the HEROI Index, and SDOH screening at scale.",
  },
  operations: {
    title: "The Operations Pillar — Executing Hospital System Transformation",
    excerpt:
      "Chapter 14 covers revenue cycle management under global budgets, HCC coding accuracy as a financial lever, workforce strategy, and supply chain in a transformed system. Chapter 15 provides 30 operational levers for cost reduction, HCC coding walkthroughs, denial management, and closing the administrative cost gap.",
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
