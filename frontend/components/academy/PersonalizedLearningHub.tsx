"use client";

/**
 * PersonalizedLearningHub
 * ────────────────────────
 * Full-featured Personalized Learning tab for the HTR Academy.
 *
 * Features:
 *  • 5-step wizard to capture role, topics, difficulty, schedule, and goals
 *  • AI-powered curriculum generation via the Python backend
 *  • Persistent learning paths stored in localStorage (survives page refresh)
 *  • Interactive weekly curriculum viewer with progress tracking
 *  • Knowledge check quizzes with per-question explanations
 *  • Notes field per learning item
 *  • Multiple saved paths — create, continue, or archive
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  SparklesIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
  LightBulbIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";

// ─── Types ────────────────────────────────────────────────────────────────────

type Difficulty = "foundational" | "intermediate" | "advanced";
type FormatPref = "readings" | "case_studies" | "interactive" | "mixed";
type ItemType = "reading" | "case_study" | "reflection" | "knowledge_check";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface PathItem {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  content: string;
  platform_link: string | null;
  relevance_bridge: string | null;
  estimated_minutes: number;
  key_concepts: string[];
  reflection_question: string | null;
  questions: QuizQuestion[] | null;
}

interface PathWeek {
  week: number;
  theme: string;
  focus_areas: string[];
  items: PathItem[];
}

interface PathResource {
  title: string;
  type: "course" | "webinar" | "external" | "glossary";
  link: string;
  description: string;
}

interface GeneratedPath {
  title: string;
  description: string;
  estimated_weeks: number;
  total_hours: number;
  difficulty_level: string;
  key_skills: string[];
  weeks: PathWeek[];
  recommended_resources: PathResource[];
}

interface LearningPreferences {
  role: string;
  experience_years: string;
  topics: string[];
  difficulty: Difficulty;
  format_preference: FormatPref;
  time_per_week_hours: number;
  timeline_weeks: number;
  goals: string[];
  custom_goal: string;
}

interface SavedPath {
  id: string;
  created_at: string;
  last_accessed: string;
  preferences: LearningPreferences;
  path: GeneratedPath;
  progress: Record<string, boolean>;       // itemId → completed
  quiz_answers: Record<string, number[]>;  // itemId → [selectedAnswers]
  notes: Record<string, string>;           // itemId → note text
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "htr_personalized_paths_v2";

const ROLES = [
  { id: "clinician",        label: "Clinician / Provider",      icon: "🩺" },
  { id: "administrator",    label: "Hospital Administrator",     icon: "🏥" },
  { id: "policy_maker",     label: "Policy Maker",               icon: "📜" },
  { id: "technology_leader",label: "Technology Leader",          icon: "💻" },
  { id: "finance",          label: "Finance / Revenue Cycle",    icon: "📊" },
  { id: "researcher",       label: "Researcher / Analyst",       icon: "🔬" },
  { id: "consultant",       label: "Consultant / Advisor",       icon: "🤝" },
  { id: "student",          label: "Student / Early Career",     icon: "🎓" },
  { id: "other",            label: "Other",                      icon: "✦"  },
];

const TOPICS = [
  { id: "health-economics",    label: "Health Economics & Value-Based Care",    icon: "💰", pillar: "Economics" },
  { id: "clinical-innovation", label: "Clinical Innovation & Quality",          icon: "⚕️",  pillar: "Clinical"  },
  { id: "health-policy",       label: "Health Policy & Reform",                 icon: "📋", pillar: "Policy"    },
  { id: "health-technology",   label: "Healthcare Technology & Digital Health", icon: "🖥️",  pillar: "Technology"},
  { id: "health-equity",       label: "Health Equity & SDOH",                   icon: "⚖️",  pillar: "Equity"    },
  { id: "population-health",   label: "Population Health Management",           icon: "👥", pillar: "Clinical"  },
  { id: "leadership",          label: "Healthcare Leadership & Strategy",        icon: "🧭", pillar: "Leadership"},
  { id: "payment-reform",      label: "Payment Reform & APMs",                  icon: "🔄", pillar: "Economics" },
  { id: "data-analytics",      label: "Data Analytics & AI in Healthcare",      icon: "📈", pillar: "Technology"},
  { id: "regulatory",          label: "Regulatory Compliance & Risk",           icon: "🛡️",  pillar: "Policy"    },
];

const GOALS = [
  { id: "strategic-leadership",  label: "Lead strategic transformation at my organization" },
  { id: "policy-fluency",        label: "Navigate the healthcare policy landscape" },
  { id: "vbc-implementation",    label: "Design & implement value-based care programs" },
  { id: "technology-adoption",   label: "Drive digital health & technology strategy" },
  { id: "equity-integration",    label: "Embed health equity into workflows" },
  { id: "financial-analysis",    label: "Master healthcare financial analysis" },
  { id: "quality-improvement",   label: "Lead quality improvement initiatives" },
  { id: "workforce-development", label: "Build high-performing healthcare teams" },
];

const DIFFICULTY_OPTIONS: { id: Difficulty; label: string; desc: string; icon: string }[] = [
  { id: "foundational", label: "Foundational",  desc: "New to this area — build from first principles", icon: "🌱" },
  { id: "intermediate", label: "Intermediate",  desc: "Some background — deepen and apply knowledge",    icon: "🌿" },
  { id: "advanced",     label: "Advanced",      desc: "Experienced — focus on leading-edge strategy",    icon: "🌳" },
];

const FORMAT_OPTIONS: { id: FormatPref; label: string; desc: string; icon: string }[] = [
  { id: "readings",      label: "Deep Readings",   desc: "Long-form articles and analyses",          icon: "📖" },
  { id: "case_studies",  label: "Case Studies",    desc: "Real-world healthcare transformation cases", icon: "📁" },
  { id: "interactive",   label: "Interactive",     desc: "Quizzes, reflections, and exercises",      icon: "🎯" },
  { id: "mixed",         label: "Mixed Format",    desc: "Best of all formats balanced together",    icon: "🎨" },
];

const TIME_OPTIONS = [
  { value: 0.5,  label: "30 min / week",  desc: "Micro-learning" },
  { value: 1,    label: "1 hr / week",    desc: "Focused sessions" },
  { value: 2,    label: "2 hrs / week",   desc: "Dedicated learner" },
  { value: 4,    label: "4 hrs / week",   desc: "Intensive" },
  { value: 8,    label: "8 hrs / week",   desc: "Full immersion" },
];

const TIMELINE_OPTIONS = [
  { value: 1,  label: "1 week",   desc: "Sprint" },
  { value: 2,  label: "2 weeks",  desc: "Quick course" },
  { value: 4,  label: "1 month",  desc: "Deep dive" },
  { value: 8,  label: "2 months", desc: "Comprehensive" },
  { value: 12, label: "3 months", desc: "Mastery track" },
];

const ITEM_TYPE_META: Record<ItemType, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  reading: {
    label: "Reading",
    icon: <BookOpenIcon className="w-3.5 h-3.5" />,
    color: "text-indigo-700",
    bg:    "bg-indigo-50 border-indigo-200",
  },
  case_study: {
    label: "Case Study",
    icon: <BeakerIcon className="w-3.5 h-3.5" />,
    color: "text-emerald-700",
    bg:    "bg-emerald-50 border-emerald-200",
  },
  reflection: {
    label: "Reflection",
    icon: <LightBulbIcon className="w-3.5 h-3.5" />,
    color: "text-amber-700",
    bg:    "bg-amber-50 border-amber-200",
  },
  knowledge_check: {
    label: "Knowledge Check",
    icon: <AcademicCapIcon className="w-3.5 h-3.5" />,
    color: "text-purple-700",
    bg:    "bg-purple-50 border-purple-200",
  },
};

const defaultPrefs: LearningPreferences = {
  role: "",
  experience_years: "3-5",
  topics: [],
  difficulty: "intermediate",
  format_preference: "mixed",
  time_per_week_hours: 2,
  timeline_weeks: 4,
  goals: [],
  custom_goal: "",
};

// ─── Storage helpers (localStorage + Supabase sync) ──────────────────────────

function loadPaths(): SavedPath[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedPath[]) : [];
  } catch {
    return [];
  }
}

function savePaths(paths: SavedPath[]): void {
  if (typeof window === "undefined") return;
  // Always write to localStorage immediately (no network latency)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(paths));
  // Async sync to Supabase — fire and forget (failures are silent; localStorage is source of truth for session)
  fetch("/api/learning-paths", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paths }),
  }).catch(() => {/* offline or unauthenticated — localStorage already saved */});
}

