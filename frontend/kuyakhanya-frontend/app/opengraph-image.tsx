import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KUYAKHANYA FM — We Shine Brighter Together";
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
          padding: "60px",
          background: "linear-gradient(135deg, #1a0b2e 0%, #4B0082 45%, #6a0dad 100%)",
          color: "white",
          position: "relative",
        }}
      >
        {/* gold hairline */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, transparent, #FFD700, transparent)" }} />
        {/* glow */}
        <div style={{ position: "absolute", top: -80, left: -80, width: 520, height: 520, borderRadius: 9999, background: "rgba(255,215,0,0.08)", filter: "blur(40px)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#FFD700", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a0b2e", fontSize: 28, fontWeight: 900 }}>K</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>KUYAKHANYA <span style={{ color: "#FFD700" }}>FM</span></div>
            <div style={{ fontSize: 14, letterSpacing: 5, color: "#FFD700", fontWeight: 700, marginTop: 4 }}>WE SHINE BRIGHTER TOGETHER</div>
          </div>
        </div>
        <div style={{ marginTop: 32, fontSize: 54, fontWeight: 900, lineHeight: 0.95, maxWidth: 900 }}>
          Bringing Light to Thembalethu
          <br />
          <span style={{ color: "#FFD700" }}>Live 24/7 • Music • Shows • Community</span>
        </div>
        <div style={{ marginTop: 20, fontSize: 18, color: "rgba(255,255,255,0.8)", maxWidth: 880 }}>
          Online Christian radio from Thembalethu, George — uplifting music, inspirational messages & community programs.
        </div>
        <div style={{ position: "absolute", bottom: 30, left: 60, display: "flex", gap: 12, alignItems: "center", color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
          <span>kuyakhanyafm.web.app</span>
          <span style={{ width: 6, height: 6, borderRadius: 9999, background: "#FFD700" }} />
          <span>Thembalethu • George • South Africa</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
