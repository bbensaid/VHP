#!/usr/bin/env python3
"""Gate + audit trail for manuscript edits.

    python3 book-build/ack.py <chapter>

Prints the STANDING DIRECTIVES and the DONE definition straight out of
CLAUDE.md (so they enter the transcript verbatim, not from memory), then writes
a timestamped line to .claude/book-session.log.

The protect-book hook REFUSES to run patch_docx.py without a fresh entry, so an
edit cannot happen unless this ran first. The author can verify with:

    cat .claude/book-session.log

If the log has no entry for a session in which the book changed, the rules were
not read. That is the check — not Claude's word for it.
"""
import os, re, sys, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CM = os.path.join(ROOT, 'CLAUDE.md')
LOG = os.path.join(ROOT, '.claude', 'book-session.log')
chapter = sys.argv[1] if len(sys.argv) > 1 else '?'

text = open(CM, encoding='utf8').read()


def section(start, stop):
    i = text.find(start)
    if i == -1:
        return '(SECTION MISSING FROM CLAUDE.md: %s)' % start
    j = text.find(stop, i + len(start))
    return text[i:j if j != -1 else len(text)].rstrip()


print('=' * 78)
print(section('## STANDING DIRECTIVES', '## What "DONE" means'))
print()
print(section('## What "DONE" means', '## Start here'))
print('=' * 78)

rules = len(re.findall(r'^\s*\d+\.\s+\*\*', text, re.M))
stamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
os.makedirs(os.path.dirname(LOG), exist_ok=True)
with open(LOG, 'a', encoding='utf8') as f:
    f.write('%s  chapter=%s  directives_read=%d  claude_md_bytes=%d\n'
            % (stamp, chapter, rules, len(text)))

print('\nLogged to .claude/book-session.log  —  %s  chapter=%s  (%d numbered directives)'
      % (stamp, chapter, rules))
print('Manuscript edits are now unblocked for 4 hours.')
