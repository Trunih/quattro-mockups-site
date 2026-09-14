import type { Metadata } from "next";
import Link from "next/link";
import { BarChart, HBarChart } from "@/lib/dashboard/charts";
import { buildCapacityProviderData } from "@/lib/dashboard/capacity-provider-data";

export const metadata: Metadata = {
  title: "Program performance dashboard",
};

const TODAY = new Date("2026-08-29");

function fmtMoney(n: number) {
  return "$" + Math.round(n).toLocaleString();
}
function fmtDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function CapacityProviderPage() {
  const data = buildCapacityProviderData(TODAY);

  const programBar: [string, string][] = [
    ["Program", "Long-Term Care GL/PL, LTC GL 00 01 / LTC PL 00 01"],
    ["Treaty year", "2026 to 2027"],
    ["Fronting structure", "Quota share, 100% ceded to capacity panel"],
    ["Stated aggregate capacity", fmtMoney(data.aggCapacityLabel)],
    ["Reporting basis", "Bordereau reconciled monthly; this view is real-time"],
  ];

  const funnelMetrics: [string, number | string][] = [
    ["Total submissions", data.funnel.total],
    ["Bind ratio", data.funnel.bindRatio + "%"],
    ["Policies bound, in force", data.funnel.boundCount],
    ["Policies declined", data.funnel.declinedCount],
    ["Pending underwriting review", data.funnel.pendingCount],
    ["Quoted, awaiting bind", data.funnel.quotedCount],
  ];

  const premiumMetrics: [string, string | number][] = [
    ["In-force premium (GWP)", fmtMoney(data.premium.totalPremium)],
    ["Average premium per policy", fmtMoney(data.premium.avgPremium)],
    ["Facilities insured", data.funnel.boundCount],
    ["Total licensed beds covered", data.premium.totalBeds.toLocaleString()],
    ["Aggregate loss capacity utilized", data.premium.aggUtilization + "%"],
  ];

  const lossMetrics: [string, string | number, boolean][] = [
    ["Claims reported, treaty year", data.loss.claimsCount, false],
    ["Open claims", data.openClaims.length, false],
    ["Incurred losses (paid + reserved)", fmtMoney(data.loss.incurredLosses), false],
    ["Loss ratio", data.loss.lossRatio + "%", data.loss.lossRatio > 65],
    [
      "Largest open reserve",
      fmtMoney(data.openClaims.length ? Math.max(...data.openClaims.map((c) => c.reserve)) : 0),
      false,
    ],
  ];

  const alertMetrics: [string, string | number, boolean][] = [
    ["Open alerts, portfolio-wide", data.openAlerts.length, data.openAlerts.length > 0],
    ["High severity alerts", data.highSeverity.length, data.highSeverity.length > 0],
    ["Unacknowledged past 24 hours", data.unackPast24.length, data.unackPast24.length > 0],
    ["Avg. staff response time, portfolio", data.avgResponseMin + " min", false],
  ];

  return (
    <>
      <div className="page-head">
        <h1>Program Performance Dashboard</h1>
        <p>Long-term care general liability and professional liability program, underwritten by Quattro Insurance Services.</p>
        <div className="as-of">Data as of {fmtDate(TODAY)}, current treaty year</div>
      </div>

      <div className="program-bar">
        {programBar.map(([label, value]) => (
          <div key={label}>
            <div className="pb-label">{label}</div>
            <div className="pb-value">{value}</div>
          </div>
        ))}
      </div>

      <section>
        <div className="section-label">Underwriting funnel, current treaty year</div>
        <div className="metric-grid-6">
          {funnelMetrics.map(([label, value]) => (
            <div className="metric-card" key={label}>
              <div className="m-label">{label}</div>
              <div className="m-value">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-label">Premium and exposure</div>
        <div className="metric-grid">
          {premiumMetrics.map(([label, value]) => (
            <div className="metric-card" key={label}>
              <div className="m-label">{label}</div>
              <div className="m-value">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-label">Loss and reserve summary</div>
        <div className="metric-grid">
          {lossMetrics.map(([label, value, flag]) => (
            <div className={`metric-card${flag ? " flag" : ""}`} key={label}>
              <div className="m-label">{label}</div>
              <div className="m-value">{value}</div>
            </div>
          ))}
        </div>
        <p className="chart-footnote">
          Loss and reserve figures are illustrative for this dashboard. In production these come from
          the claims bordereau, reconciled monthly against the policy administration system.
        </p>
      </section>

      <section>
        <div className="section-label">Book composition and trend</div>
        <div className="chart-row">
          <div className="chart-block">
            <div className="chart-title">Submissions, trailing 12 months</div>
            <BarChart data={data.trendData} color="#41502C" width={560} height={150} />
          </div>
          <div className="chart-block">
            <div className="chart-title">In-force premium by state ($000s)</div>
            <BarChart data={data.stateChartData} color="#82986E" width={560} height={150} />
          </div>
        </div>
        <div className="chart-row">
          <div className="chart-block">
            <div className="chart-title">Facility type mix, bound policies</div>
            <HBarChart data={data.typeData} color="#41502C" width={560} />
          </div>
          <div className="chart-block">
            <div className="chart-title">Assault &amp; battery / SAM limit profile</div>
            <HBarChart data={data.limitData} color="#82986E" width={560} />
            <p className="chart-footnote">
              Share of bound policies written at Quattro&apos;s standard full limits versus a negotiated
              sublimit or exclusion.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-label">Aggregation and concentration risk</div>
        <div className="chart-row">
          <div className="chart-block">
            <div className="chart-title">Top 5 states by share of in-force premium</div>
            <HBarChart data={data.aggData} color="#A6483A" width={560} />
            <p className="chart-footnote">
              Stated aggregate loss capacity for this treaty year: {fmtMoney(data.aggCapacityLabel)}.
              Geographic concentration matters because a single regional event (a hurricane response
              failure, a state-level regulatory action) could touch several facilities in the same
              state at once.
            </p>
          </div>
          <div className="chart-block">
            <div className="chart-title">Largest common-ownership exposures</div>
            {data.chainData.length ? (
              <HBarChart data={data.chainData} color="#41502C" width={560} rowHeight={30} />
            ) : (
              <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                No common-ownership concentration above one facility in the current book.
              </p>
            )}
            <p className="chart-footnote">
              Facilities under common ownership can share a single systemic event (for example, a
              corporate-level abuse allegation or a cybersecurity incident). This view exists to catch
              that kind of correlated risk, which a facility-by-facility bordereau can miss.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-label">Real-time facility-level risk alerts</div>
        <p className="section-sub">
          Generated from continuous review of the same signals read at each facility under each
          policy&apos;s data-sharing consent, plus other facility-level signals. These are the same
          alerts sent to facility staff for early intervention; this view rolls them up for
          portfolio-level oversight rather than single-facility action.
        </p>
        <div className="metric-grid-4">
          {alertMetrics.map(([label, value, flag]) => (
            <div className={`metric-card${flag ? " flag" : " good"}`} key={label}>
              <div className="m-label">{label}</div>
              <div className="m-value">{value}</div>
            </div>
          ))}
        </div>
        <div className="risk-table-wrap">
          <table className="risk-table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>Policy</th>
                <th>Alert type</th>
                <th>Source</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Time open</th>
              </tr>
            </thead>
            <tbody>
              {data.alerts.slice(0, 20).map((a, i) => {
                const sevClass = a.severity === "High" ? "sev-high" : a.severity === "Medium" ? "sev-medium" : "sev-low";
                const statClass = a.status === "Escalated" ? "status-escalated" : a.status === "Unacknowledged" ? "status-unack" : "status-ack";
                return (
                  <tr key={i}>
                    <td>
                      <Link href={`/capacity-provider/facility/${a.facilityId}`} className="facility-link">
                        {a.facility}
                      </Link>
                    </td>
                    <td>{a.policy}</td>
                    <td>{a.type}</td>
                    <td>{a.source}</td>
                    <td>
                      <span className={`status-pill ${sevClass}`}>{a.severity}</span>
                    </td>
                    <td>
                      <span className={`status-pill ${statClass}`}>{a.status}</span>
                    </td>
                    <td>{a.hoursOpen} hrs</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="chart-footnote">
          Showing the 20 most recent open or recently escalated alerts. Alert types include elopement
          attempts, medication or care documentation errors, unaddressed regulatory violations,
          abnormally slow staff response times, fall-risk patterns, medication protocol flags,
          staffing coverage gaps, and other coverage gaps.
        </p>
      </section>

      <section>
        <div className="section-label">Facility watchlist</div>
        <p className="section-sub">
          Bound facilities with the highest cumulative alert volume or a rising risk trend, flagged
          for underwriting attention at the next renewal, not necessarily for any action mid-term.
        </p>
        <div className="risk-table-wrap">
          <table className="risk-table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>State</th>
                <th>Risk tier</th>
                <th>Open alerts, 90 days</th>
                <th>Avg. response time</th>
                <th>Renewal date</th>
              </tr>
            </thead>
            <tbody>
              {data.watchlist.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "var(--ink-soft)", fontStyle: "italic" }}>
                    No facilities with open alerts in the past 90 days.
                  </td>
                </tr>
              ) : (
                data.watchlist.map((w, i) => {
                  const sevClass = w.f.riskTier === "Elevated" ? "sev-high" : w.f.riskTier === "Moderate" ? "sev-medium" : "sev-low";
                  return (
                    <tr key={i}>
                      <td>
                        <Link href={`/capacity-provider/facility/${w.f.id}`} className="facility-link">
                          {w.f.name}
                        </Link>
                      </td>
                      <td>{w.f.cityState}</td>
                      <td>
                        <span className={`status-pill ${sevClass}`}>{w.f.riskTier}</span>
                      </td>
                      <td>{w.count}</td>
                      <td>{w.respTime} min</td>
                      <td>{fmtDate(w.f.expDate!)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="section-label">Portfolio risk distribution</div>
        <p className="section-sub">
          Share of bound policies in each risk category, rolled up from the same facility-level heat
          map underwriters use at submission and renewal.
        </p>
        <div className="heat-grid">
          {data.heatCats.map((c) => {
            const label = c.level === "high" ? "Elevated" : c.level === "moderate" ? "Moderate" : "Low";
            return (
              <div className={`heat-tile heat-${c.level}`} key={c.label}>
                <div className="heat-label">{c.label}</div>
                <div className="heat-value">{label}</div>
                <div className="heat-note">Portfolio rollup, current treaty year</div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="section-label">Upcoming renewals, next 90 days</div>
        <div className="risk-table-wrap">
          <table className="risk-table">
            <thead>
              <tr>
                <th>Facility</th>
                <th>State</th>
                <th>Expiring premium</th>
                <th>Risk tier</th>
                <th>Renewal date</th>
                <th>Recommended action</th>
              </tr>
            </thead>
            <tbody>
              {data.renewals90.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "var(--ink-soft)", fontStyle: "italic" }}>
                    No renewals due in the next 90 days.
                  </td>
                </tr>
              ) : (
                data.renewals90.map((f, i) => {
                  const sevClass = f.riskTier === "Elevated" ? "sev-high" : f.riskTier === "Moderate" ? "sev-medium" : "sev-low";
                  const action =
                    f.riskTier === "Elevated"
                      ? "Renew with conditions, re-underwrite"
                      : f.riskTier === "Moderate"
                      ? "Renew, review at next cycle"
                      : "Renew as submitted";
                  return (
                    <tr key={i}>
                      <td>
                        <Link href={`/capacity-provider/facility/${f.id}`} className="facility-link">
                          {f.name}
                        </Link>
                      </td>
                      <td>{f.cityState}</td>
                      <td>{fmtMoney(f.premium)}</td>
                      <td>
                        <span className={`status-pill ${sevClass}`}>{f.riskTier}</span>
                      </td>
                      <td>{fmtDate(f.expDate!)}</td>
                      <td>{action}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="section-label">Largest open claims</div>
        <div className="risk-table-wrap">
          <table className="risk-table">
            <thead>
              <tr>
                <th>Claim reference</th>
                <th>Facility</th>
                <th>Date of loss</th>
                <th>Cause</th>
                <th>Reserve</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...data.claims]
                .sort((a, b) => b.reserve - a.reserve)
                .map((c, i) => (
                  <tr key={i}>
                    <td>{c.ref}</td>
                    <td>
                      <Link href={`/capacity-provider/facility/${c.facilityId}`} className="facility-link">
                        {c.facility}
                      </Link>
                    </td>
                    <td>{fmtDate(c.dateOfLoss)}</td>
                    <td>{c.cause}</td>
                    <td>{fmtMoney(c.reserve)}</td>
                    <td>{c.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
