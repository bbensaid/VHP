# -*- coding: utf-8 -*-
"""Chapter 7 §7.8 — one missed AHEAD tense fix (2026-09-21).

Found by rendering and reading the actual page (directive 11 in action — the render caught what the
text-only sweep should have flagged but I let slip). This sentence was identified during the earlier
stale-fact pass but never actually included in the fix script. Vermont withdrew from AHEAD in July
2026; "will be measured" asserts a live Vermont accountability framework that no longer exists. No
sourced Act 68 equivalent metric was found in this session's research, so the fix reframes the
sentence as AHEAD's design intent (illustrative of the argument) rather than inventing a Vermont
substitute.
"""
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P


def enc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def transform(x):
    old = ('Under AHEAD, primary care investment will be measured as a percentage of total spending, '
           'creating an explicit financial accountability framework for the primary care investment '
           'argument.')
    new = ('AHEAD was designed to measure primary care investment as a percentage of total spending — '
           'an explicit financial accountability framework for the primary care investment argument, '
           'even though Vermont’s withdrawal means it will not be the vehicle that applies it here.')
    a, b = enc(old), enc(new)
    if x.count(a) != 1:
        raise SystemExit('expected 1 occurrence, found %d' % x.count(a))
    return x.replace(a, b)


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
