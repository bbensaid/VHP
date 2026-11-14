import { client } from "@/lib/sanity";
import HomeContent from "@/components/HomeContent";
import { getBrandConfig } from "@/lib/brand";
import { currentBrand } from "@/lib/brand-server";

// Titled per brand: one deployment serves the Review and Solutions domains
// (lib/brand.ts), and a hard-coded "Review" title showed on Solutions too.
export async function generateMetadata() {
  const { displayName } = getBrandConfig(await currentBrand());
  const title = `${displayName} | HTR`;
  const description = "The intelligence platform for healthcare transformation leaders. Five-pillar analysis covering Policy, Technology, Economics, Clinical, and Operations — each held to the Equity Imperative.";
  return {
    title,
    description,
    // A page-level openGraph replaces the root one, so restate its fields.
    openGraph: { type: "website", siteName: displayName, locale: "en_US", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

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
