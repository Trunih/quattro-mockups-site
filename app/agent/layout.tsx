import { PortalShell } from "@/components/portal/PortalShell";
import { DEMO_AGENT } from "@/lib/demo-data";

const LINKS = [
  { href: "/agent", label: "My book" },
  { href: "/agent/quote", label: "New quote" },
];

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell role="agent" who={DEMO_AGENT} links={LINKS}>
      {children}
    </PortalShell>
  );
}
