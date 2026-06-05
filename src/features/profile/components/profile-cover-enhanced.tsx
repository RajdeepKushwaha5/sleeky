import { MapPinIcon } from "lucide-react";

import { USER } from "@/features/profile/data/user";

/* ════════════════════════════════════════════════════════════════
   HERO ENGINEERING DRAWING — "AI INFERENCE CONSOLE"
   ────────────────────────────────────────────────────────────────
   The blueprint encodes the work, not random shapes:

     NEURAL NET  →  Σ OUTPUT ENDPOINT  →  DATA BUS
        (AI)          (emitting live          (full-stack
                       inferences)             delivery)

   A targeting reticle (TRK-07) locks the signal along a golden-ratio
   (φ) spiral, while orbital rings carry satellite services and a
   telemetry block reports live bearing / range / lock status.
   All geometry is computed at build time → server-safe.
═══════════════════════════════════════════════════════════════════ */

const toRad = (deg: number) => (deg * Math.PI) / 180;

/* Reticle centre */
const CX = 455,
  CY = 276;

/* Main orbital system centre */
const MX = 530,
  MY = 270;

/* ── 72 tick marks every 5° for the rotating degree scale ──────── */
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

/* ── Golden-ratio (φ) logarithmic spiral, centred on the reticle ── */
const PHI_SPIRAL = (() => {
  const b = Math.log(1.618_033_988_75) / (Math.PI / 2); // golden growth
  const a = 1.4;
  let d = "";
  for (let t = 0; t <= 7.5 * Math.PI; t += 0.1) {
    const r = a * Math.exp(b * t);
    if (r > 252) break;
    const x = (CX + r * Math.cos(t)).toFixed(2);
    const y = (CY + r * Math.sin(t)).toFixed(2);
    d += d ? ` L${x},${y}` : `M${x},${y}`;
  }
  return d;
})();

/* ── Neural network — input(5) · hidden(6) · output(3) ─────────── */
const NN_LAYERS: { y: number; xs: number[] }[] = [
  { y: 104, xs: [654, 688, 722, 756, 790] },
  { y: 150, xs: [646, 676, 706, 736, 766, 796] },
  { y: 196, xs: [686, 720, 754] },
];
const NN_NODES = NN_LAYERS.flatMap((l) => l.xs.map((x) => ({ x, y: l.y })));
const NN_EDGES: { x1: number; y1: number; x2: number; y2: number }[] = [];
for (let i = 0; i < NN_LAYERS.length - 1; i++) {
  const a = NN_LAYERS[i];
  const b = NN_LAYERS[i + 1];
  for (const ax of a.xs)
    for (const bx of b.xs) NN_EDGES.push({ x1: ax, y1: a.y, x2: bx, y2: b.y });
}
/* output layer converges into the endpoint node */
const NN_CONVERGE = { x: 720, y: 240 };
const NN_OUT_EDGES = NN_LAYERS[2].xs.map((x) => ({
  x1: x,
  y1: NN_LAYERS[2].y,
  x2: NN_CONVERGE.x,
  y2: NN_CONVERGE.y,
}));

/* ── Bearing readouts around the reticle (radar cardinals) ─────── */
const BEARINGS = [
  { x: CX, y: 184, t: "000", anchor: "middle" as const },
  { x: 552, y: 280, t: "090", anchor: "start" as const },
  { x: 358, y: 280, t: "270", anchor: "end" as const },
];

/* ── Satellite services sitting on the primary orbit (r = 195) ─── */
const SATELLITES = [
  { deg: 38, label: "S1" },
  { deg: 150, label: "S0" },
].map((s) => {
  const r = toRad(s.deg);
  return {
    x: +(MX + 195 * Math.cos(r)).toFixed(2),
    y: +(MY + 195 * Math.sin(r)).toFixed(2),
    label: s.label,
  };
});

/* ── Telemetry block lines ─────────────────────────────────────── */
const TELEMETRY = ["BRG 047.3°", "RNG 1.642 φ", "ELV +12.7°", "LCK ●ACQ"];

