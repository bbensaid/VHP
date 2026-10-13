#!/usr/bin/env python3
"""Chapter 16 primary-source audit fixes, 2026-10-12. Findings and sources: book-audit/ch16_findings_2026-10-12.md.

Sources read 2026-10-12:
  Act 68 of 2025 as enacted (18 V.S.A. §§ 9375, 9403, 9403a, 9353, 9456); Act 68 summary (Legislative Counsel).
  GCR 26-089 (AHS, July 21, 2026) — CMS notice of July 7, 2026 on the Medicaid hospital global budget.
  Oliver Wyman, Act 167 Community Engagement: Recommendations (revised Oct 21, 2024).
  Vermont Department of Health, Population by Hospital Service Area, Age and Sex, 2020–2025 (July 1, 2025).
  AHS, Act 119: Re-envisioning the Agency of Human Services (Senate Government Operations, Feb 4, 2026).
  Vermont Public / VermontBiz (July 28, 2026) on the AHEAD withdrawal; DMH CCBHC certification (July 1, 2026).
  HIE Steering Committee onboarding materials (2025); AHS solicitation RHT_AHS_004_FY26 (May 20, 2026).
  sequence-engine.ts run: weak Operations lowers the composite by its own share only (no cascade).
Run: python3 book-audit/fix_ch16_2026-10-12.py [--dry]
"""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


