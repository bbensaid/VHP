"use client";
import React, { useRef } from "react";

// 1. Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// 2. The Video Component (Handles BOTH Uploads and YouTube)
const VideoBlock = ({ value, compact }: { value: any; compact?: boolean }) => {
  const { url, caption, videoFile } = value;
  const containerRef = useRef<HTMLDivElement>(null);

  // A. Check for Uploaded File (Sanity File)
  const uploadedUrl = videoFile?.asset?.url;

  // B. Check for YouTube ID
  const youtubeId = url ? getYouTubeId(url) : null;

  return (
    <div ref={containerRef} className={compact ? "" : "my-8"}>
      <div
        className={`relative w-full overflow-hidden ${compact ? "rounded-md" : "rounded-xl shadow-lg"} bg-gray-900`}
        style={{ paddingTop: "56.25%" }}
      >
        {/* Priority 1: Uploaded Video File */}
        {uploadedUrl ? (
          <video
            src={uploadedUrl}
            controls
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : youtubeId ? (
          /* Priority 2: YouTube Embed */
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
            title={caption || "Video player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        ) : (
          /* Fallback: No Source */
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white bg-gray-800">
            <p className="text-sm">No Video Source Found</p>
          </div>
        )}
      </div>
      {!compact && caption && (
        <p className="mt-2 text-sm text-center text-gray-500 italic">
          {caption}
        </p>
      )}
    </div>
  );
};

export default VideoBlock;