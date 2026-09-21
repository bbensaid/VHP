# -*- coding: utf-8 -*-
"""Correct one unsupported phrase in the new Operations Equity paragraph (2026-09-21).

I wrote that regionalization moves care away from communities "with the least
transportation". Chapter 10 §10.4.1 does not say that: it says the Northeast Kingdom is
"the most distant from UVMMC and the Burlington healthcare hub" and "the most underserved
by healthcare providers". Reworded to only what the book supports.
"""
import os, sys, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import patch_docx as P

spec = importlib.util.spec_from_file_location('ch1', os.path.join(HERE, 'ch1_s14_restructure_2026-09-21.py'))
H = importlib.util.module_from_spec(spec)
spec.loader.exec_module(H)


def transform(x):
    return H.set_text(
        x, 'The test for Operations is whether the capacity exists where the gaps are.',
        'The test for Operations is whether the capacity exists where the gaps are. '
        'Regionalization concentrates specialty care at regional centers; left unmanaged, it moves '
        'care farther from the communities that are already the most distant from a regional '
        'hospital and the most underserved by providers, and a plan that is executable in '
        'Burlington is not thereby executable in the Northeast Kingdom.')


if __name__ == '__main__':
    P.apply = lambda x, edits: transform(x)
    P.main([])
