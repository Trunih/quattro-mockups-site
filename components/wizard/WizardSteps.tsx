"use client";

import {
  ABUSE_CLAIMS,
  ADMIN_STATUS,
  ANCILLARY_SERVICES,
  ASSESSMENTS,
  BUILDING_OWNERSHIP,
  DAYCARE_TYPE,
  LEVELS_OF_CARE,
  LOOKUP_STATES,
  MD_STATUS,
  OWNERSHIP,
  PL_BASIS,
  POLICY_FORM,
  PRIOR_CLAIMS,
  SUPPORTING_DOCS,
  YES_NO,
  type QuoteForm,
} from "@/lib/wizard";
import { CheckCard, Conditional, SelectField, TextAreaField, TextField } from "./Field";

export type StepProps = {
  f: QuoteForm;
  set: <K extends keyof QuoteForm>(k: K, v: QuoteForm[K]) => void;
  err: Partial<Record<keyof QuoteForm, string>>;
  blur: (k: keyof QuoteForm) => void;
};

const grid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 } as const;

function Group({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="wiz-group">
      {title && <div className="wiz-group-title">{title}</div>}
      {children}
    </div>
  );
}

/* ------------------------------ 1. profile ------------------------------ */
export function Step1({ f, set, err, blur }: StepProps) {
  return (
    <>
      {/* Reference had a CMS-registry lookup here. The feature stays; the data
          source is described generically per the copy rules. */}
      <div className="banner banner-violet" style={{ marginBottom: 24 }}>
        <span aria-hidden="true">&#9906;</span>
        <span>
          <b>Look up in the public facility registry.</b> Search by state and facility name to
          prefill from a public registry of certified skilled nursing facilities. If the facility
          isn&apos;t certified, or doesn&apos;t appear, just fill in the fields below manually.
        </span>
      </div>

      <Group>
        <div className="form-grid" style={grid}>
          <SelectField
            id="lookup-state"
            label="Registry state"
            value={f.state}
            onChange={(v) => set("state", v)}
            options={LOOKUP_STATES.filter((s) => s !== "Any state")}
            placeholder="Any state"
          />
          <TextField
            id="lookup-name"
            label="Registry search"
            value={f.facility}
            onChange={(v) => set("facility", v)}
            placeholder="Start typing a facility name"
            hint="Prototype: results are not wired to a live registry."
          />
        </div>
      </Group>

      <Group title="Facility details">
        <div className="form-grid" style={grid}>
          <TextField
            id="p-facility"
            label="Facility name"
            required
            value={f.facility}
            onChange={(v) => set("facility", v)}
            onBlur={() => blur("facility")}
            error={err.facility}
          />
          <TextField
            id="p-state"
            label="State"
            required
            value={f.state}
            onChange={(v) => set("state", v)}
            onBlur={() => blur("state")}
            error={err.state}
            placeholder="e.g. Georgia"
          />
          <div className="form-full">
            <TextField
              id="p-address"
              label="Facility address"
              value={f.address}
              onChange={(v) => set("address", v)}
            />
          </div>
          <SelectField
            id="p-ownership"
            label="Ownership structure"
            required
            value={f.ownership}
            onChange={(v) => set("ownership", v)}
            onBlur={() => blur("ownership")}
            error={err.ownership}
            options={OWNERSHIP}
          />
          <TextField
            id="p-years"
            label="Years in operation"
            type="number"
            value={f.years}
            onChange={(v) => set("years", v)}
          />
          <SelectField
            id="p-chain"
            label="Part of a chain"
            value={f.chain}
            onChange={(v) => set("chain", v)}
            options={YES_NO}
          />
          <SelectField
            id="p-mgmt"
            label="Managed by a management company"
            value={f.mgmt}
            onChange={(v) => set("mgmt", v)}
            options={YES_NO}
          />
        </div>

        <Conditional show={f.chain === "Yes" || f.mgmt === "Yes"}>
          {f.chain === "Yes" && (
            <TextField
              id="p-parent"
              label="Corporate or parent company name"
              value={f.parent}
              onChange={(v) => set("parent", v)}
            />
          )}
          {f.mgmt === "Yes" && (
            <TextField
              id="p-mgmt-name"
              label="Management company name"
              value={f.mgmtName}
              onChange={(v) => set("mgmtName", v)}
            />
          )}
        </Conditional>
      </Group>
    </>
  );
}