/** Load paths from server and merge with local state, preferring server data. */
async function syncPathsFromServer(): Promise<SavedPath[] | null> {
  try {
    const res = await fetch("/api/learning-paths");
    if (!res.ok) return null;
    const { paths } = await res.json() as { paths: SavedPath[] };
    if (!Array.isArray(paths) || paths.length === 0) return null;
    // Write server data back to localStorage so it survives offline
    localStorage.setItem(STORAGE_KEY, JSON.stringify(paths));
    return paths;
  } catch {
    return null;
  }
}

function calcProgress(path: SavedPath): number {
  const allItems = path.path.weeks.flatMap((w) => w.items);
  if (!allItems.length) return 0;
  const done = allItems.filter((i) => path.progress[i.id]).length;
  return Math.round((done / allItems.length) * 100);
}

function nextUncompletedItem(path: SavedPath): { weekIdx: number; itemIdx: number } | null {
  for (let wi = 0; wi < path.path.weeks.length; wi++) {
    const week = path.path.weeks[wi];
    for (let ii = 0; ii < week.items.length; ii++) {
      if (!path.progress[week.items[ii].id]) return { weekIdx: wi, itemIdx: ii };
    }
  }
  return null;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WizardProgress({ step, total }: { step: number; total: number }) {
  const stepLabels = ["Your Profile", "Focus Areas", "Learning Style", "Schedule", "Your Goals"];
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {stepLabels.map((label, i) => {
          const isActive   = i === step;
          const isComplete = i < step;
          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all ${
                  isComplete ? "bg-indigo-600 border-indigo-600 text-white"
                  : isActive  ? "bg-white border-indigo-600 text-indigo-600"
                  :             "bg-white border-slate-200 text-slate-400"
                }`}>
                  {isComplete ? "✓" : i + 1}
                </div>
                <span className={`hidden md:block text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-indigo-600" : isComplete ? "text-slate-600" : "text-slate-400"}`}>
                  {label}
                </span>
              </div>
              {i < total - 1 && (
                <div className={`flex-1 h-0.5 mx-1 transition-all ${i < step ? "bg-indigo-600" : "bg-slate-200"}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// Step 1: Role & Experience
function Step1({
  prefs, onChange,
}: {
  prefs: LearningPreferences;
  onChange: (p: Partial<LearningPreferences>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1">Who Are You?</h2>
      <p className="text-slate-500 mb-6">Your role shapes how we frame every concept — from clinical outcomes to financial models.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {ROLES.map((r) => (
          <button
            key={r.id}
            onClick={() => onChange({ role: r.id })}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center transition-all ${
              prefs.role === r.id
                ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50/50"
            }`}
          >
            <span className="text-2xl">{r.icon}</span>
            <span className="text-xs font-bold leading-tight">{r.label}</span>
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Years of Healthcare Experience</label>
        <div className="flex flex-wrap gap-2">
          {["0-2", "3-5", "6-10", "10+"].map((yr) => (
            <button
              key={yr}
              onClick={() => onChange({ experience_years: yr })}
              className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                prefs.experience_years === yr
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-indigo-400"
              }`}
            >
              {yr} years
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 2: Focus Areas
function Step2({
  prefs, onChange,
}: {
  prefs: LearningPreferences;
  onChange: (p: Partial<LearningPreferences>) => void;
}) {
  const toggle = (id: string) => {
    const next = prefs.topics.includes(id)
      ? prefs.topics.filter((t) => t !== id)
      : prefs.topics.length < 5 ? [...prefs.topics, id] : prefs.topics;
    onChange({ topics: next });
  };

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1">What Do You Want to Learn?</h2>
      <p className="text-slate-500 mb-6">Pick up to <strong>5 topics</strong>. Your curriculum will weave them together across weekly themes.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TOPICS.map((t) => {
          const selected = prefs.topics.includes(t.id);
          const disabled = !selected && prefs.topics.length >= 5;
          return (
            <button
              key={t.id}
              onClick={() => !disabled && toggle(t.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                selected
                  ? "border-indigo-600 bg-indigo-50"
                  : disabled
                  ? "border-slate-100 bg-slate-50 opacity-40 cursor-not-allowed"
                  : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"
              }`}
            >
              <span className="text-2xl shrink-0">{t.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-800 leading-tight">{t.label}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">{t.pillar}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                selected ? "bg-indigo-600 border-indigo-600" : "border-slate-300"
              }`}>
                {selected && <span className="text-white text-[9px] font-black">✓</span>}
              </div>
            </button>
          );
        })}
      </div>
      {prefs.topics.length > 0 && (
        <p className="mt-3 text-xs text-slate-500 font-medium">{prefs.topics.length}/5 topics selected</p>
      )}
    </div>
  );
}

// Step 3: Learning Style
function Step3({
  prefs, onChange,
}: {
  prefs: LearningPreferences;
  onChange: (p: Partial<LearningPreferences>) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1">How Do You Learn Best?</h2>
      <p className="text-slate-500 mb-6">We'll calibrate the depth and format of your curriculum accordingly.</p>

      <div className="mb-7">
        <label className="block text-sm font-bold text-slate-700 mb-3">Difficulty Level</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DIFFICULTY_OPTIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => onChange({ difficulty: d.id })}
              className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 text-center transition-all ${
                prefs.difficulty === d.id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"
              }`}
            >
              <span className="text-3xl">{d.icon}</span>
              <div className="text-sm font-black text-slate-900">{d.label}</div>
              <div className="text-xs text-slate-500 leading-snug">{d.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-3">Preferred Content Format</label>
        <div className="grid grid-cols-2 gap-3">
          {FORMAT_OPTIONS.map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ format_preference: f.id })}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                prefs.format_preference === f.id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"
              }`}
            >
              <span className="text-2xl">{f.icon}</span>
              <div>
                <div className="text-sm font-bold text-slate-900">{f.label}</div>
                <div className="text-xs text-slate-500 leading-tight">{f.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 4: Schedule
function Step4({
  prefs, onChange,
}: {
  prefs: LearningPreferences;
  onChange: (p: Partial<LearningPreferences>) => void;
}) {
  const totalHours = prefs.time_per_week_hours * prefs.timeline_weeks;
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1">Plan Your Schedule</h2>
      <p className="text-slate-500 mb-6">We'll build a curriculum that fits your real-world time constraints.</p>

      <div className="mb-7">
        <label className="block text-sm font-bold text-slate-700 mb-3">Time Available Per Week</label>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map((t) => (
            <button
              key={t.value}
              onClick={() => onChange({ time_per_week_hours: t.value })}
              className={`px-4 py-3 rounded-xl border-2 text-sm text-center transition-all min-w-[7rem] ${
                prefs.time_per_week_hours === t.value
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"
              }`}
            >
              <div className="font-black">{t.label}</div>
              <div className={`text-[10px] font-medium ${prefs.time_per_week_hours === t.value ? "text-indigo-100" : "text-slate-400"}`}>{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-7">
        <label className="block text-sm font-bold text-slate-700 mb-3">Learning Timeline</label>
        <div className="flex flex-wrap gap-2">
          {TIMELINE_OPTIONS.map((t) => (
            <button
              key={t.value}
              onClick={() => onChange({ timeline_weeks: t.value })}
              className={`px-4 py-3 rounded-xl border-2 text-sm text-center transition-all min-w-[7rem] ${
                prefs.timeline_weeks === t.value
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"
              }`}
            >
              <div className="font-black">{t.label}</div>
              <div className={`text-[10px] font-medium ${prefs.timeline_weeks === t.value ? "text-indigo-100" : "text-slate-400"}`}>{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Summary card */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center gap-4">
        <span className="text-3xl">📅</span>
        <div>
          <div className="text-sm font-black text-indigo-900">Your commitment</div>
          <div className="text-sm text-indigo-700">
            <strong>{prefs.time_per_week_hours}h/week</strong> for <strong>{prefs.timeline_weeks} {prefs.timeline_weeks === 1 ? "week" : "weeks"}</strong>
            {" "}= <strong>{Math.round(totalHours * 10) / 10} total hours</strong> of curated learning
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 5: Goals
function Step5({
  prefs, onChange,
}: {
  prefs: LearningPreferences;
  onChange: (p: Partial<LearningPreferences>) => void;
}) {
  const toggleGoal = (id: string) => {
    const next = prefs.goals.includes(id)
      ? prefs.goals.filter((g) => g !== id)
      : [...prefs.goals, id];
    onChange({ goals: next });
  };

  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900 mb-1">Define Your Goals</h2>
      <p className="text-slate-500 mb-6">What outcomes matter most? Your AI-generated path will be structured to get you there.</p>

      <div className="space-y-2 mb-6">
        {GOALS.map((g) => {
          const selected = prefs.goals.includes(g.id);
          return (
            <button
              key={g.id}
              onClick={() => toggleGoal(g.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                selected
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
                selected ? "bg-indigo-600 border-indigo-600" : "border-slate-300"
              }`}>
                {selected && <span className="text-white text-[9px] font-black">✓</span>}
              </div>
              <span className="text-sm font-medium text-slate-800">{g.label}</span>
            </button>
          );
        })}
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Anything else? (optional)</label>
        <textarea
          value={prefs.custom_goal}
          onChange={(e) => onChange({ custom_goal: e.target.value })}
          placeholder="e.g. I want to prepare a board presentation on our VBC readiness…"
          maxLength={500}
          rows={3}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <div className="text-right text-xs text-slate-400 mt-1">{prefs.custom_goal.length}/500</div>
      </div>
    </div>
  );
}

