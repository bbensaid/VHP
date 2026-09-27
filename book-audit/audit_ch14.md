# Chapter 14 Audit

Source of truth: `HTR_Book_v42.docx` → `word/document.xml`, read via python-docx over the raw
body element order (paragraphs + tables interleaved). Chapter boundary: body item **1922**
(`Heading 1`, "Chapter 14: Political Sustainability — Protecting Transformation Across Election
Cycles") through item **1980** (`Heading 1`, "Chapter 15: …"), exclusive. 58 items, ~19.8k
characters of text. Read-only — the `.docx` was not modified.

Section inventory: 14.1 → 14.8 present and sequentially numbered; 14.2 has 14.2.1/14.2.2;
14.4 has 14.4.1–14.4.4. Recurring end-of-chapter headings match the byte-identical required
forms (`Work This Chapter on the Platform`, `Implications for You`, `Key Concepts in This
Chapter`, and `Sources:` as a plain paragraph — not a heading). No `## **Sources**` defect.

## Figures found (ground truth)

### Figure 14.1 — Early-warning signals of political risk (body item 1941, table 9×4, header + 8 data rows)
Columns: Signal | What it indicates | Severity | Monitoring source

| # | Signal | Indicates | Severity | Source |
|---|---|---|---|---|
| 1 | Hospital lobbying focused on RBP methodology rather than the mandate | Effort to hollow out RBP through the regulatory process | High | GMCB docket; Vermont Hospital Association statements |
| 2 | Bills to extend RBP or global-budget deadlines | Direct challenge to Act 68's mandatory timeline | Very High | Legislature bill tracker; HCAC testimony |
| 3 | Global-budget levels set **within 5%** of current commercial rates | Regulatory capture; budgets without pressure | High | GMCB FY2028 budget guidance |
| 4 | December 2028 Strategic Plan described as "in progress" in November 2028 reports | Operations failure; deadline unlikely to be met | High | AHS monthly transformation reports |
| 5 | CMS AHEAD waiver-modification request | Federal pressure to weaken AHEAD accountability | Very High | CMS AHEAD communications; AHS federal-relations reports |
| 6 | Governor-candidate platforms including RBP repeal or delay | Political threat to mandatory architecture in 2026 cycle | Very High | Governor-race coverage; candidate policy statements |
| 7 | EAST Fund spending well below authorized levels | Resistance to transformation investment despite authorization | Moderate | DVHA AHEAD spending reports; GMCB budget documentation |
| 8 | HCAC failure to reach consensus on the Strategic Plan framework | Governance breakdown; plan unlikely to produce binding commitments | High | HCAC meeting minutes; AHS reporting |

Severity distribution (ground truth for any count claim): **3 Very High, 4 High, 1 Moderate.**
Caption (1942): "Figure 14.1 — Early-warning signals of political risk to Vermont's reform
architecture. Sources: HTR Advisory risk-monitoring framework; Act 68 of 2025; GMCB regulatory
process documentation."

### BEYOND VERMONT callout (body item 1943, single-cell 1×1 table — unnumbered, correct per convention)
Names **four** signal categories: (a) change in the governing party's posture, (b) a high-profile
enforcement challenge, (c) a hospital-sector coalition campaign, (d) a federal policy shift
changing the reform's financial assumptions. Asserts "The specific signal in Vermont was UVMMC's
court challenge to GMCB enforcement."

### Figure 14.2 — Political-disruption scenario planning (body item 1953, table 6×4, header + 5 data rows)
Columns: Disruption scenario | Probability (HTR assessment) | Primary impact | Organizational response

| # | Scenario | Probability | Impact |
|---|---|---|---|
| 1 | RBP delayed 18+ months (methodology challenge) | Moderate (25–35%) | Commercial revenue maintained longer; urgency reduced |
| 2 | Global budgets set **~5% above** current commercial rates | Low–Moderate (15–25%) | Minimal financial pressure; accountability without incentive |
| 3 | EAST Fund cut 30%+ (federal Medicaid cuts) | Moderate–High (35–45%) | Primary-care/BH investment capacity reduced |
| 4 | 2026 governor committed to Act 68 modification | Low (10–15%) | Legislative challenge in 2027 session |
| 5 | CMS AHEAD modification reducing accountability scope | Low (10–20%) | Reduced federal accountability; AHEAD less transformational |

Caption (1954): "Figure 14.2 — Political-disruption scenario planning for Vermont healthcare
organizations. Sources: HTR Advisory risk assessment; Vermont political-environment analysis
(April 2026)."

### Figure 14.3 — Platform tools (body item 1964, table 4×3, header + 3 data rows)
Columns: Do this | On this tool | What to look for. Tools cited: **The Wire**, **HTR Simulator**,
**Transformation Friction Index**. Caption (1965) carries no `Sources:` line — consistent with the
other chapters' platform tables.

Figure numbering is complete and gap-free: 14.1, 14.2, 14.3. No figure is cited by a number that
does not exist, and no figure lacks a caption.

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

**1. MISMATCH — the global-budget threshold is stated three different ways.**
- §14.4.3 prose (1952): "global-budget levels set **10%+ above** current commercial rates
  (effectively removing budget pressure)" — presented as one of the three scenarios the reader
  should model.
- Figure 14.2 row 2, the table that immediately follows and is supposed to *be* those scenarios:
  "Global budgets set **~5% above** current commercial rates."
- Figure 14.1 row 3: "Global-budget levels set **within 5% of** current commercial rates."

Three incompatible numbers for the same phenomenon, and the prose/table pair is a direct
self-contradiction one paragraph apart. Note also that "within 5% of" (Fig 14.1) and "~5% above"
(Fig 14.2) are not the same test — the first is a band around current rates, the second a point
estimate above them.
*Proposed fix:* pick one threshold and use it in all three places. The cleanest is to make the
signal and the scenario the same test: change 1952's "set 10%+ above current commercial rates" to
"set within 5% of current commercial rates", and Fig 14.2 row 2 to "Global budgets set within 5%
of current commercial rates", matching Fig 14.1 row 3 verbatim. If the author intends the *signal*
(any budget without pressure) to be a wider band than the *scenario* (a specific modelled case),
say so explicitly rather than leaving two bare numbers.

**2. MISMATCH — the BEYOND VERMONT box's "same four categories" do not map onto Figure 14.1.**
The box says "These signal categories … are the same four categories that would precede the
unwinding of a comparable reform in any state," with "These" pointing back at Figure 14.1. But
Figure 14.1 has **eight** signals in a different taxonomy, and one of the box's four — "a
high-profile enforcement challenge" — has **no corresponding row** in Figure 14.1 (the eight rows
cover lobbying, bills, budget levels, plan slippage, a CMS waiver request, candidate platforms,
EAST Fund underspending, and HCAC deadlock; none is an enforcement challenge or litigation).
*Proposed fix:* either add an enforcement-challenge/litigation row to Figure 14.1 (e.g. "Provider
litigation against GMCB enforcement action" → "Judicial challenge to the enforcement mechanism" →
Very High → GMCB docket; Vermont judiciary filings), or reword the box to "The eight signals in
Figure 14.1 fall into four categories that …" and drop the claim that they are the same four.

