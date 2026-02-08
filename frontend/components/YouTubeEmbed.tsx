"use client";

import { useState } from "react";

interface YouTubeEmbedProps {
  videoId: string;
}

export default function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  const [showVideo, setShowVideo] = useState(false);

  // 1. ACTIVE STATE: The actual YouTube Iframe
  if (showVideo) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title="YouTube video player"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  // 2. IDLE STATE: Thumbnail + Custom Square Play Button
  return (
    <button
      type="button"
      onClick={() => setShowVideo(true)}
      className="group relative block w-full h-full cursor-pointer bg-slate-900 overflow-hidden"
      aria-label="Play Video"
    >
      {/* High-Res Thumbnail */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt="Video thumbnail"
        className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
        loading="lazy"
      />

      {/* The "Square" Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
          {/* Simple SVG Triangle Icon */}
          <svg 
            className="w-6 h-6 text-slate-900 ml-1" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}