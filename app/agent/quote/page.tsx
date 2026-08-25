import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/portal/Bits";

export const metadata: Metadata = {
  title: "Start a new quote",
  description: "How many locations does this submission cover?",
};

export default function QuoteScopePage() {
  return (
    <div style={{ maxWidth: 860 }}>
      <BackLink href="/agent">Back to my book</BackLink>

      {/* Copy from reference-content.html, screen-quote-scope. */}
      <h1 style={{ fontSize: 30, marginBottom: 10 }}>Start a new quote</h1>
      <p style={{ fontSize: 15, color: "var(--text-dim)", marginBottom: 32, lineHeight: 1.6 }}>
        How many locations does this submission cover?
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="two-col-even">
        <Link href="/agent/quote/method?scope=single" className="pick-card">
          <span className="tag">Single site</span>
          <h2 style={{ fontSize: 20, marginBottom: 10 }}>One facility</h2>
          <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6 }}>
            A single location submission, quoted on its own risk profile.
          </p>
        </Link>

        <Link href="/agent/quote/method?scope=multi" className="pick-card">
          <span className="tag">Multiple sites</span>
          <h2 style={{ fontSize: 20, marginBottom: 10 }}>A portfolio of facilities</h2>
          <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6 }}>
            Submit several locations together as one program, using a statement of values.
          </p>
        </Link>
      </div>
    </div>
  );
}
