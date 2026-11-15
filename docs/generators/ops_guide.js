const { P, H1, H2, H3, B, L, N, table, box, code, gap, titlePage, build, OK_FILL, WARN_FILL } = require("./docstyle");

const c = [];
const add = (...x) => c.push(...x.flat());

add(
  titlePage("Ecosystem, User and Operations Guide", null, [
    "How the HTR ecosystem fits together and how people use it: readers of the book, learners in the Academy, analysts in the Research Lab, Advisory clients and beta testers. Then the administrator's tasks, the routine maintenance, and what to do when something goes wrong.",
  ]),
  box("The documentation set", [
    "**This guide:** what the ecosystem is for, how each kind of person uses it, administration and maintenance.",
    "**Content Production Guide:** creating and changing content (Sanity, Academy, book), with AI prompts.",
    "**Infrastructure and Software Inventory:** every service, cost, account, diagram, and the Mac's tools and Python versions.",
    "All three are in the project's docs/ folder, dated 14 November 2026.",
  ], OK_FILL),
  gap(),
  H2("Contents"),
  P("1. The ecosystem in one page  ·  2. User guide: how people use the platform  ·  3. Administrator guide  ·  4. Maintenance and operations  ·  5. Troubleshooting  ·  6. Before the public launch  ·  7. Working with Claude"),
);

// ───────────── 1
add(
  H1("1. The ecosystem in one page"),
  P("Health Transformation Review is one framework delivered five ways. The framework: transforming a state health system through **five pillars** (Policy, Technology, Economics, Clinical, Operations), executed in sequence, and held throughout to the **Equity Imperative**. Vermont is the worked example."),
  table(["Part", "Its job", "Who it serves", "Where"], [
    ["**The book** (HTR_Book_v42)", "Makes the full argument: why transformation fails, the five pillars, the execution sequence, Vermont as the case", "Leaders, policymakers, students", "Google Doc (master) to PDF at /book, web reader at /read, audio narration"],
    ["**The platform**", "Turns the argument into intelligence and tools: pillar pages, 77 analysis briefs, 44 tools, dashboards, Vermont and 50-state program pages, live news", "Analysts, executives, planners", "All four domains"],
    ["**The Academy**", "Teaches it: 19 courses, 105 tracks, 299 lessons with quizzes and certificates, plus glossary, case studies, Personalized Learning", "Staff, students, new hires", "/academy"],
    ["**The AI Analyst**", "Answers questions from the whole body of work, with sources", "Everyone", "Side panel on every page; full page /chat"],
    ["**Advisory Services**", "Offers paid help applying the framework: consulting, research, audit, regulatory, IT, training, independent review, and the HTR Connect member directory", "Health systems, states, investors", "Solutions domains only"],
  ], [18, 38, 18, 26]),
  gap(),
  H2("1.1 How the parts lead into each other"),
  B("**Book to platform:** every chapter ends with “Work This Chapter on the Platform”, naming the tools and courses to use. Appendices D and F are a reader's guide to the platform."),
  B("**Platform to book:** “From the Book” callouts across the site point back to the chapter behind each page; each course shows its chapter."),
  B("**Academy and tools:** lessons send learners to the tools that apply what they teach."),
  B("**AI Analyst and everything:** it answers from the book, lessons, briefs, glossary, case studies and 38 reference documents, cites them, and suggests the relevant tool."),
  B("**Platform to Advisory** (Solutions brand): tool pages carry a “From Analysis to Action” box leading to the Advisory services."),
  H2("1.2 Two brands, four addresses"),
  table(["", "Review brand", "Solutions brand"], [
    ["Addresses", "healthtransformationreview.org and .com", "healthtransformationsolutions.org and .com (shown as www.…)"],
    ["Content, tools, Academy, book, AI Analyst", "Everything", "Everything"],
    ["Advisory Services", "Not present (pages answer “not found”)", "Present"],
    ["Purpose", "The independent, educational face of the work", "The same work plus the paid services"],
  ], [26, 37, 37]),
  P("One website serves all four addresses and chooses the brand from the address typed. Details and verification: Inventory, Section 2."),
);

