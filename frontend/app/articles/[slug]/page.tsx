import ArticlePageTemplate from "@/components/ArticlePageTemplate";

export default async function GlobalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // This passes the slug to your layout, which fetches the content
  return <ArticlePageTemplate params={Promise.resolve({ id: slug })} />;
}
