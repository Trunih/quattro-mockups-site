"use client";

import Link from "next/link";
import { useState } from "react";
import { BackLink, StatusPill } from "@/components/portal/Bits";
import { SelectField, TextAreaField, TextField } from "@/components/wizard/Field";
import {
  COVERAGE_REQUESTED,
  PREMIUM_COMPARISON,
  PREMIUM_COMPARISON_NOTE,
  REVIEW_PANELS,
  type Submission,
} from "@/lib/demo-data";

type Decision = "accept" | "decline" | "info" | null;

const AB_TERMS = ["Full limits, no sublimit (standard)", "Sublimit", "Explicitly excluded"];
const PL_FORM = ["Claims-made and reported", "Occurrence"];

/** Small signal sparkline, matching the marketing portal teaser's language. */
function SignalMark({ kind }: { kind: "line" | "bars" | "doc" | "site" }) {
  if (kind === "line") {
    return (
      <svg width="72" height="26" viewBox="0 0 72 26" aria-hidden="true" className="mark">
        <polyline
          points="0,20 10,18 20,22 30,8 40,16 50,20 60,6 72,17"
          fill="none"
          stroke="#2BC4B0"
          strokeWidth="1.8"
        />
      </svg>
    );
  }
  if (kind === "bars") {
    return (
      <svg width="72" height="26" viewBox="0 0 72 26" aria-hidden="true" className="mark">
        {[
          [0, 10, 16],
          [12, 3, 23],
          [24, 13, 13],
          [36, 0, 26],
          [48, 9, 17],
          [60, 15, 11],
        ].map(([x, y, h]) => (
          <rect key={x} x={x} y={y} width="7" height={h} fill="#6C4FE0" />
        ))}
      </svg>
    );
  }
  if (kind === "doc") {
    return (
      <svg width="72" height="26" viewBox="0 0 72 26" aria-hidden="true" className="mark">
        {[0, 7, 14, 21].map((y, i) => (
          <rect key={y} x="0" y={y} width={[46, 60, 34, 52][i]} height="3" rx="1.5" fill="#9393A8" />
        ))}
      </svg>
    );
  }
  return (
    <svg width="72" height="26" viewBox="0 0 72 26" aria-hidden="true" className="mark">
      <rect x="0" y="6" width="20" height="20" fill="none" stroke="#9393A8" strokeWidth="1.6" />
      <rect x="26" y="0" width="20" height="26" fill="none" stroke="#9393A8" strokeWidth="1.6" />
      <rect x="52" y="10" width="20" height="16" fill="none" stroke="#9393A8" strokeWidth="1.6" />
    </svg>
  );
}

const MARK_BY_KEY: Record<string, "line" | "bars" | "doc" | "site"> = {
  application: "doc",
  inspection: "site",
  documentation: "line",
  activity: "bars",
};

