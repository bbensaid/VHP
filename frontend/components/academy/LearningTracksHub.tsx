"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Clock, ChevronDown, ChevronUp, BookOpen, Users, ArrowRight } from "lucide-react";
import { learningTracks, type LearningTrack } from "@/lib/data/learning-tracks-data";
import { useModuleProgress } from "@/hooks/useModuleProgress";

// ─── Track Card ───────────────────────────────────────────────────────────────

function TrackCard({ track, highlighted }: { track: LearningTrack; highlighted?: boolean }) {
  const [expanded, setExpanded] = useState(highlighted ?? false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlighted && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [highlighted]);

  // useModuleProgress holds the whole completion store keyed by module slug.
  // Both helpers (getCompletedCount, isSlugCompleted) read against that store,
  // so a single hook call at component top covers every module in the track.
  // Calling another hook inside the .map() below would violate rules-of-hooks.
  const { getCompletedCount, isSlugCompleted } = useModuleProgress(track.modules[0]?.slug ?? "");
  const completedCount = getCompletedCount(track.modules.map(m => m.slug));
  const totalModules   = track.modules.length;
  const progressPct    = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
  const started        = completedCount > 0;
  const completed      = completedCount === totalModules;

  const totalHours = Math.round(track.totalMinutes / 60 * 10) / 10;

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
        highlighted ? "border-indigo-400 ring-2 ring-indigo-300 ring-offset-2" : "border-slate-200"
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="text-4xl leading-none mt-1">{track.icon}</span>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${track.badgeColor}`}>
                  {track.badge}
                </span>
                {completed && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                    <CheckCircle size={10} /> Completed
                  </span>
                )}
              </div>
              <h2 className="ty-h3 font-black text-slate-900 mb-1">{track.title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xl">{track.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <BookOpen size={12} />
            {totalModules} modules
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            ~{totalHours} hours
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={12} />
            {track.targetAudience[0]}
            {track.targetAudience.length > 1 && ` + ${track.targetAudience.length - 1} more`}
          </span>
        </div>

        {/* Progress bar */}
        {started && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-500">Progress</span>
              <span className="font-bold text-slate-700">{completedCount} / {totalModules} modules</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Module List (expandable) */}
      <div>
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-between px-6 py-3 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <span>{expanded ? "Hide" : "Show"} curriculum ({totalModules} modules)</span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {expanded && (
          <div className="border-t border-slate-100">
            {track.modules.map((mod, i) => {
              const isDone = isSlugCompleted(mod.slug);
              const levelColors: Record<string, string> = {
                Foundational: "bg-emerald-100 text-emerald-700",
                Intermediate:  "bg-amber-100  text-amber-700",
                Advanced:      "bg-red-100    text-red-700",
              };
              return (
                <div
                  key={mod.slug}
                  className="flex items-start gap-4 px-6 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                >
                  <span className={`shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border ${
                    isDone ? "bg-emerald-500 text-white border-emerald-500" : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}>
                    {isDone ? "✓" : i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-800 text-sm">{mod.title}</h3>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${levelColors[mod.level] ?? "bg-slate-100 text-slate-500"}`}>
                        {mod.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">{mod.summary}</p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1"><Clock size={10} /> {mod.estimatedMinutes} min</span>
                      <span>·</span>
                      <span>{mod.learningObjectives.length} learning objectives</span>
                    </div>
                  </div>
                  <Link
                    href={`/academy/modules/${mod.slug}`}
                    className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors"
                  >
                    {isDone ? "Review" : i === 0 ? "Start" : "Open"}
                    <ArrowRight size={11} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
        <div className="flex -space-x-1">
          {track.targetAudience.slice(0, 3).map((aud, i) => (
            <span
              key={i}
              className="w-7 h-7 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[9px] font-black text-indigo-600"
              title={aud}
            >
              {aud[0]}
            </span>
          ))}
          {track.targetAudience.length > 3 && (
            <span className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-500">
              +{track.targetAudience.length - 3}
            </span>
          )}
        </div>
        <Link
          href={`/academy/modules/${track.modules[0]?.slug}`}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
        >
          {started && !completed ? "Continue Track" : completed ? "Review Track" : "Start Track"}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}


// ─── Coming-Soon Track Card ───────────────────────────────────────────────────

const PILLAR_COLORS: Record<string, { badge: string; dot: string }> = {
  policy:     { badge: "bg-sky-100 text-sky-700 border-sky-200",         dot: "bg-sky-500" },
  economics:  { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  technology: { badge: "bg-indigo-100 text-indigo-700 border-indigo-200", dot: "bg-indigo-500" },
  clinical:   { badge: "bg-red-100 text-red-700 border-red-200",          dot: "bg-red-500" },
  equity:     { badge: "bg-violet-100 text-violet-700 border-violet-200", dot: "bg-violet-500" },
  operations: { badge: "bg-teal-100 text-teal-700 border-teal-200",       dot: "bg-teal-500" },
};

function ComingSoonTrackCard({ track }: { track: LearningTrack }) {
  const colors = PILLAR_COLORS[track.pillarId] ?? { badge: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden opacity-75">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl leading-none mt-1 grayscale">{track.icon}</span>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${colors.badge}`}>
                {track.pillarId.charAt(0).toUpperCase() + track.pillarId.slice(1)} Pillar
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border bg-slate-100 text-slate-500 border-slate-200">
                Coming Soon
              </span>
            </div>
            <h2 className="ty-h3 font-black text-slate-700 mb-1">{track.title}</h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">{track.subtitle}</p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-400">
              {track.targetAudience.slice(0, 2).map(a => (
                <span key={a} className="flex items-center gap-1"><span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />{a}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hub Page ─────────────────────────────────────────────────────────────────

export default function LearningTracksHub() {
  const searchParams = useSearchParams();
  const highlightedTrackId = searchParams.get("track");

  const availableTracks = learningTracks.filter(t => !t.comingSoon);
  const comingSoonTracks = learningTracks.filter(t => t.comingSoon);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero */}
      <div className="bg-slate-50 border-b border-slate-200 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/academy" className="text-slate-400 hover:text-slate-700 text-xs font-bold uppercase tracking-widest transition-colors">
              ← Academy
            </Link>
          </div>
          <span className="inline-block text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 mb-4">
            Structured Learning Paths
          </span>
          <h1 className="ty-h1 font-black text-slate-900 mb-4">Learning Tracks</h1>
          <p className="ty-hero text-slate-600 max-w-2xl leading-relaxed">
            Curated module sequences that take you from first principles to expert-level proficiency.
            Progress is saved automatically — resume any module where you left off.
          </p>

          {/* How it works */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: "📖", text: "Read each module at your own pace" },
              { icon: "🧠", text: "Pass the 5-question knowledge check" },
              { icon: "✅", text: "Module marked complete, progress saved" },
              { icon: "🏆", text: "Complete all modules to finish the track" },
            ].map(step => (
              <div key={step.text} className="flex items-center gap-2 text-sm text-slate-600">
                <span>{step.icon}</span>
                {step.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available tracks */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {availableTracks.map(track => (
          <TrackCard key={track.id} track={track} highlighted={track.id === highlightedTrackId} />
        ))}
      </div>

      {/* Coming-soon tracks */}
      {comingSoonTracks.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 pb-10">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Coming Soon</h2>
          <div className="space-y-4">
            {comingSoonTracks.map(track => (
              <ComingSoonTrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
