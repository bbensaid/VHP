import type { ReactNode } from "react";
import FutureOfferingNotice from "@/components/FutureOfferingNotice";

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return <FutureOfferingNotice>{children}</FutureOfferingNotice>;
}
