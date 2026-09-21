# -*- coding: utf-8 -*-
"""Chapter 1, §1.3-§1.4 (and §1.11) restructure — 2026-09-21.

Author's complaint, in five parts (each verified in the XML/render before writing this):
 1. Two tables (§1.3 Equity table, platform box) render black-on-navy in Word /
    Google Docs: a style-painted navy first row under hard-coded black text.
    (LibreOffice ignores conditional table-style formatting, so no render shows it.)
 2. §1.4 opens with "A matrix like this…" fifteen blocks BEFORE the matrix, and
    "Naming it…" has no antecedent.
 3. The "test / double-entry" paragraphs are muddled.
 4. §1.4.1 says non-participating hospitals "continued under fee-for-service without
    consequence" — contradicts §1.2.1 (all 14 hospitals took part; the opt-out was
    Blue Cross's, on the PAYER side, because of Gobeille). Figure 1.1's Policy row
    carries the same overreach.
 5. Placement: the matrix is introduced pages late; the Equity Imperative sits mid-flow
    for Technology, at the end for the others, as a standalone 1.4.5 that duplicates
    the Policy and Clinical blocks, and is absent for Operations; the "gate" box sits
    inside Economics after two earlier uses of "gate"; a Vermont-evidence box under
    Economics belongs to Technology -> Economics. §1.11 has the same wedged-Equity
    pattern (Stage 5 numbered 1.11.6).

Usage:
    python3 book-build/edits/ch1_s14_restructure_2026-09-21.py --scratch /tmp/x.docx
    python3 book-build/edits/ch1_s14_restructure_2026-09-21.py     # real: backs up first
"""
import os, re, sys, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
BB = os.path.dirname(HERE)
sys.path.insert(0, BB)
import patch_docx as P

