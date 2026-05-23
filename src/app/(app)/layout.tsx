import dynamic from "next/dynamic";

import { CADLayoutWrapper } from "@/components/cad-layout-wrapper";
import { NoiseOverlay } from "@/components/noise-overlay";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const ScrollTop = dynamic(() =>
  import("@/components/scroll-top").then((mod) => mod.ScrollTop)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CADLayoutWrapper>
        <NoiseOverlay />
        <SiteHeader />
        <main
          id="main-content"
          className="relative z-10 max-w-screen overflow-x-hidden px-2 pt-6 pb-28"
        >
          {children}
        </main>
        <SiteFooter />
      </CADLayoutWrapper>

      <ScrollTop />
    </>
  );
}
