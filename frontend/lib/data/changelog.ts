/**
 * Platform changelog.
 *
 * Append new entries to the TOP of the array. Each release groups changes
 * by category. Categories displayed in this order:
 *   added → changed → fixed → removed → infra
 *
 * Keep entries reader-friendly — this is the user-visible changelog, not the
 * git log. For raw commit history see GitHub.
 */

export type ChangelogCategory = "added" | "changed" | "fixed" | "removed" | "infra";

export interface ChangelogEntry {
  /** Release tag — does not have to be a semver version. */
  version: string;
  /** Release date (YYYY-MM-DD). */
  date: string;
  /** Optional short summary shown under the heading. */
  summary?: string;
  /** Bulleted changes grouped by category. */
  changes: Partial<Record<ChangelogCategory, string[]>>;
}

export const CHANGELOG: readonly ChangelogEntry[] = [
  {
    version: "Phase 4 — Launch readiness",
    date: "2026-05-19",
    summary:
      "Pre-launch hardening — every lint error fixed, every heavy route has loading + error states, accessibility polish, and a public changelog.",
    changes: {
      added: [
        "Loading skeletons for /read/[slug], /compare-states, /book/listen",
        "Error boundary at /read/[slug] (graceful fallback when transcript missing)",
        "Public /changelog route",
        "Auth regression checklist in frontend/docs/auth.md",
      ],
      fixed: [
        "7 react-hooks/rules-of-hooks bugs in DashboardIndexClient + LearningTracksHub",
        "no-assign-module-variable in AcademyModuleEngine and module page",
        "no-html-link-for-pages in community new-thread routes",
        "no-unused-expressions in EvidenceLibrary and RiskStratificationEngine",
        "Missing iframe title on Spotify/SoundCloud embeds",
        "Missing aria-labels on icon-only buttons in bed-capacity",
      ],
      infra: [
        "CI lint step now strict (continue-on-error removed)",
        "0 lint errors across 174 routes, 111 components",
      ],
    },
  },
  {
    version: "Phase 3 — Reader Mode + features",
    date: "2026-05-19",
    summary:
      "Six new user-visible features: chapter reader, cross-device bookmarks, private notes, shareable simulator state, cross-state comparison, weekly email digest.",
    changes: {
      added: [
        "Reader Mode at /read/[slug] — every book chapter renders as HTML",
        "Chapter bookmarks (cross-device, Supabase-backed)",
        "Private chapter notes for subscribers (/api/chapter-notes)",
        "Shareable Act 167 simulator URLs (?recs=R1,R2,…)",
        "Side-by-side state comparison at /compare-states",
        "Weekly email digest scaffold (Vercel cron + Loops)",
        "Migrations 026 (chapter_notes) and 027 (digest_opt_in)",
      ],
      changed: [
        "Book page 'Read Online' CTA now opens Reader Mode (not the PDF)",
        "Chapter cards link to their reader page",
        "/saved page routes chapter bookmarks to /read/<slug>",
      ],
      infra: [
        "lib/narration.ts unifies the chapter ↔ track/audio/text mapping",
      ],
    },
  },
  {
    version: "Phase 2 — Refactor + foundations",
    date: "2026-05-19",
    summary:
      "Six largest components split, every pillar page collapsed to ~10 lines, ESLint repaired, e2e smoke tests, GitHub Action.",
    changes: {
      added: [
        "<PillarOverview /> component drives 5 pillar pages from data",
        "lib/data/pillar-topics.ts and lib/data/state-comparison.ts",
        "components/policy/HR1Tracker.tsx extracted",
        "lib/ai/stream.ts — consumeChatStream() supports legacy + NDJSON",
        "Playwright smoke tests for top 10 routes + chat API contract",
        "GitHub Action e2e job (boots Next.js, runs Playwright)",
      ],
      changed: [
        "PolicySimulator, HTAStudio, WorkforceModeler, ResearchWorkspace, APMDesignLab — each split into shell + tabs + data + atoms (all shells ≤110 lines)",
        "vermont-act-167/simulator/page.tsx: 2,248 → 104 lines (9 tabs in ./tabs/)",
        "RightSidebar + chat/page use the shared stream helper (no duplicate parser)",
      ],
      fixed: [
        "ESLint config replaced (was using flat-config APIs not present in v8)",
      ],
    },
  },
  {
    version: "Phase 1 — Stabilise + Taxonomy",
    date: "2026-05-18",
    summary:
      "Single source of truth for the six pillars, all chapters, every research-lab tool, every state program. One edit propagates across the platform.",
    changes: {
      added: [
        "lib/taxonomy/ — pillars, chapters, tools, programs",
        "<FromTheBookForPillar /> derives chapter range from taxonomy",
        "BackendStatus indicator wired into Header",
        "Beta-gate + role-gating documentation in frontend/docs/auth.md",
      ],
      changed: [
        "/book hardcoded chapter list → reads from lib/taxonomy/chapters.ts (666 → 290 lines)",
        "HomeSidebar + Header mega-menu derive pillars from taxonomy",
        "BYPASS_AUTH now env-gated via ALLOW_AUTH_BYPASS (default false)",
      ],
      removed: [
        "Stale repomix-output.txt (2.4 MB), frontend/dist/, loose .txt/.docx notes",
      ],
      infra: [
        "Loose Python scripts moved to scripts/legacy-python/",
      ],
    },
  },
  {
    version: "Audio narration + listen page",
    date: "2026-05-18",
    summary:
      "22 chapter narration scripts written + 22 audio files generated via macOS TTS, all served at /book/listen.",
    changes: {
      added: [
        "Preface, Introduction, and Chapters 1–20 narration transcripts (~1,500 words each)",
        "22 .m4a audio files (~10 minutes per chapter)",
        "/book/listen route with track sidebar, playback, auto-advance, transcript links",
        "scripts/generate-narration-audio.sh — idempotent TTS generator",
        "SVG book cover at /book-cover.svg, floated in /book hero",
      ],
    },
  },
];
