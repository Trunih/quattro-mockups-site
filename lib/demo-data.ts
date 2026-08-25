/**
 * Illustrative portal data.
 *
 * Every facility, agency, person, premium, policy number, and date in this file
 * is INVENTED FOR THE PROTOTYPE. None of it describes a real account, a real
 * customer, or a real Quattro book of business. Surfaces that render it must
 * say so on screen (see SYNTHETIC_NOTE).
 *
 * The only figures taken from real project material are the program coverage
 * limits, which come from reference-content.html and ship unchanged.
 */

export const SYNTHETIC_NOTE =
  "Illustrative prototype data. These facilities, premiums, and policy numbers are invented for demonstration and do not represent a real book of business.";

export type SubmissionStatus = "review" | "info" | "quoted" | "bound" | "declined";

export const STATUS_LABEL: Record<SubmissionStatus, string> = {
  review: "In review",
  info: "Info requested",
  quoted: "Quoted",
  bound: "Bound",
  declined: "Declined",
};

export const STATUS_CLASS: Record<SubmissionStatus, string> = {
  review: "pill-review",
  info: "pill-info",
  quoted: "pill-quoted",
  bound: "pill-bound",
  declined: "pill-declined",
};

export type Submission = {
  id: string;
  facility: string;
  state: string;
  levels: string;
  submitted: string;
  status: SubmissionStatus;
  agency: string;
  agent: string;
  beds: number;
  premium?: string;
  notes?: string;
};

export const SUBMISSIONS: Submission[] = [
  {
    id: "SUB-4417",
    facility: "Cedar Grove Health & Rehabilitation",
    state: "GA",
    levels: "Skilled nursing, memory care",
    submitted: "12 Aug 2026",
    status: "review",
    agency: "Ridgeline Risk Partners",
    agent: "Dana Whitfield",
    beds: 118,
  },
  {
    id: "SUB-4402",
    facility: "Marsh Hollow Assisted Living",
    state: "NC",
    levels: "Assisted living",
    submitted: "8 Aug 2026",
    status: "info",
    agency: "Ridgeline Risk Partners",
    agent: "Dana Whitfield",
    beds: 64,
    notes: "Awaiting loss runs for the 2024 policy year.",
  },
  {
    id: "SUB-4388",
    facility: "Windrow Senior Living",
    state: "FL",
    levels: "Assisted living, independent living",
    submitted: "1 Aug 2026",
    status: "quoted",
    agency: "Ridgeline Risk Partners",
    agent: "Marcus Ilori",
    beds: 142,
    premium: "$186,400",
    notes: "Full limits on A&B and SAM. Retro date matches expiring.",
  },
  {
    id: "SUB-4371",
    facility: "Alder Point Care Center",
    state: "TX",
    levels: "Skilled nursing",
    submitted: "24 Jul 2026",
    status: "quoted",
    agency: "Copperfield Brokerage",
    agent: "Renee Adeyemi",
    beds: 96,
    premium: "$142,900",
    notes: "SIR set at $25,000 per claim at the agent's request.",
  },
];

export type Policy = {
  id: string;
  facility: string;
  policyNumber: string;
  term: string;
  premium: string;
  agency: string;
  agent: string;
};

export const POLICIES: Policy[] = [
  {
    id: "POL-2291",
    facility: "Bellhaven Court",
    policyNumber: "QTR-GL-2291",
    term: "1 Mar 2026 – 1 Mar 2027",
    premium: "$204,750",
    agency: "Ridgeline Risk Partners",
    agent: "Dana Whitfield",
  },
  {
    id: "POL-2264",
    facility: "Stonebridge Memory Care",
    policyNumber: "QTR-GL-2264",
    term: "15 Jan 2026 – 15 Jan 2027",
    premium: "$167,300",
    agency: "Ridgeline Risk Partners",
    agent: "Marcus Ilori",
  },
  {
    id: "POL-2238",
    facility: "Harrow Field CCRC",
    policyNumber: "QTR-GL-2238",
    term: "1 Dec 2025 – 1 Dec 2026",
    premium: "$312,100",
    agency: "Copperfield Brokerage",
    agent: "Renee Adeyemi",
  },
];

export type ServiceRequest = {
  id: string;
  facility: string;
  policyNumber: string;
  type: "Endorsement" | "Cancellation";
  agency: string;
  agent: string;
  submitted: string;
};

export const SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: "REQ-881",
    facility: "Bellhaven Court",
    policyNumber: "QTR-GL-2291",
    type: "Endorsement",
    agency: "Ridgeline Risk Partners",
    agent: "Dana Whitfield",
    submitted: "14 Aug 2026",
  },
  {
    id: "REQ-874",
    facility: "Harrow Field CCRC",
    policyNumber: "QTR-GL-2238",
    type: "Cancellation",
    agency: "Copperfield Brokerage",
    agent: "Renee Adeyemi",
    submitted: "9 Aug 2026",
  },
];