export function ReviewClient({ submission }: { submission: Submission }) {
  const [decision, setDecision] = useState<Decision>(null);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [terms, setTerms] = useState({
    glOcc: "$1,000,000",
    glAgg: "$2,000,000",
    plOcc: "$1,000,000",
    plAgg: "$3,000,000",
    plForm: "",
    retro: "",
    abTerms: AB_TERMS[0],
    abSublimit: "",
    samTerms: AB_TERMS[0],
    samSublimit: "",
    sir: "",
    premium: "",
    notes: "",
  });
  const [declineReason, setDeclineReason] = useState("");
  const [infoText, setInfoText] = useState("");

  const setT = (k: keyof typeof terms) => (v: string) => setTerms((p) => ({ ...p, [k]: v }));

  function act(label: string) {
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setDone(label);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  }

  if (done) {
    return (
      <div style={{ maxWidth: 560, margin: "40px auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 26, marginBottom: 12 }}>{done}</h1>
        <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 26 }}>
          {submission.facility} has been updated and the submitting agent notified.
        </p>
        <div className="spectrum" style={{ maxWidth: 140, margin: "0 auto 26px" }} />
        <Link href="/underwriter" className="btn btn-violet">
          Back to the queue
        </Link>
        <p className="synthetic-note" style={{ marginTop: 24 }}>
          Prototype only. No quote was issued and no notification was sent.
        </p>
      </div>
    );
  }

  return (
    <>
      <BackLink href="/underwriter">Back to underwriting queue</BackLink>

      <header className="uw-head">
        <div>
          <h1>{submission.facility}</h1>
          <div className="uw-meta">
            <span>{submission.state}</span>
            <span>{submission.beds} beds</span>
            <span>{submission.levels}</span>
            <span>
              {submission.agency}, {submission.agent}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <StatusPill status={submission.status} />
          <span style={{ fontSize: 13, color: "var(--text-dim-2)" }}>
            Submitted {submission.submitted}
          </span>
        </div>
      </header>

      <div className="uw-cols">
        <section className="panel">
          <div className="panel-head">
            <span style={{ fontSize: 13, fontWeight: 600 }}>Coverage requested</span>
          </div>
          <div className="panel-body" style={{ paddingTop: 4, paddingBottom: 8 }}>
            {COVERAGE_REQUESTED.map((c) => (
              <div className="kv-row" key={c.label}>
                <span className="k">{c.label}</span>
                <span className={`v${c.value.startsWith("Full limits") ? " hl" : ""}`}>{c.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <span style={{ fontSize: 13, fontWeight: 600 }}>Premium comparison</span>
          </div>
          <div className="panel-body" style={{ paddingTop: 4 }}>
            {PREMIUM_COMPARISON.map((c) => (
              <div className="kv-row" key={c.label}>
                <span className="k">{c.label}</span>
                <span className="v">{c.value}</span>
              </div>
            ))}
            <p className="synthetic-note" style={{ marginTop: 14 }}>
              {PREMIUM_COMPARISON_NOTE}
            </p>
          </div>
        </section>
      </div>

      <h2 className="section-label">Underwriting analysis</h2>
      <div className="analysis-grid">
        {REVIEW_PANELS.map((p) => (
          <button
            key={p.key}
            className="analysis-tile"
            onClick={() => setOpenPanel(openPanel === p.key ? null : p.key)}
            aria-expanded={openPanel === p.key}
          >
            <SignalMark kind={MARK_BY_KEY[p.key]} />
            <div className="t">{p.title}</div>
            <div className="s">{p.sub}</div>
          </button>
        ))}
      </div>

      {openPanel && (
        <div className="banner banner-violet" style={{ marginTop: 16 }}>
          <span aria-hidden="true">&#9432;</span>
          <span>
            <b>{REVIEW_PANELS.find((p) => p.key === openPanel)?.title}.</b> The detailed view for
            this panel is not built in this prototype. In the live portal it opens the underlying
            review for this facility over the 90-day window.
          </span>
        </div>
      )}

      <h2 className="section-label">Decision</h2>
      <div className="decision-tabs" role="group" aria-label="Underwriting decision">
        <button
          className={`decision-tab${decision === "accept" ? " on-accept" : ""}`}
          onClick={() => setDecision(decision === "accept" ? null : "accept")}
        >
          Accept risk
        </button>
        <button
          className={`decision-tab${decision === "decline" ? " on-decline" : ""}`}
          onClick={() => setDecision(decision === "decline" ? null : "decline")}
        >
          Decline risk
        </button>
        <button
          className={`decision-tab${decision === "info" ? " on-info" : ""}`}
          onClick={() => setDecision(decision === "info" ? null : "info")}
        >
          Request additional data
        </button>
      </div>

      {decision === "accept" && (
        <div className="panel">
          <div className="panel-head">
            <span style={{ fontSize: 13, fontWeight: 600 }}>Coverage terms</span>
          </div>
          <div className="panel-body">
            <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <TextField id="quote-gl-occ" label="GL per occurrence" value={terms.glOcc} onChange={setT("glOcc")} />
              <TextField id="quote-gl-agg" label="GL aggregate" value={terms.glAgg} onChange={setT("glAgg")} />
              <TextField id="quote-pl-occ" label="PL per medical incident" value={terms.plOcc} onChange={setT("plOcc")} />
              <TextField id="quote-pl-agg" label="PL aggregate" value={terms.plAgg} onChange={setT("plAgg")} />
              <SelectField
                id="quote-pl-form"
                label="Professional liability policy form"
                value={terms.plForm}
                onChange={setT("plForm")}
                options={PL_FORM}
              />
              {terms.plForm === "Claims-made and reported" && (
                <TextField
                  id="quote-retro-date"
                  label="Retroactive date"
                  type="date"
                  value={terms.retro}
                  onChange={setT("retro")}
                />
              )}
              <SelectField
                id="quote-ab-terms"
                label="Assault &amp; battery terms"
                value={terms.abTerms}
                onChange={setT("abTerms")}
                options={AB_TERMS}
                placeholder="Select one"
              />
              {terms.abTerms === "Sublimit" && (
                <TextField
                  id="quote-ab-sublimit"
                  label="A&amp;B sublimit"
                  value={terms.abSublimit}
                  onChange={setT("abSublimit")}
                />
              )}
              <SelectField
                id="quote-sam-terms"
                label="Sexual abuse / molestation terms"
                value={terms.samTerms}
                onChange={setT("samTerms")}
                options={AB_TERMS}
                placeholder="Select one"
              />
              {terms.samTerms === "Sublimit" && (
                <TextField
                  id="quote-sam-sublimit"
                  label="SAM sublimit"
                  value={terms.samSublimit}
                  onChange={setT("samSublimit")}
                />
              )}
              <TextField
                id="quote-sir"
                label="Self-insured retention"
                value={terms.sir}
                onChange={setT("sir")}
              />
              <TextField
                id="accept-premium"
                label="Adjusted annual premium"
                value={terms.premium}
                onChange={setT("premium")}
                placeholder="$0"
              />
            </div>

            <div style={{ marginTop: 18 }}>
              <TextAreaField
                id="accept-notes"
                label="Underwriter notes to agent"
                rows={3}
                value={terms.notes}
                onChange={setT("notes")}
              />
            </div>

            <div className="wiz-actions">
              <Link href={`/underwriter/bind/${submission.id}`} className="btn btn-out">
                Bind directly, agency billing
              </Link>
              <button
                className="btn btn-teal"
                disabled={busy || !terms.premium}
                onClick={() => act("Quote generated and sent to agent")}
              >
                {busy ? "Working…" : "Generate quote and send to agent"}
              </button>
            </div>
          </div>
        </div>
      )}

      {decision === "decline" && (
        <div className="panel">
          <div className="panel-body">
            <TextAreaField
              id="decline-reason"
              label="Reason for declination"
              rows={4}
              value={declineReason}
              onChange={setDeclineReason}
              placeholder="This is shared with the submitting agent."
            />
            <div className="wiz-actions">
              <button className="btn btn-out" onClick={() => setDecision(null)}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                disabled={busy || !declineReason.trim()}
                onClick={() => act("Submission declined")}
              >
                {busy ? "Working…" : "Decline and notify agent"}
              </button>
            </div>
          </div>
        </div>
      )}

      {decision === "info" && (
        <div className="panel">
          <div className="panel-body">
            <TextAreaField
              id="request-info-text"
              label="What do you need from the agent?"
              rows={4}
              value={infoText}
              onChange={setInfoText}
              placeholder="e.g. currently valued loss runs for the 2024 policy year."
            />
            <div className="wiz-actions">
              <button className="btn btn-out" onClick={() => setDecision(null)}>
                Cancel
              </button>
              <button
                className="btn btn-violet"
                disabled={busy || !infoText.trim()}
                onClick={() => act("Information requested from agent")}
              >
                {busy ? "Working…" : "Send request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
