"use client";

import { useCallback, useEffect, useRef } from "react";
import { CoursePlayer } from "@/components/course";
import { markLessonProgress, submitQuizAttempt } from "@/app/actions/course";
import type { CourseWithProgress } from "@/types/course";

export function LessonPageClient({
  course,
  enrollmentId,
}: {
  course: CourseWithProgress;
  enrollmentId: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Set the wrapper height to exactly fill the viewport below its own top edge.
  // This works regardless of what's above it (header, breadcrumbs, ticker, etc.)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const setHeight = () => {
      const top = el.getBoundingClientRect().top;
      el.style.height = `${window.innerHeight - top}px`;
    };
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, []);

  const handleProgress = useCallback(
    async (lessonId: string, status: "in_progress" | "completed") => {
      if (!enrollmentId) return;
      await markLessonProgress(lessonId, enrollmentId, status);
    },
    [enrollmentId]
  );

  const handleQuiz = useCallback(
    async (lessonId: string, quizId: string, score: number, passed: boolean) => {
      await submitQuizAttempt(lessonId, quizId, {}, score, passed);
    },
    []
  );

  return (
    <div ref={wrapperRef} className="overflow-hidden">
      <CoursePlayer
        course={course}
        onProgressUpdate={handleProgress}
        onQuizAttempt={handleQuiz}
      />
    </div>
  );
}
