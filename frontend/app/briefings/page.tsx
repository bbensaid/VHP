import Link from "next/link";
import FrameworkMapDiagram, { PILLAR_QUESTION } from "@/components/framework/FrameworkMapDiagram";
import { BRIEFINGS } from "@/lib/briefings/briefings";
import { getPillar } from "@/lib/taxonomy/pillars";

export const metadata = {
  title: "The 2026 Briefings | Five Pillars in Sequence",
  description: "One sourced briefing per pillar, in the execution sequence the book argues for: Policy, Technology, Economics, Clinical, Operations, each held to the Equity Imperative.",
};

export default function BriefingsIndex() {
  return (
    <div className="max-w-6xl mx-auto pb-16">
      <header className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-8 items-center mb-10">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400 mb-3">The 2026 Briefings</p>
          <h1 className="text-3xl md:text-[2.6rem] font-black leading-[1.08] tracking-tight text-slate-900 text-balance mb-4">
            Five pillars, in the order they have to happen
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 max-w-[60ch]">
            Chapter 1 of <Link href="/book" className="underline underline-offset-2">Transforming Healthcare</Link> argues that transformation runs Policy → Technology → Economics → Clinical → Operations. Each briefing answers one pillar&apos;s question with the most consequential development of 2026, with every figure sourced.
          </p>
        </div>
        <div className="flex justify-center">
          <FrameworkMapDiagram lit idPrefix="briefings-index" className="w-full max-w-[420px] h-auto" />
        </div>
      </header>

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BRIEFINGS.map((b, i) => {
          const p = getPillar(b.pillar);
          return (
            <li key={b.slug}>
              <Link href={`/briefings/${b.slug}`} className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition-shadow">
                <span className="flex items-center gap-2 mb-3">
                  <span className="inline-grid place-items-center w-6 h-6 rounded-full text-xs font-bold text-white" style={{ background: p.hexStrong }}>{i + 1}</span>
                  <span className="text-xs font-black uppercase tracking-[0.12em]" style={{ color: p.hexStrong }}>{p.label}</span>
                  <span className="text-xs text-slate-400">{PILLAR_QUESTION[b.pillar]}</span>
                </span>
                <span className="text-lg font-black leading-snug text-slate-900 group-hover:underline text-balance">{b.headline}</span>
                <span className="mt-3 text-sm text-slate-500">
                  <span className="font-extrabold tabular-nums" style={{ color: p.hexStrong }}>{b.facts[0].value}</span> {b.facts[0].label}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
