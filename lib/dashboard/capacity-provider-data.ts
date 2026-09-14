import { seededRandom } from "./seeded-random";
import { ALERT_TYPES, CHAINS, CLAIM_CAUSES, FACILITY_TYPES, NAME_PARTS_A, NAME_PARTS_B, STATES } from "./capacity-provider-content";

type PortfolioFacility = {
  id: string;
  name: string;
  cityState: string;
  type: string;
  beds: number;
  chain: string | null;
  status: "declined" | "pending" | "quoted" | "bound";
  premium: number;
  riskTier: "Low" | "Moderate" | "Elevated" | null;
  effDate: Date | null;
  expDate: Date | null;
  abTerms: "Full" | "Sublimit" | "Excluded" | null;
  samTerms: "Full" | "Sublimit" | "Excluded" | null;
};

type Claim = {
  ref: string;
  facility: string;
  facilityId: string;
  state: string;
  dateOfLoss: Date;
  cause: string;
  reserve: number;
  status: "Open, reserved" | "Closed, paid";
};

type PortfolioAlert = {
  facility: string;
  facilityId: string;
  policy: string;
  type: string;
  source: string;
  severity: "High" | "Medium" | "Low";
  status: "Escalated" | "Unacknowledged" | "Acknowledged";
  hoursOpen: number;
};

function round(n: number, step = 1) {
  return Math.round(n / step) * step;
}

