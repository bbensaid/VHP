# Chapter 4 Audit

**Scope:** Chapter 4 — "The Technology Pillar — Data Infrastructure for a Transformed Health
System." Read-only audit. Source of truth: `word/document.xml` inside `HTR_Book_v42.docx`,
read via `python-docx` walking body children in order (paragraphs **and** tables), so table
cell contents are ground truth rather than the lossy `.md` mirror.

**Boundaries:** body-element index 674 (`Heading 1` — "Chapter 4: …") through 851, ending at
index 852 (`Heading 1` — "Chapter 5: …"). 178 body elements: 1 H1, 11 H2 (§4.1–§4.11),
16 H3, 9 tables, remainder body paragraphs and 2 pull-quotes.

Structure present and correctly sequenced: §4.1–§4.11; §4.1.1; §4.2.1–4.2.2;
§4.3.1–§4.3.11 (all eleven, no gaps); §4.4.1–4.4.2; §4.5.1–4.5.2; §4.6.1–4.6.5; §4.7.1.
The three style-critical recurring headings are present and byte-correct
(`4.9 Work This Chapter on the Platform`, `4.10 Implications for You`,
`4.11 Key Concepts in This Chapter`) and `Sources: …` is a plain paragraph, not a heading.

---

## Figures found (ground truth)

Nine tables. Eight carry `Figure 4.N` captions; one is an uncaptioned stat strip and one an
uncaptioned `BEYOND VERMONT` callout (both consistent with book convention).

| Fig | Idx (tbl/caption) | Dims | Actual content |
| :-- | :-- | :-- | :-- |
| 4.1 | 682 / 683 | 4×2 (hdr + 3) | Layer 1 **VHCURES** (APCD; gap: race/ethnicity incomplete in commercial claims) · Layer 2 **VITL/VHIE** (clinical substrate; voluntary participation) · Layer 3 **AHS-GMCB Analytics Vendor**, procurement underway (global-budget modeling, TCOC, risk strat, equity; Act 68 global budgets FY2028) |
| — | 691 | 1×4 stat strip | `60%` commercial covered · `100%` Medicaid & Medicare · `Claims + Rx` data types · `12–18+ Mo` typical data lag |
| 4.2 | 696 / 697 | 5×3 (hdr + **4**) | Limitations: (1) incomplete commercial coverage 60% / 40% ERISA self-insured; (2) data lag 12-18+ months; (3) no BH or SDOH integration; (4) no clinical results, only billing records |
| — | 706 | 1×1 callout | `BEYOND VERMONT` — exist-on-paper vs. functionally-usable gap as national failure mode |
| 4.3 | 729 / 730 | 4×4 (hdr + **3**) | Step 1 VHCURES–VHIE claims-clinical integration, target **2026–2027** · Step 2 MH/SUD integration, **2027–2028** · Step 3 SDOH integration, **2028 and beyond** |
| 4.4 | 737 / 738 | 4×4 (hdr + **3**) | UHDS, listed top-down: L3 End-User Services (VITLAccess, ADT notifications, Advanced Analytics) · L2 Exchange Services (FHIR APIs, Clinical Data Repository, MDWAS-prioritised) · L1 Foundational Services (MPI = Verato, Term Atlas, Rhapsody; SNOMED CT, LOINC) |
| 4.5 | 765 / 766 | 7×2 (hdr + **6**) | Six for/against pairs on a statewide EHR (cost `$100-300M`, disruption, vendor lock-in, FHIR alternative, ERISA still excluded, provider-landscape diversity) |
| 4.6 | 791 / 792 | 5×2 (hdr + **4**) | Full FHIR R4: UVMMC (Epic), Oracle Health post-2022, BCBS VT + MVP · **Partial:** "hospitals on Meditech Expanse (FHIR-capable but may require configuration)" · Limited/none: TruBridge legacy, most DAs, many SNFs, independent PCPs on older EHRs · Planned (RHT): rural/independent practices, smaller CAHs |
| 4.7 | 827 / 828 | 6×2 (hdr + **5**) | Five-layer target architecture, L5 Advanced Analytics & AI → L1 Core Data Assets (VHCURES, VUHDDS, EHRs at 14 hospitals, Blueprint registry, GMCB regulatory data). **No MDWAS and no UHDS anywhere in it.** |
| 4.8 | 833 / 834 | 5×3 (hdr + **4**) | Four platform tools, all four on `/research-lab/interoperability` (`?tab=fhir`, `?tab=risk`, `?tab=emr`, `?tab=statewide-ehr`) |

