import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

export function Nav({
  items,
  activeId,
  className,
}: {
  items: NavItem[];
  activeId?: string;
  className?: string;
}) {
  return (
    <nav
      data-active-id={activeId}
      className={cn("flex items-center gap-2", className)}
    >
      {items.map(({ title, href, external }) => {
        // Determine if this nav item is active
        let active = false;

        if (href === "/") {
          // Home is only active on exact match
          active = activeId === "/" || activeId === "/index";
        } else if (href.startsWith("/#")) {
          // Hash links are active on home page
          active = activeId === "/" || activeId === "/index";
        } else {
          // For regular routes, check if current path starts with href
          // This handles /projects and /projects/[slug] matching /projects nav item
          const startsWithSlash = activeId?.startsWith(href + "/") ?? false;
          const startsWithHref = activeId?.startsWith(href) ?? false;
          active = activeId === href || startsWithSlash || (startsWithHref && href !== "/" && !href.startsWith("/#"));
        }

        return (
          <NavItem key={href} href={href} active={active} external={external}>
            {title}
          </NavItem>
        );
      })}
    </nav>
  );
}

export function NavItem({
  active,
  external,
  children,
  ...props
}: React.ComponentProps<typeof Link> & {
  active?: boolean;
  external?: boolean;
}) {
  const baseClasses = cn(
    "relative rounded-lg px-3 py-1.5 text-xs font-mono font-medium uppercase tracking-widest",
    "transition-all duration-300 ease-out",
    "hover:bg-foreground/10 hover:text-foreground",
    active
      ? "bg-foreground/10 text-foreground"
      : "text-foreground/50"
  );

  if (external) {
    return (
      <a
        href={props.href as string}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClasses, "inline-flex items-center gap-1.5")}
      >
        <span>{children}</span>
        <ExternalLink className="h-3 w-3 opacity-50" />
      </a>
    );
  }

  return (
    <Link className={cn(baseClasses, "group relative flex items-center justify-center")} {...props}>
      <span className="relative z-10">{children}</span>
      {/* Active layout indicator */}
      {active && (
        <span
          className={cn(
            "absolute inset-0 rounded-full bg-foreground/5 dark:bg-foreground/10",
            "transition-all duration-300"
          )}
        />
      )}
    </Link>
  );
}

