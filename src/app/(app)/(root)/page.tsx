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
        <Separator className="h-2" />

        <FadeIn>
          <Overview />
        </FadeIn>
        <Separator />

        <FadeIn>
          <LiveStatus />
        </FadeIn>
        <Separator />

        <FadeIn>
          <SocialLinks />
        </FadeIn>
        <Separator />

        <FadeIn>
          <About />
        </FadeIn>
        <Separator />

        <FadeIn>
          <Projects />
        </FadeIn>
        <Separator />

        <FadeIn>
          <Experiences />
        </FadeIn>
        <Separator />

        <FadeIn>
          <TeckStack />
        </FadeIn>
        <Separator />

        <FadeIn>
          <Testimonials />
        </FadeIn>
        <Separator />

        <FadeIn>
          <Blog />
        </FadeIn>
        <Separator />

        <FadeIn>
          <GitHubContributions />
        </FadeIn>
        <Separator />

        <FadeIn>
          <Activity />
        </FadeIn>
        <Separator />

        <FadeIn>
          <Awards />
        </FadeIn>
        <Separator />

        <FadeIn>
          <Certifications />
        </FadeIn>
        <Separator />

        <FadeIn>
          <BookCall />
        </FadeIn>
        <Separator />

        <FadeIn>
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
  return <div className={cn("h-3 w-full", className)} />;
}
