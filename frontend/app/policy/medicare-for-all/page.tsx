import type { Metadata } from "next";
import Link from "next/link";
import { brandedMetadata } from "@/lib/brand-server";
import {
  M4A_AS_OF, M4A_BRIEF, M4A_FACTS, M4A_DEFINITIONS, M4A_WALLS, M4A_BILLS, M4A_PILLARS,
} from "@/lib/data/medicare-for-all";
import { makeCiter, SourceList, SectionHeader, GateBadge, Analysis } from "@/components/m4a/M4AParts";

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata(
    "Medicare for All: The Five-Pillar Test",
    "Medicare for All and single payer, explained through Vermont's Act 48 attempt (2011–2014). The federal bills (S.1506, H.R.3069), the alternatives, and an HTR sequencing assessment for each of the five pillars.",
  );
}

const asOf = new Date(`${M4A_AS_OF}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function MedicareForAllPage() {
  const { cite, order } = makeCiter();
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* ── HERO ── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 mb-12">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">Policy · Briefing</span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">Facts verified {asOf}</span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">{M4A_BRIEF.headline}</h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          {M4A_BRIEF.dek}{cite(["act48", "gmc14", "s1506"])}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/policy/medicare-for-all/vermont-act-48" className="text-blue-700 font-semibold underline underline-offset-2">Case study: Vermont Act 48 and Green Mountain Care →</Link>
          <Link href="/policy/medicare-for-all/modeler" className="text-blue-700 font-semibold underline underline-offset-2">Single-Payer Modeler: Vermont&apos;s 14 hospitals →</Link>
          <Link href="/policy/feasibility" className="text-blue-700 underline underline-offset-2">Policy Feasibility Studies</Link>
        </div>
      </div>

      {/* ── FACTS ── */}
      <section className="mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {M4A_FACTS.map((f) => (
            <div key={f.value + f.label} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-2xl font-black text-slate-900">{f.value}{cite(f.cite)}</div>
              <div className="text-xs text-slate-600 mt-1 leading-snug">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEFINITIONS ── */}
      <section className="mb-14" id="definitions">
        <SectionHeader label="Terms" title="Medicare for All, single payer, and what Vermont built" />
        <p className="text-sm text-slate-600 leading-relaxed mb-5 max-w-3xl">
          People use these terms interchangeably, but they mean different things, and the difference determines which of Vermont&apos;s problems apply.
        </p>
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500">Term</th>
                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500">What it means</th>
                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {M4A_DEFINITIONS.map((d) => (
                <tr key={d.term}>
                  <td className="p-3 font-semibold text-slate-800 align-top">{d.term}</td>
                  <td className="p-3 text-slate-600 align-top">{d.meaning}</td>
                  <td className="p-3 text-slate-600 align-top">{d.example}{cite(d.cite)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Analysis>
          Green Mountain Care was single payer only for the people and dollars a state can reach. By law, people on
          Medicare, federal employees, the military and members of self-insured employer plans stayed outside it.
          That boundary, more than the idea itself, is what separates Vermont&apos;s attempt from the federal bills.
        </Analysis>
      </section>

      {/* ── FEDERAL VS STATE ── */}
      <section className="mb-14" id="federal-vs-state">
        <SectionHeader label="The core question" title="Why a federal program is not a larger Vermont" />
        <p className="text-sm text-slate-600 leading-relaxed mb-5 max-w-3xl">
          Vermont ran into four walls. Three were put there by federal law, so a federal law can take them down. The fourth, financing, is the one that ended Vermont&apos;s plan, and the federal bills leave it standing.
        </p>
        <div className="space-y-4">
          {M4A_WALLS.map((w) => (
            <div key={w.wall} className={`bg-white border rounded-xl p-5 ${w.solved ? "border-slate-200" : "border-red-300"}`}>
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <h3 className="font-bold text-slate-900">{w.wall}</h3>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border ${w.solved ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}>
                  {w.solved ? "A federal law removes it" : "Still standing federally"}
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div><div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Where the wall comes from</div><p className="text-slate-700">{w.source}</p></div>
                <div><div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">What Vermont had to do</div><p className="text-slate-700">{w.vermont}</p></div>
                <div><div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">The federal bills</div><p className="text-slate-700">{w.federal}{cite(w.cite)}</p></div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-4">
          The book&apos;s Appendix A covers the ERISA limit in Vermont&apos;s later reforms: <em>Gobeille v. Liberty Mutual</em> (2016) restricted how far the state could compel every payer to take part.{" "}
          <Link href="/book" className="text-blue-700 underline">The book</Link>
        </p>
        <Analysis>
          The federal version takes down the walls that kept Vermont from becoming a true single payer. It does not take
          down the one that stopped it, financing; it only moves that problem from Montpelier to Congress. Every
          Vermont cost estimate rose as enactment got closer, from $1.61 billion in 2013 to $2.58 billion of new revenue
          in 2014.{cite(["plan13", "gmc14"])}
        </Analysis>
      </section>

      {/* ── BILLS ── */}
      <section className="mb-14" id="bills">
        <SectionHeader label="Congress, 119th" title="The federal bills side by side" />
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl">
          <table className="w-full text-xs min-w-[760px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-3 font-bold uppercase tracking-wider text-slate-500 w-[16%]"></th>
                <th className="text-left p-3 font-bold text-slate-800">S.1506 Medicare for All{cite(["s1506"])}</th>
                <th className="text-left p-3 font-bold text-slate-800">H.R.3069 Medicare for All{cite(["hr3069"])}</th>
                <th className="text-left p-3 font-bold text-slate-800">H.R.10924 Medicare for America{cite(["hr10924"])}</th>
                <th className="text-left p-3 font-bold text-slate-800">Medicare at 50 Act{cite(["baldwin"])}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {M4A_BILLS.map((r) => (
                <tr key={r.label}>
                  <td className="p-3 font-semibold text-slate-700 align-top">{r.label}</td>
                  <td className="p-3 text-slate-600 align-top">{r.s1506}</td>
                  <td className="p-3 text-slate-600 align-top">{r.hr3069}</td>
                  <td className="p-3 text-slate-600 align-top">{r.hr10924}</td>
                  <td className="p-3 text-slate-600 align-top">{r.m50}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 bg-white border border-slate-200 rounded-xl p-5 text-sm text-slate-700 leading-relaxed">
          <p className="mb-2">
            <strong>Where it stands.</strong>{" "}Democrats will hold a 56–44 Senate majority when the next Congress convenes in January, but
            &ldquo;Trump still has veto power, and Senate Republicans still hold enough seats to filibuster most bills.&rdquo;{cite(["yahoo"])}{" "}
            Sanders says Medicare for All will be his priority as the expected chair of the Senate HELP committee, and that Democrats &ldquo;could bring it about
            through the filibuster-proof budget reconciliation process.&rdquo;{cite(["rollcall"])} S.1506 itself sits in the Finance Committee.{cite(["s1506"])}
          </p>
          <p>
            <strong>What CBO has and has not estimated.</strong> CBO has not analyzed a Sanders bill. Across five illustrative single-payer designs, it found
            federal health subsidies in 2030 rising by $1.5 to $3.0 trillion and national health spending changing by anywhere from a $0.7 trillion decrease to a
            $0.3 trillion increase, depending mainly on provider payment rates and on whether long-term care is covered.{cite(["cbo"])}
          </p>
        </div>
      </section>

      {/* ── FIVE PILLARS ── */}
      <section className="mb-14" id="five-pillars">
        <SectionHeader label="The sequencing test" title="Medicare for All through the five pillars" />
        <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">
          Each pillar issues one currency that the pillars downstream need: Policy issues authority, Technology information,
          Economics incentives, Clinical outcomes and Operations capacity. A gate opens only when its currency has
          actually been issued. A bill in committee has not issued authority, and a rising trend is not an open gate. Each
          assessment below is a judgment about sequencing, not a position on the policy.
        </p>
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl mb-8">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500">Pillar</th>
                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500">Issues</th>
                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500">HTR assessment</th>
                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500">What would open it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {M4A_PILLARS.map((p) => (
                <tr key={p.pillar}>
                  <td className="p-3 font-semibold text-slate-800"><a href={`#pillar-${p.pillar}`} className="hover:underline">{p.name}</a></td>
                  <td className="p-3 text-slate-600">{p.currency}</td>
                  <td className="p-3"><GateBadge status={p.status} /></td>
                  <td className="p-3 text-slate-600 text-xs">{p.opens}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          {M4A_PILLARS.map((p) => (
            <article key={p.pillar} id={`pillar-${p.pillar}`} className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                <h3 className="text-xl font-black text-slate-900">{p.name} <span className="text-sm font-semibold text-slate-500">· issues {p.currency.toLowerCase()}</span></h3>
                <GateBadge status={p.status} />
              </div>
              <dl className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <div><dt className="font-bold text-slate-900">What it needs</dt><dd>{p.needs}</dd></div>
                <div><dt className="font-bold text-slate-900">What the bill provides</dt><dd>{p.bill}</dd></div>
                <div><dt className="font-bold text-slate-900">The evidence</dt><dd>{p.evidence}{cite(p.cite)}</dd></div>
                <div><dt className="font-bold text-slate-900">The equity question</dt><dd>{p.equity}</dd></div>
              </dl>
              <div className={`mt-4 rounded-xl border p-4 text-sm ${p.status === "CLOSED" ? "bg-red-50 border-red-200" : p.status === "CONDITIONALLY OPEN" ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200"}`}>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">HTR assessment: {p.status}</div>
                <p className="text-slate-800">{p.verdict}</p>
                <p className="text-slate-600 mt-1"><strong>What would open it:</strong> {p.opens}</p>
              </div>
            </article>
          ))}
        </div>

        <Analysis>
          Medicare for All follows the book&apos;s central argument: reform fails when downstream pillars start before
          the gates upstream of them are open. Vermont designed everything, reached its financing gate, and stopped.
          The federal debate is at the Policy gate now. The sequencing lesson is to build what does not wait for
          authority: data standards, a global-budget method that works for small hospitals, and workforce. That work
          pays off whether the end state is Medicare for All, Medicare for America or a buy-in at 50, and it is the
          work Vermont is already doing under Act 68.
        </Analysis>
        <p className="text-sm text-slate-600 mt-4">
          The framework behind these gates is set out in Chapter 1 of the book.{" "}
          <Link href="/htr-simulator" className="text-blue-700 underline underline-offset-2">Try the five-pillar sequence simulator →</Link>
        </p>
      </section>

      {/* ── SOURCES ── */}
      <section className="border-t border-slate-200 pt-8" id="sources">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Sources</h2>
        <SourceList order={order} />
        <p className="text-xs text-slate-400 mt-4">
          Every figure on this page was checked against the primary documents listed on {asOf}. Passages marked &ldquo;HTR analysis&rdquo; are this platform&apos;s reasoning, not findings of those sources.
        </p>
      </section>
    </div>
  );
}
