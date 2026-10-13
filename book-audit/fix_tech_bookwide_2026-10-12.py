#!/usr/bin/env python3
"""Book-wide technology audit fixes, 2026-10-12 (after the Ch4–5 and Ch15 passes).

Sources (all read 2026-10-12):
  GMCB VHCURES Overview / data-release guide — quarterly collection; analysts allow ~6 months of claims run-out.
  AHS Nov 2025 transformation report — most measures reflect 2023 or earlier data (a reporting lag).
  JFO "RHT Projects by Dept" (Feb 2026) — AI-scribe grants $1,030,000; RPM grants $900,000;
    transformation analytics & support $15,000,000.
  AHS AI-scribe NOFO (applications due June 5, 2026); RRMC award announcement (Oct 1, 2026).
  Dec 2025 AHS report / Apr 2026 update — analytics RFP posted Oct 21, 2025; contracts "nearing completion"
    spring 2026. No source found naming McKinsey as awardee.
  APCD Council (via Colorado HCPF, Aug 2026) — 24 states have an APCD.
  Vermont DPS broadband availability (2025) — 9.92% of locations lack 100/20 Mbps; 2.70% lack 25/3.
  RHT application narrative — 80% outside Chittenden County vs 85% inside.
  Platform code — Health Equity Studio has no VHCURES/Blueprint data connection; FHIR Implementation Guide
    gives pointers to vendor API documentation; DigitalHealthLab now models 99445/99470 (CY2026 PFS).
Run: python3 book-audit/fix_tech_bookwide_2026-10-12.py [--dry]
"""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


