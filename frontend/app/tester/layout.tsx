import type { ReactNode } from "react";
import { brandedMetadata } from "@/lib/brand-server";

// Metadata lives here because page.tsx is a client component (or a utility
// page) and cannot export it.
export function generateMetadata() {
  return brandedMetadata(
    "Beta Tester Hub",
    "Navigation hub for beta testers.",
    { noIndex: true }
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
