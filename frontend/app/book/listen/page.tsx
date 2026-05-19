import { CHAPTERS } from "@/lib/taxonomy";
import BookListenPlayer from "@/components/BookListenPlayer";

export const metadata = {
  title: "Listen | The Book | HTR",
  description:
    "Audio narration of Transforming American Healthcare — Preface, Introduction, and all 20 chapters. Roughly ten minutes per chapter.",
};

// Build the manifest of audio tracks once at request time, from the same
// taxonomy that drives the rest of the platform. The naming convention is:
//   00-preface.m4a
//   01-introduction.m4a
//   02-chapter-01.m4a ... 21-chapter-20.m4a
// produced by scripts/generate-narration-audio.sh.

export interface NarrationTrack {
  id: string;
  num: string;
  title: string;
  desc: string;
  audioSrc: string;
  textSrc: string;
}

function buildTracks(): NarrationTrack[] {
  const tracks: NarrationTrack[] = [];
  let i = 0;
  for (const ch of CHAPTERS) {
    let base: string;
    if (ch.num === "Preface") {
      base = "00-preface";
    } else if (ch.num === "Introduction") {
      base = "01-introduction";
    } else {
      const padded = ch.num.padStart(2, "0");
      const seq = String(i).padStart(2, "0");
      base = `${seq}-chapter-${padded}`;
    }
    tracks.push({
      id: ch.num,
      num: ch.num,
      title: ch.title,
      desc: ch.desc,
      audioSrc: `/audio/narration/${base}.m4a`,
      textSrc: `/audio/narration/${base}.txt`,
    });
    i++;
  }
  return tracks;
}

export default function BookListenPage() {
  const tracks = buildTracks();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-2">
          The Book — Audio Edition
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
          Listen
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
          Audio narration of <em>Transforming American Healthcare</em>. Roughly ten minutes per chapter. Each track is a faithful summary of the chapter, designed to be heard while you drive, walk, or work alongside the rest of the platform.
        </p>
      </div>

      <BookListenPlayer tracks={tracks} />
    </div>
  );
}