**3. MISMATCH (unsourced) — UVMMC's court challenge to GMCB enforcement.**
The box states this as the specific Vermont instance, but the fact appears nowhere else in the
chapter, and the chapter's `Sources:` paragraph (1978) lists no litigation source — no docket, no
court filing, no coverage. Per directive 14 and the fact-check ledger method this needs two
corroborations before it stands, and per finding 2 it is the one category with no Figure 14.1 row.
*Proposed fix:* add the specific citation to 1978 (case name, court, date) and give it a Figure
14.1 row; or, if it is not verifiable to the standard, replace the sentence with a category-level
statement that does not name the actor or the action.

**4. MATCH — "at least three disruptions" vs Figure 14.2's five rows.**
§14.4.3 says "should maintain scenario plans for **at least three** disruptions" and then names
exactly three (RBP delay, global-budget levels, EAST Fund cut). Figure 14.2 lists five. "At least
three" is not violated by five, and the three named are rows 1, 2 and 3 of the table in order.
Not a defect — but see finding 1, since the second of those three is the number that disagrees.

**5. MATCH — statutory effective dates are internally consistent.**
RBP mandatory **FY2027**: stated in 14.2.2 (1936), presupposed in 14.4.1 ("complete NCQA PCMH
recognition before FY2027"). Global budgets **FY2028**: stated in 14.2.2 (1937), in Fig 14.1 row 3
("GMCB FY2028 budget guidance"), and in 14.7 ("global budgets arriving in FY2028"). Strategic Plan
**December 2028**: 14.2.2 (1938), Fig 14.1 row 4, 14.5 (1960). No drift.

**6. MATCH — the reform cascade sequence.** `Act 167 → Act 51 → Act 68` appears in 14.2.1 (1933),
14.5 (1959), and Key Concepts (1977), in the same order with the same roles each time
(167 = diagnosis, 51 = institutional capacity/enabling, 68 = mandatory deployment/operational).
14.7's "a diagnostic act, then an enabling act, then an operational act" is the same sequence
abstracted. Consistent.

**7. MATCH (internally) — severity vs probability are not in conflict.**
Fig 14.1 rates "Governor-candidate platforms including RBP repeal or delay" and "CMS AHEAD
waiver-modification request" **Very High**, while Fig 14.2 gives "2026 governor committed to Act
68 modification" **Low (10–15%)** and "CMS AHEAD modification" **Low (10–20%)**. These are
different axes (consequence vs likelihood) and are not contradictory. Worth noting only because
neither figure's caption or lead-in says so, and a reader moving from 14.3 to 14.4.3 can read it
as a reversal. *Optional fix:* one clause in 1952 or the Fig 14.1 caption distinguishing severity
(impact if it happens) from probability.

**8. Criterion-5 promise check — all three Figure 14.3 tools exist, are routed, and tag ch. 14.**
- The Wire → `/the-wire`, `frontend/app/the-wire/page.tsx` exists; `lib/taxonomy/tools.ts`
  `chapters: ["13","14"]`. Live news feed, so the specific promise ("bills that would amend Act
  68, GMCB appointment changes") cannot be verified against fixed content by design — flagged, not
  a defect.
- HTR Simulator → `/htr-simulator`, page exists; `chapters: ["1","13","14","15","16"]`. The
  promise "Drop the Policy score and watch Economics fall with it" **is** delivered: the
  `policy → economics` edge is declared in `frontend/lib/framework/dependencies.ts:69` as
  `kind: "enables", criticalPath: true`.
- Transformation Friction Index → `/transformation-friction-index`, page exists;
  `chapters: ["1","14","15"]`. Per-pillar friction is real (Policy, Economics, Technology,
  Clinical, Operations, Equity Imperative all defined in the page).
  **PARTIAL PROMISE FAILURE:** the book says "**Rising** friction in a pillar is usually visible
  in the operating data **a year before** it becomes a legislative problem." The tool is a
  point-in-time score with no time series, no history, no prior-period delta — a reader cannot see
  anything "rising" there. Same failure mode as the three defects logged in CLAUDE.md: the route
  200s and the tool exists, but the promise is not delivered.
  *Proposed fix (per the standing rule "book vs tool disagree → EXTEND THE TOOL"): add a
  prior-period column or trend indicator to the friction index rather than softening the sentence.*

## Superlative/ranking claims logged for cross-chapter comparison

Logged verbatim with body item numbers, for later cross-chapter deduplication. **Items A, B and C
are three different answers to the same question and are flagged as an internal contradiction in
"Other issues" below.**

- **A.** [1947, §14.4.1] "The **most effective protection** against disruption is structural
  irreversibility."
- **B.** [1957, §14.4.4] "The political sustainability of Vermont's reform ultimately rests on
  **one thing**: evidence that it is working." … "demonstrated with the metrics in Act 167's five
  goals and Act 68's reporting requirements — are the **most durable protection against
  reversal**."
- **C.** [1969, §14.7, advocate] "the **most durable protections** in Vermont's architecture were
  not the most rhetorically forceful ones. Mandatory participation, statutory deadlines, and
  federal-state agreements survive changes of government; strategic plans and voluntary
  commitments generally do not."
- **D.** [1938, §14.2.2] A descriptive-not-committal Strategic Plan is "the **most politically
  convenient failure mode**: compliance without transformation."
- **E.** [1943, BEYOND VERMONT] "identify their own state's **largest, most politically
  influential** health system as the actor **most likely** to generate the analogous signal."
- **F.** [1956, §14.4.4] "AHS's monthly transformation reports (required by Act 68) are the
  **primary vehicle** for communicating progress to the actors who control Vermont's policy
  environment."
- **G.** [1936, §14.2.2] "Hospital lobbying **will focus on** the methodology, **not** on
  overturning the mandate." (Unhedged prediction, stated as fact; Fig 14.1 row 1 treats the same
  thing as a signal to watch for, i.e. as contingent.)
- **H.** [1937, §14.2.2] "The risk is **not repeal** — it is budgets calibrated to produce the
  appearance of accountability without the substance."
- **I.** [1939, §14.2.2] "This is the federal-state dependency Vermont **cannot fully insulate
  against**." (Near-neighbour of the "most underestimated dependency" family of claims that has
  collided across chapters before — check against chs. 1, 7 and 13.)
