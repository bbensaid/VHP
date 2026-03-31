"use client";

import React, { useState } from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { getMoreArticles } from "@/app/actions";
import VideoBlock from "@/components/VideoBlock";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  ChevronDownIcon,
  ArrowsUpDownIcon,
  ShareIcon,
  CheckIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const builder = imageUrlBuilder(client);
function urlFor(source: { asset: { _ref: string } } | null | undefined) {
  return builder.image(source as Parameters<typeof builder.image>[0]);
}

interface Article {
  _id: string;
  title: string;
  summary: string;
  publishedAt: string;
  slug: { current: string };
  status?: string;
  impactLevel?: string;
  mainImage?: { asset: { _ref: string }; alt?: string } | null;
  readTime?: number;
}

interface RelatedVideo {
  _id: string;
  title: string;
  url: string;
}

interface ArticleFeedProps {
  initialArticles: Article[];
  pillar: string;
  category?: string;
  colorClass: string;
  /** Optional: when present, renders a sticky Related Media sidebar alongside the feed */
  relatedMedia?: RelatedVideo[];
}

const ITEMS_PER_PAGE = 6;

export default function ArticleFeed({
  initialArticles,
  pillar,
  category,
  colorClass,
  relatedMedia,
}: ArticleFeedProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [offset, setOffset] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(
    initialArticles.length < ITEMS_PER_PAGE
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [impactLevel, setImpactLevel] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const bgClass = colorClass.replace("text-", "bg-");
  const hasRelatedMedia = relatedMedia && relatedMedia.length > 0;

  const getImpactColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "low":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const performSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newArticles = await getMoreArticles(
        pillar,
        category,
        0,
        ITEMS_PER_PAGE,
        searchQuery,
        impactLevel,
        sortOrder
      );
      setArticles(newArticles);
      setOffset(ITEMS_PER_PAGE);
      setAllLoaded(newArticles.length < ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImpactChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLevel = e.target.value;
    setImpactLevel(newLevel);
    setLoading(true);
    try {
      const newArticles = await getMoreArticles(
        pillar,
        category,
        0,
        ITEMS_PER_PAGE,
        searchQuery,
        newLevel,
        sortOrder
      );
      setArticles(newArticles);
      setOffset(ITEMS_PER_PAGE);
      setAllLoaded(newArticles.length < ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Filter failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortOrder(newSort);
    setLoading(true);
    try {
      const newArticles = await getMoreArticles(
        pillar,
        category,
        0,
        ITEMS_PER_PAGE,
        searchQuery,
        impactLevel,
        newSort
      );
      setArticles(newArticles);
      setOffset(ITEMS_PER_PAGE);
      setAllLoaded(newArticles.length < ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Filter failed", error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setImpactLevel("");
    setSortOrder("desc");
    setArticles(initialArticles);
    setOffset(ITEMS_PER_PAGE);
    setAllLoaded(initialArticles.length < ITEMS_PER_PAGE);
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const newArticles = await getMoreArticles(
        pillar,
        category,
        offset,
        ITEMS_PER_PAGE,
        searchQuery,
        impactLevel,
        sortOrder
      );
      if (newArticles.length === 0) {
        setAllLoaded(true);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
        setOffset((prev) => prev + ITEMS_PER_PAGE);
        if (newArticles.length < ITEMS_PER_PAGE) {
          setAllLoaded(true);
        }
      }
    } catch (error) {
      console.error("Failed to load articles", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (e: React.MouseEvent, slug: string, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const path =
      pillar.toLowerCase() === "economics"
        ? `/economics/${slug}`
        : `/${pillar.toLowerCase()}/analysis/${slug}`;

    navigator.clipboard.writeText(`${origin}${path}`).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // ── Controls toolbar (shared between both layout modes) ────────────────────
  const toolbar = (
    <div className="mb-8 flex flex-col sm:flex-row justify-end gap-4">
      {/* Impact Filter */}
      <div className="relative">
        <FunnelIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          value={impactLevel}
          onChange={handleImpactChange}
          className="appearance-none w-full sm:w-48 pl-10 pr-8 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
        >
          <option value="">All Impact Levels</option>
          <option value="High">High Impact</option>
          <option value="Medium">Medium Impact</option>
          <option value="Low">Low Impact</option>
        </select>
        <ChevronDownIcon className="w-3 h-3 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Sort */}
      <div className="relative">
        <ArrowsUpDownIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="appearance-none w-full sm:w-40 pl-10 pr-8 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
        <ChevronDownIcon className="w-3 h-3 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* View mode toggle */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700 items-center h-[38px]">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-1.5 rounded-full transition-all ${
            viewMode === "grid"
              ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
          title="Grid View"
        >
          <Squares2X2Icon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-1.5 rounded-full transition-all ${
            viewMode === "list"
              ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          }`}
          title="List View"
        >
          <ListBulletIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <form onSubmit={performSearch} className="relative w-full max-w-xs">
        <input
          type="text"
          placeholder="Search titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
        <MagnifyingGlassIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        {(searchQuery || impactLevel || sortOrder !== "desc") && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );

  // ── Article cards list ─────────────────────────────────────────────────────
  const articleCards = (
    <>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-8"
            : "flex flex-col gap-6"
        }
      >
        {articles.length === 0 && (
          <div className="col-span-full p-10 text-center bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
            <p className="text-slate-700 dark:text-slate-200 font-medium mb-2">
              No analysis found for this category yet.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Content is populated from the &ldquo;{pillar}&rdquo; pillar in
              Sanity.
            </p>
          </div>
        )}

        {articles.map((article, index) => {
          const href = `/${pillar.toLowerCase()}/${article.slug.current}`;
          const isList = viewMode === "list";
          const isFeatured =
            index === 0 && article.impactLevel?.toLowerCase() === "high";

          return (
            <Link
              href={href}
              key={article._id}
              className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden ${
                isList
                  ? "flex flex-col md:flex-row"
                  : "flex flex-col h-full p-8"
              } ${isFeatured ? "ring-1 ring-indigo-500 shadow-md" : ""}`}
            >
              {/* Colored hover bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${bgClass} opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              {isList && article.mainImage && (
                <div className="w-full md:w-1/3 relative min-h-[200px] md:min-h-full">
                  <img
                    src={urlFor(article.mainImage).width(600).height(400).url()}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}

              <div className={`flex-grow ${isList ? "p-8 flex flex-col" : ""}`}>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {isFeatured && (
                    <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-sm">
                      Featured
                    </span>
                  )}
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  {article.status && (
                    <span className="px-2 py-1 bg-slate-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      {article.status}
                    </span>
                  )}
                  {article.impactLevel && (
                    <span
                      className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider border ${getImpactColor(
                        article.impactLevel
                      )}`}
                    >
                      {article.impactLevel} Impact
                    </span>
                  )}
                  {article.readTime !== undefined && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-auto md:ml-0">
                      <ClockIcon className="w-3 h-3" />
                      {Math.max(1, article.readTime)} min
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-snug group-hover:text-indigo-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                  {article.summary}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span
                  className={`text-sm font-bold ${colorClass} group-hover:underline flex items-center gap-1`}
                >
                  Read Analysis →
                </span>
                <button
                  onClick={(e) =>
                    handleShare(e, article.slug.current, article._id)
                  }
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-all relative z-10"
                  title="Copy Link to Clipboard"
                >
                  {copiedId === article._id ? (
                    <CheckIcon className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ShareIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Link>
          );
        })}
      </div>

      {!allLoaded && articles.length > 0 && (
        <div className="mt-12 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
              loading
                ? "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow"
            }`}
          >
            {loading ? "Loading..." : "Load More Analysis"}
          </button>
        </div>
      )}
    </>
  );

  // ── Related Media sidebar ──────────────────────────────────────────────────
  const relatedMediaSidebar = hasRelatedMedia ? (
    <aside
      className="lg:col-span-4 sticky space-y-8"
      style={{ top: "calc(var(--sidebar-top, var(--sticky-bar-height, 2.5rem)) + 1rem)" }}
      aria-label="Related media"
    >
      <div className="bg-slate-50 dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-700 pb-3 uppercase tracking-widest flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Related Media
        </h3>
        <div className="space-y-6">
          {relatedMedia!.map((video) => (
            <div
              key={video._id}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700"
            >
              <VideoBlock
                value={{ url: video.url, caption: video.title }}
                compact={true}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  ) : null;

  // ── Render ────────────────────────────────────────────────────────────────
  // Two-column layout when related media is provided, otherwise full-width.
  if (hasRelatedMedia) {
    return (
      <>
        {toolbar}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">{articleCards}</div>
          {relatedMediaSidebar}
        </div>
      </>
    );
  }

  return (
    <>
      {toolbar}
      {articleCards}
    </>
  );
}