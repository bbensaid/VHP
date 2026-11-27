/**
 * Academy — enrollments, progress, certifications
 * All functions require an authenticated user (server-side or client-side).
 */
import { db, dbAdmin } from "./client";

// ─── ENROLLMENTS ─────────────────────────────────────────────────────────────

export type EnrollmentRow = {
  id: string;
  user_id: string;
  course_slug: string;
  enrolled_at: string;
  completed_at: string | null;
  progress_pct: number;
};

export async function getUserEnrollments(
  userId: string
): Promise<EnrollmentRow[]> {
  // Service role, scoped by the server-verified userId: RLS only shows a user's
  // own enrollments to a session client, so the anon `db` always returned [].
  //
  // Reads course_player_enrollments: that is what the course player
  // (lib/course-api enrollUser) writes. The legacy course_enrollments table has
  // no writer anywhere, so reading it showed 0 courses for everyone.
  // percent_complete is maintained by trigger trg_enrollment_progress.
  const { data, error } = await dbAdmin
    .from("course_player_enrollments")
    .select("id,user_id,enrolled_at,completed_at,percent_complete,courses(slug)")
    .eq("user_id", userId)
    .order("enrolled_at", { ascending: false });

  if (error) {
    console.error("getUserEnrollments:", error.message);
    return [];
  }
  type Row = { id: string; user_id: string; enrolled_at: string; completed_at: string | null; percent_complete: number | null; courses: { slug: string } | { slug: string }[] | null };
  return (data as unknown as Row[])
    .map((r) => {
      const c = Array.isArray(r.courses) ? r.courses[0] : r.courses;
      return {
        id: r.id,
        user_id: r.user_id,
        course_slug: c?.slug ?? "",
        enrolled_at: r.enrolled_at,
        completed_at: r.completed_at,
        progress_pct: Math.round(Number(r.percent_complete ?? 0)),
      };
    })
    .filter((r) => r.course_slug);
}

export async function enrollInCourse(
  userId: string,
  courseSlug: string
): Promise<EnrollmentRow | null> {
  const { data, error } = await db
    .from("course_enrollments")
    .upsert(
      { user_id: userId, course_slug: courseSlug, progress_pct: 0 },
      { onConflict: "user_id,course_slug" }
    )
    .select()
    .single();

  if (error) {
    console.error("enrollInCourse:", error.message);
    return null;
  }
  return data as EnrollmentRow;
}

export async function updateCourseProgress(
  userId: string,
  courseSlug: string,
  progressPct: number
): Promise<boolean> {
  const updates: Record<string, unknown> = { progress_pct: progressPct };
  if (progressPct >= 100) updates.completed_at = new Date().toISOString();

  const { error } = await db
    .from("course_enrollments")
    .update(updates)
    .eq("user_id", userId)
    .eq("course_slug", courseSlug);

  if (error) {
    console.error("updateCourseProgress:", error.message);
    return false;
  }
  return true;
}

// ─── MODULE PROGRESS ─────────────────────────────────────────────────────────

export type ModuleProgressRow = {
  id: string;
  user_id: string;
  module_slug: string;
  course_slug: string | null;
  started_at: string;
  completed_at: string | null;
  time_spent_seconds: number;
};

export async function markModuleComplete(
  userId: string,
  moduleSlug: string,
  courseSlug?: string
): Promise<boolean> {
  const { error } = await db.from("module_progress").upsert(
    {
      user_id: userId,
      module_slug: moduleSlug,
      course_slug: courseSlug ?? null,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_slug" }
  );

  if (error) {
    console.error("markModuleComplete:", error.message);
    return false;
  }
  return true;
}

export async function getUserModuleProgress(
  userId: string,
  courseSlug?: string
): Promise<ModuleProgressRow[]> {
  // Reads course_lesson_progress (what the course player writes); the legacy
  // module_progress table has no writer. A "module" here is a lesson.
  const { data, error } = await dbAdmin
    .from("course_lesson_progress")
    .select("id,user_id,started_at,completed_at,time_spent_seconds,lessons(slug),course_player_enrollments(courses(slug))")
    .eq("user_id", userId);

  if (error) {
    console.error("getUserModuleProgress:", error.message);
    return [];
  }
  const one = <T,>(x: T | T[] | null | undefined): T | undefined => (Array.isArray(x) ? x[0] : x ?? undefined);
  type Row = { id: string; user_id: string; started_at: string; completed_at: string | null; time_spent_seconds: number | null;
    lessons: { slug: string } | { slug: string }[] | null;
    course_player_enrollments: { courses: { slug: string } | { slug: string }[] | null } | { courses: { slug: string } | { slug: string }[] | null }[] | null };
  const rows = (data as unknown as Row[]).map((r) => ({
    id: r.id,
    user_id: r.user_id,
    module_slug: one(r.lessons)?.slug ?? "",
    course_slug: one(one(r.course_player_enrollments)?.courses)?.slug ?? null,
    started_at: r.started_at,
    completed_at: r.completed_at,
    time_spent_seconds: r.time_spent_seconds ?? 0,
  }));
  return courseSlug ? rows.filter((r) => r.course_slug === courseSlug) : rows;
}

// ─── CERTIFICATIONS ──────────────────────────────────────────────────────────

export type CertificationRow = {
  id: string;
  user_id: string;
  cert_name: string;
  cert_type: string;
  course_slug: string | null;
  issued_at: string;
  expires_at: string | null;
  cert_url: string | null;
  verification_hash: string | null;
};

export async function getUserCertifications(
  userId: string
): Promise<CertificationRow[]> {
  const { data, error } = await dbAdmin
    .from("certifications")
    .select("*")
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });

  if (error) {
    console.error("getUserCertifications:", error.message);
    return [];
  }
  return data as CertificationRow[];
}

export async function verifyCertification(
  hash: string
): Promise<CertificationRow | null> {
  const { data, error } = await db
    .from("certifications")
    .select("*")
    .eq("verification_hash", hash)
    .single();

  if (error) return null;
  return data as CertificationRow;
}
