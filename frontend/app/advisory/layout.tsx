import type { ReactNode } from "react";
import FutureOfferingNotice from "@/components/FutureOfferingNotice";

export default function AdvisoryLayout({ children }: { children: ReactNode }) {
  return <FutureOfferingNotice>{children}</FutureOfferingNotice>;
}