/* --------------------------- 2. levels of care --------------------------- */
export function Step2({ f, set, err }: StepProps) {
  const toggle = (key: string) =>
    set("levels", f.levels.includes(key) ? f.levels.filter((l) => l !== key) : [...f.levels, key]);

  return (
    <>
      <p className="wiz-step-intro">
        Select every level of care this facility provides. The next steps will only ask about what
        you select here.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-grid">
        {LEVELS_OF_CARE.map((l) => (
          <CheckCard
            key={l.key}
            id={`loc-${l.key}`}
            title={l.label}
            checked={f.levels.includes(l.key)}
            onToggle={() => toggle(l.key)}
          />
        ))}
      </div>
      {err.levels && <p className="field-error">{err.levels}</p>}

      <div style={{ marginTop: 24, maxWidth: 300 }}>
        <TextField
          id="beds-total"
          label="Total licensed beds / units"
          type="number"
          value={f.bedsTotal}
          onChange={(v) => set("bedsTotal", v)}
        />
      </div>
    </>
  );
}

/* ----------------------------- 3. licensing ----------------------------- */
export function Step3({ f, set, err, blur }: StepProps) {
  return (
    <>
      <Group title="License">
        <div className="form-grid" style={grid}>
          <TextField
            id="l-license"
            label="State license number"
            required
            value={f.license}
            onChange={(v) => set("license", v)}
            onBlur={() => blur("license")}
            error={err.license}
          />
          <TextField
            id="l-expiry"
            label="License expiration date"
            type="date"
            value={f.expiry}
            onChange={(v) => set("expiry", v)}
          />
          <SelectField
            id="l-medicare"
            label="Medicare certified"
            required
            value={f.medicare}
            onChange={(v) => set("medicare", v)}
            onBlur={() => blur("medicare")}
            error={err.medicare}
            options={YES_NO}
          />
          <SelectField
            id="l-medicaid"
            label="Medicaid certified"
            required
            value={f.medicaid}
            onChange={(v) => set("medicaid", v)}
            onBlur={() => blur("medicaid")}
            error={err.medicaid}
            options={YES_NO}
          />
        </div>
      </Group>

      <Group title="Regulatory history">
        <div className="form-grid" style={grid}>
          <TextField
            id="l-inspection-date"
            label="Date of last state inspection"
            type="date"
            value={f.inspectionDate}
            onChange={(v) => set("inspectionDate", v)}
          />
          <TextField
            id="l-deficiencies"
            label="Total deficiencies cited"
            type="number"
            value={f.deficiencies}
            onChange={(v) => set("deficiencies", v)}
          />
          <TextField
            id="l-complaints"
            label="Complaints investigated, past 3 years"
            type="number"
            value={f.complaints}
            onChange={(v) => set("complaints", v)}
          />
          <SelectField
            id="l-revoked"
            label="License limited, suspended, or revoked, past 5 years"
            value={f.revoked}
            onChange={(v) => set("revoked", v)}
            options={YES_NO}
          />
        </div>
        <Conditional show={f.revoked === "Yes"}>
          <TextAreaField
            id="l-revoked-detail"
            label="Please explain"
            value={f.revokedDetail}
            onChange={(v) => set("revokedDetail", v)}
          />
        </Conditional>
      </Group>
    </>
  );
}

