# Phase 1, step 3c — rule-13 sweep: errors the step-3 analysts found that sit outside their units.
# - Appendix A: "HRSA recognizes no Health Profession Shortage Areas in Vermont" — same wording
#   fix as Ch2/Ch8/Ch11 (HRSA designates a handful of Vermont primary-care HPSAs).
# - Appendix B: BALANCE Medicare Part D launch — CMS announced 21 Apr 2026 it will not launch
#   in Part D as planned; no new date (AHA 2026-04-22; KFF "What to Know About the BALANCE Model").
# - Ch7 §7.8 heading (body + TOC): "Making Care Primary" — MCP ended early 31 Dec 2025 and Vermont
#   was never in it; the section body is about primary-care investment, not MCP.

EDITS = [
    {"op": "raw",
     "find": "HRSA recognizes no Health Profession Shortage Areas in Vermont; the problem",
     "replace": "only a handful of Vermont areas meet HRSA’s geographic criteria for a primary care Health Professional Shortage Area; the problem"},
    {"op": "row_regex", "find": "BALANCE Model Medicare Part D coverage launches",
     "pattern": r">January 2028<", "replace": ">Postponed<"},
    {"op": "raw",
     "find": "BALANCE Model Medicare Part D coverage launches",
     "replace": "BALANCE Model Medicare Part D coverage (planned 2027; postponed by CMS in April 2026, no new date)"},
    {"op": "raw",
     "find": ">7.8  Making Care Primary — Vermont’s Primary Care Economics<",
     "replace": ">7.8  Primary Care Investment — Vermont’s Primary Care Economics<"},
    {"op": "raw",
     "find": "<w:t xml:space=\"preserve\">Making Care Primary — Vermont’s Primary Care Economics</w:t>",
     "replace": "<w:t xml:space=\"preserve\">Primary Care Investment — Vermont’s Primary Care Economics</w:t>"},
]
