"""
HTR Academy — Content Writing Template
======================================
Use this file to write any lesson to Sanity.
Every function produces a block the renderer knows how to display.
DO NOT invent new block structures — use ONLY these helpers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOCK TYPES AND WHAT THEY LOOK LIKE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEXT & STRUCTURE
─────────────────
  blk()       → Normal paragraph text (slate, 15px, relaxed leading)
  h2()        → Section header with indigo separator line, auto-numbered
                "SECTION #1 / SECTION #2 ..." — bold, left indigo border
  h3()        → Sub-section header — small caps, indigo square bullet, no line
  callout()   → 💡 KEY CONCEPT — indigo left-border card, light indigo background
  highlight() → 📌 REMEMBER THIS — amber floating badge above amber card
  quote()     → Pullquote — dark slate card, centered, white italic text,
                indigo decorative quote marks top-left and bottom-right

VISUAL LEARNING
────────────────
  analogy()   → 🔗 ANALOGY — violet card with oversized quote mark decoration.
                Use ONCE per lesson maximum.
  stat_grid() → 📊 Stat cards — 2 to 4 colored cards with big number, label,
                context line. Numbers are text-2xl. Max 4 stats per grid.
                Cards use alternating indigo / emerald / amber / rose colors.
  example()   → 🌍 REAL-WORLD EXAMPLE — teal left-border card. Named real
                organizations or cases only. Multi-paragraph content supported
                (separate paragraphs with \n in the content string).
  steps()     → 📋 Numbered process steps — indigo header bar, numbered circles
                connected by a vertical line. Use for workflows and procedures.
  compare()   → ⚖️  Two-column comparison — rose left column / emerald right column.
                Each column has a label and a list of bullet points.
  warning()   → ⚠️  WARNING — amber header bar, white body. Use for exceptions,
                caveats, common mistakes, legal nuances, "don't confuse X with Y".

MEDIA
──────
  video()     → Embedded video — YouTube iframe (aspect-ratio 16:9), max-width 3xl,
                centered. Supports YouTube, Vimeo, direct MP4/WebM URLs.
  audio()     → Custom audio player — play/pause button, skip ±15s/30s, speed
                toggle (0.75× to 2×), progress bar with timestamps. Max-width 2xl,
                centered. Supports direct MP3/M4A, Spotify embed, SoundCloud embed.
                IMPORTANT: audio URLs must allow CORS (Access-Control-Allow-Origin: *).
                Use Wikimedia Commons or Sanity-hosted files — NOT soundhelix.com.
  image()     → Image with caption — max-width 2xl, centered, rounded corners.
                Use direct HTTPS URLs. For Sanity-hosted images upload via Studio.
                IMPORTANT: image URLs must be in the CSP img-src allowlist:
                  Allowed: cdn.sanity.io, upload.wikimedia.org, img.youtube.com
                  NOT allowed: arbitrary third-party image hosts without CSP entry.
  table()     → Data table — dark slate header bar with macOS-style dots, white
                body, alternating row shading. Max-width 2xl, centered.
                Column header keys must be single words or use underscores (no spaces).

ASSESSMENT & SUMMARY
─────────────────────
  takeaway()  → ✅ KEY TAKEAWAYS — emerald left-border card, numbered list.
                USE AT END OF EVERY LESSON. 5 to 8 points, one sentence each.
  quiz()      → 🧠 KNOWLEDGE CHECK — interactive multiple-choice. Click an option
                to reveal correct (green ✓) / incorrect (red ✗) feedback plus
                explanation. USE AT END OF EVERY LESSON. Exactly one correct answer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTENT RULES — NON-NEGOTIABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ACCURACY OVER SPEED — ALWAYS
  ─────────────────────────────
  Do NOT rush. Do NOT write a lesson until every claim is verified.
  A slow accurate lesson is infinitely better than a fast hallucinated one.
  If web search takes time, take the time. There is no deadline that justifies
  publishing wrong information on a healthcare education platform.

  MINIMUM CONTENT LENGTH
  ───────────────────────
  Every lesson MUST be substantive. Minimum requirements:
    - At least 5 sections (5 × h2 blocks)
    - At least 2 paragraphs (blk) per section — 3 preferred
    - At least 1 visual block per section (stat_grid, example, steps, compare, etc.)
    - Minimum ~1,500 words of prose across all blk() blocks combined
    - Takeaway: exactly 6–8 points (not 5 minimum — aim for 7)
    - Quiz: 4 options, one correct, explanation ≥ 2 sentences
  A lesson that feels thin or short is not done. Add depth, not filler.

  1. WEB SEARCH EVERY specific claim before writing it:
       - Legislation names, act numbers, statute citations
       - Statistics, percentages, dollar amounts
       - Named programs, organizations, agencies, dates
       - Any number or fact that could be wrong if hallucinated
     Show the search query and result before writing the claim.
     NEVER skip this step to save time.

  2. If you cannot find a source, DO NOT write the claim. Leave it out entirely.
     Do not write "approximately" or "reportedly" as a workaround.

  3. Every lesson MUST end with this exact sequence:
       takeaway() → quiz() → h2('src','Sources') → blk() for each numbered source

  4. Sources format: '[N] Title — URL — what specific claim this supports'
     Minimum 4 sources per lesson. More is better.

  5. analogy() — use ONCE per lesson maximum.

  6. stat_grid() — use ONLY for numbers you have verified with a traceable source.
     Always include the source name in the context string of each stat.

  7. example() — use ONLY for real named organizations or cases you can verify.
     Do not invent composite examples or fictional case studies.

  8. table() column header keys must not contain spaces.
     Use underscores: 'Risk_Bearer' not 'Risk Bearer' (Sanity validation error).

  9. All _key values in a lesson must be unique strings.
     Convention: s1h1, s1p1, s1p2, s1c1, s1sg1, s2h1, s2p1, ... tw, qz, src, src1, src2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LESSON STRUCTURE (follow this pattern for every section)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [h2 — Section title]
  [blk × 2-3 paragraphs of factual prose]
  [ONE of: callout | highlight | analogy | quote]
  [ONE or more of: stat_grid | example | steps | compare | warning | video | audio | image | table]

  [h2 — Next section] ... repeat ...

  [takeaway]
  [quiz]
  [h2('src', 'Sources')]
  [blk for each numbered source]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

import json, re, urllib.request

# ── Token — read from env file, never hardcoded ────────────────────────────────
def _read_token():
    with open('/Users/baba/Vermont-Health-Platform/frontend/.env.local') as f:
        return re.search(r'SANITY_API_TOKEN\s*=\s*(.+)', f.read()).group(1).strip()

PROJECT_ID = "fxz10xl7"
API = f"https://{PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/production"


# ══════════════════════════════════════════════════════════════════════════════
# TEXT & STRUCTURE
# ══════════════════════════════════════════════════════════════════════════════

def blk(k, t, s='normal'):
    """Normal paragraph."""
    return {'_type':'block','_key':k,'style':s,'markDefs':[],'children':[
        {'_type':'span','_key':k+'s','text':t,'marks':[]}
    ]}

def h2(k, t):
    """Section header — indigo separator line, auto-numbered Section #1, #2..."""
    return blk(k, t, 'h2')

