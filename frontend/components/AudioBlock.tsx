// components/AudioBlock.tsx
"use client";
import React, { useRef } from "react";

const AudioBlock = ({ value, compact }: { value: any; compact?: boolean }) => {
  const audioUrl = value.file?.asset?.url;
  const containerRef = useRef<HTMLDivElement>(null);

  if (!audioUrl) {
    if (compact) return null;
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded border border-red-100 text-sm">
        Audio file not found.
      </div>
    );
  }

  // COMPACT MODE: Stacked Card for Narrow Sidebars
  if (compact) {
    return (
      <div className="w-full bg-gray-50 border border-gray-200 rounded-md p-2 flex flex-col gap-2 hover:border-gray-300 transition-colors">
        {/* Top Row: Icon + Title */}
        <div className="flex items-center gap-2">
           <div className="w-5 h-5 bg-white border border-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm">
             <span className="text-[9px]">🎧</span>
           </div>
           <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide truncate leading-tight">
             {value.title || "Audio"}
           </span>
        </div>

        {/* Bottom Row: Slim Player */}
        <audio 
            controls 
            src={audioUrl} 
            className="w-full h-6 block [&::-webkit-media-controls-panel]:bg-transparent"
            title="Play Summary"
        />
      </div>
    );
  }

  // STANDARD MODE (Full Article)
  return (
    <div ref={containerRef} className="my-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 leading-tight">
            {value.title || "Audio Briefing"}
          </h4>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Listen to Summary
          </p>
        </div>
      </div>
      <audio controls src={audioUrl} className="w-full" />
      {value.summary && (
        <p className="mt-3 text-sm text-gray-600">{value.summary}</p>
      )}
    </div>
  );
};

export default AudioBlock;