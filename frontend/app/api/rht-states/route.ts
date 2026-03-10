import { NextResponse } from "next/server";
import { getAllRhtStates } from "@/lib/sanity-dashboard-queries";

export const revalidate = 3600;

export async function GET() {
  try {
    const states = await getAllRhtStates();
    return NextResponse.json(states);
  } catch (err) {
    console.error("rht-states fetch error:", err);
    return NextResponse.json({}, { status: 500 });
  }
}
