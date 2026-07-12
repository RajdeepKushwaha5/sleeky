import type { CaseStudy } from "../types/case-study";

export const CASE_STUDIES: Record<string, CaseStudy> = {
  redline: {
    problem: {
      title: "The Challenge",
      content:
        "Company policies drift out of compliance silently. Teams edit documents in isolation, regulations change, and nobody notices the gaps until an audit does. Worse, letting a single AI agent draft, review, and approve its own changes is a governance non-starter — you can't trust a system that grades its own homework.",
      highlights: [
        "Silent compliance drift against GDPR and SOC2",
        "No auditable trail of who changed what, and why",
        "AI that reviews its own work can't be trusted",
        "Policy edits scattered across disconnected tools",
      ],
    },
    process: {
      title: "The Approach",
      content:
        "I treated policies as version-controlled artifacts living in git, then modeled the workflow as separate AI agents with strictly enforced segregation of duties — the agent that drafts a fix is never the one that reviews or approves it. Every regulatory claim had to trace back to a specific checklist item, so nothing is asserted without a citation.",
      highlights: [
        "Policies as auditable, version-controlled git documents",
        "Segregation of duties enforced across distinct agents",
        "Every change annotated and traced to a regulation",
        "Built on the gitagent specification standard",
      ],
    },
    solution: {
      title: "The Implementation",
      content:
        "Redline runs gap analysis against GDPR (22 items) and SOC2 (34 items) checklists, produces ✅/❌/⚠️ scorecards with citations, and drafts fixes with inline REDLINE annotations that trace each edit to its regulation. A five-dimension review agent scores clarity, completeness, consistency, accuracy, and structure, and an append-only audit log makes the whole pipeline verifiable. GitHub Actions validates agent specs and policy metadata on every push.",
      highlights: [
        "Gap analysis across 56 GDPR + SOC2 checklist items",
        "Scorecards with regulatory citations, not vibes",
        "Automated drafting with traceable REDLINE annotations",
        "Five-dimension review + cross-policy contradiction detection",
        "Append-only immutable audit trail with CI validation",
      ],
    },
    results: {
      title: "The Outcome",
      content:
        "Redline won 1st place at the GitAgent Hackathon. It demonstrates that compliance automation can be both autonomous and trustworthy — a system that catches gaps, fixes them with citations, and can never quietly approve its own work.",
      highlights: [
        "1st place, GitAgent Hackathon",
        "Autonomous compliance without self-approval",
        "Fully auditable, git-native workflow",
        "Reference implementation of the gitagent spec",
      ],
    },
    metrics: [
      { label: "GitAgent Hackathon", value: "1st" },
      { label: "Compliance Checks", value: "56" },
      { label: "Audit Trail", value: "Immutable" },
    ],
  },

  metaflow: {
    problem: {
      title: "The Challenge",
      content:
        "When a data pipeline breaks, resolving it means jumping between OpenMetadata, the warehouse, lineage graphs, and a dozen dashboards — all coordinated by hand. Metadata catalogs know the shape of the data but do nothing when something goes wrong. The knowledge exists; the action doesn't.",
      highlights: [
        "Incident response scattered across disconnected tools",
        "Manual coordination on every data quality failure",
        "Metadata catalogs observe but never act",
        "Root-cause tracing done by hand through lineage",
      ],
    },
    process: {
      title: "The Approach",
      content:
        "Rather than build another dashboard, I turned OpenMetadata into a control plane and put an AI orchestrator on top. The hard call was architecture: a single monolithic agent couldn't reason across detection, lineage, and remediation reliably, so I used a LangGraph supervisor routing to 12 focused specialist agents — each good at one job — with idempotent write-backs so repeated runs never corrupt state.",
      highlights: [
        "OpenMetadata reframed as an action layer, not just a catalog",
        "LangGraph supervisor pattern over 12 specialist agents",
        "Idempotent operations safe to retry",
        "Webhook-driven so it reacts to events, not polling",
      ],
    },
    solution: {
      title: "The Implementation",
      content:
        "MetaFlow runs a continuous data steward that detects metadata changes and quality violations and writes health scores back into OpenMetadata's native UI. A contract copilot generates and materializes quality tests, and a self-healing agent classifies failures, traces root causes through lineage, and drafts fixable PR proposals. Fifteen one-click playbooks and webhook auto-triage handle common scenarios end to end.",
      highlights: [
        "Continuous data steward with governance write-back",
        "Data contract copilot for automated quality tests",
        "Self-healing remediation with lineage root-cause tracing",
        "Composite health scores patched into OpenMetadata",
        "15 one-click playbooks + webhook auto-triage",
      ],
    },
    results: {
      title: "The Outcome",
      content:
        "MetaFlow won the OpenMetadata Hackathon in the MCP Ecosystem & AI Agents track. It shows what a data catalog becomes when it can act: incidents get detected, reasoned about, and resolved with a proposed fix before a human is ever paged.",
      highlights: [
        "Winner — OpenMetadata Hackathon (MCP & AI Agents track)",
        "Detection-to-resolution without manual coordination",
        "Fixes arrive as reviewable PRs, not alerts",
        "Native integration back into OpenMetadata",
      ],
    },
    metrics: [
      { label: "Specialist Agents", value: "12" },
      { label: "One-Click Playbooks", value: "15" },
      { label: "Hackathon", value: "Winner" },
    ],
  },

  dragonbrain: {
    problem: {
      title: "The Challenge",
      content:
        "Post-transformer architectures like the Baby Dragon Hatchling (BDH) are fascinating but abstract — papers describe sparse activation and Hebbian memory, but you can't feel the difference from a GPT without running experiments. And any interactive explainer that phones home to a server for inference is slow, costly, and breaks the moment traffic spikes.",
      highlights: [
        "Novel architectures are hard to grasp from papers alone",
        "No intuitive way to compare BDH against a GPT baseline",
        "Server-side inference is slow, costly, and fragile",
        "Abstract concepts like Hebbian memory stay invisible",
      ],
    },
    process: {
      title: "The Approach",
      content:
        "I trained both models small enough to ship (BDH ~229K params, GPT ~148K) and made a deliberate bet: run everything in the browser. Exporting the PyTorch models to ONNX and running them via ONNX Runtime Web on WebAssembly meant zero server calls — every neuron activation, attention flow, and memory update is computed live on the visitor's machine as they type.",
      highlights: [
        "Trained compact BDH and GPT models for the browser",
        "PyTorch → ONNX → ONNX Runtime Web (WebAssembly)",
        "100% client-side inference, no backend required",
        "Real-time visualization of internal model state",
      ],
    },
    solution: {
      title: "The Implementation",
      content:
        "DragonBrain renders BDH and GPT side by side as you type: sparse activation grids (BDH lights up ~5-15% of neurons vs GPT's ~97-100%), a force-directed D3.js graph of emergent wiring, and a 64×64 Hebbian co-activation heatmap. A memory-scaling chart contrasts BDH's constant ~4 MB footprint against GPT's linearly-growing KV-cache, and a 'teach' experiment quantifies how repeated phrases strengthen memory. A 12-step guided tour walks through it all.",
      highlights: [
        "Side-by-side sparse activation panels (BDH vs GPT)",
        "Force-directed D3.js graph of emergent internal wiring",
        "64×64 Hebbian memory co-activation heatmap",
        "Memory-scaling: constant 4 MB vs growing KV-cache",
        "Guided 12-step interactive tour of every panel",
      ],
    },
    results: {
      title: "The Outcome",
      content:
        "DragonBrain turns an abstract research architecture into something you can poke at and understand in seconds, running entirely in the browser. It makes the case for BDH's efficiency tangible — you watch it stay sparse and memory-flat while the GPT baseline saturates.",
      highlights: [
        "Complex architecture made intuitive and interactive",
        "Runs anywhere, instantly — nothing to install or host",
        "BDH's efficiency claims made visible and measurable",
        "Educational tool that doubles as a research demo",
      ],
    },
    metrics: [
      { label: "Inference", value: "Client-Side" },
      { label: "BDH Memory", value: "4 MB" },
      { label: "Sparse Activation", value: "5–15%" },
    ],
  },

  upcode: {
    problem: {
      title: "The Challenge",
      content:
        "Traditional coding interviews and collaborative coding sessions suffer from fragmented tooling. Developers often juggle between code editors, video calls, and shared documents, leading to a disjointed experience that hampers effective collaboration and assessment.",
      highlights: [
        "Fragmented tooling across multiple platforms",
        "Poor real-time collaboration experience",
        "Lack of integrated interview preparation tools",
        "No unified environment for pair programming",
      ],
    },
    process: {
      title: "The Approach",
      content:
        "I adopted a user-centric design approach, conducting research on existing solutions and identifying key pain points. The development followed an iterative process with continuous feedback integration, focusing on real-time synchronization and seamless user experience.",
      highlights: [
        "User research and competitive analysis",
        "Iterative prototyping with feedback loops",
        "Real-time sync architecture design",
        "Performance optimization for low latency",
      ],
    },
    solution: {
      title: "The Implementation",
      content:
        "Built a full-stack collaborative code editor using Next.js and Socket.io for real-time synchronization. The platform features multi-language support with syntax highlighting, integrated video calls, and a comprehensive interview preparation module with curated problems.",
      highlights: [
        "Real-time collaborative editing with conflict resolution",
        "Multi-language syntax highlighting (20+ languages)",
        "Integrated video conferencing",
        "Interview problem bank with solutions",
        "Code execution environment",
      ],
    },
    results: {
      title: "The Outcome",
      content:
        "UPCODE has become a go-to platform for technical interviews and pair programming sessions, significantly reducing setup time and improving collaboration quality for development teams.",
      highlights: [
        "Seamless real-time collaboration",
        "Reduced interview setup time by 80%",
        "Positive user feedback on UX",
        "Active community adoption",
      ],
    },
    metrics: [
      { label: "Languages", value: "20+" },
      { label: "Real-time Sync", value: "<50ms" },
      { label: "Setup Time", value: "30s" },
    ],
  },

  treebio: {
    problem: {
      title: "The Challenge",
      content:
        "Content creators and professionals need a simple way to share multiple links through a single URL. Existing solutions are either too expensive, lack customization, or don't provide meaningful analytics to understand audience engagement.",
      highlights: [
        "Limited customization in free tiers",
        "Expensive premium features",
        "Lack of meaningful analytics",
        "No bulk management capabilities",
      ],
    },
    process: {
      title: "The Approach",
      content:
        "Focused on building a clean, performant solution that prioritizes user experience and provides valuable insights. The architecture was designed for scalability with PostgreSQL and Prisma, ensuring data integrity and fast queries.",
      highlights: [
        "Clean architecture with Prisma ORM",
        "Mobile-first responsive design",
        "Analytics-driven feature decisions",
        "Performance optimization focus",
      ],
    },
    solution: {
      title: "The Implementation",
      content:
        "Developed a modern bio-link platform with unlimited links, custom themes, bulk import/export functionality, and real-time analytics. The platform features link scheduling, click tracking, and a beautiful dashboard for managing all links.",
      highlights: [
        "Unlimited customizable links",
        "Bulk import/export via CSV",
        "Link scheduling and expiration",
        "Real-time analytics dashboard",
        "Custom themes and branding",
      ],
    },
    results: {
      title: "The Outcome",
      content:
        "TreeBio offers a compelling alternative to expensive bio-link services, providing professional features at no cost while maintaining a beautiful, responsive interface.",
      highlights: [
        "Complete free feature set",
        "Fast page load times",
        "Intuitive link management",
        "Comprehensive analytics",
      ],
    },
    metrics: [
      { label: "Links", value: "Unlimited" },
      { label: "Load Time", value: "<1s" },
      { label: "Themes", value: "10+" },
    ],
  },

  bharatos: {
    problem: {
      title: "The Challenge",
      content:
        "There's a lack of culturally-inspired digital experiences that celebrate Indian heritage in the tech space. Most operating system interfaces are generic and don't reflect the rich cultural diversity that could make digital interactions more meaningful and engaging.",
      highlights: [
        "Generic, culturally-neutral interfaces",
        "Missed opportunity for cultural representation",
        "Lack of innovative web-based OS experiences",
        "Limited creative boundaries in UI design",
      ],
    },
    process: {
      title: "The Approach",
      content:
        "Researched Indian art, architecture, and design patterns to create an authentic cultural experience. Combined traditional aesthetics with modern UI/UX principles to build an immersive desktop environment that feels both familiar and innovative.",
      highlights: [
        "Cultural research and design inspiration",
        "Blending tradition with modern UX",
        "Interactive prototype development",
        "User testing for cultural authenticity",
      ],
    },
    solution: {
      title: "The Implementation",
      content:
        "Created a web-based desktop operating system featuring Indian cultural themes, custom applications, an interactive file system, and beautiful animations. The OS includes traditional Indian design elements while maintaining full functionality.",
      highlights: [
        "Culturally-themed desktop environment",
        "Custom built-in applications",
        "Interactive file system simulation",
        "Smooth animations and transitions",
        "Responsive window management",
      ],
    },
    results: {
      title: "The Outcome",
      content:
        "BharatOS demonstrates how cultural heritage can be beautifully integrated into modern technology, creating an engaging and unique digital experience that celebrates Indian identity.",
      highlights: [
        "Unique cultural digital experience",
        "Innovative web-based OS concept",
        "Positive reception for creativity",
        "Showcase of cultural tech integration",
      ],
    },
    metrics: [
      { label: "Apps", value: "8+" },
      { label: "Themes", value: "Cultural" },
      { label: "Experience", value: "Immersive" },
    ],
  },

  existio: {
    problem: {
      title: "The Challenge",
      content:
        "People struggle to understand their daily habits and how they impact productivity and well-being. Existing tracking apps are either too complex, require manual data entry, or fail to provide actionable insights from the collected data.",
      highlights: [
        "Complex tracking interfaces",
        "Manual data entry fatigue",
        "Lack of actionable insights",
        "Disconnected tracking systems",
      ],
    },
    process: {
      title: "The Approach",
      content:
        "Designed with simplicity at the core, focusing on automatic tracking where possible and minimal friction for manual inputs. Created beautiful visualizations that make data exploration enjoyable and insights immediately apparent.",
      highlights: [
        "Simplicity-first design philosophy",
        "Visual-first data presentation",
        "Insight-driven feature development",
        "Iterative UX refinement",
      ],
    },
    solution: {
      title: "The Implementation",
      content:
        "Built a personal analytics platform with beautiful dashboards, habit tracking, productivity metrics, and trend analysis. The platform visualizes patterns in daily life and provides personalized insights to help users optimize their routines.",
      highlights: [
        "Beautiful data visualizations",
        "Habit tracking with streaks",
        "Productivity pattern analysis",
        "Personalized insights and trends",
        "Goal setting and progress tracking",
      ],
    },
    results: {
      title: "The Outcome",
      content:
        "Exist.io transforms personal data into meaningful insights, helping users understand their habits and make informed decisions about their daily routines and long-term goals.",
      highlights: [
        "Clear habit visualization",
        "Actionable daily insights",
        "Intuitive dashboard experience",
        "Motivating progress tracking",
      ],
    },
    metrics: [
      { label: "Metrics", value: "15+" },
      { label: "Insights", value: "Daily" },
      { label: "Charts", value: "Interactive" },
    ],
  },
};

export function getCaseStudy(projectId: string): CaseStudy | undefined {
  return CASE_STUDIES[projectId];
}

export function hasCaseStudy(projectId: string): boolean {
  return projectId in CASE_STUDIES;
}
