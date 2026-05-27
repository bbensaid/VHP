// Route: /academy/tracks
// Lists all published courses from Supabase (the course-player system).
"use server";
import Link from "next/link";
import { db } from "@/lib/db/client";
import { searchLessons } from "@/lib/course-api";
import { LessonSearch } from "@/components/course/LessonSearch";

export const metadata = {
  title: "Courses | HTR Academy",
  description:
    "Structured courses on healthcare transformation — policy, economics, technology, clinical innovation, equity, and operations.",
};

// Pillar colour tokens
const PILLAR: Record<string, { badge: string; dot: string }> = {
  policy:     { badge: "bg-sky-100 text-sky-700 border-sky-200",          dot: "bg-sky-500"     },
  economics:  { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  technology: { badge: "bg-indigo-100 text-indigo-700 border-indigo-200", dot: "bg-indigo-500"  },
  clinical:   { badge: "bg-red-100 text-red-700 border-red-200",          dot: "bg-red-500"     },
  equity:     { badge: "bg-violet-100 text-violet-700 border-violet-200", dot: "bg-violet-500"  },
  operations: { badge: "bg-teal-100 text-teal-700 border-teal-200",       dot: "bg-teal-500"    },
  general:    { badge: "bg-slate-100 text-slate-600 border-slate-200",    dot: "bg-slate-400"   },
};

interface CourseRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  estimated_hours: number;
  version: string;
  target_audience: string[];
}

interface TrackSummary {
  pillar: string;
  lesson_count: number;
}

async function getCourseCatalog(): Promise<
  Array<{ course: CourseRow; tracks: TrackSummary[] }>
> {
  const { data: courses, error } = await db
    .from("courses")
    .select("id, slug, title, subtitle, description, estimated_hours, version, target_audience")
    .eq("is_published", true)
    .order("created_at");

  if (error || !courses) return [];

  // For each course, fetch track+lesson counts
  const results = await Promise.all(
    (courses as CourseRow[]).map(async (course) => {
      const { data: trackRows } = await db
        .from("tracks")
        .select("id, pillar")
        .eq("course_id", course.id)
        .eq("is_published", true)
        .order("order");

      const tracks: TrackSummary[] = await Promise.all(
        (trackRows ?? []).map(async (t: { id: string; pillar: string }) => {
          const { count } = await db
            .from("lessons")
            .select("id", { count: "exact", head: true })
            .eq("track_id", t.id)
            .eq("is_published", true);
          return { pillar: t.pillar, lesson_count: count ?? 0 };
        })
      );

      return { course, tracks };
    })
  );

  return results;
}

export default async function TracksPage() {
  const catalog = await getCourseCatalog();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero */}
      <div className="bg-white border-b border-slate-200 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/academy"
            className="text-slate-400 hover:text-slate-700 text-xs font-bold uppercase tracking-widest transition-colors mb-4 inline-block"
          >
            ← Academy
          </Link>
          <span className="inline-block text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 border border-sky-200 rounded-full px-3 py-1 mb-4">
            Course Library
          </span>
          <h1 className="text-4xl font-black text-slate-900 mb-3">
            HTR Courses
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Structured, self-paced courses on health transformation. Built on
            the six-pillar framework — progress saved automatically.
          </p>
          <div className="mt-6">
            <LessonSearch onSearch={searchLessons} />
          </div>
        </div>
      </div>

      {/* Course grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {catalog.length === 0 ? (
          <p className="text-slate-500 text-center py-20">
            No courses published yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {catalog.map(({ course, tracks }) => {
              const totalLessons = tracks.reduce(
                (s, t) => s + t.lesson_count,
                0
              );
              // Leading pillar = the one with most tracks
              const pillarCounts = tracks.reduce<Record<string, number>>(
                (acc, t) => {
                  acc[t.pillar] = (acc[t.pillar] ?? 0) + 1;
                  return acc;
                },
                {}
              );
              const leadPillar =
                Object.entries(pillarCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
                "general";
              const colors = PILLAR[leadPillar] ?? PILLAR.general;

              return (
                <Link
                  key={course.id}
                  href={`/academy/tracks/${course.slug}`}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all overflow-hidden flex flex-col"
                >
                  {/* Colour bar */}
                  <div className={`h-1.5 w-full ${colors.dot}`} />

                  <div className="p-6 flex flex-col flex-1 gap-4">
                    {/* Badge row */}
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${colors.badge}`}
                      >
                        {leadPillar}
                      </span>
                      {tracks.length > 1 && (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
                          {tracks.length} pillars
                        </span>
                      )}
                    </div>

                    {/* Title + subtitle */}
                    <div>
                      <h2 className="text-lg font-black text-slate-900 group-hover:text-sky-700 transition-colors leading-snug mb-1">
                        {course.title}
                      </h2>
                      {course.subtitle && (
                        <p className="text-sm text-slate-500 leading-snug line-clamp-2">
                          {course.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-auto pt-2 border-t border-slate-100">
                      <span>
                        <span className="font-bold text-slate-700">{tracks.length}</span> tracks
                      </span>
                      <span>
                        <span className="font-bold text-slate-700">{totalLessons}</span> lessons
                      </span>
                      {course.estimated_hours > 0 && (
                        <span>
                          ~<span className="font-bold text-slate-700">{course.estimated_hours}h</span>
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {(course.target_audience ?? []).slice(0, 2).map((a: string) => (
                          <span
                            key={a}
                            className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-bold text-sky-600 group-hover:text-sky-700 transition-colors">
                        Start →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
