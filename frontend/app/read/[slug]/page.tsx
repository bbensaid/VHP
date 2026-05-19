import { notFound } from "next/navigation";
import Link from "next/link";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon,
  SpeakerWaveIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import {
  getAllTracks,
  getTrackBySlug,
  getAdjacentTracks,
  type NarrationTrack,
} from "@/lib/narration";
import { resolvePlatformLink, PILLARS } from "@/lib/taxonomy";
import BookmarkChapterButton from "@/components/BookmarkChapterButton";
import ChapterNotes from "@/components/ChapterNotes";

// ─── Static params (generates one page per chapter at build time) ───────────

export function generateStaticParams() {
  return getAllTracks().map((t) => ({ slug: t.slug }));
}

// ─── Metadata per chapter ────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) return { title: "Not found | HTR" };
  return {
    title: `${track.title} | Read | HTR`,
    description: track.desc,
  };
}

// ─── Read the narration text from public/audio/narration/*.txt ──────────────

async function readNarrationText(track: NarrationTrack): Promise<string | null> {
  const filename = track.textSrc.replace(/^\//, ""); // strip leading slash
  const absPath = path.join(process.cwd(), "public", filename);
  try {
    return await readFile(absPath, "utf-8");
  } catch {
    return null;
  }
}

// ─── Render plain text as paragraphs ────────────────────────────────────────

function NarrationBody({ text }: { text: string }) {
  // The narration text files are one paragraph per blank-line-separated block.
  // The first non-empty line is the chapter heading (already shown by the
  // page header) and is rendered as a larger lead paragraph.
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  if (blocks.length === 0) return null;
  const [first, ...rest] = blocks;
  return (
    <article className="prose prose-slate max-w-none">
      <p className="text-lg leading-relaxed text-slate-700 font-medium">{first}</p>
      {rest.map((para, i) => (
        <p key={i} className="text-base leading-relaxed text-slate-700">
          {para}
        </p>
      ))}
    </article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ChapterReaderPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) notFound();

  const text = await readNarrationText(track);
  const { prev, next } = getAdjacentTracks(slug);
  const numLabel = /^\d+$/.test(track.num) ? `Chapter ${track.num}` : track.num;
  const pillar = track.chapter.pillar ? PILLARS.find((p) => p.id === track.chapter.pillar) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-slate-500 flex items-center gap-2">
        <Link href="/book" className="hover:text-indigo-600 inline-flex items-center gap-1">
          <BookOpenIcon className="w-3.5 h-3.5" />
          The Book
        </Link>
        <span className="text-slate-300">/</span>
        <Link href="/book#chapters" className="hover:text-indigo-600">All chapters</Link>
        <span className="text-slate-300">/</span>
        <span className="font-medium text-slate-700">{numLabel}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        {/* Main reading column */}
        <main>
          <header className="mb-8 pb-6 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">
                {numLabel}
              </span>
              {pillar && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${pillar.classes.bgLight} ${pillar.classes.textColor}`}>
                  {pillar.label}
                </span>
              )}
              <span className="ml-auto">
                <BookmarkChapterButton
                  slug={track.slug}
                  title={`${numLabel} — ${track.title}`}
                  pillar={track.chapter.pillar ?? undefined}
                />
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3">
              {track.title}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">{track.desc}</p>
          </header>

          {text ? (
            <NarrationBody text={text} />
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
              <p className="font-bold mb-1">Narration text not available.</p>
              <p>The transcript file for this chapter is missing from the deployment. You can still download the book as a PDF or listen to the audio.</p>
            </div>
          )}

          {/* Prev / Next */}
          <nav className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-2 gap-4">
            <div>
              {prev && (
                <Link
                  href={`/read/${prev.slug}`}
                  className="group block p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                    <ArrowLeftIcon className="w-3 h-3" /> Previous
                  </div>
                  <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 leading-snug">
                    {prev.title}
                  </div>
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link
                  href={`/read/${next.slug}`}
                  className="group block p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all text-right"
                >
                  <div className="flex items-center justify-end gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                    Next <ArrowRightIcon className="w-3 h-3" />
                  </div>
                  <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 leading-snug">
                    {next.title}
                  </div>
                </Link>
              )}
            </div>
          </nav>
        </main>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          {/* Listen + download CTAs */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
            <Link
              href={`/book/listen?track=${encodeURIComponent(track.id)}`}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-3 py-2 rounded-lg transition-colors"
            >
              <SpeakerWaveIcon className="w-4 h-4" />
              Listen to this chapter
            </Link>
            <a
              href="/HTR_Book_v28_Final2.pdf"
              download="Transforming_American_Healthcare_HTR.pdf"
              className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors"
            >
              <ArrowDownTrayIcon className="w-3.5 h-3.5" />
              Download full book PDF
            </a>
          </div>

          {/* Private notes for this chapter */}
          <ChapterNotes slug={track.slug} />

          {/* Platform links for this chapter */}
          {track.chapter.platformLinks.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">
                Platform companion
              </h3>
              <ul className="space-y-1.5">
                {track.chapter.platformLinks.map((entry, i) => {
                  const link = resolvePlatformLink(entry);
                  return (
                    <li key={`${link.href}-${i}`}>
                      <Link
                        href={link.href}
                        className="flex items-center justify-between gap-2 text-xs text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1.5 rounded-md transition-colors group"
                      >
                        <span className="truncate">{link.label}</span>
                        <ArrowRightIcon className="w-3 h-3 shrink-0 text-slate-300 group-hover:text-indigo-500" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Chapter index */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">
              All chapters
            </h3>
            <ol className="space-y-0.5 text-[11px]">
              {getAllTracks().map((t) => {
                const tnum = /^\d+$/.test(t.num) ? t.num : t.num.slice(0, 4);
                const isActive = t.slug === slug;
                return (
                  <li key={t.slug}>
                    <Link
                      href={`/read/${t.slug}`}
                      className={`flex gap-2 px-2 py-1 rounded transition-colors ${
                        isActive
                          ? "bg-indigo-100 text-indigo-900 font-bold"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="text-slate-400 shrink-0 w-8 text-right font-mono">{tnum}</span>
                      <span className="truncate">{t.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
