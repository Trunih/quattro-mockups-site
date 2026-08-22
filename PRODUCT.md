# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS (no build step), one self-contained file per mockup direction, deployed to Vercel as a static site. Established by existing repo convention (index.html + mockup-source/DirectionA–D.html); not re-asked.

## Users

- **Facility operators / risk managers at long-term care facilities**: evaluating whether to switch their GL/PL carrier; want to understand what makes Quattro's pricing and coverage different before talking to a broker.
- **Insurance brokers ("For brokers")**: placing coverage on behalf of LTC facility clients; need to quickly grasp the program's limits, appetite, and differentiation to pitch it.
- **Underwriters / agents (internal or partner)**: logging in via the "Agent login" / "Underwriter login" affordances in nav — this marketing site is also their entry point.

## Product Purpose

Quattro is a specialty managing general agency (MGA) underwriting professional liability and general liability insurance for long-term care facilities. It exists because standard LTC liability coverage is priced off stale, class-average data and caps the coverage that matters most (assault & battery, sexual abuse/molestation, wandering & elopement) at low sublimits. Success for this surface = a visitor understands the pricing problem, understands Quattro's two-signal underwriting approach, and either starts a conversation or self-identifies as a broker.

## Positioning

Quattro is AI-native: it underwrites using granular, facility-level data pulled from two real signal sources already inside the building — **clinical signal** (incident documentation, care planning, staffing, clinical outcomes from existing clinical systems, 90-day lookback) and **observed signal** (fall response times, supervision patterns, safety events from monitoring already installed, same 90-day window). This lets it remove the sublimits competitors impose on A&B, SAM, and W&E claims (full limits, no sublimit) rather than pricing off state/facility-type averages re-rated once a year.

## Operating Context

Sales motion is broker-mediated as well as direct. The site must work as a first-touch marketing/credibility surface, not a transactional or logged-in product surface. Real coverage figures (limits, deductibles, sublimit ranges) are established facts from the existing build and must be preserved exactly across new directions, not re-derived or rounded differently.

## Capabilities and Constraints

- Program: General liability ($1M each occurrence / $2M aggregate), Professional liability ($1M each claim / $3M aggregate), Assault & battery / Sexual abuse & molestation / Wandering & elopement (full limits, no sublimit), Defense costs (outside the limit of liability), Deductible options ($2,500–$25,000 per claim).
- Typical market sublimits being displaced: $25,000–$100,000 (often inclusive of defense costs).
- Company is **in formation**: not currently bound in any jurisdiction, subject to underwriting review and carrier/reinsurance capacity confirmation. This disclaimer is a legal fact and ships verbatim in the footer of every direction.
- No real customer logos, testimonials, case studies, or photography exist yet. Do not fabricate any.

## Brand Commitments

- Name: **Quattro** (wordmark styling is free per direction).
- Established nav taxonomy: Coverage · How we underwrite · For brokers · Contact, plus Agent login / Underwriter login.
- Established CTA pair: "Talk to our team" (primary) / "I'm a broker" (secondary).
- Four prior visual directions (Editorial Warmth, Clinical Precision, Institutional Trust, Signal) were reviewed and are being fully replaced, not iterated on — see critique in conversation history. New directions must not reuse their palettes, type choices, or structural patterns.

## Evidence on Hand

- `reference-content.html` (project root) is the canonical real-copy source: full hero, pricing-problem, how-we-underwrite, program, for-brokers/wholesale, what-we're-looking-for, and contact-form copy, plus the footer legal disclaimer. Its own visual design (colors, fonts, layout) is not authoritative for any direction, content only. All five directions as of round 2 use this content verbatim, and it should stay the source of truth for further rounds rather than re-deriving copy from an older direction file.
- Round 2 (this file's directions A/B/C/D plus new direction E) added, per direction in its own established visual language: an illustrative trust/social-proof section (explicitly labeled as design-partner feedback, not verified reviews), a 4-step "how it works" sequence, an FAQ grounded only in already-established facts, and an illustrative underwriter-portal preview (explicitly labeled in development). None of these invent commercial claims; where content doesn't exist in `reference-content.html`, it's clearly marked illustrative/synthetic.
- Five user-curated aesthetic references at `~/design-references/` (site1–site5) with taste notes; treated as binding aesthetic input for round 1 (see design work for how each was used).
- No photography, logos, or real data visuals on hand. Any charts/graphics are original authored illustration, not real data, and read as illustrative rather than as fabricated evidence.

## Direction 5: Ledger OS (shadcn/ui)

Added in round 2. Deliberately-themed shadcn/ui build: graphite/slate neutrals with a single gold/amber accent, real `hsl(var(--x))` token convention (`--primary`, `--card`, `--border`, `--muted`, etc.), Cabinet Grotesk (display) + Manrope (body), authentic shadcn component shapes (bordered cards, badges, accordion). Not default shadcn zinc theme; the palette and type pairing are its own decisions layered on the component base.

## Product Principles

1. Facility-level specificity over category-average pricing is the whole pitch — every section should make Quattro's data-grounded difference legible, not just assert it.
2. The product is for a serious, regulated, high-stakes buyer (facility risk managers, brokers) — expressive design is welcome but must read as credible to that audience, not as a consumer app.
3. Numbers are the proof. Real coverage figures should carry visual weight and clarity, not be decorative.
4. Avoid category-default "AI product" visual clichés; each direction must feel authored specifically for an underwriting/risk product, not swappable with a generic SaaS or fintech landing page.

## Accessibility & Inclusion

No project-specific standard established beyond WCAG AA contrast, which all directions must meet (this is enforced as part of general craft quality, not a unique product requirement).
