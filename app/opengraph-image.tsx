import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fawaz Bailey — Design & Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#111111",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: availability dot + label */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
            }}
          />
          <span style={{ fontSize: "18px", color: "#666666", letterSpacing: "0.08em" }}>
            OPEN TO WORK
          </span>
        </div>

        {/* Middle: name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              fontSize: "96px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Fawaz Bailey
          </span>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#888888",
              letterSpacing: "-0.01em",
            }}
          >
            Design & Software Engineer · Lagos, Nigeria
          </span>
        </div>

        {/* Bottom: URL */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: "20px", color: "#444444" }}>fawazbailey.com</span>
          <div style={{ display: "flex", gap: "12px" }}>
            {["React", "Next.js", "TypeScript"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "16px",
                  color: "#555555",
                  backgroundColor: "#1e1e1e",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  border: "1px solid #2a2a2a",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
