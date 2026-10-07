import type { Metadata } from "next";
import { brandedMetadata } from "@/lib/brand-server";
import PillarOverview from "@/components/PillarOverview";
import HR1Tracker from "@/components/policy/HR1Tracker";

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata("Policy", "Healthcare policy analysis covering federal regulation, public health mandates, global comparative policy, and feasibility studies — grounded in the HTR Five-Pillar Framework.");
}

export default function Page() {
  return (
    <PillarOverview pillarId="policy">
      <HR1Tracker />
    </PillarOverview>
  );
}
