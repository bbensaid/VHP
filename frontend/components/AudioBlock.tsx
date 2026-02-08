"use client";

interface AudioBlockProps {
  value: {
    url?: string;
    title?: string;
    caption?: string;
  };
}

export default function AudioBlock({ value }: AudioBlockProps) {
  const { url, title, caption } = value;

  if (!url) return null;

  // 1. Helper to detect Spotify/SoundCloud for embeds
  const isSpotify = url.includes("spotify.com");
  const isSoundCloud = url.includes("soundcloud.com");
  const isEmbed = isSpotify || isSoundCloud;

  // 2. Render logic
  return (
    <figure className="w-full max-w-full my-6 first:mt-0 last:mb-0">
      <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
        
        {/* Header: Icon + Title (Visible only if title exists) */}
        {title && (
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {title}
              </h4>
            </div>
          </div>
        )}

        {/* Player Section */}
        <div className="p-4 bg-slate-50">
          {isEmbed ? (
            <iframe
              src={getEmbedUrl(url)}
              width="100%"
              height={isSpotify ? "152" : "166"}
              frameBorder="0"
              allow="encrypted-media"
              className="rounded-lg shadow-sm"
              loading="lazy"
            ></iframe>
          ) : (
            <audio 
              controls 
              className="w-full h-10 accent-indigo-600"
              src={url}
            >
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>

      {/* Caption (Optional) */}
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-slate-500 italic px-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Helper to convert standard URLs to Embed URLs
function getEmbedUrl(url: string) {
  if (url.includes("spotify.com") && !url.includes("/embed")) {
    // Basic Spotify Embed Converter (simplified)
    return url.replace("open.spotify.com", "open.spotify.com/embed");
  }
  if (url.includes("soundcloud.com") && !url.includes("w.soundcloud.com")) {
    // SoundCloud usually requires their API to get the embed code, 
    // but we can try the visual widget if the user provides the embed src directly.
    // If they provide a page URL, this might need a more complex OEmbed fetch.
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%234f46e5&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
  }
  return url;
}