// Route: /academy/tracks/[courseSlug]
// Redirects to the first lesson, or shows a course overview if no lessons exist yet.
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseWithProgress, enrollUser } from "@/lib/course-api";
import { getUser } from "@/lib/auth";
import CourseBookTie from "@/components/CourseBookTie";

interface PageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { courseSlug } = await params;
  const course = await getCourseWithProgress(courseSlug, null);
  if (!course) return { title: "Course Not Found" };
  return { title: `${course.title} | HTR Academy`, description: course.subtitle };
}

export default async function CourseOverviewPage({ params }: PageProps) {
  const { courseSlug } = await params;

  const user = await getUser();

  let course = await getCourseWithProgress(courseSlug, user?.id ?? null);
  if (!course) return notFound();

  // Auto-enroll logged-in users (no auto-redirect — show the course overview so
  // the user chooses a lesson instead of being dumped into the first one).
  if (user && !course.enrollment) {
    await enrollUser(user.id, course.id);
    course = (await getCourseWithProgress(courseSlug, user.id))!;
  }

  // Always render the course overview (lesson list); the user picks where to start.
  const totalLessons = course.tracks.flatMap((t) => t.lessons).length;
  const totalMinutes = course.tracks
    .flatMap((t) => t.lessons)
    .reduce((sum, l) => sum + l.estimatedMinutes, 0);

  // Lessons are shown grouped under their track (see below); this flat list is
  // kept for totals, the "Start course" link, and continuous lesson numbering.
  const shownTracks = course.tracks.filter((t) => t.lessons.length > 0);
  const lessons = shownTracks.flatMap((t) => t.lessons);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  const firstLesson = lessons[0];

  // One card renderer, used for every lesson in every track, so track grouping
  // cannot drift from the card markup.
  const renderLessonCard = (lesson: (typeof lessons)[number], i: number) => (
    <Link
      key={lesson.id}
      href={`/academy/tracks/${courseSlug}/${lesson.slug}`}
      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all overflow-hidden flex flex-col"
    >
      <div className="h-1.5 w-full bg-sky-500" />
      <div className="p-6 flex flex-col flex-1 gap-3">
        <div className="flex items-center justify-between">
          <span className="w-8 h-8 rounded-full bg-sky-50 text-sky-700 text-sm font-black flex items-center justify-center">
            {i + 1}
          </span>
          <span className="text-xs text-slate-400 font-medium">{lesson.estimatedMinutes} min</span>
        </div>
        <h3 className="font-bold text-slate-900 leading-snug group-hover:text-sky-700 transition-colors">
          {lesson.title}
        </h3>
        {lesson.summary && (
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{lesson.summary}</p>
        )}
        <span className="mt-auto pt-2 text-xs font-bold text-sky-600 group-hover:text-sky-700">
          {i === 0 ? "Start lesson \u2192" : "Open lesson \u2192"}
        </span>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-9">
          <Link href="/academy/tracks" className="text-xs font-bold uppercase tracking-widest text-sky-600 hover:text-sky-700 transition-colors">
            ← Courses
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black mt-4 mb-2 leading-tight text-slate-900">{course.title}</h1>
          {course.subtitle && <p className="text-slate-600 text-base max-w-2xl leading-relaxed">{course.subtitle}</p>}

          <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-slate-500">
            <span><span className="font-bold text-slate-900">{totalLessons}</span> lessons</span>
            <span><span className="font-bold text-slate-900">~{totalHours}h</span> total</span>
          </div>

          {firstLesson && (
            <Link
              href={`/academy/tracks/${courseSlug}/${firstLesson.slug}`}
              className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
            >
              Start course →
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {course.description && (
          <p className="text-slate-600 leading-relaxed max-w-3xl mb-10">{course.description}</p>
        )}

        {/* Book tie-in + related analysis (§7.3) */}
        <CourseBookTie pillar={course.pillar} chapterRef={course.chapterRef} />

        {lessons.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
            <p className="font-bold text-slate-900 mb-1">No lessons published yet</p>
            <p className="text-sm text-slate-500">Check back soon — content is being added.</p>
          </div>
        ) : (
          <>
            {/* Grouped by track. The book cites tracks by name and number
                ("Track 1, Foundations: The Framework"), so the page has to
                surface them or that cross-reference lands nowhere. Lesson
                numbering stays continuous across the whole course. */}
            {shownTracks
              .map((track, ti) => {
                // index into the SAME filtered list, so numbering stays
                // continuous even if a track has no published lessons
                const startIndex = shownTracks
                  .slice(0, ti)
                  .reduce((n, t) => n + t.lessons.length, 0);
                return (
                  <section key={track.id} className="mb-10 last:mb-0">
                    <div className="flex items-baseline gap-3 mb-5">
                      <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">
                        Track {ti + 1}
                      </h2>
                      <span className="text-sm font-bold text-slate-900">{track.title}</span>
                      <span className="text-xs text-slate-400 ml-auto shrink-0">
                        {track.lessons.length} {track.lessons.length === 1 ? "lesson" : "lessons"}
                      </span>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      {track.lessons.map((lesson, li) => {
                        const i = startIndex + li;
                        return renderLessonCard(lesson, i);
                      })}
                    </div>
                  </section>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}
