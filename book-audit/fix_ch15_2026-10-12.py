#!/usr/bin/env python3
"""Chapter 15 corrections and restructuring — 2026-10-12.

Run:  python3 book-audit/fix_ch15_2026-10-12.py [--dry]
Uses book-build/patch_docx.py's main() (backup, XML validation, entry-for-entry
repack) with a custom apply(). Every literal replacement asserts its match count
inside a scoped span (Chapter 15 body, Figure Index, or whole doc for the TOC).
Tables are built with book-build/docx_build.py, never hand-written.
Images are inserted afterwards by insert_ch15_figures.py (before the captions
for Figures 15.7 and 15.10 created here).
"""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P
from docx_build import run, para, cell, row, table, NAVY, NAVY_INK

CH = 'Chapter 15: Healthcare Transformation'
IDX = 'Figure Index'


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def rep(seg, old, new, n=1, label=''):
    c = seg.count(old)
    if c != n:
        raise SystemExit('COUNT %d != %d for %s %r' % (c, n, label, old[:90]))
    return seg.replace(old, new)


def cellrep(seg, old_plain, new_plain):
    """Replace a whole single-run text: '>old</w:t>' -> '>new</w:t>'."""
    return rep(seg, '>' + esc(old_plain) + '</w:t>', '>' + esc(new_plain) + '</w:t>', 1, 'cell')


def para_of(seg, marker):
    if seg.count(marker) != 1:
        raise SystemExit('PARA marker count %d: %r' % (seg.count(marker), marker[:80]))
    i = seg.find(marker)
    a = seg.rfind('<w:p ', 0, i)
    b = seg.find('</w:p>', i) + len('</w:p>')
    return a, b


def clone_with_text(p_xml, text):
    """Clone a single-run paragraph, drop its paraId, swap its only text."""
    p_xml = re.sub(r' w14:paraId="[0-9A-F]+"', '', p_xml)
    hits = list(P.TXT.finditer(p_xml))
    if len(hits) != 1:
        raise SystemExit('clone source has %d text runs' % len(hits))
    m = hits[0]
    return p_xml[:m.start(1)] + esc(text) + p_xml[m.end(1):]


def set_text(seg, marker, text):
    a, b = para_of(seg, marker)
    return seg[:a] + clone_with_text(seg[a:b], text) + seg[b:]


# ---------------------------------------------------------------- captions
# (renumbered in descending order so no step matches an earlier result)
CAPTION_EDITS = [
    ('Figure 15.8 — Hands-on platform tools', 'Figure 15.11 — Hands-on platform tools'),
    ('Figure 15.7 — Business case', 'Figure 15.9 — Business case'),
    ('Figure 15.6 — Benefits-realization plan', 'Figure 15.8 — Benefits-realization plan'),
    ('Figure 15.5 — Vermont’s portfolio risk register', 'Figure 15.6 — Vermont’s portfolio risk register'),
    ('Figure 15.1 — The project-management gap. Sources: PMI Standard for Portfolio Management (5th ed.); '
     'Oliver Wyman Act 167 Report; AHS November 2025 Transformation Report.',
     'Figure 15.1 — The project-management gap. Sources: PMBOK Guide, 6th ed. (2017); Figures 15.3 and 15.6; '
     'Act 68 of 2025.'),
    ('(5th ed.); PMBOK Guide 7th ed.; PMI Program Management Standard.',
     '(4th ed., 2017); PMBOK Guide, 7th ed.; PMI Standard for Program Management (4th ed., 2017).'),
]

CAP_15_5 = ('Figure 15.5 — The ten PMI knowledge areas against Vermont’s operational capacity. '
            'Sources: PMBOK Guide, 6th ed. (2017); AHS Transformation Reports (2025–2026); HTR analysis.')
CAP_15_7 = ('Figure 15.7 — The portfolio risk register plotted by probability and impact; cell values are '
            'the register’s own scores. Source: Figure 15.6.')
CAP_15_10 = ('Figure 15.10 — Implementation roadmap: the PMO build-out (top) scheduled against the gating '
             'components of Figure 15.3 (bottom); dashed bars mark design work permitted before the '
             'Technology gate opens. Sources: Figures 15.3 and 15.6; Act 68 of 2025; AHS Act 68 '
             'Transformation Report (March 2026).')

