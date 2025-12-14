import dayjs from "dayjs";
import type { MetadataRoute } from "next";

import { SITE_INFO } from "@/config/site";
import { getAllPosts, getPostsByCategory } from "@/features/blog/data/posts";
import { PROJECTS } from "@/features/profile/data/projects";
import { getCaseStudy } from "@/features/projects/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_INFO.url}/blog/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const components = getPostsByCategory("components").map((post) => ({
    url: `${SITE_INFO.url}/components/${post.slug}`,
    lastModified: dayjs(post.metadata.updatedAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Projects with case studies
  const projectCaseStudies = PROJECTS.filter((p) => getCaseStudy(p.id)).map(
    (project) => ({
      url: `${SITE_INFO.url}/projects/${project.id}`,
      lastModified: dayjs().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_INFO.url,
      lastModified: dayjs().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_INFO.url}/blog`,
      lastModified: dayjs().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_INFO.url}/projects`,
      lastModified: dayjs().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_INFO.url}/components`,
      lastModified: dayjs().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [...routes, ...posts, ...components, ...projectCaseStudies];
}

