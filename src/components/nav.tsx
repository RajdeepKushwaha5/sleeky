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
      className={cn("flex items-center gap-1", className)}
    >
      {items.map(({ title, href, external }) => {
        const active =
          activeId === href ||
          (href === "/"
            ? ["/", "/index"].includes(activeId || "")
            : activeId?.startsWith(href));

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
    "relative rounded-none px-3 py-1.5 text-sm font-medium",
    "transition-all duration-200 ease-out",
    "border border-transparent",
    "hover:border-foreground/20 hover:bg-accent/50 hover:text-accent-foreground",
    "before:absolute before:top-0 before:left-0 before:h-2 before:w-2 before:border-t before:border-l before:border-transparent before:transition-all",
    "after:absolute after:right-0 after:bottom-0 after:h-2 after:w-2 after:border-r after:border-b after:border-transparent after:transition-all",
    "hover:before:border-foreground/25 hover:after:border-foreground/25",
    active
      ? "border-foreground/25 bg-accent/70 text-foreground before:border-foreground/25 after:border-foreground/25"
      : "text-muted-foreground"
  );

  if (external) {
    return (
      <a
        href={props.href as string}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClasses, "inline-flex items-center gap-1")}
      >
        <span className="relative">
          {children}
          <div className="absolute right-0 -bottom-0.5 left-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
        <ExternalLink className="h-3 w-3 opacity-50" />
      </a>
    );
  }

  return (
    <Link className={cn(baseClasses, "group")} {...props}>
      <span className="relative">
        {children}
        {active && (
          <div className="absolute right-0 -bottom-0.5 left-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
        )}
      </span>
    </Link>
  );
}
