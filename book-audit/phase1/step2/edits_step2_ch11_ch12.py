# Phase 1, step 2a — Chapter 11 and Chapter 12 repetition (audit_chapter.py criterion 2),
# plus one stale AHEAD-participation heading in the same Ch11 section.
#
# Ch11 §11.12.1: the three one-line paragraphs under the heading restate, nearly verbatim,
#   the "VERMONT IN PRACTICE — HCC Coding" callout that closes the section (its
#   "Recommended action" and "Getting HCC coding right…" sentences). The callout is the
#   fuller statement, so the three lead lines go.
#   Heading "Pre-AHEAD Action" presents AHEAD as Vermont's next step; Vermont withdrew from
#   AHEAD. The section's own text anchors on Act 68 global budgets (FY2028).
# Ch11 PPS vs CAH "Operating profit per adjusted discharge" rows: legitimate — two rows of
#   one table, one per hospital type. Left.
# Ch12: the italic line under the chapter opening ("Healthcare transformation fails more
#   often … This chapter covers the HTR platform tools, Advisory service lines…") is a stray
#   teaser no other chapter carries; its first sentence is repeated verbatim in the body.

EDITS = [
    {"op": "del_para",
     "find": '<w:t xml:space="preserve">Every Vermont hospital should conduct a retrospective HCC gap analysis for their attributed Medicare population before Act 68 global budgets take effect in FY2028.</w:t>'},
    {"op": "del_para",
     "find": "An organization that has under-coded its population’s chronic conditions will receive"},
    {"op": "del_para",
     "find": "Getting HCC coding right before global budgets take effect is foundational"},
    {"op": "raw",
     "find": "High-ROI Pre-AHEAD Action for Every Vermont Hospital",
     "replace": "High-ROI Action for Every Vermont Hospital Before Global Budgets"},
    {"op": "del_para",
     "find": "This chapter covers the HTR platform tools"},
]
