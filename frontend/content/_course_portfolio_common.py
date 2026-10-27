# Shared by the _course_portfolio_t*.py lesson scripts (exec'd after CONTENT_TEMPLATE.py).
# Course: transformation-portfolio-management — the Chapter 15 companion course.
import sys

COURSE = 'transformation-portfolio-management'

BOOK15 = "Health Transformation Review, Transforming Healthcare (HTR book v42), Chapter 15 — https://healthtransformationreview.org/read/chapter-15"

def _words(body):
    return sum(len(b['children'][0]['text'].split()) for b in body
               if b.get('_type') == 'block' and b.get('style') != 'h2')

def run(lessons):
    ok = True
    for slug, title, body, order in lessons:
        keys = [b['_key'] for b in body]
        h2s = sum(1 for b in body if b.get('style') == 'h2') - 1
        srcs = sum(1 for b in body if b['_key'].startswith('src') and b['_key'] != 'src')
        tw = [b for b in body if b.get('_type') == 'takeawayBlock']
        qz = [b for b in body if b.get('_type') == 'knowledgeCheck']
        correct = sum(o['isCorrect'] for o in qz[0]['options']) if qz else 0
        dup = len(keys) != len(set(keys))
        words = _words(body)
        print(f"{slug}: blocks={len(body)} sections={h2s} words={words} sources={srcs} "
              f"takeaways={len(tw[0]['points']) if tw else 0} quiz_ok={correct == 1} dup_keys={dup}")
        ok &= (not dup and len(body) >= 20 and h2s >= 5 and srcs >= 4 and tw and qz
               and correct == 1 and 6 <= len(tw[0]['points']) <= 8 and words >= 1200)
    if not ok:
        raise SystemExit('quality bar not met')
    if '--commit' in sys.argv:
        for slug, title, body, order in lessons:
            post(slug, title, body, course_slug=COURSE, order=order)
