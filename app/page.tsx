import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyCta } from "@/components/site/StickyCta";
import { Reveal } from "@/components/site/Reveal";
import { Faq } from "@/components/site/Faq";
import { ContactForm } from "@/components/site/ContactForm";
import { Lens } from "@/components/site/Lens";
import {
  HERO,
  GAP,
  SIGNALS,
  TRUST,
  HOW_IT_WORKS,
  COVERAGE,
  PORTAL_TEASER,
  BROKERS,
  FAQ,
  CONTACT,
  CONTACT_SECTION,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <SiteNav />

      {/* ---------------- hero ---------------- */}
      <section style={{ position: "relative", padding: "100px 0 90px", overflow: "hidden" }}>
        <div className="wrap two-col">
          <div>
            <span className="hero-badge">
              <span className="dot" aria-hidden="true" />
              {HERO.badge}
            </span>
            <h1 style={{ fontSize: 50, marginBottom: 22 }}>
              {HERO.headingLead}
              <span style={{ color: "var(--violet)" }}>{HERO.headingAccent}</span>
            </h1>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--text-dim)",
                maxWidth: 520,
                marginBottom: 32,
              }}
            >
              {HERO.body}
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link className="btn btn-violet" href={HERO.primaryCta.href}>
                {HERO.primaryCta.label}
              </Link>
              <Link className="btn btn-out" href={HERO.secondaryCta.href}>
                {HERO.secondaryCta.label}
              </Link>
            </div>
          </div>
          <div style={{ position: "relative", minHeight: 340, display: "flex", alignItems: "center" }}>
            <Lens size={320} />
          </div>
        </div>
      </section>

      {/* ---------------- 01 the gap ---------------- */}
      <Reveal as="section" id="the-gap" className="section section-alt">
        <div className="wrap two-col-even">
          <div>
            <h2 style={{ fontSize: 30, marginBottom: 18 }}>{GAP.heading}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-dim)", marginBottom: 20 }}>
              {GAP.body}
            </p>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--text-dim-2)",
                marginBottom: 28,
              }}
            >
              {GAP.sub}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {GAP.points.map((p) => (
                <div key={p.k} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      background: "var(--violet)",
                      flex: "none",
                      borderRadius: "50%",
                    }}
                  />
                  <p style={{ fontSize: 14, color: "var(--text-dim)" }}>
                    <b style={{ color: "var(--off)" }}>{p.k}</b> {p.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <svg width="280" height="280" viewBox="0 0 280 280" aria-hidden="true" style={{ maxWidth: "100%", height: "auto" }}>
              <circle cx="140" cy="140" r="110" fill="none" stroke="rgba(241,240,244,0.1)" strokeWidth="1" />
              <path
                d="M 30 140 A 110 110 0 0 1 250 140"
                fill="none"
                stroke="#E0567A"
                strokeWidth="2"
                strokeDasharray="3 4"
              />
              <circle cx="45" cy="176" r="4" fill="#E0567A" />
              <circle cx="235" cy="176" r="4" fill="#2BC4B0" />
            </svg>
            <div style={{ position: "absolute", left: 0, bottom: 14 }}>
              <div
                style={{
                  fontFamily: "var(--font-display), 'Satoshi', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#E0567A",
                }}
              >
                {GAP.capLabel}
              </div>
              <div className="tag" style={{ color: "var(--text-dim-2)", marginTop: 2 }}>
                {GAP.capSub}
              </div>
            </div>
            <div style={{ position: "absolute", right: 0, bottom: 14, textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "var(--font-display), 'Satoshi', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "var(--teal)",
                }}
              >
                {GAP.quattroLabel}
              </div>
              <div className="tag" style={{ color: "var(--text-dim-2)", marginTop: 2 }}>
                {GAP.quattroSub}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---------------- 02 how we underwrite ---------------- */}
      <Reveal as="section" id="how-we-underwrite" className="section">
        <div className="wrap">
          <h2 style={{ fontSize: 30, maxWidth: 600, marginBottom: 14 }}>{SIGNALS.heading}</h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: "var(--text-dim)",
              maxWidth: 700,
              marginBottom: 32,
            }}
          >
            {SIGNALS.intro}
          </p>

          <div className="signal-card">
            <div className="signal-cell">
              <div className="chart-glow" style={{ "--glow-color": "rgba(43,196,176,0.35)" } as React.CSSProperties}>
                <svg width="140" height="64" viewBox="0 0 140 64" style={{ marginBottom: 20 }} aria-hidden="true">
                  <defs>
                    <linearGradient id="docLineFill1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2BC4B0" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#2BC4B0" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M4,46 C18,46 22,22 36,22 C50,22 54,40 68,40 C82,40 86,16 100,16 C114,16 118,34 132,34 L132,58 L4,58 Z"
                    fill="url(#docLineFill1)"
                  />
                  <path
                    d="M4,46 C18,46 22,22 36,22 C50,22 54,40 68,40 C82,40 86,16 100,16 C114,16 118,34 132,34"
                    fill="none"
                    stroke="#2BC4B0"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                  />
                  <circle cx="132" cy="34" r="3.5" fill="#2BC4B0" />
                </svg>
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>
                <span style={{ color: "var(--teal)" }}>{SIGNALS.documentation.label}</span>{" "}
                {SIGNALS.documentation.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-dim)" }}>
                {SIGNALS.documentation.body}
              </p>
            </div>
            <div className="signal-cell">
              <div className="chart-glow" style={{ "--glow-color": "rgba(108,79,224,0.4)" } as React.CSSProperties}>
                <svg width="140" height="64" viewBox="0 0 140 64" style={{ marginBottom: 20 }} aria-hidden="true">
                  <defs>
                    <linearGradient id="actBarFill1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9B85F5" />
                      <stop offset="100%" stopColor="#6C4FE0" />
                    </linearGradient>
                  </defs>
                  {[
                    [4, 30, 28],
                    [24, 12, 46],
                    [44, 36, 22],
                    [64, 2, 56],
                    [84, 24, 34],
                    [104, 40, 18],
                    [124, 20, 38],
                  ].map(([x, y, h]) => (
                    <rect key={x} x={x} y={y} width="12" height={h} rx="4" fill="url(#actBarFill1)" />
                  ))}
                </svg>
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>
                <span style={{ color: "var(--violet-text)" }}>{SIGNALS.activity.label}</span>{" "}
                {SIGNALS.activity.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-dim)" }}>
                {SIGNALS.activity.body}
              </p>
            </div>
          </div>

          <div className="spectrum" style={{ marginTop: 2 }} />
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.02em",
              color: "var(--text-dim-2)",
              marginTop: 10,
              fontStyle: "italic",
            }}
          >
            {SIGNALS.combine}
          </p>

          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--text-dim)",
              maxWidth: 700,
              marginTop: 24,
            }}
          >
            {SIGNALS.closing}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            {SIGNALS.stats.map((s) => (
              <span key={s} className="tag-pill">
                {s}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------------- trust ---------------- */}
      <Reveal as="section" className="section section-alt">
        <div className="wrap">
          <h2 style={{ fontSize: 26, maxWidth: 640, marginBottom: 8 }}>{TRUST.heading}</h2>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-dim-2)",
              maxWidth: 640,
              marginBottom: 36,
              lineHeight: 1.6,
            }}
          >
            {TRUST.note}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: 20,
            }}
          >
            {TRUST.quotes.map((q) => (
              <div key={q.who} className="glass-card">
                <span className="quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--off)", marginBottom: 16 }}>
                  {q.body}
                </p>
                <p style={{ fontSize: 12, color: "var(--text-dim-2)" }}>{q.who}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------------- how it works ---------------- */}
      <Reveal as="section" className="section">
        <div className="wrap">
          <h2 style={{ fontSize: 26, maxWidth: 600, marginBottom: 52 }}>{HOW_IT_WORKS.heading}</h2>
          <div className="node-row">
            {HOW_IT_WORKS.steps.map((s) => (
              <div key={s.n} className="node-item">
                <div className={`node${s.n > 2 ? " is-teal" : ""}`}>{s.n}</div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: "14px 0 8px" }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------------- coverage ---------------- */}
      <Reveal as="section" id="coverage" className="section section-alt">
        <div className="wrap">
          <h2 style={{ fontSize: 30, maxWidth: 600, marginBottom: 8 }}>{COVERAGE.heading}</h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: "var(--text-dim)",
              maxWidth: 700,
              margin: "16px 0 32px",
            }}
          >
            {COVERAGE.body}
          </p>
          <div>
            {COVERAGE.rows.map((r) => (
              <div key={r.label} className="cov-row">
                <div className="label">
                  {r.highlight && <span className="cov-dot" aria-hidden="true" />}
                  {r.label}
                </div>
                <div className={`value${r.highlight ? " hl" : ""}`}>{r.value}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-dim-2)", marginTop: 16, lineHeight: 1.6 }}>
            {COVERAGE.note}
          </p>
        </div>
      </Reveal>

      {/* ---------------- portal teaser ---------------- */}
      <Reveal as="section" className="section">
        <div className="wrap">
          <h2 style={{ fontSize: 26, maxWidth: 600, marginBottom: 8 }}>{PORTAL_TEASER.heading}</h2>
          <p
            style={{
              fontSize: 12,
              color: "var(--text-dim-2)",
              fontStyle: "italic",
              marginBottom: 24,
            }}
          >
            {PORTAL_TEASER.note}
          </p>
          <div className="portal-card">
            <div className="portal-topbar">
              <span>{PORTAL_TEASER.topbarLeft}</span>
              <span>{PORTAL_TEASER.topbarRight}</span>
            </div>
            <div className="portal-body">
              <div>
                <div className="tag" style={{ color: "var(--teal)", marginBottom: 10 }}>
                  Documentation signal
                </div>
                <div className="chart-glow" style={{ "--glow-color": "rgba(43,196,176,0.3)" } as React.CSSProperties}>
                  <svg width="100%" height="46" viewBox="0 0 260 46" aria-hidden="true">
                    <defs>
                      <linearGradient id="docLineFill2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2BC4B0" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#2BC4B0" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M6,32 C36,32 42,14 72,14 C102,14 108,34 138,34 C168,34 174,10 204,10 C224,10 236,22 254,24 L254,44 L6,44 Z"
                      fill="url(#docLineFill2)"
                    />
                    <path
                      d="M6,32 C36,32 42,14 72,14 C102,14 108,34 138,34 C168,34 174,10 204,10 C224,10 236,22 254,24"
                      fill="none"
                      stroke="#2BC4B0"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="254" cy="24" r="3" fill="#2BC4B0" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="tag" style={{ color: "var(--violet-text)", marginBottom: 10 }}>
                  Activity signal
                </div>
                <div className="chart-glow" style={{ "--glow-color": "rgba(108,79,224,0.35)" } as React.CSSProperties}>
                  <svg width="100%" height="46" viewBox="0 0 260 46" aria-hidden="true">
                    <defs>
                      <linearGradient id="actBarFill2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9B85F5" />
                        <stop offset="100%" stopColor="#6C4FE0" />
                      </linearGradient>
                    </defs>
                    {[
                      [4, 20, 24],
                      [30, 8, 36],
                      [56, 24, 20],
                      [82, 2, 42],
                      [108, 16, 28],
                      [134, 28, 16],
                      [160, 10, 34],
                      [186, 22, 22],
                      [212, 4, 40],
                      [238, 18, 26],
                    ].map(([x, y, h]) => (
                      <rect key={x} x={x} y={y} width="14" height={h} rx="4" fill="url(#actBarFill2)" />
                    ))}
                  </svg>
                </div>
              </div>
              <div className="portal-alert">{PORTAL_TEASER.alert}</div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---------------- brokers ---------------- */}
      <Reveal as="section" id="brokers" className="section section-alt">
        <div className="wrap">
          <h2 style={{ fontSize: 28, maxWidth: 660, marginBottom: 16 }}>{BROKERS.heading}</h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: "var(--text-dim)",
              maxWidth: 700,
              marginBottom: 36,
            }}
          >
            {BROKERS.body}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {BROKERS.points.map((p) => (
              <div key={p.k} className="glass-card" style={{ padding: 20 }}>
                <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.55 }}>
                  <b style={{ color: "var(--off)" }}>{p.k}</b> {p.v}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
            <Link className="btn btn-violet" href="/#contact">
              Request an appointment
            </Link>
          </div>

          <div className="tag" style={{ color: "var(--violet-text)", marginBottom: 14 }}>
            {BROKERS.lookingForHeading}
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: "var(--text-dim)",
              maxWidth: 700,
              marginBottom: 20,
            }}
          >
            {BROKERS.lookingForBody}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {BROKERS.lookingForTags.map((t) => (
              <span key={t} className="tag-pill">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ---------------- faq ---------------- */}
      <Reveal as="section" className="section">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: 26, marginBottom: 36 }}>{FAQ.heading}</h2>
          <Faq />
        </div>
      </Reveal>

      {/* ---------------- contact ---------------- */}
      <Reveal as="section" id="contact" className="section section-alt">
        <div className="wrap">
          <div className="two-col">
            <div>
              <h2 style={{ fontSize: 28, marginBottom: 16 }}>{CONTACT_SECTION.heading}</h2>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "var(--text-dim)",
                  marginBottom: 28,
                }}
              >
                {CONTACT_SECTION.body}
              </p>
              <ContactForm />
            </div>

            <div>
              <div className="tag" style={{ color: "var(--violet-text)", marginBottom: 14 }}>
                Direct contact
              </div>
              <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
                  <div className="tag" style={{ marginBottom: 4, color: "var(--text-dim-2)" }}>
                    Email
                  </div>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </div>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
                  <div className="tag" style={{ marginBottom: 4, color: "var(--text-dim-2)" }}>
                    Phone
                  </div>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <div className="tag" style={{ marginBottom: 4, color: "var(--text-dim-2)" }}>
                    Brokers
                  </div>
                  <a href={`mailto:${CONTACT.brokerEmail}`}>{CONTACT.brokerEmail}</a>
                </div>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-dim-2)", marginTop: 16, lineHeight: 1.6 }}>
                {CONTACT.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <SiteFooter />
      <StickyCta />
    </>
  );
}
