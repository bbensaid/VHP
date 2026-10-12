#!/usr/bin/env python3
"""Chapter 15, part 4: remove the unsourced "Q2 2026 milestone missed" framing.
The Q2 2026 date was only ever the book's own recommendation (old R-10 / roadmap),
never an agency commitment, so it cannot be described as a missed milestone."""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P
W = 5669280
PNG = os.path.join(REPO, 'book-audit', 'figure_15_10_gantt.png')
EDITS = [
    ('due January 15, 2028. Its original first milestone — a Portfolio Manager in seat by Q2 2026 — has '
     'already passed. AHS’s March 2026', 'due January 15, 2028. AHS’s March 2026'),
    ('still under negotiation) but no portfolio function. Figure 15.10 rebases the build-out on the fixed '
     'deadline and schedules it against the components it exists to sequence.',
     'still under negotiation) but describes no portfolio-management function. Figure 15.10 schedules the '
     'recommended build-out backward from that deadline and against the components it exists to sequence.'),
    ('Portfolio Manager in seat by Jan 2027 (the Q2 2026 target was missed); PMO operational',
     'Portfolio Manager in seat by Jan 2027; PMO operational'),
]


def my_apply(x, _):
    a, b = P._chapter_span(x, 'Chapter 15: Healthcare Transformation')
    s = x[a:b]
    for o, n in EDITS:
        assert s.count(o) == 1, (s.count(o), o[:60])
        s = s.replace(o, n)
    assert 'Q2 2026' not in s, 'Q2 2026 still present'
    x = x[:a] + s + x[b:]
    i = x.find('name="Figure 15.10 roadmap Gantt"')
    da, db = x.rfind('<w:drawing>', 0, i), x.find('</w:drawing>', i)
    h = open(PNG, 'rb').read(24)
    w_, h_ = int.from_bytes(h[16:20], 'big'), int.from_bytes(h[20:24], 'big')
    seg, n = re.subn(r'cx="\d+" cy="\d+"', 'cx="%d" cy="%d"' % (W, round(W * h_ / w_)), x[da:db])
    assert n == 2
    print('  ok: 3 text edits; Gantt extents updated')
    return x[:da] + seg + x[db:]


P.apply = my_apply
P.main([{'op': 'noop'}], {'word/media/image3.png': PNG})
