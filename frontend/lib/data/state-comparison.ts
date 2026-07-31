/**
 * Side-by-side comparison data for the /compare-states route.
 *
 * Vermont, Oregon, and California are the book's three transformation
 * archetypes (Chapter 17): structural completeness vs. governance maturity
 * vs. scale. The grid below codifies what's true about each state on each
 * pillar so readers can scan the trade-offs at a glance.
 *
 * Adding a row? Add to PILLAR_ROWS or PROGRAM_ROWS. Adding a state? Add to
 * STATES and provide its column for every existing row.
 */

import type { PillarId } from "@/lib/taxonomy";

export interface StateColumn {
  id: "vermont" | "oregon" | "california";
  label: string;
  emoji: string;
  /** Short tagline shown under the column header. */
  archetype: string;
  /** Internal platform link to the state's primary page. */
  href: string;
  accent: {
    text: string;       // e.g. "text-rose-700"
    bg: string;         // e.g. "bg-rose-50"
    border: string;     // e.g. "border-rose-200"
    headerBg: string;   // e.g. "bg-rose-100"
  };
}

export interface ComparisonCell {
  /** Headline value displayed prominently. */
  value: string;
  /** Optional one-line clarifying note. */
  detail?: string;
  /** Optional editorial verdict (best/middle/worst), drives a small color chip. */
  verdict?: "best" | "middle" | "worst" | "neutral";
}

export interface ComparisonRow {
  /** Row label (left column). */
  label: string;
  /** Optional pillar tag if the row belongs to a specific pillar. */
  pillar?: PillarId;
  /** Optional row caption shown under the label. */
  caption?: string;
  cells: Record<StateColumn["id"], ComparisonCell>;
}

export const STATES: readonly StateColumn[] = [
  {
    id: "vermont",
    label: "Vermont",
    emoji: "🍁",
    archetype: "Structurally complete · smallest scale",
    href: "/vermont-act-68",
    accent: {
      text: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-200",
      headerBg: "bg-rose-100",
    },
  },
  {
    id: "oregon",
    label: "Oregon",
    emoji: "🌲",
    archetype: "Proven governance · mid-scale",
    href: "/oregon-cco",
    accent: {
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      headerBg: "bg-emerald-100",
    },
  },
  {
    id: "california",
    label: "California",
    emoji: "🌅",
    archetype: "Whole-person care · largest scale",
    href: "/california-calaim",
    accent: {
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      headerBg: "bg-amber-100",
    },
  },
] as const;

// ─── Demographic & scale rows ─────────────────────────────────────────────────

export const SCALE_ROWS: ComparisonRow[] = [
  {
    label: "Population",
    cells: {
      vermont:    { value: "647,000",     detail: "Smallest state by Medicaid enrollment" },
      oregon:     { value: "4.2 million",  detail: "≈6.5× Vermont" },
      california: { value: "39.2 million", detail: "≈60× Vermont" },
    },
  },
  {
    label: "Medicaid enrollment",
    cells: {
      vermont:    { value: "218,000",      detail: "≈34% of population" },
      oregon:     { value: "1.4 million",   detail: "≈33% of population" },
      california: { value: "15 million",    detail: "≈38% of population" },
    },
  },
  {
    label: "Uninsured rate",
    cells: {
      vermont:    { value: "4.2%",  verdict: "best" },
      oregon:     { value: "6.1%",  verdict: "middle" },
      california: { value: "7.2%",  verdict: "worst" },
    },
  },
];

// ─── Pillar-aligned rows ──────────────────────────────────────────────────────