export function ProfileCoverEnhanced() {
  return (
    <section className="relative mx-3 min-h-[28rem] overflow-hidden border-b border-foreground/[0.08] pt-12 pb-12 sm:min-h-[30rem] sm:pt-18 sm:pb-16 md:mx-2">
      <div className="pointer-events-none absolute inset-x-[-50vw] top-0 h-8 bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--foreground)_9%,transparent),color-mix(in_oklab,var(--foreground)_9%,transparent)_1px,transparent_1px,transparent_12px)] opacity-45" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="hero-engineering-drawing absolute top-8 right-[-9rem] h-[26rem] w-[40rem] text-foreground opacity-[0.32] sm:top-10 sm:right-[-10rem] sm:h-[28rem] sm:w-[48rem] sm:opacity-[0.35] md:right-[-8rem] md:h-[31rem] md:w-[55rem] md:opacity-[0.38] dark:opacity-[0.15] dark:sm:opacity-[0.16] dark:md:opacity-[0.18]"
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
            <pattern
              id="hero-dot-grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="1.5"
                cy="1.5"
                r="0.75"
                fill="currentColor"
                opacity="0.1"
              />
            </pattern>
            <radialGradient id="hero-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ═══ BACKGROUND DOT GRID ═══ */}
          <rect
            x="0"
            y="0"
            width="920"
            height="560"
            fill="url(#hero-dot-grid)"
          />

          {/* ═══ CORNER BRACKETS ═══ */}
          <g opacity="0.25">
            <path
              d="M 25,45 L 25,25 L 45,25"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 895,45 L 895,25 L 875,25"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 25,515 L 25,535 L 45,535"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 895,515 L 895,535 L 875,535"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          </g>

          {/* ═══ ORBITAL FRAME ═══ */}
          <circle
            className="hero-ring-orbit"
            cx={MX}
            cy={MY}
            r="275"
            stroke="currentColor"
            strokeDasharray="9 10"
          />
          <circle cx={MX} cy={MY} r="195" stroke="currentColor" />

          {/* Satellite services riding the primary orbit */}
          {SATELLITES.map((s, i) => (
            <g key={i} opacity="0.5">
              <line
                x1={MX}
                y1={MY}
                x2={s.x}
                y2={s.y}
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="2 6"
                opacity="0.45"
              />
              <circle
                cx={s.x}
                cy={s.y}
                r="3.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <circle cx={s.x} cy={s.y} r="1.2" fill="currentColor" />
              <text
                x={s.x + 8}
                y={s.y + 3}
                fill="currentColor"
                className="font-mono text-[8px]"
                opacity="0.6"
              >
                {s.label}
              </text>
            </g>
          ))}

          {/* Scan axes (data bus + sync line) */}
          <line
            className="hero-scan-axis"
            x1="120"
            y1={MY}
            x2="860"
            y2={MY}
            stroke="currentColor"
            strokeDasharray="8 12"
          />
          <line
            className="hero-scan-axis-v"
            x1={MX}
            y1="20"
            x2={MX}
            y2="520"
            stroke="currentColor"
            strokeDasharray="8 12"
          />

          {/* ═══ φ GOLDEN-RATIO SPIRAL (locks the reticle to the field) ═══ */}
          <path
            className="hero-scope-spiral"
            d={PHI_SPIRAL}
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
            opacity="0.3"
          />
          <text
            x="572"
            y="346"
            fill="currentColor"
            className="font-mono text-[9px]"
            opacity="0.32"
          >
            φ 1.618
          </text>

          {/* ═══ HATCH SUBSTRATE + EDGE TRACES ═══ */}
          <path
            className="hero-hatch-panel"
            d="M140 170H650V276H140V170Z"
            fill="url(#hero-hatch)"
          />
          {/* PCB right-angle trace with vias */}
          <path
            d="M140,276 L200,276 L200,200 L260,200 L260,121 L295,121"
            stroke="currentColor"
            strokeWidth="0.9"
            fill="none"
            opacity="0.65"
          />
          {[
            [200, 276],
            [200, 200],
            [260, 200],
            [260, 121],
          ].map(([vx, vy], i) => (
            <g key={i}>
              <circle
                cx={vx}
                cy={vy}
                r="2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.5"
              />
              <circle
                cx={vx}
                cy={vy}
                r="1"
                fill="currentColor"
                opacity="0.55"
              />
            </g>
          ))}

          {/* CLK sine waveform (inside hatch band, y = 225 ± 19) */}
          <path
            className="hero-clk-wave"
            d="M152,225 C166.6,206 177.4,206 192,225 C206.6,244 217.4,244 232,225 C246.6,206 257.4,206 272,225 C286.6,244 297.4,244 312,225 C326.6,206 337.4,206 352,225 C366.6,244 377.4,244 392,225 C406.6,206 417.4,206 432,225 C446.6,244 457.4,244 472,225"
            stroke="currentColor"
            strokeWidth="0.85"
            fill="none"
            opacity="0.52"
            strokeLinecap="round"
          />
          <text
            x="152"
            y="218"
            fill="currentColor"
            className="font-mono text-[8px]"
            opacity="0.3"
          >
            CLK
          </text>

          {/* ═══ NEURAL NETWORK · 5·6·3 ═══ */}
          <g className="hero-nn">
            {/* synapse edges */}
            {NN_EDGES.map((e, i) => (
              <line
                key={`e${i}`}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="currentColor"
                strokeWidth="0.35"
                opacity="0.22"
              />
            ))}
            {/* convergence into endpoint */}
            {NN_OUT_EDGES.map((e, i) => (
              <line
                key={`o${i}`}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="currentColor"
                strokeWidth="0.45"
                opacity="0.4"
              />
            ))}
            {/* neurons */}
            {NN_NODES.map((n, i) => (
              <circle
                key={`n${i}`}
                cx={n.x}
                cy={n.y}
                r="2.6"
                fill="var(--background)"
                stroke="currentColor"
                strokeWidth="0.7"
                opacity="0.7"
              />
            ))}
          </g>
          {/* trace from convergence node down to the endpoint */}
          <line
            x1={NN_CONVERGE.x}
            y1={NN_CONVERGE.y}
            x2="720"
            y2="262"
            stroke="currentColor"
            strokeWidth="0.7"
            opacity="0.5"
          />
          <text
            x="618"
            y="90"
            fill="currentColor"
            className="font-mono text-[9px]"
            opacity="0.4"
          >
            NET 5·6·3
          </text>

          {/* ═══ Σ OUTPUT ENDPOINT — emits live inferences ═══ */}
          <circle cx="720" cy="276" r="20" fill="url(#hero-core-glow)" />
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
          <text
            x="742"
            y="281"
            fill="currentColor"
            className="font-mono text-[15px]"
          >
            Σ OUT
          </text>

          {/* downstream conduits onto the bus */}
          <path d="M720 292V334" stroke="currentColor" />
          <path d="M455 360V400" stroke="currentColor" strokeWidth="3" />
          <path
            className="hero-dash-flow"
            d="M475 350L518 458"
            stroke="currentColor"
            strokeDasharray="10 8"
          />

          {/* orbiting probe */}
          <g className="hero-orbit-dot">
            <circle cx={MX} cy="75" r="6" fill="currentColor" opacity="0.1" />
            <circle cx={MX} cy="75" r="3" fill="currentColor" opacity="0.75" />
          </g>

          {/* radar sweep arm */}
          <g className="hero-radar-sweep-arm">
            <line
              x1={MX}
              y1={MY}
              x2={MX}
              y2="75"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.6"
            />
          </g>

          {/* ═══════════════════════════════════════════════
              HUD TARGETING RETICLE — TRK-07
              Centre (455, 276) · outer ring r = 82
          ═══════════════════════════════════════════════ */}
          <circle
            cx={CX}
            cy={CY}
            r="82"
            className="hero-scope-bg"
            stroke="currentColor"
          />

          <text
            x={CX}
            y="166"
            textAnchor="middle"
            fill="currentColor"
            className="font-mono text-[10px]"
            opacity="0.4"
          >
            TRK-07
          </text>

          {/* bearing readouts */}
          {BEARINGS.map((b, i) => (
            <text
              key={i}
              x={b.x}
              y={b.y}
              textAnchor={b.anchor}
              fill="currentColor"
              className="font-mono text-[7px]"
              opacity="0.4"
            >
              {b.t}
            </text>
          ))}

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
            y1={CY}
            x2="435"
            y2={CY}
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.44"
          />
          <line
            x1="475"
            y1={CY}
            x2="533"
            y2={CY}
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.44"
          />
          <line
            x1={CX}
            y1="198"
            x2={CX}
            y2="256"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.44"
          />
          <line
            x1={CX}
            y1="296"
            x2={CX}
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

          {/* 6. Slow scanning arm */}
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

          {/* 7. Cardinal inward-pointing arrowheads */}
          <path
            d="M533,276 L527,271 L527,281 Z"
            fill="currentColor"
            opacity="0.48"
          />
          <path
            d="M377,276 L383,271 L383,281 Z"
            fill="currentColor"
            opacity="0.48"
          />
          <path
            d="M455,198 L450,204 L460,204 Z"
            fill="currentColor"
            opacity="0.48"
          />
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

          {/* ═══ TELEMETRY READOUT ═══ */}
          {TELEMETRY.map((line, i) => (
            <text
              key={i}
              x="548"
              y={150 + i * 13}
              fill="currentColor"
              className="font-mono text-[8px]"
              opacity="0.4"
            >
              {line}
            </text>
          ))}

          {/* ═══ Ø 164 DIMENSION ANNOTATION ═══ */}
          <line
            x1="373"
            y1="392"
            x2="373"
            y2="404"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.38"
          />
          <line
            x1="537"
            y1="392"
            x2="537"
            y2="404"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.38"
          />
          <line
            x1="373"
            y1="399"
            x2="537"
            y2="399"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.38"
          />
          <path
            d="M373,399 L379,396 L379,402 Z"
            fill="currentColor"
            opacity="0.38"
          />
          <path
            d="M537,399 L531,396 L531,402 Z"
            fill="currentColor"
            opacity="0.38"
          />
          <text
            x={CX}
            y="398"
            textAnchor="middle"
            fill="currentColor"
            className="font-mono text-[8px]"
            opacity="0.42"
          >
            Ø 164
          </text>

          {/* ═══ SUBSTRATE / FRAME LABELS ═══ */}
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
            x="650"
            y="110"
            fill="currentColor"
            className="font-mono text-[15px]"
          >
            2026
          </text>

          {/* ═══ SYSTEM METRICS MONITOR (Top Left) ═══ */}
          <g opacity="0.4">
            <rect
              x="40"
              y="80"
              width="180"
              height="75"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="4 4"
            />
            <path
              d="M40 80 H90 L100 90 H220 V155 H40 Z"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />
            <text
              x="50"
              y="103"
              fill="currentColor"
              className="font-mono text-[9px] font-bold"
            >
              {"SYS_MON // EXE"}
            </text>
            <text
              x="50"
              y="117"
              fill="currentColor"
              className="font-mono text-[8px]"
            >
              {"CORE_TEMP : 38.6 C"}
            </text>
            <text
              x="50"
              y="129"
              fill="currentColor"
              className="font-mono text-[8px]"
            >
              {"BUS_LOAD  : 14.2%"}
            </text>
            <text
              x="50"
              y="141"
              fill="currentColor"
              className="font-mono text-[8px]"
            >
              {"FPS_VAL   : 144Hz"}
            </text>

            <rect
              x="145"
              y="110"
              width="60"
              height="6"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
            <rect x="147" y="112" width="38" height="2" fill="currentColor" />
            <rect
              x="145"
              y="122"
              width="60"
              height="6"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
            <rect x="147" y="124" width="12" height="2" fill="currentColor" />
            <rect
              x="145"
              y="134"
              width="60"
              height="6"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
            <rect x="147" y="136" width="50" height="2" fill="currentColor" />
          </g>

          {/* Decorative circuit path on left */}
          <path
            d="M 40,65 H 180 L 200,85 M 120,65 V 50"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
          <circle cx="200" cy="85" r="1.5" fill="currentColor" opacity="0.3" />
          <circle cx="120" cy="50" r="1.5" fill="currentColor" opacity="0.3" />
          <text
            x="210"
            y="88"
            fill="currentColor"
            className="font-mono text-[7px]"
            opacity="0.3"
          >
            BUS_A
          </text>

          {/* ═══ BINARY/HEX TELEMETRY DUMP (Bottom Left) ═══ */}
          <g opacity="0.38">
            <rect
              x="40"
              y="380"
              width="280"
              height="150"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
            />

            {/* Grid corner markers */}
            <line
              x1="35"
              y1="380"
              x2="45"
              y2="380"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <line
              x1="40"
              y1="375"
              x2="40"
              y2="385"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <line
              x1="315"
              y1="380"
              x2="325"
              y2="380"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <line
              x1="320"
              y1="375"
              x2="320"
              y2="385"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <line
              x1="35"
              y1="530"
              x2="45"
              y2="530"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <line
              x1="40"
              y1="525"
              x2="40"
              y2="535"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <line
              x1="315"
              y1="530"
              x2="325"
              y2="530"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <line
              x1="320"
              y1="525"
              x2="320"
              y2="535"
              stroke="currentColor"
              strokeWidth="0.8"
            />

            <text
              x="50"
              y="398"
              fill="currentColor"
              className="font-mono text-[9px] font-bold"
            >
              {"MEMORY_DUMP // SEG_07"}
            </text>
            <text
              x="50"
              y="415"
              fill="currentColor"
              className="font-mono text-[8px]"
            >
              {"0x00FF01  7A 9C F3 B2 D4 E8  [INIT]"}
            </text>
            <text
              x="50"
              y="427"
              fill="currentColor"
              className="font-mono text-[8px]"
            >
              {"0x00FF0E  12 A0 D2 FE C8 B1  [RUN_OK]"}
            </text>
            <text
              x="50"
              y="439"
              fill="currentColor"
              className="font-mono text-[8px]"
            >
              {"0x00FF1B  FF FF FF 00 2C 19  [STAGE]"}
            </text>
            <text
              x="50"
              y="451"
              fill="currentColor"
              className="font-mono text-[8px]"
            >
              {"0x00FF28  8B 3F 22 5D A4 0C  [PIPE_L]"}
            </text>
            <text
              x="50"
              y="463"
              fill="currentColor"
              className="font-mono text-[8px]"
            >
              {"0x00FF35  C6 D0 E4 91 1E AB  [CALIB]"}
            </text>

            {/* Simple ALU/Registers Block Diagram */}
            <rect
              x="210"
              y="410"
              width="30"
              height="20"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
            />
            <text
              x="215"
              y="422"
              fill="currentColor"
              className="font-mono text-[7px]"
            >
              REG_A
            </text>
            <rect
              x="210"
              y="435"
              width="30"
              height="20"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
            />
            <text
              x="215"
              y="447"
              fill="currentColor"
              className="font-mono text-[7px]"
            >
              REG_B
            </text>
            <rect
              x="248"
              y="410"
              width="62"
              height="45"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
            />
            <text
              x="265"
              y="436"
              fill="currentColor"
              className="font-mono text-[9px]"
            >
              ALU_01
            </text>
            {/* Bus traces */}
            <path
              d="M 240,420 H 248 M 240,445 H 248 M 310,432 H 318"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <circle cx="318" cy="432" r="1.5" fill="currentColor" />

            {/* Personalized India Coordinates GPS tele */}
            <text
              x="50"
              y="495"
              fill="currentColor"
              className="font-mono text-[8px] font-bold"
            >
              {"GEO_LOCK: 28°37'02\" N / 77°12'19\" E"}
            </text>
            <text
              x="50"
              y="507"
              fill="currentColor"
              className="font-mono text-[8px]"
            >
              {"LOC_REF : NEW DELHI, IND"}
            </text>
            <text
              x="50"
              y="519"
              fill="currentColor"
              className="font-mono text-[8px]"
            >
              {"SIGNAL_STRENGTH : 98.4% (EXCELLENT)"}
            </text>
          </g>

          {/* ═══ HARMONIC FREQUENCY SPECTRUM (Bottom Right) ═══ */}
          <g opacity="0.45">
            <rect
              x="620"
              y="360"
              width="260"
              height="150"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
            />
            <text
              x="630"
              y="378"
              fill="currentColor"
              className="font-mono text-[9px] font-bold"
            >
              {"SPECTRUM_ANALYSIS // f(t)"}
            </text>

            {/* Fine grids */}
            <line
              x1="620"
              y1="410"
              x2="880"
              y2="410"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="2 4"
            />
            <line
              x1="620"
              y1="460"
              x2="880"
              y2="460"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="2 4"
            />
            <line
              x1="670"
              y1="390"
              x2="670"
              y2="510"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="2 4"
            />
            <line
              x1="720"
              y1="390"
              x2="720"
              y2="510"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="2 4"
            />
            <line
              x1="770"
              y1="390"
              x2="770"
              y2="510"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="2 4"
            />
            <line
              x1="820"
              y1="390"
              x2="820"
              y2="510"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="2 4"
            />

            {/* Complex static harmonic wave */}
            <path
              d="M 620,435 Q 640,390 660,435 T 700,435 T 740,435 T 780,435 T 820,435 T 860,435 T 880,435"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              opacity="0.3"
            />
            {/* Fast moving harmonic wave */}
            <path
              className="hero-wave-fast"
              d="M 620,435 Q 635,465 650,435 T 680,435 T 710,435 T 740,435 T 770,435 T 800,435 T 830,435 T 860,435 T 880,435"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              opacity="0.5"
            />
            {/* Slow moving harmonic wave */}
            <path
              className="hero-wave-slow"
              d="M 620,435 Q 650,370 680,435 T 740,435 T 800,435 T 860,435 T 880,435"
              stroke="currentColor"
              strokeWidth="0.6"
              fill="none"
              opacity="0.4"
            />

            {/* Dynamic frequency equalizer bars (animated via CSS keyframes) */}
            <g transform="translate(630, 480)" className="hero-bars">
              <rect
                x="0"
                y="0"
                width="4"
                height="25"
                fill="currentColor"
                className="hero-bar-1"
                transform="scale(1, -1)"
              />
              <rect
                x="8"
                y="0"
                width="4"
                height="15"
                fill="currentColor"
                className="hero-bar-2"
                transform="scale(1, -1)"
              />
              <rect
                x="16"
                y="0"
                width="4"
                height="32"
                fill="currentColor"
                className="hero-bar-3"
                transform="scale(1, -1)"
              />
              <rect
                x="24"
                y="0"
                width="4"
                height="20"
                fill="currentColor"
                className="hero-bar-4"
                transform="scale(1, -1)"
              />
              <rect
                x="32"
                y="0"
                width="4"
                height="8"
                fill="currentColor"
                className="hero-bar-5"
                transform="scale(1, -1)"
              />
              <rect
                x="40"
                y="0"
                width="4"
                height="28"
                fill="currentColor"
                className="hero-bar-6"
                transform="scale(1, -1)"
              />
              <rect
                x="48"
                y="0"
                width="4"
                height="18"
                fill="currentColor"
                className="hero-bar-7"
                transform="scale(1, -1)"
              />
              <rect
                x="56"
                y="0"
                width="4"
                height="12"
                fill="currentColor"
                className="hero-bar-8"
                transform="scale(1, -1)"
              />
            </g>

            <text
              x="695"
              y="495"
              fill="currentColor"
              className="font-mono text-[8px] opacity-75"
            >
              {"f(t) = Σ A_n sin(nωt + φ_n)"}
            </text>
            <text
              x="695"
              y="504"
              fill="currentColor"
              className="font-mono text-[7px] opacity-45"
            >
              {"SAMPLING RATE: 48.0 kSa/s"}
            </text>
          </g>

          {/* ═══ HUD TARGETING RETICLE OVERLAY (TRK-07) ═══ */}
          <g opacity="0.45" className="hero-scope-lock">
            {/* Corner bracket lock markers */}
            <path
              d="M 360,181 L 350,181 L 350,191"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 550,181 L 560,181 L 560,191"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 360,371 L 350,371 L 350,361"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 550,371 L 560,371 L 560,361"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
          </g>

          {/* ═══ NEURAL NETWORK LABELS & WEIGHTS ═══ */}
          <g opacity="0.4" className="font-mono text-[7px]">
            <text x="642" y="77">
              IN_5
            </text>
            <text x="735" y="77">
              HID_6
            </text>
            <text x="795" y="77">
              OUT_3
            </text>
            <text x="668" y="124" opacity="0.5">
              w:0.72
            </text>
            <text x="668" y="172" opacity="0.5">
              w:-0.34
            </text>
            <text x="712" y="142" opacity="0.5">
              w:1.05
            </text>
            <text x="768" y="222" opacity="0.5">
              w:0.88
            </text>
          </g>

          {/* Extra diagonal calibration line */}
          <line
            x1="620"
            y1="120"
            x2="650"
            y2="150"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <circle cx="650" cy="150" r="1.5" fill="currentColor" opacity="0.3" />
          <text
            x="654"
            y="153"
            fill="currentColor"
            className="font-mono text-[7px]"
            opacity="0.3"
          >
            CAL_T
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
