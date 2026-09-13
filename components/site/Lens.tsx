/**
 * The signature device: one glowing signal-lens. A soft sage bloom behind a
 * layered ring set, with a clay arc marking the facet Quattro resolves. A
 * slow breathing pulse on the bloom plus staggered outward-fading rings read
 * as a live signal being read off the circle, not a static badge. Decorative
 * only, so it is hidden from assistive tech; the pulse/ping animations are
 * transform+opacity only (no layout shift) and collapse to a single static
 * frame under prefers-reduced-motion via the sitewide reduced-motion rule.
 */
export function Lens({ size = 320 }: { size?: number }) {
  const ringDiameter = size * 0.475; // matches the visible olive circle's own diameter
  const ringDelays = [0, 1.2, 2.4];

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
      {ringDelays.map((delay) => (
        <div
          key={delay}
          className="lens-ping"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: ringDiameter,
            height: ringDiameter,
            borderRadius: "50%",
            border: "1px solid rgba(130,152,110,0.6)",
            animationDelay: `${delay}s`,
          }}
        />
      ))}
      <div
        className="lens-breathe"
        style={{
          position: "absolute",
          width: size * 0.62,
          height: size * 0.62,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 38% 32%, rgba(174,196,159,0.55), rgba(174,196,159,0.08) 60%, transparent 72%)",
          filter: "blur(4px)",
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 320 320"
        style={{ position: "relative", maxWidth: "100%", height: "auto" }}
      >
        <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(42,46,32,0.12)" strokeWidth="1" />
        <circle cx="160" cy="160" r="108" fill="none" stroke="rgba(42,46,32,0.14)" strokeWidth="1" />
        <circle cx="160" cy="160" r="76" fill="url(#lensGrad)" opacity="0.95" />
        <circle cx="160" cy="160" r="76" fill="none" stroke="#41502C" strokeWidth="1.5" opacity="0.75" />
        <path d="M 84 160 A 76 76 0 0 1 236 160" fill="none" stroke="#C98A5E" strokeWidth="2" />
        <defs>
          <radialGradient id="lensGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#EFE8D6" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Small lens mark used as the wordmark bullet, on the dark nav/footer
 * surfaces — sage + clay, not the hero's dark olive, so it stays legible
 * against a dark olive ground.
 */
export function LensMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" style={{ flex: "none" }}>
      <circle cx="16" cy="16" r="11" fill="none" stroke="#AEC49F" strokeWidth="2.5" />
      <path d="M7 16A9 9 0 0 1 25 16" fill="none" stroke="#C98A5E" strokeWidth="2.5" />
    </svg>
  );
}
