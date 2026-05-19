/**
 * The six pillars of healthcare transformation.
 *
 * This is the single source of truth for pillar identity, visual styling,
 * navigation routing, and book↔platform mapping. The home sidebar, header
 * mega-menu, pillar overview pages, book chapter map, and AI Analyst context
 * tagging all read from this file.
 *
 * Adding/renaming a pillar? Edit this file only — no other code needs to change.
 */

export type PillarId =
  | "policy"
  | "economics"
  | "technology"
  | "clinical"
  | "equity"
  | "operations";

export interface Pillar {
  id: PillarId;
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
  };
}

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
    },
  },
  {
    id: "equity",
    label: "Equity",
    href: "/equity",
    desc: "SDOH, algorithmic bias & access disparity",
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
    },
  },
] as const;

export function getPillar(id: PillarId): Pillar {
  const p = PILLARS.find((p) => p.id === id);
  if (!p) throw new Error(`Unknown pillar: ${id}`);
  return p;
}
