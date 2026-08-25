"use client";

import Link from "next/link";
import { useState } from "react";
import { SelectField, TextAreaField, TextField } from "@/components/wizard/Field";
import { ENDORSEMENT_TYPES, type Policy } from "@/lib/demo-data";

export function EndorseForm({ policy }: { policy: Policy }) {
  const [type, setType] = useState("");
  const [effective, setEffective] = useState("");
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setRef(`REQ-${Math.floor(800 + Math.random() * 200)}`);
    }, 600);
  }

  if (ref) {
    return (
      <div className="panel">
        <div className="panel-body" style={{ textAlign: "center", padding: 40 }}>
          <h2 style={{ fontSize: 22, marginBottom: 10 }}>Endorsement request sent</h2>
          <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 6, lineHeight: 1.6 }}>
            Underwriting will review the change and follow up if anything is needed.
          </p>
          <p style={{ fontSize: 14, color: "var(--text-dim-2)", marginBottom: 22 }}>
            Reference <b style={{ color: "var(--violet-text)" }}>{ref}</b>
          </p>
          <Link href={`/agent/policy/${policy.id}`} className="btn btn-violet">
            Back to policy
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <SelectField
          id="end-type"
          label="Type of change"
          value={type}
          onChange={setType}
          options={ENDORSEMENT_TYPES}
        />
        <TextField
          id="end-effective"
          label="Requested effective date"
          type="date"
          value={effective}
          onChange={setEffective}
        />
      </div>
      <div style={{ marginTop: 18 }}>
        <TextAreaField
          id="end-details"
          label="Describe the change"
          rows={4}
          value={details}
          onChange={setDetails}
          placeholder="What should change, and why."
        />
      </div>
      <div className="wiz-actions">
        <Link href={`/agent/policy/${policy.id}`} className="btn btn-out">
          Cancel
        </Link>
        <button type="submit" className="btn btn-violet" disabled={busy || !type || !details.trim()}>
          {busy ? "Sending…" : "Send request"}
        </button>
      </div>
    </form>
  );
}
