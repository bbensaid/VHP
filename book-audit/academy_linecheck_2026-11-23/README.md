# Academy line-by-line check (started 2026-11-23)
flags.json = [ [lesson _id, sentence] ... ] — every sentence in an academyModule with a figure ($, %, large count, Nx)
and no citation marker in the same sentence. 1,856 sentences / 302 of 416 lessons.
Method per lesson: read flags; (a) worked example/calculation -> keep, ensure labelled illustrative; (b) fact sourced in
the lesson's Sources list -> keep; (c) unverifiable -> delete or fix via frontend/scripts/fix-academy-strings.mjs pairs.
Progress ledger: done.txt (one lesson id per line).
