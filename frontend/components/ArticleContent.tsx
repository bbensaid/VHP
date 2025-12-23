import React from "react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

// 1. Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// 2. The Video Component (Handles BOTH Uploads and YouTube)
const VideoBlock = ({ value }: { value: any }) => {
  const { url, caption, videoFile } = value;

  // A. Check for Uploaded File (Sanity File)
  const uploadedUrl = videoFile?.asset?.url;

  // B. Check for YouTube ID
  const youtubeId = url ? getYouTubeId(url) : null;

  return (
    <div className="my-8">
      <div
        className="relative w-full overflow-hidden rounded-xl shadow-lg bg-gray-900"
        style={{ paddingTop: "56.25%" }}
      >
        {/* Priority 1: Uploaded Video File */}
        {uploadedUrl ? (
          <video
            src={uploadedUrl}
            controls
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : youtubeId ? (
          /* Priority 2: YouTube Embed */
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={caption || "Video player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        ) : (
          /* Fallback: No Source */
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white bg-gray-800">
            <p className="text-sm">No Video Source Found</p>
          </div>
        )}
      </div>
      {caption && (
        <p className="mt-2 text-sm text-center text-gray-500 italic">
          {caption}
        </p>
      )}
    </div>
  );
};

// 3. The Audio Component
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

// 4. The Table Component
const TableBlock = ({ value }: { value: any }) => {
  let data = [];
  try {
    data = JSON.parse(value.code);
  } catch (e) {
    return (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
        {value.code}
      </pre>
    );
  }

  if (!Array.isArray(data) || data.length === 0) return null;
  const headers = Object.keys(data[0]);

  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-bold border-b border-gray-200">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-6 py-3 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((row: any, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- MAIN EXPORT ---

const components = {
  types: {
    video: VideoBlock,
    audio: AudioBlock,
    code: TableBlock,
    image: ({ value }: any) => (
      <figure className="my-8">
        <img
          src={value.asset?.url}
          alt={value.alt || "Article Image"}
          className="w-full rounded-xl shadow-md"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 text-lg leading-relaxed text-gray-700">{children}</p>
    ),
    blockquote: ({ children }: any) => {
      return (
        <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-8 italic text-xl text-gray-800 bg-gray-50 rounded-r-lg">
          {children}
        </blockquote>
      );
    },
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    link: ({ children, value }: any) => (
      <Link
        href={value.href}
        className="text-indigo-600 hover:underline decoration-2 underline-offset-2"
      >
        {children}
      </Link>
    ),
    "highlight-policy": ({ children }: any) => (
      <span className="bg-orange-100 text-orange-800 px-1 rounded">
        {children}
      </span>
    ),
    "highlight-economics": ({ children }: any) => (
      <span className="bg-green-100 text-green-800 px-1 rounded">
        {children}
      </span>
    ),
    "highlight-tech": ({ children }: any) => (
      <span className="bg-indigo-100 text-indigo-800 px-1 rounded">
        {children}
      </span>
    ),
  },
};

export default function ArticleContent({ body }: { body: any }) {
  return <PortableText value={body} components={components} />;
}
