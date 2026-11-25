# Policy analysis (Sanity policyAnalysis) — "The Designated Monopoly" — author-approved 2026-11-25.
# Every fact is from a source opened for book Ch15 §15.8 (book-audit/deep/sources/execution/, statutes/). Nothing else.
# Run from the repo root:  python3 frontend/content/_article_vitl_designated_monopoly.py [--commit]
import json, re, sys, urllib.request, datetime

SLUG = 'vermont-designated-hie-monopoly-unified-data'
TITLE = 'The Designated Monopoly: Why Vermont’s Health Data Cannot Unify Until the Exchange Is Opened'
SUMMARY = ("Value-based care needs claims, clinical, social-determinants, and behavioral-health data unified for the same person. "
           "Vermont has legislated the goal (Act 167, Act 68's Unified Health Data Space) but routes every clinical feed through an operator the law "
           "names as “exclusive.” The public record — $38 million paid by 2016 without performance targets, 19% stakeholder satisfaction in 2018, "
           "FHIR APIs at 25% in 2024, designated agencies contributing no data in 2025 — shows what a statutory monopoly produces. "
           "The fix is structural: State-owned core assets, competitive operation, published performance, and open data.")

def b(k, t, s='normal'):
    return {'_type': 'block', '_key': k, 'style': s, 'markDefs': [], 'children': [{'_type': 'span', '_key': k + 's', 'text': t, 'marks': []}]}

P = []
def p(t, s='normal'):
    P.append(b(f'vm{len(P) + 1:03d}', t, s))

p("Every value-based reform makes the same promise: pay for outcomes and total cost of care rather than for units of service. Vermont has gone further than most states in writing that promise into law. Act 68 of 2025 moves hospitals to reference-based prices and global budgets, and it directs the Agency of Human Services to build a Unified Health Data Space (UHDS) that joins clinical, claims, and social-needs data. This analysis argues that one structural choice — the statutory designation of a single, exclusive operator for the state's health information exchange — now stands between Vermont and the unified data its reform depends on.")

p('Why unified data is the critical path', 'h2')
p("No single data source can show whether a value-based reform is working. Claims show what was paid for, across every setting, but not the result: a claim records that a blood-pressure check happened, not what the blood pressure was. Clinical records show the result, but only inside one organization and without a price. Social-determinants data explains why two patients with the same diagnosis have very different costs. Behavioral-health data — much of it held by designated mental-health agencies and protected by separate consent rules — covers the conditions that most often drive avoidable emergency visits and readmissions.")
p("The gap is not theoretical. A study cited in the Agency of Human Services' January 2026 report to the Legislature found that half of Medicaid members' cholesterol, diabetes, and kidney screenings, and their influenza vaccinations, were documented in clinical records but missing from claims. The same report notes that organizations reporting hybrid quality measures, which need claims and clinical data together, assemble them today by manual chart abstraction.")
p("Under a global budget the danger runs in a new direction. A fixed budget removes the incentive to over-treat and creates the incentive to do less. Claims alone would show that spending fell; they would not show whether patients were worse off. Only unified data — claims, clinical, social, and behavioral health, joined for the same person and seen quickly — can tell a regulator whether a budget is saving money or rationing care.", 'callout')

p('What Vermont has legislated, and when it arrives', 'h2')
p("The goal is not new. Act 167 of 2022 directed the HIE Steering Committee to “create one health record for each person” integrating claims, clinical, mental-health and substance-use, and social-determinants data, and repealed 18 V.S.A. § 9410(e), which had required confidential health information to be filed in the all-payer claims database without disclosing the person's identity. Act 68 then wrote the rules into 18 V.S.A. § 9353: integration may not begin before January 1, 2027; it requires the favorable vote of a majority of all voting members of the HIE Steering Committee; and integrated data may be used only for approved uses.")
p("Some foundations are real. Under opt-out consent, 98.9% of Vermonters' data was being shared through the exchange by February 2025. The exchange's patient-matching tool raised its cohort match rate from about 65% to more than 95%. Since January 2026 the State's Medicaid data warehouse has held linked Medicaid claims, clinical, and social-needs data. But AHS's own plan adds Medicare and statewide clinical data only in 2028–2029 and commercial claims in 2029–2030 — after the Green Mountain Care Board's reference-based prices take effect in hospital fiscal year 2028.")

