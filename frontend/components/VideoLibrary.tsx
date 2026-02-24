"use client";

import React, { useState, useMemo } from 'react';
import Link from "next/link";
import VideoBlock from "@/components/VideoBlock";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Helper function to get pillar-specific theme classes
const getPillarTheme = (pillar: string | null) => {
  switch (pillar) {
    case "Economics":
      return { text: "text-brand-green", border: "border-brand-green", bg: "bg-brand-green", hoverBg: "hover:bg-brand-green" };
    case "Policy":
      return { text: "text-brand-orange", border: "border-brand-orange", bg: "bg-brand-orange", hoverBg: "hover:bg-brand-orange" };
    case "Technology":
      return { text: "text-brand-indigo", border: "border-brand-indigo", bg: "bg-brand-indigo", hoverBg: "hover:bg-brand-indigo" };
    default:
      return { text: "text-slate-500", border: "border-slate-500", bg: "bg-slate-500", hoverBg: "hover:bg-slate-500" };
  }
};

const getPillarSlug = (pillar: string | null) => {
  if (!pillar) return 'articles';
  return pillar.toLowerCase();
};

export default function VideoLibrary({ allVideos }: { allVideos: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const videosByPillar = useMemo(() => {
    return allVideos.reduce((acc, video) => {
      const pillarName = video.pillar || 'General';
      if (!acc[pillarName]) {
        acc[pillarName] = [];
      }
      acc[pillarName].push(video);
      return acc;
    }, {} as Record<string, any[]>);
  }, [allVideos]);

  const pillarOrder = useMemo(() => ['Policy', 'Economics', 'Technology', 'General'].filter(p => videosByPillar[p]), [videosByPillar]);

  const categoriesByPillar = useMemo(() => {
    const categories: Record<string, string[]> = {};
    for (const pillar in videosByPillar) {
      const pillarCategories = new Set(videosByPillar[pillar].map(v => v.category).filter(Boolean));
      categories[pillar] = ['All', ...Array.from(pillarCategories)];
    }
    return categories;
  }, [videosByPillar]);
  
  const handleFilterClick = (pillar: string, category: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [pillar]: category === 'All' ? '' : category,
    }));
  };

  const filteredVideosByPillar = useMemo(() => {
    const filtered: Record<string, any[]> = {};
    for(const pillarName of pillarOrder) {
      let pillarVideos = videosByPillar[pillarName] || [];
      const pillarFilter = activeFilters[pillarName];
      const lowerCaseQuery = searchQuery.toLowerCase();

      if (pillarFilter) {
        pillarVideos = pillarVideos.filter(v => v.category === pillarFilter);
      }

      if (searchQuery) {
        pillarVideos = pillarVideos.filter(v => 
          v.articleTitle?.toLowerCase().includes(lowerCaseQuery) || 
          v.caption?.toLowerCase().includes(lowerCaseQuery)
        );
      }
      filtered[pillarName] = pillarVideos;
    }
    return filtered;
  }, [searchQuery, activeFilters, videosByPillar, pillarOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <header className="mb-12 border-b border-slate-200 pb-12">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2 uppercase">
          Video Library
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          An interactive archive of all video briefings. Use the search below or filter by category within each pillar.
        </p>
        <div className="mt-8 relative max-w-lg">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search all video briefings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
      </header>
      
      {allVideos.length > 0 ? (
        <div className="space-y-16">
          {pillarOrder.map((pillarName) => {
            const videos = filteredVideosByPillar[pillarName];
            const categories = categoriesByPillar[pillarName];
            const theme = getPillarTheme(pillarName);
            const activeFilter = activeFilters[pillarName] || 'All';
            
            if(!videosByPillar[pillarName] || videosByPillar[pillarName].length === 0) return null;

            return (
              <section key={pillarName}>
                <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 border-b-2 pb-4 ${theme.border}`}>
                  <h2 className={`text-3xl font-extrabold uppercase tracking-wide ${theme.text}`}>
                    {pillarName}
                  </h2>
                  {categories && categories.length > 1 && (
                     <div className="flex flex-wrap items-center gap-2">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => handleFilterClick(pillarName, cat)}
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                              activeFilter === cat 
                              ? `${theme.bg} text-white shadow-md` 
                              : `bg-white text-slate-600 border border-slate-200 hover:border-slate-400`
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                     </div>
                  )}
                </div>
                
                {videos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {videos.map((video: any) => (
                      <div key={`${video.articleId}-${video._key}`} className="flex flex-col animate-in fade-in duration-300">
                        <VideoBlock value={video} />
                        <div className="mt-4">
                          <Link 
                            href={`/${getPillarSlug(video.pillar)}/${video.articleSlug}`}
                            className="text-base font-bold text-slate-800 hover:text-indigo-700 transition-colors leading-tight"
                          >
                            {video.articleTitle}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-slate-50/80">
                     <h3 className="text-lg font-bold text-slate-600">No videos match your criteria</h3>
                     <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filter.</p>
                  </div>
                )}
              </section>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-slate-200 rounded-xl bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-700">No Videos Found</h2>
          <p className="mt-2 text-slate-500">
            There are currently no videos available in the content library.
          </p>
        </div>
      )}
    </div>
  );
}
