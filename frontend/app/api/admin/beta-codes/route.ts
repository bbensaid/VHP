/**
 * Admin CRUD for beta_access_codes.
 * All routes require admin role (checked via Supabase session + user_roles table).
 */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { dbAdmin } from "@/lib/db/client";
import { cookies } from "next/headers";
import { ACCESS_DOMAINS } from "@/lib/brand";

/**
 * Validate a list of domains against the canonical ACCESS_DOMAINS. Returns the
 * de-duplicated list of valid domains, or null if any entry is invalid.
 */
function sanitizeDomains(input: unknown): string[] | null {
  if (!Array.isArray(input)) return null;
  const allowed = new Set<string>(ACCESS_DOMAINS as readonly string[]);
  const seen = new Set<string>();
  for (const d of input) {
    if (typeof d !== "string" || !allowed.has(d)) return null;
    seen.add(d);
  }
  return [...seen];
}

async function requireAdmin(): Promise<string | null> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: roles } = await dbAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  const isAdmin = (roles ?? []).some((r: { role: string }) => r.role === "admin");
  return isAdmin ? user.id : null;
}

// GET — list all codes
export async function GET() {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data, error } = await dbAdmin
    .from("beta_access_codes")
    .select("id, code, label, is_active, allowed_domains, created_at")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ codes: data });
}

// POST — create a new code
export async function POST(req: NextRequest) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { code, label, allowed_domains } = await req.json();
  if (!code?.trim()) return NextResponse.json({ error: "code is required" }, { status: 400 });

  const domains = sanitizeDomains(allowed_domains);
  if (domains === null) {
    return NextResponse.json({ error: "allowed_domains must be a list of valid access domains" }, { status: 400 });
  }
  if (domains.length === 0) {
    return NextResponse.json({ error: "Select at least one domain for this code" }, { status: 400 });
  }

  const { data, error } = await dbAdmin
    .from("beta_access_codes")
    .insert({ code: code.trim(), label: label?.trim() || null, allowed_domains: domains })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 409 });
  return NextResponse.json({ code: data }, { status: 201 });
}

// PATCH — toggle active status
export async function PATCH(req: NextRequest) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id, is_active, allowed_domains } = await req.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const update: { is_active?: boolean; allowed_domains?: string[] } = {};
  if (typeof is_active === "boolean") update.is_active = is_active;
  if (allowed_domains !== undefined) {
    const domains = sanitizeDomains(allowed_domains);
    if (domains === null) {
      return NextResponse.json({ error: "allowed_domains must be a list of valid access domains" }, { status: 400 });
    }
    if (domains.length === 0) {
      return NextResponse.json({ error: "Select at least one domain for this code" }, { status: 400 });
    }
    update.allowed_domains = domains;
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "nothing to update" }, { status: 400 });
  }

  const { data, error } = await dbAdmin
    .from("beta_access_codes")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ code: data });
}

// DELETE — remove a code
export async function DELETE(req: NextRequest) {
  const adminId = await requireAdmin();
  if (!adminId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const { error } = await dbAdmin
    .from("beta_access_codes")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
