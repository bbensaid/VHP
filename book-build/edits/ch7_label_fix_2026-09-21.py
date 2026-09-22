# -*- coding: utf-8 -*-
"""Chapter 7 §7.9 — internal-consistency label fix (2026-09-21).

Found during the platform-link verification pass: the "Work This Chapter on the Platform" table
calls the tool "Shared Savings Calculator", but the book uses "APM Shared Savings Calculator" ten
other times (Ch1 §1.4.2, Ch7 §7.2.5 x2, Ch12 x4, Appendix D, Figure Index) and that is also the tool's
actual on-page label. One name for the same tool, used consistently everywhere except this one row.
"""
import re, sys, os

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P


def transform(x):
    target = 'Shared Savings Calculator'
    matches = [m for m in re.finditer(r'<w:t[^>]*>([^<]*)</w:t>', x) if m.group(1) == target]
    if len(matches) != 1:
        raise SystemExit('expected exactly 1 run with bare text %r, found %d' % (target, len(matches)))
    m = matches[0]
    return x[:m.start(1)] + 'APM Shared Savings Calculator' + x[m.end(1):]


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
