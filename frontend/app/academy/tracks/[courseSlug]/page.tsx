// Route: /academy/tracks/[courseSlug]
// Redirects to the first lesson, or shows a course overview if no lessons exist yet.
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseWithProgress, enrollUser } from "@/lib/course-api";
import { getUser } from "@/lib/auth";

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

  // Flatten lessons in course order — present as cards, no six-pillar framing.
  const lessons = course.tracks.flatMap((t) => t.lessons);
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  const firstLesson = lessons[0];

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

        {lessons.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
            <p className="font-bold text-slate-900 mb-1">No lessons published yet</p>
            <p className="text-sm text-slate-500">Check back soon — content is being added.</p>
          </div>
        ) : (
          <>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-5">Lessons</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {lessons.map((lesson, i) => {
                const inner = (
                  <>
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
                        {i === 0 ? "Start lesson →" : "Open lesson →"}
                      </span>
                    </div>
                  </>
                );
                // Cards are always clickable; the lesson page handles auth/enrollment.
                return (
                  <Link
                    key={lesson.id}
                    href={`/academy/tracks/${courseSlug}/${lesson.slug}`}
                    className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all overflow-hidden flex flex-col"
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
