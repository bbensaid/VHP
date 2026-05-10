import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

// Role → pillar(s) mapping
const ROLE_PILLARS: Record<string, string[]> = {
  executive:  ["Operations", "Economics"],
  policy:     ["Policy"],
  clinician:  ["Clinical"],
  economist:  ["Economics"],
  tech:       ["Technology"],
  compliance: ["Policy"],
  researcher: ["Policy", "Economics", "Technology", "Clinical", "Equity"],
  investor:   ["Economics"],
  all:        ["Policy", "Economics", "Technology", "Clinical", "Equity"],
};

// Content types to query — ordered by relevance
const CONTENT_TYPES = ["policyAnalysis", "post", "caseStudy"];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") ?? "all";
  const pillars = ROLE_PILLARS[role] ?? ROLE_PILLARS["all"];

  try {
    const pillarFilter = pillars.map((p) => `"${p}"`).join(", ");
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // Query 1: 2 most recent articles in the last 30 days
    const recentQuery = `*[_type in ["policyAnalysis", "post", "caseStudy"] && pillar in [${pillarFilter}] && _createdAt > "${thirtyDaysAgo}"] | order(_createdAt desc) [0...6] {
      _id,
      _type,
      title,
      "slug": slug.current,
      pillar,
      _createdAt
    }`;

    // Query 2: older articles for random selection
    const olderQuery = `*[_type in ["policyAnalysis", "post", "caseStudy"] && pillar in [${pillarFilter}] && _createdAt <= "${thirtyDaysAgo}"] | order(_createdAt desc) [0...50] {
      _id,
      _type,
      title,
      "slug": slug.current,
      pillar,
      _createdAt
    }`;

    const [recent, older] = await Promise.all([
      client.fetch(recentQuery),
      client.fetch(olderQuery),
    ]);

    // Pick 2 recent + 2 random from older
    const recentPicked = (recent as any[]).slice(0, 2);
    const olderShuffled = shuffleArray(older as any[]);
    const olderPicked = olderShuffled.slice(0, 2);

    // If not enough recent, fill from older
    const combined = [...recentPicked, ...olderPicked].slice(0, 4);

    // If still less than 4, pad with more from older
    if (combined.length < 4) {
      const extra = olderShuffled.slice(olderPicked.length, olderPicked.length + (4 - combined.length));
      combined.push(...extra);
    }

    // Build card objects
    const cards = combined.map((item: any) => ({
      title: item.title,
      pillar: item.pillar,
      type: item._type,
      prompt: `Tell me about "${item.title}" and what it means for me${role !== "all" ? ` as a ${getLabel(role)}` : ""}.`,
      href: buildHref(item),
    }));

    return NextResponse.json({ cards });
  } catch (err) {
    console.error("role-content API error:", err);
    return NextResponse.json({ cards: [] }, { status: 200 });
  }
}

function getLabel(role: string): string {
  const labels: Record<string, string> = {
    executive: "Hospital Executive",
    policy: "Policy Analyst",
    clinician: "Clinician",
    economist: "Health Economist",
    tech: "Health Tech Professional",
    compliance: "Compliance Officer",
    researcher: "Researcher",
    investor: "Investor",
  };
  return labels[role] ?? "healthcare professional";
}

function buildHref(item: any): string {
  const slug = item.slug ?? "";
  switch (item._type) {
    case "policyAnalysis": return `/policy/${slug}`;
    case "caseStudy":      return `/academy/case-studies/${slug}`;
    case "post":           return `/articles/${slug}`;
    default:               return "/";
  }
}
