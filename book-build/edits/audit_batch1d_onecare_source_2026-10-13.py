# Audit batch 1d (2026-10-13): Ch1 OneCare autopsy misattributes its utilization figures.
# The 36% higher ED use / 18% fewer primary care visits come from a November 2022 benchmarking
# study OneCare submitted to the GMCB (comparison: 20 similar ACOs nationally), not a state audit
# (VTDigger / Valley News, 2022-11-16). The State Auditor's 2019 and 2021 reports are separate.
EDITS = [
    {"op": "para_regex", "find": "A state audit revealed",
     "pattern": r"Auditor Findings", "replace": "Benchmarking Findings"},
    {"op": "para_regex", "find": "A state audit revealed",
     "pattern": r"A state audit revealed",
     "replace": "A 2022 benchmarking study OneCare submitted to the GMCB revealed"},
    {"op": "para_regex", "find": "auditor-documented 36%",
     "pattern": r"auditor-documented 36% higher",
     "replace": "a 2022 benchmarking study found 36% higher"},
    # OneCare was formed in 2012 (UVM Medical Center and Dartmouth-Hitchcock; legislative
    # testimony 2015, Becker's) and closed at the end of 2025 — about thirteen years.
    {"op": "para_regex", "find": "It wound down after roughly twelve years, founded in 2013",
     "pattern": r"It wound down after roughly twelve years, founded in 2013",
     "replace": "It wound down after roughly thirteen years, formed in 2012"},
    {"op": "para_regex", "find": "OneCare Vermont ran for twelve years",
     "pattern": r"OneCare Vermont ran for twelve years",
     "replace": "OneCare Vermont ran for more than a decade"},
]
