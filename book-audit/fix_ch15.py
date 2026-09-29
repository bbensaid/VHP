# -*- coding: utf-8 -*-
# Chapter 15 surgical fixes, derived from book-audit/audit_ch15.md.
# Run with:  python3 book-build/patch_docx.py book-audit/fix_ch15.py
# Every "raw" find below was verified to occur EXACTLY ONCE in word/document.xml
# of HTR_Book_v42.docx as it stood on 2026-09-27 (pre-edit). Re-verify against a
# freshly downloaded .docx before running.

EDITS = [

    # ---- Audit defect 2: AHEAD live-vs-withdrawn sweep -------------------
    # Fig 15.3 row 2 becomes a closeout component.
    {"op": "raw",
     "find": "AHEAD State Agreement management",
     "replace": "AHEAD State Agreement closeout"},
    {"op": "raw",
     "find": "Active → annual CMS review",
     "replace": "Withdrawn Jul 2026 → FY2027 closeout reporting"},

    # Fig 15.5 R-01 consequence clause re-anchored to Act 68 global budgets.
    {"op": "raw",
     "find": "Analytics vendor not operational by Jan 2027; hospitals enter AHEAD without financial-management capability",
     "replace": "Analytics vendor not operational by Jan 2027; hospitals enter Act 68 global budgets without financial-management capability"},

    # Fig 15.5 R-06.
    {"op": "raw",
     "find": "VITL connectivity gaps persist; AHEAD population-health management incomplete",
     "replace": "VITL connectivity gaps persist; global-budget population-health management incomplete"},

    # Fig 15.5 R-09.
    {"op": "raw",
     "find": "Insufficient clinical-leader engagement; AHEAD driven by administrators without clinical ownership",
     "replace": "Insufficient clinical-leader engagement; global budgets driven by administrators without clinical ownership"},

    # §15.13 objection 2 keeps the federal-contract argument but leads with the
    # live RHT grant; AHEAD survives only as closeout obligation.
    {"op": "raw",
     "find": "The AHEAD State Agreement is a federal contract; the RHT Program is a federal grant with deliverables",
     "replace": "The RHT Program is a federal grant with deliverables and reporting obligations; the withdrawn AHEAD State Agreement still carries federal closeout requirements"},

    # ---- Audit defect 9 (and defect 2's §15.4 half) ----------------------
    {"op": "raw",
     "find": "Four statutory predecessors — Acts 167 and 51, Act 68, and the AHEAD State Agreement — each with their own",
     "replace": "Three statutory predecessors — Acts 167, 51, and 68 — plus the AHEAD State Agreement’s closeout obligations, each with their own"},

    # ---- Audit defect 3: R-01 is tied with R-10, not "the single highest" --
    {"op": "raw",
     "find": "it is the single highest-risk component in the register (R-01) precisely because three downstream components converge on it, not because its own deadline is nearest.",
     "replace": "it carries the register’s highest delivery-risk score (R-01, 20, tied only with the governance risk R-10) precisely because three downstream components converge on it, not because its own deadline is nearest."},

    # ---- Audit defect 4: Figure 15.5 score legend ------------------------
    # The printed scores are right and the caption is wrong. The legend text is
    # byte-identical in two paragraphs (the in-chapter caption, paraId 0000122B,
    # and the back-matter figure-caption list, paraId 00001724), so a bare "raw"
    # op would see 2 hits. Each paragraph is addressed by its unique paraId.
    {"op": "para_regex",
     "find": "0000122B",
     "pattern": r"Risk score = probability \(Low=1 … High=5\) × impact \(Low=1 … Critical=4\)\.",
     "replace": "Risk score = probability (Low=1, Low–Med=2.5, Medium=3, Med–High=3.75, High=4) × impact (Low=1, Medium=3, High=4, Critical=5); hyphenated bands are scored at the midpoint."},
    {"op": "para_regex",
     "find": "00001724",
     "pattern": r"Risk score = probability \(Low=1 … High=5\) × impact \(Low=1 … Critical=4\)\.",
     "replace": "Risk score = probability (Low=1, Low–Med=2.5, Medium=3, Med–High=3.75, High=4) × impact (Low=1, Medium=3, High=4, Critical=5); hyphenated bands are scored at the midpoint."},

    # ---- Audit defect 5: R-08's non-existent "Equity PM" ------------------
    {"op": "raw",
     "find": "Accelerate: Equity PM leads SRA as co-equal to budget design; HCAC equity review required",
     "replace": "Accelerate: Economics PM leads SRA as co-equal to global-budget design; HCAC equity review required"},
    {"op": "raw",
     "find": "Equity PM + GMCB",
     "replace": "Econ PM + GMCB"},

    # ---- Audit defect 6: §15.7 component name must match Figure 15.3 -----
    {"op": "raw",
     "find": "RBP implementation, global-budget design, EAST Fund deployment",
     "replace": "RBP implementation, global-budget design, RHT Program deployment"},

    # ---- Audit defect 7: §15.13 cost range must match Figure 15.7 --------
    {"op": "raw",
     "find": "The ~$4.5–7.5M cost is roughly 2% of the value it protects",
     "replace": "The ~$4–6.4M cost is roughly 2% of the value it protects"},

    # ---- Audit defect 8: Fig 15.6 "13/14 sustainable" target -------------
    # Restated non-numerically so the 13-of-14 FAILURE statistic stops doing
    # double duty as the goal. (Note: "&lt;" is the XML entity, kept verbatim.)
    {"op": "raw",
     "find": "13/14 sustainable; deficit reversed; admin &lt;150% of benchmark",
     "replace": "No hospital in structural operating loss; deficit trajectory reversed; admin &lt;150% of benchmark"},

    # ---- Audit defect 10: Fig 15.4 Policy row RBP date -------------------
    {"op": "raw",
     "find": "RBP methodology (FY2026); Strategic Plan (Dec 2028); monthly Act 68 compliance",
     "replace": "RBP methodology (FY2027); Strategic Plan (Dec 2028); monthly Act 68 compliance"},

    # ---- Audit defect 11 (minor): align §15.6 to Figure 15.7's costing ---
    {"op": "raw",
     "find": "2–3 PMO analysts",
     "replace": "2 PMO analysts"},

    # ---- Audit defect 12: R-10 hire date must match §15.12's roadmap -----
    {"op": "raw",
     "find": "Avoid: hire Portfolio Manager by Q3 2026; PMO by Q1 2027",
     "replace": "Avoid: hire Portfolio Manager by Q2 2026; PMO by Q1 2027"},

    # ---- Audit defect 13: §15.14 HTR Simulator row ------------------------
    # The Tech->Clinical propagation is R-06's, not R-01's.
    {"op": "raw",
     "find": "This is the risk register’s R-01 in visual form.",
     "replace": "This is the risk register’s R-01 and R-06 in visual form."},

    # ---- Audit "Other issues" repetition item 1 --------------------------
    # §15.11's closing half duplicates §15.13's paragraph near-verbatim (same
    # three-item failure list, same "That is not a $0 outcome"). Cut it from
    # §15.11 and let §15.11 set up Figure 15.7 only. Leading space intentional:
    # the deleted span begins with the space after "...it protects."
    {"op": "raw",
     "find": " The cost of not building it is the December 2028 plan arriving as a descriptive document rather than a binding commitment — the continuation of the Oliver Wyman deficit trajectory, the failure of 13 of 14 hospitals to reach sustainability, and the loss of the political window Vermont’s mandatory architecture has opened. That is not a $0 outcome.",
     "replace": ""},
]
