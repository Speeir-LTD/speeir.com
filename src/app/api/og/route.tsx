import { ImageResponse } from "next/og";
import { LOGO_DATA_URI } from "./logo";

export const runtime = "nodejs";

// Brand tokens mirrored from tailwind.config.js — ImageResponse can't read Tailwind.
const VOID = "#110D18";
const PRIMARY = "#A15FDC";
const MUTED = "#8A7F96";

const SIZE = { width: 1200, height: 630 };
const TAGLINE = "Software agency · Dublin, Ireland";

// The wordmark lives in logo.ts as an inlined data URI, rasterised from
// public/logo.svg (Satori renders that SVG's clipPaths unreliably, and a
// bundled asset path isn't fetchable from a serverless function).
// Regenerate after a logo change:
//   node -e 'const s=require("sharp"),f=require("fs");s("public/logo.svg",{density:600}).resize({width:304}).png({compressionLevel:9,palette:true}).toBuffer().then(b=>f.writeFileSync("src/app/api/og/logo.ts",`export const LOGO_DATA_URI =\n  "data:image/png;base64,${b.toString("base64")}";\n`))'

// Chat clients (WhatsApp especially) crop the 1.91:1 card toward square in
// their large preview, so everything lives in a vertically centred block
// rather than being pushed to the top and bottom edges.
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 120) || "Speeir";
  const subtitle = searchParams.get("subtitle")?.slice(0, 200) || "";

  // Long headlines need to step down or they overflow the safe area.
  const titleSize = title.length > 70 ? 52 : title.length > 45 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: VOID,
          padding: "0 80px",
        }}
      >
        {/* Ambient brand glow, echoing the site's blob gradients */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${PRIMARY}59 0%, ${PRIMARY}00 70%)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img */}
          <img src={LOGO_DATA_URI} width={152} height={84} alt="Speeir" />
          <div
            style={{
              paddingLeft: 22,
              borderLeft: `2px solid ${PRIMARY}55`,
              fontSize: 22,
              color: MUTED,
              letterSpacing: "0.02em",
            }}
          >
            {TAGLINE}
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: titleSize,
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: MUTED,
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        )}

        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            color: PRIMARY,
          }}
        >
          <div style={{ width: 44, height: 3, background: PRIMARY }} />
          speeir.com
        </div>
      </div>
    ),
    SIZE
  );
}
