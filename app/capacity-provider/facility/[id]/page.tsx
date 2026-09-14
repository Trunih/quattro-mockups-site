import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { generateAlerts, generateAlertHistory, generateViolations } from "@/lib/dashboard/client-data";
import { ClientDashboard } from "@/app/client/ClientDashboard";
import type { Facility } from "@/lib/dashboard/client-content";

export const metadata: Metadata = {
  title: "Facility detail",
};

const TODAY = new Date("2026-08-29");

export default async function CapacityProviderFacilityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // RLS (facilities_select_capacity_provider in schema.sql) scopes this read
  // to in_capacity_provider_book rows only. A capacity_provider account can
  // never load an individual client's own facility this way, even by
  // guessing its id — the query itself returns nothing for it, the same way
  // an unauthorized facilities read already returns [] for the Client side.
  const { data: facilityRow } = await supabase
    .from("facilities")
    .select("id, name, state, type, beds, risk_tier")
    .eq("id", id)
    .single();

  if (!facilityRow) {
    notFound();
  }

  const facility: Facility = {
    id: facilityRow.id,
    name: facilityRow.name,
    state: facilityRow.state,
    type: facilityRow.type,
    beds: facilityRow.beds,
    riskTier: facilityRow.risk_tier as Facility["riskTier"],
  };

  const alerts = generateAlerts([facility]);
  const alertHistory = generateAlertHistory([facility]);
  const violations = generateViolations([facility], TODAY);

  return (
    <>
      <Link href="/capacity-provider" className="back-link">
        ← Back to portfolio dashboard
      </Link>
      <ClientDashboard
        facilities={[facility]}
        alerts={alerts}
        alertHistory={alertHistory}
        violations={violations}
        routingPreferences={[]}
        readOnly
      />
    </>
  );
}
