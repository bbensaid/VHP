# HTR Platform — Training Materials Index
*Health Transformation Review | Created May 2026*

---

## What's Here

This directory contains all user training materials for the HTR platform, organized into four categories:

1. **User Guides** — role-specific quick-start guides (Markdown)
2. **Feature Guides** — deep-dive reference sheets per major feature (Markdown)
3. **Video Scripts** — production-ready scripts for Loom, Synthesia, HeyGen, or Camtasia
4. **In-App Training** — code built directly into the platform

---

## User Guides — By Role

Located in: `training/user-guides/`

| File | Role | Key Sections |
|------|------|-------------|
| `quick-start-executive.md` | Hospital / Health System Executive | HTR Simulator, 50-State Dashboard, Financial Stress Test, AI Analyst |
| `quick-start-policy-analyst.md` | Policy Analyst / Government Official | Policy hub, Policy Simulator, Vermont programs, State comparison |
| `quick-start-clinician.md` | Clinician (MD, NP, PA) | Clinical hub, Health Equity Studio, Population Health Modeler, Academy |
| `quick-start-economist.md` | Health Economist / Actuary | APM Design Lab, CEA Calculator, Actuarial Lab, Global Budget Modeler |
| `quick-start-health-tech.md` | Health Tech Professional | FHIR Lab, AI Governance Lab, Digital Health Lab, Developer Hub |
| `quick-start-compliance.md` | Medicaid / Compliance Officer | Vermont Medicaid, Eligibility Simulator, Work Requirements Calculator, Act 167/68 |
| `quick-start-researcher.md` | Student / Researcher | Evidence Library, Six-Pillar Framework, Case Studies, Policy Simulator |
| `quick-start-investor-consultant.md` | Investor / Consultant | Investment Tracker, Market analysis, APM financials, Advisory Hub |

Each guide includes:
- Role context and what HTR offers this user
- Top 5 destinations with direct URLs
- 3 key workflows with step-by-step instructions
- Research Lab tool reference table
- Keyboard shortcuts and getting help

---

## Feature Guides

Located in: `training/feature-guides/`

| File | Feature | Contents |
|------|---------|----------|
| `ai-analyst-guide.md` | AI Analyst | Access modes, what to ask, role personalization, tips, voice mode, shortcuts |
| `research-lab-guide.md` | Research Lab | All 21 tools with descriptions, standalone tools, usage tips |
| `voice-guide.md` | Voice Interface | Browser support, activation, commands, TTS, troubleshooting |
| `academy-guide.md` | HTR Academy | All 8 sections, progress tracking, access levels |

---

## Video Scripts

Located in: `training/video-scripts/`

| File | Video | Duration | Priority |
|------|-------|----------|----------|
| `script-01-platform-overview.md` | Platform Overview | 3–4 min | High — general audience |
| `script-02-ai-analyst-deep-dive.md` | AI Analyst Deep Dive | 4–5 min | High — all subscribers |
| `script-03-research-lab-walkthrough.md` | Research Lab Walkthrough | 5–6 min | Medium — power users |
| `script-04-getting-started-first-5-minutes.md` | Getting Started (First 5 Min) | 2 min | **Highest** — onboarding email |

### Recording Recommendations

**For Loom (fastest):**
1. Open the script
2. Set up screen recording
3. Navigate the platform following the script prompts
4. Record once — Loom auto-trims silence

**For Synthesia / HeyGen (professional avatar):**
1. Copy the NARRATOR text from the script
2. Paste into Synthesia as the teleprompter
3. Select an avatar and voice
4. Upload any screen recordings as B-roll

**For ElevenLabs (audio-only / podcast format):**
1. Copy NARRATOR text
2. Paste into ElevenLabs text-to-speech
3. Select voice (recommend: "Rachel" or "Adam" for professional tone)
4. Export MP3 — embed in Academy webinar or email

---

## In-App Training (Code)

These are built directly into the platform frontend.

| Component / Page | Location | What It Does |
|-----------------|----------|-------------|
| `OnboardingModal.tsx` | `frontend/components/` | Existing — role and pillar selection on first visit |
| `PlatformTour.tsx` | `frontend/components/` | **New** — 6-step tooltip tour after onboarding is complete |
| `ClientOnlyShell.tsx` | `frontend/components/` | **Updated** — now mounts OnboardingModal + PlatformTour |
| `/academy/getting-started` | `frontend/app/academy/getting-started/page.tsx` | **New** — full Getting Started hub in the Academy |
| `/academy/getting-started/research-lab` | `frontend/app/academy/getting-started/research-lab/page.tsx` | **New** — per-tool guide for all 21 Research Lab tools |
| `LabPageShell.tsx` | `frontend/components/research/` | **Updated** — "How to use this lab" badge on every Research Lab page |
| `LabHelpBadge.tsx` | `frontend/components/` | **New** — reusable help badge for any tool |

---

## Recommended Training Path for New Users

### Self-Service (User-led)
1. Land on `/welcome` → set role (10 seconds)
2. OnboardingModal appears → complete 4-step onboarding (2 minutes)
3. PlatformTour triggers → 6-step tooltip tour (2 minutes)
4. AI Analyst guides first session
5. User finds `/academy/getting-started` and reads their role guide (10–15 minutes)
6. User watches the 2-minute "First 5 Minutes" video (if available)

### Instructor-Led (Team Training)
1. Share the role-specific quick-start guide with each team member
2. Run a 30-minute live demo using Script 01 (Platform Overview) as the outline
3. Assign the Research Lab walkthrough video for async viewing
4. Set a "first question" homework: each person asks the AI Analyst a real work question
5. Follow-up session: debrief on what people found, answer questions

### Admin-Managed Onboarding
1. Welcome email → embed Script 04 video ("First 5 Minutes")
2. Link to `/academy/getting-started` and the user's role-specific guide
3. Set up policy alerts for each new user's area of interest
4. Schedule first Office Hours session (`/connect/register-office-hours`)

---

## External Tool Recommendations

| Format | Tool | Use Case |
|--------|------|----------|
| Screen recording | Loom | Fastest — record using these scripts |
| Avatar video | Synthesia or HeyGen | Professional avatar + voiceover from scripts |
| Audio narration | ElevenLabs | High-quality TTS from script text |
| Interactive eLearning | Articulate Rise | SCORM modules from guide content |
| Knowledge base | GitBook or Notion | Host rendered versions of these guides |
| Subtitles | Descript | Auto-captions for accessibility |

---

## Updating These Materials

- **When platform features change:** Update the relevant feature guide and any affected role guides
- **When new tools are added to Research Lab:** Update `research-lab-guide.md`, the Research Lab getting-started page, and the affected role guides
- **When new roles are added:** Copy a role guide template and customize
- **Video re-recording trigger:** Script-to-UI mismatch (UI changed since recording) or major new feature

*All training materials are plain Markdown — convert to PDF, HTML, or SCORM as needed.*

---

*Last updated: May 2026 | Health Transformation Review*
