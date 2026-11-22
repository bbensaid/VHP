"use client";
// Interactive 50-state comparison views for /rht-review. Receives compact, already-computed rows from the server.
import { useMemo, useState } from "react";
import Link from "next/link";

export type DashRow = {
  slug: string; name: string; fy26: number; fy27: number; ptw: number; ptwShare: number; yoyPct: number;
  categories: Record<string, number>; categorized: number; uncategorized: number; overReported: number;
  themes: Record<string, string>; // key -> evidence
  policy: { code: string; committed: boolean; status: string | null; detail: string | null }[];
};
export type DashProps = {
  rows: DashRow[];
  categories: { key: string; pillar: string; color: string }[];
  themes: { key: string; label: string }[];
  policyActions: { code: string; name: string }[];
  r: number;
  medianPace: number;
};

const M = (n: number) => `$${(n / 1e6).toFixed(1)}M`;
const P = (x: number, d = 0) => `${(x * 100).toFixed(d)}%`;
// Sequential blue ramp (light -> dark) for shares 0..1.
const RAMP = ["#f1f5f9", "#cde2fb", "#9ec5f4", "#6da7ec", "#3987e5", "#256abf", "#184f95", "#0d366b"];
const shade = (x: number) => (x <= 0 ? RAMP[0] : RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(x * (RAMP.length - 1) / 0.6))]);
const inkOn = (x: number) => (x > 0.3 ? "#ffffff" : "#0b0b0b");

function Tabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const tabs = [
    ["fingerprint", "Spending fingerprints"],
    ["plans", "What states planned"],
    ["policy", "Policy commitments"],
    ["pace", "Pace vs. Year 2"],
  ];
  return (
    <div role="tablist" aria-label="Comparison views" className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-5">
      {tabs.map(([k, l]) => (
        <button key={k} role="tab" aria-selected={value === k} onClick={() => onChange(k)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg ${value === k ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-slate-100" : "text-slate-600 dark:text-slate-300 hover:text-slate-900"}`}>{l}</button>
      ))}
    </div>
  );
}

function Fingerprint({ rows, categories }: { rows: DashRow[]; categories: DashProps["categories"] }) {
  const [sortKey, setSortKey] = useState<string>("ptwShare");
  const share = (r: DashRow, k: string) => (r.categorized ? (r.categories[k] ?? 0) / Math.max(r.categorized, r.ptw) : 0);
  const sorted = useMemo(() => [...rows].sort((a, b) =>
    sortKey === "name" ? a.name.localeCompare(b.name) : sortKey === "ptwShare" ? b.ptwShare - a.ptwShare : share(b, sortKey) - share(a, sortKey)), [rows, sortKey]);
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 max-w-4xl">
        Each row is one state; each column one of CMS&apos;s spending categories. Darker = a larger share of that state&apos;s put-to-work dollars. Click a column to sort by it. Hover a cell for dollars.
      </p>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
        <table className="text-xs border-separate" style={{ borderSpacing: 2 }}>
          <thead>
            <tr>
              <th className="sticky left-0 bg-white dark:bg-slate-900 text-left p-1 align-bottom">
                <button onClick={() => setSortKey("name")} className="underline-offset-2 hover:underline font-bold text-slate-700 dark:text-slate-200">State</button>
              </th>
              <th className="p-1 align-bottom">
                <button onClick={() => setSortKey("ptwShare")} className={`font-bold ${sortKey === "ptwShare" ? "text-blue-700" : "text-slate-700 dark:text-slate-200"} hover:underline`}>Put to work, % of award</button>
              </th>
              {categories.map((c) => (
                <th key={c.key} className="p-1 align-bottom w-[64px]">
                  <button onClick={() => setSortKey(c.key)} title={`Sort by ${c.key}`}
                    className={`block mx-auto [writing-mode:vertical-rl] rotate-180 text-left font-semibold h-36 ${sortKey === c.key ? "text-blue-700" : "text-slate-700 dark:text-slate-200"} hover:underline`}>
                    <span className="inline-block w-2 h-2 rounded-sm mr-1" style={{ background: c.color }} />{c.key}
                  </button>
                </th>
              ))}
              <th className="p-1 align-bottom w-[64px]"><span className="block mx-auto [writing-mode:vertical-rl] rotate-180 text-left font-semibold h-36 text-slate-500">Not categorized by CMS</span></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => {
              const denom = Math.max(r.categorized, r.ptw) || 1;
              return (
                <tr key={r.slug}>
                  <td className="sticky left-0 bg-white dark:bg-slate-900 pr-2 whitespace-nowrap">
                    <Link href={`/rht-review/${r.slug}`} className="text-slate-800 dark:text-slate-200 hover:underline">{r.name}</Link>
                  </td>
                  <td className="px-1">
                    <div className="flex items-center gap-1.5 w-28" title={`${M(r.ptw)} of ${M(r.fy26)}`}>
                      <div className="h-2.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-r"><div className="h-2.5 rounded-r bg-slate-700 dark:bg-slate-300" style={{ width: `${Math.min(1, r.ptwShare) * 100}%` }} /></div>
                      <span className="tabular-nums w-9 text-right text-slate-800 dark:text-slate-200">{P(r.ptwShare)}</span>
                    </div>
                  </td>
                  {categories.map((c) => {
                    const v = r.categories[c.key] ?? 0, x = v / denom;
                    return (
                      <td key={c.key} className="h-6 w-[64px] text-center tabular-nums rounded-sm" style={{ background: shade(x), color: inkOn(x) }}
                        title={`${r.name} · ${c.key}: ${v ? M(v) : "none"}${v ? ` (${P(x, 1)})` : ""}`}>
                        {x >= 0.1 ? P(x) : ""}<span className="sr-only">{v ? `${M(v)}` : "none"}</span>
                      </td>
                    );
                  })}
                  <td className="h-6 w-[64px] text-center tabular-nums rounded-sm text-slate-500" style={{ background: r.uncategorized > 0 ? "repeating-linear-gradient(45deg,#e2e8f0 0 3px,#ffffff 3px 6px)" : "transparent" }}
                    title={r.uncategorized > 0 ? `${M(r.uncategorized)} of ${r.name}'s total has no CMS category` : r.overReported > 0 ? `CMS's category lines exceed the reported total by ${M(r.overReported)}` : "All dollars categorized"}>
                    {r.uncategorized / denom >= 0.1 ? P(r.uncategorized / denom) : r.overReported > 1e6 ? "+" : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] text-slate-600 dark:text-slate-300">
        <span>Share of the state&apos;s put-to-work dollars:</span>
        {[0, 0.05, 0.15, 0.3, 0.45, 0.6].map((x) => <span key={x} className="inline-flex items-center gap-1"><span className="w-4 h-3 rounded-sm border border-slate-200" style={{ background: shade(x) }} />{x === 0 ? "0" : `${P(x)}+`}</span>)}
        <span className="inline-flex items-center gap-1 ml-2"><span className="w-4 h-3 rounded-sm border border-slate-200" style={{ background: "repeating-linear-gradient(45deg,#e2e8f0 0 3px,#ffffff 3px 6px)" }} />not categorized by CMS</span>
        <span className="ml-2">“+” = CMS&apos;s category lines exceed the state&apos;s total</span>
      </div>
    </div>
  );
}

function Plans({ rows, themes }: { rows: DashRow[]; themes: DashProps["themes"] }) {
  const [sel, setSel] = useState<{ s: string; t: string; ev: string } | null>(null);
  const counts = themes.map((t) => rows.filter((r) => r.themes[t.key]).length);
  const order = themes.map((t, i) => ({ ...t, n: counts[i] })).sort((a, b) => b.n - a.n);
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 max-w-4xl">
        Which themes each state&apos;s CMS project abstract names. A dot means the abstract mentions the theme; click it to read the words that triggered it. Columns are ordered from the most common theme to the least.
      </p>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
        <table className="text-xs border-separate" style={{ borderSpacing: 2 }}>
          <thead>
            <tr>
              <th className="sticky left-0 bg-white dark:bg-slate-900 text-left p-1 align-bottom font-bold">State</th>
              {order.map((t) => (
                <th key={t.key} className="p-1 align-bottom w-[46px]">
                  <span className="block mx-auto [writing-mode:vertical-rl] rotate-180 text-left font-semibold h-44 text-slate-700 dark:text-slate-200">{t.label} <span className="text-slate-500 font-normal">({t.n})</span></span>
                </th>
              ))}
              <th className="p-1 align-bottom text-slate-600">#</th>
            </tr>
          </thead>
          <tbody>
            {[...rows].sort((a, b) => a.name.localeCompare(b.name)).map((r) => (
              <tr key={r.slug}>
                <td className="sticky left-0 bg-white dark:bg-slate-900 pr-2 whitespace-nowrap"><Link href={`/rht-review/${r.slug}`} className="hover:underline text-slate-800 dark:text-slate-200">{r.name}</Link></td>
                {order.map((t) => (
                  <td key={t.key} className="h-6 w-[46px] text-center">
                    {r.themes[t.key] ? (
                      <button onClick={() => setSel({ s: r.name, t: t.label, ev: r.themes[t.key] })} aria-label={`${r.name}: ${t.label} — show evidence`}
                        className="inline-block align-middle w-4 h-4 min-h-0 p-0 leading-none rounded-full bg-teal-600 hover:ring-2 hover:ring-teal-300 focus:ring-2 focus:ring-teal-400" />
                    ) : <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" aria-label="not named" />}
                  </td>
                ))}
                <td className="text-center tabular-nums text-slate-700 dark:text-slate-300">{Object.keys(r.themes).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sel && (
        <div className="mt-3 bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-4 text-sm" role="status">
          <div className="font-bold text-teal-900 dark:text-teal-100">{sel.s} · {sel.t}</div>
          <p className="text-slate-700 dark:text-slate-300 mt-1">“{sel.ev}”</p>
          <p className="text-[11px] text-slate-500 mt-1">From the state&apos;s CMS project abstract (December 2025). Tags come from a published keyword list; a mention is not a budget commitment.</p>
        </div>
      )}
    </div>
  );
}

const STATUS: Record<string, { label: string; icon: string; cls: string }> = {
  Complete: { label: "Complete", icon: "✓", cls: "bg-[#0ca30c] text-white" },
  "In Progress": { label: "In progress", icon: "◐", cls: "bg-[#fab219] text-slate-900" },
  "No Progress": { label: "No progress", icon: "✕", cls: "bg-[#d03b3b] text-white" },
  Mixed: { label: "Mixed", icon: "±", cls: "bg-[#ec835a] text-slate-900" },
};
const statusOf = (p: DashRow["policy"][number]) => (!p.committed ? null : p.status ?? (p.detail?.startsWith("In Progress") ? "In Progress" : p.detail?.startsWith("Complete") ? "Complete" : p.detail?.startsWith("No Progress") ? "No Progress" : "In Progress"));

function Policy({ rows, actions }: { rows: DashRow[]; actions: DashProps["policyActions"] }) {
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 max-w-4xl">
        The state policy actions CMS scores, by state. Each cell shows whether the state committed and how CMS rates its progress in the 2026 State Program Snapshots. Hover for CMS&apos;s detail.
      </p>
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
        <table className="text-xs border-separate" style={{ borderSpacing: 2 }}>
          <thead>
            <tr>
              <th className="sticky left-0 bg-white dark:bg-slate-900 text-left p-1 font-bold">State</th>
              {actions.map((a) => {
                const n = rows.filter((r) => r.policy.find((p) => p.code === a.code)?.committed).length;
                return <th key={a.code} className="p-1 align-bottom w-[86px] text-slate-700 dark:text-slate-200 font-semibold leading-tight">{a.name}<div className="text-slate-500 font-normal">{n} committed</div></th>;
              })}
            </tr>
          </thead>
          <tbody>
            {[...rows].sort((a, b) => a.name.localeCompare(b.name)).map((r) => (
              <tr key={r.slug}>
                <td className="sticky left-0 bg-white dark:bg-slate-900 pr-2 whitespace-nowrap"><Link href={`/rht-review/${r.slug}`} className="hover:underline text-slate-800 dark:text-slate-200">{r.name}</Link></td>
                {actions.map((a) => {
                  const p = r.policy.find((x) => x.code === a.code);
                  const st = p ? statusOf(p) : null;
                  const s = st ? STATUS[st] : null;
                  return (
                    <td key={a.code} className="h-6 text-center" title={p?.committed ? `${a.name}: ${p.detail ?? st}` : `${a.name}: no commitment`}>
                      {s ? <span className={`inline-flex items-center justify-center w-6 h-5 rounded ${s.cls} font-bold`} aria-label={s.label}>{s.icon}</span>
                        : <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" aria-label="no commitment" />}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-3 mt-3 text-[11px] text-slate-600 dark:text-slate-300">
        {Object.values(STATUS).map((s) => <span key={s.label} className="inline-flex items-center gap-1"><span className={`inline-flex items-center justify-center w-5 h-4 rounded ${s.cls} font-bold`}>{s.icon}</span>{s.label}</span>)}
        <span className="inline-flex items-center gap-1"><span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300" />No commitment</span>
      </div>
    </div>
  );
}

function Pace({ rows, r, medianPace }: { rows: DashRow[]; r: number; medianPace: number }) {
  const [hover, setHover] = useState<DashRow | null>(null);
  const W = 760, H = 420, pad = { l: 56, r: 20, t: 20, b: 46 };
  const ys = rows.map((x) => x.yoyPct);
  const yMin = Math.floor(Math.min(...ys) - 1), yMax = Math.ceil(Math.max(...ys) + 1);
  const X = (v: number) => pad.l + Math.min(1.02, v) / 1.02 * (W - pad.l - pad.r);
  const Y = (v: number) => pad.t + (yMax - v) / (yMax - yMin) * (H - pad.t - pad.b);
  const label = new Set([...rows].sort((a, b) => b.yoyPct - a.yoyPct).slice(0, 3).concat([...rows].sort((a, b) => a.yoyPct - b.yoyPct).slice(0, 3)).map((x) => x.slug).concat(["vermont"]));
  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 max-w-4xl">
        Did states that moved money faster get more in Year 2? Each dot is a state: across, the share of its Year 1 award reported as put to work by July 31; up, the change in its Year 2 award. The correlation is weak (r = {r.toFixed(2)}), consistent with CMS&apos;s statement that the July figures do not by themselves determine the award.
      </p>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[560px]" role="img" aria-label="Scatter of put-to-work share against Year 2 change">
          {[0, 0.25, 0.5, 0.75, 1].map((v) => <g key={v}><line x1={X(v)} x2={X(v)} y1={pad.t} y2={H - pad.b} stroke="#e2e8f0" /><text x={X(v)} y={H - pad.b + 16} fontSize="11" textAnchor="middle" fill="#52514e">{P(v)}</text></g>)}
          {Array.from({ length: 7 }, (_, i) => yMin + (i * (yMax - yMin)) / 6).map((v) => <g key={v}><line x1={pad.l} x2={W - pad.r} y1={Y(v)} y2={Y(v)} stroke={Math.abs(v) < 0.01 ? "#94a3b8" : "#f1f5f9"} /><text x={pad.l - 6} y={Y(v) + 4} fontSize="11" textAnchor="end" fill="#52514e">{v.toFixed(0)}%</text></g>)}
          <line x1={pad.l} x2={W - pad.r} y1={Y(0)} y2={Y(0)} stroke="#94a3b8" />
          <line x1={X(medianPace)} x2={X(medianPace)} y1={pad.t} y2={H - pad.b} stroke="#94a3b8" strokeDasharray="4 4" />
          <text x={X(medianPace) + 4} y={pad.t + 12} fontSize="10" fill="#52514e">median pace {P(medianPace)}</text>
          {rows.map((d) => (
            <g key={d.slug} onMouseEnter={() => setHover(d)} onMouseLeave={() => setHover(null)}>
              <circle cx={X(d.ptwShare)} cy={Y(d.yoyPct)} r={12} fill="transparent" />
              <circle cx={X(d.ptwShare)} cy={Y(d.yoyPct)} r={d.slug === "vermont" ? 6 : 4.5} fill={d.slug === "vermont" ? "#eb6834" : "#2a78d6"} stroke="#fcfcfb" strokeWidth={2} />
              {label.has(d.slug) && <text x={X(d.ptwShare) + 7} y={Y(d.yoyPct) + 4} fontSize="11" fill="#0b0b0b">{d.name}</text>}
            </g>
          ))}
          <text x={(W + pad.l) / 2} y={H - 8} fontSize="12" textAnchor="middle" fill="#52514e">Year 1 award put to work by July 31, 2026</text>
          <text transform={`translate(14 ${(H - pad.b + pad.t) / 2}) rotate(-90)`} fontSize="12" textAnchor="middle" fill="#52514e">Year 2 award vs Year 1</text>
        </svg>
        <div className="text-xs text-slate-700 dark:text-slate-300 h-5">{hover ? `${hover.name}: ${P(hover.ptwShare)} put to work · Year 2 ${hover.yoyPct >= 0 ? "+" : ""}${hover.yoyPct.toFixed(1)}% · ${M(hover.fy27)}` : "Hover a dot for the state."}</div>
      </div>
    </div>
  );
}

export default function RhtDashboard(props: DashProps) {
  const [tab, setTab] = useState("fingerprint");
  return (
    <div>
      <Tabs value={tab} onChange={setTab} />
      {tab === "fingerprint" && <Fingerprint rows={props.rows} categories={props.categories} />}
      {tab === "plans" && <Plans rows={props.rows} themes={props.themes} />}
      {tab === "policy" && <Policy rows={props.rows} actions={props.policyActions} />}
      {tab === "pace" && <Pace rows={props.rows} r={props.r} medianPace={props.medianPace} />}
    </div>
  );
}
