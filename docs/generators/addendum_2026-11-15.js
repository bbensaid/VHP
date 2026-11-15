const { Paragraph, TextRun } = require("./node_modules/docx");
const { P, H1, H2, B, table, box, gap, build, OK_FILL, WARN_FILL } = require("./docstyle");

const NAVY = "1F3A5F";
const c = [];
const add = (...x) => c.push(...x.flat());

add(
  new Paragraph({ spacing: { before: 600, after: 200 }, children: [new TextRun({ text: "Health Transformation Review", size: 44, bold: true, color: NAVY, font: "Arial" })] }),
  new Paragraph({ spacing: { after: 360 }, children: [new TextRun({ text: "Documentation Addendum: 15 November 2026", size: 34, color: NAVY, font: "Arial" })] }),
  P("File this with the three guides printed on 14 November 2026. It covers every change made since that printing. Where this addendum and a printed page disagree, this addendum is correct."),
  P("**Prepared:** 15 November 2026, by Claude (Claude Code), for Bechir Ben Said. Facts were checked against the live platform, the code and the accounts on that date."),
  box("The three documents this updates", [
    "**Infrastructure and Software Inventory** (the Inventory)",
    "**Content Production Guide** (the Content Guide)",
    "**Ecosystem, User and Operations Guide** (the Operations Guide)",
    "**In short:** email now works on all four domains through one inbox; Sanity is connected to the AI Analyst; leftover content from the old Academy courses has been retired. Section 7 lists what is still yours to do.",
  ], OK_FILL),
  gap(),
  P("**Contents:** 1. Email  ·  2. Contact details on the website  ·  3. Sanity and the AI Analyst  ·  4. Academy  ·  5. Costs  ·  6. Corrections to the printed pages  ·  7. Still open"),
);

// ───────────── 1
add(
  H1("1. Email: one Google Workspace inbox for all four domains (new)"),
  P("You have one paid Google Workspace user, **contact@healthtransformationreview.org**. The other three domains are attached to it as **User alias domains**, which cost nothing. Mail sent to contact@ at any of the four domains arrives in that one inbox."),
  table(["Address", "How it works", "Cost"], [
    ["contact@healthtransformationreview.org", "The mailbox itself (the one you sign in to)", "One Workspace user"],
    ["contact@healthtransformationreview.com", "Alias domain: arrives in the same inbox", "$0"],
    ["contact@healthtransformationsolutions.org", "Alias domain: arrives in the same inbox", "$0"],
    ["contact@healthtransformationsolutions.com", "Alias domain: arrives in the same inbox", "$0"],
  ], [42, 40, 18]),
  gap(),
  P("**Mail records (checked 15 November).** All four domains have the four records Google needs, in Vercel DNS: MX (1 smtp.google.com), SPF (include:_spf.google.com ~all), DKIM (google._domainkey) and DMARC (v=DMARC1; p=none). A test message from the .org scored **10/10 on mail-tester.com**, so it is not marked as spam."),
  P("**To send from another domain:** in the contact@ Gmail, open Settings (gear), then See all settings, then **Accounts**, then “Send mail as”, then Add another email address. Add each address once. After that, pick it in the From field when writing or replying."),
  P("**What raises the cost:** only adding a second Workspace user. Extra aliases and alias domains are free."),
  box("One check for you", ["Send a message from your personal Gmail to contact@healthtransformationsolutions.com and confirm it arrives. Claude cannot send email, so this delivery test has not been done."], WARN_FILL),
);

// ───────────── 2
add(
  H1("2. Contact details on the website (changed)"),
  P("Every email address on the site is now **contact@ followed by the domain the visitor is on**. A visitor on healthtransformationsolutions.com sees contact@healthtransformationsolutions.com, and likewise on the other three. Your personal Gmail address no longer appears anywhere on the site or in the AI program. Checked live on all four domains, before and after entering an access code; the automated tests passed 57 of 57 on both brands."),
  P("Your **admin sign-in** is still bechir.bensaid@gmail.com. That is your login, not a public address, and it is unchanged."),
  table(["What was on the site", "What it is now", "Why"], [
    ["“Contact Us” opened an email to bechir.bensaid@gmail.com", "contact@<domain being viewed>", "Your instruction"],
    ["hello@, info@, privacy@, connect@, advisory@, policy@ and press@ **htr.com** (footer, Terms, Privacy, Billing, FAQ, HTR Connect, Advisory contact page)", "contact@<domain being viewed>", "htr.com is not your domain: mail went to a stranger or nowhere"],
    ["Weekly digest sent from an address at healthtransformationreport.com", "digest@healthtransformationreview.org", "The old one was not your domain"],
    ["Certificate page: support@healthtransformationreview.com", "contact@<domain being viewed>", "That mailbox never existed"],
    ["Tester reports sent to your Gmail", "contact@healthtransformationreview.org", "Keeps project mail in one place"],
    ["Phone **+1 (802) 555-0123**", "Removed", "555 numbers are fictional"],
    ["Offices: 120 St. Paul Street, Burlington; 1400 K Street NW, Washington; “Burlington · San Francisco”", "Removed", "They contradicted each other and appear to be invented"],
    ["Footer “Advisory” and “Press” email rows", "Removed", "Both used htr.com addresses"],
  ], [44, 28, 28]),
  gap(),
  P("**If you have a real phone number or office address,** give it to Claude and it will be added back."),
);