Figure Index (end matter) lists Figures 4.1–4.8 with captions matching the in-chapter captions
verbatim. No missing or orphaned index entries for this chapter.

---

## Claims checked against their own source (MATCH / MISMATCH + proposed fix)

### MISMATCH 1 — VHCURES data lag stated two incompatible ways inside one chapter
- Figure 4.1 stat strip (691): **"12–18+ Mo"**; Figure 4.2 row 2 (696): **"12-18+ months"**;
  §4.3.11 Figure 4.5 (765): **"VHCURES's 12-18 month lag"**; §4.10 (836): a
  **"12-to-18-month advantage."**
- §4.3.8 (748): "VHCURES operates on a **nine-to-twelve-month** reporting lag" and
  "for intervening in a patient's care, a **nine-month** lag is not a data source."
- `nine-to-twelve` occurs exactly once in the whole manuscript (index 748); `12-18`/`12–18`
  months occurs at 1602, 1603, 1718 (Ch4) and 1959, 2969, 2975, 3277, 3820, 5313, 5327
  elsewhere. The 12–18 figure is the book-wide norm.
- **Fix:** in 748, replace "a nine-to-twelve-month reporting lag" with "a 12-to-18-month
  reporting lag" and "a nine-month lag is not a data source" with "a 12-month lag is not a
  data source." Single paragraph, two strings.

### MISMATCH 2 — §4.5.2 prose contradicts its own Figure 4.6 on Meditech
- Prose (789): "The critical gap is at smaller community hospitals (on TruBridge **and
  Meditech** platforms) … that **lack FHIR-capable systems entirely**."
- Figure 4.6, the figure it introduces, places Meditech in **"Partial FHIR
  implementation — FHIR-capable but may require configuration"**, and puts only TruBridge
  legacy in "Limited / no FHIR."
- This is the same error class found in Chapter 1: prose overstates what its own cited
  figure's cells say.
- **Fix:** in 789, "smaller community hospitals (on TruBridge legacy platforms, with
  Meditech sites FHIR-capable but unconfigured)."

### MISMATCH 3 — Figure 4.6's Partial row text begins mid-sentence
- Cell reads literally `hospitals on Meditech Expanse (FHIR-capable but may require
  configuration)` — lowercase, no subject. Every other cell in the table is a complete
  noun phrase. A leading word was dropped.
- **Fix:** `Community hospitals on Meditech Expanse (FHIR-capable but may require
  configuration)`.

### MISMATCH 4 — §4.1 prose names a third data asset the chapter's own figure does not
- Chapter opener (675), §4.1 framing (676) and **Figure 4.1** all name the triad as
  VHCURES / VITL / **AHS-GMCB analytics platform**.
- §4.1.1 body (685) instead says the infrastructure is "anchored by VHCURES …, VITL …, and
  the **Blueprint clinical data registry**."
- In Figure 4.7 the Blueprint registry is a **Layer 1 core data asset** and the analytics
  platform is **Layer 5** — they are not interchangeable.
- **Fix:** in 685, "…and the AHS-GMCB analytics platform now in procurement (Figure 4.1)."

### MISMATCH 5 — §4.6.1 AI-scribe arithmetic does not survive its own paragraph
- 796: the RHT application "cites that AI scribes automate an average of **over two hours**
  of daily administrative work."
- 797, two sentences later: "A provider spending two hours daily on documentation has
  approximately **25% less time** for patient care than one whose documentation is
  automated" — then, in the same sentence, the benefit is priced at "recovering
  **30 to 45 minutes** per provider per day."
- Three incompatible magnitudes for one intervention (>120 min automated · 120 min recovered
  · 30–45 min recovered), presented as a single argument.
- **Fix:** keep the conservative figure and make the relationship explicit — in 797, "…
  recovering even 30 to 45 minutes per provider per day — a fraction of the two hours the
  vendor studies claim — is equivalent to…". Or drop the 25% sentence, which is the one
  doing no work.

### MISMATCH 6 — §4.2.1 attributes the 32.3% avoidable-ED figure to two datasets at once
- 693: "the 32.3% avoidable ED visit rate … is calculated **from VHCURES via VUHDDS**."
- Figure 4.7 Layer 1 lists VHCURES and **VUHDDS as two separate core data assets**; VUHDDS
  is the hospital discharge database, not a VHCURES derivative. "From X via Y" is not a
  coherent lineage for two independent sources.
