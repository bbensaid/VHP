# -*- coding: utf-8 -*-
"""Phase-1 step-5 surgical edit proposals for HTR_Book_v42.docx.

PROPOSALS ONLY. Nothing here has been applied; patch_docx.py was NOT run
against the book.  Every `find` was verified against word/document.xml of the
repo .docx (mtime 2026-10-07 12:23) with x.count(find) == 1, and every `raw`
op sits wholly inside a single <w:t> run, so run formatting is preserved.
Re-verify on the fresh Google-Docs download before applying (CLAUDE.md rule 10).

Run from the repo root (the builder import below uses a cwd-relative path):
    python3 book-build/patch_docx.py book-audit/phase1/step5/edits_step5.py

Evidence for every op: book-audit/phase1/step5/findings.jsonl (ids match).

Primary sources:
  [OW25]   Oliver Wyman, "Act 167 Updated Community Engagement Recommendations",
           legislature.vermont.gov, 4 Feb 2025: p.40 (COEs for Grace Cottage,
           Gifford, North Country, Porter "require further discussion"); p.111
           (Porter recs: interim bed conversion to MH/geri-psych/memory care,
           long-term "Grow surgical services"); p.112 (Major Restructuring /
           unlikely to sustain inpatient = Gifford, Grace Cottage, North Country,
           Springfield -- NOT Porter); slide 16 (income +22% 2018-2022 nominal;
           approved charges +38% FY2018-FY2024; Silver premium $456->$948 +108%
           2018-2024); slide 7 (engagement table: Community Meetings (public HSA
           level) 50 meetings / 1,947 est. attendees; "~68 participants on average
           per Ph2 community meeting incl. state-wide meetings").
  [CENSUS] census.gov release 26 Jun 2025 + Vintage 2024 PEP single-year file:
           median age ME 44.8, VT 43.6, NH 43.6, WV 43.0 (FL 42.6 next).
  [JFO]    Vermont JFO, "Vermont's Population Estimates for 2024", 22 Apr 2026.
"""
import sys
sys.path.insert(0, 'book-build')
from docx_build import run, para, cell, row  # noqa: E402  (CLAUDE.md rule 24)

# New Fig 11.5 row for Porter.  Built with the canonical builders.  The cells are
# unfilled like every other data row in Fig 11.5, so color=None inherits exactly
# what the neighbouring rows inherit; sz 18 and after=140 match the neighbours'
# effective size and the document default spacing.
def _c(text):
    return cell(para(run(text, color=None, sz=18), sz=18, after=140))

PORTER_ROW = row([
    _c('Porter Medical Center (Middlebury)'),
    _c('TBD'),
    _c('Tier 2 — Focused scope'),
    _c('UVM Health Network affiliate; COE designations still under discussion. '
       'Oliver Wyman’s long-term recommendation is to grow surgical services; '
       'interim options include converting inpatient beds to mental-health, '
       'geri-psych, or memory care.'),
], header=False)

