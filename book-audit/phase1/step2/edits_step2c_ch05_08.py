# Phase 1, step 2c — the reviewed Chapter 5–8 ops from book-audit/phase1/edits_ch05_08.py,
# reconciled with step 1 (which already changed some of the same passages).
#
# Dropped:
#   #6, #7  (C6-2/C6-3) "by FY2027" / "Vermont Act 68 (FY2027)" state Act 68's statutory
#           deadline, which step 1's policy keeps; #8 (C6-4, "Targeting implementation
#           FY27") is an implementation claim and is kept.
#   #13, #49, #50  Strategic Plan date — already corrected by step 1's chapter regex.
#   #15  (C6-11) optional; would add a new "$515M" arithmetic claim to a caption.
# Re-anchored:
#   #9   (C6-5) step 1 rewrote the sentence's Medicaid clause; the AHEAD clause remains.
#   #16, #17, #31  headings are split into a number run and a title run.
#   #59  "under Blueprint and AHEAD." occurs in Ch8 (PCMH key concept) and Ch9; this is
#        the Ch8 one. The Ch9 occurrence belongs to step 3.

import os as _os

_ns = {}
_HERE = _os.path.dirname(globals().get("__file__") or "book-audit/phase1/step2/x")
exec(open(_os.path.join(_HERE, "..", "edits_ch05_08.py")).read(), _ns)
_AN = _ns["EDITS"]

_DROP = {6, 7, 13, 15, 49, 50}
_REPLACE = {
    9: [{"op": "raw",
         "find": "the AHEAD Model Medicare budgets, and Vermont’s Medicaid hospital global budget",
         "replace": "Medicare budgets under models such as AHEAD, and Vermont’s Medicaid hospital global budget"}],
    16: [{"op": "del_para",
          "find": "Risk Stratification — The Economic Engine of Population Health Management"}],
    17: [{"op": "raw", "find": ">7.2.7  <", "replace": ">7.2.6  <"},
         {"op": "raw", "find": ">The Care Management ROI Calculation<",
          "replace": ">Risk Stratification and the Care Management ROI Calculation<"}],
    31: [{"op": "raw", "find": "The Blueprint and AHEAD: A Critical Transition",
          "replace": "The Blueprint and AHEAD: A Transition Left Unresolved"}],
    59: [{"op": "raw",
          "find": "The organizational model for Vermont’s primary care system under Blueprint and AHEAD.",
          "replace": "The organizational model for Vermont’s primary care system under the Blueprint."}],
}

EDITS = []
for _i, _op in enumerate(_AN):
    if _i in _DROP:
        continue
    EDITS.extend(_REPLACE.get(_i, [dict(_op)]))
