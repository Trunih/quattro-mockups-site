import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client, using the secret key. Bypasses Row Level Security
 * entirely — server-only, never import this from a Client Component or
 * anything that ships to the browser. Used for user-provisioning scripts and
 * any operation that must act outside a specific user's own access scope.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
