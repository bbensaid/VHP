import React from "react";

const AudioBlock = ({ value }: { value: any }) => {
    const audioUrl = value.file?.asset?.url;

    if (!audioUrl) {
        return (
        <div className="p-4 bg-red-50 text-red-600 rounded border border-red-100 text-sm">
            Audio file not found. Check GROQ query:{" "}
            <code>file &#123; asset-&gt;&#123;url&#125; &#125;</code>
        </div>
        );
    }

    return (
        <div className="my-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
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