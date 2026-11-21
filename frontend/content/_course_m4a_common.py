# Shared by the _course_m4a_t*.py lesson scripts (exec'd after CONTENT_TEMPLATE.py).
# Course: medicare-for-all-five-pillar-test — M4A plan Phase 5 (approved 2026-11-21).
# EVERY fact must come from book-audit/deep/sources/m4a/VERIFIED_FACTS_M4A.md (page cites there),
# book-audit/deep/VERIFIED_FACTS.md (Vermont Act 68 / hospitals), the HTR book, or
# frontend/lib/m4a/* (the Modeler, itself tested against its sources). Nothing else.
import sys

COURSE = 'medicare-for-all-five-pillar-test'

LEG = 'https://legislature.vermont.gov/Documents'
SRC = {
    'act48': f"Vermont Act 48 of 2011 (H.202), as enacted — {LEG}/2012/Docs/ACTS/ACT048/ACT048%20As%20Enacted.pdf",
    'hsiao': f"Joint Fiscal Office, Hsiao Report Overview (Act 128 of 2010) — {LEG}/2016/WorkGroups/Senate%20Health%20and%20Welfare/Health%20Care%20Reform/W~Nolan%20Langweil~Hsiao%20Report%20Overview%20(Act%20128%20of%202010)~1-16-2015.pdf",
    'plan13': f"Vermont Agency of Administration, Health Care Reform Financing Plan (Act 48, Sec. 9), Jan 24, 2013 — {LEG}/2014/WorkGroups/House%20Health%20Care/Financing%20Plan/W~Robin%20Lunge~Health%20Care%20Reform%20Financing%20Plan%20In%20Accordance%20with%20Act%2048,%20Section%209~1-25-2013.pdf",
    'avalere': f"Avalere Health, evaluation of Vermont's financing plan, Nov 14, 2013 (commissioned by Vermont Partners for Health Care Reform) — {LEG}/2014/WorkGroups/Health%20Care%20Oversight/Health%20Care%20Reform%20Financing%20Plan/W~Bob%20Atlas~Avalere%20Report%C2%A6%20Evaluation%20of%20Vermont%20Health%20Care%20Reform%20Financing%20Plan~11-14-2013.pdf",
    'gmc14': f"Green Mountain Care: A Comprehensive Model for Building Vermont's Universal Health Care System, Dec 30, 2014 — {LEG}/2016/WorkGroups/Senate%20Finance/Reports%20and%20Resources/W~Vermont%20Health%20Care%20Reform%20Office~Green%20Mountain%20Care%20Financing%20Report%20(Act%2048%20of%202011)~1-15-2015.pdf",
    'erisa': "29 U.S.C. § 1144 (ERISA § 514), U.S. Code 2023 edition — https://www.govinfo.gov/content/pkg/USCODE-2023-title29/html/USCODE-2023-title29-chap18-subchapI-subtitleB-part5-sec1144.htm",
    's1332': "42 U.S.C. § 18052 (ACA § 1332), U.S. Code 2023 edition — https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap157-subchapIII-partD-sec18052.htm",
    's1506': "S.1506, Medicare for All Act, 119th Congress, introduced text — https://www.govinfo.gov/content/pkg/BILLS-119s1506is/xhtml/BILLS-119s1506is.html",
    's1506status': "Congress bill status record for S.1506 (updated Nov 20, 2026) — https://www.govinfo.gov/bulkdata/BILLSTATUS/119/s/BILLSTATUS-119s1506.xml",
    'hr3069': "H.R.3069, Medicare for All Act, 119th Congress, introduced text — https://www.govinfo.gov/content/pkg/BILLS-119hr3069ih/xhtml/BILLS-119hr3069ih.html",
    'hr10924': "H.R.10924, Medicare for America Act of 2026, introduced text and CRS summary — https://www.govinfo.gov/content/pkg/BILLS-119hr10924ih/xml/BILLS-119hr10924ih.xml",
    'cbo': "CBO Director Phillip Swagel, A Single-Payer Health Care System That Is Based on Medicare's Fee-for-Service Program, testimony to the Senate Budget Committee, May 12, 2022 (NLM copy) — https://collections.nlm.nih.gov/txt/nlm:nlmuid-9918471188406676-pdf",
    'rollcall': "Roll Call, \"Sanders: 'Medicare for All' will be HELP priority\", Nov 18, 2026 — https://rollcall.com/2026/11/18/sanders-medicare-for-all-will-be-help-priority",
    'yahoo': "Yahoo News (A. Romano), final 2026 midterm election results, Nov 20, 2026 — https://www.yahoo.com/news/politics/article/final-2026-midterm-election-results-democrats-clinch-56-seat-senate-majority-with-peltolas-alaska-win-what-they-can--and-cant--do-next-184618858.html",
    'baldwin': "Sen. Tammy Baldwin, press release on the Medicare at 50 Act, Nov 10, 2026 (republished by Urban Milwaukee) — https://urbanmilwaukee.com/?p=1237070",
    'book1': "Health Transformation Review, Transforming Healthcare (HTR book v42), Chapter 1 — https://healthtransformationreview.org/read/chapter-01",
    'hub': "HTR, Medicare for All: the five-pillar test — https://healthtransformationreview.org/policy/medicare-for-all",
    'act48page': "HTR, Vermont Act 48 and Green Mountain Care — https://healthtransformationreview.org/policy/medicare-for-all/vermont-act-48",
    'modeler': "HTR, Single-Payer Modeler — https://healthtransformationreview.org/policy/medicare-for-all/modeler",
    'gmcbfy27': "GMCB, FY27 Hospital Budget Review: Staff Overview (Aug 2026) — https://gmcboard.vermont.gov/sites/gmcb/files/documents/FY27%20-%20AUG%20-%20Staff%20Overview%20(Final).pdf",
    'gmcborders': "GMCB, FY27 Hospital Budget Decisions (press release, Sept 15, 2026) — https://gmcboard.vermont.gov/sites/gmcb/files/documents/Press%20Release%20-%20FY27%20Hospital%20Budget%20Review%20Decisions%20-%2009.14.2026%281%29.pdf",
    'rand': "RAND Hospital Price Transparency Project, Vermont findings for the GMCB (Aug 2024) — https://gmcboard.vermont.gov/sites/gmcb/files/documents/RAND%20hospital_August-2024-VT.pdf",
    'act68': "Vermont Act 68 of 2025, as enacted — https://legislature.vermont.gov/Documents/2026/Docs/ACTS/ACT068/ACT068%20As%20Enacted.pdf",
}

