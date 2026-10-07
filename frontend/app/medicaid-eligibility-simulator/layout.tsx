import type { ReactNode } from "react";
import { brandedMetadata } from "@/lib/brand-server";

// Metadata lives here because page.tsx is a client component (or a utility
// page) and cannot export it.
export function generateMetadata() {
  return brandedMetadata(
    "Vermont Medicaid Eligibility Simulator",
    "Answer five short questions for a preliminary indication of which Vermont Medicaid programs you or your family may qualify for."
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
