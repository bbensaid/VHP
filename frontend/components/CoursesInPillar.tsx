import Link from "next/link";
import { getCoursesByPillar } from "@/lib/course-api";

/**
 * "Courses in this pillar" rail for pillar hub pages
 * (PLAN_SANITY_ECOSYSTEM.md §7.1). Server component — queries Supabase courses
 * by pillar id (lowercase) and links into the Academy. Renders nothing if the
 * pillar has no published courses.
 */
export default async function CoursesInPillar({
  pillarId,
  colorClass,
  cardHoverClass = "hover:border-slate-300",
  titleHoverClass = "group-hover:text-slate-900",
}: {
  /** Lowercase pillar id (e.g. "economics"), matches Supabase + lib/taxonomy. */
  pillarId: string;
  colorClass: string;
  cardHoverClass?: string;
  titleHoverClass?: string;
}) {
  const courses = await getCoursesByPillar(pillarId);
  if (courses.length === 0) return null;

  return (
    <div className="mb-12 mt-16">
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-2">
        <h2 className="ty-h3 font-black text-slate-900">Courses in this Pillar</h2>
        <Link href="/academy/tracks" className={`text-xs font-bold ${colorClass} hover:opacity-80`}>
          All courses &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.slug}
            href={`/academy/tracks/${course.slug}`}
            className={`group flex flex-col bg-white p-6 rounded-xl border border-slate-200 ${cardHoverClass} hover:shadow-lg transition-all`}
          >
            <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span>Academy Course</span>
              {course.chapterRef && (
                <>
                  <span className="text-slate-300">·</span>
                  <span>Book Ch. {course.chapterRef}</span>
                </>
              )}
            </div>
            <h3 className={`font-bold text-slate-900 mb-2 ${titleHoverClass} transition-colors leading-snug`}>
              {course.title}
            </h3>
            {course.subtitle && (
              <p className="ty-body text-slate-600 line-clamp-2 mb-4">{course.subtitle}</p>
            )}
            <div className={`mt-auto flex items-center justify-between text-xs font-bold ${colorClass}`}>
              <span>Start learning &rarr;</span>
              {course.estimatedHours != null && (
                <span className="text-slate-400 font-medium">{course.estimatedHours} hrs</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
