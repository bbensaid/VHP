import type { ReactNode } from "react";
import { brandedMetadata } from "@/lib/brand-server";

// Metadata lives here because page.tsx is a client component and cannot export it.
export function generateMetadata() {
  return brandedMetadata(
    "Portfolio Sequencing Test",
    "Run the book's dependency-order test (Chapter 1) on a transformation portfolio: which components are correctly waiting, which are late by dependency order, and where schedule pressure belongs."
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
