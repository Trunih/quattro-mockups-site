"use client";

import Link from "next/link";
import { useState } from "react";
import { SelectField, TextAreaField, TextField } from "@/components/wizard/Field";
import { CANCELLATION_REASONS, type Policy } from "@/lib/demo-data";

export function CancelForm({ policy }: { policy: Policy }) {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
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
          <h2 style={{ fontSize: 22, marginBottom: 10 }}>Cancellation request sent</h2>
          <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 6, lineHeight: 1.6 }}>
            Underwriting will confirm the cancellation and any return premium.
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
      <div className="banner banner-amber" style={{ marginBottom: 22 }}>
        <span aria-hidden="true">&#9888;</span>
        <span>
          Cancelling ends coverage on this policy. Underwriting reviews every cancellation request
          before it takes effect.
        </span>
      </div>

      <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <TextField id="can-date" label="Requested cancellation date" type="date" value={date} onChange={setDate} />
        <SelectField
          id="can-reason"
          label="Reason"
          value={reason}
          onChange={setReason}
          options={CANCELLATION_REASONS}
        />
      </div>
      <div style={{ marginTop: 18 }}>
        <TextAreaField
          id="can-notes"
          label="Anything else underwriting should know"
          rows={3}
          value={notes}
          onChange={setNotes}
        />
      </div>
      <div className="wiz-actions">
        <Link href={`/agent/policy/${policy.id}`} className="btn btn-out">
          Keep policy
        </Link>
        <button type="submit" className="btn btn-danger" disabled={busy || !date || !reason}>
          {busy ? "Sending…" : "Send cancellation request"}
        </button>
      </div>
    </form>
  );
}
