import dynamic from "next/dynamic";
import Link from "next/link";

import { DesktopNav } from "@/components/desktop-nav";
import { MAIN_NAV } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";
import { cn } from "@/lib/utils";

import { SiteHeaderMark } from "./site-header-mark";
import { SiteHeaderWrapper } from "./site-header-wrapper";
import { ToggleTheme } from "./toggle-theme";

const BrandContextMenu = dynamic(() =>
  import("@/components/brand-context-menu").then((mod) => mod.BrandContextMenu)
);

const CommandMenu = dynamic(() =>
  import("@/components/command-menu").then((mod) => mod.CommandMenu)
);

const MobileNav = dynamic(() =>
  import("@/components/mobile-nav").then((mod) => mod.MobileNav)
);

export function SiteHeader() {
  const posts = getAllPosts();

  return (
    <SiteHeaderWrapper
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4",
        "transition-all duration-500"
      )}
    >
      <div
        className={cn(
          "flex h-14 w-full max-w-2xl items-center justify-between gap-3 rounded-2xl px-4",
          "border border-border/50 bg-background/80 backdrop-blur-xl backdrop-saturate-150",
          "shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.4)]",
          "transition-all duration-300"
        )}
        data-header-container
      >
        {/* Logo */}
        <BrandContextMenu>
          <Link 
            href="/" 
            aria-label="Home" 
            className="group flex items-center gap-2 [&_svg]:h-9 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:hover:scale-110"
          >
            <SiteHeaderMark />
          </Link>
        </BrandContextMenu>

        {/* Desktop Navigation - Centered */}
        <DesktopNav items={MAIN_NAV} />

        {/* Right side actions */}
        <div className="flex items-center gap-1">
          <CommandMenu posts={posts} />
          <ToggleTheme />
          <MobileNav className="sm:hidden" items={MAIN_NAV} />
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}
