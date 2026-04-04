// app/api/feedback/route.ts
// POST — record thumbs up/down feedback on an AI response.
// Uses upsert so re-clicking a rating updates rather than duplicates.

import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    const body = await request.json() as {
      messageId: string;
      rating:    "up" | "down" | null;  // null = un-rate
      query?:    string;
      response?: string;
      pillar?:   string;
    };

    const { messageId, rating, query, response, pillar } = body;

    if (!messageId) {
      return NextResponse.json({ error: "messageId required" }, { status: 400 });
    }

    if (rating === null) {
      // User un-rated — delete their feedback row
      await dbAdmin
        .from("rag_feedback")
        .delete()
        .eq("user_id", user.id)
        .eq("message_id", messageId);
      return NextResponse.json({ ok: true, action: "deleted" });
    }

    if (rating !== "up" && rating !== "down") {
      return NextResponse.json({ error: "rating must be 'up', 'down', or null" }, { status: 400 });
    }

    await dbAdmin.from("rag_feedback").upsert(
      {
        user_id:    user.id,
        message_id: messageId,
        rating,
        query:      query?.slice(0, 500) ?? null,
        response:   response?.slice(0, 500) ?? null,
        pillar:     pillar ?? null,
      },
      { onConflict: "user_id,message_id" }
    );

    return NextResponse.json({ ok: true, action: "saved" });
  } catch (err) {
    if (err instanceof Error && err.message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Feedback API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
