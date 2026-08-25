import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel, StatusPill, TableScroll, EmptyState } from "@/components/portal/Bits";
import { POLICIES, SUBMISSIONS } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "My book",
  description: "Submitted risk, bound policies, and everything in between.",
};

export default function AgentDashboard() {
  const submitted = SUBMISSIONS.filter((s) => s.status === "review" || s.status === "info");
  const quoted = SUBMISSIONS.filter((s) => s.status === "quoted");

  return (
    <>
      <div className="page-head">
        <div>
          {/* Headings from reference-content.html's agent dashboard. */}
          <h1>Your book with Quattro</h1>
          <p>Submitted risk, bound policies, and everything in between.</p>
        </div>
        <Link href="/agent/quote" className="btn btn-violet">
          Start a new quote
        </Link>
      </div>

      <SectionLabel count={submitted.length}>Submitted, in underwriting review</SectionLabel>
      {submitted.length === 0 ? (
        <EmptyState
          title="Nothing in review"
          body="Submissions you send to underwriting will appear here while they are being reviewed."
          actionHref="/agent/quote"
          actionLabel="Start a new quote"
        />
      ) : (
        <TableScroll>
          <table className="data">
            <thead>
              <tr>
                <th>Facility</th>
                <th>State</th>
                <th>Levels of care</th>
                <th>Submitted</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submitted.map((s) => (
                <tr key={s.id}>
                  <td className="strong">{s.facility}</td>
                  <td>{s.state}</td>
                  <td>{s.levels}</td>
                  <td>{s.submitted}</td>
                  <td>
                    <StatusPill status={s.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      )}

      <SectionLabel count={quoted.length}>Quoted, awaiting your acceptance</SectionLabel>
      {quoted.length === 0 ? (
        <EmptyState
          title="No open quotes"
          body="Once underwriting returns terms, your quotes will collect here for acceptance."
        />
      ) : (
        <TableScroll>
          <table className="data">
            <thead>
              <tr>
                <th>Facility</th>
                <th>Annual premium</th>
                <th>Underwriter notes</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quoted.map((s) => (
                <tr key={s.id}>
                  <td className="strong">{s.facility}</td>
                  <td className="mono-num">{s.premium}</td>
                  <td style={{ maxWidth: 320 }}>{s.notes}</td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-teal btn-xs">Accept</button>
                      <button className="btn btn-out btn-xs">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableScroll>
      )}

      <SectionLabel count={POLICIES.length}>Bound and in-force</SectionLabel>
      <TableScroll>
        <table className="data">
          <thead>
            <tr>
              <th>Facility</th>
              <th>Policy number</th>
              <th>Term</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {POLICIES.map((p) => (
              <tr key={p.id}>
                <td className="strong">
                  <Link href={`/agent/policy/${p.id}`} style={{ color: "inherit" }}>
                    {p.facility}
                  </Link>
                </td>
                <td className="mono-num">{p.policyNumber}</td>
                <td>{p.term}</td>
                <td>
                  <div className="row-actions">
                    <Link href={`/agent/policy/${p.id}/endorse`} className="btn btn-out btn-xs">
                      Endorse
                    </Link>
                    <Link href={`/agent/policy/${p.id}/documents`} className="btn btn-out btn-xs">
                      Documents
                    </Link>
                    <Link href={`/agent/policy/${p.id}/cancel`} className="btn btn-danger btn-xs">
                      Cancel
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
