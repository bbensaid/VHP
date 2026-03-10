import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const term = `*${q}*`;

  const query = `{
    "posts": *[_type == "post" && (title match $term || excerpt match $term || body[].children[].text match $term)] | order(_createdAt desc) [0...5] {
      _type, _id, title, "slug": slug.current, excerpt, _createdAt,
      "pillar": categories[0]->title
    },
    "analyses": *[_type == "policyAnalysis" && (title match $term || summary match $term)] | order(_createdAt desc) [0...5] {
      _type, _id, title, "slug": slug.current, summary, _createdAt
    },
    "modules": *[_type == "academyModule" && (title match $term || description match $term)] | order(_createdAt desc) [0...5] {
      _type, _id, title, "slug": slug.current, description
    },
    "definitions": *[_type == "definition" && (term match $term || description match $term)] | order(term asc) [0...5] {
      _type, _id, "title": term, "excerpt": description
    },
    "caseStudies": *[_type == "caseStudy" && (title match $term || summary match $term)] | order(_createdAt desc) [0...5] {
      _type, _id, title, "slug": slug.current, summary, _createdAt
    },
    "analystNotes": *[_type == "analystNote" && isActive == true && headline match $term] | order(_createdAt desc) [0...3] {
      _type, _id, "title": headline, _createdAt
    }
  }`;

  type RawDoc = { _id: string; title: string; slug?: string; excerpt?: string; summary?: string; description?: string; _createdAt?: string };

  try {
    const data: {
      posts: RawDoc[];
      analyses: RawDoc[];
      modules: RawDoc[];
      definitions: RawDoc[];
      caseStudies: RawDoc[];
      analystNotes: RawDoc[];
    } = await client.fetch(query, { term });

    const results = [
      ...data.posts.map((r) => ({ ...r, href: `/articles/${r.slug}`, label: "Article", description: r.excerpt })),
      ...data.analyses.map((r) => ({ ...r, href: `/policy/${r.slug}`, label: "Policy Analysis", description: r.summary })),
      ...data.modules.map((r) => ({ ...r, href: `/academy/modules/${r.slug}`, label: "Academy Module", description: r.description })),
      ...data.definitions.map((r) => ({ ...r, href: `/academy`, label: "Definition", description: r.excerpt })),
      ...data.caseStudies.map((r) => ({ ...r, href: `/articles/${r.slug}`, label: "Case Study", description: r.summary })),
      ...data.analystNotes.map((r) => ({ ...r, href: `/chat`, label: "Analyst Note", description: null })),
    ];

    return NextResponse.json({ results, query: q });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ results: [], error: "Search unavailable" }, { status: 500 });
  }
}
