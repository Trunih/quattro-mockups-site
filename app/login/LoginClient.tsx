"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lens, LensMark } from "@/components/site/Lens";
import { SIGNALS } from "@/lib/content";

type Role = "agent" | "underwriter";

const COPY: Record<Role, { heading: string; sub: string; dest: string }> = {
  agent: {
    heading: "Agent sign in",
    // From reference-content.html's agent login modal.
    sub: "For appointed agents submitting new business to Quattro.",
    dest: "/agent",
  },
  underwriter: {
    heading: "Underwriter sign in",
    sub: "For Quattro underwriting staff reviewing submissions across every agency.",
    dest: "/underwriter",
  },
};

export function LoginClient() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("agent");
  const [busy, setBusy] = useState(false);
  const copy = COPY[role];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    // Prototype only: there is no authentication behind this form.
    router.push(copy.dest);
  }

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <Link href="/" className="wordmark" style={{ position: "relative", zIndex: 1 }}>
          <LensMark size={18} />
          <span>Quattro</span>
        </Link>

        <div style={{ position: "relative", zIndex: 1, margin: "40px 0" }}>
          <Lens size={260} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 380 }}>
          <div className="spectrum" style={{ marginBottom: 18, maxWidth: 180 }} />
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-dim)" }}>{SIGNALS.combine}</p>
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 28 }}>
            <Link href="/" style={{ fontSize: 13, color: "var(--text-dim)" }}>
              &larr; Back to site
            </Link>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="Portal">
            {(["agent", "underwriter"] as Role[]).map((r) => (
              <button
                key={r}
                role="tab"
                aria-selected={role === r}
                className={`auth-tab${role === r ? " is-on" : ""}`}
                onClick={() => setRole(r)}
              >
                {r === "agent" ? "Agent" : "Underwriter"}
              </button>
            ))}
          </div>

          <h1 style={{ fontSize: 28, marginBottom: 10 }}>{copy.heading}</h1>
          <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6, marginBottom: 26 }}>
            {copy.sub}
          </p>

          <div className="banner banner-amber" style={{ marginBottom: 24 }}>
            <span aria-hidden="true">&#9888;</span>
            <span>
              <b>Prototype.</b> This sign-in is not connected to any authentication system. Any
              details continue straight through to the portal, and nothing is stored or sent. Do not
              enter a real password.
            </span>
          </div>

          <form onSubmit={onSubmit}>
            <div className="field" style={{ marginBottom: 18 }}>
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                autoComplete="off"
                placeholder="name@agency.com"
                required
              />
            </div>
            <div className="field" style={{ marginBottom: 24 }}>
              <label htmlFor="login-password">Password</label>
              <input id="login-password" type="password" autoComplete="off" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-violet btn-block" disabled={busy}>
              {busy ? "Signing in…" : `Continue to ${role === "agent" ? "agent" : "underwriter"} portal`}
            </button>
          </form>

          <p style={{ fontSize: 13, color: "var(--text-dim-2)", marginTop: 22, lineHeight: 1.6 }}>
            Not appointed yet?{" "}
            <Link href="/#contact" style={{ color: "var(--violet-text)" }}>
              Request an appointment
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
