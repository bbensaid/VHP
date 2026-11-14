"""Writes six architecture diagrams as standalone HTML+SVG files (rendered to PNG by headless Chrome)."""
import os, sys
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)

NAVY = "#1F3A5F"; INK = "#222"; GREY = "#666"
FILL = {  # category -> (fill, stroke)
    "host": ("#E3EDF7", "#5B7FA6"), "data": ("#E6F4EA", "#5E9B6E"), "ai": ("#FFF0DE", "#C98A3A"),
    "you": ("#F1EEF8", "#8A78B5"), "ext": ("#FFFFFF", "#8A8A8A"), "code": ("#F2F2F2", "#7A7A7A"),
}

def esc(s): return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def box(x, y, w, h, title, lines=(), kind="host", tsize=17):
    f, s = FILL[kind]
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="9" fill="{f}" stroke="{s}" stroke-width="2"/>']
    n = 1 + len(lines); top = y + h / 2 - (n - 1) * 10 + 5
    out.append(f'<text x="{x+w/2}" y="{top}" text-anchor="middle" font-size="{tsize}" font-weight="700" fill="{NAVY}">{esc(title)}</text>')
    for i, l in enumerate(lines):
        out.append(f'<text x="{x+w/2}" y="{top + 21*(i+1)}" text-anchor="middle" font-size="13.5" fill="{INK}">{esc(l)}</text>')
    return "\n".join(out)

def arrow(pts, label=None, lx=None, ly=None, dashed=False, color="#444", halo=False, anchor="middle", both=False):
    d = "M " + " L ".join(f"{x},{y}" for x, y in pts)
    dash = ' stroke-dasharray="7 5"' if dashed else ""
    start = ' marker-start="url(#ah0)"' if both else ""
    out = []
    if halo:
        out.append(f'<path d="{d}" fill="none" stroke="#fff" stroke-width="9"/>')
    out.append(f'<path d="{d}" fill="none" stroke="{color}" stroke-width="2.2"{dash} marker-end="url(#ah)"{start}/>')
    if label:
        for i, part in enumerate(label.split("|")):
            out.append(f'<text x="{lx}" y="{ly + i*15}" text-anchor="{anchor}" font-size="12.5" fill="{GREY}" font-style="italic">{esc(part)}</text>')
    return "\n".join(out)

def badge(x, y, n):
    return (f'<circle cx="{x}" cy="{y}" r="13" fill="{NAVY}"/>'
            f'<text x="{x}" y="{y+5}" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">{n}</text>')

def legend(x, y, items):
    out = []
    for i, (kind, text) in enumerate(items):
        f, s = FILL[kind]; xx = x + i * 175
        out.append(f'<rect x="{xx}" y="{y}" width="18" height="14" rx="3" fill="{f}" stroke="{s}" stroke-width="1.5"/>')
        out.append(f'<text x="{xx+25}" y="{y+12}" font-size="12.5" fill="{INK}">{esc(text)}</text>')
    return "\n".join(out)