- **Fix:** "is calculated from VUHDDS hospital discharge records" (or "from VUHDDS, with
  VHCURES used for the payer view") — whichever the AHS report actually states; this needs
  the source checked, not guessed.

### MISMATCH 7 — Two broken cross-references to "Section 4"
- Figure 4.5 cell (765): "FHIR-based interoperability (**see Section 4**)…"
- §4.3.11 close (767): "**Section 4** develops the FHIR picture."
- The chapter *is* Section 4; FHIR is **§4.5**. Whether the intent was §4.5 or Chapter 5
  (whose title carries FHIR), "Section 4" resolves to nothing for a reader.
- **Fix:** both to "§4.5" if the in-chapter treatment is meant; to "Chapter 5" if the
  deeper FHIR treatment is. §4.5 exists and is substantive, so §4.5 is the better target.

### CONTRADICTION 8 — §4.10 tells executives to do exactly what §4.2.2/§4.3.8 say cannot be done
- §4.2.2 Figure 4.2 row 2: under global budgets the lag "makes VHCURES **insufficient as a
  management tool**"; row 4 required improvement: "**VHCURES retained for retrospective
  analysis rather than management**."
- §4.3.8 (748): claims integration runs through MDWAS "**rather than through VHCURES**";
  "for intervening in a patient's care, [that] lag is not a data source; it is a historical
  record."
- §4.10 (836): "The hospitals that invest in **VHCURES analytics capability** now will enter
  the January 2028 performance year with a 12-to-18-month advantage," and the VHCURES
  attribution file is "**the most important information** your AHEAD performance year will
  depend on." §4.10 (837) likewise lists "VHCURES attribution and HCC modeling" as
  critical-path, with no mention of MDWAS.
- Both positions may be defensible (attribution/HCC is a retrospective task; management is
  not) but the chapter never says so, so as written it recommends the tool it just
  disqualified.
- **Fix:** in 836, "invest in attribution and HCC analytics capability now — reading the
  VHCURES attribution file for the retrospective population picture while building toward
  the MDWAS weekly feed for in-year management (§4.3.8)".

### CONTRADICTION 9 — the target architecture keeps VITL central after §4.3.3 argues for winding it down
- §4.3.3 (713–721) is an explicit recommendation: repeal the exclusive designation, "build a
  second, state-controlled ingestion path," and "the requirement that clinical data pass
  through a designated nonprofit should be **phased out**."
- Figure 4.7 — the chapter's normative "target technology architecture … framework for the
  Strategic Plan" — puts "**Vermont Health Information Exchange (VHIE/VITL)**: clinical data
  exchange" at Layer 2 with no alternative path, and Figure 4.4 Layer 3 leads with
  "**VITLAccess** provider portal."
- **Fix:** add to Figure 4.7's Layer 2 cell a direct-ingestion component — e.g. "Direct
  provider-to-UHDS ingestion path (second, state-controlled pipeline per §4.3.3)" — or add a
  sentence to 829/830 reconciling the target state with §4.3.3's recommendation.

### CONTRADICTION 10 — three different layer models of the same infrastructure, none reconciled
- Figure 4.1: three layers, Layer 1 = **VHCURES**.
- Figure 4.4: three layers (UHDS), Layer 1 = **Foundational Services** (MPI, terminology,
  integration engine).
- Figure 4.7: five layers, Layer 1 = **Core Data Assets**.
- §4.3.5 establishes the UHDS as "the vehicle through which the Act 68 §10 integration
  mandate is **actually delivered**" — yet the UHDS appears **nowhere in Figure 4.7**, the
  chapter's stated architecture for the Strategic Plan, and MDWAS (the §4.3.8 primary claims
  path) is also absent from it. "Layer 2" and "Layer 1" therefore mean three different things
  within one chapter.
- **Fix:** minimally, name the UHDS in Figure 4.7's Layer 2/3 cells and add MDWAS beside
  VHCURES in Layer 1, plus one sentence in 826 stating how the five-layer target maps onto
  the UHDS three-layer build (Fig 4.4). Larger consolidation is an author call.

### TENSION 11 — Figure 4.7 dependency ordering vs. the maturity assessment beneath it
- 829: "layers **3 and above** represent target states, not current states. Vermont's current
  infrastructure is solid at Layers 1 and 2, **developing at Layer 4, and nascent at Layers 3
  and 5**."
- Figure 4.7 labels **only Layer 3** "(Target State)", so "3 and above" overstates its own
  figure's labelling; and Layer 4 (Population Health Management) being *more* mature than
  Layer 3 (Integrated Health Record) beneath it inverts the stack, in a chapter whose
  Figure 4.4 caption insists "Each layer is dependent on the one below it."
