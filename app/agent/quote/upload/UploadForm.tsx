"use client";

import Link from "next/link";
import { useState } from "react";
import { TextAreaField, TextField } from "@/components/wizard/Field";

export function UploadForm({ isMulti }: { isMulti: boolean }) {
  const [files, setFiles] = useState<string[]>([]);
  const [sov, setSov] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  function pick(e: React.ChangeEvent<HTMLInputElement>, to: (v: string[]) => void) {
    const list = Array.from(e.target.files ?? []).map((f) => f.name);
    to(list);
  }

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
          <h2 style={{ fontSize: 24, marginBottom: 10 }}>Application received</h2>
          <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 6, lineHeight: 1.6 }}>
            Underwriting will review what you sent and follow up if anything is missing.
          </p>
          <p style={{ fontSize: 14, color: "var(--text-dim-2)", marginBottom: 24 }}>
            Reference <b style={{ color: "var(--violet-text)" }}>{ref}</b>
          </p>
          <Link href="/agent" className="btn btn-violet">
            Back to my book
          </Link>
          <p className="synthetic-note" style={{ marginTop: 22 }}>
            Prototype only. No file was uploaded, stored, or transmitted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      {isMulti && (
        <div className="field" style={{ marginBottom: 20 }}>
          <label htmlFor="um-sov">Statement of values</label>
          <label className="file-drop" htmlFor="um-sov">
            <input id="um-sov" type="file" onChange={(e) => pick(e, setSov)} />
            <span style={{ fontSize: 14, color: "var(--off)", fontWeight: 600 }}>
              {sov.length ? sov.join(", ") : "Choose a file"}
            </span>
            <span style={{ display: "block", fontSize: 12, color: "var(--text-dim-2)", marginTop: 6 }}>
              Spreadsheet listing each location, beds, and values.
            </span>
          </label>
        </div>
      )}

      <div className="field" style={{ marginBottom: 20 }}>
        <label htmlFor="us-application">
          {isMulti ? "Completed applications" : "Completed application"}
        </label>
        <label className="file-drop" htmlFor="us-application">
          <input
            id="us-application"
            type="file"
            multiple={isMulti}
            onChange={(e) => pick(e, setFiles)}
          />
          <span style={{ fontSize: 14, color: "var(--off)", fontWeight: 600 }}>
            {files.length ? files.join(", ") : "Choose a file"}
          </span>
          <span style={{ display: "block", fontSize: 12, color: "var(--text-dim-2)", marginTop: 6 }}>
            PDF or scanned application. Loss runs help if you have them.
          </span>
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
        <TextField
          id="um-name"
          label={isMulti ? "Program or group name" : "Facility name"}
          value={name}
          onChange={setName}
        />
      </div>

      <TextAreaField
        id="us-notes"
        label="Anything else underwriting should know"
        rows={4}
        value={notes}
        onChange={setNotes}
      />

      <div className="wiz-actions">
        <Link href="/agent/quote" className="btn btn-out">
          Cancel
        </Link>
        <button type="submit" className="btn btn-violet" disabled={busy || files.length === 0}>
          {busy ? "Sending…" : "Send to underwriting"}
        </button>
      </div>
    </form>
  );
}