/* -------------------------- 4. prior insurance -------------------------- */
export function Step4({ f, set, err, blur }: StepProps) {
  return (
    <>
      <Group title="Current program">
        <div className="form-grid" style={grid}>
          <TextField
            id="i-carrier"
            label="Current GL / PL carrier"
            required
            value={f.carrier}
            onChange={(v) => set("carrier", v)}
            onBlur={() => blur("carrier")}
            error={err.carrier}
          />
          <SelectField
            id="i-form"
            label="Policy form"
            required
            value={f.form}
            onChange={(v) => set("form", v)}
            onBlur={() => blur("form")}
            error={err.form}
            options={POLICY_FORM}
          />
        </div>
      </Group>

      <Group title="Expiring limits">
        <div className="form-grid" style={grid}>
          <TextField id="i-gl-occ" label="GL per-occurrence limit" value={f.glOcc} onChange={(v) => set("glOcc", v)} />
          <TextField id="i-gl-agg" label="GL aggregate limit" value={f.glAgg} onChange={(v) => set("glAgg", v)} />
          <TextField id="i-pl-occ" label="PL per-occurrence limit" value={f.plOcc} onChange={(v) => set("plOcc", v)} />
          <TextField id="i-pl-agg" label="PL aggregate limit" value={f.plAgg} onChange={(v) => set("plAgg", v)} />
          <TextField
            id="i-sir"
            label="Self-insured retention (SIR)"
            value={f.sir}
            onChange={(v) => set("sir", v)}
          />
          <SelectField
            id="i-sam"
            label="Sexual abuse / misconduct coverage currently included"
            value={f.sam}
            onChange={(v) => set("sam", v)}
            options={YES_NO}
          />
        </div>
        <Conditional show={f.sam === "Yes"}>
          <TextField
            id="i-sam-limit"
            label="Current SAM limit"
            value={f.samLimit}
            onChange={(v) => set("samLimit", v)}
            hint="Quattro writes this at full limits with no sublimit."
          />
        </Conditional>
      </Group>

      <Group title="Loss history">
        <div className="form-grid" style={grid}>
          <SelectField
            id="i-nonrenewed"
            label="Cancelled or non-renewed, past 3 years"
            value={f.nonrenewed}
            onChange={(v) => set("nonrenewed", v)}
            options={YES_NO}
          />
          <SelectField
            id="i-priorclaims"
            label="Claims presented in the past 5 years"
            value={f.priorClaims}
            onChange={(v) => set("priorClaims", v)}
            options={PRIOR_CLAIMS}
          />
        </div>
        <Conditional show={f.nonrenewed === "Yes" || (!!f.priorClaims && f.priorClaims !== "None")}>
          {f.nonrenewed === "Yes" && (
            <TextAreaField
              id="i-nonrenewed-detail"
              label="Please explain"
              value={f.nonrenewedDetail}
              onChange={(v) => set("nonrenewedDetail", v)}
            />
          )}
          {!!f.priorClaims && f.priorClaims !== "None" && (
            <TextAreaField
              id="i-priorclaims-detail"
              label="Briefly describe the claims"
              value={f.priorClaimsDetail}
              onChange={(v) => set("priorClaimsDetail", v)}
            />
          )}
        </Conditional>
      </Group>
    </>
  );
}

/* ------------------------- 5. requested coverage ------------------------- */
export function Step5({ f, set, err, blur }: StepProps) {
  return (
    <>
      <p className="wiz-step-intro">
        Tell us what you&apos;d like this quote built around. Underwriting may adjust these before
        binding.
      </p>

      <Group title="General liability">
        <div className="form-grid" style={grid}>
          <TextField
            id="req-gl-occ"
            label="Requested GL per-occurrence limit"
            required
            value={f.reqGlOcc}
            onChange={(v) => set("reqGlOcc", v)}
            onBlur={() => blur("reqGlOcc")}
            error={err.reqGlOcc}
          />
          <TextField
            id="req-gl-agg"
            label="Requested GL aggregate limit"
            value={f.reqGlAgg}
            onChange={(v) => set("reqGlAgg", v)}
          />
        </div>
      </Group>

      <Group title="Professional liability">
        <div className="form-grid" style={grid}>
          <TextField
            id="req-pl-occ"
            label="Requested PL per-occurrence limit"
            required
            value={f.reqPlOcc}
            onChange={(v) => set("reqPlOcc", v)}
            onBlur={() => blur("reqPlOcc")}
            error={err.reqPlOcc}
          />
          <TextField
            id="req-pl-agg"
            label="Requested PL aggregate limit"
            value={f.reqPlAgg}
            onChange={(v) => set("reqPlAgg", v)}
          />
          <SelectField
            id="req-pl-basis"
            label="PL coverage basis"
            required
            value={f.reqPlBasis}
            onChange={(v) => set("reqPlBasis", v)}
            onBlur={() => blur("reqPlBasis")}
            error={err.reqPlBasis}
            options={PL_BASIS}
          />
          <SelectField
            id="req-pl-tail"
            label="Tail coverage needed"
            value={f.reqPlTail}
            onChange={(v) => set("reqPlTail", v)}
            options={YES_NO}
          />
        </div>
      </Group>

      <Group title="Retention">
        <div style={{ maxWidth: 320 }}>
          <TextField
            id="req-sir"
            label="Requested self-insured retention (SIR)"
            value={f.reqSir}
            onChange={(v) => set("reqSir", v)}
            hint="Deductible options run $2,500 to $25,000 per claim."
          />
        </div>
      </Group>

      <div className="banner banner-teal">
        <span aria-hidden="true">&#10003;</span>
        <span>
          Quattro writes assault and battery, sexual abuse and molestation, and wandering and
          elopement at <b>full limits with no sublimit</b>, with defense costs outside the limit of
          liability.
        </span>
      </div>
    </>
  );
}

