# Audit batch 1e (2026-10-13): the Ch11 targets table still used the June 2025 baseline.
# AHS Act 68 report, June 2026: 71% of primary care practices accept new Medicaid patients.
EDITS = [
    {"op": "para_regex", "find": "Primary care acceptance: increase from 59%",
     "pattern": r"Primary care acceptance: increase from 59%",
     "replace": "Primary care acceptance: increase from 71% (June 2026)"},
]
