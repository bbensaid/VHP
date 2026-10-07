import type { ReactNode } from "react";
import { brandedMetadata } from "@/lib/brand-server";

// Metadata lives here because page.tsx is a client component (or a utility
// page) and cannot export it.
export function generateMetadata() {
  return brandedMetadata(
    "Impact Simulation Engine",
    "Select a transformation scenario, adjust parameters, and see how it propagates across all five pillars simultaneously — and whether it passes the Equity Imperative."
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
