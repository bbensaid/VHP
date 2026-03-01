import React from "react";
import ArticlePageTemplate from "@/components/ArticlePageTemplate";

export default async function EconomicsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticlePageTemplate params={Promise.resolve({ id: slug })} />;
}