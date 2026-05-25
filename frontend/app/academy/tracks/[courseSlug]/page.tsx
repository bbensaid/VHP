// Route: /academy/tracks/[courseSlug]
// Redirects to the first lesson, or shows a course overview if no lessons exist yet.
import { notFound, redirect } from "next/navigation";
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

  // Auto-enroll logged-in users, then redirect to first lesson
  if (user) {
    if (!course.enrollment) {
      await enrollUser(user.id, course.id);
      course = (await getCourseWithProgress(courseSlug, user.id))!;
    }
    const firstLesson = course.tracks.flatMap((t) => t.lessons)[0];
    if (firstLesson) {
      redirect(`/academy/tracks/${courseSlug}/${firstLesson.slug}`);
    }
  }

  // Not logged in, or no lessons yet — show a landing page
  const totalLessons = course.tracks.flatMap((t) => t.lessons).length;
  const totalMinutes = course.tracks
    .flatMap((t) => t.lessons)
    .reduce((sum, l) => sum + l.estimatedMinutes, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <Link href="/academy/tracks" className="text-xs font-bold uppercase tracking-widest text-sky-400 hover:text-sky-300 transition-colors">
            ← Learning Tracks
          </Link>
          <h1 className="text-2xl font-black mt-3 mb-1">{course.title}</h1>
          {course.subtitle && <p className="text-slate-400 text-sm">{course.subtitle}</p>}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Stats */}
        <div className="flex flex-wrap gap-6 text-sm text-slate-600">
          <span><span className="font-bold text-slate-900">{course.tracks.length}</span> tracks</span>
          <span><span className="font-bold text-slate-900">{totalLessons}</span> lessons</span>
          <span><span className="font-bold text-slate-900">~{Math.round(totalMinutes / 60 * 10) / 10}h</span> total</span>
          <span>v{course.version}</span>
        </div>

        {course.description && (
          <p className="text-slate-600 leading-relaxed max-w-2xl">{course.description}</p>
        )}

        {/* Track list */}
        <div className="space-y-6">
          {course.tracks.map((track) => (
            <div key={track.id} className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">{track.pillar}</span>
                <h2 className="font-bold text-slate-900">{track.title}</h2>
                <span className="ml-auto text-xs text-slate-400">{track.lessons.length} lessons</span>
              </div>
              <ul>
                {track.lessons.map((lesson, i) => (
                  <li key={lesson.id} className="flex items-center gap-4 px-5 py-3 border-b border-slate-100 last:border-0">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm text-slate-800">{lesson.title}</span>
                    <span className="text-xs text-slate-400">{lesson.estimatedMinutes}m</span>
                    {user ? (
                      <Link
                        href={`/academy/tracks/${courseSlug}/${lesson.slug}`}
                        className="text-xs px-3 py-1.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
                      >
                        {i === 0 ? "Start" : "Open"}
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        {!user && (
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 flex items-center justify-between gap-6">
            <div>
              <p className="font-bold text-slate-900 mb-1">Sign in to start learning</p>
              <p className="text-sm text-slate-500">Your progress is saved automatically as you complete lessons.</p>
            </div>
            <Link
              href={`/login?from=/academy/tracks/${courseSlug}`}
              className="px-5 py-2.5 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors text-sm whitespace-nowrap"
            >
              Sign in →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
