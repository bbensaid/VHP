import { NextResponse } from "next/server";

// Dev/admin helper: visiting GET /api/beta/clear deletes the beta session cookie
// so you can see the access gate again without clearing all browser cookies.
export function GET() {
  const res = NextResponse.redirect(
    new URL("/beta", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  );
  res.cookies.set("htr_beta", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
  return res;
}
