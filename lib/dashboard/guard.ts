import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Server-side role guard. Runs in a Server Component, so it can't be
 * bypassed from the browser — this is the real access-control check, not a
 * client-side redirect that a user could race or disable JS to skip.
 */
export async function requireRole(role: "client" | "capacity_provider") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase.from("profiles").select("role, email").eq("id", user.id).single();

  if (!profile || profile.role !== role) {
    redirect("/login");
  }

  return { userId: user.id, email: profile.email as string };
}
