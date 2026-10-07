import type { Metadata } from "next";
import { brandedMetadata } from "@/lib/brand-server";
import PillarOverview from "@/components/PillarOverview";

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata("Clinical", "Clinical transformation intelligence covering hospital-at-home, precision medicine, virtual care models, genomics, and population health management.");
}

export default function Page() {
  return <PillarOverview pillarId="clinical" />;
}
