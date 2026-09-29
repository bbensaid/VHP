# -*- coding: utf-8 -*-
# Chapter 5 surgical fixes, from book-audit/audit_ch05.md items 1-5.
# Run:  python3 book-build/patch_docx.py book-audit/fix_ch05.py
# Anchors were located in the CURRENT word/document.xml and each verified count==1.
# NOTE: re-verify uniqueness against a freshly downloaded .docx before applying.

EDITS = [

    # --- Fix 1 -- audit item 1: §5.7 lead-in undercounts Figure 5.4 by one lab
    #     (and its three-topic enumeration omits the statewide-EHR tool).
    {
        "op": "raw",
        "find": "Chapter 5’s implementation reality — AI governance, CDS, and clinical data exchange — maps to three working labs.",
        "replace": "Chapter 5’s implementation reality — AI governance, CDS, clinical data exchange, and the statewide-EHR question — maps to four working labs.",
    },

    # --- Fix 2 + Fix 3 -- audit items 2 and 3, same sentence:
    #     (2) §5.3.1 described the named platform artifact ("AI Clinical Governance
    #         Checklist") as four lifecycle stages, contradicting Figure 5.4's
    #         verified 62 items / 8 domains. Per the standing rule the tool is not
    #         reworded down; the book's own construct is named distinctly instead.
    #     (3) the sentence ended in a colon promising an enumeration that the XML
    #         does not contain (a Heading3 follows). Now ends in a period.
    {
        "op": "raw",
        "find": "The AI Clinical Governance Checklist organizes governance requirements across four lifecycle stages:",
        "replace": "This section organizes governance requirements across four lifecycle stages; the platform’s AI Clinical Governance Lab cross-cuts the same material as a 62-item checklist over eight governance domains.",
    },

    # --- Fix 4 -- audit item 4: §5.4.2 named three CDS applications where
    #     Figure 5.2 has four rows; medication safety and adherence was never
    #     introduced in prose. Serial comma moves to the new final item.
    {
        "op": "raw",
        "find": "and SDOH screening tools that flag patients for CHT navigation at the moment of a primary care visit.",
        "replace": "SDOH screening tools that flag patients for CHT navigation at the moment of a primary care visit, and medication-safety and adherence monitoring across multiple prescribers.",
    },

    # --- Fix 5a -- audit item 5: tool-name drift. Actual tab label is
    #     "Clinical Data Exchange" (VBCClinicalQualityClient.tsx, tab id `hl7`).
    #     Anchored on the run's XML delimiters; count==1 in the whole document.
    {
        "op": "raw",
        "find": ">Clinical Data Exchange Lab<",
        "replace": ">Clinical Data Exchange<",
    },

    # --- Fix 5b -- audit item 5: actual label is "Statewide EHR Modeler"
    #     (InteroperabilityClient.tsx, tab id `statewide-ehr`).
    #     The bare string occurs TWICE (the other is Chapter 4's own platform
    #     table, paraId 00000733, out of scope for this Chapter 5 pass), so this
    #     op is anchored on Chapter 5's paraId 000007D5 to stay unique.
    {
        "op": "raw",
        "find": "w14:paraId=\"000007D5\"><w:pPr><w:jc w:val=\"left\"/><w:rPr/></w:pPr><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:b w:val=\"1\"/><w:bCs w:val=\"1\"/><w:sz w:val=\"18\"/><w:szCs w:val=\"18\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">Statewide EHR Deployment Modeler</w:t>",
        "replace": "w14:paraId=\"000007D5\"><w:pPr><w:jc w:val=\"left\"/><w:rPr/></w:pPr><w:r w:rsidDel=\"00000000\" w:rsidR=\"00000000\" w:rsidRPr=\"00000000\"><w:rPr><w:b w:val=\"1\"/><w:bCs w:val=\"1\"/><w:sz w:val=\"18\"/><w:szCs w:val=\"18\"/><w:rtl w:val=\"0\"/></w:rPr><w:t xml:space=\"preserve\">Statewide EHR Modeler</w:t>",
    },
]
