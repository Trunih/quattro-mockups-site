/**
 * Seeds the synthetic capacity-provider book's bound facilities into
 * public.facilities, flagged in_capacity_provider_book = true, so the
 * Capacity Provider's read-only facility drill-down
 * (app/capacity-provider/facility/[id]/page.tsx) has a real row + RLS
 * subject to query for each one, and so routing_preferences' foreign key
 * has something to reference if that's ever extended to this book.
 *
 * The book itself (lib/dashboard/capacity-provider-data.ts) is generated
 * from a fixed seed and doesn't depend on `today`, so the set of bound
 * facilities — their ids, names, states, types, beds, risk tiers — is
 * stable. This script is idempotent (upsert on id) and safe to re-run;
 * re-run it if buildCapacityProviderData's generation logic ever changes
 * (different TOTAL_SUBMISSIONS, bind-ratio cutoffs, etc.), since that would
 * change which facilities are bound.
 *
 * Run with: npx tsx scripts/seed-capacity-facilities.ts
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { buildCapacityProviderData } from "../lib/dashboard/capacity-provider-data";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TODAY = new Date("2026-08-29");

async function main() {
  const data = buildCapacityProviderData(TODAY);

  const rows = data.boundFacilities.map((f) => ({
    id: f.id,
    name: f.name,
    state: f.cityState,
    type: f.type,
    beds: f.beds,
    risk_tier: f.riskTier,
    in_capacity_provider_book: true,
  }));

  const { error } = await supabase.from("facilities").upsert(rows, { onConflict: "id" });
  if (error) throw error;

  console.log(`Seeded ${rows.length} capacity-provider book facilities into public.facilities.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
