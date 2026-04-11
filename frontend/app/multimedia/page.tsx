// frontend/app/multimedia/page.tsx
import MultimediaClientPage from "./MultimediaClientPage";

// Import the ONLY media component that currently exists in your codebase
import VideosPage from "@/app/media/videos/page";

// Create clean fallback components for the tabs that don't have underlying pages yet
const PodcastsPlaceholder = () => (
  <div className="flex flex-col items-center justify-center p-24 text-center bg-slate-50/50">
    <span className="text-4xl mb-4">🎙️</span>
    <h3 className="ty-h3 font-bold text-slate-800 mb-2">HTR Podcast Network</h3>
    <p className="text-slate-500 max-w-md mx-auto">
      Podcast episodes are currently being migrated to the new unified platform. Check back soon.
    </p>
  </div>
);

const LibraryPlaceholder = () => (
  <div className="flex flex-col items-center justify-center p-24 text-center bg-slate-50/50">
    <span className="text-4xl mb-4">📚</span>
    <h3 className="ty-h3 font-bold text-slate-800 mb-2">Full Multimedia Library</h3>
    <p className="text-slate-500 max-w-md mx-auto">
      The comprehensive media archive is under construction. Please use the Video Briefings tab in the meantime.
    </p>
  </div>
);

export const metadata = {
  title: "HTR Multimedia Hub | Podcasts & Videos",
  description: "Centralized hub for all HTR media and video briefings.",
};

export default function MultimediaHubPage() {
  return (
    <MultimediaClientPage
      podcastsTab={<PodcastsPlaceholder />}
      videosTab={<VideosPage />}
      libraryTab={<LibraryPlaceholder />}
    />
  );
}
