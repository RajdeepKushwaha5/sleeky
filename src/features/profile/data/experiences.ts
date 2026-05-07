import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
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
          end: "08.2026",
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
  {
    id: "oumi-ai",
    companyName: "Oumi",
    companyLogo: "/company/oumi.png",
    positions: [
      {
        id: "oumi-oss-contributor",
        title: "Open Source Contributor",
        employmentPeriod: {
          start: "12.2025",
          end: "12.2025",
        },
        employmentType: "Part-time",
        icon: "code",
        description: `Added visual loading spinners for user feedback during inference operations. Implemented "Generating response..." and "Running inference..." indicators using Rich library. [PR #2085](https://github.com/oumi-ai/oumi/pull/2085)`,
        skills: ["Python", "Rich", "Unit Testing", "CLI Development"],
        isExpanded: false,
      },
    ],
  },
  {
    id: "devops-daily",
    companyName: "DevOps Daily",
    companyLogo: "/company/devops-daily.png",
    positions: [
      {
        id: "devops-daily-oss-contributor",
        title: "Open Source Contributor",
        employmentPeriod: {
          start: "10.2025",
          end: "10.2025",
        },
        employmentType: "Part-time",
        icon: "code",
        description: `Built a CLI command index generator that creates commands.json from eBook markdown files. Implemented JSON loading with fallback for show/search commands, covering 101 Linux commands. [Repository](https://github.com/The-DevOps-Daily/devops-daily)`,
        skills: ["Python", "Typer", "JSON", "Markdown", "CLI Development"],
        isExpanded: false,
      },
    ],
  },
];
