# Phase 1, step 2d — rule 13 sweep after step 2c's Ch8 CCBHC correction: the same
# "5 new CCBHCs by July 2026, on track" claim in Ch16 (prose + Fig 16.x row) and Appendix B.
# Fact: four agencies (NKHS, Howard Center, NCSS, HCRS) certified July 1, 2026, of five
# planned (WCAX 2026-07-24; VermontBiz "Four more agencies…"; DMH).

EDITS = [
    {"op": "raw",
     "find": "CCBHC network development (5 new entities by July 2026",
     "replace": "CCBHC network development (4 of 5 planned new entities certified July 1, 2026"},
    {"op": "raw",
     "find": "CCBHC certification for 5 new entities (July 2026 target)",
     "replace": "CCBHC certification for new entities (4 of 5 planned certified July 1, 2026)"},
    {"op": "raw",
     "find": "On track per RHT plan",
     "replace": "Four certified July 2026; fifth pending"},
    {"op": "raw",
     "find": "Five new CCBHC entities certified (RHT target)",
     "replace": "New CCBHC entities certified (RHT target: five)"},
    {"op": "raw",
     "find": "On track per RHT schedule",
     "replace": "Four certified July 1, 2026; fifth pending"},
]