- **Fix:** either label Layers 4 and 5 "(Target State)" in Figure 4.7, or reword 829 to
  "Layer 3 and the layers above it are partial target states" and add a clause explaining
  that Layer 4 runs today on the *unintegrated* Blueprint registry, which is why it can be
  further along than the layer beneath it.

### TENSION 12 — the chapter's own timeline delivers the data after the deadline it must precede
- §4.3.8 (749–750): Medicare data scales 2026–2028; **full multi-payer incl. commercial and
  standardised SDOH follows 2029–2030**; "every argument in this book about global budgets,
  regionalization, and total-cost-of-care modeling implicitly assumes multi-payer data."
- Figure 4.1 Layer 3: "Act 68 global budgets take effect **FY2028**." §4.10 (837): three
  components "must be operational **before January 2028**." Figure 4.3 Step 3 SDOH: "2028
  and beyond."
- So the chapter states that global budgets require multi-payer data and that multi-payer
  data arrives one to two years after global budgets start, without remarking on it. This may
  be the intended argument, but nothing in the text says so.
- **Fix (if intentional):** add one sentence at the end of 750 naming it — e.g. "The
  sequencing problem is on the face of the schedule: global budgets begin in FY2028 and
  multi-payer data completes in 2029–2030, which means the first two performance years will
  be managed on a partial picture."

### Verified MATCHES (checked, no defect)
- 695 "**four** structural limitations" ↔ Figure 4.2 has exactly 4 data rows. **MATCH.**
- 728 "three components … in sequence" ↔ Figure 4.3 has 3 steps. **MATCH.**
- 736 "three layers, each depending on the one beneath it" ↔ Figure 4.4 has 3. **MATCH.**
- 773 "**five** specific functions" ↔ five labelled paragraphs (analytics, shared protocols,
  group purchasing, administrative shared services, referral formalization). **MATCH.**
- 794 "**five** specific technology categories" ↔ §4.6.1–4.6.5 = 5. **MATCH.**
- 806 "**four** specific applications" ↔ specialty consults, tele-ICU, tele-behavioral,
  community paramedicine = 4. **MATCH.**
- 826 "across **five** layers" ↔ Figure 4.7 has 5 data rows. **MATCH.**
- 63x/691/841 VHCURES coverage: `100%` Medicaid/Medicare + `~60%` commercial stated
  identically in the stat strip, Figure 4.2 row 1, Figure 4.7 Layer 1, and the §4.11
  glossary; Figure 4.2's "**40%** … in ERISA self-insured plans" is the correct complement.
  **MATCH.** (Minor overreach: 696 assigns the *entire* uncovered 40% to ERISA self-insured
  plans, while 748 says ERISA "excludes large segments" — the softer claim is the safer one.)
- 712 "Act 61 of 2009" + 713 "**Seventeen years later**" → 2009 + 17 = 2026, the book's
  present. **MATCH.**
- 763 "**four** different EHR vendors — Epic, Oracle Health, TruBridge, Meditech" ↔
  Figure 4.7 Layer 1 lists the same four. **MATCH.**
- 784 "**31** separate EMS agencies" ↔ Ch12 (index 3852) "Vermont's 31 EMS agencies".
  **MATCH** across chapters.
- 777 "**$1,303** per-discharge administrative cost premium" ↔ used identically at Ch1 (905),
  Ch11 (3527, 3848, 3849, 3860). **MATCH** across chapters.
- 757/769/838 RHT award stated as **$195M / $195 million** in all three places. **MATCH.**
- 750 coverage mix: Medicaid ~24% + Medicare ~21% + commercial ~half ≈ 95%, and "blind to how
  **three-quarters** of Vermonters receive care" = 100 − 24 = 76%. Internally **consistent.**
- 797 "25% less time" = 2h of an 8h day. Arithmetically **consistent** (but see MISMATCH 5).
- Figure 4.8: all four tool URLs are variants of `/research-lab/interoperability?tab=…`.
  Route existence and, more importantly, **promise delivery** (does `?tab=statewide-ehr`
  actually render a Statewide EHR Deployment Modeler; does `?tab=risk` return CMS-HCC
  attribution) is **not checked here** — this audit was scoped to the manuscript. Per
  CLAUDE.md, a 200 is not a delivered promise; this remains open.
