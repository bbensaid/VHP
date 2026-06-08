"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronDown, X, ArrowLeft } from "lucide-react";
import type { TrackWithProgress, Pillar } from "@/types/course";

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
      if (next.has(trackId)) next.delete(trackId);
      else next.add(trackId);
      return next;
    });
  }

  return (
    <aside className="flex flex-col w-64 min-w-[256px] border-r border-slate-200 bg-slate-50 overflow-y-auto" style={{ height: "100%" }}>
      {/* Back link */}
      <Link
        href="/academy/tracks"
        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 transition-colors text-indigo-700 font-semibold text-xs shrink-0 border-b border-indigo-100"
      >
        <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
        Back to Academy
      </Link>

      {/* Course title card */}
      <div className="m-3 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden shrink-0">
        <div className="bg-slate-900 px-4 py-4">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Course</p>
          <h2 className="text-sm font-bold text-white leading-snug">{courseTitle}</h2>
        </div>
      </div>

      {/* Progress */}
      <div className="mx-3 mb-3 px-3 py-2.5 bg-slate-100 rounded-lg shrink-0">
        <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
          <span>{Math.round(progressPercent)}% complete</span>
          <span>{completedLessons}/{totalLessons} lessons</span>
        </div>
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>
      <div className="border-b border-slate-200 shrink-0" />

      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden absolute top-3 right-3 p-1.5 rounded-md hover:bg-slate-200 text-slate-500"
          aria-label="Close navigation"
        >
          <X className="w-4 h-4" />
        </button>
      )}

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
                              ? "bg-sky-50 text-sky-900 font-semibold border-r-2 border-sky-500"
                              : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : isActive ? (
                            <div className="w-4 h-4 shrink-0 rounded-full bg-sky-500 border-2 border-sky-500 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
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
