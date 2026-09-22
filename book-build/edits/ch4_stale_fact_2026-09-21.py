# -*- coding: utf-8 -*-
"""Chapters 4 and 5 — stale figures (2026-09-21).

Same source as the Ch2/Ch6/Ch11/Ch14/Appendix G fixes: Vermont's own program page states only a
first-year figure ("Vermont's Year 1 (Federal Fiscal year 2026) award is $195 million"); no amount is
published for FY2027-2030. §4.4 and §4.10 already state the $195M correctly, as a single award with
no "per year" attached — left alone. §4.3.10 is the one place in this chapter that calls it a
recurring "per-year" figure.
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
        raise SystemExit('expected 1 occurrence of %r, found %d' % (old[:70], n))
    return x.replace(a, b)


def transform(x):
    x = sub_once(x, 'Vermont’s $195 million-per-year RHT investment',
                'Vermont’s $195 million RHT investment')
    # Ch5 §5.8: a legislator recommendation framed as running "in parallel with AHEAD
    # deployment" — that deployment does not exist for Vermont; Act 68 is the live one.
    x = sub_once(x, 'developed in parallel with AHEAD deployment',
                'developed in parallel with Act 68 implementation')
    return x


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
