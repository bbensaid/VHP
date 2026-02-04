'use client'; // 👈 This is the critical fix

import YouTube from 'react-youtube';

interface YouTubeEmbedProps {
  videoId: string;
}

export default function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  if (!videoId) return null;

  return (
    <div className="my-10 rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-black">
      <YouTube
        videoId={videoId}
        opts={{
          width: '100%',
          height: '450',
          playerVars: {
            modestbranding: 1,
            rel: 0,
          },
        }}
        className="w-full"
        iframeClassName="w-full"
      />
    </div>
  );
}