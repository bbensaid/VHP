import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { TOOLS } from "@/lib/taxonomy/tools";
import { db } from "@/lib/db/client";

type AcademyHit = { _type: string; _id: string; title: string; href: string; label: string; description: string | null };

// Supabase Academy courses + tracks (Appendix F.2: search spans courses too).
// Links go to the real player route /academy/tracks/<courseSlug> — never the legacy
// Sanity /academy/courses/ route. A track has no route of its own, so it links to its
// course page. is_published is enforced at course AND track level (same as the player).
async function searchAcademy(q: string): Promise<AcademyHit[]> {
  // Strip PostgREST filter syntax and ilike wildcards from the user's term.
  const safe = q.replace(/[,()%_*\\:."']/g, " ").trim();
  if (safe.length < 2) return [];
  const pat = `%${safe}%`;
  const [coursesRes, tracksRes] = await Promise.all([
    db
      .from("courses")
      .select("id, slug, title, subtitle")
      .eq("is_published", true)
      .or(`title.ilike.${pat},subtitle.ilike.${pat}`)
      .order("is_featured", { ascending: false })
      .limit(5),
    db
      .from("tracks")
      .select("id, title, description, courses!inner(slug, title, is_published)")
      .eq("is_published", true)
      .eq("courses.is_published", true)
      .ilike("title", pat)
      .limit(5),
  ]);
  if (coursesRes.error) console.error("Search: courses query failed:", coursesRes.error.message);
  if (tracksRes.error) console.error("Search: tracks query failed:", tracksRes.error.message);

  const courses: AcademyHit[] = (coursesRes.data ?? []).map((c: Record<string, unknown>) => ({
    _type: "course",
    _id: `course-${c.id as string}`,
    title: c.title as string,
    href: `/academy/tracks/${c.slug as string}`,
    label: "Academy Course",
    description: (c.subtitle as string | null) ?? null,
  }));
  const tracks: AcademyHit[] = (tracksRes.data ?? []).flatMap((t: Record<string, unknown>) => {
    const parent = (Array.isArray(t.courses) ? t.courses[0] : t.courses) as
      | { slug: string; title: string }
      | undefined;
    if (!parent?.slug) return [];
    return [{
      _type: "track",
      _id: `track-${t.id as string}`,
      title: t.title as string,
      href: `/academy/tracks/${parent.slug}`,
      label: "Academy Track",
      description: `In course: ${parent.title}${t.description ? ` — ${t.description as string}` : ""}`,
    }];
  });
  return [...courses, ...tracks];
}

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

    // Academy is best-effort: a Supabase failure must not take down Sanity results.
    const academy = await searchAcademy(q).catch((e: unknown) => {
      console.error("Search: academy lookup failed:", e);
      return [] as AcademyHit[];
    });

    // Research Lab tools come from the static registry (Appendix F.2: search spans tools too).
    const needle = q.toLowerCase();
    const tools = TOOLS.filter(
      (t) =>
        t.status !== "deprecated" &&
        (t.label.toLowerCase().includes(needle) || (t.desc ?? "").toLowerCase().includes(needle)),
    ).slice(0, 5);

    const results = [
      ...tools.map((t) => ({ _type: "tool", _id: `tool-${t.id}`, title: t.label, href: t.href, label: "Research Lab Tool", description: t.desc ?? null })),
      ...academy,
      ...data.posts.map((r) => ({ ...r, href: `/articles/${r.slug}`, label: "Article", description: r.excerpt })),
      ...data.analyses.map((r) => ({ ...r, href: `/policy/${r.slug}`, label: "Policy Analysis", description: r.summary })),
      ...data.modules.map((r) => ({ ...r, href: `/academy/modules/${r.slug}`, label: "Academy Module", description: r.description })),
      ...data.definitions.map((r) => ({ ...r, href: `/academy/glossary#${r._id}`, label: "Definition", description: r.excerpt })),
      ...data.caseStudies.map((r) => ({ ...r, href: `/articles/${r.slug}`, label: "Case Study", description: r.summary })),
      ...data.analystNotes.map((r) => ({ ...r, href: `/chat`, label: "Analyst Note", description: null })),
    ];

    return NextResponse.json({ results, query: q });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ results: [], error: "Search unavailable" }, { status: 500 });
  }
}
