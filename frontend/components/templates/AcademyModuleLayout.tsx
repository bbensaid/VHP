"use client";

// components/templates/AcademyModuleLayout.tsx
// Client wrapper that manages sidebar visibility, localStorage progress tracking,
// and inline knowledge-check quizzes for the module reader.

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/react";
import AcademyContent from "@/components/AcademyContent";
import KnowledgeCheck, { type Question } from "@/components/academy/KnowledgeCheck";
import { useModuleProgress } from "@/hooks/useModuleProgress";
import { CheckCircle, Clock, Award } from "lucide-react";

// ─── Static demo question bank (keyed by module slug) ────────────────────────
// In production these would come from Sanity `academyModule.quiz[]` fields.
const DEMO_QUESTIONS: Record<string, Question[]> = {
  default: [
    {
      id: "q1",
      question: "Which payment model shifts financial risk from payer to provider for an attributed population?",
      options: [
        "Fee-for-service (FFS)",
        "Global capitation",
        "Per diem inpatient rate",
        "Diagnosis-Related Group (DRG) payment",
      ],
      correctIndex: 1,
      explanation:
        "Global capitation (or global budgeting) assigns a fixed per-member-per-month payment to the provider, who bears full financial risk for the population's total care costs — in contrast to FFS or DRG models where risk stays with the payer.",
    },
    {
      id: "q2",
      question: "The LACE+ readmission risk tool uses which four components to generate a score?",
      options: [
        "Labs, Age, Comorbidities, Ethnicity",
        "Length of stay, Acuity, Comorbidities, ED visits",
        "Length of stay, Age, Compliance, ED visits",
        "Labs, Acuity, Compliance, Ethnicity",
      ],
      correctIndex: 1,
      explanation:
        "LACE+ stands for: Length of stay (up to 7 pts), Acuity of admission (3 pts if unplanned via ED), Comorbidities (Charlson score, up to 5 pts), and ED visits in the prior 6 months (up to 4 pts). A score ≥10 signals high 30-day readmission risk.",
    },
    {
      id: "q3",
      question: "Which HEDIS measure tracks the percentage of patients with hypertension whose blood pressure is controlled (<140/90)?",
      options: [
        "Glycemic Control in Diabetes (GCD)",
        "Controlling High Blood Pressure (CBP)",
        "Appropriate Testing for Pharyngitis (CWP)",
        "Adult BMI Assessment (ABA)",
      ],
      correctIndex: 1,
      explanation:
        "Controlling High Blood Pressure (CBP) is the HEDIS measure tracking BP control (<140/90 mmHg) in adults 18–85 with diagnosed hypertension. It is one of the most heavily weighted measures in commercial and Medicaid STAR ratings.",
    },
    {
      id: "q4",
      question: "In a population health pyramid, which tier represents the smallest share of patients but the greatest share of healthcare costs?",
      options: [
        "Tier 1 — Healthy / Low Risk",
        "Tier 2 — Moderate Risk",
        "Tier 3 — High Risk",
        "Tier 4 — Complex / High-Need",
      ],
      correctIndex: 3,
      explanation:
        "Tier 4 (Complex / High-Need) accounts for only 1–5% of a population but typically generates 25–40% of total healthcare costs due to frequent hospitalization, polypharmacy, and multi-system chronic disease requiring intensive care management.",
    },
    {
      id: "q5",
      question: "What does 'medical loss ratio' (MLR) represent for a health insurer?",
      options: [
        "The percentage of premium revenue spent on clinical care and quality improvement",
        "The ratio of denied claims to total claims processed",
        "The insurer's net profit margin after administrative costs",
        "The percentage of enrolled members who used the ED in a given year",
      ],
      correctIndex: 0,
      explanation:
        "MLR = (Claims paid + Quality improvement spending) ÷ Premium revenue. The ACA requires individual/small group plans to maintain ≥80% MLR and large group plans ≥85%. Insurers below the threshold must issue rebates to members.",
    },
  ],
};

