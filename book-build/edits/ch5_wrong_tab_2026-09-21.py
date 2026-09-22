# -*- coding: utf-8 -*-
"""Chapter 5 §5.7 — repoint a citation to the tool that actually does what the row claims (2026-09-21).

Found by parallel-agent verification. The row asks the reader to "test whether FHIR-based exchange can
deliver what a statewide EHR would, at lower cost" and links to `?tab=fhir` (FHIR Interoperability
Lab, `FHIRLab.tsx`), a resource-builder/terminology-mapper with no cost or statewide-EHR comparison
logic anywhere in it. The actual head-to-head cost/TCO comparison the row describes is
`StatewideEHRLab.tsx`, at `?tab=statewide-ehr` on the same bench — already correctly cited by name in
Chapter 4 §4.9 as "Statewide EHR Deployment Modeler". This is the identified target, confirmed unique
by locating the run 604 characters after this row's first-cell anchor sentence.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P


def enc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def transform(x):
    anchor = enc('Test whether FHIR-based exchange can deliver what a statewide EHR would')
    i = x.index(anchor)
    j = x.index(enc('FHIR Interoperability Lab'), i)
    if j - i > 800:
        raise SystemExit('the label run moved too far from the anchor; re-locate before editing')

    label_old, label_new = enc('FHIR Interoperability Lab'), enc('Statewide EHR Deployment Modeler')
    seg = x[j:j + len(label_old)]
    if seg != label_old:
        raise SystemExit('label run mismatch at expected offset')
    x = x[:j] + label_new + x[j + len(label_old):]

    url_old, url_new = enc('?tab=fhir'), enc('?tab=statewide-ehr')
    k = x.index(url_old, j)
    if k - j > 260:
        raise SystemExit('the url run moved too far from the label; re-locate before editing')
    x = x[:k] + url_new + x[k + len(url_old):]
    return x


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
