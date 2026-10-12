#!/usr/bin/env python3
"""Chapter 15, part 3: de-duplicate the three identical rows in Figure 15.5."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P
OLD = '>Operates at the component level; no portfolio-level strategy.</w:t>'
NEW = ['>Reporting runs component by component; no portfolio-level communications strategy.</w:t>',
       '>Contracts — analytics, technical assistance — are let one component at a time; no portfolio-level '
       'procurement strategy.</w:t>',
       '>Hospitals, GMCB, HCAC, the Legislature and CMS are engaged component by component; no '
       'portfolio-level stakeholder strategy.</w:t>']


def my_apply(x, _):
    a, b = P._chapter_span(x, 'Chapter 15: Healthcare Transformation')
    s = x[a:b]
    assert s.count(OLD) == 3, s.count(OLD)
    for n in NEW:
        s = s.replace(OLD, n, 1)
    print('  ok: 3 rows rewritten (Communications, Procurement, Stakeholder in table order)')
    return x[:a] + s + x[b:]


P.apply = my_apply
P.main([{'op': 'noop'}])
