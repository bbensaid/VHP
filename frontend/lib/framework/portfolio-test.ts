/**
 * The Portfolio Manager's Sequencing Test — book Chapter 15, §15.7.
 *
 * For each component of a transformation portfolio:
 *   1. Which pillar does it belong to?
 *   2. Is that pillar's upstream gate open?  (gate definition: §1.4 — open means
 *      the enabling work is finished, not that a milestone was declared)
 *   3. If closed — what is gating it? That is where schedule pressure belongs.
 *   4. If open — is the component running? If not, it is late by dependency
 *      order even when it is early by calendar.
 *
 * Two qualifications come from Chapter 1, not from this file:
 *   - Design work never waits for a gate (Economics-as-design runs in parallel
 *     during Stage 2, §1.11.2). Only implementation does.
 *   - Some components produce value on their own and are not gated at all —
 *     Figure 1.8 says Blueprint PCMH, CCBHC and CoCM "proceed in parallel with
 *     Technology work — correctly". The `gated` flag carries that judgement per
 *     component, so a user can set it for their own portfolio.
 *
 * Gate status is NOT re-modelled here: it comes from runSequence() in
 * sequence-engine.ts, the same engine behind /htr-simulator and the Friction
 * Index (open ≥ 70, closed < 40 — that engine's labelled assumptions).
 *
 * Tests: scripts/test-portfolio-test.cjs (run by `npm run test:engine`).
 */

import type { PillarId } from "../taxonomy/pillars";
import { BUILD_ORDER } from "./dependencies";
import { runSequence, type PillarScores, type GateStatus } from "./sequence-engine";

export type ComponentStatus = "not-started" | "design" | "implementing" | "done";

export interface PortfolioComponent {
  id: string;
  name: string;
  pillar: PillarId;
  status: ComponentStatus;
  /** Does implementation need the pillar's upstream gate open? (§15.7 step 2) */
  gated: boolean;
  /** Calendar target, shown for contrast — never used to decide a verdict. */
  due?: string;
  /** Where the book analyses it, for the Vermont preset. */
  chapter?: string;
}

export type Verdict =
  | "done"
  | "on-track"            // gate open (or not needed) and running
  | "design-in-parallel"  // design work under a closed gate — correct (§1.11.2)
  | "ready-to-implement"  // gate open, still only in design
  | "correctly-waiting"   // gate closed, not started — not "behind schedule"
  | "ahead-of-gate"       // gate closed, implementing — consumes budget for output nobody can use
  | "late-by-dependency"; // nothing to wait for, not running

export const VERDICT_LABEL: Record<Verdict, string> = {
  "done": "Done",
  "on-track": "On track",
  "design-in-parallel": "Design in parallel — correct",
  "ready-to-implement": "Gate open — ready to implement",
  "correctly-waiting": "Correctly waiting",
  "ahead-of-gate": "Running ahead of its gate",
  "late-by-dependency": "Late by dependency order",
};

export interface PillarGate {
  pillar: PillarId;
  open: boolean;
  /** Upstream pillars whose gate into this one is not open. */
  blockedBy: { pillar: PillarId; status: GateStatus; effective: number }[];
}

export interface ComponentResult {
  component: PortfolioComponent;
  verdict: Verdict;
  /** For a gated component under a closed gate: the unfinished components holding it. */
  gatingComponents: string[];
}

export interface PortfolioResult {
  gates: Record<PillarId, PillarGate>;
  components: ComponentResult[];
  /** §15.7 step 3: unfinished components in blocking upstream pillars, with how many gated components wait on each. */
  pressurePoints: { component: PortfolioComponent; waiting: number }[];
  counts: Record<Verdict, number>;
}

export function pillarGates(scores: PillarScores): Record<PillarId, PillarGate> {
  const seq = runSequence(scores);
  const out = {} as Record<PillarId, PillarGate>;
  for (const id of BUILD_ORDER) {
    const blockedBy = seq.pillars[id].gates
      .filter((g) => g.status !== "open")
      .map((g) => ({ pillar: g.dependency.from, status: g.status, effective: g.upstreamEffective }));
    out[id] = { pillar: id, open: blockedBy.length === 0, blockedBy };
  }
  return out;
}

export function verdictFor(c: PortfolioComponent, gateOpen: boolean): Verdict {
  if (c.status === "done") return "done";
  if (!c.gated || gateOpen) {
    if (c.status === "implementing") return "on-track";
    if (c.status === "design") return c.gated ? "ready-to-implement" : "on-track";
    return "late-by-dependency";
  }
  if (c.status === "design") return "design-in-parallel";
  if (c.status === "implementing") return "ahead-of-gate";
  return "correctly-waiting";
}

