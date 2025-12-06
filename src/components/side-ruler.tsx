"use client";

import { motion } from "motion/react";
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

export function SideRuler({ side }: SideRulerProps) {
  const isLeft = side === "left";
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

    const observer = new IntersectionObserver(observerCallback, observerOptions);

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

  // Generate scale marks
  const scaleMarks = [];
  const max = 1000;
  const step = 50;
  for (let i = 0; i <= max; i += step) {
    scaleMarks.push(i);
  }

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 z-[100] hidden xl:block pointer-events-none",
        isLeft ? "left-0" : "right-0"
      )}
    >
      <div className="relative h-full w-16 flex flex-col">
        {/* Vertical line */}
        <div
          className={cn(
            "absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-300 to-transparent dark:via-zinc-700",
            isLeft ? "right-4" : "left-4"
          )}
        />

        {/* Active section label */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute top-8 text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-semibold",
            isLeft ? "right-6 -rotate-90 origin-right" : "left-6 rotate-90 origin-left"
          )}
        >
          {activeSection}
        </motion.div>

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
                transition={{ duration: 0.5, delay: index * 0.02 }}
                className="absolute"
                style={{
                  top: `${position}%`,
                  [isLeft ? "right" : "left"]: "1rem",
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
                  <div
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 text-[9px] font-mono text-zinc-400 dark:text-zinc-600",
                      isLeft ? "right-4" : "left-4"
                    )}
                  >
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
          transition={{ duration: 0.8, delay: 0.8 }}
          className={cn(
            "absolute bottom-8 w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600",
            isLeft ? "right-[14px]" : "left-[14px]"
          )}
        />
      </div>
    </div>
  );
}
