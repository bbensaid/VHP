# -*- coding: utf-8 -*-
"""Book-wide exact-string sweep. Report only — never edits. Each hit = chapter, section, sentence.

Usage: python3 book-audit/sweep_stale_facts.py > book-audit/stale_facts_sweep.md
Every pattern is a plain regex you can also Ctrl-F in Google Docs.
"""
import re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from extract_book import extract

ROWS = extract('HTR_Book_v42.docx')


def sentences(t):
    return [s.strip() for s in re.split(r'(?<=[.!?])\s+(?=[A-Z“"\(\[$0-9])', t) if s.strip()]


def where(c, s):
    c = re.sub(r'^(Chapter \d+|PREFACE|INTRODUCTION).*', lambda m: m.group(1), c)
    return f'{c} › {s[:60]}' if s else c


def hits(pattern, flags=re.I):
    rx = re.compile(pattern, flags)
    seen, out = set(), []
    for c, s, k, t in ROWS:
        for sent in sentences(t):
            if rx.search(sent):
                key = (where(c, s), sent)
                if key not in seen:
                    seen.add(key)
                    out.append(key)
    return out


def section(title, pattern, note, flag=None):
    h = hits(pattern)
    print(f'\n## {title}  —  {len(h)} hits')
    print(f'*{note}*  \nSearch string: `{pattern}`\n')
    for w, sent in h:
        mark = ''
        if flag and flag(sent):
            mark = ' **⚑**'
        print(f'- `{w}`{mark}\n  > {sent[:420]}')
    return h


print('# Stale-fact sweep — HTR_Book_v42.docx (read-only report)')
print('Source: word/document.xml read directly. ⚑ = my heuristic flag, not a verdict; you decide.')

section('$195M — one award or every year?', r'\$?195\s*(million|M)\b',
        'The Introduction says "$195M/year". Earlier in this session I found it is the FIRST-YEAR '
        'RHT award (Dec 2025). Every mention is listed so you can see which wording each place uses.',
        flag=lambda s: bool(re.search(r'/\s*yr|/\s*year|annually|per year|each year|every year|a year', s, re.I)))

section('EAST Fund figures — $138M vs $150M', r'\$\s*1(38|50)\s*(million|M)\b|EAST Fund',
        'The Master-Edition changelog claims a $150M typo existed in Figure 1.6. Here is every EAST Fund / $138 / $150 mention.',
        flag=lambda s: '150' in s)

section('AHEAD — present/future tense with no withdrawal in the same sentence', r'\bAHEAD\b',
        'Vermont formally withdrew in July 2026. ⚑ marks sentences that use present/future/participant wording '
        'and do not mention withdrawal — candidates for stale tense. Many sentences legitimately describe AHEAD as a national model.',
        flag=lambda s: bool(re.search(r'\b(will|would|is participating|participates?|participant|enrolled|performance year|joined|expects?|expected|is a|are a)\b', s, re.I))
        and not re.search(r'withdr[ae]w|withdrawal|withdrawn', s, re.I))

section('"AHEAD performance year" wording', r'AHEAD (global budget )?performance year|first AHEAD',
        'The Master-Edition changelog says this legacy phrase should read "first Act 68 global budget performance year".')

section('Six-pillar / Equity-as-pillar wording', r'six[- ]pillar|sixth pillar|6[- ]pillar|Equity pillar|equity as a pillar|Six Pillars',
        'Doctrine is five pillars + the Equity Imperative. "Sixth pillar" is allowed only where the text says equity is NOT one.',
        flag=lambda s: not re.search(r'\bnot\b|isn.t|rather than|instead of|deliberately', s, re.I))

section('Temporal anchors — "as of …" and "Fall 2026"', r'as of (Fall|Summer|Spring|Winter|early|late|mid|January|February|March|April|May|June|July|August|September|October|November|December)[^.;]{0,25}20\d\d|Fall 2026|written in real time',
        'Checks that the book anchors to one date. Anything not Fall 2026 is listed for you to judge.',
        flag=lambda s: not re.search(r'Fall 2026', s))
