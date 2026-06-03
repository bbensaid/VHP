import ArticlePageTemplate from "@/components/ArticlePageTemplate";

export default async function OperationsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticlePageTemplate params={Promise.resolve({ id: slug })} />;
}
