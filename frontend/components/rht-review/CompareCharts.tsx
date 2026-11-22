// Server-rendered comparison pieces for the RHT review: national uses, pillar mix, per-state category bars,
// planned-theme chips and the computed state read-out. All figures come from lib/rht-compare.ts.
import { PILLARS } from "@/lib/taxonomy/pillars";
import { CATEGORIES, NATIONAL, COMPARE, THEMES, PILLAR_LABEL, rankOf, type StateCompare, type PillarKey } from "@/lib/rht-compare";

const pillarHex = (k: PillarKey) => PILLARS.find((p) => p.id === k)?.hex ?? "#64748b";
const M = (n: number, d = 1) => `$${(n / 1e6).toFixed(d)}M`;
const B = (n: number, d = 2) => `$${(n / 1e9).toFixed(d)}B`;
const P = (x: number, d = 0) => `${(x * 100).toFixed(d)}%`;

export function PillarLegend() {
  return (
    <div className="flex flex-wrap gap-4 text-[11px] text-slate-600 dark:text-slate-300">
      {(["technology", "economics", "clinical", "operations"] as PillarKey[]).map((k) => (
        <span key={k} className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: pillarHex(k) }} />{PILLAR_LABEL[k]}</span>
      ))}
    </div>
  );
}

/** National put-to-work dollars by CMS category, bars coloured by HTR pillar. */
export function NationalUses() {
  const rows = CATEGORIES.map((c) => ({ ...c, v: NATIONAL.byCat[c.key] })).sort((a, b) => b.v - a.v);
  const max = Math.max(...rows.map((r) => r.v));
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.key} className="grid grid-cols-[minmax(0,13rem)_1fr_auto] items-center gap-3 text-sm">
            <span className="text-slate-700 dark:text-slate-300 truncate">{r.key}</span>
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-r" title={`${r.key}: ${M(r.v)} · ${P(r.v / NATIONAL.categorized, 1)} of categorized dollars · ${NATIONAL.statesWith(r.key)} states`}>
              <div className="h-4 rounded-r" style={{ width: `${(r.v / max) * 100}%`, background: pillarHex(r.pillar) }} />
            </div>
            <span className="tabular-nums text-slate-900 dark:text-slate-100 font-semibold text-right w-32">
              {M(r.v, 0)} <span className="font-normal text-slate-500 text-xs">· {NATIONAL.statesWith(r.key)} states</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4"><PillarLegend /></div>
    </div>
  );
}

/** One horizontal 100% bar of a state's (or the nation's) categorized dollars by pillar. */
export function PillarBar({ dollars, height = "h-3" }: { dollars: Record<string, number>; height?: string }) {
  const tot = Object.values(dollars).reduce((a, b) => a + b, 0);
  if (!tot) return <div className={`${height} rounded bg-slate-100 dark:bg-slate-800`} title="No categorized spending reported" />;
  return (
    <div className={`flex ${height} rounded overflow-hidden gap-[2px] bg-white dark:bg-slate-900`}>
      {(["technology", "economics", "clinical", "operations"] as PillarKey[]).map((k) => {
        const v = dollars[k] ?? 0;
        return v > 0 ? <div key={k} style={{ width: `${(v / tot) * 100}%`, background: pillarHex(k) }} title={`${PILLAR_LABEL[k]}: ${M(v)} (${P(v / tot)})`} /> : null;
      })}
    </div>
  );
}

/** A state's categories against the national mix. */
export function StateCategoryBars({ c }: { c: StateCompare }) {
  const rows = CATEGORIES.map((k) => ({ ...k, v: c.categories[k.key] ?? 0, nat: NATIONAL.byCat[k.key] / NATIONAL.categorized }))
    .filter((r) => r.v > 0 || r.nat > 0.03).sort((a, b) => b.v - a.v);
  const denom = c.categorized || 1;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
      <div className="grid grid-cols-[minmax(0,12rem)_1fr_auto] gap-x-3 gap-y-2 text-sm items-center">
        <span className="text-[10px] uppercase tracking-wide text-slate-500">CMS category</span>
        <span className="text-[10px] uppercase tracking-wide text-slate-500">Share of {c.name}&apos;s categorized dollars · <span className="inline-block w-3 h-[2px] bg-slate-900 dark:bg-slate-100 align-middle" /> national share</span>
        <span className="text-[10px] uppercase tracking-wide text-slate-500 text-right">Dollars</span>
        {rows.map((r) => (
          <div key={r.key} className="contents">
            <span className="text-slate-700 dark:text-slate-300 truncate">{r.key}</span>
            <div className="relative h-4 bg-slate-100 dark:bg-slate-800 rounded-r">
              <div className="h-4 rounded-r" style={{ width: `${(r.v / denom) * 100}%`, background: pillarHex(r.pillar) }} title={`${P(r.v / denom, 1)} of ${c.name}'s categorized dollars`} />
              <div className="absolute top-[-2px] bottom-[-2px] w-[2px] bg-slate-900 dark:bg-slate-100" style={{ left: `${r.nat * 100}%` }} title={`National: ${P(r.nat, 1)}`} />
            </div>
            <span className="tabular-nums text-right text-slate-900 dark:text-slate-100">{r.v ? M(r.v) : "—"}</span>
          </div>
        ))}
      </div>
      <div className="mt-4"><PillarLegend /></div>
    </div>
  );
}

