import dynamic from "next/dynamic";

import { CADLayoutWrapper } from "@/components/cad-layout-wrapper";
import { NoiseOverlay } from "@/components/noise-overlay";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const ScrollTop = dynamic(() =>
  import("@/components/scroll-top").then((mod) => mod.ScrollTop)
);

const OnekoCat = dynamic(() =>
  import("@/components/oneko-cat").then((mod) => mod.OnekoCat)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CADLayoutWrapper key="app-frame">
        <NoiseOverlay />
        <SiteHeader />
        <main
          id="main-content"
          className="relative z-10 max-w-screen overflow-x-hidden px-2 pt-6 pb-32 sm:pb-28"
        >
          {children}
        </main>
        <SiteFooter />
      </CADLayoutWrapper>

      <ScrollTop key="scroll-top" />
      <OnekoCat key="oneko" />
    </>
  );
}
