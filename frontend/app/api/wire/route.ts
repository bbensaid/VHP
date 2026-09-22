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
  // Vermont state government (queue #7 — real official feeds, verified live
  // 2026-09-22 by curling each URL directly). Both are the state's own
  // Drupal-generated RSS, same <item>/<title>/<link>/<pubDate> shape as
  // every other source above — no bespoke scraper needed.
  {
    // Green Mountain Care Board's site-wide feed: meeting notes, board
    // presentations, and press releases — including hospital budget /
    // rate decisions ("Press Release - FY27 HBR Decisions") and personnel
    // announcements ("Press Release - New Exec Director"). This is the
    // freshest GMCB feed available; a narrower "Board Decision" taxonomy
    // feed exists (taxonomy/term/70) but its last entry is from Aug 2025,
    // so it was rejected as effectively dead.
    url: "https://gmcboard.vermont.gov/rss.xml",
    label: "GMCB",
    source: "vt_gmcb",
    limit: 8,
  },
  {
    // AHS's own "Press Release" taxonomy feed (discovered via the
    // <link rel="alternate" type="application/rss+xml"> tag on
    // humanservices.vermont.gov/press_releases) — covers health-care
    // transformation announcements (e.g. the AHEAD agreement, the Oliver
    // Wyman reform report) directly, unlike the agency's generic
    // document feed which is dominated by DOC facility-population PDFs.
    // Its most recent entry is Aug 2025 because AHS has not published a
    // new press release since — that is a fact about AHS's cadence, not
    // a broken integration; new posts will surface automatically.
    url: "https://humanservices.vermont.gov/taxonomy/term/3/feed",
    label: "AHS",
    source: "vt_ahs",
    limit: 6,
  },
];

// Vermont Legislature bill tracking (Act 68 amendments, GMCB appointment
// bills) was checked and could NOT be wired: legislature.vermont.gov has
// no public RSS feed (confirmed — no <link rel="alternate" rss> anywhere,
// no /rss.xml, /feed, or /bill/rss route resolves). The state DOES run a
// real bill-data API at legislature.vermont.gov/docs/api/v1, but it is
// key-gated ("contact IT@leg.state.vt.us to obtain an API key") and no key
// is available in this environment. Per standing instruction, this is left
// as an honest "not yet connected" disclosure rather than a scraper against
// the bill-search HTML (fragile, and outside the RSS abstraction every
// other source uses) or fabricated bill entries. Surfaced to the client
// separately from `items` so it never enters pillar-tagging/impact scoring
// as if it were a real headline.
const UNAVAILABLE_SOURCES = [
  {
    label: "VT Legislature",
    reason:
      "No public RSS feed. The Legislature's bill-data API (legislature.vermont.gov/docs/api/v1) requires an API key from IT@leg.state.vt.us that this integration does not have.",
    url: "https://legislature.vermont.gov/bill",
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
          unavailable_sources: UNAVAILABLE_SOURCES,
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

  return NextResponse.json({
    items: allItems,
    fetched_at: fetchedAt,
    unavailable_sources: UNAVAILABLE_SOURCES,
  });
}
