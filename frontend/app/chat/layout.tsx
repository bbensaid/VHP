import type { ReactNode } from "react";
import { brandedMetadata } from "@/lib/brand-server";

// Metadata lives here because page.tsx is a client component (or a utility
// page) and cannot export it.
export function generateMetadata() {
  return brandedMetadata(
    "AI Analyst",
    "Ask the HTR AI Analyst questions grounded in the platform's policy and research corpus.",
    { noIndex: true }
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
