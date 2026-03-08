"use client";

import { PortableText, PortableTextComponents } from "next-sanity";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import VideoBlock from "@/components/VideoBlock";
import AudioBlock from "@/components/AudioBlock";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

// ─── Mark (inline) renderers ────────────────────────────────────────────────
const marks = {
  strong: ({ children }: any) => (
    <strong className="font-bold text-slate-900">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-slate-700">{children}</em>
  ),
  underline: ({ children }: any) => (
    <span className="underline underline-offset-2">{children}</span>
  ),
  "strike-through": ({ children }: any) => (
    <span className="line-through text-slate-400">{children}</span>
  ),
  link: ({ value, children }: any) => (
    <a
      href={value?.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 font-semibold underline underline-offset-2 hover:text-indigo-800 transition-colors"
    >
      {children}
    </a>
  ),
};

// ─── Full PortableText component map ────────────────────────────────────────
const ptComponents: PortableTextComponents = {
  marks,

  block: {
    // ── Body paragraphs ──────────────────────────────────────────────────
    normal: ({ children }) => (
      <p className="text-lg text-slate-700 leading-relaxed mb-6">{children}</p>
    ),

    // ── Headings ─────────────────────────────────────────────────────────
    h1: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return (
        <h1
          id={slugify(text)}
          className="scroll-mt-32 text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-14 mb-6 leading-tight"
        >
          {children}
        </h1>
      );
    },

    h2: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return (
        <h2
          id={slugify(text)}
          className="scroll-mt-32 text-2xl md:text-3xl font-black tracking-tight text-slate-900 mt-14 mb-4 leading-snug border-l-4 border-indigo-500 pl-4"
        >
          {children}
        </h2>
      );
    },

    h3: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return (
        <h3
          id={slugify(text)}
          className="scroll-mt-32 text-xl font-bold text-slate-900 mt-10 mb-3 leading-snug"
        >
          {children}
        </h3>
      );
    },

    h4: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return (
        <h4
          id={slugify(text)}
          className="scroll-mt-32 text-lg font-bold text-slate-800 mt-8 mb-2"
        >
          {children}
        </h4>
      );
    },

    // ── Pull quote ───────────────────────────────────────────────────────
    quote: ({ children }) => (
      <blockquote className="relative my-10 pl-6 border-l-4 border-indigo-500">
        <p className="text-xl md:text-2xl font-semibold text-slate-800 leading-relaxed italic">
          {children}
        </p>
      </blockquote>
    ),

    // ── Highlight (alternate callout style) ──────────────────────────────
    highlight: ({ children }) => (
      <div className="my-8 px-5 py-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-base font-semibold text-amber-900 leading-relaxed">
          {children}
        </p>
      </div>
    ),

    // ── Callout (action / alert box) ─────────────────────────────────────
    callout: ({ children }) => (
      <div className="my-10 p-6 bg-indigo-50 border border-indigo-200 rounded-xl shadow-sm">
        <div className="flex items-start gap-4">
          <span className="text-2xl flex-shrink-0 mt-0.5">💡</span>
          <p className="text-base font-semibold text-indigo-900 leading-relaxed">
            {children}
          </p>
        </div>
      </div>
    ),
  },

  // ── List renderers ───────────────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 space-y-3 pl-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 space-y-3 pl-0 list-none counter-reset-[item]">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-lg text-slate-700 leading-relaxed">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="flex items-start gap-3 text-lg text-slate-700 leading-relaxed">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center mt-0.5">
          {/* Counter not feasible in inline JSX — number styling via wrapper */}
        </span>
        <span>{children}</span>
      </li>
    ),
  },

  // ── Custom block types ───────────────────────────────────────────────────
  types: {
    // ── Image ────────────────────────────────────────────────────────────
    image: ({ value }) => {
      // The GROQ query uses asset->{ _id, _ref, url } to dereference the asset.
      // After dereferencing, value.asset contains the full asset document.
      // We support three shapes in priority order:
      //   1. asset.url  — direct CDN url from the dereferenced asset document
      //   2. asset._ref — standard reference, passed to urlFor()
      //   3. asset._id  — also valid for urlFor()
      const assetUrl   = value?.asset?.url;
      const assetRef   = value?.asset?._ref || value?.asset?._id;
      const directUrl  = value?.url || value?.src;

      let imgSrc: string | null = null;

      if (assetUrl) {
        // Fastest path — asset was dereferenced, URL is available directly
        imgSrc = assetUrl;
      } else if (assetRef) {
        try {
          imgSrc = urlFor(value).width(1200).auto("format").url();
        } catch {
          imgSrc = null;
        }
      } else if (directUrl) {
        imgSrc = directUrl;
      }

      return (
        <figure className="my-12">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={value.alt || value.caption || ""}
              className="w-full rounded-2xl shadow-lg border border-slate-200"
              loading="lazy"
            />
          ) : (
            // Placeholder shown when no asset has been attached yet.
            // To fix: open this article in Sanity Studio → find the image block
            // in the Body field → click the image icon → upload your PNG/JPG.
            <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl py-14 flex flex-col items-center justify-center text-slate-400 gap-3">
              <span className="text-5xl">🖼️</span>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-500 mb-1">
                  Image not yet attached
                </p>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Open this article in Sanity Studio → Body field → click the
                  image block → upload your PNG or JPG file.
                </p>
              </div>
              {value.caption && (
                <p className="text-xs italic text-slate-400 mt-1 max-w-sm text-center">
                  Intended caption: &ldquo;{value.caption}&rdquo;
                </p>
              )}
            </div>
          )}
          {imgSrc && value.caption && (
            <figcaption className="mt-4 text-center text-sm text-slate-500 leading-relaxed italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    // ── Data table (code block with language: json) ───────────────────────
    code: ({ value }) => {
      let data = value.code;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return (
            <pre className="my-8 p-5 bg-slate-900 text-emerald-400 rounded-xl overflow-x-auto text-sm leading-relaxed font-mono">
              <code>{data}</code>
            </pre>
          );
        }
      }
      if (!Array.isArray(data) || data.length === 0) return null;
      const headers = Object.keys(data[0]);
      return (
        <div className="my-10 overflow-hidden border border-slate-200 rounded-2xl shadow-sm bg-white">
          {value.title && (
            <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span className="font-black text-sm uppercase tracking-widest">
                {value.title}
              </span>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="px-5 py-4 text-[11px] font-black text-slate-500 uppercase tracking-wider whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row: Record<string, string>, rowIndex: number) => (
                  <tr key={rowIndex} className="hover:bg-slate-50/70 transition-colors">
                    {headers.map((header) => (
                      <td
                        key={`${rowIndex}-${header}`}
                        className="px-5 py-4 text-sm text-slate-700 leading-relaxed"
                      >
                        {row[header]}
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

    // ── Video ─────────────────────────────────────────────────────────────
    video: VideoBlock,
    youtube: VideoBlock,

    // ── Audio ─────────────────────────────────────────────────────────────
    audio: AudioBlock,
  },
};

// ─── Main export ────────────────────────────────────────────────────────────
export default function ArticleContent({ body }: { body: any }) {
  return (
    <div className="article-body">
      <PortableText value={body} components={ptComponents} />
    </div>
  );
}