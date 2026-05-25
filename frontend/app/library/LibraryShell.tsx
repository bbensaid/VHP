"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookmarkIcon,
  BookOpenIcon,
  PencilSquareIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import BookmarkButton from "@/components/BookmarkButton";
import type { EnrollmentRow, CertificationRow } from "@/lib/db/academy";

type Bookmark = {
  id: string;
  sanity_id: string;
  slug: string;
  title: string;
  pillar: string | null;
  content_type: string | null;
  note: string | null;
  created_at: string;
};

interface Props {
  userName: string;
  bookmarks: Bookmark[];
  enrollments: EnrollmentRow[];
  certifications: CertificationRow[];
  completedModuleCount: number;
}

type SectionId =
  | "overview"
  | "articles"
  | "chapters"
  | "notes"
  | "courses"
  | "chats"
  | "tools"
  | "history";

const SECTIONS: {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "overview", label: "Overview", icon: Squares2X2Icon },
  { id: "articles", label: "Saved Articles", icon: BookmarkIcon },
  { id: "chapters", label: "Saved Chapters", icon: BookOpenIcon },
  { id: "notes", label: "Notes & Highlights", icon: PencilSquareIcon },
  { id: "courses", label: "My Courses", icon: AcademicCapIcon },
  { id: "chats", label: "AI Chats", icon: ChatBubbleLeftRightIcon },
  { id: "tools", label: "Tool Results", icon: WrenchScrewdriverIcon },
  { id: "history", label: "Reading History", icon: ClockIcon },
];

const PILLAR_STYLES: Record<string, string> = {
  policy: "text-sky-700 bg-sky-50 border-sky-200",
  economics: "text-emerald-700 bg-emerald-50 border-emerald-200",
  technology: "text-indigo-700 bg-indigo-50 border-indigo-200",
  clinical: "text-red-700 bg-red-50 border-red-200",
  equity: "text-violet-700 bg-violet-50 border-violet-200",
  operations: "text-teal-700 bg-teal-50 border-teal-200",
};

function bookmarkHref(b: Bookmark): string {
  if (b.content_type === "policyAnalysis") return `/${b.pillar}/${b.slug}`;
  if (b.content_type === "caseStudy") return `/academy/case-studies/${b.slug}`;
  if (b.content_type === "chapter") return `/read/${b.slug}`;
  return `/${b.slug}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LibraryShell({
  userName,
  bookmarks,
  enrollments,
  certifications,
  completedModuleCount,
}: Props) {
  const [active, setActive] = useState<SectionId>("overview");

  // Deep-link via URL hash: /library#chapters
  useEffect(() => {
    const fromHash = () => {
      const h = (window.location.hash || "").replace("#", "") as SectionId;
      if (SECTIONS.some((s) => s.id === h)) setActive(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const setSection = (id: SectionId) => {
    setActive(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const articles = bookmarks.filter(
    (b) => b.content_type !== "chapter"
  );
  const chapters = bookmarks.filter((b) => b.content_type === "chapter");
  const notes = bookmarks.filter((b) => b.note && b.note.trim().length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900">My Library</h1>
        <p className="text-sm text-slate-500 mt-1">
          Welcome back, {userName}. Everything you&rsquo;ve saved or are working on.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        {/* Left rail */}
        <nav className="space-y-1">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`w-full flex items-center gap-2 px-2 h-9 rounded-xl text-left transition-colors ${
                  isActive
                    ? "bg-slate-100 dark:bg-slate-700"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                    isActive ? "bg-indigo-100" : "bg-slate-100 dark:bg-slate-700"
                  }`}
                >
                  <Icon
                    className={`w-3 h-3 ${
                      isActive ? "text-indigo-600" : "text-slate-500"
                    }`}
                  />
                </span>
                <span
                  className={`text-[13px] tracking-wide ${
                    isActive
                      ? "font-bold text-slate-900 dark:text-slate-50"
                      : "font-semibold text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right pane */}
        <div className="min-w-0">
          {active === "overview" && (
            <Overview
              articleCount={articles.length}
              chapterCount={chapters.length}
              noteCount={notes.length}
              enrollmentCount={enrollments.length}
              certCount={certifications.length}
              completedModuleCount={completedModuleCount}
              recent={bookmarks.slice(0, 5)}
              onJump={setSection}
            />
          )}
          {active === "articles" && (
            <ArticlesSection items={articles} />
          )}
          {active === "chapters" && (
            <ChaptersSection items={chapters} />
          )}
          {active === "notes" && <NotesSection items={notes} />}
          {active === "courses" && (
            <CoursesSection
              enrollments={enrollments}
              certifications={certifications}
              completedModuleCount={completedModuleCount}
            />
          )}
          {active === "chats" && <ComingSoon
            title="AI Chats"
            description="Your saved conversations with the AI Analyst will live here once chat history persistence ships."
            icon={ChatBubbleLeftRightIcon}
            ctaLabel="Open AI Analyst"
            ctaHref="/chat"
          />}
          {active === "tools" && <ComingSoon
            title="Tool Results"
            description="Saved runs of the Transformation Scorecard, VBC Readiness check, and other Research Lab tools will appear here."
            icon={WrenchScrewdriverIcon}
            ctaLabel="Browse Research Lab"
            ctaHref="/research-lab"
          />}
          {active === "history" && <ComingSoon
            title="Reading History"
            description="A running list of recently viewed articles, chapters, and pages — coming when view-tracking lands."
            icon={ClockIcon}
          />}
        </div>
      </div>
    </div>
  );
}

