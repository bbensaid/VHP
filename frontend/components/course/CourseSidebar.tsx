"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronDown, X, ArrowLeft } from "lucide-react";
import type { TrackWithProgress, Pillar } from "@/types/course";
import { CourseProgressBar } from "./CourseProgressBar";

const PILLAR_DOT: Record<Pillar, string> = {
  general:    "bg-slate-400",
  policy:     "bg-blue-600",
  technology: "bg-emerald-600",
  economics:  "bg-amber-600",
  clinical:   "bg-pink-600",
  equity:     "bg-purple-600",
  operations: "bg-green-600",
};

interface CourseSidebarProps {
  tracks: TrackWithProgress[];
  currentLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  courseTitle: string;
  courseSubtitle: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  completedIds: Set<string>;
  onClose?: () => void;
}

export function CourseSidebar({
  tracks,
  currentLessonId,
  onSelectLesson,
  courseTitle,
  progressPercent,
  completedLessons,
  totalLessons,
  completedIds,
  onClose,
}: CourseSidebarProps) {
  const trackOfCurrentLesson = tracks.find((t) =>
    t.lessons.some((l) => l.id === currentLessonId)
  );

  const [openTrackIds, setOpenTrackIds] = useState<Set<string>>(
    new Set([trackOfCurrentLesson?.id ?? tracks[0]?.id])
  );

  // When the current lesson changes, ensure its track is expanded.
  useEffect(() => {
    if (trackOfCurrentLesson) {
      setOpenTrackIds((prev) => {
        if (prev.has(trackOfCurrentLesson.id)) return prev;
        const next = new Set(prev);
        next.add(trackOfCurrentLesson.id);
        return next;
      });
    }
  }, [trackOfCurrentLesson]);

  function toggleTrack(trackId: string) {
    setOpenTrackIds((prev) => {
      const next = new Set(prev);
      next.has(trackId) ? next.delete(trackId) : next.add(trackId);
      return next;
    });
  }

  return (
    <aside className="flex flex-col w-64 min-w-[256px] border-r border-slate-200 bg-slate-50 overflow-y-auto" style={{ height: "100%" }}>
      <Link
        href="/academy/tracks"
        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 transition-colors text-indigo-700 font-semibold text-xs shrink-0 border-b border-indigo-100"
      >
        <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
        Back to Academy
      </Link>
      <div className="p-5 border-b border-slate-200 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 leading-snug">{courseTitle}</h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden mt-0.5 p-1.5 rounded-md hover:bg-slate-200 text-slate-500 shrink-0"
              aria-label="Close navigation"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <CourseProgressBar
          percent={progressPercent}
          completedLessons={completedLessons}
          totalLessons={totalLessons}
        />
      </div>

      <nav className="py-2" aria-label="Course navigation">
        {tracks.map((track) => {
          const isOpen = openTrackIds.has(track.id);
          const trackDone = track.lessons.every((l) => completedIds.has(l.id));

          return (
            <div key={track.id}>
              <button
                onClick={() => toggleTrack(track.id)}
                className="flex items-center gap-2 w-full px-4 py-2 text-xs font-medium text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
                aria-expanded={isOpen}
              >
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${PILLAR_DOT[track.pillar]}`} />
                <span className="text-left leading-snug flex-1">{track.title}</span>
                {trackDone && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <ul role="list">
                  {track.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLessonId;
                    const isDone = completedIds.has(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => onSelectLesson(lesson.id)}
                          ref={isActive ? (el) => el?.scrollIntoView({ block: "nearest" }) : null}
                          className={`flex items-center gap-2 w-full pl-8 pr-3 py-1.5 text-xs transition-colors text-left ${
                            isActive
                              ? "bg-white text-slate-900 font-semibold"
                              : "text-slate-500 hover:bg-white hover:text-slate-800"
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 shrink-0 opacity-40" />
                          )}
                          <span className="flex-1 leading-snug">{lesson.title}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded bg-slate-200 text-slate-500 shrink-0">
                            {lesson.estimatedMinutes}m
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
