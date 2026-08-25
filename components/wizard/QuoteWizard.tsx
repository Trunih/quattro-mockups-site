"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  EMPTY_FORM,
  FIELD_LABELS,
  REQUIRED_BY_STEP,
  STEP_TITLES,
  TOTAL_STEPS,
  type QuoteForm,
} from "@/lib/wizard";
import { STEP_COMPONENTS } from "./WizardSteps";
import { BackLink } from "@/components/portal/Bits";

type Errors = Partial<Record<keyof QuoteForm, string>>;

function isBlank(v: unknown): boolean {
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "boolean") return false;
  return !String(v ?? "").trim();
}

export function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<QuoteForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [furthest, setFurthest] = useState(1);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = useCallback(<K extends keyof QuoteForm>(k: K, v: QuoteForm[K]) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
  }, []);

  const blur = useCallback(
    (k: keyof QuoteForm) => {
      setForm((prev) => {
        if (isBlank(prev[k]) && REQUIRED_BY_STEP[step]?.includes(k)) {
          setErrors((e) => ({ ...e, [k]: `${FIELD_LABELS[k] ?? "This field"} is required.` }));
        }
        return prev;
      });
    },
    [step]
  );

  function validateStep(n: number): boolean {
    const required = REQUIRED_BY_STEP[n] ?? [];
    const next: Errors = {};
    required.forEach((k) => {
      if (isBlank(form[k])) next[k] = `${FIELD_LABELS[k] ?? "This field"} is required.`;
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) {
      // Move focus to the panel so the error is announced and visible.
      document.getElementById("wiz-panel")?.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }
    if (step < TOTAL_STEPS) {
      const n = step + 1;
      setStep(n);
      setFurthest((f) => Math.max(f, n));
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function jumpTo(n: number) {
    if (n <= furthest) {
      setStep(n);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function onSubmit() {
    if (!validateStep(TOTAL_STEPS)) return;
    setBusy(true);
    // Prototype only: nothing is transmitted.
    window.setTimeout(() => {
      setBusy(false);
      const ref = `SUB-${Math.floor(4500 + Math.random() * 400)}`;
      setSubmitted(ref);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  }

  const StepBody = useMemo(() => STEP_COMPONENTS[step - 1], [step]);
  const pct = Math.round((step / TOTAL_STEPS) * 100);

  if (submitted) {
    return (
      <div style={{ maxWidth: 620, margin: "40px auto", textAlign: "center" }}>
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
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Submitted to underwriting</h1>
        <p style={{ fontSize: 15, color: "var(--text-dim)", lineHeight: 1.65, marginBottom: 8 }}>
          {form.facility || "This facility"} is now in the underwriting queue. You&apos;ll see it in
          your book while it&apos;s reviewed.
        </p>
        <p style={{ fontSize: 14, color: "var(--text-dim-2)", marginBottom: 28 }}>
          Reference <b style={{ color: "var(--violet-text)" }}>{submitted}</b>
        </p>
        <div className="spectrum" style={{ maxWidth: 160, margin: "0 auto 28px" }} />
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/agent" className="btn btn-violet">
            Back to my book
          </Link>
          <Link href="/agent/quote" className="btn btn-out">
            Start another quote
          </Link>
        </div>
        <p className="synthetic-note" style={{ marginTop: 26 }}>
          Prototype only. Nothing was transmitted, stored, or sent to an underwriter.
        </p>
      </div>
    );
  }

  return (
    <>
      <BackLink href="/agent/quote/method?scope=single">Back to submission method</BackLink>

      <div className="wizard">
        {/* desktop rail */}
        <aside className="wiz-rail" aria-label="Application progress">
          <div className="tag" style={{ color: "var(--violet-text)", marginBottom: 16 }}>
            Step {step} of {TOTAL_STEPS}
          </div>
          <ol>
            {STEP_TITLES.map((t, i) => {
              const n = i + 1;
              const reachable = n <= furthest;
              const cls = n === step ? "is-current" : n < step ? "is-done" : "";
              return (
                <li key={t} className={cls}>
                  <span className="wiz-step-dot" aria-hidden="true">
                    {n < step ? "✓" : n}
                  </span>
                  <button
                    type="button"
                    onClick={() => jumpTo(n)}
                    disabled={!reachable}
                    aria-current={n === step ? "step" : undefined}
                  >
                    {t}
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* panel */}
        <div className="wiz-panel" id="wiz-panel">
          <div className="wiz-mobile-head">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="tag" style={{ color: "var(--violet-text)" }}>
                Step {step} of {TOTAL_STEPS}
              </span>
              <span style={{ fontSize: 12, color: "var(--text-dim-2)" }}>{pct}%</span>
            </div>
            <div
              className="wiz-bar"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={TOTAL_STEPS}
              aria-label={`Step ${step} of ${TOTAL_STEPS}`}
            >
              <span style={{ width: `${pct}%` }} />
            </div>
          </div>

          <h1 className="wiz-step-title">{STEP_TITLES[step - 1]}</h1>
          <div className="spectrum-soft" style={{ marginBottom: 26, maxWidth: 220 }} />

          <StepBody f={form} set={set} err={errors} blur={blur} />

          <div className="wiz-actions">
            <button type="button" className="btn btn-out" onClick={goBack} disabled={step === 1}>
              Back
            </button>
            {step < TOTAL_STEPS ? (
              <button type="button" className="btn btn-violet" onClick={goNext}>
                Continue
              </button>
            ) : (
              <button type="button" className="btn btn-teal" onClick={onSubmit} disabled={busy}>
                {busy ? "Submitting…" : "Submit for a quote"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
