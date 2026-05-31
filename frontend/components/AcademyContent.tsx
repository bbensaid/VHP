"use client";

import { useState } from "react";

// ── Interactive Knowledge Check widget ────────────────────────────────────────
function KnowledgeCheckWidget({
  question,
  hint,
  answer,
  explanation,
  options,
}: {
  question: string;
  hint?: string;
  answer?: string;
  explanation?: string;
  options?: Array<{ _key: string; text: string; isCorrect: boolean }>;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const correctKey = options?.find((o) => o.isCorrect)?._key;
  const isCorrect = selected !== null && selected === correctKey;

  return (
    <div className="my-10 rounded-xl border border-amber-200 overflow-hidden shadow-sm">
      <div className="bg-amber-100 px-5 py-2.5 flex items-center gap-2 border-b border-amber-200">
        <span className="text-base">🧠</span>
        <span className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em]">Knowledge Check</span>
      </div>
      <div className="bg-white px-6 py-6 space-y-5">
        <p className="text-[17px] font-bold text-slate-800 leading-7">{question}</p>
        {hint && <p className="text-sm text-amber-700 italic">Hint: {hint}</p>}

        {options && options.length > 0 ? (
          <div className="space-y-2.5">
            {options.map((opt) => {
              const isSelected = selected === opt._key;
              const showResult = selected !== null;
              const isRight = opt.isCorrect;
              let style = "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer";
              if (showResult && isSelected && isRight)  style = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold cursor-default";
              if (showResult && isSelected && !isRight) style = "border-rose-400 bg-rose-50 text-rose-900 cursor-default";
              if (showResult && !isSelected && isRight) style = "border-emerald-300 bg-emerald-50/50 text-emerald-800 cursor-default";
              if (showResult && !isSelected && !isRight) style = "border-slate-100 bg-white text-slate-400 cursor-default";
              return (
                <button
                  key={opt._key}
                  onClick={() => { if (!selected) setSelected(opt._key); }}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 text-[15px] leading-6 transition-all ${style}`}
                >
                  {showResult && isRight && <span className="mr-2 text-emerald-600 font-black">✓</span>}
                  {showResult && isSelected && !isRight && <span className="mr-2 text-rose-500 font-black">✗</span>}
                  {opt.text}
                </button>
              );
            })}
            {selected && (explanation || answer) && (
              <div className="mt-4 pt-4 border-t border-amber-100">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-2">
                  {isCorrect ? "✓ Correct!" : "Not quite —"} Explanation
                </p>
                <p className="text-[15px] text-slate-700 leading-7">{explanation || answer}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="border-t border-amber-100 pt-5">
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm rounded-lg transition-colors"
              >
                Reveal Answer
              </button>
            ) : (
              <>
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-2">Answer</p>
                <p className="text-[16px] text-slate-700 leading-7">{answer}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// components/AcademyContent.tsx
// Educational PortableText renderer for Academy course modules.
// Every block type is designed to serve the learner — not the publisher.
//
// COLOR SYSTEM — each color family has a semantic purpose:
//   Indigo  → Core theory & key concepts (understanding)
//   Teal    → Real-world application & examples (practice)
//   Violet  → Mental models & analogies (connection)
//   Amber   → Memory & self-testing (retention)
//   Emerald → Achievement & synthesis (takeaways)
//   Rose    → Correction & misconceptions (caution)
//   Slate   → Neutral structure: process steps, data tables
//
// SHAPE SYSTEM — 6 distinct visual patterns:
//   1. Left-border accent   → Key Concept, Example, Takeaways
//   2. Floating pill badge  → Remember This
//   3. Pure typography      → Expert Quote, Analogy
//   4. Light-band card      → Knowledge Check
//   5. Structural/Data      → Comparison Table, Step Process
//   6. Two-tone split       → Misconception / Warning

import { PortableText, PortableTextComponents } from "next-sanity";
import type { PortableTextMarkComponentProps, PortableTextBlock } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import VideoBlock from "@/components/VideoBlock";
import AudioBlock from "@/components/AudioBlock";

const builder = imageUrlBuilder(client);
const urlFor = (source: Parameters<typeof builder.image>[0]) => builder.image(source);
const slugify = (t: string) => t.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

type MarkProps = PortableTextMarkComponentProps;
type BlockValue = PortableTextBlock & { children?: Array<{ text: string }> };

// ── Trend indicators ───────────────────────────────────────────────────────────
const trendIcon: Record<string, { icon: string; color: string }> = {
  up:      { icon: "↑", color: "text-emerald-500" },
  down:    { icon: "↓", color: "text-red-500"     },
  neutral: { icon: "→", color: "text-slate-400"   },
};

// ── Stat card accent colors — light tint, dark colored numbers ───────────────
const statColors = [
  { bg: "bg-indigo-50",  border: "border-indigo-200",  num: "text-indigo-700",  label: "text-indigo-900",  sub: "text-indigo-500"  },
  { bg: "bg-emerald-50", border: "border-emerald-200", num: "text-emerald-700", label: "text-emerald-900", sub: "text-emerald-600" },
  { bg: "bg-amber-50",   border: "border-amber-200",   num: "text-amber-700",   label: "text-amber-900",   sub: "text-amber-600"   },
  { bg: "bg-rose-50",    border: "border-rose-200",    num: "text-rose-700",    label: "text-rose-900",    sub: "text-rose-500"    },
];

const components: PortableTextComponents = {
  marks: {
    strong:           ({ children }: MarkProps) => <strong className="font-bold text-slate-900">{children}</strong>,
    em:               ({ children }: MarkProps) => <em className="italic text-slate-600">{children}</em>,
    underline:        ({ children }: MarkProps) => <span className="underline underline-offset-2">{children}</span>,
    "strike-through": ({ children }: MarkProps) => <span className="line-through text-slate-400">{children}</span>,
    link: ({ value, children }: PortableTextMarkComponentProps<{ _type: string; href?: string }>) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
         className="text-indigo-600 font-semibold underline underline-offset-2 hover:text-indigo-800 transition-colors">
        {children}
      </a>
    ),
  },

  block: {
    normal: ({ children }) => (
      <p className="text-[15px] text-slate-700 leading-7 mb-5">{children}</p>
    ),

    h1: ({ children, value }) => {
      const text = (value as BlockValue).children?.map((c) => c.text).join("") || "";
      return <h1 id={slugify(text)} className="scroll-mt-24 text-2xl font-black text-slate-900 mt-10 mb-4 leading-tight">{children}</h1>;
    },

    // Section opener — full visual break, feels like a chapter
    h2: ({ children, value }) => {
      const text = (value as BlockValue).children?.map((c) => c.text).join("") || "";
      return (
        <div className="mt-16 mb-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-indigo-300" />
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.25em] px-2">Section</span>
            <div className="h-px flex-1 bg-indigo-300" />
          </div>
          <h2 id={slugify(text)} className="scroll-mt-24 text-xl font-black text-slate-900 leading-snug border-l-4 border-indigo-500 pl-4">
            {children}
          </h2>
        </div>
      );
    },

    h3: ({ children, value }) => {
      const text = (value as BlockValue).children?.map((c) => c.text).join("") || "";
      return (
        <h3 id={slugify(text)} className="scroll-mt-24 flex items-center gap-2.5 text-sm font-black text-slate-700 uppercase tracking-widest mt-10 mb-4">
          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-sm shrink-0" />{children}
        </h3>
      );
    },

    h4: ({ children, value }) => {
      const text = (value as BlockValue).children?.map((c) => c.text).join("") || "";
      return <h4 id={slugify(text)} className="scroll-mt-24 text-base font-bold text-slate-800 mt-8 mb-3">{children}</h4>;
    },

    // ── Pattern 1: Left-border accent ─────────────────────────────────────────
    // 💡 Key Concept — indigo left border, no dark header bar
    callout: ({ children }) => (
      <div className="my-10 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-xl px-6 py-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base leading-none">💡</span>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Key Concept</span>
        </div>
        <div className="text-[16px] text-indigo-950 leading-8 font-medium">{children}</div>
      </div>
    ),

    // ── Pattern 2: Floating pill badge ────────────────────────────────────────
    // 📌 Remember This — badge floats above card top edge
    highlight: ({ children }) => (
      <div className="my-12 relative pt-5">
        <div className="absolute -top-3 left-5 inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-sm">
          <span>📌</span> Remember This
        </div>
        <div className="border border-amber-200 bg-amber-50 rounded-xl px-6 py-5">
          <div className="text-[16px] text-amber-950 leading-8 font-medium">{children}</div>
        </div>
      </div>
    ),

    // ── Pattern 3: Pullquote — centered, visually isolated ───────────────────
    quote: ({ children }) => (
      <div className="my-12 mx-auto max-w-2xl">
        <div className="relative bg-slate-900 rounded-2xl px-10 py-8 text-center shadow-xl">
          <span className="absolute top-4 left-6 text-[4rem] font-black text-indigo-400 leading-none select-none pointer-events-none opacity-60">&ldquo;</span>
          <p className="relative z-10 text-lg text-white italic leading-9 font-medium">{children}</p>
          <span className="absolute bottom-4 right-6 text-[4rem] font-black text-indigo-400 leading-none select-none pointer-events-none opacity-60">&rdquo;</span>
        </div>
      </div>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="my-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="my-4 space-y-2">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-[15px] text-slate-700 leading-7">
        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="flex gap-3 text-[15px] text-slate-700 leading-7">
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
        <figure className="my-12 max-w-2xl mx-auto">
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
        <div className="my-10 overflow-hidden rounded-xl border border-slate-300 shadow-md max-w-2xl mx-auto">
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
      type Stat = { value: string; label: string; context?: string; trend?: string };
      const stats: Stat[] = value.stats || [];
      if (stats.length === 0) return null;
      return (
        <div className="my-12">
          {value.title && (
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 text-center">{value.title}</p>
          )}
          <div className={`grid gap-3 ${stats.length === 2 ? "grid-cols-2" : stats.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
            {stats.map((stat, i) => {
              const c = statColors[i % statColors.length];
              const trend = stat.trend ? trendIcon[stat.trend] : null;
              return (
                <div key={stat.label} className={`${c.bg} border ${c.border} rounded-xl p-4 flex flex-col gap-1.5 min-w-0`}>
                  <div className={`text-2xl font-black ${c.num} leading-none flex items-start gap-1.5 break-all`}>
                    {stat.value}
                    {trend && <span className={`text-base ${trend.color} mt-0.5`}>{trend.icon}</span>}
                  </div>
                  <div className={`text-xs font-bold ${c.label} leading-snug`}>{stat.label}</div>
                  {stat.context && (
                    <div className={`text-[11px] ${c.sub} leading-relaxed mt-0.5`}>{stat.context}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    },

    // ── Pattern 1: Left-border accent (teal) ──────────────────────────────────
    // 🌍 Real-World Example — teal left border, editorial structure
    exampleBlock: ({ value }) => {
      const body = value.content || value.body || "";
      return (
        <div className="my-10 border-l-4 border-teal-500 bg-teal-50 rounded-r-xl px-6 py-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base leading-none">🌍</span>
            <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">
              {value.eyebrow || "Real-World Example"}
            </span>
          </div>
          {value.title && (
            <h4 className="font-black text-teal-900 text-lg leading-snug mb-3">{value.title}</h4>
          )}
          {body && (
            <div className="space-y-2">
              {body.split("\n").filter(Boolean).map((line: string, i: number) => (
                <p key={i} className="text-[15px] text-teal-800 leading-7">{line}</p>
              ))}
            </div>
          )}
          {value.outcome && (
            <div className="flex items-start gap-2.5 mt-4 pt-3 border-t border-teal-200">
              <span className="text-emerald-500 font-black text-lg shrink-0 mt-0.5">→</span>
              <p className="text-sm font-bold text-teal-900 leading-relaxed">{value.outcome}</p>
            </div>
          )}
          {value.source && (
            <p className="text-xs text-teal-600 italic mt-3">Source: {value.source}</p>
          )}
        </div>
      );
    },

    // ── Pattern 3: Analogy — violet tinted card with large quote mark ────────
    analogyBlock: ({ value }) => (
      <div className="my-12 bg-violet-50 border border-violet-200 rounded-xl px-7 py-6 shadow-sm relative overflow-hidden">
        <span className="absolute -top-2 -left-1 text-[7rem] font-black text-violet-200 leading-none select-none pointer-events-none">&ldquo;</span>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base leading-none">🔗</span>
            <span className="text-[10px] font-black text-violet-600 uppercase tracking-[0.2em]">Analogy</span>
            {value.concept && (
              <span className="text-xs text-violet-500 font-medium">— {value.concept}</span>
            )}
          </div>
          {value.analogy && (
            <p className="text-[16px] text-violet-900 italic leading-8 font-medium mb-3">{value.analogy}</p>
          )}
          {value.bridge && (
            <div className="mt-4 bg-white border border-violet-200 rounded-lg px-5 py-4">
              <p className="text-[14px] text-violet-800 leading-7">{value.bridge}</p>
            </div>
          )}
        </div>
      </div>
    ),

    // ── Pattern 5: Structural / Data ──────────────────────────────────────────
    // ⚖️ Comparison — two-column side-by-side with bullet points
    comparisonBlock: ({ value }) => {
      const left:  { label?: string; points?: string[] } = value.left  || {};
      const right: { label?: string; points?: string[] } = value.right || {};
      const leftPts:  string[] = left.points  || [];
      const rightPts: string[] = right.points || [];
      return (
        <div className="my-10 overflow-hidden rounded-xl shadow-md border border-slate-200">
          {value.title && (
            <div className="bg-slate-700 px-5 py-3 text-center">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{value.title}</span>
            </div>
          )}
          <div className="grid grid-cols-2">
            {/* Left column */}
            <div className="bg-rose-50 border-r border-slate-200 px-5 py-5">
              <p className="text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] mb-4">
                {left.label || "Option A"}
              </p>
              <ul className="space-y-2.5">
                {leftPts.map((pt, i) => (
                  <li key={i} className="flex gap-2.5 text-[14px] text-rose-900 leading-6">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            {/* Right column */}
            <div className="bg-emerald-50 px-5 py-5">
              <p className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] mb-4">
                {right.label || "Option B"}
              </p>
              <ul className="space-y-2.5">
                {rightPts.map((pt, i) => (
                  <li key={i} className="flex gap-2.5 text-[14px] text-emerald-900 leading-6">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    },

    // ── Pattern 5: Structural / Data ──────────────────────────────────────────
    // 📋 Step-by-Step Process — lighter header, vertical step flow preserved
    stepBlock: ({ value }) => {
      type Step = { number?: number; title: string; description?: string };
      const steps: Step[] = value.steps || [];
      return (
        <div className="my-10 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {value.title && (
            <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-4">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-0.5">Process</p>
              <p className="font-black text-indigo-900 text-base">{value.title}</p>
            </div>
          )}
          <div className="p-6 space-y-0">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-5">
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

    // ── Pattern 4: Light-band card ────────────────────────────────────────────
    // ❓ Knowledge Check — interactive multiple-choice quiz
    knowledgeCheck: ({ value }) => {
      const opts: Array<{ _key: string; text: string; isCorrect: boolean }> = value.options || [];
      const hasOptions = opts.length > 0;
      return (
        <KnowledgeCheckWidget
          question={value.question}
          hint={value.hint}
          answer={value.answer}
          explanation={value.explanation}
          options={hasOptions ? opts : undefined}
        />
      );
    },

    // ── Pattern 1: Left-border accent (emerald) ───────────────────────────────
    // ✅ Key Takeaways — emerald left border, summary list
    takeawayBlock: ({ value }) => {
      const points: string[] = value.points || [];
      return (
        <div className="my-10 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-xl px-6 py-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base leading-none">✅</span>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">
              {value.title || "Key Takeaways"}
            </span>
          </div>
          <ul className="space-y-3">
            {points.map((point, i) => (
              <li key={point} className="flex gap-3 text-[15px] text-emerald-900 leading-7">
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-black">{i + 1}</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      );
    },

    // ── Pattern 6: Warning / Important Note ──────────────────────────────────
    warningBlock: ({ value }) => {
      const title   = value.title   || value.misconception || "Important";
      const message = value.message || value.reality       || "";
      return (
        <div className="my-10 rounded-xl overflow-hidden border border-amber-300 shadow-sm">
          <div className="bg-amber-50 px-6 py-3 flex items-center gap-2 border-b border-amber-200">
            <span className="text-base leading-none">⚠️</span>
            <span className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em]">{title}</span>
          </div>
          <div className="bg-white px-6 py-5">
            <p className="text-[15px] text-slate-700 leading-7">{message}</p>
          </div>
        </div>
      );
    },

    video:   VideoBlock,
    youtube: VideoBlock,
    audio:   AudioBlock,
  },
};

export default function AcademyContent({ body }: { body: PortableTextBlock[] }) {
  // Pre-compute section numbers from the body array so SSR and client agree
  const sectionNumbers: Record<string, number> = {};
  let n = 0;
  for (const block of body) {
    const b = block as PortableTextBlock & { style?: string; _key?: string };
    if (b.style === "h2") {
      const text = (b as BlockValue).children?.map((c) => c.text).join("") || "";
      if (text.toLowerCase() !== "sources") {
        n += 1;
        if (b._key) sectionNumbers[b._key] = n;
      }
    }
  }

  const numberedComponents: PortableTextComponents = {
    ...components,
    block: {
      ...(components.block as Record<string, unknown>),
      h2: ({ children, value }) => {
        const text = (value as BlockValue).children?.map((c) => c.text).join("") || "";
        if (text.toLowerCase() === "sources") {
          return (
            <div className="mt-14 mb-3 pt-6 border-t border-slate-200">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Sources</p>
            </div>
          );
        }
        const num = sectionNumbers[(value as PortableTextBlock & { _key?: string })._key || ""] ?? "";
        return (
          <div className="mt-16 mb-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-indigo-300" />
              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.25em] px-2">
                Section #{num}
              </span>
              <div className="h-px flex-1 bg-indigo-300" />
            </div>
            <h2 id={slugify(text)} className="scroll-mt-24 text-xl font-black text-slate-900 leading-snug border-l-4 border-indigo-500 pl-4">
              {children}
            </h2>
          </div>
        );
      },
    },
  };

  return <PortableText value={body} components={numberedComponents} />;
}