export function runPortfolioTest(components: PortfolioComponent[], scores: PillarScores): PortfolioResult {
  const gates = pillarGates(scores);
  const unfinished = (p: PillarId) => components.filter((c) => c.pillar === p && c.status !== "done");

  const results: ComponentResult[] = components.map((c) => {
    const gate = gates[c.pillar];
    const verdict = verdictFor(c, gate.open);
    const holding =
      c.gated && !gate.open && c.status !== "done"
        ? gate.blockedBy.flatMap((b) => unfinished(b.pillar).map((u) => u.id))
        : [];
    return { component: c, verdict, gatingComponents: holding };
  });

  const waiting = new Map<string, number>();
  for (const r of results) for (const id of r.gatingComponents) waiting.set(id, (waiting.get(id) ?? 0) + 1);
  const pressurePoints = components
    .filter((c) => waiting.has(c.id))
    .map((c) => ({ component: c, waiting: waiting.get(c.id)! }))
    .sort((a, b) => b.waiting - a.waiting);

  const counts = Object.fromEntries(Object.keys(VERDICT_LABEL).map((v) => [v, 0])) as Record<Verdict, number>;
  for (const r of results) counts[r.verdict] += 1;

  return { gates, components: results, pressurePoints, counts };
}

// ── Vermont preset: Figure 15.3, as of Fall 2026 ────────────────────────────
// Statuses read off Figure 15.3's "2026 status → stage gate" column.
// gated=false only where the book itself says the work proceeds in parallel:
// Clinical care-model programs (Figure 1.8), Operations capacity-building
// ("correctly sequenced to precede the peak execution demand", Figure 1.8),
// and analytical methodologies (§15.7: social-risk adjustment has "no upstream
// blocker"). Everything else is gated by its pillar.

export const VERMONT_PORTFOLIO: readonly PortfolioComponent[] = [
  { id: "rbp-rule", name: "Act 68 RBP-methodology rulemaking", pillar: "policy", status: "implementing", gated: true, due: "FY2027", chapter: "2" },
  { id: "ahead-close", name: "AHEAD State Agreement closeout", pillar: "policy", status: "implementing", gated: true, due: "FY2027 closeout reporting", chapter: "3" },
  { id: "rht-contract", name: "RHT Program contract management", pillar: "policy", status: "implementing", gated: true, due: "Annual federal reporting", chapter: "2" },
  { id: "strategic-plan", name: "Statewide Strategic Plan development", pillar: "policy", status: "implementing", gated: true, due: "Jan 15, 2028", chapter: "16" },
  { id: "analytics", name: "AHS-GMCB analytics-vendor deployment", pillar: "technology", status: "implementing", gated: true, due: "Jan 2027 operational", chapter: "4" },
  { id: "cin", name: "Vermont CIN build-out", pillar: "technology", status: "design", gated: true, due: "FY2028 operational", chapter: "4" },
  { id: "vitl", name: "VITL HIE expansion / FHIR compliance", pillar: "technology", status: "implementing", gated: true, due: "FY2027 mandatory", chapter: "4–5" },
  { id: "ai-gov", name: "Statewide AI-governance framework", pillar: "technology", status: "not-started", gated: true, due: "FY2028 adoption", chapter: "5" },
  { id: "rbp-impl", name: "RBP implementation (all hospitals)", pillar: "economics", status: "design", gated: true, due: "FY2028 rates in effect", chapter: "6" },
  { id: "global-budget", name: "Global-budget design & implementation", pillar: "economics", status: "design", gated: true, due: "FY2028 non-CAH", chapter: "6" },
  { id: "rht-deploy", name: "RHT Program deployment", pillar: "economics", status: "implementing", gated: true, due: "Annual targets", chapter: "2" },
  { id: "sra", name: "Social-risk-adjustment methodology", pillar: "economics", status: "design", gated: false, due: "FY2028 adoption", chapter: "10" },
  { id: "pcmh", name: "Blueprint PCMH", pillar: "clinical", status: "implementing", gated: false, due: "100% PCMH by FY2028", chapter: "8" },
  { id: "ccbhc", name: "CCBHC certification (5 entities)", pillar: "clinical", status: "implementing", gated: false, due: "4 of 5 certified Jul 2026", chapter: "8" },
  { id: "cocm", name: "CoCM statewide deployment", pillar: "clinical", status: "implementing", gated: false, due: "80%+ practices FY2028", chapter: "9" },
  { id: "heroi", name: "HEROI equity-scoring methodology", pillar: "clinical", status: "design", gated: false, due: "Iterative through FY2028", chapter: "10" },
  { id: "hospital-plans", name: "14-hospital transformation planning", pillar: "operations", status: "implementing", gated: false, due: "Final plans Mar 2026 → implementation", chapter: "11" },
  { id: "ahs-restructure", name: "AHS restructuring (HSA-coordinator model)", pillar: "operations", status: "implementing", gated: false, due: "FY2027 staffed", chapter: "16" },
  { id: "pmo", name: "AHS PMO establishment", pillar: "operations", status: "not-started", gated: false, due: "Q2 2027 operational", chapter: "12" },
];
