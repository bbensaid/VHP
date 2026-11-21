// Route: /rht-review/<state> — one state's RHT Program review.
// Vermont renders the full Year 1 review. Every other state is built only from CMS documents
// (award tables, the obligated-funds report and the 2026 state snapshots) until its own review is written.
import Link from "next/link";
import { notFound } from "next/navigation";
import { RHT_STATES, rhtState, stateNotes, CMS_DOCS, usd, usdM, pct, change } from "@/lib/rht-review";
import { Ext, Section, Stat, SourceNote, StatusPill } from "@/components/rht-review/ui";
import VermontYear1Review from "@/components/rht-review/VermontYear1Review";

export function generateStaticParams() {
  return RHT_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const s = rhtState((await params).state);
  if (!s) return {};
  return s.slug === "vermont"
    ? { title: "Vermont's $195 Million: Year 1 Review of the Rural Health Transformation Program | HTR",
        description: "What Vermont planned, signed and spent in Year 1 of the Rural Health Transformation Program, and how CMS set its Year 2 award — every figure sourced to state and CMS documents." }
    : { title: `${s.state}: Rural Health Transformation Program Review | HTR`,
        description: `${s.state}'s Rural Health Transformation Program awards for Year 1 and Year 2, what it reported to CMS as put to work, and its state policy commitments — from CMS documents.` };
}

