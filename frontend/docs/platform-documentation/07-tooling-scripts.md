# 07 — Tooling & Scripts Reference

> **Verified against:** `frontend/package.json`, `frontend/scripts/` (~90 files), `backend/scripts/`, repo-root `scripts/`, `scripts/generate-narration-piper.sh`, `frontend/scripts/check-bundle-size.sh`, generator helpers (`generate_pptx.py`, `generate_whitepaper_docx.py`, `scripts/legacy-python/`).

This is the field manual for every command and script. Scripts fall into five families: **build/QA**, **content (Sanity)**, **data/Academy (Supabase)**, **media/narration**, and **document generation**.

## Table of contents
1. [Safety rules for all scripts](#1-safety-rules-for-all-scripts)
2. [Build & QA commands](#2-build--qa-commands)
3. [Content scripts (Sanity)](#3-content-scripts-sanity)
4. [Content quality / audit scripts](#4-content-quality--audit-scripts)
5. [Academy & Supabase scripts](#5-academy--supabase-scripts)
6. [Backend data loaders](#6-backend-data-loaders)
7. [Media & narration (Piper TTS)](#7-media--narration-piper-tts)
8. [Document generation (PDF/DOCX/PPTX)](#8-document-generation-pdfdocxpptx)
9. [How to run any script safely](#9-how-to-run-any-script-safely)

---

## 1. Safety rules for all scripts

> ⚠️ Read these before running anything that writes.

1. **Content scripts target the PRODUCTION Sanity dataset** (`production`) and **Supabase** via service-role keys. There is no staging guard. Inspect target IDs first.
2. **Run from `frontend/scripts/`** so node resolves `@supabase/supabase-js` and other deps. A script copied to `/tmp` will fail.
3. **Seed scripts are upsert-only** — they never delete. Removing content requires a direct DB delete + orphan check.
4. **Several scripts delete documents** (`triage-delete.mjs`, `clean-garbage.mjs`, `delete-redundant-academy-modules.mjs`, `reset-database.js`). Treat as destructive.
5. Scripts read secrets from `frontend/.env.local`. Confirm it points at the intended project.

## 2. Build & QA commands

Run from `frontend/`:

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (`next dev --webpack`) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run lint:strict` | ESLint, fail on any warning |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Playwright e2e (`frontend/e2e/`) |
| `npm run test:e2e:install` | Install Playwright chromium |
| `npm run bundle:check` | `scripts/check-bundle-size.sh` — fails if largest non-`/studio` chunk exceeds threshold (Studio is excluded; it's ~4 MB by design) |
| `npm run smoke` | typecheck → lint → build → bundle:check (**the pre-push gate**) |
| `npm run seed:courses` | Seed Academy courses |

## 3. Content scripts (Sanity)

**Import / seed** (run from `frontend/`, `node scripts/<name>`):

| Script | Purpose |
|---|---|
| `bulk_import.js`, `import.js`, `import_one.js` | Push JSON documents into Sanity |
| `import-glossary.js` | Seed glossary `definition` docs |
| `seed-webinars.js` | Seed `webinar` docs |
| `seed-reports.js` | Seed `report` docs |
| `seed-caseStudies.js` | Seed `caseStudy` docs |
| `seed-ticker.js` | Seed `ticker` metrics |
| `seed-sanity-performance-index.ts` | Seed `statePerformanceIndex` |
| `seed-sanity-rht.ts` | Seed `rhtState` profiles |
| `convert_sanity_to_supabase.mjs` | Convert Sanity content into Supabase rows |

**Generation:** `frontend/sanity/generate_sanity_content.py` + the prompt templates (`Prompt_Template_Final.txt`, `ultimate_prompt*.txt`, `master_instructions_block.txt`) drive AI-assisted drafting; JSON outputs land in `frontend/sanity/content/*.json`, then are imported.

## 4. Content quality / audit scripts

The Analysis-quality program (used to deep-rewrite and source all 77 Analyses):

| Script | Purpose |
|---|---|
| `audit-analysis-length.mjs` | Flag too-short/thin Analyses |
| `clean-policy-analysis.mjs` | Clean/normalize Analysis bodies |
| `neutralize-unverifiable.mjs` | Remove/soften unverifiable claims |
| `scan-htr-claims.mjs` / `purge-htr-claims.mjs` | Find & remove fabricated proprietary "HTR" stats |
| `extract-low51-claims.mjs`, `sweep-low51.mjs`, `scan-remaining79.mjs` | Targeted claim sweeps |
| `expand-batch-{clinical,econ,equity,policy,tech}-N.mjs`, `expand-batch-final.mjs` | Batch-expand thin briefs by pillar |
| `fix-broken-sanity-links.mjs`, `remap-interop-slugs.mjs`, `backfill-analysis-chapterref.mjs`, `backfill-editorial-pillar-chapter.mjs` | Link/metadata repair |
| `triage-queue.mjs`, `triage-delete.mjs`, `clean-garbage.mjs` | Triage & delete junk docs (⚠️ destructive) |
| `append-vbc-sources.mjs`, `fix-dsh-brief.mjs`, `fix-remaining-blocks.mjs`, `fix-validated-blocks.mjs` | One-off content fixes |

> See `ANALYSIS_CONTENT_STANDARDS.md`, `CONTENT_CORRECTIONS.md`, `VALIDATION_TRIAGE.md` for the editorial rules these scripts enforce.

## 5. Academy & Supabase scripts

| Script | Purpose |
|---|---|
| `seed-courses.mjs` (`npm run seed:courses`) | Seed course structure |
| `seed-all-courses.mjs`, `seed-courses-tier2.mjs` | Seed additional course tiers |
| `seed-courses.ts`, `seed-content.ts`, `seed-supabase.js` | Seed Supabase content |
| `link-sanity-slugs.mjs` | **Set `lessons.sanity_slug`** so rich Sanity bodies render |
| `audit-courses.mjs` | Validate course/track/lesson integrity & find orphans |
| `add-hie-intro-lesson.mjs`, `remove-welcome-lesson.mjs`, `restore-welcome-standalone.mjs` | Lesson membership edits |
| `delete-redundant-academy-modules.mjs` | Remove dupe modules (⚠️) |
| `sync-embeddings.ts` | Sync content embeddings into pgvector |
| `seed-hospitals.ts` | Seed hospital data |
| `reset-database.js` | ⚠️ **Reset the database — destructive** |

**Backend Academy generator:** `frontend/scripts/generate_course5.py`, `merge-expansions.py`.

## 6. Backend data loaders

Run from `backend/` with the venv active (`python scripts/<name>.py`):

| Script | Purpose |
|---|---|
| `load_cms_hospitals.py` | Load CMS hospital dataset |
| `load_cms_quality_scores.py` | Load CMS quality scores |
| `sync_hospitals.py` | Sync hospital records |
| `sync_hti_scores.py` | Sync Health Tech Index scores |

## 7. Media & narration (Piper TTS)

Repo-root `scripts/`:

- **`generate-narration-piper.sh`** — neural TTS via **Piper** (local, MIT-licensed, no API keys). Reads `.txt` files and writes one `.m4a` per file to `frontend/public/audio/narration/` (WAV → AAC/M4A via ffmpeg, ~10× smaller). Uses `.piper-venv` + `.piper-voices`.
  ```bash
  ./scripts/generate-narration-piper.sh            # all chapters
  ./scripts/generate-narration-piper.sh chapter-3  # one file
  ```
- **`generate-narration-audio.sh`** — older fallback narration generator.

Narration powers the book listen experience (`/book/listen`, `BookListenPlayer.tsx`) and the platform's voice/TTS layer (`frontend/lib/narration.ts`, `VoiceContext.tsx`, `VoiceFab.tsx`, activated with ⌘⇧V).

## 8. Document generation (PDF/DOCX/PPTX)

Repo-root tooling produces the marketing/whitepaper/deck artifacts (the `*.pdf`, `*.docx`, `*.pptx` files at repo root):

| Script | Produces |
|---|---|
| `generate_pptx.py` | `COMBINED_DECK.pptx` and slide decks from the `*_DECK.md` sources |
| `generate_whitepaper_docx.py` | `HTR_WHITE_PAPER.docx` from `HTR_WHITE_PAPER.md` |
| `scripts/legacy-python/convert.py`, `merge_to_word.py`, `merge_images.py` | Markdown→Word / image merge utilities |
| `scripts/legacy-python/digest_latest.py`, `digest_critical.py` | Build content digests |

**To render this documentation set to PDF** (for the "35-page" deliverable), any markdown→PDF tool works; e.g. with pandoc:

```bash
cd frontend/docs/platform-documentation
pandoc 0*.md 1*.md -o Vermont-Health-Platform-Documentation.pdf \
  --toc --pdf-engine=xelatex -V geometry:margin=1in
```

(The repo already produces `.md.pdf` companions for many root docs, so a markdown→PDF pipeline is established.)

## 9. How to run any script safely

1. `cd /Users/baba/Vermont-Health-Platform/frontend` (most content scripts) **or** `backend/` with the venv.
2. Confirm `frontend/.env.local` points at the intended Sanity dataset / Supabase project.
3. For destructive scripts, first **read the script** and dry-run / log target IDs (most print what they'll touch).
4. Run: `node scripts/<name>.mjs` (or `node scripts/<name>.js`, `npx tsx scripts/<name>.ts`, `python scripts/<name>.py`).
5. Verify in the app and/or in Sanity Studio / Supabase before moving on.

Continue to → [08 — Operations, Deployment & Maintenance](./08-operations-deployment.md)
