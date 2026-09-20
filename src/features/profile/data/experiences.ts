import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "exord-systems",
    companyName: "Exord Systems",
    companyLogo: "/company/exord.png",
    isCurrentEmployer: true,
    positions: [
      {
        id: "exord-ai-engineer",
        title: "AI Engineer",
        employmentPeriod: {
          start: "09.2026",
        },
        employmentType: "Full-time",
        link: {
          label: "exord.systems",
          href: "https://exord.systems",
        },
        icon: "code",
        description: `Building operational AI infrastructure at [Exord Systems](https://exord.systems) — a new programming paradigm for agentic systems that moves AI beyond answering questions and into reliably executing real operational work.

Working on the core engineering team across the models, runtimes, abstractions, evaluation systems, and infrastructure that make intelligent systems programmable, reliable, and capable of running in production.

Contributing to problems at the intersection of AI, programming languages, distributed systems, and production infrastructure, working directly with the founders out of Delhi.`,
        skills: [
          "AI Engineering",
          "LLM",
          "Agents",
          "Evals",
          "Runtimes",
          "Distributed Systems",
          "Infrastructure",
          "Python",
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "cgal-gsoc-2026",
    companyName: "Google Summer of Code",
    companyLogo: "/company/gsoc-sun.svg",
    positions: [
      {
        id: "cgal-gsoc-shaders-basic-viewer",
        title: "Google Summer of Code 2026",
        employmentPeriod: {
          start: "05.2026",
        },
        employmentType: "GSoC Contributor",
        organization: "CGAL Project",
        link: {
          label: "link",
          href: "https://summerofcode.withgoogle.com/programs/2026/projects/sSDJMWLc",
        },
        icon: "code",
        description: `Selected to develop **Shaders for Basic Viewer**, improving CGAL's one-call visualization layer for drawing CGAL data structures through the draw() API.

Redesigning the edge rendering pipeline to operate in clip/NDC space, fixing zoom-level edge disappearance caused by numerically unstable shader math, and replacing bounding-box-based sizing with viewport-relative pixel metrics.

Improving 2D/3D camera transitions, depth-correct edge rendering, OpenGL compatibility paths, and optional fragment-shader anti-aliasing while keeping the existing draw() API backward-compatible.

Producing regression tests and a comparison report on how MeshLab and ParaView approach wide-line rendering. Expected 175-hour open-source project administered by Google, with development for CGAL Project.`,
        skills: [
          "CGAL",
          "C++",
          "OpenGL",
          "GLSL",
          "Computer Graphics",
          "Computational Geometry",
          "Testing",
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "cognee",
    companyName: "Cognee",
    companyLogo: "/company/cognee.png",
    positions: [
      {
        id: "cognee-oss-contributor",
        title: "Open Source Contributor",
        employmentPeriod: {
          start: "07.2026",
          end: "07.2026",
        },
        employmentType: "Part-time",
        icon: "code",
        description: `Contributed to Cognee, the open-source AI memory engine for building knowledge graphs and persistent context, across both the Rust core ([cognee-rs](https://github.com/topoteretes/cognee-rs/pulls?q=is%3Apr+author%3ARajdeepKushwaha5+is%3Amerged)) and the Python platform ([cognee](https://github.com/topoteretes/cognee/pull/3762)).

**LLM Provider Layer (Rust):** Extended the engine's model support by adding a native Anthropic Messages API adapter (system-message hoisting, forced-tool structured output, prefix stripping) and an Azure OpenAI adapter, then routed Ollama, Mistral, Gemini, and custom OpenAI-compatible providers through a single shared adapter factory — refactored out of duplicated construction logic across the component manager and HTTP server.

**Performance & Reliability (Rust):** Bounded summarization concurrency with equal-jitter backoff to eliminate rate-limit stalls and thundering-herd retries, added batched multi-chunk graph extraction to cut extraction requests from N to ceil(N / group_size), and built a deterministic ThrottleLlm rate-limit instrument for measuring cognify behavior under provider limits.

**Tokenization (Python):** Centralized model-to-tokenizer resolution across OpenAI, Mistral, FastEmbed, and Ollama with safe TikToken fallbacks and warnings, fixing incorrect token counts that skewed chunk sizing and dry-run cost estimates.`,
        skills: [
          "Open Source",
          "Rust",
          "Python",
          "LLM",
          "Async",
          "Knowledge Graphs",
          "Performance",
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "mllam",
    companyName: "MLLAM",
    companyLogo: "/company/mllam.png",
    positions: [
      {
        id: "mllam-oss-contributor",
        title: "Open Source Contributor",
        employmentPeriod: {
          start: "02.2026",
          end: "04.2026",
        },
        employmentType: "Part-time",
        icon: "code",
        description: `Contributed to [neural-lam](https://github.com/mllam/neural-lam/pulls?q=is%3Apr+author%3ARajdeepKushwaha5+is%3Amerged), MLLAM's graph-based neural weather prediction framework for limited-area modeling, built on PyTorch and PyTorch Lightning.

**Distributed Training Correctness:** Fixed silent tensor-shape corruption and an IndexError in distributed standardization statistics (world_size > 1) by using proper concatenation and indexing, and added a dimension guard to \`all_gather_cat\` so single-device runs no longer flatten tensors into the wrong shapes.

**Testing & Packaging:** Reset the \`plotted_examples\` counter in \`on_test_epoch_end\` so example plotting works across repeated \`trainer.test()\` calls, moved torch to mutually exclusive CPU/GPU extras with uv sources to simplify CI installs, and fixed a malformed loss-weighting error message.`,
        skills: [
          "Open Source",
          "Python",
          "PyTorch",
          "PyTorch Lightning",
          "Distributed Training",
          "Testing",
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "openmetadata",
    companyName: "OpenMetadata",
    companyLogo: "/company/openmetadata.png",
    positions: [
      {
        id: "openmetadata-oss-contributor",
        title: "Open Source Contributor",
        employmentPeriod: {
          start: "04.2026",
          end: "04.2026",
        },
        employmentType: "Part-time",
        icon: "code",
        description: `Contributed extensively to OpenMetadata, an open-source metadata management platform, focusing on performance optimization, bug resolution, and UI improvements across 31 pull requests: 12 merged and 19 open. [Pull requests](https://github.com/open-metadata/OpenMetadata/pulls/RajdeepKushwaha5)

**Backend & Performance:** Resolved a severe N+1 query issue by implementing bulk-fetching for Airflow task instances, preventing slow pipeline status yields. Added defensive type handling in the REST client to prevent runtime crashes, and improved cache performance by removing unnecessary JSON serialization/deserialization cycles.

**Data Ingestion & Integrations:** Fixed parsing and extraction bugs across Redshift materialized views, query masking functions, Kafka schema registries, and data sampling logic so randomized sample flags are respected at 100% thresholds.

**Frontend & Localization:** Enhanced i18n support with dedicated translation keys for French rendering and missing bulk-operation menu items. Patched Combobox and Autocomplete UI components to keep typography and styling consistent.`,
        skills: [
          "Open Source",
          "Java",
          "Python",
          "TypeScript",
          "React",
          "Performance",
          "Data Ingestion",
          "i18n",
          "Front-End Design",
        ],
        isExpanded: false,
      },
    ],
  },
  {
    id: "accomplish-ai",
    companyName: "Accomplish",
    companyLogo: "/company/accomplish.png",
    positions: [
      {
        id: "accomplish-oss-contributor",
        title: "Open Source Contributor",
        employmentPeriod: {
          start: "02.2026",
          end: "03.2026",
        },
        employmentType: "Part-time",
        icon: "code",
        description: `Contributed features and fixes to Accomplish, an open-source AI desktop agent (9.8k+ stars). Built native desktop automation via MCP tool integration. Added "Escape to stop" for interrupting running tasks, enhanced code blocks with syntax highlighting and copy support, and improved error handling with actionable messages on task failure. [PR #691](https://github.com/accomplish-ai/accomplish/pull/691) · [PR #633](https://github.com/accomplish-ai/accomplish/pull/633) · [PR #708](https://github.com/accomplish-ai/accomplish/pull/708)`,
        skills: ["TypeScript", "React", "Electron", "Node.js", "Testing"],
        isExpanded: false,
      },
    ],
  },
];
