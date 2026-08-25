import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel, StatusPill, TableScroll } from "@/components/portal/Bits";
import { POLICIES, SERVICE_REQUESTS, SUBMISSIONS, UW_METRICS } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Underwriting queue",
  description: "Everything submitted to Quattro, across every agency.",
};

export default function UnderwriterQueue() {
  return (
    <>
      <div className="page-head">
        <div>
          {/* Headings from reference-content.html's underwriter dashboard. */}
          <h1>Underwriting queue</h1>
          <p>Everything submitted to Quattro, across every agency.</p>
        </div>
        <Link href="/agent/quote" className="btn btn-violet">
          Start a new quote
        </Link>
      </div>

      <div className="metric-row" style={{ marginTop: 26 }}>
        {UW_METRICS.map((m) => (
          <div className="metric" key={m.label}>
            <div className="v">{m.value}</div>
            <div className="l">{m.label}</div>
          </div>
        ))}
      </div>

      <SectionLabel count={SUBMISSIONS.length}>Submissions and referrals</SectionLabel>
      <TableScroll>
        <table className="data">
          <thead>
            <tr>
              <th>Facility</th>
              <th>Agency / agent</th>
              <th>Levels of care</th>
              <th>Submitted</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SUBMISSIONS.map((s) => (
              <tr key={s.id}>
                <td className="strong">
                  {s.facility}
                  <div style={{ fontSize: 12, color: "var(--text-dim-2)", fontWeight: 400 }}>
                    {s.state} · {s.beds} beds
                  </div>
                </td>
                <td>
                  {s.agency}
                  <div style={{ fontSize: 12, color: "var(--text-dim-2)" }}>{s.agent}</div>
                </td>
                <td>{s.levels}</td>
                <td>{s.submitted}</td>
                <td>
                  <StatusPill status={s.status} />
                </td>
                <td>
                  <div className="row-actions">
                    <Link href={`/underwriter/review/${s.id}`} className="btn btn-violet btn-xs">
                      Review
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>

      <SectionLabel count={POLICIES.length}>Bound and in-force, all agencies</SectionLabel>
      <TableScroll>
        <table className="data">
          <thead>
            <tr>
              <th>Facility</th>
              <th>Policy number</th>
              <th>Term</th>
              <th>Premium</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {POLICIES.map((p) => (
              <tr key={p.id}>
                <td className="strong">
                  {p.facility}
                  <div style={{ fontSize: 12, color: "var(--text-dim-2)", fontWeight: 400 }}>
                    {p.agency}
                  </div>
                </td>
                <td className="mono-num">{p.policyNumber}</td>
                <td>{p.term}</td>
                <td className="mono-num">{p.premium}</td>
                <td>
                  <div className="row-actions">
                    <Link href={`/agent/policy/${p.id}/documents`} className="btn btn-out btn-xs">
                      Documents
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>

      <SectionLabel count={SERVICE_REQUESTS.length}>
        Endorsement and cancellation requests
      </SectionLabel>
      <TableScroll>
        <table className="data">
          <thead>
            <tr>
              <th>Facility</th>
              <th>Policy number</th>
              <th>Type</th>
              <th>Agency / agent</th>
              <th>Submitted</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SERVICE_REQUESTS.map((r) => (
              <tr key={r.id}>
                <td className="strong">{r.facility}</td>
                <td className="mono-num">{r.policyNumber}</td>
                <td>
                  <span className={`pill ${r.type === "Endorsement" ? "pill-quoted" : "pill-declined"}`}>
                    {r.type}
                  </span>
                </td>
                <td>
                  {r.agency}
                  <div style={{ fontSize: 12, color: "var(--text-dim-2)" }}>{r.agent}</div>
                </td>
                <td>{r.submitted}</td>
                <td>
                  <div className="row-actions">
                    <Link href={`/underwriter/service/${r.id}`} className="btn btn-out btn-xs">
                      Open
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableScroll>
    </>
  );
}
