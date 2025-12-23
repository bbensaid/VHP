// app/api/ticker/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sources = [
      {
        url: "https://kffhealthnews.org/feed/",
        label: "Policy",
      },
      {
        url: "https://news.google.com/rss/search?q=FDA+approval+OR+FDA+regulation+when:2d&hl=en-US&gl=US&ceid=US:en",
        label: "FDA",
      },
      {
        url: "https://news.google.com/rss/search?q=CMS.gov+Medicare+Medicaid+payment+rule+when:2d&hl=en-US&gl=US&ceid=US:en",
        label: "CMS",
      },
    ];

    let items: { text: string; url: string }[] = [];

    await Promise.all(
      sources.map(async (source) => {
        try {
          const res = await fetch(source.url, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; HTR-Bot/1.0)" },
            next: { revalidate: 300 },
          });

          if (!res.ok) return;

          const text = await res.text();
          const itemBlocks = text.match(/<item>[\s\S]*?<\/item>/g);

          if (itemBlocks) {
            // Take top 1 story from each source
            itemBlocks.slice(0, 1).forEach((block) => {
              const titleMatch = block.match(/<title>(.*?)<\/title>/);
              const linkMatch = block.match(/<link>(.*?)<\/link>/);

              if (titleMatch && titleMatch[1] && linkMatch && linkMatch[1]) {
                let cleanTitle = titleMatch[1]
                  .replace(/<!\[CDATA\[(.*?)\]\]>/, "$1")
                  .replace(/&amp;/g, "&")
                  .replace(/&#039;/g, "'")
                  .replace(/\s*-\s*Google News.*/, "")
                  .replace(/\s*-\s*KFF Health News.*/, "");

                items.push({
                  text: `${source.label}: ${cleanTitle.trim()}`,
                  url: linkMatch[1].trim(),
                });
              }
            });
          }
        } catch (err) {
          console.error(`[API] Error on ${source.label}`, err);
        }
      })
    );

    // Fallback if empty
    if (items.length === 0) {
      items = [{ text: "System: Live feeds connecting...", url: "#" }];
    }

    return NextResponse.json({ headlines: items });
  } catch (error) {
    return NextResponse.json(
      { headlines: [{ text: "Status: Feeds Offline", url: "#" }] },
      { status: 500 }
    );
  }
}
