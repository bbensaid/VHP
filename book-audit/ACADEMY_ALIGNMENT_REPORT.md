# Academy ↔ VBC Readiness Assessment alignment audit (2026-09-28)

Scope: `frontend/content/` source files only (build scripts + course JSON + lesson drafts).
**No live Supabase/Sanity state was checked** — no API credentials in this pass, and per
instructions no `frontend/scripts/` query script was run with placeholder credentials.
Anything already published to Sanity/Supabase from these sources is therefore **unverified**
and may still carry the pre-fix wording until re-published (author's call — no publish run).

## Ground truth used

`frontend/components/research/VBCReadinessAssessment.tsx` (rebuilt tonight):

- 6 domains: Strategic Clarity (`s`), Data and Technology (`d`), Care Delivery Capability (`c`),
  Network and Partnerships (`p`), Revenue Cycle (`r`), Workforce Operations (`w`).
- 5 dimensions per domain = **30 dimensions**.
- Scale is **`type Score = 0 | 1 | 2 | 3 | 4`** — 0 "Not Started" … 4 "Optimized".
- Results are reported as **domain averages and percentages** (`pct = avg/4*100`). There is no
  120-point total displayed anywhere in the component; max per domain is 5 × 4 = **20**.

## 1. Old domain names — NONE found

Grepped all of `frontend/content/` for "Strategy & Leadership", "Data & Analytics",
"Clinical Operations", "Financial Readiness", "Technology Infrastructure", "Health Equity"
used as a *readiness-assessment domain*. Zero hits. The Academy copy already names the six
new domains verbatim (`course_five_pillars.json:4034`, `_lesson_drafts/lessons_track4.py:239`,
`_build_five_pillars_course.py:5779-5781`). No rename was needed anywhere.

## 2. "VBC Contract Review Checklist" — not cited anywhere

Zero references in `frontend/content/`. The only checklist Academy content names is the
"AI Clinical Governance Checklist" (`_lesson_drafts/lessons_track8.py:828`,
`courses_tier*.json`). `book-audit/BUILD_vbc_contract_checklist_SUMMARY.md` did not exist at
read time, so nothing was cross-checked against it — but there is nothing in Academy content
to cross-check. **No finding.**

## 3. FIXED (simple factual correction, applied)

`-- each rated 1 to 4.` → `-- each rated 0 to 4.` (the tool's scale starts at 0 / "Not Started"):

- `frontend/content/course_five_pillars.json:4034`
- `frontend/content/_lesson_drafts/lessons_track4.py:239`
- `frontend/content/_build_five_pillars_course.py:5781`

All three files re-validated (`json.load` / `ast.parse`) after the edit. Nothing else was
touched; no prose was rewritten.

## 4. FOUND AND DELIBERATELY LEFT — needs author sign-off (new prose / new numbers)

### 4a. The "out of 12 points per domain" scale is arithmetically impossible

A domain's maximum is 20 (5 dimensions × 4), not 12. Fixing this is not a rename — it would
require rescaling a sourced Vermont claim, i.e. inventing numbers. Occurrences:

| File | Line | Text |
| :-- | :-- | :-- |
| `frontend/content/course_five_pillars.json` | 4034 | "score only 3 to 7 of a possible 12 points in this domain … score 8 to 12 in Domain 3" |
| `frontend/content/course_five_pillars.json` | 4375 | "score only 3 to 7 out of 12 possible points on the Data and Technology domain" |
| `frontend/content/course_five_pillars.json` | 4406 | stat tile `"value": "3-7 / 12"` |
| `frontend/content/_lesson_drafts/lessons_track4.py` | 240 | same as 4034 |
| `frontend/content/_lesson_drafts/lessons_track4.py` | 362 | same as 4375 |
| `frontend/content/_lesson_drafts/lessons_track4.py` | 388 | stat tile `"3-7 / 12"`, source "HTR VBC Readiness Assessment / AHEAD preparation baseline" |
| `frontend/content/_build_five_pillars_course.py` | 5786 | same as 4034 |
| `frontend/content/_build_five_pillars_course.py` | 6159-6161 | same as 4375 |
| `frontend/content/_build_five_pillars_course.py` | 6293-6296 | stat tile `"3-7 / 12"` |

Note the source line cites the HTR tool itself as the authority for the "/12" figure, which
the tool does not support. Either the prose rescales to /20 (changing the stat tile and the
sentence), or the claim gets a genuine external source. Author's call.

### 4b. "A total score below 60 of 120"

30 × 4 = 120, so the arithmetic is fine, but the rebuilt tool never shows a 120-point total —
it shows an overall percentage (below 60/120 = below 50%). Same three locations as §3.
Left as-is: defensible arithmetic, but if the author wants Academy copy to mirror what a
reader actually sees on screen, it should read as a percentage. Not a mechanical fix.

## 5. Defect found OUTSIDE Academy — flagging, not fixing

`frontend/components/research/VBCReadinessAssessment.tsx`, `VERMONT_PRESETS` (lines ~159-198):
all three presets still key on the **old** domain prefixes `f1-f5`, `t1-t5`, `e1-e5`
(Financial / Technology / Equity). Those ids no longer exist. The new `p1-p5`
(Network and Partnerships), `r1-r5` (Revenue Cycle) and `w1-w5` (Workforce Operations)
dimensions are never populated, so **every Vermont preset leaves 15 of 30 dimensions blank
and three of six domains at 0%**.

Not fixed here: (a) the file belongs to tonight's parallel rebuild task and a concurrent edit
would conflict; (b) remapping is not a rename — `f`/`t`/`e` do not map onto `p`/`r`/`w`
semantically, so correct preset values have to be chosen, not derived.

## Not done, by instruction

No Academy lesson content written or restructured, no course rebuilt, nothing published,
no Sanity/Supabase write script run.
