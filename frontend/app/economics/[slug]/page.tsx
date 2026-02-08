import { ArticleEngine } from "@/components/templates/ArticleEngine";

export default async function EconomicsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // We pass 'pillar' just for clarity, even though ArticleEngine is now permissive
  return <ArticleEngine slug={slug} pillar="economics" />;
}