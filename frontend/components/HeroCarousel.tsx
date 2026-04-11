"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface LeadStory {
  title: string;
  summary?: string;
  publishedAt?: string;
  slug?: string;
  pillar?: string;
}

interface HeroCarouselProps {
  leadStory: LeadStory | null;
}

export default function HeroCarousel({ leadStory }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showRHTPModal, setShowRHTPModal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Define our slides configuration
  const slides = [
    { id: "lead", type: "story" },
    { id: "visual", type: "visual" },
    { id: "academy", type: "promo" },
    { id: "rhtp", type: "program" },
  ];

  // Clone the first slide to create the infinite loop illusion
  const extendedSlides = [...slides, { ...slides[0], id: "lead-clone" }];

  const nextSlide = useCallback(() => {
    if (currentIndex >= extendedSlides.length - 1) return;
    setCurrentIndex((prev) => prev + 1);
  }, [currentIndex, extendedSlides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Handle the "Snap Back" from Clone to Start
  useEffect(() => {
    if (currentIndex === slides.length) {
      // We reached the clone. Wait for the transition to finish (1000ms), then snap instantly to 0.
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, slides.length]);

  // Re-enable transition after snapping
  useEffect(() => {
    if (currentIndex === 0 && !isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning]);

  // Auto-advance logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 10000); // 8 seconds per slide
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 shadow-sm group mb-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* SLIDES TRACK */}
      <div
        className={`flex h-full ${isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="w-full shrink-0 p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative"
          >
            {/* --- SLIDE 1: LEAD STORY --- */}
            {slide.type === "story" && (
              <div className="max-w-3xl">
                {leadStory ? (
                  <>
                    <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white bg-indigo-600 shadow-sm">
                        Deep Dive
                      </span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {leadStory.pillar || "Analysis"}
                      </span>
                    </div>
                    <h1 className="ty-h1 font-black text-slate-700 leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                      {leadStory.title}
                    </h1>
                    <p className="ty-hero text-slate-600 leading-relaxed mb-8 line-clamp-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                      {leadStory.summary}
                    </p>
                    <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                      <Link
                        href={`/advisory/reports`}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
                      >
                        Read Full Analysis
                      </Link>
                      <span className="text-xs font-bold text-slate-400">
                        By HTR Intelligence
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-slate-400">Loading Intelligence...</div>
                )}
              </div>
            )}

            {/* --- SLIDE 2: VISUAL INSIGHT (Existing Card) --- */}
            {slide.type === "visual" && (
              <div className="w-full h-full flex flex-col justify-center">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="font-black text-slate-700 text-lg uppercase tracking-tight flex items-center gap-2">
                      <span className="text-2xl">📊</span> Visual Insight
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-slate-500">
                        Data Source: HTR Proprietary Index • Q4 2025
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-3/5 h-64 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center relative overflow-hidden group/chart cursor-pointer">
                    <Link
                      href="/htr-index"
                      className="absolute inset-0 z-10"
                      aria-label="View HTR Index"
                    ></Link>
                    <div className="flex items-end gap-2 h-32 opacity-80 group-hover/chart:scale-105 transition-transform duration-500">
                      <div className="w-6 h-12 bg-indigo-200 rounded-t-sm"></div>
                      <div className="w-6 h-16 bg-indigo-300 rounded-t-sm"></div>
                      <div className="w-6 h-24 bg-indigo-400 rounded-t-sm"></div>
                      <div className="w-6 h-32 bg-indigo-600 rounded-t-sm"></div>
                      <div className="w-6 h-28 bg-indigo-500 rounded-t-sm"></div>
                    </div>
                    <p className="absolute bottom-3 right-3 text-[10px] text-slate-400 font-mono">
                      FIG 1.2
                    </p>
                  </div>
                  <div className="w-full md:w-2/5">
                    <h4 className="font-bold text-slate-700 text-2xl mb-3">
                      OpEx vs. Volume
                    </h4>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Operating expenses have decoupled from patient volume,
                      creating a structural deficit across health markets nationwide.
                    </p>
                    <Link
                      href="/htr-index"
                      className="text-sm font-bold text-indigo-600 flex items-center gap-1 hover:underline"
                    >
                      View Methodology &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* --- SLIDE 3: ACADEMY PROMO --- */}
            {slide.type === "promo" && (
              <div className="w-full h-full flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest">
                    New Course
                  </div>
                  <h2 className="ty-h1 font-black text-slate-700">
                    Executive Masterclass: Value-Based Care
                  </h2>
                  <p className="ty-hero text-slate-600">
                    Join 500+ healthcare leaders in our flagship certification
                    program. Learn the economics of risk adjustment and
                    population health.
                  </p>
                  <Link
                    href="/academy/courses"
                    className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors"
                  >
                    Explore Syllabus
                  </Link>
                </div>
                <div className="w-full md:w-1/3 aspect-square bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100">
                  <span className="text-6xl">🎓</span>
                </div>
              </div>
            )}

            {/* --- SLIDE 4: RHTP CASE STUDY --- */}
            {slide.type === "program" && (
              <div className="w-full h-full flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-widest">
                      Case Study
                    </div>
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest">
                      Federal Initiative · CMS
                    </div>
                  </div>
                  <h2 className="ty-h1 font-black text-slate-700">
                    Rural Health Transformation Program
                  </h2>
                  <p className="ty-hero text-slate-600">
                    How a landmark CMS initiative is stabilizing rural safety-net
                    hospitals through global budgets and regional collaboration —
                    and what it reveals about scaling value-based care nationwide.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/dashboard"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                    >
                      Explore the Case Study
                    </Link>
                    <button
                      onClick={() => setShowRHTPModal(true)}
                      className="inline-block bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                    >
                      Program Overview
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/4 aspect-square bg-white rounded-full flex items-center justify-center border-4 border-white shadow-xl p-9">
                  <Image
                    src="/rhtp-icon.png"
                    alt="RHTP Logo"
                    width={140}
                    height={140}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-6 right-8 flex items-center gap-4 z-20">
        {/* Pagination Dots */}
        <div className="flex gap-2 mr-4">
          {slides.map(
            (
              _,
              idx // Use original slides for dots
            ) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ||
                  (currentIndex === slides.length && idx === 0)
                    ? "w-8 bg-indigo-600"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            )
          )}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/80 backdrop-blur border border-slate-200 hover:bg-white hover:border-indigo-300 transition-all text-slate-600 hover:text-indigo-600"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/80 backdrop-blur border border-slate-200 hover:bg-white hover:border-indigo-300 transition-all text-slate-600 hover:text-indigo-600"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-200 z-10">
        <div
          key={currentIndex}
          className="h-full bg-slate-400 origin-left"
          style={{
            animation: "progress 10000ms linear forwards",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        />
      </div>
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {/* RHTP MODAL */}
      {showRHTPModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
          onClick={() => setShowRHTPModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowRHTPModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-widest">
                    Case Study
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest">
                    CMS Federal Initiative
                  </div>
                </div>
                <h2 className="text-3xl font-black text-slate-900">
                  Rural Health Transformation Program (RHTP)
                </h2>
              </div>
              <div className="prose prose-slate">
                <p className="ty-hero text-slate-600 leading-relaxed">
                  The Rural Health Transformation Program (RHTP) is a landmark
                  CMS initiative designed to stabilize the rural safety net
                  through global budgeting and care delivery reform.
                </p>
                <h3 className="ty-h3 font-bold text-slate-900 mt-6 mb-2">
                  Key Program Pillars
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>
                    <strong>Global Budgets:</strong> Moving hospitals away from
                    fee-for-service to predictable, prospective payments.
                  </li>
                  <li>
                    <strong>Regional Collaboration:</strong> Incentivizing
                    "Hub-and-Spoke" networks to share administrative and
                    clinical resources.
                  </li>
                  <li>
                    <strong>Service Line Optimization:</strong> Aligning service
                    offerings with community needs (e.g., expanding primary
                    care, reducing low-volume inpatient).
                  </li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
                  <h4 className="font-bold text-blue-900 mb-1">
                    Why it matters
                  </h4>
                  <p className="text-sm text-blue-800">
                    Since 2010, over 140 rural hospitals have closed. RHTP
                    provides the financial stability and technical assistance
                    needed to keep doors open and care local.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowRHTPModal(false)}
                  className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
