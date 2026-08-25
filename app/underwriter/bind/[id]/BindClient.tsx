"use client";

import Link from "next/link";
import { useState } from "react";
import { BackLink } from "@/components/portal/Bits";
import { TextField } from "@/components/wizard/Field";
import type { Submission } from "@/lib/demo-data";

export function BindClient({ submission }: { submission: Submission }) {
  const [agency, setAgency] = useState(submission.agency);
  const [agent, setAgent] = useState(submission.agent);
  const [insuredName, setInsuredName] = useState(submission.facility);
  const [accountNumber, setAccountNumber] = useState("");

  const [hasMortgagee, setHasMortgagee] = useState(false);
  const [mortgageeName, setMortgageeName] = useState("");
  const [mortgageeAddress, setMortgageeAddress] = useState("");
  const [mortgageeLoan, setMortgageeLoan] = useState("");

  const [hasAI, setHasAI] = useState(false);
  const [aiName, setAiName] = useState("");
  const [aiAddress, setAiAddress] = useState("");

  const [busy, setBusy] = useState(false);
  const [policyNumber, setPolicyNumber] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setPolicyNumber(`QTR-GL-${Math.floor(2300 + Math.random() * 400)}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  }

  if (policyNumber) {
    return (
      <div style={{ maxWidth: 560, margin: "40px auto", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              border: "1.5px solid var(--teal)",
              color: "var(--teal)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
            aria-hidden="true"
          >
            &#10003;
          </div>
        </div>
        <h1 style={{ fontSize: 26, marginBottom: 12 }}>Policy bound</h1>
        <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 8 }}>
          {submission.facility} is now bound and in force, billed to {agency}.
        </p>
        <p style={{ fontSize: 14, color: "var(--text-dim-2)", marginBottom: 26 }}>
          Policy number <b style={{ color: "var(--violet-text)" }}>{policyNumber}</b>
        </p>
        <div className="spectrum" style={{ maxWidth: 160, margin: "0 auto 26px" }} />
        <Link href="/underwriter" className="btn btn-violet">
          Back to the queue
        </Link>
        <p className="synthetic-note" style={{ marginTop: 26 }}>
          Prototype only. No policy was actually issued, and no documents were generated.
        </p>
      </div>
    );
  }

  return (
    <>
      <BackLink href={`/underwriter/review/${submission.id}`}>Back to review</BackLink>

      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Bind {submission.facility}</h1>
      <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 28, lineHeight: 1.6 }}>
        Agency billing. Confirm the parties on the policy before issuing.
      </p>

      <form onSubmit={submit}>
        <div className="panel" style={{ marginBottom: 20 }}>
          <div className="panel-head">
            <span style={{ fontSize: 13, fontWeight: 600 }}>Parties</span>
          </div>
          <div className="panel-body">
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <TextField id="bd-agency" label="Agency" value={agency} onChange={setAgency} />
              <TextField id="bd-agent" label="Agent" value={agent} onChange={setAgent} />
              <div className="form-full">
                <TextField
                  id="bd-insured-name"
                  label="Named insured"
                  value={insuredName}
                  onChange={setInsuredName}
                />
              </div>
              <TextField
                id="bd-account-number"
                label="Agency account number"
                value={accountNumber}
                onChange={setAccountNumber}
                placeholder="For agency billing"
              />
            </div>
          </div>
        </div>

        <div className="panel" style={{ marginBottom: 20 }}>
          <div className="panel-head">
            <span style={{ fontSize: 13, fontWeight: 600 }}>Mortgagee / lienholder</span>
            <label style={{ display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
              <input
                id="bd-mortgagee-toggle"
                type="checkbox"
                style={{ width: "auto" }}
                checked={hasMortgagee}
                onChange={(e) => setHasMortgagee(e.target.checked)}
              />
              <span style={{ fontSize: 12, textTransform: "none", fontWeight: 500 }}>Add one</span>
            </label>
          </div>
          {hasMortgagee && (
            <div className="panel-body">
              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <TextField
                  id="bd-mortgagee-name"
                  label="Mortgagee name"
                  value={mortgageeName}
                  onChange={setMortgageeName}
                />
                <TextField
                  id="bd-mortgagee-loan"
                  label="Loan number"
                  value={mortgageeLoan}
                  onChange={setMortgageeLoan}
                />
                <div className="form-full">
                  <TextField
                    id="bd-mortgagee-address"
                    label="Mortgagee address"
                    value={mortgageeAddress}
                    onChange={setMortgageeAddress}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="panel" style={{ marginBottom: 20 }}>
          <div className="panel-head">
            <span style={{ fontSize: 13, fontWeight: 600 }}>Additional insured</span>
            <label style={{ display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
              <input
                id="bd-ai-toggle"
                type="checkbox"
                style={{ width: "auto" }}
                checked={hasAI}
                onChange={(e) => setHasAI(e.target.checked)}
              />
              <span style={{ fontSize: 12, textTransform: "none", fontWeight: 500 }}>Add one</span>
            </label>
          </div>
          {hasAI && (
            <div className="panel-body">
              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <TextField id="bd-ai-name" label="Additional insured name" value={aiName} onChange={setAiName} />
                <TextField id="bd-ai-address" label="Address" value={aiAddress} onChange={setAiAddress} />
              </div>
            </div>
          )}
        </div>

        <div className="wiz-actions">
          <Link href={`/underwriter/review/${submission.id}`} className="btn btn-out">
            Cancel
          </Link>
          <button type="submit" className="btn btn-teal" disabled={busy || !insuredName.trim()}>
            {busy ? "Binding…" : "Issue policy"}
          </button>
        </div>
      </form>
    </>
  );
}
