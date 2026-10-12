#!/usr/bin/env python3
"""Chapters 4 and 5 (Technology pillar) — corrections and updates, 2026-10-12.

Every change is sourced; the source for each is noted beside it. Claims that
could not be verified were removed rather than reworded.
Run:  python3 book-audit/fix_ch04_ch05_2026-10-12.py [--dry]
"""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(REPO, 'book-build'))
import patch_docx as P

CH4 = 'Chapter 4: The Technology Pillar'
CH5 = 'Chapter 5: The Technology Pillar in Practice'


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def rep(s, old, new, n=1):
    c = s.count(old)
    if c != n:
        raise SystemExit('COUNT %d != %d for %r' % (c, n, old[:100]))
    return s.replace(old, new)


def sub(s, old_plain, new_plain):
    """Substring replace inside run text (both given as plain text)."""
    return rep(s, esc(old_plain).replace('&amp;amp;', '&amp;'), esc(new_plain))


def para_of(s, marker):
    if s.count(marker) != 1:
        raise SystemExit('PARA marker count %d: %r' % (s.count(marker), marker[:80]))
    i = s.find(marker)
    return s.rfind('<w:p ', 0, i), s.find('</w:p>', i) + len('</w:p>')


def set_text(s, marker, text):
    """Replace the whole text of a single-run paragraph/cell."""
    a, b = para_of(s, esc(marker))
    p = s[a:b]
    hits = list(P.TXT.finditer(p))
    if len(hits) != 1:
        raise SystemExit('set_text needs 1 run, got %d: %r' % (len(hits), marker[:60]))
    m = hits[0]
    return s[:a] + p[:m.start(1)] + esc(text) + p[m.end(1):] + s[b:]


def del_para(s, marker):
    a, b = para_of(s, esc(marker))
    return s[:a] + s[b:]


def clone_runs(p_xml, texts):
    p_xml = re.sub(r' w14:paraId="[0-9A-F]+"', '', p_xml)
    hits = list(P.TXT.finditer(p_xml))
    if len(hits) != len(texts):
        raise SystemExit('clone_runs: %d runs vs %d texts' % (len(hits), len(texts)))
    out, prev = [], 0
    for m, t in zip(hits, texts):
        out += [p_xml[prev:m.start(1)], esc(t)]
        prev = m.end(1)
    return ''.join(out) + p_xml[prev:]


