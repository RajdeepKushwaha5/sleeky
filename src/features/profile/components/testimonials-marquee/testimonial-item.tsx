import Image from "next/image";

import type { Testimonial } from "../../types/testimonials";

function XLogo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function getSocialIcon(url: string) {
  if (url.includes("linkedin.com")) {
    return <LinkedInLogo className="h-3.5 w-3.5" />;
  }
  if (url.includes("x.com") || url.includes("twitter.com")) {
    return <XLogo className="h-3.5 w-3.5" />;
  }
  return null;
}

export function TestimonialItem({
  avatar,
  displayName,
  url,
  content,
}: Testimonial) {
  return (
    <figure className="flex h-full flex-col p-6">
      {/* Quote content */}
      <blockquote className="mb-6 grow">
        <p className="text-sm leading-relaxed text-foreground/80">{content}</p>
      </blockquote>

      {/* Author info */}
      <figcaption className="flex items-center gap-3">
        <Avatar src={avatar} alt={displayName} />
        <a
          className="flex items-center gap-2 font-mono text-sm text-foreground/60 transition-colors hover:text-foreground"
          href={url}
          target="_blank"
          rel="noopener"
        >
          <span>{displayName}</span>
          {getSocialIcon(url)}
        </a>
      </figcaption>
    </figure>
  );
}

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative size-12 shrink-0">
      <Image
        className="rounded-xl select-none"
        src={src}
        alt={alt}
        width={48}
        height={48}
        quality={100}
        unoptimized
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
    </div>
  );
}



