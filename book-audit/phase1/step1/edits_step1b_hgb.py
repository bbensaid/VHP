# Phase 1, step 1b — remaining passages that present Vermont's Medicaid hospital global
# budget (HGB) as authorized/running, found by the broader sweep after step 1.
# Source: CMS State Demonstrations Group letter to AHS Secretary Samuelson, 7 Jul 2026
# (medicaid.gov vt-gch-stc-compl-lttr-07072026.pdf): the HGB implemented by DVHA "has not
# been approved by CMS" under the Global Commitment STCs; CMS requested that HGB payments
# cease within 60 days. Launch: 1 Jan 2026, six hospitals (DVHA 2025 Annual Report).
# Post-deadline outcome not publicly confirmed — nothing below asserts one.

EDITS = [
    # Chapter 2 (bullet)
    {"op": "raw",
     "find": "Vermont Medicaid global budget for hospitals operates under the Global Commitment to Health demonstration",
     "replace": "Vermont Medicaid global budget for hospitals launched in January 2026 under the Global Commitment to Health demonstration; in July 2026 CMS ruled it had not been approved under the demonstration’s terms"},
    # Chapter 3 (italic note)
    {"op": "raw",
     "find": "Vermont’s Medicaid global budgets are executed through the Global Commitment to Health demonstration, which provides CMS authority to implement the Medicaid component of Vermont’s hospital global budget design.",
     "replace": "Vermont’s Medicaid hospital global budget was launched through the Global Commitment to Health demonstration in January 2026 — but in July 2026 CMS ruled that the demonstration’s terms had not authorized it."},
    # Chapter 3 §3.3.3 (follows the corrected sentence; would otherwise contradict it)
    {"op": "raw",
     "find": "Vermont’s ability to implement its current Medicaid global budget policy is the direct product of years of negotiation that produced a federal-state agreement on methodology, accountability, and withdrawal conditions.",
     "replace": "Vermont’s Medicaid global budget shows the cost of skipping that negotiation: implemented without the CMS approval the demonstration’s terms required, it drew a July 2026 compliance notice directing the payments to stop."},
    # Chapter 16, Pillar 1
    {"op": "raw",
     "find": "Medicaid global-budget continuation",
     "replace": "resolving CMS’s July 2026 compliance notice on the Medicaid global budget"},
    # Appendix B (two cells)
    {"op": "raw",
     "find": "Medicaid global budgets continue under the Global Commitment demonstration",
     "replace": "Medicaid hospital global budget launched January 2026; ruled unapproved under the Global Commitment demonstration by CMS, July 2026"},
    {"op": "raw",
     "find": "Operational — Medicaid HGB in effect",
     "replace": "Under CMS compliance notice (July 2026)"},
    # Appendix G
    {"op": "raw",
     "find": "under Vermont’s own design begin in January 2026, ahead of the commercial RBP mandate",
     "replace": "under Vermont’s own design began in January 2026 (in July 2026 CMS ruled them unapproved under the Global Commitment waiver and directed the payments to stop), ahead of the commercial RBP mandate"},
]
