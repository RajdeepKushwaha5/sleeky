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
            "group/toggle flex h-9 w-10 flex-col items-center justify-center gap-[5px] rounded-full transition-colors hover:bg-foreground/[0.055] dark:hover:bg-white/[0.055]",
            className
          )}
          size="icon"
        >
          {/* Top — shortest, pushed far right */}
          <span className="h-[1.5px] w-3 origin-center translate-x-3.5 rounded-full bg-foreground/90 transition-all duration-300 group-data-[state=open]/toggle:w-5.5 group-data-[state=open]/toggle:translate-x-0 group-data-[state=open]/toggle:translate-y-[5px] group-data-[state=open]/toggle:rotate-45 dark:bg-white/90" />
          {/* Middle — full width, centered */}
          <span className="h-[1.5px] w-5.5 rounded-full bg-foreground/90 transition-all duration-300 group-data-[state=open]/toggle:scale-0 group-data-[state=open]/toggle:opacity-0 dark:bg-white/90" />
          {/* Bottom — medium, slightly right */}
          <span className="h-[1.5px] w-4 origin-center translate-x-1.5 rounded-full bg-foreground/90 transition-all duration-300 group-data-[state=open]/toggle:w-5.5 group-data-[state=open]/toggle:translate-x-0 group-data-[state=open]/toggle:-translate-y-[5px] group-data-[state=open]/toggle:-rotate-45 dark:bg-white/90" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="relative w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-[1.6rem] border border-border/18 bg-background/88 p-6 shadow-[0_24px_72px_rgba(0,0,0,0.16),0_1px_0_rgba(255,255,255,0.62)_inset] backdrop-blur-2xl dark:border-white/[0.07] dark:bg-black/80 dark:shadow-[0_28px_88px_rgba(0,0,0,0.92)] dark:backdrop-blur-3xl"
        align="end"
        sideOffset={12}
      >
        {/* Decorative corner brackets */}
        <div className="absolute top-2 left-2 h-4 w-4 border-t border-l border-foreground/[0.07] dark:border-white/[0.055]" />
        <div className="absolute top-2 right-2 h-4 w-4 border-t border-r border-foreground/[0.07] dark:border-white/[0.055]" />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-foreground/[0.07] dark:border-white/[0.055]" />
        <div className="absolute right-2 bottom-2 h-4 w-4 border-r border-b border-foreground/[0.07] dark:border-white/[0.055]" />

        {/* Search extras */}
        {extras && <div className="mb-4">{extras}</div>}

        {/* Menu items */}
        <div className="space-y-1">
          {items.map((link) => (
            <DropdownMenuItem
              key={link.href}
              asChild
              className="group relative rounded-xl border-none px-2 py-3 focus:bg-foreground/[0.035] dark:focus:bg-white/[0.035]"
            >
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl transition-opacity hover:opacity-80"
                >
                  <span className="font-outfit text-lg font-medium tracking-normal text-foreground/76 group-hover:text-foreground">
                    {link.title}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:scale-110 group-hover:text-foreground/60" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="flex items-center justify-between rounded-xl transition-opacity hover:opacity-80"
                >
                  <span className="font-outfit text-lg font-medium tracking-normal text-foreground/76 group-hover:text-foreground">
                    {link.title}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-foreground/60" />
                </Link>
              )}
            </DropdownMenuItem>
          ))}
        </div>

        {/* Sponsor link */}
        <DropdownMenuSeparator className="my-3 bg-border/12 dark:bg-white/[0.045]" />
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