p('The exclusive franchise', 'h2')
p("Section 9352 requires that VITL “be designated in the Health Information Technology Plan to operate the exclusive statewide health information exchange network for this State.” Vermont did not procure its exchange operator; it legislated one. Every phase of the Unified Health Data Space that draws clinical data, and every attempt to unify clinical data with claims, social, and behavioral-health data, runs through that franchise. No competitor sets a benchmark for price or performance. No alternative exists at contract renewal to give the State leverage. And the operator that runs the network also decides how much of the application layer — analytics, referral, care coordination, patient access — anyone else may build on the data.")

p('What the public record shows', 'h2')
p("Accountability came late. In October 2016 State Auditor Doug Hoffer reported that Vermont had paid VITL more than $38 million since 2005 under agreements that lacked performance targets, leaving the State “unable to adequately assess the performance of VITL and to demonstrate the value” of the exchange.")
p("Stakeholders noticed. The evaluation the Legislature ordered in 2017 surveyed them: only 19% said the exchange was meeting Vermont's needs, and only 21% said it was critical for VITL to manage it going forward, while 53% said it was not. Because consent was then opt-in, fewer than one in five Vermonters' records were accessible. The Legislature responded by moving the State into the driver's seat — State ownership of the Health Information Technology Plan, a State-led Steering Committee, opt-out consent from March 2020 — but it kept the exclusive designation.")
p("Modern capability lags. The HIE Strategic Plan update filed in November 2024 put “Implement FHIR APIs” — the open, standards-based interfaces on which modern applications and patient access are built — at 25% complete, projected to reach 40% by the end of 2024, and rated it only partially on track. Meanwhile Vermont is buying e-Consult platforms, closed-loop referral, a shared electronic health record, and transformation analytics through its Rural Health Transformation award as separate purchases, where an open exchange would let each of them build on one shared data foundation.")
p("Reported coverage overstates what flows. The same 2024 update listed “All DA's contributing production data to VITL” among the year's accomplishments. VITL's own participant table, presented to the House Health Care Committee in February 2025, shows the designated mental-health and specialized service agencies contributing no data, with twelve accessing it. Nursing homes and the commercial payer contributed none either. These are exactly the behavioral-health, long-term-care, and claims data that whole-person, value-based measurement needs.")
p("Oversight has narrowed. Until 2025 the Green Mountain Care Board reviewed VITL's budget. Act 62 of 2025 ended that review, leaving the contracting department as the main check on a sole-source operator.")
p("None of this requires bad faith by anyone. It is what a statutory monopoly produces. The question for Vermont is not whether its exchange operator tries hard; it is whether the State has arranged things so that the data its reform depends on flows, opens, and improves on a schedule the reform can use.", 'callout')

p('The law adds its own obstacles', 'h2')
p("The designation is not the only barrier written into statute. The version of Act 68's data section that passed the Senate required health insurers to provide clinical and claims data to the Agency of Human Services as directed; the enacted law dropped that sentence, so the State must negotiate for commercial claims rather than require them. Federal match pays roughly 90% of Medicaid data development and nothing for the commercial and Medicare phases, and § 9353 names no State source for them. And because integration needs a majority of all voting members of the Steering Committee, every vacant or absent seat counts as a “no,” while the statute sets no priority among uses.")

p('A structural fix that does not require starting over', 'h2')
p("Vermont does not need to replace its exchange. It needs to change the terms on which the exchange operates. The HTR book (Chapter 15, Figure 15.7) sets out seven changes:")
p("1. Amend § 9352 so that the State owns the core data assets — the patient index, the consent registry, the clinical repository — and contracts for their operation on fixed terms, competitively at each renewal.")
p("2. Write completeness, timeliness, and matching-accuracy targets into the contract by provider type, publish them quarterly, and attach financial consequences.")
p("3. Open the data layer: standards-based FHIR access for any certified application, so that e-Consult, referral, analytics, and patient tools compete on one shared, unified foundation.")
p("4. Fund contributor connections for designated agencies and nursing homes, within 42 CFR Part 2's consent rules, so behavioral-health and long-term-care data joins the record.")
p("5. Guarantee that data, the patient index, and consent records transfer to any successor operator.")
p("6. Build a second, State-controlled ingestion path, starting with the clinical data already flowing into the Medicaid data warehouse, so the reform has no single point of failure.")
p("7. Restore independent review of the operator's budget and performance by a body other than the contracting department.")
p("Alongside those changes, the Legislature should restore the insurer-reporting requirement the Senate passed, name a State source for the multi-payer and commercial phases of the Unified Health Data Space, and require AHS to publish its priority uses — price and global-budget monitoring, quality payment, behavioral-health integration, rural-transformation outcomes — before the first § 9353 vote.")

