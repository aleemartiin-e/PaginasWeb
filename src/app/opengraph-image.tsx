import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0f0d",
          backgroundImage:
            "radial-gradient(ellipse at top left, rgba(62,207,142,0.25), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#3ecf8e",
              display: "flex",
            }}
          />
          <span style={{ color: "#8b9a93", fontSize: 28, letterSpacing: 4 }}>
            {site.name.toUpperCase()}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            color: "#f2f5f3",
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
