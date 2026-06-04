# Analysis Brief Content Standards

The rulebook the policyAnalysis ("Analysis") corpus in Sanity now follows. Read this
before creating or editing any Analysis brief. Current state: **77/77 PASS, QUEUE 0**
(`frontend/scripts/audit-analysis-length.mjs`). The point of these standards is to keep
the corpus from regressing — these are public-facing health-policy claims, so credibility
is the product.

---

## The rules

1. **Length floor: ≥1400 words** (target ~2000 where the topic supports it). "Close enough"
   is acceptable — do not pad a substantial, complete brief just to clear a round number,
   and do not add filler. Add *substance* (a real section) or nothing.

2. **Every statistic is web-verified** against a live external source before it ships.
   No exceptions, including for "common knowledge" figures — verify and cite.

3. **Citations: inline `(Source, year)` PLUS a "Sources" section** at the end of the body
   with full, clickable links. The audit requires ≥3 link markDefs and the literal word
   "Sources" in the body.

4. **Unverifiable claims are DELETED, not flagged.** If a statistic, entity, or report
   cannot be confirmed with a real source, remove it and (where the point still stands)
   replace it with a verified figure. Never keep an unsupported number with a hedge.
   Self-attributed / house statistics with no external source are treated as unverifiable.

5. **Correct stale claims.** Health policy moves; a brief whose premise has expired
   (e.g. a "cliff" that was since extended, a cut that was since eliminated) must be
   updated to current fact, not preserved as written. Log every such correction in
   `CONTENT_CORRECTIONS.md`.

6. **The audit is the gate.** A brief is not "done" until
   `frontend/scripts/audit-analysis-length.mjs` shows it as PASS. The audit is a progress
   tracker only — it does no quality work and is never a substitute for verifying content.

---

## How to build/edit a brief

Use the shared helper, never hand-rolled block JSON:

- **`frontend/scripts/lib/analysis-blocks.mjs`**
  - `makeBuilders(prefix)` → `{ p, h, callout, quote, table, src }` block builders.
    Use `src(label, href)` for each Sources entry (it creates the link markDef the audit counts).
  - `wordCount(body)` — local word count.
  - `applyExpansion(id, body, summary, { commit })` — the apply routine. It:
    - prints the word count,
    - **backs up the current doc** to `/sanity-backups/backup-<id>-<timestamp>.json` (this
      backup is the provenance record of the prior text),
    - **refuses to commit if under `FLOOR` (1400)**,
    - patches `body` + `summary` via the Sanity mutate API.

- **Pattern per brief:** opening framing paragraph → ~6–9 `h2` sections → a `callout` with the
  key numbers → a data `table` where useful → a "Sources" `h2` with 4–5 `src()` links → a
  `summary` string. Build 2–3 briefs per batch script (e.g. `expand-batch-*.mjs`), dry-run for
  word count, add real sections until each clears 1400, then run with `--commit`.

- **Heads-up:** first-pass drafts reliably land ~25% under estimate. Plan on 1–2 add-a-section
  passes per brief. Add sections, not padding.

---

## Workflow checklist

- [ ] Read the existing brief (title, premise, any claims that need verifying).
- [ ] Web-search and verify every statistic; gather sources.
- [ ] Delete/replace anything unverifiable; correct anything stale.
- [ ] Write body via `makeBuilders`; inline `(Source, year)` + a Sources section (≥3 `src()` links).
- [ ] Dry-run the batch script; add substantive sections until ≥1400 words.
- [ ] Run with `--commit` (auto-backs-up first).
- [ ] Re-run the audit; confirm the brief is PASS.
- [ ] If a published claim was corrected, add a row to `CONTENT_CORRECTIONS.md`.
- [ ] Commit the batch script to git with a `content: …` message.

---

## Environment note

Scripts load env from `frontend/.env.local` and hit Sanity (project `fxz10xl7`, dataset
`production`). The harness temp filesystem can hit ENOSPC mid-run; clear stale output files
before each node run:

```
find /private/tmp/claude-502 -name "*.output" -type f ! -newermt "-60 seconds" -delete
```

Re-running a batch script is idempotent and safe.
