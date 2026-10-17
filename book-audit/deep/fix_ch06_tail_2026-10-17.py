#!/usr/bin/env python3
"""Ch6 tail (sections 6.9-6.11), 2026-10-17: orphaned 'same study' reference (Kilaru et al., JAMA Health Forum,
2022); superlatives that contradict Ch16 / have no source; Act 68 global budgets exclude Medicaid and include Medicare
only as federal law permits; AHEAD participants include a downstate New York region (not a state); AHEAD glossary
entry rebuilt as a styled term + definition (it was a bare label paragraph plus an unstyled definition)."""
import os, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text, T, _unesc, _paragraphs
R = [
 ('A federal regulator interviewed for the same study described the shift plainly:',
  'A federal regulator interviewed for a 2022 JAMA Health Forum study of the model described the shift plainly:', 1),
 ('The global budget methodology is the most consequential document Vermont’s transformation will produce.',
  'The global budget methodology will be one of the most consequential documents Vermont’s transformation produces.', 1),
 ('Vermont’s mandatory commercial RBP ceiling — to be set by GMCB rule in March 2027, with 200% of Medicare the benchmark most often modeled — is the most specific mandatory statewide price ceiling enacted by any state.',
  'Vermont’s mandatory commercial RBP ceiling — the final methodology due from GMCB in March 2027, with Oliver Wyman having recommended 200% of Medicare or less — applies to every hospital and every commercial payer, unlike the state-employee-plan caps in Oregon and Montana.', 1),
 ('The model Vermont’s GMCB-designed commercial global budgets will most closely follow.',
  'A reference model for Vermont’s GMCB-designed global budgets.', 1),
 ('Vermont’s Act 68 mandate is designed to achieve this across commercial payers and Medicaid by FY2028-2030, with Medicare alignment now unresolved after the AHEAD withdrawal.',
  'Vermont’s Act 68 global budgets cover commercial payers and, where federal law permits, Medicare — Medicaid is excluded by statute, and Medicare participation is unresolved after the AHEAD withdrawal.', 1),
]
def ptext(p): return ''.join(_unesc(n.group(2)) for n in T.finditer(p))
def my_apply(x, _):
    for o, n, c in R: x = replace_text(x, o, n, c)
    # AHEAD glossary: label paragraph + unstyled definition -> one styled entry (clone 'Revenue predictability')
    esc = lambda s: s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    spans = list(_paragraphs(x))
    tpl = [(a, b) for a, b in spans if ptext(x[a:b]).startswith('Revenue predictability')]
    assert len(tpl) == 1
    t = re.sub(r' w14:paraId="[0-9A-F]+"', '', x[tpl[0][0]:tpl[0][1]])
    nodes = list(T.finditer(t))
    term_n, def_n = nodes[0], nodes[1]
    assert _unesc(term_n.group(2)).strip() == 'Revenue predictability'
    labs = [(a, b) for a, b in spans if ptext(x[a:b]).strip() == 'AHEAD (Achieving Healthcare Efficiency through Accountable Design)']
    assert len(labs) == 2, len(labs)
    for la, lb in reversed(labs):
        spans = list(_paragraphs(x))
        nxt = [(a, b) for a, b in spans if a >= lb][0]
        defn = ptext(x[nxt[0]:nxt[1]]).strip()
        defn = defn.replace('now operating in five states (Maryland, Connecticut, Hawaii, Rhode Island, and New York)',
                            'now operating with five participants (Maryland, Connecticut, Hawaii, Rhode Island, and a downstate New York region)')
        defn = defn.replace('Five-state voluntary total cost of care model (Maryland, Connecticut, Hawaii, Rhode Island, New York).',
                            'Voluntary total cost of care model with five participants (Maryland, Connecticut, Hawaii, Rhode Island, and a downstate New York region).')
        assert 'five states' not in defn.lower() and 'Five-state' not in defn, defn[:80]
        new = (t[:term_n.start(2)] + 'AHEAD (Achieving Healthcare Efficiency through Accountable Design)'
               + t[term_n.end(2):def_n.start(2)] + esc(' ' + defn) + t[def_n.end(2):])
        x = x[:la] + new + x[nxt[1]:]
    print('  ok: %d edits + AHEAD entry rebuilt' % len(R)); return x
if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString(my_apply(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = my_apply; P.main([{'op': 'noop'}])