EDITS = [
    # Ch1 Fig 1.8 — grants funded, not deployed, as of the 2026 snapshot
    ('AI scribe and RPM grants deployed. The current critical bottleneck.',
     'AI-scribe ($1.03M) and remote-monitoring ($0.9M) grant programs funded in the first RHT budget period. '
     'The current critical bottleneck.'),
    # Ch4 — VHCURES lag stated as GMCB describes it
    ('>12–18+ Mo<', '>6+ Mo<'),
    ('>Typical Data Lag<', '>Claims Run-Out Before Analysis<'),
    ('>Data lag of 12-18+ months<', '>Data lag measured in quarters<'),
    ('The most recent VHCURES data typically reflects conditions 12-18 months prior to analysis. The November 2025 '
     'AHS transformation report explicitly acknowledged that most available measures reflect 2023 or earlier data.',
     'VHCURES is collected quarterly, and analysts typically allow about six months for late-adjudicated claims to '
     'arrive before analyzing a period (GMCB). Published measures run further behind still: the November 2025 AHS '
     'transformation report acknowledged that most available measures reflect 2023 or earlier data.'),
    ('push for 60-90 day claims lag instead of 12-18 months',
     'push for a 60–90 day path from date of service to usable data'),
    ('where VHCURES operates on a 12-to-18-month reporting lag, is de-identified',
     'where VHCURES runs on quarterly collection and a six-month claims run-out, is de-identified'),
    ('For intervening in a patient’s care, a 12-month lag is not a data source; it is a historical record.',
     'For intervening in a patient’s care, data that are months old before anyone can query them are not a data '
     'source; they are a historical record.'),
    ('Enables real-time population health data that VHCURES’s 12-18 month lag cannot provide',
     'Enables near-real-time population health data that VHCURES’s quarterly, run-out-delayed claims cannot provide'),
    # Ch9 §9.5 — VITL does not carry VHCURES claims (the book's own §4.3.1: the exchange lacks claims data)
    ('Vermont’s VITL health information exchange provides claims data from VHCURES, enabling the practice to see '
     'utilization that occurs outside their own walls',
     'Blueprint practice profiles built from VHCURES claims, alongside clinical data from VITL’s health information '
     'exchange, let the practice see utilization that occurs outside its own walls'),
    # Ch10 — broadband figures; Oliver Wyman attribution; Equity Studio data claim
    ('>80% of rural Vermonters have broadband; 14% of all Vermonters lack access<',
     '>80% of Vermonters outside Chittenden County have broadband vs. 85% inside it (RHT application); statewide, '
     '9.9% of locations lack 100/20 Mbps service (Department of Public Service, 2025)<'),
    ('broadband infrastructure investment (Oliver Wyman Imperative 1)',
     'broadband infrastructure investment (an Oliver Wyman priority legislative change)'),
    ('The Health Equity Studio implements the NCQA stratification methodology against VHCURES and Blueprint data for '
     'Vermont providers.',
     'The platform’s Health Equity Studio applies this stratification logic to data a user enters or to its example '
     'presets; it does not connect to VHCURES or Blueprint data.'),
    # Ch13 — Fig 13.1, §13.2.1, §13.3.2, Fig 13.x
    ('>VHCURES operational with 2-year lag; VITL partial; no analytics vendor; AI governance absent<',
     '>VHCURES operational, but published measures ran about two years behind; VITL partial; no analytics vendor; '
     'AI governance absent<'),
    ('>Analytics vendor procurement underway; CIN in development; AI scribes deployed; FHIR upgrades in progress<',
     '>Analytics vendor procurement underway; CIN in development; AI-scribe grants funded; FHIR upgrades in progress<'),
    ('Vermont is directing its $195 million toward infrastructure that reduces ongoing structural costs: AI scribes '
     'that expand effective provider capacity, remote patient monitoring that prevents hospitalizations, and '
     'broadband and EMS investments that enable the regionalization the state needs.',
     'Vermont is directing its first-year $195 million toward infrastructure that reduces ongoing structural costs: '
     'a $15 million transformation-analytics and support contract, grants for AI scribes ($1.03 million) and remote '
     'patient monitoring ($0.9 million) that expand provider capacity and prevent hospitalizations, and EMS '
     'investments that enable the regionalization the state needs.'),
    ('with practices nationally reporting significant reductions in documentation burden.',
     'with the largest study to date (JAMA, 2026) finding real but modest savings — about 16 fewer minutes of '
     'documentation per eight scheduled patient hours (§4.6.1).'),
    ('The FDA, ONC, and CMS are developing AI-governance frameworks, but deployment is outpacing governance at every '
     'level.',
     'Federal rules are moving in both directions — the Section 1557 rule’s decision-support provision now binds '
     'covered providers, while ASTP/ONC’s HTI-5 proposal would roll back HTI-1’s transparency requirements (§5.3) — '
     'and deployment is outpacing governance at every level.'),
    ('>Two-year VHCURES data lag; incomplete FHIR at smaller hospitals; absent AI governance in most states.<',
     '>Published VHCURES-based measures about two years behind; incomplete FHIR at smaller hospitals; absent AI '
     'governance in most states.<'),
    # Ch16 — the assessment was commissioned, not statutorily mandated (HIE Strategic Plan wording)
    ('(the Act 167–mandated feasibility assessment of a statewide EHR)',
     '(the statewide-EHR feasibility assessment AHS commissioned in line with the Act 167 report)'),
    # Appendix A
    ('broadband reaches roughly 80% of rural areas, leaving 20% without the connectivity telehealth and remote '
     'monitoring require.',
     'broadband reaches roughly 80% of Vermonters outside Chittenden County, leaving one in five without the '
     'connectivity telehealth and remote monitoring require.'),
    ('The AHS Hospital Transformation Analytical Support RFP (late 2025, awarded to McKinsey) acknowledged',
     'The AHS Hospital Transformation Analytical Support RFP (posted October 2025; AHS reported in spring 2026 that '
     'the analytics contracts were nearing completion) acknowledged'),
    # Appendix D
    ('This appendix describes 19 core HTR Research Lab tools referenced throughout the book.',
     'This appendix describes 19 core HTR Research Lab tools referenced throughout the book, plus four technology '
     'tools listed after D.2.'),
    (' Integrates with VHCURES and Blueprint data.',
     ' Runs on data the user enters or on example presets; it is not connected to VHCURES or Blueprint data.'),
    ('(CPT 99453/99454/99457/99458, 6 condition modules)',
     '(CY2026 Medicare rates for CPT 99453, 99454, 99445, 99457, 99470, and 99458; 6 condition modules)'),
    # Appendix E
    ('>VHCURES operational; 2-year data lag<', '>VHCURES operational; published measures about two years behind<'),
    ('>AI-scribe grants deployed; governance absent in most institutions<',
     '>AI-scribe grant program funded ($1.03M); governance absent in most institutions<'),
    # Appendix G
    ('roughly 20 states have one.', '24 states have one (APCD Council).'),
    # Ch12 Fig 12.3 — what the tool actually provides
    ('with EHR-specific configuration notes for Epic, Oracle Health, Meditech, and TruBridge.',
     'with pointers to where Epic, Oracle Health, MEDITECH, and TruBridge document their certified APIs.'),
]

