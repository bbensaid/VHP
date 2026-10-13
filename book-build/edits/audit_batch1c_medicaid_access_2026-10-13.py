# Audit batch 1c (2026-10-13): primary care practices accepting new Medicaid patients.
# AHS Act 68 Health Care System Transformation Report, June 1 2026: 71%, up from 59% in June 2025.
# The book reports through July 2026, so the 59% figure is a year stale in three places.
EDITS = [
    {"op": "para_regex", "find": "59% of primary care practices accepting new Medicaid patients",
     "pattern": r"59% of primary care practices accepting new Medicaid patients --- significant equity gap|59% of primary care practices accepting new Medicaid patients — significant equity gap",
     "replace": "71% of primary care practices accepting new Medicaid patients (June 2026, up from 59% a year earlier) — still an equity gap"},
    {"op": "tbl_regex", "find": "Primary Care Accepting New Medicaid",
     "pattern": r">59%<", "replace": ">71%<"},
    {"op": "para_regex", "find": "Primary Care Accepting New Medicaid",
     "pattern": r"Primary Care Accepting New Medicaid", "replace": "Primary Care Accepting New Medicaid (June 2026)"},
    {"op": "row_regex", "find": "Primary care practices accepting new Medicaid patients",
     "pattern": r">59%<", "replace": ">71% (June 2026; 59% in June 2025)<"},
]
