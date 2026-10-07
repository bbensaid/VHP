import type { Metadata } from "next";
import { brandedMetadata } from "@/lib/brand-server";
import PillarOverview from "@/components/PillarOverview";

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata("Economics", "Healthcare economics intelligence covering value-based care models, market and finance dynamics, labor and workforce strategy, and healthcare investment trends.");
}

export default function Page() {
  return <PillarOverview pillarId="economics" />;
}
