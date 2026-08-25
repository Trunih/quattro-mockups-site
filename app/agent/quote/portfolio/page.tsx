import type { Metadata } from "next";
import { BackLink } from "@/components/portal/Bits";
import { PortfolioForm } from "./PortfolioForm";

export const metadata: Metadata = {
  title: "Portfolio submission",
  description: "Submit several locations together as one program.",
};

export default function PortfolioPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <BackLink href="/agent/quote/method?scope=multi">Back to submission method</BackLink>
      <h1 style={{ fontSize: 28, marginBottom: 10 }}>Portfolio submission</h1>
      <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 28 }}>
        Give us the shape of the program and we will come back with what we need per location.
      </p>
      <PortfolioForm />
    </div>
  );
}
