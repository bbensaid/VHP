"use client";

import React, { useState, useEffect, useRef } from "react";
import { SpeakerWaveIcon, StopIcon, PauseIcon } from "@heroicons/react/24/outline";
import { useVoice } from "@/components/VoiceContext";

export default function ListenButton({ text }: { text: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const voice = useVoice();

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // When voice TTS starts speaking, pause article reading so they don't overlap.
  // When voice TTS finishes, resume if we were playing.
  useEffect(() => {
    if (!isSupported) return;
    if (voice.isSpeaking && isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, [voice.isSpeaking, isPlaying, isPaused, isSupported]);

  const togglePlay = () => {
    if (!isSupported) return;

    // If voice TTS is currently speaking, stop it first before starting article read
    if (voice.isSpeaking) {
      voice.stopSpeaking();
    }

    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const stop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={togglePlay}
        className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors group"
        title={isPlaying ? "Pause" : "Listen to Article"}
      >
        {isPlaying ? (
          <PauseIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        ) : (
          <SpeakerWaveIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
        )}
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
          {isPlaying ? "Pause" : isPaused ? "Resume" : "Listen"}
        </span>
      </button>
      {(isPlaying || isPaused) && (
        <button
          onClick={stop}
          className="text-slate-400 hover:text-red-500 transition-colors"
          title="Stop"
        >
          <StopIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
