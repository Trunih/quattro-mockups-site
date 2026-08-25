import Link from "next/link";
import { LEGAL_FOOTER, NAV_LINKS } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div
          style={{
            fontFamily: "var(--font-display), 'Satoshi', sans-serif",
            fontWeight: 900,
            fontSize: 18,
            marginBottom: 14,
          }}
        >
          Quattro
        </div>
        <div className="footer-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <p className="footer-legal">{LEGAL_FOOTER}</p>
      </div>
    </footer>
  );
}
