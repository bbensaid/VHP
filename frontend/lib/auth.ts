/**
 * Server-side auth helpers — use ONLY in Server Components, API Routes,
 * and Server Actions. Never import in "use client" files.
 *
 * Uses @supabase/ssr for proper cookie-based session handling in Next.js.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole =
  | "free"
  | "subscriber"
  | "student"
  | "professional"
  | "advisory"
  | "admin";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: UserRole;
  plan: string;
};

// Role hierarchy: higher index = more access
const ROLE_HIERARCHY: UserRole[] = [
  "free",
  "subscriber",
  "student",
  "professional",
  "advisory",
  "admin",
];

export function roleAtLeast(userRole: UserRole, required: UserRole): boolean {
  return (
    ROLE_HIERARCHY.indexOf(userRole) >= ROLE_HIERARCHY.indexOf(required)
  );
}

// ─── Supabase SSR client ──────────────────────────────────────────────────────

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore: setAll called from Server Component (read-only context)
          }
        },
      },
    }
  );
}

// ─── getUser ─────────────────────────────────────────────────────────────────

/** Get the current authenticated user with profile + role data. Returns null if not logged in. */
export async function getUser(): Promise<AuthUser | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch profile + role + subscription in parallel
  // Must use the session-bearing client: RLS on profiles/user_roles/subscriptions
  // only exposes the caller's own rows to auth.uid(). The anon `db` client has no
  // session, saw zero rows, and so demoted every user (admins included) to "free".
  const [profileRes, roleRes, subRes] = await Promise.all([
    supabase.from("profiles").select("full_name,avatar_url").eq("id", user.id).single(),
    supabase.from("user_roles").select("role").eq("user_id", user.id).order("role"),
    supabase.from("subscriptions").select("plan").eq("user_id", user.id).single(),
  ]);

  // Determine highest role
  const roles = (roleRes.data as { role: string }[] | null) ?? [];
  let highestRole: UserRole = "free";
  for (const roleOrder of [...ROLE_HIERARCHY].reverse()) {
    if (roles.some((r) => r.role === roleOrder)) {
      highestRole = roleOrder;
      break;
    }
  }

  return {
    id: user.id,
    email: user.email ?? "",
    fullName: profileRes.data?.full_name ?? null,
    avatarUrl: profileRes.data?.avatar_url ?? null,
    role: highestRole,
    plan: subRes.data?.plan ?? "free",
  };
}

// ─── requireAuth ─────────────────────────────────────────────────────────────

/** Redirect to /login if not authenticated. Returns the user if logged in. */
export async function requireAuth(redirectTo?: string): Promise<AuthUser> {
  const user = await getUser();
  if (!user) {
    redirect(`/login${redirectTo ? `?from=${encodeURIComponent(redirectTo)}` : ""}`);
  }
  return user;
}

// ─── requireRole ─────────────────────────────────────────────────────────────

/** Redirect to /upgrade if user lacks required role. Returns user if authorized. */
export async function requireRole(
  required: UserRole,
  redirectPath = "/upgrade"
): Promise<AuthUser> {
  const user = await requireAuth();
  if (!roleAtLeast(user.role, required)) {
    redirect(redirectPath);
  }
  return user;
}

// ─── canAccess ───────────────────────────────────────────────────────────────

/** Non-redirecting check — use in components to conditionally render UI. */
export async function canAccess(required: UserRole): Promise<boolean> {
  const user = await getUser();
  if (!user) return false;
  return roleAtLeast(user.role, required);
}

/**
 * Authorization header for calls from Next route handlers to the Python
 * backend: the caller's real Supabase access token when signed in. These routes
 * used to send "Bearer dev" always, so the backend never knew who was asking
 * (no history, no per-user log, no role-based tools). Anonymous callers send no
 * token; the backend decides (ALLOW_ANONYMOUS_AI during beta).
 */
export async function backendAuthHeader(): Promise<Record<string, string>> {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {};
}
