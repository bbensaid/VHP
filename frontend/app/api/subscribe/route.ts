import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = (body.email ?? "").trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  try {
    // Check if already subscribed
    const existing = await sanity.fetch(
      `*[_type == "subscriber" && email == $email][0]{ _id, isActive }`,
      { email }
    );

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json({ message: "Already subscribed" });
      }
      // Re-activate
      await sanity.patch(existing._id).set({ isActive: true }).commit();
      return NextResponse.json({ message: "Subscription reactivated" });
    }

    // New subscriber
    await sanity.create({
      _type: "subscriber",
      email,
      tier: "free",
      isActive: true,
      digestEnabled: true,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
  }
}
