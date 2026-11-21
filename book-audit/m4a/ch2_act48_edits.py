"""M4A Phase 6: Chapter 2 §2.1.1 (Act 48 of 2011 and the single-payer attempt) + Figure 2.5 rows + Academy
pointer + Key Concept + Sources. Run:  python3 book-build/patch_docx.py book-audit/m4a/ch2_act48_edits.py
Facts: book-audit/deep/sources/m4a/VERIFIED_FACTS_M4A.md (Act 48 §§ 1822, 1824, 1827, 9374; 2013 plan Table 7;
2014 report pp. 6, 16, 40, 51; ERISA § 514; ACA § 1332; S.1506 §§ 701, 801, 901). Cross-refs: Ch1 (Gobeille/OneCare),
Ch4 (VHCURES self-insured gap). Paragraph XML is cloned from existing Chapter 2 paragraphs (same fonts/sizes);
table rows are built with docx_build (rule 24)."""
import os, re, sys, zipfile
sys.path.insert(0, 'book-build')
from docx_build import run, para, cell, row  # noqa: E402

X = zipfile.ZipFile('HTR_Book_v42.docx').read('word/document.xml').decode('utf-8')


def para_xml(marker):
    assert X.count(marker) == 1, (marker, X.count(marker))
    i = X.find(marker)
    a = max(X.rfind('<w:p ', 0, i), X.rfind('<w:p>', 0, i))
    return X[a:X.find('</w:p>', i) + 6]


def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def clean(p):
    p = re.sub(r' w14:paraId="[^"]*"', '', p)
    return re.sub(r'<w:bookmarkStart [^>]*/><w:bookmarkEnd [^>]*/>', '', p)


BODY = clean(para_xml('This chapter examines each act, the analytical infrastructure'))
HEAD = clean(para_xml('Decreasing Affordability'))
KC = clean(para_xml(' A federal designation allowing a hospital to provide 24/7 emergency services'))


def body(text):
    ts = list(re.finditer(r'(<w:t[^>]*>)([^<]*)(</w:t>)', BODY))
    assert len(ts) == 1
    m = ts[0]
    return BODY[:m.start(2)] + esc(text) + BODY[m.end(2):]


def heading(num, title):
    ts = list(re.finditer(r'(<w:t[^>]*>)([^<]*)(</w:t>)', HEAD))
    assert [t.group(2) for t in ts] == ['2.3.1  ', 'Decreasing Affordability']
    out = HEAD[:ts[0].start(2)] + num + '  ' + HEAD[ts[0].end(2):ts[1].start(2)] + esc(title) + HEAD[ts[1].end(2):]
    return out


def key_concept(term, definition):
    ts = list(re.finditer(r'(<w:t[^>]*>)([^<]*)(</w:t>)', KC))
    assert len(ts) == 2
    return KC[:ts[0].start(2)] + esc(term) + KC[ts[0].end(2):ts[1].start(2)] + esc(' ' + definition) + KC[ts[1].end(2):]


H = heading('2.1.1', 'Before the Cascade: Act 48 of 2011 and the Single-Payer Attempt')
P1 = body("The cascade did not start from a blank page. Act 48 of 2011 set Vermont on a path to Green Mountain Care, a universal, publicly financed plan for which every resident would be eligible “regardless of whether an employer offers health insurance.” The same statute created the Green Mountain Care Board on July 1, 2011 — the regulator that would later hire Oliver Wyman under Act 167 and is now carrying out Act 68’s pricing and budget mandates.")
P2 = body("Act 48 issued authority for the Board but deferred the plan’s money. Green Mountain Care could start only 90 days after the last of five conditions was met: a federal waiver under Section 1332 of the Affordable Care Act, a law establishing the financing, Board approval of the benefit package, appropriations, and a Board finding that the plan would be sustainably financed and would not harm Vermont’s economy. The estimates rose as the decision approached. The state’s January 2013 financing plan put the amount to be raised for 2017 at $1.61 billion; the administration’s December 2014 report put it at $2.58 billion, to come from an 11.5% payroll tax on all employers and an income-based premium of up to 9.5% — and still showed the fund in deficit from 2019. On December 17, 2014, Governor Peter Shumlin announced that he could not recommend public financing: “the risk of economic shock is too high.”")
P3 = body("Three of the walls the plan met were federal. A state cannot run Medicare: Act 48 could only direct the state to seek CMS’s permission, with Green Mountain Care paying second if refused, and the final design left all 140,000 Vermonters on Medicare where they were. A state cannot bind self-insured employer plans, which ERISA places beyond state insurance law — the same limit that, in Gobeille v. Liberty Mutual, blocked the state from compelling self-insured payers into OneCare’s model (Chapter 1) and leaves self-insured plans outside VHCURES unless the employer submits voluntarily (Chapter 4). And a Section 1332 waiver can only redirect marketplace subsidies, without increasing the federal deficit: Vermont’s expected pass-through fell from $267 million to $106 million, against a program costing $4.34 billion. The fourth wall, financing, was Vermont’s own, and it is where the plan stopped.")
P4 = body("In this book’s terms, Act 48 stopped at the Policy-to-Economics gate: authority for the institution was issued, authority for the money never was, and the statute’s own conditions made the stop orderly rather than a reversal. The lesson travels. The federal Medicare for All bills, S.1506 and H.R.3069, would remove the three federal walls — they fold Medicare and Medicaid funding into one trust fund and amend ERISA itself — but as introduced neither contains a revenue title, leaving standing the wall that ended Vermont’s attempt. Vermont’s later reforms took the other road: rather than replacing payers, Act 68 places the state’s mandatory lever on hospital prices and budgets, where its authority is its own.")


