#!/usr/bin/env python3
"""Chapter 15, part 2 (2026-10-12): §15.7 reconciled with Chapter 1's
Economics-as-design rule, and the new Portfolio Sequencing Test row added to
the Figure 15.11 platform table (route verified: frontend/app/portfolio-sequencing-test).
Run: python3 book-audit/fix_ch15_2026-10-12_part2.py [--dry]"""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P


def rep(s, old, new):
    assert s.count(old) == 1, (s.count(old), old[:80])
    return s.replace(old, new)


def my_apply(x, _):
    a, b = P._chapter_span(x, 'Chapter 15: Healthcare Transformation')
    s = x[a:b]
    s = rep(s, 'The Economics components — RBP implementation, global-budget design, RHT Program deployment — '
               'cannot be productively worked before the Technology components that make them measurable.',
            'The Economics components — RBP implementation, global-budget implementation, RHT Program '
            'deployment — cannot be productively worked before the Technology components that make them '
            'measurable; only their design runs in parallel (Economics-as-design, Section 1.11.2).')
    s = rep(s, 'not that a milestone was declared.)',
            'not that a milestone was declared. Design work, and care-model work that produces value on its '
            'own, does not wait: Section 1.11.2, Figure 1.8.)')
    i = s.find('Model what a single component slipping does')
    ra = s.rfind('<w:tr>', 0, i); rb = s.find('</w:tr>', i) + len('</w:tr>')
    new = re.sub(r' w14:paraId="[0-9A-F]+"', '', s[ra:rb])
    for old, txt in (('>Model what a single component slipping does to the rest of the portfolio<',
                      '>Run the sequencing test on Figure 15.3 — or on your own register<'),
                     ('>Impact Simulation<', '>Portfolio Sequencing Test<'),
                     ('> — /impact-simulation<', '> — /portfolio-sequencing-test<'),
                     ('>Which components have no slack: the ones whose slip moves other pillars’ outcomes.<',
                      '>Which components are correctly waiting, which are late by dependency order, which are '
                      'running ahead of a closed gate — and the unfinished components where schedule pressure '
                      'belongs.<')):
        new = rep(new, old, txt)
    j = s.find('Identify which pillar is the binding constraint on the whole portfolio')
    ta = s.rfind('<w:tr>', 0, j)
    s = s[:ta] + new + s[ta:]
    print('  ok: §15.7 reconciled; platform row added')
    return x[:a] + s + x[b:]


if '--dry' in sys.argv:
    import zipfile, xml.dom.minidom
    y = my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None)
    xml.dom.minidom.parseString(y.encode()); print('DRY OK')
else:
    P.apply = my_apply
    P.main([{'op': 'noop'}])
