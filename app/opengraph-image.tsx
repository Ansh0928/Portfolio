import { ImageResponse } from "next/og";
import { meta } from "@/lib/data";

export const runtime = "edge";
export const alt = meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        background: "#0d1117",
        padding: "64px",
        fontFamily: "monospace",
      }}
    >
      {/* Green accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "#3fb950",
        }}
      />
      <p
        style={{
          fontSize: "14px",
          color: "#3fb950",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        FORWARD DEPLOYED ENGINEER
      </p>
      <h1
        style={{
          fontSize: "56px",
          fontWeight: "bold",
          color: "#e6edf3",
          lineHeight: 1.1,
          marginBottom: "24px",
        }}
      >
        {meta.name}
      </h1>
      <p
        style={{
          fontSize: "20px",
          color: "#8b949e",
          marginBottom: "40px",
        }}
      >
        $300k+ revenue supported · Gold Coast, AU
      </p>
      <p
        style={{
          fontSize: "14px",
          color: "#484f58",
          letterSpacing: "0.1em",
        }}
      >
        {meta.url}
      </p>
    </div>,
    { ...size },
  );
}
