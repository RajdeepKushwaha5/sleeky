"use client";

import { ArrowRight, Calendar, Clock, Video } from "lucide-react";

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
          <p className="text-muted-foreground">
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
            <Button asChild size="lg" className="group">
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
          <p className="text-center text-sm text-muted-foreground">
            Usually respond within 24 hours • IST Timezone
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
    <div
      className={cn(
        "rounded-lg border border-edge bg-card p-4 text-center transition-colors",
        "hover:bg-accent"
      )}
    >
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
