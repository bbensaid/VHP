import type { Metadata } from "next";
import { brandedMetadata } from "@/lib/brand-server";
import PillarOverview from "@/components/PillarOverview";

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata("The Equity Imperative", "The Equity Imperative — the cross-cutting 'is it just?' test applied to every pillar, not a sixth pillar. Health equity intelligence covering social determinants of health, algorithmic bias in clinical AI, and access disparities across rural, racial, and economic dimensions.");
}

export default function Page() {
  return <PillarOverview pillarId="equity" />;
}
