import dayjs from "dayjs";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";

import { getIcon, Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

import type { Certification } from "../../types/certifications";

export function CertificationItem({
  className,
  certification,
}: {
  className?: string;
  certification: Certification;
}) {
  return (
    <a
      className={cn(
        "group/cert flex items-center gap-4 border-b border-foreground/[0.055] py-4 pr-1 transition-colors hover:bg-foreground/[0.02]",
        className
      )}
      href={certification.credentialURL}
      target="_blank"
      rel="noopener"
    >
      {/* Logo */}
      <div className="flex size-8 shrink-0 items-center justify-center border border-foreground/[0.08] bg-foreground/[0.03]">
        {certification.issuerLogoURL ? (
          <Image
            src={certification.issuerLogoURL}
            alt={certification.issuer}
            width={20}
            height={20}
            quality={100}
            className="size-5 object-contain select-none"
            unoptimized
            aria-hidden
          />
        ) : (
          <span className="text-foreground/40 [&_svg]:size-3.5" aria-hidden>
            {getIcon(certification.issuerIconName) ?? <Icons.certificate />}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[13.5px] font-medium text-foreground/80 underline-offset-3 group-hover/cert:underline">
          {certification.title}
        </h3>
        <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-foreground/30">
          <span>@ {certification.issuer}</span>
          <span className="text-foreground/18">·</span>
          <time dateTime={dayjs(certification.issueDate).toISOString()}>
            {dayjs(certification.issueDate).format("DD.MM.YYYY")}
          </time>
        </div>
      </div>

      {certification.credentialURL && (
        <ArrowUpRightIcon
          className="size-3.5 shrink-0 text-foreground/25 transition-colors group-hover/cert:text-foreground/55"
          aria-hidden
        />
      )}
    </a>
  );
}
