import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    featuredImage: image().optional(),
    link: z.string().optional(),
    github: z.string().optional(),
    chrome: z.string().optional(),
    firefox: z.string().optional(),
    order: z.number().default(99),
    tech: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string(),
    updated_at: z.string().optional(),
    tag: z.string().optional(),
    featuredImage: image().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
