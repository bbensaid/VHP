# -*- coding: utf-8 -*-
"""
Chapter 9 surgical fixes for HTR_Book_v42.docx.

PREPARED, NOT APPLIED. Nothing was written to the .docx by the script that
generated this file. Findings and proposed replacements come from
book-audit/audit_ch09.md.

Every `find` below was located in the CURRENT word/document.xml of
HTR_Book_v42.docx (extracted via zipfile) and verified to occur EXACTLY ONCE.
Smart quotes (’) and em dashes (—) are literal in the strings.

NOTE (directive 10): re-locate before applying. If the author has re-downloaded
the .docx from Google Docs since 2026-09-27, re-run the uniqueness check before
patching:
    python3 - <<'PY'
    import zipfile
    from fix_ch09 import EDITS
    d = zipfile.ZipFile('HTR_Book_v42.docx').read('word/document.xml').decode('utf-8')
    for e in EDITS:
        print(d.count(e['find']), e['note'])
    PY
"""

EDITS = [
    # ── Finding 1 (High) — Figure 9.1 Care Coordination row.
    # Vermont's 76% is the HEDIS FUM (ED-visit) rate, not FUH (hospitalization).
    # Sole outlier in the manuscript; every other instance says ED visit.
    {
        "op": "raw",
        "note": "Fig 9.1 Care Coordination row: FUH -> FUM (ED visit)",
        "find": "30-day follow-up after behavioral health hospitalization — Vermont’s 76% rate — is a care coordination failure.",
        "replace": "30-day follow-up after a behavioral health ED visit — Vermont’s 76% rate (HEDIS FUM) — is a care coordination failure.",
    },

    # ── Finding 2 (High) — Figure 9.3 Psychiatric Consultant row.
    # §9.3.2 prose says 10-15 practices; the cell said one practice (~10x conflict).
    # The cell text is BYTE-IDENTICAL to the equivalent cell in Chapter 8, so the
    # find string is extended backwards through the preceding cell ("...highest-acuity
    # cases; not the primary..." — Ch8 reads "...cases requiring psychiatric input...")
    # to make it unique to Chapter 9. The intervening XML is reproduced verbatim and
    # unchanged; only the trailing sentence text differs in `replace`.
    {
        "op": "raw",
        "note": "Fig 9.3 Psychiatric Consultant row: one practice -> 10-15 practices (Ch9 only; span-anchored)",
        "find": "direct care for highest-acuity cases; not the primary provider for most CoCM patients</w:t></w:r><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:rtl w:val=\"0\"/></w:rPr></w:r></w:p></w:tc><w:tc><w:tcPr/><w:p w:rsidR=\"00000000\" w:rsidDel=\"00000000\" w:rsidP=\"00000000\" w:rsidRDefault=\"00000000\" w:rsidRPr=\"00000000\" w14:paraId=\"00000B53\"><w:pPr><w:jc w:val=\"left\"/><w:rPr/></w:pPr><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:sz w:val=\"18\"/><w:szCs w:val=\"18\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">Vermont’s psychiatric shortage makes the CoCM model especially valuable — one psychiatrist can support an entire primary care practice’s behavioral health population through consultation rather than direct care",
        "replace": "direct care for highest-acuity cases; not the primary provider for most CoCM patients</w:t></w:r><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:rtl w:val=\"0\"/></w:rPr></w:r></w:p></w:tc><w:tc><w:tcPr/><w:p w:rsidR=\"00000000\" w:rsidDel=\"00000000\" w:rsidP=\"00000000\" w:rsidRDefault=\"00000000\" w:rsidRPr=\"00000000\" w14:paraId=\"00000B53\"><w:pPr><w:jc w:val=\"left\"/><w:rPr/></w:pPr><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:sz w:val=\"18\"/><w:szCs w:val=\"18\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">Vermont’s psychiatric shortage makes the CoCM model especially valuable — one psychiatrist can support 10-15 primary care practices’ behavioral health populations through consultation rather than direct care",
    },

    # ── Finding 3 (Medium) — §9.2.3 $180,000 conclusion.
    # Figure 9.5 prices the whole panel-stratification/care-management program at
    # $40K-$100K annually, so $180,000 funds it 1.8x-4.5x over, not a half-time FTE.
    {
        "op": "raw",
        "note": "§9.2.3: $180K funds the Figure 9.5 program several times over, not a half-time coordinator",
        "find": "— sufficient to fully fund a half-time care coordinator position and produce net positive ROI under any VBC arrangement.",
        "replace": "— enough to fund the entire panel-stratification and care-management program costed in Figure 9.5 several times over, and to produce net positive ROI under any VBC arrangement.",
    },

    # ── Finding 14 (Low) — §9.4.2 diabetes gap.
    # 22% x 70,000 = 15,400, not 15,000; and the sentence applies a Blueprint-attributed
    # control rate to the statewide population, which is an extrapolation, now flagged.
    {
        "op": "raw",
        "note": "§9.4.2 diabetes gap: 13,000-15,000 -> 13,000-15,400, extrapolation flagged",
        "find": "this represents 13,000-15,000 patients with inadequately controlled diabetes",
        "replace": "applying that Blueprint-measured rate to the statewide population implies on the order of 13,000-15,400 patients with inadequately controlled diabetes",
    },

    # ── Other issue A (Low) — §9.7 heading names a sixth "Pillar".
    # The five pillars are Policy, Technology, Economics, Clinical, Operations
    # (frontend/lib/framework/, chapters.ts). Two occurrences: the body heading and
    # the table-of-contents entry. Both are patched so the TOC does not drift.
    {
        "op": "raw",
        "note": "§9.7 body heading: Pillar -> Capability",
        "find": "<w:t xml:space=\"preserve\">Clinical Leadership in Transformation — The Under-Resourced Pillar</w:t>",
        "replace": "<w:t xml:space=\"preserve\">Clinical Leadership in Transformation — The Under-Resourced Capability</w:t>",
    },
    {
        "op": "raw",
        "note": "TOC entry for §9.7: Pillar -> Capability (keeps TOC in sync with the heading)",
        "find": "<w:t xml:space=\"preserve\">9.7  Clinical Leadership in Transformation — The Under-Resourced Pillar</w:t>",
        "replace": "<w:t xml:space=\"preserve\">9.7  Clinical Leadership in Transformation — The Under-Resourced Capability</w:t>",
    },
]