// ───────────── 2
add(
  H1("2. User guide: how people use the platform"),
  H2("2.1 Getting in (beta)"),
  L(),
  N("A visitor opens any of the four addresses and lands on the **beta access page**."),
  N("They type the access code you gave them. Each code works only on the domains you ticked for it (Section 3.2). A wrong-domain code is refused."),
  N("The pass lasts **7 days** on that browser, then the code is asked again."),
  N("The first time, a **Welcome** screen asks who they are: Hospital/Health System Executive, Policy Analyst/Government Official, Clinician, Health Economist/Actuary, Health Tech Professional, Medicaid/Compliance Officer, Student/Researcher, Investor/Consultant, or “Skip — Show Me Everything”. The choice tells the AI Analyst who it is talking to, so its answers fit that role. To change it, open /welcome again."),
  H2("2.2 Finding your way"),
  B("**Top menu:** Pillars · Academy · Tools · States & Programs · Advisory Services (Solutions only). The left sidebar mirrors it and lists each pillar's tools."),
  B("**⌘K (Ctrl+K on Windows):** a search box that jumps to any page, tool, brief, glossary term or chapter."),
  B("**Home page:** the five 2026 pillar briefings (top), quick-start cards, The Wire (live news from KFF Health News, STAT, CMS, FDA, Health Affairs, the Green Mountain Care Board and others), platform capabilities, trending topics."),
  B("**Search** (/search) covers briefs, lessons, case studies and glossary."),
  H2("2.3 Reading the book"),
  B("**/book:** the book's home: download the PDF, chapter list, audio, and the courses and tools for each chapter."),
  B("**/read/<chapter>:** the web reader, one chapter per page, with links to the platform tools that chapter names."),
  B("**Listen:** audio narration of the Preface, Introduction and 16 chapters."),
  H2("2.4 Learning in the Academy"),
  L(),
  N("**Start Here** (/academy/getting-started and the Start Here course) introduces the framework."),
  N("Pick a course on /academy. A course has tracks; a track has lessons. Each lesson has learning objectives, the lesson itself, key takeaways, a knowledge check and sources."),
  N("**Personalized Learning** (/academy/personalized-learning) builds a week-by-week learning path from a visitor's role and goals, with audio."),
  N("Completing a course with an account issues a **certificate** with a public verification link (/verify/<code>)."),
  N("Also in the Academy: the **Glossary**, **Case Studies**, the **Medicaid Learning Center**, **Webinars** and **Faculty** (the last two are empty for now)."),
  H2("2.5 Analysing: tools, dashboards, states"),
  B("**Research Lab** (/research-lab): 35 tools grouped by pillar: payment-model calculators, financial stress tests, FHIR and AI-governance labs, equity studios, workforce and EMS modelers, scorecards."),
  B("**HTR Simulator** (/htr-simulator): scores a transformation strategy across the five pillars and the execution sequence."),
  B("**Dashboards:** 50-state rural health dashboard and state profiles (/dashboard), HTI Dashboard, Investment Tracker, Bed Capacity & Transfer."),
  B("**States & Programs:** Vermont Medicaid, Blueprint for Health, VCCI, the Vermont RHT program, SASH, Designated Agencies, SDOH, Acts 167 and 68 (with the Act 68 simulator), the AHEAD model, hospital profiles, legislative reports; California CalAIM."),
  H2("2.6 Asking the AI Analyst"),
  B("Open the side panel on any page, or the full page at /chat."),
  B("It answers from the HTR library (the book, all lessons and briefs, the glossary, case studies, Vermont reports and laws, two health-economics reference books) and lists its sources under each answer."),
  B("Answers are free for the platform: written by Groq's free models, with OpenAI as backup."),
  B("**Tips for good answers:** ask one question at a time; name the state or program; ask “according to the book…” to keep it on the framework; follow the cited sources."),
  B("After a quiet period the first answer can take about 20 seconds while the AI server wakes up."),
  H2("2.7 Accounts"),
  P("During the beta, everything is open without an account. An account (free; /signup) adds: **My Library** (/library: saved briefs and chapters, notes, course progress), bookmarks, Academy progress and certificates."),
  table(["Role", "What it is meant for after launch"], [
    ["free", "Reading, basic tools, the free AI model"],
    ["student / subscriber / professional", "Paid tiers: full dashboards, the full AI Analyst, deeper tools (prices exist in code; payments are not switched on)"],
    ["advisory", "Advisory clients"],
    ["admin", "You: the admin pages. Today the only admin account is bechir.bensaid@gmail.com"],
  ], [30, 70]),
  H2("2.8 Advisory Services (Solutions brand)"),
  P("Eleven pages describe the paid services: the Advisory Hub, Strategic Consulting, Custom Research, Financial Audit, Regulatory Counsel, IT Consulting, Training & Education, Independent Review, HTR Connect, the Member Directory and Community. A prospective client contacts you through **Contact Us**, which opens an email to bechir.bensaid@gmail.com."),
  box("Not working yet", ["The “Start an Engagement” form on /advisory/contact does not send anything when submitted (the page's claim that submissions are recorded is not true yet). Until it is connected, point prospects to Contact Us."], WARN_FILL),
  H2("2.9 Beta testers"),
  B("A **Tester Hub** button sits bottom-right on every page. It opens /tester, a checklist of areas to try (Home & Core, The Book, Intelligence Dashboard, Research Lab, Simulators & Tools…) with a rating and comment for each."),
  B("Submitted reports appear on **/admin/tester-feedback**."),
);