export function ThemeChips({ c }: { c: StateCompare }) {
  const named = THEMES.filter((t) => c.themes[t.key]);
  const not = THEMES.filter((t) => !c.themes[t.key]);
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {named.map((t) => (
          <details key={t.key} className="group bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg px-3 py-1.5 text-sm">
            <summary className="cursor-pointer list-none text-teal-900 dark:text-teal-100 font-semibold">● {t.label}</summary>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 max-w-md leading-relaxed">“{c.themes[t.key].evidence}”</p>
          </details>
        ))}
      </div>
      {not.length > 0 && <p className="text-xs text-slate-500 mt-3">Not named in the abstract: {not.map((t) => t.label).join(" · ")}</p>}
    </div>
  );
}

/** Computed, sourced read-out of one state against the other 49. No adjectives that the numbers do not support. */
export function stateReadout(c: StateCompare): string[] {
  const out: string[] = [];
  const paceRank = rankOf(c.slug, (s) => s.ptwShare);
  out.push(`${c.name} reported ${P(c.ptwShare)} of its Year 1 award as put to work by July 31, 2026, ranking #${paceRank} of 50 on that measure (median state: ${P(medianPace)}).`);
  if (c.categorized > 0) {
    const top = CATEGORIES.map((k) => ({ k: k.key, v: c.categories[k.key] ?? 0 })).sort((a, b) => b.v - a.v)[0];
    out.push(`Its largest CMS spending category so far is ${top.k.toLowerCase()}: ${M(top.v)}, ${P(top.v / c.categorized)} of the dollars CMS categorized for ${c.name}.`);
    const admin = (c.categories["Program administration"] ?? 0) / (c.ptw || c.categorized);
    if (admin >= 0.95) out.push(`Almost all of the money reported so far (${P(admin)}) is program administration, which suggests the state's main grants and contracts had not yet been obligated by July 31.`);
  } else {
    out.push(`CMS's report assigns none of ${c.name}'s put-to-work dollars to a spending category.`);
  }
  if (c.uncategorized > 1e6) out.push(`${M(c.uncategorized)} of ${c.name}'s reported total is not assigned to a CMS category in CMS's report.`);
  if (c.overReported > 1e6) out.push(`CMS's category lines for ${c.name} add up to ${M(c.overReported)} more than its reported total; the category shares shown use CMS's lines as printed.`);
  if (c.themes.payment && !(c.categories["Provider payments"] > 0)) out.push(`Its plan names value-based payment or global budgets, but no provider payments had been reported as put to work by July 31.`);
  if (c.themes.payment && c.categories["Provider payments"] > 0) out.push(`Its plan names value-based payment or global budgets, and it is one of ${NATIONAL.statesWith("Provider payments")} states that had already put money into provider payments (${M(c.categories["Provider payments"])}).`);
  if (c.themes.bh && !(c.categories["Behavioral health"] > 0)) out.push(`Its plan names behavioral health, but no behavioral-health category spending had been reported yet.`);
  const yoyRank = rankOf(c.slug, (s) => s.yoyPct);
  out.push(`Its Year 2 award ${c.yoyPct >= 0 ? "rose" : "fell"} ${Math.abs(c.yoyPct).toFixed(1)}%, ranking #${yoyRank} of 50 by percentage change.`);
  if (c.committed) out.push(`It committed to ${c.committed} of the state policy actions CMS scores; CMS rates ${c.complete} complete and ${c.noProgress} with “No Progress”.`);
  else out.push(`It made none of the state policy commitments CMS scores.`);
  return out;
}

const sortedPace = [...COMPARE].map((s) => s.ptwShare).sort((a, b) => a - b);
const medianPace = (sortedPace[24] + sortedPace[25]) / 2;
export { B, M, P, medianPace };