- **Unverifiable from inside the chapter** (flagged for source check, not fixed): "**47**
  state applications" (794 — appears once in the whole manuscript, nothing to reconcile
  against; the RHT program is widely reported as having drawn applications from all 50
  states, so this number should be confirmed against the CMS award announcement);
  "well over **$100 million** cumulatively on HIT and HIE since 2009" (716); "over
  **$14 million** annually" chart-abstraction burden (744); UVMHN ransomware "**$50 to $65
  million**" and "six hospitals … nearly a month" (754); "**80%** rural vs **85%** non-rural
  broadband" (805); "$100-300M" EHR implementations (Figure 4.5).

---

## Superlative / ranking claims logged for cross-chapter comparison

Verbatim, with index and context. The first cluster is the concerning one: **four different
things in this chapter are each framed as the biggest technology problem.**

1. **713** — "Seventeen years later the same provision is **the single largest structural
   impediment to the Technology pillar**, and it should be repealed." *(the VITL
   exclusive-operator statute)*
2. **701** — "the gap between what Vermont appears to have in a statewide HIE and what the
   exchange can actually be used for. The finding is worth quoting because it is **the more
   damaging of the two**." *(HIE usability gap, ranked above all VHCURES limitations)*
3. **706 (BEYOND VERMONT callout)** — "The gap Vermont is closing … is **the single most
   common technology-pillar failure nationally**."
4. **739 (heading)** — "Why Integration Is **the Load-Bearing Element**", supported by 758:
   "The Technology pillar is not one workstream among six; it is **the substrate the other
   five run on**."
   → *Items 1–4 are not strictly contradictory (largest impediment ≠ most common failure ≠
   load-bearing element) but they read as four competing "the real problem is X" verdicts.
   This is the defect class CLAUDE.md names: "two different dependencies both called the most
   underestimated." Recommend the author designate one and subordinate the rest.*

5. **727** — the one-health-record mandate "is **the most ambitious data integration goal any
   state has formally committed to**, and its achievement would give Vermont a population
   health management capability that **no other state currently possesses**." *(two
   national-first claims in one sentence; needs a source)*
6. **769** — "**one of the most significant technology investments** in the entire $195M
   award"; "Vermont is **one of four states** (along with Arkansas, Nevada, and Oregon) that
   explicitly included CIN creation in their RHT applications."
7. **776** — group purchasing: "Oliver Wyman identified this as **one of the
   highest-leverage near-term cost reduction opportunities**."
8. **781** — FHIR "is **the closest thing to a universal language** for healthcare data that
   the industry has adopted."
9. **794** — "Vermont's RHT Program application is **notable among the 47 state
   applications** … for its specificity." *(also a count claim — see above)*
10. **798** — ambient AI as "**the single technology investment most likely** to address
    workforce shortages."
11. **802/808** — RPM: "**precisely the population where RPM produces the largest** clinical
    and financial benefit"; diagnostic AI: "Vermont's smaller rural hospitals may be the
    settings that **benefit most**."
12. **813** — price caps plus transparency "creates **the closest approximation to a
    functioning market** for hospital services that **any regulatory framework has
    achieved**."
13. **693** — VHCURES "has produced **some of the most credible and consequential health
    policy analysis** in recent Vermont history."
14. **836** — the VHCURES attribution file is "**the most important information** your AHEAD
    performance year will depend on." *(see CONTRADICTION 8)*
15. **734** — "Accurate identity resolution across organizations is **the foundation every
    other capability rests on**." *(a fifth "most fundamental thing" in the chapter)*
16. **847 (glossary)** — 42 CFR Part 2 "creates **the primary legal barrier** to integrating
    SUD treatment data."

---

## Other issues

**Genuine repetition (fix candidates)**
- The 12–18-month VHCURES lag is asserted **four** times in-chapter (691 stat strip, 696
  Figure 4.2 row 2, 748, Figure 4.5 row 4), plus once more as an analogy at 836. Twice is
  enough; the stat strip and Figure 4.2 are sufficient, and 748/765 can cite them.
- Oliver Wyman's "not viewed as 'user friendly' by providers" is quoted in full at **703**
  (the Perception/Reality block) and quoted again in full at **715**. Keep one; at 715,
  "the usability finding quoted above."