// ─── Sections ────────────────────────────────────────────────────────────────

function Overview({
  articleCount,
  chapterCount,
  noteCount,
  enrollmentCount,
  certCount,
  completedModuleCount,
  recent,
  onJump,
}: {
  articleCount: number;
  chapterCount: number;
  noteCount: number;
  enrollmentCount: number;
  certCount: number;
  completedModuleCount: number;
  recent: Bookmark[];
  onJump: (id: SectionId) => void;
}) {
  const stats: { label: string; value: number; jump: SectionId }[] = [
    { label: "Saved articles", value: articleCount, jump: "articles" },
    { label: "Saved chapters", value: chapterCount, jump: "chapters" },
    { label: "Notes", value: noteCount, jump: "notes" },
    { label: "Courses enrolled", value: enrollmentCount, jump: "courses" },
    { label: "Modules done", value: completedModuleCount, jump: "courses" },
    { label: "Certificates", value: certCount, jump: "courses" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => onJump(s.jump)}
            className="text-left bg-white border border-slate-200 rounded-2xl p-4 hover:border-slate-300 hover:shadow-sm transition-all"
          >
            <div className="text-2xl font-black text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </button>
        ))}
      </div>

      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">
          Recently saved
        </h2>
        {recent.length === 0 ? (
          <EmptyState
            icon={BookmarkIcon}
            title="Nothing saved yet"
            description="Click the bookmark icon on any article or chapter to start building your library."
          />
        ) : (
          <div className="space-y-2">
            {recent.map((b) => (
              <BookmarkRow key={b.sanity_id} item={b} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ArticlesSection({ items }: { items: Bookmark[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={BookmarkIcon}
        title="No saved articles yet"
        description="Click the bookmark icon on any article card to save it here for later."
        ctaLabel="Browse Articles"
        ctaHref="/"
      />
    );
  }
  const byPillar: Record<string, Bookmark[]> = {};
  for (const item of items) {
    const key = item.pillar ?? "other";
    if (!byPillar[key]) byPillar[key] = [];
    byPillar[key].push(item);
  }
  return (
    <div className="space-y-8">
      {Object.entries(byPillar).map(([pillar, list]) => (
        <section key={pillar}>
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
                PILLAR_STYLES[pillar] ??
                "text-slate-600 bg-slate-50 border-slate-200"
              }`}
            >
              {pillar === "other" ? "Uncategorized" : pillar}
            </span>
            <span className="text-xs text-slate-400">
              {list.length} article{list.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="space-y-2">
            {list.map((b) => (
              <BookmarkRow key={b.sanity_id} item={b} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ChaptersSection({ items }: { items: Bookmark[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={BookOpenIcon}
        title="No saved chapters yet"
        description={`Open a chapter of "Transforming American Healthcare" and tap the bookmark icon to save it here.`}
        ctaLabel="Read the Book"
        ctaHref="/book"
      />
    );
  }
  return (
    <div className="space-y-2">
      {items.map((b) => (
        <BookmarkRow key={b.sanity_id} item={b} />
      ))}
    </div>
  );
}

function NotesSection({ items }: { items: Bookmark[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={PencilSquareIcon}
        title="No notes yet"
        description="Notes attached to your bookmarks will appear here. (Note-taking UI coming soon to bookmark rows.)"
      />
    );
  }
  return (
    <div className="space-y-3">
      {items.map((b) => (
        <div
          key={b.sanity_id}
          className="bg-white border border-slate-200 rounded-xl p-4"
        >
          <Link
            href={bookmarkHref(b)}
            className="block font-bold text-sm text-slate-800 hover:text-indigo-700"
          >
            {b.title}
          </Link>
          <p className="text-sm text-slate-600 mt-2 whitespace-pre-wrap">
            {b.note}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Saved {formatDate(b.created_at)}
          </p>
        </div>
      ))}
    </div>
  );
}

function CoursesSection({
  enrollments,
  certifications,
  completedModuleCount,
}: {
  enrollments: EnrollmentRow[];
  certifications: CertificationRow[];
  completedModuleCount: number;
}) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="text-2xl font-black text-indigo-600">
            {enrollments.length}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Enrolled</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="text-2xl font-black text-emerald-600">
            {completedModuleCount}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Modules done</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="text-2xl font-black text-amber-600">
            {certifications.length}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Certificates</div>
        </div>
      </div>

      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">
          Enrolled courses
        </h2>
        {enrollments.length === 0 ? (
          <EmptyState
            icon={AcademicCapIcon}
            title="No courses enrolled yet"
            description="Browse the Academy to find a course to start."
            ctaLabel="Browse Courses"
            ctaHref="/academy/courses"
          />
        ) : (
          <div className="space-y-2">
            {enrollments.map((e) => {
              const pct = e.progress_pct ?? 0;
              const done = e.completed_at !== null;
              return (
                <Link
                  key={e.id}
                  href={`/academy/courses/${e.course_slug}`}
                  className="block bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="font-bold text-sm text-slate-800 capitalize">
                      {e.course_slug.replace(/-/g, " ")}
                    </span>
                    <span className="text-xs font-bold text-slate-500 shrink-0">
                      {done ? "Completed" : `${pct}%`}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        done ? "bg-emerald-500" : "bg-indigo-500"
                      }`}
                      style={{ width: `${done ? 100 : pct}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">
          Certificates
        </h2>
        {certifications.length === 0 ? (
          <EmptyState
            icon={AcademicCapIcon}
            title="No certificates yet"
            description="Complete a course to earn one."
          />
        ) : (
          <div className="space-y-2">
            {certifications.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="font-bold text-sm text-slate-800">
                    {c.cert_name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Issued {formatDate(c.issued_at)}
                  </div>
                </div>
                {c.cert_url && (
                  <a
                    href={c.cert_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition-colors shrink-0"
                  >
                    Download
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ─── Shared bits ─────────────────────────────────────────────────────────────

function BookmarkRow({ item }: { item: Bookmark }) {
  return (
    <div className="flex items-start justify-between gap-4 bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:border-slate-300 hover:shadow-sm transition-all group">
      <div className="flex-1 min-w-0">
        <Link href={bookmarkHref(item)} className="block">
          <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors leading-snug">
            {item.title}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Saved {formatDate(item.created_at)}
          </p>
        </Link>
      </div>
      <BookmarkButton
        sanityId={item.sanity_id}
        slug={item.slug}
        title={item.title}
        pillar={item.pillar ?? undefined}
        contentType={item.content_type ?? undefined}
        initialSaved={true}
        size="sm"
        className="mt-0.5 shrink-0"
      />
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl">
      <Icon className="w-10 h-10 text-slate-300 mx-auto mb-4" />
      <h3 className="text-base font-bold text-slate-600 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mx-auto">{description}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

function ComingSoon({
  title,
  description,
  icon,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div>
      <div className="inline-block text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border text-amber-700 bg-amber-50 border-amber-200 mb-3">
        Coming soon
      </div>
      <EmptyState
        icon={icon}
        title={title}
        description={description}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
      />
    </div>
  );
}
