# Phase 1, step 1 — the five whole-book factual errors (2026-10-06).
#
# 1. UVMMC "lost in court" — FALSE. UVMMC announced appeals of the FY23 enforcement
#    and its FY25 budget on 22 Oct 2024 (UVM Health newsroom); on 4 Apr 2025 GMCB
#    approved a settlement under which UVMMC dismissed its pending appeals and the FY23
#    enforcement order stayed in place, modified to spread the remaining commercial rate
#    reductions over FY26–FY27 (VermontBiz; WCAX 26 Mar 2025; GMCB settlement doc).
#    No court ruled.
# 2. Strategic Plan due "on or before January 15, 2028" (18 V.S.A. § 9403(d)(3));
#    updates every three years from December 1, 2030 (§ 9403(d)(4)). Not "December 2028".
# 3. Vermont Medicaid hospital global budget: launched 1 Jan 2026 with six hospitals
#    (DVHA 2025 Annual Report); CMS letter of 7 Jul 2026 to AHS: "has not been approved
#    by CMS" under the Global Commitment STCs; payments to cease within 60 days.
# 4. Medicaid work requirements + six-month redeterminations start 1 Jan 2027
#    (CMS-2454-IFC fact sheet; CRS R48633).
# 5. RBP: Act 68 deadline "not later than hospital FY2027"; GMCB sets the methodology
#    by rule in 2027, prices effective hospital FY2028 (GMCB Act 68 update, 17 Feb 2026).
#    Statements of the statutory deadline stay; claims that prices are implemented /
#    in effect / producing data in FY2027 are corrected.
#
# Part A: Front matter – Chapter 12 (written 2026-10-06).
# Part B: Chapter 13 – Appendices, reviewed from book-audit/phase1/edits_ch13_appendices.py
#         (indices noted), with #17, #19 and #64 corrected.

import os as _os

