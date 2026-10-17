#!/usr/bin/env python3
"""Preface + Introduction deep pass, 2026-10-17. Sources (text kept in book-audit/deep/sources/):
  Oliver Wyman, Act 167 Community Engagement: Recommendations (rev. 10/21/2024): 9 of 14 hospitals in loss (to -8.9%)
    in 2023; 5-yr deficit $0.7BN (3.5% revenue / 5% expense growth) vs $2.4BN (7-8% expense growth); silver premium
    $456 (2018) -> $948 (2024) +108%; income $60,781 -> $73,991 (+22%); 2020 age mix 0-19 21.7%, 65-74 11.9%,
    75+ 7.5% (65+ = 19.4%), 2040 65+ = 31.1%; working age 367K -> 318K (-13%).
  RAND: 2020 study (VTDigger 10/27/2020) UVMMC 358%, highest in VT; RAND to GMCB Aug 2024: VT systems 148%-321%,
    overall 283%, outpatient 311%.
  Census CB25-99 (6/26/2025): 11 states with more older adults than children in 2024; Maine oldest (44.8).
  Chartis 2026 State of the State: 41.2% of rural hospitals in the red. CHQPR (2026): 700+ at risk, 294 immediate.
  NORC/CMMI: Vermont All-Payer ACO Model 2018-2022, extended 2023, transition year 2024.
  RTI / Health Affairs: Maryland 2014 all-payer model — per-capita hospital revenue growth 1.47% (2014), 2.31% (2015)
    vs 3.58% cap; Medicare hospital spending per beneficiary grew more slowly than nationally.
  GMCB FY23 enforcement (9/13/2024 press release); settlement amended the order to spread remaining reductions over
    FY26-FY27, contingent on UVMMC dismissing its appeals. No source for "first enforcement in history" -> deleted.
  Act 68 (as enacted): GMCB may share subpoenaed material with AHS/DFR; providers must give unredacted contracts.
  AHS Act 68 report (Nov 2025): 91% have a personal health care provider vs 87% benchmark.
  VDH 2023 BRFSS Data Summary: 91% overall; BIPOC 88% vs white non-Hispanic 92% (BIPOC statistically less likely).
    The book's "11-point gap" matches no current VDH figure -> corrected book-wide.
  Platform: 35 Research Lab tools in tools.ts; Academy doorways existed only in Ch1, Ch4, Ch5 -> added to every
    other chapter from each Five Pillars lesson's own source-chapter reference (Sanity); routes verified.
Run: python3 book-audit/deep/fix_preface_intro_2026-10-17.py [--dry]
"""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text, clone_with_text, T, _unesc, _paragraphs