function getQuestions(slug: string): Question[] {
  return DEMO_QUESTIONS[slug] ?? DEMO_QUESTIONS.default;
}

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function AcademyModuleLayout({ module, courseModules, slug }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [certHash, setCertHash] = useState<string | null>(null);
  const certIssuedRef = useRef(false);

  const { progress, markCompleted, markQuizPassed, isSlugCompleted, getCompletedCount } =
    useModuleProgress(slug);

  const total       = courseModules.length;
  const completedCount = getCompletedCount(courseModules.map(m => m.slug));
  // Progress is based on completed modules, not just current position
  const progressPct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const levelStyle  = levelColors[module.level ?? ""] ?? "bg-slate-100 text-slate-700 border-slate-200";

  const isLastModule = !module.nextModuleSlug;
  const courseSlug = courseModules[0]?.slug
    ? module.courseTitle.toLowerCase().replace(/\s+/g, "-")
    : slug;

  // Issue certificate when last module is completed (quiz passed or marked read)
  useEffect(() => {
    if (!isLastModule) return;
    if (!progress.completed) return;
    if (certIssuedRef.current) return;
    certIssuedRef.current = true;

    fetch("/api/academy/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseSlug, courseTitle: module.courseTitle }),
    })
      .then((res) => res.json())
      .then((data) => { if (data.hash) setCertHash(data.hash); })
      .catch(() => {/* non-fatal */});
  }, [isLastModule, progress.completed, courseSlug, module.courseTitle]);

  const questions = getQuestions(slug);

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

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className={`hidden lg:flex items-center gap-1.5 shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
              sidebarOpen
                ? "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
            {sidebarOpen ? "Hide" : "Modules"}
          </button>

          {/* Progress bar */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-500 truncate mb-1">{module.courseTitle}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-xs font-black text-slate-400 shrink-0">
                {completedCount} / {total} complete
              </span>
            </div>
          </div>

          {/* Completion badge */}
          {progress.completed && (
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
              <CheckCircle size={12} />
              Done
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN LAYOUT ──────────────────────────────────────────────────────── */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-start" style={{ gap: sidebarOpen ? "3.5rem" : "0" }}>

          {/* ── SIDEBAR ────────────────────────────────────────────────────── */}
          {sidebarOpen && (
            <aside className="hidden lg:block w-64 shrink-0 sticky top-16">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-900 px-4 py-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Course</p>
                  <p className="text-sm font-bold text-white leading-snug">{module.courseTitle}</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>Progress</span>
                      <span>{completedCount}/{total}</span>
                    </div>
                    <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
                <nav className="py-1 max-h-[calc(100vh-180px)] overflow-y-auto">
                  {courseModules.map(m => {
                    const isCurrent   = m.slug === slug;
                    const isCompleted = isSlugCompleted(m.slug);
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
                          isCurrent   ? "bg-indigo-600 text-white border-indigo-600" :
                          isCompleted ? "bg-emerald-500 text-white border-emerald-500" :
                                        "bg-white text-slate-400 border-slate-300"
                        }`}>
                          {isCompleted && !isCurrent ? "✓" : m.moduleNumber}
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
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 ml-auto">
                    <Clock size={11} />
                    {module.estimatedReadTime} min read
                  </span>
                )}
                {progress.completed && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                    <CheckCircle size={10} /> Completed
                  </span>
                )}
              </div>

              <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2">
                Module {module.moduleNumber}{module.totalModules ? ` of ${module.totalModules}` : ""}
              </p>
              <h1 className="ty-h1 font-black text-slate-900 leading-tight mb-5">
                {module.title}
              </h1>
              {module.summary && (
                <p className="text-base text-slate-600 leading-relaxed border-l-4 border-indigo-200 pl-4">
                  {module.summary}
                </p>
              )}
            </div>

            {/* Learning objectives */}
            {module.learningObjectives && module.learningObjectives.length > 0 && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h2 className="flex items-center gap-2 text-sm font-black text-indigo-900 uppercase tracking-widest mb-4">
                  <span>🎯</span> What You&apos;ll Learn
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

            {/* Knowledge Check */}
            {!showQuiz && !progress.quizPassed && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-black text-indigo-900 mb-1">Ready to test your understanding?</h3>
                  <p className="text-sm text-indigo-600">
                    {questions.length}-question knowledge check · Pass {70}% to mark module complete
                  </p>
                </div>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="shrink-0 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition"
                >
                  Start Quiz →
                </button>
              </div>
            )}

            {showQuiz && !progress.quizPassed && (
              <KnowledgeCheck
                moduleTitle={module.title}
                questions={questions}
                onPass={markQuizPassed}
              />
            )}

            {progress.quizPassed && (
              <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-emerald-800 text-lg">Module Completed!</p>
                  <p className="text-emerald-600 text-sm">
                    You passed the knowledge check for this module.
                    {progress.completedAt && (
                      <span className="text-emerald-400 ml-2">
                        {new Date(progress.completedAt).toLocaleDateString()}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Mark complete without quiz (for content-only modules) */}
            {!progress.completed && !showQuiz && module.body && (
              <div className="flex justify-end">
                <button
                  onClick={markCompleted}
                  className="text-xs font-bold text-slate-400 hover:text-emerald-600 border border-slate-200 hover:border-emerald-300 px-4 py-2 rounded-xl transition-colors"
                >
                  Mark as read (no quiz)
                </button>
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

            {/* Certificate earned — shown on last module completion */}
            {certHash && (
              <div className="flex flex-col sm:flex-row items-center gap-5 bg-linear-to-br from-indigo-50 to-emerald-50 border border-indigo-200 rounded-2xl p-6 mb-8">
                <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                  <Award size={28} className="text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-black text-slate-900 text-lg mb-0.5">Certificate Earned!</p>
                  <p className="text-slate-500 text-sm">
                    You completed <span className="font-bold text-slate-700">{module.courseTitle}</span>.
                    Your certificate has been issued.
                  </p>
                </div>
                <a
                  href={`/verify/${certHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  View Certificate →
                </a>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
