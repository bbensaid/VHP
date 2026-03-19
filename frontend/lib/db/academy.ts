/**
 * Academy — enrollments, progress, certifications
 * All functions require an authenticated user (server-side or client-side).
 */
import { db } from "./client";

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
  const { data, error } = await db
    .from("course_enrollments")
    .select("*")
    .eq("user_id", userId)
    .order("enrolled_at", { ascending: false });

  if (error) {
    console.error("getUserEnrollments:", error.message);
    return [];
  }
  return data as EnrollmentRow[];
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
  let query = db
    .from("module_progress")
    .select("*")
    .eq("user_id", userId);

  if (courseSlug) query = query.eq("course_slug", courseSlug);

  const { data, error } = await query;
  if (error) {
    console.error("getUserModuleProgress:", error.message);
    return [];
  }
  return data as ModuleProgressRow[];
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
  const { data, error } = await db
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
