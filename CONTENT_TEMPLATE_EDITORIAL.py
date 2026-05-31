"""
HTR Platform — Editorial Content Template
==========================================
Use this file to write Policy Analysis articles and Blog Posts to Sanity.
Same pattern as CONTENT_TEMPLATE.py but for editorial content, not Academy lessons.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOCK TYPES AND WHAT THEY LOOK LIKE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEXT & STRUCTURE
─────────────────
  p()          → Normal paragraph (body prose)
  h2()         → Section header
  h3()         → Sub-section header
  blockquote() → Pull quote — indented, styled quote block
  bullets()    → Bulleted list — pass a list of strings
  numbered()   → Numbered list — pass a list of strings

MEDIA
──────
  img()        → Image with caption. URL must be cdn.sanity.io or upload.wikimedia.org.
  vid()        → Embedded video — YouTube, Vimeo, or direct MP4.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT RULES — NON-NEGOTIABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ACCURACY OVER SPEED — ALWAYS
  ─────────────────────────────
  Do NOT rush. Do NOT write an article until every claim is verified.
  A slow accurate article is infinitely better than a fast hallucinated one.
  Take the time to search. There is no deadline that justifies publishing
  wrong information on a healthcare intelligence platform.

  MINIMUM CONTENT LENGTH
  ───────────────────────
  Every article MUST be substantive. Minimum requirements:
    - At least 4 sections (4 × h2 blocks)
    - At least 2 paragraphs per section — 3 preferred
    - Minimum ~800 words of prose across all p() blocks combined
    - At least one bullets() or numbered() list
    - summary field: exactly 2–3 sentences, must stand alone on a card

  1. Web search every specific claim before writing it:
       - Legislation names, act numbers, statute citations
       - Statistics, percentages, dollar amounts
       - Named programs, organizations, agencies, dates
     NEVER skip this step to save time.
     If you cannot find a source, leave it out. No "reportedly" or "approximately".

  2. Tone: Expert and authoritative, readable by senior health policy professionals.
     No jargon without definition. Not a textbook — a focused intelligence briefing.

  3. Structure per article:
       Lead paragraph (the key finding — the "so what")
       3–4 body sections with h2() headers
       bullets() or numbered() for multi-item breakdowns
       Closing section: implications or what to watch

  4. summary field: 2–3 sentences, shown on article cards. Must stand alone.
     Lead with the most important fact. Include pillar/policy context.

  5. All _key values must be unique within the document.
     Convention: p1, p2, h1, h2, h3, q1, b1, b2, v1, img1 ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PILLAR & CATEGORY — use exact strings below
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Pillars: 'Policy' | 'Economics' | 'Technology' | 'Clinical' | 'Equity'

  Categories:
    Policy:     'Regulation & Legislation' | 'Public Health Mandates'
                'Global & Comparative Policy' | 'Policy Feasibility Studies'
    Economics:  'Value-Based Care Models' | 'Market & Finance'
                'Labor & Workforce Strategy' | 'Healthcare Investment Trends'
    Technology: 'AI & Machine Learning' | 'Digital Health & Telemedicine'
                'Data Security & Governance' | 'Tech-Enabled Workflow'
    Clinical:   'Hospital-at-Home' | 'Precision Medicine'
                'Virtual Care Models' | 'Population Health'
    Equity:     'SDOH Integration' | 'Algorithmic Bias'
                'Access Disparity' | 'Community Engagement'

  Status (optional):    'Active' | 'Proposed' | 'In Committee'
  Impact level:         'Critical' | 'High' | 'Medium'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

import json, subprocess

TOKEN      = "YOUR_SANITY_WRITE_TOKEN"   # from frontend/.env.local — SANITY_API_TOKEN
PROJECT_ID = "fxz10xl7"
API        = f"https://{PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/production"


# ══════════════════════════════════════════════════════════════════════════════
# BLOCK HELPERS
# ══════════════════════════════════════════════════════════════════════════════

def p(k, text):
    """Normal paragraph."""
    return {'_type':'block','_key':k,'style':'normal','markDefs':[],'children':[
        {'_type':'span','_key':k+'s','text':text,'marks':[]}
    ]}

def h2(k, text):
    """Section header."""
    return {'_type':'block','_key':k,'style':'h2','markDefs':[],'children':[
        {'_type':'span','_key':k+'s','text':text,'marks':[]}
    ]}

def h3(k, text):
    """Sub-section header."""
    return {'_type':'block','_key':k,'style':'h3','markDefs':[],'children':[
        {'_type':'span','_key':k+'s','text':text,'marks':[]}
    ]}

def blockquote(k, text):
    """Pull quote."""
    return {'_type':'block','_key':k,'style':'quote','markDefs':[],'children':[
        {'_type':'span','_key':k+'s','text':text,'marks':[]}
    ]}

def bullets(k, items):
    """Bulleted list. Returns a list — unpack with *bullets(...) in the body array."""
    return [{'_type':'block','_key':f'{k}_{i}','style':'normal',
              'listItem':'bullet','level':1,'markDefs':[],'children':[
                {'_type':'span','_key':f'{k}_{i}s','text':item,'marks':[]}
              ]} for i,item in enumerate(items,1)]

def numbered(k, items):
    """Numbered list. Returns a list — unpack with *numbered(...) in the body array."""
    return [{'_type':'block','_key':f'{k}_{i}','style':'normal',
              'listItem':'number','level':1,'markDefs':[],'children':[
                {'_type':'span','_key':f'{k}_{i}s','text':item,'marks':[]}
              ]} for i,item in enumerate(items,1)]

def img(k, url, caption='', alt=''):
    """Image with caption. URL must be cdn.sanity.io or upload.wikimedia.org."""
    return {'_type':'image','_key':k,'url':url,'caption':caption,'alt':alt}

def vid(k, url, caption=''):
    """Embedded video — YouTube, Vimeo, or direct MP4."""
    return {'_type':'video','_key':k,'url':url,'caption':caption}


# ══════════════════════════════════════════════════════════════════════════════
# POST TO SANITY
# ══════════════════════════════════════════════════════════════════════════════

def post_analysis(slug, title, pillar, category, summary, body,
                  impact='High', status=None, published=None):
    """Write a Policy Analysis article to Sanity."""
    doc = {
        '_type': 'policyAnalysis',
        '_id':   slug,
        'slug':  {'_type':'slug','current':slug},
        'title': title,
        'pillar': pillar,
        'category': category,
        'impactLevel': impact,
        'summary': summary,
        'body': body,
    }
    if status:    doc['status']      = status
    if published: doc['publishedAt'] = published
    _mutate(slug, doc)

def post_blog(slug, title, body, published=None):
    """Write a Blog Post to Sanity."""
    doc = {
        '_type': 'post',
        '_id':   slug,
        'slug':  {'_type':'slug','current':slug},
        'title': title,
        'body':  body,
    }
    if published: doc['publishedAt'] = published
    _mutate(slug, doc)

def _mutate(slug, doc):
    payload = {'mutations': [{'createOrReplace': doc}]}
    with open('/tmp/_editorial.json', 'w') as f: json.dump(payload, f)
    r = subprocess.run([
        'curl','-s','-X','POST', API,
        '-H','Content-Type: application/json',
        '-H',f'Authorization: Bearer {TOKEN}',
        '-d','@/tmp/_editorial.json'
    ], capture_output=True, text=True)
    if '"error"' in r.stdout or '"errors"' in r.stdout:
        print(f"FAIL {slug}: {r.stdout[:300]}")
    else:
        print(f"OK: {slug}")


# ══════════════════════════════════════════════════════════════════════════════
# ARTICLE TEMPLATE — copy this block for every new article
# ══════════════════════════════════════════════════════════════════════════════

SLUG      = "pillar-topic-keyword"       # e.g. 'economics-vbc-medicare-advantage-2025'
TITLE     = "Article Headline Here"
PILLAR    = "Economics"                  # one of the 5 pillars
CATEGORY  = "Value-Based Care Models"   # must match exact string from list above
IMPACT    = "High"                       # 'Critical' | 'High' | 'Medium'
STATUS    = None                         # 'Active' | 'Proposed' | 'In Committee' | None
PUBLISHED = "2026-05-29T00:00:00Z"      # ISO datetime

SUMMARY = (
    "2–3 sentence executive abstract shown on article cards. "
    "Lead with the most important fact. Include pillar and policy context."
)

body = [

    # ── LEAD ──────────────────────────────────────────────────────────────────
    p('p1', 'Lead paragraph — the key development or finding. The "so what" up front.'),

    # ── SECTION 1 ─────────────────────────────────────────────────────────────
    h2('h1', 'First Section Title'),
    p('p2', 'Paragraph of verified factual prose.'),
    p('p3', 'Second paragraph.'),

    # ── SECTION 2 ─────────────────────────────────────────────────────────────
    h2('h2', 'Second Section Title'),
    p('p4', 'Paragraph.'),
    *bullets('b1', [
        'First bullet point.',
        'Second bullet point.',
        'Third bullet point.',
    ]),

    # ── SECTION 3 (optional) ──────────────────────────────────────────────────
    h2('h3', 'Implications / What to Watch'),
    p('p5', 'Closing paragraph — what this means for stakeholders.'),
    p('p6', 'Final thought.'),

    # ── OPTIONAL ──────────────────────────────────────────────────────────────
    # blockquote('q1', 'Expert or policy quote.'),
    # *numbered('n1', ['Step or item one.', 'Step or item two.']),
    # img('img1', 'https://upload.wikimedia.org/...image.jpg', 'Caption', 'Alt text'),
    # vid('v1', 'https://www.youtube.com/watch?v=VIDEOID', 'Caption'),
]

# Uncomment to write to Sanity:
# post_analysis(SLUG, TITLE, PILLAR, CATEGORY, SUMMARY, body, IMPACT, STATUS, PUBLISHED)
