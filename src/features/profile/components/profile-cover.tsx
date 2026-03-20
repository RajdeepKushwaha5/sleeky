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
      className="absolute inset-0 z-0 h-full w-full object-cover"
      src="/assets/kiminonawa-sky.gif"
      alt=""
      loading="eager"
      fetchPriority="low"
      decoding="async"
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="absolute inset-0 z-0 h-full w-full object-cover"
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
          "relative aspect-[2.2/1] overflow-hidden rounded-2xl select-none sm:aspect-[2.8/1]",
          "flex flex-col items-center justify-center gap-3",
          "mx-2 my-6",
          // Animated glow border
          "ring-1 ring-black/[0.03] dark:ring-white/[0.04]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-[2] before:rounded-2xl",
          "before:ring-2 before:ring-white/10 before:ring-inset dark:before:ring-white/5"
        )}
      >
        {/* Animated Background — only loads the GIF matching the active theme */}
        <ThemedCoverGif />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/25 to-black/5 dark:from-black/70 dark:via-black/30 dark:to-black/10" />

        {/* Aura pulse glow — bottom edge */}
        <div
          className="absolute bottom-0 left-1/2 z-[1] h-32 w-3/4 -translate-x-1/2 blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, var(--aura-ring) 0%, transparent 70%)",
            animation: "aura-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Deep cinematic vignette */}
        <div
          className="absolute inset-0 z-[4]"
          style={{ boxShadow: "inset 0 0 150px rgba(0,0,0,0.4)" }}
        />

        {/* Quote Subtitle - Per aspera ad astra */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative z-10 font-serif text-lg tracking-[0.04em] italic sm:text-xl md:text-2xl"
          style={{
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            background:
              "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Per aspera ad astra
        </motion.p>
      </div>
    </BrandContextMenu>
  );
}
