/**
 * The five pillars of healthcare transformation, and the Equity Imperative.
 *
 * The Sept 2026 restructure of the framework: Policy, Technology, Economics,
 * Clinical, and Operations are the five pillars — load-bearing IN THIS ORDER,
 * not interchangeable. Equity is no longer a sixth peer pillar; it is "the
 * Equity Imperative," a cross-cutting test ("is it just?") applied to every
 * pillar at every stage. (The one-time migration spec doc this cited has
 * since been superseded and removed — HTR_Book_v42.docx is the living spec.)
 *
 * This is the single source of truth for pillar identity, visual styling,
 * navigation routing, and book↔platform mapping. The home sidebar, header
 * mega-menu, pillar overview pages, book chapter map, and AI Analyst context
 * tagging all read from this file.
 *
 * PILLARS below has exactly the five — use it wherever code means "iterate
 * every pillar" (mega-menus, framework maps, 5-way scoring). EQUITY_IMPERATIVE
 * is exported separately, on purpose: it is styling/routing data for the
 * cross-cutting concept, not a sixth item to loop over alongside the pillars.
 * getPillar() resolves either, for code (chapter links, tool badges) that
 * still needs to render an "equity" id's label/color without caring which
 * kind it is.
 *
 * Adding/renaming a pillar? Edit this file only — no other code needs to
 * change. Reclassifying something's pillar-vs-imperative status, as happened
 * here, is bigger than that and does need other files updated (chapters.ts,
 * tools.ts, and the components listed in the handoff doc).
 */

export type PillarId =
  | "policy"
  | "technology"
  | "economics"
  | "clinical"
  | "operations";

export type ImperativeId = "equity";

// Use this where code needs to accept either a pillar or the imperative —
// e.g. tagging a tool, or linking a book chapter — without implying they're
// interchangeable peers.
export type FrameworkId = PillarId | ImperativeId;

export interface Pillar {
  id: PillarId | ImperativeId;
  label: string;
  href: string;
  desc: string;
  // Tailwind color family used across dots, accents, hover states.
  color: "sky" | "emerald" | "indigo" | "red" | "violet" | "teal";
  // Pre-computed Tailwind class strings. These avoid the JIT-compiler problem
  // where dynamically constructed classes (`bg-${color}-100`) get tree-shaken.
  classes: {
    dot: string;
    headerColor: string;
    headerBg: string;
    borderAccent: string;
    hoverBg: string;
    divideColor: string;
    activeItemBg: string;
    bgLight: string;     // for pillar cards in the book page
    textColor: string;   // for pillar cards in the book page
    ringLight: string;   // for ringed pillar cards (homepage trending strip)
  };
}

// Load-bearing order: Policy → Technology → Economics → Clinical →
// Operations. Book v46 §1.3: "they are not a row of equals standing side by
// side... the later pillars rest on the ones built before them." Don't
// resort this alphabetically or by color — the order is the argument.
export const PILLARS: readonly Pillar[] = [
  {
    id: "policy",
    label: "Policy",
    href: "/policy",
    desc: "Regulation, mandates & global health law",
    color: "sky",
    classes: {
      dot: "bg-sky-500",
      headerColor: "text-sky-700",
      headerBg: "bg-sky-100",
      borderAccent: "border-sky-400",
      hoverBg: "hover:bg-sky-50",
      divideColor: "divide-sky-100",
      activeItemBg: "bg-sky-100",
      bgLight: "bg-sky-50",
      textColor: "text-sky-700",
      ringLight: "ring-sky-200",
    },
  },
  {
    id: "technology",
    label: "Technology",
    href: "/technology",
    desc: "AI, digital health & data governance",
    color: "indigo",
    classes: {
      dot: "bg-indigo-500",
      headerColor: "text-indigo-700",
      headerBg: "bg-indigo-100",
      borderAccent: "border-indigo-400",
      hoverBg: "hover:bg-indigo-50",
      divideColor: "divide-indigo-100",
      activeItemBg: "bg-indigo-100",
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-700",
      ringLight: "ring-indigo-200",
    },
  },
  {
    id: "economics",
    label: "Economics",
    href: "/economics",
    desc: "Value-based care, markets & investment",
    color: "emerald",
    classes: {
      dot: "bg-emerald-500",
      headerColor: "text-emerald-700",
      headerBg: "bg-emerald-100",
      borderAccent: "border-emerald-400",
      hoverBg: "hover:bg-emerald-50",
      divideColor: "divide-emerald-100",
      activeItemBg: "bg-emerald-100",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-700",
      ringLight: "ring-emerald-200",
    },
  },
  {
    id: "clinical",
    label: "Clinical",
    href: "/clinical",
    desc: "Care delivery models & population health",
    color: "red",
    classes: {
      dot: "bg-red-500",
      headerColor: "text-red-700",
      headerBg: "bg-red-100",
      borderAccent: "border-red-400",
      hoverBg: "hover:bg-red-50",
      divideColor: "divide-red-100",
      activeItemBg: "bg-red-100",
      bgLight: "bg-red-50",
      textColor: "text-red-700",
      ringLight: "ring-red-200",
    },
  },
  {
    id: "operations",
    label: "Operations",
    href: "/operations",
    desc: "Revenue cycle, workforce & compliance",
    color: "teal",
    classes: {
      dot: "bg-teal-500",
      headerColor: "text-teal-700",
      headerBg: "bg-teal-100",
      borderAccent: "border-teal-400",
      hoverBg: "hover:bg-teal-50",
      divideColor: "divide-teal-100",
      activeItemBg: "bg-teal-100",
      bgLight: "bg-teal-50",
      textColor: "text-teal-700",
      ringLight: "ring-teal-200",
    },
  },
] as const;

