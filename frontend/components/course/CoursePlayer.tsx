"use client";

import { useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CourseWithProgress } from "@/types/course";
import { CourseSidebar } from "./CourseSidebar";
import { LessonView } from "./LessonView";
import { PillarBadge } from "./PillarBadge";
import { CourseProgressBar } from "./CourseProgressBar";

interface CoursePlayerProps {
  course: CourseWithProgress;
  onProgressUpdate: (lessonId: string, status: "in_progress" | "completed") => void;
  onQuizAttempt: (lessonId: string, quizId: string, score: number, passed: boolean) => void;
  onAudioUpload?: (lessonId: string, file: File, slotKey: string) => Promise<string>;
}

export function CoursePlayer({ course, onProgressUpdate, onQuizAttempt, onAudioUpload }: CoursePlayerProps) {
  const allLessons = course.tracks.flatMap((t) => t.lessons);

  const initialLesson =
    course.enrollment?.currentLessonId
      ? allLessons.find((l) => l.id === course.enrollment!.currentLessonId) ?? allLessons[0]
      : allLessons[0];

  const [currentLesson, setCurrentLesson] = useState(initialLesson);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track completed lessons locally so progress updates instantly on click.
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => new Set(allLessons.filter((l) => l.progress?.status === "completed").map((l) => l.id))
  );

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  const totalLessons = allLessons.length;
  const completedLessons = completedIds.size;
  const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const scrollToTop = useCallback(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, []);


  const handleSelectLesson = useCallback(
    (lessonId: string) => {
      const lesson = allLessons.find((l) => l.id === lessonId);
      if (lesson) {
        setCurrentLesson(lesson);
        setMobileSidebarOpen(false);
        scrollToTop();
        onProgressUpdate(lessonId, "in_progress");
      }
    },
    [allLessons, onProgressUpdate, scrollToTop]
  );

  const handleMarkComplete = useCallback(
    (lessonId: string) => {
      setCompletedIds((prev) => new Set(prev).add(lessonId));
      onProgressUpdate(lessonId, "completed");
      if (hasNext) {
        setCurrentLesson(allLessons[currentIndex + 1]);
        scrollToTop();
      }
    },
    [onProgressUpdate, hasNext, allLessons, currentIndex, scrollToTop]
  );

  const handleQuizPass = useCallback(
    (lessonId: string, score: number) => {
      const lesson = allLessons.find((l) => l.id === lessonId);
      if (lesson?.quiz) onQuizAttempt(lessonId, lesson.quiz.id, score, true);
    },
    [allLessons, onQuizAttempt]
  );

  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-base">
        No lessons available yet.
      </div>
    );
  }

  return (
    <div className="flex w-full h-full overflow-hidden border-t border-slate-200">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Course nav sidebar — hidden on mobile unless toggled */}
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:static lg:z-auto
        transition-transform duration-300
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <CourseSidebar
          tracks={course.tracks}
          currentLessonId={currentLesson.id}
          onSelectLesson={handleSelectLesson}
          courseTitle={course.title}
          courseSubtitle={course.subtitle ?? ""}
          progressPercent={progressPercent}
          completedLessons={completedLessons}
          totalLessons={totalLessons}
          completedIds={completedIds}
        />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-slate-200 bg-white">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-md hover:bg-slate-100 text-slate-500 shrink-0"
            aria-label="Open course navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <PillarBadge pillar={currentLesson.pillar} size="xs" />
          <span className="text-sm font-medium text-slate-900 truncate">{currentLesson.title}</span>
          <span className="ml-auto text-xs text-slate-400 shrink-0">{currentIndex + 1} / {totalLessons}</span>
        </div>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overscroll-contain px-4 md:px-8 py-6">
          <LessonView
            lesson={currentLesson}
            onMarkComplete={handleMarkComplete}
            onQuizPass={handleQuizPass}
            onAudioUpload={onAudioUpload}
            isCompleted={completedIds.has(currentLesson.id)}
          />
        </div>

        {/* Bottom nav bar */}
        <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-t border-slate-200 bg-white">
          <button
            onClick={() => hasPrev && handleSelectLesson(allLessons[currentIndex - 1].id)}
            disabled={!hasPrev}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Previous</span>
          </button>
          <div className="flex-1">
            <CourseProgressBar percent={progressPercent} completedLessons={completedLessons} totalLessons={totalLessons} />
          </div>
          <button
            onClick={() => hasNext && handleSelectLesson(allLessons[currentIndex + 1].id)}
            disabled={!hasNext}
            className="flex items-center gap-1.5 px-3 py-2 text-sm bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Next</span> <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
