"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface SideRulerProps {
  side: "left" | "right";
}

const SECTION_IDS = [
  { id: "overview", label: "Overview" },
  { id: "live", label: "Live Status" },
  { id: "social", label: "Social Links" },
  { id: "about", label: "About" },
  { id: "github", label: "GitHub" },
  { id: "activity", label: "Activity" },
  { id: "tech", label: "Tech Stack" },
  { id: "blog", label: "Blog" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "certs", label: "Certifications" },
  { id: "book-call", label: "Book Call" },
  { id: "contact", label: "Contact" },
];

// Animated letter component for staggered reveal
function AnimatedLetter({ letter, index }: { letter: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.95 }}
      transition={{
        duration: 0.12,
        delay: index * 0.012,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-block"
      style={{ display: letter === " " ? "inline" : "inline-block" }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
}

// LEFT side section indicator - Large animated section names
function LeftSectionIndicator({ activeSection }: { activeSection: string }) {
  return (
    <div className="pointer-events-none fixed top-0 bottom-0 left-0 z-[100] hidden items-center justify-center xl:flex">
      <div className="relative flex h-full w-24 flex-col items-center justify-center">
        {/* Decorative vertical line */}
        <div className="absolute top-0 right-4 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-300/50 to-transparent dark:via-zinc-700/50" />

        {/* Top decorative corner bracket */}
        <div className="absolute top-20 right-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="flex flex-col items-end gap-0.5 opacity-40"
          >
            <div className="h-4 w-px bg-foreground" />
            <div className="-mt-4 h-px w-3 bg-foreground" />
          </motion.div>
        </div>

        {/* Large animated section name */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="relative"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              {/* Glow effect layer */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/50 opacity-20 blur-xl dark:from-zinc-400/30 dark:via-zinc-500/20 dark:to-zinc-400/30"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                }}
              />

              {/* Section name with animated letters */}
              <div className="relative font-mono text-5xl font-bold tracking-[0.2em] uppercase">
                <span className="bg-gradient-to-b from-zinc-600 via-zinc-500 to-zinc-700 bg-clip-text text-transparent dark:from-zinc-300 dark:via-zinc-400 dark:to-zinc-500">
                  {activeSection.split("").map((letter, index) => (
                    <AnimatedLetter
                      key={`${activeSection}-${index}`}
                      letter={letter}
                      index={index}
                    />
                  ))}
                </span>
              </div>

              {/* Shimmer overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 dark:via-white/5"
                animate={{
                  opacity: [0, 0.5, 0],
                  y: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative measurement marks */}
        <div className="absolute top-1/4 right-5 flex flex-col gap-8 opacity-30">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: 0.1 + i * 0.03 }}
              className="h-px w-2 bg-foreground"
            />
          ))}
        </div>

        <div className="absolute right-5 bottom-1/4 flex flex-col gap-8 opacity-30">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: 0.15 + i * 0.03 }}
              className="h-px w-2 bg-foreground"
            />
          ))}
        </div>

        {/* Bottom decorative corner bracket */}
        <div className="absolute right-6 bottom-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="flex flex-col items-end gap-0.5 opacity-40"
          >
            <div className="h-px w-3 bg-foreground" />
            <div className="-mt-0.5 h-4 w-px bg-foreground" />
          </motion.div>
        </div>

        {/* Animated dot indicator */}
        <motion.div
          className="absolute right-[14px] bottom-12"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="h-2 w-2 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-500 shadow-sm dark:from-zinc-500 dark:to-zinc-600" />
        </motion.div>
      </div>
    </div>
  );
}

// RIGHT side ruler - Keep the original ruler design
function RightSideRuler({ activeSection }: { activeSection: string }) {
  // Generate scale marks
  const scaleMarks = [];
  const max = 1000;
  const step = 50;
  for (let i = 0; i <= max; i += step) {
    scaleMarks.push(i);
  }

  return (
    <div className="pointer-events-none fixed top-0 right-0 bottom-0 z-[100] hidden xl:block">
      <div className="relative flex h-full w-16 flex-col">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />

        {/* Scale container */}
        <div className="relative flex-1 py-20">
          {/* Scale marks */}
          {scaleMarks.map((mark, index) => {
            const position = (mark / max) * 100;
            const isMajorMark = mark % 100 === 0;

            return (
              <motion.div
                key={mark}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.008 }}
                className="absolute"
                style={{
                  top: `${position}%`,
                  left: "1rem",
                }}
              >
                {/* Tick mark */}
                <div
                  className={cn(
                    "bg-zinc-300 dark:bg-zinc-700",
                    isMajorMark ? "h-px w-3" : "h-px w-2"
                  )}
                />

                {/* Number label for major marks */}
                {isMajorMark && (
                  <div className="absolute top-1/2 left-4 -translate-y-1/2 font-mono text-[9px] text-zinc-400 dark:text-zinc-600">
                    {mark}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom dot */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute bottom-8 left-[14px] h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-600"
        />
      </div>
    </div>
  );
}

export function SideRuler({ side }: SideRulerProps) {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0].label);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = SECTION_IDS.find((s) => s.id === entry.target.id);
          if (section) {
            setActiveSection(section.label);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    SECTION_IDS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Render different components based on side
  // LEFT = Large animated section names
  // RIGHT = Numeric ruler
  if (side === "left") {
    return <LeftSectionIndicator activeSection={activeSection} />;
  }

  return <RightSideRuler activeSection={activeSection} />;
}