// ───────────── 3
add(
  H1("3. Sanity is connected to the AI Analyst (done)"),
  P("The one-time setup the printed guides asked you to do is **done and tested**. Whatever you publish in Sanity now reaches the AI Analyst about a minute later. Ignore every printed instruction to “set up the webhook first” or “once Section 9 is done”."),
  P("**Live test, 15 November:** a published change to a glossary term reached the website. The site checked Sanity's signature and passed the change to the AI program. The term's passages in the AI library were replaced within 5 seconds, with no duplicates."),
  table(["Setting (sanity.io/manage, then project, API, Webhooks)", "Value"], [
    ["Trigger on", "Create, Update, Delete"],
    ["Drafts", "Off: unpublished drafts never reach the AI Analyst"],
    ["Secret", "Stored in Sanity and in Vercel (SANITY_WEBHOOK_SECRET); the two must be identical"],
  ], [38, 62]),
  gap(),
  B("**If the AI Analyst stops picking up new content:** ask Claude to check the webhook. The website's log states why any notification was rejected (for example, a secret mismatch)."),
  B("**If the webhook is ever deleted or re-created:** ask Claude for a fresh secret. Claude sets it in Vercel and gives you the exact text to paste into Sanity's Secret field."),
  H2("AI library figures"),
  table(["", "14 Nov (printed)", "15 Nov (now)"], [
    ["Total searchable passages", "59,412", "**60,299**"],
    ["Academy lesson passages", "19,065", "20,111 (the 299 lesson bodies)"],
    ["Policy analysis passages", "4,207 (77 analyses)", "4,048 (73 analyses)"],
  ], [40, 28, 32]),
  gap(),
  P("The change comes from re-loading every Sanity document under its permanent Sanity ID, so a later edit replaces a document's passages instead of adding a duplicate copy. Four analyses were removed (Section 4)."),
);

// ───────────── 4
add(
  H1("4. Academy: old content retired (done)"),
  P("Every lesson module in Sanity now matches its lesson in the current Academy. **The Studio's “Publish is greyed out” problem on older lessons is fixed**, so ignore that row in the printed troubleshooting tables."),
  B("**All 299 lesson modules corrected.** Each now carries its lesson's current title, summary, course, position and next/previous lesson. 261 had empty required fields, which made the Studio refuse to publish edits; others still named retired courses."),
  B("**8 duplicate lesson modules deleted** (307 to 299, now exactly one per lesson)."),
  B("**4 “Value-Based Care Fundamentals” units deleted.** They had been filed as analysis briefs (77 to 73 briefs)."),
  B("**3 lesson titles and 2 lesson positions corrected** in Supabase. The 2 positions were lessons stuck at the end of their course."),
  B("**Old addresses forward to the current pages.** The 12 deleted items forward to the lessons they duplicated. Any old /academy/modules/… address opens the lesson in the current player. Any old /academy/courses/… address opens the current course; the two retired courses map to Value-Based Care and Genomics & Precision Medicine."),
  B("**Personalized Learning** now links only to real courses. Code for the retired “learning tracks” was removed."),
  P("A backup of every Sanity document was saved before each change (sanity-backups/ in the project folder)."),
);

// ───────────── 5
add(
  H1("5. Costs: one new line"),
  P("Add this row to the money table (Inventory, Section 10). Every other row is unchanged."),
  table(["Service", "Plan", "Expected monthly cost", "What makes it go up", "Billing page"], [
    ["Google Workspace (email)", "1 user: contact@healthtransformationreview.org; the 3 other domains are free alias domains", "One user at your Workspace plan's price (see the Google bill)", "Adding a second user; aliases and alias domains cost nothing", "admin.google.com, then Billing"],
  ], [16, 26, 20, 20, 18]),
  gap(),
  P("The monthly total becomes **roughly $40–45 plus one Google Workspace user**. The Workspace price is not stated because it depends on the plan you chose, which Claude cannot read."),
);

