"use client";

// Homepage hero: the five pillars in the book's execution sequence, one 2026
// briefing per slide. Content lives in lib/briefings; colours in pillars.ts;
// the diagram is the same FrameworkMapDiagram used on /about/framework.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import FrameworkMapDiagram, { PILLAR_QUESTION } from "@/components/framework/FrameworkMapDiagram";
import CitedText, { Cite } from "@/components/briefings/CitedText";
import { BRIEFINGS, citationOrder, type Briefing } from "@/lib/briefings/briefings";
import { SOURCES } from "@/lib/briefings/sources";
import { getPillar } from "@/lib/taxonomy/pillars";
import { getTool } from "@/lib/taxonomy/tools";

const SLIDE_MS = 10_000;

function formatAsOf(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

function chapterLabel(chs: string[]) {
  const nums = chs.map(Number);
  const contiguous = nums.every((n, i) => i === 0 || n === nums[i - 1] + 1);
  if (chs.length === 1) return `Ch ${chs[0]}`;
  return contiguous ? `Ch ${chs[0]}–${chs[chs.length - 1]}` : `Ch ${chs.join(", ")}`;
}

function shortPublisher(publisher: string) {
  // "Lukac PJ, et al. NEJM AI (summary: …)" → "Lukac et al., NEJM AI"
  const p = publisher.replace(/\s*\(summary:.*\)$/, "");
  const m = p.match(/^([A-ZÀ-ž][\wÀ-ž'-]+)\s+[A-Z]{1,3}(?:,| ).*?et al\.\s*(.*)$/);
  return m ? `${m[1]} et al., ${m[2]}` : p;
}

function Slide({ b, index, active }: { b: Briefing; index: number; active: boolean }) {
  const pillar = getPillar(b.pillar);
  const order = citationOrder(b);
  const numbers = Object.fromEntries(order.map((id, i) => [id, i + 1]));
  const toBriefing = (n: number) => `/briefings/${b.slug}#source-${n}`;
  const heroSources = order.filter((id) => !id.startsWith("book-"));
  const tool = getTool(b.tools[0]);
  const course = b.courses[0];

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${BRIEFINGS.length}: ${pillar.label}`}
      aria-hidden={!active}
      inert={!active}
      className={`[grid-area:1/1] transition-[opacity,visibility] duration-500 motion-reduce:transition-none ${active ? "opacity-100 visible" : "opacity-0 invisible"}`}
      style={{ ["--p" as string]: pillar.hexStrong }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-5 md:gap-8 items-center p-5 md:p-8 lg:p-10 pb-3 md:pb-4">
        <div className="min-w-0 order-2 md:order-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
            <span className="px-2 py-0.5 rounded text-[10.5px] font-black uppercase tracking-[0.14em] text-white" style={{ background: pillar.hexStrong }}>
              {pillar.label}
            </span>
            <span className="text-[13px] font-semibold" style={{ color: pillar.hexStrong }}>{PILLAR_QUESTION[b.pillar]}</span>
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide">As of {formatAsOf(b.asOf)}</span>
          </div>

          <h2 className="text-2xl md:text-[2rem] lg:text-[2.15rem] font-black leading-[1.12] tracking-tight text-slate-800 text-balance mb-3">
            {b.headline}
          </h2>
          <p className="text-[15px] md:text-base leading-relaxed text-slate-600 max-w-[60ch] mb-5">
            <CitedText text={b.dek} numbers={numbers} hrefFor={toBriefing} supClassName="text-slate-400" />
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 border-y border-slate-200 mb-5">
            {b.facts.map((f, i) => (
              <div key={f.value} className={`py-3 min-w-0 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-slate-200 sm:pl-4" : ""} sm:pr-4`}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-xl md:text-[1.4rem] font-extrabold tabular-nums tracking-tight leading-tight" style={{ color: pillar.hexStrong }}>
                    {f.value}
                    <Cite ns={f.cite.map((c) => numbers[c])} hrefFor={toBriefing} className="text-slate-400" />
                  </span>
                  <span className="block text-xs leading-snug text-slate-500 mt-1">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/briefings/${b.slug}`}
              className="px-4 py-2.5 md:px-5 rounded-lg text-sm font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
              style={{ background: pillar.hexStrong }}
            >
              Read the {pillar.label} briefing →
            </Link>
            <Link href={`/book#chapter-${b.chapters[0]}`} className="hidden sm:inline-flex px-3 py-2 rounded-lg text-[12.5px] font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300">
              <span className="text-slate-400 font-bold mr-1">Book</span>{chapterLabel(b.chapters)}
            </Link>
            <Link href={`/academy/tracks/${course.slug}`} className="hidden sm:inline-flex px-3 py-2 rounded-lg text-[12.5px] font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300">
              <span className="text-slate-400 font-bold mr-1">Course</span>{course.title.split(":")[0]}
            </Link>
            <Link href={tool.href} className="hidden lg:inline-flex px-3 py-2 rounded-lg text-[12.5px] font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300">
              <span className="text-slate-400 font-bold mr-1">Tool</span>{tool.label}
            </Link>
          </div>

          {/* The Equity Imperative, deliberately quiet (author, 2026-10-04). */}
          <p className="mt-4 text-[12.5px] font-light italic leading-snug text-slate-400">
            <span className="font-medium text-violet-400">Is it just?</span> {b.equityLine}
          </p>

          {/* Sources: always visible on desktop, one tap away on phones. */}
          <p className="hidden sm:block mt-2 text-[10.5px] leading-relaxed text-slate-400">
            Sources: {heroSources.map((id, i) => (
                <span key={id}>
                  {i > 0 && " · "}
                  <a href={SOURCES[id].url} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2 hover:text-slate-600">
                    [{numbers[id]}] {shortPublisher(SOURCES[id].publisher)}
                  </a>
                </span>
              ))}
          </p>
          <details className="sm:hidden mt-2">
            <summary className="text-[11px] text-slate-400 cursor-pointer select-none">Sources ({heroSources.length})</summary>
            <p className="text-[10.5px] leading-relaxed text-slate-400 mt-1">{heroSources.map((id, i) => (
                <span key={id}>
                  {i > 0 && " · "}
                  <a href={SOURCES[id].url} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2 hover:text-slate-600">
                    [{numbers[id]}] {shortPublisher(SOURCES[id].publisher)}
                  </a>
                </span>
              ))}</p>
          </details>
        </div>

        <div className="relative order-1 md:order-2 min-w-0 flex flex-col items-center">
          <FrameworkMapDiagram selected={b.pillar} flow={active} idPrefix={`hero-${b.pillar}`} className="w-full max-w-[300px] md:max-w-[440px] h-auto" />
          <p className="hidden md:block text-[10.5px] text-slate-400 text-center">The Five-Pillar Map, as on the book cover</p>
          <Link href="/book" aria-label="Transforming Healthcare, the book" className="hidden md:block absolute right-0 bottom-6 w-14 rounded-sm overflow-hidden shadow-lg ring-1 ring-slate-900/10 hover:-translate-y-0.5 transition-transform">
            <Image src="/book-cover.jpg" alt="" width={112} height={168} className="w-full h-auto" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PillarHero() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverOrFocus, setHoverOrFocus] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tick, setTick] = useState(0); // restarts the progress bar
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback((i: number) => {
    setIndex((i + BRIEFINGS.length) % BRIEFINGS.length);
    setTick((t) => t + 1);
  }, []);

  const running = !userPaused && !hoverOrFocus && !reducedMotion;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(index + 1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [running, index, tick, go]);

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="The five pillars in 2026"
      className="relative w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 shadow-sm mb-6 md:mb-10"
      onMouseEnter={() => setHoverOrFocus(true)}
      onMouseLeave={() => setHoverOrFocus(false)}
      onFocus={() => setHoverOrFocus(true)}
      onBlur={(e) => { if (!rootRef.current?.contains(e.relatedTarget as Node)) setHoverOrFocus(false); }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
      }}
    >
      <h1 className="sr-only">The five pillars of health transformation, in 2026</h1>

      <div className="grid" aria-live={running ? "off" : "polite"}>
        {BRIEFINGS.map((b, i) => (
          <Slide key={b.slug} b={b} index={i} active={i === index} />
        ))}
      </div>

      {/* Sequence navigation: the dots are the book's execution order. */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-8 lg:px-10 py-3 border-t border-slate-200/70">
        <ol className="flex flex-wrap gap-1" aria-label="Execution sequence">
          {BRIEFINGS.map((b, i) => {
            const p = getPillar(b.pillar);
            const isOn = i === index;
            const done = i < index;
            return (
              <li key={b.slug}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={isOn ? "step" : undefined}
                  aria-label={`${i + 1}. ${p.label}`}
                  className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11.5px] font-bold transition-colors ${isOn ? "bg-white text-slate-800 ring-1 ring-slate-200" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <span
                    className="inline-grid place-items-center w-[18px] h-[18px] rounded-full text-[10px] text-white"
                    style={{ background: isOn || done ? p.hexStrong : "#cbd5e1", opacity: done ? 0.55 : 1 }}
                  >
                    {i + 1}
                  </span>
                  <span className="hidden md:inline">{p.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={() => setUserPaused((v) => !v)} aria-label={userPaused ? "Play slideshow" : "Pause slideshow"} className="p-1.5 md:p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300">
            {userPaused ? <PlayIcon className="w-4 h-4" /> : <PauseIcon className="w-4 h-4" />}
          </button>
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous pillar" className="p-1.5 md:p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next pillar" className="p-1.5 md:p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300">
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress: only while auto-advancing */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent" aria-hidden>
        {running && (
          <div
            key={`${index}-${tick}`}
            className="h-full origin-left"
            style={{ background: getPillar(BRIEFINGS[index].pillar).hex, animation: `pillar-hero-progress ${SLIDE_MS}ms linear forwards` }}
          />
        )}
      </div>
      <style>{`@keyframes pillar-hero-progress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}
