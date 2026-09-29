# HTR_Book_v42 — Full-Book Self-Consistency Audit Ledger

Compiled 2026-09-27. 18 read-only Opus subagent passes (Preface+Introduction, Chapters 1–16,
Conclusion+Appendices), each checking prose claims against the actual cells of the figures/tables
they cite (ground truth pulled from `word/document.xml`, never the lossy `.md` mirror), plus a
verbatim log of every superlative/ranking claim per chapter for this cross-chapter pass.

**Nothing in this file has been written to `HTR_Book_v42.docx`.** Every fix below is a proposal.
Per standing rule, no manuscript edit happens until you say which ones to apply.

Full detail for any item lives in its source file: `book-audit/audit_<unit>.md`.

---

## PART 1 — Cross-chapter contradictions (the check that required seeing the whole book at once)

### 1. AHEAD withdrawal staleness — the single biggest issue, confirmed in 8 locations across 6+ chapters
Vermont formally withdrew from the AHEAD Model in July 2026 (established in Ch1, Ch6 §6.6, the
glossary, and Appendix E). That fact did not propagate. Language treating AHEAD as active,
ongoing, or a source of future obligations survives in:
- **Ch3** §3.9 — tells an AHS/GMCB official how to plan Vermont's AHEAD implementation timeline.
- **Ch7** — Table 4, Table 6, and §7.10 treat AHEAD benchmark methodology as a live near-term task.
- **Ch12** — §12.3.2 names "Vermont hospitals preparing for AHEAD global budget entry in 2027" as
  a current client segment.
- **Ch13** — 6 separate places (Fig 13.1, 13.3, 13.4, §13.5.1, §13.8) contradict the chapter's own
  §13.3.5 withdrawal statement.
- **Ch15** — R-01 and Fig 13.4's cousins treat AHEAD as active; only Fig 15.7 was updated after
  the withdrawal.
- **Ch16** — 8 places (Table 1, §16.3.1, §16.4, Table 3, Table 4, §16.6) contradict the chapter's
  own correct §16.4 Pillar 3 statement.
- **Appendix E** — Figure E.1's 2028 target ("full AHEAD compliance") directly contradicts Figure
  E.3 ("AHEAD withdrawn") inside the same appendix.
- **Conclusion** — dated/signed April 2026 while addressing four calls to action around "AHEAD's
  financial accountability," a chronological impossibility given the book's own July 2026 date.

**Recommended fix approach:** a single global find-pass for "AHEAD" across the whole docx,
reconciling every instance against the July 2026 withdrawal — not a chapter-by-chapter patch, or
the same drift will recur. This is exactly the kind of defect the audit was designed to catch and
the highest-value thing to fix first.

### 2. CCBHC baseline count — four chapters, four different numbers for the same fact
- Ch8: "2 existing + 5 new" (implies 2 active today)
- Ch9: "5 planned" (internally correct within Ch9)
- Ch13: "zero CCBHCs"
- Appendix E: "0 certified"

**Recommended fix:** establish the actual current count (0, per Ch13/App E, which agree with each
other) and correct Ch8's "2 existing" framing to match, or clarify Ch8 is describing a different
milestone (e.g., "2 sites in active planning" vs. "0 certified").

### 3. Competing claims to be "the precondition"/"master variable" the whole framework rests on
Ch1's own dependency matrix (Figure 1.3) has exactly one pillar with zero preconditions: Policy.
That's the actual root of the topological order §1.8 derives. But:
- **Ch6** §6.1: "Payment reform is not one element of healthcare transformation. It is **the
  precondition on which all other transformation depends**" / heading "Why Payment Reform Is
  **the Master Variable**."
- **Ch4** §4.7ish: "The Technology pillar is not one workstream among six; it is **the substrate
  the other five run on**."

Both chapters are rhetorically overclaiming primacy for their own pillar in a way that, read
literally, contradicts Ch1's matrix (Economics and Technology both have preconditions; only
Policy doesn't). **Recommended fix:** soften both to "a precondition" / "the precondition Economics
specifically depends on" rather than "the" precondition — consistent with the matrix, not
competing with it or with each other.

### 4. Competing claims to be "the binding constraint" on the whole transformation
- **Ch1/Ch15**: anchor the system's highest risk/binding constraint on Technology (AHS-GMCB
  analytics).
- **Ch11** §11.6 heading: "The Workforce Crisis — Vermont's **Most Binding Operational
  Constraint**."

Not strictly contradictory (different axes — analytics is a sequencing risk, workforce is a
capacity constraint) but both use "binding constraint" as if it's a singular, book-wide title.
**Recommended fix:** scope Ch11's heading to "Operations' Most Binding Constraint" rather than
Vermont's, or add one clause acknowledging Technology's sequencing risk is a different kind of
constraint.

### 5. CMMI model count self-contradicts within Ch3, and matches the Introduction
Introduction and Ch3 body both say "more than seventy" models; Ch3's own §3.10 Key Concepts /
glossary says "50+". The glossary entry is the outlier — **recommended fix: correct the glossary
to match the body and Introduction ("70+").**

