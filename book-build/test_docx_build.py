# -*- coding: utf-8 -*-
"""Regression tests for the shared builders. Run after touching docx_build.py:
       python3 book-build/test_docx_build.py
"""
import sys, os, inspect
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from docx_build import (run, para, cell, row, table,
                        PALE, AMBER, NAVY, INK, SZ_BODY, SZ_TABLE)

ok = fail = 0


def chk(name, cond, detail=''):
    global ok, fail
    if cond:
        print('  PASS  ' + name); ok += 1
    else:
        print('  FAIL  ' + name + ('  — ' + detail if detail else '')); fail += 1


def raises(fn):
    try:
        fn(); return False
    except ValueError:
        return True


print('white-on-light (the bug that shipped twice):')
chk('colourless run on pale fill is refused',
    raises(lambda: cell(para(run('Pillar', bold=True, color=None)), PALE)))
chk('colourless run on amber fill is refused',
    raises(lambda: cell(para(run('x' * 20, color=None)), AMBER)))
chk('correct run on pale fill is allowed and keeps its colour',
    '<w:color w:val="111111"/>' in cell(para(run('Pillar', bold=True)), PALE))
chk('run() colour default is ink, not None',
    inspect.signature(run).parameters['color'].default == INK)
chk('unfilled cell may omit colour',
    cell(para(run('x', color=None))) is not None)

print('\nnavy header rows still work (white IS correct there):')
chk('explicit white on navy is allowed',
    '<w:color w:val="ffffff"/>' in
    cell(para(run('Pillar', bold=True, color='ffffff')), NAVY))

print('\nsizes:')
chk('body prose default is 21 (10.5pt)', SZ_BODY == 21)
chk('table text default is 18', SZ_TABLE == 18)
chk('run() emits the size it is given', '<w:sz w:val="17"/>' in run('x', sz=17))

print('\nheader semantics:')
chk('header=False is the default (data rows are not headers)',
    '<w:tblHeader w:val="0"/>' in row([cell(para(run('a')))]))
chk('header=True marks the column-naming row',
    '<w:tblHeader w:val="1"/>' in row([cell(para(run('a')))], header=True))

print('\nstructure:')
t = table([1900, 7175], [row([cell(para(run('a')), PALE), cell(para(run('b')), PALE)])])
chk('table tags balanced', t.count('<w:tbl>') == t.count('</w:tbl>') == 1)
chk('grid widths emitted', '<w:gridCol w:w="1900"/>' in t)

print('\npassed=%d failed=%d' % (ok, fail))
sys.exit(1 if fail else 0)