// ───────────── 3
add(
  H1("3. Administrator guide"),
  H2("3.1 Signing in"),
  P("Go to /login on healthtransformationreview.org and sign in with bechir.bensaid@gmail.com, then open **/admin**. The admin pages check your role themselves, so they stay protected even while sign-in is otherwise relaxed for the beta."),
  H2("3.2 Giving someone access (access codes)"),
  L(),
  N("Open /admin, then Access Codes."),
  N("Type a **code** (e.g. Jane_D_2026), an optional **label** (who it is for), and tick the **domains** it should work on. All four are ticked by default; keep all four unless you want to restrict someone."),
  N("Send the person the address and the code. They stay in for 7 days per browser."),
  N("To restrict, untick domains on that code; to pause it, switch it inactive; to remove it, delete it (all on the same page)."),
  box("Most existing codes work on one address only", ["Of the 12 active codes, 11 work only on healthtransformationreview.org. A tester given the .com or a Solutions address with one of those codes is refused. Widen the domains on the Access Codes page if needed."]),
  H2("3.3 The other admin pages"),
  table(["Page", "What it shows or does"], [
    ["/admin", "Users by role, bookmarks, learning paths, last AI question, AI library status"],
    ["/admin/users", "Change a user's role"],
    ["/admin/role-changes", "History of role changes"],
    ["/admin/tester-feedback", "Reports submitted from the Tester Hub"],
    ["/admin/analytics", "Usage figures"],
    ["/admin/revenue", "Subscriptions (empty until payments are switched on)"],
    ["/admin/ingest", "AI Analyst question log and library status"],
    ["/studio", "The Sanity editing screen (Content Production Guide, Section 2)"],
  ], [28, 72]),
);

