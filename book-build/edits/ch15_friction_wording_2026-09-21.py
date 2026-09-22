# -*- coding: utf-8 -*-
"""Chapter 15 §15.14 — align the book's description with the tool's actual (better) method (2026-09-21).

Found by parallel-agent verification: the Friction Index's own on-page footer states its method
correctly — "The binding constraint is found by sensitivity — which pillar, improved, lifts delivered
readiness most — so it is not simply the highest bar" (components/framework/FrictionScorer.tsx, built
this session). Chapter 15's row and TRY THIS box both describe the simpler, wrong method ("the pillar
with the highest friction score"). The tool is right and more sophisticated than the book credits it
for; the book is reworded to match, per the standing rule that a tool's real behavior is the source of
truth once built.
"""
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P


def enc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def sub_once(x, old, new):
    a, b = enc(old), enc(new)
    if x.count(a) != 1:
        raise SystemExit('expected 1 occurrence, found %d: %r' % (x.count(a), old[:70]))
    return x.replace(a, b)


def transform(x):
    x = sub_once(
        x,
        'The pillar with the highest friction score is where the portfolio manager’s attention '
        'belongs — not the component with the nearest deadline.',
        'The tool finds this by sensitivity, not by the highest bar: the pillar whose improvement '
        'would lift delivered readiness most is where the portfolio manager’s attention belongs — '
        'not the component with the nearest deadline.')
    x = sub_once(
        x,
        'Then list your three most urgent initiatives by deadline. If none of them sits in your '
        'highest-friction pillar, your portfolio is being scheduled by calendar rather than by '
        'dependency — the failure this chapter is written to prevent.',
        'Then list your three most urgent initiatives by deadline. If none of them sits in the '
        'binding-constraint pillar the tool identifies, your portfolio is being scheduled by calendar '
        'rather than by dependency — the failure this chapter is written to prevent.')
    return x


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
