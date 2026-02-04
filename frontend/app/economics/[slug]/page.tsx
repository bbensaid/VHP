import { ArticleEngine } from "@/components/templates/ArticleEngine";

export const revalidate = 60; // Updates content every minute

interface PageParams {
  params: Promise<{ slug: string }>;
}

export default async function EconomicsArticlePage({ params }: PageParams) {
  const { slug } = await params;
  return <ArticleEngine slug={slug} pillar="economics" />;
}