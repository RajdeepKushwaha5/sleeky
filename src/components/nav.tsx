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
    "relative px-3 py-1.5 text-sm font-medium rounded-lg",
    "transition-all duration-200 ease-out",
    "hover:bg-accent hover:text-accent-foreground",
    active 
      ? "text-foreground bg-accent" 
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
        {children}
        <ExternalLink className="h-3 w-3 opacity-50" />
      </a>
    );
  }

  return (
    <Link className={baseClasses} {...props}>
      {children}
    </Link>
  );
}