R = [  # (old, new, count) — plain text as in the book
    # Preface
    ('Vermont now ranks second-oldest in the country by median age (43.6), tied with New Hampshire and behind only '
     'Maine (44.8); West Virginia (43.0) is next.',
     'Maine is the oldest state by median age (44.8 in 2024); Vermont and New Hampshire are close behind.', 1),
    ('Nationally, 41% of rural hospitals operate in the red (Chartis Center for Rural Health) and roughly 768 are at '
     'risk of closing, 315 of them within three years (Center for Healthcare Quality and Payment Reform).',
     'Nationally, 41% of rural hospitals operate in the red (Chartis Center for Rural Health, 2026) and more than 700 '
     'are at risk of closing, 294 of them at immediate risk (Center for Healthcare Quality and Payment Reform, 2026).', 1),
    ('something that no state has done with this level of statutory specificity and capital commitment: mandate '
     'structural change.',
     'something few states have attempted: mandate structural change in statute.', 1),
    ('the GMCB’s monthly hospital data', 'the GMCB’s hospital budget data', 1),
    ('a Research Lab of nearly forty interactive analytical tools', 'a Research Lab of more than thirty interactive '
     'analytical tools', 2),
    ('The Research Lab is a suite of nearly forty interactive analytical tools',
     'The Research Lab is a suite of more than thirty interactive analytical tools', 1),
    # Introduction
    ('the Vermont Hospital Association,', 'the Vermont Association of Hospitals and Health Systems,', 1),
    ('ranged from $700 million in the optimistic scenario to $2.4 billion in the realistic one.',
     'ranged from $700 million if hospital expenses grew 5% a year to $2.4 billion if they grew 7–8%.', 1),
    ('The University of Vermont Medical Center, with approximately 50% of the state’s hospital market share, was '
     'charging commercial payers roughly 358% of Medicare rates — RAND’s published figure for inpatient and '
     'outpatient services combined, drawn from 2018–2020 claims — making it, by RAND’s own accounting, the most '
     'expensive hospital in Vermont.',
     'The University of Vermont Medical Center, the state’s largest hospital, was charging commercial payers roughly '
     '358% of Medicare rates for inpatient and outpatient services combined — the highest in Vermont in RAND’s 2020 '
     'hospital price study. RAND’s next Vermont analysis, presented to the GMCB in August 2024, put the state’s '
     'hospital systems between 148% and 321% of Medicare, with outpatient prices averaging 311%.', 1),
    ('with no regulatory brakes', 'with no cap on the prices themselves', 1),
    ('while the over-65 population rose from 21.7% toward 30% of the state’s total.',
     'while the over-65 share rose from about 19% in 2020 to more than 30% by 2040.', 1),
    ('What is already clear is that Vermont has committed to structural change with more specificity, more statutory '
     'force, and more capital investment than any comparably sized system in recent American health policy history.',
     'What is already clear is that Vermont has written structural change into statute — dated mandates for '
     'reference-based pricing, global budgets, and a statewide plan — and attached federal transformation capital to '
     'it.', 1),
    ('statutory global hospital budgets that change every hospital’s financial incentive',
     'statutory global hospital budgets that, by FY2030, change every hospital’s financial incentive', 1),
    ('fourteen nonprofit community hospitals', 'fourteen nonprofit hospitals', 1),
    ('Maryland has operated all-payer rate regulation since 1977 and maintains rural hospital access comparable to or '
     'better than non-regulated states, while holding per-capita cost growth below the national average.',
     'Maryland has set hospital rates for all payers since 1977, and under its 2014 all-payer model per-capita '
     'hospital revenue grew 1.47% and 2.31% in the first two years against a 3.58% ceiling, while hospital spending '
     'per Medicare beneficiary rose more slowly than it did nationally.', 1),
    ('produced modest results over nine years', 'produced modest results over its 2018–2024 run', 1),
    ('Acts 167 and 68 require hospitals to participate in global budgets and reference-based pricing regardless of '
     'what happens federally.',
     'Act 68 requires reference-based pricing and, as resources allow, global budgets for every hospital, regardless '
     'of what happens federally.', 1),
    ('The mandatory state framework under Acts 167 and 68 remained fully in force, and the reform continued without '
     'missing a step.',
     'The mandatory state framework under Act 68 remained fully in force.', 1),
    ('Act 68 gives GMCB subpoena authority and data-sharing power with the Department of Financial Regulation',
     'Act 68 lets GMCB share subpoenaed material with AHS and the Department of Financial Regulation and requires '
     'providers to hand over unredacted contracts on request', 1),
    (' were the first such enforcement actions in Vermont’s regulatory history, and UVMMC’s subsequent appeal',
     ' are the test. UVMMC’s subsequent appeal', 1),
    ('under a settlement that left the enforcement order in place.',
     'under a settlement that left the enforcement in place, amended only to spread the remaining rate reductions '
     'over FY2026 and FY2027.', 1),
    ('Vermont’s primary care access rate is roughly 91% — four points above the national benchmark and a genuine '
     'achievement. Yet that aggregate figure conceals an 11-point gap between white Vermont adults and BIPOC Vermont '
     'adults (Vermont Department of Health, Health Equity Data Report).',
     'Ninety-one percent of Vermont adults report having a personal health care provider — four points better than '
     'the benchmark AHS tracks, and statistically better than the U.S. rate — a genuine achievement. Yet BIPOC '
     'Vermonters are statistically less likely to have one: 88%, against 92% of white non-Hispanic adults (Vermont '
     'Department of Health, 2023 BRFSS).', 1),
    ('“Go Deeper — Academy” guide naming', '“In the Academy” note naming', 1),
    ('callouts on every hub and tool', 'callouts on the pillar hubs and many of the tools', 1),
    ('the Vermont-specific Medicaid Learning Center is at /academy', 'the Vermont-specific Medicaid Learning Center is '
     'at /academy/medicaid', 0),  # placeholder, handled below if present
    # the "11-point" gap elsewhere (Ch1, Appendix A)
    ('the 11-point white/BIPOC gap behind it', 'the white/BIPOC gap behind it', 1),
    ('Vermont’s 11-point primary care access gap between white and BIPOC residents',
     'Vermont’s primary care access gap between white and BIPOC residents', 1),
    ('Vermont’s 11-point white/BIPOC primary-care access gap', 'Vermont’s white/BIPOC primary-care access gap', 1),
    ('Vermont Hospital Association statements', 'Vermont Association of Hospitals and Health Systems statements', 2),
]

