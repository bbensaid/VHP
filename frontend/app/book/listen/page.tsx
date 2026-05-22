import BookListenPlayer from "@/components/BookListenPlayer";
import { getAllTracks } from "@/lib/narration";

// Re-export NarrationTrack so existing imports keep working.
export type { NarrationTrack } from "@/lib/narration";

export const metadata = {
  title: "Listen | The Book | HTR",
  description:
    "Audio narration of Transforming American Healthcare — Preface, Introduction, and all 20 chapters. Roughly ten minutes per chapter.",
};

export default function BookListenPage() {
  const tracks = getAllTracks();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">
          The Book — Audio Edition
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
          Listen
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
          Audio narration of <em>Transforming American Healthcare</em>. Roughly ten minutes per chapter. Each track is a faithful summary of the chapter, designed to be heard while you drive, walk, or work alongside the rest of the platform.
        </p>
      </div>

      <BookListenPlayer tracks={tracks} />
    </div>
  );
}