p('Beyond Vermont', 'h2')
p("Every state attempting value-based payment faces the same dependency: total cost lives in claims, outcomes live in clinical records, and the causes of both live in social and behavioral-health data that neither captures. Vermont's experience offers three lessons. Put the unification mandate, the insurer-reporting requirement, and the funding in the same statute. Sequence price regulation behind the unified data that can see its effects. And never grant a single operator an exclusive franchise over the data everyone else must build on: own the core assets publicly, contract for their operation competitively, and open the data layer to innovation.")

p('Sources', 'h2')
for s in [
    "HTR book, Transforming Healthcare (v42), Chapter 15, §15.8 and Figures 15.6–15.7 — https://healthtransformationreview.org/read/chapter-15",
    "18 V.S.A. § 9352 (designation of VITL) — https://legislature.vermont.gov/statutes/section/18/219/09352",
    "18 V.S.A. § 9353 (Unified Health Data Space) — https://legislature.vermont.gov/statutes/section/18/219/09353",
    "18 V.S.A. § 9410 (subsection (e) repealed; amendment history cites Act 167 of 2022, § 5) — https://legislature.vermont.gov/statutes/section/18/221/09410",
    "Agency of Human Services, Act 68 Section 10 — Integration of Health Care Data (Jan 14, 2026) — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Reports%20and%20Resources/W~Agency%20of%20Human%20Services~Act%2068%20Section%2010%20-%20Integration%20of%20Health%20Care%20Data%20~1-15-2026.pdf",
    "Vermont Business Magazine, “Audit: Millions spent on VITL, outcomes unknown” (Oct 3, 2016), on State Auditor Doug Hoffer's report — https://vermontbiz.com/node/179095",
    "Evaluation of Vermont Health Information Technology Activities (Jan 2018), stakeholder survey — https://legislature.vermont.gov/Documents/2018/WorkGroups/House%20Health%20Care/Vermont%20Information%20Technology%20Leaders--VITL/W~Michael%20Costa~Evaluation%20of%20Vermont%20Information%20Technology%20Activities~1-11-2018.pdf",
    "VITL, 2021 Annual Report (Jan 14, 2022) — https://legislature.vermont.gov/Documents/2022/WorkGroups/House%20Health%20Care/Reports%20and%20Resources/W~Vermont%20Information%20Technology%20Leaders~Vermont%20Health%20Information%20Exchange%20Annual%20Report~1-14-2022.pdf",
    "VITL, About VITL and the Vermont Health Information Exchange (Feb 4, 2025) — https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Orientation/W~Beth%20Anderson~About%20VITL%20and%20the%20Vermont%20Health%20Information%20Exchange~2-4-2025.pdf",
    "Agency of Human Services, HIE Strategic Plan 2024 Update — https://healthdata.vermont.gov/sites/healthdata/files/documents/HIE%20Strategic%20Plan_2024%20Update.pdf",
    "Act 62 of 2025 (end of GMCB review of VITL's budget) and Act 68 of 2025 — https://legislature.vermont.gov",
]:
    p(s)

doc = {'_type': 'policyAnalysis', '_id': SLUG, 'slug': {'_type': 'slug', 'current': SLUG}, 'title': TITLE,
       'pillar': 'Technology', 'secondaryPillars': ['Policy', 'Economics'], 'category': 'Data Security & Governance',
       'chapterRef': '15', 'impactLevel': 'High', 'status': 'Active',
       'publishedAt': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'), 'summary': SUMMARY, 'body': P}
words = sum(len(x['children'][0]['text'].split()) for x in P if x['style'] != 'h2')
print(f"blocks={len(P)} sections={sum(1 for x in P if x['style'] == 'h2')} words={words}")
if '--commit' in sys.argv:
    env = open('frontend/.env.local').read()
    tok = re.search(r'SANITY_(?:WRITE|API)_TOKEN\s*=\s*(.+)', env).group(1).strip().strip('"\'')
    req = urllib.request.Request('https://fxz10xl7.api.sanity.io/v2021-06-07/data/mutate/production',
                                 data=json.dumps({'mutations': [{'createOrReplace': doc}]}).encode(),
                                 headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {tok}'})
    print(json.loads(urllib.request.urlopen(req).read()).get('results'))
