/**
 * POST /api/loops/welcome
 *
 * Called client-side after signup to register the new user in Loops
 * and fire the welcome automation — keeping LOOPS_API_KEY server-only.
 *
 * Body: { email, userId, firstName? }
 */
import { NextRequest, NextResponse } from "next/server";
import { loops, TEMPLATE } from "@/lib/loops";

export async function POST(req: NextRequest) {
  const { email, userId, firstName } = await req.json() as {
    email: string;
    userId: string;
    firstName?: string;
  };

  if (!email || !userId) {
    return NextResponse.json({ error: "email and userId required" }, { status: 400 });
  }

  await Promise.all([
    loops.upsertContact({ email, userId, firstName, plan: "free", userGroup: "free" }),
    loops.sendEvent(email, "user_signed_up"),
    TEMPLATE.welcome
      ? loops.sendTransactional(TEMPLATE.welcome, email, { firstName: firstName ?? "" })
      : Promise.resolve(),
  ]);

  return NextResponse.json({ ok: true });
}