- **J.** [1961, §14.5] "This is **the model other states should take** from Vermont, beyond the
  specific policy content."

Figures to reconcile across chapters (each stated once here, all load-bearing elsewhere in the
book, none re-derived in ch. 14 — but none cross-referenced to the front matter either):
- [1931] AHEAD State Agreement "signed with CMS in **January 2025**", "**nine-year** performance period"
- [1932] RHT Program "**$195 million** first-year award"
- [1934] Oliver Wyman: "**13 of 14** hospitals in operating losses **by 2028** absent structural change"
- [1939] H.R. 1 "**$911 billion** in Medicaid cuts (enacted **July 2025**)"
- [1960] Act 167 diagnostic process: "**230+ meetings, 3,100+ participants**"
- [1957] "Act **167's five goals**"

## Other issues

**1. Internal contradiction — three competing "most durable protection" claims.**
Superlatives A, B and C above each answer "what best protects the reform?" with a different
answer: structural irreversibility (A), demonstrated evidence that it is working (B), and
statutory/federal-agreement architecture (C). B is the strongest offender because it says the
sustainability "ultimately rests on **one thing**", which excludes A and C explicitly. A and C are
also in tension with §14.2.1, which grounds durability in federal agreements and sunk capital, and
with 14.7's state-official paragraph (1967), which says "the durability argument in this chapter
rests on **structure, not on goodwill**" — i.e. the chapter's own summary picks C, contradicting B
eleven items earlier.
*Proposed fix:* make one of them primary and subordinate the others. The chapter's structure
supports C as primary (14.2.1 and 1967 both argue it): soften B to "the most durable *political*
protection available to an individual organization" or "the protection an organization can build
for itself", and soften A to "the most effective protection available at the organizational
level", so the three claims occupy different scopes instead of competing for the same one.

