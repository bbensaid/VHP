# -*- coding: utf-8 -*-
"""Cross-chapter follow-through for the Ch15 rebuild: Ch15 no longer proposes a PMO, and
'PMO being established' is not a sourced status. Replace with the sourced RHT staffing status
(AHS RHT update to the Joint Fiscal Committee, July 29, 2026: 18 positions filled, 5 in recruitment)."""
import os, sys, zipfile
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from apply_ch16_app_rev4 import sub1
STAFF = 'RHT program staff being hired (18 of 23 positions filled, July 2026)'
def my_apply(x, _e):
    x = sub1(x, 'Act 68 transformation grants ($2M); PMO establishment', 'Act 68 transformation grants ($2M); RHT program staffing', 'Ch1 Fig: PMO establishment')
    x = sub1(x, '14 hospital transformation plans (submitted April 2026), PMO being established', '14 hospital transformation plans (submitted April 2026), ' + STAFF, 'Ch1 stage table')
    x = sub1(x, 'AHS kept unified after the Act 119 review; PMO being established;', 'AHS kept unified after the Act 119 review; ' + STAFF + ';', 'forecast table')
    x = sub1(x, 'AHS Transformation PMO (being established)', 'AHS ' + STAFF, 'App G/H table')
    x = sub1(x, 'Without a function that tracks milestones across all five pillars, manages dependencies between the analytics vendor, the hospital transformation plans, and the CCBHC certifications, and reports to AHS leadership on the transformation timeline’s status',
             'Without named owners who track the data infrastructure, the analytics vendor, the hospital transformation plans, and the CCBHC certifications against one roadmap, and report to AHS leadership on the timeline’s status', 'Ch12 implications 1')
    x = sub1(x, 'The PMO is not overhead. It is the management infrastructure', 'That capacity is not overhead. It is the management infrastructure', 'Ch12 implications 2')
    return x
if __name__ == '__main__':
    if '--dry' in sys.argv:
        my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode('utf8'), None); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
