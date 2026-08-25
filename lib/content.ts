/**
 * Canonical site copy.
 *
 * SOURCES, in priority order:
 *   1. quattro-copy-edits.md  (client-approved, 2026-08-24) — AUTHORITATIVE OVERRIDE
 *   2. reference-content.html (client's original reference) — everything else
 *
 * Nothing here may reintroduce the banned list from quattro-copy-edits.md:
 * clinical / care records / EHR / video / footage / camera / surveillance /
 * "monitoring systems already installed" / coded labels / threshold or benchmark
 * numbers / staff-presence heatmap / 0-100 risk score / "sources linked" and
 * "signals combined" counters.
 *
 * No figure in this file may be invented. Coverage numbers come from
 * reference-content.html and ship unchanged.
 */

export const CONTACT = {
  email: "info@quattroinsurance.com",
  brokerEmail: "appointments@quattroinsurance.com",
  phone: "(404) 555-0100",
  phoneHref: "tel:+14045550100",
  // reference-content.html carries this disclaimer on the contact details themselves.
  disclaimer: "Contact details shown are placeholders pending final launch confirmation.",
};

export const LEGAL_FOOTER =
  "Quattro Insurance Services is an insurance managing general agency in formation. Coverage described on this site is a program under development. Limits, terms, and availability are subject to underwriting review and confirmation of carrier and reinsurance capacity, and are not currently bound in any jurisdiction. This site is for informational purposes and does not constitute an offer of insurance.";

export const NAV_LINKS = [
  { href: "/#coverage", label: "Coverage" },
  { href: "/#how-we-underwrite", label: "How we underwrite" },
  { href: "/#brokers", label: "For brokers" },
  { href: "/#contact", label: "Contact" },
];

export const HERO = {
  badge: "Managing general agency, in formation",
  headingLead: "Comprehensive insurance and risk management for ",
  headingAccent: "long-term care facilities.",
  // quattro-copy-edits.md, "Hero section" — Replace with:
  body:
    "We are a managing general agency for long-term care liability. We underwrite each building on its own operating data, not a class average, and flag what needs attention before it becomes a claim.",
  primaryCta: { label: "Talk to our team", href: "/#contact" },
  secondaryCta: { label: "I'm a broker", href: "/#brokers" },
};

export const GAP = {
  heading: "Class-average pricing can't see your building.",
  body:
    "Most long-term care liability is priced off state and facility-type averages, re-rated once a year, with no way to reward a well-run facility, and hard caps on the coverage that matters most when a claim gets serious.",
  sub:
    "Typical sublimits are often inclusive of defense costs. A single serious claim can burn through the entire sublimit in legal fees before it ever reaches the injured party.",
  points: [
    { k: "A&B:", v: "sublimited well below the underlying limit." },
    { k: "SAM:", v: "the most restricted line, despite rising exposure." },
    { k: "W&E:", v: "treated as a footnote, not a core exposure." },
    { k: "Rating:", v: "happens once a year, off static data." },
  ],
  capLabel: "$25K–$100K",
  capSub: "typical cap",
  quattroLabel: "Full limits",
  quattroSub: "Quattro",
};

// quattro-copy-edits.md, "Section 02" — full rewrite. Do not restore the
// clinical / observed framing or any itemized sub-signal list.
export const SIGNALS = {
  heading: "Two signals already inside your building.",
  intro:
    "We don't ask operators to install anything new. At submission, our underwriting reads 90 days of your facility's own operating data, not a class average.",
  documentation: {
    label: "Documentation signal:",
    title: "what your team already records",
    body:
      "What your team already records day to day, as part of normal operations, reviewed over the 90 days preceding your application.",
  },
  activity: {
    label: "Activity signal:",
    title: "what actually happens in the building",
    body:
      "What actually happens in the building, day to day, reviewed over that same 90-day window.",
  },
  combine: "We combine both into a single facility-level risk profile before we quote.",
  // Em dash from the source doc replaced with a comma; wording otherwise verbatim.
  closing:
    "Once the policy is bound, we keep watching. Your team gets early-warning alerts, so problems are caught before they become incidents, and the same review informs your renewal. No new hardware, no added burden on staff.",
  stats: ["Review window: 90 days", "New hardware required: none", "Added staff burden: none"],
};

export const TRUST = {
  heading: "What operators and brokers are telling us.",
  note:
    "Quattro is an MGA in formation. These reactions are illustrative, from early design-partner conversations, not verified customer reviews.",
  quotes: [
    {
      body:
        "A program that doesn't sublimit wandering and elopement into irrelevance is worth a serious look.",
      who: "Wholesale broker, senior living book",
    },
    {
      body: "The first underwriting conversation that's felt like it understood the building.",
      who: "Director of Risk Management, regional operator",
    },
    {
      body: "No new hardware and no new burden on staff was the deciding factor.",
      who: "Administrator, assisted living community",
    },
  ],
};

