/**
 * Quote wizard schema, mirroring the 11-step application in reference-content.html.
 *
 * FIELDS DELIBERATELY REMOVED, per quattro-copy-edits.md's sitewide banned list.
 * These existed in the reference application and must NOT be reintroduced:
 *
 *   - p-ehr / p-ehr-other  "EHR / clinical management system used"
 *   - r-wanderguard        "Wander guards or similar device used"
 *   - b-camera             "Video surveillance in use"
 *
 * Wording also changed from the reference for the same reason:
 *   - Step 6 title was "Staffing and clinical leadership"
 *   - Step 10 consent card was "Consent to share video surveillance and EHR data"
 *   - Step 1 lookup named the CMS registry directly
 *
 * Everything else is the reference application's own wording and option sets.
 */

export const STEP_TITLES = [
  "Facility profile",
  "Levels of care offered",
  "Licensing and regulatory history",
  "Prior insurance and loss history",
  "Requested coverage",
  "Staffing and care leadership",
  "Risk management and safety",
  "Building and fire / life safety",
  "Amenities and ancillary services",
  "Consent and supporting documents",
  "Review and submit",
] as const;

export const TOTAL_STEPS = STEP_TITLES.length;

export const LEVELS_OF_CARE = [
  { key: "subacute", label: "Sub-acute care" },
  { key: "skilled", label: "Skilled nursing" },
  { key: "memory", label: "Memory / Alzheimer's care" },
  { key: "assisted", label: "Assisted living" },
  { key: "independent", label: "Independent living" },
  { key: "ccrc", label: "CCRC / continuing care" },
] as const;

export type LevelKey = (typeof LEVELS_OF_CARE)[number]["key"];

export const OWNERSHIP = [
  "For profit",
  "Not for profit",
  "Hospital affiliated",
  "Religious affiliated",
  "Governmental",
];

export const YES_NO = ["Yes", "No"];

export const POLICY_FORM = ["Claims made", "Occurrence"];
export const PL_BASIS = ["Claims-made", "Occurrence"];
export const PRIOR_CLAIMS = ["None", "1 to 2 claims", "3 or more claims"];
export const ABUSE_CLAIMS = ["None", "1 to 2", "3 or more"];
export const ASSESSMENTS = ["Yes, all three", "Some, not all", "No"];
export const ADMIN_STATUS = ["Full time", "Part time"];
export const MD_STATUS = ["Full time, employed", "Part time, employed", "Contracted"];
export const BUILDING_OWNERSHIP = ["Owned", "Leased / tenant"];
export const DAYCARE_TYPE = ["Adult day care", "Children day care", "Both"];

export const ANCILLARY_SERVICES = [
  "Hospice care",
  "Respite care",
  "Rehabilitation services",
  "Home health care",
  "On-site pharmacy",
  "Resident transportation",
];

export const LOOKUP_STATES = ["Any state", "GA", "FL", "NC", "TX"];

export const SUPPORTING_DOCS = [
  { key: "lossrun", label: "Loss runs", hint: "Currently valued, past 5 years." },
  { key: "inspection", label: "Most recent state survey", hint: "Statement of deficiencies, if any." },
  { key: "abusePolicy", label: "Abuse prevention policy", hint: "Written policy and reporting procedure." },
  { key: "sitemap", label: "Site map or floor plan", hint: "Helps underwriting understand the layout." },
];

