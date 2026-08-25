import type { Metadata } from "next";
import { BackLink } from "@/components/portal/Bits";
import { UploadForm } from "./UploadForm";

export const metadata: Metadata = {
  title: "Upload application",
  description: "Upload a completed application and Quattro underwriting takes it from there.",
};

export default async function UploadPage({
  searchParams,
}: {
  searchParams: Promise<{ scope?: string }>;
}) {
  const { scope } = await searchParams;
  const isMulti = scope === "multi";

  return (
    <div style={{ maxWidth: 720 }}>
      <BackLink href={`/agent/quote/method?scope=${isMulti ? "multi" : "single"}`}>
        Back to submission method
      </BackLink>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Upload application</h1>
      <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 28 }}>
        Upload a completed application and we will take it from there. Underwriting will follow up if
        anything is missing.
      </p>
      <UploadForm isMulti={isMulti} />
    </div>
  );
}