/* ------------------------------ 6. staffing ------------------------------ */
export function Step6({ f, set, err, blur }: StepProps) {
  const hasSkilled = f.levels.includes("skilled") || f.levels.includes("subacute");
  return (
    <>
      <Group title="Leadership">
        <div className="form-grid" style={grid}>
          <SelectField
            id="s-admin-status"
            label="Administrator"
            required
            value={f.adminStatus}
            onChange={(v) => set("adminStatus", v)}
            onBlur={() => blur("adminStatus")}
            error={err.adminStatus}
            options={ADMIN_STATUS}
          />
          <TextField
            id="s-admin-years"
            label="Years as a licensed administrator"
            type="number"
            value={f.adminYears}
            onChange={(v) => set("adminYears", v)}
          />
          <TextField
            id="s-don-years"
            label="Director of Nursing, years in role"
            type="number"
            value={f.donYears}
            onChange={(v) => set("donYears", v)}
          />
          <TextField
            id="s-turnover"
            label="Employee turnover, prior year"
            value={f.turnover}
            onChange={(v) => set("turnover", v)}
            placeholder="e.g. 32%"
          />
        </div>
      </Group>

      <Group title="Staffing">
        <div className="form-grid" style={grid}>
          <TextField id="s-rn" label="RN headcount" type="number" value={f.rn} onChange={(v) => set("rn", v)} />
          <TextField
            id="s-cna"
            label="CNA / caregiver headcount"
            type="number"
            value={f.cna}
            onChange={(v) => set("cna", v)}
          />
          <div className="form-full">
            <SelectField
              id="s-agency-checks"
              label="Background checks completed for agency and pool staff"
              value={f.agencyChecks}
              onChange={(v) => set("agencyChecks", v)}
              options={YES_NO}
            />
          </div>
        </div>
      </Group>

      {hasSkilled && (
        <Group title="Medical direction">
          <div className="form-grid" style={grid}>
            <SelectField
              id="s-md-status"
              label="Medical Director"
              value={f.mdStatus}
              onChange={(v) => set("mdStatus", v)}
              options={MD_STATUS}
            />
            <SelectField
              id="s-md-oversight"
              label="Physician credentialing process in place"
              value={f.mdOversight}
              onChange={(v) => set("mdOversight", v)}
              options={YES_NO}
            />
          </div>
        </Group>
      )}
    </>
  );
}

