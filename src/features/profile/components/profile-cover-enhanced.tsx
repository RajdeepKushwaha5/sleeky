import { USER } from "@/features/profile/data/user";

export function ProfileCoverEnhanced() {
  return (
    <section className="relative mx-2 min-h-[30rem] overflow-hidden border-b border-foreground/[0.08] pt-14 pb-14 sm:pt-18 sm:pb-16">
      <div className="pointer-events-none absolute inset-x-[-50vw] top-0 h-8 bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--foreground)_9%,transparent),color-mix(in_oklab,var(--foreground)_9%,transparent)_1px,transparent_1px,transparent_12px)] opacity-45" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="hero-engineering-drawing absolute top-10 right-[-13rem] h-[31rem] w-[55rem] text-foreground opacity-[0.24] sm:right-[-8rem] dark:opacity-[0.18]"
          viewBox="0 0 920 560"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-hatch"
              width="8"
              height="8"
              patternTransform="rotate(45)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="8"
                stroke="currentColor"
                strokeWidth="2"
              />
            </pattern>
          </defs>

          <circle
            className="hero-ring-orbit"
            cx="530"
            cy="270"
            r="275"
            stroke="currentColor"
            strokeDasharray="9 10"
          />
          <circle cx="530" cy="270" r="195" stroke="currentColor" />
          <circle
            className="hero-inner-orbit"
            cx="530"
            cy="270"
            r="78"
            stroke="currentColor"
            strokeDasharray="4 8"
          />
          <line
            className="hero-scan-axis"
            x1="120"
            y1="270"
            x2="860"
            y2="270"
            stroke="currentColor"
            strokeDasharray="8 12"
          />
          <line
            x1="530"
            y1="20"
            x2="530"
            y2="520"
            stroke="currentColor"
            strokeDasharray="8 12"
          />

          <path
            className="hero-hatch-panel"
            d="M140 170H650V276H140V170Z"
            fill="url(#hero-hatch)"
          />
          <path d="M140 276A155 155 0 0 1 295 121" stroke="currentColor" />
          <circle
            cx="455"
            cy="276"
            r="82"
            fill="var(--background)"
            stroke="currentColor"
          />
          <circle
            className="hero-pulse-node"
            cx="720"
            cy="276"
            r="14"
            fill="var(--background)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M720 292V334" stroke="currentColor" />
          <path d="M455 360V400" stroke="currentColor" strokeWidth="3" />
          <path
            className="hero-dash-flow"
            d="M475 350L518 458"
            stroke="currentColor"
            strokeDasharray="10 8"
          />

          <text
            x="160"
            y="195"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            H1
          </text>
          <text
            x="420"
            y="195"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            H2
          </text>
          <text
            x="266"
            y="287"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            DS2
          </text>
          <text
            x="388"
            y="287"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            FE2
          </text>
          <text
            x="462"
            y="287"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            BE8
          </text>
          <text
            x="742"
            y="281"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            DB16
          </text>
          <text
            x="718"
            y="358"
            fill="currentColor"
            className="font-mono text-[17px]"
          >
            KN0
          </text>
          <text
            x="650"
            y="110"
            fill="currentColor"
            className="font-mono text-[15px]"
          >
            2026
          </text>
        </svg>
      </div>

      <div className="relative z-10">
        <div>
          <h1 className="max-w-[9ch] font-serif text-[4.25rem] leading-[0.86] font-medium tracking-normal text-foreground sm:text-[5.6rem]">
            {USER.firstName}
            <br />
            {USER.lastName}
            <sup className="ml-1 align-super font-mono text-[0.13em] text-foreground/35">
              io
            </sup>
          </h1>
          <p className="mt-5 font-mono text-[10px] tracking-[0.32em] text-foreground/45 uppercase">
            Full Stack Developer & AI Engineer
          </p>
        </div>
      </div>
    </section>
  );
}
