// components/templates/AcademyModuleEngine.tsx
// Educational module layout — sidebar navigation, progress bar, learning aides.
// Designed for student pacing and clarity, NOT blog/article consumption.

import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import AcademyContent from "@/components/AcademyContent";

const levelColors: Record<string, string> = {
  Foundational: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Intermediate:  "bg-amber-100  text-amber-800  border-amber-200",
  Advanced:      "bg-red-100    text-red-800    border-red-200",
};

async function getModule(slug: string) {
  return client.fetch(
    `*[_type == "academyModule" && slug.current == $slug][0]{
      _id, title, courseTitle, moduleNumber, totalModules,
      pillar, level, estimatedReadTime, summary,
      learningObjectives, prevModuleSlug, nextModuleSlug,
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->{ _id, _ref, url, metadata { dimensions } }
        }
      }
    }`,
    { slug },
    { cache: "no-store" }
  );
}

async function getCourseModules(courseTitle: string) {
  return client.fetch(
    `*[_type == "academyModule" && courseTitle == $courseTitle] | order(moduleNumber asc) {
      _id, title, moduleNumber, "slug": slug.current
    }`,
    { courseTitle }
  );
}

export default async function AcademyModuleEngine({ slug }: { slug: string }) {
  const module = await getModule(slug);
  if (!module) return notFound();

  const courseModules: Array<{ _id: string; title: string; moduleNumber: number; slug: string }> =
    await getCourseModules(module.courseTitle);

  const total       = courseModules.length;
  const progressPct = Math.round((module.moduleNumber / total) * 100);
  const levelStyle  = levelColors[module.level] ?? "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── STICKY TOP BAR — course title + progress ───────────────────────── */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 py-3 flex items-center gap-4">
          <Link href="/academy?tab=courses"
                className="text-slate-400 hover:text-indigo-600 text-sm font-bold shrink-0 transition-colors">
            ← Courses
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-500 truncate mb-1">{module.courseTitle}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                     style={{ width: `${progressPct}%` }} />
              </div>
              <span className="text-xs font-black text-slate-400 shrink-0">
                {module.moduleNumber} / {total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ────────────────────────────────────────────────────── */}
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 py-6">
        <div className="flex gap-5 items-start">

          {/* ── SIDEBAR — course module list ─────────────────────────────── */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-20">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-900 px-4 py-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Course</p>
                <p className="text-sm font-bold text-white leading-snug">{module.courseTitle}</p>
              </div>
              <nav className="py-1">
                {courseModules.map((m) => {
                  const isCurrent = m.slug === slug;
                  const isPast    = m.moduleNumber < module.moduleNumber;
                  return (
                    <Link
                      key={m._id}
                      href={`/academy/modules/${m.slug}`}
                      className={`flex items-start gap-3 px-4 py-3 text-sm transition-colors border-l-[3px] ${
                        isCurrent
                          ? "bg-indigo-50 border-indigo-500 text-indigo-900 font-bold"
                          : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black border ${
                        isCurrent ? "bg-indigo-600 text-white border-indigo-600" :
                        isPast    ? "bg-emerald-500 text-white border-emerald-500" :
                                    "bg-white text-slate-400 border-slate-300"
                      }`}>
                        {isPast ? "✓" : m.moduleNumber}
                      </span>
                      <span className="leading-snug">{m.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-6">

            {/* Module header card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {module.pillar && (
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                    {module.pillar}
                  </span>
                )}
                {module.level && (
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${levelStyle}`}>
                    {module.level}
                  </span>
                )}
                {module.estimatedReadTime && (
                  <span className="text-[10px] font-bold text-slate-400 ml-auto">
                    ⏱ {module.estimatedReadTime} min read
                  </span>
                )}
              </div>

              <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2">
                Module {module.moduleNumber}{module.totalModules ? ` of ${module.totalModules}` : ""}
              </p>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-5">
                {module.title}
              </h1>
              {module.summary && (
                <p className="text-base text-slate-600 leading-relaxed border-l-4 border-indigo-200 pl-4">
                  {module.summary}
                </p>
              )}
            </div>

            {/* 🎯 Learning objectives */}
            {module.learningObjectives && module.learningObjectives.length > 0 && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h2 className="flex items-center gap-2 text-sm font-black text-indigo-900 uppercase tracking-widest mb-4">
                  <span>🎯</span> What You'll Learn
                </h2>
                <ul className="space-y-2.5">
                  {module.learningObjectives.map((obj: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-indigo-800 leading-relaxed">
                      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center text-[10px] font-black">
                        {i + 1}
                      </span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Body content */}
            {module.body ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-8 sm:px-8 sm:py-10">
                <AcademyContent body={module.body} />
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-slate-400 italic">
                Content coming soon.
              </div>
            )}

            {/* Prev / Next navigation */}
            <div className="flex justify-between gap-4 pt-2 pb-8">
              {module.prevModuleSlug ? (
                <Link href={`/academy/modules/${module.prevModuleSlug}`}
                      className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-700 transition-colors shadow-sm">
                  ← Previous Module
                </Link>
              ) : <div />}

              {module.nextModuleSlug ? (
                <Link href={`/academy/modules/${module.nextModuleSlug}`}
                      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
                  Next Module →
                </Link>
              ) : (
                <Link href="/academy?tab=courses"
                      className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm">
                  ✓ Course Complete
                </Link>
              )}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
