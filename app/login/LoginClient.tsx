"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { LensMark } from "@/components/site/Lens";
import { signIn, type SignInState } from "./actions";

type Role = "client" | "capacity_provider";

const COPY: Record<Role, { heading: string; sub: string }> = {
  client: {
    heading: "Client sign in",
    sub: "For facility operators viewing their own risk and safety dashboard.",
  },
  capacity_provider: {
    heading: "Capacity Provider sign in",
    sub: "For reinsurance and fronting capacity partners backing the Quattro program.",
  },
};

const initialState: SignInState = { error: null };

export function LoginClient() {
  const [role, setRole] = useState<Role>("client");
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const copy = COPY[role];

  return (
    <div className="auth-shell">
      <aside className="auth-aside">
        <Link href="/" className="wordmark" style={{ position: "relative", zIndex: 1 }}>
          <LensMark size={18} />
          <span>Quattro</span>
        </Link>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 380 }}>
          <div className="spectrum" style={{ marginBottom: 18, maxWidth: 180 }} />
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(247,243,233,0.8)" }}>
            One platform login, one shared entry point. Your account&apos;s role determines which
            dashboard you land on.
          </p>
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 28 }}>
            <Link href="/" style={{ fontSize: 13, color: "var(--ink-soft)" }}>
              &larr; Back to site
            </Link>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="Account type">
            {(["client", "capacity_provider"] as Role[]).map((r) => (
              <button
                key={r}
                role="tab"
                type="button"
                aria-selected={role === r}
                className={`auth-tab${role === r ? " is-on" : ""}`}
                onClick={() => setRole(r)}
              >
                {r === "client" ? "Client" : "Capacity Provider"}
              </button>
            ))}
          </div>

          <h1 style={{ fontSize: 28, marginBottom: 10 }}>{copy.heading}</h1>
          <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 26 }}>
            {copy.sub}
          </p>

          <form action={formAction}>
            <div className="field" style={{ marginBottom: 18 }}>
              <label htmlFor="login-email">Email</label>
              <input id="login-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            </div>
            <div className="field" style={{ marginBottom: 12 }}>
              <label htmlFor="login-password">Password</label>
              <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" required />
            </div>

            {state.error && (
              <div className="banner banner-danger" style={{ marginBottom: 18 }} role="alert">
                <span aria-hidden="true">&#9888;</span>
                <span>{state.error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-violet btn-block" disabled={pending}>
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p style={{ fontSize: 13, color: "var(--ink-dim)", marginTop: 22, lineHeight: 1.6 }}>
            Accounts are provisioned by Quattro. Contact your representative if you need access.
          </p>
        </div>
      </main>
    </div>
  );
}
