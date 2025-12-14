import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="font-mono text-8xl font-bold text-foreground/10">404</div>
      <h1 className="mt-4 font-serif text-2xl font-semibold">
        Project Not Found
      </h1>
      <p className="mt-2 max-w-md text-foreground/60">
        The project you&apos;re looking for doesn&apos;t exist or doesn&apos;t
        have a case study yet.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/projects">View All Projects</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
