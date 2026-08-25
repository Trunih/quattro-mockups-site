import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/portal/Bits";
import { POLICIES, POLICY_DOCUMENTS } from "@/lib/demo-data";

export function generateStaticParams() {
  return POLICIES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = POLICIES.find((x) => x.id === id);
  return { title: p ? p.facility : "Policy" };
}

export default async function PolicyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = POLICIES.find((p) => p.id === id);
  if (!policy) notFound();

  const docs = POLICY_DOCUMENTS[policy.id] ?? [];

  return (
    <>
      <BackLink href="/agent">Back to my book</BackLink>

      <div className="policy-head">
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 8 }}>{policy.facility}</h1>
          <div className="uw-meta">
            <span className="mono-num">{policy.policyNumber}</span>
            <span>{policy.term}</span>
            <span className="mono-num">{policy.premium} / year</span>
          </div>
        </div>
        <div className="policy-actions">
          <Link href={`/agent/policy/${policy.id}/endorse`} className="btn btn-out btn-sm">
            Request endorsement
          </Link>
          <Link href={`/agent/policy/${policy.id}/documents`} className="btn btn-out btn-sm">
            Documents
          </Link>
          <Link href={`/agent/policy/${policy.id}/cancel`} className="btn btn-danger btn-sm">
            Request cancellation
          </Link>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 24 }}>
        <div className="panel-head">
          <span style={{ fontSize: 13, fontWeight: 600 }}>Documents</span>
        </div>
        <div>
          {docs.slice(0, 3).map((d) => (
            <div className="doc-row" key={d.id}>
              <span className="doc-icon" aria-hidden="true">
                &#128196;
              </span>
              <div className="doc-info">
                <div className="doc-name">{d.name}</div>
                <div className="doc-meta">
                  {d.kind} &middot; {d.date}
                </div>
              </div>
            </div>
          ))}
        </div>
        {docs.length > 3 && (
          <div style={{ padding: "14px 18px", borderTop: "1px solid var(--line)" }}>
            <Link
              href={`/agent/policy/${policy.id}/documents`}
              style={{ fontSize: 13, color: "var(--violet-text)" }}
            >
              View all {docs.length} documents &rarr;
            </Link>
          </div>
        )}
      </div>

      <p className="synthetic-note">
        Illustrative prototype data. This policy, its documents, and its premium are invented for
        demonstration.
      </p>
    </>
  );
}
