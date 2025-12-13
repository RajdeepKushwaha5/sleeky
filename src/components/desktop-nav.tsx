"use client";

import { usePathname } from "next/navigation";

import { Nav } from "@/components/nav";
import type { NavItem } from "@/types/nav";

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return <Nav className="max-sm:hidden flex-col gap-4 text-center items-center" items={items} activeId={pathname} />;
}
