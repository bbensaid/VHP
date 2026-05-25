"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ChevronDown } from "lucide-react";
import type { TrackWithProgress, Pillar } from "@/types/course";
import { CourseProgressBar } from "./CourseProgressBar";

const PILLAR_DOT: Record<Pillar, string> = {
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
}

export function CourseSidebar({
  tracks,
  currentLessonId,
  onSelectLesson,
  courseTitle,
  progressPercent,
  completedLessons,
  totalLessons,
}: CourseSidebarProps) {
  const [openTrackIds, setOpenTrackIds] = useState<Set<string>>(
    new Set([tracks[0]?.id])
  );

  function toggleTrack(trackId: string) {
    setOpenTrackIds((prev) => {
      const next = new Set(prev);
      next.has(trackId) ? next.delete(trackId) : next.add(trackId);
      return next;
    });
  }

  return (
    <aside className="flex flex-col w-72 min-w-[288px] h-full border-r border-slate-200 bg-slate-50 overflow-hidden">
      <div className="p-5 border-b border-slate-200 space-y-3">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">HTR Academy</p>
          <h2 className="text-base font-semibold text-slate-900 mt-1 leading-snug">{courseTitle}</h2>
        </div>
        <CourseProgressBar
          percent={progressPercent}
          completedLessons={completedLessons}
          totalLessons={totalLessons}
        />
      </div>

      <nav className="flex-1 overflow-y-auto py-2" aria-label="Course navigation">
        {tracks.map((track) => {
          const isOpen = openTrackIds.has(track.id);
          const trackDone =
            (track.progress?.completedLessonIds.length ?? 0) === track.lessons.length;

          return (
            <div key={track.id}>
              <button
                onClick={() => toggleTrack(track.id)}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
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
                    const isDone = lesson.progress?.status === "completed";
                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => onSelectLesson(lesson.id)}
                          className={`flex items-center gap-2 w-full pl-9 pr-4 py-2 text-sm transition-colors text-left ${
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
