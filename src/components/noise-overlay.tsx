"use client";

import { useEffect, useRef } from "react";

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      // Only update every 3rd frame for subtle animation
      if (frame % 3 === 0) {
        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * 255;
          data[i] = noise; // R
          data[i + 1] = noise; // G
          data[i + 2] = noise; // B
          data[i + 3] = 12; // Alpha (very subtle)
        }
        ctx.putImageData(imageData, 0, 0);
      }

      frame++;
      animationId = requestAnimationFrame(generateNoise);
    };

    resize();
    generateNoise();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035] mix-blend-overlay dark:opacity-[0.04]"
      aria-hidden="true"
    />
  );
}
