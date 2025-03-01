import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().optional().default(false),
    links: z.object({
      github: z.string().optional(),
      demo: z.string().optional(),
      website: z.string().optional(),
    }),
  }),
});

export const collections = {
  projects,
};