- "Claims data records that a service happened but not what it found" is made three times:
  Figure 4.2 row 4 ("A claim shows an HbA1c test was performed; it does not carry the
  result"), 741, and 742 ("not the blood pressure reading or the lab result"). Figure 4.2's
  version is the sharpest; 742's is the redundant one.
- The VHCURES/VITL/analytics triad is stated at 675, restated at 676, then tabulated as
  Figure 4.1 — three statements of the same three items on one page. 675 is a chapter opener
  and 676 a framing paragraph, so one of the two is legitimate scaffolding; the overlap is
  in the *list*, which Figure 4.1 already carries.
- §4.7's minimum AI-governance requirements (819–823) and §4.7's framing (816) both argue the
  CIN is the natural home for shared AI governance; 824 says it a third time. Legitimate
  recurrence in a recommendations list, but 824's first sentence is a restatement of 816.
- Not repetition (deliberate recurrence, leave alone): §4.11 glossary entries restating
  VHCURES/VITL/FHIR/CIN definitions; Figure 4.7 restating components introduced in prose;
  section headings naming their own topic.

**Copy defects found in the XML (mechanical, unambiguous)**
- **710** — "DVHA has direct operational relationships with healthcare providers through its
  Medicaid contracts, Blueprint for Health administration." Broken list: a conjunction or a
  third item is missing. Fix: "…through its Medicaid contracts **and** Blueprint for Health
  administration."
- **798** — "**Clinicians used the technology spent less time** writing notes during visits."
  Missing relative pronoun. Fix: "Clinicians **who used** the technology spent less time…"
- **757** — "only functions if bed capacity and provider availability **is tied with** a
  correctly matched patient record." Number disagreement plus a wrong preposition. Fix:
  "…if bed capacity and provider availability **are tied to** a correctly matched patient
  record."
- **791 (Figure 4.6)** — Partial row begins lowercase mid-phrase (MISMATCH 3 above).
- **827 (Figure 4.7, Layer 1)** — "Oracle Health (**others**), TruBridge (CAHs), Meditech
  (**others**)": "others" used as the descriptor for two mutually exclusive groups, so the
  cell does not partition the 14 hospitals. Also Epic is "(UVMMC, CVMC)" here but "dominant
  at UVMMC" at 763 with no mention of CVMC.

**Thin / structurally imbalanced sections**
- **§4.3 is half the chapter** — eleven subsections (4.3.1–4.3.11), including the entire
  UHDS treatment (4.3.5–4.3.10), the exclusive-operator argument, the privacy shield and the
  RHT dependency. Several of these are chapter-level arguments buried three levels deep:
  §4.3.3 (the repeal recommendation) and §4.3.5–4.3.6 (the UHDS, presented as *the* delivery
  vehicle) are arguably §4.4 and §4.5 in their own right. By contrast **§4.1 has one
  subsection, §4.7 has one, and §4.4 has two thin ones** (§4.4.1 is a single paragraph).
- **§4.4.1** ("What a Clinically Integrated Network Does") is one paragraph and duplicates
  the §4.11 glossary entry for CIN almost proposition-for-proposition.
- **§4.7** asserts "Vermont does not currently have a statewide AI governance framework" and
  then lists five requirements, but never states who promulgates them or under what authority
  — the only mechanism offered is "the CIN's shared services function," which is voluntary.
  Thin on the enforcement question the rest of the chapter is rigorous about.
- **§4.8's Figure 4.7** is presented as the deliverable the Strategic Plan should adopt, yet
  omits the two systems §4.3 spent ten subsections establishing (UHDS, MDWAS) — see
  CONTRADICTION 10. This is the single highest-value structural fix in the chapter.

**Ambiguity worth a decision, not a fix**
- **758** — "The Technology pillar is not one workstream among **six**; it is the substrate
  the other **five** run on." Arithmetically self-consistent (five pillars + Equity = six),
  but the book's framing is "five-pillar," and Figure 10.5 treats Equity as *cross-cutting*
  rather than a sixth workstream. "One workstream among six" invites the reader to count
  Equity as a peer pillar, which Chapter 10 declines to do.
- **808 / 815** — "**The book's later discussion** of diagnostic AI maturation…" and "The
  book's later discussion of AI governance…" Both almost certainly mean Chapter 5 ("FHIR, AI
  Governance, and Clinical Decision Support"), which exists. Naming it would be stronger and
  costs nothing.

**Not checked (out of scope, still open)**
- Criterion 5's non-automatable half: whether each Figure 4.8 tool tab actually delivers the
  named capability, and whether §4.9's claims about what the reader will find are true.
- Preface/Introduction alignment scan for Chapter 4's figures and definitions.
- Formatting (`check_format.py`) — this audit read the XML for content only and made no
  edits, so no render or format gate was triggered.

**No edits were made to `HTR_Book_v42.docx`.**
