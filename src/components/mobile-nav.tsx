"use client";

import { ChevronRight, ExternalLink } from "lucide-react";
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
  extras,
  className,
}: {
  items: NavItem[];
  extras?: React.ReactNode;
  className?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "group/toggle flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors hover:bg-foreground/5",
            className
          )}
          size="icon"
        >
          <span className="flex h-[2px] w-5 origin-center rounded-full bg-foreground transition-all duration-300 group-data-[state=open]/toggle:translate-y-[7px] group-data-[state=open]/toggle:rotate-45" />
          <span className="flex h-[2px] w-3.5 self-end rounded-full bg-foreground transition-all duration-300 group-data-[state=open]/toggle:scale-0 group-data-[state=open]/toggle:opacity-0" />
          <span className="flex h-[2px] w-4 rounded-full bg-foreground transition-all duration-300 group-data-[state=open]/toggle:-translate-y-[7px] group-data-[state=open]/toggle:-rotate-45" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="relative w-[min(20rem,calc(100vw-2rem))] overflow-hidden border border-border/20 bg-popover/95 p-6 backdrop-blur-md"
        align="end"
        sideOffset={12}
      >
        {/* Decorative corner brackets */}
        <div className="absolute top-2 left-2 h-4 w-4 border-t border-l border-foreground/10" />
        <div className="absolute top-2 right-2 h-4 w-4 border-t border-r border-foreground/10" />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-foreground/10" />
        <div className="absolute right-2 bottom-2 h-4 w-4 border-r border-b border-foreground/10" />

        {/* Search extras */}
        {extras && <div className="mb-4">{extras}</div>}

        {/* Menu items */}
        <div className="space-y-1">
          {items.map((link) => (
            <DropdownMenuItem
              key={link.href}
              asChild
              className="group relative rounded-none border-none px-2 py-3 focus:bg-transparent"
            >
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between transition-opacity hover:opacity-70"
                >
                  <span className="text-xl font-medium tracking-tight text-foreground/80 group-hover:text-foreground">
                    {link.title}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:scale-110" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center justify-between transition-opacity hover:opacity-70"
                >
                  <span className="text-xl font-medium tracking-tight text-foreground/80 group-hover:text-foreground">
                    {link.title}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </Link>
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
