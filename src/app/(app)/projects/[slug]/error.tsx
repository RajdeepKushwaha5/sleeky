"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ProjectError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-[family-name:var(--font-syne)] text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        This project page couldn&apos;t be loaded. It may have been removed or
        there was a temporary issue.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>
        <Button asChild>
          <Link href="/projects">Back to Projects</Link>
        </Button>
      </div>
    </div>
  );
}
