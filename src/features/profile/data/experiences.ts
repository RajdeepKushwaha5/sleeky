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
        description: `Working independently as a freelance developer, building custom web applications and solutions for clients globally.
Specializing in full-stack development with modern technologies including React, Next.js, TypeScript, and blockchain.
Delivering end-to-end solutions from design and development to deployment and maintenance.
Managing multiple client projects simultaneously while maintaining high code quality and meeting deadlines.
Available for freelance projects, consulting, and contract work in web development, AI/ML, and blockchain domains.`,
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
        description: `Worked on real-world projects in a professional development environment.
Collaborated with team members on building impactful solutions.
Strengthened problem-solving skills through hands-on coding and project work.
Gained experience in teamwork, agile methodologies, and professional communication.
Contributed to the development of educational technology platforms.`,
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