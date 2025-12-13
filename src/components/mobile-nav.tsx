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
        className="relative w-80 overflow-hidden border-none bg-popover/95 p-6 backdrop-blur-md"
        align="end"
        sideOffset={12}
      >
        {/* Blueprint-style decorative corner brackets */}
        <div className="absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-foreground/20" />
        <div className="absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-foreground/20" />
        <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-foreground/20" />
        <div className="absolute right-2 bottom-2 h-4 w-4 border-r-2 border-b-2 border-foreground/20" />

        {/* Header section with title */}
        <div className="mb-6 flex items-center gap-2 px-2">
          <div className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Navigation
          </span>
        </div>

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
