import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/portal/Bits";

export const metadata: Metadata = {
  title: "How would you like to submit?",
  description: "Choose how you want to get us the facility details.",
};

export default async function QuoteMethodPage({
  searchParams,
}: {
  searchParams: Promise<{ scope?: string }>;
}) {
  const { scope } = await searchParams;
  const isMulti = scope === "multi";

  const manualHref = isMulti ? "/agent/quote/portfolio" : "/agent/quote/new";
  const uploadHref = `/agent/quote/upload?scope=${isMulti ? "multi" : "single"}`;

  return (
    <div style={{ maxWidth: 860 }}>
      <BackLink href="/agent/quote">Back</BackLink>

      {/* Copy from reference-content.html, screen-quote-method. */}
      <h1 style={{ fontSize: 30, marginBottom: 10 }}>How would you like to submit?</h1>
      <p style={{ fontSize: 15, color: "var(--text-dim)", marginBottom: 14, lineHeight: 1.6 }}>
        Choose how you want to get us the facility details.
      </p>
      <p style={{ fontSize: 13, color: "var(--text-dim-2)", marginBottom: 32 }}>
        {isMulti ? "Portfolio submission, multiple locations." : "Single site submission, one facility."}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="two-col-even">
        <Link href={manualHref} className="pick-card">
          <span className="tag">Manual entry</span>
          <h2 style={{ fontSize: 20, marginBottom: 10 }}>Start a manual quote</h2>
          <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6 }}>
            Enter facility details directly in a short form.
          </p>
        </Link>

        <Link href={uploadHref} className="pick-card">
          <span className="tag">Upload</span>
          <h2 style={{ fontSize: 20, marginBottom: 10 }}>Upload application</h2>
          <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6 }}>
            Upload a completed application and we will take it from there.
          </p>
        </Link>
      </div>
    </div>
  );
}
