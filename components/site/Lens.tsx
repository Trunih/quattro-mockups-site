/**
 * The signature device: one glowing signal-lens. Ambient violet bloom behind a
 * layered ring set, with a teal arc for the facet Quattro resolves.
 * Decorative only, so it is hidden from assistive tech.
 */
export function Lens({ size = 320 }: { size?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: size * 0.62,
          height: size * 0.62,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 38% 32%, rgba(108,79,224,0.4), rgba(108,79,224,0.05) 60%, transparent 72%)",
          filter: "blur(4px)",
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 320 320"
        style={{ position: "relative", maxWidth: "100%", height: "auto" }}
      >
        <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(241,240,244,0.08)" strokeWidth="1" />
        <circle cx="160" cy="160" r="108" fill="none" stroke="rgba(241,240,244,0.1)" strokeWidth="1" />
        <circle cx="160" cy="160" r="76" fill="url(#lensGrad)" opacity="0.9" />
        <circle cx="160" cy="160" r="76" fill="none" stroke="#6C4FE0" strokeWidth="1.5" opacity="0.7" />
        <path d="M 84 160 A 76 76 0 0 1 236 160" fill="none" stroke="#2BC4B0" strokeWidth="2" />
        <defs>
          <radialGradient id="lensGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#2A2440" />
            <stop offset="100%" stopColor="#0D0D12" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Small lens mark used as the wordmark bullet and in portal chrome. */
export function LensMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={{ flex: "none" }}>
      <circle cx="16" cy="16" r="11" fill="none" stroke="#6C4FE0" strokeWidth="2.5" />
      <path d="M7 16A9 9 0 0 1 25 16" fill="none" stroke="#2BC4B0" strokeWidth="2.5" />
    </svg>
  );
}
