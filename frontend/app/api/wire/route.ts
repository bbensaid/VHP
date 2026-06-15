import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const CACHE_KEY = "wire_feed";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

// RSS titles arrive HTML-escaped (named + numeric entities). The previous
// hand-rolled chain only decoded &amp;/&#039;/&quot;, so &#038; (&), curly
// quotes (&#8217;), dashes (&#8211;) etc. leaked through and rendered
// literally in The Wire headlines. This decodes named + decimal + hex
// numeric entities generally. Runs server-side on trusted RSS titles only.
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", apos: "'", quot: '"', lt: "<", gt: ">", nbsp: " ",
  ldquo: "“", rdquo: "”", lsquo: "‘", rsquo: "’",
  ndash: "–", mdash: "—", hellip: "…",
};

function decodeEntities(text: string): string {
  return text
    // numeric: decimal (&#039;) and hex (&#x27;)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    // named (&amp; last so it doesn't double-decode an already-entity string)
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m);
}

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface WireItem {
  title: string;
  url: string;
  source: string;
  label: string;
  published_at: string | null;
}

const SOURCES = [
  // Policy & health system news
  {
    url: "https://kffhealthnews.org/feed/",
    label: "KFF Health News",
    source: "policy",
    limit: 8,
  },
  {
    url: "https://www.statnews.com/feed/",
    label: "STAT News",
    source: "stat",
    limit: 6,
  },
  // Federal regulatory feeds (official RSS — stable, no scraping)
  {
    url: "https://www.federalregister.gov/api/v1/documents.rss?conditions%5Bagencies%5D%5B%5D=centers-for-medicare-medicaid-services&conditions%5Btype%5D%5B%5D=Rule&conditions%5Btype%5D%5B%5D=Proposed+Rule",
    label: "CMS",
    source: "cms",
    limit: 6,
  },
  {
    url: "https://www.federalregister.gov/api/v1/documents.rss?conditions%5Bagencies%5D%5B%5D=food-and-drug-administration&conditions%5Btype%5D%5B%5D=Rule&conditions%5Btype%5D%5B%5D=Notice",
    label: "FDA",
    source: "fda",
    limit: 6,
  },
  // Health technology & digital health
  {
    url: "https://www.healthcareitnews.com/rss.xml",
    label: "Health Tech",
    source: "tech",
    limit: 6,
  },
  // Health economics & policy
  {
    url: "https://www.healthaffairs.org/rss/site_1/16.xml",
    label: "Health Affairs",
    source: "policy",
    limit: 5,
  },
  // Modern Healthcare — operations & business
  {
    url: "https://www.modernhealthcare.com/section/rss",
    label: "Modern Healthcare",
    source: "industry",
    limit: 5,
  },
];

function parseDate(block: string): string | null {
  const m = block.match(/<pubDate>(.*?)<\/pubDate>/);
  if (!m) return null;
  try {
    return new Date(m[1]).toISOString();
  } catch {
    return null;
  }
}

function parseItems(xmlText: string, source: string, label: string, limit: number): WireItem[] {
  const blocks = xmlText.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return blocks.slice(0, limit).flatMap((block) => {
    const titleMatch = block.match(/<title>(.*?)<\/title>/);
    const linkMatch = block.match(/<link>(.*?)<\/link>/);
    if (!titleMatch?.[1] || !linkMatch?.[1]) return [];

    const title = decodeEntities(
      titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/, "$1")
    )
      .replace(/\s*-\s*KFF Health News\s*$/, "")
      .replace(/\s*\|\s*STAT\s*$/, "")
      .replace(/\s*-\s*Health Affairs\s*$/, "")
      .replace(/\s*-\s*Modern Healthcare\s*$/, "")
      .trim();

    return [{
      title,
      url: linkMatch[1].trim(),
      source,
      label,
      published_at: parseDate(block),
    }];
  });
}

export async function GET(request: Request) {
  // ?nocache=1 forces a live re-fetch + re-decode, bypassing the Supabase
  // cache. Useful after a parser/decoder change so stale-decoded headlines
  // don't linger for up to CACHE_TTL_MS.
  const noCache = new URL(request.url).searchParams.get("nocache") === "1";

  // Try Supabase cache first (unless bypassed)
  try {
    if (noCache) throw new Error("cache bypassed");
    const supabase = getServiceClient();
    const { data } = await supabase
      .from("ticker_cache")
      .select("headlines, fetched_at")
      .eq("id", CACHE_KEY)
      .single();

    if (data?.headlines && data.fetched_at) {
      const age = Date.now() - new Date(data.fetched_at).getTime();
      if (age < CACHE_TTL_MS) {
        return NextResponse.json({
          items: data.headlines,
          fetched_at: data.fetched_at,
          from_cache: true,
        });
      }
    }
  } catch {
    // cache miss — proceed to live fetch
  }

  const fetchedAt = new Date().toISOString();
  const allItems: WireItem[] = [];

  await Promise.all(
    SOURCES.map(async ({ url, label, source, limit }) => {
      try {
        const res = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0 (compatible; HTR-Wire/1.0)" },
          next: { revalidate: 900 },
        });
        if (!res.ok) return;
        const text = await res.text();
        allItems.push(...parseItems(text, source, label, limit));
      } catch {
        // individual source failure is non-fatal
      }
    })
  );

  // Sort by published_at descending (nulls last)
  allItems.sort((a, b) => {
    if (!a.published_at && !b.published_at) return 0;
    if (!a.published_at) return 1;
    if (!b.published_at) return -1;
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });

  // Write to cache
  try {
    const supabase = getServiceClient();
    await supabase.from("ticker_cache").upsert({
      id: CACHE_KEY,
      headlines: allItems,
      fetched_at: fetchedAt,
    });
  } catch {
    // non-fatal
  }

  return NextResponse.json({ items: allItems, fetched_at: fetchedAt });
}
