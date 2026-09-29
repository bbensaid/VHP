#!/usr/bin/env python3
"""
Fix the arithmetically-impossible "/12 per domain" and "60 of 120" figures in
Academy copy for the Five Pillars course, aligning them to the BOOK's already-
corrected percentage form (HTR_Book_v42 ch.7 s7.4.2).

Ground truth
------------
frontend/components/research/VBCReadinessAssessment.tsx:
    6 domains x 5 dimensions = 30 dimensions, each `type Score = 0|1|2|3|4`.
    Max per domain = 5 x 4 = 20 (NOT 12). The tool reports domain averages and
    percentages (pct = avg/4*100); no 120-point total is displayed anywhere.

HTR_Book_v42.md (the corrected manuscript):
    l.3616 "...each of the 30 dimensions is scored 0-4 ... The platform reports an
            overall readiness percentage ... rather than a raw point total: 80%+
            indicates Global Budget Readiness, 60-79% indicates Advanced stage
            (12-18 months to readiness), and below 60% indicates the organization
            is not yet ready for full-risk VBC"
    l.3618 "Blueprint-participating PCMH practices with active CHT support typically
            score 40-60% in Domain 3 (care delivery) ... Most Vermont hospitals
            score 25-45% in Domain 2 (data and technology)."

So: Domain 2 (Data and Technology) -> 25-45%
    Domain 3 (care delivery)       -> 40-60%
    overall bands                  -> 80%+ / 60-79% / below 60%

Files edited
------------
  frontend/content/_build_five_pillars_course.py   (the generator)
  frontend/content/_lesson_drafts/lessons_track4.py (the draft source)

`frontend/content/course_five_pillars.json` is NOT edited here -- it is
regenerated from the generator by `python3 _build_five_pillars_course.py`,
which was verified byte-for-byte lossless against the pre-edit JSON.

The generator is pprint-formatted, so a single logical sentence is split across
several adjacent quoted string literals. SEP below matches either ordinary
whitespace or a quote/newline/indent/quote continuation, in either quote style,
so one plain-text phrase matches both files.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "frontend" / "content"
GEN = CONTENT / "_build_five_pillars_course.py"
DRAFT = CONTENT / "_lesson_drafts" / "lessons_track4.py"

# whitespace, OR a pprint string-continuation: [space] quote newline indent quote
SEP = r"(?:\s*['\"]\s*\n\s*['\"]\s*|\s+)"


def phrase_re(text: str) -> re.Pattern:
    """Turn a plain phrase into a regex tolerant of pprint line-continuations."""
    return re.compile(SEP.join(re.escape(w) for w in text.split()))


# (label, find-phrase, replace-phrase)
REPLACEMENTS = [
    (
        "R1 total-score band -> percentage bands",
        "each rated 0 to 4. A total score below 60 of 120 signals the "
        "organization is not ready for full downside risk.",
        "each rated 0 to 4. The platform reports an overall readiness percentage "
        "-- the average across all answered dimensions -- rather than a raw point "
        "total: 80%+ indicates Global Budget Readiness, 60-79% indicates Advanced "
        "stage (12-18 months to readiness), and below 60% signals the organization "
        "is not ready for full downside risk.",
    ),
    (
        "R2 lesson body A Vermont benchmarks -> 25-45% / 40-60%",
        "most Vermont hospitals score only 3 to 7 of a possible 12 points in this "
        "domain, while Blueprint-participating patient-centered medical homes with "
        "active Community Health Team support score 8 to 12 in Domain 3 (care "
        "delivery) -- strong by national standards.",
        "most Vermont hospitals score only 25-45% in this domain, while "
        "Blueprint-participating patient-centered medical homes with active "
        "Community Health Team support score 40-60% in Domain 3 (care delivery) "
        "-- strong by national standards.",
    ),
    (
        "R3 tip callout -> 40-60% / 25-45%",
        "Community Health Team support score 8-12 out of 12 on the care-delivery "
        "readiness domain -- strong by national standards. Most Vermont hospitals "
        "score only 3-7 out of 12 on the data-and-technology domain.",
        "Community Health Team support score 40-60% on the care-delivery readiness "
        "domain -- strong by national standards. Most Vermont hospitals score only "
        "25-45% on the data-and-technology domain.",
    ),
    (
        "R4 lesson body B Domain 2 -> 25-45%",
        "most Vermont hospitals score only 3 to 7 out of 12 possible points on the "
        "Data and Technology domain of the VBC Transformation Readiness Assessment",
        "most Vermont hospitals score only 25-45% on the Data and Technology domain "
        "of the VBC Transformation Readiness Assessment",
    ),
    (
        "R5 stat tile value -> 25-45%",
        "3-7 / 12",
        "25-45%",
    ),
    (
        "R6 quiz explanation -> 25-45%",
        "readiness data show most hospitals scoring 3-7 out of 12 on the "
        "data-and-technology domain",
        "readiness data show most hospitals scoring 25-45% on the "
        "data-and-technology domain",
    ),
]


def apply(path: Path, commit: bool) -> int:
    src = path.read_text(encoding="utf-8")
    out = src
    total = 0
    for label, find, repl in REPLACEMENTS:
        pat = phrase_re(find)
        n = len(pat.findall(out))
        if n == 0:
            print(f"  [ SKIP ] {label}: 0 matches")
            continue
        # Re-wrap the replacement onto one logical line; pprint layout is cosmetic
        # and the generator's own output is JSON, so line breaks inside the source
        # literal do not affect the built content.
        out = pat.sub(lambda m: repl, out)
        total += n
        print(f"  [  OK  ] {label}: {n} replacement(s)")
    if out != src and commit:
        path.write_text(out, encoding="utf-8")
        print(f"  WROTE {path.relative_to(ROOT)}")
    return total


def main() -> int:
    commit = "--commit" in sys.argv
    print(f"{'APPLYING' if commit else 'DRY RUN'} -- Academy VBC readiness scale fix\n")
    grand = 0
    for path in (GEN, DRAFT):
        print(f"{path.relative_to(ROOT)}:")
        grand += apply(path, commit)
        print()
    print(f"Total replacements: {grand}")
    if not commit:
        print("\n(dry run -- pass --commit to write, then re-run the generator:")
        print(" cd frontend/content && python3 _build_five_pillars_course.py )")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
