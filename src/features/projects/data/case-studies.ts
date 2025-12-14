import type { CaseStudy } from "../types/case-study";

export const CASE_STUDIES: Record<string, CaseStudy> = {
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
