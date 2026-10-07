import type { ReactNode } from "react";
import { brandedMetadata } from "@/lib/brand-server";

// Metadata lives here because page.tsx is a client component (or a utility
// page) and cannot export it.
export function generateMetadata() {
  return brandedMetadata(
    "Health Transformation Roadmap Simulator",
    "Model the multi-pillar impact of any combination of healthcare transformation decisions before implementation — across policy, technology, financial, clinical, and operational dimensions, each held to the Equity Imperative."
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
