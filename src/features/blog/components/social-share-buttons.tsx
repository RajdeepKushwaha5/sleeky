"use client";

import { LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { copyText } from "@/utils/copy";

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

export function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const [absoluteUrl, setAbsoluteUrl] = useState(url);

  useEffect(() => {
    if (!url.startsWith("http")) {
      setAbsoluteUrl(new URL(url, window.location.origin).toString());
    }
  }, [url]);

  const urlEncoded = encodeURIComponent(absoluteUrl);
  const titleEncoded = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Copy link",
      icon: LinkIcon,
      onClick: () => {
        copyText(absoluteUrl);
        toast.success("Link copied to clipboard");
      },
    },
    {
      name: "Share on X",
      icon: Icons.x,
      href: `https://x.com/intent/tweet?url=${urlEncoded}&text=${titleEncoded}`,
    },
    {
      name: "Share on LinkedIn",
      icon: Icons.linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite?url=${urlEncoded}`,
    },
    {
      name: "Share on Facebook",
      icon: Icons.facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}`,
    },
  ];

  return (
    <div className="mt-12 border-t border-border/50 pt-8">
      <h3 className="mb-4 text-lg font-medium">Share this article</h3>
      <div className="flex flex-wrap gap-3">
        {shareLinks.map((link) => {
          const Icon = link.icon;

          if (link.onClick) {
            return (
              <button
                key={link.name}
                onClick={link.onClick}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/80 px-4 py-2 text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground"
                aria-label={link.name}
              >
                <Icon className="size-4" />
                <span className="text-sm">{link.name}</span>
              </button>
            );
          }

          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/80 px-4 py-2 text-foreground/80 transition-colors hover:bg-foreground/10 hover:text-foreground"
              aria-label={link.name}
            >
              <Icon className="size-4" />
              <span className="text-sm">{link.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

