"use client";

import { useState, useRef, useEffect } from "react";

interface AudioBlockProps {
  value: {
    url?: string;
    title?: string;
    caption?: string;
    summary?: string;
  };
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2];

function formatTime(s: number) {
  if (!isFinite(s) || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function getEmbedUrl(url: string) {
  if (url.includes("spotify.com") && !url.includes("/embed"))
    return url.replace("open.spotify.com", "open.spotify.com/embed");
  if (url.includes("soundcloud.com") && !url.includes("w.soundcloud.com"))
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%234f46e5&auto_play=false&visual=true`;
  return url;
}

export default function AudioBlock({ value }: AudioBlockProps) {
  const { url, title, caption, summary } = value;

  // ALL hooks must come before any conditional returns
  const audioRef                      = useRef<HTMLAudioElement>(null);
  const [mounted,   setMounted]       = useState(false);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [current,   setCurrent]       = useState(0);
  const [duration,  setDuration]      = useState(0);
  const [speedIdx,  setSpeedIdx]      = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const a = audioRef.current;
    if (!a) return;
    const onLoaded = () => setDuration(a.duration);
    const onTime   = () => setCurrent(a.currentTime);
    const onEnded  = () => setIsPlaying(false);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate",     onTime);
    a.addEventListener("ended",          onEnded);
    // Force load after mount so src is fetched
    a.load();
    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate",     onTime);
      a.removeEventListener("ended",          onEnded);
    };
  }, [mounted]);

  // Now safe to do conditional returns
  if (!url) return null;

  const isSpotify    = url.includes("spotify.com");
  const isSoundCloud = url.includes("soundcloud.com");

  if (isSpotify || isSoundCloud) {
    return (
      <figure className="max-w-2xl mx-auto my-8">
        <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          {title && <div className="px-4 py-3 border-b border-slate-200 bg-white text-sm font-bold text-slate-900">{title}</div>}
          {summary && <div className="px-4 pt-3 pb-2 text-sm text-slate-600 italic border-b border-slate-100">{summary}</div>}
          <div className="p-4">
            <iframe
              src={getEmbedUrl(url)}
              width="100%"
              height={isSpotify ? "152" : "166"}
              style={{ border: "none" }}
              allow="encrypted-media"
              className="rounded-lg"
              loading="lazy"
              title={title || "Audio player"}
            />
          </div>
        </div>
        {caption && <figcaption className="mt-2 text-center text-xs text-slate-500 italic">{caption}</figcaption>}
      </figure>
    );
  }

  // Show skeleton until client mounts
  if (!mounted) {
    return (
      <figure className="max-w-2xl mx-auto my-8">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-pulse">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50">
            <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-2 bg-slate-100 rounded w-3/4" />
            </div>
          </div>
          <div className="h-1.5 bg-slate-100" />
          <div className="h-24 bg-slate-50" />
        </div>
      </figure>
    );
  }

  const percent = duration > 0 ? (current / duration) * 100 : 0;

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      // If not loaded yet, load then play
      if (a.readyState < 2) a.load();
      a.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Audio play failed:", err));
    }
  };

  const skip = (sec: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.min(duration, Math.max(0, a.currentTime + sec));
  };

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const t     = ratio * duration;
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrent(t);
  };

  return (
    <figure className="max-w-2xl mx-auto my-8">
      {/* Hidden audio element — controlled via ref */}
      <audio ref={audioRef} src={url} preload="metadata" />

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 truncate">{title || "Audio"}</p>
            {summary && <p className="text-xs text-slate-500 truncate mt-0.5">{summary}</p>}
          </div>
          <span className="text-xs text-slate-400 font-mono shrink-0">{formatTime(duration)}</span>
        </div>

        {/* Progress bar */}
        <div className="relative h-1.5 bg-slate-100 cursor-pointer group" onClick={seek}>
          <div className="h-full bg-indigo-500 transition-all" style={{ width: `${percent}%` }} />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-600 shadow border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${percent}% - 6px)` }}
          />
        </div>

        {/* Time labels */}
        <div className="flex justify-between px-5 pt-1.5 text-[10px] font-mono text-slate-400">
          <span>{formatTime(current)}</span>
          <span>-{formatTime(duration - current)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-5 pb-5 pt-3">
          <button onClick={() => skip(-15)} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-indigo-600 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6l5 6-5 6V6zm7 0l5 6-5 6V6z" transform="scale(-1,1) translate(-24,0)" />
            </svg>
            <span className="text-[9px] font-bold">-15s</span>
          </button>

          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button onClick={() => skip(30)} className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-indigo-600 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6l5 6-5 6V6zm7 0l5 6-5 6V6z" />
            </svg>
            <span className="text-[9px] font-bold">+30s</span>
          </button>

          <button
            onClick={cycleSpeed}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-black text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors min-w-12 text-center"
          >
            {SPEEDS[speedIdx]}×
          </button>
        </div>
      </div>

      {caption && <figcaption className="mt-2 text-center text-xs text-slate-500 italic">{caption}</figcaption>}
    </figure>
  );
}