DOORWAY_SENTENCE = ('Every chapter closes with the same two doorways', None)

ACADEMY = {  # chapter -> note (lesson titles and course slugs verified in Supabase/Sanity 2026-10-17)
    2: 'In the Academy: Track 2 of the companion course, Five Pillars, One Imperative — “Policy — Establish the '
       'Mandate” — works this chapter in two lessons: “Legislative Architecture: Act 167 → Act 51 → Act 68” and '
       '“Voluntary vs. Mandatory — Why Architecture Beats Ambition” (/academy/tracks/five-pillars-one-imperative). '
       'For the federal-state machinery underneath the statutes, Medicaid 101 (/academy/tracks/medicaid-101) covers '
       'financing, managed care, and waivers.',
    3: 'In the Academy: Track 2’s lesson “CMMI Models, Waivers, and the Federal–State Interface” '
       '(/academy/tracks/five-pillars-one-imperative) works this chapter’s model and waiver strategy. Medicaid 101’s '
       'track “Waivers & State Flexibility” (/academy/tracks/medicaid-101) and Medicare Fundamentals '
       '(/academy/tracks/medicare-fundamentals) cover the federal programs those strategies run through.',
    6: 'In the Academy: Track 4 of Five Pillars, One Imperative — “Economics — Put Incentives on a Visible System” — '
       'works this chapter in “Global Budgets and Reference-Based Pricing” and “Economics-as-Design vs. '
       'Economics-as-Management” (/academy/tracks/five-pillars-one-imperative). The Hospital Finance course '
       '(/academy/tracks/hospital-finance) covers the hospital-side mechanics: revenue, cost accounting, capital, and '
       'value-based finance.',
    7: 'In the Academy: Track 4’s lesson “APM Readiness and VBC Financial Modeling” '
       '(/academy/tracks/five-pillars-one-imperative) works this chapter’s models step by step, and the Value-Based '
       'Care course (/academy/tracks/value-based-care) covers ACOs, bundled payments, quality reporting, and risk '
       'adjustment before your next contract cycle.',
    8: 'In the Academy: Track 5 of Five Pillars, One Imperative — “Clinical — Redesign Care on Aligned Incentives” — '
       'works this chapter in “Care Model Redesign Under Global Budgets” (/academy/tracks/five-pillars-one-imperative). '
       'The Behavioral Health Integration course (/academy/tracks/behavioral-health-integration) and the Population '
       'Health Management course (/academy/tracks/population-health-management) go deeper on the care models.',
    9: 'In the Academy: Track 5’s lesson “Quality Mechanics — HEDIS, HCC, and Measuring What Matters” '
       '(/academy/tracks/five-pillars-one-imperative) works this chapter’s quality and coding mechanics, and the '
       'Clinical Quality Measurement course (/academy/tracks/clinical-quality-measurement) covers HEDIS, CAHPS, CMS '
       'quality programs, and eCQMs in depth.',
    10: 'In the Academy: Track 7 of Five Pillars, One Imperative — “The Equity Imperative” — works this chapter in '
        '“Calibrate for the Gap, Not the Average” and “HEROI, Stratified HEDIS, and VBC Equity Safeguards,” building on '
        'Track 1’s “The Equity Imperative: Is It Just?” (/academy/tracks/five-pillars-one-imperative). The Health Equity '
        '& SDOH course (/academy/tracks/health-equity-sdoh) and the Health Equity Analytics course '
        '(/academy/tracks/health-equity-analytics) go deeper on measurement and action.',
    11: 'In the Academy: Track 6 of Five Pillars, One Imperative — “Operations — Close the Execution Gap” — works this '
        'chapter in “Regionalization and Right-Sizing a Hospital System” and “Workforce as the Binding Constraint” '
        '(/academy/tracks/five-pillars-one-imperative). The Revenue Cycle Management course '
        '(/academy/tracks/revenue-cycle-management) covers the operational finance underneath hospital execution.',
    12: 'In the Academy: Track 8’s lesson “Knowledge Infrastructure and Technical Assistance” '
        '(/academy/tracks/five-pillars-one-imperative) works this chapter, and the Transformation Leadership course '
        '(/academy/tracks/transformation-leadership) covers change management, the PMO, and stakeholder management '
        'under mandatory reform.',
    13: 'In the Academy: Track 8 closes with “Capstone — Apply the Framework to Your Own System” '
        '(/academy/tracks/five-pillars-one-imperative), which draws on this chapter and Chapter 16 to walk your own '
        'system through all five pillars and the Equity Imperative.',
    14: 'In the Academy: Track 8’s lesson “Political Sustainability Across Election Cycles” '
        '(/academy/tracks/five-pillars-one-imperative) works this chapter’s durability analysis against the record of '
        'Vermont’s reform cascade.',
    15: 'In the Academy: Track 8’s lesson “Transformation as Portfolio Management” '
        '(/academy/tracks/five-pillars-one-imperative) works this chapter, and the Transformation Leadership course '
        '(/academy/tracks/transformation-leadership) runs it as practice in “Building the PMO” and “Running the '
        'Sequencing Test: A Portfolio Register Workshop.”',
    16: 'In the Academy: Track 8’s “Capstone — Apply the Framework to Your Own System” '
        '(/academy/tracks/five-pillars-one-imperative) applies this chapter’s method to AHS’s own restructuring, and the '
        'HIE & Health Reform course (/academy/tracks/hie-health-reform-onboarding) walks Vermont’s reform pillar by '
        'pillar.',
}
TEMPLATE_KEY = 'In the Academy: Track 3 of the companion course'