/** Agent identity shown in portal chrome. Invented for the prototype. */
export const DEMO_AGENT = {
  name: "Dana Whitfield",
  email: "d.whitfield@ridgelinerisk.com",
  agency: "Ridgeline Risk Partners",
};

export const DEMO_UNDERWRITER = {
  name: "Priya Raman",
  email: "p.raman@quattroinsurance.com",
  team: "Underwriting",
};

/** Queue counters for the underwriter dashboard. Derived from the arrays above. */
export const UW_METRICS = [
  { label: "Awaiting review", value: SUBMISSIONS.filter((s) => s.status === "review").length },
  { label: "Info requested", value: SUBMISSIONS.filter((s) => s.status === "info").length },
  { label: "Quoted, open", value: SUBMISSIONS.filter((s) => s.status === "quoted").length },
  { label: "Bound, in force", value: POLICIES.length },
];

/**
 * The underwriter's review panels.
 *
 * SCRUBBED per quattro-copy-edits.md: the source reference listed
 * "AI video surveillance / 90 days of monitored footage" and
 * "AI EHR data analyzer / 90 days of clinical record review" here. Those name
 * the data sources and are on the banned list. They are replaced with the
 * approved documentation-signal / activity-signal framing, which says what the
 * underwriter gets without identifying where it comes from.
 */
export const REVIEW_PANELS = [
  {
    key: "application",
    title: "Risk info",
    sub: "Full application, summarized",
  },
  {
    key: "inspection",
    title: "Site inspection and incidents",
    sub: "Latest survey and incident history",
  },
  {
    key: "documentation",
    title: "Documentation signal",
    sub: "90-day review",
  },
  {
    key: "activity",
    title: "Activity signal",
    sub: "90-day review",
  },
];

/** Coverage requested block. Limits are real program facts from reference-content.html. */
export const COVERAGE_REQUESTED = [
  { label: "General liability", value: "$1,000,000 occ / $2,000,000 agg" },
  { label: "Professional liability", value: "$1,000,000 occ / $3,000,000 agg" },
  { label: "Assault and battery", value: "Full limits, no sublimit" },
  { label: "Sexual abuse / molestation", value: "Full limits, no sublimit" },
  { label: "Wandering and elopement", value: "Full limits, no sublimit" },
];

/**
 * Premium comparison.
 *
 * SCRUBBED: the source reference named two real carriers with filed premiums.
 * Putting invented numbers beside real company names would fabricate facts
 * about third parties, so the named carriers are replaced with an unnamed
 * market range. The expiring premium is the account's own and stays.
 */
export const PREMIUM_COMPARISON = [
  { label: "Expiring premium", value: "$171,200" },
  { label: "Market comparison, low", value: "$164,800" },
  { label: "Market comparison, high", value: "$219,500" },
];

export const PREMIUM_COMPARISON_NOTE =
  "Illustrative comparison values for this prototype, not a live rating feed and not sourced from any carrier's filings.";

export type PolicyDocument = {
  id: string;
  name: string;
  kind: string;
  date: string;
};

/** Documents per policy id. Filenames are illustrative; nothing here is a real file. */
export const POLICY_DOCUMENTS: Record<string, PolicyDocument[]> = {
  "POL-2291": [
    { id: "d1", name: "Bellhaven Court - Declarations.pdf", kind: "Declarations", date: "1 Mar 2026" },
    { id: "d2", name: "Bellhaven Court - Policy Form GL-100.pdf", kind: "Policy form", date: "1 Mar 2026" },
    { id: "d3", name: "Bellhaven Court - Binder.pdf", kind: "Binder", date: "22 Feb 2026" },
  ],
  "POL-2264": [
    { id: "d4", name: "Stonebridge Memory Care - Declarations.pdf", kind: "Declarations", date: "15 Jan 2026" },
    { id: "d5", name: "Stonebridge Memory Care - Policy Form GL-100.pdf", kind: "Policy form", date: "15 Jan 2026" },
  ],
  "POL-2238": [
    { id: "d6", name: "Harrow Field CCRC - Declarations.pdf", kind: "Declarations", date: "1 Dec 2025" },
    { id: "d7", name: "Harrow Field CCRC - Policy Form GL-100.pdf", kind: "Policy form", date: "1 Dec 2025" },
    { id: "d8", name: "Harrow Field CCRC - Loss Run Authorization.pdf", kind: "Loss run authorization", date: "18 Nov 2025" },
  ],
};

export const ENDORSEMENT_TYPES = [
  "Add or remove a location",
  "Change in limits",
  "Change in named insured",
  "Add additional insured",
  "Add mortgagee / lienholder",
  "Other",
];

export const CANCELLATION_REASONS = [
  "Non-renewal, moving to another carrier",
  "Facility sold or closed",
  "No longer needed",
  "Non-payment",
  "Other",
];