// ─── Quiz Component ────────────────────────────────────────────────────────────

function QuizBlock({
  questions,
  savedAnswers,
  onAnswer,
}: {
  questions: QuizQuestion[];
  savedAnswers: number[];
  onAnswer: (answers: number[]) => void;
}) {
  const [selected, setSelected] = useState<(number | null)[]>(
    questions.map((_, i) => savedAnswers[i] ?? null)
  );
  const [submitted, setSubmitted] = useState(savedAnswers.length === questions.length && savedAnswers.every((a) => a !== undefined));

  const allAnswered = selected.every((s) => s !== null);

  const handleSelect = (qi: number, oi: number) => {
    if (submitted) return;
    const next = [...selected];
    next[qi] = oi;
    setSelected(next);
  };

  const handleSubmit = () => {
    const answers = selected as number[];
    setSubmitted(true);
    onAnswer(answers);
  };

  const score = submitted ? selected.filter((s, i) => s === questions[i].correct).length : 0;

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => {
        const chosen = selected[qi];
        return (
          <div key={qi} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-purple-600 mr-2">Q{qi + 1}</span>
              <span className="text-sm font-semibold text-slate-800">{q.question}</span>
            </div>
            <div className="p-3 space-y-2">
              {q.options.map((opt, oi) => {
                const isSelected = chosen === oi;
                const isCorrect  = q.correct === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/30";
                if (submitted) {
                  if (isCorrect)        cls = "border-emerald-400 bg-emerald-50 text-emerald-800";
                  else if (isSelected)  cls = "border-red-300 bg-red-50 text-red-800";
                } else if (isSelected)  cls = "border-indigo-500 bg-indigo-50 text-indigo-900";

                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(qi, oi)}
                    disabled={submitted}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all disabled:cursor-default ${cls}`}
                  >
                    {opt}
                    {submitted && isCorrect && <span className="ml-2 text-emerald-600 font-black">✓</span>}
                    {submitted && isSelected && !isCorrect && <span className="ml-2 text-red-500 font-black">✗</span>}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Explanation: </strong>{q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full py-3 bg-purple-600 text-white text-sm font-black rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
        >
          Submit Answers
        </button>
      ) : (
        <div className={`text-center p-4 rounded-xl border-2 font-black text-lg ${
          score === questions.length ? "bg-emerald-50 border-emerald-300 text-emerald-800"
          : score >= questions.length / 2  ? "bg-amber-50 border-amber-300 text-amber-800"
          :                                   "bg-red-50 border-red-300 text-red-800"
        }`}>
          {score}/{questions.length} correct{" "}
          {score === questions.length ? "🏆 Perfect!" : score >= questions.length / 2 ? "👍 Good work!" : "📖 Review and retry"}
        </div>
      )}
    </div>
  );
}

// ─── Academy link resolver ────────────────────────────────────────────────────
// platform_link is set by the backend after querying real Sanity slugs and
// scoring each generated item against actual module/case-study titles.
// We trust it and derive a precise label from what the URL actually points to.

// Maps topic slugs → learning track ID (mirrors backend TOPIC_TO_TRACK).
// Track IDs must match ids in frontend/lib/data/learning-tracks-data.ts.
// Used client-side to upgrade legacy generic fallback URLs from localStorage.
const TOPIC_TO_TRACK: Record<string, string> = {
  "health-economics":    "value-based-care-track",
  "payment-reform":      "value-based-care-track",
  "clinical-innovation": "value-based-care-track",
  "health-policy":       "value-based-care-track",
  "population-health":   "value-based-care-track",
  "leadership":          "value-based-care-track",
  "regulatory":          "value-based-care-track",
  "health-technology":   "precision-medicine-track",
  "data-analytics":      "precision-medicine-track",
  "health-equity":       "health-equity-track",
};

const TRACK_NAMES: Record<string, string> = {
  "value-based-care-track":    "Value-Based Care Track",
  "precision-medicine-track":  "Precision Medicine Track",
  "health-equity-track":       "Health Equity Track",
};

function bestTrackForTopics(topics: string[]): string | null {
  const scores: Record<string, number> = {};
  for (const t of topics) {
    const id = TOPIC_TO_TRACK[t];
    if (id) scores[id] = (scores[id] ?? 0) + 1;
  }
  const entries = Object.entries(scores);
  if (!entries.length) return null;
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

function resolveAcademyLink(
  item: PathItem,
  topics: string[]
): { href: string; label: string } {
  const link = item.platform_link;

  if (!link) {
    // knowledge_check items intentionally have no link
    return { href: "/academy?tab=glossary", label: "Review Key Terms in the Glossary" };
  }

  // Derive a specific label from the actual URL
  if (link.includes("/academy/modules/"))       return { href: link, label: "Read This Module in HTR Academy" };
  if (link.includes("/academy/case-studies/"))  return { href: link, label: "View Full Case Study in HTR Academy" };
  if (link.includes("/academy/courses/")) {
    const COURSE_NAMES: Record<string, string> = {
      "value-based-care-fundamentals": "Value-Based Care Fundamentals Course",
      "precision-medicine-fundamentals": "Precision Medicine Fundamentals Course",
    };
    const slug = link.split("/academy/courses/")[1]?.split("?")[0] ?? "";
    const name = COURSE_NAMES[slug];
    return { href: link, label: name ? `Start the ${name}` : "View This Course in HTR Academy" };
  }
  if (link.includes("tab=case-studies"))        return { href: link, label: "Browse the Case Studies Library" };
  if (link.includes("tab=tracks")) {
    const trackMatch = link.match(/[?&]track=([^&]+)/);
    // If the stored URL already has a track param (new paths), use it.
    // If not (old localStorage paths), derive the best track from the user's topics.
    const trackId = trackMatch ? trackMatch[1] : bestTrackForTopics(topics);
    const name = trackId ? TRACK_NAMES[trackId] : null;
    const href = trackId && !trackMatch
      ? `/academy?tab=tracks&track=${trackId}`
      : link;
    return { href, label: name ? `Explore the ${name}` : "Explore Related Learning Tracks" };
  }
  if (link.includes("tab=courses"))             return { href: link, label: "View Related Courses" };
  if (link.includes("tab=glossary"))            return { href: link, label: "Review Key Terms in the Glossary" };
  if (link.includes("tab=webinars"))            return { href: link, label: "Watch Related Webinars" };

  return { href: link, label: "Explore Related Content in HTR Academy" };
}

// ─── Audio Player ─────────────────────────────────────────────────────────────
// Uses Web Audio API (decodeAudioData on raw ArrayBuffer) — avoids all
// URL safety / blob: / data: restrictions that affect HTMLMediaElement in
// Next.js Turbopack dev and certain CSP environments.

type AudioStatus = "idle" | "loading" | "playing" | "paused" | "error";

function AudioPlayer({ text }: { text: string }) {
  const [status,   setStatus]   = useState<AudioStatus>("idle");
  const [progress, setProgress] = useState(0);

  const ctxRef     = useRef<AudioContext | null>(null);
  const bufRef     = useRef<AudioBuffer | null>(null);
  const srcRef     = useRef<AudioBufferSourceNode | null>(null);
  const startRef   = useRef(0);   // ctx.currentTime when current segment started
  const offsetRef  = useRef(0);   // seconds into buffer where we're playing from
  const endedRef   = useRef(false); // true when we stopped manually (not natural end)
  const rafRef     = useRef(0);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      endedRef.current = true;
      try { srcRef.current?.stop(); } catch {}
      ctxRef.current?.close();
    };
  }, []);

  const tick = useCallback(() => {
    if (!ctxRef.current || !bufRef.current) return;
    const elapsed = ctxRef.current.currentTime - startRef.current + offsetRef.current;
    setProgress(Math.min((elapsed / bufRef.current.duration) * 100, 100));
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const playFrom = useCallback((offset: number) => {
    const ctx = ctxRef.current!;
    const buf = bufRef.current!;
    endedRef.current = false;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.onended = () => {
      if (!endedRef.current) {
        cancelAnimationFrame(rafRef.current);
        setStatus("idle");
        setProgress(0);
        offsetRef.current = 0;
      }
    };
    src.start(0, offset);
    srcRef.current  = src;
    startRef.current  = ctx.currentTime;
    offsetRef.current = offset;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const handleClick = async () => {
    if (status === "playing") {
      endedRef.current = true;
      cancelAnimationFrame(rafRef.current);
      offsetRef.current = ctxRef.current!.currentTime - startRef.current + offsetRef.current;
      try { srcRef.current?.stop(); } catch {}
      setStatus("paused");
      return;
    }
    if (status === "paused") {
      playFrom(offsetRef.current);
      setStatus("playing");
      return;
    }

    // idle — fetch from OpenAI TTS then decode
    setStatus("loading");
    try {
      const res = await fetch("/api/personalized-learning/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer dev" },
        body: JSON.stringify({ text, voice: "nova" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const arrayBuffer = await res.arrayBuffer();
      const ctx = new AudioContext();
      ctxRef.current = ctx;
      bufRef.current = await ctx.decodeAudioData(arrayBuffer);
      offsetRef.current = 0;
      playFrom(0);
      setStatus("playing");
    } catch (err) {
      console.error("[AudioPlayer]", err);
      setStatus("error");
    }
  };

  const handleStop = () => {
    endedRef.current = true;
    cancelAnimationFrame(rafRef.current);
    try { srcRef.current?.stop(); } catch {}
    setStatus("idle");
    setProgress(0);
    offsetRef.current = 0;
  };

  if (status === "error") {
    return (
      <div className="flex items-center gap-2 text-xs text-red-500 py-1">
        <SpeakerWaveIcon className="w-3.5 h-3.5" />
        Audio unavailable
      </div>
    );
  }

  const isPlaying = status === "playing";
  const isLoading = status === "loading";

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        title={isPlaying ? "Pause" : status === "paused" ? "Resume" : "Listen to this reading"}
      >
        {isLoading ? (
          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <PauseIcon className="w-3.5 h-3.5" />
        ) : (
          <PlayIcon className="w-3.5 h-3.5" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
            {isLoading ? "Generating audio…" : isPlaying ? "Now playing" : status === "paused" ? "Paused" : "Listen to this reading"}
          </span>
          <span className="text-[10px] text-slate-400 flex items-center gap-1">
            <SpeakerWaveIcon className="w-3 h-3" />
            AI Voice · Nova
          </span>
        </div>
        <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {(isPlaying || status === "paused") && (
        <button onClick={handleStop} className="shrink-0 text-slate-400 hover:text-red-500 transition-colors" title="Stop">
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ─── Path Item Card ────────────────────────────────────────────────────────────

function PathItemCard({
  item,
  topics,
  isCompleted,
  quizAnswers,
  note,
  onToggleComplete,
  onQuizAnswer,
  onNoteChange,
}: {
  item: PathItem;
  topics: string[];
  isCompleted: boolean;
  quizAnswers: number[];
  note: string;
  onToggleComplete: () => void;
  onQuizAnswer: (answers: number[]) => void;
  onNoteChange: (note: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const meta = ITEM_TYPE_META[item.type];

  return (
    <div className={`rounded-xl border-2 overflow-hidden transition-all ${
      isCompleted ? "border-emerald-200 bg-white" : "border-slate-200 bg-white"
    }`}>
      {/* Header row */}
      <div
        className="flex items-start gap-3 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Completion toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleComplete(); }}
          className="shrink-0 mt-0.5"
          title={isCompleted ? "Mark incomplete" : "Mark complete"}
        >
          {isCompleted
            ? <CheckCircleSolid className="w-6 h-6 text-emerald-500" />
            : <CheckCircleIcon className="w-6 h-6 text-slate-300 hover:text-emerald-400 transition-colors" />
          }
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${meta.bg} ${meta.color}`}>
              {meta.icon}
              {meta.label}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <ClockIcon className="w-3 h-3" />
              {item.estimated_minutes} min
            </span>
          </div>
          <h3 className={`text-sm font-bold leading-snug ${isCompleted ? "text-slate-500 line-through decoration-slate-300" : "text-slate-900"}`}>
            {item.title}
          </h3>
          {!expanded && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
          )}
        </div>

        <div className="shrink-0 text-slate-400 mt-1">
          {expanded ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-slate-100 px-5 py-5 space-y-5">
          {/* Description */}
          <p className="ty-body text-slate-600 leading-relaxed">{item.description}</p>

          {/* Audio player — available on reading and case study items */}
          {item.content && (item.type === "reading" || item.type === "case_study") && (
            <AudioPlayer text={item.content} />
          )}

          {/* Main content */}
          {item.content && (
            <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap text-sm bg-slate-50 rounded-xl p-5 border border-slate-100">
              {item.content}
            </div>
          )}

          {/* Key concepts */}
          {item.key_concepts && item.key_concepts.length > 0 && (
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Key Concepts</div>
              <div className="flex flex-wrap gap-2">
                {item.key_concepts.map((c) => (
                  <span key={c} className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reflection question */}
          {item.reflection_question && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <LightBulbIcon className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-700">Reflection</span>
              </div>
              <p className="text-sm text-amber-900 font-medium italic">{item.reflection_question}</p>
            </div>
          )}

          {/* Knowledge check quiz */}
          {item.type === "knowledge_check" && item.questions && (
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-purple-600 mb-3">Knowledge Check</div>
              <QuizBlock
                questions={item.questions}
                savedAnswers={quizAnswers}
                onAnswer={onQuizAnswer}
              />
            </div>
          )}

          {/* Only show for verified specific document links (/academy/modules/ or /academy/case-studies/).
              Generic tab/course fallbacks are suppressed — the generated content above IS the lesson. */}
          {item.platform_link &&
            (item.platform_link.includes("/academy/modules/") ||
              item.platform_link.includes("/academy/case-studies/")) && (
            <div className="space-y-3">
              {/* Case study bridge — AI-generated, personalised to this learner's
                  role, goals, and current week theme. Only present on case_study
                  items where the backend found a high-confidence Sanity match. */}
              {item.type === "case_study" && item.relevance_bridge && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <SparklesIcon className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                      Why this case study matters for your path
                    </span>
                  </div>
                  <p className="text-sm text-indigo-900 leading-relaxed">
                    {item.relevance_bridge}
                  </p>
                </div>
              )}
              {/* Outbound link to the specific Sanity document */}
              {(() => {
                const { href, label } = resolveAcademyLink(item, topics);
                return (
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <BookOpenIcon className="w-3.5 h-3.5" />
                    {label}
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </a>
                );
              })()}
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
              <ChatBubbleLeftRightIcon className="w-3.5 h-3.5 inline mr-1" />
              Your Notes
            </label>
            <textarea
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Capture your thoughts, questions, or action items…"
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-700 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
          </div>

          {/* Mark complete CTA */}
          {!isCompleted && (
            <button
              onClick={onToggleComplete}
              className="w-full py-3 bg-emerald-600 text-white text-sm font-black rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircleIcon className="w-5 h-5" />
              Mark as Complete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Path Viewer ───────────────────────────────────────────────────────────────

function PathViewer({
  savedPath,
  onUpdate,
  onBack,
}: {
  savedPath: SavedPath;
  onUpdate: (updated: SavedPath) => void;
  onBack: () => void;
}) {
  const [activeWeek, setActiveWeek] = useState(0);

  const progress = calcProgress(savedPath);
  const next     = nextUncompletedItem(savedPath);
  const allItems = savedPath.path.weeks.flatMap((w) => w.items);
  const done     = allItems.filter((i) => savedPath.progress[i.id]).length;

  const handleToggleItem = useCallback(
    (itemId: string) => {
      const updated = {
        ...savedPath,
        last_accessed: new Date().toISOString(),
        progress: { ...savedPath.progress, [itemId]: !savedPath.progress[itemId] },
      };
      onUpdate(updated);
    },
    [savedPath, onUpdate]
  );

  const handleQuizAnswer = useCallback(
    (itemId: string, answers: number[]) => {
      const updated = {
        ...savedPath,
        quiz_answers: { ...savedPath.quiz_answers, [itemId]: answers },
        // Auto-complete the quiz item when submitted
        progress: { ...savedPath.progress, [itemId]: true },
      };
      onUpdate(updated);
    },
    [savedPath, onUpdate]
  );

  const handleNoteChange = useCallback(
    (itemId: string, note: string) => {
      const updated = {
        ...savedPath,
        notes: { ...savedPath.notes, [itemId]: note },
      };
      onUpdate(updated);
    },
    [savedPath, onUpdate]
  );

  const handleContinue = () => {
    if (next) setActiveWeek(next.weekIdx);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <button
                onClick={onBack}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors mb-1 flex items-center gap-1"
              >
                <ChevronLeftIcon className="w-3.5 h-3.5" />
                All Paths
              </button>
              <h1 className="text-lg font-black text-slate-900 leading-tight truncate">{savedPath.path.title}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" />
                  {savedPath.path.total_hours}h total
                </span>
                <span className="capitalize">{savedPath.path.difficulty_level}</span>
                <span>{savedPath.path.estimated_weeks} weeks</span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-2xl font-black text-indigo-600">{progress}%</div>
              <div className="text-xs text-slate-500">{done}/{allItems.length} items</div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-6">
        {/* Continue CTA */}
        {next && progress < 100 && (
          <div className="bg-indigo-600 text-white rounded-2xl p-5 mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-0.5">Continue Learning</div>
              <div className="font-black text-base">
                {savedPath.path.weeks[next.weekIdx].items[next.itemIdx].title}
              </div>
              <div className="text-xs text-indigo-200 mt-0.5">
                Week {next.weekIdx + 1} · {ITEM_TYPE_META[savedPath.path.weeks[next.weekIdx].items[next.itemIdx].type].label}
              </div>
            </div>
            <button
              onClick={handleContinue}
              className="shrink-0 flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-xl text-sm font-black hover:bg-indigo-50 transition-colors"
            >
              Go <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {progress === 100 && (
          <div className="bg-emerald-600 text-white rounded-2xl p-5 mb-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="font-black text-lg">Learning Path Complete!</div>
            <div className="text-emerald-100 text-sm mt-1">You've completed all {allItems.length} items in this curriculum.</div>
          </div>
        )}

        {/* Path description */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <p className="ty-body text-slate-600 leading-relaxed">{savedPath.path.description}</p>
          {savedPath.path.key_skills && savedPath.path.key_skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {savedPath.path.key_skills.map((s) => (
                <span key={s} className="px-2 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold rounded-full">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Week tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {savedPath.path.weeks.map((w, wi) => {
            const weekItems  = w.items;
            const weekDone   = weekItems.filter((i) => savedPath.progress[i.id]).length;
            const weekPct    = weekItems.length ? Math.round((weekDone / weekItems.length) * 100) : 0;
            const isActive   = activeWeek === wi;
            return (
              <button
                key={wi}
                onClick={() => setActiveWeek(wi)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${
                  isActive
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : weekPct === 100
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-400"
                }`}
              >
                Week {w.week}
                {weekPct === 100 && <span>✓</span>}
                {weekPct > 0 && weekPct < 100 && (
                  <span className={`text-[10px] font-black ${isActive ? "text-indigo-200" : "text-slate-400"}`}>{weekPct}%</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active week content */}
        {savedPath.path.weeks[activeWeek] && (() => {
          const week = savedPath.path.weeks[activeWeek];
          return (
            <div>
              <div className="mb-5">
                <h2 className="ty-h3 font-black text-slate-900">{week.theme}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {week.focus_areas.map((fa) => (
                    <span key={fa} className="px-2.5 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-full">
                      {fa}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {week.items.map((item) => (
                  <PathItemCard
                    key={item.id}
                    item={item}
                    topics={savedPath.preferences.topics}
                    isCompleted={!!savedPath.progress[item.id]}
                    quizAnswers={savedPath.quiz_answers[item.id] || []}
                    note={savedPath.notes[item.id] || ""}
                    onToggleComplete={() => handleToggleItem(item.id)}
                    onQuizAnswer={(answers) => handleQuizAnswer(item.id, answers)}
                    onNoteChange={(n) => handleNoteChange(item.id, n)}
                  />
                ))}
              </div>
            </div>
          );
        })()}

        {/* Recommended resources */}
        {savedPath.path.recommended_resources && savedPath.path.recommended_resources.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg font-black text-slate-900 mb-4">Recommended Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedPath.path.recommended_resources.map((r, i) => (
                <a
                  key={i}
                  href={r.link}
                  target={r.type === "external" ? "_blank" : undefined}
                  rel={r.type === "external" ? "noopener noreferrer" : undefined}
                  className="block p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0">
                      {r.type === "course" ? "🎓" : r.type === "webinar" ? "📹" : r.type === "glossary" ? "📖" : "🔗"}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{r.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{r.description}</div>
                      <span className={`inline-block mt-1.5 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        r.type === "course" ? "bg-indigo-50 text-indigo-600"
                        : r.type === "webinar" ? "bg-purple-50 text-purple-600"
                        : "bg-slate-100 text-slate-500"
                      }`}>
                        {r.type}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Saved Paths List ─────────────────────────────────────────────────────────

function PathListCard({
  path,
  onOpen,
  onDelete,
}: {
  path: SavedPath;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const progress = calcProgress(path);
  const allItems = path.path.weeks.flatMap((w) => w.items);
  const done     = allItems.filter((i) => path.progress[i.id]).length;
  const topics   = path.preferences.topics
    .map((t) => TOPICS.find((tp) => tp.id === t)?.label ?? t)
    .slice(0, 3);
  const diffColor = {
    foundational: "bg-emerald-50 text-emerald-700 border-emerald-200",
    intermediate: "bg-amber-50 text-amber-700 border-amber-200",
    advanced:     "bg-red-50 text-red-700 border-red-200",
  }[path.preferences.difficulty] ?? "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${diffColor}`}>
                {path.preferences.difficulty}
              </span>
              <span className="text-[10px] text-slate-400">
                Created {new Date(path.created_at).toLocaleDateString()}
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900 leading-tight mb-1">{path.path.title}</h3>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{path.path.description}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="shrink-0 p-1.5 text-slate-300 hover:text-red-400 transition-colors rounded-lg hover:bg-red-50"
            title="Delete path"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {topics.map((t) => (
            <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-full">{t}</span>
          ))}
          {path.preferences.topics.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded-full">+{path.preferences.topics.length - 3} more</span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            {path.path.total_hours}h total
          </span>
          <span>{path.path.estimated_weeks} weeks</span>
          <span>{allItems.length} items</span>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500">Progress</span>
            <span className="font-bold text-slate-700">{done}/{allItems.length} complete</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
        <button
          onClick={onOpen}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white text-sm font-black rounded-xl hover:bg-indigo-700 transition-colors"
        >
          {progress === 0 ? "Start Path" : progress === 100 ? "Review Path" : "Continue Learning"}
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Loading State ─────────────────────────────────────────────────────────────

// Hoisted so the interval effect doesn't see a fresh array reference each
// render.
const GENERATING_STEPS = [
  "Analyzing your profile and goals…",
  "Mapping topics to HTR pillars…",
  "Designing your weekly curriculum…",
  "Generating learning content…",
  "Creating knowledge checks…",
  "Finalizing your personalized path…",
];

function GeneratingState() {
  const steps = GENERATING_STEPS;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % GENERATING_STEPS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
          <SparklesIcon className="w-10 h-10 text-indigo-600 animate-pulse" />
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-300 border-t-indigo-600 animate-spin" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 mb-2">Building Your Learning Path</h2>
      <p className="text-slate-500 mb-6 max-w-md">
        Our AI is crafting a personalized healthcare curriculum with readings, case studies, and knowledge checks tailored specifically for you.
      </p>
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-6 py-3">
        <p className="text-sm text-indigo-700 font-medium animate-pulse">{steps[step]}</p>
      </div>
      <p className="text-xs text-slate-400 mt-4">This may take 30–60 seconds</p>
    </div>
  );
}

// ─── Main Hub Component ───────────────────────────────────────────────────────

export default function PersonalizedLearningHub() {
  type View = "list" | "wizard" | "path" | "generating";

  const [view,        setView]        = useState<View>("list");
  const [paths,       setPaths]       = useState<SavedPath[]>([]);
  const [activePathId, setActivePathId] = useState<string | null>(null);
  const [step,        setStep]        = useState(0);
  const [prefs,       setPrefs]       = useState<LearningPreferences>(defaultPrefs);
  const [error,       setError]       = useState<string | null>(null);

  const TOTAL_STEPS = 5;

  // Load saved paths: localStorage first (instant), then sync from server (cross-device)
  useEffect(() => {
    // Immediately set from localStorage so UI is responsive
    const local = loadPaths();
    if (local.length > 0) setPaths(local);
    // Then fetch from server — if server has more recent data, replace local
    syncPathsFromServer().then((serverPaths) => {
      if (serverPaths && serverPaths.length > 0) {
        setPaths(serverPaths);
      }
    });
  }, []);

  const activePath = paths.find((p) => p.id === activePathId) ?? null;

  const updatePrefs = (partial: Partial<LearningPreferences>) =>
    setPrefs((p) => ({ ...p, ...partial }));

  const canAdvance = (): boolean => {
    if (step === 0) return !!prefs.role;
    if (step === 1) return prefs.topics.length > 0;
    if (step === 2) return !!prefs.difficulty && !!prefs.format_preference;
    if (step === 3) return !!prefs.time_per_week_hours && !!prefs.timeline_weeks;
    if (step === 4) return true; // goals are optional
    return true;
  };

  const handleGenerate = async () => {
    setError(null);
    setView("generating");

    try {
      const res = await fetch("/api/personalized-learning", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer dev" },
        body: JSON.stringify(prefs),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || `Server error ${res.status}`);
      }

      const data = await res.json() as { path: GeneratedPath; success: boolean };

      const newPath: SavedPath = {
        id:            crypto.randomUUID(),
        created_at:    new Date().toISOString(),
        last_accessed: new Date().toISOString(),
        preferences:   prefs,
        path:          data.path,
        progress:      {},
        quiz_answers:  {},
        notes:         {},
      };

      const updated = [newPath, ...paths];
      setPaths(updated);
      savePaths(updated);
      setActivePathId(newPath.id);
      setPrefs(defaultPrefs);
      setStep(0);
      setView("path");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      setView("wizard");
      setStep(4); // Back to last step to show error
    }
  };

  const handleUpdatePath = (updated: SavedPath) => {
    const next = paths.map((p) => (p.id === updated.id ? updated : p));
    setPaths(next);
    savePaths(next);
  };

  const handleDeletePath = (id: string) => {
    const next = paths.filter((p) => p.id !== id);
    setPaths(next);
    savePaths(next);
    if (activePathId === id) { setActivePathId(null); setView("list"); }
  };

  // ── Generating state ────────────────────────────────────────────────────────
  if (view === "generating") return <GeneratingState />;

  // ── Path viewer ────────────────────────────────────────────────────────────
  if (view === "path" && activePath) {
    return (
      <PathViewer
        savedPath={activePath}
        onUpdate={handleUpdatePath}
        onBack={() => setView("list")}
      />
    );
  }

  // ── Wizard ─────────────────────────────────────────────────────────────────
  if (view === "wizard") {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        <div className="max-w-3xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => { setView("list"); setStep(0); setPrefs(defaultPrefs); }}
                className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 mb-2"
              >
                <ChevronLeftIcon className="w-3.5 h-3.5" />
                Back
              </button>
              <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
                <SparklesIcon className="w-7 h-7 text-indigo-600" />
                Create Your Learning Path
              </h1>
              <p className="text-slate-500 mt-1">Answer 5 quick questions — we'll build a custom curriculum in seconds.</p>
            </div>
          </div>

          {/* Progress */}
          <WizardProgress step={step} total={TOTAL_STEPS} />

          {/* Step card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            {step === 0 && <Step1 prefs={prefs} onChange={updatePrefs} />}
            {step === 1 && <Step2 prefs={prefs} onChange={updatePrefs} />}
            {step === 2 && <Step3 prefs={prefs} onChange={updatePrefs} />}
            {step === 3 && <Step4 prefs={prefs} onChange={updatePrefs} />}
            {step === 4 && <Step5 prefs={prefs} onChange={updatePrefs} />}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <XMarkIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-red-800">Generation failed</div>
                <div className="text-sm text-red-700 mt-0.5">{error}</div>
                <div className="text-xs text-red-500 mt-1">Make sure the backend is running: <code>cd backend && uvicorn main:app --reload --port 8000</code></div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => { if (step > 0) setStep(s => s - 1); }}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl disabled:opacity-30 hover:border-slate-400 transition-all"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Back
            </button>

            {step < TOTAL_STEPS - 1 ? (
              <button
                onClick={() => { if (canAdvance()) setStep(s => s + 1); }}
                disabled={!canAdvance()}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-black text-white bg-indigo-600 rounded-xl disabled:opacity-40 hover:bg-indigo-700 transition-all"
              >
                Continue
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-black text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
              >
                <SparklesIcon className="w-4 h-4" />
                Generate My Path
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── List view (default) ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero */}
      <div className="bg-slate-50 border-b border-slate-200 py-14">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-purple-600 bg-purple-50 border border-purple-200 rounded-full px-3 py-1 mb-4">
            <SparklesIcon className="w-3.5 h-3.5" />
            AI-Powered
          </span>
          <h1 className="ty-h1 font-black text-slate-900 mb-4">
            Personalized Learning
          </h1>
          <p className="ty-hero text-slate-600 max-w-2xl leading-relaxed mb-8">
            Tell us who you are and what you want to achieve — our AI builds a custom healthcare transformation curriculum just for you, with progress that persists across sessions.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: "🧠", text: "AI-generated curriculum" },
              { icon: "📅", text: "Weekly learning plans" },
              { icon: "📊", text: "Progress tracking" },
              { icon: "🎯", text: "Role-specific framing" },
              { icon: "🔖", text: "Pause & resume anytime" },
              { icon: "📝", text: "Notes per module" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-sm text-slate-600">
                <span>{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {paths.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <SparklesIcon className="w-12 h-12 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">No Learning Paths Yet</h2>
            <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
              Create your first personalized learning path. Our AI will build a custom weekly curriculum based on your role, topics, and schedule.
            </p>

            {/* Sample path cards (illustrative) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 w-full max-w-3xl opacity-60 pointer-events-none select-none">
              {[
                { title: "VBC for Hospital CFOs", weeks: 4, hours: 8,  topics: ["Health Economics", "Payment Reform"] },
                { title: "Digital Health Strategy", weeks: 2, hours: 4,  topics: ["Technology", "Leadership"] },
                { title: "Health Equity Integration", weeks: 8, hours: 16, topics: ["Equity", "Clinical Quality"] },
              ].map((ex) => (
                <div key={ex.title} className="bg-white rounded-xl border border-slate-200 p-4 text-left">
                  <div className="text-xs font-black text-indigo-400 mb-1">Example path</div>
                  <div className="text-sm font-black text-slate-700 mb-2">{ex.title}</div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {ex.topics.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="text-xs text-slate-400">{ex.weeks} weeks · {ex.hours}h total</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setView("wizard")}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base font-black rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
            >
              <SparklesIcon className="w-5 h-5" />
              Create My Learning Path
            </button>
          </div>
        ) : (
          /* Paths list */
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Your Learning Paths</h2>
                <p className="text-sm text-slate-500 mt-0.5">{paths.length} {paths.length === 1 ? "path" : "paths"} saved · progress auto-saved</p>
              </div>
              <button
                onClick={() => setView("wizard")}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-black rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                New Path
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {paths.map((p) => (
                <PathListCard
                  key={p.id}
                  path={p}
                  onOpen={() => { setActivePathId(p.id); setView("path"); }}
                  onDelete={() => handleDeletePath(p.id)}
                />
              ))}
            </div>

            {/* How it works */}
            <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
              <h3 className="text-lg font-black text-slate-900 mb-5">How Personalized Learning Works</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: "🎯", step: "1", title: "Define Your Profile", desc: "Share your role, experience, and learning goals" },
                  { icon: "🧠", step: "2", title: "AI Builds Your Path", desc: "Our AI designs a weekly curriculum mapped to your topics" },
                  { icon: "📖", step: "3", title: "Learn at Your Pace", desc: "Read, reflect, and complete knowledge checks each week" },
                  { icon: "📊", step: "4", title: "Track Your Progress", desc: "Pick up exactly where you left off, any time" },
                ].map((s) => (
                  <div key={s.step} className="text-center">
                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                      {s.icon}
                    </div>
                    <div className="text-xs font-black uppercase tracking-wider text-indigo-500 mb-1">Step {s.step}</div>
                    <div className="text-sm font-black text-slate-900 mb-1">{s.title}</div>
                    <div className="text-xs text-slate-500 leading-snug">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
