"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface CADGridProps {
  showGrid?: boolean;
  showDimensions?: boolean;
}

export function CADGrid({
  showGrid = true,
  showDimensions = true,
}: CADGridProps) {
  const { resolvedTheme } = useTheme();
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!showGrid) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700",
        resolvedTheme === "dark" ? "opacity-100" : "opacity-80"
      )}
      aria-hidden="true"
    >
      {/* 1. Base Blueprint Grid Background */}
      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:40px_40px]",
          resolvedTheme === "dark"
            ? "[--grid-line:rgba(255,255,255,0.015)]"
            : "[--grid-line:rgba(0,0,0,0.015)]"
        )}
      />

      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:160px_160px]",
          resolvedTheme === "dark"
            ? "[--grid-line:rgba(255,255,255,0.03)]"
            : "[--grid-line:rgba(0,0,0,0.03)]"
        )}
      />

      {/* 2. Concentric CAD Circles centered in the top middle of the page */}
      <svg className="absolute inset-0 h-full w-full">
        {/* Outer radial bounds */}
        <defs>
          <radialGradient id="cad-grad" cx="50%" cy="15%" r="50%">
            <stop
              offset="0%"
              stopColor={
                resolvedTheme === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)"
              }
            />
            <stop offset="60%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#cad-grad)" />

        {/* Center crosshair */}
        <g transform={`translate(${windowSize.width / 2}, 180)`}>
          {/* Concentric circles */}
          {[120, 240, 360, 480, 640].map((radius, idx) => (
            <circle
              key={radius}
              cx="0"
              cy="0"
              r={radius}
              fill="none"
              stroke={
                resolvedTheme === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)"
              }
              strokeWidth={idx % 2 === 0 ? "1.5" : "1"}
              strokeDasharray={idx % 2 === 0 ? "4, 6" : "2, 4"}
              className="origin-center"
              style={{
                animation: `float ${15 + idx * 5}s linear infinite`,
              }}
            />
          ))}

          {/* Isometric angle guide lines */}
          {[-60, -30, 0, 30, 60, 90, 180, 210, 240, 270, 300, 330].map(
            (angle) => (
              <line
                key={angle}
                x1="0"
                y1="0"
                x2={700 * Math.cos((angle * Math.PI) / 180)}
                y2={700 * Math.sin((angle * Math.PI) / 180)}
                stroke={
                  resolvedTheme === "dark"
                    ? "rgba(255,255,255,0.015)"
                    : "rgba(0,0,0,0.012)"
                }
                strokeWidth="1"
                strokeDasharray="5, 10"
              />
            )
          )}

          {/* Technical labels along axes */}
          <text
            x="140"
            y="-8"
            className="fill-foreground/30 font-mono text-[9px] font-medium tracking-wider"
          >
            H2+ 8*8
          </text>
          <text
            x="260"
            y="-8"
            className="fill-foreground/20 font-mono text-[9px] font-medium tracking-wider"
          >
            U816
          </text>
          <text
            x="380"
            y="-8"
            className="fill-foreground/20 font-mono text-[9px] font-medium tracking-wider"
          >
            DH33
          </text>
          <text
            x="-200"
            y="-8"
            className="fill-foreground/25 font-mono text-[9px] font-medium tracking-wider"
          >
            U52g
          </text>

          {/* Rotating degree compass */}
          <g className="origin-center animate-[spin_60s_linear_infinite]">
            <circle
              cx="0"
              cy="0"
              r="200"
              fill="none"
              stroke={
                resolvedTheme === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.04)"
              }
              strokeWidth="1"
              strokeDasharray="1, 8"
            />
          </g>
        </g>

        {/* Diagonal Hatching/Stripes in corners */}
        <pattern
          id="diagonal-stripes"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="20"
            stroke={
              resolvedTheme === "dark"
                ? "rgba(255,255,255,0.02)"
                : "rgba(0,0,0,0.015)"
            }
            strokeWidth="2"
          />
        </pattern>

        {/* Striped panels on the sides */}
        <rect
          x="0"
          y="0"
          width="80"
          height="100%"
          fill="url(#diagonal-stripes)"
          className="hidden xl:block"
        />
        <rect
          x={windowSize.width - 80}
          y="0"
          width="80"
          height="100%"
          fill="url(#diagonal-stripes)"
          className="hidden xl:block"
        />
      </svg>

      {showDimensions && (
        <div
          className={cn(
            "absolute top-0 bottom-0 left-0 z-10 hidden w-6 flex-col items-center justify-between border-r py-12 font-mono text-[8px] tracking-widest md:flex",
            resolvedTheme === "dark"
              ? "border-white/[0.04] text-white/20"
              : "border-black/[0.04] text-black/20"
          )}
        >
          <span>000</span>
          <span>200</span>
          <span>400</span>
          <span>600</span>
          <span>800</span>
          <span>1000</span>
        </div>
      )}
    </div>
  );
}
