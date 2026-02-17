"use client";

import type { TOCItemType } from "fumadocs-core/toc";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function SidebarTOC({ items }: { items: TOCItemType[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    // Observe all headings
    items.forEach((item) => {
      const id = item.url.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <nav className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-24">
        <p className="mb-4 font-mono text-xs tracking-wider text-foreground/40 uppercase">
          On this page
        </p>
        <ul className="space-y-2 border-l border-border/20">
          {items.map((item) => {
            const id = item.url.replace("#", "");
            const isActive = activeId === id;
            const depth = Math.max(item.depth - 2, 0);

            return (
              <li
                key={item.url}
                style={{ paddingLeft: `${12 + depth * 12}px` }}
              >
                <a
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                      setActiveId(id);
                    }
                  }}
                  className={cn(
                    "block py-1 text-sm transition-colors duration-200",
                    isActive
                      ? "-ml-px border-l-2 border-foreground pl-3 text-foreground"
                      : "text-foreground/50 hover:text-foreground/80"
                  )}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
