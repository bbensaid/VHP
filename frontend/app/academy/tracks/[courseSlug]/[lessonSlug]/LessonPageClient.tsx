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
    <div className="flex-1 min-h-0 flex flex-col">
      <CoursePlayer
        course={course}
        onProgressUpdate={handleProgress}
        onQuizAttempt={handleQuiz}
      />
    </div>
  );
}
