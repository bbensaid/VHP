import Link from "next/link";
import {
  BookOpenIcon,
  BuildingLibraryIcon,
  BanknotesIcon,
  CpuChipIcon,
  HeartIcon,
  ScaleIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import {
  CHAPTERS,
  CHAPTER_GROUPS,
  resolvePlatformLink,
  type ChapterGroup,
  PILLARS,
  type PillarId,
} from "@/lib/taxonomy";
import { getAllTracks } from "@/lib/narration";
import { getCoursesByChapter, type PillarCourse } from "@/lib/course-api";
import { client } from "@/lib/sanity";

interface ChapterBrief { _id: string; title: string; pillar?: string; slug?: { current: string } }

/** All policyAnalysis briefs that carry a chapterRef, grouped by chapter num. */
async function getBriefsByChapter(): Promise<Record<string, ChapterBrief[]>> {
  const briefs: Array<ChapterBrief & { chapterRef?: string }> = await client.fetch(
    `*[_type == "policyAnalysis" && defined(chapterRef)]{ _id, title, pillar, slug, chapterRef }`,
    {},
    { next: { revalidate: 300 } }
  );
  const map: Record<string, ChapterBrief[]> = {};
  for (const b of briefs ?? []) {
    if (!b.chapterRef) continue;
    (map[b.chapterRef] ??= []).push(b);
  }
  return map;
}

// Map chapter.num -> reader-mode slug. Built once at module load.
const CHAPTER_SLUGS: Record<string, string> = Object.fromEntries(
  getAllTracks().map((t) => [t.id, t.slug])
);

export const metadata = {
  title: "The Book | Transforming American Healthcare — HTR",
  description:
    "Transforming American Healthcare: A Six-Pillar Framework for System Transformation. The intellectual foundation of the HTR Platform — 20 chapters covering Policy, Economics, Technology, Clinical, Equity, and Operations.",
};

// ─── VIEW-LOCAL CONFIG ────────────────────────────────────────────────────────
// Things specific to *this page's presentation*. Anything that other pages also
// consume lives in lib/taxonomy/.

const PILLAR_ICONS: Record<PillarId, React.ComponentType<{ className?: string }>> = {
  policy: BuildingLibraryIcon,
  economics: BanknotesIcon,
  technology: CpuChipIcon,
  clinical: HeartIcon,
  equity: ScaleIcon,
  operations: Cog6ToothIcon,
};

const GROUP_BADGE_CLASSES: Record<ChapterGroup, string> = {
  Foundations: "bg-slate-100 text-slate-700",
  "Policy Pillar": "bg-sky-100 text-sky-700",
  "Technology Pillar": "bg-indigo-100 text-indigo-700",
  "Economics Pillar": "bg-emerald-100 text-emerald-700",
  "Clinical Pillar": "bg-red-100 text-red-700",
  "Equity Pillar": "bg-violet-100 text-violet-700",
  "Operations Pillar": "bg-teal-100 text-teal-700",
  "Future & Strategy": "bg-amber-100 text-amber-700",
};

const READER_PROFILES = [
  {
    label: "Policy Professional",
    emoji: "🏛️",
    desc: "Start with Chapters 4–5 (Policy), then Chapter 2 (Sequencing) and Chapter 18 (Political Sustainability).",
    startHref: "/policy",
    startLabel: "Policy Intelligence →",
  },
  {
    label: "Healthcare Executive",
    emoji: "📊",
    desc: "Start with Chapters 8–9 (Economics), then Chapters 14–15 (Operations) and Chapter 19 (Portfolio Management).",
    startHref: "/economics",
    startLabel: "Economics Intelligence →",
  },
  {
    label: "Vermont Practitioner",
    emoji: "🍁",
    desc: "Chapters 4, 10, and 20 are written directly for you. Vermont programs and clinical transformation are your primary thread.",
    startHref: "/vermont-medicaid",
    startLabel: "Vermont Programs →",
  },
  {
    label: "Student or Researcher",
    emoji: "🔬",
    desc: "Start with Chapter 1 (Framework), Chapter 2 (Sequencing), and the Research Lab tools that correspond to each pillar.",
    startHref: "/research-lab",
    startLabel: "Research Lab →",
  },
];

const KEY_CONCEPTS = [
  { term: "Six-Pillar Framework", def: "Policy, Economics, Technology, Clinical, Equity, Operations — must move together. Addressed in Chapter 1.", href: "/about/framework" },
  { term: "The 15 Dependency Relationships", def: "The structural interdependencies between pillars that determine execution order and failure risk.", href: "/about/framework" },
  { term: "Execution Sequence", def: "Why Policy → Technology → Economics → Clinical → Equity → Operations is non-negotiable. Chapters 2–3.", href: "/htr-simulator" },
  { term: "The OneCare Failure", def: "Vermont's ACO failure used as a sequencing autopsy — economics without technology readiness.", href: "/vermont-vcci" },
  { term: "Vermont Thread", def: "Vermont's Acts 167 & 68, Blueprint, VCCI, AHEAD, and RHT Program as the book's primary teaching case.", href: "/vermont-act-68" },
  { term: "The AHEAD Model", def: "Medicare's entry into Vermont's total cost of care reform — integrating with Act 68's global budget mandate.", href: "/ahead-model" },
  { term: "Reference-Based Pricing", def: "The pricing architecture that precedes global budgets — anchoring payments to a transparent reference.", href: "/economics/value" },
  { term: "VBC Readiness (6 Domains)", def: "The six organizational readiness dimensions any health system must score before assuming value-based risk.", href: "/research-lab/knowledge-workspace?tab=readiness" },
  { term: "Failure Cascade", def: "How a gap in one pillar triggers compounding failures across the other five.", href: "/transformation-friction-index" },
  { term: "AHS Restructuring Roadmap", def: "Vermont's Agency of Human Services restructuring as a live Chapter 20 six-pillar case study.", href: "/vermont-act-68" },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default async function BookPage() {
  // Book ↔ platform tie-in (§7.2): courses + analysis briefs per chapter num.
  const [coursesByChapter, briefsByChapter] = await Promise.all([
    getCoursesByChapter(),
    getBriefsByChapter(),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">

      {/* HERO ─────────────────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-indigo-900 text-white p-8 md:p-14 mb-12 shadow-2xl">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />

        {/* Floating cover thumbnail (md+ only — doesn't compete with title on mobile) */}
        <div className="hidden md:block absolute top-8 right-8 lg:top-10 lg:right-12 w-32 lg:w-40 rotate-3 shadow-2xl shadow-black/40 ring-1 ring-white/10 rounded-md overflow-hidden">
          <img src="/book-cover.svg" alt="Transforming American Healthcare — book cover" className="w-full h-auto block" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-black uppercase tracking-widest text-white/80">
              Health Transformation Review
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-xs font-black uppercase tracking-widest text-indigo-200">
              Book — v28
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
            Transforming<br className="hidden md:block" /> American Healthcare
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-medium mb-2">
            A Six-Pillar Framework for System Transformation
          </p>
          <p className="text-sm text-white/50 mb-8 max-w-2xl">
            The intellectual foundation of the HTR Platform. {CHAPTERS.filter(c => /^\d+$/.test(c.num)).length} chapters covering the complete theory and practice of healthcare system transformation — with Vermont as the primary teaching case.
          </p>

          <div className="flex flex-wrap gap-6 mb-8">
            {[
              { n: String(CHAPTERS.filter(c => /^\d+$/.test(c.num)).length), label: "Chapters" },
              { n: String(PILLARS.length), label: "Pillars" },
              { n: "380+", label: "Pages" },
              { n: "15", label: "Dependency Relationships" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white">{s.n}</div>
                <div className="text-xs text-white/50 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="/HTR_Book_v28_Final2.pdf" download="Transforming_American_Healthcare_HTR.pdf" className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg shadow-black/20">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download PDF
            </a>
            <Link href="/read/preface" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors">
              <BookOpenIcon className="w-4 h-4" />
              Read Online
            </Link>
            <Link href="/book/listen" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors">
              <SpeakerWaveIcon className="w-4 h-4" />
              Listen
            </Link>
            <Link href="#chapters" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/20 transition-colors">
              Browse Chapters
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* BOOK + PLATFORM ALIGNMENT ─────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-indigo-900 mb-2">
                Book &amp; Platform — Total Alignment
              </h2>
              <p className="text-sm text-indigo-800 leading-relaxed mb-4">
                Every chapter maps directly to a section of this platform. The book provides the intellectual framework, evidence base, and practitioner guidance. The platform provides the interactive tools, real-time data, research lab, and Vermont-specific intelligence. Together they form a complete system.
              </p>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Appendix G of the book — <em>&ldquo;A Reader&apos;s Guide to the Health Transformation Review Platform&rdquo;</em> — maps each reader profile and chapter to specific platform paths. Every pillar, tool, and Vermont program on this platform has a corresponding chapter in the book.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF EMBED ─────────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Read the Full Book</h2>
          <a href="/HTR_Book_v28_Final2.pdf" download="Transforming_American_Healthcare_HTR.pdf" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            <ArrowDownTrayIcon className="w-3.5 h-3.5" />
            Download PDF
          </a>
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
          <iframe src="/HTR_Book_v28_Final2.pdf" className="w-full" style={{ height: "700px" }} title="Transforming American Healthcare — HTR Book" />
        </div>
      </section>

      {/* READER PROFILES ──────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Where to Start — by Reader Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {READER_PROFILES.map((p) => (
            <div key={p.label} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{p.emoji}</span>
                <span className="font-black text-slate-800 text-sm">{p.label}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">{p.desc}</p>
              <Link href={p.startHref} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline">
                {p.startLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* KEY CONCEPTS ──────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Key Concepts From the Book</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {KEY_CONCEPTS.map((c) => (
            <Link key={c.term} href={c.href} className="flex gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
              <div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 leading-snug">{c.term}</div>
                <div className="text-xs text-slate-500 leading-relaxed mt-0.5">{c.def}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CHAPTER BROWSER ──────────────────────────────────────────────────── */}
      <section id="chapters">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-3">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Chapter Browser</h2>
          <span className="text-slate-400 font-normal text-base normal-case">All {CHAPTERS.length} entries — mapped to the platform</span>
        </div>

        <div className="space-y-8">
          {CHAPTER_GROUPS.map((group) => {
            const chapters = CHAPTERS.filter((c) => c.group === group);
            if (chapters.length === 0) return null;
            return (
              <div key={group}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-widest ${GROUP_BADGE_CLASSES[group]}`}>
                    {group}
                  </span>
                </div>

                <div className="space-y-3">
                  {chapters.map((ch) => {
                    const pillar = ch.pillar ? PILLARS.find((p) => p.id === ch.pillar) : null;
                    const PillarIcon = ch.pillar ? PILLAR_ICONS[ch.pillar] : null;
                    const numLabel = /^\d+$/.test(ch.num) ? `Chapter ${ch.num}` : ch.num;
                    const chCourses = coursesByChapter[ch.num] ?? [];
                    const chBriefs = briefsByChapter[ch.num] ?? [];

                    return (
                      <div key={ch.num} id={`chapter-${ch.num}`} className="scroll-mt-24 rounded-xl border bg-white p-5 hover:shadow-sm transition-all border-slate-200">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          {/* Left: chapter info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {numLabel}
                              </span>
                              {pillar && PillarIcon && (
                                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${pillar.classes.bgLight} ${pillar.classes.textColor}`}>
                                  <PillarIcon className="w-3 h-3" />
                                  {pillar.label}
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-black text-slate-800 leading-snug mb-2">
                              <Link
                                href={`/read/${CHAPTER_SLUGS[ch.num] ?? ""}`}
                                className="hover:text-indigo-700 hover:underline transition-colors"
                              >
                                {ch.title}
                              </Link>
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {ch.desc}
                            </p>
                            <Link
                              href={`/read/${CHAPTER_SLUGS[ch.num] ?? ""}`}
                              className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-indigo-600 hover:text-indigo-800"
                            >
                              Read this chapter
                              <ArrowRightIcon className="w-2.5 h-2.5" />
                            </Link>

                            {/* Go deeper: Academy course(s) for this chapter (§7.2) */}
                            {chCourses.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-slate-100">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-1.5">
                                  Go Deeper · Academy
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {chCourses.map((c: PillarCourse) => (
                                    <Link
                                      key={c.slug}
                                      href={`/academy/tracks/${c.slug}`}
                                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 hover:border-sky-300 transition-all"
                                    >
                                      {c.title}
                                      <ArrowRightIcon className="w-2.5 h-2.5 opacity-50" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Related analysis briefs for this chapter (§7.2) */}
                            {chBriefs.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-slate-100">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-1.5">
                                  Related Analysis
                                </p>
                                <ul className="space-y-1">
                                  {chBriefs.slice(0, 4).map((b) => (
                                    <li key={b._id}>
                                      <Link
                                        href={`/${(b.pillar ?? "").toLowerCase()}/${b.slug?.current ?? ""}`}
                                        className="text-[11px] font-medium text-slate-500 hover:text-indigo-700 hover:underline leading-snug"
                                      >
                                        {b.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Right: platform links */}
                          <div className="shrink-0 min-w-45">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-1.5">
                              Platform
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {ch.platformLinks.map((entry, i) => {
                                const link = resolvePlatformLink(entry);
                                return (
                                  <Link
                                    key={`${link.href}-${i}`}
                                    href={link.href}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 transition-all"
                                  >
                                    {link.label}
                                    <ArrowRightIcon className="w-2.5 h-2.5 opacity-50" />
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PLATFORM CTA ─────────────────────────────────────────────────────── */}
      <section className="mt-14 mb-4">
        <div className="rounded-2xl bg-slate-900 text-white p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-black mb-3">
            Explore the Platform That Accompanies the Book
          </h2>
          <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-2xl">
            Every concept in the book has an interactive counterpart here — research lab tools, state program profiles, data dashboards, and a Six-Pillar dependency map. The platform keeps the analysis current as policy evolves.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/about/framework", label: "Six-Pillar Map", icon: "🕸️" },
              { href: "/research-lab", label: "Research Lab", icon: "🧪" },
              { href: "/vermont-act-68", label: "Vermont Act 68", icon: "🍁" },
              { href: "/htr-simulator", label: "HTR Simulator", icon: "⚙️" },
              { href: "/academy", label: "Academy", icon: "🎓" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
