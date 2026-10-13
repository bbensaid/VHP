#!/usr/bin/env python3
"""Open items after the book-wide technology pass, 2026-10-12.

1. Subscription tiers. The book named tiers the platform does not have (Observer / Strategist / Enterprise,
   Professional / Advisory). The Research Lab is ungated (frontend/proxy.ts PROTECTED_ROUTES), so tool
   availability is stated without a tier; /subscribe now redirects to /pricing.
2. VITL vs VHCURES. VITL runs the clinical exchange; it does not carry VHCURES claims. Blueprint practice
   profiles are built from VHCURES and are "summary-level, risk-adjusted" (Onpoint, Supporting Documentation
   for Blueprint Practice Profiles). Patient-level outside-care views come through VITL: the VITLAccess
   provider portal and ADT event notifications (VITL ADT feed to PatientPing/Bamboo Health; state HIE
   steering-committee materials, 2024-25).
3. Unverified claims.
   - 32.3% avoidable ED visits: AHS Nov 2025 Act 68 report, Appendix A, "2020-2022 Oliver Wyman via
     VUHDDS/VHCURES" (not VUHDDS alone; not "November 2025 data").
   - 279%-697%: GMCB "Act 68 Update on Hospital Reference-Based Pricing and Global Budgets" (House Health
     Care, 2/17/2026), slide 7: commercial OUTPATIENT payments as % of Medicare by hospital, snapshots from
     GMCB's forthcoming price transparency tool, 2024 claims data. The slide does not name VHCURES.
   - Drug pricing: GMCB used VHCURES with the CMS maximum-fair-price lists to evaluate savings from using
     MFPs as payment limits (GMCB presentation, Act 134 work). No "2025 report modeling IRA impact" found.
   - Ch4 telehealth: RHT application activity details (AHS, House Appropriations 3/10/2026) list e-Consult
     with psychiatric consultation, telehealth-technology grants (not broadband), RPM grants, and a
     community paramedicine model. No tele-ICU and no neurology/oncology tele-consult line.
   - Appendix A (GMCB/AHS hospital transformation plans, read 2026-10-12):
       SVMC plan: no Epic migration, no $30M, no $29M cancer-center figure (oncology expansion only).
       NCH plan: Cerner CommunityWorks EHR implementation; pulmonology with UVMMC; no tele-neonatology,
         no "limited IT staff"; risks = implementation cost, hiring staff to implement, go-live disruption.
       NVRH plan: repatriation, doc-to-doc telehealth and RPM; no tele-ICU, no cardiology.
       UVMH plan: centralized statewide capacity/interfacility-transfer system; advising others on Epic.
       MAHHC plan: EMR go-live Oct 2025 disrupted data collection.
       Copley plan: AI listening/charting software; implement and expand EHR.
       Grace Cottage CEO message (9/2/2026): AI Scribe program among newly funded projects; an RHTF grant to
         configure its EMR for population-health reporting. No Coverys grant. Its plan is not posted; the
         "arduous ... antiquated and insecure" quotations could not be found anywhere — removed.
Run: python3 book-audit/fix_tiers_vitl_plans_2026-10-12.py [--dry]
"""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


