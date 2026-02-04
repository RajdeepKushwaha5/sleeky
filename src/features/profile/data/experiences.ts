import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "independent-freelancer",
    companyName: "Independent Freelancer",
    companyLogo: "/company/freelance.svg",
    isCurrentEmployer: true,
    positions: [
      {
        id: "freelance-fullstack-developer",
        title: "Full Stack Developer",
        employmentPeriod: {
          start: "08.2025",
        },
        employmentType: "Freelance",
        icon: "code",
        description: `Building custom web applications for global clients using React, Next.js, TypeScript, and blockchain technologies. Delivering end-to-end solutions from design to deployment. **Available for freelance projects and consulting.**`,
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "MongoDB",
          "PostgreSQL",
          "Solidity",
          "AWS",
        ],
        isExpanded: true,
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
  {
    id: "edunet-foundation",
    companyName: "Edunet Foundation",
    companyLogo: "/company/edunet.png",
    positions: [
      {
        id: "edunet-intern",
        title: "Intern",
        employmentPeriod: {
          start: "07.2025",
          end: "08.2025",
        },
        employmentType: "Internship",
        icon: "education",
        description: `Worked on real-world ML projects in a professional environment. Built impactful solutions using Python and TensorFlow while gaining experience in agile methodologies.`,
        skills: [
          "Python",
          "Machine Learning",
          "TensorFlow",
          "Data Analysis",
          "Pandas",
        ],
        isExpanded: false,
      },
    ],
  },
];
