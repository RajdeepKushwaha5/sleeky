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
  "/projects": "Projects",
  "/blog": "Blog",
  "/components": "Components",
};

// LEFT side - Section indicator with dots and active label
function LeftSectionIndicator({ activeSection }: { activeSection: string }) {
  return (
    <div className="fixed top-1/2 left-6 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      {/* Vertical dots */}
      <div className="flex flex-col gap-1.5">
        {SECTION_IDS.map((section, index) => {
          const isActive = activeSection === section.label;
          return (
            <motion.button
              key={section.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              onClick={() => {
                const element = document.getElementById(section.id);
                if (element) {
                  window.history.pushState(null, "", `#${section.id}`);
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className="group relative flex cursor-pointer items-center justify-center p-1"
              title={section.label}
              aria-label={`Navigate to ${section.label}`}
              type="button"
            >
              <div
                className={cn(
                  "rounded-full transition-all duration-500 ease-out",
                  isActive
                    ? "h-2.5 w-2.5 bg-foreground/70"
                    : "h-1.5 w-1.5 bg-foreground/15 group-hover:scale-125 group-hover:bg-foreground/35"
                )}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Section label - rotated vertically */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-3 origin-center rotate-[-90deg] text-[10px] font-semibold tracking-[0.3em] whitespace-nowrap text-foreground/40 uppercase"
        >
          {activeSection}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// RIGHT side - disabled (replaced by right sidebar nav)
function RightSideRuler() {
  return null;
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

  const routeSection = getSectionFromRoute(pathname);
  const activeSection = routeSection ?? scrollSection;

  useEffect(() => {
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

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const section = SECTION_IDS.find((s) => s.id === hash);
        if (section) {
          setScrollSection(section.label);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  if (side === "left") {
    return <LeftSectionIndicator activeSection={activeSection} />;
  }

  return <RightSideRuler />;
}
