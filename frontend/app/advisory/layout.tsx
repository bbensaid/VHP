import type { ReactNode } from "react";
import FutureOfferingNotice from "@/components/FutureOfferingNotice";
import { requireAdvisoryBrand } from "@/lib/brand-server";

export default async function AdvisoryLayout({ children }: { children: ReactNode }) {
  await requireAdvisoryBrand();
  return <FutureOfferingNotice>{children}</FutureOfferingNotice>;
}
