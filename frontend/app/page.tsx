import HomeContent from "@/components/HomeContent";
import { getBrandConfig } from "@/lib/brand";
import { currentBrand } from "@/lib/brand-server";
import { getWireFeed } from "@/lib/wire/feed";
import { tagItem, type EnrichedWireItem } from "@/lib/wire/tag";

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

export const revalidate = 120; // Fallback ISR: revalidate every 2 minutes

// The hero reads lib/briefings (versioned, sourced, checked by
// scripts/check-briefings.ts). The Wire section shows the same live headline
// feed as /the-wire. It used to query Sanity course/webinar documents, of
// which there are none, so it always read "No items match".
async function getFeed(): Promise<EnrichedWireItem[]> {
  try {
    const { items } = await getWireFeed();
    return items.map(tagItem);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const feed = await getFeed();
  return <HomeContent feed={feed} />;
}
