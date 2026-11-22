// "Who received the money": renders a state's published list of RHT awards (lib/data/rht-review/recipients/<slug>.json).
// Recipient TYPE is HTR's classification from the recipient's name (keyword rules below) and is labelled as such.
import fs from "node:fs";
import path from "node:path";
import { Ext, SourceNote } from "@/components/rht-review/ui";

type Row = { program: string | null; n: number; recipient: string; county: string; amount: number; purpose: string };
type Rec = { state: string; slug: string; asOf: string; source: { label: string; url: string }; announcedTotal: number; rows: Row[]; note?: string };

export function loadRecipients(slug: string): Rec | null {
  const f = path.join(process.cwd(), "lib/data/rht-review/recipients", `${slug}.json`);
  return fs.existsSync(f) ? (JSON.parse(fs.readFileSync(f, "utf8")) as Rec) : null;
}

const TYPES: [string, RegExp][] = [
  ["Hospitals & health systems", /hospital|medical center|health system|healthcare system|regional medical|med(?:ical)? foundation/i],
  ["Community & rural health centers", /health center|\bFQHC\b|family health|community health|rural health clinic/i],
  ["Behavioral health providers", /mental health|behavioral|psychiatric|recovery|counsel|\bregion [ivx]+\b/i],
  ["EMS & public safety", /\bEMS\b|ambulance|emergency medical|fire|rescue/i],
  ["Universities & colleges", /university|college|school of/i],
  ["Long-term & post-acute care", /nursing|assisted living|home health|hospice|rehabilitation|manor/i],
  ["Pharmacies", /pharmac|drug/i],
  ["Physician & therapy practices", /\bPLLC\b|\bPC\b|clinic|medical|therapy|physicians|associates|\bLLC\b/i],
];
const typeOf = (name: string) => TYPES.find(([, rx]) => rx.test(name))?.[0] ?? "Other organizations";
const M = (n: number) => `$${(n / 1e6).toFixed(1)}M`;

export default function Recipients({ rec }: { rec: Rec }) {
  const total = rec.rows.reduce((a, r) => a + r.amount, 0);
  const byProg = Object.entries(rec.rows.reduce<Record<string, { n: number; v: number }>>((acc, r) => {
    const k = r.program ?? "Awards"; acc[k] = acc[k] ?? { n: 0, v: 0 }; acc[k].n++; acc[k].v += r.amount; return acc;
  }, {})).sort((a, b) => b[1].v - a[1].v);
  const byType = Object.entries(rec.rows.reduce<Record<string, { n: number; v: number }>>((acc, r) => {
    const k = typeOf(r.recipient); acc[k] = acc[k] ?? { n: 0, v: 0 }; acc[k].n++; acc[k].v += r.amount; return acc;
  }, {})).sort((a, b) => b[1].v - a[1].v);
  const counties = new Set(rec.rows.map((r) => r.county)).size;
  const top = [...rec.rows].sort((a, b) => b.amount - a.amount).slice(0, 10);
  const sorted = [...rec.rows].sort((a, b) => b.amount - a.amount);
  const median = sorted.length ? sorted[Math.floor(sorted.length / 2)].amount : 0;
  const maxType = Math.max(...byType.map(([, v]) => v.v));
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          [rec.rows.length.toLocaleString(), "awards listed"],
          [M(total), "total announced"],
          [String(counties), "counties"],
          [`$${(median / 1e3).toFixed(0)}K`, "median award"],
        ].map(([v, l]) => (
          <div key={l} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-teal-700">{v}</div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">{l}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">By grant program</div>
          <table className="w-full text-sm"><tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {byProg.map(([k, v]) => <tr key={k}><td className="py-1.5 pr-2">{k}</td><td className="py-1.5 text-right tabular-nums text-slate-500">{v.n}</td><td className="py-1.5 pl-3 text-right tabular-nums font-semibold">{M(v.v)}</td></tr>)}
          </tbody></table>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">By type of recipient (HTR classification)</div>
          <div className="space-y-1.5">
            {byType.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[11rem_1fr_auto] items-center gap-2 text-sm">
                <span className="truncate">{k}</span>
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-r"><div className="h-3 rounded-r bg-[#2a78d6]" style={{ width: `${(v.v / maxType) * 100}%` }} /></div>
                <span className="tabular-nums text-right w-28">{M(v.v)} <span className="text-slate-500 text-xs">· {v.n}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Ten largest awards</div>
        <table className="w-full text-sm"><tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {top.map((r) => <tr key={`${r.program}-${r.n}`}><td className="py-1.5 pr-3"><span className="font-semibold">{r.recipient}</span> <span className="text-slate-500">· {r.county}</span><div className="text-xs text-slate-600 dark:text-slate-400">{r.purpose}</div></td><td className="py-1.5 text-right tabular-nums font-semibold align-top">{M(r.amount)}</td></tr>)}
        </tbody></table>
      </div>
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-semibold text-teal-700">All {rec.rows.length} awards</summary>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-xs"><thead><tr className="text-left text-slate-500 border-b border-slate-200"><th className="py-1 pr-2">Recipient</th><th className="py-1 pr-2">County</th><th className="py-1 pr-2">Program</th><th className="py-1 pr-2">Purpose</th><th className="py-1 text-right">Amount</th></tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sorted.map((r) => <tr key={`${r.program}-${r.n}`}><td className="py-1 pr-2">{r.recipient}</td><td className="py-1 pr-2">{r.county}</td><td className="py-1 pr-2">{r.program}</td><td className="py-1 pr-2">{r.purpose}</td><td className="py-1 text-right tabular-nums">{r.amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</td></tr>)}
            </tbody></table>
        </div>
      </details>
      <SourceNote>
        From <Ext href={rec.source.url}>{rec.source.label}</Ext>. The listed awards sum to {total.toLocaleString("en-US", { style: "currency", currency: "USD" })}; the announced total is {rec.announcedTotal.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}.{" "}
        {rec.note ? `${rec.note} ` : ""}Recipient types are HTR&apos;s classification from organisation names and can misplace a few; the amounts and purposes are the state&apos;s.
      </SourceNote>
    </div>
  );
}
