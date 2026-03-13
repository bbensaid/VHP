"use client";

import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";

interface LeadStory {
  title: string;
  summary?: string;
  publishedAt?: string;
  slug?: string;
  pillar?: string;
}

interface FeedItem {
  _id: string;
  _type: string;
  title: string;
  pillar?: string;
  slug?: string;
}

interface HomeContentProps {
  leadStory: LeadStory | null;
  feed: FeedItem[] | null;
}

const getCategoryStyle = (type: string, pillar: string) => {
  if (type === "webinar") return "text-rose-700 bg-rose-50 border-rose-200";
  switch (pillar) {
    case "Policy":
      return "text-sky-700 bg-sky-50 border-sky-200";
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

export default function HomeContent({
  leadStory,
  feed,
}: HomeContentProps) {
  return (
    <>
      {/* HERO CAROUSEL */}
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
          {feed?.map((item, i) => (
            <div
              key={item._id ?? i}
              className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors p-2 rounded -mx-2 group"
            >
              <div className="flex items-center gap-3 w-40 shrink-0">
                <span
                  className={`text-[10px] font-black px-2 py-1 rounded w-16 text-center border ${getCategoryStyle(item._type, item.pillar ?? "")}`}
                >
                  {getCategoryLabel(item._type, item.pillar ?? "")}
                </span>
              </div>
              <div className="flex-grow">
                <Link
                  href={
                    item._type === "webinar"
                      ? `/academy/webinars/${item.slug}`
                      : item._type === "course"
                        ? `/academy/courses/${item.slug}`
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
    </>
  );
}
