# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS (no build step), single self-contained page, deployed to Vercel as a static site. `index.html` embeds `mockup-source/DirectionC.html` (Bloom) via a full-viewport iframe; Bloom is the sole source of truth for page content and markup. This is the starting point for further build-out (portals, quote wizard, etc.), not a mockup gallery.

## Users

- **Facility operators / risk managers at long-term care facilities**: evaluating whether to switch their GL/PL carrier; want to understand what makes Quattro's pricing and coverage different before talking to a broker.
- **Insurance brokers ("For brokers")**: placing coverage on behalf of LTC facility clients; need to quickly grasp the program's limits, appetite, and differentiation to pitch it.
- **Underwriters / agents (internal or partner)**: not served by this public marketing surface directly; nav points to Contact rather than a login, since login flows are a future build-out, not part of this page.

## Product Purpose

Quattro is a specialty managing general agency (MGA) underwriting professional liability and general liability insurance for long-term care facilities. It exists because standard LTC liability coverage is priced off stale, class-average data and caps the coverage that matters most (assault & battery, sexual abuse/molestation, wandering & elopement) at low sublimits. Success for this surface = a visitor understands the pricing problem, understands that Quattro underwrites on the building's own operating data instead of a class average, and either starts a conversation or self-identifies as a broker.

## Positioning

**As of the 2026-08-24 client-approved copy pass (see `quattro-copy-edits.md` at project root), positioning language is deliberately kept high-level and does NOT disclose methodology.** Quattro underwrites each building on its own operating data, not a class average, reading two signals already inside the building: a **documentation signal** (what the team already records day to day) and an **activity signal** (what actually happens in the building day to day), both over a 90-day review window. This is stated generically and does not name specific systems, data types, sources, thresholds, benchmarks, or an alert taxonomy. This lets Quattro remove the sublimits competitors impose on A&B, SAM, and W&E claims (full limits, no sublimit) rather than pricing off state/facility-type averages re-rated once a year.

`quattro-copy-edits.md` is the authoritative override for the sections it covers (hero, the two-signal section, ongoing-monitoring section, broker "what we're looking for" section, and a sitewide banned-terms list) and takes precedence over `reference-content.html` wherever the two conflict. See its "sitewide find-and-replace" and "what to keep sitewide" lists before adding any new copy that touches methodology, data sources, or scoring.

## Operating Context

Sales motion is broker-mediated as well as direct. The site must work as a first-touch marketing/credibility surface, not a transactional or logged-in product surface. Real coverage figures (limits, deductibles, sublimit ranges) are established facts from the existing build and must be preserved exactly, not re-derived or rounded differently.

## Capabilities and Constraints

- Program: General liability ($1M each occurrence / $2M aggregate), Professional liability ($1M each claim / $3M aggregate), Assault & battery / Sexual abuse & molestation / Wandering & elopement (full limits, no sublimit), Defense costs (outside the limit of liability), Deductible options ($2,500–$25,000 per claim).
- Typical market sublimits being displaced: $25,000–$100,000 (often inclusive of defense costs).
- Company is **in formation**: not currently bound in any jurisdiction, subject to underwriting review and carrier/reinsurance capacity confirmation. This disclaimer is a legal fact and ships verbatim in the footer.
- No real customer logos, testimonials, case studies, or photography exist yet. Do not fabricate any.
- **Legal/competitive-protection constraint (2026-08-24):** never disclose what data Quattro uses (no EHR, clinical records, video, camera, or surveillance references in any form) or how Quattro scores/weights risk (no thresholds, no benchmarks, no alert taxonomy, no numeric scoring scale). See `quattro-copy-edits.md`'s sitewide banned-terms list before writing any new copy in this area.

## Brand Commitments

- Name: **Quattro**.
- Established nav taxonomy: Coverage · How we underwrite · For brokers · Contact.
- Established CTA pair: "Talk to our team" (primary) / "I'm a broker" (secondary); nav CTA is "Get in touch" linking to `#contact`.

## Evidence on Hand

- `reference-content.html` (project root) is the canonical real-copy source for anything `quattro-copy-edits.md` doesn't override: full hero, pricing-problem, how-we-underwrite, program, for-brokers/wholesale, what-we're-looking-for, and contact-form copy, plus the footer legal disclaimer. Its own visual design (colors, fonts, layout) is not authoritative, content only.
- `quattro-copy-edits.md` (project root) is the authoritative override for the specific sections it names (see Positioning above) and for the sitewide banned-terms sweep. Treat it as taking priority over `reference-content.html` for those sections, not just a suggestion.
- The page includes an illustrative trust/social-proof section (explicitly labeled as design-partner feedback, not verified reviews), a 4-step "how it works" sequence, an FAQ grounded only in already-established facts, and an illustrative underwriter-portal preview (explicitly labeled in development, genericized per the copy-edits pass so it doesn't reveal a specific detection metric). None of these invent commercial claims; where content doesn't exist in `reference-content.html`, it's clearly marked illustrative/synthetic.
- No photography, logos, or real data visuals on hand. Any charts/graphics are original authored illustration, not real data, and read as illustrative rather than as fabricated evidence.

## Direction: Bloom

The chosen and only direction going forward. True-black ground, ambient violet bloom (soft radial glow), teal secondary accent, a spectrum hairline motif, pill CTAs and rounded glass cards throughout. Fully responsive, scroll-reveal/hover animation respecting `prefers-reduced-motion`, working smooth-scroll nav, sticky "Talk to our team" bar, and a Contact section (visual mockup form plus direct contact info) built at the same visual quality bar as the rest of the page.

## Product Principles

1. Facility-level specificity over category-average pricing is the pitch — every section should make Quattro's data-grounded difference legible without disclosing the mechanism behind it.
2. The product is for a serious, regulated, high-stakes buyer (facility risk managers, brokers) — expressive design is welcome but must read as credible to that audience, not as a consumer app.
3. Numbers are the proof, but only the numbers that are safe to disclose (coverage limits, deductibles, the 90-day review window). Methodology-revealing numbers (thresholds, benchmarks, scores) do not appear on the public site.
4. Avoid category-default "AI product" visual clichés; the direction must feel authored specifically for an underwriting/risk product, not swappable with a generic SaaS or fintech landing page.

## Accessibility & Inclusion

No project-specific standard established beyond WCAG AA contrast, enforced as part of general craft quality.