# (old, new, count). A leading '>' and trailing '<' mean "whole table cell / run text".
EDITS = [
    # ---- §16.1 and Figure 16.1
    ('It is a mandate to become a different kind of organization.',
     'It is a mandate to become a different kind of organization. The statute does not itself order AHS to '
     'reorganize — that recommendation is Oliver Wyman’s — but the obligations it does impose cannot be met by '
     'the agency as it is organized today.', 1),
    ('A comprehensive plan covering payment-reform trajectory, primary-care investment targets, hospital-network '
     'configuration, behavioral-health integration, equity goals, and administrative simplification. Updated every '
     'three years.',
     'A plan that promotes universal access across acute, primary, mental-health, substance-use, long-term, and '
     'emergency services; sets shared goals and benchmarks; identifies resources, gaps, duplication, and barriers; '
     'and gives a phased timeline with milestones (18 V.S.A. § 9403(b)). Updated every three years from '
     'December 1, 2030.', 1),
    ('Quantified per-capita cost-growth targets, aligned with Act 68’s hospital-spending-reduction requirement.',
     'Annual total-cost-of-care targets for the whole system, used to allocate resources across the State '
     '(§ 9403(b)(7)).', 1),
    ('A defined set of outcome measures tied to the five Act 167 goals, reported monthly and used to evaluate the '
     'plan.',
     'A defined set of outcome measures tied to the five Act 167 goals, used to evaluate the plan.', 1),
    ('>Monthly already; full framework by plan delivery<',
     '>Reported monthly through January 1, 2027; full framework by plan delivery<', 1),
    ('A plan to raise primary care as a share of total spend (retained as state policy after the AHEAD '
     'withdrawal), including Blueprint expansion, CCBHC development, and CoCM deployment.',
     'Targets for the share of total spending on primary care (including mental health) and on preventive care, '
     'aligned with the total-cost-of-care targets (§ 9403(b)(7)); delivered through Blueprint, CCBHC, and CoCM '
     'expansion.', 1),
    ('>State policy after the AHEAD withdrawal; plan formalizes it<',
     '>Statutory plan element; no longer tied to AHEAD after the July 2026 withdrawal<', 1),
    ('A plan to attract and retain professionals (Act 68), including RHT workforce investments.',
     'Act 68’s goal of a system that attracts and retains health professionals, including RHT workforce '
     'investments.', 1),
    ('representing AHS, GMCB, the Health Care Advocate, hospitals, health centers, insurers, health professions, '
     'small businesses, and long-term care',
     'chaired by the Secretary of Human Services and representing GMCB, the Health Care Advocate, primary care, '
     'hospitals, health centers, insurers, physicians and nurse practitioners, mental-health and home-health '
     'providers, small businesses, and long-term care', 1),
    # ---- §16.2
    ('Oliver Wyman’s finding was blunt: AHS’s organizational structure is one of the primary barriers to '
     'transformation. Not because AHS lacks capable people,',
     'Oliver Wyman’s recommendations point directly at AHS’s own organization: review the agency structure for '
     'overlaps, align its agencies with Hospital Service Areas, integrate its subunits, add a Division of Planning '
     'and Effectiveness, and fund the staff that AHS and GMCB lack for transformation work. Not because AHS lacks '
     'capable people,', 1),
    ('build a shared data architecture linking social-service utilization to healthcare outcomes in VHCURES',
     'link social-service utilization to healthcare outcomes through the Unified Health Data Space', 1),
    # ---- §16.3.1
    ('Federal-relationship management --- active management of CMS, HRSA (RHT), and CMMI relationships. The AHEAD '
     'wind-down alone requires ongoing withdrawal-condition management, EAST Fund closeout, and negotiation of the '
     'terms of any successor federal agreement.'.replace('---', '—'),
     'Federal-relationship management — active management of CMS, HRSA (RHT), and CMMI relationships. The '
     'immediate load is heavy: unwinding the Medicaid hospital global budget CMS found unapproved under the Global '
     'Commitment demonstration (payments stopped July 31, 2026; January–July payments reprocessed as '
     'fee-for-service by January 7, 2027), renewing that demonstration before it expires on December 31, 2027, and '
     'setting the terms of any federal partnership after the July 2026 AHEAD withdrawal.', 1),
    ('Legislative accountability --- producing the monthly reports, the January 2028 plan, and the three-year '
     'updates. The monthly reporting requirement is a real accountability mechanism, not a formality.'.replace('---', '—'),
     'Legislative accountability — producing the monthly outcome reports Act 68 requires through January 1, 2027, '
     'the January 2028 plan, and the three-year updates that begin December 1, 2030. The monthly reporting has been '
     'a real accountability mechanism, not a formality; when it ends, the plan’s own reporting calendar has to '
     'replace it.', 1),
    ('(18 members: AHS Secretary, GMCB Chair, Health Care Advocate, and representatives of hospitals, FQHCs, '
     'insurers, nursing/pharmacy/primary care and other professions, small business, and long-term care)',
     '(18 members, chaired by the Secretary of Human Services: the GMCB Chair, the Chief Health Care Advocate, two '
     'members of the primary-care steering committee, and representatives of hospitals, FQHCs, commercial insurers, '
     'physicians, independent practices, APRNs, designated agencies, independent mental-health clinicians, home '
     'health, long-term care, and small business)', 1),
    # ---- Figure 16.3 (VDH July 2025 population; Oliver Wyman COEs and options)
    ('>~230K, growing, most diverse; non-rural<', '>~190K; youngest HSA (19.5% aged 65+); +0.8% since 2020<', 1),
    ('>Admin-overhead reduction at UVMMC; primary-care access for growing immigrant population; BH integration at '
     'scale<',
     '>16 recommended COEs (OW); admin cost $3,826 per adjusted discharge vs. $1,427 benchmark; BH integration at '
     'scale<', 1),
    ('>~65K, aging, state-government center<', '>~68K; 23.8% aged 65+; flat since 2020; includes the capital<', 1),
    ('>Radiation/neurology COE development; state-employee-plan RBP transition; Washington County rural access<',
     '>COEs: geriatric care, infusion, neurology, adult psych, radiation (OW); in the UVM Health network plan<', 1),
    ('>~62K, aging, lower income<', '>~60K; 28.0% aged 65+; −1.2% since 2020<', 1),
    ('>COE development (surgery, neurology, psych); high opioid overdose; workforce-housing shortage<',
     '>COEs: acute general and minimally invasive surgery, geriatric care, neurology, adult psych (OW); suicide and '
     'self-harm ED visits above the state rate (AHS)<', 1),
    ('>Windsor<', '>White River Junction<', 1),
    ('>~59K, aging, Dartmouth Health connection<', '>~50K; 26.6% aged 65+; Dartmouth Health affiliate<', 1),
    ('>REH or focused-scope transition; cross-border coordination; rehabilitation COE<',
     '>Rehabilitation COE (OW); OW options: rehab and ambulatory-surgery focus, or REH designation (“may be '
     'difficult”); shared leadership with Valley Regional<', 1),
    ('>~53K, rural, Franklin/Grand Isle<', '>~47K; 21.4% aged 65+; +1.8% since 2020; Franklin/Grand Isle<', 1),
    ('>Cancer-surgery and radiation COEs; workforce recruitment; northern-border needs<',
     '>COEs: non-complex cancer surgery, infusion, neurology, radiation (OW)<', 1),
    ('>~48K, aging, rural, southwest VT<', '>~40K; 28.1% aged 65+; −1.5% since 2020<', 1),
    ('>9 COEs — secondary RSC role; critical psych services; Berkshire/Taconic coordination<',
     '>9 recommended COEs, the most outside Burlington (OW) — secondary RSC role; adult and adolescent psych COEs<', 1),
    ('>~46K, aging, Addison County<', '>~29K; 26.1% aged 65+; Addison County<', 1),
    ('>Tier 2 (COE designations TBD); UVM-network affiliation; shared-service opportunities with UVMMC<',
     '>COE designations need further discussion (OW); in the UVM Health network plan<', 1),
    ('>~42K, aging, high SUD/MH burden<', '>~33K including Townshend; 27.8% aged 65+; −1.4% since 2020<', 1),
    ('>Acute general-surgery COE; high suicide/self-harm rates; Brattleboro Retreat coordination<',
     '>6 recommended COEs incl. acute general surgery (OW); Windham suicide and self-harm ED visits above the state '
     'rate (AHS); Brattleboro Retreat coordination<', 1),
    ('>~41K, very rural, NEK<', '>~28K; 26.3% aged 65+; Northeast Kingdom<', 1),
    ('>Among most financially vulnerable; REH candidacy; high Essex/Orleans uninsurance<',
     '>One of OW’s four at-risk hospitals; OW calls REH “likely not supportable in the area”; back-office '
     'consolidation with NVRH; new EHR<', 1),
    ('>~39K, very rural, NEK<', '>~28K; 25.7% aged 65+; Northeast Kingdom<', 1),
    ('>Cancer-surgery and infusion COEs; highest poverty (Caledonia/Essex); broadband/telehealth priority<',
     '>COEs: non-complex cancer surgery, infusion, minimally invasive surgery, radiation (OW); regionalization with '
     'North Country<', 1),
    ('>~31K, rural, Windsor/Windham border<',
     '>~28K; oldest HSA (29.5% aged 65+); −1.8% since 2020, the steepest decline<', 1),
    ('>Memory-care and adult-psych COEs; SUD corridor; most complex plan given financial position<',
     '>COEs: memory care, adult psych (OW); one of OW’s four at-risk hospitals; plan needed follow-up (January '
     '2026)<', 1),
    ('>~31K, rural, Lamoille/Orleans<', '>~28K; 23.6% aged 65+; +2.3% since 2020, the fastest growth<', 1),
    ('>Orthopedics/rheumatology COEs; Stowe seasonal population; critical workforce housing<',
     '>COEs: orthopedics, rheumatology (OW)<', 1),
    ('>~28K, very rural, Orange County<', '>~15K, the smallest HSA; 28.4% aged 65+; Orange County<', 1),
    ('>TBD tier — among most vulnerable; comprehensive assessment needed; Act 68 CAH global-budget deferral to '
     'FY2030<',
     '>One of OW’s four at-risk hospitals; COE designations need further discussion; also an FQHC, which '
     'complicates REH (OW); CAH global budgets by FY2030<', 1),
    ('>~14K, very rural; 19-bed, Vermont’s smallest<',
     '>Counted within the Brattleboro HSA in VDH estimates; Vermont’s smallest hospital<', 1),
    ('>REH conversion the likely path; coordination with Brattleboro Memorial essential; palliative-care specialty '
     'worth preserving<',
     '>One of OW’s four at-risk hospitals, now turning toward FY2026 break-even (Appendix A); OW’s options for it '
     'do not include REH — eldercare use of beds, or an ambulatory role with Brattleboro Memorial<', 1),
    ('Figure 16.3 — Vermont’s 14 HSAs: regional profile and priority transformation challenges. Sources: Oliver '
     'Wyman Act 167 Report; Vermont RHT Program Application; AHS Transformation Reports 2025.',
     'Figure 16.3 — Vermont’s hospital service areas: population and Oliver Wyman’s recommended Centers of '
     'Excellence. The Department of Health counts 13 HSAs totalling 644,663 residents, with Grace Cottage’s '
     'Townshend area inside Brattleboro; the table lists all 14 hospitals. Sources: Vermont Department of Health, '
     'population by HSA, July 1, 2025; Oliver Wyman, Act 167 Community Engagement: Recommendations (revised '
     'October 2024); AHS Transformation Report, November 2025.', 2),
    # ---- §16.4
    ('AHEAD wind-down and successor-agreement strategy (EAST Fund closeout, resolving CMS’s July 2026 compliance '
     'notice on the Medicaid global budget, terms for any second federal agreement); Act 68 compliance tracking '
     '(RBP FY2027, non-CAH global budgets FY2028,',
     'federal strategy after the AHEAD withdrawal (unwinding the Medicaid hospital global budget under CMS’s July 7, '
     '2026 notice, renewing the Global Commitment demonstration before it expires December 31, 2027, terms for any '
     'successor federal agreement); Act 68 compliance tracking (RBP by FY2027, global budgets for one or more '
     'non-CAH hospitals by FY2028 and all hospitals by FY2030, resources permitting,', 1),
    ('the November 2025 report acknowledged most measures reflect 2023 data — a two-year lag that makes real-time '
     'management impossible); HIE strategic development (the statewide-EHR feasibility assessment AHS commissioned '
     'in line with the Act 167 report); analytics-vendor implementation (the most urgent near-term investment);',
     'the November 2025 report acknowledged most measures reflect 2023 or earlier data, about two years behind); '
     'HIE strategic development (the Unified Health Data Space, built with the HIE Steering Committee — '
     'clinical–claims integration cannot begin before January 1, 2027, and only on a Steering Committee majority '
     'vote — the statewide-EHR feasibility and readiness assessment, and the RHT-funded voluntary shared EMR whose '
     'program-manager solicitation AHS posted in May 2026); analytics-vendor implementation (the near-term '
     'investment with the shortest path to usable output);', 1),
    ('EAST Fund closeout (cut to a cap near $10M, against the ~$138M originally expected, before Vermont’s AHEAD '
     'withdrawal)',
     'the lost federal upside (the EAST Fund cut to a cap near $10M against the ~$138M originally expected, then '
     'forgone with the July 2026 AHEAD withdrawal)', 1),
    # ---- Figure 16.4 (status as of October 2026)
    ('>In progress — all eligible hospitals applied<',
     '>Awarded to 12 hospitals; Springfield needed follow-up; UVMMC not eligible (Appendix A)<', 1),
    ('>Underway as of November 2025<', '>RFP posted October 21, 2025; contracts nearing completion spring 2026<', 1),
    ('>Under CMS compliance notice<',
     '>CMS notice July 7, 2026; payments stopped July 31; January–July payments reprocessed as fee-for-service by '
     'January 7, 2027<', 1),
    ('>$195M received Dec 2025; planning underway<',
     '>$195M first-year award (Dec 2025); subrecipient awards began fall 2026<', 1),
    ('>Plans expected early 2026<', '>Draft plans due January 15, 2026; finalized after AHS review<', 1),
    ('>Organizational change requiring Secretary-level decision<',
     '>This chapter’s recommendation, building on Oliver Wyman’s HSA-alignment action; Secretary-level decision<', 1),
    ('>OW-recommended; critical for plan development<',
     '>Recommended by Oliver Wyman (2024); Secretary-level decision; critical for plan development<', 1),
    ('>Enhanced primary-care payments — state/Medicaid-funded successor to the expired Medicare demo<',
     '>Primary-care payment replacement — Medicare’s share ended with OneCare and AHEAD will not restore it<', 1),
    ('>Replaces expiring Medicare demo<',
     '>RHT funds are the interim stopgap; no long-term source identified (AHS, July 2026)<', 1),
    ('>Global budgets for non-CAH hospitals<',
     '>Global budgets for one or more non-CAH hospitals (resources permitting)<', 1),
    ('>Global budgets for all hospitals including CAHs<',
     '>Global budgets for all hospitals including CAHs (resources permitting)<', 1),
    ('Figure 16.4 — AHS restructuring and Vermont transformation timeline. Sources: Act 68 of 2025; AHEAD State '
     'Agreement (January 2025); AHS Transformation Reports; Vermont RHT Program Application.',
     'Figure 16.4 — AHS restructuring and Vermont transformation timeline, status as of October 2026. Sources: Act '
     '68 of 2025; GCR 26-089 (AHS, July 2026); AHS Transformation Reports; Vermont RHT Program Application.', 2),
    # ---- Figure 16.5, §16.7, §16.8
    ('>RHT capital available<', '>RHT first-year award<', 1),
    ('>Vermont’s December 2025 award; aligned with Acts 167 and 68<',
     '>December 2025; awards run through FY2030, later years set annually<', 1),
    ('it is the first test of whether a state human-services agency', 'it is an early test of whether a state '
     'human-services agency', 1),
    ('The composite barely moves — Operations is last in the sequence, so nothing waits behind it.',
     'The composite falls only by Operations’ own share — no cascade, because Operations is last in the sequence '
     'and nothing waits behind it.', 1),
    # ---- Appendix H timeline row (same event)
    ('>Under CMS compliance notice (July 2026)<',
     '>Payments stopped July 31, 2026; January–July payments reprocessed as fee-for-service by January 7, 2027 '
     '(GCR 26-089)<', 1),
    # ---- Ch4 §4.3.11 (state moved to a voluntary shared EMR)
    ('RHT Program IT advance funds can support the capital investment — this is an explicitly authorized use of RHT '
     'funds',
     'Vermont’s RHT application funds incentives for voluntary adoption of a shared EMR that keeps contributing '
     'data to the VHIE', 1),
    ('in time to inform the 2028 Strategic Plan.',
     'in time to inform the 2028 Strategic Plan. The state has not waited for it: the RHT application funds '
     'incentives for voluntary adoption of a shared EMR, and AHS posted the solicitation for that program’s manager '
     'and implementation lead in May 2026.', 1),
]

