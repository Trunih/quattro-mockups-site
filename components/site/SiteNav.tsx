"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { LensMark } from "./Lens";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav className="site-nav">
        <div className="wrap site-nav-inner">
          <Link href="/" className="wordmark" aria-label="Quattro home">
            <LensMark size={18} />
            <span>Quattro</span>
          </Link>

          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <Link href="/login" className="nav-signin">
              Sign in
            </Link>
            <Link href="/#contact" className="btn btn-violet btn-sm nav-cta">
              Get in touch
            </Link>
            <button
              className="burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={open ? "is-x" : ""} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="mobile-panel">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="spectrum-soft" style={{ margin: "8px 0" }} />
          <Link href="/login" onClick={() => setOpen(false)}>
            Sign in
          </Link>
          <Link
            href="/#contact"
            className="btn btn-violet"
            style={{ marginTop: 8, alignSelf: "flex-start" }}
            onClick={() => setOpen(false)}
          >
            Get in touch
          </Link>
        </div>
      )}
    </>
  );
}
