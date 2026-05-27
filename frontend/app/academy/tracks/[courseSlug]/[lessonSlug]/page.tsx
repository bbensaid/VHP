// Route: /academy/tracks/[courseSlug]/[lessonSlug]
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getUser } from "@/lib/auth";
import { getCourseWithProgress, enrollUser } from "@/lib/course-api";
import { getLessonBodiesFromSanity } from "@/lib/sanity-fetch";
import { LessonPageClient } from "./LessonPageClient";
import type { CourseWithProgress } from "@/types/course";

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

/** Inject Sanity bodies into lesson objects that have a sanity_slug set. */
async function hydrateWithSanityContent(course: CourseWithProgress): Promise<CourseWithProgress> {
  const allLessons = course.tracks.flatMap((t) => t.lessons);
  const slugsToFetch = allLessons
    .map((l) => l.sanitySlug)
    .filter((s): s is string => !!s);

  if (slugsToFetch.length === 0) return course;

  const bodies = await getLessonBodiesFromSanity(slugsToFetch);

  return {
    ...course,
    tracks: course.tracks.map((track) => ({
      ...track,
      lessons: track.lessons.map((lesson) => {
        if (!lesson.sanitySlug || !bodies[lesson.sanitySlug]) return lesson;
        return { ...lesson, sanityBody: bodies[lesson.sanitySlug] };
      }),
    })),
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { courseSlug, lessonSlug } = await params;

  const user = await getUser();

  let course = await getCourseWithProgress(courseSlug, user?.id ?? null);
  if (!course) return notFound();

  // Verify the lesson exists in this course
  const allLessons = course.tracks.flatMap((t) => t.lessons);
  if (!allLessons.find((l) => l.slug === lessonSlug)) return notFound();

  // Auto-enroll logged-in users only
  if (user && !course.enrollment) {
    await enrollUser(user.id, course.id);
    course = (await getCourseWithProgress(courseSlug, user.id))!;
  }

  // Hydrate all lessons that have a Sanity slug with rich content
  course = await hydrateWithSanityContent(course);

  return <LessonPageClient course={course} enrollmentId={course.enrollment?.id ?? ""} />;
}