KA_ROWS = [
    ('Integration', 'The dependency map, execution sequence, and scorecard exist analytically; '
                    'operational integration does not yet exist.'),
    ('Scope', 'No formal work-breakdown structure for any pillar.'),
    ('Schedule', 'Statutory deadlines tracked in isolation, not as an integrated master schedule.'),
    ('Cost', 'RHT spending tracked for federal compliance, not portfolio performance.'),
    ('Quality', 'Measured program by program, with no portfolio aggregation.'),
    ('Resource', 'AHS staff overcommitted, with no formal resource leveling.'),
    ('Communications', 'Operates at the component level; no portfolio-level strategy.'),
    ('Risk', 'Analyzed in this book but not managed operationally through a maintained register.'),
    ('Procurement', 'Operates at the component level; no portfolio-level strategy.'),
    ('Stakeholder', 'Operates at the component level; no portfolio-level strategy.'),
]

COMPONENT_CH = [
    ('Act 68 RBP-methodology rulemaking', 2), ('AHEAD State Agreement closeout', 3),
    ('RHT Program contract management', 2), ('Statewide Strategic Plan development', 16),
    ('AHS-GMCB analytics-vendor deployment', 4), ('Vermont CIN build-out', 4),
    ('VITL HIE expansion / FHIR compliance', '4–5'), ('Statewide AI-governance framework', 5),
    ('RBP implementation (all hospitals)', 6), ('Global-budget design & implementation', 6),
    ('RHT Program deployment', 2), ('Social-risk-adjustment methodology', 10),
    ('Blueprint PCMH', 8), ('CCBHC certification (5 entities)', 8),
    ('CoCM statewide deployment', 9), ('HEROI equity-scoring methodology', 10),
    ('14-hospital transformation planning', 11), ('AHS restructuring (HSA-coordinator model)', 16),
    ('AHS PMO establishment', 12),
]


def ka_table():
    head = row([cell(para(run('Knowledge area', bold=True, color=NAVY_INK)), fill=NAVY),
                cell(para(run('Vermont’s operational gap', bold=True, color=NAVY_INK)), fill=NAVY)],
               header=True)
    body = [row([cell(para(run(esc(k), bold=True))), cell(para(run(esc(v))))]) for k, v in KA_ROWS]
    return table([2300, 6775], [head] + body)