def r(t, b=False):
    return run(t, bold=b)


ROW1 = row([
    cell(para(r('Test why a state single payer stopped, and what a federal one would change'))),
    cell(para(r('Medicare for All: the five-pillar test', True) + r(' — /policy/medicare-for-all and ') + r('Vermont Act 48', True) + r(' — /policy/medicare-for-all/vermont-act-48'))),
    cell(para(r('Which of the four walls — Medicare, ERISA, waivers, financing — a federal law removes, and which gate each pillar is held at.'))),
])
ROW2 = row([
    cell(para(r('Model a single payer for each of Vermont’s 14 hospitals'))),
    cell(para(r('Single-Payer Modeler', True) + r(' — /policy/medicare-for-all/modeler'))),
    cell(para(r('The revenue-neutral single rate, and which hospitals gain or lose under one rate versus a cost-based global budget.'))),
])

ACAD_OLD = 'In the Academy: Track 2 of the companion course, Five Pillars, One Imperative'
ACAD_NEW = ("In the Academy: Track 2 of the companion course, Five Pillars, One Imperative — “Policy — Establish the Mandate” — works this chapter in two lessons: “Legislative Architecture: Act 167 → Act 51 → Act 68” and “Voluntary vs. Mandatory — Why Architecture Beats Ambition” (/academy/tracks/five-pillars-one-imperative). For the federal-state machinery underneath the statutes, Medicaid 101 (/academy/tracks/medicaid-101) covers financing, managed care, and waivers. "
            "Medicare for All Through the Five-Pillar Test (/academy/tracks/medicare-for-all-five-pillar-test) takes §2.1.1 further: its Track 2, “Vermont’s Attempt, 2011-2014,” reconstructs Act 48 from the state’s own reports, and its Track 3, “Federal Versus State: The Walls,” works through Medicare, ERISA and waivers.")

KC_NEW = key_concept('Act 48 of 2011', "Vermont’s law that created the Green Mountain Care Board and set a conditional path to Green Mountain Care, a universal, publicly financed plan. The plan stopped in December 2014, when the Governor declined to propose its financing (see §2.1.1).")

SRC_ANCHOR = 'presented to Vermont House Health Care Committee, January 31, 2025; Green Mountain Care Board, 2024 Annual Report, January 15, 2025.'
SRC_NEW = ("Sources: Act 167 of 2022 (Vermont); Act 51 of 2023 (Vermont); Act 68 of 2025 (Vermont); Oliver Wyman Healthcare and Life Sciences Group, Act 167 Community Engagement: Recommendations (August 2024, revised October 2024 and January 2025); Green Mountain Care Board, Act 68 Update on Hospital Reference-Based Pricing and Global Budgets, February 17, 2026; Vermont Agency of Human Services, Vermont Rural Health Transformation Program Application, November 3, 2025; Vermont Agency of Human Services / Brendan Krause, Vermont’s Health Care Reform Efforts, presented to Vermont House Health Care Committee, January 31, 2025; Green Mountain Care Board, 2024 Annual Report, January 15, 2025; "
           "Act 48 of 2011 (Vermont); Vermont Agency of Administration, Health Care Reform Financing Plan (Act 48, Sec. 9), January 24, 2013; Office of Gov. Peter Shumlin, Green Mountain Care: A Comprehensive Model for Building Vermont’s Universal Health Care System, December 30, 2014; 29 U.S.C. § 1144 (ERISA § 514); 42 U.S.C. § 18052 (ACA § 1332); S.1506 and H.R.3069, Medicare for All Act (119th Congress), as introduced.")

assert X.count(SRC_ANCHOR) == 1, X.count(SRC_ANCHOR)
assert X.count(ACAD_OLD) == 1
assert X.count('Trace how a statutory mandate cascades') == 1

EDITS = [
    {'op': 'ins_after', 'find': 'This chapter examines each act, the analytical infrastructure', 'xml': H + P1 + P2 + P3 + P4},
    {'op': 'append_row', 'find': 'Trace how a statutory mandate cascades', 'xml': ROW1 + ROW2},
    {'op': 'set_para', 'find': ACAD_OLD, 'text': esc(ACAD_NEW)},
    {'op': 'ins_after', 'find': ' A federal designation allowing a hospital to provide 24/7 emergency services', 'xml': KC_NEW},
    {'op': 'set_para', 'find': SRC_ANCHOR, 'text': esc(SRC_NEW)},
]
