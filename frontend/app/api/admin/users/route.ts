/**
 * PATCH /api/admin/users
 * Change a user's role. Admin only.
 * Body: { userId: string; role: string }
 */
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";

const VALID_ROLES = ["free", "student", "subscriber", "professional", "advisory", "admin"] as const;
type ValidRole = typeof VALID_ROLES[number];

export async function PATCH(req: NextRequest) {
  try {
    await requireRole("admin", "/");
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId, role } = await req.json() as { userId?: string; role?: string };

  if (!userId || !role) {
    return NextResponse.json({ error: "userId and role required" }, { status: 400 });
  }
  if (!VALID_ROLES.includes(role as ValidRole)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  // Upsert into user_roles (one row per user — overwrite existing role)
  const { error } = await dbAdmin
    .from("user_roles")
    .upsert({ user_id: userId, role }, { onConflict: "user_id" });

  if (error) {
    console.error("[admin/users] role update error:", error.message);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
