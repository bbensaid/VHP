// Route: /academy/tracks/[courseSlug]/[lessonSlug]
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { getUser } from "@/lib/auth";
import { getCourseWithProgress, enrollUser } from "@/lib/course-api";
import { LessonPageClient } from "./LessonPageClient";

interface PageProps {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = await getCourseWithProgress(courseSlug, null);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} | HTR Academy`,
    description: course.subtitle,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { courseSlug, lessonSlug } = await params;

  const user = await getUser();
  if (!user) redirect(`/login?from=/academy/tracks/${courseSlug}/${lessonSlug}`);

  let course = await getCourseWithProgress(courseSlug, user.id);
  if (!course) return notFound();

  // Verify the lesson exists in this course
  const allLessons = course.tracks.flatMap((t) => t.lessons);
  if (!allLessons.find((l) => l.slug === lessonSlug)) return notFound();

  // Auto-enroll if not already enrolled
  if (!course.enrollment) {
    await enrollUser(user.id, course.id);
    course = (await getCourseWithProgress(courseSlug, user.id))!;
  }

  return (
    <LessonPageClient
      course={course}
      enrollmentId={course.enrollment?.id ?? ""}
    />
  );
}
