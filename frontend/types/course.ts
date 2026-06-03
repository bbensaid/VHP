// ============================================================
// HTR Course System — TypeScript Types
// ============================================================

// ── Enums ────────────────────────────────────────────────────

export type Pillar =
  | "general"
  | "policy"
  | "technology"
  | "economics"
  | "clinical"
  | "equity"
  | "operations";

export type LessonContentBlockType =
  | "text"
  | "heading"
  | "video"
  | "audio_slot"
  | "concepts_grid"
  | "timeline"
  | "callout"
  | "key_stat"
  | "comparison_table"
  | "glossary_terms";

export type QuizQuestionType = "single_choice" | "multi_choice" | "true_false";

export type EnrollmentStatus =
  | "not_started"
  | "in_progress"
  | "completed"
  | "paused";

export type LessonProgressStatus =
  | "not_started"
  | "in_progress"
  | "completed";

export type MediaType = "youtube" | "vimeo" | "upload" | "external";

// ── Content Blocks ───────────────────────────────────────────

export interface TextBlock {
  type: "text";
  heading?: string;
  body: string; // supports markdown
}

export interface HeadingBlock {
  type: "heading";
  text: string;
  level?: 2 | 3 | 4; // h2 default
}

export interface VideoBlock {
  type: "video";
  mediaType: MediaType;
  videoId?: string;       // YouTube/Vimeo ID
  url?: string;           // for upload or external
  caption: string;
  durationSeconds?: number;
  thumbnailUrl?: string;
}

export interface AudioSlotBlock {
  type: "audio_slot";
  label: string;
  hint: string;           // instructor upload guidance
  uploadedUrl?: string;   // populated after admin uploads
  transcriptUrl?: string;
}

export interface ConceptItem {
  icon: string;           // Tabler icon name e.g. "ti-shield"
  title: string;
  body: string;
}

export interface ConceptsGridBlock {
  type: "concepts_grid";
  heading?: string;
  items: ConceptItem[];
}

export interface TimelineItem {
  year: string;
  title: string;
  body: string;
  pillar?: Pillar;        // for color coding
}

export interface TimelineBlock {
  type: "timeline";
  heading?: string;
  items: TimelineItem[];
}

export interface CalloutBlock {
  type: "callout";
  variant: "info" | "warning" | "success" | "tip";
  heading?: string;
  body: string;
}

export interface KeyStatBlock {
  type: "key_stat";
  heading?: string;
  stats: Array<{
    value: string;
    label: string;
    source?: string;
  }>;
}

export interface ComparisonRow {
  label: string;
  left: string;
  right: string;
}

export interface ComparisonTableBlock {
  type: "comparison_table";
  heading?: string;
  leftLabel: string;
  rightLabel: string;
  rows: ComparisonRow[];
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  pillar?: Pillar;
}

export interface GlossaryBlock {
  type: "glossary_terms";
  heading?: string;
  terms: GlossaryTerm[];
}

export interface SanityPortableTextBlock {
  type: "sanity_portable_text";
  body: unknown[];
}

export type ContentBlock =
  | TextBlock
  | HeadingBlock
  | VideoBlock
  | AudioSlotBlock
  | ConceptsGridBlock
  | TimelineBlock
  | CalloutBlock
  | KeyStatBlock
  | ComparisonTableBlock
  | GlossaryBlock
  | SanityPortableTextBlock;

// ── Quiz ─────────────────────────────────────────────────────

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  options: QuizOption[];
  explanation?: string; // shown after answer
  points: number;
}

export interface Quiz {
  id: string;
  title?: string;
  passingScore: number;       // 0–100
  questions: QuizQuestion[];
  shuffleOptions?: boolean;
}

// ── Lesson ───────────────────────────────────────────────────

export interface LessonObjective {
  id: string;
  text: string;
}

export interface Lesson {
  id: string;
  trackId: string;
  pillar: Pillar;
  order: number;
  title: string;
  slug: string;
  summary: string;            // 1–2 sentence description
  estimatedMinutes: number;
  objectives: LessonObjective[];
  contentBlocks: ContentBlock[];
  sanitySlug?: string | null;  // Sanity academyModule slug — when set, content is fetched from Sanity
  sanityBody?: unknown[];      // raw Sanity portable-text — rendered by AcademyContent when present
  quiz?: Quiz;
  tags: string[];
  relatedLessonIds?: string[];
  isPublished: boolean;
  createdAt: string;          // ISO
  updatedAt: string;
}

// ── Track ────────────────────────────────────────────────────

export interface Track {
  id: string;
  courseId: string;
  pillar: Pillar;
  order: number;
  title: string;
  slug: string;
  description: string;
  icon: string;               // Tabler icon name
  targetAudience: string[];
  lessons: Lesson[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Course ───────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  coverImageUrl?: string;
  targetAudience: string[];
  prerequisites: string[];
  estimatedHours: number;
  pillar?: Pillar;            // lowercase pillar id (Supabase courses.pillar)
  chapterRef?: string | null; // book chapter num (courses.chapter_ref) — book tie-in
  tracks: Track[];
  isPublished: boolean;
  version: string;            // e.g. "1.0.0"
  createdAt: string;
  updatedAt: string;
}

// ── Progress / Enrollment ────────────────────────────────────

export interface QuizAttempt {
  id: string;
  userId: string;
  lessonId: string;
  quizId: string;
  answers: Record<string, string | string[]>; // questionId → optionId(s)
  score: number;              // 0–100
  passed: boolean;
  completedAt: string;
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  status: LessonProgressStatus;
  startedAt?: string;
  completedAt?: string;
  audioUploads: Record<string, string>; // slotId → uploadedUrl
  quizAttempts: QuizAttempt[];
  bestQuizScore?: number;
}

export interface TrackProgress {
  userId: string;
  trackId: string;
  completedLessonIds: string[];
  percentComplete: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  completedAt?: string;
  percentComplete: number;
  currentLessonId?: string;
  lessonProgress: Record<string, LessonProgress>; // lessonId → progress
  trackProgress: Record<string, TrackProgress>;
}

// ── User-facing derived types ─────────────────────────────────

export interface LessonWithProgress extends Lesson {
  progress?: LessonProgress;
}

export interface TrackWithProgress extends Omit<Track, "lessons"> {
  lessons: LessonWithProgress[];
  progress?: TrackProgress;
}

export interface CourseWithProgress extends Omit<Course, "tracks"> {
  tracks: TrackWithProgress[];
  enrollment?: Enrollment;
}
