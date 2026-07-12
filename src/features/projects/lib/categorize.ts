import type { Project } from "@/features/profile/types/projects";

/** Discipline buckets used for filtering the projects grid. */
export const PROJECT_CATEGORIES = ["AI / ML", "Web", "Tools"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

// Skill tags that mark a project as AI/ML work. Checked first so an AI-powered
// developer tool (e.g. GitSensei) lands in "AI / ML" rather than "Tools".
const AI_SIGNALS = new Set([
  "AI/ML",
  "AI Agents",
  "LangChain",
  "LangGraph",
  "PyTorch",
  "Transformers",
  "Google Gemini",
  "Google Gemini AI",
  "Gemini API",
  "Pydantic AI",
  "Wolfram Language",
  "ONNX Runtime Web",
  "tiktoken",
  "Prophet",
  "ARIMA",
]);

// Skill tags that mark a project as CLI / developer tooling.
const TOOL_SIGNALS = new Set(["Go", "Cobra CLI", "Terminal UI"]);

/**
 * Classify a project into a single discipline based on its skill tags.
 * Falls back to "Web" for standard full-stack app projects.
 */
export function getProjectCategory(project: Project): ProjectCategory {
  if (project.skills.some((skill) => AI_SIGNALS.has(skill))) return "AI / ML";
  if (project.skills.some((skill) => TOOL_SIGNALS.has(skill))) return "Tools";
  return "Web";
}