# (old, new, expected count)
EDITS = [
    # --- tiers
    ('available in the Research Lab for Professional and Advisory subscribers', 'available in the Research Lab', 1),
    (' Convergence Newsletter (free weekly) for Observer subscribers.', '', 1),
    ('The following tools are available to Strategist and Enterprise subscribers:',
     'The following tools are available in the Research Lab:', 1),
    ('HTR Implementation Toolkit: available tools for Strategist and Enterprise subscribers.',
     'HTR Implementation Toolkit: tools available in the Research Lab.', 2),  # chapter + Figure Index
    ('All are available to Strategist and Enterprise subscribers at healthtransformationreview.org.',
     'All are available in the Research Lab at healthtransformationreview.org/research-lab.', 1),
    (' Convergence Newsletter (free weekly) for Observer-tier; full analysis with Vermont commentary for '
     'Strategist and Enterprise.', '', 1),
    # --- VITL vs VHCURES
    ('VITL-based health information exchange linking practices to the statewide clinical data registry and '
     'VHCURES all-payer claims database',
     'VITL’s health information exchange for clinical data, plus Blueprint practice profiles produced from the '
     'VHCURES all-payer claims database', 1),
    ('VHCURES linkage and Blueprint data reports provide this gap analysis.',
     'The practice’s own EHR registry provides this patient-level gap analysis; Blueprint practice profiles '
     'built from VHCURES claims add summary-level, risk-adjusted context on utilization and cost.', 1),
    ('Blueprint practice profiles built from VHCURES claims, alongside clinical data from VITL’s health information '
     'exchange, let the practice see utilization that occurs outside its own walls',
     'Blueprint practice profiles built from VHCURES claims show, in summary form, the utilization the '
     'practice’s attributed patients incur outside its own walls', 1),
    (' and close care gaps based on information the practice would otherwise not have.',
     '. The patient-level view needed to act on it comes through VITL’s health information exchange: '
     'clinicians viewing records from other settings in the VITLAccess portal, or receiving admission, '
     'discharge, and transfer alerts built on VITL’s ADT feed.', 1),
    # --- Ch4 data-source claims
    ('is calculated from VUHDDS hospital discharge records',
     'comes from Oliver Wyman’s analysis of 2020–2022 VUHDDS and VHCURES data', 1),
    ('the GMCB’s 2026 RBP report used VHCURES-derived 2024 claims data to show hospital prices ranging from 279% '
     'to 697% of Medicare for hospital outpatient services overall',
     'the GMCB’s February 2026 Act 68 update to the legislature, drawing on 2024 claims data from its '
     'forthcoming hospital price transparency tool, showed commercial outpatient prices ranging from about 279% '
     'to 697% of Medicare by hospital', 1),
    ('GMCB’s 2025 report on drug pricing used VHCURES to model the impact of IRA drug negotiations on Vermont '
     'spending',
     'GMCB’s prescription drug affordability work used VHCURES with the Medicare negotiated-price lists to '
     'estimate what Vermont could save by using those prices as payment limits', 1),
    ('Vermont’s November 2025 data shows 32.3% of all ED visits are potentially avoidable',
     'AHS’s November 2025 transformation report, using Oliver Wyman’s analysis of 2020–2022 data, shows 32.3% '
     'of all ED visits are potentially avoidable', 1),
    # --- Ch4 telehealth (RHT application activity details)
    ('Vermont’s telehealth strategy from the RHT application has four specific applications: specialty '
     'consultations (neurology, psychiatry, oncology) at rural hospitals; tele-ICU support for rural hospitals '
     'managing critical patients before transfer; tele-behavioral health for community mental health and CCBHC '
     'services; and community paramedicine',
     'Vermont’s RHT application funds four technology-enabled access initiatives: a statewide e-Consult '
     'platform giving primary care an interoperable route to specialists, with real-time psychiatric '
     'consultation for pediatric and perinatal providers; grants to rural independent practices for secure '
     'telehealth platforms and connected diagnostic tools (explicitly not broadband); remote patient monitoring '
     'grants for home health, primary care, and community paramedicine settings; and a mobile integrated health '
     'and community paramedicine model', 1),
    ('enabling EMTs and paramedics to provide extended care in patients’ homes with real-time physician '
     'supervision via telehealth, reducing 911 calls and ED visits for non-emergency conditions.',
     'specially trained paramedics, Advanced EMTs, and EMTs delivering protocol-driven post-discharge and '
     'primary-care follow-up in patients’ homes under physician or nurse-practitioner oversight.', 1),
    # --- Appendix A hospital plans
    ('Technology for acuity management and transfers',
     'Centralized statewide capacity and interfacility-transfer system', 1),
    ('$29M cancer center; Epic migration ($30M)', 'oncology expansion', 1),
    ('pulmonology; tele-neonatology', 'pulmonology; Cerner CommunityWorks EHR implementation', 1),
    ('Limited IT staff; depends on CIN shared services',
     'EHR implementation cost and staffing; go-live volume disruption', 1),
    ('cardiology; tele-ICU', 'service repatriation; doc-to-doc telehealth and RPM', 1),
    ('ambient AI scribe (Coverys grant)', 'AI scribe and EMR reporting upgrade (2026 grants)', 1),
    ('SVMC Epic migration ($30M); CVMC/Porter acuity tech; Grace Cottage EMR interfaces and ambient AI scribe',
     'NCH Cerner CommunityWorks EHR; UVMH statewide capacity and transfer system; Copley AI charting software; '
     'Grace Cottage AI scribe and EMR reporting upgrade', 1),
]

# Appendix A §"What the plans reveal" — the Grace Cottage quotations could not be sourced. Replace from the
# sentence start to its end; the middle is located by its two ends because the quotes may sit in split runs.
GC_START = 'Interoperability remains solved only on paper'
GC_END = 'because secure interoperability does not yet connect Vermont’s system.'
GC_NEW = ('Interoperability remains solved only on paper — the plans treat it one organization at a time: North '
          'Country is replacing its EHR outright, Mt. Ascutney reports that its October 2025 EMR go-live disrupted '
          'its data collection, and UVM Health describes advising other organizations on moving to Epic.')


def rep(x, old, new, n):
    c = x.count(old)
    if c != n:
        raise SystemExit('COUNT %d != %d for %r' % (c, n, old[:90]))
    return x.replace(old, new)


def my_apply(x, _):
    import re
    for old, new, n in EDITS:
        x = rep(x, esc(old), esc(new), n)
    # Grace Cottage sentence: must lie inside one paragraph
    a = x.find(esc(GC_START)); b = x.find(esc(GC_END))
    assert x.count(esc(GC_START)) == 1 and x.count(esc(GC_END)) == 1 and a < b, (a, b)
    assert '</w:p>' not in x[a:b], 'GC sentence spans paragraphs'
    seg = x[a:b + len(esc(GC_END))]
    # keep the first run's text node; drop text in any later runs of the span
    first_t_end = seg.find('</w:t>')
    if first_t_end == -1:
        x = x[:a] + esc(GC_NEW) + x[b + len(esc(GC_END)):]
    else:
        rest = seg[first_t_end:]
        rest = re.sub(r'(<w:t(?: [^>]*)?>)[^<]*', r'\1', rest)
        # run boundaries are kept (now empty); any text after GC_END in the last run is outside seg, untouched
        x = x[:a] + esc(GC_NEW) + rest + x[b + len(esc(GC_END)):]
    print('  ok: %d edits + Appendix A interoperability sentence' % len(EDITS))
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
