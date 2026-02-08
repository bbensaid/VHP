import { client } from "@/sanity/lib/client";
import { PillarHub } from "@/components/templates/PillarHub";

export const metadata = {
  title: "HTR Technology | Digital Health & Innovation",
  description: "Analyzing the digital transformation of Vermont healthcare.",
};

export const revalidate = 60;

export default async function TechnologyPage() {
  const query = `*[_type == "policyAnalysis" && pillar == "Technology"] | order(publishedAt desc) {
    _id, title, slug, summary, publishedAt, category, impactLevel
  }`;
  const articles = await client.fetch(query);

  return (
    <PillarHub
      pillarName="Technology"
      pillarSlug="technology"
      tagline="Digital Health & Innovation"
      description="Analyzing the digital transformation of Vermont healthcare, from AI adoption to HIE interoperability."
      themeColor="technology"
      featured={articles[0] || null}
      recent={articles.slice(1, 4)}
    />
  );
}