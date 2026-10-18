#!/usr/bin/env python3
"""Act 62 of 2025 (S.63), 2026-10-17. Enacted text + Legislative Counsel summary (book-audit/deep/sources/act62_2025_*):
the act ELIMINATES the GMCB's duties to review and approve the statewide HIT Plan, the HIE connectivity criteria and
VITL's annual budget. DVHA already coordinated the Plan (18 V.S.A. § 9351(a)(1)); the annual Nov 1 submission to the
GMCB was repealed. Sec. 1 effective July 1, 2025. So "transferred from GMCB to DVHA" and "annual revisions submitted by
November 1" are wrong."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text


def my_apply(x, _):
    x = replace_text(x, 'The 2025 Governance Shift: Act 62 Transfers HIE Authority to DVHA',
                     'The 2025 Governance Shift: Act 62 Ends GMCB Approval of HIE Planning', 1)
    x = replace_text(x, 'Effective July 1, 2025, Act 62 of 2025 made a significant governance change: responsibility for Vermont’s statewide Health Information Technology Plan was transferred from the Green Mountain Care Board to the Department of Vermont Health Access (DVHA). Prior to this, GMCB had authority to review and approve the HIE Strategic Plan, VHIE Connectivity Criteria, and VITL’s budget. Under Act 62, DVHA now coordinates Vermont’s statewide HIT Plan in consultation with the HIE Steering Committee, with annual revisions submitted by November 1 and comprehensive updates every five years.',
                     'Effective July 1, 2025, Act 62 of 2025 made a significant governance change: it ended the Green Mountain Care Board’s duties to review and approve Vermont’s statewide Health Information Technology Plan, the criteria for connecting to the health information exchange, and VITL’s annual budget. The Department of Vermont Health Access (DVHA), which already coordinated the Plan, now coordinates and administers it with its HIE Steering Committee without Board approval; the Plan is revised annually and updated comprehensively every five years.', 1)
    x = replace_text(x, 'Moving HIT plan responsibility to DVHA aligns', 'Leaving HIT plan responsibility with DVHA alone aligns', 1)
    x = replace_text(x, 'Vermont legislation that transferred responsibility for the statewide Health Information Technology Plan from GMCB to DVHA, effective July 1, 2025.',
                     'Vermont legislation that, from July 1, 2025, ended GMCB review and approval of the statewide Health Information Technology Plan, the HIE connectivity criteria and VITL’s budget, leaving the Plan with DVHA.', 1)
    print('  ok: Ch4 heading 4.3.2, para, rationale, glossary')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
