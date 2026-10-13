# Audit batch 1 (2026-10-13): verified factual corrections. Ledger: book-audit/AUDIT_2026-10-13.md
EDITS = [
    # Appendix B.0.1 — the "$48M" is Montana's state-employee-plan result, not a Vermont
    # figure, and Montana's reference prices landed near 220-250% of Medicare, not 110%
    # (NASHP / Optumas: $47.8M saved SFY2017-19).
    {"op": "para_regex", "find": "Year 1: $48M Vermont savings",
     "pattern": r"Year 1: \$48M Vermont savings",
     "replace": "Year 1 (Montana: $47.8M saved, SFY2017–19)"},
    {"op": "para_regex", "find": "Direct contracting at 110% Medicare; $48M initial savings",
     "pattern": r"Direct contracting at 110% Medicare; \$48M initial savings",
     "replace": "No Vermont program yet; Montana (2016) benchmark: about 220–250% of Medicare"},
    # Ch15 — the book elsewhere gives RHT only as a $195M first-year award; no later-year
    # amount is published, so "a year" overstates it.
    {"op": "para_regex", "find": "$195M a year in RHT funds",
     "pattern": r"\$195M a year in RHT funds",
     "replace": "a $195M first-year RHT award"},
    {"op": "para_regex", "find": "$195M/yr RHT + $300M+/yr",
     "pattern": r"\$195M/yr RHT",
     "replace": "$195M first-year RHT award"},
    # Ch2 timeline — Act 68 sets FY2027 as the statutory deadline; GMCB sets prices by rule
    # in 2027, effective hospital FY2028 (as §2.7 and Fig 2.x already say).
    {"op": "para_regex", "find": "Reference-based pricing mandatory for all commercial payers",
     "pattern": r"Reference-based pricing mandatory for all commercial payers",
     "replace": "Statutory deadline for reference-based pricing (GMCB sets prices by rule in 2027, effective hospital FY2028)"},
    # Preface — stray space before the comma after "(ADS)" (typography only).
    {"op": "raw", "find": "Agency of Digital Services (ADS) </w:t>",
     "replace": "Agency of Digital Services (ADS)</w:t>"},
]
