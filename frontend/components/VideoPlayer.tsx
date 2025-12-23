// components/VideoPlayer.tsx
"use client";

import React, { useState, useEffect } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

const VideoPlayer = ({ value }: any) => {
  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- HELPER: Extract ID ---
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  // --- SCENARIO 1: LOCAL FILE ---
  if (value.videoFile?.asset?.url) {
    return (
      <figure className="my-12">
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
          <video controls className="w-full h-full">
            <source src={value.videoFile.asset.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {value.caption && (
          <figcaption className="text-center text-sm text-text-body mt-3 italic font-bold">
            ▶ {value.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  // --- SCENARIO 2: YOUTUBE ---
  if (value.url && isMounted) {
    const videoId = getYouTubeId(value.url);

    // FAIL STATE: If ID is missing OR YouTube threw an error
    if (!videoId || hasError) {
      return (
        <figure className="my-12">
          {/* CLEAN FALLBACK UI */}
          <div className="w-full aspect-video bg-surface-muted border-2 border-ui-border rounded-xl flex flex-col items-center justify-center text-center p-8">
            <span className="text-4xl mb-4">📺</span>
            <h3 className="text-xl font-bold text-text-heading mb-2">
              Watch on YouTube
            </h3>
            <p className="text-text-body mb-6 text-sm max-w-md">
              The owner has disabled playback on other websites.
            </p>
            <a
              href={value.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md flex items-center gap-2"
            >
              Open Video &rarr;
            </a>
          </div>
        </figure>
      );
    }

    // SUCCESS STATE: The Smart Player
    return (
      <figure className="my-12">
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
          <YouTube
            videoId={videoId}
            className="absolute top-0 left-0 w-full h-full" // Force fit
            opts={{
              height: "100%",
              width: "100%",
              playerVars: {
                autoplay: 0,
                modestbranding: 1,
                rel: 0,
              },
            }}
            onReady={(e: YouTubeEvent) => {
              // Ensure it fits container
              e.target.getIframe().style.width = "100%";
              e.target.getIframe().style.height = "100%";
            }}
            onError={() => {
              // CRITICAL: This flips the switch to hide the player and show the fallback UI
              setHasError(true);
            }}
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-sm text-text-body mt-3 italic font-bold">
            ▶ {value.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
};

export default VideoPlayer;
