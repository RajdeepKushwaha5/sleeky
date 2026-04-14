"use client";

import { ChevronRight, ExternalLink, HeartIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
        className="relative w-[min(20rem,calc(100vw-2rem))] overflow-hidden border border-border/15 bg-background/95 p-6 backdrop-blur-xl dark:bg-[#0b0b0b]/95"
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
                  <span className="font-outfit text-lg font-medium tracking-tight text-foreground/70 group-hover:text-foreground">
                    {link.title}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:scale-110 group-hover:text-foreground/60" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center justify-between transition-opacity hover:opacity-70"
                >
                  <span className="font-outfit text-lg font-medium tracking-tight text-foreground/70 group-hover:text-foreground">
                    {link.title}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-foreground/60" />
                </Link>
              )}
            </DropdownMenuItem>
          ))}
        </div>

        {/* Sponsor link */}
        <DropdownMenuSeparator className="my-3 bg-border/15" />
        <DropdownMenuItem
          asChild
          className="group/sponsor rounded-none border-none px-2 py-2 focus:bg-transparent"
        >
          <a
            href="https://github.com/sponsors/RajdeepKushwaha5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all duration-300 hover:opacity-90"
          >
            <HeartIcon
              className="h-3.5 w-3.5 fill-none text-pink-400/60 transition-all duration-300 group-hover/sponsor:[animation:heartbeat_1.2s_ease-in-out_infinite] group-hover/sponsor:text-pink-400"
              strokeWidth={1.5}
            />
            <span className="text-sm font-medium text-muted-foreground/50 transition-colors duration-300 group-hover/sponsor:text-pink-300/80">
              Sponsor
            </span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
