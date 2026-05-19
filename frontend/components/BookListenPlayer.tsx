"use client";

import { useRef, useState, useEffect } from "react";
import { PlayIcon, PauseIcon, ArrowDownTrayIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import type { NarrationTrack } from "@/app/book/listen/page";

interface Props {
  tracks: NarrationTrack[];
}

export default function BookListenPlayer({ tracks }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeId, setActiveId] = useState<string>(tracks[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioMissing, setAudioMissing] = useState(false);

  const active = tracks.find((t) => t.id === activeId) ?? tracks[0];

  // Auto-advance to the next track on end.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setProgress(audio.currentTime);
    const onLoaded = () => { setDuration(audio.duration); setAudioMissing(false); };
    const onEnded = () => {
      const idx = tracks.findIndex((t) => t.id === activeId);
      const next = tracks[idx + 1];
      if (next) {
        setActiveId(next.id);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };
    const onError = () => { setAudioMissing(true); setIsPlaying(false); };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [activeId, tracks]);

  // When activeId changes, load the new src and play if we were already playing.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !active) return;
    audio.src = active.audioSrc;
    audio.load();
    setProgress(0);
    if (isPlaying) {
      audio.play().catch(() => { setIsPlaying(false); });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !active) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => { setIsPlaying(false); setAudioMissing(true); });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function seek(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setProgress(seconds);
  }

  function fmt(s: number): string {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  }

  if (!active) return null;

  const numLabel = /^\d+$/.test(active.num) ? `Chapter ${active.num}` : active.num;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Track list */}
      <aside className="md:col-span-1">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
          Tracks
        </h2>
        <ul className="space-y-1">
          {tracks.map((t) => {
            const isActive = t.id === activeId;
            const nLabel = /^\d+$/.test(t.num) ? `Ch ${t.num}` : t.num;
            return (
              <li key={t.id}>
                <button
                  onClick={() => setActiveId(t.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors group ${
                    isActive
                      ? "bg-indigo-100 border border-indigo-200"
                      : "hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest shrink-0 w-12 ${
                      isActive ? "text-indigo-600" : "text-slate-400"
                    }`}>
                      {nLabel}
                    </span>
                    <span className={`text-xs font-semibold leading-snug truncate flex-1 ${
                      isActive ? "text-indigo-900" : "text-slate-700"
                    }`}>
                      {t.title}
                    </span>
                    {isActive && <ChevronRightIcon className="w-3 h-3 text-indigo-500 shrink-0" />}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Player + active track detail */}
      <section className="md:col-span-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">
            {numLabel}
          </p>
          <h2 className="text-lg md:text-xl font-black text-slate-900 leading-snug mb-2">
            {active.title}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            {active.desc}
          </p>

          {/* Player */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <audio ref={audioRef} preload="metadata" />
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                disabled={audioMissing}
                className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white flex items-center justify-center shadow"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
              </button>
              <div className="flex-1 min-w-0">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={progress}
                  onChange={(e) => seek(Number(e.target.value))}
                  disabled={!duration}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>{fmt(progress)}</span>
                  <span>{fmt(duration)}</span>
                </div>
              </div>
            </div>

            {audioMissing && (
              <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mt-3 leading-snug">
                Audio file not yet generated for this track. Run <code className="font-mono text-[10px]">scripts/generate-narration-audio.sh</code> on a Mac to produce the audio. The transcript is available below.
              </p>
            )}
          </div>

          {/* Links to transcript and download */}
          <div className="flex flex-wrap gap-2 mt-4">
            <a
              href={active.textSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <DocumentTextIcon className="w-3.5 h-3.5" />
              Transcript
            </a>
            <a
              href={active.audioSrc}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <ArrowDownTrayIcon className="w-3.5 h-3.5" />
              Download audio
            </a>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
          Audio narration generated via macOS text-to-speech as a starting point. For production-quality narration, regenerate using ElevenLabs, OpenAI TTS, or a comparable engine against the same transcript files.
        </p>
      </section>
    </div>
  );
}
