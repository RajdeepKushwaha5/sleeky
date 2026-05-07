"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { BrandContextMenu } from "@/components/brand-context-menu";
import { cn } from "@/lib/utils";

function ThemedCoverGif() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const root = document.documentElement;

    const resolve = () => {
      const cls = root.classList;
      if (cls.contains("dark")) return setIsDark(true);
      if (cls.contains("light")) return setIsDark(false);
      setIsDark(mq.matches);
    };

    resolve();

    // Watch for class changes (next-themes toggles .dark/.light)
    const observer = new MutationObserver(resolve);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    mq.addEventListener("change", resolve);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", resolve);
    };
  }, []);

  if (isDark === null) return null; // SSR / first paint — show nothing briefly

  return isDark ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
      src="/assets/kiminonawa-sky.gif"
      alt=""
      loading="eager"
      fetchPriority="low"
      decoding="async"
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
      style={{ filter: "grayscale(100%) contrast(1.1)" }}
      src="/assets/giphy.gif"
      alt=""
      loading="eager"
      fetchPriority="low"
      decoding="async"
    />
  );
}

export function ProfileCover() {
  return (
    <BrandContextMenu>
      <div
        className={cn(
          "group relative aspect-[2.2/1] overflow-hidden rounded-2xl select-none sm:aspect-[2.8/1]",
          "flex flex-col items-center justify-center gap-3",
          "mx-2 my-6",
          // Enhanced glow border
          "ring-1 ring-black/[0.04] dark:ring-white/[0.06]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-[2] before:rounded-2xl",
          "before:ring-2 before:ring-white/15 before:ring-inset dark:before:ring-white/[0.06]",
          // Hover shadow
          "transition-shadow duration-700",
          "hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
        )}
      >
        {/* Animated Background — only loads the GIF matching the active theme */}
        <ThemedCoverGif />

        {/* Cinematic gradient overlay — enhanced depth */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/65 via-black/30 to-black/5 dark:from-black/75 dark:via-black/35 dark:to-black/10" />

        {/* Secondary side gradient for depth */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/20 via-transparent to-black/20" />

        {/* Aura pulse glow — bottom edge, more vivid */}
        <div
          className="absolute bottom-0 left-1/2 z-[1] h-36 w-4/5 -translate-x-1/2 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, var(--aura-ring) 0%, transparent 65%)",
            animation: "aura-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Deep cinematic vignette — stronger */}
        <div
          className="absolute inset-0 z-[4]"
          style={{ boxShadow: "inset 0 0 180px rgba(0,0,0,0.45)" }}
        />

        {/* Subtle shimmer overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[3] opacity-[0.04]"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 45%, transparent 50%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 4s linear infinite",
          }}
        />

        {/* Quote Subtitle - Per aspera ad astra */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="hero-text-gradient relative z-10 font-serif text-xl tracking-[0.06em] italic sm:text-2xl md:text-3xl"
          style={{
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          }}
        >
          Per aspera ad astra
        </motion.p>
      </div>
    </BrandContextMenu>
  );
}