def h3(k, t):
    """Sub-section header — small caps with indigo square bullet, no separator line."""
    return blk(k, t, 'h3')

def callout(k, t):
    """💡 Key Concept — indigo left-border card. Use for definitions and core theory."""
    return blk(k, t, 'callout')

def highlight(k, t):
    """📌 Remember This — amber floating-badge card. Use for must-memorize facts."""
    return blk(k, t, 'highlight')

def quote(k, t):
    """Pullquote — dark slate card, centered, white italic text, indigo quote marks.
    Use for expert voice, powerful statements, or reflection prompts."""
    return blk(k, t, 'quote')


# ══════════════════════════════════════════════════════════════════════════════
# VISUAL LEARNING BLOCKS
# ══════════════════════════════════════════════════════════════════════════════

def analogy(k, text, concept):
    """🔗 Analogy — violet card with decorative quote mark.
    text:    the analogy written in plain everyday language
    concept: the healthcare concept being explained (shown as subtitle)
    Use ONCE per lesson maximum.
    """
    return {'_type':'analogyBlock','_key':k,'analogy':text,'concept':concept}

def stat_grid(k, stats):
    """📊 Stat cards — 2 to 4 verified statistics as colored visual cards.
    stats: list of (value, label, context) tuples
      value:   the big number/text  e.g. '$5.3T', '18.0%', '47M', '1 in 3'
      label:   short label          e.g. 'US Health Spending 2024'
      context: one sentence + source e.g. 'CMS National Health Expenditure Report 2024'
    Numbers render at text-2xl. Use max 4 stats per grid (2 or 4 preferred).
    ONLY use numbers verified with a traceable source.
    """
    return {'_type':'statGrid','_key':k,'stats':[
        {'_key':f's{i}','value':s[0],'label':s[1],'context':s[2]}
        for i,s in enumerate(stats,1)
    ]}

