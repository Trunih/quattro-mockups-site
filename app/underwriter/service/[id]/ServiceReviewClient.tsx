"use client";

import Link from "next/link";
import { useState } from "react";
import { BackLink } from "@/components/portal/Bits";
import { SelectField, TextAreaField, TextField } from "@/components/wizard/Field";
import type { ServiceRequest } from "@/lib/demo-data";

const ENDORSEMENT_DECISIONS = ["Approve as requested", "Approve with changes", "Decline"];
const CANCELLATION_DECISIONS = ["Accept, return premium due", "Accept, fully earned", "Decline"];

export function ServiceReviewClient({ request }: { request: ServiceRequest }) {
  const isEndorsement = request.type === "Endorsement";
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [premium, setPremium] = useState("");
  const [decision, setDecision] = useState("");
  const [returnPremium, setReturnPremium] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 650);
  }

  if (done) {
    return (
      <div style={{ maxWidth: 560, margin: "40px auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 26, marginBottom: 12 }}>Decision recorded</h1>
        <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 26 }}>
          {request.facility}&apos;s {request.type.toLowerCase()} request has been updated and the
          agent notified.
        </p>
        <Link href="/underwriter" className="btn btn-violet">
          Back to the queue
        </Link>
        <p className="synthetic-note" style={{ marginTop: 24 }}>
          Prototype only. No agent was actually notified.
        </p>
      </div>
    );
  }

  const decisionOptions = isEndorsement ? ENDORSEMENT_DECISIONS : CANCELLATION_DECISIONS;
  const isDecline = decision === "Decline";
  const isCancelAccept = !isEndorsement && decision.startsWith("Accept");

  return (
    <>
      <BackLink href="/underwriter">Back to underwriting queue</BackLink>

      <header className="uw-head">
        <div>
          <h1>{request.facility}</h1>
          <div className="uw-meta">
            <span className="mono-num">{request.policyNumber}</span>
            <span>{request.agency}, {request.agent}</span>
            <span>Submitted {request.submitted}</span>
          </div>
        </div>
        <span className={`pill ${isEndorsement ? "pill-quoted" : "pill-declined"}`}>
          {request.type}
        </span>
      </header>

      <form onSubmit={submit}>
        {isEndorsement ? (
          <div className="panel" style={{ marginBottom: 24 }}>
            <div className="panel-head">
              <span style={{ fontSize: 13, fontWeight: 600 }}>Requested change</span>
            </div>
            <div className="panel-body">
              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <TextField
                  id="end-old-value"
                  label="Current value"
                  value={oldValue}
                  onChange={setOldValue}
                  placeholder="What the policy currently shows"
                />
                <TextField
                  id="end-new-value"
                  label="New value"
                  value={newValue}
                  onChange={setNewValue}
                  placeholder="What it should change to"
                />
                <TextField
                  id="end-premium"
                  label="Premium adjustment"
                  value={premium}
                  onChange={setPremium}
                  placeholder="e.g. +$4,200 or no change"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="banner banner-amber" style={{ marginBottom: 24 }}>
            <span aria-hidden="true">&#9888;</span>
            <span>
              Accepting this request ends coverage on {request.policyNumber}. Confirm the return
              premium before finalizing.
            </span>
          </div>
        )}

        <div className="panel">
          <div className="panel-head">
            <span style={{ fontSize: 13, fontWeight: 600 }}>Decision</span>
          </div>
          <div className="panel-body">
            <SelectField
              id="can-decision"
              label="Decision"
              value={decision}
              onChange={setDecision}
              options={decisionOptions}
            />

            {isCancelAccept && (
              <div style={{ marginTop: 18 }}>
                <TextField
                  id="can-return-premium"
                  label="Return premium"
                  value={returnPremium}
                  onChange={setReturnPremium}
                  placeholder="$0"
                />
              </div>
            )}

            {isDecline && (
              <div style={{ marginTop: 18 }}>
                <TextAreaField
                  id="can-decline-reason"
                  label="Reason for declining"
                  rows={3}
                  value={declineReason}
                  onChange={setDeclineReason}
                />
              </div>
            )}
          </div>
        </div>

        <div className="wiz-actions">
          <Link href="/underwriter" className="btn btn-out">
            Cancel
          </Link>
          <button type="submit" className="btn btn-violet" disabled={busy || !decision}>
            {busy ? "Saving…" : "Confirm decision"}
          </button>
        </div>
      </form>
    </>
  );
}
