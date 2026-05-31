// frontend/components/VideoBlock.tsx
"use client";

import React, { useState, useEffect } from "react";
import { PlayIcon, FilmIcon } from "@heroicons/react/24/solid";

interface VideoBlockProps {
  value: {
    url?: string;
    caption?: string;
    title?: string;
  };
  compact?: boolean;
}

export default function VideoBlock({ value, compact }: VideoBlockProps) {
  const { url, caption, title } = value;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!url) return null;

  // 1. YouTube Identification (Restored from your EXACT original source code)
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYouTubeId(url);

  // --- COMPACT MODE (Sidebar) ---
  if (compact) {
    return (
      <div className="group w-full bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer">
        {/* Thumbnail / Preview Area */}
        <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
          {youtubeId ? (
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
              alt="Video Thumbnail"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
              <FilmIcon className="w-8 h-8 text-slate-600" />
            </div>
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <PlayIcon className="w-4 h-4 text-indigo-600 ml-0.5" />
            </div>
          </div>

          {/* Link Overlay */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label="Play Video"
          ></a>
        </div>

        {/* Caption / Title Area */}
        <div className="p-2 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
              Video
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-700 leading-tight line-clamp-2">
            {caption || title || "Watch Video Briefing"}
          </p>
        </div>
      </div>
    );
  }

  // 2. Render YouTube
  if (youtubeId) {
    return (
      <figure className="my-8 max-w-3xl mx-auto">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-slate-200">
          {isMounted && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?modestbranding=1&rel=0`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title || caption || "Video"}
            />
          )}
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-slate-500 italic font-medium">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // 3. Render Direct MP4/WebM
  const isDirectVideo = url.toLowerCase().endsWith(".mp4") || url.toLowerCase().endsWith(".webm");
  if (isDirectVideo) {
    return (
      <figure className="my-8 max-w-3xl mx-auto">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-slate-200">
          <video
            controls
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-slate-500 italic font-medium">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // 4. Fallback for External Links
  return (
    <div className="my-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center hover:bg-slate-100 transition-colors">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold text-slate-700 hover:text-indigo-600 flex items-center justify-center gap-2"
      >
        <FilmIcon className="w-5 h-5" />
        <span>Watch Video Resource</span>
      </a>
    </div>
  );
}