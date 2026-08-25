import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SUBMISSIONS } from "@/lib/demo-data";
import { BindClient } from "./BindClient";

export function generateStaticParams() {
  return SUBMISSIONS.map((s) => ({ id: s.id }));
}

export const metadata: Metadata = { title: "Bind policy" };

export default async function BindPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const submission = SUBMISSIONS.find((s) => s.id === id);
  if (!submission) notFound();

  return <BindClient submission={submission} />;
}