def page(name, w, h, body):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" font-family="Arial, Helvetica, sans-serif">
<defs>
<marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#444"/></marker>
<marker id="ah0" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#444"/></marker>
</defs>
<rect width="{w}" height="{h}" fill="#fff"/>
{body}
</svg>'''
    html = f'<!doctype html><html><head><meta charset="utf-8"><style>html,body{{margin:0;padding:0;background:#fff;overflow:hidden}}</style></head><body>{svg}</body></html>'
    with open(os.path.join(OUT, name + ".html"), "w") as f:
        f.write(html)
    print(name, w, h)

# ───────── 1. Architecture
b = []
b.append(box(400, 18, 200, 46, "Visitor's browser", kind="ext"))
b.append(box(400, 92, 200, 40, "4 web addresses (domains)", kind="ext", tsize=14))
b.append(box(330, 160, 340, 92, "Vercel — the website", ["Next.js pages · /api functions", "midnight cache refresh"], "host"))
b.append(box(760, 160, 215, 92, "Sanity", ["content library + studio", "articles · lesson bodies"], "data"))
b.append(box(25, 160, 225, 92, "GitHub", ["stores all code + history", "push → automatic deploy"], "code"))
b.append(box(400, 300, 270, 112, "Fly.io — AI Analyst", ["Python program (FastAPI)", "+ FlashRank result sorter", "1 small server, stops when idle"], "host"))
b.append(box(760, 288, 215, 58, "Groq", ["writes answers · free"], "ai"))
b.append(box(760, 362, 215, 74, "OpenAI", ["search embeddings", "backup answers · audio"], "ai"))
b.append(box(330, 485, 645, 98, "Supabase — the database", ["Academy courses/tracks/lessons · access codes · user data",
                                                          "AI library: 59,412 passages · narration audio files"], "data"))
b.append(box(25, 318, 225, 96, "Your Mac — workshop", ["edit & test code · book scripts", "audio · library loading"], "you"))
b.append(box(25, 485, 225, 98, "Google Docs", ["the book manuscript", "you edit + export PDF"], "you"))
b.append(arrow([(500, 64), (500, 92)]))
b.append(arrow([(500, 132), (500, 160)]))
b.append(arrow([(670, 206), (760, 206)], "page content", 715, 198))
b.append(arrow([(250, 196), (330, 196)], "every push", 290, 188))
b.append(arrow([(250, 230), (288, 230), (288, 356), (400, 356)], "backend|changes", 294, 290, dashed=True, anchor="start"))
b.append(arrow([(355, 252), (355, 485)], "site data", 362, 470, halo=True, anchor="start"))
b.append(arrow([(535, 252), (535, 300)], "AI questions", 542, 280, anchor="start"))
b.append(arrow([(670, 330), (760, 318)]))
b.append(arrow([(670, 392), (760, 398)]))
b.append(arrow([(535, 412), (535, 485)], "searches library", 542, 452, anchor="start"))
b.append(arrow([(137, 318), (137, 252)], "git push", 145, 290, anchor="start"))
b.append(arrow([(137, 414), (137, 485)], "download /|upload .docx", 129, 444, anchor="end", both=True))
b.append(arrow([(250, 400), (300, 400), (300, 534), (330, 534)], "loads library,|backups", 294, 452, dashed=True, anchor="end"))
b.append(legend(25, 610, [("host", "rented servers"), ("data", "stored data/content"), ("ai", "AI services (per use)"), ("you", "you / your Mac"), ("code", "code storage")]))
page("01_architecture", 1000, 640, "\n".join(b))

# ───────── 2. A question's path
b = []
Y1, Y2, W, H = 40, 250, 205, 108
xs = [25, 270, 515, 760]
row1 = [("Visitor asks", ["“What is a QALY?”", "(7 tokens)"], "ext"),
        ("Vercel", ["website passes the", "question to Fly"], "host"),
        ("Fly.io", ["AI program receives", "the question"], "host"),
        ("OpenAI", ["turns the question into", "an embedding (numbers)"], "ai")]
row2 = [("Visitor reads", ["answer + source links", "streamed back via Vercel"], "ext"),
        ("Groq writes answer", ["free · ~2,000 tokens sent", "OpenAI takes over if busy"], "ai"),
        ("FlashRank sorts", ["inside Fly: keeps", "the best 5 passages"], "host"),
        ("Supabase searches", ["meaning + keywords", "→ top 20 passages"], "data")]
for i, (t, l, k) in enumerate(row1):
    b.append(box(xs[i], Y1, W, H, t, l, k)); b.append(badge(xs[i] + 14, Y1 + 14, i + 1))
for i, (t, l, k) in enumerate(row2):
    b.append(box(xs[i], Y2, W, H, t, l, k)); b.append(badge(xs[i] + 14, Y2 + 14, 8 - i))
for i in range(3):
    b.append(arrow([(xs[i] + W, Y1 + H / 2), (xs[i + 1], Y1 + H / 2)]))
    b.append(arrow([(xs[i + 1], Y2 + H / 2), (xs[i] + W, Y2 + H / 2)]))
b.append(arrow([(xs[3] + W / 2, Y1 + H), (xs[3] + W / 2, Y2)]))
b.append(f'<text x="500" y="408" text-anchor="middle" font-size="14" fill="{GREY}">Typical total: 7–12 seconds. Only step 7 can cost money, and only when Groq’s free limit is exceeded (about $0.0007).</text>')
page("02_question_flow", 1000, 425, "\n".join(b))

# ───────── 3. Code going live
b = []
b.append(box(25, 150, 210, 100, "Your Mac", ["code is edited", "and committed (git)"], "you"))
b.append(box(310, 150, 210, 100, "GitHub", ["branch: main", "(public repository)"], "code"))
b.append(box(600, 40, 210, 100, "Vercel build", ["every push", "about 2–4 minutes"], "host"))
b.append(box(600, 260, 210, 100, "GitHub Action", ["“Deploy Backend to Fly.io”", "only if backend/ changed"], "code"))
b.append(box(865, 40, 120, 100, "Live", ["website"], "ext", tsize=16))
b.append(box(865, 260, 120, 100, "Fly.io", ["AI program", "3–5 min"], "host", tsize=16))
b.append(box(310, 400, 500, 70, "Supabase SQL editor", ["database structure changes: applied BY HAND, not automatic"], "data"))
b.append(arrow([(235, 200), (310, 200)], "git push", 272, 192))
b.append(arrow([(520, 180), (560, 180), (560, 90), (600, 90)]))
b.append(arrow([(520, 220), (560, 220), (560, 310), (600, 310)]))
b.append(arrow([(810, 90), (865, 90)]))
b.append(arrow([(810, 310), (865, 310)]))
b.append(arrow([(130, 250), (130, 435), (310, 435)], "migrations", 200, 427, dashed=True))
b.append(f'<text x="500" y="505" text-anchor="middle" font-size="14" fill="{GREY}">No manual deploy is ever needed for the website or the AI program — pushing to GitHub does both.</text>')
page("03_deploy", 1000, 520, "\n".join(b))

# ───────── 4. Content publishing
b = []
b.append(box(25, 40, 220, 92, "Editor", ["writes in Sanity Studio", "(/studio on the site)"], "you"))
b.append(box(330, 40, 220, 92, "Sanity", ["articles, lesson bodies,", "case studies, reports"], "data"))
b.append(box(640, 40, 335, 92, "Vercel pages", ["shown after the midnight refresh", "or straight after a redeploy"], "host"))
b.append(box(330, 205, 220, 104, "Supabase", ["Academy structure:", "course → track → lesson", "each lesson has a sanity_slug"], "data"))
b.append(box(25, 370, 220, 92, "Your Mac", ["library rebuild script", "(run by hand)"], "you"))
b.append(box(330, 370, 220, 92, "Supabase AI library", ["what the AI Analyst", "can search"], "data"))
b.append(box(640, 370, 335, 92, "AI Analyst (Fly.io)", ["answers from the library —", "new content only after a rebuild"], "host"))
b.append(arrow([(245, 86), (330, 86)], "publish", 287, 78))
b.append(arrow([(550, 86), (640, 86)]))
b.append(arrow([(440, 205), (440, 132)], "sanity_slug joins|lesson → body", 450, 165, anchor="start"))
b.append(arrow([(550, 257), (720, 257), (720, 132)], "lesson pages", 640, 249))
b.append(arrow([(135, 370), (135, 290), (300, 290), (300, 110), (330, 110)], "reads content", 140, 330, dashed=True, anchor="start"))
b.append(arrow([(245, 416), (330, 416)], "writes", 287, 408))
b.append(arrow([(640, 416), (550, 416)], "searches", 595, 408))
page("04_content", 1000, 480, "\n".join(b))

# ───────── 5. The book
b = []
b.append(box(25, 40, 230, 96, "Google Docs", ["the live manuscript", "HTR_Book_v42 (you edit)"], "you"))
b.append(box(370, 40, 260, 96, "Your Mac", ["HTR_Book_v42.docx", "Claude checks / edits it"], "you"))
b.append(box(745, 40, 230, 96, "Checks", ["pandoc · LibreOffice", "page renders"], "code"))
b.append(box(25, 230, 230, 96, "PDF export", ["you: File → Download → PDF"], "you"))
b.append(box(370, 230, 260, 96, "GitHub → Vercel", ["frontend/public/HTR_Book_v42.pdf", "served at /book and /read"], "host"))
b.append(box(745, 215, 230, 86, "Web reader", ["HTML built from the .docx", "/read/<chapter>"], "host"))
b.append(box(745, 360, 230, 86, "AI library", ["book passages in Supabase", "so the Analyst can cite it"], "data"))
b.append(arrow([(255, 74), (370, 74)], "1. download", 312, 66))
b.append(arrow([(370, 104), (255, 104)], "2. upload back", 312, 124))
b.append(arrow([(630, 70), (745, 70)]))
b.append(arrow([(140, 136), (140, 230)], "3. export", 148, 188, anchor="start"))
b.append(arrow([(255, 278), (370, 278)], "4. copy + push", 312, 270))
b.append(arrow([(630, 100), (705, 100), (705, 258), (745, 258)], "5. build|reader", 712, 160, dashed=True, anchor="start"))
b.append(arrow([(630, 126), (680, 126), (680, 403), (745, 403)], "5. load into|AI library", 672, 370, dashed=True, anchor="end"))
page("05_book", 1000, 465, "\n".join(b))

# ───────── 6. Python on the Mac
b = []
pys = [("Homebrew Python 3.14", "default “python3”", 40), ("Homebrew Python 3.13", "reinstalled 14 Nov", 150),
       ("Homebrew Python 3.12", "spare", 260), ("Homebrew Python 3.11", "spare (same as Fly)", 330),
       ("uv’s private Python 3.12", "", 400), ("Apple’s Python 3.9", "Xcode tools", 470)]
ys = {}
for t, sub, y in pys:
    b.append(box(25, y, 270, 56 if sub else 50, t, [sub] if sub else [], "code", tsize=15)); ys[t] = y + 28
envs = [("options_bot", "Homebrew Python 3.14"), ("Illustrated-Guide-AI-Agents", "Homebrew Python 3.14"),
        ("Agentic AI / manual-2-sommpicks", "Homebrew Python 3.14"),
        ("Vermont-Health-Platform / backend", "Homebrew Python 3.13"), ("building-with-llamaIndex", "Homebrew Python 3.13"),
        ("building-with-llamaIndex / PITS_APP", "Homebrew Python 3.13"), ("ai-agent-from-scratch", "Homebrew Python 3.13"),
        ("Vermont-Health-Platform / .piper-venv", "uv’s private Python 3.12"),
        ("ai-agent-from-scratch / notebooks", "Apple’s Python 3.9")]
for i, (name, py) in enumerate(envs):
    y = 22 + i * 54
    kind = "you" if "Vermont" in name else "ext"
    b.append(box(560, y, 330, 42, name, [], kind, tsize=14))
    b.append(arrow([(560, y + 21), (440, y + 21), (440, ys[py]), (295, ys[py])], color="#888"))
b.append(box(905, 22, 80, 474, "", [], "ext"))
b.append(f'<text x="945" y="260" text-anchor="middle" font-size="13" fill="{GREY}" transform="rotate(-90 945 260)">each project’s private package folder (venv)</text>')
b.append(f'<rect x="25" y="545" width="960" height="58" rx="8" fill="#E3EDF7" stroke="#5B7FA6" stroke-width="1.5"/>')
b.append(f'<text x="505" y="570" text-anchor="middle" font-size="14" fill="{INK}">The live platform does NOT use any of these. Fly.io and GitHub run their own Python 3.11</text>')
b.append(f'<text x="505" y="590" text-anchor="middle" font-size="14" fill="{INK}">inside sealed containers. The Mac’s Pythons only matter for work done on the Mac.</text>')
page("06_python", 1000, 615, "\n".join(b))

# ───────── 7. The ecosystem
b = []
C = (350, 255, 300, 112)
b.append(box(*C, "The HTR Framework", ["5 pillars: Policy · Technology · Economics", "Clinical · Operations", "+ the Equity Imperative (cross-cutting)"], "host", tsize=19))
nodes = {
 "book": (25, 30, 300, 128, "The Book (HTR_Book_v42)", ["Preface · Introduction · 16 chapters", "Conclusion · Appendices A–H", "PDF · web reader · audio narration"], "you"),
 "acad": (675, 30, 300, 128, "The Academy", ["19 courses · 105 tracks · 299 lessons", "Personalized Learning · Glossary", "Case Studies · Medicaid Learning Center"], "data"),
 "pill": (25, 258, 270, 108, "Pillar intelligence pages", ["77 policy analyses · sub-topics", "The Wire · Trending · Investments"], "data"),
 "tool": (705, 258, 270, 108, "Tools & Research Lab", ["44 tools (35 in the Lab)", "simulators · calculators · dashboards"], "host"),
 "stat": (25, 478, 300, 112, "States & Programs", ["Vermont programs · Acts 167 & 68", "AHEAD · hospital profiles", "50 state RHT profiles"], "data"),
 "ai":   (365, 478, 270, 112, "AI Analyst", ["answers from 59,412 passages:", "book · Academy · analyses · reports"], "ai"),
 "adv":  (675, 478, 300, 112, "Advisory Services", ["consulting · research · audits", "HTR Connect · Community", "Solutions domains ONLY"], "you"),
}
for k, (x, y, w, h, t, l, kind) in nodes.items():
    b.append(box(x, y, w, h, t, l, kind, tsize=16))
cx, cy = C[0] + C[2] / 2, C[1] + C[3] / 2
for k, (x, y, w, h, *_ ) in nodes.items():
    tx = min(max(cx, x), x + w); ty = min(max(cy, y), y + h)
    sx = min(max(tx, C[0]), C[0] + C[2]); sy = min(max(ty, C[1]), C[1] + C[3])
    b.append(f'<line x1="{sx}" y1="{sy}" x2="{tx}" y2="{ty}" stroke="#9AA7B8" stroke-width="2" stroke-dasharray="3 4"/>')
b.append(arrow([(325, 72), (675, 72)], "each course is tied to a book chapter", 500, 62, both=True, color="#444"))
b.append(arrow([(325, 120), (675, 120)], "each chapter ends with “Work This Chapter on the Platform”", 500, 140, color="#444"))
b.append(f'<text x="500" y="620" text-anchor="middle" font-size="13.5" fill="{GREY}">Dotted lines: everything is organised by the same five pillars and the Equity Imperative.</text>')
page("07_ecosystem", 1000, 632, "\n".join(b))

# ───────── 8. Four domains, two brands, one site
b = []
doms = [("healthtransformationreview.org", 30, "you"), ("healthtransformationreview.com", 120, "you"),
        ("healthtransformationsolutions.org", 250, "code"), ("healthtransformationsolutions.com", 340, "code")]
for d, y, k in doms:
    b.append(box(20, y, 300, 62, d, ["www. → removed" if "review" in d else "→ www. added"], k, tsize=14.5))
b.append(box(410, 55, 250, 104, "REVIEW brand", ["“Health Transformation Review”", "Advisory Services hidden", "+ its pages blocked"], "you", tsize=16))
b.append(box(410, 275, 250, 104, "SOLUTIONS brand", ["“Health Transformation Solutions”", "everything, incl. Advisory", "(also: previews, localhost)"], "code", tsize=16))
b.append(box(745, 120, 235, 196, "ONE website (Vercel)", ["same pages · same Academy", "same tools · same book", "same AI Analyst", "same database", "same beta access gate"], "host", tsize=16))
for d, y, k in doms:
    by = 107 if "review" in d else 327
    b.append(arrow([(320, y + 31), (365, y + 31), (365, by), (410, by)]))
b.append(arrow([(660, 107), (700, 107), (700, 190), (745, 190)]))
b.append(arrow([(660, 327), (700, 327), (700, 250), (745, 250)]))
b.append(f'<text x="500" y="438" text-anchor="middle" font-size="13.5" fill="{GREY}">The brand is chosen on every request from the address the visitor typed (frontend/lib/brand.ts).</text>')
page("08_domains", 1000, 452, "\n".join(b))
