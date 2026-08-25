import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/portal/Bits";
import { POLICIES, POLICY_DOCUMENTS } from "@/lib/demo-data";

export function generateStaticParams() {
  return POLICIES.map((p) => ({ id: p.id }));
}

export const metadata: Metadata = { title: "Documents" };

export default async function DocumentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = POLICIES.find((p) => p.id === id);
  if (!policy) notFound();

  const docs = POLICY_DOCUMENTS[policy.id] ?? [];

  return (
    <div style={{ maxWidth: 720 }}>
      <BackLink href={`/agent/policy/${policy.id}`}>Back to {policy.facility}</BackLink>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Documents</h1>
      <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 26 }}>
        {policy.facility} &middot; <span className="mono-num">{policy.policyNumber}</span>
      </p>

      <div className="panel">
        {docs.length === 0 ? (
          <div className="empty">
            <h4>No documents yet</h4>
            <p>Policy documents will appear here once they are issued.</p>
          </div>
        ) : (
          docs.map((d) => (
            <button
              key={d.id}
              className="doc-row"
              type="button"
              aria-label={`Open ${d.name}, prototype only`}
            >
              <span className="doc-icon" aria-hidden="true">
                &#128196;
              </span>
              <div className="doc-info">
                <div className="doc-name">{d.name}</div>
                <div className="doc-meta">
                  {d.kind} &middot; {d.date}
                </div>
              </div>
              <span style={{ fontSize: 12, color: "var(--text-dim-2)", flex: "none" }}>View</span>
            </button>
          ))
        )}
      </div>

      <p className="synthetic-note" style={{ marginTop: 18 }}>
        Prototype only. These are illustrative filenames, not real documents, and nothing opens when
        clicked.
      </p>
    </div>
  );
}