def sources(ids, what):
    """Numbered source blocks: ids in order, `what` maps id -> the claim it supports."""
    out = [h2('src', 'Sources')]
    for n, i in enumerate(ids, 1):
        out.append(blk(f'src{n}', f"[{n}] {SRC[i]} — {what[i]}"))
    return out

def _words(body):
    return sum(len(b['children'][0]['text'].split()) for b in body
               if b.get('_type') == 'block' and b.get('style') != 'h2')

def run(lessons):
    ok = True
    allkeys = set()
    for slug, title, body, order in lessons:
        keys = [b['_key'] for b in body]
        h2s = sum(1 for b in body if b.get('style') == 'h2') - 1
        srcs = sum(1 for b in body if b['_key'].startswith('src') and b['_key'] != 'src')
        tw = [b for b in body if b.get('_type') == 'takeawayBlock']
        qz = [b for b in body if b.get('_type') == 'knowledgeCheck']
        correct = sum(o['isCorrect'] for o in qz[0]['options']) if qz else 0
        dup = len(keys) != len(set(keys))
        words = _words(body)
        print(f"{slug}: blocks={len(body)} sections={h2s} words={words} sources={srcs} "
              f"takeaways={len(tw[0]['points']) if tw else 0} quiz_ok={correct == 1} dup_keys={dup}")
        ok &= (not dup and len(body) >= 20 and h2s >= 5 and srcs >= 4 and bool(tw) and bool(qz)
               and correct == 1 and 6 <= len(tw[0]['points']) <= 8 and words >= 1200)
        if slug in allkeys: ok = False
        allkeys.add(slug)
    if not ok:
        raise SystemExit('quality bar not met')
    if '--commit' in sys.argv:
        for slug, title, body, order in lessons:
            post(slug, title, body, course_slug=COURSE, order=order)
