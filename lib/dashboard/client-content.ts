/**
 * Client dashboard content, ported from quattro-operator-dashboard.html.
 *
 * SCRUBBED per the project's standing legal/competitive-protection rule
 * (quattro-copy-edits.md's banned-terms list, confirmed to apply here too).
 * Changes from the source file:
 *
 *   - "AI video surveillance" / "AI clinical data analyzer" sources ->
 *     "Activity signal" / "Documentation signal", matching the marketing
 *     site's own established two-signal framing exactly.
 *   - "Silent fall detected" -> dropped entirely (the source file's own
 *     instructions elsewhere in this project explicitly ban this phrase "in
 *     any form, even reworded"). Replaced with "Fall-risk pattern flagged".
 *   - "Chemical restraint (antipsychotic) flag" -> "Medication protocol
 *     flag". Every antipsychotic-rate percentage and CMS-benchmark number
 *     in the issue narratives below is removed, not softened.
 *   - "Camera or monitoring coverage gap" -> "Coverage gap flagged"; every
 *     "camera" / "wander-guard" / "dwell" reference and every specific
 *     response-time-in-minutes figure is removed from the issue narratives.
 *   - "State survey feed" is kept: it names a real public regulatory data
 *     category, not a Quattro-specific detection method.
 *   - F-tag violation codes (F689, F725, etc.) are kept: these are real,
 *     public CMS citation codes, not anything proprietary to Quattro.
 *
 * News items are kept verbatim per instruction: they cite real third-party
 * sources describing the industry generally, not Quattro's own methodology,
 * and are meant to render as static content, not a live feed.
 */

export type Facility = {
  id: string;
  name: string;
  state: string;
  type: string;
  beds: number;
  riskTier: "Low" | "Moderate" | "Elevated";
};

export const ALERT_TYPES = [
  { label: "Elopement attempt", source: "Activity signal" },
  { label: "Medication or care documentation error", source: "Documentation signal" },
  { label: "Unaddressed regulatory violation", source: "State survey feed" },
  { label: "Slow staff response time", source: "Activity signal" },
  { label: "Fall-risk pattern flagged", source: "Activity signal" },
  { label: "Medication protocol flag", source: "Documentation signal" },
  { label: "Staffing coverage gap", source: "Activity signal" },
  { label: "Coverage gap flagged", source: "Activity signal" },
] as const;

export const VIOLATION_TEMPLATES = [
  { code: "F689", desc: "Free of accident hazards, adequate supervision" },
  { code: "F725", desc: "Sufficient nursing staff" },
  { code: "F758", desc: "Free from unnecessary psychotropic medications" },
  { code: "F880", desc: "Infection prevention and control program" },
  { code: "INT-04", desc: "Internal policy: door alarm response verification" },
] as const;

export const ROUTING_ALERT_TYPES = [
  "Elopement attempt",
  "Fall-risk pattern flagged",
  "Medication or care documentation error",
  "Medication protocol flag",
  "Unaddressed regulatory violation",
  "Slow staff response time",
  "Staffing coverage gap",
  "Coverage gap flagged",
] as const;

export const ISSUE_TEMPLATES: Record<
  string,
  { title: string; detail: string; action: string }[]
> = {
  "fac-1": [
    {
      title: "Medication protocol flag",
      detail:
        "A documentation review flagged an elevated rate of a monitored medication category, without a fully documented clinical rationale on file for every resident on it.",
      action: "Recommend medical director review of current medication protocols.",
    },
    {
      title: "Staff response time trending up",
      detail: "Response time to flagged events has been trending in the wrong direction this period.",
      action: "Recommend reviewing overnight shift staffing levels on Hallway B.",
    },
    {
      title: "Documentation gap on a change in condition",
      detail: "One resident's care plan was not updated until 18 days after a documented mobility change.",
      action: "Recommend staff refresher on change-in-condition documentation timing.",
    },
  ],
  "fac-2": [
    {
      title: "Consistent staff presence observed",
      detail: "No irregular activity or coverage gaps detected in common areas over the trailing 90 days.",
      action: "No action needed this period.",
    },
    {
      title: "Medication administration timing",
      detail: "98% of medication administrations recorded within the scheduled window, above your program average.",
      action: "No action needed; continue current process.",
    },
  ],
  "fac-3": [
    {
      title: "Elevated elopement-related activity",
      detail:
        "Elopement-related activity concentrated near the memory care unit exit was elevated this period, including at least one alarm response that ran longer than usual.",
      action: "Recommend confirming door-lock and alarm maintenance schedule.",
    },
    {
      title: "Fall-risk pattern flagged",
      detail: "A fall was not documented in the medical record or reported through your incident process.",
      action: "Recommend staff retraining on post-fall notification and documentation.",
    },
    {
      title: "Medication protocol flag",
      detail:
        "A documentation review flagged an elevated rate of a monitored medication category, consistent with a memory care population but worth a documented clinical rationale on file.",
      action: "Recommend medical director sign-off on current protocols.",
    },
  ],
  "fac-4": [
    {
      title: "Staffing coverage gap, overnight shift",
      detail: "A window with no staff observed in a common hallway during the overnight shift was flagged on more than one occasion.",
      action: "Recommend reviewing overnight staffing schedule and call-light coverage.",
    },
    {
      title: "Coverage gap flagged",
      detail: "A brief gap in coverage during shift change was flagged for facility follow-up.",
      action: "Recommend confirming shift-change coverage procedure.",
    },
  ],
};

