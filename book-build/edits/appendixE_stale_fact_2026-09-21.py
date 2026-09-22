# -*- coding: utf-8 -*-
"""Appendix E — last surviving stale RHT figure (2026-09-21).

Found by a book-wide sweep after the Ch1-16 pass: the only remaining "$195M/yr" in the manuscript.
Same fix as everywhere else — Vermont's own program page states only a first-year figure.
"""
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P


def enc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def transform(x):
    old, new = 'RHT Program: $195M/yr awarded, first year committed', 'RHT Program: $195M awarded for FY2026, first year'
    a, b = enc(old), enc(new)
    if x.count(a) != 1:
        raise SystemExit('expected 1 occurrence, found %d' % x.count(a))
    return x.replace(a, b)


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
