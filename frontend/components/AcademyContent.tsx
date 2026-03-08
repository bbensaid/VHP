"use client";

// components/AcademyContent.tsx
// Educational PortableText renderer for Academy course modules.
// Every block type is designed to serve the learner — not the publisher.

import { PortableText, PortableTextComponents } from "next-sanity";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import VideoBlock from "@/components/VideoBlock";
import AudioBlock from "@/components/AudioBlock";

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);
const slugify = (t: string) => t.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

// ── Trend indicators ───────────────────────────────────────────────────────────
const trendIcon: Record<string, { icon: string; color: string }> = {
  up:      { icon: "↑", color: "text-emerald-500" },
  down:    { icon: "↓", color: "text-red-500"     },
  neutral: { icon: "→", color: "text-slate-400"   },
};

// ── Stat card accent colors — rotate through for visual variety ───────────────
const statColors = [
  { bg: "bg-indigo-600",  text: "text-white",       sub: "text-indigo-200" },
  { bg: "bg-emerald-600", text: "text-white",       sub: "text-emerald-200" },
  { bg: "bg-amber-500",   text: "text-white",       sub: "text-amber-100"  },
  { bg: "bg-rose-600",    text: "text-white",       sub: "text-rose-200"   },
];

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
    normal: ({ children }) => (
      <p className="text-[17px] text-slate-700 leading-8 mb-8">{children}</p>
    ),

    h1: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return <h1 id={slugify(text)} className="scroll-mt-24 text-3xl font-black text-slate-900 mt-14 mb-5 leading-tight">{children}</h1>;
    },

    // Section opener — full visual break, feels like a chapter
    h2: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return (
        <div className="mt-16 mb-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] px-2">Section</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <h2 id={slugify(text)} className="scroll-mt-24 text-2xl font-black text-slate-900 leading-snug mb-2">
            {children}
          </h2>
          <div className="h-1 w-12 bg-indigo-500 rounded-full" />
        </div>
      );
    },

    h3: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return (
        <h3 id={slugify(text)} className="scroll-mt-24 flex items-center gap-3 text-sm font-black text-slate-700 uppercase tracking-widest mt-10 mb-4">
          <span className="w-5 h-0.5 bg-indigo-400 rounded-full shrink-0" />{children}
        </h3>
      );
    },

    h4: ({ children, value }) => {
      const text = value.children?.map((c: any) => c.text).join("") || "";
      return <h4 id={slugify(text)} className="scroll-mt-24 text-base font-bold text-slate-800 mt-8 mb-3">{children}</h4>;
    },

    // 💡 Key Concept — full indigo card, impossible to miss
    callout: ({ children }) => (
      <div className="my-10 rounded-xl overflow-hidden shadow-md border border-indigo-200">
        <div className="bg-indigo-600 px-5 py-3.5 flex items-center gap-3">
          <span className="text-xl">💡</span>
          <span className="text-[10px] font-black text-indigo-100 uppercase tracking-[0.2em]">Key Concept</span>
        </div>
        <div className="bg-indigo-50 px-6 py-5">
          <div className="text-[16px] text-indigo-950 leading-8 font-medium">{children}</div>
        </div>
      </div>
    ),

    // 📌 Remember This — full amber card
    highlight: ({ children }) => (
      <div className="my-10 rounded-xl overflow-hidden shadow-md border border-amber-300">
        <div className="bg-amber-500 px-5 py-3.5 flex items-center gap-3">
          <span className="text-xl">📌</span>
          <span className="text-[10px] font-black text-amber-950 uppercase tracking-[0.2em]">Remember This</span>
        </div>
        <div className="bg-amber-50 px-6 py-5">
          <div className="text-[16px] text-amber-950 leading-8 font-medium">{children}</div>
        </div>
      </div>
    ),

    // Expert voice / reflection — dark, dramatic
    quote: ({ children }) => (
      <div className="my-10 bg-slate-800 rounded-xl px-8 py-8 relative overflow-hidden">
        <span className="absolute -top-3 left-4 text-9xl font-black text-slate-600/40 leading-none select-none">&ldquo;</span>
        <div className="relative z-10">
          <p className="text-xl text-slate-100 italic leading-9 font-medium">{children}</p>
        </div>
      </div>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="my-7 space-y-4">{children}</ul>,
    number: ({ children }) => <ol className="my-7 space-y-4">{children}</ol>,
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
    // ── Image ──────────────────────────────────────────────────────────────────
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

    // ── Data table (legacy code block) ─────────────────────────────────────────
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
          <div className="bg-slate-900 px-5 py-4 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            {value.title && <span className="font-black text-xs text-slate-300 uppercase tracking-widest ml-1">{value.title}</span>}
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50">
                  {headers.map((h) => (
                    <th key={h} className="px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap border-b-2 border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row: Record<string, string>, i: number) => (
                  <tr key={i} className={`border-b border-slate-100 hover:bg-indigo-50/40 transition-colors ${i % 2 === 1 ? "bg-slate-50/50" : "bg-white"}`}>
                    {headers.map((h, j) => (
                      <td key={`${i}-${h}`} className={`px-5 py-4 leading-relaxed ${j === 0 ? "font-semibold text-slate-800" : "text-slate-600"}`}>{row[h]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    },

    // ── 📊 Stat Grid ────────────────────────────────────────────────────────────
    statGrid: ({ value }) => {
      const stats: any[] = value.stats || [];
      if (stats.length === 0) return null;
      return (
        <div className="my-12">
          {value.title && (
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 text-center">{value.title}</p>
          )}
          <div className={`grid gap-4 ${stats.length === 2 ? "grid-cols-2" : stats.length === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
            {stats.map((stat: any, i: number) => {
              const c = statColors[i % statColors.length];
              const trend = stat.trend ? trendIcon[stat.trend] : null;
              return (
                <div key={i} className={`${c.bg} rounded-2xl p-6 flex flex-col gap-2 shadow-md`}>
                  <div className={`text-4xl font-black ${c.text} leading-none flex items-start gap-2`}>
                    {stat.value}
                    {trend && <span className={`text-xl ${trend.color} mt-1`}>{trend.icon}</span>}
                  </div>
                  <div className={`text-sm font-bold ${c.text} leading-snug`}>{stat.label}</div>
                  {stat.context && (
                    <div className={`text-xs ${c.sub} leading-relaxed mt-1`}>{stat.context}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    },

    // ── 🌍 Real-World Example ───────────────────────────────────────────────────
    exampleBlock: ({ value }) => (
      <div className="my-10 rounded-xl overflow-hidden shadow-md border border-teal-200">
        <div className="bg-teal-700 px-5 py-3.5 flex items-center gap-3">
          <span className="text-xl">🌍</span>
          <span className="text-[10px] font-black text-teal-100 uppercase tracking-[0.2em]">
            {value.eyebrow || "Real-World Example"}
          </span>
        </div>
        <div className="bg-teal-50 px-6 py-6 space-y-3">
          {value.title && (
            <h4 className="font-black text-teal-900 text-lg leading-snug">{value.title}</h4>
          )}
          {value.body && (
            <p className="text-[16px] text-teal-800 leading-7">{value.body}</p>
          )}
          {value.outcome && (
            <div className="flex items-start gap-2.5 pt-2 border-t border-teal-200 mt-3">
              <span className="text-emerald-500 font-black text-lg shrink-0 mt-0.5">→</span>
              <p className="text-sm font-bold text-teal-900 leading-relaxed">{value.outcome}</p>
            </div>
          )}
          {value.source && (
            <p className="text-xs text-teal-600 italic mt-1">Source: {value.source}</p>
          )}
        </div>
      </div>
    ),

    // ── 🔗 Analogy ──────────────────────────────────────────────────────────────
    analogyBlock: ({ value }) => (
      <div className="my-10 rounded-xl overflow-hidden shadow-md border border-violet-200">
        <div className="bg-violet-700 px-5 py-3.5 flex items-center gap-3">
          <span className="text-xl">🔗</span>
          <span className="text-[10px] font-black text-violet-100 uppercase tracking-[0.2em]">Analogy</span>
          {value.concept && (
            <span className="ml-auto text-xs font-bold text-violet-300 truncate max-w-[200px]">{value.concept}</span>
          )}
        </div>
        <div className="bg-violet-50 px-6 py-6 space-y-4">
          {value.analogy && (
            <p className="text-lg text-violet-900 italic leading-8 font-medium">&ldquo;{value.analogy}&rdquo;</p>
          )}
          {value.bridge && (
            <div className="flex items-start gap-3 pt-3 border-t border-violet-200">
              <span className="text-violet-400 font-black text-base shrink-0 mt-0.5">↳</span>
              <p className="text-[15px] text-violet-800 leading-7">{value.bridge}</p>
            </div>
          )}
        </div>
      </div>
    ),

    // ── ⚖️ Comparison Table ─────────────────────────────────────────────────────
    comparisonBlock: ({ value }) => {
      const rows: any[] = value.rows || [];
      return (
        <div className="my-10 overflow-hidden rounded-xl shadow-md border border-slate-200">
          {value.title && (
            <div className="bg-slate-800 px-5 py-3.5 text-center">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{value.title}</span>
            </div>
          )}
          <div className="overflow-x-auto bg-white">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="bg-slate-100 px-5 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-left w-1/4 border-b-2 border-slate-200">
                    Dimension
                  </th>
                  <th className="bg-rose-600 px-5 py-4 text-[10px] font-black text-white uppercase tracking-widest text-center border-b-2 border-rose-700 w-[37.5%]">
                    ✗ {value.leftLabel || "Before"}
                  </th>
                  <th className="bg-emerald-600 px-5 py-4 text-[10px] font-black text-white uppercase tracking-widest text-center border-b-2 border-emerald-700 w-[37.5%]">
                    ✓ {value.rightLabel || "After"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row: any, i: number) => (
                  <tr key={i} className={`border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}`}>
                    <td className="px-5 py-4 font-bold text-slate-700 text-xs uppercase tracking-wide">{row.aspect}</td>
                    <td className="px-5 py-4 text-slate-600 text-center bg-rose-50/30">{row.left}</td>
                    <td className="px-5 py-4 text-slate-700 font-medium text-center bg-emerald-50/30">{row.right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    },

    // ── 📋 Step-by-Step Process ─────────────────────────────────────────────────
    stepBlock: ({ value }) => {
      const steps: any[] = value.steps || [];
      return (
        <div className="my-10 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {value.title && (
            <div className="bg-slate-800 px-6 py-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Process</p>
              <p className="font-black text-white text-base">{value.title}</p>
            </div>
          )}
          <div className="p-6 space-y-0">
            {steps.map((step: any, i: number) => (
              <div key={i} className="flex gap-5">
                {/* Vertical connector */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                    {step.number || i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-indigo-200 my-1 min-h-[2rem]" />
                  )}
                </div>
                {/* Content */}
                <div className={`pb-6 flex-1 min-w-0 ${i < steps.length - 1 ? "mb-0" : ""}`}>
                  <h4 className="font-black text-slate-900 text-base mb-1.5 mt-1.5">{step.title}</h4>
                  {step.description && (
                    <p className="text-[15px] text-slate-600 leading-7">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    },

    // ── ❓ Knowledge Check ──────────────────────────────────────────────────────
    knowledgeCheck: ({ value }) => (
      <div className="my-10 rounded-xl overflow-hidden shadow-md border border-amber-300">
        <div className="bg-amber-400 px-5 py-3.5 flex items-center gap-3">
          <span className="text-xl">🧠</span>
          <span className="text-[10px] font-black text-amber-900 uppercase tracking-[0.2em]">Knowledge Check</span>
        </div>
        <div className="bg-amber-50 px-6 py-6 space-y-5">
          <p className="text-[17px] font-bold text-amber-950 leading-7">{value.question}</p>
          {value.hint && (
            <p className="text-sm text-amber-700 italic">Hint: {value.hint}</p>
          )}
          <div className="border-t border-amber-200 pt-5">
            <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-2">Answer</p>
            <p className="text-[16px] text-amber-900 leading-7">{value.answer}</p>
          </div>
        </div>
      </div>
    ),

    // ── ✅ Key Takeaways ────────────────────────────────────────────────────────
    takeawayBlock: ({ value }) => {
      const points: string[] = value.points || [];
      return (
        <div className="my-10 rounded-xl overflow-hidden shadow-md border border-emerald-200">
          <div className="bg-emerald-700 px-5 py-3.5 flex items-center gap-3">
            <span className="text-xl">✅</span>
            <span className="text-[10px] font-black text-emerald-100 uppercase tracking-[0.2em]">
              {value.title || "Key Takeaways"}
            </span>
          </div>
          <div className="bg-emerald-50 px-6 py-5">
            <ul className="space-y-3">
              {points.map((point: string, i: number) => (
                <li key={i} className="flex gap-3 text-[15px] text-emerald-900 leading-7">
                  <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black">{i + 1}</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    },

    // ── ⚠️ Misconception Buster ─────────────────────────────────────────────────
    warningBlock: ({ value }) => (
      <div className="my-10 rounded-xl overflow-hidden shadow-md border border-slate-300">
        <div className="bg-rose-600 px-5 py-3.5 flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <span className="text-[10px] font-black text-rose-100 uppercase tracking-[0.2em]">Common Misconception</span>
        </div>
        <div className="divide-y divide-slate-200">
          <div className="bg-rose-50 px-6 py-4 flex gap-3">
            <span className="text-rose-500 font-black text-lg shrink-0 mt-0.5">✗</span>
            <p className="text-[15px] text-rose-900 leading-7 line-through decoration-rose-400">{value.misconception}</p>
          </div>
          <div className="bg-emerald-50 px-6 py-4 flex gap-3">
            <span className="text-emerald-600 font-black text-lg shrink-0 mt-0.5">✓</span>
            <p className="text-[15px] text-emerald-900 font-medium leading-7">{value.reality}</p>
          </div>
        </div>
      </div>
    ),

    video:   VideoBlock,
    youtube: VideoBlock,
    audio:   AudioBlock,
  },
};

export default function AcademyContent({ body }: { body: any }) {
  return <PortableText value={body} components={components} />;
}
