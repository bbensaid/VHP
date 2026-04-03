import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const revalidate = 0; // always fresh — profiles update frequently

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgType = searchParams.get("org_type");
  const pillar  = searchParams.get("pillar");
  const state   = searchParams.get("state");
  const q       = searchParams.get("q")?.trim().slice(0, 100);

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  // Must be authenticated to view directory
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let query = supabase
    .from("professional_profiles")
    .select("id, display_name, title, organization, organization_type, bio, pillars, state, linkedin_url, created_at")
    .eq("is_public", true)
    .order("display_name", { ascending: true })
    .limit(100);

  if (orgType) query = query.eq("organization_type", orgType);
  if (state)   query = query.eq("state", state);
  if (pillar)  query = query.contains("pillars", [pillar]);
  if (q)       query = query.or(`display_name.ilike.%${q}%,organization.ilike.%${q}%,title.ilike.%${q}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ profiles: [], error: error.message });
  return NextResponse.json({ profiles: data ?? [] });
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { display_name, title, organization, organization_type, bio, pillars, state, linkedin_url, is_public } = body;

  if (!display_name?.trim()) {
    return NextResponse.json({ error: "display_name is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("professional_profiles")
    .upsert({
      user_id:           user.id,
      display_name:      display_name.trim().slice(0, 80),
      title:             title?.trim().slice(0, 120) ?? null,
      organization:      organization?.trim().slice(0, 120) ?? null,
      organization_type: organization_type ?? null,
      bio:               bio?.trim().slice(0, 600) ?? null,
      pillars:           Array.isArray(pillars) ? pillars : [],
      state:             state ?? null,
      linkedin_url:      linkedin_url?.trim().slice(0, 300) ?? null,
      is_public:         is_public !== false,
    }, { onConflict: "user_id" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ profile: data });
}