### 6. Introduction cites the wrong chapter for enforcement mechanics
Introduction item 7: "Chapter 13 develops the enforcement mechanics and this case in more detail."
Chapter 13 contains the word "enforcement" zero times. The actual developed treatment is Appendix
G §G.4.2 ("The test case: GMCB v. UVMMC"); the court challenge itself is narrated in Chapter 14;
Act 68's grant of authority is in Chapter 2. **Recommended fix:** change the citation to Appendix
G §G.4.2 (or Chapter 14, if the intent was the court-challenge narrative specifically).

### 7. Front matter folds Equity into "the pillar chapters," contradicting the book's own thesis
The student reading-path in the Preface/Introduction says "Chapters 2-11 develop each pillar" —
which includes Chapter 10 (Equity). Both the Preface and a full Introduction section state,
repeatedly and deliberately, that equity is *not* a sixth pillar but a cross-cutting imperative.
**Recommended fix:** reword the reading path to exclude Ch10 from "the pillar chapters," or
explicitly name it as the cross-cutting exception.

---

## PART 2 — Per-chapter local findings (prose vs. its own cited figure/table)

Each line is the single highest-confidence finding from that chapter's audit; every chapter has
several more — see the linked file for the full list with proposed fixes.

| Unit | Headline finding | Full detail |
|---|---|---|
| Preface+Intro | Preface dateline (Dec 2025) is stale against the book's own July 2026 events | `audit_preface_intro.md` |
| Ch1 | §1.12.1 reverses a Figure 1.3 arrow (implies Clinical→Economics; matrix has the reverse) | `audit_ch01.md` |
| Ch2 | RBP effective date is FY2027 in 4 places, FY2028 in Figure 2.4 | `audit_ch02.md` |
| Ch3 | One passage plans Vermont's AHEAD rollout while another (correctly) says Vermont withdrew | `audit_ch03.md` |
| Ch4 | Three incompatible "Layer 1" architecture diagrams (Fig 4.1, 4.4, 4.7) | `audit_ch04.md` |
| Ch5 | §5.7 says "three" working labs; Figure 5.4 lists four | `audit_ch05.md` |
| Ch6 | (see `audit_ch06.md` — not fully summarized in this pass, review directly) | `audit_ch06.md` |
| Ch7 | Book's stated 6 VBC-readiness domains don't match the actual tool's 6 domains (only partial overlap) | `audit_ch07.md` |
| Ch8 | Stat block claims CCBHC all-HSA coverage already achieved; its own Figure 8.6 schedules it through 2028 | `audit_ch08.md` |
| Ch9 | Figure 9.1 attaches Vermont's 76% rate to the wrong HEDIS measure (sole outlier vs. 5 other book-wide instances) | `audit_ch09.md` |
| Ch10 | §10.2.1's Northeast Kingdom disparity claim is contradicted by its own Figure 10.1 (1 of 4 cells is NEK) | `audit_ch10.md` |
| Ch11 | Headline $1,303 admin-cost gap attributed to CAHs twice; both cited figures actually attribute it to PPS hospitals | `audit_ch11.md` |
| Ch12 | Chapter's own frame (epigraph, opener, all 4 "Implications for You") describes PMO/learning-collaborative content that has zero occurrences in the chapter body — it moved to Ch15/16/App A and the frame was never updated | `audit_ch12.md` |
| Ch13 | Opening "five forces" paragraph doesn't match the five forces §13.3 actually develops | `audit_ch13.md` |
| Ch14 | Global-budget threshold stated 3 incompatible ways (10%+, ~5%, within 5%) across prose and its own two figures | `audit_ch14.md` |
| Ch15 | Chapter's headline "19 components" doesn't match its own Figure 15.3 (17 rows) | `audit_ch15.md` |
| Ch16 | Table 4's own Deadline and Milestone cells disagree (FY2027 vs FY2028) | `audit_ch16.md` |
| Conclusion+Appendices | Both pre-flagged Appendix A items confirmed: FY25 increase stated as both +3.5% and +4.1%; Porter Hospital wrongly credited with RRMC's $11.1M FY23 overage | `audit_conclusion_appendices.md` |

## PART 3 — Confirmed clean (don't re-derive)

Every audit also verified a substantial set of claims as accurate — statutory date chains, hospital
counts, ROI figures, dependency-matrix arithmetic (Ch1's "only one order the matrix permits" claim
was independently re-run as an actual topological sort and confirmed unique), and all Research Lab
platform routes/tab-ids cited by figure captions resolve to real code. See each file's own "MATCH"
list — not reproduced here for space.

## PART 4 — Not yet done (flagged, not audited)

Several audits noted items outside their own scope that deserve a dedicated pass:
- Whether cited platform tools *deliver* the specific promise made about them (route existence was
  checked everywhere; promise delivery was only spot-checked in Ch1 and Ch14's original manual pass).
- The Appendix F platform-promise list (flagged by the Preface+Intro audit, not yet checked).
- A `check_format.py` pass on Figure 10.1, which is header-less — exactly the shape that triggers
  the black-on-navy `tblLook` bug no render can show.

---

**Next step is yours.** Tell me which of Part 1 or Part 2's fixes to apply, or say "apply all
high-confidence ones" and I'll work through them with the same backup → patch → render → verify
process used earlier tonight, one at a time.
