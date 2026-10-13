#!/usr/bin/env python3
"""Mirror the 2026-10-13 audit edits into the committed reader HTML without regenerating it.

This container's pandoc (3.1.3) writes different reader markup than the committed files, so
after `refresh_md.py` run:
    git checkout -- frontend/content/book-html/
    python3 book-build/edits/reader_html_subs_2026-10-13.py
Each pair is (old text, new text); pairs that do not occur are skipped.
"""
import glob, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SUBS = [
    ("$195M a year in RHT funds", "a $195M first-year RHT award"),
    ("$195M/yr RHT +", "$195M first-year RHT award +"),
    ("$195M/yr in RHT capital", "the $195M first-year RHT award"),
    ("$195 million per year is the only", "$195 million first-year award is the only"),
    ("Reference-based pricing mandatory for all commercial payers",
     "Statutory deadline for reference-based pricing (GMCB sets prices by rule in 2027, effective hospital FY2028)"),
    ("Global hospital budgets for non-Critical Access Hospitals",
     "Global hospital budgets for one or more non-critical access hospitals (all hospitals by FY2030)"),
    ("Global budgets mandatory (non-CAH hospitals)",
     "Global budgets begin (one or more non-CAH hospitals; all by FY2030)"),
    ("Agency of Digital Services (ADS) ,", "Agency of Digital Services (ADS),"),
    ("59% of primary care practices accepting new Medicaid patients — significant equity gap",
     "71% of primary care practices accepting new Medicaid patients (June 2026, up from 59% a year earlier) — still an equity gap"),
    ("<p><strong>59%</strong></p>\n<p><strong>Primary Care Accepting New Medicaid</strong></p>",
     "<p><strong>71%</strong></p>\n<p><strong>Primary Care Accepting New Medicaid (June 2026)</strong></p>"),
    ("Primary care practices accepting new Medicaid patients</td>\n<td style=\"text-align: left;\">59%</td>",
     "Primary care practices accepting new Medicaid patients</td>\n<td style=\"text-align: left;\">71% (June 2026; 59% in June 2025)</td>"),
    ("Primary care acceptance: increase from 59%", "Primary care acceptance: increase from 71% (June 2026)"),
    ("Auditor Findings", "Benchmarking Findings"),
    ("A state audit revealed", "A 2022 benchmarking study OneCare submitted to the GMCB revealed"),
    ("auditor-documented 36% higher", "a 2022 benchmarking study found 36% higher"),
    ("It wound down after roughly twelve years, founded in 2013",
     "It wound down after roughly thirteen years, formed in 2012"),
    ("OneCare Vermont ran for twelve years", "OneCare Vermont ran for more than a decade"),
]

for f in sorted(glob.glob(os.path.join(ROOT, 'frontend/content/book-html/*.html'))):
    s = open(f, encoding='utf8').read()
    o = s
    for a, b in SUBS:
        if a in s:
            s = s.replace(a, b)
            print('%-18s <- %s' % (os.path.basename(f), a[:50].replace('\n', ' ')))
    if s != o:
        open(f, 'w', encoding='utf8').write(s)
