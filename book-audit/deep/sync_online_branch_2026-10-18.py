#!/usr/bin/env python3
"""Sync of the online Claude session (branch claude/quirky-heisenberg-hezxu0, commits of 2026-10-13, never merged)
into the local book, 2026-10-18. Items the local passes had already redone are not repeated. Applied here:
 1 Montana direct contracting (NASHP/Optumas: $47.8M, SFY2017–19; ~220–250% of Medicare) — not a Vermont figure.
 2 OneCare formed 2012, closed end of 2025 (~13 years).
 3 Ch8 §8.5 table: 71% of primary care practices accept new Medicaid patients (AHS, June 2026; 59% June 2025).
 4 Preface typography '(ADS) ,'.
 5 $195M = first-year (FY2026) RHT award — author confirmed the online wording 2026-10-18.
 6 Preface 'open-source' -> 'open-access' (platform has paid tiers); S.190 veto (VermontBiz, June 17, 2026) added
   to Ch6 and Ch14. Preface/Conclusion signing dates left for the author."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text

R = [
 ('Year 1: $48M Vermont savings', 'Year 1 (Montana: $47.8M saved, SFY2017–19)'),
 ('Direct contracting at 110% Medicare; $48M initial savings', 'No Vermont program yet; Montana (2016) benchmark: about 220–250% of Medicare'),
 ('It wound down after roughly twelve years, founded in 2013 and closing at the end of 2025.', 'It wound down after roughly thirteen years, formed in 2012 and closing at the end of 2025.'),
 ('OneCare Vermont ran for twelve years on a voluntary model', 'OneCare Vermont ran for more than a decade on a voluntary model'),
 ('59% of primary care practices accepting new Medicaid patients — significant equity gap', '71% of primary care practices accepting new Medicaid patients (June 2026, up from 59% a year earlier) — still an equity gap'),
 ('Agency of Digital Services (ADS) ,', 'Agency of Digital Services (ADS),'),
 ('under 1% a year of the $195M a year in RHT funds it coordinates', 'under 1% a year of the $195M first-year RHT award it coordinates'),
 ('coordinates $195M/yr in RHT capital', 'coordinates the $195M first-year RHT award'),
 ('<1% a year of the $195M/yr RHT capital it coordinates', '<1% a year of the $195M first-year RHT award it coordinates'),
 ('The Rural Health Transformation Program’s $195 million per year is the only funding source', 'The Rural Health Transformation Program’s $195 million first-year award is the only funding source'),
 ('an open-source integrated ecosystem', 'an open-access integrated ecosystem'),
 ('is essential for policymakers and healthcare leaders designing transformation strategies.',
  'is essential for policymakers and healthcare leaders designing transformation strategies. The mandate itself has held: in June 2026 Governor Scott vetoed S.190, a further reference-based pricing bill, citing a Department of Financial Regulation analysis that its claimed savings did not hold up, and Act 68’s RBP requirement was unaffected.'),
 ('Act 68’s mandatory architecture can be modified, weakened, or delayed by any of these actors acting alone or together.',
  'Act 68’s mandatory architecture can be modified, weakened, or delayed by any of these actors acting alone or together. The 2026 session showed the dynamic: the Legislature passed S.190, a reference-based pricing bill, and Governor Scott vetoed it on June 16, 2026, arguing that it would exclude most payers from the FY2027 affordability gains and that the GMCB already had the authority it needed.'),
]


def my_apply(x, _):
    for a, b in R:
        x = replace_text(x, a, b, 1)
    print('  ok: online-branch sync x%d' % len(R))
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
