import type { Metadata, Viewport } from "next";
import "./globals.css";

const DIRECTION_CONTRACT = `<!--
THESIS: the site reads a building's own signal, warm and grounded rather than clinical; sage and olive stand in for a living record, not a dashboard.
OWN-WORLD: a warm paper ground, deep olive as the primary voice, sage as the resolving accent, clay used sparingly as a single warm highlight, full pill buttons, generously rounded cards, and major sections raised as soft card-colored panels rather than flush hard-lined grids.
STORY: a visitor reads the pricing problem, understands the two signals Quattro reads, sees proof and program, then signs in through one shared platform-login entry point into whichever authenticated view their role unlocks.
FIRST VIEWPORT: a soft blurred sage blob behind the hero, headline with one italic emphasis, pill CTAs, and the signal-lens graphic recolored into the new palette.
FORM: Piazzolla for display type, IBM Plex Sans for body, IBM Plex Mono for eyebrow and mono labels, carried at the same density into the authenticated Client and Capacity Provider dashboards.
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
  themeColor: "#F7F3E9",
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
          href="https://fonts.googleapis.com/css2?family=Piazzolla:ital,opsz,wght@0,8..30,400;0,8..30,500;0,8..30,600;1,8..30,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
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
