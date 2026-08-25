"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LensMark } from "@/components/site/Lens";
import { SYNTHETIC_NOTE } from "@/lib/demo-data";

type Props = {
  role: "agent" | "underwriter";
  who: { name: string; email: string };
  links: { href: string; label: string }[];
  children: React.ReactNode;
};

export function PortalShell({ role, who, links, children }: Props) {
  const pathname = usePathname();

  return (
    <div className="portal-shell">
      <header className="portal-nav">
        <div className="wrap-wide portal-nav-inner">
          <Link href="/" className="wordmark" style={{ fontSize: 17 }} aria-label="Quattro home">
            <LensMark size={16} />
            <span>Quattro</span>
          </Link>

          <span className={`role-badge is-${role === "agent" ? "agent" : "uw"}`}>
            {role === "agent" ? "Agent portal" : "Underwriter portal"}
          </span>

          <nav className="portal-links" aria-label="Portal">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link key={l.href} href={l.href} className={active ? "is-active" : undefined}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="portal-spacer" />

          <div className="portal-who">
            <div className="n">{who.name}</div>
            <div className="e">{who.email}</div>
          </div>

          <Link href="/" className="btn btn-out btn-xs">
            Sign out
          </Link>
        </div>
      </header>

      <div className="spectrum-soft" />

      <main className="portal-main">
        <div className="wrap-wide">{children}</div>
      </main>

      <footer className="portal-foot">
        <div className="wrap-wide">
          <p>{SYNTHETIC_NOTE}</p>
        </div>
      </footer>
    </div>
  );
}
