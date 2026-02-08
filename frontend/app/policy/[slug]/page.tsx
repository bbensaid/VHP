import { ArticleEngine } from "@/components/templates/ArticleEngine";

export default async function PolicyArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticleEngine slug={slug} pillar="policy" />;
}