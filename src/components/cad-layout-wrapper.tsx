"use client";

import { BottomDock } from "@/components/bottom-dock";

export function CADLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BottomDock />
      {children}
    </>
  );
}
