import type { MetadataRoute } from "next";

import { programs } from "@/lib/programs";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const programRoutes = programs.map((program) => ({
    url: `${siteUrl}/programs/${program.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/programs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...programRoutes,
  ];
}
