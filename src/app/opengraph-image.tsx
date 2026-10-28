import { ImageResponse } from "next/og";

export const alt = "Subham Sangwan | Product and Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#faf8f5",
          color: "#1a1a1a",
          borderTop: "12px solid #ff5c00",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>SS.</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700 }}>Subham Sangwan</div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 20 }}>
            Product and Full-Stack Developer
          </div>
          <div style={{ display: "flex", fontSize: 26, marginTop: 16, color: "#6b6b6b" }}>
            AI / ML projects and open-source contributions
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#6b6b6b" }}>
          github.com/Subham-KRLX
        </div>
      </div>
    ),
    size,
  );
}