D2_ANCHOR = 'D.2 Risk Stratification Engine'
D2_EXTRA = ('Also on the Interoperability & Risk bench: the EMR/EHR Lab (vendor comparison, five-year adoption-cost '
            'model, USCDI data-quality audit, and documentation-workflow simulation); the Statewide EHR Deployment '
            'Modeler (ten-year cost, data timeliness, disruption, and vendor lock-in of one statewide EHR versus FHIR '
            'exchange across existing platforms); and the FHIR Implementation Guide (the three priority FHIR use cases '
            'step by step, with CMS-0057-F and CHPL checks). On the VBC & Clinical Quality bench, Clinical Data '
            'Exchange parses HL7 v2 messages, renders FHIR bundles, and browses USCDI data classes side by side.')

ACADEMY = [
    ('Figure 4.8 — Hands-on platform tools for the Technology Pillar.',
     'Chapter 4’s data-infrastructure argument is best understood by building on the actual standards.',
     'In the Academy: Track 3 of the companion course, Five Pillars, One Imperative — “Technology — Build the '
     'Substrate” — works this chapter in three lessons: “Data Infrastructure as the Gate,” “FHIR, Interoperability, '
     'and the Compliance Path,” and “AI Governance and Clinical Decision Support” '
     '(/academy/tracks/five-pillars-one-imperative). For depth, the Healthcare Interoperability & Data Exchange '
     'course (/academy/tracks/interoperability-data-exchange) covers FHIR, SMART on FHIR, Bulk FHIR, the CMS '
     'interoperability rules, and HIE data governance lesson by lesson.'),
    ('Figure 5.4 — Hands-on platform tools for the Technology Pillar in practice.',
     'Chapter 5’s implementation reality — AI governance, CDS, clinical data exchange, and the statewide-EHR '
     'question — maps to',
     'In the Academy: Track 3’s lessons on FHIR and on AI governance (/academy/tracks/five-pillars-one-imperative) '
     'follow this chapter’s implementation sequence, and the AI & Machine Learning in Healthcare course '
     '(/academy/tracks/ai-machine-learning-healthcare) goes deeper on FDA regulation of clinical AI and on a '
     'governance framework for responsible deployment.'),
]


def rep(x, old, new):
    c = x.count(old)
    if c != 1:
        raise SystemExit('COUNT %d != 1 for %r' % (c, old[:90]))
    return x.replace(old, new)


def my_apply(x, _):
    for old, new in EDITS:
        if old.startswith('>'):
            x = rep(x, '>' + esc(old[1:-1]) + '<', '>' + esc(new[1:-1]) + '<')
        else:
            x = rep(x, esc(old), esc(new))
    import re
    # clone the D.2 paragraph for the added technology-tools paragraph
    i = x.find(D2_ANCHOR)
    a, b = x.rfind('<w:p ', 0, i), x.find('</w:p>', i) + len('</w:p>')
    import re
    p = re.sub(r' w14:paraId="[0-9A-F]+"', '', x[a:b])
    hits = list(P.TXT.finditer(p))
    assert len(hits) == 1, len(hits)
    p = p[:hits[0].start(1)] + esc(D2_EXTRA) + p[hits[0].end(1):]
    x = x[:b] + p + x[b:]
    # Ch4 §4.9 and Ch5 §5.7 — the Academy doorway the Introduction promises (titles verified in Supabase)
    for cap, src_marker, text in ACADEMY:
        ci = x.find(esc(cap)); assert x.count(esc(cap)) == 2, cap  # chapter copy first, Figure Index copy second
        # the chapter caption, not the Figure Index copy: Figure Index comes after Chapter 16
        cb = x.find('</w:p>', ci) + len('</w:p>')
        si = x.find(esc(src_marker)); assert x.count(esc(src_marker)) == 1, src_marker
        sa, sb_ = x.rfind('<w:p ', 0, si), x.find('</w:p>', si) + len('</w:p>')
        q = re.sub(r' w14:paraId="[0-9A-F]+"', '', x[sa:sb_])
        h = list(P.TXT.finditer(q)); assert len(h) == 1, (src_marker, len(h))
        q = q[:h[0].start(1)] + esc(text) + q[h[0].end(1):]
        x = x[:cb] + q + x[cb:]
    print('  ok: %d edits + Appendix D paragraph + 2 Academy paragraphs' % len(EDITS))
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
