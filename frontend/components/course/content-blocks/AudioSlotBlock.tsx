"use client";

import { useRef, useState } from "react";
import { Mic, Upload, Play, Pause } from "lucide-react";
import type { AudioSlotBlock } from "@/types/course";

export function AudioSlotRenderer({
  block,
  lessonId,
  onUpload,
}: {
  block: AudioSlotBlock;
  lessonId: string;
  onUpload?: (file: File, slotKey: string) => Promise<string>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [localUrl, setLocalUrl] = useState<string | null>(block.uploadedUrl ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const slotKey = block.label.toLowerCase().replace(/\s+/g, "_");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalUrl(URL.createObjectURL(file));
    if (onUpload) {
      setIsUploading(true);
      try {
        const remoteUrl = await onUpload(file, slotKey);
        setLocalUrl(remoteUrl);
      } finally {
        setIsUploading(false);
      }
    }
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  }

  // lessonId used for future upload path construction
  void lessonId;

  return (
    <div className="border border-dashed border-slate-300 rounded-lg p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
          <Mic className="w-4 h-4 text-slate-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900">{block.label}</p>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{block.hint}</p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          <Upload className="w-3.5 h-3.5" />
          {isUploading ? "Uploading…" : "Upload"}
        </button>
        <input ref={inputRef} type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
      </div>

      {localUrl && (
        <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center hover:bg-sky-700 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <audio ref={audioRef} src={localUrl} onEnded={() => setIsPlaying(false)} className="flex-1 h-8" controls />
        </div>
      )}
    </div>
  );
}
