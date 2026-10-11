"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const BOOT_KEY = "htr-boot-id";
const SKIP_PATHS = ["/welcome", "/beta", "/login", "/signup", "/studio"];

/**
 * The app always opens on the home page. Nothing in the app redirects to a
 * deep page on start; what does is the browser restoring its last tab (Chrome
 * "Continue where you left off"), which reopened e.g. a featured Academy track.
 *
 * `bootId` changes each time the server process starts. The first page load a
 * browser sees after a new boot is "the application starting": if it is not
 * the home page, go home. Later navigations, reloads and deep links within the
 * same run are untouched.
 *
 * bootId is null in production, where every serverless instance would have its
 * own id and shared deep links must keep working.
 */
export default function StartAtHome({ bootId }: { bootId: string | null }) {
  const pathname = usePathname() || "/";

  useEffect(() => {
    if (!bootId) return;
    let seen: string | null = null;
    try {
      seen = localStorage.getItem(BOOT_KEY);
      if (seen === bootId) return;
      localStorage.setItem(BOOT_KEY, bootId);
      // First-time visitors go through /welcome (WelcomeRedirect) instead.
      if (!localStorage.getItem("htr-user-role")) return;
    } catch {
      return;
    }
    if (pathname !== "/" && !SKIP_PATHS.some((p) => pathname.startsWith(p))) {
      // A hard replace: router.replace() issued during the first hydration is
      // silently dropped, and this runs once per app start, so the reload is free.
      window.location.replace("/");
    }
    // Runs once per page load: a later pathname change is in-app navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootId]);

  return null;
}
