import { NextResponse } from "next/server";
import { getAllStateMetrics } from "@/lib/db/states";

// Cache for 1 hour — state health data doesn't change minute-to-minute
export const revalidate = 3600;

export async function GET() {
  const data = await getAllStateMetrics();
  return NextResponse.json(data);
}