def chapter_edits(s):
    for old, new in CAPTION_EDITS:
        s = rep(s, old, new, 1, 'caption')
    s = rep(s, '(5th ed.)', '(4th ed.)', 3, '5th->4th captions+key concepts')

    # intro epigraph
    s = rep(s, 'Portfolio Manager at the state level and Project Managers at each pillar',
            'Portfolio Manager at the state level and Program Managers at each pillar')
    # Figure 15.1 stat strip
    s = cellrep(s, '7', '10')
    s = cellrep(s, '14+', '14')
    s = cellrep(s, 'PMI knowledge areas addressed by this book',
                'PMI knowledge areas (PMBOK Guide, 6th ed.) addressed by this book')
    s = cellrep(s, 'Statutory deadlines requiring PM discipline',
                'Scored risks in the portfolio register (Figure 15.6)')
    s = cellrep(s, 'AHS programs requiring portfolio coordination',
                'Hospital transformation plans the portfolio must coordinate')
    # §15.3 intro + Figure 15.3
    s = rep(s, 'should expect it to move.</w:t>',
            'should expect it to move. The chapter in parentheses after each component is where '
            'the book analyses it.</w:t>')
    for name, ch in COMPONENT_CH:
        s = cellrep(s, name, '%s (Ch%s %s)' % (name, 's.' if '–' in str(ch) else '.', ch))
    s = cellrep(s, 'In progress → FY2026', '4 of 5 certified Jul 2026 → fifth pending')
    s = cellrep(s, 'Plan submission → FY2026 approved', 'Final plans Mar 2026 → implementation')
    s = cellrep(s, 'Not started → Q1 2027 operational', 'Not started → Q2 2027 operational')
    # §15.4 / §15.5
    s = rep(s, 'connection to the pillar-level Project Managers below it',
            'connection to the pillar-level Program Managers below it')
    s = rep(s, 'each pillar needs a Project (or Program) Manager.',
            'each pillar needs a Program Manager — in PMI’s terms (Figure 15.2), each pillar is a program.')
    s = cellrep(s, '100% PCMH (FY2028); 5 CCBHCs (FY2026); CoCM 80%+ (FY2028)',
                '100% PCMH (FY2028); fifth new CCBHC certified; CoCM 80%+ (FY2028)')
    s = cellrep(s, '14 plans approved (FY2026); HSA coordinators staffed (FY2027); PMO operational (Q1 2027)',
                '14 plans implemented; HSA coordinators staffed (FY2027); PMO operational (Q2 2027)')
    # §15.6 run-on paragraph -> lead + table + caption
    a, b = para_of(s, 'Mapping the ten PMI knowledge areas')
    lead = clone_with_text(s[a:b],
        'Mapping the ten knowledge areas of the PMBOK Guide’s sixth edition (2017) to Vermont’s situation '
        'reveals a consistent gap (Figure 15.5): the book addresses each area analytically, but Vermont '
        'lacks the operational infrastructure to manage it. The 2025 eighth edition reorganizes the same '
        'ground into principles and performance domains; the ten areas remain the clearest checklist of '
        'what a PMO has to run.')
    ca, cb = para_of(s, 'Figure 15.4 — Pillar-level role matrix')
    cap_src = s[ca:cb]
    s = s[:a] + lead + ka_table() + clone_with_text(cap_src, CAP_15_5) + s[b:]
    # §15.7
    s = rep(s, 'Section 1.2’s gate definition', 'Section 1.4’s gate definition')
    # risk register
    s = cellrep(s, 'Mitigate: PMO by Q1 2027; resource-conflict authority; external plan support',
                'Mitigate: PMO by Q2 2027; resource-conflict authority; external plan support')
    s = cellrep(s, 'Avoid: hire Portfolio Manager by Q2 2026; PMO by Q1 2027 (the primary motivation for this chapter)',
                'Avoid: Portfolio Manager in seat by Jan 2027 (the Q2 2026 target was missed); PMO operational '
                'by Q2 2027 (the primary motivation for this chapter)')
    ra, rb = para_of(s, 'Figure 15.6 — Vermont’s portfolio risk register')
    body_src = s[slice(*para_of(s, 'Below the Portfolio Manager, each pillar needs'))]
    heat_lead = clone_with_text(body_src,
        'Plotted by probability and impact (Figure 15.7), the register’s shape is clearer than its rows: '
        'the two risks scored 20 share the critical corner, and one of them is the absence of the '
        'portfolio function itself. Social-risk adjustment (R-08) sits mid-map at 12 — a reminder that a '
        'moderate score is not a licence to wait, since the sequencing test above says it should '
        'already be running.')
    s = s[:rb] + heat_lead + clone_with_text(s[ra:rb], CAP_15_7) + s[rb:]
    # §15.11 business case
    s = rep(s, '>Figure 15.7</w:t>', '>Figure 15.9</w:t>')
    s = rep(s, 'over four to five years is roughly 2% of the portfolio value it protects.',
            'over four to five years is less than 2% of a single year of the value it protects — '
            '$195M a year in RHT funds and $300M+ a year in projected RBP savings.')
    s = rep(s, 'coordinates $195M RHT capital', 'coordinates $195M/yr in RHT capital')
    s = cellrep(s, '<2% of the portfolio value managed vs.\u00a0$195M RHT + $300M+ RBP savings',
                '<2% of one year’s value managed: $195M/yr RHT + $300M+/yr projected RBP savings')
    # §15.12 roadmap
    s = set_text(s, 'Q1–Q2 2026: Post the Portfolio Manager position',
        'The roadmap is anchored to the one date that cannot move: the Statewide Strategic Plan, due '
        'January 15, 2028. Its original first milestone — a Portfolio Manager in seat by Q2 2026 — has '
        'already passed. AHS’s March 2026 Act 68 report lists contracted transformation support (Manatt, '
        'Phelps & Phillips; a new hospital technical-assistance vendor; an analytics contract for regional '
        'planning still under negotiation) but no portfolio function. Figure 15.10 rebases the build-out on '
        'the fixed deadline and schedules it against the components it exists to sequence. A Portfolio '
        'Manager hired by January 2027 has nine months before FY2028 hospital budgets take effect in '
        'October 2027 — enough only if the PMO is running before the Technology gate it is meant to protect.')
    la, lb = para_of(s, 'The roadmap is anchored to the one date')
    s = s[:lb] + clone_with_text(cap_src, CAP_15_10) + s[lb:]
    s = set_text(s, 'Q2 2026: Portfolio Manager hired',
        'From mid-2027 the PMO runs on a fixed cadence: monthly governance reviews, quarterly performance '
        'reviews against the Vermont Scorecard, and annual portfolio rebalancing. The January 2028 Strategic '
        'Plan should arrive with portfolio-management evidence — benefits tracked, risks managed, resources '
        'deployed in dependency order — after which the PMO carries the portfolio into the plan’s '
        'three-year update cycle.')
    for m in ('Q3 2026: Integrated master schedule', 'Q4 2026: PMO software deployed',
              'Q1 2027: Five pillar PMs designated', 'Q2 2027 onward: Monthly governance',
              'January 2028: Strategic Plan delivered with portfolio-management evidence'):
        a, b = para_of(s, m)
        s = s[:a] + s[b:]
    # §15.13 objections
    s = rep(s, 'The ~$4–6.4M cost is roughly 2% of the value it protects',
            'The ~$4–6.4M cost is less than 2% of a single year of the value it protects')
    oa, ob = para_of(s, 'The hospitals won’t accept being managed by AHS.')
    s = s[:ob] + clone_with_text(s[oa:ob],
        '“AHS already has expert help — consultants, a technical-assistance vendor, an analytics '
        'contractor.” It does: AHS’s March 2026 Act 68 report lists contracted transformation support '
        'from Manatt, Phelps & Phillips, a new hospital technical-assistance vendor, and analytics support '
        'under negotiation. But a contractor delivers a defined scope. It cannot hold a state component '
        'back until its upstream gate opens, reassign AHS staff between components, or answer to the '
        'Legislature for the portfolio as a whole. Contracted support adds capacity, not authority — and '
        'every new contract is one more component, with its own deliverables and deadline, that someone '
        'has to sequence.') + s[ob:]
    # Key Concepts + Sources
    s = rep(s, 'and the PMBOK Guide (7th ed.)', 'and the PMBOK Guide (6th and 7th eds.)')
    s = rep(s, 'PMI Standard for Portfolio Management, 5th ed.\u00a0(2017); PMBOK Guide, 7th ed.\u00a0(2021); '
               'PMI Program Management Standard, 3rd ed.\u00a0(2017);',
            'PMI Standard for Portfolio Management, 4th ed.\u00a0(2017); PMBOK Guide, 6th ed.\u00a0(2017), '
            '7th ed.\u00a0(2021) and 8th ed.\u00a0(2025); PMI Standard for Program Management, 4th ed.\u00a0(2017);')
    s = rep(s, 'AHS Hospital Transformation Analytical Support RFP (2025).',
            'AHS Hospital Transformation Analytical Support RFP (2025); AHS Act 68 Health Care System '
            'Transformation Report (March 2026).')
    return s


