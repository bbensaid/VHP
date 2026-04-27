import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Simple in-process rate limiter for /verify/* ────────────────────────────
// 20 requests per IP per 60-second window. Resets on cold start (acceptable
// for a low-traffic route where the main concern is bulk scraping/brute-force).
const VERIFY_RATE_LIMIT = 20;
const VERIFY_WINDOW_MS  = 60_000;
const verifyHits = new Map<string, { count: number; resetAt: number }>();

function checkVerifyRateLimit(ip: string): boolean {
  const now  = Date.now();
  const rec  = verifyHits.get(ip);
  if (!rec || now > rec.resetAt) {
    verifyHits.set(ip, { count: 1, resetAt: now + VERIFY_WINDOW_MS });
    return true;
  }
  if (rec.count >= VERIFY_RATE_LIMIT) return false;
  rec.count++;
  return true;
}

// ─── Role cache cookie (HMAC-SHA256 signed) ───────────────────────────────────
// Eliminates the `SELECT role FROM user_roles` round-trip on every protected
// route request. Cookie is signed with MIDDLEWARE_ROLE_SECRET so it cannot be
// forged. Falls back to DB lookup if the env var is not set or signature fails.
//
// Cookie format: base64(userId:role:exp) + "." + base64url(HMAC-SHA256 signature)
// TTL: 1 hour. On role change, the next DB lookup overwrites the cookie.

const ROLE_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const ROLE_CACHE_COOKIE = "htr_rc";

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function b64(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

async function signRoleCache(userId: string, role: string, exp: number, secret: string): Promise<string> {
  const payload = `${userId}:${role}:${exp}`;
  const key = await getHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${btoa(payload)}.${b64(sig)}`;
}

async function readRoleCache(cookie: string, userId: string, secret: string): Promise<string | null> {
  try {
    const dot = cookie.indexOf(".");
    if (dot === -1) return null;
    const encodedPayload = cookie.slice(0, dot);
    const encodedSig = cookie.slice(dot + 1);
    const payload = atob(encodedPayload);
    const [uid, role, expStr] = payload.split(":");
    if (uid !== userId) return null;
    if (Date.now() > parseInt(expStr, 10)) return null;
    const key = await getHmacKey(secret);
    const sigBytes = Uint8Array.from(atob(encodedSig), (c) => c.charCodeAt(0));
    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(payload));
    return valid ? role : null;
  } catch {
    return null;
  }
}

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

const HIERARCHY = ["free", "subscriber", "student", "professional", "advisory", "admin"];

const AUTH_ROUTES = ["/login", "/signup"];

const BETA_COOKIE = "htr_beta";

// Set this to 'true' to allow testers to browse the entire app without signing in.
const BYPASS_AUTH = true;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Beta gate — block all page navigation until access code entered ──────────
  // Exemptions: the gate page itself, all API routes (auth/data still works),
  // the studio, and static assets (handled by matcher config).
  const betaExempt =
    pathname.startsWith("/beta") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/studio");

  if (!betaExempt && !request.cookies.get(BETA_COOKIE)?.value) {
    const gateUrl = new URL("/beta", request.url);
    // Preserve the intended destination so we can redirect back after entry
    if (pathname !== "/") gateUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(gateUrl);
  }
  // ────────────────────────────────────────────────────────────────────────────

  // Rate-limit the public certificate verify endpoint
  if (pathname.startsWith("/verify/")) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? request.headers.get("x-real-ip")
      ?? "unknown";
    if (!checkVerifyRateLimit(ip)) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: { "Retry-After": "60" },
      });
    }
  }

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

  if (!user && !BYPASS_AUTH) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (BYPASS_AUTH) return response;

  if (match.protection.type === "role") {
    const requiredIdx = HIERARCHY.indexOf(match.protection.role);
    const roleSecret = process.env.MIDDLEWARE_ROLE_SECRET;

    // Try cache first
    let cachedRole: string | null = null;
    if (roleSecret) {
      const cached = request.cookies.get(ROLE_CACHE_COOKIE)?.value;
      if (cached) {
        cachedRole = await readRoleCache(cached, user.id, roleSecret);
      }
    }

    let userRoleIdx = -1;

    if (cachedRole !== null) {
      // Cache hit — no DB round-trip
      userRoleIdx = HIERARCHY.indexOf(cachedRole);
    } else {
      // Cache miss — query DB
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      const bestRole = (roles ?? [])
        .map((r: { role: string }) => HIERARCHY.indexOf(r.role))
        .reduce((a: number, b: number) => Math.max(a, b), -1);
      userRoleIdx = bestRole;
      const roleName = bestRole >= 0 ? HIERARCHY[bestRole] : "free";

      // Write cache cookie
      if (roleSecret) {
        const exp = Date.now() + ROLE_CACHE_TTL_MS;
        const signed = await signRoleCache(user.id, roleName, exp, roleSecret);
        response.cookies.set(ROLE_CACHE_COOKIE, signed, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: ROLE_CACHE_TTL_MS / 1000,
          path: "/",
        });
      }
    }

    if (userRoleIdx < requiredIdx) {
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
