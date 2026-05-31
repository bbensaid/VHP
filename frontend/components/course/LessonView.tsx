"use client";

import { CheckCircle2, Clock } from "lucide-react";
import type { LessonWithProgress } from "@/types/course";
import { PillarBadge } from "./PillarBadge";
import { ContentBlockRenderer } from "./ContentBlockRenderer";
import { LessonQuiz } from "./LessonQuiz";
import AcademyContent from "@/components/AcademyContent";
import type { PortableTextBlock } from "@portabletext/react";

interface LessonViewProps {
  lesson: LessonWithProgress;
  onMarkComplete: (lessonId: string) => void;
  onQuizPass: (lessonId: string, score: number) => void;
  onAudioUpload?: (lessonId: string, file: File, slotKey: string) => Promise<string>;
  isCompleted?: boolean;
}

export function LessonView({ lesson, onMarkComplete, onQuizPass, onAudioUpload, isCompleted = false }: LessonViewProps) {

  return (
    <article className="w-full pb-16 font-sans">
      <div className="w-full space-y-6">
        <header className="space-y-3 pt-2">
          <PillarBadge pillar={lesson.pillar} />
          <h1 className="text-3xl font-black text-slate-900 leading-tight">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {lesson.estimatedMinutes} min
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </span>
            )}
          </div>
          <p className="text-base text-slate-600 leading-relaxed">{lesson.summary}</p>
        </header>

        {lesson.objectives.length > 0 && (
          <section aria-label="Learning objectives" className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 space-y-3">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Learning Objectives</h2>
            <ul className="space-y-2.5">
              {lesson.objectives.map((obj) => (
                <li key={obj.id} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="text-indigo-900 leading-relaxed">{obj.text}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

      {(() => {
        // Priority 1: sanityBody injected at page load from Sanity CMS
        if (lesson.sanityBody && lesson.sanityBody.length > 0) {
          return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-8 py-10 sm:px-12 sm:py-12">
              <AcademyContent body={lesson.sanityBody as PortableTextBlock[]} />
            </div>
          );
        }
        // Priority 2: legacy sanity_portable_text block in content_blocks
        const sanityBlock = lesson.contentBlocks.find(b => b.type === "sanity_portable_text") as { type: "sanity_portable_text"; body: unknown[] } | undefined;
        if (sanityBlock) {
          return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-8 py-10 sm:px-12 sm:py-12">
              <AcademyContent body={sanityBlock.body as PortableTextBlock[]} />
            </div>
          );
        }
        // Priority 3: legacy content_blocks (Supabase-stored)
        return (
          <div className="space-y-8">
            {lesson.contentBlocks.map((block, i) => (
              <ContentBlockRenderer
                key={i}
                block={block}
                lessonId={lesson.id}
                onAudioUpload={onAudioUpload ? (file, key) => onAudioUpload(lesson.id, file, key) : undefined}
              />
            ))}
          </div>
        );
      })()}

      {lesson.quiz && (
        <section aria-label="Knowledge check">
          <LessonQuiz quiz={lesson.quiz} onPass={(score) => onQuizPass(lesson.id, score)} />
        </section>
      )}

      {!isCompleted && (
        <div className="pt-2">
          <button
            onClick={() => onMarkComplete(lesson.id)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-base font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark lesson complete
          </button>
        </div>
      )}
      </div>
    </article>
  );
}