H3_TITLE = 'What AHS’s Own Review Concluded — Act 119'
NEW_PARAS = [
    'The Legislature had already asked AHS to examine its own structure. Act 119 of 2024 directed the Agency to '
    'consider options for re-envisioning itself, with final recommendations due November 1, 2025. The review drew '
    'on more than 1,000 participants through discussion groups, surveys, and interviews, and AHS presented it to '
    'the Senate Committee on Government Operations in February 2026. Its headline recommendation was to keep AHS '
    'together and strengthen it as a unified agency, because “feedback consistently favored better coordination '
    'over restructuring.” Its structural changes were narrow: integrate clinical substance-use functions into the '
    'Department of Mental Health, strengthen DCF as a unified department, and enhance AHS support for Corrections. '
    'The rest became operational themes for executive leadership — strengthen alignment and capacity, connect and '
    'coordinate services, modernize technology and systems — and AHS sought no legislation that session.',
    'That finding sharpens this chapter’s prescription rather than contradicting it. The operating model below does '
    'not split the agency or redraw its departments; it adds the coordination layer Act 119’s participants asked '
    'for — HSA-level convening and a planning function — and gives it the authority to act. What the Act 119 '
    'presentation does not address is the health-system planning role Act 68 assigns AHS. That role, not the '
    'agency’s departmental map, is what the restructuring has to serve.',
]


