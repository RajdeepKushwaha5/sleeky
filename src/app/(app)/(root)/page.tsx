import dayjs from "dayjs";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { FadeIn } from "@/components/ui/scroll-animations";
import { About } from "@/features/profile/components/about";
import { Activity } from "@/features/profile/components/activity";
import { Awards } from "@/features/profile/components/awards";
import { Blog } from "@/features/profile/components/blog";
import { BookCall } from "@/features/profile/components/book-call";
import { Certifications } from "@/features/profile/components/certifications";
import { Contact } from "@/features/profile/components/contact";
import { Experiences } from "@/features/profile/components/experiences";
import { GitHubContributions } from "@/features/profile/components/github-contributions";
import { LiveStatus } from "@/features/profile/components/live-status";
import { Overview } from "@/features/profile/components/overview";
import { ProfileCover } from "@/features/profile/components/profile-cover";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { Projects } from "@/features/profile/components/projects";
import { SocialLinks } from "@/features/profile/components/social-links";
import { TeckStack } from "@/features/profile/components/teck-stack";
import { TestimonialsMarquee as Testimonials } from "@/features/profile/components/testimonials-marquee";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl">
        <ProfileCover />
        <ProfileHeader />
        <Separator />

        <FadeIn>
          <Overview />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <LiveStatus />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <SocialLinks />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <About />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <Projects />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <Experiences />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <TeckStack />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <Testimonials />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <Blog />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <GitHubContributions />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <Activity />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <Awards />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <Certifications />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <BookCall />
        </FadeIn>
        <Separator />

        <FadeIn delay={0.1}>
          <Contact />
        </FadeIn>
        <Separator />
      </div>
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: dayjs(USER.dateCreated).toISOString(),
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full items-center justify-center border-x border-edge",
        className
      )}
    >
      {/* Extended background */}
      <div className="absolute -left-[100vw] -z-1 h-8 w-[200vw] bg-background" />

      {/* Blueprint construction marks pattern */}
      <div className="absolute inset-0 -z-1 flex items-center overflow-hidden">
        {/* Horizontal construction line */}
        <div className="h-px w-full bg-foreground/10" />

        {/* Measurement tick marks */}
        <div className="absolute inset-0 flex items-center justify-around px-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div className="h-2 w-px bg-foreground/20" />
              <div className="h-1 w-px bg-foreground/10" />
            </div>
          ))}
        </div>

        {/* Corner detail markers */}
        <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-1 opacity-30">
          <div className="h-px w-2 bg-foreground" />
          <div className="h-1 w-1 rounded-full bg-foreground" />
        </div>
        <div className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-1 opacity-30">
          <div className="h-1 w-1 rounded-full bg-foreground" />
          <div className="h-px w-2 bg-foreground" />
        </div>
      </div>

      {/* Center technical annotation */}
      <div className="relative z-10 flex items-center gap-2 bg-background px-3">
        <div className="h-1 w-1 rounded-full bg-foreground/30" />
        <div className="h-px w-6 bg-foreground/20" />
        <div className="h-1 w-1 rounded-full bg-foreground/40" />
        <div className="h-px w-6 bg-foreground/20" />
        <div className="h-1 w-1 rounded-full bg-foreground/30" />
      </div>
    </div>
  );
}
