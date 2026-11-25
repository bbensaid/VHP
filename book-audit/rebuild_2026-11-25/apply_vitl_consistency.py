# -*- coding: utf-8 -*-
"""Consistency corrections after §15.8 (2026-11-25): three statements about VITL that conflicted with Ch4 §4.3 / Ch15 §15.8
or with the statutes. Ch1 Fig: 'sound platform' (Ch4 cites Oliver Wyman: 'not viewed as user friendly'); Ch4 layer table:
'connectivity mandated by Act 68' (Act 68 only renumbered the existing hospital-connectivity rule in GMCB budget review,
18 V.S.A. § 9456(13); other providers remain voluntary); App G glossary: add the statutory exclusive designation (§ 9352)."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, HERE)
import patch_docx as P
from apply_ch16_app_rev4 import sub1
def my_apply(x, _e):
    x = sub1(x, 'VITL: sound platform, incomplete adoption among smaller providers for lack of Operations-pillar support to connect and train them',
             'VITL: incomplete adoption among smaller providers for lack of Operations-pillar support to connect and train them (Chapter 4, §4.3, on why the exchange itself lags)', 'Ch1 Fig: sound platform')
    x = sub1(x, 'connectivity mandated by Act 68',
             'connectivity required of every hospital in GMCB budget review (18 V.S.A. § 9456), voluntary for other providers', 'Ch4 layer table: connectivity')
    x = sub1(x, 'Vermont Information Technology Leaders — operator of Vermont’s health information exchange.',
             'Vermont Information Technology Leaders — designated by statute (18 V.S.A. § 9352) as the exclusive operator of Vermont’s health information exchange (Chapter 4, §4.3; Chapter 15, §15.8).', 'App G glossary: VITL')
    return x
P.apply = my_apply; P.main([{'op': 'noop'}])
