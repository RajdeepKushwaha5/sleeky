import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
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
      className={cn("flex items-center gap-4", className)}
    >
      {items.map(({ title, href, external }) => {
        const active =
          activeId === href ||
          (href === "/" 
            ? ["/", "/index"].includes(activeId || "")
            : activeId?.startsWith(href));

        // Special styling for Resume button
        if (title === "Resume") {
          return (
            <Button
              key={href}
              asChild
              variant="outline"
              size="sm"
              className="font-mono text-sm font-medium"
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            </Button>
          );
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
  ...props
}: React.ComponentProps<typeof Link> & {
  active?: boolean;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={props.href as string}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "font-mono text-sm font-medium text-muted-foreground transition-[color] duration-300",
          active && "text-foreground"
        )}
      >
        {props.children}
      </a>
    );
  }

  return (
    <Link
      className={cn(
        "font-mono text-sm font-medium text-muted-foreground transition-[color] duration-300",
        active && "text-foreground"
      )}
      {...props}
    />
  );
}