// ───────────── 6
add(
  H1("6. Corrections to the printed pages"),
  P("Use this to mark up your printed copies. “Was” is what the page says; “Now” replaces it."),
  table(["Document", "Section", "Was", "Now"], [
    ["Inventory", "1.2 Pillar pages", "77 policy analyses", "73"],
    ["Inventory", "1.2 AI Analyst", "59,412 searchable passages", "60,299"],
    ["Inventory", "1.5 AI library", "Sanity edits reach it “once the webhook is set up”", "Reach it within about a minute (set up and tested 15 Nov)"],
    ["Inventory", "1.5 AI library table", "Lessons 19,065 · Analyses 4,207 (77) · Total 59,412", "Lessons 20,111 (299) · Analyses 4,048 (73) · Total 60,299"],
    ["Inventory", "2 Domains table, “Contact Us” row", "Opens an email to bechir.bensaid@gmail.com", "Opens an email to contact@<domain being viewed>"],
    ["Inventory", "2.3 Problems found", "Contact Us goes to your Gmail", "contact@<domain being viewed>; one Workspace inbox"],
    ["Inventory", "5.3 Supabase", "~59,000 passages", "~60,000"],
    ["Inventory", "10 Money", "No email line", "Add Google Workspace (Section 5 above)"],
    ["Inventory", "11 Open problems", "“Runbook out of date”", "**Done:** runbook re-verified 15 Nov"],
    ["Inventory", "11 Open problems", "“Connect Sanity to the AI Analyst”", "**Done**"],
    ["Inventory", "11 Open problems", "“261 of 307 modules lack required fields”", "**Done:** all 299 corrected"],
    ["Content Guide", "Opening box", "“Connect Sanity first (Section 9)”", "Connected; nothing to do"],
    ["Content Guide", "1 Where content lives", "77 briefs · 307 modules · “once Section 9 is done”", "73 briefs · 299 modules (one per lesson) · “about a minute after Publish”"],
    ["Content Guide", "2.4 How fast changes appear", "AI Analyst “only after Section 9 setup”", "About a minute after Publish"],
    ["Content Guide", "7 Checklist", "“after Section 9 is done”", "Wait a minute after publishing"],
    ["Content Guide", "8 AI library", "about 59,000 passages", "about 60,000"],
    ["Content Guide", "8 “Fixed” box", "14 November fixes", "Add: old Academy content retired 15 Nov (Section 4 above)"],
    ["Content Guide", "9 One-time setup", "Steps to create the webhook", "Replace with Section 3 above: connected and tested"],
    ["Content Guide", "10 Known gaps", "“Publish is greyed out” on older lessons", "Fixed; remove"],
    ["Operations Guide", "1 Ecosystem table", "77 analysis briefs", "73"],
    ["Operations Guide", "2.8 Advisory Services", "Contact Us emails your Gmail", "contact@<domain being viewed>; Section 1 above"],
    ["Operations Guide", "4.5 Settings table, Sanity webhooks", "“You”", "Set up and tested 15 Nov; “You (with Claude)”"],
    ["Operations Guide", "5 Troubleshooting: AI Analyst unaware of new content", "“Webhook not set up”", "Content type not read, or webhook stopped: ask Claude to check its log"],
    ["Operations Guide", "5 Troubleshooting: Studio won't Publish", "“For older lessons: summary, course title, module number”", "Fill the field outlined in red, then Publish"],
    ["Operations Guide", "6 Before the public launch", "“Update the runbook”", "Done 15 Nov; remove"],
  ], [15, 23, 31, 31]),
  gap(),
  P("The runbook (HTR_ADMIN_RUNBOOK.md in the project folder) was fully re-checked against the live accounts on 15 November and now has an email section."),
);

// ───────────── 7
add(
  H1("7. Still open: yours to do"),
  H2("New since the printing"),
  B("Send a test email to contact@healthtransformationsolutions.com and confirm it arrives in the contact@ inbox."),
  B("In Gmail: Settings, Accounts, “Send mail as”: add the three other contact@ addresses if you want to send from them."),
  B("Give Claude a real phone number or office address if you want one shown on the site."),
  H2("Still open from the printed Inventory (Section 11)"),
  B("**healthtransformationreview.com expires 29 December 2026 with auto-renew OFF.** Vercel, then Domains, then healthtransformationreview.com, then turn on Auto Renew ($12.03/yr). It now also carries one of your email addresses."),
  B("Ask GitHub Support to purge the old pull-request copies of the Dictionary PDF, and close those pull requests."),
  B("Decide whether “Health Economics.pdf” may stay in the public repository."),
  B("Decide on the forgeable beta cookie before inviting more testers."),
  B("Fix or remove the Solutions “Start an Engagement” form, which sends nothing."),
  B("Check invoices monthly: Fly, OpenAI, Vercel (which includes Supabase) and now Google Workspace."),
  P("The before-launch list (Operations Guide, Section 6) is otherwise unchanged: the beta sign-in switch, the beta pass, Stripe, email sending keys, Sentry, Vercel Pro, the Advisory form, and the Webinars and Faculty pages. Email sending keys (Resend, Loops) are separate from your new Workspace mailbox: the site still sends no automatic emails until they are configured."),
);

build(process.argv[2], "HTR Documentation Addendum, 15 November 2026", "HTR Documentation Addendum", c, "15 November 2026");