TXT = re.compile(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', re.S)
PARA = re.compile(r'<w:p(?:\s[^>]*)?>.*?</w:p>', re.S)


# ─────────────────────────── low-level helpers ───────────────────────────────
def enc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def _in_table(x, pos):
    return x.rfind('<w:tbl>', 0, pos) > x.rfind('</w:tbl>', 0, pos)


def p_span(x, marker, cell=False):
    n = x.count(marker)
    if n != 1:
        raise SystemExit('ANCHOR occurs %d times (need 1): %r' % (n, marker[:80]))
    i = x.index(marker)
    a = max(x.rfind('<w:p ', 0, i), x.rfind('<w:p>', 0, i))
    b = x.index('</w:p>', i) + 6
    if not cell and _in_table(x, a):
        raise SystemExit('anchor is inside a table cell: %r' % marker[:80])
    return a, b


def p_after(x, marker, start):
    """Span of the first paragraph containing `marker` at or after index `start`.
    For captions that are repeated verbatim in the Figure Index at the back of the book."""
    i = x.find(marker, start)
    if i == -1:
        raise SystemExit('anchor not found after %d: %r' % (start, marker[:80]))
    a = max(x.rfind('<w:p ', 0, i), x.rfind('<w:p>', 0, i))
    return a, x.index('</w:p>', i) + 6


def t_span(x, marker):
    n = x.count(marker)
    if n != 1:
        raise SystemExit('TABLE anchor occurs %d times (need 1): %r' % (n, marker[:80]))
    i = x.index(marker)
    return x.rfind('<w:tbl>', 0, i), x.index('</w:tbl>', i) + 8


def trailing_empties(x, j):
    """End index after any empty spacer paragraphs that directly follow j."""
    while True:
        m = PARA.match(x, j)
        if not m:
            return j
        seg = m.group(0)
        if '<w:t' in seg or '<w:tbl' in seg or '<w:pStyle' in seg:
            return j
        j = m.end()


def block_after_table(x, marker):
    a, b = t_span(x, marker)
    return a, trailing_empties(x, b)


def _strip_bi(rpr):
    return re.sub(r'<w:(?:b|bCs|i|iCs) w:val="[01]"/>', '', rpr)


def _rpr_with(base, bold, italic):
    base = _strip_bi(base)
    flags = ''
    if bold:
        flags += '<w:b w:val="1"/><w:bCs w:val="1"/>'
    if italic:
        flags += '<w:i w:val="1"/><w:iCs w:val="1"/>'
    m = re.match(r'(<w:rFonts [^>]*/>)', base)
    return (m.group(1) + flags + base[m.end():]) if m else (flags + base)


def _rebuild(blk, runs, marker):
    fr = None
    for m in re.finditer(r'<w:r(?:\s[^>]*)?>(.*?)</w:r>', blk, re.S):
        if '<w:t' in m.group(1):
            fr = m
            break
    if fr is None:
        raise SystemExit('no text run in paragraph for %r' % marker[:70])
    rp = re.search(r'<w:rPr>(.*?)</w:rPr>', fr.group(1), re.S)
    base = rp.group(1) if rp else '<w:rtl w:val="0"/>'
    body = ''.join('<w:r><w:rPr>%s</w:rPr><w:t xml:space="preserve">%s</w:t></w:r>'
                   % (_rpr_with(base, bo, it), enc(tx)) for tx, bo, it in runs)
    return blk[:fr.start()] + body + '</w:p>'


def set_runs(x, marker, runs, cell=False):
    """Replace a paragraph's text with runs [(text, bold, italic)], keeping its pPr and the
    base run properties (font/size/colour) of its first text run."""
    a, b = p_span(x, marker, cell)
    return x[:a] + _rebuild(x[a:b], runs, marker) + x[b:]


def set_text(x, marker, text, bold=False, italic=False, cell=False):
    return set_runs(x, marker, [(text, bold, italic)], cell)


def clone_para(x, from_marker, runs, cell=False):
    """New paragraph XML modelled on an existing paragraph; x is NOT modified."""
    a, b = p_span(x, from_marker, cell)
    return _rebuild(x[a:b], runs, from_marker)


def cut(x, a, b):
    return x[:a] + x[b:], x[a:b]


def insert_before_para(x, marker, seg):
    a, _ = p_span(x, marker)
    return x[:a] + seg + x[a:]


def insert_after_para(x, marker, seg):
    _, b = p_span(x, marker)
    return x[:b] + seg + x[b:]


# ─────────────────────────────── the edit ────────────────────────────────────
EQ_Q = {
    'Policy': 'does the mandate close disparities or widen them?',
    'Technology': 'does the data make disparities visible, or bury them in averages?',
    'Economics': 'do the incentives reward serving the hardest-to-reach, or penalize it?',
    'Clinical': 'effective, and effective for whom?',
    'Operations': 'executable everywhere, including the rural and under-resourced?',
}


def sub(p):
    return 'The Equity Imperative on %s — %s' % (p, EQ_Q[p])


def fix_headerless(x, marker, fill):
    """A header-less table must not take the style's navy firstRow, and its text must
    carry explicit ink on an explicit fill so no viewer can flip either."""
    a, b = t_span(x, marker)
    t = x[a:b]
    assert 'w:tblHeader w:val="1"' not in t, 'table has a header row — not header-less'
    t = t.replace('<w:tblLook w:val="0020"/>', '<w:tblLook w:val="0600"/>')

    def tc(m):
        c = m.group(0)
        if '<w:tcPr' not in c:
            c = c.replace('<w:tc>', '<w:tc><w:tcPr><w:shd w:fill="%s" w:val="clear"/></w:tcPr>' % fill, 1)
        elif '<w:tcPr/>' in c:
            c = c.replace('<w:tcPr/>',
                          '<w:tcPr><w:shd w:fill="%s" w:val="clear"/></w:tcPr>' % fill, 1)
        elif '<w:tcPr></w:tcPr>' in c:
            c = c.replace('<w:tcPr></w:tcPr>',
                          '<w:tcPr><w:shd w:fill="%s" w:val="clear"/></w:tcPr>' % fill, 1)
        elif re.search(r'<w:tcPr><w:shd [^>]*/></w:tcPr>', c):
            c = re.sub(r'<w:tcPr><w:shd [^>]*/></w:tcPr>',
                       '<w:tcPr><w:shd w:fill="%s" w:val="clear"/></w:tcPr>' % fill, c, count=1)
        else:
            raise SystemExit('unexpected tcPr shape in header-less table')

        def run(m2):
            r = m2.group(0)
            if '<w:t' not in r or '<w:color' in r:
                return r
            if '<w:sz ' in r:
                return r.replace('<w:sz ', '<w:color w:val="111111"/><w:sz ', 1)
            if '<w:rtl' in r:
                return r.replace('<w:rtl', '<w:color w:val="111111"/><w:rtl', 1)
            return r.replace('<w:rPr>', '<w:rPr><w:color w:val="111111"/>', 1)
        return re.sub(r'<w:r(?:\s[^>]*)?>.*?</w:r>', run, c, flags=re.S)
    t = re.sub(r'<w:tc>.*?</w:tc>', tc, t, flags=re.S)
    return x[:a] + t + x[b:]


def transform(x):
    n_tbl0 = x.count('<w:tbl>')
    doomed = []          # bookmark names inside anything I delete

    def note_deleted(seg):
        doomed.extend(re.findall(r'<w:bookmarkStart [^>]*w:name="([^"]+)"', seg))

    # ── A ── the two header-less tables ────────────────────────────────────────
    x = fix_headerless(x, 'Permissible — and does the mandate close disparities', 'ffffff')
    x = fix_headerless(x, 'Interactive five-pillar diagnostic — score any initiative', 'edf2f9')

    # ── B ── §1.3: wording, and the platform box moves to the END of §1.3 ──────
    x = set_text(x, 'Equity is not a separate stage — it is the gate at every stage.',
                 'Equity is not a separate stage; it is a test applied at every stage. The '
                 'Introduction posed the five justice questions in prose; here each one is paired '
                 'with the pillar question it qualifies:', italic=True)
    assert x.count('(see the box above)') == 1
    x = x.replace('(see the box above)', '(see the table above)')

    ga, _ = p_span(x, 'ON THE HTR PLATFORM &amp; ACADEMY')
    _, gb = block_after_table(x, 'Interactive five-pillar diagnostic — score any initiative')
    grp = x[ga:gb]
    assert grp.count('<w:tbl>') == 1 and len(PARA.findall(re.sub(r'<w:tbl>.*?</w:tbl>', '', grp, flags=re.S))) >= 2, \
        'platform-box group is not the contiguous heading + subtitle + table'
    x, grp = cut(x, ga, gb)
    _, tb = t_span(x, 'What it produces when functioning')      # the Figure 1.2 table
    _, cb = p_after(x, 'Figure 1.2 — The five pillars: diagnostic questions and structural roles.', tb)
    x = x[:cb] + grp + x[cb:]

    # ── C ── §1.4 opening: state the point, show the matrix, THEN the rule ─────
    INTRO = 'The five pillars do not operate independently.'
    howto = clone_para(x, INTRO, [(
        'Read each cell as row-pillar → column-pillar: the row sends, the column receives. The verb '
        'names the kind of dependency — ENABLES (makes possible), REQUIRES (cannot function without), '
        'DRIVES (actively forces change in) — and ⟲ marks a feedback loop that runs after the build. '
        'There is no Equity row or column, for the same reason the pillar table in §1.3 has none: the '
        'justice test applies to every cell. The same map is interactive on the platform at '
        'healthtransformationreview.org/about/framework.', False, False)])
    legend = clone_para(x, INTRO, [(
        'Where two pillars depend on each other, the two arrows carry different content — '
        'Policy → Operations is a deadline, Operations → Policy is implementation data — so each is a '
        'genuine relationship, not one fact counted twice.', False, False)])
    x = set_text(x, INTRO,
                 'The five pillars are linked by nine directed dependencies. Most set the build '
                 'order; two run backward as feedback once the system is live. Reading those nine '
                 'relationships accurately is the core analytical skill this book develops, and '
                 'Figure 1.3 shows all nine at once.')
    x = insert_after_para(x, 'The five pillars are linked by nine directed dependencies.', howto)

    ma, _ = t_span(x, 'FROM ↓ / TO →')
    _, mb = p_span(x, 'ENABLES = precondition (cannot start without it)')
    seg = x[ma:mb]
    assert seg.count('<w:tbl>') == 1, 'matrix group unexpected'
    x, seg = cut(x, ma, mb)
    a, b = p_span(x, 'Figure 1.3 renders them as a single matrix'); note_deleted(x[a:b]); x, _ = cut(x, a, b)
    a, b = p_span(x, 'Each relationship appears once; ⟲ marks a feedback loop.'); note_deleted(x[a:b]); x, _ = cut(x, a, b)
    x = insert_after_para(x, 'The same map is interactive on the platform at', seg)
    a, b = p_span(x, 'ENABLES = precondition (cannot start without it)')
    x = x[:a] + legend + x[b:]

    # ── D ── "What Earns a Place in the Matrix" — rewritten, in order ──────────
    x = set_text(x, 'A matrix like this is an argument, not an inventory',
                 'Every cell in Figure 1.3 has to justify itself, and so does every empty one. A grid '
                 'built from relationships that merely struck someone as important cannot answer the '
                 'question a sceptical reader should ask: why is this cell filled and that one empty? '
                 'So the matrix follows a single rule.')
    x = set_runs(x, 'The rule used here is narrow on purpose.', [
        ('The rule is narrow on purpose: ', False, False),
        ('a dependency earns a cell when the downstream pillar cannot produce its intended result '
         'until the upstream pillar delivers something specific and nameable.', True, False),
        (' Three words carry the weight. Cannot excludes “benefits from” and “works better with.” '
         'Intended result means the downstream pillar’s own output, not general goodness. Nameable '
         'means you can say exactly what the upstream pillar hands over; if you cannot name it, you '
         'have found a resemblance, not a dependency.', False, False)])
    x = set_text(x, 'Naming it is easier than it sounds',
                 'Naming what flows is easier than it sounds, because each pillar issues exactly one '
                 'thing: its currency. That is what makes the five pillars distinct rather than five '
                 'labels for “important stuff.” The table below sets the five currencies side by side.')
    x = set_text(x, 'What each pillar issues. A dependency exists only where',
                 'What each pillar issues. A dependency exists only where one pillar needs what '
                 'another pillar issues.', italic=True)
    x = set_text(x, 'The test, then, is mechanical.',
                 'The test follows directly. Name what flows. Ask which pillar issues that currency. '
                 'If it is the upstream pillar, the cell is real. If it is a different pillar, the '
                 'relationship belongs in another cell — or it is one already in the grid, read from '
                 'the wrong end.')
    x = set_text(x, 'Two failure modes follow, and both are easy to fall into.',
                 'Two mistakes are easy to make.', bold=True)
    x = set_text(x, 'The first is double-entry:',
                 'The first is counting one relationship twice. Technology → Economics is a single '
                 'relationship: Technology issues information, and Economics needs it. To say instead '
                 'that “Economics depends on Technology” describes the same relationship from the '
                 'receiving end; it is not a second cell. The matrix records each relationship once, '
                 'from the pillar that issues.')
    x = set_text(x, 'The second is currency confusion',
                 'The second is confusing one currency for another, and it is the harder mistake to '
                 'avoid because the intuition behind it is sound. Data infrastructure is expensive; '
                 'VHCURES, a health information exchange and an analytics capability cannot be built '
                 'without money; and money seems like Economics. So the grid ought to contain an '
                 'Economics → Technology cell. It does not, and tracing the money shows why.')
    x = set_text(x, 'Trace the money and it comes apart.',
                 'Vermont’s technology build is funded by the Rural Health Transformation Program — a '
                 '$195 million first-year award — and was to have been supplemented by the EAST Fund '
                 'under the AHEAD State Agreement, until Vermont withdrew from AHEAD in July 2026. Both '
                 'are appropriations: money made available by statute or federal agreement, for named '
                 'purposes, on a schedule someone else set. An appropriation is an exercise of '
                 'authority, and authority is what Policy issues. That is why the Policy → Technology '
                 'relationship is described in this chapter as funding and authorizing the build: the '
                 'two arrive together because they are one instrument.')
    x = set_text(x, 'What the Economics pillar issues is not money but consequence.',
                 'What the Economics pillar issues is consequence, not capital. Reference-based '
                 'pricing, global budgets and total-cost-of-care accountability change what a hospital '
                 'gains or loses by behaving one way rather than another; none of them pays for a '
                 'server. A state can have a complete incentive architecture and no data infrastructure '
                 'at all — which is close to what Vermont had under OneCare, and §1.2.2 is the account '
                 'of what that cost.')
    x = set_text(x, 'This is the distinction between transformation capital and incentive architecture',
                 'The distinction between transformation capital and incentive architecture is not a '
                 'bookkeeping point. Bridge funding is time-limited and ends; incentive architecture is '
                 'permanent and compounds. A program built on capital and mistaken for one built on '
                 'incentives has an expiry date nobody has written down. Vermont’s AHEAD withdrawal '
                 'shows it: the EAST Fund was cut from roughly $138 million to a cap near $10 million, '
                 'and the incentive architecture — Act 68’s mandates — was untouched, because the two '
                 'were never the same thing.')
    x = set_text(x, 'So there is no Economics → Technology cell.',
                 'So there is no Economics → Technology cell. The relationship is real, but what it '
                 'proposes to send has a different sender. Applied honestly, the rule will sometimes '
                 'delete a cell you are fond of; that is what a rule is for. A reader who disagrees '
                 'with any of the nine relationships now has something specific to argue with: name '
                 'the currency, and name its issuer.')

    # ── E ── the "gate" box moves ahead of the pillar-by-pillar sections ───────
    ga, gb = block_after_table(x, 'Picture the pillars as a series of locked gates')
    x, gate = cut(x, ga, gb)
    roadmap = clone_para(x, 'So there is no Economics → Technology cell.', [(
        'The sections that follow take the nine relationships one source pillar at a time: the '
        'mechanism, the failure mode when it is ignored, and the Vermont evidence that confirms it. '
        'Each section closes with the same question — whether that pillar passes the Equity '
        'Imperative.', False, False)])
    x = insert_after_para(x, 'So there is no Economics → Technology cell.', gate + roadmap)

    # ── F ── §1.4.1 Policy ─────────────────────────────────────────────────────
    x = set_text(x, 'OneCare Vermont — a voluntary ACO model',
                 'The most important dependency in the entire framework. Payment reform that is '
                 'voluntary produces voluntary results. OneCare Vermont ran for twelve years on a '
                 'voluntary model: all 14 hospitals took part, but the insurers did not have to — and '
                 'when Blue Cross Blue Shield of Vermont, the state’s largest, left in January 2023, '
                 'about a third of the attributed population went with it (§1.2.1). Act 68 of 2025 '
                 'changed the architecture where the state does have authority: reference-based '
                 'pricing is mandatory for all Vermont hospitals beginning FY2027, and global budgets '
                 'are mandatory beginning FY2028. That closes the hospital-side opt-out. The '
                 'payer-side limit set by federal law remains.')
    x = set_text(x, 'Policy and the Equity Imperative: statutory mandates embed equity accountability',
                 sub('Policy'), bold=True)
    x = set_text(x, 'Acts 167 and 68 both contain explicit equity requirements',
                 'Acts 167 and 68 write equity into statute as operating requirements, not aspirations: '
                 'equity metrics must be tracked, disparities must be reported, and the Statewide '
                 'Strategic Plan must address geographic and demographic equity gaps. Without statutory '
                 'embedding, equity monitoring is a discretionary activity that competes with '
                 'operational priorities; with it, equity measurement is a compliance requirement. The '
                 'test also applies to how each instrument is designed. A reference-based-pricing '
                 'methodology that sets rates uniformly, without adjusting for the market conditions of '
                 'hospitals in underserved communities, is technically correct and practically '
                 'inequitable — which is why Vermont’s policy decisions, from the RBP rate methodology '
                 'to the Statewide Strategic Plan, have to be evaluated for equity impact before they '
                 'are finalized, not after.')

    # ── G ── §1.4.2 Technology ────────────────────────────────────────────────
    x = set_text(x, 'Technology is the data substrate on which every other pillar',
                 'Technology is the data substrate on which every other pillar’s management functions '
                 'depend. Its two outbound dependencies, to Economics and to Clinical, describe what '
                 'becomes possible when data infrastructure is adequate and what stays impossible when '
                 'it is not.')
    x = set_text(x, 'This is the paired reading described above',
                 'This is the relationship the matrix records once, from Technology’s side: Technology '
                 'issues information, and Economics cannot manage a payment model without it. The '
                 'difference it marks is between a contract existing and a contract being manageable. '
                 'An organization can enter an APM contract without adequate analytics — the contract '
                 'still exists, the financial obligations are still real. But it cannot manage its '
                 'financial performance under that contract, cannot identify where its costs are above '
                 'benchmark, cannot target care management toward the highest-return opportunities, and '
                 'cannot dispute errors in the payer’s shared-savings calculations.')
    # the box under Economics that is really Technology → Economics evidence: cut it FIRST
    # (its anchor phrase reappears in the merged text below), then fold its facts into 1.4.2's box
    a, b = block_after_table(x, 'Act 68 requires GMCB, beginning in FY2028, to set prospective annual hospital global budgets')
    note_deleted(x[a:b]); x, _ = cut(x, a, b)
    x = set_text(x, 'VHCURES population health analytics make the APM financial modeling',
                 'Act 68 requires GMCB, beginning in FY2028, to set prospective annual hospital global '
                 'budgets based on historical spending adjusted for population risk. That calculation '
                 'needs accurate VHCURES data, a validated risk-adjustment methodology, and an analytics '
                 'platform able to produce hospital-specific total-cost-of-care projections. The '
                 'AHS–GMCB data integration and analytics capability being stood up in 2025–2026 is the '
                 'Technology investment that makes global-budget implementation executable. The same '
                 'VHCURES logic underlies the APM Shared Savings Calculator, the Hospital Financial '
                 'Stress Test and the VBC Readiness Assessment in the HTR Research Lab (Chapter 7).',
                 cell=True)
    # the amber WORKED EXAMPLE box touched the green VERMONT EVIDENCE box with no gap
    # (the only adjacent-box pair in the chapter) — give it the same spacer every other box has
    wa, wb = t_span(x, 'Signing a contract you cannot read')
    if x.startswith('<w:tbl>', wb):
        x = x[:wb] + ('<w:p><w:pPr><w:spacing w:after="120" w:line="240" w:lineRule="auto"/>'
                      '<w:rPr><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr></w:pPr>'
                      '<w:r><w:rPr><w:rtl w:val="0"/></w:rPr></w:r></w:p>') + x[wb:]
    # Technology's equity block: relabel in place, then move from mid-flow to the END of 1.4.2
    x = set_text(x, 'Technology and the Equity Imperative: disaggregated data reveals disparities',
                 sub('Technology'), bold=True)
    ea, _ = p_span(x, sub('Technology'))
    _, eb = block_after_table(x, 'Vermont’s race/ethnicity data in VHCURES is incomplete')
    x, eq_tech = cut(x, ea, eb)
    x = insert_before_para(x, 'Economics Dependencies: One Relationship That Transmits Incentive Change', eq_tech)

    # ── H ── §1.4.3 Economics ─────────────────────────────────────────────────
    x = set_text(x, 'Economics is the pillar through which policy mandates are converted',
                 'Economics is the pillar through which policy mandates are converted into behavioral '
                 'change at the organizational and clinical level. That conversion is always indirect, '
                 'which is why its one outbound dependency — to Clinical — matters more than its own '
                 'design.')
    x = set_text(x, 'Economics and the Equity Imperative: VBC design must include social risk adjustment',
                 sub('Economics'), bold=True)

    # ── I ── §1.4.4 Clinical ──────────────────────────────────────────────────
    x = set_text(x, 'Clinical is the pillar that converts payment incentives into actual health outcomes.',
                 'Clinical is the pillar that converts payment incentives into actual health outcomes. '
                 'Its one outbound dependency — to Operations — describes what a care model needs in '
                 'order to be delivered at all.')
    x = set_text(x, 'Clinical and the Equity Imperative: care delivery expansion is the primary access gap mechanism',
                 sub('Clinical'), bold=True)
    x = set_text(x, 'Geographic and demographic disparities in healthcare access are primarily clinical access problems',
                 'Geographic and demographic disparities in access are primarily clinical access '
                 'problems — not enough primary care providers, not enough behavioral health capacity, '
                 'not enough community health workers in underserved communities — so the access-gap '
                 'goals cannot be reached without the Clinical pillar’s care-model expansion. '
                 'Blueprint’s PCMH expansion into Northeast Kingdom communities, the CCBHC network’s '
                 'geographic reach and CHT deployment in high-SDOH communities are Clinical investments '
                 'that directly serve them. Access is not the whole test, though. Expanding access to '
                 'biased care widens some disparities while narrowing others: implicit bias, language '
                 'barriers and differential treatment quality by race and ethnicity are clinical '
                 'practice problems, so care models have to address cultural competence, language access '
                 'and practice variation as design requirements, not implementation afterthoughts.')

    # ── J ── delete the standalone 1.4.5 (it duplicated Policy + Clinical); 1.4.6 -> 1.4.5 ─
    ja, _ = p_span(x, 'The Equity Imperative: Applying the Justice Test to Every Pillar')
    jb, _ = p_span(x, 'Operations Dependencies: Two Feedback Relationships That Close the Loop')
    seg = x[ja:jb]
    assert '<w:tbl' not in seg and len(PARA.findall(seg)) == 6, \
        'standalone 1.4.5 is not the six paragraphs I expected (%d)' % len(PARA.findall(seg))
    note_deleted(seg)
    x, _ = cut(x, ja, jb)
    a, b = p_span(x, 'Operations Dependencies: Two Feedback Relationships That Close the Loop')
    h = x[a:b]
    assert h.count('1.4.6  ') == 1
    x = x[:a] + h.replace('1.4.6  ', '1.4.5  ') + x[b:]

    # ── K ── Operations gets its Equity block, like every other pillar ─────────
    ops_sub = clone_para(x, sub('Clinical'), [(sub('Operations'), True, False)])
    ops_par = clone_para(x, 'Geographic and demographic disparities in access are primarily clinical',
                         [('The test for Operations is whether the capacity exists where the gaps are. '
                           'Regionalization concentrates specialty care at regional centers; left '
                           'unmanaged, it moves care farther from the communities with the least '
                           'transportation and the fewest alternatives, and a plan that is executable '
                           'in Burlington is not thereby executable in the Northeast Kingdom.',
                           False, False)])
    ca, cb = block_after_table(x, 'Essex County’s elevated uninsurance rate and limited primary care access')
    box = x[ca:cb]
    box = set_text(box, 'Essex County’s elevated uninsurance rate and limited primary care access',
                   'Chapter 10 (§10.4.1) makes the Northeast Kingdom — Caledonia, Essex and Orleans '
                   'counties — Vermont’s clearest equity priority, and argues that AHS must say so in '
                   'the Statewide Strategic Plan: the priority constrains the pace and structure of '
                   'regionalization, because the financial logic of consolidating services at '
                   'regional hospitals in Burlington, Rutland or Bennington cannot override the '
                   'obligation to keep emergency access in the state’s most isolated communities.',
                   cell=True)
    _, ob = block_after_table(x, 'have limited IT staff. This Operations pillar constraint directly limits')
    x = x[:ob] + ops_sub + ops_par + box + x[ob:]

    # ── L ── Figure 1.1 (§1.2): the Policy row overstated what Act 68 closes ───
    old = 'hospital, closing the opt-out that sank the voluntary OneCare model.'
    assert x.count(old) == 1
    x = x.replace(old, 'hospital — the mandatory lever federal law leaves Vermont, since it cannot '
                       'compel insurers.')

    # ── M ── §1.11: Equity last, after the five-stage figure; Stage 5 = 1.11.5 ─
    ea, _ = p_span(x, 'The Equity Imperative: A Constraint Across Every Stage')
    eb, _ = p_span(x, 'Stage 5: Operations — Closing the Administrative Cost Gap')
    seg = x[ea:eb]
    assert '<w:tbl' not in seg and len(PARA.findall(seg)) == 3, 'unexpected 1.11.5 shape'
    x, eq_stage = cut(x, ea, eb)
    s5, _ = p_span(x, 'Stage 5: Operations — Closing the Administrative Cost Gap')
    _, cb = p_after(x, 'Figure 1.6 — The Five-Stage Execution Sequence.', s5)
    x = x[:cb] + eq_stage + x[cb:]
    a, b = p_span(x, 'Stage 5: Operations — Closing the Administrative Cost Gap')
    assert x[a:b].count('1.11.6  ') == 1
    x = x[:a] + x[a:b].replace('1.11.6  ', '1.11.5  ') + x[b:]
    a, b = p_span(x, 'The Equity Imperative: A Constraint Across Every Stage')
    assert x[a:b].count('1.11.5  ') == 1
    x = x[:a] + x[a:b].replace('1.11.5  ', '1.11.6  ') + x[b:]

    # ── N ── integrity: nothing may link to a bookmark I deleted ───────────────
    anchors = set(re.findall(r'w:anchor="([^"]+)"', x))
    dangling = [d for d in doomed if d in anchors]
    assert not dangling, 'deleted bookmarks still linked: %r' % dangling
    # Only one new box was added, and two were cut/moved: table count must be n0 + 1 - 1
    assert x.count('<w:tbl>') == n_tbl0 + 1 - 1, (n_tbl0, x.count('<w:tbl>'))
    return x


# ─────────────────────────────── entry point ─────────────────────────────────
def main():
    if '--scratch' in sys.argv:
        out = sys.argv[sys.argv.index('--scratch') + 1]
        zin = zipfile.ZipFile(P.DOCX)
        new = transform(zin.read('word/document.xml').decode('utf8'))
        import xml.dom.minidom
        xml.dom.minidom.parseString(new.encode('utf8'))
        zo = zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED)
        for it in zin.infolist():
            data = zin.read(it.filename)
            if it.filename == 'word/document.xml':
                data = new.encode('utf8')
            zo.writestr(it, data)
        zo.close()
        print('scratch written:', out)
        return
    P.apply = lambda x, edits: transform(x)
    P.main([])


if __name__ == '__main__':
    main()
