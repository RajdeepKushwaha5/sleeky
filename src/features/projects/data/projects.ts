import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    title: "Project 1",
    description:
      "A placeholder description for project 1. This shows the layout.",
    image: "/images/projects/project-1.jpg", // Placeholder
    repoUrl: "https://github.com/RajdeepKushwaha5",
    liveUrl: "https://rajdeepsingh.dev",
    techStack: ["Next.js", "TypeScript", "Tailwind"],
    featured: true,
  },
  {
    title: "Project 2",
    description: "Another cool project description here.",
    image: "/images/projects/project-2.jpg",
    repoUrl: "https://github.com/RajdeepKushwaha5",
    techStack: ["React", "Node.js"],
  },
  // Add more as needed
];

export function getAllProjects() {
  return projects;
}
