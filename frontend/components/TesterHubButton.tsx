"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Persistent entry point to the beta Tester Hub. Fixed bottom-right on every
// page so testers can jump to the feedback hub from wherever they are, then
// come back to the page they were rating. Hidden on the hub itself.
export default function TesterHubButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/tester")) return null;

  return (
    <Link
      href="/tester"
      title="Open the beta Tester Hub"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border-2 border-indigo-400 bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-indigo-700"
    >
      <span className="text-base leading-none">🧪</span>
      <span>Tester Hub</span>
    </Link>
  );
}