# ════════════════════════════════════════════════════════════════════ CH 4
def ch4(s):
    # §4.2.2 Fig 4.2 — unsourced characterisation removed (GMCB: VHCURES holds ~60% of commercial)
    s = sub(s, 'The 40% of commercially insured Vermonters in ERISA self-insured employer plans — many of them '
               'higher-income, higher-resource patients — are not in VHCURES unless their employer voluntarily submits.',
            'The roughly 40% of commercially insured Vermonters missing from VHCURES are mostly members of '
            'self-insured employer plans, which are not in VHCURES unless the employer voluntarily submits.')
    # §4.3 — REC/2009 claim unverified; VITL eHealth Exchange connection from VITL 2024 Annual Report
    s = sub(s, 'Vermont has been building this infrastructure since 2009, when VITL was designated as the Regional '
               'Extension Center to help primary care providers adopt electronic health records.',
            'VITL also connects Vermont to national exchange: in 2024 it established an eHealth Exchange connection '
            'to deliver Continuity of Care Documents into UVM Health Network’s EHR.')
    # §4.3.3 — statutory cite per 2026 Health IT-Fund Report (18 V.S.A. § 9352)
    s = sub(s, 'Act 61 of 2009 designated VITL as the ', 'Vermont statute — 18 V.S.A. § 9352 — designates VITL as the ')
    s = sub(s, 'That designation was defensible in 2009.', 'That designation was defensible when it was made.')
    s = sub(s, 'Seventeen years later the same provision', 'More than fifteen years later the same provision')
    # $100M cumulative unverified → FY2027 VITL agreements (2026 Health IT-Fund Report)
    s = sub(s, 'Vermont has now spent well over $100 million cumulatively on HIT and HIE infrastructure since 2009.',
            'In state fiscal year 2027 alone, the State’s agreements with VITL total about $12 million — roughly '
            '$7.0 million for core operations and $5.0 million for exchange design and development.')
    # Fig 4.4 — "weekly" refresh unverified; source doc renamed to what exists
    s = sub(s, 'prioritized around the weekly-refreshed MDWAS pipeline rather than the lagging VHCURES feed',
            'prioritized around the MDWAS pipeline rather than the lagging VHCURES feed')
    s = sub(s, 'Sources: Vermont UHDS Transition Plan; DVHA HIE program documentation.',
            'Sources: VITL Platform RFP (May 2025); AHS Act 68 §10 report (January 2026); DVHA HIE program '
            'documentation.')
    # §4.3.7 — $14M not found in any source; AHS Jan 2026 report language instead
    s = sub(s, 'Vermont’s program materials put that avoidable burden at ',
            'AHS’s January 2026 report to the Legislature puts it plainly: without an integrated dataset, provider '
            'groups and payers “must resort to manual chart abstraction” to obtain blood pressures, HbA1c results, '
            'and depression-screening follow-up')
    s = rep(s, '>over $14 million annually statewide<', '><')
    # §4.3.8 — MDWAS went live early Jan 2026 (AHS Act 68 §10 report; JFO Health IT-Fund Report)
    s = sub(s, ', live since November 2024, rather than through VHCURES. The reason is timeliness: MDWAS refreshes '
               'weekly and carries an integrated opt-out consent model compliant with Act 53, where VHCURES operates '
               'on a 12-to-18-month reporting lag, lacks an opt-out mechanism, and',
            ', which began a rolling go-live in November 2025 and went live in early January 2026, rather than '
            'through VHCURES. The reason is timeliness: MDWAS links Medicaid members’ VHIE clinical data with '
            'Medicaid claims inside the State’s own system, where VHCURES operates on a 12-to-18-month reporting '
            'lag, is de-identified for end users, and')
    s = set_text(s, 'Population coverage scales in three deliberate phases',
                 'Population coverage scales in three deliberate phases, as AHS laid them out for the Legislature in '
                 'January 2026: Medicaid linked clinical and claims data went live in January 2026; Medicare claims, '
                 'statewide clinical data, and health-related social needs data are planned for 2028–2029; and '
                 'commercial claims for 2029–2030.')
    s = sub(s, 'Medicaid represents roughly 24% of Vermont’s primary coverage and Medicare 21% and rising, with '
               'commercial and private coverage accounting for roughly half the state.',
            'Medicaid is the primary coverage of roughly 24% of Vermonters and Medicare of 21% (2021 Vermont '
            'Household Health Insurance Survey), with private coverage accounting for roughly half the state.')
    # §4.3.9 — privacy tiers restated to what AHS's report actually says
    s = set_text(s, 'Concentrating this much health data in one place requires a correspondingly rigorous privacy',
                 'Concentrating this much health data in one place requires a correspondingly rigorous privacy '
                 'architecture, and the design AHS has described applies protection by data sensitivity rather than '
                 'a single blanket policy. General medical information flows under the opt-out consent model that '
                 'Act 53 of 2019 established for the exchange. Substance use disorder records governed by 42 CFR '
                 'Part 2 require granular opt-in consent, with role-based access and an audit trail for every '
                 'access. Public reports withhold statistics for groups small enough to risk re-identification, '
                 'consistent with State and CMS cell-size suppression policies. And payer and provider proprietary '
                 'prices can be converted into price-standardized utilization units — HealthPartners’ Total Cost of '
                 'Care resource-use units, already used by the Blueprint for Health — rather than exposing raw '
                 'negotiated rates.')
    # ransomware facts corrected; unsourced COVID and "continuity channel" claims removed
    s = set_text(s, 'Vermont has direct evidence on both sides of this ledger.',
                 'Vermont has direct evidence of the concentration risk. In October 2020 a ransomware attack on the '
                 'University of Vermont Health Network encrypted some 1,300 servers, put UVM Medical Center’s '
                 'clinicians on paper for nearly a month — restoring the electronic record took 28 days — and cost '
                 'the network an estimated $63 million to $65 million against $30 million of cyber insurance. A '
                 'consolidated statewide data asset raises the stakes of exactly that kind of event, which is why '
                 'the tiered privacy design above has to be matched by the shared cybersecurity capability '
                 'described in Chapter 5 (§5.5).')
    # $195M is the first-year award (HHS TAGGS FY2026 award to AHS)
    s = sub(s, 'Vermont’s $195 million RHT investment becomes', 'Vermont’s first-year $195 million RHT award becomes')
    # §4.3.11 — vendor mapping unverified; UVMHN Epic consolidation verified (GMCB-approved $151.7M project)
    s = sub(s, 'Vermont’s 14 hospitals currently use four different EHR vendors — Epic (dominant at UVMMC), Oracle '
               'Health (formerly Cerner), TruBridge (formerly CPSI, used by smaller community hospitals), and '
               'Meditech — plus various additional software',
            'Vermont’s 14 hospitals do not share an EHR: UVM Health Network consolidated its hospitals onto Epic '
            'under a $151.7 million project the GMCB approved, while the independent community hospitals run a mix '
            'of other vendors’ certified systems — plus various additional software')
    s = sub(s, 'across Vermont’s four EHR platforms', 'across Vermont’s EHR platforms')
    # §4.4 — CMS RHT state abstracts; "one of four states" unsupported
    s = set_text(s, 'Vermont’s Rural Health Transformation Program application includes one of the most significant',
                 'Vermont’s Rural Health Transformation Program application includes one of the most significant '
                 'technology investments in its first-year $195M award: a Clinically Integrated Network (CIN) linking '
                 'Vermont’s hospitals and community providers into a coordinated clinical and data-sharing '
                 'infrastructure. CMS’s published abstract of the application lists “Establishing a Clinically '
                 'Integrated Network of Shared Services” as one of Vermont’s five core initiatives; Ohio’s '
                 'application likewise builds rural innovation hubs around clinically integrated networks.')
    # §4.5 — who FHIR is actually mandated for (CMS-9115-F 2020; ONC Cures Act rule)
    s = sub(s, 'is the HL7 standard for healthcare data exchange that CMS mandated for payers and providers beginning '
               'in 2021 and 2022.',
            'is the HL7 standard for healthcare data exchange that federal rules made mandatory on two fronts: '
            'CMS’s 2020 Interoperability and Patient Access rule required Medicare Advantage, Medicaid, CHIP, and '
            'federally facilitated exchange plans to offer a FHIR Patient Access API from July 2021, and ONC’s Cures '
            'Act certification rule required certified EHRs to offer a standardized FHIR API by December 31, 2022.')
    s = set_text(s, 'Patient matching across facilities: Without FHIR-based master patient index integration',
                 'Patient matching across facilities: Reliable matching across organizations depends on a shared '
                 'identity service. The VHIE has one — its Verato-based master patient index (§4.3.6) — but '
                 'providers who are not connected to the exchange sit outside it. (Community meeting participants '
                 'also described contacting 31 separate EMS agencies to arrange patient transfers; that is a '
                 'coordination failure the RHT-funded centralized transfer center in §4.3.10 is designed to fix, not '
                 'a FHIR problem.)')
    s = set_text(s, 'Vermont’s larger hospitals — particularly UVMMC with its Epic EHR — are FHIR-compliant',
                 'Vermont’s larger hospitals — UVM Health Network’s, on Epic, in particular — run EHRs certified to '
                 'ONC’s standardized FHIR API criterion (§170.315(g)(10)), which every certified EHR has had to '
                 'support since the end of 2022. The payer-side FHIR APIs — Patient Access, Provider Access, '
                 'Payer-to-Payer, and Prior Authorization — are obligations of payers, not hospitals (Chapter 5, '
                 'Figure 5.1). The critical gap is at community-based providers — designated mental health agencies, '
                 'skilled nursing facilities, home health agencies — that were never eligible for the federal EHR '
                 'incentive programs and often lack certified systems, and at smaller hospitals whose certified APIs '
                 'exist but are not yet configured for exchange.')
    # Fig 4.6 — by provider category; unverified vendor/hospital pairings and payer claims removed
    s = set_text(s, 'Full FHIR R4 compliance', 'Certified FHIR R4 API in production')
    s = set_text(s, 'UVMMC (Epic); Vermont hospitals on Oracle Health (Cerner) post-2022 upgrade; major commercial',
                 'Hospitals running a (g)(10)-certified EHR version with FHIR endpoints in use — including UVM Health '
                 'Network’s hospitals on Epic. Any hospital’s certified version can be checked on ONC’s Certified '
                 'Health IT Product List.')
    s = set_text(s, 'Partial FHIR implementation', 'Certified API, not yet configured for exchange')
    s = set_text(s, 'Community hospitals on Meditech Expanse (FHIR-capable but may require configuration)',
                 'Hospitals whose certified products include the FHIR API but whose endpoints are not yet used for '
                 'cross-organization exchange')
    s = set_text(s, 'Smaller community hospitals on TruBridge legacy; most Designated Mental Health Agencies',
                 'Most designated mental health agencies; many skilled nursing facilities and home health agencies; '
                 'independent practices on older, uncertified EHR versions')
    s = sub(s, 'Figure 4.6 — Vermont FHIR compliance landscape (estimated as of 2026). Sources: AHS Legislative '
               'Presentation January 2025; Vermont RHT Program Application; GMCB HIE connectivity criteria.',
            'Figure 4.6 — Vermont FHIR readiness by provider category (estimated, 2026); payer APIs are covered in '
            'Figure 5.1. Sources: ONC Cures Act Final Rule (2020); ONC Certified Health IT Product List; AHS '
            'Legislative Presentation January 2025; Vermont RHT Program Application.')
    # §4.6.1 AI scribes — State's 2-hour figure vs. the evidence (JAMA 2026; NEJM AI 2025; KFF 2026)
    s = sub(s, 'The application cites that AI scribes automate an average of over two hours of daily administrative '
               'work by transcribing and processing clinician-patient conversations.',
            'The application cites that AI scribes automate an average of over two hours of daily administrative '
            'work by transcribing and processing clinician-patient conversations. The State’s own grant terms will '
            'not test that figure: KFF Health News reported in 2026 that Vermont’s AI-scribe funding opportunity '
            'asks recipients to report how many clinicians and patients the technology serves, not how much time it '
            'saves.')
    s = set_text(s, 'This is a direct response to a Vermont workforce problem',
                 'This is a direct response to a Vermont workforce problem: documentation burden is a primary driver '
                 'of clinician burnout and attrition, and it reduces Vermont’s effective primary care capacity at a '
                 'moment when the primary care FTE shortage is already projected at 370 by 2030. Even the modest '
                 'savings the best evidence supports — roughly 15 to 30 minutes per clinician per day — add clinical '
                 'capacity without new hiring.')
    s = set_text(s, 'The evidence base for AI scribe technology is strong and growing.',
                 'The evidence is real but far more modest than the State’s two-hour figure. The largest study to '
                 'date, published in JAMA in 2026, followed 8,581 ambulatory clinicians at five academic health '
                 'systems and found ambient-scribe adoption associated with 16 fewer minutes of documentation time '
                 'per eight scheduled patient hours — about a 10% reduction — and roughly 27 fewer minutes among '
                 'clinicians who used the tool in at least half their visits, with no significant change in '
                 'after-hours EHR time. A randomized trial at UCLA (NEJM AI, 2025) found that one of two scribe '
                 'products cut the time spent writing each note by 9.5% while the other produced no significant '
                 'change. The planning number for Vermont should be minutes, not hours.')
    # §4.6.3 broadband — RHT narrative's own definition; contested "allowable use" sentence removed
    s = sub(s, 'the RHT application notes that 80% of rural Vermonters have broadband access, compared to 85% in '
               'non-rural areas.',
            'the RHT application notes that 80% of Vermonters living outside Chittenden County have broadband access, '
            'compared to 85% inside it.')
    s = sub(s, ' The RHT Program’s explicit inclusion of broadband infrastructure as an allowable use reflects this '
               'reality.', '')
    # §4.6.4 — cross-reference named; MASAI evidence (Lancet Oncol 2023; Lancet Digit Health 2025; Lancet 2026)
    s = sub(s, 'The book’s later discussion of diagnostic AI maturation', 'Chapter 13’s discussion of diagnostic AI '
            'maturation (§13.3.2)')
    s = sub(s, 'AI-assisted radiology reading — which has demonstrated accuracy equal to or exceeding specialist '
               'readers for specific modalities like chest X-ray, mammography, and retinal imaging — can partially '
               'close this quality gap without requiring additional specialist recruitment.',
            'The strongest evidence is in breast screening. In Sweden’s MASAI randomized trial of more than 100,000 '
            'women, AI-supported reading cut radiologists’ screen-reading workload by 44% in an early analysis, '
            'detected 29% more cancers than standard double reading with no rise in false positives in a 2025 '
            'analysis, and in its final results (The Lancet, 2026) was followed by 12% fewer interval cancers. '
            'Evidence of that quality does not yet exist for most other modalities, but where it does, AI support '
            'can partially close this quality gap without requiring additional specialist recruitment.')
    # §4.6.5 — GMCB price transparency project now public (Release 2 methods, 9 July 2026)
    s = sub(s, 'GMCB was already developing a hospital price transparency dashboard as of February 2026 (first '
               'release forthcoming), providing the public with access to 2024 claims data showing hospital prices '
               'relative to Medicare.',
            'GMCB’s hospital price transparency project, built with Onpoint Health Data (its VHCURES vendor), has '
            'moved into public release — the methods documentation for its second release was published on July '
            '9, 2026.')
    # §4.7 — cross-ref named; Vermont Acts 101 and 156 of 2026 (enacted texts read)
    s = sub(s, 'The book’s later discussion of AI governance as a clinical requirement — moving from a quality '
               'initiative to a regulatory requirement as FDA, ONC, and CMS develop AI governance frameworks — '
               'applies to Vermont with specific urgency.',
            'Chapter 5 (§5.3) traces AI governance moving from a quality initiative to a regulatory requirement as '
            'FDA, ONC, HHS’s Office for Civil Rights, and CMS write rules for clinical algorithms. That shift applies '
            'to Vermont with specific urgency.')
    s = sub(s, 'Vermont does not currently have a statewide AI governance framework for clinical AI.',
            'Vermont does not yet have a statewide governance framework for clinical AI, though the Legislature has '
            'started. Act 156 of 2026 makes it unprofessional conduct for a mental health professional to deliver '
            'therapy through AI systems alone, and Act 101 of 2026 adds the Secretary of Human Services and a '
            'Vermont Medical Society appointee to the State’s Artificial Intelligence Advisory Council and directs '
            'it to recommend statutory changes — including on generative AI in the regulated professions and AI in '
            'insurance utilization review — by January 15, 2027.')
    # §4.7.1 — list duplicated Ch5 §5.3; replaced by three near-term requirements + legal anchor (45 CFR 92.210)
    s = set_text(s, 'Drawing on the AI Governance Checklist and Vermont’s specific clinical AI deployment context',
                 'Chapter 5 sets out the full lifecycle a clinical AI program needs. Three requirements belong in '
                 'Vermont’s grant terms and Strategic Plan now, because public money is already buying the tools. '
                 'First, pre-deployment bias testing — which is no longer only good practice: since May 1, 2025, the '
                 'federal Section 1557 nondiscrimination rule (45 CFR § 92.210) has required covered health programs '
                 'to make reasonable efforts to identify patient care decision support tools that use race, color, '
                 'national origin, sex, age, or disability as inputs, and to mitigate the risk of discrimination from '
                 'each; that provision was not among those a federal court vacated in October 2025. Second, patient '
                 'notice whenever AI is involved in a patient’s care. Third, vendor accountability written into '
                 'contracts — performance monitoring, bias-testing disclosure, and incident reporting, with remedies '
                 'for underperformance.')
    for m in ('Pre-deployment bias testing: Any AI model used for clinical decision support',
              'Performance monitoring: Deployed AI tools must have ongoing performance monitoring',
              'Transparency requirements: Patients must be informed when AI tools are involved',
              'Vendor accountability: Technology vendors providing clinical AI to Vermont providers',
              'Equity monitoring: AI performance must be specifically monitored'):
        s = del_para(s, m)
    # Fig 4.7 — cells
    s = set_text(s, 'FHIR R4 APIs: CMS-mandated payer and provider APIs; expanding to community providers via RHT grants',
                 'FHIR R4 APIs: ONC-certified EHR APIs; CMS-0057-F payer APIs from 2027; expanding to community '
                 'providers via RHT grants')
    s = set_text(s, 'CommonWell / Carequality: national network connectivity for out-of-state care records',
                 'National networks (eHealth Exchange, Carequality, CommonWell) and TEFCA: out-of-state care records')
    s = set_text(s, 'EHR systems at 14 hospitals: Epic (UVMMC, CVMC), Oracle Health (others), TruBridge (CAHs), '
                    'Meditech (others)',
                 'EHR systems at 14 hospitals: Epic across UVM Health Network; a mix of other certified vendors at '
                 'independent hospitals')
    # §4.10
    s = sub(s, 'Your VHCURES attribution file already exists. If you have not analyzed it — understood which patients '
               'are attributed to your hospital,',
            'The population data your first global-budget year depends on already exists in VHCURES, which GMCB '
            'makes available to approved users through its data-release process. If you have not analyzed it — '
            'understood which patients use your hospital,')
    s = sub(s, 'Vermont’s $195M RHT award includes capital', 'Vermont’s first-year $195M RHT award includes capital')
    s = sub(s, 'for a 14-hospital system with 6,000+ providers on a limited budget', 'for a 14-hospital system on a '
            'limited budget')
    # Key concepts + Sources
    s = sub(s, ' The HL7 standard for healthcare data exchange, mandated by CMS for payers and providers beginning '
               '2021–2022.',
            ' The HL7 standard for healthcare data exchange. Federal rules require it of certified EHRs (ONC '
            '§170.315(g)(10), since 2022) and of Medicare Advantage, Medicaid, CHIP, and federally facilitated '
            'exchange plans (CMS Patient Access API since 2021; expanded payer APIs under CMS-0057-F from 2027).')
    s = sub(s, '2024–2025 federal regulatory changes have begun easing some Part 2 barriers.',
            'The February 2024 Part 2 final rule (compliance required by February 16, 2026) aligned it more closely '
            'with HIPAA, including a single patient consent for all future treatment, payment, and health care '
            'operations uses.')
    s = sub(s, 'JAMA Network Open ambient scribe quality improvement study (2024);',
            'Rotenstein et al., JAMA (2026), ambient AI scribes at five academic health systems; Lukac et al., NEJM '
            'AI (2025), randomized trial of two ambient scribes; KFF Health News on Vermont’s AI-scribe grants '
            '(2026); MASAI trial (Lancet Oncology 2023; Lancet Digital Health 2025; The Lancet 2026); AHS, Act 68 '
            '§10 report on integration of health care data (January 15, 2026); Vermont Health IT-Fund Annual Report '
            '(2026); VITL 2024 Annual Report and VITL Platform RFP (May 2025); CMS Rural Health Transformation '
            'Program state abstracts; 45 CFR § 92.210 and HHS Notice of Vacatur (June 2026); Vermont Acts 101 and '
            '156 of 2026; Vermont Household Health Insurance Survey (2021);')
    return s


