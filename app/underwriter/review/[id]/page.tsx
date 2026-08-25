import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SUBMISSIONS } from "@/lib/demo-data";
import { ReviewClient } from "./ReviewClient";

export function generateStaticParams() {
  return SUBMISSIONS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const sub = SUBMISSIONS.find((s) => s.id === id);
  return {
    title: sub ? `Review ${sub.facility}` : "Review",
    description: "Underwriting review of a submitted facility.",
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const submission = SUBMISSIONS.find((s) => s.id === id);
  if (!submission) notFound();

  return <ReviewClient submission={submission} />;
}
