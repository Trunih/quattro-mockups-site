import type { Metadata } from "next";
import { QuoteWizard } from "@/components/wizard/QuoteWizard";

export const metadata: Metadata = {
  title: "New quote application",
  description: "Eleven-step facility application for a Quattro GL and PL quote.",
};

export default function NewQuotePage() {
  return <QuoteWizard />;
}
