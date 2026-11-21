# RHT Year 2 (FY2027) book corrections, 2026-11-20.
# Sources: CMS press release Nov 9, 2026 (FY2027 awards; Vermont $189,996,036);
# CMS fact sheet "RHT Program Year 2 awards" (all funds expended by Sept. 30, 2032;
# obligated funds generally available through the end of the following fiscal year).
EDITS = [
    # Ch6 — legislator box: "future-year amounts not yet published" is no longer true
    {"op": "raw", "find": "$195 million for its first year, with future-year amounts not yet published —",
     "replace": "$195 million for its first year and $190 million for its second (FY2027) —"},
    # Appendix G — transition-period support
    {"op": "raw", "find": "provided Vermont $195M for its first year (2026), with amounts for 2027–2030 not yet published —",
     "replace": "provided Vermont $195M for its first year (2026) and $190M for its second (2027), with amounts for 2028–2030 set annually —"},
    # Ch16 — capital table
    {"op": "raw", "find": "December 2025; awards run through FY2030, later years set annually",
     "replace": "December 2025; FY2027 award $190M (November 2026); awards run through FY2030"},
    # Appendix B — timeline row: CMS's final spending date is Sept 30, 2032
    {"op": "raw", "find": ">September 30, 2031<", "replace": ">September 30, 2032<"},
    {"op": "raw", "find": "Each annual RHT award must be spent by the end of the following federal fiscal year; the last (FY2030) award by this date",
     "replace": "All RHT funds must be spent by this date or returned to the U.S. Treasury; each annual award generally remains available through the end of the following federal fiscal year"},
    {"op": "raw", "find": "CMS BALANCE Model (December 2025).",
     "replace": "CMS BALANCE Model (December 2025); CMS, Rural Health Transformation Program Year 2 awards fact sheet (November 2026)."},
]
