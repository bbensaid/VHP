"use server";

import { client } from "@/lib/sanity";

export async function getMoreArticles(
  pillar: string,
  category: string | undefined,
  start: number,
  limit: number,
  searchQuery?: string,
  impactLevel?: string,
  sortOrder: string = "desc"
) {
  const categoryFilter = category ? ` && category match $category` : "";
  const searchFilter = searchQuery ? ` && title match $searchQuery` : "";
  const impactFilter = impactLevel ? ` && impactLevel == $impactLevel` : "";
  const end = start + limit;

  // Matches the doc's home pillar OR any secondary pillar, so cross-pillar
  // pieces (e.g. nursing-workforce economics) surface on /operations too.
  const query = `*[_type == "policyAnalysis" && (pillar == $pillar || $pillar in secondaryPillars)${categoryFilter}${searchFilter}${impactFilter}] | order(publishedAt ${sortOrder}) [${start}...${end}] {
    _id, title, summary, publishedAt, slug, status, impactLevel, mainImage,
    "readTime": round(length(pt::text(body)) / 1000)
  }`;

  const params: Record<string, string> = { pillar };
  if (category) params.category = `*${category}*`;
  if (searchQuery) params.searchQuery = `*${searchQuery}*`;
  if (impactLevel) params.impactLevel = impactLevel;

  return client.fetch(query, params, { next: { revalidate: 0 } });
}
