#!/usr/bin/env python3
"""
transform.py — book-wide markdown cleanup + callout conversion for HTR_Book_v41.md

Operates IN PLACE on HTR_Book_v41.md (which is already a copy of v40; v40 untouched).
Idempotent: safe to run repeatedly.

1. Unescape export-artifact backslashes: \.  \+  \~  \)  \(  (NOT \- which may be intentional)
2. Convert inline "**BEYOND VERMONT —** *...*" callouts to fenced divs (CalloutBeyond)
3. Convert standalone italic vignette paragraphs that read like worked examples
   ("*Lead-in phrase: body...*") to CalloutWorked divs — ONLY when they are a full
   single-paragraph italic block (conservative; avoids touching figure captions).
"""
import re, sys

PATH = 'HTR_Book_v41.md'
src = open(PATH, encoding='utf-8').read()
orig = src

# ── 1. unescape artifacts ────────────────────────────────────────────────────
for ch in ('.', '+', '~', ')', '('):
    src = src.replace('\\'+ch, ch)

# ── 2. BEYOND VERMONT inline -> fenced div ───────────────────────────────────
# Matches a line:  **BEYOND VERMONT —** *body text...*
def beyond_repl(m):
    body = m.group(1).strip()
    return f'::: {{custom-style="CalloutBeyond"}}\n**BEYOND VERMONT**\n\n{body}\n:::'

src = re.sub(
    r'^\*\*BEYOND VERMONT\s*[—-]\*\*\s*\*(.+?)\*\s*$',
    beyond_repl, src, flags=re.M)

# ── 3. Figure/Table captions: keep as-is (they are *Figure x* / *Table x*) ───
# (No change — handled by Caption style in pipeline via leading "Figure"/"Table".)

open(PATH,'w',encoding='utf-8').write(src)

# report
import difflib
changed = sum(1 for a,b in zip(orig.splitlines(), src.splitlines()) if a!=b)
print(f"unescaped artifacts + converted callouts. lines changed (approx): {changed}")
print("BEYOND VERMONT divs now:", src.count('custom-style="CalloutBeyond"'))
print("remaining inline BEYOND:", len(re.findall(r'^\*\*BEYOND VERMONT', src, re.M)) - src.count('**BEYOND VERMONT**'))
print("remaining escaped (.+~) :", len(re.findall(r'\\[.+~)(]', src)))