def index_edits(s):
    for old, new in CAPTION_EDITS:
        s = rep(s, old, new, 1, 'index caption')
    s = rep(s, '(5th ed.)', '(4th ed.)', 2, 'index 5th->4th')
    for after, cap in (('Figure 15.4 — Pillar-level role matrix', CAP_15_5),
                       ('Figure 15.6 — Vermont’s portfolio risk register', CAP_15_7),
                       ('Figure 15.9 — Business case', CAP_15_10)):
        a, b = para_of(s, after)
        s = s[:b] + clone_with_text(s[a:b], cap) + s[b:]
    return s


def my_apply(x, _edits):
    x = rep(x, 'Pillar-Level Project Managers: Five Roles, One Framework',
            'Pillar-Level Program Managers: Five Roles, One Framework', 2, 'heading+TOC')
    x = rep(x, 'Answering the Four Objections', 'Answering the Five Objections', 2, 'heading+TOC')
    a, b = P._chapter_span(x, CH)
    x = x[:a] + chapter_edits(x[a:b]) + x[b:]
    a, b = P._chapter_span(x, IDX)
    x = x[:a] + index_edits(x[a:b]) + x[b:]
    print('  ok: all Chapter 15 edits applied in memory')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        x = zipfile.ZipFile(P.DOCX).read('word/document.xml').decode('utf8')
        y = my_apply(x, None)
        xml.dom.minidom.parseString(y.encode('utf8'))
        open(sys.argv[-1] if sys.argv[-1].endswith('.xml') else '/dev/null', 'w').write(y)
        print('DRY RUN OK — parses; %d -> %d chars' % (len(x), len(y)))
    else:
        P.apply = my_apply
        P.main([{'op': 'noop'}])
