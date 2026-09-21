# -*- coding: utf-8 -*-
"""Chapter 1 platform box — make two promises true (2026-09-21).

Audit criterion 5 cannot be automated: a route returning 200 is not a delivered
promise. Opening each target found two overclaims in the "ON THE HTR PLATFORM &
ACADEMY" box in §1.3:

 * "Diagnostic" promised a tool that "scores any initiative … and sees where it
   breaks" but linked to /research-lab, the hub of ~39 tools. The tool that
   actually does that is the HTR Simulator (/htr-simulator): it scores across the
   five pillars, applies the Equity Imperative as a justice check, and reproduces
   the "composite collapses at a closed upstream gate" failure (page.tsx:266).
 * "Academy" said Track 1 "walks each gate with the Vermont cases in this chapter,
   including the global-budget example above". It does not: Lesson 4 teaches the
   gate test on Massachusetts 2006 and HITECH (neither is Vermont); the Vermont
   case is Lesson 5, the OneCare autopsy. The Act 68 global-budget worked example
   is not walked through the gates anywhere in Track 1.

Verified TRUE and left alone: the Five-Pillar Map is interactive and renders all
nine dependencies (FivePillarFrameworkMap.tsx); the Transformation Scorecard computes
and shows the weakest pillar (TransformationScorecard.tsx:318-383) and the
knowledge-workspace page reads ?tab=.
"""
import os, re, sys, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P

spec = importlib.util.spec_from_file_location('ch1', os.path.join(HERE, 'ch1_s14_restructure_2026-09-21.py'))
H = importlib.util.module_from_spec(spec)
spec.loader.exec_module(H)


def transform(x):
    x = H.set_text(
        x, 'Interactive five-pillar diagnostic — score any initiative',
        'The HTR Simulator (healthtransformationreview.org/htr-simulator) scores an initiative or a '
        'state across the five pillars, applies the Equity Imperative as a justice check, and shows '
        'where the sequence breaks.', cell=True)
    x = H.set_text(
        x, 'walks each gate with the Vermont cases in this chapter',
        'Track 1, “Foundations: The Framework,” of the Five Pillars, One Imperative course teaches '
        'the gate test (Lesson 4) and works the OneCare failure in full (Lesson 5) '
        '(healthtransformationreview.org/academy/tracks/five-pillars-one-imperative).', cell=True)
    return x


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
