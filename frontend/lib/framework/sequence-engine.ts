/**
 * The dependency-gate engine: what Chapter 1 argues, made executable.
 *
 * The book's claim is that pillar investment does not add up — it gates. A
 * downstream pillar cannot deliver more than its upstream gates allow, however
 * much you spend on it (§1.12.1: "Critical-path dependencies cannot be shortcut
 * by allocating more resources to the downstream intervention"). So every
 * pillar here has two numbers:
 *
 *   nominal   — what you invested / your ambition. What you set.
 *   effective — what it can actually deliver, after its upstream gates.
 *
 * The gap between them is the cost of building out of order, and the collapse
 * of the composite is the OneCare cascade (§1.2.3) reproduced arithmetically.
 *
 * Pure functions, no React, no I/O — so `scripts/test-sequence-engine.ts`
 * can check the behaviour the book describes.
 */
import type { PillarId } from "../taxonomy/pillars";
import {
  BUILD_ORDER,
  DEPENDENCIES,
  EQUITY_QUESTIONS,
  inboundGates,
  type Dependency,
} from "./dependencies";

export type PillarScores = Record<PillarId, number>;

export type GateStatus = "open" | "partial" | "closed";

/** A gate is open at 70, closed below 40 — the book gives no numbers; these are the model's. */
export const GATE_OPEN = 70;
export const GATE_CLOSED = 40;

/**
 * How much of a downstream pillar survives a given upstream level.
 *
 * A critical-path gate at zero leaves 20% — the pillar is bought but cannot
 * be run (OneCare signed the contracts; it could not manage them). An ordinary
 * gate at zero leaves 60%: degraded, not collapsed.
 */
export function gateFactor(upstreamEffective: number, criticalPath: boolean): number {
  const u = clamp(upstreamEffective) / 100;
  return criticalPath ? 0.2 + 0.8 * u : 0.6 + 0.4 * u;
}

export function gateStatus(upstreamEffective: number): GateStatus {
  if (upstreamEffective >= GATE_OPEN) return "open";
  if (upstreamEffective >= GATE_CLOSED) return "partial";
  return "closed";
}

export interface GateResult {
  dependency: Dependency;
  upstreamEffective: number;
  status: GateStatus;
  /** 0..1 multiplier this gate imposes on the downstream pillar. */
  factor: number;
}

export interface PillarResult {
  id: PillarId;
  nominal: number;
  effective: number;
  /** nominal − effective: capability paid for but not delivered. */
  penalty: number;
  gates: GateResult[];
  /** The inbound gate doing the most damage, or null when nothing is holding it back. */
  limitingGate: GateResult | null;
}

export interface EquityResult {
  /** Pillars whose justice question was answered "no". */
  failing: PillarId[];
  passes: boolean;
  questions: Record<PillarId, string>;
}

export interface SequenceResult {
  pillars: Record<PillarId, PillarResult>;
  /** Mean of the five nominal scores — what the investment looks like on paper. */
  nominalComposite: number;
  /** Mean of the five effective scores — what the sequence actually delivers. */
  effectiveComposite: number;
  /** Composite points lost to building out of order. */
  sequenceLoss: number;
  /** The pillar whose improvement would lift the composite most. */
  bindingConstraint: PillarId | null;
  equity: EquityResult;
}

