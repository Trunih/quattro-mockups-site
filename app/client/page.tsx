import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { generateAlerts, generateAlertHistory, generateViolations } from "@/lib/dashboard/client-data";
import { ClientDashboard } from "./ClientDashboard";
import type { Facility } from "@/lib/dashboard/client-content";

export const metadata: Metadata = {
  title: "Your risk and safety dashboard",
};

const TODAY = new Date("2026-08-29");

export default async function ClientDashboardPage() {
  const supabase = await createClient();

  // RLS scopes this to only the facilities this signed-in user is linked to
  // via user_facilities — the query itself can't return anyone else's rows.
  const { data: facilitiesData } = await supabase
    .from("facilities")
    .select("id, name, state, type, beds, risk_tier")
    .order("name");

  const facilities: Facility[] = (facilitiesData ?? []).map((f) => ({
    id: f.id,
    name: f.name,
    state: f.state,
    type: f.type,
    beds: f.beds,
    riskTier: f.risk_tier as Facility["riskTier"],
  }));

  const { data: routingData } = await supabase
    .from("routing_preferences")
    .select("facility_id, alert_type, contact_name, contact_phone")
    .in("facility_id", facilities.map((f) => f.id));

  const alerts = generateAlerts(facilities);
  const alertHistory = generateAlertHistory(facilities);
  const violations = generateViolations(facilities, TODAY);

  return (
    <ClientDashboard
      facilities={facilities}
      alerts={alerts}
      alertHistory={alertHistory}
      violations={violations}
      routingPreferences={routingData ?? []}
    />
  );
}