export const ROUTING_DEFAULTS: Record<string, { type: string; name: string; phone: string }[]> = {};
for (const facilityId of ["fac-1", "fac-2", "fac-3", "fac-4"]) {
  ROUTING_DEFAULTS[facilityId] = [
    { type: "Elopement attempt", name: "Director of Nursing", phone: "(555) 010-2201" },
    { type: "Fall-risk pattern flagged", name: "Director of Nursing", phone: "(555) 010-2201" },
    { type: "Medication or care documentation error", name: "Consultant Pharmacist", phone: "(555) 010-2244" },
    { type: "Medication protocol flag", name: "Medical Director", phone: "(555) 010-2277" },
    { type: "Unaddressed regulatory violation", name: "Administrator", phone: "(555) 010-2200" },
    { type: "Slow staff response time", name: "Administrator", phone: "(555) 010-2200" },
    { type: "Staffing coverage gap", name: "Administrator", phone: "(555) 010-2200" },
    { type: "Coverage gap flagged", name: "Facilities Director", phone: "(555) 010-2288" },
  ];
}

// News items: kept verbatim per instruction. Real third-party sources,
// static content, not a live feed.
export const NEWS_REGULATORY = [
  {
    title: "CMS repeals federal nursing home minimum staffing mandate",
    url: "https://www.duanemorris.com/alerts/federal_agencies_rescind_previous_administrations_nursing_home_staffing_rule_1225.html",
    source: "Duane Morris LLP",
    date: "Effective Feb 2, 2026",
    blurb:
      "The 24/7 RN requirement and hours-per-resident-day ratios from the 2024 rule have been rescinded; the facility assessment provision remains in effect and staffing compliance is now primarily state-driven.",
  },
  {
    title: "State attorneys general push CMS on for-profit staffing and ownership transparency",
    url: "https://skillednursingnews.com/2026/02/18-states-urge-cms-to-consider-nursing-home-staffing-mandate-for-for-profits-to-curb-fraud-schemes/",
    source: "Skilled Nursing News",
    date: "Feb 2026",
    blurb:
      "A coalition of 18 state attorneys general asked CMS to consider a narrower staffing mandate for for-profit chains and to reinstate suspended ownership and related-party disclosure requirements.",
  },
  {
    title: "Plaintiffs win a majority of long-term care trials nationally",
    url: "https://gitnux.org/nursing-home-lawsuit-statistics/",
    source: "Industry data report",
    date: "Updated Jan 2026",
    blurb:
      "Plaintiffs prevail in roughly 63% of long-term care trials, with average negligence settlements around $406,000, underscoring why documentation and response-time evidence matter well before a claim is filed.",
  },
  {
    title: '"Social inflation" cited as a driver of 2026 GL/PL rate increases',
    url: "https://www.myinsurect.com/post/general-liability-vs-professional-liability-understanding-the-habitational-gap-in-long-term-care",
    source: "Insure Connecticut LLC",
    date: "Jul 2026",
    blurb:
      "Brokers report rising jury awards regardless of case facts, with some claims exceeding $3 million in damages and defense costs, adding pressure on facilities that are underinsured relative to their actual risk.",
  },
];

export const NEWS_RISKMGMT = [
  {
    title: "AI elopement and fall-detection platforms expand across senior living",
    url: "https://www.mcknightsseniorliving.com/news/safespace-global-launches-ai-platform-to-detect-elopements-falls-more-with-contracts-at-8-senior-living-and-care-properties/",
    source: "McKnight's Senior Living",
    date: "Mar 2026",
    blurb:
      "A new AI platform combining exit-door monitoring with automatic door-locking and staff alerts is being deployed across multiple communities, aiming to intervene before an elopement or fall rather than after.",
  },
  {
    title: "Elopement detection methods compared for senior living safety programs",
    url: "https://www.accutechsecurity.com/blog/elopement-detection-methods-compared/",
    source: "Accutech Security",
    date: "Jan 2026",
    blurb:
      "A comparison of door alarms, wearable sensors, and camera-based monitoring for wandering and elopement risk, with guidance on matching detection method to resident population and staffing model.",
  },
  {
    title: "AI adoption a focus at 2026 senior living leadership summit",
    url: "https://www.healthcarebusinessreviewapac.com/news/how-ai-is-revolutionizing-senior-living-insights-from-the-2026-cxo-summit-nwid-3207.html",
    source: "Healthcare Business Review APAC",
    date: "2026",
    blurb:
      "Executives discussed using AI to flag compliance gaps and automate audit readiness, alongside a parallel push for stronger AI governance and data privacy frameworks as adoption accelerates.",
  },
  {
    title: "AI and sensor technology reframed as a care quality investment",
    url: "https://www.generationsllc.com/resources/blog/ai-tech-in-senior-living/",
    source: "Generations LLC",
    date: "Apr 2026",
    blurb:
      "Leading communities are positioning passive monitoring and fall-risk detection as tools that free up staff time for direct resident care, not as a replacement for it, a framing increasingly used with families and regulators alike.",
  },
];
