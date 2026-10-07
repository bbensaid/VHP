import type { Metadata } from "next";
import { brandedMetadata } from "@/lib/brand-server";
import PillarOverview from "@/components/PillarOverview";

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata("Technology", "Healthcare technology intelligence covering AI and machine learning, digital health and telemedicine, data security and governance, and tech-enabled clinical workflows.");
}

export default function Page() {
  return <PillarOverview pillarId="technology" />;
}
