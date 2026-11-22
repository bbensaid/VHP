// National view of the states that publish an itemised list of RHT awards (lib/data/rht-review/recipients/*.json).
// Everything here is computed from those lists; recipient TYPE is HTR's name-based classification (see Recipients.tsx).
import fs from "node:fs";
import path from "node:path";
import { typeOf, type Rec } from "@/components/rht-review/Recipients";
import { Ext, SourceNote } from "@/components/rht-review/ui";
import { COMPARE } from "@/lib/rht-compare";

const DIR = path.join(process.cwd(), "lib/data/rht-review/recipients");
export function loadAllRecipients(): Rec[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")) as Rec)
    // California is HTR's second-priority state (after Vermont, which has its own agreement-level review): listed first.
    .sort((a, b) => (a.slug === "california" ? -1 : b.slug === "california" ? 1 : a.state.localeCompare(b.state)));
}

// What the published amount IS, state by state (read from each source; see the parsers in book-audit/deep/rht/).
const BASIS: Record<string, string> = {
  alabama: "Announced grants (two rounds; $1M+ printed rounded)",
  alaska: "Preliminary notices of intent to award",
  california: "Recommended Budget Period 1 subrecipients (tentative)",
  maryland: "Pillar 2 award offers, Budget Period 1",
  florida: "Year 1 awardees list",
  mississippi: "Announced awards",
  "new-jersey": "Funding allocations, Jul 31, 2026",
  oregon: "Catalyst Awards, Year 1 approved budgets",
  pennsylvania: "Authorized projects (page: $43M awarded to date)",
};

// Eight groups, fixed categorical order (validated palette, light mode; table view below gives the numbers).
const GROUPS: [string, string][] = [
  ["Hospitals & health systems", "#2a78d6"],
  ["Community & rural health centers", "#eb6834"],
  ["Behavioral health providers", "#1baf7a"],
  ["EMS & public safety", "#eda100"],
  ["Universities & colleges", "#e87ba4"],
  ["Government & public bodies", "#008300"],
  ["Tribal health organizations", "#6250d6"],
  ["Other providers & organizations", "#e34948"],
];
const groupOf = (name: string) => {
  const t = typeOf(name);
  return GROUPS.some(([g]) => g === t) ? t : "Other providers & organizations";
};
// Award-size bins, sequential blue ramp (steps 250 → 650).
const BINS: [string, number, string][] = [
  ["under $100K", 1e5, "#86b6ef"],
  ["$100K–$500K", 5e5, "#5598e7"],
  ["$500K–$1M", 1e6, "#2a78d6"],
  ["$1M–$5M", 5e6, "#1c5cab"],
  ["$5M and up", Infinity, "#104281"],
];

const M = (n: number) => (n >= 1e9 ? `$${(n / 1e9).toFixed(2)}B` : `$${(n / 1e6).toFixed(1)}M`);
const K = (n: number) => (n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : `$${Math.round(n / 1e3)}K`);
const pct = (x: number) => `${Math.round(x * 100)}%`;

export function summarize(rec: Rec) {
  const total = rec.rows.reduce((a, r) => a + r.amount, 0);
  const amounts = rec.rows.map((r) => r.amount).sort((a, b) => a - b);
  const median = amounts.length % 2 ? amounts[(amounts.length - 1) / 2] : (amounts[amounts.length / 2 - 1] + amounts[amounts.length / 2]) / 2;
  const byOrg = new Map<string, { name: string; v: number; n: number }>();
  for (const r of rec.rows) {
    const k = r.recipient.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const o = byOrg.get(k) ?? { name: r.recipient, v: 0, n: 0 };
    o.v += r.amount; o.n++; byOrg.set(k, o);
  }
  const orgs = [...byOrg.values()].sort((a, b) => b.v - a.v);
  const top10 = orgs.slice(0, 10).reduce((a, o) => a + o.v, 0) / (total || 1);
  const groups = GROUPS.map(([g]) => rec.rows.filter((r) => groupOf(r.recipient) === g).reduce((a, r) => a + r.amount, 0));
  let lo = 0;
  const bins = BINS.map(([, hi]) => { const n = rec.rows.filter((r) => r.amount >= lo && r.amount < hi).length; lo = hi; return n; });
  const fy26 = COMPARE.find((c) => c.slug === rec.slug)?.fy26 ?? 0;
  return { total, median, orgs, top10, groups, bins, fy26, repeat: orgs.filter((o) => o.n > 1).length, largest: orgs[0] };
}

