import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const revalidate = 3600; // cache for 1 hour

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stateId = searchParams.get("state");
  const quarter = searchParams.get("quarter");

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  let query = supabase
    .from("hti_scores")
    .select("*")
    .order("quarter", { ascending: true });

  if (stateId) query = query.eq("state_id", stateId);
  if (quarter) query = query.eq("quarter", quarter);

  const { data, error } = await query;

  if (error) {
    console.error("hti_scores fetch error:", error.message);
    // Return empty — frontend will fall back to static data
    return NextResponse.json({ scores: [], source: "error" });
  }

  return NextResponse.json({
    scores: data ?? [],
    source: data && data.length > 0 ? "supabase" : "empty",
  });
}
