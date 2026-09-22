# -*- coding: utf-8 -*-
"""Chapter 1 — stale AHEAD facts + internal verb/critical-path consistency (2026-09-21).

Every edit is a substring replacement INSIDE an existing run, so run properties
(bold, italic, colour, size) are untouched. Nothing is rebuilt. Each target was
verified unique before writing this script.

A. STALE AFTER VERMONT'S JULY 2026 AHEAD WITHDRAWAL (11 edits)
   The Introduction already states the withdrawal and the EAST Fund cut. Chapter 1 still
   presented AHEAD as live in eight places and contradicted its own §1.14 ("subsequently
   withdrawn July 2026"). The chapter yields to the front matter.
   Sources checked 2026-09-21:
     - RHT: healthcarereform.vermont.gov/hr1rural-health-transformation-fund — "Vermont's Year 1
       (Federal Fiscal year 2026) award is $195 million" ($195,053,740.44). NO figure is published
       for FY2027-2030, so "comparable annual awards" is dropped, not restated.
     - EAST: Vermont Public 2026-07-28, quoting the Human Services Secretary — officials calculated
       "an extra $138 million"; renegotiation "capped additional payments at $10 million". No primary
       source found for the "$150M annually" Figure 1.6 carried.

B. INTERNAL CONSISTENCY — Figure 1.3 vs the §1.4.x headings (5 edits)
   The matrix and the prose headings disagreed on three verbs, and the chapter contradicted itself
   on which dependencies are critical path. Figure 1.3 is the canonical artifact and §1.12.1 is the
   normative statement of the critical path, so both win over the headings:
     - Policy → Operations: heading said "REQUIRES (critical path)"; matrix says DRIVES, and
       §1.12.1's list of three does not include it. → "DRIVES".
     - Technology → Economics: heading carried no label; §1.12.1 names it as one of the three
       ("Technology enables Economics-as-management"). → "(critical path)" added.
     - Operations → Policy / → Technology: headings said ENABLES / REQUIRES; matrix says
       INFORMS ⟲ / RUNS ⟲. → aligned to the matrix.
     - §1.4's reading key defined only ENABLES/REQUIRES/DRIVES, leaving the matrix's INFORMS and
       RUNS undefined. → the key now names them.
   After this exactly three dependencies carry "(critical path)", and they are §1.12.1's three.
   frontend/lib/framework/dependencies.ts is updated to match.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P


def enc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def sub_once(x, old, new):
    """Replace `old` with `new` exactly once in the whole document."""
    a, b = enc(old), enc(new)
    n = x.count(a)
    if n != 1:
        raise SystemExit('expected 1 occurrence of %r, found %d' % (old[:80], n))
    return x.replace(a, b)


def sub_in_para(x, anchor, old, new):
    """Replace `old` with `new` once, inside the paragraph containing `anchor`.

    For text split across runs (the §1.4.x headings put the verb in its own run),
    where the verb alone is not unique document-wide.
    """
    ea = enc(anchor)
    if x.count(ea) != 1:
        raise SystemExit('anchor not unique: %r' % anchor[:80])
    i = x.index(ea)
    a = max(x.rfind('<w:p ', 0, i), x.rfind('<w:p>', 0, i))
    b = x.index('</w:p>', i) + 6
    seg, eo = x[a:b], enc(old)
    if seg.count(eo) != 1:
        raise SystemExit('expected 1 %r in paragraph %r, found %d' % (old, anchor[:50], seg.count(eo)))
    return x[:a] + seg.replace(eo, enc(new)) + x[b:]


def _heading1(x, title):
    """Offset of the real chapter heading — NOT the table-of-contents entry,
    which carries the same text and comes first in the document."""
    for m in re.finditer(r'<w:p[ >].*?</w:p>', x, re.S):
        if 'w:val="Heading1"' in m.group(0) and enc(title) in m.group(0):
            return m.start()
    raise SystemExit('Heading1 not found: %r' % title)


def transform(x):
    # ── A. stale AHEAD facts ──────────────────────────────────────────────
    # A1 §1.3 — Policy pillar's Vermont application
    x = sub_once(x, 'Acts 167 and 68, the AHEAD Model State Agreement, and the Statewide Strategic Plan mandate',
                 'Acts 167 and 68 and the Statewide Strategic Plan mandate')
    # A2/A3 Figure 1.5 — Policy and Economics rows
    x = sub_once(x, 'AHEAD Model State Agreement (January 2025)',
                 'AHEAD Model State Agreement (January 2025; withdrawn July 2026)')
    x = sub_once(x, '; AHEAD total cost of care accountability', '')
    # A4 §1.10.3 — the methodology being designed is Act 68's
    x = sub_once(x, 'designing the AHEAD global budget methodology',
                 'designing the Act 68 global budget methodology')
    # A5 §1.11.1 — AHEAD past tense; RHT is a first-year award
    x = sub_once(
        x,
        'The AHEAD Model federal agreement layered in the federal funding that made the technology '
        'build financially feasible. The Rural Health Transformation award — $195 million for Vermont '
        'in its first year, with comparable annual awards expected through FY2030 — is',
        'The AHEAD Model federal agreement was to add federal funding for the technology build; '
        'Vermont withdrew from it in July 2026, as the Introduction explains. The Rural Health '
        'Transformation award — $195 million for Vermont in its first year (federal fiscal 2026) — is')
    # A6/A7 Figure 1.6 — Stage 1 and Stage 3 Vermont anchors
    x = sub_once(x, 'Acts 167, 51, 68; AHEAD State Agreement; $195M/yr RHT award',
                 'Acts 167, 51, 68; $195M first-year RHT award')
    x = sub_once(x, 'Global hospital budgets; RBP at ≤200% Medicare; EAST Fund up to $150M annually',
                 'Global hospital budgets; RBP at ≤200% Medicare; EAST Fund (roughly $138M expected; '
                 'cut to a cap near $10M when Vermont withdrew from AHEAD)')
    # A8 §1.14.1
    x = sub_once(x, 'it delays the financial management capability for AHEAD',
                 'it delays the financial management capability for Act 68 global budgets')
    # A9/A10 §1.17
    x = sub_once(x, 'failure mode in your first AHEAD performance year',
                 'failure mode in your first Act 68 global budget performance year')
    x = sub_once(x, 'Operations capacity ahead of AHEAD’s clinical accountability requirements',
                 'Operations capacity ahead of Act 68’s global budget accountability requirements')
    # A11 §1.18 Key Concepts
    x = sub_once(x, 'Transformation capital (RHT award, EAST Fund) is time-limited bridge funding',
                 'Transformation capital (the RHT award, and the EAST Fund until Vermont’s withdrawal '
                 'from AHEAD) is time-limited bridge funding')

    # ── B. verbs and critical path ────────────────────────────────────────
    x = sub_once(x, 'and ⟲ marks a feedback loop that runs after the build.',
                 'and ⟲ marks a feedback loop that runs after the build rather than gating it — '
                 'Operations INFORMS policy design and RUNS the data infrastructure.')
    x = sub_in_para(x, 'Policy → Operations: Statutory deadlines force execution capacity',
                    'REQUIRES (critical path)', 'DRIVES')
    x = sub_in_para(x, 'Technology → Economics: Analytics makes VBC financial management possible',
                    'ENABLES', 'ENABLES (critical path)')
    x = sub_in_para(x, 'Operations → Policy: Implementation data feeds back into policy design',
                    'ENABLES', 'INFORMS ⟲')
    x = sub_in_para(x, 'Operations → Technology: Workforce runs the data infrastructure',
                    'REQUIRES', 'RUNS ⟲')

    # ── integrity ─────────────────────────────────────────────────────────
    # Scoped to Chapter 1: Chapters 2-16 carry their own stale AHEAD wording
    # (37 sentences, book-audit/stale_facts_sweep.md) and are edited separately.
    ch1 = x[_heading1(x, 'Chapter 1: The Five-Pillar Framework'):_heading1(x, 'Chapter 2: The Policy Pillar')]
    crit = len(re.findall(r'\(critical path\)', ch1))
    if crit != 3:
        raise SystemExit('expected exactly 3 "(critical path)" labels in Chapter 1, found %d' % crit)
    for gone in ['$195M/yr RHT award', 'EAST Fund up to $150M annually', 'first AHEAD performance year',
                 'AHEAD total cost of care accountability']:
        if enc(gone) in ch1:
            raise SystemExit('stale string survived in Chapter 1: %r' % gone)
    return x


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
