// Part II continued (sections 19-20): operations procedures and the lesson-level inventory of the newest courses.
const fs = require("fs");
const path = require("path");
module.exports = ({ H, add }) => {
  const { P, H1, H2, B, N, table, box, code } = H;
  const L = JSON.parse(fs.readFileSync(path.join(__dirname, "data/lessons_new_2026-11-23.json"), "utf8"));
  const order = ["CMMI Models and Waiver Strategy", "VBC Financial Modeling and APM Readiness", "Political Sustainability of Reform", "FHIR, AI Governance and Clinical Decision Support in Practice", "Clinical Transformation Toolkit", "Transformation Leadership", "Health Equity Analytics", "Medicare for All Through the Five-Pillar Test"];
  const byTitle = Object.fromEntries(L.map(c => [c.course, c]));

  add(
    H1("19. Operations procedures"),
    P("These are the procedures an administrator needs most, written from the operations runbook (HTR_ADMIN_RUNBOOK.md, re-verified 15 November, with section 16 added 22 November) and from this session's work. Commands are shown for the terminal on the author's Mac; Claude runs them on request. Never paste a secret into a chat, a document or git."),
    H2("19.1 Where secrets live and how to rotate one"),
    table(["Location", "Contents", "In git?"], [
      ["backend/.env", "Groq, OpenAI, Sanity, Supabase and INGEST_SECRET (local copy of the AI program's settings)", "No"],
      ["frontend/.env.local", "Sanity, Supabase, local Resend, INGEST_SECRET and SANITY_WEBHOOK_SECRET (used by every script)", "No"],
      ["Vercel environment variables", "13 production variables (Section 10.4)", "n/a"],
      ["Fly secrets", "11 secrets (Section 10.4)", "n/a"],
      ["Sanity webhook", "The webhook secret, identical to SANITY_WEBHOOK_SECRET in Vercel", "n/a"],
    ], [26, 60, 14]),
    N("Revoke the old key at the provider and create a new one."),
    N("Update backend/.env and frontend/.env.local."),
    N("Update the value in Vercel and redeploy (settings are read at build time)."),
    N("If the AI program uses it, run fly secrets set KEY=value -a vhp-backend (this restarts the machine)."),
    N("Confirm the old key is dead and run a health check and one AI question."),
    H2("19.2 Emergency procedures"),
    table(["Situation", "Steps"], [
      ["The AI Analyst says the backend is offline", "Open https://vhp-backend.fly.dev/health (allow 20 seconds for a cold start). If it fails: fly status -a vhp-backend, then fly logs -a vhp-backend --no-tail. If the backend is healthy but the site fails, PYTHON_BACKEND_URL is unset or wrong in Vercel: set it and redeploy"],
      ["New Sanity content is not reaching the AI Analyst", "Read the website log for the webhook (each rejected notification states why: secret mismatch, missing signature or stale timestamp), and the Fly log for “Sanity webhook”. Re-create the webhook with a fresh secret in both places if needed"],
      ["Testers are sent to the login page", "ALLOW_AUTH_BYPASS is missing or not true in Vercel production: set it and redeploy"],
      ["Site down entirely", "Check the Vercel deployment log. A failed build leaves the previous deployment serving, so “down” is more often DNS or an expired domain (watch the .com expiry)"],
      ["The wrong book PDF is being served", "Copy the correct export to frontend/public/HTR_Book_v42.pdf and push; compare the byte count of the served file"],
      ["Someone must lose access immediately", "Deactivate their code on the Access Codes page; to sign out everyone, change the cookie name in proxy.ts and redeploy"],
    ], [30, 70]),
    H2("19.3 Rolling back"),
    B("**Website:** Vercel → Deployments → the last good one → Promote to Production; or git revert the commit and push."),
    B("**AI program:** fly releases -a vhp-backend, then redeploy the previous image."),
    B("**Sanity:** open the document → History → restore; scripted changes also have JSON backups in sanity-backups/."),
    B("**Book:** restore the timestamped copy from book-backups/ (the book is edited only after a backup)."),
    H2("19.4 Running the Academy and data scripts"),
    P("Scripts that touch Supabase must run from the frontend folder with the proxy setting, because node must resolve its Supabase library and the shell routes outside calls through a proxy:"),
    code("Run from the project root unless noted", `cd frontend
NODE_USE_ENV_PROXY=1 node scripts/seed-ctk-course.mjs            # dry run: shows tracks and lessons
NODE_USE_ENV_PROXY=1 node scripts/seed-ctk-course.mjs --commit   # writes Supabase rows
node scripts/audit-courses.mjs                                   # every lesson must be rich
cd frontend && npx tsx scripts/export-rht-report.mts export.json # RHT review data export
node docs/generators/rht_review_report.js out.docx . export.json # printable RHT review`),
    box("Hard rules that protect the platform", [
      "Seed scripts are upsert-only: removing a lesson means deleting its Supabase row. After posting to Sanity, set each lesson's sanity_slug or the app renders thin legacy blocks.",
      "Never write Academy or Sanity content without the author's approval; approvals are one-time and do not generalize. Never auto-restore content that was deliberately pulled.",
      "Never install, upgrade or remove Python, and never run or suggest brew install, without asking: a brew install once deleted Python 3.13 and broke four environments.",
    ]),
  );

  const rows = [];
  order.forEach(t => {
    const c = byTitle[t]; if (!c) return;
    c.tracks.forEach((tr, i) => rows.push([i === 0 ? c.course : "", `${i + 1}. ${tr.track}`, tr.lessons.map((l, j) => `${j + 1}) ${l}`).join("  ·  ")]));
  });
  add(
    H1("20. Lesson inventory of the newest courses"),
    P("The eight courses added or expanded since 14 November, track by track, with every lesson title as published (130 lessons in these eight courses; the other 17 courses are listed by track in Section 4.1). Each lesson was checked against sources before publishing, and most of these courses end with a capstone that turns the course's tools into a written plan."),
    table(["Course", "Track", "Lessons"], rows, [20, 22, 58]),
    P("**Reading the list:** where a course has a capstone it is the last lesson of its final track. The Transformation Leadership and Health Equity Analytics rows begin at Track 1, which pre-dates this work (7 and 6 lessons); the new tracks 2–5 follow. Lesson addresses are /academy/tracks/<course-slug>/<lesson-slug>."),
  );

  add(
    H1("21. One-page quick reference"),
    table(["Need", "Answer"], [
      ["Live addresses", "healthtransformationreview.org and .com (Review brand); healthtransformationsolutions.org and .com (Solutions brand, with Advisory Services)"],
      ["AI server health", "https://vhp-backend.fly.dev/health (status ok, version 4.2.0; allow 20 seconds if asleep)"],
      ["Admin sign-in", "/login, then /admin (role-checked); Sanity Studio at /studio"],
      ["Contact inbox", "contact@ on any of the four domains reaches one Workspace inbox"],
      ["Scale today", "25 courses · 145 tracks · 416 lessons · 45 tools · 73 analyses · 198 pages · 67,282 AI library passages"],
      ["Monthly cost", "About $40–45 plus one Workspace user (Supabase ≈ $35, Fly < $6, domains ≈ $4)"],
      ["Go-live of a code change", "Push to main: website in about 6–7 minutes; AI program a few minutes after any backend/ change"],
      ["Content change", "Publish in Sanity: AI library within about a minute; pages at midnight refresh or next deploy"],
      ["Undo", "Vercel Promote to Production · fly releases · Sanity History · book-backups/ · sanity-backups/"],
      ["Rebuild this document", "cd docs/generators && node master_docs.js ../HTR_Master_Documentation_2026-11-23.docx"],
      ["Date to remember", "29 December 2026: healthtransformationreview.com expires unless auto-renew is on"],
    ], [24, 76]),
  );
};
