"use client";

import { useEffect, useRef } from "react";

/* Sprite positions in the 256×128 sheet (8×4 grid of 32×32 frames).
   Each pair is [col, row] multiplied by 32 to get CSS background-position.
   Negative values because the sheet is positioned with negative offsets. */
const SPRITES = {
  idle: [[-3, -3]] as const,
  alert: [[-7, -3]] as const,
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ] as const,
  scratchWallN: [
    [0, 0],
    [0, -1],
  ] as const,
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ] as const,
  scratchWallE: [
    [-2, -2],
    [-2, -1],
  ] as const,
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ] as const,
  tired: [[-3, -2]] as const,
  sleeping: [
    [-2, 0],
    [-2, -1],
  ] as const,
  N: [
    [-1, -2],
    [-1, -3],
  ] as const,
  NE: [
    [0, -2],
    [0, -3],
  ] as const,
  E: [
    [-3, 0],
    [-3, -1],
  ] as const,
  SE: [
    [-5, -1],
    [-5, -2],
  ] as const,
  S: [
    [-6, -3],
    [-7, -2],
  ] as const,
  SW: [
    [-5, -3],
    [-6, -1],
  ] as const,
  W: [
    [-4, -2],
    [-4, -3],
  ] as const,
  NW: [
    [-1, 0],
    [-1, -1],
  ] as const,
};

type SpriteName = keyof typeof SPRITES;

const SPEED = 6;

function direction(dx: number, dy: number): SpriteName {
  const a = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
  if (a >= 337.5 || a < 22.5) return "E";
  if (a < 67.5) return "SE";
  if (a < 112.5) return "S";
  if (a < 157.5) return "SW";
  if (a < 202.5) return "W";
  if (a < 247.5) return "NW";
  if (a < 292.5) return "N";
  return "NE";
}

export function OnekoCat() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch-only devices — no cursor to chase
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let nekoX = mouseX;
    let nekoY = mouseY;
    let tick = 0;
    let idleTime = 0;
    let idleAnim: SpriteName | null = null;
    let idleFrame = 0;
    let raf: number;

    el.style.left = `${nekoX}px`;
    el.style.top = `${nekoY}px`;
    el.style.display = "block";

    function setSprite(name: SpriteName, frame: number) {
      const frames = SPRITES[name] as readonly (readonly [number, number])[];
      const [x, y] = frames[frame % frames.length];
      el!.style.backgroundPosition = `${x * 32}px ${y * 32}px`;
    }

    function resetIdle() {
      idleAnim = null;
      idleFrame = 0;
    }

    function idle() {
      idleTime++;

      if (idleTime > 10 && idleAnim === null && Math.random() < 0.012) {
        const pool: SpriteName[] = ["sleeping", "scratchSelf"];
        if (nekoX < 32) pool.push("scratchWallW");
        if (nekoY < 32) pool.push("scratchWallN");
        if (nekoX > window.innerWidth - 32) pool.push("scratchWallE");
        if (nekoY > window.innerHeight - 32) pool.push("scratchWallS");
        idleAnim = pool[Math.floor(Math.random() * pool.length)];
      }

      if (idleAnim === "sleeping") {
        setSprite(
          idleFrame < 8 ? "tired" : "sleeping",
          Math.floor(idleFrame / 4)
        );
        if (idleFrame > 192) resetIdle();
      } else if (idleAnim !== null) {
        setSprite(idleAnim, idleFrame);
        if (idleFrame > 9) resetIdle();
      } else {
        setSprite("idle", 0);
      }

      idleFrame++;
    }

    function frame() {
      tick++;

      // Difference from neko centre (nekoX/Y are top-left, +16 = centre of 32px sprite)
      const dx = mouseX - (nekoX + 16);
      const dy = mouseY - (nekoY + 16);
      const dist = Math.hypot(dx, dy);

      if (dist < SPEED || dist < 48) {
        idle();
        raf = requestAnimationFrame(frame);
        return;
      }

      // Brief alert before running
      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.max(0, idleTime - 1);
        raf = requestAnimationFrame(frame);
        return;
      }

      resetIdle();
      idleTime = 0;

      const step = Math.min(SPEED, dist);
      nekoX += (dx / dist) * step;
      nekoY += (dy / dist) * step;
      nekoX = Math.min(Math.max(0, nekoX), window.innerWidth - 32);
      nekoY = Math.min(Math.max(0, nekoY), window.innerHeight - 32);

      el!.style.left = `${nekoX}px`;
      el!.style.top = `${nekoY}px`;
      setSprite(direction(dx, dy), Math.floor(tick / 2));

      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(frame);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-[9999] hidden"
      style={{
        width: 32,
        height: 32,
        backgroundImage: "url('/oneko.gif')",
        backgroundSize: "256px 128px",
        imageRendering: "pixelated",
      }}
    />
  );
}
