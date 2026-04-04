import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";

// DELETE /api/wire/comments/[id]
// Only the comment's author may delete it.
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth();
  const { id } = await params;

  // Verify ownership before deleting
  const { data: comment } = await dbAdmin
    .from("wire_comments")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!comment) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (comment.user_id !== user.id) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { error } = await dbAdmin.from("wire_comments").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
