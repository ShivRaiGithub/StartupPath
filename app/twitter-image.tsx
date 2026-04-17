import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/lib/site";

export const alt = "StartPath startup opportunities directory";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(165deg, #fef9e8 0%, #f5e6d3 100%)",
          color: "#111827",
          display: "flex",
          fontFamily: "Epilogue, Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            padding: "20px 50px",
            borderLeft: "10px solid #ea580c",
            maxWidth: 980,
            background: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 34, lineHeight: 1.2 }}>
            Global programs for founders: accelerators, fellowships, incubators, and grants.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
