import React from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TickerStrip from "@/components/TickerStrip"; 
import { client } from "@/lib/sanity";

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
    }
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return {
    leadStory: data.leadStory,
    feed: data.feed,
    ticker: data.ticker || []
  };
}

const getCategoryStyle = (type: string, pillar: string) => {
  if (type === 'webinar') return "text-rose-700 bg-rose-50 border-rose-200";
  switch (pillar) {
    case 'Policy': return "text-orange-700 bg-orange-50 border-orange-200";
    case 'Economics': return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case 'Technology': return "text-indigo-700 bg-indigo-50 border-indigo-200";
    default: return "text-slate-700 bg-slate-50 border-slate-200";
  }
};

const getCategoryLabel = (type: string, pillar: string) => {
  if (type === 'webinar') return "EVENT";
  return pillar ? pillar.toUpperCase() : "NEWS";
};

export default async function HomePage() {
  const { leadStory, feed, ticker } = await getPageData();

  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. TickerStrip (Numbers) - Below Header, Top of Body */}
      <TickerStrip tickerData={ticker} />

      {/* 2. Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8 px-4 md:px-0 container mx-auto">
        
        {/* Sidebar */}
        <div className="order-2 lg:order-1 lg:w-1/4">
          <Sidebar />
        </div>

        {/* Intelligence Feed */}
        <div className="order-1 lg:order-2 lg:w-3/4">
            
            {/* LEAD STORY */}
            <div className="mb-10 group cursor-pointer">
                {leadStory ? (
                    <>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white bg-indigo-600">Deep Dive</span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{leadStory.pillar || "Analysis"}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4 group-hover:text-indigo-700 transition-colors">
                            {leadStory.title}
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed mb-4">{leadStory.summary}</p>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                            <span>By HTR Intelligence</span>
                            <span>•</span>
                            <Link href={`/advisory/reports`} className="text-indigo-600 group-hover:underline">Read Full Analysis →</Link>
                        </div>
                    </>
                ) : <div className="p-10 text-slate-400 bg-slate-50 rounded border border-slate-100">Loading Intelligence...</div>}
            </div>

            <hr className="border-slate-200 mb-10" />

            {/* VISUAL INSIGHT */}
            <div className="mb-12 bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8">
                 <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight flex items-center gap-2"><span className="text-2xl">📊</span> Visual Insight</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-slate-500">Data Source: HTR Proprietary Index • Q4 2025</p>
                            <Link href="/htr-index" className="text-xs font-bold text-indigo-600 hover:underline">See Methodology</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-3/5 h-64 bg-white rounded border border-slate-200 shadow-sm flex items-center justify-center relative overflow-hidden group cursor-pointer">
                         <Link href="/htr-index" className="absolute inset-0 z-10" aria-label="View HTR Index"></Link>
                        <div className="flex items-end gap-2 h-32 opacity-80">
                            <div className="w-4 h-12 bg-indigo-200"></div><div className="w-4 h-16 bg-indigo-300"></div><div className="w-4 h-24 bg-indigo-400"></div><div className="w-4 h-32 bg-indigo-600"></div><div className="w-4 h-28 bg-indigo-500"></div>
                        </div>
                        <p className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">FIG 1.2</p>
                    </div>
                    <div className="w-full md:w-2/5 flex flex-col justify-center">
                        <h4 className="font-bold text-slate-900 text-xl mb-2">OpEx vs. Volume</h4>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">Operating expenses have decoupled from patient volume...</p>
                        <Link href="/htr-index" className="text-sm font-bold text-indigo-600 flex items-center gap-1">View Methodology ›</Link>
                    </div>
                </div>
            </div>

            {/* THE WIRE */}
            <div>
                <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-2">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">The Wire <span className="text-slate-400 font-normal normal-case ml-2 text-base">Real-time Intelligence</span></h2>
                    <Link href="/advisory/reports" className="text-xs font-bold text-slate-500 hover:text-indigo-600">View All</Link>
                </div>
                <div className="space-y-4">
                    {feed?.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors p-2 rounded -mx-2 group">
                             <div className="flex items-center gap-3 w-40 flex-shrink-0">
                                <span className={`text-[10px] font-black px-2 py-1 rounded w-16 text-center border ${getCategoryStyle(item._type, item.pillar)}`}>{getCategoryLabel(item._type, item.pillar)}</span>
                            </div>
                            <div className="flex-grow">
                                <Link href={item._type === 'webinar' ? `/education/webinars/${item.slug}` : item._type === 'course' ? `/education/courses/${item.slug}` : `/advisory/reports`} className="text-base font-bold text-slate-800 leading-snug hover:text-indigo-600">{item.title}</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-8 py-3 border border-slate-200 text-slate-500 font-bold text-sm rounded hover:bg-slate-50 hover:text-slate-900 transition-colors">Load More Intelligence</button>
            </div>

        </div>
      </div>
    </div>
  );
}