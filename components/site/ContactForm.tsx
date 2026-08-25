"use client";

import { useState } from "react";
import { CONTACT_SECTION } from "@/lib/content";

type Errors = Partial<Record<"name" | "email", string>>;

/**
 * Visual mockup contact form. It does not transmit anything: submitting swaps
 * in a confirmation so the flow reads as real without implying a live endpoint.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({ name: "", email: "" });

  function validate(field: "name" | "email", value: string): string | undefined {
    if (field === "name" && !value.trim()) return "Please enter your name.";
    if (field === "email") {
      if (!value.trim()) return "Please enter an email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
    }
    return undefined;
  }

  function onBlur(field: "name" | "email") {
    setErrors((e) => ({ ...e, [field]: validate(field, values[field]) }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {
      name: validate("name", values.name),
      email: validate("email", values.email),
    };
    setErrors(next);
    if (next.name || next.email) return;

    setBusy(true);
    // Mockup only: no network call is made.
    window.setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 550);
  }

  if (sent) {
    return (
      <div className="glass-card" role="status">
        <h3 style={{ fontSize: 22, marginBottom: 8 }}>{CONTACT_SECTION.successHeading}</h3>
        <p style={{ fontSize: 14, color: "var(--text-dim)" }}>{CONTACT_SECTION.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <div className="form-full field">
          <label htmlFor="cf-name">Full name</label>
          <input
            id="cf-name"
            type="text"
            placeholder="Jordan Lee"
            value={values.name}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            onBlur={() => onBlur("name")}
          />
          {errors.name && (
            <p className="field-error" id="cf-name-err">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="cf-role">I am a</label>
          <select id="cf-role" defaultValue="">
            <option value="">Select one</option>
            <option value="operator">Facility operator</option>
            <option value="broker">Retail broker</option>
            <option value="wholesaler">Wholesale broker / MGA</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="cf-company">Company / facility name</label>
          <input id="cf-company" type="text" placeholder="Company name" />
        </div>

        <div className="field">
          <label htmlFor="cf-state">State</label>
          <input id="cf-state" type="text" placeholder="e.g. Georgia" />
        </div>

        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            placeholder="name@company.com"
            value={values.email}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            onBlur={() => onBlur("email")}
          />
          {errors.email && (
            <p className="field-error" id="cf-email-err">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-full field">
          <label htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" type="tel" placeholder="Optional" />
        </div>

        <div className="form-full field">
          <label htmlFor="cf-message">What can we help with</label>
          <textarea
            id="cf-message"
            rows={4}
            placeholder="Tell us about your facility, book of business, or coverage question."
          />
        </div>
      </div>

      <button type="submit" className="btn btn-violet" style={{ marginTop: 20 }} disabled={busy}>
        {busy ? "Sending…" : "Send message"}
      </button>
      <p style={{ fontSize: 12, color: "var(--text-dim-2)", marginTop: 14 }}>
        {CONTACT_SECTION.responseNote}
      </p>
    </form>
  );
}
