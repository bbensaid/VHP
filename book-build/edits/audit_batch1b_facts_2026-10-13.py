# Audit batch 1b (2026-10-13): remaining "$195M per year" RHT phrasings, and the Act 68
# global-budget scope (one or more non-critical-access hospitals from FY2028; all by FY2030 —
# 18 V.S.A. § 9376 as amended by Act 68). Ledger: book-audit/AUDIT_2026-10-13.md
EDITS = [
    {"op": "para_regex", "find": "$195M/yr in RHT capital",
     "pattern": r"\$195M/yr in RHT capital",
     "replace": "the $195M first-year RHT award"},
    {"op": "para_regex", "find": "$195 million per year is the only",
     "pattern": r"\$195 million per year is the only",
     "replace": "$195 million first-year award is the only"},
    {"op": "para_regex", "find": "Global hospital budgets for non-Critical Access Hospitals",
     "pattern": r"Global hospital budgets for non-Critical Access Hospitals",
     "replace": "Global hospital budgets for one or more non-critical access hospitals (all hospitals by FY2030)"},
    {"op": "para_regex", "find": "Global budgets mandatory (non-CAH hospitals)",
     "pattern": r"Global budgets mandatory \(non-CAH hospitals\)",
     "replace": "Global budgets begin (one or more non-CAH hospitals; all by FY2030)"},
]