// The Equity Imperative — not a pillar, not in PILLARS. A cross-cutting test
// ("is it just?") applied to each of the five above. Kept as Pillar-shaped
// data (not a 6th array entry) so its page, badge, and book-chapter link
// still have somewhere to get a label/color/href from, without any code that
// enumerates "the pillars" picking it up as a peer by accident.
export const EQUITY_IMPERATIVE: Pillar = {
  id: "equity",
  label: "The Equity Imperative",
  href: "/equity",
  desc: "Is it just? — SDOH, algorithmic bias & access disparity, tested against every pillar",
  color: "violet",
  classes: {
    dot: "bg-violet-500",
    headerColor: "text-violet-700",
    headerBg: "bg-violet-100",
    borderAccent: "border-violet-400",
    hoverBg: "hover:bg-violet-50",
    divideColor: "divide-violet-100",
    activeItemBg: "bg-violet-100",
    bgLight: "bg-violet-50",
    textColor: "text-violet-700",
    ringLight: "ring-violet-200",
  },
};

export function getPillar(id: PillarId | ImperativeId): Pillar {
  if (id === "equity") return EQUITY_IMPERATIVE;
  const p = PILLARS.find((p) => p.id === id);
  if (!p) throw new Error(`Unknown pillar: ${id}`);
  return p;
}

// ─── DERIVED LISTS ───────────────────────────────────────────────────────────
// Use these instead of writing another pillar array. Every hardcoded list is a
// place the framework can silently drift back to six — which is exactly how
// Equity ended up rendered as a peer chip on the homepage for weeks after the
// book had already moved on.

/** The five pillar ids, in load-bearing order. Never includes "equity". */
export const PILLAR_IDS: readonly PillarId[] = PILLARS.map((p) => p.id as PillarId);

/** The five pillar labels, in load-bearing order. */
export const PILLAR_LABELS: readonly string[] = PILLARS.map((p) => p.label);

/**
 * Pillars plus the Equity Imperative, each tagged with which kind it is.
 *
 * For the surfaces that legitimately show both — a tag/badge renderer, a
 * chapter link, a filter row with a separated imperative. The `kind` flag is
 * the point: it lets a component render Equity while still refusing to put it
 * in the numbered row. Code that means "every pillar" wants PILLARS, not this.
 */
export type FrameworkItem = Pillar & { kind: "pillar" | "imperative" };

export const FRAMEWORK_ITEMS: readonly FrameworkItem[] = [
  ...PILLARS.map((p) => ({ ...p, kind: "pillar" as const })),
  { ...EQUITY_IMPERATIVE, kind: "imperative" as const },
];

/** True for the Equity Imperative — i.e. "this must not go in a pillar row". */
export function isImperative(id: string): boolean {
  return id.toLowerCase() === "equity";
}
