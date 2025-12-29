// components/VideoBlock.tsx
"use client";
import React, { useState, useRef } from "react";

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

interface VideoBlockProps {
  value: any;
  compact?: boolean;
}

const VideoBlock = ({ value, compact }: VideoBlockProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Determine Source
  const uploadedUrl = value.videoFile?.asset?.url;
  const youtubeUrl = value.url;
  const youtubeId = youtubeUrl ? getYouTubeId(youtubeUrl) : null;
  
  const title = value.title || "Video";

  // If no source, return empty or null
  if (!uploadedUrl && !youtubeId) {
    if (compact) return <div className="aspect-video bg-gray-100 rounded-md"></div>;
    return null;
  }

  // Handle click to play
  const handlePlay = () => {
    setIsPlaying(true);
  };

  // =========================================
  // COMPACT MODE (Sidebar Thumbnail)
  // =========================================
  if (compact) {
    return (
      <div 
        className="relative aspect-video bg-black rounded-md overflow-hidden shadow-sm cursor-pointer group hover:shadow-md transition-all border border-gray-800"
        onClick={handlePlay}
        title={`Play: ${title}`}
      >
        {!isPlaying ? (
          <>
            {/* THUMBNAIL LOGIC */}
            {youtubeId ? (
               /* Case A: YouTube Thumbnail (High Quality) */
               <img 
                 src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                 alt={title}
                 className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
               />
            ) : (
               /* Case B: Uploaded File Thumbnail (Seek to 0.5s to avoid black start frame) */
               <video 
                 src={`${uploadedUrl}#t=0.5`} 
                 className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                 preload="metadata" 
                 muted 
                 playsInline
               />
            )}

            {/* OVERLAY: Subtle gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

            {/* PLAY BUTTON: Small, Bottom-Right */}
            <div className="absolute bottom-1.5 right-1.5 z-10">
              <div className="w-7 h-5 bg-red-600 rounded flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 group-hover:bg-red-700">
                  <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
              </div>
            </div>
          </>
        ) : (
          /* ACTIVE PLAYER */
          youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video 
              src={uploadedUrl} 
              className="w-full h-full object-contain bg-black" 
              controls 
              autoPlay 
            />
          )
        )}
      </div>
    );
  }

  // =========================================
  // STANDARD MODE (Full Article)
  // =========================================
  return (
    <div ref={containerRef} className="my-8 rounded-xl overflow-hidden bg-black shadow-lg ring-1 ring-gray-900/5">
       <div className="relative w-full aspect-video">
         {uploadedUrl ? (
           <video 
              src={uploadedUrl} 
              className="w-full h-full" 
              controls
              preload="metadata"
           />
         ) : youtubeId ? (
           <iframe
             src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
             className="absolute top-0 left-0 w-full h-full border-0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowFullScreen
           />
         ) : (
           <div className="flex items-center justify-center w-full h-full text-white">
             Source not found
           </div>
         )}
       </div>
       {value.caption && (
        <p className="p-3 text-sm text-gray-400 bg-gray-900 italic text-center border-t border-gray-800">
          {value.caption}
        </p>
       )}
    </div>
  );
};

export default VideoBlock;