"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface SideRulerProps {
  side: "left" | "right";
}

const SECTION_IDS = [
  { id: "overview", label: "Overview" },
  { id: "live", label: "Live" },
  { id: "social", label: "Social" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Tech Stack" },
  { id: "testimonials", label: "Testimonials" },
  { id: "blog", label: "Blog" },
  { id: "github", label: "GitHub" },
  { id: "activity", label: "Activity" },
  { id: "awards", label: "Awards" },
  { id: "certs", label: "Certs" },
  { id: "book-call", label: "Book Call" },
  { id: "contact", label: "Contact" },
];

// Route-based section mapping for non-home pages
const ROUTE_SECTIONS: Record<string, string> = {
  "/blog": "Blog",
  "/components": "Components",
};

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

// Navigation dots component for section navigation
function NavigationDots({ activeSection }: { activeSection: string }) {
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Update URL hash for bookmarking
      window.history.pushState(null, "", `#${sectionId}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {SECTION_IDS.map((section, index) => {
        const isActive = activeSection === section.label;
        return (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            onClick={() => handleNavigate(section.id)}
            className="group relative flex cursor-pointer items-center justify-center p-2"
            title={section.label}
            aria-label={`Navigate to ${section.label}`}
            type="button"
          >
            {/* Dot */}
            <motion.div
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                isActive
                  ? "scale-125 bg-zinc-800 dark:bg-zinc-200"
                  : "bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
              )}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />

            {/* Tooltip label on hover - positioned to the right */}
            <div className="pointer-events-none absolute left-6 z-50 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
              <div className="relative flex items-center">
                {/* Arrow pointing left */}
                <div className="h-0 w-0 border-t-4 border-r-4 border-b-4 border-l-0 border-solid border-t-transparent border-r-zinc-800 border-b-transparent dark:border-r-zinc-200" />
                {/* Label */}
                <div className="rounded-r bg-zinc-800 px-2 py-1 font-mono text-[10px] font-medium whitespace-nowrap text-white shadow-lg dark:bg-zinc-200 dark:text-zinc-900">
                  {section.label}
                </div>
              </div>
            </div>

            {/* Active indicator ring */}
            {isActive && (
              <motion.div
                layoutId="activeDotRing"
                className="absolute h-4 w-4 rounded-full border border-zinc-400 dark:border-zinc-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

// LEFT side section indicator - Large animated section names
function LeftSectionIndicator({ activeSection }: { activeSection: string }) {
  return (
    <div className="pointer-events-none fixed top-0 bottom-0 left-0 z-[100] hidden items-center justify-center xl:flex">
      <div className="relative flex h-full w-24 flex-col items-center justify-center">
        {/* Decorative vertical line */}
        <div className="absolute top-0 right-4 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-300/50 to-transparent dark:via-zinc-700/50" />

        {/* Navigation dots - centered vertically, right side of the line */}
        <div className="pointer-events-auto absolute top-1/2 right-2 z-[200] -translate-y-1/2">
          <NavigationDots activeSection={activeSection} />
        </div>

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
      </div>
    </div>
  );
}

// Get section label from route
function getSectionFromRoute(pathname: string): string | null {
  for (const [route, label] of Object.entries(ROUTE_SECTIONS)) {
    if (pathname.startsWith(route)) {
      return label;
    }
  }
  return null;
}

export function SideRuler({ side }: SideRulerProps) {
  const pathname = usePathname();
  const [scrollSection, setScrollSection] = useState(SECTION_IDS[0].label);

  // Compute route-based section (no useEffect needed)
  const routeSection = getSectionFromRoute(pathname);

  // Final active section: route takes priority, otherwise use scroll detection
  const activeSection = routeSection ?? scrollSection;

  // Handle home page intersection observer and hash changes
  useEffect(() => {
    // Skip if not on home page (route section takes over)
    if (pathname !== "/") {
      return;
    }

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
            setScrollSection(section.label);
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

    // Also check URL hash on mount and hash change
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const section = SECTION_IDS.find((s) => s.id === hash);
        if (section) {
          setScrollSection(section.label);
        }
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  // Render different components based on side
  // LEFT = Large animated section names
  // RIGHT = Numeric ruler
  if (side === "left") {
    return <LeftSectionIndicator activeSection={activeSection} />;
  }

  return <RightSideRuler activeSection={activeSection} />;
}
