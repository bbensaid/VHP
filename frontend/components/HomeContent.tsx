"use client";

import { useState } from "react";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import BookmarkButton from "@/components/BookmarkButton";

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

// ─── FILTER CHIP CONFIG ──────────────────────────────────────────────────────

const PILLAR_FILTERS = [
  { id: "all", label: "All" },
  { id: "policy", label: "Policy", color: "bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-200" },
  { id: "economics", label: "Economics", color: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200" },
  { id: "technology", label: "Technology", color: "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200" },
  { id: "clinical", label: "Clinical", color: "bg-red-100 text-red-700 border-red-200 hover:bg-red-200" },
  { id: "equity", label: "Equity", color: "bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200" },
  { id: "operations", label: "Operations", color: "bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200" },
];

const TYPE_FILTERS = [
  { id: "all", label: "All Formats" },
  { id: "report", label: "Reports" },
  { id: "course", label: "Courses" },
  { id: "webinar", label: "Webinars" },
];

// ─── BADGE STYLES ────────────────────────────────────────────────────────────

const getBadgeStyle = (type: string, pillar: string) => {
  if (type === "webinar") return "text-rose-700 bg-rose-50 border-rose-200";
  if (type === "course") return "text-emerald-700 bg-emerald-50 border-emerald-200";
  switch (pillar?.toLowerCase()) {
    case "policy": return "text-sky-700 bg-sky-50 border-sky-200";
    case "economics": return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "technology": return "text-indigo-700 bg-indigo-50 border-indigo-200";
    case "clinical": return "text-red-700 bg-red-50 border-red-200";
    case "equity": return "text-violet-700 bg-violet-50 border-violet-200";
    case "operations": return "text-teal-700 bg-teal-50 border-teal-200";
    default: return "text-slate-700 bg-slate-50 border-slate-200";
  }
};

const getBadgeLabel = (type: string, pillar: string) => {
  if (type === "webinar") return "EVENT";
  if (type === "course") return "COURSE";
  return pillar ? pillar.toUpperCase() : "NEWS";
};

const getItemHref = (item: FeedItem) => {
  if (item._type === "webinar") return `/academy/webinars/${item.slug}`;
  if (item._type === "course") return `/academy/courses/${item.slug}`;
  return `/advisory/reports`;
};

// ─── PLATFORM CAPABILITIES ───────────────────────────────────────────────────

const CAPABILITIES = [
  {
    href: "/research-lab",
    emoji: "🧪",
    title: "Research Lab",
    desc: "19 interactive analytical tools — payment models, policy quality, population equity, and more.",
    accent: "border-amber-200 hover:border-amber-400 hover:bg-amber-50",
    tag: "19 tools",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    href: "/htr-simulator",
    emoji: "⚙️",
    title: "HTR Simulator",
    desc: "Score your health transformation strategy across all 6 pillars with our scenario modeler.",
    accent: "border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50",
    tag: "Interactive",
    tagColor: "bg-indigo-100 text-indigo-700",
  },
  {
    href: "/dashboard",
    emoji: "🗺️",
    title: "50-State Dashboard",
    desc: "Hospital-level performance data for the Rural Health Transformation Program across all states.",
    accent: "border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50",
    tag: "50 states",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    href: "/vermont-act-167",
    emoji: "📋",
    title: "Vermont Act 167",
    desc: "Deep analysis of Vermont's landmark hospital transformation legislation and the Oliver Wyman Report.",
    accent: "border-rose-200 hover:border-rose-400 hover:bg-rose-50",
    tag: "State Program",
    tagColor: "bg-rose-100 text-rose-700",
  },
  {
    href: "/california-calaim",
    emoji: "🌎",
    title: "California CalAIM",
    desc: "Inside the $6.7B Medi-Cal transformation — whole-person care, housing, and equity initiatives.",
    accent: "border-rose-200 hover:border-rose-400 hover:bg-rose-50",
    tag: "State Program",
    tagColor: "bg-rose-100 text-rose-700",
  },
  {
    href: "/advisory-hub",
    emoji: "💼",
    title: "Advisory Services",
    desc: "Strategic consulting, custom research, financial audit, regulatory counsel, and executive training.",
    accent: "border-slate-200 hover:border-slate-400 hover:bg-slate-50",
    tag: "Premium",
    tagColor: "bg-slate-100 text-slate-600",
  },
];

// ─── TRENDING BY PILLAR ───────────────────────────────────────────────────────

const TRENDING_PILLARS = [
  {
    id: "policy",
    label: "Policy",
    href: "/policy",
    dot: "bg-sky-500",
    ring: "ring-sky-200",
    bg: "bg-sky-50 hover:bg-sky-100",
    text: "text-sky-700",
    topic: "CMS Final Rule on Prior Authorization",
    sub: "Regulation & Legislation",
  },
  {
    id: "economics",
    label: "Economics",
    href: "/economics",
    dot: "bg-emerald-500",
    ring: "ring-emerald-200",
    bg: "bg-emerald-50 hover:bg-emerald-100",
    text: "text-emerald-700",
    topic: "Medicare Advantage Margin Compression",
    sub: "Market & Finance",
  },
  {
    id: "technology",
    label: "Technology",
    href: "/technology",
    dot: "bg-indigo-500",
    ring: "ring-indigo-200",
    bg: "bg-indigo-50 hover:bg-indigo-100",
    text: "text-indigo-700",
    topic: "Generative AI in Clinical Documentation",
    sub: "AI & Machine Learning",
  },
  {
    id: "clinical",
    label: "Clinical",
    href: "/clinical",
    dot: "bg-red-500",
    ring: "ring-red-200",
    bg: "bg-red-50 hover:bg-red-100",
    text: "text-red-700",
    topic: "Hospital-at-Home CMS Waiver Expansion",
    sub: "Hospital-at-Home",
  },
  {
    id: "equity",
    label: "Equity",
    href: "/equity",
    dot: "bg-amber-500",
    ring: "ring-amber-200",
    bg: "bg-amber-50 hover:bg-amber-100",
    text: "text-amber-700",
    topic: "SDOH Screening in Value-Based Contracts",
    sub: "SDOH Integration",
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function HomeContent({ leadStory, feed }: HomeContentProps) {
  const [pillarFilter, setPillarFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredFeed = feed?.filter((item) => {
    const pillarMatch =
      pillarFilter === "all" ||
      item.pillar?.toLowerCase() === pillarFilter;
    const typeMatch =
      typeFilter === "all" || item._type === typeFilter;
    return pillarMatch && typeMatch;
  });

  return (
    <>
      {/* HERO CAROUSEL */}
      <HeroCarousel leadStory={leadStory} />

      {/* QUICK START — 4 intent-based action cards */}
      <section className="mb-10">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
          What would you like to do?
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              href: "/policy",
              emoji: "🔍",
              label: "Explore Intelligence",
              desc: "Browse the 6-pillar knowledge base",
              bg: "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300",
            },
            {
              href: "/academy",
              emoji: "🎓",
              label: "Start Learning",
              desc: "Courses, tracks & personalized paths",
              bg: "bg-sky-50 hover:bg-sky-100 border-sky-200 hover:border-sky-300",
            },
            {
              href: "/research-lab",
              emoji: "🧪",
              label: "Analyze Data",
              desc: "Research Lab, Simulator & Dashboards",
              bg: "bg-amber-50 hover:bg-amber-100 border-amber-200 hover:border-amber-300",
            },
            {
              href: "/advisory",
              emoji: "💼",
              label: "Talk to an Advisor",
              desc: "Strategic consulting & custom research",
              bg: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200 hover:border-indigo-300",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group flex flex-col gap-1.5 p-4 rounded-xl border-2 transition-all duration-150 ${card.bg}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">{card.emoji}</span>
                <span className="text-base font-black text-slate-800 group-hover:text-slate-900 leading-tight">
                  {card.label}
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-snug">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* THE WIRE */}
      <section className="mb-12">
        {/* Header + filters */}
        <div className="mb-4 border-b border-slate-200 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
              The Wire{" "}
              <span className="text-slate-400 font-normal normal-case ml-2 text-base">
                Real-time Intelligence
              </span>
            </h2>
            <Link
              href="/advisory/reports"
              className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              View All →
            </Link>
          </div>

          {/* Pillar filter chips */}
          <div className="flex flex-wrap gap-2">
            {PILLAR_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setPillarFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  pillarFilter === f.id
                    ? f.id === "all"
                      ? "bg-slate-800 text-white border-slate-800"
                      : f.color?.replace("hover:", "") ?? "bg-slate-800 text-white border-slate-800"
                    : f.id === "all"
                    ? "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                    : f.color ?? "bg-white text-slate-500 border-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
            <div className="w-px bg-slate-200 mx-1 self-stretch" />
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setTypeFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  typeFilter === f.id
                    ? "bg-slate-800 text-white border-slate-800"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feed items */}
        <div className="space-y-0">
          {filteredFeed && filteredFeed.length > 0 ? (
            filteredFeed.map((item, i) => (
              <div
                key={item._id ?? i}
                className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors px-2 rounded -mx-2 group"
              >
                <div className="flex items-center gap-3 w-32 shrink-0">
                  <span
                    className={`text-[10px] font-black px-2 py-1 rounded w-full text-center border ${getBadgeStyle(item._type, item.pillar ?? "")}`}
                  >
                    {getBadgeLabel(item._type, item.pillar ?? "")}
                  </span>
                </div>
                <div className="grow">
                  <Link
                    href={getItemHref(item)}
                    className="text-base font-bold text-slate-800 leading-snug hover:text-indigo-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                </div>
                <BookmarkButton
                  sanityId={item._id}
                  slug={item.slug ?? ""}
                  title={item.title}
                  pillar={item.pillar}
                  contentType={item._type}
                  className="shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
                />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm">
              No items match the selected filters.
              <button
                onClick={() => { setPillarFilter("all"); setTypeFilter("all"); }}
                className="ml-2 text-indigo-500 hover:underline font-bold"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        <button className="w-full mt-6 py-3 border border-slate-200 text-slate-500 font-bold text-sm rounded hover:bg-slate-50 hover:text-slate-900 transition-colors">
          Load More Intelligence
        </button>
      </section>

      {/* PLATFORM CAPABILITIES */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5 border-b border-slate-200 pb-2">
          <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
            What&apos;s on the Platform{" "}
            <span className="text-slate-400 font-normal normal-case ml-2 text-base">
              Tools, data &amp; programs
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap) => (
            <Link
              key={cap.href}
              href={cap.href}
              className={`group flex flex-col gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${cap.accent}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{cap.emoji}</span>
                  <h3 className="text-sm font-black text-slate-800 group-hover:text-slate-900 leading-tight">
                    {cap.title}
                  </h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${cap.tagColor}`}>
                  {cap.tag}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {cap.desc}
              </p>
              <div className="text-xs font-bold text-indigo-600 group-hover:text-indigo-800 mt-auto">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING BY PILLAR */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5 border-b border-slate-200 pb-2">
          <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
            Trending by Pillar{" "}
            <span className="text-slate-400 font-normal normal-case ml-2 text-base">
              Today&apos;s top signal per domain
            </span>
          </h2>
          <Link
            href="/trending-topics"
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            All Trends →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {TRENDING_PILLARS.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className={`group flex flex-col gap-2 p-3 rounded-xl ring-1 transition-all duration-150 ${p.bg} ${p.ring}`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${p.dot} shrink-0`} />
                <span className={`text-[10px] font-black uppercase tracking-wider ${p.text}`}>
                  {p.label}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-700 leading-snug group-hover:text-slate-900 line-clamp-2">
                {p.topic}
              </p>
              <p className="text-[10px] text-slate-400 mt-auto">
                {p.sub}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