/* -------------------------- 7. risk management -------------------------- */
export function Step7({ f, set, err, blur }: StepProps) {
  const hasMemory = f.levels.includes("memory");
  return (
    <>
      <Group title="Programs and policies">
        <div className="form-grid" style={grid}>
          <SelectField
            id="r-manager"
            label="Dedicated risk manager on staff"
            required
            value={f.riskManager}
            onChange={(v) => set("riskManager", v)}
            onBlur={() => blur("riskManager")}
            error={err.riskManager}
            options={YES_NO}
          />
          <SelectField
            id="r-incident"
            label="Formal incident reporting policy"
            required
            value={f.incidentPolicy}
            onChange={(v) => set("incidentPolicy", v)}
            onBlur={() => blur("incidentPolicy")}
            error={err.incidentPolicy}
            options={YES_NO}
          />
          <div className="form-full">
            <SelectField
              id="r-abuse"
              label="Written abuse prevention and reporting policy"
              required
              value={f.abusePolicy}
              onChange={(v) => set("abusePolicy", v)}
              onBlur={() => blur("abusePolicy")}
              error={err.abusePolicy}
              options={YES_NO}
            />
          </div>
        </div>
        <Conditional show={f.abusePolicy === "Yes" || f.abusePolicy === "No"}>
          <SelectField
            id="r-abuse-claims"
            label="Abuse-related claims in the past 10 years"
            value={f.abuseClaims}
            onChange={(v) => set("abuseClaims", v)}
            options={ABUSE_CLAIMS}
          />
        </Conditional>
      </Group>

      <Group title="Resident safety">
        <div className="form-grid" style={grid}>
          {hasMemory && (
            <TextField
              id="r-elopements"
              label="Elopements in the past 3 years"
              type="number"
              value={f.elopements}
              onChange={(v) => set("elopements", v)}
            />
          )}
          <SelectField
            id="r-assessments"
            label="Nursing assessment protocols for fall, elopement, and skin breakdown risk"
            value={f.assessments}
            onChange={(v) => set("assessments", v)}
            options={ASSESSMENTS}
          />
        </div>
      </Group>
    </>
  );
}

/* ------------------------------ 8. building ------------------------------ */
export function Step8({ f, set, err, blur }: StepProps) {
  return (
    <>
      <Group title="Structure">
        <div className="form-grid" style={grid}>
          <SelectField
            id="b-ownership"
            label="Building is"
            required
            value={f.buildingOwnership}
            onChange={(v) => set("buildingOwnership", v)}
            onBlur={() => blur("buildingOwnership")}
            error={err.buildingOwnership}
            options={BUILDING_OWNERSHIP}
          />
          <TextField
            id="b-year"
            label="Year built"
            type="number"
            value={f.yearBuilt}
            onChange={(v) => set("yearBuilt", v)}
          />
          <TextField
            id="b-floors"
            label="Number of floors"
            type="number"
            value={f.floors}
            onChange={(v) => set("floors", v)}
          />
        </div>
      </Group>

      <Group title="Fire and life safety">
        <div className="form-grid" style={grid}>
          <SelectField
            id="b-sprinkler"
            label="Automatic sprinklers cover 100% of building"
            required
            value={f.sprinkler}
            onChange={(v) => set("sprinkler", v)}
            onBlur={() => blur("sprinkler")}
            error={err.sprinkler}
            options={YES_NO}
          />
          <SelectField
            id="b-alarm"
            label="Alarms monitored by UL central station or fire dept."
            value={f.alarm}
            onChange={(v) => set("alarm", v)}
            options={YES_NO}
          />
        </div>
      </Group>
    </>
  );
}

