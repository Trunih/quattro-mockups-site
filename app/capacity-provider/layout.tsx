import { PortalShell } from "@/components/portal/PortalShell";
import { requireRole } from "@/lib/dashboard/guard";

export default async function CapacityProviderLayout({ children }: { children: React.ReactNode }) {
  const { email } = await requireRole("capacity_provider");

  return (
    <PortalShell role="capacity_provider" email={email}>
      {children}
    </PortalShell>
  );
}