EDITS = [
    # ── Part A ──────────────────────────────────────────────────────────────
    # 1. UVMMC — Introduction
    {"op": "raw",
     "find": "UVMMC’s subsequent court challenge to that enforcement — Vermont’s largest, most powerful hospital system testing GMCB’s authority directly — was decided against UVMMC.",
     "replace": "UVMMC’s subsequent appeal of that enforcement — Vermont’s largest, most powerful hospital system testing GMCB’s authority directly — ended in April 2025, when UVMMC dismissed its appeals under a settlement that left the enforcement order in place."},
    # 1. UVMMC — Chapter 2 ("If you are a Vermont legislator")
    {"op": "raw",
     "find": "UVMMC challenged GMCB enforcement in court and lost. Future challenges are certain.",
     "replace": "UVMMC appealed GMCB’s enforcement, then dismissed its appeals in an April 2025 settlement that left the enforcement order standing. Future challenges are certain."},

    # 2. Strategic Plan — first statutory descriptions in Ch2 get the exact date
    {"op": "raw",
     "find": "to be delivered to the legislature by December 2028 and updated every three years thereafter",
     "replace": "to be delivered to the legislature by January 15, 2028 and updated every three years thereafter, beginning December 1, 2030"},
    {"op": "raw",
     "find": "The plan AHS is required to deliver to the Vermont legislature by December 2028 and update every three years",
     "replace": "The plan AHS is required to deliver to the Vermont legislature by January 15, 2028 and update every three years"},
] + [
    # 2. Strategic Plan — every remaining occurrence in Chapters 1–12
    {"op": "ch_regex", "chapter": ch, "pattern": pat, "replace": rep}
    for ch in ["Chapter 1: The Five-Pillar Framework", "Chapter 2: The Policy Pillar", "Chapter 4: The Technology Pillar",
               "Chapter 6: The Economics Pillar", "Chapter 8: The Clinical Pillar", "Chapter 9: The Clinical Pillar in Practice",
               "Chapter 11: The Operations Pillar", "Chapter 12: Infrastructure for Knowledge Transfer"]
    for pat, rep in [(r"\bDecember 2028\b", "January 2028"), (r"\bDec 2028\b", "Jan 2028")]
] + [
    # 3. Medicaid hospital global budget — Chapter 3
    {"op": "raw",
     "find": "Vermont’s Medicaid hospital global budgets, in operation since January 2026, run under this demonstration authority — on state, not AHEAD, authority.",
     "replace": "Vermont’s Medicaid hospital global budget, launched in January 2026 with six hospitals on state rather than AHEAD authority, was meant to run under this demonstration — but in July 2026 CMS notified the state that it had not been approved under the demonstration’s terms and directed that the payments stop."},
    # 3. Chapter 6
    {"op": "raw",
     "find": "and the Medicaid global budget already in operation.",
     "replace": "and Vermont’s Medicaid hospital global budget (launched January 2026; ruled unapproved by CMS in July 2026)."},
    # 3. Chapter 16 roadmap table row (status cell first, while the marker text still exists)
    {"op": "row_regex", "find": "AHEAD Medicaid global budget operational (January 2026)",
     "pattern": r">Operational<", "replace": ">Under CMS compliance notice<"},
    {"op": "raw",
     "find": ">AHEAD Medicaid global budget operational (January 2026)<",
     "replace": ">Medicaid hospital global budget launched January 2026; ruled unapproved by CMS, July 2026<"},
    # 3. Appendix G
    {"op": "raw",
     "find": "Medicaid global budgets are already in operation,",
     "replace": "Vermont’s Medicaid hospital global budget, launched in January 2026, was ruled unapproved by CMS in July 2026,"},

    # 4. Work requirements — Chapter 3
    {"op": "raw",
     "find": "for Medicaid expansion enrollees beginning late 2026.",
     "replace": "for Medicaid expansion enrollees beginning January 1, 2027."},

    # 5. RBP — reconcile the statutory deadline with GMCB's schedule where Ch2 explains it
    {"op": "raw",
     "find": "RBP is not a theoretical target; it is a statutory mandate effective FY2027,",
     "replace": "RBP is not a theoretical target; it is a statutory mandate — Act 68 requires it no later than hospital FY2027, and GMCB sets the methodology by rule in 2027 with prices taking effect in hospital FY2028 —"},
    # 5. Chapter 1
    {"op": "raw",
     "find": "The GMCB’s RBP methodology for FY2027 is being refined",
     "replace": "The GMCB’s RBP methodology, to be set by rule in 2027 for prices effective in hospital FY2028, is being refined"},
    # 5. Chapter 12
    {"op": "raw",
     "find": "Premium reduction data from RBP (available FY2027-2028)",
     "replace": "Premium reduction data from RBP (available from FY2028)"},
    # 5. Chapter 13 status table (missed by the Ch13 analyst)
    {"op": "raw",
     "find": "VT: RBP implementing (FY2027); global budgets mandated (FY2028).",
     "replace": "VT: RBP rule-making (2027; prices from FY2028); global budgets mandated (FY2028)."},
]

# ── Part B ──────────────────────────────────────────────────────────────────
_ns = {}
_HERE = _os.path.dirname(globals().get("__file__") or "book-audit/phase1/step1/x")
exec(open(_os.path.join(_HERE, "..", "edits_ch13_appendices.py")).read(), _ns)
_AN = _ns["EDITS"]
_B_INDICES = list(range(0, 35))  # Strategic Plan (#0–#17), UVMMC (#18–#20), RBP (#21–#29), work requirements (#30–#34)
for _i in _B_INDICES:
    if _i >= len(_AN) or _i == 33:
        continue
    _op = dict(_AN[_i])
    if _i == 17:
        _op["replace"] = _op["replace"].replace(
            "(due January 15, 2028 — well inside the highest-risk window) will need to address late",
            "(due January 15, 2028 — more than a year into the highest-risk window) will need to address retroactively")
    if _i == 19:
        _op["replace"] = _op["replace"].replace("the remaining $40.1 million commercial-revenue reduction", "the remaining commercial-revenue reduction")
    EDITS.append(_op)