function Stack({ parts, colors, labels, fmt }: { parts: number[]; colors: string[]; labels: string[]; fmt: (v: number) => string }) {
  const sum = parts.reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="flex h-4 w-full gap-[2px]" role="img" aria-label={labels.map((l, i) => `${l} ${fmt(parts[i])}`).join(", ")}>
      {parts.map((v, i) => v > 0 && (
        <div key={i} title={`${labels[i]}: ${fmt(v)} (${pct(v / sum)})`} className="h-4 first:rounded-l last:rounded-r"
          style={{ width: `${(v / sum) * 100}%`, background: colors[i], minWidth: 2 }} />
      ))}
    </div>
  );
}

export default function RecipientsNational() {
  const recs = loadAllRecipients();
  if (!recs.length) return null;
  const S = recs.map((r) => ({ rec: r, ...summarize(r) }));
  const allRows = recs.flatMap((r) => r.rows);
  const allTotal = S.reduce((a, s) => a + s.total, 0);
  const groupAll = GROUPS.map((_, i) => S.reduce((a, s) => a + s.groups[i], 0));
  const hospShare = groupAll[0] / allTotal;
  const mostConc = [...S].sort((a, b) => b.top10 - a.top10)[0];
  const leastConc = [...S].sort((a, b) => a.top10 - b.top10)[0];
  const smallest = [...S].sort((a, b) => a.median - b.median)[0];
  const biggest = [...S].sort((a, b) => b.median - a.median)[0];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          [String(recs.length), "states with an itemised list HTR could read"],
          [allRows.length.toLocaleString(), "awards listed"],
          [M(allTotal), "sum of listed awards"],
          [pct(hospShare), "of listed dollars to hospitals & health systems"],
        ].map(([v, l]) => (
          <div key={l} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-teal-700">{v}</div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">{l}</div>
          </div>
        ))}
      </div>

      <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-6 list-disc pl-5">
        <li><strong>Concentration varies more than size.</strong> In {mostConc.rec.state} the ten largest recipients take {pct(mostConc.top10)} of the listed dollars; in {leastConc.rec.state}, {pct(leastConc.top10)}.</li>
        <li><strong>Grant size reflects the design.</strong> The median award runs from {K(smallest.median)} in {smallest.rec.state} to {K(biggest.median)} in {biggest.rec.state}.</li>
        <li><strong>The lists do not measure the same thing.</strong> Some are final announcements, some preliminary notices, one is approved budgets and one is a list of authorized projects, so compare shapes, not totals (the line under each state&apos;s name says what its amounts are).</li>
      </ul>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Who got the dollars (HTR classification)</div>
          <div className="text-xs text-slate-500 mb-3">Share of each state&apos;s listed dollars, by type of recipient</div>
          <div className="space-y-2">
            {S.map((s) => (
              <div key={s.rec.slug} className="grid grid-cols-[7.5rem_1fr] items-center gap-2 text-xs">
                <a href={`/rht-review/${s.rec.slug}#recipients`} className="truncate hover:underline">{s.rec.state}</a>
                <Stack parts={s.groups} colors={GROUPS.map(([, c]) => c)} labels={GROUPS.map(([g]) => g)} fmt={M} />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-[11px] text-slate-700 dark:text-slate-300">
            {GROUPS.map(([g, c]) => <span key={g} className="inline-flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: c }} />{g}</span>)}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Many small grants or a few large ones?</div>
          <div className="text-xs text-slate-500 mb-3">Share of each state&apos;s awards, by award size</div>
          <div className="space-y-2">
            {S.map((s) => (
              <div key={s.rec.slug} className="grid grid-cols-[7.5rem_1fr] items-center gap-2 text-xs">
                <a href={`/rht-review/${s.rec.slug}#recipients`} className="truncate hover:underline">{s.rec.state}</a>
                <Stack parts={s.bins} colors={BINS.map(([, , c]) => c)} labels={BINS.map(([l]) => l)} fmt={(v) => `${v} awards`} />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-[11px] text-slate-700 dark:text-slate-300">
            {BINS.map(([l, , c]) => <span key={l} className="inline-flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: c }} />{l}</span>)}
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl" data-testid="rht-recipients-national">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-200 dark:border-slate-700">
            <th className="p-2">State</th><th className="p-2 text-right">Awards</th><th className="p-2 text-right">Sum listed</th><th className="p-2 text-right">vs Year 1 award</th>
            <th className="p-2 text-right">Median</th><th className="p-2 text-right">Top-10 share</th><th className="p-2">Largest recipient</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {S.map((s) => (
              <tr key={s.rec.slug}>
                <td className="p-2 align-top"><a className="font-semibold hover:underline text-teal-700" href={`/rht-review/${s.rec.slug}#recipients`}>{s.rec.state}</a>
                  <div className="text-[11px] leading-snug text-slate-600 dark:text-slate-400 max-w-[11rem]"><Ext href={s.rec.source.url}>{BASIS[s.rec.slug] ?? "Published list"}</Ext></div></td>
                <td className="p-2 text-right tabular-nums">{s.rec.rows.length}</td>
                <td className="p-2 text-right tabular-nums">{M(s.total)}</td>
                <td className="p-2 text-right tabular-nums">{s.fy26 ? pct(s.total / s.fy26) : "—"}</td>
                <td className="p-2 text-right tabular-nums">{K(s.median)}</td>
                <td className="p-2 text-right tabular-nums">{pct(s.top10)}</td>
                <td className="p-2 text-xs align-top">{s.largest.name} <span className="text-slate-500">({M(s.largest.v)}{s.largest.n > 1 ? `, ${s.largest.n} awards` : ""})</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-semibold text-teal-700">The numbers behind the two charts</summary>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-xs"><thead><tr className="text-left text-slate-500 border-b border-slate-200"><th className="py-1 pr-2">State</th>{GROUPS.map(([g]) => <th key={g} className="py-1 pr-2 text-right">{g}</th>)}{BINS.map(([l]) => <th key={l} className="py-1 pr-2 text-right">{l}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {S.map((s) => <tr key={s.rec.slug}><td className="py-1 pr-2">{s.rec.state}</td>{s.groups.map((v, i) => <td key={i} className="py-1 pr-2 text-right tabular-nums">{M(v)}</td>)}{s.bins.map((v, i) => <td key={`b${i}`} className="py-1 pr-2 text-right tabular-nums">{v}</td>)}</tr>)}
            </tbody></table>
        </div>
      </details>
      <SourceNote>
        Each list is the state&apos;s own publication (linked under each state&apos;s name), parsed by HTR and checked against the source&apos;s count or printed total where it prints one.
        &ldquo;vs Year 1 award&rdquo; divides the listed sum by the state&apos;s FY2026 CMS award; a list can include money from more than one budget period, so it is not a spending rate.
        Recipient types are HTR&apos;s classification from organization names and can misplace a few. A 50-state search of each state&apos;s own agency and governor pages for itemised award lists is in progress; states not shown here have not
        yet been searched, or were searched and have no usable list (for example Georgia&apos;s first $12.73 million went to five named subgrantees with no per-award
        amounts, and Wyoming&apos;s advisory-committee approval sheet clips some recipient names and shows others only as a tax ID). No state is estimated.
      </SourceNote>
    </div>
  );
}
