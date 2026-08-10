import type { ReactNode } from "react";
import { requireAdvisoryBrand } from "@/lib/brand-server";

export default async function AdvisoryHubLayout({ children }: { children: ReactNode }) {
  await requireAdvisoryBrand();
  return children;
}
