# -*- coding: utf-8 -*-
"""The five edits left outstanding after the full-book audit pass.

1-2. Ch16's two ops that were disabled because their anchors were never
     confirmed in the fresh XML (fix_ch16.py, MISMATCH 5 and the 16.7
     repetition). Both anchors re-derived from the current file here.
3-4. Cross-chapter collision #3 (Ch6 and Ch4 both claiming primacy over the
     whole framework, contradicting Ch1's Figure 1.3 matrix, in which Policy
     is the only pillar with zero preconditions).
5.   Cross-chapter collision #4 (Ch11 claiming a book-wide "most binding
     constraint" title that Ch1/Ch15 assign to Technology sequencing risk).

Both headings occur TWICE — once in the table of contents, once as the real
heading — so each gets two ops with disambiguating XML context. Changing only
one would leave the TOC disagreeing with the heading.
"""

EDITS = [
    # ── Ch16 MISMATCH 5 ──────────────────────────────────────────────────────
    # Bennington's RSC row calls it "most rural", but Ch10 §10.4.1 and §10.x
    # both make the Northeast Kingdom "the most rural part of the state", and
    # the NEK's own row in this same table says only "very rural". Bennington
    # is the outlier; demote it and give it a region descriptor matching the
    # pattern of its neighbours ("Franklin/Grand Isle", "Addison County", "NEK").
    {"op": "raw",
     "find": "~48K, aging, most rural",
     "replace": "~48K, aging, rural, southwest VT"},

    # ── Ch16 §16.7 repetition ────────────────────────────────────────────────
    # Two consecutive closing paragraphs restate each other: both open on
    # "Vermont will have answers by December 2028", both repeat "grounded in
    # real experience with a real system under real pressure", and both land on
    # "the most valuable contribution Vermont makes". Keep the first paragraph,
    # move the one idea unique to the second (the "early, not large" point)
    # onto the end of it, then delete the second.
    {"op": "raw",
     "find": "it may be the most valuable contribution Vermont makes.",
     "replace": ("it may be the most valuable contribution Vermont makes. "
                 "The significance is not that Vermont is large or powerful; it is "
                 "that Vermont is early — early enough to produce a tested model "
                 "before the rest of the country reaches the same crisis point, and "
                 "early enough for the lessons to remain actionable.")},
    {"op": "del_para",
     "find": "Vermont will have answers by December 2028 — grounded in real experience"},

    # ── Collision #3a: Ch6 overclaims Economics as THE precondition ──────────
    # Ch1's Figure 1.3 has exactly one pillar with zero preconditions: Policy.
    # Economics has preconditions of its own, so it cannot be the precondition
    # "all other transformation" depends on. Soften "the" to "a".
    {"op": "raw",
     "find": "Payment reform is the precondition on which all other transformation depends.",
     "replace": "Payment reform is a precondition on which the rest of the transformation depends."},
    # TOC entry
    {"op": "raw",
     "find": ">6.1  The Economics Pillar: Why Payment Reform Is the Master Variable</w:t>",
     "replace": ">6.1  The Economics Pillar: Why Payment Reform Is a Master Variable</w:t>"},
    # the heading itself
    {"op": "raw",
     "find": ">The Economics Pillar: Why Payment Reform Is the Master Variable</w:t></w:r>",
     "replace": ">The Economics Pillar: Why Payment Reform Is a Master Variable</w:t></w:r>"},

    # ── Collision #3b: Ch4 overclaims Technology as THE substrate ────────────
    # Two defects in one sentence. "among six" counts Equity as a sixth pillar,
    # which the book's own thesis denies (Equity is cross-cutting, not a
    # pillar). And "the substrate the other five run on" contradicts Ch4's own
    # §4.x, which states Technology has exactly TWO outbound dependencies,
    # "to Economics and to Clinical". Align the sentence to that statement.
    {"op": "raw",
     "find": ("The Technology pillar is not one workstream among six; it is the "
              "substrate the other five run on"),
     "replace": ("The Technology pillar is not one workstream among five; it is the "
                 "substrate Economics and Clinical run on")},

    # ── Collision #4: Ch11 claims a book-wide binding-constraint title ───────
    # Ch1/Ch15 anchor the system's binding constraint on Technology (AHS-GMCB
    # analytics) as a sequencing risk. Ch11's workforce claim is a different
    # axis (capacity), so scope it to Operations rather than to Vermont overall.
    # TOC entry
    {"op": "raw",
     "find": ">11.6  The Workforce Crisis — Vermont’s Most Binding Operational Constraint</w:t>",
     "replace": ">11.6  The Workforce Crisis — Operations’ Most Binding Constraint</w:t>"},
    # the heading itself
    {"op": "raw",
     "find": ">The Workforce Crisis — Vermont’s Most Binding Operational Constraint</w:t></w:r>",
     "replace": ">The Workforce Crisis — Operations’ Most Binding Constraint</w:t></w:r>"},
]