export const PILLAR_ROWS: ComparisonRow[] = [
  // Policy
  {
    label: "Global budget mandate",
    pillar: "policy",
    caption: "Is the payment regime statutorily required?",
    cells: {
      vermont:    { value: "Mandatory",  detail: "Act 68 (2025), all hospitals", verdict: "best" },
      oregon:     { value: "Voluntary",  detail: "CCO 3.0, opt-in regional", verdict: "middle" },
      california: { value: "Hybrid",     detail: "Sector-by-sector via CalAIM waiver", verdict: "middle" },
    },
  },
  {
    label: "Federal alignment",
    pillar: "policy",
    cells: {
      vermont:    { value: "AHEAD model",        detail: "Medicare aligned via CMMI" },
      oregon:     { value: "1115 waiver",        detail: "Section 1115 Medicaid demonstration" },
      california: { value: "1115 waiver ($6.7B)", detail: "Largest state Medicaid waiver in U.S." },
    },
  },
  // Economics
  {
    label: "Track record of global budgets",
    pillar: "economics",
    cells: {
      vermont:    { value: "1 year mandatory",  detail: "Act 68 enacted 2025; 4th attempt overall", verdict: "worst" },
      oregon:     { value: "13 years",          detail: "CCO model since 2012, now 3rd generation", verdict: "best" },
      california: { value: "n/a (no global budget)", detail: "Whole-person care, but no hospital global budget", verdict: "neutral" },
    },
  },
  {
    label: "Non-medical services in Medicaid",
    pillar: "economics",
    cells: {
      vermont:    { value: "SDOH set-aside",          detail: "Via VCCI + Blueprint Community Health Teams" },
      oregon:     { value: "Health-related services",  detail: "Authorized under CCO contracts" },
      california: { value: "Community Supports",      detail: "Housing deposits, meals, recuperative care", verdict: "best" },
    },
  },
  // Technology
  {
    label: "All-payer claims database",
    pillar: "technology",
    cells: {
      vermont:    { value: "VHCURES",       detail: "Mandatory, mature", verdict: "best" },
      oregon:     { value: "OHA APCD",      detail: "Mandatory, mature", verdict: "best" },
      california: { value: "HCAI APCD",     detail: "Mandatory as of 2024", verdict: "middle" },
    },
  },
  {
    label: "State HIE governance",
    pillar: "technology",
    cells: {
      vermont:    { value: "Act 62 (2025)", detail: "HIT Plan and VITL oversight moved from GMCB to DVHA, effective July 1, 2025", verdict: "best" },
      oregon:     { value: "Mature",        detail: "OHA leads, regional HIEs converge" },
      california: { value: "Fragmented",    detail: "Data Exchange Framework launching 2024–2026", verdict: "worst" },
    },
  },
  // Clinical
  {
    label: "Statewide primary care transformation",
    pillar: "clinical",
    cells: {
      vermont:    { value: "Blueprint",          detail: "128 PCMH practices, 18 yrs evidence", verdict: "best" },
      oregon:     { value: "PCPCH",              detail: "Patient-Centered Primary Care Home, mature" },
      california: { value: "Making Care Primary", detail: "Federal program, county-led" },
    },
  },
  {
    label: "Behavioral health integration",
    pillar: "clinical",
    cells: {
      vermont:    { value: "Three-layer model", detail: "Blueprint + 11 Designated Agencies + CCBHC" },
      oregon:     { value: "Best in nation",    detail: "Highest physical-behavioral integration rates", verdict: "best" },
      california: { value: "ECM",               detail: "Enhanced Care Management for high-need members" },
    },
  },
  // Equity
  {
    label: "Equity accountability in governance",
    pillar: "equity",
    cells: {
      vermont:    { value: "Developing",        detail: "GMCB-led, no consumer governance mandate", verdict: "worst" },
      oregon:     { value: "Community board mandate", detail: "≥1/3 consumer & community members", verdict: "best" },
      california: { value: "Developing",        detail: "CalAIM equity stratification rolling out", verdict: "middle" },
    },
  },
  {
    label: "SDOH framework",
    pillar: "equity",
    cells: {
      vermont:    { value: "8 domains",          detail: "Standardized across state programs" },
      oregon:     { value: "CCO incentives",     detail: "Equity bonus tied to disparate outcomes" },
      california: { value: "Population segments", detail: "ECM-eligible populations defined explicitly", verdict: "best" },
    },
  },
  // Operations
  {
    label: "State regulator capacity",
    pillar: "operations",
    cells: {
      vermont:    { value: "GMCB",       detail: "Hospital budget + insurance rate review under one body", verdict: "best" },
      oregon:     { value: "OHA",        detail: "Oregon Health Authority — broad mandate" },
      california: { value: "DHCS+HCAI",  detail: "Department of Health Care Services + Hospital Cost Reporting" },
    },
  },
  {
    label: "Workforce strategy",
    pillar: "operations",
    cells: {
      vermont:    { value: "Rural-acute",        detail: "Constrained behavioral & primary care pipeline", verdict: "worst" },
      oregon:     { value: "Moderate",           detail: "Coastal vs. interior disparities" },
      california: { value: "Massive scale",      detail: "Strong urban pipeline; rural still constrained" },
    },
  },
];

// ─── State-specific programs (for the "Programs" row group) ──────────────────

export const PROGRAM_ROWS: ComparisonRow[] = [
  {
    label: "Flagship payment-reform program",
    cells: {
      vermont:    { value: "Act 68 + AHEAD",  detail: "Mandatory hospital global budgets" },
      oregon:     { value: "CCO 3.0",         detail: "Coordinated Care Organizations, 2025–2030" },
      california: { value: "CalAIM",          detail: "$6.7B Medi-Cal transformation" },
    },
  },
  {
    label: "Population health flagship",
    cells: {
      vermont:    { value: "VCCI",            detail: "Top 5–15% of Medicaid by cost/complexity" },
      oregon:     { value: "Health-Related Services", detail: "CCO-funded non-medical interventions" },
      california: { value: "Enhanced Care Management", detail: "Homeless, recently-incarcerated, SMI, LTC" },
    },
  },
  {
    label: "Housing-based care signature",
    cells: {
      vermont:    { value: "SASH",            detail: "200+ communities, 13,000+ participants", verdict: "best" },
      oregon:     { value: "Housing supports", detail: "Through CCO health-related services" },
      california: { value: "Community Supports", detail: "Housing deposits + recuperative care" },
    },
  },
];
