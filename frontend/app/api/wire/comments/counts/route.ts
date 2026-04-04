import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/db/client";

// GET /api/wire/comments/counts
// Returns { counts: { [article_url]: number } } for all articles that have comments.
// Used to populate the comment badge on Wire feed items.
export async function GET() {
  const { data, error } = await dbAdmin
    .from("wire_comment_counts")
    .select("article_url, comment_count");

  if (error) return NextResponse.json({ counts: {} });

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.article_url] = Number(row.comment_count);
  }
  return NextResponse.json({ counts });
}
