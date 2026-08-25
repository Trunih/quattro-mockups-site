"use client";

import Link from "next/link";
import { useState } from "react";
import { TextAreaField, TextField } from "@/components/wizard/Field";

/** Fields mirror screen-manual-multi in reference-content.html. */
export function PortfolioForm() {
  const [v, setV] = useState({
    name: "",
    count: "",
    states: "",
    beds: "",
    effective: "",
    losses: "",
    notes: "",
  });
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  const set = (k: keyof typeof v) => (val: string) => setV((p) => ({ ...p, [k]: val }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setRef(`SUB-${Math.floor(4500 + Math.random() * 400)}`);
    }, 650);
  }

  if (ref) {
    return (
      <div className="panel">
        <div className="panel-body" style={{ textAlign: "center", padding: 40 }}>
          <h2 style={{ fontSize: 24, marginBottom: 10 }}>Portfolio submitted</h2>
          <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 6, lineHeight: 1.6 }}>
            Underwriting will come back with the per-location detail they need.
          </p>
          <p style={{ fontSize: 14, color: "var(--text-dim-2)", marginBottom: 24 }}>
            Reference <b style={{ color: "var(--violet-text)" }}>{ref}</b>
          </p>
          <Link href="/agent" className="btn btn-violet">
            Back to my book
          </Link>
          <p className="synthetic-note" style={{ marginTop: 22 }}>
            Prototype only. Nothing was transmitted or stored.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="form-full">
          <TextField id="mm-name" label="Program or group name" value={v.name} onChange={set("name")} />
        </div>
        <TextField
          id="mm-count"
          label="Number of locations"
          type="number"
          value={v.count}
          onChange={set("count")}
        />
        <TextField
          id="mm-beds"
          label="Total beds / units across the program"
          type="number"
          value={v.beds}
          onChange={set("beds")}
        />
        <TextField
          id="mm-states"
          label="States covered"
          value={v.states}
          onChange={set("states")}
          placeholder="e.g. GA, FL, NC"
        />
        <TextField
          id="mm-effective"
          label="Requested effective date"
          type="date"
          value={v.effective}
          onChange={set("effective")}
        />
      </div>

      <div style={{ marginTop: 18 }}>
        <TextAreaField
          id="mm-losses"
          label="Loss summary"
          rows={3}
          value={v.losses}
          onChange={set("losses")}
          placeholder="Claims of note across the program in the past 5 years."
        />
      </div>

      <div style={{ marginTop: 18 }}>
        <TextAreaField
          id="mm-notes"
          label="Anything else underwriting should know"
          rows={3}
          value={v.notes}
          onChange={set("notes")}
        />
      </div>

      <div className="wiz-actions">
        <Link href="/agent/quote" className="btn btn-out">
          Cancel
        </Link>
        <button type="submit" className="btn btn-violet" disabled={busy || !v.name}>
          {busy ? "Submitting…" : "Submit portfolio"}
        </button>
      </div>
    </form>
  );
}
