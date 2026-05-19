# New Features — Documentation

Everything added in this session, what it is, where it lives, and what to do next.

---

## 1. Documents (repo root)

### `UPGRADE_PLAN.md` — Codebase audit + 4-phase upgrade plan

- **What it is:** Full audit of the Next.js frontend, Python AI backend, supporting infra, and book↔platform integration. Findings tiered P0/P1/P2/P3. A four-phase upgrade plan with effort estimates.
- **Status:** Phase 1 complete and shipped. Phases 2–4 still scoped but not started.
- **Where:** [UPGRADE_PLAN.md](../../UPGRADE_PLAN.md)
- **Where to go from here:** When ready to start Phase 2 (refactoring the heavy research components, splitting the 2,200-line files), open this doc and use it as the work plan.

### `PLATFORM_DECK.md`, `BOOK_DECK.md`, `COMBINED_DECK.md` — Slide decks

- **What they are:** Three markdown slide decks. Platform-only (60 slides), book-only (60 slides), combined book+platform (65 slides). Each slide is `---`-separated. Speaker notes are blockquoted under each slide.
- **Where:** Repo root.
- **Where to go from here:** Open in [Marp](https://marp.app/), [Slidev](https://sli.dev/), or paste sections into Keynote/Google Slides. Two PDFs are already generated at `PLATFORM_DECK.md.pdf` and `COMBINED_DECK.md.pdf`. To convert any deck to PDF: `pandoc DECK.md -o DECK.pdf` (with `--pdf-engine=xelatex` for nicer typography).

---

## 2. Code changes — Phase 1 (committed)

### `lib/taxonomy/` — Single source of truth

Five files in [frontend/lib/taxonomy/](../lib/taxonomy/):

| File | Holds | Edit when |
|---|---|---|
| `pillars.ts` | The six pillars: id, label, color, accent classes | A pillar is renamed or its color scheme changes |
| `tools.ts` | Every Research Lab tool + simulator: id, href, pillars, chapters | A tool is added, renamed, or moves to a different lab tab |
| `chapters.ts` | All 22 book entries: num, title, desc, pillar, platformLinks (by tool id) | **The book changes** — this is the most-edited file going forward |
| `programs.ts` | Vermont, Oregon, California state-program pages | A new state program page is added |
| `index.ts` | Re-export surface | Never |

**The whole point of this module:** when the book changes (which you said happens often), you now edit *one file* — `chapters.ts`. The book browser at `/book`, the `FromTheBook` callouts on each pillar page, the home sidebar, and the header mega-menu all read from it.

**Where to go from here:** When the v29 book updates from `HTR_Book_Updates_v28.md` land, open `chapters.ts`, add the new chapter content / re-map the platform links, save. Everything else updates.

### `BackendStatus` in the Header

A small AI status indicator (green / amber / red dot) lives in the header at desktop sizes, polling `/api/health`. When the Python backend goes offline, it surfaces visibly instead of the user discovering it via a failed chat.

### Auth bypass is env-gated

`middleware.ts` reads `process.env.ALLOW_AUTH_BYPASS` instead of a hard-coded constant. Default = `false`. During beta keep `ALLOW_AUTH_BYPASS=true` in your Vercel env. At GA, unset it. Middleware emits a `console.warn` in prod if left on, as a tripwire.

Documented in [auth.md](./auth.md).

### Repo cleanup

- Loose `.txt`/`.docx`/`.json`/`.html` notes moved to `frontend/docs/` or `frontend/docs/archive/`
- Ad-hoc Python scripts moved to repo-root `scripts/legacy-python/`
- 2.4 MB stale `repomix-output.txt` deleted and gitignored
- `npm run smoke` added (typecheck + lint + build)

---

## 3. Audio narration (the new big thing)

### Where everything lives

- **Scripts (`.txt`):** [frontend/public/audio/narration/](../public/audio/narration/) — 22 files, one per chapter (00-preface, 01-introduction, 02-chapter-01 … 21-chapter-20). Each ~1,500 words.
- **Audio (`.m4a`):** Same folder, same naming. Each ~4 MB, ~10 minutes spoken, AAC encoded.
- **Generator script:** [scripts/generate-narration-audio.sh](../../scripts/generate-narration-audio.sh)
- **Listen page:** `/book/listen` ([frontend/app/book/listen/page.tsx](../app/book/listen/page.tsx) + [BookListenPlayer.tsx](../components/BookListenPlayer.tsx))

### How the audio was made

The current audio was generated with **macOS built-in TTS** (`/usr/bin/say` + `afconvert`) using the Samantha voice at 175 words per minute. It's intelligible. It is not premium. The robotic cadence will be obvious to listeners.

### How to regenerate / upgrade

The transcript files (`.txt`) are the source of truth. To regenerate the audio at any time:

```bash
# Default — Samantha voice, all chapters
./scripts/generate-narration-audio.sh

# Single chapter
./scripts/generate-narration-audio.sh 02-chapter-01

# Different macOS voice (try `Daniel` for British, `Alex` for older male)
VOICE=Daniel ./scripts/generate-narration-audio.sh

# Faster/slower
RATE=200 ./scripts/generate-narration-audio.sh

# See all installed voices
say -v "?"
```

The script is idempotent — if a `.m4a` is newer than its source `.txt`, it skips.

### How to upgrade to premium TTS

When you want production-quality voices, the path is:

**Option A — ElevenLabs (highest quality, ~$10–30 for the whole book):**

```bash
# Quick sketch of the regeneration loop you'd write
pip install elevenlabs
export ELEVENLABS_API_KEY=...

for txt in frontend/public/audio/narration/*.txt; do
  base="${txt%.txt}"
  python3 -c "
from elevenlabs.client import ElevenLabs
from elevenlabs import save
client = ElevenLabs()
with open('$txt') as f: text = f.read()
audio = client.generate(text=text, voice='Rachel', model='eleven_turbo_v2_5')
save(audio, '${base}.mp3')
"
done
```

**Option B — OpenAI TTS (~$3–5 for the whole book):**

```bash
pip install openai
export OPENAI_API_KEY=...
# The TTS endpoint has a ~4096 char input limit; chapters are ~9000 chars so
# you'll need to split each transcript into 2-3 chunks and concatenate the
# resulting MP3s with ffmpeg. About 30 lines of Python.
```

Either way, the transcript files don't change. Only the audio gets regenerated.

### How the listen page works

[/book/listen](http://localhost:3000/book/listen) renders the 22 tracks. Click a track in the left sidebar; the player on the right loads the corresponding `.m4a` and lets you play, pause, seek, and download. When a track ends, auto-advances to the next. Transcripts are linked beside each audio file.

If an `.m4a` is missing (e.g., the script hasn't been run), the player shows a friendly "audio not yet generated" message and the transcript link still works.

### Where to go from here

1. **Listen to one chapter** to decide if the macOS voice is good enough for your audience. If yes, ship as-is. If not, pick OpenAI TTS or ElevenLabs.
2. **Consider hosting the audio off-Vercel.** 106 MB of audio files in `public/` are served on every Vercel deploy. If you grow the catalog, move to Cloudflare R2, S3, or Backblaze B2 — change the `audioSrc` field in `app/book/listen/page.tsx` to point at the CDN URL.
3. **Consider syncing audio to the AI Analyst.** A subscriber could ask "play me the chapter on the Clinical Pillar" and the Analyst could route to the listen page with the right track preloaded.

---

## 4. Book cover (SVG)

- **File:** [frontend/public/book-cover.svg](../public/book-cover.svg)
- **Format:** 1200×1800 (6:9, standard book aspect ratio). Pure SVG, no external assets.
- **Where it appears:** Floating thumbnail in the top-right of the `/book` hero (md+ screens only). Also reachable directly at [/book-cover.svg](http://localhost:3000/book-cover.svg).
- **Design:** Six vertical pillars in the platform's pillar colors (sky/emerald/indigo/red/violet/teal), joined by a horizontal beam. Vermont thread accent line below. Edition 28 badge. Dark slate-to-indigo gradient.

### How to use it

- **In-app preview:** Already wired into the `/book` page.
- **Print resolution:** SVG scales infinitely. Export to high-res PNG with: `rsvg-convert -w 2400 frontend/public/book-cover.svg -o cover-2400.png` (install via `brew install librsvg`).
- **Tweaking:** Open the file, edit any value. Text strings, gradient colors, badge content are all directly editable.

### Where to go from here

The current cover is functional but generic. If you want something photographic or illustrative:

1. **For a designer:** Hand them this SVG as the brief. The pillars + Vermont thread + edition motif is the visual concept; the execution can be elevated.
2. **For an image-gen tool:** Drop the SVG into Midjourney/DALL·E as an inspiration image, or write a prompt like "Book cover for *Transforming American Healthcare: A Six-Pillar Framework for System Transformation*. Six vertical glowing pillars in distinct colors—sky blue, emerald, indigo, red, violet, teal—rising from a Vermont landscape, joined by a horizontal beam of light. Dark academic palette. Geometric, structural, serious. No text."
3. **For variants:** Save copies and tweak colors/text per edition (v29, v30…).

---

## 5. New navigation entry points

- **/book** — already existed, now has a "Listen" CTA in the hero and an embedded cover thumbnail.
- **/book/listen** — new audio player route (this session).
- **/book-cover.svg** — direct cover image, can be linked from marketing materials, social, the email digest, etc.

---

## 6. Where to go from here (prioritized)

### Immediate (this week)

1. **Listen to one or two chapters** of the macOS-generated audio. Decide if you want to upgrade to ElevenLabs/OpenAI TTS, or ship as-is.
2. **Visit `/book/listen`** in the dev server (`cd frontend && npm run dev`) to confirm the player works end-to-end.
3. **Look at the cover** at `/book` and `/book-cover.svg`. Decide if you want to iterate.

### Near-term (next 2–4 weeks)

4. **Wire the audio to subscribers' My Library** so paused tracks resume from where they left off. Needs Supabase `audio_progress` table.
5. **Consider Phase 2 of the upgrade plan** — splitting the 2,200-line research components and building the unified `<PillarOverview />` component. Mid-effort, high payoff.
6. **Update `lib/taxonomy/chapters.ts`** when the v29 book updates from `HTR_Book_Updates_v28.md` go in.

### Strategic

7. **Audio + AI Analyst integration.** Right sidebar could surface "Listen to this chapter" buttons when the user is on a pillar page that has corresponding audio.
8. **Move audio assets to a CDN.** Vercel deploys are slower with 100+ MB of audio in `public/`.
9. **Consider an RSS / podcast feed** that points to these audio files — the platform could be discoverable in Apple Podcasts / Spotify / Overcast.
10. **Multi-voice narration.** Different speakers for different chapter groups (Policy chapters one voice, Clinical chapters another). ElevenLabs supports this trivially.

### Open decisions (from the upgrade plan's Section 9)

- **Monetization** — currently parked. When you decide on tier strategy, the auth bypass should come off and role-gating should be re-enabled. Documented in `auth.md`.
- **Backend autonomy** — currently parked. Keep the Python service as-is or fold AI Analyst into Vercel edge functions? Affects deployment complexity and ongoing cost.
- **Personalized Learning role** — my recommendation in the revised UPGRADE_PLAN.md is to make it the onboarding scaffold (welcome → role picker → adaptive path), not the primary navigation. No work has been done on it yet.
