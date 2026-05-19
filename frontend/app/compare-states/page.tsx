import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { STATES, SCALE_ROWS, PILLAR_ROWS, PROGRAM_ROWS, type ComparisonRow, type ComparisonCell } from "@/lib/data/state-comparison";
import { getPillar } from "@/lib/taxonomy";

export const metadata = {
  title: "Compare States | HTR",
  description:
    "Vermont, Oregon, and California side-by-side: the three transformation archetypes from Chapter 17 of Transforming American Healthcare.",
};

const VERDICT_CHIP: Record<NonNullable<ComparisonCell["verdict"]>, string> = {
  best:    "bg-emerald-100 text-emerald-800 border-emerald-200",
  middle:  "bg-amber-50 text-amber-700 border-amber-200",
  worst:   "bg-rose-50 text-rose-700 border-rose-200",
  neutral: "bg-slate-50 text-slate-500 border-slate-200",
};

function RowGroup({ title, rows }: { title: string; rows: ComparisonRow[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[720px]">
          <thead>
            <tr>
              <th className="w-1/4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 pb-3 align-bottom">
                Dimension
              </th>
              {STATES.map((s) => (
                <th
                  key={s.id}
                  className={`text-left text-xs font-black pb-3 align-bottom px-4 ${s.accent.text}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{s.emoji}</span>
                    <Link href={s.href} className="hover:underline">{s.label}</Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const pillar = row.pillar ? getPillar(row.pillar) : null;
              return (
                <tr key={row.label} className="border-t border-slate-200 align-top">
                  <td className="py-4 pr-4">
                    <div className="text-sm font-bold text-slate-800 leading-snug">{row.label}</div>
                    {pillar && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${pillar.classes.dot}`} />
                        <span className={`text-[9px] font-black uppercase tracking-widest ${pillar.classes.headerColor}`}>
                          {pillar.label}
                        </span>
                      </div>
                    )}
                    {row.caption && (
                      <div className="text-[11px] text-slate-400 mt-1 leading-snug">{row.caption}</div>
                    )}
                  </td>
                  {STATES.map((s) => {
                    const cell = row.cells[s.id];
                    return (
                      <td key={s.id} className="py-4 px-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-slate-900 leading-snug">{cell.value}</span>
                            {cell.verdict && (
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${VERDICT_CHIP[cell.verdict]}`}>
                                {cell.verdict}
                              </span>
                            )}
                          </div>
                          {cell.detail && (
                            <p className="text-[11px] text-slate-500 leading-snug">{cell.detail}</p>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function CompareStatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Hero */}
      <div className="mb-10">
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">
          Chapter 17 · Cross-state analysis
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3">
          Vermont · Oregon · California
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
          Three transformation archetypes, side by side. Vermont is the most <em>structurally</em> complete (mandatory global budgets, legislative architecture) but the smallest scale. Oregon offers the most <em>governance</em> maturity (a decade of CCO outcomes, community board accountability). California has the largest <em>investment</em> footprint (whole-person care at Medi-Cal scale). No single state has solved the transformation problem. The convergence of all three is the horizon Chapter 17 is oriented toward.
        </p>
      </div>

      {/* State summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {STATES.map((s) => (
          <Link
            key={s.id}
            href={s.href}
            className={`group rounded-xl border ${s.accent.border} ${s.accent.bg} p-5 transition-all hover:shadow-sm hover:-translate-y-0.5`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{s.emoji}</span>
              <span className={`text-lg font-black ${s.accent.text}`}>{s.label}</span>
            </div>
            <p className={`text-xs font-bold ${s.accent.text} opacity-80 mb-3`}>{s.archetype}</p>
            <span className={`inline-flex items-center gap-1 text-xs font-bold ${s.accent.text} group-hover:underline`}>
              Open state page <ArrowRightIcon className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>

      <RowGroup title="Scale & demographics"        rows={SCALE_ROWS} />
      <RowGroup title="Pillar-by-pillar comparison" rows={PILLAR_ROWS} />
      <RowGroup title="Signature programs"          rows={PROGRAM_ROWS} />

      {/* CTA */}
      <section className="mt-14 rounded-2xl bg-slate-900 text-white p-8 md:p-10">
        <h2 className="text-xl md:text-2xl font-black mb-3">
          The Chapter 17 thesis
        </h2>
        <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-2xl">
          Vermont has the architecture without the scale. Oregon has the scale without Vermont&apos;s legislative mandate. California has the investment without the payment architecture. The convergence of all three — mandatory payment reform + proven CCO governance + whole-person care investment — describes what a fully transformed state Medicaid system would look like. That convergence has not happened anywhere yet.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/read/chapter-17" className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
            Read Chapter 17
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
          <Link href="/hti-dashboard" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            Open the HTI Dashboard
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
