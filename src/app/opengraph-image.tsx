import { ImageResponse } from "next/og";

export const alt = "Speeir — Software agency that builds what it pitches";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens mirrored from tailwind.config.js — ImageResponse can't read Tailwind.
const VOID = "#110D18";
const PRIMARY = "#A15FDC";
const MUTED = "#8A7F96";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: VOID,
          padding: "72px 80px",
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

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              background: PRIMARY,
            }}
          />
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.01em",
            }}
          >
            Speeir
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              color: "#FFFFFF",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Software agency that builds what it pitches
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: MUTED,
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Web, mobile, and custom software — and our own products first.
          </div>
        </div>

        <div
          style={{
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
    size,
  );
}
