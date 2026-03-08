"use client";

// components/AcademyContent.tsx
// Educational PortableText renderer. Designed for clarity, pacing, and learner engagement.
// NOT a blog/article renderer — visual hierarchy serves the student, not the publisher.

import { PortableText, PortableTextComponents } from "next-sanity";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import VideoBlock from "@/components/VideoBlock";
import AudioBlock from "@/components/AudioBlock";

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

const components: PortableTextComponents = {
  marks: {
    strong:           ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    em:               ({ children }) => <em className="italic text-slate-600">{children}</em>,
    underline:        ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    "strike-through": ({ children }) => <span className="line-through text-slate-400">{children}</span>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
         className="text-indigo-600 font-semibold underline underline-offset-2 hover:text-indigo-800 transition-colors">
        {children}
      </a>
    ),
  },

  block: {
    // ── Body paragraphs: generous line-height + spacing ──────────────────
    normal: ({ children }) => (
      <p className="text-[17px] text-slate-700 leading-8 mb-7">{children}</p>
    ),

    // ── h2: full-width section break, feels like a chapter opener ────────
    h2: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return (
        <div className="mt-16 mb-7">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Section</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <h2 id={slugify(text)}
              className="scroll-mt-24 text-2xl font-black text-slate-900 leading-snug">
            {children}
          </h2>
          <div className="mt-3 h-1 w-14 bg-indigo-500 rounded-full" />
        </div>
      );
    },

    // ── h3: bold label, uppercase, clear sub-section signal ─────────────
    h3: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return (
        <h3 id={slugify(text)}
            className="scroll-mt-24 text-base font-black text-slate-800 uppercase tracking-widest mt-10 mb-4 flex items-center gap-3">
          <span className="w-4 h-0.5 bg-indigo-400 rounded-full inline-block" />
          {children}
        </h3>
      );
    },

    h4: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return (
        <h4 id={slugify(text)}
            className="scroll-mt-24 text-base font-bold text-slate-800 mt-8 mb-3">
          {children}
        </h4>
      );
    },

    // ── 💡 Key Concept: full indigo card — not a border, a BOX ───────────
    callout: ({ children }) => (
      <div className="my-10 rounded-xl overflow-hidden border border-indigo-300 shadow-sm">
        <div className="bg-indigo-600 px-5 py-3 flex items-center gap-2.5">
          <span className="text-lg">💡</span>
          <span className="text-[11px] font-black text-indigo-100 uppercase tracking-[0.15em]">Key Concept</span>
        </div>
        <div className="bg-indigo-50 px-6 py-5">
          <div className="text-[16px] text-indigo-950 leading-8 font-medium">{children}</div>
        </div>
      </div>
    ),

    // ── 📌 Remember This: full amber card ────────────────────────────────
    highlight: ({ children }) => (
      <div className="my-10 rounded-xl overflow-hidden border border-amber-300 shadow-sm">
        <div className="bg-amber-500 px-5 py-3 flex items-center gap-2.5">
          <span className="text-lg">📌</span>
          <span className="text-[11px] font-black text-amber-950 uppercase tracking-[0.15em]">Remember This</span>
        </div>
        <div className="bg-amber-50 px-6 py-5">
          <div className="text-[16px] text-amber-950 leading-8 font-medium">{children}</div>
        </div>
      </div>
    ),

    // ── Pull quote: dramatic, large quotation mark, dark card ────────────
    quote: ({ children }) => (
      <div className="my-10 bg-slate-800 rounded-xl px-8 py-7 relative overflow-hidden">
        <span className="absolute top-2 left-5 text-8xl font-black text-slate-600 leading-none select-none">&ldquo;</span>
        <div className="relative z-10 mt-4">
          <p className="text-xl text-slate-100 italic leading-9 font-medium">{children}</p>
        </div>
      </div>
    ),
  },

  // ── Lists: room to breathe, clear visual bullets ─────────────────────────
  list: {
    bullet: ({ children }) => <ul className="my-7 space-y-4">{children}</ul>,
    number: ({ children }) => <ol className="my-7 space-y-4 list-none">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-4 text-[17px] text-slate-700 leading-8">
        <span className="mt-3 w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="flex gap-4 text-[17px] text-slate-700 leading-8">
        <span>{children}</span>
      </li>
    ),
  },

  types: {
    // ── Image ─────────────────────────────────────────────────────────────
    image: ({ value }) => {
      const assetUrl  = value?.asset?.url;
      const assetRef  = value?.asset?._ref || value?.asset?._id;
      const directUrl = value?.url || value?.src;
      let imgSrc: string | null = null;
      if      (assetUrl)  imgSrc = assetUrl;
      else if (assetRef)  try { imgSrc = urlFor(value).width(1000).auto("format").url(); } catch { imgSrc = null; }
      else if (directUrl) imgSrc = directUrl;
      return (
        <figure className="my-12">
          {imgSrc ? (
            <img src={imgSrc} alt={value.alt || value.caption || ""}
                 className="w-full rounded-xl shadow-lg border border-slate-200" loading="lazy" />
          ) : (
            <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl py-14 flex flex-col items-center gap-2 text-slate-400">
              <span className="text-5xl">🖼️</span>
              <p className="text-sm font-medium">Image not yet attached in Sanity Studio</p>
            </div>
          )}
          {imgSrc && value.caption && (
            <figcaption className="mt-4 text-center text-sm text-slate-500 italic">{value.caption}</figcaption>
          )}
        </figure>
      );
    },

    // ── Data table: parses JSON string → visual table with stat-style header ──
    code: ({ value }) => {
      let data = value.code;
      if (typeof data === "string") {
        try { data = JSON.parse(data); } catch {
          return (
            <pre className="my-8 p-5 bg-slate-900 text-emerald-400 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed">
              <code>{data}</code>
            </pre>
          );
        }
      }
      if (!Array.isArray(data) || data.length === 0) return null;
      const headers = Object.keys(data[0]);
      return (
        <div className="my-10 overflow-hidden rounded-xl border border-slate-300 shadow-md">
          <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            {value.title && (
              <span className="font-black text-xs text-slate-300 uppercase tracking-widest ml-1">
                {value.title}
              </span>
            )}
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50">
                  {headers.map((h) => (
                    <th key={h}
                        className="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap border-b-2 border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row: Record<string, string>, i: number) => (
                  <tr key={i} className={`border-b border-slate-100 transition-colors hover:bg-indigo-50/40 ${i % 2 === 1 ? "bg-slate-50/50" : "bg-white"}`}>
                    {headers.map((h, j) => (
                      <td key={`${i}-${h}`}
                          className={`px-5 py-4 leading-relaxed ${j === 0 ? "font-semibold text-slate-800" : "text-slate-600"}`}>
                        {row[h]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    },

    video:   VideoBlock,
    youtube: VideoBlock,
    audio:   AudioBlock,
  },
};

export default function AcademyContent({ body }: { body: any }) {
  return <PortableText value={body} components={components} />;
}
