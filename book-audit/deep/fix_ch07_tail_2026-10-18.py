#!/usr/bin/env python3
"""Ch7 2026-10-18 (own checks after applying ch07_findings): stat cards presented worked-example assumptions as facts
($15,000 per hospitalization, $1,800 per ED visit, '3–5x' ROI) — relabelled as the example's assumptions, ROI set to the
worked example's own 3.75x; the $1,800 in two examples labelled 'assumed'; unsourced superlative softened."""
import os, sys
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(REPO, 'book-build')); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import patch_docx as P
from docx_text import replace_text


def my_apply(x, _):
    x = replace_text(x, 'Avg. Inpatient Cost Prevented', 'Assumed Cost per Hospitalization (example)', 1)
    x = replace_text(x, 'Avg. Preventable ED Visit', 'Assumed Cost per Avoidable ED Visit (examples)', 1)
    x = replace_text(x, '3–5x', '3.75x', 1)
    x = replace_text(x, 'Care Management ROI Range', 'Care Management Return in the Worked Example', 1)
    x = replace_text(x, 'preventing 500 avoidable ED visits/year at $1,800 each', 'preventing 500 avoidable ED visits/year at an assumed $1,800 each', 1)
    x = replace_text(x, 'each prevented = $1,800 saved plus downstream cost avoidance.', 'each prevented saves an assumed $1,800 plus downstream cost avoidance.', 1)
    x = replace_text(x, 'This domain is Vermont’s most significant organizational gap —', 'This domain is a significant organizational gap for Vermont —', 1)
    print('  ok: Ch7 stat cards x4, examples x2, superlative')
    return x


def tail_apply(x, _):
    # Pass 2 (tail L3696–3742): sources — Jones et al., Population Health Management (2008–2013 data: ~$5.8M less spending
    # per $1M spent); Blueprint 2016 annual report ($3–3.80 per $1); RTI MAPCP final report 2017 (return on fees 4.49).
    x = replace_text(x, 'primary care is the highest-return investment a healthcare system can make: the same $1 invested in primary care produces greater total cost of care reduction than $1 invested in hospital care or specialty care.',
                     'primary care is among the highest-return investments a health system can make, because a dollar spent upstream can prevent many dollars of hospital and specialty care.', 1)
    x = replace_text(x, 'Vermont’s own evaluation data confirms the 5.8:1 ROI.',
                     'Vermont’s own evaluations support it: a peer-reviewed analysis of 2008–2013 data found about $5.80 less in medical spending for every $1 spent on the Blueprint (Jones et al., Population Health Management), the 2016 Blueprint annual report estimated $3.00–$3.80 per dollar, and the federal MAPCP evaluation found a return of 4.49 on Medicare’s fees.', 1)
    x = replace_text(x, 'as Act 68’s passthrough requirement intends,', 'as Act 68’s monitoring requirement is meant to check,', 1)
    x = replace_text(x, 'Typically 50-75% for one-sided risk models, and reaches 100% in global-risk models such as ACO REACH.',
                     'Up to 40% in MSSP’s one-sided levels, 50–75% in its two-sided tracks, and 100% in global-risk models such as ACO REACH’s Global option (succeeded in 2027 by CMS’s LEAD model).', 1)
    x = replace_text(x, 'typically 2-3.5% of benchmark', '2.0–3.9% of benchmark in MSSP’s one-sided track, depending on ACO size', 1)
    print('  ok: Ch7 tail x5')
    return x


if __name__ == '__main__':
    if '--dry' in sys.argv:
        import zipfile, xml.dom.minidom
        xml.dom.minidom.parseString((tail_apply if '--tail' in sys.argv else my_apply)(zipfile.ZipFile(P.DOCX).read('word/document.xml').decode(), None).encode()); print('DRY OK')
    else:
        P.apply = tail_apply if '--tail' in sys.argv else my_apply; P.main([{'op': 'noop'}])
