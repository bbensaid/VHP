"use server";

import { getUser } from "@/lib/auth";
import * as courseApi from "@/lib/course-api";

export async function enrollInCourse(courseId: string) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");
  return courseApi.enrollUser(user.id, courseId);
}

export async function markLessonProgress(
  lessonId: string,
  enrollmentId: string,
  status: "in_progress" | "completed"
) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");
  return courseApi.updateLessonProgress(user.id, lessonId, enrollmentId, status);
}

export async function submitQuizAttempt(
  lessonId: string,
  quizId: string,
  answers: Record<string, string>,
  score: number,
  passed: boolean
) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");
  return courseApi.recordQuizAttempt(user.id, lessonId, quizId, answers, score, passed);
}

export async function uploadAudioSlot(
  lessonId: string,
  slotKey: string,
  uploadedUrl: string
) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");
  return courseApi.updateAudioSlot(lessonId, slotKey, uploadedUrl, user.id);
}
