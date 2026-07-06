# Entity & Structure Plan — One-Pager for Attorney / CPA

**Prepared:** 2026-06-29
**Founder:** Bechir Bensaid (sole founder, California)
**Status:** General planning document. NOT legal or tax advice. Items marked **[CONFIRM]** are for the attorney/CPA to validate before acting.

---

## 1. The Decision (in one line)

> **Form a single-member California LLC now. Keep all IP inside it. Add a separate 501(c)(3) nonprofit later — only if/when a grant or donor that requires tax-deductibility actually shows up. Revisit S-Corp tax election later, only once net profit clears ~$50K/yr.**

---

## 2. What I'm Building

A health-policy platform (codebase + book + Academy/courses) focused on healthcare transformation, with Vermont as the initial focus.

- **Product:** Next.js/React web platform, AI backend, online Academy/courses, a published book.
- **Free, for branding:** the book, open-source code, free educational content.
- **Paid (earned revenue):** consulting, Academy/courses, training.
- **Also expected:** sponsorships / supporter contributions (non-deductible), and — later — grants and tax-deductible donations.

---

## 3. Why This Structure

Two facts drive everything:

1. **No single entity can both (a) be owned by me AND (b) accept tax-deductible donations.** For-profits (LLC, Benefit Corp) = ownership, no deductible donations. Nonprofit (501(c)(3)) = deductible donations, but I don't own it (board-controlled, assets locked to mission).
2. **I want both ownership and (eventually) deductible donations + grants.** The only way to get both is **two entities.**

But I don't need the second entity yet — so I'm **not paying its overhead until there's a reason.**

### Chosen path: Phased hybrid

| Phase | Entity | Purpose | When |
|---|---|---|---|
| **1 (now)** | **Single-member CA LLC** (owned 100% by me) | Holds all IP. Earns consulting/Academy/training revenue. Takes sponsorships/contributions (non-deductible). | Immediately |
| **2 (later)** | **501(c)(3) nonprofit** (separate entity, own board) | Runs the charitable/free-education work. Receives **grants + tax-deductible donations**. Uses the LLC's IP under license. | Only when a real grant/donor requiring deductibility appears |

### Entity diagram (target end-state)

```
        ┌─────────────────────────────┐
        │  Bechir Bensaid (owner)     │
        └──────────────┬──────────────┘
                       │ owns 100%
                       ▼
        ┌─────────────────────────────┐         licenses IP / contracts
        │   CA LLC  (for-profit)      │◀────────  (arm's-length, documented)
        │  - OWNS all IP              │────────▶ ┌──────────────────────────┐
        │  - book, code, brand        │         │  501(c)(3) Nonprofit     │
        │  - consulting/Academy rev   │         │  (separate, board-run)   │
        │  - sponsorships             │         │  - grants                │
        └─────────────────────────────┘         │  - deductible donations  │
                                                 │  - free education work   │
                                                 └──────────────────────────┘
                                                       (Phase 2 — later)
```

---

## 4. Options Considered & Rejected (so the lawyer knows I've thought about it)

- **Pure nonprofit (501(c)(3) only):** ❌ I'd give up ownership; can't sell/control; IP would be locked to the mission. Also can't take deductible donations until IRS approval (months) — would block service revenue I can start now.
- **Benefit Corp (single entity):** ❌ Adds a legal mission clause but gives me nothing an LLC doesn't, since I have no investors/board. Still can't take deductible donations. Pure overhead for my situation. (Could convert later if mission-branding ever matters.)
- **S-Corp election now:** ❌ Tax election, not a structure. Only pays off above ~$50K net profit and adds payroll + separate return + CA's 1.5% S-corp tax. Revisit later.

---

## 5. Tax Treatment