export const HOW_IT_WORKS = {
  heading: "How it works: from application to ongoing alerts.",
  steps: [
    { n: 1, title: "Application", body: "No new systems or process required." },
    { n: 2, title: "Underwriting review", body: "90 days of signal, priced at the facility level." },
    { n: 3, title: "Policy issued", body: "Full limits, defense costs outside the limit." },
    { n: 4, title: "Ongoing alerts", body: "Early warnings inform renewal too." },
  ],
};

export const COVERAGE = {
  heading: "General & professional liability, built for long-term care.",
  body:
    "Built for skilled nursing, assisted living, memory care, and continuing care communities, focused on independent operators and small to mid-size regional chains.",
  rows: [
    { label: "General liability", value: "$1M each occurrence / $2M aggregate", highlight: false },
    { label: "Professional liability", value: "$1M each claim / $3M aggregate", highlight: false },
    { label: "Assault and battery", value: "Full limits, no sublimit", highlight: true },
    { label: "Sexual abuse and molestation", value: "Full limits, no sublimit", highlight: true },
    { label: "Wandering and elopement", value: "Full limits, no sublimit", highlight: true },
    { label: "Defense costs", value: "Outside the limit of liability", highlight: false },
    { label: "Deductible options", value: "$2,500 to $25,000 per claim", highlight: false },
  ],
  note:
    "Illustrative program targets. Final terms are subject to underwriting review and confirmation of carrier capacity, not yet bound.",
};

export const PORTAL_TEASER = {
  heading: "The underwriter portal reads the same two signals.",
  note: "Illustrative preview, in development.",
  topbarLeft: "Portal, facility risk profile",
  topbarRight: "[Facility placeholder]",
  alert: "Alert: a pattern at [Facility placeholder] needs a look. Review recommended.",
};

export const BROKERS = {
  heading:
    "For appointed agents and wholesale partners: a dual-line program built for a segment brokers struggle to place.",
  body:
    "Most markets write general liability only, price every account in a class the same, and offer no way to help a facility avoid a claim. Quattro is built differently on all three counts.",
  // quattro-copy-edits.md marks this 5-point list "No changes needed".
  points: [
    { k: "Early-warning alerts,", v: "not just a policy, flagging issues before they become incidents." },
    { k: "Broader coverage:", v: "full limits on A&B, SAM and W&E, defense costs outside the limit." },
    { k: "Granular underwriting", v: "using 90 days of real facility data, not class averages." },
    { k: "Combined GL and PL", v: "under one program, no stacking two markets." },
    { k: "One point of contact", v: "through binding and into claims." },
  ],
  // quattro-copy-edits.md, "Broker section" — REVISED per follow-up feedback. Use the new version.
  lookingForHeading: "What we're looking for",
  lookingForBody:
    "Retail and wholesale brokers with active long-term care and senior living books. That includes well-run operators who want broader coverage, proactive risk alerts, and a comprehensive risk management solution.",
  lookingForTags: [
    "Skilled nursing, assisted living, memory care, and CCRC accounts of any size",
    "Independent and regional operators, including those growing or adding locations",
    "Renewals where full A&B and SAM limits, or an ongoing risk alert program, would be a meaningful upgrade",
    "Accounts currently capped by low A&B or SAM sublimits, or declined or non-renewed for prior loss history",
  ],
};

export const FAQ = {
  heading: "Questions underwriters and brokers ask first.",
  items: [
    {
      q: "How is a policy actually rated?",
      a: "Off two signals already inside the building: 90 days of documentation signal and 90 days of activity signal, read alongside the application, combined into a single facility-level risk profile.",
    },
    {
      q: "Do we need to install anything?",
      a: "No. Quattro reads systems already running in the facility. No new hardware, no added burden on staff.",
    },
    {
      q: "What's actually different in the coverage?",
      a: "Full limits with no sublimit on A&B, SAM and W&E, plus defense costs outside the limit of liability. Deductibles run $2,500 to $25,000 per claim.",
    },
    {
      q: "What facility types do you write?",
      a: "Skilled nursing, assisted living, memory care, and CCRCs, focused on independent operators and small to mid-size regional chains.",
    },
    {
      q: "Is Quattro currently bound and licensed?",
      a: "Not yet. Quattro Insurance Services is an MGA in formation, subject to underwriting review and confirmation of carrier and reinsurance capacity.",
    },
    {
      q: "What happens after binding?",
      a: "We keep reading both signals for the life of the policy and send early-warning alerts, informing pricing again at renewal.",
    },
  ],
};

export const CONTACT_SECTION = {
  heading: "Get in touch: tell us about your facility or your book.",
  body:
    "Operators, reach out directly. Brokers, use this to request an appointment.",
  successHeading: "Message received.",
  successBody: "Someone from our team will follow up shortly.",
  responseNote: "We typically respond within one business day.",
};
