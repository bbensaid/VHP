import type { ReactNode } from "react";
import { brandedMetadata } from "@/lib/brand-server";

// Metadata lives here because page.tsx is a client component (or a utility
// page) and cannot export it.
export function generateMetadata() {
  return brandedMetadata(
    "Bed Capacity & Transfer",
    "Bed capacity, interfacility transfer routing, and the repatriation queue for Vermont's 14-hospital network."
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
