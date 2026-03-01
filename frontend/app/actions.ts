"use server";

import { client } from "@/lib/sanity";

export async function getMoreArticles(pillar: string, category: string | undefined, start: number, limit: number, searchQuery?: string, impactLevel?: string, sortOrder: string = "desc") {
  const categoryFilter = category ? ` && category match "*${category}*"` : "";
  const searchFilter = searchQuery ? ` && title match "*${searchQuery}*"` : "";
  const impactFilter = impactLevel ? ` && impactLevel == "${impactLevel}"` : "";
  // GROQ slice [start...end] is exclusive of end
  const end = start + limit;
  const query = `*[_type == "policyAnalysis" && pillar == "${pillar}"${categoryFilter}${searchFilter}${impactFilter}] | order(publishedAt ${sortOrder}) [${start}...${end}] {
    _id, title, summary, publishedAt, slug, status, impactLevel, mainImage,
    "readTime": round(length(pt::text(body)) / 1000)
  }`;
  return client.fetch(query, {}, { next: { revalidate: 0 } });
}