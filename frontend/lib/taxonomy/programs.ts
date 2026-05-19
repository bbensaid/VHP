/**
 * Vermont programs, cross-state programs, and other state-level intelligence
 * pages. Used by HomeSidebar's States & Programs section, the book's Vermont
 * Thread page, and the AI Analyst's page-context resolver.
 */

import type { PillarId } from "./pillars";

export type ProgramGroup =
  | "Vermont Programs"
  | "Other States & Federal";

export interface Program {
  id: string;
  label: string;
  href: string;
  group: ProgramGroup;
  pillars: PillarId[];
  /** Book chapters that anchor this program in narrative form. */
  chapters?: string[];
  desc?: string;
}

export const PROGRAMS: readonly Program[] = [
  // ── Vermont Programs ────────────────────────────────────────────────────
  { id: "vermont-medicaid",            label: "Vermont Medicaid",                href: "/vermont-medicaid",            group: "Vermont Programs", pillars: ["policy", "equity"], chapters: ["5"] },
  { id: "vermont-blueprint",           label: "Blueprint for Health",            href: "/vermont-blueprint",           group: "Vermont Programs", pillars: ["clinical"], chapters: ["10", "11"] },
  { id: "vermont-vcci",                label: "Vermont VCCI",                    href: "/vermont-vcci",                group: "Vermont Programs", pillars: ["clinical", "equity"], chapters: ["10"] },
  { id: "vermont-sash",                label: "SASH Program",                    href: "/vermont-sash",                group: "Vermont Programs", pillars: ["clinical"], chapters: ["10"] },
  { id: "vermont-designated-agencies", label: "Designated Agencies (MH/SUD)",    href: "/vermont-designated-agencies", group: "Vermont Programs", pillars: ["clinical"], chapters: ["10"] },
  { id: "vermont-sdoh",                label: "SDOH & Social Services",          href: "/vermont-sdoh",                group: "Vermont Programs", pillars: ["equity"], chapters: ["12", "13"] },
  { id: "vermont-act-167",             label: "Vermont Act 167 (2022)",          href: "/vermont-act-167",             group: "Vermont Programs", pillars: ["policy"], chapters: ["4"] },
  { id: "vermont-act-68",              label: "Vermont Act 68 (2025)",           href: "/vermont-act-68",              group: "Vermont Programs", pillars: ["policy"], chapters: ["4", "8", "20"] },
  { id: "vermont-act-68-simulator",    label: "Act 68 Simulator",                href: "/vermont-act-68/simulator",    group: "Vermont Programs", pillars: ["policy", "economics"], chapters: ["3", "4"] },
  { id: "ahead-model",                 label: "AHEAD Model",                     href: "/ahead-model",                 group: "Vermont Programs", pillars: ["economics", "policy"], chapters: ["8", "17"] },
  { id: "vermont-rht-program",         label: "RHT Program ($195M)",             href: "/vermont-rht-program",         group: "Vermont Programs", pillars: ["policy", "operations"], chapters: ["4", "20"] },
  { id: "vermont-hospital-profiles",   label: "VT Hospital Profiles",            href: "/dashboard/vermont/hospitals", group: "Vermont Programs", pillars: ["operations", "economics"], chapters: ["14", "15"] },
  { id: "bed-capacity",                label: "Bed Capacity & Transfer",         href: "/bed-capacity",                group: "Vermont Programs", pillars: ["operations", "clinical"] },
  { id: "vermont-legislative-resources", label: "Legislative Reports Library",   href: "/vermont-legislative-resources", group: "Vermont Programs", pillars: ["policy"], chapters: ["18"] },

  // ── Other States & Federal ──────────────────────────────────────────────
  { id: "california-calaim",   label: "California CalAIM",      href: "/california-calaim",   group: "Other States & Federal", pillars: ["policy", "equity", "clinical"], chapters: ["17"] },
  { id: "oregon-cco",          label: "Oregon CCO 3.0",         href: "/oregon-cco",          group: "Other States & Federal", pillars: ["policy", "economics", "equity"], chapters: ["17"] },
  { id: "states-explorer",     label: "All States Explorer",    href: "/states",              group: "Other States & Federal", pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"] },
  { id: "fifty-state-dashboard", label: "50-State Dashboard",   href: "/dashboard",           group: "Other States & Federal", pillars: ["policy", "economics", "technology", "clinical", "equity", "operations"] },
  { id: "cms-rural-simulator", label: "CMS Rural Transformation", href: "/dashboard/simulator", group: "Other States & Federal", pillars: ["policy", "economics"] },
] as const;

export const PROGRAM_GROUPS: readonly ProgramGroup[] = [
  "Vermont Programs",
  "Other States & Federal",
] as const;

export function getProgram(id: string): Program {
  const p = PROGRAMS.find((p) => p.id === id);
  if (!p) throw new Error(`Unknown program id: ${id}`);
  return p;
}

export function programsByGroup(group: ProgramGroup): Program[] {
  return PROGRAMS.filter((p) => p.group === group);
}
