import { client } from "@/sanity/lib/client";
import { PillarHub } from "@/components/templates/PillarHub";

export const metadata = {
  title: "HTR Policy | Legislative & Regulatory Monitor",
  description: "Tracking legislative shifts and regulatory changes.",
};

export const revalidate = 60;

export default async function PolicyPage() {
  const query = `*[_type == "policyAnalysis" && pillar == "Policy"] | order(publishedAt desc) {
    _id, title, slug, summary, publishedAt, category, impactLevel
  }`;
  const articles = await client.fetch(query);

  return (
    <PillarHub
      pillarName="Policy"
      pillarSlug="policy"
      tagline="Legislative & Regulatory Monitor"
      description="Tracking legislative shifts, federal waivers, and regulatory changes impacting Vermont's health landscape."
      themeColor="policy"
      featured={articles[0] || null}
      recent={articles.slice(1, 4)}
    />
  );
}