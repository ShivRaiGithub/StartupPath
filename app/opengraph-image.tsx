import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/lib/site";

export const alt = "StartPath - Global startup opportunities";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "linear-gradient(135deg, #f7f3df 0%, #f4ede0 45%, #ece3d2 100%)",
          color: "#1f2937",
          display: "flex",
          fontFamily: "Epilogue, Arial, sans-serif",
          height: "100%",
          width: "100%",
          padding: "56px",
        }}
      >
        <div
          style={{
            border: "3px solid #d4a373",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "48px",
            background: "rgba(255, 255, 255, 0.75)",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#9a3412" }}>
            Startup Directory
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 86, lineHeight: 1.05, fontWeight: 800 }}>{SITE_NAME}</div>
            <div style={{ fontSize: 34, lineHeight: 1.2, color: "#374151" }}>
              Find fellowships, accelerators, incubators, and grants worldwide.
            </div>
          </div>
          <div style={{ fontSize: 24, color: "#4b5563" }}>startpath.vercel.app</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
