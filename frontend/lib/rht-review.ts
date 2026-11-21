// Rural Health Transformation (RHT) Program review data.
//
// Both JSON files are generated from primary documents, never edited by hand:
//   states.json        ← book-audit/deep/rht/build_states.py (CMS award tables, CMS State Program
//                         Snapshots 2026 release, CMS RHTP Obligated Funds Report)
//   vermont-year1.json ← book-audit/deep/rht/build_vermont.py (State of Vermont executed-agreements
//                         list, Jan 30 2026 budget narrative, July 2026 legislative update)
// The downloaded source files live in book-audit/deep/sources/rht_vt/ (see its README).

import statesData from "@/lib/data/rht-review/states.json";
import vermontData from "@/lib/data/rht-review/vermont-year1.json";
import notesData from "@/lib/data/rht-review/state-notes.json";

export type PolicyAction = {
  code: string;
  name: string;
  committed: boolean;
  status: string | null;
  statusDetail: string | null;
  year2FundingM: number;
};

export type ObligatedBlock = { heading: string; groups: { name: string | null; items: string[] }[] };

export type RhtState = {
  state: string;
  slug: string;
  fy2026: number;
  fy2027: number;
  bp1AwardCmsReport: number | null;
  putToWork: number | null;
  policyCommitmentsTotal: number | null;
  policyActions: PolicyAction[];
  obligated: ObligatedBlock[];
};

export const RHT_SOURCES = statesData.sources;
export const RHT_AS_OF = statesData.asOf;
export const RHT_STATES = statesData.states as RhtState[];
export const VERMONT_YEAR1 = vermontData;

export function rhtState(slug: string): RhtState | undefined {
  return RHT_STATES.find((s) => s.slug === slug);
}

export const usd = (n: number, digits = 0) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: digits, minimumFractionDigits: digits });
export const usdM = (n: number, digits = 1) => `$${(n / 1e6).toFixed(digits)}M`;
export const pct = (part: number, whole: number, digits = 1) => `${((part / whole) * 100).toFixed(digits)}%`;

export function change(s: RhtState) {
  const d = s.fy2027 - s.fy2026;
  return { dollars: d, percent: (d / s.fy2026) * 100 };
}

// CMS publishes these documents; the dates are the documents' own.
export const CMS_DOCS = {
  awardsFy26: { label: "CMS, FY2026 awards (Dec 29, 2025)", url: statesData.sources.fy2026 },
  awardsFy27: { label: "CMS, FY2027 awards (Nov 9, 2026)", url: statesData.sources.fy2027 },
  factSheet: { label: "CMS fact sheet, RHT Program Year 2 awards", url: statesData.sources.factSheet },
  obligated: { label: "CMS, RHTP Obligated Funds Report (state-reported data as of Jul 31, 2026)", url: statesData.sources.obligated },
  snapshot: { label: "CMS, RHT State Program Snapshots, 2026 release (Budget Period 2)", url: statesData.sources.snapshot },
};

// Sourced review notes for states beyond the CMS data (lib/data/rht-review/state-notes.json).
export type StateNotes = {
  asOf: string;
  notes: { text: string; src: string }[];
  quotes: { q: string; who: string; src: string }[];
  sources: Record<string, { label: string; url: string }>;
};
export function stateNotes(slug: string): StateNotes | undefined {
  return (notesData as unknown as Record<string, StateNotes>)[slug];
}