/* ------------------------------ 9. amenities ------------------------------ */
export function Step9({ f, set }: StepProps) {
  const hasMemory = f.levels.includes("memory");
  const hasIndependent = f.levels.includes("independent") || f.levels.includes("ccrc");

  const toggleAncillary = (s: string) =>
    set("ancillary", f.ancillary.includes(s) ? f.ancillary.filter((a) => a !== s) : [...f.ancillary, s]);

  return (
    <>
      <p className="wiz-step-intro">
        Only answer what applies. Selecting yes will reveal a couple of follow-up questions.
      </p>

      {hasMemory && (
        <Group title="Memory care unit">
          <div className="form-grid" style={grid}>
            <SelectField
              id="a-mc-locked"
              label="Unit is locked"
              value={f.mcLocked}
              onChange={(v) => set("mcLocked", v)}
              options={YES_NO}
            />
            <TextField
              id="a-mc-beds"
              label="Memory care beds"
              type="number"
              value={f.mcBeds}
              onChange={(v) => set("mcBeds", v)}
            />
          </div>
        </Group>
      )}

      {hasIndependent && (
        <Group title="Independent living">
          <div className="form-grid" style={grid}>
            <SelectField
              id="a-il-cooking"
              label="Units have cooking appliances"
              value={f.ilCooking}
              onChange={(v) => set("ilCooking", v)}
              options={YES_NO}
            />
            <SelectField
              id="a-il-dining"
              label="Common dining facilities on site"
              value={f.ilDining}
              onChange={(v) => set("ilDining", v)}
              options={YES_NO}
            />
            <div className="form-full">
              <SelectField
                id="a-il-hha"
                label="Residents allowed home health aides"
                value={f.ilHha}
                onChange={(v) => set("ilHha", v)}
                options={YES_NO}
              />
            </div>
          </div>
        </Group>
      )}

      <Group title="Premises exposures">
        <div className="form-grid" style={grid}>
          <SelectField
            id="a-pool"
            label="Swimming pool on site"
            value={f.pool}
            onChange={(v) => set("pool", v)}
            options={YES_NO}
          />
          <SelectField
            id="a-liquor"
            label="Liquor license held"
            value={f.liquor}
            onChange={(v) => set("liquor", v)}
            options={YES_NO}
          />
        </div>

        <Conditional show={f.pool === "Yes"}>
          <div className="form-grid" style={grid}>
            <SelectField
              id="a-pool-fenced"
              label="Fenced and locked when not in use"
              value={f.poolFenced}
              onChange={(v) => set("poolFenced", v)}
              options={YES_NO}
            />
            <SelectField
              id="a-pool-lifeguard"
              label="Full time lifeguard on duty"
              value={f.poolLifeguard}
              onChange={(v) => set("poolLifeguard", v)}
              options={YES_NO}
            />
          </div>
        </Conditional>

        <Conditional show={f.liquor === "Yes"}>
          <SelectField
            id="a-liquor-policy"
            label="Written alcohol consumption policy in place"
            value={f.liquorPolicy}
            onChange={(v) => set("liquorPolicy", v)}
            options={YES_NO}
          />
        </Conditional>
      </Group>

      <Group title="Day care">
        <div style={{ maxWidth: 360 }}>
          <SelectField
            id="a-daycare"
            label="Licensed adult or children day care on site"
            value={f.daycare}
            onChange={(v) => set("daycare", v)}
            options={YES_NO}
          />
        </div>
        <Conditional show={f.daycare === "Yes"}>
          <SelectField
            id="a-daycare-type"
            label="Type of day care offered"
            value={f.daycareType}
            onChange={(v) => set("daycareType", v)}
            options={DAYCARE_TYPE}
          />
        </Conditional>
      </Group>

      <Group title="Additional services provided">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-grid">
          {ANCILLARY_SERVICES.map((s) => (
            <CheckCard
              key={s}
              id={`anc-${s.replace(/\s+/g, "-").toLowerCase()}`}
              title={s}
              checked={f.ancillary.includes(s)}
              onToggle={() => toggleAncillary(s)}
            />
          ))}
        </div>
      </Group>
    </>
  );
}

