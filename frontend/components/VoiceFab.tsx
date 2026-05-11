"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MicrophoneIcon, StopIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useVoice } from "@/components/VoiceContext";

export default function VoiceFab() {
  const { isListening, isSpeaking, isSupported, transcript, toggleListening, stopSpeaking } =
    useVoice();
  const pathname = usePathname() ?? "";

  if (pathname.startsWith("/studio")) return null;

  const handleClick = () => {
    if (isSpeaking) { stopSpeaking(); return; }
    toggleListening();
  };

  const isActive = isListening || isSpeaking;

  const bgClass = isSpeaking
    ? "bg-indigo-600 hover:bg-indigo-500"
    : isListening
    ? "bg-rose-600 hover:bg-rose-500"
    : "bg-slate-800 hover:bg-slate-700";

  const statusText = isSpeaking
    ? "Speaking — click to stop"
    : isListening
    ? "Listening… click to stop"
    : isSupported
    ? "Voice off — click to start  (⌘⇧V)"
    : "Checking mic support…";

  return (
    <div
      style={{ position: "fixed", bottom: "5rem", left: "50%", transform: "translateX(-50%)", zIndex: 99999 }}
      className="flex flex-col items-center gap-2 select-none"
    >
      {/* Transcript pill */}
      {isListening && transcript && (
        <div className="px-3 py-1 bg-slate-900 text-white text-xs rounded-full shadow-lg max-w-xs truncate text-center">
          {transcript}
        </div>
      )}

      {/* Status label — always visible */}
      <div className="px-2 py-0.5 bg-white/95 dark:bg-slate-800/95 text-slate-700 dark:text-slate-200 text-[11px] font-medium rounded shadow-md text-center whitespace-nowrap border border-slate-200 dark:border-slate-600">
        {statusText}
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={statusText}
        className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl text-white transition-colors duration-150 ${bgClass}`}
      >
        {isActive && (
          <span
            className={`absolute inset-0 rounded-full animate-ping opacity-30 ${isSpeaking ? "bg-indigo-400" : "bg-rose-400"}`}
          />
        )}
        <span className="relative z-10">
          {isSpeaking
            ? <SpeakerWaveIcon className="w-8 h-8" />
            : <MicrophoneIcon className="w-8 h-8" />
          }
        </span>
      </button>
    </div>
  );
}