function clamp(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

const round = (n: number) => Math.round(n * 10) / 10;

/**
 * Run the scores through the dependency graph.
 *
 * Computed in BUILD_ORDER, each pillar reading its upstreams' EFFECTIVE values,
 * which is what makes the damage cascade rather than stop at one hop: weak
 * Policy caps Technology, and the capped Technology — not the nominal one —
 * is what Economics is then gated on.
 */
export function runSequence(
  scores: PillarScores,
  equityAnswers?: Partial<Record<PillarId, boolean>>,
): SequenceResult {
  const pillars = {} as Record<PillarId, PillarResult>;

  for (const id of BUILD_ORDER) {
    const nominal = clamp(scores[id] ?? 0);
    const gates: GateResult[] = inboundGates(id).map((dependency) => {
      // Safe: BUILD_ORDER is a topological order of the non-feedback edges,
      // asserted in the engine tests, so every upstream is already computed.
      const upstreamEffective = pillars[dependency.from].effective;
      return {
        dependency,
        upstreamEffective,
        status: gateStatus(upstreamEffective),
        factor: gateFactor(upstreamEffective, dependency.criticalPath),
      };
    });

    const limitingGate =
      gates.length === 0
        ? null
        : gates.reduce((worst, g) => (g.factor < worst.factor ? g : worst));
    const effective = limitingGate ? nominal * limitingGate.factor : nominal;

    pillars[id] = {
      id,
      nominal,
      effective: round(effective),
      penalty: round(nominal - effective),
      gates,
      // Only call it limiting if it actually costs something.
      limitingGate: limitingGate && limitingGate.factor < 1 ? limitingGate : null,
    };
  }

  const nominalComposite = round(mean(BUILD_ORDER.map((id) => pillars[id].nominal)));
  const effectiveComposite = round(mean(BUILD_ORDER.map((id) => pillars[id].effective)));

  return {
    pillars,
    nominalComposite,
    effectiveComposite,
    sequenceLoss: round(nominalComposite - effectiveComposite),
    bindingConstraint: findBindingConstraint(scores),
    equity: evaluateEquity(equityAnswers),
  };
}

/**
 * "The one pillar whose incompleteness stalls everything downstream of it."
 *
 * Found by sensitivity, not by picking the lowest score: raise each pillar a
 * little, see which raises the delivered composite most. That is why a weak
 * Technology pillar can outrank an even weaker Operations one — Operations is
 * last in the sequence, so nothing is waiting behind it.
 */
export function findBindingConstraint(scores: PillarScores, probe = 10): PillarId | null {
  const base = compositeOf(scores);
  let best: { id: PillarId; gain: number } | null = null;

  for (const id of BUILD_ORDER) {
    const raised = { ...scores, [id]: clamp((scores[id] ?? 0) + probe) };
    const gain = compositeOf(raised) - base;
    // Strictly greater keeps the earliest pillar in build order on a tie.
    if (gain > 0 && (best === null || gain > best.gain + 1e-9)) {
      best = { id, gain };
    }
  }
  return best?.id ?? null;
}

/** Effective composite only — used by the sensitivity probe, so it must not recurse. */
function compositeOf(scores: PillarScores): number {
  const eff = {} as Record<PillarId, number>;
  for (const id of BUILD_ORDER) {
    const nominal = clamp(scores[id] ?? 0);
    const factors = inboundGates(id).map((d) => gateFactor(eff[d.from], d.criticalPath));
    eff[id] = factors.length ? nominal * Math.min(...factors) : nominal;
  }
  return mean(BUILD_ORDER.map((id) => eff[id]));
}

/**
 * The sixth question. Not a score and never averaged in: a transformation that
 * passes all five pillar tests and fails a justice question has still failed
 * (§1.3). Unanswered questions count as unmet — equity is not satisfied by
 * default.
 */
export function evaluateEquity(answers?: Partial<Record<PillarId, boolean>>): EquityResult {
  const failing = BUILD_ORDER.filter((id) => answers?.[id] !== true);
  return { failing, passes: failing.length === 0, questions: EQUITY_QUESTIONS };
}

function mean(xs: number[]): number {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
}

// ── Lag propagation ────────────────────────────────────────────────────────
// Why a sequencing error is missed until it is expensive: the upstream gap is
// real on day one, but the downstream number only moves once the lag has run
// (§1.15 — "a Technology gap shows up in Economics results a year later").

export interface LagPoint {
  month: number;
  pillars: Record<PillarId, number>;
}

export interface LagArrival {
  pillar: PillarId;
  month: number;
  drop: number;
  via: Dependency;
}

export interface LagTimeline {
  points: LagPoint[];
  /** When each downstream pillar's result first registers the shortfall. */
  arrivals: LagArrival[];
}

/**
 * Drop one pillar to `shortfallTo` at month 0 and watch the consequence travel.
 *
 * Each edge delays its damage by `lagMonths`, so a pillar two hops downstream
 * does not move until both lags have elapsed. Everything reports healthy in
 * between — which is the point.
 */
export function propagateShortfall(
  baseline: PillarScores,
  pillar: PillarId,
  shortfallTo: number,
  horizonMonths = 36,
  stepMonths = 3,
): LagTimeline {
  const shocked: PillarScores = { ...baseline, [pillar]: clamp(shortfallTo) };
  const healthy = runSequence(baseline).pillars;

  // When does each pillar's number start reflecting the shock? Shortest lag
  // path from the shocked pillar, over build-order edges.
  const arrivalMonth = {} as Record<PillarId, number>;
  for (const id of BUILD_ORDER) arrivalMonth[id] = Number.POSITIVE_INFINITY;
  arrivalMonth[pillar] = 0;
  // BUILD_ORDER is topological, so one pass settles every shortest path.
  for (const id of BUILD_ORDER) {
    for (const d of DEPENDENCIES) {
      if (d.feedback || d.from !== id) continue;
      const viaHere = arrivalMonth[id] + d.lagMonths;
      if (viaHere < arrivalMonth[d.to]) arrivalMonth[d.to] = viaHere;
    }
  }

  const settled = runSequence(shocked).pillars;
  const points: LagPoint[] = [];
  for (let month = 0; month <= horizonMonths; month += stepMonths) {
    const snapshot = {} as Record<PillarId, number>;
    for (const id of BUILD_ORDER) {
      snapshot[id] = month >= arrivalMonth[id] ? settled[id].effective : healthy[id].effective;
    }
    points.push({ month, pillars: snapshot });
  }

  const arrivals: LagArrival[] = [];
  for (const id of BUILD_ORDER) {
    if (id === pillar || !Number.isFinite(arrivalMonth[id])) continue;
    const drop = round(healthy[id].effective - settled[id].effective);
    if (drop <= 0) continue;
    const via = DEPENDENCIES.filter((d) => d.to === id && !d.feedback).reduce((a, b) =>
      arrivalMonth[a.from] + a.lagMonths <= arrivalMonth[b.from] + b.lagMonths ? a : b,
    );
    arrivals.push({ pillar: id, month: arrivalMonth[id], drop, via });
  }
  arrivals.sort((a, b) => a.month - b.month);

  return { points, arrivals };
}

// ── Presets ────────────────────────────────────────────────────────────────
// The chapter's own worked examples, so a reader can land on the page and see
// the argument run rather than having to construct it.

export interface Preset {
  id: string;
  label: string;
  blurb: string;
  scores: PillarScores;
  bookRef: string;
}

export const PRESETS: readonly Preset[] = [
  {
    id: "onecare",
    label: "OneCare Vermont (2013)",
    blurb:
      "High Economics ambition on a voluntary mandate and no integrated real-time data — the profile the chapter opens with.",
    scores: { policy: 25, technology: 20, economics: 85, clinical: 60, operations: 45 },
    bookRef: "§1.2 The OneCare Failure: A Sequencing Autopsy",
  },
  {
    id: "onecare-reordered",
    label: "The same ambition, in order",
    blurb:
      "Identical Economics, Clinical and Operations inputs. Only Policy and Technology move — the upstream gates open, and the same spending finally delivers.",
    scores: { policy: 90, technology: 80, economics: 85, clinical: 60, operations: 45 },
    bookRef: "§1.12.1 Principle 1: The Critical Path Is Non-Negotiable",
  },
  {
    id: "vermont-2026",
    label: "Vermont, Fall 2026",
    blurb:
      "Policy gate open (Acts 167/51/68). Technology partially open and still the bottleneck; Economics staged behind it for FY2027–28.",
    scores: { policy: 95, technology: 45, economics: 55, clinical: 65, operations: 50 },
    bookRef: "§1.14 Vermont's Implementation Timeline",
  },
];
