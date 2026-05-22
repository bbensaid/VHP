"use client";

import { useRef, useState, useEffect } from "react";
import { PlayIcon, PauseIcon, ArrowDownTrayIcon, ChevronRightIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import type { NarrationTrack } from "@/app/book/listen/page";

interface Props {
  tracks: NarrationTrack[];
}

const SPEEDS = [0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0, 1.05, 1.1, 1.15] as const;

export default function BookListenPlayer({ tracks }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeId, setActiveId] = useState<string>(tracks[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioMissing, setAudioMissing] = useState(false);
  const [speed, setSpeed] = useState<number>(0.85);
  const [volume, setVolume] = useState<number>(1);
  const [muted, setMuted] = useState<boolean>(false);

  // Apply the speed whenever it changes (or the active track reloads).
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = speed;
  }, [speed, activeId]);

  // Apply volume / mute.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = muted;
    }
  }, [volume, muted, activeId]);

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
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8">
      {/* Track list */}
      <aside className="md:col-span-2">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
          Tracks
        </h2>
        <ul className="space-y-1">
          {tracks.map((t) => {
            const isActive = t.id === activeId;
            // Short labels for the chapter list — full names are shown in the
            // detail pane on the right. "INTRODUCTION" → "INTRO" so the
            // letter-spaced uppercase label fits the fixed-width slot.
            const nLabel = /^\d+$/.test(t.num)
              ? `Ch ${t.num}`
              : t.num === "Introduction"
              ? "Intro"
              : t.num;
            return (
              <li key={t.id}>
                <button
                  onClick={() => setActiveId(t.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors group ${
                    isActive
                      ? "bg-indigo-100 border border-indigo-200"
                      : "hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-[10px] font-black uppercase tracking-wider shrink-0 w-20 pt-0.5 ${
                      isActive ? "text-indigo-600" : "text-slate-400"
                    }`}>
                      {nLabel}
                    </span>
                    <span className={`text-sm font-semibold leading-snug flex-1 min-w-0 wrap-break-word ${
                      isActive ? "text-indigo-900" : "text-slate-700"
                    }`}>
                      {t.title}
                    </span>
                    {isActive && <ChevronRightIcon className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Player + active track detail */}
      <section className="md:col-span-3">
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

            {/* Row 1: transport controls + scrubber */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => seek(Math.max(0, progress - 15))}
                disabled={audioMissing || !duration}
                className="text-slate-500 hover:text-indigo-700 disabled:text-slate-300 disabled:cursor-not-allowed text-xs font-bold px-2 py-1"
                aria-label="Skip back 15 seconds"
                title="Skip back 15s"
              >
                ⏪ 15s
              </button>
              <button
                onClick={togglePlay}
                disabled={audioMissing}
                className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white flex items-center justify-center shadow"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
              </button>
              <button
                onClick={() => seek(Math.min(duration, progress + 15))}
                disabled={audioMissing || !duration}
                className="text-slate-500 hover:text-indigo-700 disabled:text-slate-300 disabled:cursor-not-allowed text-xs font-bold px-2 py-1"
                aria-label="Skip forward 15 seconds"
                title="Skip forward 15s"
              >
                15s ⏩
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
                  aria-label="Seek"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>{fmt(progress)}</span>
                  <span>{fmt(duration)}</span>
                </div>
              </div>
            </div>

            {/* Row 2: speed dropdown + volume */}
            <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-slate-200">
              <label className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Speed
                </span>
                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded px-2 py-1 hover:border-indigo-300 focus:outline-none focus:border-indigo-500"
                  aria-label="Playback speed"
                >
                  {SPEEDS.map((s) => (
                    <option key={s} value={s}>{s}×</option>
                  ))}
                </select>
              </label>

              <div className="flex items-center gap-2 flex-1 max-w-45">
                <button
                  onClick={() => setMuted((m) => !m)}
                  className="text-slate-500 hover:text-indigo-700"
                  aria-label={muted ? "Unmute" : "Mute"}
                  title={muted ? "Unmute" : "Mute"}
                >
                  {muted || volume === 0
                    ? <SpeakerXMarkIcon className="w-4 h-4" />
                    : <SpeakerWaveIcon className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setVolume(v);
                    if (v > 0 && muted) setMuted(false);
                  }}
                  className="flex-1 accent-indigo-600"
                  aria-label="Volume"
                />
              </div>
            </div>

            {audioMissing && (
              <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mt-3 leading-snug">
                Audio file not yet generated for this track. Run <code className="font-mono text-[10px]">scripts/generate-narration-piper.sh</code> to produce high-quality narration with Piper TTS. The transcript is available below.
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
          Audio narration generated locally with Piper TTS (MIT). Free, open-source, and runs entirely on your machine — no API keys, no cloud, no rate limits.
        </p>
      </section>
    </div>
  );
}
