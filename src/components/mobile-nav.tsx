"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

export function MobileNav({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("group/toggle flex flex-col gap-1", className)}
          size="icon"
        >
          <span className="flex h-0.5 w-4 transform rounded-[1px] bg-foreground transition-transform group-data-[state=open]/toggle:translate-y-[3px] group-data-[state=open]/toggle:rotate-45" />
          <span className="flex h-0.5 w-4 transform rounded-[1px] bg-foreground transition-transform group-data-[state=open]/toggle:translate-y-[-3px] group-data-[state=open]/toggle:-rotate-45" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="relative w-72 overflow-hidden border-edge/80 bg-popover/95 p-0 backdrop-blur-md"
        align="end"
        sideOffset={12}
      >
        {/* Blueprint-style decorative corner brackets */}
        <div className="pointer-events-none absolute top-1.5 left-1.5 h-3 w-3 border-t-2 border-l-2 border-foreground/20" />
        <div className="pointer-events-none absolute top-1.5 right-1.5 h-3 w-3 border-t-2 border-r-2 border-foreground/20" />
        <div className="pointer-events-none absolute bottom-1.5 left-1.5 h-3 w-3 border-b-2 border-l-2 border-foreground/20" />
        <div className="pointer-events-none absolute right-1.5 bottom-1.5 h-3 w-3 border-r-2 border-b-2 border-foreground/20" />

        {/* Header section with title */}
        <div className="border-b border-edge/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Navigation
            </span>
          </div>
        </div>

        {/* Menu items */}
        <div className="p-2">
          {items.map((link) => (
            <DropdownMenuItem
              key={link.href}
              asChild
              className="group relative mb-1 rounded-lg border border-transparent px-4 py-3 transition-all hover:border-edge/40 hover:bg-accent/30"
            >
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between"
                >
                  <span
                    className={cn(
                      "text-base font-medium",
                      link.title === "Resume" && "text-foreground"
                    )}
                  >
                    {link.title}
                  </span>
                  <svg
                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center justify-between"
                >
                  <span className="text-base font-medium">{link.title}</span>
                  <svg
                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </DropdownMenuItem>
          ))}
        </div>

        {/* Footer decoration */}
        <div className="border-t border-edge/60 px-4 py-2">
          <div className="flex items-center gap-2 opacity-40">
            <div className="h-px flex-1 bg-foreground/20" />
            <div className="h-1 w-1 rounded-full bg-foreground/30" />
            <div className="h-px flex-1 bg-foreground/20" />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
