/**
 * Capacity Provider dashboard content, ported from
 * quattro-capacity-provider-dashboard.html. All portfolio, premium, claims,
 * and alert data is procedurally generated from a fixed seed — invented for
 * this prototype, not a real book of business, kept that way per instruction.
 *
 * SCRUBBED the same way as the Client dashboard (see client-content.ts for
 * the full rationale): "AI video surveillance" / "AI clinical data
 * analyzer" -> "Activity signal" / "Documentation signal"; "silent fall" and
 * "chemical restraint (antipsychotic)" replaced entirely, not softened;
 * "camera or monitoring coverage gap" genericized. "State survey feed" and
 * the F-tag codes are kept (real public regulatory categories, not
 * proprietary to Quattro).
 */

export const STATES = ["GA", "FL", "NC", "TX", "SC", "AL", "TN"];
export const FACILITY_TYPES = ["Skilled Nursing", "Assisted Living", "Memory Care", "CCRC"];
export const NAME_PARTS_A = [
  "Willow Creek", "Magnolia Springs", "Cedar Ridge", "Riverside", "Oakwood", "Heritage Oaks",
  "Sunrise Meadows", "Pinehurst", "Live Oak", "Brookstone", "Ashford", "Foxglove", "Harborview",
  "Chestnut Hill", "Laurel Grove", "Silver Pines", "Bellwood", "Crestview", "Amber Glen", "Fairhaven",
];
export const NAME_PARTS_B = [
  "Health and Rehabilitation", "Senior Living", "Manor", "Gardens", "Commons", "Care Center",
  "Nursing and Rehabilitation", "Assisted Living Community",
];
export const CHAINS = [
  { name: "Meridian Senior Living Group", weight: 9 },
  { name: "Pinehurst Health Partners", weight: 6 },
  { name: "Coastal Health Partners LLC", weight: 4 },
  { name: null, weight: 41 },
];

export const ALERT_TYPES = [
  { label: "Elopement attempt", source: "Activity signal", sevBias: 2 },
  { label: "Medication or care documentation error", source: "Documentation signal", sevBias: 1 },
  { label: "Unaddressed regulatory violation", source: "State survey feed", sevBias: 2 },
  { label: "Slow staff response time", source: "Activity signal", sevBias: 1 },
  { label: "Fall-risk pattern flagged", source: "Activity signal", sevBias: 1 },
  { label: "Medication protocol flag", source: "Documentation signal", sevBias: 0 },
  { label: "Staffing coverage gap", source: "Activity signal", sevBias: 0 },
  { label: "Coverage gap flagged", source: "Activity signal", sevBias: 0 },
] as const;

export const CLAIM_CAUSES = [
  "Resident fall, alleged negligent supervision",
  "Elopement incident",
  "Alleged medication error",
  "Pressure ulcer, alleged neglect",
  "Resident-to-resident altercation",
  "Alleged failure to diagnose change in condition",
];
