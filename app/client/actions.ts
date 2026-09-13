"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type RoutingRow = { alertType: string; contactName: string; contactPhone: string };

/**
 * Persists routing preferences for one facility. Uses the signed-in user's
 * own session (not the admin client), so Postgres RLS enforces that this can
 * only touch facilities the user is actually linked to via user_facilities
 * — real server-side access control, not just a client that happens not to
 * show the option.
 */
export async function saveRoutingPreferences(facilityId: string, rows: RoutingRow[]) {
  const supabase = await createClient();

  const payload = rows.map((r) => ({
    facility_id: facilityId,
    alert_type: r.alertType,
    contact_name: r.contactName,
    contact_phone: r.contactPhone,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("routing_preferences")
    .upsert(payload, { onConflict: "facility_id,alert_type" });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/client");
  return { ok: true };
}
