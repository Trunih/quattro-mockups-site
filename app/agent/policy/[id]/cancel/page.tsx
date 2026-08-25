import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/portal/Bits";
import { POLICIES } from "@/lib/demo-data";
import { CancelForm } from "./CancelForm";

export function generateStaticParams() {
  return POLICIES.map((p) => ({ id: p.id }));
}

export const metadata: Metadata = { title: "Request cancellation" };

export default async function CancelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = POLICIES.find((p) => p.id === id);
  if (!policy) notFound();

  return (
    <div style={{ maxWidth: 680 }}>
      <BackLink href={`/agent/policy/${policy.id}`}>Back to {policy.facility}</BackLink>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Request a cancellation</h1>
      <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 28, lineHeight: 1.6 }}>
        {policy.facility} &middot; <span className="mono-num">{policy.policyNumber}</span>
      </p>
      <CancelForm policy={policy} />
    </div>
  );
}
