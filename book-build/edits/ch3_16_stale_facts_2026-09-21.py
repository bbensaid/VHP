# -*- coding: utf-8 -*-
"""Chapters 3, 6, 7, 8, 9, 10, 11, 14, 15, 16 — stale AHEAD facts (2026-09-21).

Scope, deliberately narrow. book-audit/stale_facts_sweep.md flags ~190 AHEAD mentions across
Chapters 3-16. The great majority are legitimate: historical statements of what Vermont signed and
when, correctly-tensed statements of the July 2026 withdrawal, or references to AHEAD as a live
model in OTHER states (Maryland, Connecticut, Hawaii, Rhode Island, New York), which remains true —
the book itself documents this in Chapter 13. A real distinction also exists, confirmed by reading
Chapter 6 in full, between "the AHEAD Model" (the federal Medicare model Vermont withdrew from) and
Vermont's Medicaid global budget (operates under separate 1115 waiver authority, unaffected by the
withdrawal) — Chapter 3's "AHEAD Medicaid global budgets ... operate under this demonstration
authority" is NOT touched here; it is a different, still-live program.

This script fixes only two narrow, high-confidence defect classes, each already fixed in Chapters 1-2
and each checked against a source before touching it:

A. THE EAST FUND FIGURE. "$150M" (or "$150 million") appears seven times, always describing the fund
   as a current or expected amount. The Introduction and Chapter 1's own "What Earns a Place" box give
   the sourced figures: officials calculated an extra $138M; a CMS renegotiation capped it at $10M
   (Vermont Public, 2026-07-28, quoting the Human Services Secretary). No primary source was found
   for $150M anywhere in this session's research. Each instance is corrected to the sourced pair or,
   where the sentence is really about the RHT Program (a different fund entirely), the EAST Fund
   reference is removed rather than guessed at.

B. THE RHT AWARD FIGURE. "$195M per year for five years" / "$195M/yr" recurs, contradicted by
   Vermont's own published figure ("Vermont's Year 1 (Federal Fiscal year 2026) award is $195
   million" — healthcarereform.vermont.gov), which gives no figure for FY2027-2030. Chapter 2 §2.8
   already states this correctly ("$195 million for the program's first year") and Chapter 13 §13.2
   ALSO already states it correctly ("Vermont received $195 million for the first year ... with
   subsequent annual awards expected but approved year by year") — that is the sourced, hedged
   framing this script standardizes on.

C. "FIRST AHEAD PERFORMANCE YEAR" AND LIVE-PARTICIPATION FRAMING. Six sentences address the reader
   ("If you are a Vermont hospital executive...") as though Vermont's Medicare global-budget
   accountability will arrive through AHEAD. It will not — Vermont withdrew in July 2026, and the
   live mandate is Act 68 (mandatory for all Vermont hospitals, FY2028). Reworded to Act 68, matching
   the fix already made in Chapter 1 §1.17. Two further misattributions are corrected the same way:
   Chapter 3 §3.9 attributes global-budget risk-adjustment methodology to AHEAD when the live mandate
   (per the same paragraph's own opening sentence) is Act 68; Chapter 10's list of Vermont's
   "statutory" equity requirements included "the equity measurement requirements in AHEAD" — AHEAD
   was a federal agreement, not a Vermont statute, and Chapter 1 §1.3 already documents the actual
   statutory basis: "health-equity metrics mandated in Acts 167 and 68."
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P


def enc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def sub_once(x, old, new, note=''):
    a, b = enc(old), enc(new)
    n = x.count(a)
    if n != 1:
        raise SystemExit('expected 1 occurrence of %r%s, found %d' % (old[:70], (' (%s)' % note) if note else '', n))
    return x.replace(a, b)


def transform(x):
    # ── A. EAST Fund $150M -> sourced $138M/$10M or removed ────────────────
    x = sub_once(x,
        'providing up to $150 million in additional Medicare funds annually starting in 2027',
        'providing up to $138 million in additional Medicare funds annually starting in 2027 — later '
        'cut to a cap near $10 million when Vermont withdrew from AHEAD in July 2026', 'Ch6 §6.5.4')
    x = sub_once(x,
        'to provide up to $150M annually in additional Medicare funds for investment in primary care, '
        'behavioral health',
        'to provide up to $138M annually in additional Medicare funds for investment in primary care, '
        'behavioral health', 'Ch6 §6.11 glossary')
    x = sub_once(x,
        'coordinates $195M RHT + ~$150M/yr EAST Fund; single accountability for Dec 2028',
        'coordinates $195M RHT capital and the EAST Fund’s wind-down after Vermont’s AHEAD withdrawal; '
        'single accountability for Dec 2028', 'Ch15 §15.11 role table')
    x = sub_once(x, '$195M RHT + ~$150M/yr EAST Fund + $300M+ RBP savings',
        '$195M RHT + $300M+ RBP savings', 'Ch15 §15.11 total (EAST Fund removed: capped near $10M post-withdrawal)')
    x = sub_once(x,
        'EAST Fund management (up to ~$150M/yr in additional Medicare funds toward primary care, BH, '
        'home health, long-term care)',
        'EAST Fund wind-down (capped near $10M annually after Vermont’s AHEAD withdrawal, against the '
        '~$138M originally expected)', 'Ch16 §16.4')
    x = sub_once(x,
        'The AHEAD EAST Fund provides another $150 million annually in Medicare performance funds for a '
        'state that invests in population health.',
        'The AHEAD EAST Fund was to provide another $138 million annually in Medicare performance funds '
        'for a state that invests in population health — a renegotiation cut that to a cap near $10 '
        'million before Vermont withdrew from AHEAD in July 2026.', 'Conclusion')
    x = sub_once(x, 'AHEAD EAST Fund was to provide up to $150M per year to Vermont',
        'AHEAD EAST Fund was to provide up to $138M per year to Vermont', 'Appendix G')
    x = sub_once(x,
        'The Rural Health Transformation Program provides Vermont roughly $195M per year across five '
        'years (2026–2030), about $1 billion in total',
        'The Rural Health Transformation Program provided Vermont $195M for its first year (2026), with '
        'amounts for 2027–2030 not yet published', 'Appendix G')

    # ── B. RHT $195M/year -> sourced first-year figure ──────────────────────
    x = sub_once(x,
        'Rural Health Transformation Program — $195 million per year for five years — is transformation '
        'capital, not operating revenue',
        'Rural Health Transformation Program — $195 million for its first year, with future-year amounts '
        'not yet published — is transformation capital, not operating revenue', 'Ch6 §6.10')
    x = sub_once(x, 'RHT Program workforce investment $195M/yr, awarded annually',
        'RHT Program workforce investment: $195M for FY2026, the program’s first year', 'Ch11 §11.6.1')
    x = sub_once(x,
        'The RHT Program’s roughly $195 million per year over five years is federal capital already '
        'flowing into Vermont’s system',
        'The RHT Program’s $195 million first-year award is federal capital already flowing into '
        'Vermont’s system', 'Ch14 §14.2.1')

    # ── C. Live-participation framing -> Act 68, matching Ch1 §1.17 ────────
    x = sub_once(x,
        'Under AHEAD’s risk adjustment methodology, your global budget benchmark will be set based on '
        'your attributed population’s risk scores.',
        'Under Act 68’s risk adjustment methodology, your global budget benchmark will be set based on '
        'your attributed population’s risk scores.', 'Ch3 §3.9')
    x = sub_once(x, 'Watch Vermont’s first AHEAD performance year results carefully.',
        'Watch Vermont’s first Act 68 global budget performance year results carefully.', 'Ch3 §3.9')
    x = sub_once(x,
        'It is whether your organization is investing in it fast enough to realize the return before '
        'AHEAD’s financial accountability begins.',
        'It is whether your organization is investing in it fast enough to realize the return before '
        'Act 68’s financial accountability begins.', 'Ch8 §8.9')
    x = sub_once(x,
        'The timeline — completing certification across all HSAs before AHEAD’s clinical accountability '
        'begins — should be treated as a clinical milestone with the same urgency as the analytics '
        'vendor deployment.',
        'The timeline — completing certification across all HSAs before Act 68’s clinical accountability '
        'begins — should be treated as a clinical milestone with the same urgency as the analytics '
        'vendor deployment.', 'Ch8 §8.9')
    x = sub_once(x, 'will be able to demonstrate equity improvement in their first AHEAD performance year',
        'will be able to demonstrate equity improvement in their first Act 68 global budget performance year',
        'Ch10 §10.18')
    x = sub_once(x, 'the equity measurement requirements in AHEAD',
        'the equity metrics Acts 167 and 68 mandate', 'Ch10 §10.18 statutory list')
    x = sub_once(x, 'The Community Health Worker investment your organization makes before FY2028 is a '
        'direct investment in AHEAD performance.',
        'The Community Health Worker investment your organization makes before FY2028 is a direct '
        'investment in Act 68 global budget performance.', 'Ch9 §9.11')
    x = sub_once(x,
        'is the mechanism for building hospital-level Operations pillar capacity before AHEAD’s clinical '
        'accountability requirements begin.',
        'is the mechanism for building hospital-level Operations pillar capacity before Act 68’s clinical '
        'accountability requirements begin.', 'Ch11 §11.18')
    x = sub_once(x, 'It is pre-transformation infrastructure investment with a direct return in AHEAD '
        'performance year outcomes.',
        'It is pre-transformation infrastructure investment with a direct return in Act 68 global budget '
        'performance year outcomes.', 'Ch11 §11.18')

    # ── integrity ────────────────────────────────────────────────────────
    for gone in ['$150 million', '$150M', '$150 M']:
        if enc(gone) in x:
            raise SystemExit('a "%s" figure survived somewhere in the document' % gone)
    if enc('first AHEAD performance year') in x:
        raise SystemExit('"first AHEAD performance year" survived')
    return x


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
