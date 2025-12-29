"use client";
import React, { useRef } from "react";

const AudioBlock = ({ value, compact }: { value: any; compact?: boolean }) => {
    const audioUrl = value.file?.asset?.url;
    const containerRef = useRef<HTMLDivElement>(null);

    if (!audioUrl) {
        if (compact) return null;
        return (
        <div className="p-4 bg-red-50 text-red-600 rounded border border-red-100 text-sm">
            Audio file not found. Check GROQ query:{" "}
            <code>file &#123; asset-&gt;&#123;url&#125; &#125;</code>
        </div>
        );
    }

    if (compact) {
        return (
            <div className="w-full aspect-video bg-indigo-50 rounded-md border border-indigo-100 flex items-center justify-center cursor-pointer hover:bg-indigo-100 transition-colors" title={value.title || "Audio Briefing"}>
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            </div>
        );
    }

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