// ───────────── 4
add(
  H1("4. Maintenance and operations"),
  H2("4.1 How a change goes live"),
  L(),
  N("Code is changed (by Claude, on your Mac) and pushed to GitHub's main branch."),
  N("**Vercel** rebuilds the website automatically: about 6–7 minutes, then all four domains switch to the new version at once."),
  N("If the AI program changed (the backend/ folder), a **GitHub Action** rebuilds it and deploys it to **Fly.io** automatically: a few minutes."),
  N("Content in Sanity needs no deploy (Content Production Guide, Section 2.4)."),
  N("Settings and secret keys are changed in Vercel (Settings → Environment Variables, then Redeploy) or with “fly secrets set” for the AI program."),
  H2("4.2 Routine checklist"),
  table(["How often", "Task", "How"], [
    ["Weekly", "Read tester feedback", "/admin/tester-feedback"],
    ["Weekly", "Ask the AI Analyst one question you know the answer to", "/chat: an answer with sources = healthy"],
    ["Monthly", "Run the automated test suite on all four domains", "Ask Claude: “run the e2e suite against the four domains” (57 checks each; all passed on 14 November)"],
    ["Monthly", "Check the bills", "fly.io → Billing; platform.openai.com → Usage; vercel.com → Settings → Billing (Supabase is billed there). Expected total ~$40–45/month"],
    ["Monthly", "Check the database size", "Ask Claude; Pro plan includes 8 GB (1.1 GB used)"],
    ["Before 29 Dec 2026", "Renew healthtransformationreview.com (auto-renew is OFF)", "Vercel → Domains → turn on Auto Renew ($12.03/yr)"],
    ["Yearly", "Confirm the other three domains renewed", "Vercel → Domains (May and October 2027)"],
    ["After any book change", "Refresh the web reader, AI library, PDF", "Content Production Guide, recipe 5.8"],
    ["When a fact changes in the world", "Correct it everywhere", "Content Production Guide, prompt 6.7"],
  ], [18, 40, 42]),
  H2("4.3 Health checks"),
  table(["Check", "Healthy result"], [
    ["Open healthtransformationreview.org", "The beta page or the home page loads"],
    ["Open https://vhp-backend.fly.dev/health", "A short status message (may take 20 seconds if the server was asleep)"],
    ["Ask the AI Analyst a question", "An answer with a Sources list"],
    ["Open /the-wire", "Headlines from today or yesterday"],
  ], [45, 55]),
  H2("4.4 Undoing a bad change"),
  B("**Website:** Vercel → Project vhp → Deployments → pick the last good one → ⋯ → Promote to Production. Instant; no code changes needed. Then ask Claude to fix the code properly."),
  B("**AI program:** ask Claude to roll back to the previous Fly release (it can list releases and redeploy the previous one)."),
  B("**Content:** Sanity → the document → History → restore an earlier version. Script-made changes also have a backup in sanity-backups/."),
  B("**Code:** every change is a Git commit; Claude can revert any one of them."),
  H2("4.5 Where settings and secrets live"),
  table(["Place", "What is there", "Who changes it"], [
    ["Vercel → Settings → Environment Variables (Production)", "13 settings: AI server address, Sanity and Supabase keys, the beta sign-in switch, the AI-library secret and the Sanity webhook secret", "You or Claude (logged in)"],
    ["Fly secrets (vhp-backend)", "11 keys: Groq, OpenAI, Sanity, Supabase, the AI-library secret, the site address", "Claude (fly is logged in)"],
    ["frontend/.env.local and backend/.env on the Mac", "Copies for local work and scripts", "Claude; never uploaded to GitHub"],
    ["Sanity → API → Webhooks", "The AI library connection (Content Production Guide, Section 9)", "You"],
  ], [32, 46, 22]),
  box("Never", ["Paste a key or secret into a chat, an email, a document or a GitHub issue. If one leaks, ask Claude to rotate it (create a new one, update every place above, revoke the old one)."], WARN_FILL),
);

