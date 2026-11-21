"""Fig 2.5: new rows inherit the table's paragraph spacing like the original rows (drop docx_build's explicit spacing)."""
EDITS = [
    {'op': 'tbl_regex', 'find': 'Test why a state single payer stopped', 'pattern': r'<w:spacing w:after="120" w:before="0" w:lineRule="auto"/>', 'replace': ''},
]