# ════════════════════════════════════════════════════════════════════ CH 5
def ch5(s):
    # Fig 5.1 — (g)(10) is an ONC certification criterion; apps aren't certified; payer APIs under CMS-0057-F
    cells = [
        ('Patient access API (§170.315(g)(10))', 'Patient access API (ONC §170.315(g)(10))'),
        ('Patients can access their health records through third-party apps',
         'Patients — and the apps they choose — retrieve their records through a standardized FHIR R4 / US Core '
         'API. Every certified EHR must offer it, and Medicare’s Promoting Interoperability program requires '
         'hospitals to use certified technology.'),
        ('EHR must expose FHIR R4 patient access endpoint',
         'EHR version certified to (g)(10) on ONC’s Certified Health IT Product List; SMART App Launch '
         'authorization configured; published FHIR endpoint. Patient apps are not certified — the patient chooses '
         'them.'),
        ('Required compliance — all Vermont hospitals must be compliant.',
         'Baseline compliance for every Vermont hospital. Check smaller CAHs’ certified versions on the CHPL.'),
        ('Provider access API (care coordination)', 'Provider-to-provider query (care coordination)'),
        ('EHR-to-EHR FHIR query capability',
         'EHR-to-EHR query capability; master patient index for matching across organizations; a trust framework '
         '— eHealth Exchange, Carequality, CommonWell, or TEFCA, whose designated QHINs must support facilitated '
         'FHIR exchange; consent management.'),
        ('Payer-to-provider API (prior authorization and formulary)',
         'Payer APIs — Provider Access and Prior Authorization (CMS-0057-F)'),
        ('Electronic prior authorization using FHIR-based DA Vinci implementation guides',
         'Impacted payers must expose FHIR APIs that let in-network providers retrieve a patient’s claims and '
         'clinical data and request prior authorization electronically (Da Vinci CRD, DTR, and PAS guides), '
         'generally by January 1, 2027.'),
        ('EHR must support CRD (Coverage Requirements Discovery)',
         'EHR support for CRD, DTR, and PAS. Impacted payers in Vermont are Vermont Medicaid and Medicare Advantage '
         'plans; commercial plans sold through Vermont Health Connect — a state-based exchange — are not '
         '“impacted payers” under the rule.'),
        ('Administrative simplification priority.',
         'Administrative simplification priority. Because Vermont’s commercial exchange plans fall outside '
         'CMS-0057-F, GMCB could require carriers to match the federal API standard as a condition of rate '
         'approval.'),
    ]
    for old, new in cells:
        s = set_text(s, old, new)
    s = sub(s, 'Sources: CMS Interoperability and Patient Access Rule; ONC 21st Century Cures Rule; the Technology '
               'pillar framework.',
            'Sources: CMS Interoperability and Patient Access Rule (2020); CMS Interoperability and Prior '
            'Authorization Rule (CMS-0057-F, 2024); ONC 21st Century Cures Rule (2020); TEFCA Common Agreement v2.1; '
            'the Technology pillar framework.')
    # §5.2.3 MPI
    s = sub(s, 'Vermont’s VITL network provides a master patient index for VHIE-connected providers',
            'Vermont’s VHIE runs a Verato-based master patient index for connected providers')
    s = sub(s, 'Vermont’s CIN implementation should include a dedicated master patient index as a shared service — a '
               'centralized patient identity management system that all CIN member facilities use to match patients '
               'across organizations.',
            'Vermont’s CIN implementation should extend that identity service to every CIN member rather than build '
            'a second one — a single patient identity management system that all members use to match patients '
            'across organizations.')
    # §5.3 — current regulatory landscape (FDA PCCP Dec 2024; HTI-1 / HTI-5 proposal; §92.210; CMS MA FAQ Feb 2024)
    s = sub(s, 'FDA’s AI/ML-based Software as Medical Device (SaMD) framework, ONC’s Health Data, Technology and '
               'Interoperability rule, and emerging CMS guidance on AI in Medicare Advantage all establish governance '
               'expectations for clinical AI.',
            'FDA regulates AI-enabled device software, including through its December 2024 final guidance on '
            'predetermined change control plans for models that are updated after clearance. ONC’s HTI-1 rule '
            'required certified EHRs to disclose source attributes for predictive decision support from 2025 — '
            'though ASTP/ONC’s December 2025 HTI-5 proposal would remove most of that requirement. The Section 1557 '
            'nondiscrimination rule has, since May 1, 2025, required covered health programs to identify and '
            'mitigate discrimination risk in patient care decision support tools (45 CFR § 92.210). And CMS told '
            'Medicare Advantage plans in February 2024 that algorithms cannot replace the individualized '
            'medical-necessity review coverage rules require. Federal expectations are real but unsettled, which is '
            'why a state framework cannot simply defer to them.')
    # §5.4.1
    s = sub(s, 'When 90% of alerts are overridden,', 'When most alerts are overridden,')
    # §5.5 — Vermont's own case; HHS CPGs (Jan 2024); HIPAA Security Rule NPRM still pending
    s = sub(s, 'demonstrated that a single vulnerability in a broadly used healthcare technology vendor can cascade '
               'across the entire healthcare system.',
            'demonstrated that a single vulnerability in a broadly used healthcare technology vendor can cascade '
            'across the entire healthcare system. Vermont has its own case: the October 2020 ransomware attack on '
            'UVM Health Network (§4.3.9) put UVM Medical Center on paper for nearly a month. Federal policy is '
            'moving unevenly — HHS published voluntary Cybersecurity Performance Goals for the health sector in '
            'January 2024, while its January 2025 proposal to strengthen the HIPAA Security Rule was still '
            'unfinalized in 2026, with final action listed for July 2027.')
    # Fig 5.3 cells
    s = set_text(s, 'Vermont VITL FHIR mandate; CMS interoperability rule compliance',
                 'ONC §170.315(g)(10) certification; CMS-0057-F payer APIs from 2027')
    s = set_text(s, 'Vermont AI scribe grants (RHT); ambient scribes save ~15–25 min/day/provider',
                 'Vermont AI scribe grants (RHT); ambient scribes: ~16 fewer documentation minutes per 8 patient hours '
                 '(JAMA, 2026)')
    s = set_text(s, 'Vermont rural CAH vulnerability; ransomware risk at Grace Cottage scale',
                 'UVM Health Network 2020 ransomware: 28 days to restore the EHR; ~$63–65M cost')
    # §5.7 — add the FHIR Implementation Guide row (route verified: InteroperabilityClient tab 'fhir-guide')
    i = s.find('Test whether FHIR-based exchange can deliver what a statewide EHR would')
    ra, rb = s.rfind('<w:tr>', 0, i), s.find('</w:tr>', i) + len('</w:tr>')
    row = re.sub(r' w14:paraId="[0-9A-F]+"', '', s[ra:rb])
    for old, new in (('Test whether FHIR-based exchange can deliver what a statewide EHR would, at lower cost',
                      'Plan a FHIR rollout: certified APIs, provider-to-provider exchange, and the 2027 payer APIs'),
                     ('Statewide EHR Modeler', 'FHIR Implementation Guide'),
                     (' — /research-lab/interoperability?tab=statewide-ehr', ' — /research-lab/interoperability?tab=fhir-guide'),
                     ('Where FHIR closes the gap and where it does not — the question Vermont’s feasibility assessment '
                      'must answer.',
                      'Which obligations fall on your EHR vendor, which on you, and which on your payers — and the '
                      'CHPL and CMS-0057-F checks to run first.')):
        row = rep(row, '>' + esc(old) + '<', '>' + esc(new) + '<')
    s = s[:rb] + row + s[rb:]
    # §5.8
    s = set_text(s, 'If you are a Vermont hospital executive: FHIR-based data exchange is not a future capability',
                 'If you are a Vermont hospital executive: FHIR-based data exchange is not a future capability — it '
                 'is a current federal requirement. Your EHR must be certified to ONC’s standardized FHIR API '
                 'criterion to count as certified technology, and Medicare’s Promoting Interoperability program '
                 'reduces payment to hospitals that do not use certified technology meaningfully. More practically: '
                 'by January 2027 Vermont Medicaid and Medicare Advantage plans must offer FHIR APIs for provider '
                 'data access and electronic prior authorization (CMS-0057-F). A hospital whose EHR cannot consume '
                 'them will keep doing prior authorization by fax and phone. And the State’s own integration path '
                 'runs through the VHIE and MDWAS: clinical data your EHR does not send to the exchange will not be '
                 'in the population picture the global-budget system is being built on.')
    s = set_text(s, 'If you are a Vermont legislator: Vermont’s AI governance gap is a legislative opportunity.',
                 'If you are a Vermont legislator: Vermont’s AI governance gap is a legislative opportunity, and the '
                 'Legislature has already asked for the blueprint. Act 101 of 2026 requires the State’s Artificial '
                 'Intelligence Advisory Council to recommend statutory changes by January 15, 2027. The opportunity '
                 'is to make sure that report covers clinical AI bought with public money — the RHT scribe, '
                 'diagnostic, and monitoring tools — and not only mental-health chatbots and utilization review. '
                 'Vermont has the regulatory infrastructure — GMCB, DVHA, AHS — to set standards most states lack. '
                 'The alternative — deploying AI tools without governance and writing the framework after problems '
                 'emerge — is more expensive and less credible.')
    # Key concepts
    s = sub(s, ' The fourth version of the HL7 FHIR standard, mandated by CMS for healthcare data exchange since 2021.',
            ' The fourth version of the HL7 FHIR standard — required of certified EHRs (ONC §170.315(g)(10)) and '
            'of public-program and federally facilitated exchange plans’ patient-access APIs since 2021–2022.')
    s = sub(s, ' National health data exchange networks that enable FHIR-based record sharing between health systems '
               'across organizational boundaries. VITL participates in CommonWell; Vermont CIN membership would '
               'enable access to both networks for out-of-state record retrieval.',
            ' National health data exchange networks that, with eHealth Exchange, let health systems retrieve one '
            'another’s records across organizational boundaries. VITL connected through eHealth Exchange in 2024 to '
            'deliver Continuity of Care Documents into UVM Health Network’s EHR.')
    a, b = para_of(s, 'National health data exchange networks that, with eHealth Exchange')
    src = s[a:b]
    new = ''.join(clone_runs(src, t) for t in (
        ('TEFCA', ' The Trusted Exchange Framework and Common Agreement — the federal framework connecting national '
                  'networks through designated Qualified Health Information Networks (QHINs), which must support '
                  'facilitated FHIR exchange. Participation is voluntary; organizations join through a QHIN.'),
        ('CMS-0057-F', ' CMS’s 2024 Interoperability and Prior Authorization rule. Requires Medicare Advantage, '
                       'Medicaid, CHIP, and federally facilitated exchange plans to offer Provider Access, '
                       'Payer-to-Payer, and Prior Authorization FHIR APIs, generally by January 1, 2027. Plans on '
                       'state-based exchanges such as Vermont Health Connect are not covered.'),
        ('45 CFR § 92.210', ' The Section 1557 nondiscrimination rule’s provision on patient care decision support '
                            'tools, applicable since May 1, 2025: covered health programs must make reasonable '
                            'efforts to identify tools that use protected characteristics as inputs and mitigate the '
                            'risk of discrimination.')))
    s = s[:b] + new + s[b:]
    s = sub(s, 'NEJM AI ambient scribe randomized trial (2025); JAMA ambient scribe study (2026).',
            'Lukac et al., NEJM AI (2025), randomized trial of two ambient scribes; Rotenstein et al., JAMA (2026), '
            'ambient scribes at five academic health systems; CMS Interoperability and Prior Authorization Final '
            'Rule (CMS-0057-F, 2024); TEFCA Common Agreement v2.1; ONC HTI-1 Final Rule (2023) and HTI-5 Proposed '
            'Rule (2025); FDA final guidance on predetermined change control plans for AI-enabled devices (December '
            '2024); 45 CFR § 92.210; CMS Medicare Advantage FAQs on algorithms in coverage decisions (February 2024); '
            'HHS Healthcare and Public Health Cybersecurity Performance Goals (2024); HIPAA Security Rule NPRM '
            '(January 2025); VITL 2024 Annual Report; Vermont Act 101 of 2026.')
    return s