EDITS = [

    # =====================================================================
    # S5-1  PORTER MEDICAL CENTER TIER
    # Defect: Ch11 places Porter among Tier 3 ("cannot sustain inpatient beds")
    # and Fig 11.5 / Ch16 give it Tier 3 / "TBD tier", contradicting Appendix C
    # (Tier 2).  [OW25] p.112 does not list Porter as unable to sustain inpatient
    # operations; p.111 recommends growing surgical services; FY2023 margin +7.6%
    # (p.109).  Only its COE designations are "further discussion" (p.40), so
    # Ch2 Fig 2.2's COE row naming Porter is correct and is left untouched.
    # =====================================================================

    # S5-1a  Ch11 §11.5 Tier-3 paragraph: drop Porter from the Tier-3 list, keep
    # the (true) COE-under-discussion point, place it in Tier 2.
    {"op": "raw",
     "find": "Grace Cottage, Gifford Medical Center, North Country Hospital, and Porter Medical Center are among the facilities whose futures require further discussion as part of Vermont’s regionalization planning.",
     "replace": "Grace Cottage, Gifford Medical Center, and North Country Hospital are among the facilities whose futures require further discussion as part of Vermont’s regionalization planning. Porter Medical Center’s centers-of-excellence designations are also still under discussion, but it retains inpatient care as a Tier 2 facility within the UVM Health Network."},

    # S5-1b  Fig 11.5 Tier-3 group row: remove Porter.  The cell text alone occurs
    # twice (Ch2 Fig 2.2 has the same string and is correct), so the anchor
    # includes this row's unique w14:paraId="00000E2B".
    {"op": "raw",
     "find": 'w14:paraId="00000E2B"><w:pPr><w:jc w:val="left"/><w:rPr/></w:pPr><w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000"><w:rPr><w:sz w:val="18"/><w:szCs w:val="18"/><w:rtl w:val="0"/></w:rPr><w:t xml:space="preserve">Grace Cottage, Gifford, North Country, Porter</w:t>',
     "replace": 'w14:paraId="00000E2B"><w:pPr><w:jc w:val="left"/><w:rPr/></w:pPr><w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000"><w:rPr><w:sz w:val="18"/><w:szCs w:val="18"/><w:rtl w:val="0"/></w:rPr><w:t xml:space="preserve">Grace Cottage, Gifford, North Country</w:t>'},

    # S5-1c  Fig 11.5: insert a Porter row (Tier 2) immediately after the
    # Mt. Ascutney row, i.e. last of the Tier-2 block, before the Tier-3 row.
    # Anchor = the unique Mt. Ascutney rationale text + the row close.
    {"op": "raw",
     "find": 'Rehabilitation COE. Dartmouth Health affiliation creates cross-border care opportunities.</w:t></w:r><w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000"><w:rPr><w:rtl w:val="0"/></w:rPr></w:r></w:p></w:tc></w:tr>',
     "replace": 'Rehabilitation COE. Dartmouth Health affiliation creates cross-border care opportunities.</w:t></w:r><w:r w:rsidDel="00000000" w:rsidR="00000000" w:rsidRPr="00000000"><w:rPr><w:rtl w:val="0"/></w:rPr></w:r></w:p></w:tc></w:tr>' + PORTER_ROW},

    # S5-1d  Ch16 HSA table, Middlebury row: "TBD tier" -> Tier 2 (COEs TBD).
    {"op": "raw",
     "find": ">TBD tier; UVM-network affiliation; shared-service opportunities with UVMMC<",
     "replace": ">Tier 2 (COE designations TBD); UVM-network affiliation; shared-service opportunities with UVMMC<"},

    # =====================================================================
    # S5-2  PREFACE MEDIAN-AGE BOX
    # Defect: all four ages and Vermont's rank are wrong for 2024.  [CENSUS]
    # Vintage 2024: ME 44.8, VT 43.6, NH 43.6, WV 43.0; Vermont tied 2nd.
    # [JFO] "third highest ... after Maine and New Hampshire" is the same tie at
    # one decimal.  Whole-manuscript grep (oldest / median age / 42.8 / 45.1 /
    # 43.x / 44.x): this is the ONLY instance.  Factual correction to the Preface
    # itself (allowed: the Preface yields to no chapter, but must be true).
    # =====================================================================
    {"op": "raw",
     "find": "Vermont now ranks fourth-oldest in the country by median age (42.8), behind Maine (45.1), New Hampshire (43.0), and West Virginia (42.9).",
     "replace": "Vermont now ranks second-oldest in the country by median age (43.6), tied with New Hampshire and behind only Maine (44.8); West Virginia (43.0) is next."},

    # =====================================================================
    # S5-3  INCOME 22% PERIOD
    # Defect: [OW25] slide 16 -- income +22% is 2018-2022 (nominal); premium
    # +108% is 2018-2024; approved hospital charge increases +38% is
    # FY2018-FY2024.  The book presents the 22% as covering the premium period
    # and puts the 38% in 2018-2022.  Annualised: premiums ~13.0%/yr, charges
    # ~5.5%/yr, income ~5.1%/yr -- so it is PREMIUM growth, not hospital price
    # growth, that runs two to three times (~2.6x) income growth.
    # Grep (22%/38%/108%): Preface, Introduction, Ch2 prose, Ch2 box, and a
    # fifth instance in Appendix A not listed in the original finding.
    # =====================================================================

    # S5-3a  Preface: decouple the periods.
    {"op": "raw",
     "find": "Premiums had risen 108% in six years while household income grew 22%.",
     "replace": "Premiums had risen 108% in six years; median household income grew 22% in the four years to 2022."},

    # S5-3b  Introduction: "over the same period" (= 2018-2024) is wrong.
    {"op": "raw",
     "find": "Median household income had grown 22% over the same period.",
     "replace": "Median household income had grown 22% between 2018 and 2022."},

    # S5-3c + S5-3d  Ch2 §2.3 prose: 38% is FY2018-FY2024 (not "the same period"
    # as 2018-2022); and the "two to three times" ratio belongs to premiums.
    {"op": "raw",
     "find": "Hospital approved charge increases grew 38% over the same period, compared to income growth of 22%. The gap is structural: hospital price growth has been running at two to three times income growth,",
     "replace": "Hospital approved charge increases compounded to 38% from FY2018 to FY2024. The gap is structural: premium growth has been running at two to three times the annual pace of income growth,"},

    # S5-3e  Ch2 box bullet: same two period errors.
    {"op": "raw",
     "find": ">Hospital charges grew 38% from 2018 to 2022; median household income grew only 22% over the same period<",
     "replace": ">Hospital charges grew 38% from FY2018 to FY2024; median household income grew 22% from 2018 to 2022<"},

    # S5-3f  Appendix A (Vermont System Portrait): same implied same-period
    # pairing.  Found by the rule-13 grep; not in the original finding.
    {"op": "raw",
     "find": "a 108% increase — while median household income grew 22%, and out-of-pocket",
     "replace": "a 108% increase — while median household income grew 22% (2018–2022), and out-of-pocket"},

    # =====================================================================
    # S5-4  OW ENGAGEMENT: "50 ... meetings averaging 68 participants each"
    # Defect: 50 x 68 = 3,400 > the 3,100 total.  [OW25] slide 7 table: the 50
    # public HSA-level community meetings had an estimated 1,947 attendees
    # (~39 each); "~68" is OW's average per Phase-2 community meeting INCLUDING
    # state-wide meetings.  The 230 / 3,100 / 100+ figures are correct, left.
    # =====================================================================
    {"op": "raw",
     "find": "50 public HSA-level community meetings averaging 68 participants each,",
     "replace": "50 public HSA-level community meetings with an estimated 1,947 attendees in all (roughly 39 each),"},

    # =====================================================================
    # S5-6  STRUCTURAL REPETITION (back-to-back bridge sections)
    # Method: difflib SequenceMatcher over every sentence pair in each block --
    # no pair reached 0.8 (max 0.76, a heading vs a caption); the restatement is
    # paraphrase, confirmed by manual read.  Only restated paragraphs are removed;
    # no prose is rewritten.  No cross-references to any removed text exist.
    # =====================================================================

    # S5-6a  Ch10 §10.10 opening paragraph restates the §10.9 bridge ("The
    # remainder of this chapter turns that equity landscape into an operational
    # toolkit") as a recap of the chapter's first half, and calls the same
    # chapter "this chapter" as if it were a new one.  §10.10's second paragraph
    # (measurement vs. program, Acts 167/68 accountability) is unique -> kept.
    {"op": "del_para",
     "find": "The first half of this chapter established the Vermont equity landscape"},

    # S5-6b  Ch11 §11.10 second paragraph restates the §11.9 bridge and the §11.9
    # heading (revenue cycle / HCC / credentialing ...) as a roadmap -- and its
    # "four operational domains" list omits administrative simplification, which
    # §11.15 covers.  §11.10's first paragraph (the "operations are the
    # substrate" thesis) is unique -> kept.
    {"op": "del_para",
     "find": "These sections develop the operational mechanics of healthcare transformation"},

    # S5-6c / S5-6d  Ch12: heading "12.2.2  Four Components of the HTR Platform"
    # restates heading "12.2.1  The HTR Platform — Four Components", and its
    # lead-in sentence restates both.  Remove the duplicate heading and lead-in;
    # Figure 12.1 then follows the 12.2.1 list as the table that summarises it
    # (legitimate recurrence).  The 12.2.1 list stays: it alone carries the
    # platform URLs, the Convergence Newsletter and the advisory e-mail.
    # (Heading bookmark _lq2plq41pd5s has no references.)  Leaves 12.2.1 as a
    # lone subsection under 12.2 -- flagged for the author, not renumbered here.
    {"op": "del_para",
     "find": ">Four Components of the HTR Platform</w:t>"},
    {"op": "del_para",
     "find": "The transformation implementation platform has four integrated components"},

    # =====================================================================
    # S5-7  FIGURE 10.1: FIRST DATA ROW STYLED AS A HEADER
    # Fig 10.1 is a 2x2 grid of four indicator cells (name + value + note in
    # each cell).  Neither row names columns -- there are no column names -- so
    # row 0 is a DATA row wearing header dress: tblHeader=1, explicit PALE fill
    # (edf2f9), bold, hard-coded 111111 ink, while row 1 is unfilled roman with
    # inherited ink (CLAUDE.md rule 26).
    # Fix = make row 0 identical to row 1.  Removing row 0's explicit fill alone
    # would be WORSE: the table's tblLook is 0020 (firstRow ON), and Table119's
    # firstRow rule paints any unfilled row 0 navy 1b3a6b -- check_format.py rule
    # 4a (STYLE-PAINTED-DATA-ROW), invisible in every LibreOffice render (memory:
    # project_black_on_navy_root_cause).  So tblLook goes to 0600 (firstRow and
    # both banding rules OFF), exactly what docx_build.table() emits for a
    # header-less table.  With banding off, row 1 also loses Table119's band1Horz
    # f4f6f9 tint, so both rows render alike: white, c9d2dd borders.
    # Anchor = row 0's unique paraId (the cell text contains a non-matching
    # character and occurs 0 times as plain text).  Expected substitutions:
    # 1, 1, 2, 2 -- asserted in the dry run.
    # =====================================================================
    {"op": "tbl_regex", "find": 'w14:paraId="00000BE7"',
     "pattern": r'<w:tblLook w:val="0020"/>',
     "replace": '<w:tblLook w:val="0600"/>'},
    {"op": "tbl_regex", "find": 'w14:paraId="00000BE7"',
     "pattern": r'<w:cantSplit w:val="1"/><w:tblHeader w:val="1"/>',
     "replace": '<w:cantSplit w:val="1"/><w:tblHeader w:val="0"/>'},
    {"op": "tbl_regex", "find": 'w14:paraId="00000BE7"',
     "pattern": r'<w:tcPr><w:shd w:fill="edf2f9" w:val="clear"/></w:tcPr>',
     "replace": '<w:tcPr/>'},
    {"op": "tbl_regex", "find": 'w14:paraId="00000BE7"',
     "pattern": r'<w:b w:val="1"/><w:bCs w:val="1"/><w:color w:val="111111"/>',
     "replace": ''},
]
