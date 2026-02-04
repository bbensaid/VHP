import { ArticleEngine } from "@/components/templates/ArticleEngine";

export const revalidate = 60;

interface PageParams {
  params: Promise<{ slug: string }>;
}

export default async function TechnologyArticlePage({ params }: PageParams) {
  const { slug } = await params;
  return <ArticleEngine slug={slug} pillar="technology" />;
}