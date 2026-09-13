import { seededRandom } from "./seeded-random";
import { ALERT_TYPES, VIOLATION_TEMPLATES, type Facility } from "./client-content";

export type Alert = {
  facilityId: string;
  facility: string;
  type: string;
  source: string;
  severity: "High" | "Medium" | "Low";
  status: "Escalated" | "Unacknowledged" | "Acknowledged";
  hoursOpen: number;
  responseMin: number | null;
};

export type Violation = {
  facilityId: string;
  facility: string;
  code: string;
  desc: string;
  due: Date;
  status: "Overdue" | "Addressed" | "Open, action required";
};

const WEEK_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"];

/**
 * Illustrative alerts, deterministically generated from a fixed seed so the
 * same demo data renders every load. Simulated, same as the source file.
 */
export function generateAlerts(facilities: Facility[]): Alert[] {
  const rand = seededRandom("quattro-client-dashboard-v1");
  const alerts: Alert[] = [];
  facilities.forEach((f) => {
    const tierBoost = f.riskTier === "Elevated" ? 3 : f.riskTier === "Moderate" ? 1 : 0;
    const count = 2 + Math.floor(rand() * 3) + tierBoost;
    for (let i = 0; i < count; i++) {
      const at = ALERT_TYPES[Math.floor(rand() * ALERT_TYPES.length)];
      const hoursOpen = Math.floor(rand() * 60);
      const sevRoll = rand() + tierBoost * 0.15;
      const severity = sevRoll > 0.75 ? "High" : sevRoll > 0.4 ? "Medium" : "Low";
      const statusRoll = rand();
      const status =
        severity === "High" && statusRoll < 0.25
          ? "Escalated"
          : statusRoll < 0.45
          ? "Unacknowledged"
          : "Acknowledged";
      alerts.push({
        facilityId: f.id,
        facility: f.name,
        type: at.label,
        source: at.source,
        severity,
        status,
        hoursOpen,
        responseMin: status !== "Unacknowledged" ? Math.round(4 + rand() * 20) : null,
      });
    }
  });
  return alerts.sort((a, b) => a.hoursOpen - b.hoursOpen);
}

export function generateAlertHistory(facilities: Facility[]): Record<string, number[]> {
  const rand = seededRandom("quattro-client-history-v1");
  const history: Record<string, number[]> = {};
  facilities.forEach((f) => {
    const tierBoost = f.riskTier === "Elevated" ? 2.5 : f.riskTier === "Moderate" ? 1 : 0.3;
    history[f.id] = WEEK_LABELS.map(() => Math.round(rand() * (1 + tierBoost) + tierBoost * 0.5));
  });
  return history;
}

export function generateViolations(facilities: Facility[], today: Date): Violation[] {
  const rand = seededRandom("quattro-client-violations-v1");
  const violations: Violation[] = [];
  facilities.forEach((f) => {
    const tierBoost = f.riskTier === "Elevated" ? 2 : f.riskTier === "Moderate" ? 1 : 0;
    const count = 1 + Math.floor(rand() * 2) + (tierBoost > 1 ? 1 : 0);
    for (let i = 0; i < count; i++) {
      const v = VIOLATION_TEMPLATES[Math.floor(rand() * VIOLATION_TEMPLATES.length)];
      const dueOffset = Math.floor(rand() * 40) - 15;
      const due = new Date(today);
      due.setDate(due.getDate() + dueOffset);
      const status = dueOffset < 0 ? "Overdue" : rand() < 0.3 ? "Addressed" : "Open, action required";
      violations.push({ facilityId: f.id, facility: f.name, code: v.code, desc: v.desc, due, status });
    }
  });
  return violations;
}

export { WEEK_LABELS };
