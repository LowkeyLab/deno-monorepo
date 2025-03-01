import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  // Update the path to point to content directory in project root
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

// Define the schema for the projects collection
export const collections = {
  projects,
};
