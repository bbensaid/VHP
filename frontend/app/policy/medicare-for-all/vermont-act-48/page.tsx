import type { Metadata } from "next";
import Link from "next/link";
import { brandedMetadata } from "@/lib/brand-server";
import { M4A_AS_OF, ACT48_TIMELINE, ACT48_TRIGGERS, GMC_BALANCE, M4A_WALLS } from "@/lib/data/medicare-for-all";
import { makeCiter, SourceList, SectionHeader, Analysis } from "@/components/m4a/M4AParts";

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata(
    "Vermont Act 48 and Green Mountain Care (2011–2014)",
    "Vermont's single-payer attempt: what Act 48 of 2011 enacted, the five conditions it set, how the cost estimates grew from 2011 to 2014, and why Gov. Shumlin stopped in December 2014. Every figure is taken from the state's own reports.",
  );
}

const asOf = new Date(`${M4A_AS_OF}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
const money = (n: number) => (n < 0 ? `(${Math.abs(n).toLocaleString("en-US")})` : n.toLocaleString("en-US"));

export default function VermontAct48Page() {
  const { cite, order } = makeCiter();
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* ── HERO ── */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 mb-12">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">Case study · Vermont</span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">Enacted 2011 · Stopped 2014</span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">Vermont Act 48 and Green Mountain Care</h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl mb-6">
          In 2011 Vermont enacted a path to a publicly financed universal health plan for every resident.
          Act 48 set up the plan, the board to govern it and the conditions it had to meet before it could start.
          It did not say how to pay for it. In December 2014 the Governor stopped at exactly that step.{cite(["act48", "gmc14"])}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/policy/medicare-for-all" className="text-blue-700 font-semibold underline underline-offset-2">← Medicare for All: the five-pillar test</Link>
          <Link href="/vermont-act-68" className="text-blue-700 underline underline-offset-2">Vermont Act 68 (2025)</Link>
        </div>
        <p className="text-xs text-slate-500 mt-4 max-w-3xl">
          A note on the name: the old greenmountaincare.org address now
          redirects to the Department of Vermont Health Access&apos;s Medicaid pages, and the Green Mountain Care <em>Board</em>{" "}created by Act 48 is today&apos;s hospital budget and rate regulator.
        </p>
      </div>

      {/* ── TIMELINE ── */}
      <section className="mb-14">
        <SectionHeader label="2011–2014" title="From design to decision" />
        <ol className="space-y-5">
          {ACT48_TIMELINE.map((e) => (
            <li key={e.date} className="flex gap-4">
              <div className="w-28 shrink-0 text-sm font-black text-blue-700 pt-0.5">{e.date}</div>
              <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4">
                <h3 className="font-bold text-slate-900 mb-1">{e.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{e.body}{cite(e.cite)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── TRIGGERS ── */}
      <section className="mb-14">
        <SectionHeader label="33 V.S.A. § 1822" title="Five conditions, none met" />
        <p className="text-sm text-slate-600 leading-relaxed mb-5 max-w-3xl">
          Green Mountain Care was to start 90 days after the last of five conditions had been met.{cite(["act48"])} The single-payer plan stopped at the second one, financing.
        </p>
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-1/2">Condition in Act 48</th>
                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500">What happened</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ACT48_TRIGGERS.map((t, i) => (
                <tr key={t.trigger}>
                  <td className="p-3 text-slate-800 align-top"><span className="font-bold mr-1">{i + 1}.</span>{t.trigger}</td>
                  <td className="p-3 text-slate-600 align-top">{t.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">Sources for outcomes: the 2013 financing plan and the 2014 report.{cite(["plan13", "gmc14"])}</p>
      </section>

      {/* ── BALANCE SHEET ── */}
      <section className="mb-14">
        <SectionHeader label="The decisive numbers" title="The 2014 balance sheet ($ millions)" />
        <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-slate-500"></th>
                {GMC_BALANCE.years.map((y) => <th key={y} className="text-right p-3 text-xs font-bold text-slate-500">{y}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {GMC_BALANCE.rows.map((r) => (
                <tr key={r.label} className={r.label === "Fund position" || r.label === "New revenue needed" ? "font-bold" : ""}>
                  <td className="p-3 text-slate-800">{r.label}</td>
                  {r.values.map((v, i) => (
                    <td key={i} className={`p-3 text-right tabular-nums ${r.label === "Fund position" && v < 0 ? "text-red-700" : "text-slate-700"}`}>{money(v)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Green Mountain Care balance sheet (Table 13). Negative values are in parentheses. These figures exclude the small-business phase-in the Governor called a
          priority; the administration estimated a phase-in would cut revenue by more than $500 million.{cite(["gmc14"])}
        </p>
        <Analysis>
          Even with an 11.5% payroll tax on every Vermont employer and income premiums of up to 9.5%, the fund was in
          deficit by its third year. Act 48&apos;s fifth condition required the Board to find that the financing was
          sustainable and would not harm Vermont&apos;s economy. The state&apos;s own numbers could not support that finding.
        </Analysis>
      </section>

      {/* ── WHO WAS OUTSIDE ── */}
      <section className="mb-14">
        <SectionHeader label="The limits of a state" title="Who a state single payer could not reach" />
        <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <li className="bg-white border border-slate-200 rounded-xl p-4"><strong>Medicare.</strong> Act 48 told the state to ask CMS to let it run Medicare. If CMS said no, Green Mountain Care would pay only after Medicare. The 2014 design left 140,000 Medicare enrollees on Medicare.{cite(["act48", "gmc14"])}</li>
          <li className="bg-white border border-slate-200 rounded-xl p-4"><strong>Federal plans.</strong> Green Mountain Care would pay only after VA, military and federal-employee coverage. The 2014 design excluded the 10,000 people on TRICARE or VA coverage.{cite(["act48", "gmc14"])}</li>
          <li className="bg-white border border-slate-200 rounded-xl p-4"><strong>Self-insured employers.</strong> Under ERISA, employers could keep their own plans. Employees could choose Green Mountain Care, or keep their employer plan with Green Mountain Care paying second.{cite(["erisa", "gmc14"])} Avalere quoted state officials acknowledging &ldquo;that Vermont has no power to regulate the actions of self-insured employers.&rdquo;{cite(["avalere"])}</li>
          <li className="bg-white border border-slate-200 rounded-xl p-4"><strong>Benefits not covered.</strong> The 2014 design would not have covered long-term care, adult dental, adult vision or hearing.{cite(["gmc14"])}</li>
        </ul>
        <p className="text-sm text-slate-600 mt-5">
          Which of these limits a federal law would remove, and which it would not:{" "}
          <Link href="/policy/medicare-for-all#federal-vs-state" className="text-blue-700 underline underline-offset-2">the four walls →</Link>{" "}
          ({M4A_WALLS.filter((w) => w.solved).length} removed by the federal bills, {M4A_WALLS.filter((w) => !w.solved).length} still standing).
        </p>
      </section>

      {/* ── LEGACY ── */}
      <section className="mb-14">
        <SectionHeader label="What survived" title="The Board outlived the plan" />
        <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
          Act 48 created the Green Mountain Care Board on July 1, 2011: a chair and four members, appointed and confirmed in the same way as a superior judge.{cite(["act48"])}{" "}
          The single-payer plan ended, but the Board became the regulator that now sets Vermont hospital budgets and is carrying out Act 68&apos;s reference-based pricing and global budgets.
        </p>
        <Analysis>
          In the book&apos;s terms, Act 48 issued authority for an institution but never issued authority for financing.
          The institution survived and became the platform for the reforms that followed. The payment reform it was
          created to finance never started.
        </Analysis>
        <div className="flex flex-wrap gap-4 text-sm mt-2">
          <Link href="/vermont-act-68" className="text-blue-700 underline underline-offset-2">Vermont Act 68 (2025) →</Link>
          <Link href="/vermont-act-167" className="text-blue-700 underline underline-offset-2">Vermont Act 167 (2022) →</Link>
        </div>
      </section>

      {/* ── SOURCES ── */}
      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4">Sources</h2>
        <SourceList order={order} />
        <p className="text-xs text-slate-400 mt-4">
          Checked against the primary documents on {asOf}. The Avalere evaluation was paid for by an interested party and is cited as such. Passages marked &ldquo;HTR analysis&rdquo; are this platform&apos;s reasoning.
        </p>
      </section>
    </div>
  );
}
