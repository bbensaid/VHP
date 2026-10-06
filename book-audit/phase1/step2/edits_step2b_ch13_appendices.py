# Phase 1, step 2b — the remaining reviewed Chapter 13 – Appendices ops from
# book-audit/phase1/edits_ch13_appendices.py (#35–#124): statements that Vermont is
# currently or prospectively in AHEAD (AHEAD itself stays, as a federal model), plus the
# Appendix D numbering/tool-name and figure-label fixes reviewed with them.
#
# Skipped: #0–#34 (applied in step 1), #64 (superseded by step 1's Ch16 HGB row edit).
# Revised:
#   #41 — "used the agreement's own withdrawal rights" → "formally notified CMS" (the
#         withdrawal mechanism is not verified against a primary source).
#   #62 — drop "annually" (the ~$10M cap is not established as an annual figure).

import os as _os

_ns = {}
_HERE = _os.path.dirname(globals().get("__file__") or "book-audit/phase1/step2/x")
exec(open(_os.path.join(_HERE, "..", "edits_ch13_appendices.py")).read(), _ns)
_AN = _ns["EDITS"]

EDITS = []
for _i in range(35, len(_AN)):
    if _i == 64:
        continue
    _op = dict(_AN[_i])
    if _i == 41:
        _new = _op["replace"].replace(
            "Vermont used the agreement’s own withdrawal rights and exited in July 2026",
            "Vermont formally notified CMS and exited in July 2026")
        assert _new != _op["replace"], "#41 text drifted"
        _op["replace"] = _new
    if _i == 62:
        _new = _op["replace"].replace("a cap near $10M annually,", "a cap near $10M,")
        assert _new != _op["replace"], "#62 text drifted"
        _op["replace"] = _new
    EDITS.append(_op)
