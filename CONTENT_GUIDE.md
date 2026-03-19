# Vermont Health Platform — Content Management Guide

This guide is written for content editors and is intended to be non-technical. It covers everything you need to create, manage, and publish content on the Health Transformation Research (HTR) platform using Sanity Studio.

---

## Table of Contents

1. [Accessing Sanity Studio](#1-accessing-sanity-studio)
2. [Studio Layout Overview](#2-studio-layout-overview)
3. [The Five Pillars — How Content Is Organized](#3-the-five-pillars--how-content-is-organized)
4. [Every Document Type Explained](#4-every-document-type-explained)
5. [Creating Content — Step-by-Step Guides](#5-creating-content--step-by-step-guides)
6. [Rich Text Editing (blockContent)](#6-rich-text-editing-blockcontent)
7. [Images — Uploading and Best Practices](#7-images--uploading-and-best-practices)
8. [Publishing Workflow — Draft vs. Published](#8-publishing-workflow--draft-vs-published)
9. [Organizing Content with Categories and Pillars](#9-organizing-content-with-categories-and-pillars)
10. [Glossary Terms](#10-glossary-terms)
11. [Academy Modules and Courses](#11-academy-modules-and-courses)
12. [Real-Time Data Content (Tickers and Daily Insights)](#12-real-time-data-content-tickers-and-daily-insights)
13. [Common Mistakes to Avoid](#13-common-mistakes-to-avoid)

---

## 1. Accessing Sanity Studio

Sanity Studio is the editorial interface where all content is created and managed. There are two ways to access it.

### Option A — Hosted Studio (Recommended for Daily Use)

The studio is hosted online at:

**https://fxz10xl7.sanity.studio**

This URL works from any browser, on any computer. You do not need to run any software locally. Simply log in with your Sanity account credentials and you are ready to edit.

### Option B — Local Studio (For Developers or When Working Offline)

If you are running the project locally on your computer:

1. Open a terminal.
2. Navigate into the `frontend/sanity/` directory.
3. Run `npx sanity dev`.
4. Open your browser and go to `http://localhost:3333`.

The local studio connects to the same production database as the hosted studio. Changes made in either place are live.

### Logging In

- You will need a Sanity account. Ask your project administrator to invite you.
- Go to https://sanity.io and click "Log in" if you are not already signed in.
- Once logged in, navigate to the studio URL above.

---

## 2. Studio Layout Overview

When you open the studio, you will see a left sidebar with four main sections:

- **Editorial** — Articles, Policy Analyses, Case Studies, Analyst Notes, Reports
- **Academy** — Modules, Courses, Webinars, Instructors
- **Data & Intelligence** — Daily Insights, Ticker, Glossary, Hospitals, State Profiles
- **People & Taxonomy** — Authors, Categories, Subscribers

Click any section to expand it and see the list of documents inside.

At the top of each list you will see a "Create new" button (or a pencil icon). Click it to start a new document.

---

## 3. The Five Pillars — How Content Is Organized

Almost every document on the platform belongs to one of five topical pillars. These pillars determine where content appears on the site (which page and which colored section).

| Pillar | What It Covers | Site Section |
|---|---|---|
| **Policy** | Regulation, legislation, public health mandates, comparative policy | `/policy` |
| **Economics** | Value-based care models, market finance, workforce strategy, investment trends | `/economics` |
| **Technology** | AI and machine learning, digital health, data governance, tech-enabled workflows | `/technology` |
| **Clinical** | Hospital-at-home, precision medicine, virtual care, population health | `/clinical` |
| **Equity** | Social determinants of health, algorithmic bias, access disparities, community engagement | `/equity` |

When creating any document that has a Pillar field, always choose the pillar that best represents the primary focus of the content. This is what routes the content to the correct hub page on the site.

---

## 4. Every Document Type Explained

### Editorial Group

#### Post (Articles)
A general-purpose article. Posts are the simplest document type — a title, author, publication date, and rich text body. Use this for news items, short commentary, or content that does not fit neatly into a Policy Analysis.

**Where it appears on the site:** General article listing pages.

#### Policy Analysis
The primary long-form content type. Every substantive analytical article should be a Policy Analysis. This type has pillar and category classification, a status indicator (Active / Proposed / In Committee), and an impact level (Critical / High / Medium). It includes a summary field that appears on hub page cards before users click through.

**Where it appears on the site:** The pillar hub pages (`/policy`, `/economics`, `/technology`, `/clinical`, `/equity`) and individual article pages.

#### Case Study
Documents a real-world healthcare initiative — what an organization did, the measurable results it achieved, and the lessons learned. Case Studies have a client type field (e.g., "Rural Hospital", "Payer") and a key metrics list for prominently displaying outcomes like "40% reduction in readmissions."

**Where it appears on the site:** Case study listing pages and pillar hub pages.

#### Analyst Note (The Signal)
Short, punchy editorial commentary intended for the right sidebar on the site. Think of it as a curated insight or editorial signal from the HTR team. Keep the headline under 50 characters and the insight text short. Use bold text for emphasis. Only one Analyst Note is shown at a time — the most recently updated one marked as "Active."

**Where it appears on the site:** The right sidebar ("The Signal" panel) visible across most of the site.

#### Report (Impact Report)
A published research or impact report, typically distributed as a PDF. Reports have a cover image, access level control (Public / Client Only / Enterprise), an executive summary text field, and a file upload field for the PDF itself. They also include a key topics list for categorization.

**Where it appears on the site:** Research and reports section.

---

### Academy Group

#### Academy Module
A single learning unit within a course. Modules contain the full educational content: learning objectives, body text with special educational block types (stat grids, comparisons, knowledge checks, etc.), estimated reading time, and navigation links to the previous and next module.

**Where it appears on the site:** `/academy/modules/[slug]`

#### Course
A collection of Academy Modules assembled in sequence. A course has a format type (Certification / Course / Webinar / Masterclass), description, pricing, instructors, and an ordered list of modules. The full syllabus goes in the Overview field.

**Where it appears on the site:** `/academy/courses/[slug]` and the Academy hub at `/academy`

#### Webinar / Event
An upcoming or past live event. Webinars must have a date and time, which is used to sort them chronologically. Include the registration URL so users can sign up directly.

**Where it appears on the site:** `/academy/webinars/[slug]` and the Academy hub

#### Instructor
A person who teaches a course. Instructors have a name, role, biography, headshot, and expertise tags (e.g., "AI", "Clinical Ops"). Create one Instructor document per person, then link it to one or more Courses.

**Where it appears on the site:** Course pages and instructor profiles.

---

### Data & Intelligence Group

#### Daily Insight (Dark Strip)
A short, rotating editorial highlight shown in a prominent banner on the site. Choose a category (Quote of the Day / Chart of the Day / Stat of the Day / Must Read / Did You Know?), write a concise headline (120 characters maximum), and optionally add a link. Only one insight is shown at a time — the most recently updated one that is marked Active.

**Where it appears on the site:** The dark highlight strip, visible prominently on main pages.

#### System Vitals (Ticker)
Individual data points that scroll across the top ticker bar of the site. Each ticker item has a metric name (e.g., "ER Wait Time"), a current value (e.g., "4.2 Hours"), a trend note (e.g., "+12% YoY"), and a status color (Good / Warning / Critical / Neutral).

**Where it appears on the site:** The scrolling ticker bar at the top of the site.

#### Glossary Definition
A term and its plain-language definition, used to build the site glossary. Definitions can be tagged to one or more pillars so they surface in relevant sections.

**Where it appears on the site:** The glossary or research lab section; may also surface in-context within articles.

#### Hospital
A data record for a healthcare institution, used by the dashboard and simulation tools. Contains operational metrics (beds, discharges, length of stay, quality score, revenue, operating margin, staffing status). Hospitals are linked to a state via the State Slug field.

**Where it appears on the site:** `/dashboard` and `/dashboard/[state]` — the Rural Health Transformation dashboard.

#### RHT State Profile
Describes a state's participation in the Rural Health Transformation federal program. Contains the award amount, program status (Active / Pending / At Risk), strategic focus, and lists of initiatives and metrics.

**Where it appears on the site:** `/dashboard/[state]`

#### State Performance Index
A structured scorecard for a state's health system performance, broken down across all five pillars (Policy, Economics, Technology, Clinical, Equity). Each pillar has three sub-scores (0–100). Includes an overall performance score, a status label (Leading / Improving / Stable / At Risk), and a narrative summary.

**Where it appears on the site:** State performance dashboard and comparison tools.

---

### People & Taxonomy Group

#### Author
A person who writes articles. Authors have a name, biography, and photo. Once you create an Author document, you can link it to Post documents. The author name and photo appear on article pages.

#### Category
A freeform tag used to add an extra layer of organization beyond the five pillars. Categories have a title and optional description. They are supplementary — do not rely on them as the primary classification system (that is what pillars and subcategories are for).

#### Email Subscriber
A record of someone who has subscribed to the platform. Subscribers have an email address, a subscription tier (Free / Pro / Enterprise), and flags for whether the subscription is active and whether the weekly digest is enabled. This is typically managed automatically — you rarely need to edit these manually.

---

### Media

#### Audio
An audio clip with a title, URL, and summary. Audio objects are embedded inside rich text content using the body editor — they are not standalone pages.

---

## 5. Creating Content — Step-by-Step Guides

### How to Create a Policy Analysis Article

1. Open Sanity Studio.
2. In the left sidebar, click **Editorial** to expand it.
3. Click **Policy Analyses**.
4. Click the **pencil / create** icon at the top of the list.
5. Fill in the **Title** — make it clear, specific, and informative.
6. Click **Generate** next to the **Slug** field. The slug is the URL path for this article. Do not change it manually after publishing.
7. Select a **Pillar** using the radio buttons. This is required.
8. Select a **Category (Subcategory)** from the dropdown. Each pillar has four subcategories — choose the one that fits best.
9. Set the **Status**: Active (enacted policy or live program), Proposed (under consideration), or In Committee (moving through legislative process).
10. Set the **Impact Level**: Critical, High, or Medium. This badge appears on article cards.
11. Set the **Published At** date and time.
12. Write the **Summary / Abstract** — 2 to 3 sentences that will appear on hub page cards. This is what readers see before clicking into the article.
13. Write the full article in the **Body** field using the rich text editor.
14. Click **Publish** (green button, top right) when ready to go live.

---

### How to Create a General Article (Post)

1. In the left sidebar, click **Editorial**, then **Articles**.
2. Click the create icon.
3. Fill in the **Title**.
4. Click **Generate** next to **Slug**.
5. Link an **Author** by clicking the Author field and searching for an existing author (or create one first — see below).
6. Set the **Published At** date.
7. Write the article in the **Body** field.
8. Click **Publish**.

---

### How to Create a Case Study

1. Click **Editorial**, then **Case Studies**.
2. Click the create icon.
3. Fill in the **Title** — use the organization name or program being studied.
4. Generate the **Slug**.
5. Select the **Pillar** this case study belongs to.
6. Enter the **Client Type** (e.g., "Community Health Center", "Integrated Delivery System", "State Medicaid Agency").
7. Write the **Executive Summary** — 2 to 3 sentences on what the case study demonstrates.
8. Add **Key Metrics**: click "Add item" and enter each measurable outcome as a short string (e.g., "27% reduction in ED visits", "ROI of $3.4M in year one"). Add as many as are relevant.
9. Write the full analysis in the **Body** field.
10. Upload a **Cover Image** (optional but recommended).
11. Click **Publish**.

---

### How to Create a Webinar / Event

1. Click **Academy**, then **Webinars**.
2. Click the create icon.
3. Enter the **Event Title**.
4. Generate the **Slug**.
5. Select the **Pillar**.
6. Write a **Short Description** — what attendees will learn, who should attend.
7. Set the **Date & Time** — this is required and controls sorting.
8. Enter the **Duration** (e.g., "60 Min", "90 Min").
9. Paste the **Registration URL**.
10. Upload an **Event Banner** image.
11. Click **Publish**.

---

### How to Create a Report

1. Click **Editorial**, then **Reports**.
2. Click the create icon.
3. Enter the **Report Title**.
4. Enter an optional **Subtitle / One-liner** — a tagline or descriptive phrase.
5. Set the **Publication Date**.
6. Set the **Access Level**: Public (anyone can see it), Client Only (behind login), or Enterprise (restricted tier).
7. Upload a **Cover Image**.
8. Upload the **PDF Document** using the file upload field.
9. Write the **Executive Summary** — 3 to 4 sentences.
10. Add **Key Topics**: click "Add item" and enter one topic per line (e.g., "Value-Based Care", "Medicaid Reform").
11. Click **Publish**.

---

### How to Create an Author

1. Click **People & Taxonomy**, then **Authors**.
2. Click the create icon.
3. Enter the author's **Name**.
4. Click **Generate** to create their **Slug** (used for author profile pages).
5. Upload their **Image** (headshot).
6. Write a brief **Bio** in the bio field.
7. Click **Publish**.
8. Now when creating articles, you can link this author by searching their name in the Author field.

---

### How to Create an Instructor

1. Click **Academy**, then **Instructors**.
2. Click the create icon.
3. Enter the instructor's **Name**.
4. Enter their **Role** (e.g., "Chair of Technology Pillar", "Clinical Transformation Lead").
5. Write their **Biography**.
6. Upload their **Headshot**.
7. Add **Expertise Tags**: enter each tag as an item (e.g., "AI", "Clinical Operations", "Value-Based Care").
8. Click **Publish**.

---

### How to Create an Analyst Note (The Signal)

1. Click **Editorial**, then **Analyst Notes**.
2. Click the create icon.
3. Make sure **Is Active** is checked if you want this note to appear on the site. Uncheck it to hide it.
4. Write the **Headline / Topic** — maximum 50 characters. Keep it sharp.
5. Write **The Insight** in the content field. Keep it brief — 2 to 4 sentences. Use bold text for key phrases.
6. Set the **Analyst Name** (defaults to "Chief Editor").
7. Click **Publish**.

Note: Only the most recently updated active Analyst Note is shown on the site at any time. If you want to replace the current note, either edit the existing one or mark it inactive and publish a new one.

---

## 6. Rich Text Editing (blockContent)

Most document types use the rich text editor (called blockContent) for their body content. Here is everything you can do inside it.

### Text Styles

Use the style dropdown at the top left of the editor to apply these styles to a paragraph:

- **Normal** — Standard body text.
- **H1** — Large section heading (use sparingly; usually only one per article).
- **H2** — Major section heading. Use to divide the article into main topics.
- **H3** — Sub-section heading within an H2 section.
- **H4** — Minor sub-heading.
- **Quote** — A pull quote or block quotation. Renders as visually distinguished text.
- **Highlight** — Emphasized paragraph, rendered with a highlight treatment.
- **Callout** — A visually set-apart box for important notes, warnings, or summaries.

### Text Formatting

Select text and click the toolbar icons to apply:

- **Bold (B)** — Strong emphasis.
- **Italic (I)** — Soft emphasis or titles.
- **Underline (U)** — Use sparingly.
- **Strikethrough** — For indicating removed or outdated text.
- **Link** — Select text and click the link icon to add a URL. A popup will ask you for the full URL (include https://).

### Lists

- **Bullet list** — For unordered items.
- **Numbered list** — For sequential steps or ranked items.

### Inserting Block Elements

Click the "+" button (or press Enter at the start of a new line and look for the insert menu) to add:

- **Image** — Upload a photo directly into the body. Always fill in the Alt text and optional Caption after uploading.
- **Code** — A formatted code or data block. Defaults to JSON format. Use for data tables or technical snippets.
- **Video** — Paste a video URL (YouTube, Vimeo, etc.) and add a caption.
- **Audio** — Paste an audio URL and add a title and summary.

### Educational Block Types (Academy Modules Only)

These additional block types are available in Academy Module content. They render as visually designed instructional elements on the site:

- **Stat Grid** — 2 to 4 striking statistics displayed as visual cards. Each stat has a value (e.g., "$4.1T"), a short label, one sentence of context, and an optional trend arrow (up / down / neutral).
- **Real-World Example** — An eyebrow label, an organization name, a description of what they did, a measurable outcome, and a source attribution.
- **Analogy** — Maps an abstract concept to an everyday experience. Fill in the concept being explained, the analogy in plain language, and a bridge sentence that brings it back to healthcare.
- **Comparison Table** — Side-by-side comparison (e.g., Fee-for-Service vs. Value-Based Care). Set column labels, then add rows with a dimension/aspect and a value for each column.
- **Step-by-Step Process** — A numbered process flow. Give it a title, then add steps with a number, title, and description.
- **Knowledge Check** — A comprehension question with an optional hint and a full answer. The answer is revealed interactively on the site.
- **Key Takeaways** — A bullet list of summary points at the end of a section. Give the block a title (defaults to "Key Takeaways") and add as many points as needed.
- **Common Misconception** — Two fields: the wrong belief people commonly hold, and the correct reality. Renders as a myth-vs-fact card.

---

## 7. Images — Uploading and Best Practices

### How to Upload an Image

1. Click the image field or the "+" insert button in the body editor.
2. A dialog will open. Either drag and drop your image file, or click "Select" to browse your computer.
3. Once uploaded, you will see the image with a blue crop/hotspot circle. Drag this circle to indicate the focal point of the image (the part that should remain visible when the image is cropped to different sizes).
4. Always fill in the **Alt Text** field — this is important for accessibility and SEO.
5. Fill in the **Caption** field if the image needs a credit line or explanatory note.

### Recommended Image Dimensions and Formats

| Use | Recommended Size | Format |
|---|---|---|
| Article cover / hero image | 1600 × 900 px (16:9 ratio) | JPG or WebP |
| Author headshot | 400 × 400 px (square) | JPG |
| Instructor headshot | 400 × 400 px (square) | JPG |
| Webinar / event banner | 1200 × 630 px | JPG or PNG |
| Case study cover image | 1200 × 800 px | JPG |
| Report cover image | 800 × 1000 px (portrait) | JPG or PNG |
| In-body images | 1200 px wide minimum | JPG or WebP |

### Image Quality Tips

- Use high-resolution images. The platform will generate optimized sizes automatically, but start with a quality source file.
- Avoid images with text baked in — the platform cannot reformat embedded text.
- Always set the hotspot. For portraits, center the hotspot on the person's face. For landscapes, center it on the subject of interest.
- File size: aim for under 2 MB per image before upload. Very large files slow down uploads.

---

## 8. Publishing Workflow — Draft vs. Published

Sanity uses a two-state system: **Draft** and **Published**.

### Draft State

- When you create a new document or edit an existing one, your changes are saved automatically as a Draft.
- Drafts are NOT visible on the live website.
- You can save a draft and come back to it later without any risk of it appearing prematurely.
- A yellow "Draft" badge appears in the top bar of the document when you are viewing a draft.

### Published State

- Click the green **Publish** button (top right of the document) to make a document live.
- Once published, the content appears on the website immediately (within a few seconds).
- You can continue editing a published document. Your changes will save as a new draft and not go live until you click Publish again.

### Unpublishing

- If you need to take content off the site, click the three-dot menu (top right) and select **Unpublish**.
- The document becomes a draft again and is removed from the live site.
- The document and all its content are preserved — it is not deleted.

### Deleting

- To permanently delete a document, click the three-dot menu and select **Delete**.
- Be careful: this action cannot be easily undone.
- For content you want to hide temporarily, prefer Unpublish over Delete.

---

## 9. Organizing Content with Categories and Pillars

### Pillars (Primary Organization)

Pillar is the most important classification for most document types. It determines which hub page content appears on and what color coding it receives. Always set the pillar correctly before publishing.

- The five pillars are: Policy, Economics, Technology, Clinical, Equity.
- Content without a pillar set may not appear on any hub page.

### Subcategories on Policy Analysis

Policy Analysis documents have a two-level classification: the Pillar (top level) and the Category / Subcategory (second level). There are 20 subcategories total, four per pillar:

**Policy pillar subcategories:**
- Regulation & Legislation
- Public Health Mandates
- Global & Comparative Policy
- Policy Feasibility Studies

**Economics pillar subcategories:**
- Value-Based Care Models
- Market & Finance
- Labor & Workforce Strategy
- Healthcare Investment Trends

**Technology pillar subcategories:**
- AI & Machine Learning
- Digital Health & Telemedicine
- Data Security & Governance
- Tech-Enabled Workflow

**Clinical pillar subcategories:**
- Hospital-at-Home
- Precision Medicine
- Virtual Care Models
- Population Health

**Equity pillar subcategories:**
- SDOH Integration
- Algorithmic Bias
- Access Disparity
- Community Engagement

Always choose the subcategory that matches the pillar you selected. Mismatching (e.g., choosing a Technology pillar but an Equity subcategory) will cause incorrect filtering on the site.

### Categories (Supplementary Tags)

The Category document type is a freeform supplementary tag. Use it for cross-cutting themes that span multiple pillars (e.g., "Medicaid Expansion", "Rural Access"). Categories do not replace pillar classification — they add an extra filter layer.

---

## 10. Glossary Terms

Glossary Definitions live under **Data & Intelligence → Glossary** in the studio.

### How to Add a Glossary Term

1. Click **Data & Intelligence**, then **Glossary**.
2. Click the create icon.
3. Enter the **Term / Acronym** exactly as it should appear (e.g., "ACO", "SDOH", "Value-Based Care").
4. Write the **Definition** in plain language — aim for 2 to 4 sentences. Avoid jargon in the definition itself.
5. Select one or more **Associated Pillars** by clicking the tags. A term can belong to multiple pillars.
6. Click **Publish**.

### Tips for Writing Good Definitions

- Define the acronym first, then explain what it means in practice. Example: "ACO (Accountable Care Organization): a group of doctors, hospitals, and other healthcare providers who come together voluntarily to give coordinated high-quality care."
- Write for a healthcare professional audience that may be new to a particular specialty — not for a general public audience and not for subject-matter experts only.
- Keep definitions under 100 words unless the concept requires more.
- Link the term to one or more pillars so it surfaces in the right context on the site.

---

## 11. Academy Modules and Courses

The Academy section is the platform's structured learning environment. It is organized in two levels: Courses (the overall program) and Modules (individual learning units within a course).

### Understanding the Relationship

- A **Course** is the container. It has an overview, format type, pricing, and an ordered list of modules.
- An **Academy Module** is a single lesson. It has full body content, learning objectives, and navigation links to the previous and next module in the sequence.
- One module can technically belong to multiple courses, but in practice each module is usually written for a specific course.

### Step 1 — Create Instructor Records First

Before creating a course, create the Instructor documents for anyone who will teach it (see step-by-step guide above). You will need these to link to the course.

### Step 2 — Create Module Documents

Create one Academy Module document per lesson. Here is the full field guide:

1. **Module Title** — The lesson name (e.g., "Understanding Capitation and Risk-Sharing").
2. **Slug** — Auto-generate from the title.
3. **Course Title** — Type the name of the parent course this module belongs to (e.g., "Value-Based Care Fundamentals"). This is a plain text field — type it exactly the same across all modules in the same course.
4. **Module Number** — The position in the course sequence. The first module is 1, the second is 2, etc.
5. **Total Modules in Course** — The total number of modules in the parent course (e.g., 6). This renders a progress indicator like "Module 2 of 6."
6. **Previous Module Slug** — The slug of the module that comes before this one. Leave blank for the first module.
7. **Next Module Slug** — The slug of the module that comes after this one. Leave blank for the last module.
8. **Primary Pillar** — The pillar this module primarily addresses (Policy / Economics / Technology / Clinical / Equity / All Pillars).
9. **Level** — Foundational, Intermediate, or Advanced.
10. **Estimated Read Time (minutes)** — Approximate number of minutes to complete the module.
11. **Published At** — The date the module goes live.
12. **Learning Objectives** — Add 3 to 5 bullet points describing what the learner will be able to do after completing this module. Start each with an action verb: "Explain...", "Apply...", "Compare...", "Identify...".
13. **Summary** — 3 to 4 sentences describing what the module covers. This appears on the module listing page.
14. **Body** — The full lesson content. Use educational block types (stat grids, comparisons, knowledge checks, etc.) liberally throughout.

### Step 3 — Create the Course Document

After all modules are created and published:

1. Click **Academy**, then **Courses**.
2. Click the create icon.
3. Enter the **Title** (the course name).
4. Generate the **Slug**.
5. Select the **Pillar**.
6. Select the **Format Type**: Certification, Course, Webinar, or Masterclass.
7. Write the **Short Description** — 2 to 3 sentences for the course listing.
8. Fill in **Meta Details** — a compact format string (e.g., "6 Modules • Self-Paced • Online").
9. Fill in **Price** (e.g., "$2,995" or "Free").
10. Link **Instructors** — click the instructors field and search for the instructor documents you created.
11. Add **Course Modules** in order — click the modules field, search for each module by name, and add them in sequence. Drag to reorder if needed.
12. Write the **Full Overview / Syllabus** in the overview field — use H2 and H3 headings to structure a detailed syllabus for the course detail page.
13. Click **Publish**.

### Module Navigation Setup

For modules to link to each other correctly, each module needs the slug of its neighbor:

- Module 1: prevModuleSlug = (leave blank), nextModuleSlug = slug-of-module-2
- Module 2: prevModuleSlug = slug-of-module-1, nextModuleSlug = slug-of-module-3
- Module 3 (final): prevModuleSlug = slug-of-module-2, nextModuleSlug = (leave blank)

You can find a module's slug at the top of its document in the Slug field.

---

## 12. Real-Time Data Content (Tickers and Daily Insights)

### Managing the Ticker Bar

The ticker bar scrolls across the top of the site and displays live healthcare system metrics.

To update a ticker metric:

1. Click **Data & Intelligence**, then **Ticker**.
2. Click an existing ticker item to edit its value and trend, or create a new one.
3. Update the **Current Value** field (e.g., change "4.2 Hours" to "4.5 Hours").
4. Update the **Trend / Context** field with current context (e.g., "+12% YoY").
5. Set the **Status Color** appropriately:
   - Good (Green) — metrics that are improving or within target
   - Warning (Orange) — metrics approaching concerning levels
   - Critical (Red) — metrics in an alarming state
   - Neutral (Blue) — informational metrics with no directional judgment
6. Click **Publish**.

### Managing Daily Insights

The Daily Insight is the prominent callout banner displayed on the site.

To change the active insight:

1. Click **Data & Intelligence**, then **Daily Insights**.
2. To retire the current insight: open it and uncheck **Is Active**, then click Publish.
3. Click the create icon to create a new insight.
4. Select the **Category**: Quote of the Day, Chart of the Day, Stat of the Day, Must Read, or Did You Know?
5. Write the **Content / Headline** — maximum 120 characters.
6. Optionally add a **Link** if the insight references an external source.
7. Make sure **Is Active** is checked.
8. Click **Publish**.

The site always shows the most recently updated active insight. You do not need to delete old ones — simply mark them inactive.

---

## 13. Common Mistakes to Avoid

### 1. Publishing Without Setting a Pillar

Policy Analysis, Case Study, Webinar, Course, and Academy Module documents all require a pillar. If you forget to set it, the content will not appear on the correct hub page. Always set the pillar before clicking Publish.

### 2. Mismatching Pillar and Subcategory

On Policy Analysis documents, the subcategory list contains all 20 options from all five pillars. Always choose a subcategory that belongs to the pillar you selected. Choosing "AI & Machine Learning" (Technology) while the pillar is set to "Equity" will place the article in the wrong filter group.

### 3. Forgetting to Generate the Slug

Every document with a Slug field needs one before it can be published. Click the Generate button next to the Slug field right after entering the title. Do not change the slug after the document has been published — this will break existing links to that page.

### 4. Leaving the Summary Blank

The Summary / Abstract field on Policy Analysis, Case Study, and Academy Module documents is what appears on hub page cards. If it is blank, visitors see an empty card and have no reason to click through. Always fill in a compelling 2 to 3 sentence summary before publishing.

### 5. Setting Two Analyst Notes or Two Daily Insights Active at Once

Only one Analyst Note (The Signal) and one Daily Insight are displayed on the site at any given time — the most recently updated active one. If you create a new one without deactivating the old one, there may be confusion about which is showing. Best practice: mark the old one inactive before publishing the new one.

### 6. Using H1 Multiple Times in an Article

H1 is reserved for the page title. Inside the body of an article, use H2 for major sections and H3 for subsections. Using multiple H1 headings within a body will result in poor visual hierarchy and SEO problems.

### 7. Forgetting Alt Text on Images

Every image uploaded to the site — whether as a cover image or within the body — should have Alt text filled in. Alt text is read by screen readers and is also indexed by search engines. A good alt text describes what is in the image (e.g., "Doctor reviewing patient chart on tablet in hospital corridor").

### 8. Not Setting Module Navigation Slugs

Academy Modules have prevModuleSlug and nextModuleSlug fields that power the "Previous Module / Next Module" navigation buttons on the site. If these are left blank (except for the first and last modules in a course), readers will have no way to move between lessons. Fill these in when you finish creating all modules for a course.

### 9. Editing a Live Slug

Once an article or module is published and its URL is live, do not change the slug. Changing it creates a new URL and the old URL will return a 404 error. If a URL must change, coordinate with a developer to set up a redirect.

### 10. Deleting Instead of Unpublishing

If you need to temporarily remove content, use Unpublish (three-dot menu → Unpublish) rather than Delete. Unpublished documents remain in the studio as drafts, can be edited, and can be re-published when ready. Deleted documents are gone and cannot be recovered without a backup restore.

### 11. Using the Wrong Format for State Slugs

Hospital and State Profile documents use a State Slug field that must match the URL format exactly: lowercase letters with underscores for spaces (e.g., `vermont`, `new_york`, `north_carolina`). If the slug does not match the route format, the document will not be linked correctly in the dashboard.

### 12. Uploading PDFs Without a Cover Image

Report documents have both a PDF file upload and a cover image. If you upload the PDF but forget the cover image, the report card on the site will have no visual. Always pair a PDF report with an attractive cover image.

---

## Quick Reference — Document Type to Site Route

| Document Type | Where It Appears |
|---|---|
| Post | Article listing pages |
| Policy Analysis | `/policy`, `/economics`, `/technology`, `/clinical`, `/equity` hub pages and individual article pages |
| Case Study | Case study listing pages and pillar hubs |
| Analyst Note | Right sidebar "The Signal" panel (site-wide) |
| Report | Reports / research section |
| Academy Module | `/academy/modules/[slug]` |
| Course | `/academy` and `/academy/courses/[slug]` |
| Webinar | `/academy` and `/academy/webinars/[slug]` |
| Instructor | Course detail pages |
| Author | Article pages |
| Category | Supplementary filter tags |
| Glossary Definition | Glossary / research lab |
| Hospital | `/dashboard` and `/dashboard/[state]` |
| RHT State Profile | `/dashboard/[state]` |
| State Performance Index | State performance dashboards |
| Daily Insight | Prominent banner / dark strip on main pages |
| Ticker | Top scrolling ticker bar |
| Subscriber | Internal subscriber management (not public-facing) |

---

*Guide last updated: March 2026. Sanity Project ID: fxz10xl7. Dataset: production.*
