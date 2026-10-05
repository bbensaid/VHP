import { client } from "@/lib/sanity";
import HomeContent from "@/components/HomeContent";

export const metadata = {
  title: "Health Transformation Review | HTR",
  description: "The intelligence platform for healthcare transformation leaders. Five-pillar analysis covering Policy, Technology, Economics, Clinical, and Operations — each held to the Equity Imperative.",
};

export const revalidate = 120; // Fallback ISR: revalidate every 2 minutes (webhook busts sooner)

// The hero reads lib/briefings (versioned, sourced, checked by
// scripts/check-briefings.ts), so the homepage only fetches the feed.
async function getFeed() {
  const query = `*[_type in ["course", "webinar"]] | order(_createdAt desc)[0...5]{
    _id, _type, title, _createdAt, "pillar": pillar, "slug": slug.current, "date": date
  }`;
  return client.fetch(query, {}, { next: { revalidate: 120, tags: ["course", "webinar"] } });
}

export default async function HomePage() {
  const feed = await getFeed();
  return <HomeContent feed={feed} />;
}
