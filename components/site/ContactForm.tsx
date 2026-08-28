"use client";

import { useState } from "react";
import { CONTACT_SECTION } from "@/lib/content";

type Values = {
  name: string;
  role: string;
  company: string;
  state: string;
  email: string;
  phone: string;
  message: string;
};

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMPTY_VALUES: Values = {
  name: "",
  role: "",
  company: "",
  state: "",
  email: "",
  phone: "",
  message: "",
};

/** Live contact form. Submits to /api/contact, which sends the message by email. */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [values, setValues] = useState<Values>(EMPTY_VALUES);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(field: "name" | "email" | "message", value: string): string | undefined {
    if (field === "name" && !value.trim()) return "Please enter your name.";
    if (field === "email") {
      if (!value.trim()) return "Please enter an email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
    }
    if (field === "message" && !value.trim()) return "Please let us know what you need.";
    return undefined;
  }

  function onBlur(field: "name" | "email" | "message") {
    setErrors((e) => ({ ...e, [field]: validate(field, values[field]) }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const next: Errors = {
      name: validate("name", values.name),
      email: validate("email", values.email),
      message: validate("message", values.message),
    };
    setErrors(next);
    if (next.name || next.email || next.message) return;

    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        setSent(true);
      } else {
        setSubmitError(data.error || "Something went wrong sending your message. Please try again.");
      }
    } catch {
      setSubmitError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
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
            onChange={(e) => set("name", e.target.value)}
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
          <select id="cf-role" value={values.role} onChange={(e) => set("role", e.target.value)}>
            <option value="">Select one</option>
            <option value="Facility operator">Facility operator</option>
            <option value="Retail broker">Retail broker</option>
            <option value="Wholesale broker / MGA">Wholesale broker / MGA</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="cf-company">Company / facility name</label>
          <input
            id="cf-company"
            type="text"
            placeholder="Company name"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="cf-state">State</label>
          <input
            id="cf-state"
            type="text"
            placeholder="e.g. Georgia"
            value={values.state}
            onChange={(e) => set("state", e.target.value)}
          />
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
            onChange={(e) => set("email", e.target.value)}
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
          <input
            id="cf-phone"
            type="tel"
            placeholder="Optional"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>

        <div className="form-full field">
          <label htmlFor="cf-message">What can we help with</label>
          <textarea
            id="cf-message"
            rows={4}
            placeholder="Tell us about your facility, book of business, or coverage question."
            value={values.message}
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? "cf-message-err" : undefined}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => onBlur("message")}
          />
          {errors.message && (
            <p className="field-error" id="cf-message-err">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {submitError && (
        <div className="banner banner-danger" style={{ marginTop: 20 }} role="alert">
          <span aria-hidden="true">&#9888;</span>
          <span>{submitError}</span>
        </div>
      )}

      <button type="submit" className="btn btn-violet" style={{ marginTop: 20 }} disabled={busy}>
        {busy ? "Sending…" : "Send message"}
      </button>
      <p style={{ fontSize: 12, color: "var(--text-dim-2)", marginTop: 14 }}>
        {CONTACT_SECTION.responseNote}
      </p>
    </form>
  );
}
