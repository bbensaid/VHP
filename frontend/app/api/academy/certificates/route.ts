/**
 * POST /api/academy/certificates
 *
 * Issues a certificate of completion for a course.
 * Idempotent: returns existing certificate if already issued.
 *
 * Body: { courseSlug: string; courseTitle: string }
 * Returns: { certId: string; hash: string; alreadyExists: boolean }
 */
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import { sendEvent } from "@/lib/loops";

export async function POST(req: NextRequest) {
  // Authenticate
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseSlug, courseTitle } = await req.json() as {
    courseSlug?: string;
    courseTitle?: string;
  };

  if (!courseSlug || !courseTitle) {
    return NextResponse.json({ error: "courseSlug and courseTitle required" }, { status: 400 });
  }

  // Check if certificate already exists (idempotent)
  const { data: existing } = await dbAdmin
    .from("certifications")
    .select("id, verification_hash")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .maybeSingle();

  if (existing?.verification_hash) {
    return NextResponse.json({
      certId: existing.id,
      hash: existing.verification_hash,
      alreadyExists: true,
    });
  }

  // Generate verification hash
  const hashBytes = crypto.getRandomValues(new Uint8Array(24));
  const hash = Array.from(hashBytes).map(b => b.toString(16).padStart(2, "0")).join("");

  // Issue certificate
  const { data: cert, error } = await dbAdmin
    .from("certifications")
    .insert({
      user_id: user.id,
      cert_name: courseTitle,
      cert_type: "course",
      course_slug: courseSlug,
      verification_hash: hash,
      issued_at: new Date().toISOString(),
    })
    .select("id, verification_hash")
    .single();

  if (error || !cert) {
    console.error("[certificates] insert error:", error?.message);
    return NextResponse.json({ error: "Failed to issue certificate" }, { status: 500 });
  }

  // Fire Loops event (non-blocking)
  sendEvent(user.email!, "course_completed", {
    courseTitle,
    courseSlug,
    verifyUrl: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/verify/${hash}`,
  }).catch(console.error);

  return NextResponse.json({
    certId: cert.id,
    hash: cert.verification_hash,
    alreadyExists: false,
  });
}
