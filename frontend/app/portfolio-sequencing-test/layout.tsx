import type { ReactNode } from "react";
import { brandedMetadata } from "@/lib/brand-server";

// Metadata lives here because page.tsx is a client component and cannot export it.
export function generateMetadata() {
  return brandedMetadata(
    "Portfolio Sequencing Test",
    "Run the Portfolio Manager's sequencing test from Chapter 15 on a transformation portfolio: which components are correctly waiting, which are late by dependency order, and where schedule pressure belongs."
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