def example(k, title, content):
    """🌍 Real-World Example — teal left-border card.
    title:   organization name or case name (e.g. 'Vermont Blueprint for Health')
    content: what happened, why it matters, outcome. 2-5 sentences.
             Separate paragraphs with \\n for multi-paragraph rendering.
    Use ONLY for real named cases you can verify with a source.
    """
    return {'_type':'exampleBlock','_key':k,'title':title,'content':content}

def steps(k, title, items):
    """📋 Numbered step process — indigo header, numbered circles with connector line.
    title: name of the process (shown in indigo header bar)
    items: list of (step_title, step_description) tuples
    """
    return {'_type':'stepBlock','_key':k,'title':title,'steps':[
        {'_key':f'step{i}','title':t,'description':d}
        for i,(t,d) in enumerate(items,1)
    ]}

def compare(k, title, left_label, left_points, right_label, right_points):
    """⚖️ Two-column comparison — rose left / emerald right.
    title:        shown in header bar above both columns
    left_label:   header for left column  (e.g. 'Fee-for-Service')
    left_points:  list of strings — bullet points for left column
    right_label:  header for right column (e.g. 'Value-Based Care')
    right_points: list of strings — bullet points for right column
    """
    return {'_type':'comparisonBlock','_key':k,'title':title,
        'left':{'label':left_label,'points':left_points},
        'right':{'label':right_label,'points':right_points}}

def warning(k, title, message):
    """⚠️ Warning / Important Note — amber header bar, white body.
    title:   short label in amber header (e.g. 'Common Misconception')
    message: warning body — 1 to 3 sentences
    Use for: exceptions, caveats, legal nuances, 'don't confuse X with Y'.
    """
    return {'_type':'warningBlock','_key':k,'title':title,'message':message}


# ══════════════════════════════════════════════════════════════════════════════
# MEDIA BLOCKS
# ══════════════════════════════════════════════════════════════════════════════

def video(k, url, caption):
    """Embedded video — 16:9 aspect ratio, max-width 3xl, centered.
    url:     YouTube (https://www.youtube.com/watch?v=... or https://youtu.be/...)
             Vimeo, or direct .mp4 / .webm URL
    caption: text displayed below the player
    """
    return {'_type':'video','_key':k,'url':url,'caption':caption}