def chapter_spans(x):
    heads = []
    for a, b in _paragraphs(x):
        p = x[a:b]
        if 'w:val="Heading1"' not in p:
            continue
        t = ''.join(_unesc(n.group(2)) for n in T.finditer(p))
        m = re.match(r'Chapter (\d+):', t)
        heads.append((a, int(m.group(1)) if m else None))
    spans = {}
    for i, (a, n) in enumerate(heads):
        if n:
            spans[n] = (a, heads[i + 1][0] if i + 1 < len(heads) else len(x))
    return spans


def my_apply(x, _):
    for old, new, n in R:
        if n == 0:
            continue
        x = replace_text(x, old, new, n)
    # the two doorways sentence (spans bold runs); replace from its plain start
    i = x.find('Every chapter closes with the same two doorways')
    assert i > 0
    x = replace_text(x, 'Every chapter closes with the same two doorways — EXPLORE ON THE PLATFORM, then GO DEEPER — '
                        'ACADEMY — and shorter',
                     'Every chapter closes with the same two doorways — a “Work This Chapter on the Platform” guide, '
                     'then an “In the Academy” note — and shorter', 1)
    # Learning Center link text (plain text "/academy" run after the sentence in the Vermont practitioner path)
    x = replace_text(x, 'The Vermont-specific Medicaid Learning Center is at /academy.',
                     'The Vermont-specific Medicaid Learning Center is at /academy/medicaid.', 1)
    # Academy notes: insert before each chapter's "Implications for You" heading
    spans = chapter_spans(x)
    for ch in sorted(ACADEMY, reverse=True):
        a, b = spans[ch]
        seg = x[a:b]
        assert 'In the Academy:' not in ''.join(_unesc(n.group(2)) for n in T.finditer(seg)), ch
        hp = [(pa, pb) for pa, pb in _paragraphs(seg)
              if re.fullmatch(r'%d\.\d+\s+Implications for You' % ch,
                              ''.join(_unesc(n.group(2)) for n in T.finditer(seg[pa:pb])).strip())]
        assert len(hp) == 1, (ch, len(hp))
        pos = a + hp[0][0]
        x = x[:pos] + clone_with_text(x, TEMPLATE_KEY, ACADEMY[ch]) + x[pos:]
        spans = chapter_spans(x)
    print('  ok: %d text edits + doorway sentence + %d Academy notes' % (sum(1 for r in R if r[2]), len(ACADEMY)))
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        y = my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None)
        xml.dom.minidom.parseString(y.encode())
        print('DRY OK')
    else:
        P.apply = my_apply
        P.main([{'op': 'noop'}])