/** Full form shape. All values are strings or string arrays for prototype simplicity. */
export type QuoteForm = {
  // 1 facility profile
  facility: string;
  state: string;
  address: string;
  ownership: string;
  years: string;
  chain: string;
  parent: string;
  mgmt: string;
  mgmtName: string;
  // 2 levels of care
  levels: string[];
  bedsTotal: string;
  // 3 licensing
  license: string;
  expiry: string;
  medicare: string;
  medicaid: string;
  inspectionDate: string;
  deficiencies: string;
  complaints: string;
  revoked: string;
  revokedDetail: string;
  // 4 prior insurance
  carrier: string;
  form: string;
  glOcc: string;
  glAgg: string;
  plOcc: string;
  plAgg: string;
  sir: string;
  sam: string;
  samLimit: string;
  nonrenewed: string;
  nonrenewedDetail: string;
  priorClaims: string;
  priorClaimsDetail: string;
  // 5 requested coverage
  reqGlOcc: string;
  reqGlAgg: string;
  reqPlOcc: string;
  reqPlAgg: string;
  reqPlBasis: string;
  reqPlTail: string;
  reqSir: string;
  // 6 staffing
  adminStatus: string;
  adminYears: string;
  donYears: string;
  turnover: string;
  rn: string;
  cna: string;
  agencyChecks: string;
  mdStatus: string;
  mdOversight: string;
  // 7 risk management
  riskManager: string;
  incidentPolicy: string;
  abusePolicy: string;
  abuseClaims: string;
  elopements: string;
  assessments: string;
  // 8 building
  buildingOwnership: string;
  yearBuilt: string;
  floors: string;
  sprinkler: string;
  alarm: string;
  // 9 amenities
  mcLocked: string;
  mcBeds: string;
  ilCooking: string;
  ilDining: string;
  ilHha: string;
  pool: string;
  poolFenced: string;
  poolLifeguard: string;
  liquor: string;
  liquorPolicy: string;
  daycare: string;
  daycareType: string;
  ancillary: string[];
  // 10 consent + docs
  insuredName: string;
  insuredEmail: string;
  consentSent: boolean;
  docs: string[];
  // 11 review
  effective: string;
  notes: string;
};

export const EMPTY_FORM: QuoteForm = {
  facility: "", state: "", address: "", ownership: "", years: "",
  chain: "", parent: "", mgmt: "", mgmtName: "",
  levels: [], bedsTotal: "",
  license: "", expiry: "", medicare: "", medicaid: "",
  inspectionDate: "", deficiencies: "", complaints: "", revoked: "", revokedDetail: "",
  carrier: "", form: "", glOcc: "", glAgg: "", plOcc: "", plAgg: "", sir: "",
  sam: "", samLimit: "", nonrenewed: "", nonrenewedDetail: "",
  priorClaims: "", priorClaimsDetail: "",
  reqGlOcc: "$1,000,000", reqGlAgg: "$2,000,000",
  reqPlOcc: "$1,000,000", reqPlAgg: "$3,000,000",
  reqPlBasis: "", reqPlTail: "", reqSir: "",
  adminStatus: "", adminYears: "", donYears: "", turnover: "", rn: "", cna: "",
  agencyChecks: "", mdStatus: "", mdOversight: "",
  riskManager: "", incidentPolicy: "", abusePolicy: "", abuseClaims: "",
  elopements: "", assessments: "",
  buildingOwnership: "", yearBuilt: "", floors: "", sprinkler: "", alarm: "",
  mcLocked: "", mcBeds: "", ilCooking: "", ilDining: "", ilHha: "",
  pool: "", poolFenced: "", poolLifeguard: "", liquor: "", liquorPolicy: "",
  daycare: "", daycareType: "", ancillary: [],
  insuredName: "", insuredEmail: "", consentSent: false, docs: [],
  effective: "", notes: "",
};

/** Required fields per step, used for validation before advancing. */
export const REQUIRED_BY_STEP: Record<number, (keyof QuoteForm)[]> = {
  1: ["facility", "state", "ownership"],
  2: ["levels"],
  3: ["license", "medicare", "medicaid"],
  4: ["carrier", "form"],
  5: ["reqGlOcc", "reqPlOcc", "reqPlBasis"],
  6: ["adminStatus"],
  7: ["riskManager", "incidentPolicy", "abusePolicy"],
  8: ["buildingOwnership", "sprinkler"],
  9: [],
  10: [],
  11: ["effective"],
};

export const FIELD_LABELS: Partial<Record<keyof QuoteForm, string>> = {
  facility: "Facility name",
  state: "State",
  ownership: "Ownership structure",
  levels: "Levels of care",
  license: "State license number",
  medicare: "Medicare certified",
  medicaid: "Medicaid certified",
  carrier: "Current GL / PL carrier",
  form: "Policy form",
  reqGlOcc: "Requested GL per-occurrence limit",
  reqPlOcc: "Requested PL per-occurrence limit",
  reqPlBasis: "PL coverage basis",
  adminStatus: "Administrator",
  riskManager: "Dedicated risk manager on staff",
  incidentPolicy: "Formal incident reporting policy",
  abusePolicy: "Written abuse prevention and reporting policy",
  buildingOwnership: "Building is",
  sprinkler: "Automatic sprinklers cover 100% of building",
  effective: "Requested effective date",
};
