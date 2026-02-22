import { ImageResponse } from "next/og";

import { SITE_INFO } from "@/config/site";
import { USER } from "@/features/profile/data/user";

export const runtime = "edge";

export const alt = `${USER.displayName} – ${USER.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        background: "#09090b",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Ambient corner glows */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse at 100% 100%, rgba(52,211,153,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Border frame */}
      <div
        style={{
          position: "absolute",
          inset: "28px",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
          display: "flex",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: "70px 80px",
        }}
      >
        {/* Top row: URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${SITE_INFO.url}/icon.png`}
            width={32}
            height={32}
            style={{ borderRadius: "50%" }}
            alt="avatar"
          />
          <span
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
              fontFamily: "monospace",
            }}
          >
            {SITE_INFO.url.replace("https://", "")}
          </span>
        </div>

        {/* Center: name + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Phonetics row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "14px",
              color: "rgba(255,255,255,0.22)",
              fontFamily: "monospace",
              letterSpacing: "0.04em",
            }}
          >
            <span style={{ fontStyle: "italic" }}>/rɑːdʒdiːp sɪŋ/</span>
            <span>•</span>
            <span>noun</span>
            <span>•</span>
            <span>Full Stack Developer</span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {USER.displayName}
          </div>

          {/* Job title */}
          <div
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.45)",
              fontWeight: 400,
              letterSpacing: "0.01em",
              lineHeight: 1.4,
            }}
          >
            {USER.jobTitle}
          </div>
        </div>

        {/* Bottom row: tech tags */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {["React", "Next.js", "TypeScript", "Blockchain", "AI"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "6px 14px",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "999px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "monospace",
                letterSpacing: "0.06em",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
