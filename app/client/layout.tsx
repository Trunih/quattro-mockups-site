import { PortalShell } from "@/components/portal/PortalShell";
import { requireRole } from "@/lib/dashboard/guard";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const { email } = await requireRole("client");

  return (
    <PortalShell role="client" email={email}>
      {children}
    </PortalShell>
  );
}
