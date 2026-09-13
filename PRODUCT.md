# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), deployed to Vercel. Static marketing pages plus two authenticated dashboards backed by Supabase (Postgres + Auth). `app/api/contact/route.ts` sends real email via Nodemailer/Gmail SMTP. `app/login`, `app/client`, and `app/capacity-provider` are real, server-side-guarded routes — access control is enforced in Server Components and Postgres Row Level Security, not by hiding UI.

## Users

- **Facility operators / risk managers at long-term care facilities**: the public marketing site's primary audience, and (once signed in as `client` role) the audience for the Client dashboard.
- **Insurance brokers ("For brokers")**: placing coverage on behalf of LTC facility clients; served by the marketing site only.
- **Reinsurance / fronting capacity partners**: the audience for the Capacity Provider dashboard (`capacity_provider` role) — portfolio-level oversight, not single-facility detail.

## Product Purpose

Quattro is a specialty managing general agency (MGA) underwriting professional liability and general liability insurance for long-term care facilities. It exists because standard LTC liability coverage is priced off stale, class-average data and caps the coverage that matters most (assault & battery, sexual abuse/molestation, wandering & elopement) at low sublimits. The marketing site's job: a visitor understands the pricing problem and Quattro's building-level underwriting, then either starts a conversation or self-identifies as a broker. The dashboards' job: an authenticated client sees their own facilities' risk and safety signal and can act on it; an authenticated capacity partner sees portfolio-level underwriting, premium, loss, and concentration data.

## Positioning

**As of the 2026-08-24 client-approved copy pass (see `quattro-copy-edits.md` at project root), positioning language is deliberately kept high-level and does NOT disclose methodology.** Quattro underwrites each building on its own operating data, not a class average, reading two signals already inside the building: a **documentation signal** (what the team already records day to day) and an **activity signal** (what actually happens in the building day to day), both over a 90-day review window. This is stated generically and does not name specific systems, data types, sources, thresholds, benchmarks, or an alert taxonomy.

**This rule now applies inside the authenticated dashboards too, not just the public marketing site** (confirmed 2026-08-25, when integrating two dashboard prototypes that had drifted back to disclosing methodology). `lib/dashboard/client-content.ts` and `lib/dashboard/capacity-provider-content.ts` document the exact scrub applied: "AI video surveillance" / "AI clinical data analyzer" → "Activity signal" / "Documentation signal"; "silent fall detected" dropped entirely (not reworded — this phrase is explicitly banned "in any form"); "chemical restraint (antipsychotic) flag" and every antipsychotic-rate/CMS-benchmark percentage removed, not softened; "camera or monitoring coverage gap" genericized. Kept as safe: "State survey feed" (a real public regulatory category) and F-tag citation codes (real, public CMS codes) — neither discloses anything proprietary to Quattro. The Client dashboard's industry-news section is the one deliberate exception: those items cite real third-party sources describing the industry generally, not Quattro's own methodology, and ship verbatim as static content per explicit instruction.

## Operating Context

Marketing pages are public and unauthenticated. `/client` and `/capacity-provider` require a Supabase session with the matching `profiles.role`; `requireRole()` (`lib/dashboard/guard.ts`) runs server-side in a Server Component and redirects to `/login` otherwise — this can't be bypassed by disabling JS or racing a client-side check. A client user's visible facility set is enforced by Postgres RLS via the `user_facilities` join table (`supabase/schema.sql`), not just client-side filtering: the query itself cannot return another user's facilities. All dashboard data is simulated/illustrative except: real facility records (4 rows, seeded), and routing-preferences the user explicitly saves (persisted for real). Real coverage figures on the marketing site (limits, deductibles, sublimit ranges) must be preserved exactly, not re-derived or rounded differently.

## Capabilities and Constraints

