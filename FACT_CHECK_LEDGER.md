# Book fact-check ledger

Every verifiable claim in the manuscript — Acts, dates, dollars, counts,
policy mechanics — with its source and the date it was checked. Later chapters
reuse verified values from here instead of re-searching, and this is the file
to check edits against.

**Scope so far:** Preface · Introduction · Chapter 1 (in progress)

## Status key

| | |
| :--- | :--- |
| ✅ | Verified against a primary or strong secondary source |
| ⚠️ | True but imprecise, stale, or weaker than the evidence supports |
| ❌ | Contradicted by the evidence — must change |
| ❓ | Not yet verifiable / needs the author's source |

---

## Chapter 1

### C1-01 ⚠️ "more than fifty models"

**Manuscript** ([HTR_Book_v42.md:222](HTR_Book_v42.md#L222)): *"Over the
following fifteen years, CMMI launched more than fifty models…"*

**Verified:** GAO ([GAO-26-107953](https://www.gao.gov/products/gao-26-107953))
— CMMI tested **70 models from 2011 through 2024**, with 24 active as of
January 2025. CBO's 2023 review covered **49 models** from CMMI's first decade.

**Assessment:** "More than fifty" is technically true but understates the
record by 20 models and reads as stale. **Recommend "more than seventy."**
The larger number strengthens the chapter's argument.

*Checked 2026-09-07.*

### C1-02 ✅ "A 2023 evaluation"

**Manuscript:** *"A 2023 evaluation found that the vast majority had not
achieved statistically significant reductions in spending or improvements in
quality."*

**Verified:** Congressional Budget Office, *Federal Budgetary Effects of the
Activities of the Center for Medicare & Medicaid Innovation*, **September
2023**, publication 59274.

**Assessment:** Correct and correctly dated. **Recommend naming the source
in-text** — "a 2023 Congressional Budget Office analysis" — since it is the
load-bearing citation for the chapter's opening argument.

*Checked 2026-09-07.*

### C1-03 ⚠️ StatStrip: "**<10%** — Models With Significant Results"

**Verified:** 4 of 70 models (**5.7%**) met the statutory criteria for
nationwide expansion — Pioneer ACO, Repetitive Scheduled Non-Emergent
Ambulance Transport Prior Authorization, Medicare Diabetes Prevention Program,
and Home Health Value-Based Purchasing.

**Assessment:** "<10%" is defensible but vague, and "significant results" is a
looser bar than the one the number actually comes from. **Recommend
"4 of 70 — Expanded Nationwide"** — a harder, sourced, more damning figure.

*Checked 2026-09-07.*

### C1-04 ⚠️ Understated — CMMI's net budgetary effect is missing

**Manuscript** says models "had not achieved statistically significant
reductions." The evidence is considerably stronger:

| Figure | Value |
| :--- | :--- |
| CMMI spent to operate models | **$7.9B** |
| Models reduced benefit spending by | **$2.6B** |
| **Net increase in direct spending, 2011–2020** | **$5.4B** (0.1% of net Medicare spending) |

**Source:** CBO, September 2023 (pub. 59274).

**Assessment:** CMMI did not merely fail to save — **it cost more than it
saved.** The book is leaving its strongest evidence on the table.
**Recommend adding the $5.4B net figure** to the StatStrip or the paragraph
following it.

*Checked 2026-09-07.*

### C1-05 ✅ "fifteen years" span

2010 (ACA enacted, CMMI created) → 2026 ≈ 15 years. Consistent with CMMI's
first operational year of 2011. No change needed.

*Checked 2026-09-07.*

---

## Method notes

- **CBO and GAO both return HTTP 403 to automated fetches.** Verify their
  figures through search result summaries plus independent outlets
  (Fierce Healthcare, TechTarget, Avalere, House Budget Committee), and
  require **two independent corroborations** before marking ✅.
- Prefer **GAO/CBO/CMS primary counts** over advocacy-outlet framing; several
  sources reporting these figures have an explicit position on CMMI.
- When the book **understates** a verifiable fact, log it — ⚠️ is not only for
  errors. C1-04 is the clearest example so far.
- Distinguish the **claim's bar** from the **statistic's bar**: "significant
  results" ≠ "met statutory criteria for nationwide expansion." Mismatches
  like this are the most common defect found so far.