def audio(k, title, url, summary=''):
    """Custom audio player — play/pause, skip ±15/30s, speed 0.75×–2×, progress bar.
    title:   display title shown in player header
    url:     MUST be a CORS-enabled URL (Access-Control-Allow-Origin: *).
             Safe sources: upload.wikimedia.org, cdn.sanity.io, NASA public files.
             UNSAFE / will fail: soundhelix.com, learningcontainer.com, most CDNs.
    summary: optional one-sentence description shown below the title
    Spotify and SoundCloud URLs are embedded via iframe automatically.
    """
    return {'_type':'audio','_key':k,'title':title,'url':url,'summary':summary}

def image(k, url, caption='', alt=''):
    """Image with optional caption — max-width 2xl, centered, rounded.
    url:     MUST be in the CSP allowlist. Safe sources:
               https://cdn.sanity.io/...
               https://upload.wikimedia.org/...
             Anything else will be blocked by Content Security Policy.
    caption: text below the image
    alt:     screen reader description
    For Sanity-hosted images: upload via Sanity Studio, use the asset URL from there.
    """
    return {'_type':'image','_key':k,'url':url,'caption':caption,'alt':alt}

def table(k, title, rows):
    """Data table — dark header bar, alternating rows, max-width 2xl, centered.
    title: shown in dark header bar (e.g. 'Payment Model Comparison')
    rows:  list of dicts — ALL dicts must have identical keys.
           IMPORTANT: column header keys must NOT contain spaces.
           Use underscores: 'Risk_Bearer' not 'Risk Bearer' (causes Sanity error).
    Example:
      table('t1', 'Payment Model Comparison', [
          {'Model': 'Fee-for-Service', 'Incentive': 'Volume',     'Risk': 'Payer'},
          {'Model': 'Capitation',      'Incentive': 'Efficiency', 'Risk': 'Provider'},
      ])
    """
    return {'_type':'code','_key':k,'title':title,'language':'json','code':rows}


# ══════════════════════════════════════════════════════════════════════════════
# ASSESSMENT & SUMMARY
# ══════════════════════════════════════════════════════════════════════════════

def takeaway(k, points):
    """✅ Key Takeaways — emerald left-border card, numbered list. END OF EVERY LESSON.
    points: list of strings — 5 to 8 complete sentences summarizing the lesson.
    """
    return {'_type':'takeawayBlock','_key':k,'points':points}

def quiz(k, question, options, explanation):
    """🧠 Knowledge Check — interactive multiple-choice. END OF EVERY LESSON.
    question:    the question string
    options:     list of (option_text, is_correct) tuples — EXACTLY ONE must be True
    explanation: shown after answering — explains WHY the correct answer is correct
    """
    return {'_type':'knowledgeCheck','_key':k,'question':question,
        'options':[{'_key':f'opt{i}','text':t,'isCorrect':c} for i,(t,c) in enumerate(options,1)],
        'explanation':explanation}


# ══════════════════════════════════════════════════════════════════════════════
# POST TO SANITY
# ══════════════════════════════════════════════════════════════════════════════

def post(slug, title, body, course_slug=None, order=None):
    """Write a lesson body to Sanity CMS.
    slug:         must exactly match the _id in Sanity (e.g. 'interop-fhir-intro')
    title:        lesson display title
    body:         list of block dicts built with the helpers above
    course_slug:  e.g. 'healthcare-interoperability' (optional but recommended)
    order:        integer sort position within the course (optional)
    """
    TOKEN = _read_token()
    doc = {
        '_type': 'academyModule',
        '_id':   slug,
        'slug':  {'_type':'slug','current':slug},
        'title': title,
        'body':  body,
    }
    if course_slug: doc['courseSlug'] = course_slug
    if order is not None: doc['order'] = order
    payload = json.dumps({'mutations':[{'createOrReplace': doc}]}).encode()
    req = urllib.request.Request(API, data=payload, headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {TOKEN}',
    })
    with urllib.request.urlopen(req) as r:
        result = json.loads(r.read())
    txn = result.get('transactionId','?')
    op  = result.get('results',[{}])[0].get('operation','?')
    print(f"OK: {slug} | txn={txn} | op={op}")