**2. Genuine repetition — the "each act makes reversal costlier" proposition, four times.**
- [1933] "Dismantling Act 68 would mean dismantling these institutions … that **make reversal
  costly**."
- [1959] "Each act created facts, institutions, and constituencies that made the next more viable
  and **its reversal more costly**."
- [1961] (the same design restated as a prescription for other states)
- [1970] "Each act **makes the next harder to reverse**."
This is restatement, not legitimate recurrence: 1959 adds nothing to 1933 except the framing of
§14.5, and 1970 restates 1959 in the Implications voice. Key Concepts' "Reform cascade" entry
(1977) is legitimate recurrence (glossary) and should be left.
*Proposed fix:* cut the second sentence of 1933 back to naming the institutions and let §14.5
carry the reversal-cost argument once, or cut 1959 and open §14.5 directly with 1960's evidence.

**3. Genuine repetition — the "any state can apply this" move, four times.**
[1924] (the whole second paragraph of the chapter opener), [1943] (BEYOND VERMONT box), [1961]
("the model other states should take"), [1970] (the "if you are in another state" paragraph). The
box and the Implications paragraph are structural conventions and earn their place; 1924 and 1961
say the same thing in body prose. 1924 is notably long (one 120-word sentence doing the
substitute-your-own-state work that the BEYOND VERMONT box exists to do).
*Proposed fix:* compress 1924 to one sentence and let the box carry the substitution instructions,
or cut 1961's first sentence, which 1970 restates better.

**4. Thin section — §14.4.4 and §14.6 lead-in.**
§14.4.4 is two paragraphs, one of which (1957) is the chapter's closing generality rather than
strategy content; Strategies 1–3 each get a developed mechanism, Strategy 4 gets an assertion plus
a superlative. Not a factual defect, but it is the weakest of the four and the place where
contradiction 1 enters.

**5. Front-matter alignment (criterion 4) — not fully checkable within this chapter's scope.**
The six figures listed at the end of the previous section are all stated fresh in ch. 14 with no
cross-reference to the Preface or Introduction. Where the front matter already establishes any of
them (the Oliver Wyman 13-of-14 projection and the $911B H.R. 1 figure are the likely
candidates), directive/criterion 4 requires the chapter to cross-reference rather than re-derive.
This audit was scoped to ch. 14 only and did not open the front matter — flagged as open, not as
a finding.

**6. No formatting audit was run** (`check_format.py`), and no render was produced, because this
task was read-only and touched nothing. If any of the fixes above are applied to Figures 14.1 or
14.2, rule 23 requires `python3 book-build/check_format.py` afterwards, and the black-on-navy
`tblLook` check must be done in the XML, not from a render.
