// app/api/bookmarks/route.ts
//
// GET  /api/bookmarks            → returns all bookmarks for the current user
// POST /api/bookmarks            → adds a bookmark
// DELETE /api/bookmarks?id=      → removes a bookmark by sanity_id

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/auth";
import { db } from "@/lib/db/client";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ bookmarks: [] });

  const { data, error } = await db
    .from("bookmarks")
    .select("sanity_id,slug,title,pillar,content_type,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("bookmarks GET error:", error);
    return NextResponse.json({ bookmarks: [] });
  }

  return NextResponse.json({ bookmarks: data ?? [] });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  let body: { sanity_id: string; slug: string; title: string; pillar?: string; content_type?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.sanity_id || !body.slug || !body.title) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await db.from("bookmarks").upsert(
    {
      user_id: user.id,
      sanity_id: body.sanity_id,
      slug: body.slug,
      title: body.title,
      pillar: body.pillar ?? null,
      content_type: body.content_type ?? null,
    },
    { onConflict: "user_id,sanity_id" }
  );

  if (error) {
    console.error("bookmarks POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const sanityId = searchParams.get("id");
  if (!sanityId) return NextResponse.json({ error: "Missing ?id=" }, { status: 400 });

  const { error } = await db
    .from("bookmarks")
    .delete()
    .eq("user_id", user.id)
    .eq("sanity_id", sanityId);

  if (error) {
    console.error("bookmarks DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
