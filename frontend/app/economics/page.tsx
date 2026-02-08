import { client } from "@/sanity/lib/client";
import { PillarHub } from "@/components/templates/PillarHub";

export const metadata = {
  title: "HTR Economics | Market & Finance Monitor",
  description: "Tracking the financial sustainability of health systems.",
};

export const revalidate = 60;

export default async function EconomicsPage() {
  const query = `*[_type == "policyAnalysis" && pillar == "Economics"] | order(publishedAt desc) {
    _id, title, slug, summary, publishedAt, category, impactLevel
  }`;
  const articles = await client.fetch(query);

  return (
    <PillarHub
      pillarName="Economics"
      pillarSlug="economics"
      tagline="Market & Finance Monitor"
      description="Tracking the financial sustainability of health systems, from operating margins to value-based care adoption."
      themeColor="economics"
      featured={articles[0] || null}
      recent={articles.slice(1, 4)}
    />
  );
}