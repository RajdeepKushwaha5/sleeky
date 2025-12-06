import dynamic from "next/dynamic";

import { Chatbot } from "@/components/chatbot";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SideRuler } from "@/components/side-ruler";

const ScrollTop = dynamic(() =>
  import("@/components/scroll-top").then((mod) => mod.ScrollTop)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Left side ruler - Auto-detects current section */}
      <SideRuler side="left" />

      {/* Right side ruler - Auto-detects current section */}
      <SideRuler side="right" />

      <SiteHeader />
      <main className="max-w-screen overflow-x-hidden px-2 pt-20">{children}</main>
      <SiteFooter />
      <ScrollTop />
      <Chatbot />
    </>
  );
}
