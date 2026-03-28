// app/api/learning-paths/route.ts
//
// Persists and retrieves personalized learning paths for authenticated users.
// Unauthenticated users fall back to localStorage (handled client-side).
//
// GET  /api/learning-paths        → returns saved paths array for current user
// POST /api/learning-paths        → upserts the full paths array for current user
// DELETE /api/learning-paths?id=  → removes a single path by id

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/auth";
import { db } from "@/lib/db/client";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ paths: [] });

  const { data, error } = await db
    .from("user_learning_paths")
    .select("*")
    .eq("user_id", user.id)
    .order("last_accessed", { ascending: false });

  if (error) {
    console.error("learning-paths GET error:", error);
    return NextResponse.json({ paths: [] });
  }

  // Each row has a `path_data` JSONB column storing the full SavedPath object
  const paths = (data ?? []).map((row) => ({
    ...(row.path_data as object),
    id: row.path_id,
    last_accessed: row.last_accessed,
  }));

  return NextResponse.json({ paths });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, reason: "unauthenticated" });

  let body: { paths: unknown[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const paths = Array.isArray(body.paths) ? body.paths : [];

  // Upsert each path as its own row
  const rows = paths.map((p: unknown) => {
    const path = p as Record<string, unknown>;
    return {
      user_id: user.id,
      path_id: path.id as string,
      last_accessed: path.last_accessed ?? new Date().toISOString(),
      path_data: path,
    };
  });

  if (rows.length === 0) {
    // Caller passed empty array — delete all paths for this user
    await db.from("user_learning_paths").delete().eq("user_id", user.id);
    return NextResponse.json({ ok: true });
  }

  const { error } = await db
    .from("user_learning_paths")
    .upsert(rows, { onConflict: "user_id,path_id" });

  if (error) {
    console.error("learning-paths POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, reason: "unauthenticated" });

  const { searchParams } = new URL(req.url);
  const pathId = searchParams.get("id");
  if (!pathId) return NextResponse.json({ error: "Missing ?id=" }, { status: 400 });

  const { error } = await db
    .from("user_learning_paths")
    .delete()
    .eq("user_id", user.id)
    .eq("path_id", pathId);

  if (error) {
    console.error("learning-paths DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
