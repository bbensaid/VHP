"use client";

import React, { useState } from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { getMoreArticles } from "@/app/actions";
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon, ChevronDownIcon, ArrowsUpDownIcon, ShareIcon, CheckIcon, Squares2X2Icon, ListBulletIcon, ClockIcon } from "@heroicons/react/24/outline";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface Article {
  _id: string;
  title: string;
  summary: string;
  publishedAt: string;
  slug: { current: string };
  status?: string;
  impactLevel?: string;
  mainImage?: any;
  readTime?: number;
}

interface ArticleFeedProps {
  initialArticles: Article[];
  pillar: string;
  category?: string;
  colorClass: string;
}

const ITEMS_PER_PAGE = 6;

export default function ArticleFeed({ initialArticles, pillar, category, colorClass }: ArticleFeedProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [offset, setOffset] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(initialArticles.length < ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState("");
  const [impactLevel, setImpactLevel] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const bgClass = colorClass.replace("text-", "bg-");

  const getImpactColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high": return "bg-rose-100 text-rose-800 border-rose-200";
      case "medium": return "bg-orange-100 text-orange-800 border-orange-200";
      case "low": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const performSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newArticles = await getMoreArticles(pillar, category, 0, ITEMS_PER_PAGE, searchQuery, impactLevel, sortOrder);
      setArticles(newArticles);
      setOffset(ITEMS_PER_PAGE);
      setAllLoaded(newArticles.length < ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImpactChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLevel = e.target.value;
    setImpactLevel(newLevel);
    setLoading(true);
    try {
      const newArticles = await getMoreArticles(pillar, category, 0, ITEMS_PER_PAGE, searchQuery, newLevel, sortOrder);
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
      const newArticles = await getMoreArticles(pillar, category, 0, ITEMS_PER_PAGE, searchQuery, impactLevel, newSort);
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
      const newArticles = await getMoreArticles(pillar, category, offset, ITEMS_PER_PAGE, searchQuery, impactLevel, sortOrder);
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
    
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const path = pillar.toLowerCase() === "economics" 
      ? `/economics/${slug}` 
      : `/${pillar.toLowerCase()}/analysis/${slug}`;
      
    navigator.clipboard.writeText(`${origin}${path}`).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row justify-end gap-4">
        {/* Impact Filter Dropdown */}
        <div className="relative">
          <FunnelIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={impactLevel}
            onChange={handleImpactChange}
            className="appearance-none w-full sm:w-48 pl-10 pr-8 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white text-slate-600 cursor-pointer"
          >
            <option value="">All Impact Levels</option>
            <option value="High">High Impact</option>
            <option value="Medium">Medium Impact</option>
            <option value="Low">Low Impact</option>
          </select>
          <ChevronDownIcon className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <ArrowsUpDownIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="appearance-none w-full sm:w-40 pl-10 pr-8 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white text-slate-600 cursor-pointer"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
          <ChevronDownIcon className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200 items-center h-[38px]">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            title="Grid View"
          >
            <Squares2X2Icon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            title="List View"
          >
            <ListBulletIcon className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={performSearch} className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
          <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {(searchQuery || impactLevel || sortOrder !== "desc") && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </form>
      </div>

      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "flex flex-col gap-6"}>
        {articles.length === 0 && (
          <div className="col-span-full p-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-600 font-medium mb-2">
              No analysis found for this category yet.
            </p>
            <p className="text-sm text-slate-500">
              Content is populated from the "{pillar}" pillar in Sanity.
            </p>
          </div>
        )}

        {articles.map((article, index) => {
          const href = `/${pillar.toLowerCase()}/${article.slug.current}`;
          
          const isList = viewMode === 'list';
          const isFeatured = index === 0 && article.impactLevel?.toLowerCase() === "high";

          return (
            <Link
              href={href}
              key={article._id}
              className={`group bg-white border border-slate-200 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden ${isList ? 'flex flex-col md:flex-row' : 'flex flex-col h-full p-8'} ${isFeatured ? 'ring-1 ring-indigo-500 shadow-md' : ''}`}
            >
              {/* Colored Hover Bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${bgClass} opacity-0 group-hover:opacity-100 transition-opacity`}
              ></div>

              {isList && article.mainImage && (
                <div className="w-full md:w-1/3 relative min-h-[200px] md:min-h-full">
                  <img 
                    src={urlFor(article.mainImage).width(600).height(400).url()} 
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}

              <div className={`flex-grow ${isList ? 'p-8 flex flex-col' : ''}`}>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {isFeatured && (
                    <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded shadow-sm">
                      Featured
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-widest border border-slate-200 bg-slate-50 px-2 py-1 rounded">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  {article.status && (
                    <span className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded uppercase tracking-wider">
                      {article.status}
                    </span>
                  )}
                  {article.impactLevel && (
                    <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider border ${getImpactColor(article.impactLevel)}`}>
                      {article.impactLevel} Impact
                    </span>
                  )}
                  {article.readTime !== undefined && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-auto md:ml-0">
                      <ClockIcon className="w-3 h-3" />
                      {Math.max(1, article.readTime)} min
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-indigo-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {article.summary}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                <span
                  className={`text-sm font-bold ${colorClass} group-hover:underline flex items-center gap-1`}
                >
                  Read Analysis →
                </span>
                <button
                  onClick={(e) => handleShare(e, article.slug.current, article._id)}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-all relative z-10"
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
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow"
            }`}
          >
            {loading ? "Loading..." : "Load More Analysis"}
          </button>
        </div>
      )}
    </>
  );
}