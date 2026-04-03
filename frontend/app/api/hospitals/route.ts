import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const revalidate = 86400; // cache for 24 hours — hospital data is quarterly

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");

  if (!state) {
    return NextResponse.json({ error: "state param required" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data, error } = await supabase
    .from("hospitals_cms")
    .select(
      "cms_provider_id, name, city, county, beds, hospital_type, ownership, " +
      "emergency_services, cms_star_rating, readmission_rate, mortality_rate, " +
      "safety_score, data_year"
    )
    .eq("state", state)
    .order("name", { ascending: true });

  if (error) {
    console.error("hospitals_cms fetch error:", error.message);
    return NextResponse.json({ hospitals: [], source: "error" });
  }

  return NextResponse.json({
    hospitals: data ?? [],
    source: data && data.length > 0 ? "cms" : "empty",
  });
}
