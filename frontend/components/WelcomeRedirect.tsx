"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const SKIP_PATHS = ["/welcome", "/start", "/beta", "/login", "/signup", "/studio"];

export default function WelcomeRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (SKIP_PATHS.some((p) => pathname.startsWith(p))) return;
    const role = localStorage.getItem("htr-user-role");
    if (!role) {
      router.replace("/welcome");
    }
  }, [pathname, router]);

  return null;
}
