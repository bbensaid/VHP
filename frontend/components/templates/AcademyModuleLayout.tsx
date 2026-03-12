"use client";

// components/templates/AcademyModuleLayout.tsx
// Client wrapper that manages sidebar visibility for the module reader.
// Sidebar is hidden by default — user can reveal it with the toggle button.

import { useState } from "react";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/react";
import AcademyContent from "@/components/AcademyContent";

const levelColors: Record<string, string> = {
  Foundational: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Intermediate:  "bg-amber-100  text-amber-800  border-amber-200",
  Advanced:      "bg-red-100    text-red-800    border-red-200",
};

type CourseModule = { _id: string; title: string; moduleNumber: number; slug: string };

interface Props {
  module: {
    title: string;
    courseTitle: string;
    moduleNumber: number;
    totalModules: number;
    pillar?: string;
    level?: string;
    estimatedReadTime?: number;
    summary?: string;
    learningObjectives?: string[];
    prevModuleSlug?: string | null;
    nextModuleSlug?: string | null;
    body?: PortableTextBlock[];
  };
  courseModules: CourseModule[];
  slug: string;
}

export default function AcademyModuleLayout({ module, courseModules, slug }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const total       = courseModules.length;
  const progressPct = Math.round((module.moduleNumber / total) * 100);
  const levelStyle  = levelColors[module.level ?? ""] ?? "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── STICKY TOP BAR ───────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">

          {/* Back link */}
          <Link
            href="/academy?tab=courses"
            className="text-slate-400 hover:text-indigo-600 text-sm font-bold shrink-0 transition-colors"
          >
            ← Courses
          </Link>

          {/* Sidebar toggle — only visible at lg+ */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className={`hidden lg:flex items-center gap-1.5 shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
              sidebarOpen
                ? "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
            aria-label={sidebarOpen ? "Hide module list" : "Show module list"}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d={sidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
            {sidebarOpen ? "Hide" : "Modules"}
          </button>

          {/* Progress */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-500 truncate mb-1">{module.courseTitle}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-xs font-black text-slate-400 shrink-0">
                {module.moduleNumber} / {total}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── MAIN LAYOUT ──────────────────────────────────────────────────────── */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-start" style={{ gap: sidebarOpen ? "3.5rem" : "0" }}>

          {/* ── SIDEBAR ────────────────────────────────────────────────────── */}
          {sidebarOpen && (
            <aside className="hidden lg:block w-64 shrink-0 sticky top-15">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-900 px-4 py-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Course</p>
                  <p className="text-sm font-bold text-white leading-snug">{module.courseTitle}</p>
                </div>
                <nav className="py-1 max-h-[calc(100vh-120px)] overflow-y-auto">
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
          )}

          {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-8">

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
                  {module.learningObjectives.map((obj, i) => (
                    <li key={obj} className="flex gap-3 text-sm text-indigo-800 leading-relaxed">
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
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-8 sm:px-10 sm:py-10">
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
                <Link
                  href={`/academy/modules/${module.prevModuleSlug}`}
                  className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-700 transition-colors shadow-sm"
                >
                  ← Previous Module
                </Link>
              ) : <div />}

              {module.nextModuleSlug ? (
                <Link
                  href={`/academy/modules/${module.nextModuleSlug}`}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Next Module →
                </Link>
              ) : (
                <Link
                  href="/academy?tab=courses"
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                >
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
