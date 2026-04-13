# Platform Amendment — Version 4.12.0
# Vermont Health Platform (HTR)

**Type:** Amendment to Platform Documentation (supplements v4.11.0 and all prior amendments)
**Version:** 4.12.0
**Date:** April 11, 2026
**Classification:** Internal
**Scope:** MVP Launch Preparation — Part II. This amendment documents five targeted changes made in preparation for controlled early-tester access: watermark visibility increase, faculty name anonymization (runtime), competitor name redaction, beta access gate redesign (light theme), and a new developer utility for resetting the gate cookie. It also documents a footer layout fix for the six-pillar navigation grid.

---

## Table of Contents

1. [Why This Release Exists](#1-why-this-release-exists)
2. [Change Summary](#2-change-summary)
3. [Change 1 — Watermark Visibility Increase](#3-change-1--watermark-visibility-increase)
4. [Change 2 — Faculty Name Anonymization (Runtime)](#4-change-2--faculty-name-anonymization-runtime)
5. [Change 3 — Competitor Name Redaction](#5-change-3--competitor-name-redaction)
6. [Change 4 — Beta Gate Redesign: Light Theme](#6-change-4--beta-gate-redesign-light-theme)
7. [Change 5 — Beta Cookie Reset Utility](#7-change-5--beta-cookie-reset-utility)
8. [Change 6 — Footer Pillar Grid Fix](#8-change-6--footer-pillar-grid-fix)
9. [Files Changed: Complete Reference](#9-files-changed-complete-reference)
10. [Testing Checklist](#10-testing-checklist)
11. [What Was NOT Changed](#11-what-was-not-changed)

---

## 1. Why This Release Exists

Amendment v4.11.0 completed the core MVP launch checklist: watermark overlay, removal of the "Our Journey" section from the mission page, analyst name anonymization in `about/page.tsx`, and the full beta access gate system (middleware, cookie, verify API, admin CRUD, SQL migration).

During the first visual review session with the beta gate live, five problems were identified:

| Problem | Impact |
|---|---|
| Watermark text at 13px was nearly invisible | Testers couldn't see the "MVP · FOR TESTING ONLY" signal |
| Faculty page still displayed real names from Sanity CMS | Prior anonymization only covered hardcoded names in `about/page.tsx`; CMS-driven faculty were missed |
| Competitor names still appeared verbatim in advisory copy | "McKinsey, Deloitte, and Oliver Wyman" visible in two places on the advisory page |
| Beta gate had a near-black background | Visual feedback: the dark theme looked unpolished and uninviting for testers |
| No way to revisit the beta gate without clearing all browser cookies | Blocked the ability to test the gate flow repeatedly |

Additionally, the footer's six Intelligence Pillars were rendering across only five columns (`lg:grid-cols-5`), causing the sixth pillar (Operations) to always wrap to a second row.

All six issues are addressed in this amendment.

---

## 2. Change Summary

| # | File | Change |
|---|---|---|
| 1 | `components/MvpWatermark.tsx` | Font size 13px → 52px; rows 12 → 6; columns 4 → 2 |
| 2 | `app/academy/faculty/page.tsx` | Names replaced at render time with Faculty #N; initials replaced with F{N} |
| 3 | `app/advisory/page.tsx` | Two instances of McKinsey/Deloitte/Oliver Wyman → Competitor #1/2/3 |
| 4 | `app/subscribe/page.tsx` | McKinsey & Co logo placeholder → Competitor #1 |
| 5 | `app/beta/page.tsx` | Background bg-slate-950 → bg-gray-50; red warning box; light form card |
| 6 | `app/api/beta/clear/route.ts` | New GET route — clears htr_beta cookie, redirects to /beta |
| 7 | `components/Footer.tsx` | Pillar grid lg:grid-cols-5 gap-6 → lg:grid-cols-6 gap-4 |

---

## 3. Change 1 — Watermark Visibility Increase

### File
`frontend/components/MvpWatermark.tsx`

### Problem

The original watermark rendered "MVP · FOR TESTING ONLY" at `fontSize: "13px"`. At that size, the text is barely perceptible — a light rose-colored whisper across the page. Early testers reported not noticing it at all, defeating its purpose of communicating pre-commercial status.

### What Changed

| Property | Before | After | Rationale |
|---|---|---|---|
| `fontSize` | `13px` | `52px` | 4× increase — clearly readable without being distracting |
| `rows` (array length) | 12 | 6 | Fewer rows needed because each row is now much taller |
| Columns per row | 4 | 2 | Wider text means fewer repetitions needed to span the row |
| `color` opacity | `0.10` (10%) | `0.12` (12%) | Slight increase to compensate for the fact that larger text at the same opacity reads slightly lighter perceptually |
| `padding` per span | `0 60px` | `0 80px` | More breathing room between the two wide-text spans |

### How the Watermark Works (Educational)

The watermark uses a CSS technique to cover the entire viewport regardless of scroll position or content height:

```
fixed inset-0        → positions the outer div to cover the full screen, stays on scroll
z-[9998]             → sits above all page content but below the beta gate (z-[9999])
pointer-events-none  → clicks/taps pass through; the watermark is visually-only
overflow-hidden      → clips any overflow from the rotated inner div

Inner div:
  position: absolute; inset: "-50%"  → extends 50% beyond the viewport in all directions
  transform: rotate(-35deg)          → diagonal angle
  justifyContent: space-around       → rows are evenly distributed vertically

Each row:
  display: flex; justifyContent: space-around  → spans are spread across the full width
  whiteSpace: nowrap                           → text never wraps mid-word
```

The `inset: "-50%"` trick is critical. When you rotate a rectangle by 35°, its corners swing outside the original bounding box. Without the negative inset, you'd see uncovered corners at the edges of the screen. By making the inner container 200% × 200% of the viewport and centering it, the rotated content still covers the full screen.

### Code After Change

```tsx
export default function MvpWatermark() {
  const text = "MVP · FOR TESTING ONLY";
  const rows = Array.from({ length: 6 });

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <div style={{
        position: "absolute", inset: "-50%", display: "flex",
        flexDirection: "column", justifyContent: "space-around",
        transform: "rotate(-35deg)", transformOrigin: "center center",
      }}>
        {rows.map((_, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-around", whiteSpace: "nowrap" }}>
            {[0, 1].map((j) => (
              <span key={j} style={{
                fontSize: "52px", fontWeight: 800, letterSpacing: "0.12em",
                color: "rgba(239, 68, 68, 0.12)", textTransform: "uppercase",
                padding: "0 80px", userSelect: "none",
              }}>
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### When to Remove

Remove `<MvpWatermark />` from `app/layout.tsx` when the platform exits the MVP/testing phase and opens to the public. This is the only change needed — the component itself can stay in the codebase.

---

## 4. Change 2 — Faculty Name Anonymization (Runtime)

### File
`frontend/app/academy/faculty/page.tsx`

### Problem

Amendment v4.11.0 anonymized names in `app/about/page.tsx`, where analyst names were hardcoded in the source file. The faculty page (`/academy/faculty`) was missed because it is **CMS-driven**: names, bios, roles, tags, and profile images all come from Sanity CMS via a GROQ query:

```groq
*[_type == "instructor"] | order(name asc) {
  _id, name, role, bio, tags, "imageUrl": image.asset->url
}
```

Since the names live in the Sanity database — not in the source code — simply editing the `.tsx` file could not fix them. There are two possible approaches:

**Option A — Edit the data in Sanity Studio**
Change each instructor's name field to "Faculty #1", "Faculty #2", etc. directly in the CMS. Persistent fix, but requires manual CMS editing and would require re-editing when the platform goes public.

**Option B — Override at render time in the component**
Keep the Sanity data unchanged. In the React component, ignore `person.name` and substitute an anonymous label based on the array index. No CMS editing required. Easy to remove: just switch back to rendering `{person.name}`.

**Option B was chosen** because it is reversible with a one-line code change and does not pollute the CMS with placeholder data.

### What Changed

**Before:**
```tsx
{(faculty as Person[]).map((person) => (
  <div key={person._id} ...>
    <div className="w-32 h-32 rounded-full bg-indigo-600 ...">
      {person.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
    </div>
    <h3 ...>{person.name}</h3>
```

**After:**
```tsx
{(faculty as Person[]).map((person, idx) => {
  const anonName = `Faculty #${idx + 1}`;
  return (
    <div key={person._id} ...>
      <div className="w-32 h-32 rounded-full bg-indigo-600 ...">
        F{idx + 1}
      </div>
      <h3 ...>{anonName}</h3>
```

Key points:
- The `map` callback now receives `idx` (the zero-based position).
- `anonName` is constructed as `Faculty #${idx + 1}` (one-indexed for human readability).
- The avatar circle no longer derives initials from `person.name`; instead it shows `F1`, `F2`, etc.
- Profile **images are also suppressed** — if an instructor had a photo in Sanity, it previously rendered via `<img src={person.imageUrl} />`. The new code always renders the letter avatar, preventing any real person's photo from appearing.
- `person.role`, `person.bio`, and `person.tags` are still rendered from CMS — only the name and photo are anonymized.

### Ordering Note

Sanity returns faculty ordered by `name asc` (alphabetical by CMS name). The index `idx` is therefore stable across page loads but is tied to alphabetical order of the real names. If instructors are added or removed from Sanity, the numbering will shift. This is acceptable for an MVP testing period. For a permanent anonymization scheme, consider storing a stable `display_order` field in Sanity.

### How to Revert

Remove the `idx` parameter and the `anonName` constant, restore `person.name` and the original initials logic, and re-add the `person.imageUrl` conditional render. The CMS data was never modified.

---

## 5. Change 3 — Competitor Name Redaction

### Files
- `frontend/app/advisory/page.tsx`
- `frontend/app/subscribe/page.tsx`

### Problem

Two pages contained references to real competitor firm names:

1. **`/advisory`** — Hero section copy: *"We compete with McKinsey, Deloitte, and Oliver Wyman on insight quality."*
2. **`/advisory`** — "Why HTR vs. The Big Firms" section: *"McKinsey, Deloitte, and Oliver Wyman offer brand recognition."*
3. **`/subscribe`** — A placeholder logo strip showed a tile labeled "McKinsey & Co" among other organizations.

During MVP testing with real guests, these references could create legal exposure (implied competitive disparagement) and strategic awkwardness before HTR is ready for public positioning.

### What Changed

| Location | Before | After |
|---|---|---|
| `advisory/page.tsx` line ~32 | "…McKinsey, Deloitte, and Oliver Wyman on insight quality…" | "…Competitor #1, Competitor #2, and Competitor #3 on insight quality…" |
| `advisory/page.tsx` line ~243 | "McKinsey, Deloitte, and Oliver Wyman offer brand recognition." | "Competitor #1, Competitor #2, and Competitor #3 offer brand recognition." |
| `subscribe/page.tsx` logo tile | `src="…?text=McKinsey+%26+Co"` / `alt="McKinsey & Co"` | `src="…?text=Competitor+%231"` / `alt="Competitor #1"` |

### What Was NOT Changed (and Why)

`app/vermont-act-167/page.tsx` and `app/vermont-act-167/simulator/page.tsx` contain dozens of references to "Oliver Wyman." These were deliberately left unchanged because:

- Oliver Wyman Group was the **actual consulting firm commissioned by the Green Mountain Care Board** under Vermont Act 167 to produce the 144-page hospital transformation report.
- The Act 167 page is a factual analysis document — removing the firm name would make the content misleading and historically inaccurate.
- Oliver Wyman in this context is not a competitor reference; it is a named party in public Vermont government proceedings.

Similarly, `policy/global/page.tsx` contains `"CATO/McKinsey: simplified billing…"` as a research citation footnote. This is a factual attribution, not a competitive positioning statement, and was left unchanged.

### When to Restore

Before public launch, restore the actual firm names in the advisory copy as part of the final marketing/legal review. The placeholder numbers make it easy to find these spots with a search for "Competitor #".

---

## 6. Change 4 — Beta Gate Redesign: Light Theme

### File
`frontend/app/beta/page.tsx`

### Problem

The original beta gate used `bg-slate-950` (near-black) as the full-screen background. Feedback from the first visual review: the dark background looked unpolished, unwelcoming, and inconsistent with the platform's predominantly light visual language. The amber warning box also blended into the dark background rather than commanding attention.

### Design Goals

- Match the overall platform's light/white aesthetic.
- Make the MVP warning unmistakably prominent — bright red, not muted amber.
- Keep the form clean and professional.

### What Changed

| Element | Before | After |
|---|---|---|
| Page background | `bg-slate-950` (near-black) | `bg-gray-50` (light gray) |
| Background texture | White grid lines at 3% opacity on dark | Removed (not needed on light bg) |
| Brand title color | `text-white` | `text-slate-900` |
| Subtitle color | `text-slate-400` | `text-slate-500` |
| Warning box background | `bg-amber-500/10` (dark amber wash) | `bg-red-50` (light red) |
| Warning box border | `border-amber-500/30` (faint) | `border-red-400 border-2` (solid, bold) |
| Warning icon | `text-amber-400` small | `text-red-600` slightly larger |
| Warning title color | `text-amber-300` | `text-red-700` |
| Warning title size | `text-sm` | `text-base` |
| Warning body color | `text-amber-200/80` | `text-red-800 font-medium` |
| Warning body size | `text-xs` | `text-sm` |
| Form card background | `bg-white/5` (translucent dark) | `bg-white border border-slate-200 shadow-sm` |
| Form title color | `text-white` | `text-slate-900` |
| Form subtitle color | `text-slate-400` | `text-slate-500` |
| Input background | `bg-white/10` (translucent) | `bg-white` |
| Input text color | `text-white` | `text-slate-900` |
| Input placeholder color | `text-slate-500` | `text-slate-400` |
| Input border (normal) | `border-white/20` | `border-slate-300` |
| Error message color | `text-rose-400 text-xs` | `text-red-600 text-sm font-bold` |
| Submit button disabled | `disabled:bg-indigo-900` | `disabled:bg-indigo-300` |
| Footer text | `text-slate-600` | `text-slate-500` |
| Footer link | `text-slate-400 hover:text-white` | `text-slate-600 hover:text-slate-900` |

### Architecture Note

The beta gate page uses `fixed inset-0 z-[9999]` to cover the entire viewport, including the application Header which is rendered by the root layout. This means the gate page is not a "normal" page — it overlays everything. The light background still completely hides the Header and any page content beneath it. The z-index layering is:

```
z-[9999]  → Beta gate page (covers everything)
z-[9998]  → MVP Watermark (visible once gate is passed)
z-[50]    → Application Header (approximate; sits beneath both)
page content → default stacking context
```

---

## 7. Change 5 — Beta Cookie Reset Utility

### File (New)
`frontend/app/api/beta/clear/route.ts`

### Problem

Once a user successfully enters an access code, the `htr_beta=granted` cookie is set with a 7-day TTL. During testing, developers and testers need to repeatedly view the gate page to verify its appearance and behavior. Without a reset mechanism, the only options were:

1. Open browser DevTools → Application → Cookies → manually delete `htr_beta`
2. Clear all browser cookies (too destructive, logs out of Supabase session)
3. Restart the dev server (does not help; cookies are browser-side)

None of these are fast or convenient.

### Solution

A new GET route at `/api/beta/clear` that:
1. Sets the `htr_beta` cookie with `maxAge: 0` (instructs the browser to delete it immediately)
2. Redirects the browser to `/beta` (the gate page)

### Complete Code

```typescript
import { NextResponse } from "next/server";

export function GET() {
  const res = NextResponse.redirect(
    new URL("/beta", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  );
  res.cookies.set("htr_beta", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,   // ← browser deletes the cookie immediately
    path: "/",
  });
  return res;
}
```

### How to Use

Navigate to:
```
http://localhost:3000/api/beta/clear
```

The browser will delete the `htr_beta` cookie and immediately redirect to the gate. You can bookmark this URL in your browser for rapid access during testing.

### Why `maxAge: 0` Works

When a server sets a `Set-Cookie` header with `Max-Age=0` (or a past `Expires` date), the browser interprets this as an instruction to delete the cookie immediately. The cookie must match on `name`, `path`, and `domain` — which is why the `path: "/"` is set here, matching the path used when the cookie was originally written in `/api/beta/verify/route.ts`.

### Security Consideration

This route has **no authentication check** — anyone who knows the URL can clear their own beta cookie. This is intentional and safe:

- Clearing the cookie only affects the person making the request (cookies are per-browser).
- It does not invalidate other users' sessions.
- It does not expose any data.
- An unauthenticated user who hits this URL simply sees the gate page again, which is the correct behavior.

For production (post-MVP launch), this route can be left in place (it becomes a no-op once the beta gate is removed from middleware) or deleted. It poses no security risk either way.

### Environment Variable Note

The redirect uses `process.env.NEXT_PUBLIC_SITE_URL` with a fallback to `http://localhost:3000`. Set `NEXT_PUBLIC_SITE_URL=https://htr.health` in your Vercel environment variables for correct behavior in production.

---

## 8. Change 6 — Footer Pillar Grid Fix

### File
`frontend/components/Footer.tsx`

### Problem

The Intelligence Pillars section of the footer rendered six pillars in a CSS grid defined as:

```css
grid-cols-2 md:grid-cols-3 lg:grid-cols-5
```

The `lg:grid-cols-5` breakpoint only allocates five columns. With six pillars (Policy, Economics, Technology, Clinical, Equity, Operations), the sixth pillar — **Operations** — always wrapped to a second row on desktop. This created an asymmetric, unfinished-looking layout.

### What Changed

```diff
- <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
+ <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
```

Two changes in a single line:
1. `lg:grid-cols-5` → `lg:grid-cols-6` — six equal columns for six pillars
2. `gap-6` → `gap-4` — slightly tighter column gaps so each pillar column has more horizontal space for its sub-link text

### How CSS Grid Works Here (Educational)

Tailwind's `grid-cols-N` utility maps to the CSS property `grid-template-columns: repeat(N, minmax(0, 1fr))`. The `1fr` unit means each column gets an equal share of the available width. With 6 columns at `gap-4` (16px gaps), on a typical 1280px wide container:

```
Available width ≈ 1280px container
Minus 5 gaps × 16px = 80px
Remaining ÷ 6 columns ≈ 200px per pillar column
```

200px is sufficient for the sub-link text (the longest item is "Digital Health & Telemedicine" at ~26 characters in the `text-xs` font size used).

### Responsive Behavior

| Breakpoint | Columns | Notes |
|---|---|---|
| `default` (< 768px) | 2 | Mobile: 3 pillars per row, 2 rows |
| `md` (≥ 768px) | 3 | Tablet: 2 pillars per row, 2+ rows |
| `lg` (≥ 1024px) | 6 | Desktop: all 6 pillars in one row ✓ |

---

## 9. Files Changed: Complete Reference

### Modified Files

| File | Lines Changed | Description |
|---|---|---|
| `frontend/components/MvpWatermark.tsx` | ~10 | Font size, row/column counts, padding |
| `frontend/app/academy/faculty/page.tsx` | ~8 | Runtime name anonymization |
| `frontend/app/advisory/page.tsx` | 2 | Competitor name redaction (two lines) |
| `frontend/app/subscribe/page.tsx` | 2 | McKinsey logo placeholder → Competitor #1 |
| `frontend/app/beta/page.tsx` | ~50 | Full visual redesign (light theme) |
| `frontend/components/Footer.tsx` | 1 | Grid columns 5→6, gap 6→4 |

### New Files

| File | Description |
|---|---|
| `frontend/app/api/beta/clear/route.ts` | GET endpoint to delete beta cookie and redirect to gate |

---

## 10. Testing Checklist

Use this checklist to verify all six changes after deployment.

### Watermark
- [ ] Visit any page (e.g., `/`) while logged in
- [ ] Confirm "MVP · FOR TESTING ONLY" is visible diagonally across the page at large font size
- [ ] Confirm it does not block clicking buttons, links, or form inputs
- [ ] Confirm it stays fixed during scroll (does not scroll with page content)

### Faculty Anonymization
- [ ] Visit `/academy/faculty`
- [ ] Confirm all instructor cards show "Faculty #1", "Faculty #2", etc. — no real names
- [ ] Confirm avatar circles show "F1", "F2", etc. — no real initials or photos
- [ ] Confirm role, bio, and tags still render from CMS

### Competitor Redaction
- [ ] Visit `/advisory`
- [ ] Ctrl+F / Cmd+F and search for "McKinsey" — should find zero results
- [ ] Confirm hero copy reads "…Competitor #1, Competitor #2, and Competitor #3 on insight quality…"
- [ ] Scroll to "Why HTR Advisory vs. The Big Firms" section — confirm competitor placeholder names
- [ ] Visit `/subscribe` and confirm the logo strip shows "Competitor #1" tile

### Beta Gate Appearance
- [ ] Visit `http://localhost:3000/api/beta/clear` to reset the cookie
- [ ] Confirm you are redirected to `/beta`
- [ ] Confirm the page background is light gray (not black)
- [ ] Confirm the MVP warning box has a red border, red title, and red body text
- [ ] Confirm the form card is white with a subtle shadow
- [ ] Enter an invalid code — confirm red error message appears in bold
- [ ] Enter a valid code (e.g., `Will_D_0.0.0`) — confirm redirect to intended page

### Beta Cookie Reset
- [ ] While logged into the platform, visit `http://localhost:3000/api/beta/clear`
- [ ] Confirm redirect to `/beta` gate page
- [ ] Confirm that navigating to any other page (e.g., `/`) also redirects to `/beta`
- [ ] Enter a valid code — confirm platform access restored

### Footer Pillar Grid
- [ ] Resize browser to desktop width (≥ 1024px)
- [ ] Scroll to the footer
- [ ] Confirm all six pillars (Policy, Economics, Technology, Clinical, Equity, Operations) appear in a single row
- [ ] Confirm no pillar wraps to a second row

---

## 11. What Was NOT Changed

### Oliver Wyman References in Vermont Act 167 Pages
`/vermont-act-167` and `/vermont-act-167/simulator` contain extensive references to "Oliver Wyman." These are factual references to the firm's government contract and published report. They were not modified.

### IBM, Google, and Other Tool Vendor Names
References to IBM AI Fairness 360, Google What-If Tool, and similar tools appear in `/equity/bias`. These are research tool citations, not competitive firm positioning, and were not modified.

### CATO/McKinsey Policy Citation
`/policy/global` contains `"CATO/McKinsey: simplified billing in single-payer could save $220B–$600B annually"` as a policy research attribution. This is a factual footnote, not a competitor comparison, and was not modified.

### Cleveland Clinic, Humana, Oracle Health Logos in Subscribe Page
These organizations appear in the "trusted by" logo strip on `/subscribe`. They are client/partner organizations, not competitor firms, and their placeholder labels were not modified.

### Sanity CMS Data
Faculty names in the Sanity database were not edited. The anonymization is entirely at render time in React. The CMS data remains intact for when real names need to be restored at public launch.

### Supabase Database
No database schema or data changes were made in this amendment. The `beta_access_codes` table and its three seed codes (`Will_D_0.0.0`, `Kristin_M_0.0.0`, `Bechir_B_0.0.0`) from amendment v4.11.0 remain unchanged.

---

*Amendment v4.12.0 — April 11, 2026 — Vermont Health Platform (HTR)*
*Supplements platform-amendment-v4.11.0.md and all prior documentation*
