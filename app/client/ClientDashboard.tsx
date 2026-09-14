"use client";

import { useMemo, useState, useTransition } from "react";
import { BarChart, HBarChart } from "@/lib/dashboard/charts";
import { WEEK_LABELS, generateIssues, type Alert, type Violation } from "@/lib/dashboard/client-data";
import {
  CLIENT_DASHBOARD_COPY,
  NEWS_REGULATORY,
  NEWS_RISKMGMT,
  ROUTING_ALERT_TYPES,
  ROUTING_DEFAULTS,
  type Facility,
} from "@/lib/dashboard/client-content";
import { saveRoutingPreferences, type RoutingRow } from "./actions";

type RoutingPrefRow = {
  facility_id: string;
  alert_type: string;
  contact_name: string;
  contact_phone: string;
};

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ClientDashboard({
  facilities,
  alerts: initialAlerts,
  alertHistory,
  violations: initialViolations,
  routingPreferences,
  readOnly = false,
}: {
  facilities: Facility[];
  alerts: Alert[];
  alertHistory: Record<string, number[]>;
  violations: Violation[];
  routingPreferences: RoutingPrefRow[];
  /**
   * True for the Capacity Provider's read-only facility drill-down (see
   * app/capacity-provider/facility/[id]/page.tsx): hides acknowledge/
   * resolve/mark-addressed actions, the routing-preferences editor, and the
   * industry-news section, and swaps in third-person copy. Client users
   * always get readOnly=false — this dashboard's behavior for them is
   * unchanged.
   */
  readOnly?: boolean;
}) {
  const copy = readOnly ? CLIENT_DASHBOARD_COPY.capacityProviderReadOnly : CLIENT_DASHBOARD_COPY.client;
  const [scope, setScope] = useState<string>("all");
  const [alerts, setAlerts] = useState(initialAlerts);
  const [violations, setViolations] = useState(initialViolations);

  const scopedFacilities = scope === "all" ? facilities : facilities.filter((f) => f.id === scope);
  const facIds = scopedFacilities.map((f) => f.id);

  const scopedAlerts = alerts.filter((a) => facIds.includes(a.facilityId));
  const openAlerts = scopedAlerts.filter((a) => a.status !== "Acknowledged" || a.hoursOpen < 6);
  const respTimes = scopedAlerts.filter((a) => a.responseMin !== null).map((a) => a.responseMin as number);
  const avgResp = respTimes.length ? Math.round(respTimes.reduce((a, b) => a + b, 0) / respTimes.length) : 0;
  const scopedViolations = violations.filter((v) => facIds.includes(v.facilityId));
  const openViolations = scopedViolations.filter((v) => v.status !== "Addressed");

  const metrics: [string, number | string, boolean][] = [
    ["Facilities in view", scopedFacilities.length, false],
    ["Open alerts", openAlerts.length, openAlerts.length > 4],
    ["Avg. response time", avgResp + " min", false],
    ["Violations needing action", openViolations.length, openViolations.length > 0],
    ["Elevated-risk facilities", scopedFacilities.filter((f) => f.riskTier === "Elevated").length, scopedFacilities.some((f) => f.riskTier === "Elevated")],
  ];

  const title = readOnly
    ? facilities[0]?.name ?? "Facility dashboard"
    : scope === "all"
    ? "Your risk and safety dashboard"
    : scopedFacilities[0]?.name ?? "Your risk and safety dashboard";

  function acknowledgeAlert(idx: number) {
    setAlerts((prev) => {
      const next = [...prev];
      const globalIdx = prev.indexOf(scopedAlerts[idx]);
      next[globalIdx] = { ...next[globalIdx], status: "Acknowledged", responseMin: Math.round(4 + Math.random() * 20) };
      return next;
    });
  }
  function resolveAlert(idx: number) {
    setAlerts((prev) => prev.filter((a) => a !== scopedAlerts[idx]));
  }
  function markAddressed(idx: number) {
    setViolations((prev) => {
      const next = [...prev];
      const globalIdx = prev.indexOf(scopedViolations[idx]);
      next[globalIdx] = { ...next[globalIdx], status: "Addressed" };
      return next;
    });
  }

  // ---- charts ----
  const trendData = WEEK_LABELS.map((label, wi) => ({
    label,
    value: facIds.reduce((sum, id) => sum + (alertHistory[id]?.[wi] ?? 0), 0),
  }));
  const typeAgg: Record<string, number> = {};
  scopedAlerts.forEach((a) => {
    typeAgg[a.type] = (typeAgg[a.type] || 0) + 1;
  });
  const typeData = Object.keys(typeAgg)
    .map((t) => ({ label: t, value: typeAgg[t] }))
    .sort((a, b) => b.value - a.value);
  const buckets = [
    { label: "Under 5 min", value: respTimes.filter((t) => t < 5).length },
    { label: "5-10 min", value: respTimes.filter((t) => t >= 5 && t < 10).length },
    { label: "10-15 min", value: respTimes.filter((t) => t >= 10 && t < 15).length },
    { label: "Over 15 min", value: respTimes.filter((t) => t >= 15).length },
  ];
  const compareData =
    scopedFacilities.length > 1
      ? scopedFacilities
          .map((f) => ({
            label: f.name.length > 22 ? f.name.slice(0, 20) + "…" : f.name,
            value: alerts.filter((a) => a.facilityId === f.id).length,
          }))
          .sort((a, b) => b.value - a.value)
      : [];

  // ---- routing preferences ----
  const [routingFacilityId, setRoutingFacilityId] = useState(facilities[0]?.id ?? "");
  const [routingRows, setRoutingRows] = useState<Record<string, RoutingRow[]>>(() => {
    const byFacility: Record<string, RoutingRow[]> = {};
    facilities.forEach((f) => {
      const saved = routingPreferences.filter((r) => r.facility_id === f.id);
      byFacility[f.id] = ROUTING_ALERT_TYPES.map((type) => {
        const row = saved.find((r) => r.alert_type === type);
        const fallback = ROUTING_DEFAULTS[f.id]?.find((d) => d.type === type);
        return {
          alertType: type,
          contactName: row?.contact_name || fallback?.name || "",
          contactPhone: row?.contact_phone || fallback?.phone || "",
        };
      });
    });
    return byFacility;
  });
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle");
  const [isSaving, startSaving] = useTransition();

  function updateRoutingField(idx: number, field: "contactName" | "contactPhone", value: string) {
    setRoutingRows((prev) => {
      const rows = [...(prev[routingFacilityId] ?? [])];
      rows[idx] = { ...rows[idx], [field]: value };
      return { ...prev, [routingFacilityId]: rows };
    });
    setSaveState("idle");
  }

  function onSaveRouting() {
    const rows = routingRows[routingFacilityId] ?? [];
    startSaving(async () => {
      const res = await saveRoutingPreferences(routingFacilityId, rows);
      setSaveState(res.ok ? "saved" : "error");
    });
  }

  return (
    <>
      <div className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1>{title}</h1>
          <p>{copy.subtitle}</p>
        </div>
        {!readOnly && facilities.length > 0 && (
          <div className="field" style={{ maxWidth: 280, marginBottom: 0 }}>
            <label htmlFor="facility-switcher" style={{ marginBottom: 6 }}>
              Facility
            </label>
            <select id="facility-switcher" value={scope} onChange={(e) => setScope(e.target.value)}>
              <option value="all">All facilities ({facilities.length})</option>
              {facilities.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {facilities.length === 0 && (
        <div className="empty" style={{ marginTop: 24 }}>
          <h4>No facilities linked to this account</h4>
          <p>Contact your Quattro representative to have facilities added to your account.</p>
        </div>
      )}

      {facilities.length > 0 && (
        <>
          <section>
            <div className="metric-grid">
              {metrics.map(([label, value, flag]) => (
                <div className={`metric-card${flag ? " flag" : ""}`} key={String(label)}>
                  <div className="m-label">{label}</div>
                  <div className="m-value">{value}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="section-label">Real-time alerts</div>
            <p className="section-sub">{copy.alertsSub}</p>
            <div className="risk-table-wrap">
              <table className="risk-table">
                <thead>
                  <tr>
                    <th>Facility</th>
                    <th>Alert type</th>
                    <th>Source</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Time open</th>
                    <th>Response time</th>
                    {!readOnly && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {scopedAlerts.length === 0 ? (
                    <tr>
                      <td colSpan={readOnly ? 7 : 8} style={{ textAlign: "center", color: "var(--ink-soft)", fontStyle: "italic" }}>
                        No open alerts for this facility.
                      </td>
                    </tr>
                  ) : (
                    scopedAlerts.map((a, idx) => {
                      const sevClass = a.severity === "High" ? "sev-high" : a.severity === "Medium" ? "sev-medium" : "sev-low";
                      const statClass = a.status === "Escalated" ? "status-escalated" : a.status === "Unacknowledged" ? "status-unack" : "status-ack";
                      return (
                        <tr key={idx}>
                          <td>{a.facility}</td>
                          <td>{a.type}</td>
                          <td>{a.source}</td>
                          <td>
                            <span className={`status-pill ${sevClass}`}>{a.severity}</span>
                          </td>
                          <td>
                            <span className={`status-pill ${statClass}`}>{a.status}</span>
                          </td>
                          <td>{a.hoursOpen} hrs</td>
                          <td>{a.responseMin !== null ? `${a.responseMin} min` : "—"}</td>
                          {!readOnly && (
                            <td>
                              {a.status === "Unacknowledged" ? (
                                <button className="row-action-btn" onClick={() => acknowledgeAlert(idx)}>
                                  Acknowledge
                                </button>
                              ) : a.status === "Acknowledged" ? (
                                <button className="row-action-btn" onClick={() => resolveAlert(idx)}>
                                  Mark resolved
                                </button>
                              ) : (
                                <button className="row-action-btn" disabled>
                                  Escalated
                                </button>
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <div className="section-label">Alert trends and response time</div>
            <p className="section-sub">
              A closer look at how alert volume and response time are trending, so you can see whether
              things are getting better or worse, not just what&apos;s open right now.
            </p>
            <div className="chart-row">
              <div className="chart-block">
                <div className="chart-title">Alerts per week, trailing 12 weeks</div>
                <BarChart data={trendData} color="#41502C" width={520} height={150} />
              </div>
              <div className="chart-block">
                <div className="chart-title">Open alerts by type</div>
                {typeData.length ? (
                  <HBarChart data={typeData} color="#82986E" width={520} rowHeight={24} />
                ) : (
                  <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>No open alerts for this facility.</p>
                )}
              </div>
            </div>
            <div className="chart-row">
              <div className="chart-block">
                <div className="chart-title">Response time distribution</div>
                <BarChart data={buckets} color="#82986E" width={520} height={150} />
                <p className="chart-footnote">{copy.respTimeFootnote}</p>
              </div>
              {compareData.length > 0 && (
                <div className="chart-block">
                  <div className="chart-title">Open alerts by facility</div>
                  <HBarChart data={compareData} color="#A6483A" width={520} rowHeight={26} labelWidth={170} />
                </div>
              )}
            </div>
          </section>

          <section>
            <div className="section-label">Key issues observed, trailing 90 days</div>
            <p className="section-sub">{copy.issuesSub}</p>
            <ul className="issue-list">
              {scopedFacilities.flatMap((f) => generateIssues(f)).length === 0 ? (
                <li>
                  <div className="issue-detail">No notable findings for this facility in the trailing 90 days.</div>
                </li>
              ) : (
                scopedFacilities.flatMap((f) =>
                  generateIssues(f).map((iss, i) => (
                    <li key={f.id + i}>
                      <div className="issue-title">
                        {scopedFacilities.length > 1 ? `${f.name}: ` : ""}
                        {iss.title}
                      </div>
                      <div className="issue-detail">{iss.detail}</div>
                      <div className="issue-action">Recommended: {iss.action}</div>
                    </li>
                  ))
                )
              )}
            </ul>
          </section>

          <section>
            <div className="section-label">Flagged violations and citations</div>
            <p className="section-sub">{copy.violationsSub}</p>
            <div className="risk-table-wrap">
              <table className="risk-table">
                <thead>
                  <tr>
                    <th>Facility</th>
                    <th>Reference</th>
                    <th>Description</th>
                    <th>Due date</th>
                    <th>Status</th>
                    {!readOnly && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {scopedViolations.length === 0 ? (
                    <tr>
                      <td colSpan={readOnly ? 5 : 6} style={{ textAlign: "center", color: "var(--ink-soft)", fontStyle: "italic" }}>
                        No open violations for this facility.
                      </td>
                    </tr>
                  ) : (
                    scopedViolations.map((v, idx) => {
                      const statClass = v.status === "Overdue" ? "status-overdue" : v.status === "Addressed" ? "status-addressed" : "status-open";
                      return (
                        <tr key={idx}>
                          <td>{v.facility}</td>
                          <td>{v.code}</td>
                          <td>{v.desc}</td>
                          <td>{fmtDate(v.due)}</td>
                          <td>
                            <span className={`status-pill ${statClass}`}>{v.status}</span>
                          </td>
                          {!readOnly && (
                            <td>
                              {v.status === "Addressed" ? (
                                <button className="row-action-btn" disabled>
                                  Addressed
                                </button>
                              ) : (
                                <button className="row-action-btn" onClick={() => markAddressed(idx)}>
                                  Mark addressed
                                </button>
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {!readOnly && (
            <section>
              <div className="section-label">Alert routing preferences</div>
              <p className="section-sub">
                Choose who gets notified for each type of alert at this facility. You can send different
                alert types to different people, and update this at any time.
              </p>
              <div className="field" style={{ maxWidth: 360 }}>
                <label htmlFor="routing-facility-select">Configuring alerts for</label>
                <select
                  id="routing-facility-select"
                  value={routingFacilityId}
                  onChange={(e) => {
                    setRoutingFacilityId(e.target.value);
                    setSaveState("idle");
                  }}
                >
                  {facilities.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="routing-table-wrap">
                {(routingRows[routingFacilityId] ?? []).map((row, i) => (
                  <div className="routing-row" key={row.alertType}>
                    <div className="rr-label">{row.alertType}</div>
                    <div className="field">
                      <label>Recipient name</label>
                      <input type="text" value={row.contactName} onChange={(e) => updateRoutingField(i, "contactName", e.target.value)} />
                    </div>
                    <div className="field">
                      <label>Phone number</label>
                      <input type="text" value={row.contactPhone} onChange={(e) => updateRoutingField(i, "contactPhone", e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-violet" onClick={onSaveRouting} disabled={isSaving}>
                {isSaving ? "Saving…" : "Save routing preferences"}
              </button>
              {saveState === "saved" && (
                <div className="banner banner-teal save-banner show" style={{ marginTop: 14, maxWidth: 520 }}>
                  Routing preferences saved. Future alerts for this facility will go to the contacts above.
                </div>
              )}
              {saveState === "error" && (
                <div className="banner banner-danger save-banner show" style={{ marginTop: 14, maxWidth: 520 }}>
                  Couldn&apos;t save routing preferences. Please try again.
                </div>
              )}
            </section>
          )}

          {!readOnly && (
            <section>
              <div className="section-label">Industry news and trends</div>
              <p className="section-sub">
                Regulatory, litigation, and risk management news relevant to long-term care and senior
                living operators, curated for context, not investment or legal advice.
              </p>
              <div className="news-grid">
                <div>
                  <div className="news-col-label">Regulatory and litigation</div>
                  {NEWS_REGULATORY.map((n) => (
                    <div className="news-item" key={n.url}>
                      <a href={n.url} target="_blank" rel="noopener noreferrer">
                        {n.title}
                      </a>
                      <div className="news-meta">
                        {n.source} · {n.date}
                      </div>
                      <div className="news-blurb">{n.blurb}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="news-col-label">Risk management and technology</div>
                  {NEWS_RISKMGMT.map((n) => (
                    <div className="news-item" key={n.url}>
                      <a href={n.url} target="_blank" rel="noopener noreferrer">
                        {n.title}
                      </a>
                      <div className="news-meta">
                        {n.source} · {n.date}
                      </div>
                      <div className="news-blurb">{n.blurb}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
