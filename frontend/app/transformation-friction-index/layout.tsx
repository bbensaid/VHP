import type { ReactNode } from "react";
import { brandedMetadata } from "@/lib/brand-server";

// Metadata lives here because page.tsx is a client component (or a utility
// page) and cannot export it.
export function generateMetadata() {
  return brandedMetadata(
    "Transformation Friction Index",
    "A composite score that weighs the complexity of a proposed transformation against the operational and structural readiness of the health infrastructure it must run through."
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
