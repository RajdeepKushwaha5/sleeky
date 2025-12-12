export interface Project {
  title: string;
  description: string;
  image: string;
  repoUrl: string;
  liveUrl?: string;
  techStack: string[];
  featured?: boolean;
}