export function buildCapacityProviderData(today: Date) {
  const rand = seededRandom("quattro-capacity-dashboard-v2");
  const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)];

  function pickChain(): string | null {
    const total = CHAINS.reduce((a, c) => a + c.weight, 0);
    let r = rand() * total;
    for (const c of CHAINS) {
      if (r < c.weight) return c.name;
      r -= c.weight;
    }
    return null;
  }

  const TOTAL_SUBMISSIONS = 70;
  const portfolio: PortfolioFacility[] = [];
  for (let i = 0; i < TOTAL_SUBMISSIONS; i++) {
    portfolio.push({
      id: "F" + (1000 + i),
      name: pick(NAME_PARTS_A) + " " + pick(NAME_PARTS_B),
      cityState: pick(STATES),
      type: pick(FACILITY_TYPES),
      beds: round(50 + rand() * 160, 5),
      chain: pickChain(),
      status: "declined",
      premium: 0,
      riskTier: null,
      effDate: null,
      expDate: null,
      abTerms: null,
      samTerms: null,
    });
  }

  const shuffled = [...portfolio].sort(() => rand() - 0.5);
  shuffled.forEach((f, idx) => {
    if (idx < 9) f.status = "declined";
    else if (idx < 17) f.status = "pending";
    else if (idx < 22) f.status = "quoted";
    else f.status = "bound";
  });

  const boundFacilities = portfolio.filter((f) => f.status === "bound");
  boundFacilities.forEach((f) => {
    const perBed = 650 + rand() * 450;
    f.premium = round(perBed * f.beds, 500);
    const tierRoll = rand();
    f.riskTier = tierRoll < 0.55 ? "Low" : tierRoll < 0.85 ? "Moderate" : "Elevated";
    const effOffsetDays = -Math.floor(rand() * 365);
    const eff = new Date(today);
    eff.setDate(eff.getDate() + effOffsetDays);
    const exp = new Date(eff);
    exp.setFullYear(exp.getFullYear() + 1);
    f.effDate = eff;
    f.expDate = exp;
    const abRoll = rand();
    f.abTerms = abRoll < 0.72 ? "Full" : abRoll < 0.93 ? "Sublimit" : "Excluded";
    f.samTerms = rand() < 0.85 ? f.abTerms : rand() < 0.5 ? "Full" : "Sublimit";
  });

  const claimFacilities = [...boundFacilities].sort(() => rand() - 0.5).slice(0, 9);
  const claims: Claim[] = claimFacilities.map((f, idx) => {
    const reserve = round(15000 + rand() * 260000, 2500);
    const dloss = new Date(today);
    dloss.setDate(dloss.getDate() - Math.floor(rand() * 300));
    return {
      ref: "CLM-" + (2026000 + idx),
      facility: f.name,
      facilityId: f.id,
      state: f.cityState,
      dateOfLoss: dloss,
      cause: pick(CLAIM_CAUSES),
      reserve,
      status: idx < 6 ? "Open, reserved" : "Closed, paid",
    };
  });

  const alertPool = boundFacilities.filter((f) => f.riskTier !== "Low" || rand() < 0.15);
  const alerts: PortfolioAlert[] = [];
  for (let i = 0; i < 30; i++) {
    const f = pick(alertPool.length ? alertPool : boundFacilities);
    const at = pick(ALERT_TYPES);
    const sevRoll = rand() * 3 + at.sevBias;
    const severity = sevRoll > 3.3 ? "High" : sevRoll > 1.8 ? "Medium" : "Low";
    const hoursOpen = Math.floor(rand() * 72);
    const statusRoll = rand();
    const status = severity === "High" && statusRoll < 0.3 ? "Escalated" : statusRoll < 0.55 ? "Unacknowledged" : "Acknowledged";
    alerts.push({
      facility: f.name,
      facilityId: f.id,
      policy: "QTR-GL-2026-" + (30000 + Math.floor(rand() * 9999)),
      type: at.label,
      source: at.source,
      severity,
      status,
      hoursOpen,
    });
  }
  alerts.sort((a, b) => a.hoursOpen - b.hoursOpen);

  // funnel
  const declinedCount = portfolio.filter((f) => f.status === "declined").length;
  const pendingCount = portfolio.filter((f) => f.status === "pending").length;
  const quotedCount = portfolio.filter((f) => f.status === "quoted").length;
  const boundCount = boundFacilities.length;
  const bindRatio = Math.round((boundCount / (boundCount + declinedCount)) * 100);

  function daysBetween(a: Date, b: Date) {
    return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
  }
  const renewals90 = boundFacilities.filter((f) => {
    const d = daysBetween(today, f.expDate!);
    return d >= 0 && d <= 90;
  });

  const totalPremium = boundFacilities.reduce((s, f) => s + f.premium, 0);
  const avgPremium = boundCount ? totalPremium / boundCount : 0;
  const totalBeds = boundFacilities.reduce((s, f) => s + f.beds, 0);
  const aggCapacity = 18_000_000;

  const openClaims = claims.filter((c) => c.status.startsWith("Open"));
  const incurredLosses = claims.reduce((s, c) => s + c.reserve, 0);
  const lossRatio = totalPremium ? Math.round((incurredLosses / totalPremium) * 100) : 0;
  const aggUtilization = Math.round((incurredLosses / aggCapacity) * 100);

  // trend chart (synthetic monthly submissions, last 12 months)
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const trendData = months.map((m) => ({ label: m, value: Math.round(3 + rand() * 7) }));

  const stateAgg: Record<string, number> = {};
  boundFacilities.forEach((f) => {
    stateAgg[f.cityState] = (stateAgg[f.cityState] || 0) + f.premium;
  });
  const stateData = Object.keys(stateAgg)
    .sort((a, b) => stateAgg[b] - stateAgg[a])
    .map((s) => ({ label: s, value: Math.round(stateAgg[s]) }));
  const stateChartData = stateData.map((d) => ({ label: d.label, value: Math.round(d.value / 1000) }));

  const typeAgg: Record<string, number> = {};
  boundFacilities.forEach((f) => {
    typeAgg[f.type] = (typeAgg[f.type] || 0) + 1;
  });
  const typeData = Object.keys(typeAgg).map((t) => ({ label: t, value: typeAgg[t], valueLabel: `${typeAgg[t]} facilities` }));

  const abCounts = { Full: 0, Sublimit: 0, Excluded: 0 };
  boundFacilities.forEach((f) => {
    if (f.abTerms) abCounts[f.abTerms]++;
  });
  const limitData = [
    { label: "Full limits (standard)", value: abCounts.Full, valueLabel: `${Math.round((abCounts.Full / boundCount) * 100)}%` },
    { label: "Negotiated sublimit", value: abCounts.Sublimit, valueLabel: `${Math.round((abCounts.Sublimit / boundCount) * 100)}%` },
    { label: "Explicitly excluded", value: abCounts.Excluded, valueLabel: `${Math.round((abCounts.Excluded / boundCount) * 100)}%` },
  ];

  const aggData = stateData.slice(0, 5).map((d) => ({
    label: d.label,
    value: Math.round(d.value / 1000),
    valueLabel: `${Math.round((d.value / totalPremium) * 100)}% of book`,
  }));

  const chainAgg: Record<string, number> = {};
  boundFacilities.forEach((f) => {
    if (f.chain) chainAgg[f.chain] = (chainAgg[f.chain] || 0) + 1;
  });
  const chainData = Object.keys(chainAgg)
    .map((c) => ({ label: c, value: chainAgg[c], valueLabel: `${chainAgg[c]} facilities` }))
    .sort((a, b) => b.value - a.value);

  const openAlerts = alerts.filter((a) => a.status !== "Acknowledged");
  const highSeverity = alerts.filter((a) => a.severity === "High");
  const unackPast24 = alerts.filter((a) => a.status === "Unacknowledged" && a.hoursOpen > 24);
  const avgResponseMin = Math.round(6 + rand() * 9);

  const alertCountByFacility: Record<string, number> = {};
  alerts.forEach((a) => {
    alertCountByFacility[a.facility] = (alertCountByFacility[a.facility] || 0) + 1;
  });
  const watchlist = boundFacilities
    .map((f) => ({ f, count: alertCountByFacility[f.name] || 0 }))
    .filter((w) => w.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map((w) => ({ ...w, respTime: Math.round(5 + rand() * 20) }));

  const tierCounts = { Low: 0, Moderate: 0, Elevated: 0 };
  boundFacilities.forEach((f) => {
    if (f.riskTier) tierCounts[f.riskTier]++;
  });
  const heatCats = [
    { label: "Licensing & regulatory", level: tierCounts.Elevated > boundCount * 0.2 ? "high" : tierCounts.Moderate > boundCount * 0.3 ? "moderate" : "low" },
    { label: "Claims & loss history", level: lossRatio > 65 ? "high" : lossRatio > 45 ? "moderate" : "low" },
    { label: "Staffing & operational oversight", level: "moderate" },
    { label: "Real-time alert volume", level: openAlerts.length > 12 ? "high" : openAlerts.length > 6 ? "moderate" : "low" },
    { label: "Aggregation & concentration", level: aggUtilization > 70 ? "high" : aggUtilization > 45 ? "moderate" : "low" },
  ] as const;

  return {
    portfolio,
    boundFacilities,
    claims,
    openClaims,
    alerts,
    openAlerts,
    highSeverity,
    unackPast24,
    avgResponseMin,
    watchlist,
    heatCats,
    renewals90: renewals90.sort((a, b) => a.expDate!.getTime() - b.expDate!.getTime()),
    funnel: { declinedCount, pendingCount, quotedCount, boundCount, bindRatio, total: TOTAL_SUBMISSIONS },
    premium: { totalPremium, avgPremium, totalBeds, aggCapacity, aggUtilization },
    loss: { incurredLosses, lossRatio, claimsCount: claims.length },
    trendData,
    stateChartData,
    typeData,
    limitData,
    aggData,
    aggCapacityLabel: aggCapacity,
    chainData,
  };
}
