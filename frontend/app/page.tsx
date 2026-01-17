import React from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TickerStrip from "@/components/TickerStrip";
import { client } from "@/lib/sanity";
import HeroCarousel from "@/components/HeroCarousel";

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

  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return {
    leadStory: data.leadStory,
    feed: data.feed,
    ticker: data.ticker || [],
    analystNote: data.analystNote || null, // Pass this down
  };
}

// ... (Your existing helper functions: getCategoryStyle, getCategoryLabel) ...
const getCategoryStyle = (type: string, pillar: string) => {
  if (type === "webinar") return "text-rose-700 bg-rose-50 border-rose-200";
  switch (pillar) {
    case "Policy":
      return "text-orange-700 bg-orange-50 border-orange-200";
    case "Economics":
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "Technology":
      return "text-indigo-700 bg-indigo-50 border-indigo-200";
    default:
      return "text-slate-700 bg-slate-50 border-slate-200";
  }
};

const getCategoryLabel = (type: string, pillar: string) => {
  if (type === "webinar") return "EVENT";
  return pillar ? pillar.toUpperCase() : "NEWS";
};

export default async function HomePage() {
  const { leadStory, feed, ticker, analystNote } = await getPageData();

  return (
    <div className="min-h-screen bg-white">
      {/* 1. TickerStrip */}
      <TickerStrip tickerData={ticker} />

      {/* 2. Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8 px-4 md:px-0 container mx-auto">
        {/* Sidebar - PASSING THE NOTE DATA HERE */}
        <div className="order-2 lg:order-1 lg:w-1/4">
          <Sidebar noteData={analystNote} />
        </div>

        {/* Intelligence Feed */}
        <div className="order-1 lg:order-2 lg:w-3/4">
          {/* ... (Your existing Main Feed Layout) ... */}

          {/* HERO CAROUSEL (Replaces Lead Story & Visual Insight) */}
          <HeroCarousel leadStory={leadStory} />

          {/* THE WIRE */}
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-2">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                The Wire{" "}
                <span className="text-slate-400 font-normal normal-case ml-2 text-base">
                  Real-time Intelligence
                </span>
              </h2>
              <Link
                href="/advisory/reports"
                className="text-xs font-bold text-slate-500 hover:text-indigo-600"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {feed?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors p-2 rounded -mx-2 group"
                >
                  <div className="flex items-center gap-3 w-40 flex-shrink-0">
                    <span
                      className={`text-[10px] font-black px-2 py-1 rounded w-16 text-center border ${getCategoryStyle(item._type, item.pillar)}`}
                    >
                      {getCategoryLabel(item._type, item.pillar)}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <Link
                      href={
                        item._type === "webinar"
                          ? `/education/webinars/${item.slug}`
                          : item._type === "course"
                            ? `/education/courses/${item.slug}`
                            : `/advisory/reports`
                      }
                      className="text-base font-bold text-slate-800 leading-snug hover:text-indigo-600"
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border border-slate-200 text-slate-500 font-bold text-sm rounded hover:bg-slate-50 hover:text-slate-900 transition-colors">
              Load More Intelligence
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
