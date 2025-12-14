import dynamic from "next/dynamic";

import { DesktopNav } from "@/components/desktop-nav";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { MAIN_NAV } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";

import { SiteHeaderMark } from "./site-header-mark";
import { SiteHeaderClient } from "./site-header-wrapper";
import { ToggleTheme } from "./toggle-theme";

const CommandMenu = dynamic(() =>
  import("@/components/command-menu").then((mod) => mod.CommandMenu)
);

const MobileNav = dynamic(() =>
  import("@/components/mobile-nav").then((mod) => mod.MobileNav)
);

const AudioPlayer = dynamic(() =>
  import("@/components/audio-player").then((mod) => mod.AudioPlayer)
);

export function SiteHeader() {
  const posts = getAllPosts();

  return (
    <SiteHeaderClient
      logo={<SiteHeaderMark />}
      nav={<DesktopNav items={MAIN_NAV} />}
      actions={
        <div className="flex items-center gap-1 sm:flex-col sm:gap-2">
          <CommandMenu posts={posts} />
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/RajdeepKushwaha5/sleeky"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
            >
              <Icons.github className="size-4" />
            </a>
          </Button>
          <ToggleTheme />
          <AudioPlayer />
          <MobileNav className="sm:hidden" items={MAIN_NAV} />
        </div>
      }
    />
  );
}