// ───────────── 5
add(
  H1("5. Troubleshooting"),
  table(["Symptom", "Likely cause", "What to do"], [
    ["The site does not load at all", "Vercel outage or a broken deployment", "Check vercel.com status; promote the previous deployment (4.4)"],
    ["A tester says their code is refused", "The code is not enabled for the address they used, or it was deactivated", "/admin/access-codes: tick that domain"],
    ["Pages ask testers to log in, and “Skip” loops back", "The beta sign-in switch (ALLOW_AUTH_BYPASS) is off", "Vercel → Environment Variables: ALLOW_AUTH_BYPASS = true → Redeploy (fixed 14 Nov)"],
    ["The AI Analyst is slow on the first question", "The AI server sleeps when idle", "Normal: about 20 seconds, then fast"],
    ["The AI Analyst returns an error", "Fly server down, or both Groq and OpenAI failing", "Check /health (4.3); ask Claude to read the Fly logs"],
    ["The AI Analyst does not know something just published", "The Sanity webhook is not set up, or the content type is not one it reads (deals, state profiles)", "Content Production Guide, Section 9"],
    ["A page shows old content after a Sanity edit", "The page's refresh interval has not passed", "Wait (minutes to 1 hour; Content Guide 2.4); at the latest it refreshes at midnight"],
    ["A lesson shows only a short text", "Its Supabase row has no sanity_slug, or the slug is wrong", "Ask Claude to run audit-courses.mjs and link it"],
    ["Studio will not let me Publish", "A required field is empty (outlined in red)", "Fill the field outlined in red, then Publish"],
    ["The Wire is empty", "All news feeds failed at once (rare)", "It retries every 15 minutes; tell Claude if it lasts a day"],
    ["A domain stops working", "Expired registration", "Vercel → Domains; renew"],
    ["A Python project on the Mac breaks after installing something", "Homebrew removed a Python it thought unused", "Inventory, Section 8; ask Claude to diagnose before changing anything"],
  ], [30, 34, 36]),
);

// ───────────── 6
add(
  H1("6. Before the public launch"),
  P("The beta deliberately relaxes some protections. Each of these must be done before the platform is opened to the public or starts charging:"),
  table(["Item", "Why", "Where"], [
    ["Turn the beta sign-in switch off (ALLOW_AUTH_BYPASS)", "Paid pages are open to everyone while it is on", "Vercel environment variable"],
    ["Protect the beta pass", "Today it is a plain cookie anyone can forge", "Code change (signs testers out once)"],
    ["Switch on payments (Stripe)", "Not configured in production", "Stripe account + Vercel keys"],
    ["Switch on email (Resend, Loops)", "No email keys in production: no digest, no course-completion emails", "Vercel keys"],
    ["Switch on error tracking (Sentry)", "Errors are not reported anywhere", "Vercel and Fly keys"],
    ["Move Vercel to Pro", "The free Hobby plan is for non-commercial use only", "Vercel billing ($20/month)"],
    ["Connect or remove the Advisory engagement form", "It sends nothing today", "Code change"],
    ["Fill the Webinars and Faculty pages, or hide them", "Empty pages look unfinished", "Sanity or code"],
    ["Update HTR_ADMIN_RUNBOOK.md", "Out of date in several places", "Claude"],
  ], [34, 40, 26]),
);

// ───────────── 7
add(
  H1("7. Working with Claude"),
  P("Claude Code (the assistant in VS Code) does the programming, content production, verification and maintenance. It works best this way:"),
  B("**One clear request per message**, with the result you want (“add X and confirm it live”), not just the topic."),
  B("**Ask for verification explicitly** when it matters: “test it live on all four domains”."),
  B("**Approvals:** Claude must ask before changing anything on your Mac outside the project (Homebrew, Python, other projects), before writing Academy or Sanity content, and before spending money. Your prompt can contain the approval (“this approves…”)."),
  B("**It remembers** standing rules between sessions in its memory and in CLAUDE.md. To add a rule, say “remember: …”."),
  B("**It commits and pushes** each finished piece, so nothing is lost if a session ends."),
  B("**Ready-made prompts** for content are in the Content Production Guide, Section 6."),
);

build(process.argv[2], "HTR Ecosystem, User and Operations Guide", "HTR Ecosystem, User and Operations Guide", c);
