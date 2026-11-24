# Academy line-by-line check (started 2026-11-23)
flags.json = [ [lesson _id, sentence] ... ] — every sentence in an academyModule with a figure ($, %, large count, Nx)
and no citation marker in the same sentence. 1,856 sentences / 302 of 416 lessons.
Method per lesson: read flags; (a) worked example/calculation -> keep, ensure labelled illustrative; (b) fact sourced in
the lesson's Sources list -> keep; (c) unverifiable -> delete or fix via frontend/scripts/fix-academy-strings.mjs pairs.
Progress ledger: done.txt (one lesson id per line).

## Result (2026-11-23)
All 302 flagged lessons checked (1,856 sentences). Fix pair files in this folder record every change
(pm3, sepsis, pm56, aiml_pm4, batch3, batch4, mips, bh, payermix, cds, reach, hcc, biobank, rht5, misc5).
Corrections: wrong statistics (sepsis PPV, BRCA1, HLA-B*57:01, MSSP 40%, PRS top 8%, HCC 115), stale facts
(RHT annual awards, All of Us 880k+, TEFCA 11 QHINs, Blueprint Medicare share ended Dec 2025, VT pop 645k),
and unsourced figures deleted. Items verified correct were left unchanged.
Limit: checks used sources named in the lessons, prior verified facts and targeted searches; not every figure
was re-fetched from its primary document.
