import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Route protection config ──────────────────────────────────────────────────
type Protection =
  | { type: "authOnly" }
  | { type: "role"; role: string };

const PROTECTED_ROUTES: Array<{ prefix: string; protection: Protection }> = [
  { prefix: "/admin",         protection: { type: "role",     role: "admin" } },
  { prefix: "/advisory-hub", protection: { type: "role",     role: "subscriber" } },
  { prefix: "/dashboard",    protection: { type: "role",     role: "subscriber" } },
  { prefix: "/chat",         protection: { type: "role",     role: "subscriber" } },
  { prefix: "/hti-dashboard",protection: { type: "role",     role: "subscriber" } },
  { prefix: "/account",      protection: { type: "authOnly"              } },
  { prefix: "/onboarding",   protection: { type: "authOnly"              } },
];

const AUTH_ROUTES = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Redirect logged-in users away from auth pages
  if (user && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  const match = PROTECTED_ROUTES.find((r) => pathname.startsWith(r.prefix));
  if (!match) return response;

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (match.protection.type === "role") {
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    const HIERARCHY = ["free", "subscriber", "student", "professional", "advisory", "admin"];
    const requiredIdx = HIERARCHY.indexOf(match.protection.role);

    const hasAccess = (roles ?? []).some(
      (r: { role: string }) => HIERARCHY.indexOf(r.role) >= requiredIdx
    );

    if (!hasAccess) {
      const upgradeUrl = new URL("/upgrade", request.url);
      upgradeUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(upgradeUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$|studio).*)",
  ],
};
