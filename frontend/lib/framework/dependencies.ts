/**
 * The nine directed dependencies of the five-pillar framework.
 *
 * SINGLE SOURCE OF TRUTH. Everything that reasons about dependency order —
 * the sequence simulator, the friction index's binding constraint, the impact
 * simulation's lag propagation — reads this file. Do not re-declare these edges
 * anywhere else; that is exactly how the pillar lists drifted before.
 *
 * Every field below is taken from HTR_Book_v42.docx, Chapter 1:
 *   - the edges and their verbs: §1.4.1–§1.4.5 subsection headings
 *   - the critical path:         §1.12.1 ("three critical-path dependencies")
 *   - the currencies:            §1.4 "What Earns a Place in the Matrix"
 *   - lagMonths for tech→econ:   §1.15 ("a Technology gap shows up in
 *     Economics results a year later")
 *
 * KNOWN BOOK DISCREPANCY (reported to the author 2026-09-21, unresolved):
 * §1.12.1 names three critical-path dependencies — Policy→Economics,
 * Technology→Economics, Economics→Clinical. But the §1.4.1 heading flags
 * Policy→Operations "(critical path)" and the §1.4.2 heading does NOT flag
 * Technology→Economics. Both passages say "three"; they disagree on which
 * third. This file implements §1.12.1, because the simulator exists to enforce
 * §1.12's Principle 1. If the author resolves it the other way, flip the two
 * flags marked BOOK-DISCREPANCY below and the tests will tell you what moved.
 */
import type { PillarId } from "../taxonomy/pillars";

export type DependencyKind = "enables" | "drives" | "requires" | "feedback";

export interface Dependency {
  from: PillarId;
  to: PillarId;
  /** The verb the book uses for this edge. */
  kind: DependencyKind;
  /**
   * True for the three dependencies §1.12.1 calls non-negotiable. A closed
   * critical-path gate collapses the downstream pillar; a closed ordinary gate
   * only degrades it.
   */
  criticalPath: boolean;
  /** Feedback loops (⟲) run after the build, so they impose no build-order gate. */
  feedback: boolean;
  label: string;
  /**
   * Months between an upstream shortfall appearing and the downstream result
   * showing it. Only tech→econ is stated in the book (§1.15, "a year later");
   * the others are MODEL ASSUMPTIONS, surfaced as such in the UI.
   */
  lagMonths: number;
  bookSection: string;
}

/**
 * What each pillar issues. A dependency earns a cell only when the downstream
 * pillar cannot produce its intended result until the upstream pillar delivers
 * this. (Book §1.4; see also memory project_dependency_matrix_criterion.)
 */
export const PILLAR_CURRENCY: Record<PillarId, string> = {
  policy: "AUTHORITY",
  technology: "INFORMATION",
  economics: "INCENTIVES",
  clinical: "OUTCOMES",
  operations: "CAPACITY",
};

export const DEPENDENCIES: readonly Dependency[] = [
  {
    from: "policy", to: "technology", kind: "enables", criticalPath: false, feedback: false,
    label: "Statutory funding and mandate authorize the data build",
    lagMonths: 6, bookSection: "§1.4.1",
  },
  {
    from: "policy", to: "economics", kind: "enables", criticalPath: true, feedback: false,
    label: "Mandatory authority enables structural payment reform",
    lagMonths: 12, bookSection: "§1.4.1",
  },
  {
    // BOOK-DISCREPANCY: §1.4.1's heading says "(critical path)"; §1.12.1's list omits it.
    from: "policy", to: "operations", kind: "requires", criticalPath: false, feedback: false,
    label: "Statutory deadlines force execution capacity",
    lagMonths: 12, bookSection: "§1.4.1",
  },
  {
    // BOOK-DISCREPANCY: §1.4.2's heading omits "(critical path)"; §1.12.1 names it as one of the three.
    from: "technology", to: "economics", kind: "enables", criticalPath: true, feedback: false,
    label: "Analytics makes VBC financial management possible",
    lagMonths: 12, bookSection: "§1.4.2 / §1.12.1",
  },
  {
    from: "technology", to: "clinical", kind: "enables", criticalPath: false, feedback: false,
    label: "Data infrastructure enables population health management",
    lagMonths: 9, bookSection: "§1.4.2",
  },
  {
    from: "economics", to: "clinical", kind: "drives", criticalPath: true, feedback: false,
    label: "Payment incentives drive care delivery redesign",
    lagMonths: 12, bookSection: "§1.4.3",
  },
  {
    from: "clinical", to: "operations", kind: "requires", criticalPath: false, feedback: false,
    label: "Care models require execution infrastructure",
    lagMonths: 6, bookSection: "§1.4.4",
  },
  {
    from: "operations", to: "policy", kind: "feedback", criticalPath: false, feedback: true,
    label: "Implementation data feeds back into policy design",
    lagMonths: 12, bookSection: "§1.4.5",
  },
  {
    from: "operations", to: "technology", kind: "feedback", criticalPath: false, feedback: true,
    label: "Workforce runs the data infrastructure",
    lagMonths: 6, bookSection: "§1.4.5",
  },
];

/**
 * The execution sequence (§1.9). Also a valid topological order of the
 * non-feedback edges above, which is what lets the cascade be computed in one
 * pass — asserted in the engine's tests.
 */
export const BUILD_ORDER: readonly PillarId[] = [
  "policy",
  "technology",
  "economics",
  "clinical",
  "operations",
];

/** Build-order (non-feedback) dependencies flowing into a pillar. */
export function inboundGates(pillar: PillarId): Dependency[] {
  return DEPENDENCIES.filter((d) => d.to === pillar && !d.feedback);
}

/** Everything this pillar feeds, feedback loops included. */
export function outbound(pillar: PillarId): Dependency[] {
  return DEPENDENCIES.filter((d) => d.from === pillar);
}

/**
 * The five justice questions (§1.3). The Equity Imperative is not a sixth
 * pillar and never a scored axis — it is the question each pillar must answer.
 */
export const EQUITY_QUESTIONS: Record<PillarId, string> = {
  policy: "Permissible — and does the mandate close disparities or widen them?",
  technology: "Possible — and does the data make disparities visible, or bury them in averages?",
  economics: "Sustainable — and do the incentives reward serving the hardest-to-reach, or penalize it?",
  clinical: "Effective — and effective for whom?",
  operations: "Executable — and executable everywhere, including the rural and under-resourced?",
};
