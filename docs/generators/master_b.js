// Sections 6-9: content inventory, AI Analyst, user guide, administrator and operations guide.
module.exports = ({ D, S, T, SC, H, add }) => {
  const { P, H1, H2, B, N, table, box } = H;
  const pa = D.policyAnalyses;
  const order = ["Policy", "Technology", "Economics", "Clinical", "Equity", "Operations"];
  const byP = {}; pa.forEach(a => { (byP[a.p] = byP[a.p] || []).push(a.title); });
  const paRows = [];
  order.forEach(p => (byP[p] || []).sort().forEach(t => paRows.push([p, t.length > 150 ? t.slice(0, 147) + "…" : t])));
  const deals = D.deals.map(d => d.n).sort();

  add(
    H1("6. Content inventory"),
    P("Content lives in three places: Sanity (articles and lesson bodies), Supabase (structure and the AI library) and the website's code (tools and pages). This section lists every kind, with live counts from 23 November."),
    table(["Sanity type (dataset production)", "Documents", "Used for"], [
      ["academyModule", String(SC.academyModule), "Academy lesson bodies, one per lesson; joined to Supabase by sanity_slug"],
      ["policyAnalysis", String(SC.policyAnalysis), "Pillar intelligence briefs (list below)"],
      ["rhtState", String(SC.rhtState), "Per-state RHT review notes for /rht-review"],
      ["investmentDeal", String(SC.investmentDeal), "Investment Tracker deals (all sourced; none estimated)"],
      ["definition", String(SC.definition), "Glossary terms"],
      ["caseStudy", String(SC.caseStudy), "Academy case studies"],
      ["Other defined types", "0", "post, webinar, instructor, dailyInsight, analystNote, ticker, subscriber, hospital, author, category, course, audio: schemas exist, no documents"],
    ], [34, 12, 54]),
    P("Sanity project fxz10xl7, dataset production, free plan. Studio at /studio on any domain. Drafts are excluded from the counts and from the AI library."),
    H2("6.1 Supabase data (project clryhwqaqhvdikgesjbc)"),
    table(["Table / store", "Rows on 23 Nov", "Notes"], [
      ["courses · tracks · lessons", `${T.courses} · ${T.tracks} · ${T.lessons}`, "Academy structure; all published; every lesson has sanity_slug; published flags apply at course and track level; ordering column is “order”"],
      ["data_rag_documents", S.t_data_rag_documents.toLocaleString("en-US"), "The AI Analyst library (pgvector). The table named rag_documents is empty and obsolete"],
      ["beta_access_codes", String(S.t_beta_access_codes), "Access codes with the domains each works on"],
      ["profiles", String(S.t_profiles), "Accounts and roles (free, student, subscriber, professional, advisory, admin)"],
      ["Storage: narration-audio", "18 files", "Book narration served to the audio players"],
      ["supabase/migrations", "38 files", "Recorded schema changes, applied by hand in the SQL editor"],
    ], [26, 18, 56]),
    H2("6.2 Case studies, glossary and investment deals"),
    P("**Case studies (5):** " + D.caseStudies.join("; ") + "."),
    P(`**Glossary (${SC.definition} entries):** ` + D.definitions.slice().sort().join("; ") + "."),
    P(`**Investment deals (${deals.length}):** ` + deals.map(x => x.length > 70 ? x.slice(0, 67) + "…" : x).join("; ") + "."),
    H2("6.3 Policy analyses (73), by pillar"),
    table(["Pillar", "Title"], paRows, [14, 86]),
    P("Counts by pillar: Economics 24 · Technology 16 · Policy 12 · Equity 10 · Clinical 10 · Operations 1. The thin Operations count is a content gap worth a deliberate decision (Section 11.5)."),
  );

  add(
    H1("7. The AI Analyst"),
    P(`The AI Analyst answers from the HTR library and cites sources. The library held ${S.t_data_rag_documents.toLocaleString("en-US")} passages on 23 November (60,299 on 15 November, when the breakdown was last measured: 35,427 from 38 PDF reports and books, 20,111 from the 299 lesson bodies, 4,048 from 73 analyses, 539 from the book, 174 from glossary, case studies and briefings). The increase since then is consistent with the 117 lessons published since, which reach the library through the Sanity webhook; the by-source breakdown has not been re-run.`),
    H2("7.1 How one question is answered"),
    N("The website (Vercel) passes the question to the AI program on Fly.io; the browser never calls Fly directly."),
    N("The program asks OpenAI (text-embedding-3-small) to turn the question into an embedding."),
    N("It searches Supabase two ways at once, by meaning (pgvector) and by keywords, and takes the best 20 passages."),
    N("A small re-ranking model inside the program (FlashRank) keeps the best 5."),
    N("Groq writes the answer (openai/gpt-oss-120b; quick tasks use gpt-oss-20b). If Groq refuses or is over its free limit, OpenAI gpt-4o-mini writes it."),
    N("The answer streams back with source links. Only title, pillar, source type, page and link go with each passage, so a typical question uses about 2,000 tokens."),
    H2("7.2 Keeping it current"),
    B("**Sanity edits:** a published change reaches the library in about a minute through a signed webhook (Create, Update, Delete; drafts off; the secret SANITY_WEBHOOK_SECRET must match in Sanity and Vercel). Tested 15 November: passages replaced within 5 seconds, no duplicates."),
    B("**Book, briefings, PDFs:** loaded by scripts on the Mac (book-build/ingest_book_to_rag.py, ingest_briefings_to_rag.py, ingest_sanity_to_rag.py)."),
    B("**Test set:** 50 questions, 36 of them sentences quoted word for word from the book, every pillar with at least six; run it after any model or retrieval change (backend/eval)."),
    B("**Cost:** normal questions are free (Groq). The OpenAI backup costs about $0.0007 a question; embeddings are negligible; Personalized Learning audio is the dearest item (about 15 cents for a 5,000-character script)."),
    B("**First question after idle:** the Fly machine stops when idle and takes about 20 seconds to wake."),
  );

  add(
    H1("8. User guide"),
    H2("8.1 Getting in and finding your way"),
    N("Open any of the four addresses; the beta page asks for the access code you were given (7-day pass per browser)."),
    N("A Welcome screen asks your role (executive, policy analyst, clinician, economist, health technologist, Medicaid compliance officer, student, investor or consultant, or “show me everything”); it tunes the AI Analyst."),
    N("Use the top menu and sidebar, or press ⌘K (Ctrl+K) to jump to any page, tool, brief, glossary term or chapter. /search covers briefs, lessons, case studies and glossary."),
    N("The home page shows the five 2026 pillar briefings, quick-start cards, The Wire (live headlines) and trending topics."),
    H2("8.2 Reading the book"),
    P("/book offers the PDF download, the chapter list, audio and the courses and tools for each chapter. /read/<chapter> is the web reader, one chapter per page, with links to the tools the chapter names. The Listen option plays the 18 narrations."),
    H2("8.3 Learning in the Academy"),
    N("Begin with Start Here (5 lessons) or pick a course on /academy. A course has tracks; a track has lessons."),
    N("Each lesson has objectives, the lesson, key takeaways, a knowledge check and numbered sources. The course page shows its book chapter."),
    N("Personalized Learning builds a week-by-week path from your goals. Completing a course while signed in issues a certificate with a public check link."),
    H2("8.4 Analysing with tools"),
    B("The Research Lab groups 35 tools by pillar; each opens on a tab and carries a “From the Book” callout. Tools use illustrative or synthetic data where stated: use them to learn the logic and rehearse a decision, then substitute your own data."),
    B("The HTR Simulator scores a strategy against the five pillars and the execution sequence. The Portfolio Sequencing Test and Investment Sequencing Check test a plan or a deal against a pillar's limiting gate."),
    B("/dashboard holds the 50-state rural health dashboard; /rht-review compares the states' Rural Health Transformation spending and plans; /policy/medicare-for-all holds the single-payer hub and modeler."),
    H2("8.5 Asking the AI Analyst"),
    B("Open the side panel on any page or go to /chat. Ask one question at a time, name the state or program, and say “according to the book” to stay on the framework. Open the cited sources."),
    H2("8.6 Accounts, advisory and testers"),
    B("During the beta everything is open without an account. A free account (/signup) adds My Library, bookmarks, progress and certificates. Roles: free, student, subscriber, professional, advisory, admin; paid tiers exist in code but payments are off."),
    B("Advisory Services (Solutions brand only): 11 pages; Contact Us opens an email to the domain's contact@ address. The “Start an Engagement” form does not send anything yet."),
    B("Beta testers use the Tester Hub button (bottom right, /tester); reports appear at /admin/tester-feedback."),
  );

  add(
    H1("9. Administrator and operations guide"),
    H2("9.1 Access codes and admin pages"),
    N("Sign in at /login with the admin account, then open /admin. Admin pages check the role themselves."),
    N("Access Codes: enter a code, an optional label and tick the domains it works on (all four by default). Untick to restrict, switch inactive to pause, delete to remove. The pass lasts 7 days per browser."),
    table(["Page", "Purpose"], [
      ["/admin", "Users by role, bookmarks, learning paths, last AI question, library status"],
      ["/admin/users · /admin/role-changes", "Change a user's role; role-change history"],
      ["/admin/tester-feedback", "Reports from the Tester Hub"],
      ["/admin/analytics · /admin/revenue · /admin/ingest", "Usage figures · subscriptions (empty until payments are on) · AI question log and library status"],
      ["/studio", "Sanity editing studio (sign in with the Sanity account that owns the project)"],
    ], [34, 66]),
    H2("9.2 How a change goes live"),
    N("Code changes are committed and pushed to GitHub main. Vercel rebuilds all four domains in about 6–7 minutes."),
    N("If anything under backend/ changed, a GitHub Action builds the container and deploys it to Fly.io in a few minutes."),
    N("Sanity content needs no deploy; pages refresh at midnight or on the next deploy, and the AI library within about a minute."),
    N("Database structure changes (supabase/migrations) are applied by hand in the Supabase SQL editor. Secrets are changed in Vercel (then redeploy) or with fly secrets set."),
    H2("9.3 Routine checklist"),
    table(["How often", "Task", "How"], [
      ["Weekly", "Read tester feedback; ask the AI Analyst a question you know the answer to", "/admin/tester-feedback; /chat (an answer with sources means healthy)"],
      ["Monthly", "Run the automated browser tests on all four domains (57 checks each on 14 Nov)", "Ask Claude: run the e2e suite against the four domains"],
      ["Monthly", "Check the bills and database size", "fly.io Billing; platform.openai.com Usage; vercel.com Billing (Supabase is billed there); admin.google.com Billing; Supabase Pro includes 8 GB"],
      ["After CMS data refresh (30 Nov 2026 quarterly reports)", "Refresh the RHT review data", "Ask Claude: refresh the RHT review data (runbook section 16; scripts self-check totals)"],
      ["Before 29 Dec 2026", "Renew healthtransformationreview.com", "Vercel → Domains → turn on Auto Renew ($12.03/yr)"],
      ["Yearly", "Confirm domain renewals", "May 2027 (Solutions) and October 2027 (Review .org)"],
      ["After any book change", "Refresh reader, AI library and PDF", "Book workflow (Section 3.2) and Section 12.4"],
    ], [20, 42, 38]),
    H2("9.4 Health checks and undoing a bad change"),
    table(["Check or action", "Healthy result / how"], [
      ["Open a domain", "The beta page or home page loads"],
      ["https://vhp-backend.fly.dev/health", "status ok (can take 20 seconds if asleep)"],
      ["Ask the AI Analyst a question", "An answer with a Sources list"],
      ["Open /the-wire", "Headlines from today or yesterday"],
      ["Roll back the website", "Vercel → Deployments → last good one → Promote to Production (instant)"],
      ["Roll back the AI program", "Ask Claude to redeploy the previous Fly release"],
      ["Undo a content change", "Sanity → document → History → restore; script changes also have a file in sanity-backups/"],
      ["Undo a code change", "Every change is a git commit; Claude can revert any one"],
    ], [36, 64]),
    H2("9.5 Troubleshooting"),
    table(["Symptom", "Likely cause and first step"], [
      ["Whole site down", "Vercel deployment or Supabase paused/over limit. Check Vercel status, then Supabase project status; roll back the last deployment if a deploy preceded it"],
      ["AI Analyst blank or slow", "Fly machine asleep (wait 20 s) or crashed; open the health URL; check OpenAI credit (a zero balance silently stopped search in September); ask Claude to read Fly logs"],
      ["AI Analyst unaware of new Sanity content", "Content type not read by the loader, or the webhook stopped: ask Claude to check the webhook log (a secret mismatch is the usual cause)"],
      ["Studio will not Publish", "Fill the field outlined in red, then Publish"],
      ["Lesson shows thin legacy blocks", "The Supabase lesson row lacks its sanity_slug; set it (standing rule 18)"],
      ["Tester refused with a valid code", "The code is not ticked for that domain; widen it on the Access Codes page"],
      ["Login loop on /chat or /dashboard", "ALLOW_AUTH_BYPASS=true must be set in Vercel production (done 14 Nov)"],
      ["The Wire empty", "Headline source down; check /the-wire and the ticker route; not a Supabase issue"],
    ], [30, 70]),
    box("Before the public launch", [
      "Beta gate cookie: it is plain text and can be forged; sign it before inviting more testers (signing logs every tester out).",
      "Payments and email: configure Stripe, Resend and Loops (none is set in production, so the site sends no automatic email); add Sentry; move Vercel from Hobby to Pro ($20/member/month) before charging users.",
      "Fix or remove the Solutions “Start an Engagement” form; fill or hide Webinars and Faculty; confirm the admin sign-in switch for launch.",
    ]),
  );
};
