"use client";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3.5 font-serif text-[1.12rem] font-medium text-foreground/88">
      {children}
    </h3>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 text-[13.5px] leading-[1.75] text-foreground/55 sm:leading-[1.8]">
      {children}
    </div>
  );
}

export function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="space-y-7 sm:space-y-9">
          {/* Background */}
          <section>
            <Heading>Background</Heading>
            <Body>
              <p>
                Third-year CS student based in India. Competitive programming
                got me into this. Expert on Codeforces, Knight on LeetCode,
                4-star on CodeChef. That habit of thinking a problem through
                before writing any code has stuck, and I apply it to everything
                I build.
              </p>
              <p>
                I contribute to open source seriously. Google Summer of Code
                2026 developer on the CGAL project since May 2026, working on
                OpenGL shader systems in C++. I&apos;ve also contributed to
                Accomplish AI, OpenMetadata, KubeEdge, and others.
              </p>
            </Body>
          </section>

          {/* What I build */}
          <section>
            <Heading>What I Build</Heading>
            <Body>
              <p>
                Web side: React, Next.js, Node.js or Python backends,
                PostgreSQL. I pay attention to the details most people skip.
                Motion, spacing, interaction states. Whether something feels
                deliberate or just default.
              </p>
              <p>
                AI side: I go deep on LLMs. I&apos;ve built GPT-2 (124M params),
                Llama 3.2, Qwen3 MoE, and Gemma 3 from scratch in PyTorch. I
                work on KV cache compression, fast inference with Triton
                kernels, and agentic systems. The goal is always something that
                holds up under real use, not just a demo.
              </p>
            </Body>
          </section>
        </div>
      </PanelContent>
    </Panel>
  );
}
