"use client";

import { useState, useEffect } from "react";
import { PlayCircle } from "lucide-react";
import type { VideoBlock } from "@/types/course";

export function VideoBlockRenderer({ block }: { block: VideoBlock }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const durationLabel = block.durationSeconds
    ? `${Math.floor(block.durationSeconds / 60)} min`
    : null;

  const isUpload = block.mediaType === "upload" || block.mediaType === "external";
  const embedUrl =
    block.mediaType === "youtube" && block.videoId
      ? `https://www.youtube.com/embed/${block.videoId}?modestbranding=1&rel=0`
      : block.mediaType === "vimeo" && block.videoId
      ? `https://player.vimeo.com/video/${block.videoId}`
      : null;

  const videoUrl = block.url ?? null;

  if (!embedUrl && !videoUrl) return null;

  return (
    <div className="space-y-2 max-w-2xl">
      <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video shadow-lg border border-slate-200">
        {/* Self-hosted / direct URL — use native <video> */}
        {isUpload && videoUrl ? (
          <video
            controls
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
            title={block.caption}
          >
            <source src={videoUrl} />
          </video>
        ) : (
          /* YouTube / Vimeo embed */
          isMounted && embedUrl && (
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={block.caption}
            />
          )
        )}
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <PlayCircle className="w-4 h-4 text-red-500 shrink-0" />
        <span>{block.caption}</span>
        {durationLabel && <span className="ml-auto shrink-0">{durationLabel}</span>}
      </div>
    </div>
  );
}
