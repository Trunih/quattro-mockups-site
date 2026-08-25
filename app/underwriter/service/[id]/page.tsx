import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_REQUESTS } from "@/lib/demo-data";
import { ServiceReviewClient } from "./ServiceReviewClient";

export function generateStaticParams() {
  return SERVICE_REQUESTS.map((r) => ({ id: r.id }));
}

export const metadata: Metadata = { title: "Review request" };

export default async function ServiceReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = SERVICE_REQUESTS.find((r) => r.id === id);
  if (!request) notFound();

  return <ServiceReviewClient request={request} />;
}
