import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#050807",
          backgroundImage:
            "linear-gradient(to right, rgba(45,212,191,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(45,212,191,0.06) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          padding: 72,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            width: 48,
            height: 3,
            backgroundColor: "#2dd4bf",
            borderRadius: 2,
            marginBottom: 28,
          }}
        />
        <div
          style={{
            fontSize: 54,
            fontWeight: 600,
            color: "#f4f4f5",
            letterSpacing: -0.04,
            lineHeight: 1.08,
            marginBottom: 18,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#a3a3a3",
            maxWidth: 920,
            lineHeight: 1.38,
            letterSpacing: -0.02,
          }}
        >
          {site.title}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 17,
            color: "#737373",
            letterSpacing: 0.02,
          }}
        >
          Portfolio · AI systems · ML · Full stack
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
