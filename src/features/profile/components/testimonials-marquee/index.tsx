import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";

import { TESTIMONIALS_1, TESTIMONIALS_2 } from "../../data/testimonials";
import { Panel } from "../panel";
import { TestimonialItem } from "./testimonial-item";

export function TestimonialsMarquee() {
  return (
    <Panel
      id="testimonials"
      className="before:z-11 after:z-10 [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!"
    >
      <h2 className="sr-only">Testimonials</h2>

      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />

        <MarqueeContent>
          {TESTIMONIALS_1.sort((a, b) =>
            a.displayName.localeCompare(b.displayName)
          ).map((item) => (
            <MarqueeItem
              key={item.handle}
              className="mx-2 h-full w-sm rounded-2xl border border-border/50 bg-card/80"
            >
              <TestimonialItem {...item} />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>

      <div className="relative flex h-4 w-full" />

      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />

        <MarqueeContent direction="right">
          {TESTIMONIALS_2.sort((a, b) =>
            a.displayName.localeCompare(b.displayName)
          ).map((item) => (
            <MarqueeItem
              key={item.handle}
              className="mx-2 h-full w-sm rounded-2xl border border-border/50 bg-card/80"
            >
              <TestimonialItem {...item} />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </Panel>
  );
}
