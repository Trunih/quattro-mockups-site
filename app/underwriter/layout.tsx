import { PortalShell } from "@/components/portal/PortalShell";
import { DEMO_UNDERWRITER } from "@/lib/demo-data";

const LINKS = [{ href: "/underwriter", label: "Queue" }];

export default function UnderwriterLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell role="underwriter" who={DEMO_UNDERWRITER} links={LINKS}>
      {children}
    </PortalShell>
  );
}
