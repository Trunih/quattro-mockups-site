import type { Metadata, Viewport } from "next";
import "./globals.css";

const DIRECTION_CONTRACT = `<!--
THESIS: one glowing signal-lens is the whole product, seen once in the hero and again as the two facets that read it; the portals are that same lens turned inward on one building at a time.
OWN-WORLD: true black, ambient violet bloom (soft radial glow, not flat neon fill), a teal secondary reserved for what Quattro resolves, a spectrum hairline standing for "the full signal", pill CTAs and rounded glass cards throughout.
STORY: a visitor sees the lens, understands it reads two signals, sees proof and program; an agent signs in and moves a building from submission to bound; an underwriter reads the same two signals and decides.
FIRST VIEWPORT: marketing, centered lens graphic upper-right with headline and pill CTA left on true black; portals, a dense queue under the same spectrum hairline with the primary action pinned top-right.
FORM: ambient-glow and glass/chrome material from curated references, extended from one Persuade page into Operate surfaces at higher density without changing palette, type, or corner language. Bloom, direction 3 of the 5 reviewed, is the pinned world.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->`;

export const metadata: Metadata = {
  metadataBase: new URL("https://quattro-mockups-site.vercel.app"),
  title: {
    default: "Quattro Insurance | Specialty MGA for Long-Term Care Liability",
    template: "%s | Quattro Insurance",
  },
  description:
    "Quattro is a managing general agency for long-term care liability. We underwrite each building on its own operating data, not a class average, with full limits where the rest of the market cuts you off.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07070A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Direction contract, emitted as a real HTML comment so it survives the
            production build and stays auditable. JSX comments do not render. */}
        <div dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
