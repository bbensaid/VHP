// The Five-Pillar Map drawing, shared by /about/framework (FivePillarFrameworkMap)
// and the homepage hero. Colours come from lib/taxonomy/pillars.ts and the nine
// edges from lib/framework/dependencies.ts — this file declares neither.
//
// Equity is NOT a sixth node: it is the ring enclosing all five.

import { getPillar, type PillarId } from "@/lib/taxonomy/pillars";
import { BUILD_ORDER, DEPENDENCIES, type DependencyKind } from "@/lib/framework/dependencies";

export const PILLAR_QUESTION: Record<PillarId, string> = {
  policy: "Is it permissible?",
  technology: "Is it possible?",
  economics: "Is it sustainable?",
  clinical: "Is it effective?",
  operations: "Is it executable?",
};

/**
 * The word written on each arrow — the verbs of the book's Figure 1.3. The two
 * feedback loops have their own verbs there (INFORMS ⟲, RUNS ⟲).
 */
export function dependencyVerb(from: PillarId, to: PillarId, kind: DependencyKind): string {
  if (kind === "feedback") return to === "policy" ? "informs" : "runs";
  return kind;
}

/** Where along its arrow (0–1, from the source) a label sits. The two long
 *  diagonals cross mid-diagram, so their labels sit nearer their source. */
const LABEL_AT: Partial<Record<string, number>> = { "policy>economics": 0.3, "technology>clinical": 0.2 };

// Position on the ring, degrees clockwise from 12 o'clock. Same layout as the
// book's original cover: Policy top centre, then the sequence runs clockwise.
const ANGLE: Record<PillarId, number> = { policy: 0, technology: 72, economics: 144, clinical: 216, operations: 288 };

const CX = 400, CY = 225, RAD = 160, CW = 108, CH = 58;
const MID_Y = 300;
const DY = MID_Y - CY;

const r4 = (n: number) => Math.round(n * 1e4) / 1e4;

// Equity ring: gaps (half-angle, degrees) where its two labels sit in the line.
const RING = "#a855f7";
const RING_R = 205;
const TOP_GAP = 21;
const BOTTOM_GAP = 10;

