import dynamic from "next/dynamic";

import { Chatbot } from "@/components/chatbot";
import { KeyboardNavigation } from "@/components/keyboard-navigation";
import { NoiseOverlay } from "@/components/noise-overlay";
import { SideRuler } from "@/components/side-ruler";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const ScrollTop = dynamic(() =>
  import("@/components/scroll-top").then((mod) => mod.ScrollTop)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Noise/grain overlay for premium feel */}
      <NoiseOverlay />

      {/* Left side ruler - Auto-detects current section */}
      <SideRuler side="left" />

      {/* Right side ruler - Auto-detects current section */}
      <SideRuler side="right" />

      <SiteHeader />
      <main className="max-w-screen overflow-x-hidden px-2 pt-20">
        {children}
      </main>
      <SiteFooter />

      <ScrollTop />
      <Chatbot />
      <KeyboardNavigation />
    </>
  );
}