- Program: General liability ($1M each occurrence / $2M aggregate), Professional liability ($1M each claim / $3M aggregate), Assault & battery / Sexual abuse & molestation / Wandering & elopement (full limits, no sublimit), Defense costs (outside the limit of liability), Deductible options ($2,500–$25,000 per claim).
- Typical market sublimits being displaced: $25,000–$100,000 (often inclusive of defense costs).
- Company is **in formation**: not currently bound in any jurisdiction, subject to underwriting review and carrier/reinsurance capacity confirmation. This disclaimer is a legal fact and ships verbatim in the marketing footer.
- No real customer logos, testimonials, case studies, or photography exist yet. Do not fabricate any.
- **Legal/competitive-protection constraint (2026-08-24, extended 2026-08-25):** never disclose what data Quattro uses (no EHR, clinical records, video, camera, or surveillance references in any form, "silent fall" in any form) or how Quattro scores/weights risk (no thresholds, no benchmarks, no alert taxonomy, no numeric scoring scale) — anywhere on the site, marketing or authenticated dashboards alike.
- Dashboard data (facility names, alerts, premiums, claims, policy numbers) is procedurally generated from a fixed seed and clearly invented for the prototype — never connect it to a real data source without the user's explicit direction.

## Brand Commitments

- Name: **Quattro**.
- Established nav taxonomy: Coverage · How we underwrite · For brokers · Contact, plus a single "Platform login" link (not a dropdown) leading to a Client / Capacity Provider choice on `/login`.
- Established CTA pair: "Talk to our team" (primary) / "I'm a broker" (secondary); nav CTA is "Get in touch" linking to `#contact`.

## Evidence on Hand

- `reference-content.html` (project root) is the canonical real-copy source for anything `quattro-copy-edits.md` doesn't override. Its own visual design is not authoritative, content only.
- `quattro-copy-edits.md` (project root) is the authoritative override for the specific sections it names and for the sitewide banned-terms sweep, now applied to the dashboards too.
- `Claude outputs/quattro-operator-dashboard.html` and `quattro-capacity-provider-dashboard.html` (gitignored, not committed) are the reference implementations the Client and Capacity Provider dashboards were built from: same layout, section structure, and chart logic, restyled into the sage/olive identity and content-scrubbed per the rule above.
- `supabase/schema.sql` is the authoritative schema: `facilities`, `profiles` (role per user), `user_facilities` (the access-control join table), `routing_preferences`. Idempotent, safe to re-run.

## Direction: sage / olive (2026-08-25 — supersedes Bloom)

A full ground-up redesign, replacing the prior dark violet/teal "Bloom" identity site-wide, marketing pages and dashboards alike. Warm paper ground (`--paper #F7F3E9`), deep olive as the primary voice, sage as the resolving accent, clay used sparingly as a single warm highlight (a blob tint, the lens's accent arc, one pricing-gap figure — never a primary button or heading color). Piazzolla (headings), IBM Plex Sans (body), IBM Plex Mono (eyebrow/mono labels). Full pill buttons (100px radius), 20px cards, major content sections raised as 28px card-colored panels with a soft shadow rather than a flush hard-lined grid. The signal-lens graphic carries over recolored; the dashboards inherit the same tokens, type, and shape language at higher density (dense tables, metric grids, status pills) rather than introducing a second visual system.

## Product Principles

1. Facility-level specificity over category-average pricing is the pitch — every surface should make Quattro's data-grounded difference legible without disclosing the mechanism behind it, authenticated dashboards included.
2. The product is for a serious, regulated, high-stakes buyer (facility risk managers, brokers, capacity partners) — expressive design is welcome but must read as credible to that audience, not as a consumer app.
3. Numbers are the proof, but only the numbers that are safe to disclose (coverage limits, deductibles, the 90-day review window, portfolio financials). Methodology-revealing numbers (thresholds, benchmarks, scores) do not appear anywhere, public or authenticated.
4. Access control is real, not cosmetic: every dashboard data query is scoped by the signed-in user's actual database permissions, verified server-side, never left to a client-side check alone.

## Accessibility & Inclusion

WCAG AA contrast is enforced as part of general craft quality — the 2026-08-25 redesign's first detector pass caught several real text-on-paper contrast failures (not false positives) from swatch-accurate accent colors being too light for body text; dedicated darker `--sage-ink` / `--olive-ink` / `--clay-deep` tokens exist specifically for text, keeping the lighter swatch values for borders, dots, and decorative use only.
