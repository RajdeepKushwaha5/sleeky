"use client";

import { ArrowRight, Calendar, Clock, Video } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "../panel";

const CAL_USERNAME = "rajdeepsingh1";

export function BookCall() {
  return (
    <Panel id="book-call">
      <PanelHeader>
        <PanelTitle>Let&apos;s Talk</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="space-y-6">
          {/* Description */}
          <p className="font-[family-name:var(--font-outfit)] text-[15px] leading-relaxed tracking-wide text-muted-foreground">
            Have a project in mind or just want to chat about tech? Book a free
            call with me and let&apos;s connect!
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <FeatureCard
              icon={Clock}
              title="30 Min Call"
              description="Quick & focused discussion"
            />
            <FeatureCard
              icon={Video}
              title="Video Chat"
              description="Face-to-face conversation"
            />
            <FeatureCard
              icon={Calendar}
              title="Flexible Time"
              description="Pick your preferred slot"
            />
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="group border border-border/50 bg-card/80 text-foreground/80 hover:bg-foreground/10 hover:text-foreground"
              variant="ghost"
            >
              <a
                href={`https://cal.com/${CAL_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule a Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* Availability note */}
          <p className="text-center font-mono text-xs tracking-wider text-muted-foreground/70">
            Usually respond within 24 hours | IST Timezone
          </p>
        </div>
      </PanelContent>
    </Panel>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "rounded-2xl border border-border/50 bg-card/80 p-4 text-center transition-colors",
        "hover:bg-foreground/5 hover:shadow-md hover:shadow-black/[0.03] dark:hover:shadow-black/20"
      )}
    >
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-border/30 bg-background">
        <Icon className="h-5 w-5 text-foreground/60" />
      </div>
      <h4 className="font-[family-name:var(--font-syne)] font-semibold tracking-tight text-foreground/90">
        {title}
      </h4>
      <p className="font-[family-name:var(--font-outfit)] text-xs tracking-wide text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}