def rep(x, old, new, n):
    if old.startswith('>') and old.endswith('<'):
        o, nw = '>' + esc(old[1:-1]) + '<', '>' + esc(new[1:-1]) + '<'
    else:
        o, nw = esc(old), esc(new)
    c = x.count(o)
    if c != n:
        raise SystemExit('COUNT %d != %d for %r' % (c, n, old[:100]))
    return x.replace(o, nw)


def strip_ids(p):
    p = re.sub(r' w14:paraId="[0-9A-F]+"', '', p)
    p = re.sub(r'<w:bookmarkStart [^>]*/>', '', p)
    return re.sub(r'<w:bookmarkEnd [^>]*/>', '', p)


def para_at(x, key):
    i = x.find(key)
    assert x.count(key) == 1, (key, x.count(key))
    return x.rfind('<w:p ', 0, i), x.find('</w:p>', i) + 6


def my_apply(x, _):
    for old, new, n in EDITS:
        x = rep(x, old, new, n)
    # new §16.2.2 after the chapter copy of the Figure 16.2 caption
    ha, hb = para_at(x, '>The Four Structural Gaps<')
    head = strip_ids(x[ha:hb]).replace('>16.2.1  <', '>16.2.2  <').replace('>The Four Structural Gaps<',
                                                                        '>' + esc(H3_TITLE) + '<')
    ba, bb = para_at(x, 'Not because AHS lacks capable people')
    body = strip_ids(x[ba:bb])
    t = list(re.finditer(r'(<w:t xml:space="preserve">)([^<]*)(</w:t>)', body))
    assert len(t) == 1, len(t)
    paras = ''.join(body[:t[0].start(2)] + esc(s) + body[t[0].end(2):] for s in NEW_PARAS)
    cap = esc('Figure 16.2 — AHS organizational gaps')
    assert x.count(cap) == 2
    ci = x.find(cap)
    cb = x.find('</w:p>', ci) + 6
    x = x[:cb] + head + paras + x[cb:]
    print('  ok: %d edits + §16.2.2 (heading + 2 paragraphs)' % len(EDITS))
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        y = my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None)
        xml.dom.minidom.parseString(y.encode())
        print('DRY OK')
    else:
        P.apply = my_apply
        P.main([{'op': 'noop'}])
