"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.35,
        lerp: 0.065,
        smoothWheel: true,
        wheelMultiplier: 0.85,
      }}
    >
      {children}
    </ReactLenis>
  );
}
