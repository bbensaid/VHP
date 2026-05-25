"use client";

import { useCallback } from "react";
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
    // Height = full viewport minus the header (measured and published by Header.tsx).
    // overflow-hidden means the outer page scroll container has nothing to scroll.
    // All scrolling happens inside CoursePlayer's content div.
    <div
      className="overflow-hidden"
      style={{ height: "calc(100dvh - var(--header-height, 0px))" }}
    >
      <CoursePlayer
        course={course}
        onProgressUpdate={handleProgress}
        onQuizAttempt={handleQuiz}
      />
    </div>
  );
}
