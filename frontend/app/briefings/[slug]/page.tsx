import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FrameworkMapDiagram, { PILLAR_QUESTION } from "@/components/framework/FrameworkMapDiagram";
import CitedText, { Cite } from "@/components/briefings/CitedText";
import { BRIEFINGS, citationOrder, getBriefing } from "@/lib/briefings/briefings";
import { SOURCES } from "@/lib/briefings/sources";
import { getPillar } from "@/lib/taxonomy/pillars";
import { getTool } from "@/lib/taxonomy/tools";
import { getChapter } from "@/lib/taxonomy/chapters";

export function generateStaticParams() {
  return BRIEFINGS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBriefing(slug);
  if (!b) return {};
  const pillar = getPillar(b.pillar);
  return {
    title: `${b.headline} | ${pillar.label} Briefing`,
    description: b.dek.replace(/\{[a-z0-9-]+\}/g, ""),
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default async function BriefingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBriefing(slug);
  if (!b) notFound();

  const pillar = getPillar(b.pillar);
  const idx = BRIEFINGS.indexOf(b);
  const prev = BRIEFINGS[idx - 1];
  const next = BRIEFINGS[idx + 1];
  const order = citationOrder(b);
  const numbers = Object.fromEntries(order.map((id, i) => [id, i + 1]));
  const toSource = (n: number) => `#source-${n}`;
  const words = b.sections.flatMap((s) => s.paragraphs).join(" ").split(/\s+/).length;

  return (
    <article className="max-w-6xl mx-auto pb-16">
      <nav aria-label="Breadcrumb" className="text-xs font-semibold text-slate-400 mb-6">
        <Link href="/briefings" className="hover:text-slate-700">The 2026 Briefings</Link>
        <span className="mx-1.5">/</span>
        <span style={{ color: pillar.hexStrong }}>{idx + 1}. {pillar.label}</span>
      </nav>

      {/* Header */}
      <header className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-8 items-center mb-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
            <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-[0.14em] text-white" style={{ background: pillar.hexStrong }}>
              {pillar.label}
            </span>
            <span className="text-sm font-semibold" style={{ color: pillar.hexStrong }}>{PILLAR_QUESTION[b.pillar]}</span>
            <span className="text-xs font-semibold text-slate-400">As of {formatDate(b.asOf)} · {Math.max(1, Math.round(words / 230))} min read</span>
          </div>
          <h1 className="text-3xl md:text-[2.6rem] font-black leading-[1.08] tracking-tight text-slate-900 text-balance mb-4">{b.headline}</h1>
          <p className="text-lg leading-relaxed text-slate-600 max-w-[62ch]">
            <CitedText text={b.dek} numbers={numbers} hrefFor={toSource} supClassName="text-slate-400" />
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-3 border-y border-slate-200 mt-6">
            {b.facts.map((f, i) => (
              <div key={f.value} className={`py-4 min-w-0 sm:pr-4 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-4" : ""}`}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-2xl font-extrabold tabular-nums tracking-tight" style={{ color: pillar.hexStrong }}>
                    {f.value}
                    <Cite ns={f.cite.map((c) => numbers[c])} hrefFor={toSource} className="text-slate-400" />
                  </span>
                  <span className="block text-[13px] leading-snug text-slate-500 mt-1">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="min-w-0 flex justify-center">
          <FrameworkMapDiagram selected={b.pillar} flow idPrefix={`briefing-${b.pillar}`} className="w-full max-w-[460px] h-auto" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-10">
        {/* Body */}
        <div className="min-w-0 max-w-[68ch]">
          {b.sections.map((s) => (
            <section key={s.heading} className="mb-9">
              <h2 className={`text-xl font-black tracking-tight mb-3 ${s.heading === "Is it just?" ? "text-violet-700" : "text-slate-900"}`}>{s.heading}</h2>
              {s.paragraphs.map((para, i) => (
                <p key={i} className="text-[16.5px] leading-[1.75] text-slate-700 mb-4">
                  <CitedText text={para} numbers={numbers} hrefFor={toSource} supClassName="text-slate-400" />
                </p>
              ))}
            </section>
          ))}

          {/* Sources */}
          <section aria-labelledby="sources" className="mt-12 pt-6 border-t border-slate-200">
            <h2 id="sources" className="text-xs font-black uppercase tracking-[0.14em] text-slate-500 mb-4">Sources</h2>
            <ol className="space-y-3">
              {order.map((id, i) => {
                const s = SOURCES[id];
                const internal = s.url.startsWith("/");
                return (
                  <li key={id} id={`source-${i + 1}`} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-1 text-sm text-slate-600 scroll-mt-24 target:bg-amber-50 rounded">
                    <span className="font-bold tabular-nums text-slate-400">{i + 1}.</span>
                    <span className="min-w-0">
                      {s.publisher}. <em>{s.title}</em>. {s.date}.{" "}
                      {internal ? (
                        <Link href={s.url} className="underline underline-offset-2 hover:text-slate-900">Read in the book</Link>
                      ) : (
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 break-words hover:text-slate-900">{s.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}</a>
                      )}
                      {s.doi && <span className="text-slate-400"> · doi:{s.doi}</span>}
                      {!internal && <span className="text-slate-400"> · checked {formatDate(s.checked)}</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-6 lg:sticky lg:top-24 self-start">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 mb-3">Work it on the platform</h2>
            <ul className="space-y-3">
              {b.tools.map((id) => {
                const t = getTool(id);
                return (
                  <li key={id}>
                    <Link href={t.href} className="group block">
                      <span className="block text-sm font-bold text-slate-800 group-hover:underline">{t.label} →</span>
                      {t.desc && <span className="block text-xs text-slate-500 leading-snug mt-0.5">{t.desc}</span>}
                    </Link>
                  </li>
                );
              })}
              {b.platform.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm font-bold text-slate-800 hover:underline">{p.label} →</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 mb-3">Learn it in the Academy</h2>
            <ul className="space-y-2">
              {b.courses.map((c) => (
                <li key={c.slug}>
                  <Link href={`/academy/tracks/${c.slug}`} className="text-sm font-bold text-slate-800 hover:underline">{c.title} →</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 mb-3">Read it in the book</h2>
            <ul className="space-y-2">
              {b.chapters.map((n) => (
                <li key={n}>
                  <Link href={`/book#chapter-${n}`} className="text-sm text-slate-700 hover:underline">
                    <span className="font-bold">Chapter {n}.</span> {getChapter(n)?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 mb-3">Ask the Analyst</h2>
            <ul className="space-y-2">
              {b.analystPrompts.map((q) => (
                <li key={q}>
                  <Link href={`/chat?q=${encodeURIComponent(q)}`} className="block text-sm text-slate-700 leading-snug rounded-lg bg-slate-50 hover:bg-slate-100 px-3 py-2">
                    {q}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Sequence navigation */}
      <nav aria-label="Next in the sequence" className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link href={`/briefings/${prev.slug}`} className="rounded-xl border border-slate-200 p-4 hover:border-slate-300">
            <span className="block text-xs font-semibold text-slate-400">← {idx}. {getPillar(prev.pillar).label}</span>
            <span className="block text-sm font-bold text-slate-800 mt-1">{prev.headline}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link href={`/briefings/${next.slug}`} className="rounded-xl border border-slate-200 p-4 hover:border-slate-300 sm:text-right">
            <span className="block text-xs font-semibold text-slate-400">{idx + 2}. {getPillar(next.pillar).label} →</span>
            <span className="block text-sm font-bold text-slate-800 mt-1">{next.headline}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
