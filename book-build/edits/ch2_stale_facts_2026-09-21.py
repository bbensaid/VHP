# -*- coding: utf-8 -*-
"""Chapter 2 — stale federal-funding facts and an internal contradiction (2026-09-21).

Same method as the Chapter 1 pass: substring replacement inside existing runs, so no run
properties are rebuilt. Every target verified unique before writing.

THE CONTRADICTION. §2.8 already states the RHT award correctly — "Vermont was awarded $195
million for the program's first year in December 2025 — nearly double what the state had
expected" — and that matches Vermont's own published figure. But §2.1's timeline table and
§2.6.3 both called it "$195M/year for 5 years". The chapter contradicted itself. §2.8 is the
sourced version, so §2.1 and §2.6.3 yield to it.

Sources checked 2026-09-21:
  - RHT: healthcarereform.vermont.gov/hr1rural-health-transformation-fund — "Vermont's Year 1
    (Federal Fiscal year 2026) award is $195 million" ($195,053,740.44). The page publishes NO
    amount for FY2027-2030, so "per year for five years" is dropped rather than restated. The
    program itself is described there as a five-year initiative, which is why the sentence keeps
    2030 as the program's end, not the award's.
  - EAST: Vermont Public 2026-07-28, quoting the Human Services Secretary — officials calculated
    "an extra $138 million"; renegotiation "capped additional payments at $10 million". No primary
    source found for "$150M/year", and §2.1's own July 2026 row already carries the sourced
    $138M → $10M pair, so the unsourced figure is removed rather than replaced with a guess.
  - "largest per-capita" downgraded to "among the highest", which is what §2.8 says and what the
    reporting supports.
"""
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P


def enc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def sub_once(x, old, new):
    a, b = enc(old), enc(new)
    n = x.count(a)
    if n != 1:
        raise SystemExit('expected 1 occurrence of %r, found %d' % (old[:80], n))
    return x.replace(a, b)


def transform(x):
    # §2.1 timeline — Jan 2025 row: drop the unsourced EAST figure; the July 2026 row
    # in the same table already gives the sourced ~$138M → ~$10M.
    x = sub_once(x, 'Committed Vermont to Cohort 2; up to $150M/year EAST Fund; 8-year performance period',
                 'Committed Vermont to Cohort 2; EAST Fund participation; 8-year performance period')

    # §2.1 timeline — Nov 2025 row: the application preceded the award, so it cannot carry
    # the award figure, and no per-year amount is published.
    x = sub_once(x, '$195M/year award application; 19 HTR tools; 370-FTE workforce plan',
                 'RHT Program award application; 19 HTR tools; 370-FTE workforce plan')

    # §2.1 timeline — Dec 2025 row: match §2.8, which is the sourced statement.
    x = sub_once(x, '$195M/year for 5 years — largest per-capita rural transformation award',
                 '$195M for federal fiscal 2026 — among the highest per-capita rural transformation awards')

    # §2.6.3 — same correction in prose.
    x = sub_once(x, 'roughly $195 million per year for five years',
                 '$195 million for its first year')
    x = sub_once(x, 'and it expires in 2030', 'and the program runs through 2030')

    # §2.6.3 box — Vermont withdrew from AHEAD in July 2026; the Oliver Wyman projection
    # was made when Vermont still expected to join.
    x = sub_once(x, 'payment reform activities like AHEAD',
                 'payment reform activities like the then-anticipated AHEAD Model')

    # ── integrity, scoped to Chapter 2 ────────────────────────────────────
    import re
    def h1(title):
        for m in re.finditer(r'<w:p[ >].*?</w:p>', x, re.S):
            if 'w:val="Heading1"' in m.group(0) and enc(title) in m.group(0):
                return m.start()
        raise SystemExit('Heading1 not found: %r' % title)
    ch2 = x[h1('Chapter 2: The Policy Pillar'):h1('Chapter 3: The Policy Pillar in Practice')]
    for gone in ['$195M/year', '$150M/year', 'per year for five years', 'largest per-capita']:
        if enc(gone) in ch2:
            raise SystemExit('stale string survived in Chapter 2: %r' % gone)
    if enc('$195 million for the program’s first year in December 2025') not in ch2:
        raise SystemExit('§2.8 sourced statement was damaged')
    return x


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