/** Clockwise ring arc between two angles measured clockwise from 12 o'clock. */
function ringArc(fromDeg: number, toDeg: number) {
  const pt = (d: number) => {
    const r = (d * Math.PI) / 180;
    return `${r4(CX + RING_R * Math.sin(r))},${r4(MID_Y - RING_R * Math.cos(r))}`;
  };
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M${pt(fromDeg)} A${RING_R},${RING_R} 0 ${large} 1 ${pt(toDeg)}`;
}

function pillarPos(id: PillarId) {
  const r = (ANGLE[id] - 90) * (Math.PI / 180);
  return { x: r4(CX + RAD * Math.cos(r)), y: r4(CY + RAD * Math.sin(r)) };
}

/** Where a ray from a card's centre, heading (dx, dy), leaves the card (plus `pad`). */
type Pt = { x: number; y: number };

/** Where a ray from a card's centre, heading (dx, dy), leaves the card (plus `pad`). */
function rectExit(c: Pt, dx: number, dy: number, pad: number): Pt {
  const hw = CW / 2 + pad, hh = CH / 2 + pad;
  const t = Math.min(dx ? hw / Math.abs(dx) : Infinity, dy ? hh / Math.abs(dy) : Infinity);
  return { x: r4(c.x + dx * t), y: r4(c.y + dy * t) };
}

/** Control point and border endpoints of a dependency curve (pre-DY coordinates). */
function baseCurve(from: PillarId, to: PillarId) {
  const a = pillarPos(from), b = pillarPos(to);
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  const nx = -(b.y - a.y), ny = b.x - a.x, nl = Math.hypot(nx, ny);
  const q = { x: r4(mx + (nx / nl) * 30), y: r4(my + (ny / nl) * 30) };
  return { a, b, q };
}

/**
 * A dependency as a quadratic curve that leaves the source card's border and
 * lands on the target card's border, so every arrowhead is visible.
 */
function edgeGeom(from: PillarId, to: PillarId) {
  const c = baseCurve(from, to);
  const q = c.q;
  const s0 = rectExit(c.a, q.x - c.a.x, q.y - c.a.y, 3);
  const e0 = rectExit(c.b, q.x - c.b.x, q.y - c.b.y, 4);
  const s = { x: s0.x, y: r4(s0.y + DY) }, e = { x: e0.x, y: r4(e0.y + DY) }, qq = { x: q.x, y: r4(q.y + DY) };
  const path = `M${s.x},${s.y} Q${qq.x},${qq.y} ${e.x},${e.y}`;
  // The label rides a copy of the curve drawn left-to-right, so no word is upside down.
  const reversed = s.x > e.x;
  const labelPath = reversed ? `M${e.x},${e.y} Q${qq.x},${qq.y} ${s.x},${s.y}` : path;
  return { path, labelPath, reversed };
}

export interface FrameworkMapDiagramProps {
  /** Pillar whose edges stay lit; unrelated pillars and edges fade. */
  selected?: PillarId | null;
  /** Makes the pillar cards buttons. Omit for a static drawing (hero, cover). */
  onSelect?: (id: PillarId) => void;
  /** Draw every edge at full strength (cover art) instead of the faint idle state. */
  lit?: boolean;
  /** Animate the selected pillar's edges (honours prefers-reduced-motion). */
  flow?: boolean;
  className?: string;
  /** Unique per instance so marker ids don't collide when several maps share a page. */
  idPrefix?: string;
}

export default function FrameworkMapDiagram({
  selected = null, onSelect, lit = false, flow = false, className, idPrefix = "fpm",
}: FrameworkMapDiagramProps) {
  const touching = selected ? DEPENDENCIES.filter((d) => d.from === selected || d.to === selected) : [];
  const relevant = selected ? new Set<PillarId>([selected, ...touching.flatMap((d) => [d.from, d.to])]) : null;
  const marker = (k: string) => `${idPrefix}-arrow-${k}`;
  const label = selected
    ? `Five-pillar framework map, ${getPillar(selected).label} selected, with the Equity Imperative applied to every pillar`
    : "Five-pillar framework dependency map, with the Equity Imperative applied to every pillar";

  return (
    <svg
      // 15px taller than the content box so the bottom ring caption isn't clipped.
      viewBox="140 70 520 450"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label={label}
    >
      <defs>
        {/* One arrowhead per pillar colour: `context-stroke` isn't supported everywhere. */}
        {BUILD_ORDER.map((id) => (
          <marker key={id} id={marker(id)} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M1.5 1.5L8.5 5L1.5 8.5" fill="none" stroke={getPillar(id).hex} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        ))}
      </defs>
      {flow && (
        <style>{`@media (prefers-reduced-motion: no-preference) { .${idPrefix}-flow { stroke-dasharray: 6 4; animation: ${idPrefix}-flow 1.6s linear infinite; } @keyframes ${idPrefix}-flow { to { stroke-dashoffset: -20; } } }`}</style>
      )}

      {/* The Equity Imperative ring. Its two short labels are set INTO the ring,
          curved along it in the ring's own colour, as on the original cover —
          deliberately quiet (author, 2026-10-04). No other Equity text here. */}
      <path d={ringArc(TOP_GAP, 180 - BOTTOM_GAP)} fill="none" stroke={RING} strokeWidth={2} opacity={0.55} />
      <path d={ringArc(180 + BOTTOM_GAP, 360 - TOP_GAP)} fill="none" stroke={RING} strokeWidth={2} opacity={0.55} />
      <path id={`${idPrefix}-ring-top`} d={`M${CX - RING_R},${MID_Y} A${RING_R},${RING_R} 0 0 1 ${CX + RING_R},${MID_Y}`} fill="none" />
      <path id={`${idPrefix}-ring-bottom`} d={`M${CX - RING_R},${MID_Y} A${RING_R},${RING_R} 0 0 0 ${CX + RING_R},${MID_Y}`} fill="none" />
      <text fill={RING} opacity={0.75} style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em" }}>
        <textPath href={`#${idPrefix}-ring-top`} startOffset="50%" textAnchor="middle" dominantBaseline="central">
          EQUITY IMPERATIVE
        </textPath>
      </text>
      <text fill={RING} opacity={0.75} style={{ fontSize: 10.5, fontStyle: "italic" }}>
        <textPath href={`#${idPrefix}-ring-bottom`} startOffset="50%" textAnchor="middle" dominantBaseline="central">
          Is it just?
        </textPath>
      </text>

      {/* Dependency edges. Colour = the pillar the arrow comes from (a dependency
          exists where one pillar needs what another issues, book §1.4); the word
          on the arrow is its type, as in Figure 1.3; dashed = feedback loop. */}
      {DEPENDENCIES.map((d) => {
        const src = getPillar(d.from);
        const g = edgeGeom(d.from, d.to);
        const at = LABEL_AT[`${d.from}>${d.to}`] ?? 0.5;
        const key = `${d.from}>${d.to}`;
        const isActive = !!selected && (d.from === selected || d.to === selected);
        const isFaded = !!relevant && !isActive;
        const opacity = isFaded ? 0.3 : isActive || lit ? 1 : 0.8;
        return (
          <g key={key} opacity={opacity} style={{ transition: "opacity .25s" }}>
            <path
              className={flow && isActive && !d.feedback ? `${idPrefix}-flow` : undefined}
              d={g.path}
              fill="none"
              stroke={src.hex}
              strokeWidth={isActive ? 2.25 : 1.75}
              strokeDasharray={d.feedback ? "3 3" : undefined}
              markerEnd={`url(#${marker(d.from)})`}
            />
            <path id={`${idPrefix}-lbl-${d.from}-${d.to}`} d={g.labelPath} fill="none" />
            <text dy={-3.5} fill={src.hexStrong} style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.08em" }}>
              <textPath href={`#${idPrefix}-lbl-${d.from}-${d.to}`} startOffset={`${(g.reversed ? 1 - at : at) * 100}%`} textAnchor="middle">
                {dependencyVerb(d.from, d.to, d.kind).toUpperCase()}
              </textPath>
            </text>
          </g>
        );
      })}

      {/* Pillar cards */}
      {BUILD_ORDER.map((id, i) => {
        const p = getPillar(id);
        const c = pillarPos(id);
        const cx2 = c.x, cy2 = r4(c.y + DY);
        const bx = cx2 - CW / 2, by = cy2 - CH / 2;
        const faded = relevant && !relevant.has(id);
        const interactive = !!onSelect;
        return (
          <g
            key={id}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? `${p.label} pillar` : undefined}
            aria-pressed={interactive ? selected === id : undefined}
            onClick={interactive ? () => onSelect(id) : undefined}
            onKeyDown={interactive ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(id); } } : undefined}
            style={{ cursor: interactive ? "pointer" : undefined, opacity: faded ? 0.6 : 1, transition: "opacity .15s" }}
          >
            <rect x={bx} y={by} width={CW} height={CH} rx={10} fill={p.hexLight} stroke={selected === id ? p.hex : p.hexBorder} strokeWidth={selected === id ? 2.5 : 1.5} />
            {/* Sequence number sits inside the card, so no arrow can land under it */}
            <circle cx={bx + 16} cy={by + 21} r={8.5} fill={p.hex} />
            <text x={bx + 16} y={by + 21.5} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 10.5, fontWeight: 700, fill: "#fff" }}>{i + 1}</text>
            <text x={bx + 29} y={by + 22} textAnchor="start" dominantBaseline="central" style={{ fontSize: 12.5, fontWeight: 700, fill: p.hex }}>{p.label}</text>
            <text x={cx2} y={by + 42} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 10, fill: "#6b7280" }}>“{PILLAR_QUESTION[id]}”</text>
          </g>
        );
      })}
    </svg>
  );
}
