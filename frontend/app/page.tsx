import { client } from "@/lib/sanity";
import HomeContent from "@/components/HomeContent";

export const metadata = {
  title: "Health Transformation Review | HTR",
  description: "The intelligence platform for healthcare transformation leaders. Six-pillar analysis covering Policy, Economics, Technology, Clinical, Equity, and Operations.",
};

export const revalidate = 120; // Fallback ISR: revalidate every 2 minutes (webhook busts sooner)

async function getPageData() {
  const query = `{
    "leadStory": *[_type == "report"] | order(publishedAt desc)[0]{
      title, summary, publishedAt, "slug": slug.current, "pillar": pillar
    },
    "feed": *[_type in ["report", "course", "webinar"]] | order(_createdAt desc)[0...5]{
      _type, title, _createdAt, "pillar": pillar, "slug": slug.current, "date": date
    },
    "ticker": *[_type == "ticker"]{
      label, value, trend, status
    },
    // FETCH THE SIGNAL
    "analystNote": *[_type == "analystNote"] | order(_updatedAt desc)[0]{
      headline, content, author
    }
  }`;

  const data = await client.fetch(query, {}, { next: { revalidate: 120, tags: ["report", "course", "webinar", "ticker", "analystNote"] } });
  return {
    leadStory: data.leadStory,
    feed: data.feed,
    ticker: data.ticker || [],
    analystNote: data.analystNote || null, // Pass this down
  };
}

export default async function HomePage() {
  const { leadStory, feed } = await getPageData();

  return <HomeContent leadStory={leadStory} feed={feed} />;
}