# ══════════════════════════════════════════════════════════════════════════════
# LESSON TEMPLATE — copy this block for every new lesson
# ══════════════════════════════════════════════════════════════════════════════

LESSON_SLUG  = "course-prefix-lesson-name"   # must match Supabase sanity_slug exactly
LESSON_TITLE = "Lesson Title Here"

body = [

    # ── SECTION 1 ──────────────────────────────────────────────────────────────
    h2('s1h1', 'First Section Title'),
    blk('s1p1', 'First paragraph. Two to three sentences of verified factual prose.'),
    blk('s1p2', 'Second paragraph. Continues the section narrative.'),
    callout('s1c1', 'Key concept definition — one to two sentences.'),
    stat_grid('s1sg1', [
        ('VALUE', 'Short Label', 'One sentence with source name'),
        ('VALUE', 'Short Label', 'One sentence with source name'),
    ]),

    # ── SECTION 2 ──────────────────────────────────────────────────────────────
    h2('s2h1', 'Second Section Title'),
    blk('s2p1', 'Paragraph with verified facts.'),
    blk('s2p2', 'Second paragraph.'),
    example('s2ex1', 'Organization or Case Name',
        'What happened. Why it matters. What the outcome was.\n'
        'Second paragraph if needed (separate with \\n).'),

    # ── SECTION 3 ──────────────────────────────────────────────────────────────
    h2('s3h1', 'Third Section Title'),
    blk('s3p1', 'Paragraph.'),
    steps('s3st1', 'Process Name', [
        ('Step 1 Title', 'Step 1 description.'),
        ('Step 2 Title', 'Step 2 description.'),
        ('Step 3 Title', 'Step 3 description.'),
    ]),

    # ── OPTIONAL BLOCKS — uncomment when you have verified content ─────────────
    # h3('s3h2', 'Sub-section title'),
    # highlight('s3hl1', 'Must-memorize fact.'),
    # warning('s3w1', 'Warning Title', 'Warning message — 1-3 sentences.'),
    # compare('s3cmp1', 'Comparison Title',
    #     'Left Column Label', ['Point 1', 'Point 2', 'Point 3'],
    #     'Right Column Label', ['Point 1', 'Point 2', 'Point 3']),
    # quote('s3q1', 'Powerful statement or expert quote goes here.'),
    # analogy('s3an1', 'Analogy in plain language.', 'Healthcare concept being explained'),
    # video('v1', 'https://www.youtube.com/watch?v=VIDEOID', 'Caption text'),
    # audio('a1', 'Episode Title', 'https://upload.wikimedia.org/...file.mp3', 'What this covers'),
    # image('img1', 'https://upload.wikimedia.org/...image.jpg', 'Caption', 'Alt text'),
    # table('t1', 'Table Title', [
    #     {'Column_One': 'Value', 'Column_Two': 'Value', 'Column_Three': 'Value'},
    #     {'Column_One': 'Value', 'Column_Two': 'Value', 'Column_Three': 'Value'},
    # ]),

    # ── END OF LESSON — REQUIRED ───────────────────────────────────────────────
    takeaway('tw', [
        'First key takeaway — one complete sentence.',
        'Second key takeaway — one complete sentence.',
        'Third key takeaway — one complete sentence.',
        'Fourth key takeaway — one complete sentence.',
        'Fifth key takeaway — one complete sentence.',
    ]),

    quiz('qz',
        'The quiz question?',
        [
            ('Wrong option A', False),
            ('Correct answer', True),
            ('Wrong option B', False),
            ('Wrong option C', False),
        ],
        'Explanation of why the correct answer is correct. One to two sentences.'
    ),

    h2('src', 'Sources'),
    blk('src1', '[1] Source Title — https://full-url.com — what specific claim this supports'),
    blk('src2', '[2] Source Title — https://full-url.com — what specific claim this supports'),
]

# Uncomment to write to Sanity:
# post(LESSON_SLUG, LESSON_TITLE, body)
