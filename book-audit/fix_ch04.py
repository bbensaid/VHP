# -*- coding: utf-8 -*-
# Chapter 4 surgical fixes, from book-audit/audit_ch04.md
# Run with:  python3 book-build/patch_docx.py book-audit/fix_ch04.py
# NOT YET APPLIED. Author must download the current .docx from Google Docs first;
# every anchor below was confirmed count==1 in the local copy on 2026-09-27.

EDITS = [
    # MISMATCH 1a — VHCURES lag: nine-to-twelve -> 12-to-18 (§4.3.8, idx 748)
    {"op": "raw",
     "find": "VHCURES operates on a nine-to-twelve-month reporting lag",
     "replace": "VHCURES operates on a 12-to-18-month reporting lag"},

    # MISMATCH 1b — same paragraph, second string
    {"op": "raw",
     "find": "a nine-month lag is not a data source",
     "replace": "a 12-month lag is not a data source"},

    # MISMATCH 2 — §4.5.2 prose contradicts its own Figure 4.6 on Meditech (idx 789)
    {"op": "raw",
     "find": "smaller community hospitals (on TruBridge and Meditech platforms) and at community-based providers (mental health agencies, skilled nursing facilities, home health agencies) that lack FHIR-capable systems entirely.",
     "replace": "smaller community hospitals (on TruBridge legacy platforms, with Meditech sites FHIR-capable but unconfigured) and at community-based providers (mental health agencies, skilled nursing facilities, home health agencies) that lack FHIR-capable systems entirely."},

    # MISMATCH 3 — Figure 4.6 Partial row begins mid-phrase (idx 791)
    # Angle brackets included to pin the match to the whole cell run text.
    {"op": "raw",
     "find": ">hospitals on Meditech Expanse (FHIR-capable but may require configuration)<",
     "replace": ">Community hospitals on Meditech Expanse (FHIR-capable but may require configuration)<"},

    # MISMATCH 4 — §4.1.1 names the Blueprint registry where the triad is the analytics platform (idx 685)
    {"op": "raw",
     "find": "and the Blueprint clinical data registry — is sophisticated",
     "replace": "and the AHS-GMCB analytics platform now in procurement (Figure 4.1) — is sophisticated"},

    # MISMATCH 6 — §4.2.1 avoidable-ED lineage (idx 693)
    {"op": "raw",
     "find": "is calculated from VHCURES via VUHDDS",
     "replace": "is calculated from VUHDDS hospital discharge records"},

    # MISMATCH 7a — broken cross-reference in Figure 4.5 cell (idx 765)
    {"op": "raw",
     "find": "FHIR-based interoperability (see Section 4) may make",
     "replace": "FHIR-based interoperability (see §4.5) may make"},

    # MISMATCH 7b — broken cross-reference at §4.3.11 close (idx 767)
    {"op": "raw",
     "find": "Section 4 develops the FHIR picture.",
     "replace": "§4.5 develops the FHIR picture."},
]