export default async function RhtStatePage({ params }: { params: Promise<{ state: string }> }) {
  const s = rhtState((await params).state);
  if (!s) return notFound();
  if (s.slug === "vermont") return <VermontYear1Review />;

  const ch = change(s);
  const notes = stateNotes(s.slug);
  const rank = [...RHT_STATES].sort((a, b) => b.fy2027 - a.fy2027).findIndex((x) => x.slug === s.slug) + 1;
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <nav className="text-xs text-slate-500 mb-6"><Link href="/rht-review" className="underline">RHT Program Review</Link>{" "}/ {s.state}</nav>
      <header className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 mb-10">
        <span className="bg-teal-100 text-teal-700 border border-teal-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">Health Transformation Review</span>
        <h1 className="ty-h1 font-black text-slate-900 dark:text-slate-100 mt-4 mb-3">{s.state}: Rural Health Transformation Program</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          This page is built from CMS&apos;s own documents{notes ? <> and the reporting cited in the review notes</> : null}. A full review of {s.state}&apos;s Year 1 — its state agreements, budget and outcomes, as in our{" "}
          <Link href="/rht-review/vermont" className="underline text-teal-700">Vermont review</Link>{" "}— has not been written yet.
        </p>
      </header>

      {notes && (
        <Section label="Review notes" title={`What has been reported about ${s.state}'s Year 1`}>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-3 list-disc pl-5">
            {notes.notes.map((n, i) => (
              <li key={i}>{n.text}{" "}<span className="text-[11px] text-slate-500">(<Ext href={notes.sources[n.src].url}>source</Ext>)</span></li>
            ))}
          </ul>
          {notes.quotes.length > 0 && (
            <div className="space-y-3 mt-6">
              {notes.quotes.map((q, i) => (
                <blockquote key={i} className="border-l-4 border-teal-300 pl-4">
                  <p className="text-sm italic text-slate-800 dark:text-slate-200">“{q.q}”</p>
                  <footer className="text-[11px] text-slate-500 mt-1">{q.who}{" "}— <Ext href={notes.sources[q.src].url}>{notes.sources[q.src].label}</Ext></footer>
                </blockquote>
              ))}
            </div>
          )}
          <SourceNote>
            Compiled {notes.asOf}{" "}from: {Object.values(notes.sources).map((x, i) => <span key={x.url}>{i > 0 ? "; " : ""}<Ext href={x.url}>{x.label}</Ext></span>)}. Notes restate only what these sources report.
          </SourceNote>
        </Section>
      )}

      <Section label="Awards" title="Year 1 and Year 2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat value={usdM(s.fy2026)} label="Year 1 (FY2026)" sub={usd(s.fy2026)} />
          <Stat value={usdM(s.fy2027)} label="Year 2 (FY2027)" sub={usd(s.fy2027)} />
          <Stat value={`${ch.dollars >= 0 ? "+" : "−"}${usdM(Math.abs(ch.dollars), 2)}`} label="Change" sub={`${ch.percent >= 0 ? "+" : ""}${ch.percent.toFixed(1)}%`} />
          <Stat value={`#${rank} of 50`} label="Year 2 award rank" />
        </div>
        <SourceNote>Sources: <Ext href={CMS_DOCS.awardsFy26.url}>{CMS_DOCS.awardsFy26.label}</Ext>; <Ext href={CMS_DOCS.awardsFy27.url}>{CMS_DOCS.awardsFy27.label}</Ext>.
          {s.bp1AwardCmsReport && Math.abs(s.bp1AwardCmsReport - s.fy2026) > 1 && <> CMS&apos;s obligated-funds report lists a different Year 1 award for {s.state}: {usd(s.bp1AwardCmsReport, 2)}.</>}
        </SourceNote>
      </Section>

      <Section label="Year 1 spending" title={`What ${s.state} reported as put to work (through July 31, 2026)`}>
        {s.putToWork != null && (
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
            <strong>{usd(s.putToWork, 2)}</strong>{" "}— {pct(s.putToWork, s.fy2026)}{" "}of the Year 1 award.
          </p>
        )}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4">
          {s.obligated.map((b, i) => (
            <div key={i}>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{b.heading}</h4>
              {b.groups.map((g, j) => (
                <div key={j} className="ml-3 mt-1">
                  {g.name && <div className="text-xs font-semibold text-slate-600">{g.name}</div>}
                  <ul className="text-xs text-slate-600 list-disc pl-5">{g.items.map((it, k) => <li key={k}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <SourceNote>
          Verbatim from <Ext href={CMS_DOCS.obligated.url}>{CMS_DOCS.obligated.label}</Ext>. CMS notes the data are state-submitted, reflect obligations as of
          July 31, 2026, and are “not a full view of state progress”; CMS will refresh them after the November 30, 2026 quarterly report.
        </SourceNote>
      </Section>

      <Section label="State policy actions" title="Commitments CMS scored for Year 2">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-[10px] uppercase tracking-wide text-slate-500">
              <th className="text-left py-2 pr-3">Action</th><th className="text-left py-2 pr-3">Commitment / CMS status</th><th className="text-right py-2">Year 2 funding attributed</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {s.policyActions.map((a) => (
                <tr key={a.code}>
                  <td className="py-2 pr-3">{a.code} {a.name}</td>
                  <td className="py-2 pr-3">
                    {a.committed ? <>Committed · <StatusPill status={a.status} />{a.status === "Mixed" && a.statusDetail && <div className="text-[11px] text-slate-500 mt-1">{a.statusDetail}</div>}</> : <span className="text-slate-500">No commitment</span>}
                  </td>
                  <td className="py-2 text-right font-semibold">${a.year2FundingM.toFixed(2)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceNote>
          Source: <Ext href={CMS_DOCS.snapshot.url}>{CMS_DOCS.snapshot.label}</Ext>, {s.state}{" "}pages. The funding CMS attributes to a policy factor is part of the
          workload half of the award; it is not the same as the year-over-year change. Method: <Ext href={CMS_DOCS.factSheet.url}>{CMS_DOCS.factSheet.label}</Ext>.
        </SourceNote>
      </Section>

      <p className="text-sm text-slate-600 dark:text-slate-300">
        More on {s.state}: <Link href={`/dashboard/${s.slug}`} className="underline text-teal-700">state dashboard</Link>{" "}·{" "}
        <Link href="/rht-review" className="underline text-teal-700">all 50 states</Link>
      </p>
    </div>
  );
}
