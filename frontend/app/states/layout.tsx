import type { ReactNode } from "react";
import { brandedMetadata } from "@/lib/brand-server";

// Metadata lives here because page.tsx is a client component (or a utility
// page) and cannot export it.
export function generateMetadata() {
  return brandedMetadata(
    "State-by-State Health Reform",
    "An interactive map of health reform activity in every U.S. state."
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
