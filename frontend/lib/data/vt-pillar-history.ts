/**
 * Vermont five-pillar status history: dated, sourced milestones, not an index.
 *
 * Chapters 13 and 15 send readers to the HTI Dashboard to see "whether a pillar is improving, flat, or
 * decaying between reporting intervals". The quarterly HTI maturity series (hti-timeseries-data.ts) has
 * no source, so the pillar trend is read from these events instead. Each entry is a fact from a primary
 * source (book-audit/deep/VERIFIED_FACTS.md and the sources it cites); the advance/setback tag is HTR's
 * reading of what the event does to that pillar's ability to deliver what the pillars downstream need.
 * Add new events as AHS, GMCB and CMS report them; never add an event without a source.
 */

import type { PillarId } from "@/lib/taxonomy/pillars";

export type PillarEvent = {
  date: string; // ISO; day omitted (01) where only the month is sourced
  pillar: PillarId;
  effect: "advance" | "setback" | "neutral";
  text: string;
  source: string;
};

export const VT_PILLAR_EVENTS: PillarEvent[] = [
  // Policy
  { date: "2025-01-01", pillar: "policy", effect: "advance", text: "Vermont signs the AHEAD state agreement with CMS", source: "Vermont AHEAD State Agreement (January 2025)" },
  { date: "2025-06-12", pillar: "policy", effect: "advance", text: "Act 68 signed: reference-based pricing, hospital global budgets, January 2028 Statewide Strategic Plan", source: "Act 68 of 2025, as enacted" },
  { date: "2026-06-16", pillar: "policy", effect: "setback", text: "S.190, which would have accelerated reference-based pricing, vetoed", source: "Governor's veto, June 16, 2026" },
  { date: "2026-07-01", pillar: "policy", effect: "setback", text: "Vermont withdraws from AHEAD after CMS cut the expected federal upside from about $138M to a $10M cap", source: "AHS / CMS, July 2026" },
  // Technology
  { date: "2025-12-29", pillar: "technology", effect: "advance", text: "RHT year-one award funds AI-scribe grants ($1.03M) and remote patient monitoring ($0.9M)", source: "CMS RHT award, Dec 29, 2025; Vermont RHT activity details (Mar 2026)" },
  { date: "2026-01-01", pillar: "technology", effect: "advance", text: "Medicaid Data Warehouse & Analytics Solution (MDWAS) live after a rolling go-live from November 2025", source: "AHS Act 68 §10 report, Jan 15, 2026" },
  { date: "2026-04-01", pillar: "technology", effect: "advance", text: "Transformation-analytics vendor contract under negotiation; not yet operational", source: "AHS Act 68 Health Care Spending Report, April 2026" },
  { date: "2026-05-20", pillar: "technology", effect: "advance", text: "Solicitation issued for a program manager for a voluntary shared EMR", source: "AHS solicitation RHT_AHS_004_FY26, May 20, 2026" },
  // Economics
  { date: "2024-09-30", pillar: "economics", effect: "advance", text: "System operating margin 1.48% in FY2024, up from 0.87% in FY2023", source: "GMCB FY2027 Hospital Budget Staff Overview (Aug 2026)" },
  { date: "2026-01-01", pillar: "economics", effect: "advance", text: "Medicaid hospital global budget launches for six hospitals", source: "AHS GCR 26-089 (July 2026)" },
  { date: "2026-07-31", pillar: "economics", effect: "setback", text: "CMS rules the Medicaid hospital global budget unapproved; payments stop July 31 and are reprocessed as fee-for-service", source: "AHS GCR 26-089 (CMS letter July 7, 2026)" },
  { date: "2026-08-01", pillar: "economics", effect: "setback", text: "FY2026 system operating margin projected at −1.25%, with 7 of 13 reporting hospitals projecting losses", source: "GMCB FY2027 Hospital Budget Staff Overview (Aug 2026)" },
  { date: "2026-09-15", pillar: "economics", effect: "advance", text: "GMCB sets FY2027 commercial rates 2.9% lower statewide", source: "GMCB, Sept 15, 2026" },
  // Clinical
  { date: "2025-11-01", pillar: "clinical", effect: "neutral", text: "30-day all-cause readmission 14.8% (2021–2024); no newer measurement published", source: "AHS Act 68 outcome-measures report, Nov 2025" },
  { date: "2026-07-01", pillar: "clinical", effect: "advance", text: "Four CCBHCs certified (NKHS, Howard Center, NCSS, HCRS), joining Clara Martin and Rutland Mental Health: six in all", source: "AHS / DMH, July 1, 2026" },
  // Operations
  { date: "2025-10-01", pillar: "operations", effect: "advance", text: "Monthly AHS Act 68 reports to the Legislature begin", source: "Act 68; AHS reports from Oct 2025" },
  { date: "2025-10-09", pillar: "operations", effect: "advance", text: "RHRC engagement with all 14 hospitals concludes", source: "AHS Act 68 report, Nov 2025" },
  { date: "2026-02-04", pillar: "operations", effect: "neutral", text: "Act 119 review recommends keeping AHS unified rather than restructuring", source: "AHS Act 119 report, Feb 4, 2026" },
  { date: "2026-04-01", pillar: "operations", effect: "advance", text: "All 14 hospitals have submitted final transformation plans", source: "AHS Act 68 Health Care Spending Report, April 2026" },
];

/** Start of the current reporting interval the trend is measured over. */
export const TREND_SINCE = "2026-01-01";

/** Net direction of a pillar's sourced events since `since`: advances minus setbacks. */
export function pillarDirection(
  pillar: PillarId,
  since: string = TREND_SINCE,
): { direction: "improving" | "flat" | "decaying"; advances: number; setbacks: number } {
  const recent = VT_PILLAR_EVENTS.filter(e => e.pillar === pillar && e.date >= since);
  const advances = recent.filter(e => e.effect === "advance").length;
  const setbacks = recent.filter(e => e.effect === "setback").length;
  const net = advances - setbacks;
  return { direction: net > 0 ? "improving" : net < 0 ? "decaying" : "flat", advances, setbacks };
}

export function pillarEvents(pillar: PillarId): PillarEvent[] {
  return VT_PILLAR_EVENTS.filter(e => e.pillar === pillar).sort((a, b) => b.date.localeCompare(a.date));
}
