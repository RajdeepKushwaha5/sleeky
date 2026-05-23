import { MapPinIcon } from "lucide-react";

import { USER } from "@/features/profile/data/user";

/* ── helpers (server-safe, computed at build time) ──────── */
const toRad = (deg: number) => (deg * Math.PI) / 180;
const CX = 455,
  CY = 276;

/* 72 tick marks every 5° for the rotating degree scale */
const SCOPE_TICKS = Array.from({ length: 72 }, (_, i) => {
  const angle = i * 5;
  const major = i % 6 === 0; // every 30°
  const medium = i % 2 === 0 && !major; // every 10°
  const r = toRad(angle);
  const outerR = 78;
  const innerR = major ? 67 : medium ? 73 : 75;
  return {
    x1: (CX + outerR * Math.cos(r)).toFixed(2),
    y1: (CY + outerR * Math.sin(r)).toFixed(2),
    x2: (CX + innerR * Math.cos(r)).toFixed(2),
    y2: (CY + innerR * Math.sin(r)).toFixed(2),
    major,
    medium,
  };
});

export function ProfileCoverEnhanced() {
  return (
    <section className="relative mx-3 min-h-[28rem] overflow-hidden border-b border-foreground/[0.08] pt-12 pb-12 sm:min-h-[30rem] sm:pt-18 sm:pb-16 md:mx-2">
      <div className="pointer-events-none absolute inset-x-[-50vw] top-0 h-8 bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--foreground)_9%,transparent),color-mix(in_oklab,var(--foreground)_9%,transparent)_1px,transparent_1px,transparent_12px)] opacity-45" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="hero-engineering-drawing absolute top-10 right-[-16rem] h-[22rem] w-[38rem] text-foreground opacity-[0.18] sm:right-[-10rem] sm:h-[28rem] sm:w-[48rem] sm:opacity-[0.22] md:right-[-8rem] md:h-[31rem] md:w-[55rem] md:opacity-[0.24] dark:opacity-[0.12] dark:sm:opacity-[0.16] dark:md:opacity-[0.18]"
          viewBox="0 0 920 560"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-hatch"
              width="8"
              height="8"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="8"
                stroke="currentColor"
                strokeWidth="2"
              />
            </pattern>
          </defs>

          <circle
            className="hero-ring-orbit"
            cx="530"
            cy="270"
            r="275"
            stroke="currentColor"
            strokeDasharray="9 10"
          />
          <circle cx="530" cy="270" r="195" stroke="currentColor" />
          <circle
            className="hero-inner-orbit"
            cx="530"
            cy="270"
            r="78"
            stroke="currentColor"
            strokeDasharray="4 8"
          />
          <line
            className="hero-scan-axis"
            x1="120"
            y1="270"
            x2="860"
            y2="270"
            stroke="currentColor"
            strokeDasharray="8 12"
          />
          <line
            className="hero-scan-axis-v"
            x1="530"
            y1="20"
            x2="530"
            y2="520"
            stroke="currentColor"
            strokeDasharray="8 12"
          />

          <path
            className="hero-hatch-panel"
            d="M140 170H650V276H140V170Z"
            fill="url(#hero-hatch)"
          />
          <path d="M140 276A155 155 0 0 1 295 121" stroke="currentColor" />

          {/* Scope background circle */}
          <circle
            cx={CX}
            cy={CY}
            r="82"
            className="hero-scope-bg"
            stroke="currentColor"
          />

          {/* ── Radar sweep arm ── */}
          <g className="hero-radar-sweep-arm">
            <path
              d="M530,270 L530,75 A195,195 0 0,1 642,110 Z"
              fill="currentColor"
              opacity="0.07"
            />
            <line
              x1="530"
              y1="270"
              x2="530"
              y2="75"
              stroke="currentColor"
              strokeWidth="8"
              opacity="0.05"
            />
            <line
              x1="530"
              y1="270"
              x2="530"
              y2="75"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.6"
            />
          </g>

          <circle
            className="hero-pulse-node hero-scope-bg"
            cx="720"
            cy="276"
            r="14"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            className="hero-ping-1"
            cx="720"
            cy="276"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle
            className="hero-ping-2"
            cx="720"
            cy="276"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            className="hero-ping-3"
            cx="720"
            cy="276"
            r="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />

          <path d="M720 292V334" stroke="currentColor" />
          <path d="M455 360V400" stroke="currentColor" strokeWidth="3" />
          <path
            className="hero-dash-flow"
            d="M475 350L518 458"
            stroke="currentColor"
            strokeDasharray="10 8"
          />

          <g className="hero-orbit-dot">
            <circle cx="530" cy="75" r="6" fill="currentColor" opacity="0.1" />
            <circle cx="530" cy="75" r="3" fill="currentColor" opacity="0.75" />
          </g>

          {/* ═══════════════════════════════════════════════
              HUD TARGETING SCOPE
              ─────────────────────────────────────────────
              Center: (455, 276)  Outer ring r=82
          ═══════════════════════════════════════════════ */}

          {/* Label */}
          <text
            x={CX}
            y="186"
            textAnchor="middle"
            fill="currentColor"
            className="font-mono text-[10px]"
            opacity="0.35"
          >
            SCOPE-7
          </text>

          {/* 1. Rotating outer degree scale */}
          <g className="hero-scope-outer">
            {SCOPE_TICKS.map((t, i) => (
              <line
                key={i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="currentColor"
                strokeWidth={t.major ? "1.3" : t.medium ? "0.75" : "0.45"}
                opacity={t.major ? "0.68" : t.medium ? "0.38" : "0.18"}
              />
            ))}
          </g>

          {/* 2. Counter-rotating dashed ring */}
          <circle
            className="hero-scope-ccw"
            cx={CX}
            cy={CY}
            r="55"
            stroke="currentColor"
            strokeDasharray="5 9"
            strokeWidth="0.8"
            opacity="0.42"
          />

          {/* 3. Fixed crosshairs — broken at centre (r=20 gap) */}
          <line
            x1="377"
            y1="276"
            x2="435"
            y2="276"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.44"
          />
          <line
            x1="475"
            y1="276"
            x2="533"
            y2="276"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.44"
          />
          <line
            x1="455"
            y1="198"
            x2="455"
            y2="256"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.44"
          />
          <line
            x1="455"
            y1="296"
            x2="455"
            y2="354"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.44"
          />

          {/* 4. Fixed mid-ring */}
          <circle
            cx={CX}
            cy={CY}
            r="35"
            stroke="currentColor"
            strokeWidth="0.55"
            opacity="0.3"
          />

          {/* 5. Inner counter-rotating dashed ring */}
          <circle
            className="hero-scope-ccw2"
            cx={CX}
            cy={CY}
            r="18"
            stroke="currentColor"
            strokeDasharray="2 5"
            strokeWidth="0.5"
            opacity="0.28"
          />

          {/* 6. Slow scanning arm (rotates independently) */}
          <line
            className="hero-scope-scan"
            x1={CX}
            y1={CY}
            x2={CX}
            y2="198"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.22"
          />

          {/* 7. Cardinal inward-pointing arrowheads (fixed) */}
          {/* Right  → */}
          <path
            d="M533,276 L527,271 L527,281 Z"
            fill="currentColor"
            opacity="0.48"
          />
          {/* Left   ← */}
          <path
            d="M377,276 L383,271 L383,281 Z"
            fill="currentColor"
            opacity="0.48"
          />
          {/* Top    ↑ */}
          <path
            d="M455,198 L450,204 L460,204 Z"
            fill="currentColor"
            opacity="0.48"
          />
          {/* Bottom ↓ */}
          <path
            d="M455,354 L450,348 L460,348 Z"
            fill="currentColor"
            opacity="0.48"
          />

          {/* 8. Centre hub */}
          <circle
            cx={CX}
            cy={CY}
            r="4.5"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.65"
          />
          <circle cx={CX} cy={CY} r="1.8" fill="currentColor" opacity="0.7" />

          {/* ── Existing labels ── */}
          <text
            x="160"
            y="195"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            H1
          </text>
          <text
            x="420"
            y="195"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            H2
          </text>
          <text
            x="266"
            y="287"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            DS2
          </text>
          <text
            x="742"
            y="281"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            DB16
          </text>
          <text
            x="718"
            y="358"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            KN0
          </text>
          <text
            x="650"
            y="110"
            fill="currentColor"
            className="font-mono text-[15px]"
          >
            2026
          </text>
        </svg>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <h1 className="max-w-[9ch] font-serif text-[3.2rem] leading-[0.88] font-medium tracking-normal text-foreground sm:text-[4.25rem] sm:leading-[0.86] md:text-[5.6rem]">
            {USER.firstName}
            <br />
            {USER.lastName}
            <sup className="ml-1 align-super font-mono text-[0.13em] text-foreground/35">
              io
            </sup>
          </h1>
          <p className="mt-5 font-mono text-[10px] tracking-[0.32em] text-foreground/45 uppercase">
            Full Stack Developer & AI Engineer
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-2 sm:mt-14">
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="size-3 shrink-0 text-foreground/35" />
            <span className="font-mono text-[9px] tracking-[0.22em] text-foreground/38 uppercase">
              India
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex size-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-55" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[9px] tracking-[0.22em] text-emerald-500/75 uppercase">
              Open to work
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
