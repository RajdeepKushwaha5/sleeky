import dynamic from "next/dynamic";

import { MAIN_NAV } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";

import { SiteHeaderClient } from "./site-header-wrapper";
import { ToggleTheme } from "./toggle-theme";

const CommandMenu = dynamic(() =>
  import("@/components/command-menu").then((mod) => mod.CommandMenu)
);

const MobileNav = dynamic(() =>
  import("@/components/mobile-nav").then((mod) => mod.MobileNav)
);

export function SiteHeader() {
  const posts = getAllPosts();

  return (
    <SiteHeaderClient
      actions={
        <div className="flex items-center gap-1.5">
          <ToggleTheme />
          <MobileNav
            items={MAIN_NAV}
            extras={
              <>
                <CommandMenu posts={posts} />
              </>
            }
          />
        </div>
      }
    />
  );
}