- **Now:** Single-member LLC = "disregarded entity" by default. Profit flows to my personal 1040. No separate business return. Simplest.
- **Later:** Once net profit is reliably **~$50K+/yr**, have CPA run the S-Corp math (reasonable-salary split to save ~15.3% self-employment tax on distributions, net of added payroll/CPA cost + CA's 1.5% + $800 min). Flip the election then if it nets out positive. **No downside to waiting.**

---

## 6. Action Items — This Phase (no attorney strictly required, but recommended)

1. **Name clearance** — confirm the brand name ("HTR" / platform name) is:
   - not trademarked by someone else, and
   - does **not** imply endorsement/affiliation with the State of Vermont, Vermont Blueprint, Medicaid, SASH, or any government program. **[CONFIRM]**
2. **Form the CA LLC** — CA Secretary of State (Articles of Organization, ~$70 filing). Budget the **$800/yr CA franchise tax**.
3. **EIN** — free from the IRS.
4. **Operating Agreement** — even single-member; documents ownership of the IP. **[CONFIRM with attorney]**
5. **Assign IP into the LLC** — formally transfer/confirm ownership of code, book, brand, Academy content to the LLC. **[CONFIRM]**
6. **Bill from the LLC** — Stripe is already wired in the platform; route service revenue through the LLC.
7. **Terms / Privacy / disclaimers** — attorney-review existing `/terms` and `/privacy`; add a "not medical/legal advice" health-content disclaimer. **[CONFIRM]**

## 7. Action Items — Later Phase (defer until a real grant/donor)

8. Form 501(c)(3) nonprofit (separate entity, independent-ish board, IRS Form 1023, CA AG registration, annual 990s).
9. Draft **IP license / services agreement** between LLC and nonprofit — **arm's-length, fair-market, fully documented.** This is the #1 IRS scrutiny point for for-profit/nonprofit pairs (guarding against "private benefit" to me). **[CONFIRM — attorney essential here]**

---

## 8. Open Questions for Attorney / CPA

- [ ] Single-member LLC vs. any reason to add a co-founder/member now?
- [ ] Is the brand name trademark-clear and free of government-affiliation risk?
- [ ] Any PHI/HIPAA exposure given Supabase user accounts? (Likely no — policy content, not patient data — but confirm.) Any GDPR exposure (EU users)?
- [ ] Right structure & timing for the future LLC↔nonprofit relationship (license vs. service contract vs. fiscal sponsorship as an interim)?
- [ ] Is a fiscal sponsor a better *interim* way to accept deductible donations than standing up a full nonprofit?
- [ ] Content-rights audit: is all book/Academy content original or cleared (data, images, quotes)?
- [ ] S-Corp election: at what profit level does it pencil out for me specifically in CA?

---

*This document describes a plan to discuss with licensed professionals. Do not treat it as legal or tax advice. Confirm all **[CONFIRM]** items before acting.*

---

## 9. LLC Formation Checklist — California (2026)

> As of 2025+, California requires the core filings (LLC-1, LLC-12) to be filed **online via bizfile** — no mail option. Companion worksheets/documents are in the `formation/` folder of this repo.

### Order of operations

| # | Step | Where | Fee | Notes |
|---|------|-------|-----|-------|
| 0 | Clear the name | [bizfile name search](https://bizfileonline.sos.ca.gov/search/business) + [USPTO trademark search](https://www.uspto.gov/trademarks/search) | — | Must be unique, end in "LLC". No govt-affiliation implication. **[CONFIRM]** |
| 1 | File **Articles of Organization (LLC-1)** | [bizfile online](https://bizfileonline.sos.ca.gov/) | **$70** | Creates the LLC. Member-managed. → worksheet `formation/LLC-1_worksheet.md` |
| 2 | Designate **Registered Agent** | inside LLC-1 | $0 self / ~$100–150 commercial | Self = home address public. |
| 3 | Get **EIN** | [IRS EIN online](https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online) | **$0** | IRS site only. → worksheet `formation/SS-4_EIN_worksheet.md` |
| 4 | File **Statement of Information (LLC-12)** | [bizfile online](https://bizfileonline.sos.ca.gov/) | **$20** | **Due within 90 days** of formation or $250 penalty. Then every 2 yrs. → `formation/LLC-12_worksheet.md` |
| 5 | Sign **Operating Agreement** | keep with records (not filed) | $0 | CA requires one. Assigns IP to the LLC. → `formation/Operating_Agreement.md` |
| 6 | Pay **$800 Franchise Tax (FTB 3522)** + file **Form 568** | [FTB 3522](https://www.ftb.ca.gov/forms/misc/3522.html) / [FTB LLC](https://www.ftb.ca.gov/file/business/types/limited-liability-company/index.html) | **$800/yr** | **No first-year exemption anymore** — owed from year 1. Due ~Apr 15. |
| 7 | Open business bank account + point Stripe at LLC | your bank / Stripe dashboard | varies | Never commingle personal & business funds. |

### Cost summary

| Item | Cost | Frequency |
|---|---|---|
| Articles of Organization (LLC-1) | $70 | once |
| EIN | $0 | once |
| Statement of Information (LLC-12) | $20 | every 2 years |
| Registered agent (if commercial) | ~$100–150 | yearly (optional) |
| **CA Franchise Tax (FTB 3522)** | **$800** | **yearly, from year 1** |

**To launch: ~$90.** Recurring: **$800/yr** franchise tax (non-negotiable in CA).

*All worksheets below use placeholder/dummy data marked `<<LIKE THIS>>`. Replace before filing. Confirm all **[CONFIRM]** items with the attorney/CPA.*
