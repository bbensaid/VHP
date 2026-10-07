import type { ReactNode } from "react";
import { requireAdvisoryBrand, brandedMetadata } from "@/lib/brand-server";

export function generateMetadata() {
  return brandedMetadata(
    "Connect Hub",
    "Peer cohorts, expert office hours, and implementation toolkits for members.",
    { noIndex: true }
  );
}

export default async function ConnectHubLayout({ children }: { children: ReactNode }) {
  await requireAdvisoryBrand();
  return children;
}
