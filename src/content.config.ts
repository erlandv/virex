import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string().optional(),
    publishedDate: z.coerce.date(),
    author: z.union([
      z.string(),
      z.object({
        name: z.string(),
        role: z.string().optional(),
        avatar: z.string().optional(),
      }),
    ]),
    image: z.string().optional(),
    coverImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    section: z.string().optional(),
    icon: z.string().default('lucide:book-open'),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    lastUpdated: z.string().optional(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    company: z.string(),
    avatar: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, docs, testimonials };
