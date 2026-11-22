"""Ch3: drop the unsourced 'six hospitals' count for Vermont's Medicaid hospital global budget. Neither the CMS letter
of July 7, 2026 (book-audit/deep/sources/m4a/cms_vt_gch_stc_letter_2026-07-07.txt) nor GCR 26-089 states a count;
can't confirm -> delete (author rule 2026-10-12)."""
EDITS = [
    {'op': 'para_regex', 'find': 'launched in January 2026 with six hospitals on state rather than AHEAD authority',
     'pattern': r'launched in January 2026 with six hospitals on state rather than AHEAD authority',
     'replace': 'launched in January 2026 on state rather than AHEAD authority'},
]
