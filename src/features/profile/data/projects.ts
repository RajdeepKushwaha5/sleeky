import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "classroom-memory",
    title: "Classroom Memory – Graph-Native Learning System",
    period: {
      start: "2026-07-15",
    },
    link: "https://github.com/RajdeepKushwaha5/ClassroomMemory",
    githubUrl: "https://github.com/RajdeepKushwaha5/ClassroomMemory",
    award: "Hackathon Winner",
    skills: [
      "Python",
      "FastAPI",
      "Cognee Cloud",
      "Knowledge Graphs",
      "vis-network",
      "JavaScript",
    ],
    description: `Winning entry (Best Use of Cognee Cloud) at The Hangover Hackathon by WeMakeDevs × Cognee. A Cognee Cloud-powered learning system that builds isolated long-term memory for each student while giving teachers class-level insights via graph reasoning.
- Per-student concept graphs with mastery tracking and memory-based recall
- Class-wide heat maps and graph-reasoned, prerequisite-aware teaching plans
- Adaptive quizzes, learning timelines, and targeted review assignments
- JSON curriculum import with prerequisite mapping and validation
- Multi-tenant memory: isolated student datasets alongside a shared class graph`,
    logo: "/images/projects/classroommemory.png",
  },
  {
    id: "treebio",
    title: "TreeBio – Modern Bio-Link Platform",
    period: {
      start: "2025-09-03",
    },
    link: "https://treebio1.vercel.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/TreeBio",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Bio-Link",
      "Analytics",
    ],
    description: `Customizable bio-link platform with unlimited links, bulk import/export, link scheduling, and real-time analytics.
- Unlimited customizable links
- Bulk import/export functionality
- Link scheduling capabilities
- Real-time analytics dashboard
- Modern, clean user interface`,
    logo: "/images/projects/TreeBio.png",
  },
  {
    id: "metaflow",
    title: "MetaFlow – AI Control Plane for OpenMetadata",
    period: {
      start: "2025-12-05",
    },
    link: "https://meta-flow-ten.vercel.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/MetaFlow",
    award: "Hackathon Winner",
    skills: [
      "React",
      "TypeScript",
      "FastAPI",
      "LangGraph",
      "Google Gemini",
      "OpenMetadata",
    ],
    description: `Winning entry at the OpenMetadata Hackathon (MCP Ecosystem & AI Agents track). Turns OpenMetadata into an autonomous operations platform that detects issues, reasons about impact, and orchestrates resolution across tools without human intervention.
- Continuous data steward with autonomous health scoring
- Data contract copilot for quality tests
- Self-healing remediation with root-cause tracing and PR proposals
- Multi-specialist LangGraph orchestrator across 12 agents
- 15 pre-built one-click playbooks and webhook auto-triage`,
    logo: "/images/projects/metaflow.png",
  },
  {
    id: "dragonbrain",
    title: "DragonBrain – Neural Net Explorer",
    period: {
      start: "2026-02-10",
    },
    link: "https://dragonbrain.vercel.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/dragonbrain",
    award: "Hackathon Winner",
    skills: [
      "Svelte",
      "PyTorch",
      "ONNX Runtime Web",
      "D3.js",
      "WebAssembly",
      "AI/ML",
    ],
    description: `Interactive, browser-based explorer that compares the Baby Dragon Hatchling (BDH) post-transformer architecture against a GPT baseline in real time — all inference runs client-side via WebAssembly.
- Side-by-side sparse activation panels (BDH ~5-15% vs GPT ~97-100%)
- Force-directed D3.js graph of emergent internal wiring
- Hebbian memory co-activation heatmap
- Memory-scaling comparison and text generation panels
- Guided 12-step interactive tour`,
    logo: "/images/projects/dragonbrain.png",
  },
  {
    id: "redline",
    title: "Redline – AI Policy Governance",
    period: {
      start: "2026-01-15",
    },
    link: "https://github.com/RajdeepKushwaha5/redline",
    githubUrl: "https://github.com/RajdeepKushwaha5/redline",
    award: "Hackathon Winner",
    skills: [
      "JavaScript",
      "Node.js",
      "Google Gemini",
      "GitHub Actions",
      "Compliance",
      "AI Agents",
    ],
    description: `1st-place winner at the GitAgent Hackathon. Turns company policies into version-controlled, auditable documents in git, with AI agents that detect compliance gaps, draft fixes, and enforce strict segregation of duties.
- Gap analysis against GDPR and SOC2 regulatory checklists
- Compliance scorecards with regulatory citations
- Automated drafting with annotated, traceable changes
- Append-only immutable audit trail
- CI/CD validation via GitHub Actions`,
    logo: "/images/projects/redline.png",
  },
  {
    id: "stepwise",
    title: "StepWise – Wolfram-Verified Math Tutor",
    period: {
      start: "2025-11-20",
    },
    link: "https://step-wise-taupe.vercel.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/StepWise",
    award: "Hackathon Winner",
    skills: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Wolfram Language",
      "Google Gemini",
      "KaTeX",
    ],
    description: `An AI math tutor that verifies every computation with Wolfram Language instead of trusting the LLM — separating deterministic computation from explanation to eliminate confident, subtly-wrong answers.
- Wolfram-verified answers with side-by-side AI-alone comparison
- On-demand worked steps for derivatives and integrals
- Multilingual explanations (English, Hindi, Bengali, Tamil, and more)
- Practice mode with progressive hints and misconception tracking
- Photo input for handwritten or printed problems`,
    logo: "/images/projects/stepwise.png",
  },
  {
    id: "llms-from-scratch",
    title: "LLMs from Scratch – GPT Implementation",
    period: {
      start: "2025-11-01",
    },
    link: "https://github.com/RajdeepKushwaha5/LLMs-from-scratch",
    githubUrl: "https://github.com/RajdeepKushwaha5/LLMs-from-scratch",
    skills: [
      "Python",
      "PyTorch",
      "tiktoken",
      "JupyterLab",
      "Transformers",
      "AI/ML",
    ],
    description: `A step-by-step, from-scratch implementation of GPT-like language models in PyTorch — covering tokenization, attention, the transformer architecture, pretraining, and finetuning.
- Full transformer build: tokenization, attention, text generation
- Pretraining plus classification and instruction finetuning
- Modern architectures implemented from scratch (Llama 3.2, Qwen3, Gemma 3)
- Advanced techniques: LoRA, DPO, KV Cache, Grouped-Query Attention, MoE
- Interactive chat and classification UIs`,
    logo: "/images/projects/llms-from-scratch.png",
  },
  {
    id: "upcode",
    title: "UPCODE – Collaborative Coding Platform",
    period: {
      start: "2025-08-08",
    },
    link: "https://upcode-coding-and-interview-platfor.vercel.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/UPCODE",
    skills: [
      "Next.js",
      "Socket.io",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "Tailwind CSS",
      "Real-time",
      "Code Editor",
    ],
    description: `Full-stack collaborative code editor with real-time editing, syntax highlighting, multi-language support, and interview preparation features.
- Real-time collaborative coding environment
- Multi-language syntax highlighting support
- Interview preparation tools and features
- Modern, responsive UI with Tailwind CSS`,
    logo: "/images/projects/upcode.png",
    isExpanded: true,
  },
  {
    id: "bharatos",
    title: "BharatOS – Indian Desktop Experience",
    period: {
      start: "2025-10-15",
    },
    link: "https://bharat-os.vercel.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/BharatOS",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Desktop OS",
      "Cultural Theme",
    ],
    description: `Web-based desktop operating system inspired by Indian culture, featuring custom apps, file system, and interactive UI.
- Cultural Indian-themed desktop environment
- Custom built-in applications
- Interactive file system simulation
- Beautiful, culturally-inspired UI design`,
    logo: "/images/projects/Bharat-OS.png",
  },
  {
    id: "existio",
    title: "Exist.io – Life Tracking Dashboard",
    period: {
      start: "2025-10-09",
    },
    link: "https://exist-io.vercel.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/exist-io",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Analytics",
      "Dashboard",
    ],
    description: `Personal analytics platform that tracks your digital life, habits, and productivity with beautiful visualizations and insights.
- Comprehensive life tracking dashboard
- Habit and productivity analytics
- Beautiful data visualizations
- Personal insights and trends`,
    logo: "/images/projects/exist-io.png",
  },
  {
    id: "devfolio",
    title: "DevFolio – Developer Portfolio Showcase",
    period: {
      start: "2025-10-21",
    },
    link: "https://devfolio-showcase.vercel.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/DevFolio",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Portfolio",
      "Blog Integration",
    ],
    description: `Modern portfolio template for developers with project showcase, blog integration, and responsive design.
- Developer-focused portfolio template
- Project showcase functionality
- Blog integration capabilities
- Fully responsive design`,
    logo: "/images/projects/DevFolio.png",
  },
  {
    id: "strike",
    title: "Strike – Task Management",
    period: {
      start: "2025-10-07",
    },
    link: "https://rajdeepkushwaha5.github.io/strike/",
    githubUrl: "https://github.com/RajdeepKushwaha5/strike",
    award: "Hackathon Winner",
    skills: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Task Management",
      "Local Storage",
    ],
    description: `Minimalist task management app with drag-and-drop, categories, and local storage persistence.
- Drag-and-drop task organization
- Category-based task management
- Local storage persistence
- Clean, minimalist interface`,
    logo: "/images/projects/strike.png",
  },
  {
    id: "agentverse",
    title: "AgentVerse – Autonomous AI Agents",
    period: {
      start: "2025-07-18",
    },
    link: "https://agent-verse-mocha.vercel.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/AgentVerse",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "AI/ML",
      "LangChain",
      "Gemini API",
    ],
    description: `Modular framework for autonomous AI agents capable of task collaboration using LangChain and Gemini API.
- Autonomous AI agent framework
- Task collaboration capabilities
- LangChain integration
- Google Gemini AI powered`,
    logo: "/images/projects/AgentVerse.png",
  },
  {
    id: "gotiny",
    title: "GoTiny – URL Shortener",
    period: {
      start: "2025-08-17",
    },
    link: "https://go-tiny-liart.vercel.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/GoTiny",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "URL Shortener",
      "Analytics",
    ],
    description: `Fast and reliable URL shortening service with custom aliases, analytics, and QR code generation.
- Custom URL aliases
- Analytics and tracking
- QR code generation
- Fast and reliable service`,
    logo: "/images/projects/GoTiny.png",
  },
  {
    id: "todocli",
    title: "TodoCLI – Terminal Task Manager",
    period: {
      start: "2025-10-02",
    },
    link: "https://github.com/RajdeepKushwaha5/TodoCLI",
    skills: [
      "Go",
      "Cobra CLI",
      "Terminal UI",
      "Task Management",
      "Developer Tools",
    ],
    description: `Lightweight command-line task manager with categories, priorities, and persistent storage. Built with Go, featuring interactive terminal UI, color-coded output, statistics dashboard, and data export capabilities.
- Interactive terminal user interface
- Color-coded output and categories
- Statistics dashboard
- Data export capabilities
- Built with Go and Cobra CLI framework`,
    logo: "/images/projects/TodoCLI.png",
  },
  {
    id: "ev-adoption-forecasting",
    title: "EV Adoption Forecasting",
    period: {
      start: "2025-07-17",
    },
    link: "https://ev-adoption-forecasting-ouj8effthzovtxnlwvnase.streamlit.app/",
    githubUrl: "https://github.com/RajdeepKushwaha5/EV-Adoption-Forecasting",
    skills: ["Python", "Streamlit", "AI/ML", "Time Series", "Prophet", "ARIMA"],
    description: `Time-series forecasting models (Prophet, ARIMA, Random Forest) to predict EV adoption trends with interactive dashboards.
- Multiple forecasting models (Prophet, ARIMA, Random Forest)
- Interactive data visualization dashboards
- EV adoption trend analysis
- Machine learning predictions`,
    logo: "/images/projects/evforecasting.png",
  },
  {
    id: "gitsensei",
    title: "GitSensei – Git Workflow Assistant",
    period: {
      start: "2025-09-23",
    },
    link: "https://github.com/RajdeepKushwaha5/GitSensei",
    skills: [
      "Python",
      "AI/ML",
      "Pydantic AI",
      "Google Gemini",
      "Streamlit",
      "Developer Tools",
    ],
    description: `AI-powered assistant that helps developers understand and interact with GitHub repositories using advanced natural language processing and hybrid search. Features AI-powered Q&A, repository analysis, interactive chat, and comprehensive logging.
- AI-powered Q&A system
- Repository analysis capabilities
- Interactive chat interface
- Advanced natural language processing
- Hybrid search functionality`,
    logo: "/images/projects/GitSensei.png",
  },
  {
    id: "ai-agent",
    title: "AI Agent – Custom AI Assistant",
    period: {
      start: "2025-09-06",
    },
    link: "https://github.com/RajdeepKushwaha5/AI-Agent",
    skills: [
      "Python",
      "AI/ML",
      "Google Gemini AI",
      "Automation",
      "Developer Tools",
    ],
    description: `Custom AI coding assistant built with Google Gemini that can perform file operations, run Python scripts, and help with coding tasks within a controlled environment. Features automated bug fixing, code refactoring, multi-step reasoning, and secure file management.
- Automated bug fixing capabilities
- Code refactoring assistance
- Multi-step reasoning
- Secure file management
- Python script execution`,
    logo: "/images/projects/AI_Agent.png",
  },
  {
    id: "algorude",
    title: "AlgoRude – Snarky DSA Tutor",
    period: {
      start: "2025-07-15",
    },
    link: "https://coruscating-baklava-240419.netlify.app/",
    githubUrl:
      "https://github.com/RajdeepKushwaha5/AlgoRude---The-Snarky-DSA-Tutor",
    skills: [
      "Python",
      "AI/ML",
      "Data Structures",
      "Algorithms",
      "Educational Tools",
    ],
    description: `AI-powered DSA tutor with a snarky personality that helps developers learn data structures and algorithms through interactive challenges and witty feedback.
- Interactive DSA learning platform
- AI-powered code analysis and feedback
- Snarky personality-driven tutoring
- Comprehensive algorithm explanations
- Practice problems with instant validation`,
    logo: "/images/projects/AlgoRude.png",
  },
];
