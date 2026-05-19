/**
 * GET    /api/chapter-notes?slug=chapter-10   → list current user's notes for a chapter
 * POST   /api/chapter-notes                   → create a note  { slug, content }
 * DELETE /api/chapter-notes?id=<note-id>      → delete one of the current user's notes
 *
 * All operations are authenticated. RLS in migration 026 enforces that users
 * can only see / edit / delete their own notes.
 */

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/auth";
import { db } from "@/lib/db/client";

const MAX_NOTE_LENGTH = 4000;

export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ notes: [] });

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing ?slug=" }, { status: 400 });

  const { data, error } = await db
    .from("chapter_notes")
    .select("id, chapter_slug, content, created_at, updated_at")
    .eq("user_id", user.id)
    .eq("chapter_slug", slug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("chapter-notes GET error:", error);
    return NextResponse.json({ notes: [] });
  }

  return NextResponse.json({ notes: data ?? [] });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  let body: { slug?: string; content?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug = (body.slug ?? "").trim();
  const content = (body.content ?? "").trim();
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  if (!content) return NextResponse.json({ error: "Note content cannot be empty" }, { status: 400 });
  if (content.length > MAX_NOTE_LENGTH) {
    return NextResponse.json(
      { error: `Note content too long (max ${MAX_NOTE_LENGTH} chars)` },
      { status: 400 }
    );
  }

  const { data, error } = await db
    .from("chapter_notes")
    .insert({ user_id: user.id, chapter_slug: slug, content })
    .select("id, chapter_slug, content, created_at, updated_at")
    .single();

  if (error) {
    console.error("chapter-notes POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ note: data });
}

export async function DELETE(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing ?id=" }, { status: 400 });

  const { error } = await db
    .from("chapter_notes")
    .delete()
    .eq("user_id", user.id)
    .eq("id", id);

  if (error) {
    console.error("chapter-notes DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
