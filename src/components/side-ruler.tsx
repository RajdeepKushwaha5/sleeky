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

// Navigation dots component - minimal elegant design
function NavigationDots({ activeSection }: { activeSection: string }) {
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.history.pushState(null, "", `#${sectionId}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {SECTION_IDS.map((section, index) => {
        const isActive = activeSection === section.label;
        return (
          <motion.button
            key={section.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            onClick={() => handleNavigate(section.id)}
            className="group relative flex cursor-pointer items-center justify-center p-1.5"
            title={section.label}
            aria-label={`Navigate to ${section.label}`}
            type="button"
          >
            {/* Dot - elegant minimal style */}
            <div
              className={cn(
                "rounded-full transition-all duration-300",
                isActive
                  ? "h-2.5 w-2.5 bg-foreground/80"
                  : "h-1.5 w-1.5 bg-foreground/20 group-hover:bg-foreground/40"
              )}
            />

            {/* Tooltip - clean pill style */}
            <div className="pointer-events-none absolute right-6 z-50 opacity-0 transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100">
              <div className="rounded-full bg-foreground px-3 py-1 text-xs font-medium whitespace-nowrap text-background shadow-lg">
                {section.label}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// LEFT side - Empty now as everything moved to right
function LeftSectionIndicator({ activeSection }: { activeSection: string }) {
  return null;
}

// RIGHT side - Navigation dots and Section name
function RightSideRuler({ activeSection }: { activeSection: string }) {
  return (
    <div className="pointer-events-none fixed top-0 right-0 bottom-0 z-[100] hidden xl:flex items-center justify-center">
      <div className="relative flex h-full w-20 flex-col items-center justify-center">
        {/* Navigation dots */}
        <div className="pointer-events-auto absolute top-1/2 left-2 z-[200] -translate-y-1/2">
          <NavigationDots activeSection={activeSection} />
        </div>

        {/* Minimal section name - serif italic */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              <span className="font-serif text-2xl font-medium italic text-foreground/15 tracking-widest uppercase">
                {activeSection}
              </span>
            </motion.div>
          </AnimatePresence>
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

  return <RightSideRuler activeSection={activeSection} />;
}

