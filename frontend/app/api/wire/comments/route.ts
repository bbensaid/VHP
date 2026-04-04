import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";

// GET /api/wire/comments?url=<article_url>
// Returns comments + author display name for one article.
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });

  const { data, error } = await dbAdmin
    .from("wire_comments")
    .select(`
      id, body, upvotes, created_at, user_id,
      profiles!wire_comments_user_id_fkey ( full_name, avatar_url )
    `)
    .eq("article_url", url)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comments: data ?? [] });
}

// POST /api/wire/comments
// Body: { article_url, article_title, body }
export async function POST(req: NextRequest) {
  const user = await requireAuth();

  const { article_url, article_title, body } = await req.json();
  if (!article_url || !body) {
    return NextResponse.json({ error: "article_url and body required" }, { status: 400 });
  }
  if (body.length < 2 || body.length > 2000) {
    return NextResponse.json({ error: "body must be 2–2000 chars" }, { status: 400 });
  }

  const { data, error } = await dbAdmin
    .from("wire_comments")
    .insert({
      article_url: article_url.trim(),
      article_title: (article_title ?? "").trim(),
      user_id: user.id,
      body: body.trim(),
    })
    .select(`
      id, body, upvotes, created_at, user_id,
      profiles!wire_comments_user_id_fkey ( full_name, avatar_url )
    `)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comment: data }, { status: 201 });
}