/* ------------------------- 10. consent and docs ------------------------- */
export function Step10({ f, set }: StepProps) {
  const toggleDoc = (key: string) =>
    set("docs", f.docs.includes(key) ? f.docs.filter((d) => d !== key) : [...f.docs, key]);

  return (
    <>
      {/* Reference titled this "Consent to share video surveillance and EHR data".
          Retitled per the copy rules; the substance of the consent is unchanged. */}
      <Group title="Facility data sharing consent">
        <div className="banner banner-violet" style={{ marginBottom: 18 }}>
          <span aria-hidden="true">&#9998;</span>
          <span>
            Quattro underwrites using 90 days of facility data leading up to this application.
            Before we can begin, the insured needs to review and e-sign a consent authorizing that
            initial access, along with ongoing access afterward for early-warning alerts and renewal
            underwriting. Send it now so it&apos;s already signed by the time underwriting reaches
            out.
          </span>
        </div>

        <div className="form-grid" style={grid}>
          <TextField
            id="c-insured-name"
            label="Insured contact name"
            value={f.insuredName}
            onChange={(v) => set("insuredName", v)}
          />
          <TextField
            id="c-insured-email"
            label="Insured contact email"
            type="email"
            value={f.insuredEmail}
            onChange={(v) => set("insuredEmail", v)}
          />
        </div>

        <div style={{ marginTop: 16 }}>
          {f.consentSent ? (
            <div className="banner banner-teal">
              <span aria-hidden="true">&#10003;</span>
              <span>
                Consent request sent to <b>{f.insuredEmail || "the insured contact"}</b>. Prototype
                only, no email was actually delivered.
              </span>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-out btn-sm"
              disabled={!f.insuredEmail}
              onClick={() => set("consentSent", true)}
            >
              Send consent for e-signature
            </button>
          )}
        </div>
      </Group>

      <Group title="Supporting documents">
        <div style={{ display: "grid", gap: 12 }}>
          {SUPPORTING_DOCS.map((d) => (
            <CheckCard
              key={d.key}
              id={`doc-${d.key}`}
              title={d.label}
              sub={d.hint}
              checked={f.docs.includes(d.key)}
              onToggle={() => toggleDoc(d.key)}
            />
          ))}
        </div>
        <p className="field-hint" style={{ marginTop: 12 }}>
          Prototype: checking a document marks it as attached. No file is uploaded or stored.
        </p>
      </Group>
    </>
  );
}

/* --------------------------- 11. review + submit --------------------------- */
export function Step11({ f, set, err, blur }: StepProps) {
  const levelLabels = f.levels
    .map((k) => LEVELS_OF_CARE.find((l) => l.key === k)?.label)
    .filter(Boolean)
    .join(", ");

  const rows: [string, string][] = [
    ["Facility", f.facility || "Not provided"],
    ["State", f.state || "Not provided"],
    ["Ownership", f.ownership || "Not provided"],
    ["Levels of care", levelLabels || "None selected"],
    ["Licensed beds / units", f.bedsTotal || "Not provided"],
    ["State license", f.license || "Not provided"],
    ["Medicare / Medicaid", [f.medicare, f.medicaid].filter(Boolean).join(" / ") || "Not provided"],
    ["Current carrier", f.carrier || "Not provided"],
    ["Prior claims, 5 years", f.priorClaims || "Not provided"],
    ["Requested GL", [f.reqGlOcc, f.reqGlAgg].filter(Boolean).join(" / ") || "Not provided"],
    ["Requested PL", [f.reqPlOcc, f.reqPlAgg].filter(Boolean).join(" / ") || "Not provided"],
    ["PL basis", f.reqPlBasis || "Not provided"],
    ["Risk manager on staff", f.riskManager || "Not provided"],
    ["Sprinklered throughout", f.sprinkler || "Not provided"],
    ["Consent request", f.consentSent ? "Sent to insured" : "Not sent"],
    ["Documents attached", f.docs.length ? `${f.docs.length} of ${SUPPORTING_DOCS.length}` : "None"],
  ];

  return (
    <>
      <p className="wiz-step-intro">Confirm the summary below, then submit for a quote.</p>

      <div className="panel" style={{ marginBottom: 26 }}>
        <div className="panel-head">
          <span style={{ fontSize: 13, fontWeight: 600 }}>Application summary</span>
        </div>
        <div className="panel-body">
          <dl className="review-list">
            {rows.map(([k, v]) => (
              <div className="review-row" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="form-grid" style={grid}>
        <TextField
          id="rv-effective"
          label="Requested effective date"
          type="date"
          required
          value={f.effective}
          onChange={(v) => set("effective", v)}
          onBlur={() => blur("effective")}
          error={err.effective}
        />
      </div>
      <div style={{ marginTop: 18 }}>
        <TextAreaField
          id="rv-notes"
          label="Anything else underwriting should know"
          rows={4}
          value={f.notes}
          onChange={(v) => set("notes", v)}
        />
      </div>
    </>
  );
}

export const STEP_COMPONENTS = [
  Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10, Step11,
];