INDEX_CAPTIONS = [
    ('Sources: Vermont UHDS Transition Plan; DVHA HIE program documentation.',
     'Sources: VITL Platform RFP (May 2025); AHS Act 68 §10 report (January 2026); DVHA HIE program documentation.'),
    ('Figure 4.6 — Vermont FHIR compliance landscape (estimated as of 2026). Sources: AHS Legislative Presentation '
     'January 2025; Vermont RHT Program Application; GMCB HIE connectivity criteria.',
     'Figure 4.6 — Vermont FHIR readiness by provider category (estimated, 2026); payer APIs are covered in Figure '
     '5.1. Sources: ONC Cures Act Final Rule (2020); ONC Certified Health IT Product List; AHS Legislative '
     'Presentation January 2025; Vermont RHT Program Application.'),
    ('Sources: CMS Interoperability and Patient Access Rule; ONC 21st Century Cures Rule; the Technology pillar '
     'framework.',
     'Sources: CMS Interoperability and Patient Access Rule (2020); CMS Interoperability and Prior Authorization Rule '
     '(CMS-0057-F, 2024); ONC 21st Century Cures Rule (2020); TEFCA Common Agreement v2.1; the Technology pillar '
     'framework.'),
]


def my_apply(x, _):
    a, b = P._chapter_span(x, 'Figure Index')
    seg = x[a:b]
    for o, n in INDEX_CAPTIONS:
        seg = sub(seg, o, n)
    x = x[:a] + seg + x[b:]
    a, b = P._chapter_span(x, CH4)
    x = x[:a] + ch4(x[a:b]) + x[b:]
    a, b = P._chapter_span(x, CH5)
    x = x[:a] + ch5(x[a:b]) + x[b:]
    print('  ok: chapters 4 and 5 edited in memory')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        x = zipfile.ZipFile(P.DOCX).read('word/document.xml').decode('utf8')
        y = my_apply(x, None)
        xml.dom.minidom.parseString(y.encode('utf8'))
        print('DRY RUN OK')
    else:
        P.apply = my_apply
        P.main([{'op': 'noop'}])
