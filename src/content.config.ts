import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every user-facing text field is { en, zh }. `en` is required; `zh` falls back to `en` when missing.
const localized = z.object({
  en: z.string().min(1),
  zh: z.string().min(1).optional(),
});

const themes = defineCollection({
  loader: file('src/content/themes.yaml'),
  schema: z.object({
    code: z.string(),
    name: localized,
    description: localized,
    order: z.number().int(),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/people' }),
  schema: ({ image }) =>
    z.object({
      name: localized,
      role: z.enum(['pi', 'postdoc', 'phd', 'master', 'undergrad', 'alumni']),
      since: z.number().int().min(2000).max(2100).optional(),
      until: z.number().int().min(2000).max(2100).optional(),
      title: localized.optional(),
      interests: localized,
      bio: localized.optional(),
      // For alumni: where they are now.
      now: localized.optional(),
      avatar: image().optional(),
      email: z.string().optional(),
      links: z
        .object({
          homepage: z.url(),
          github: z.url(),
          huggingface: z.url(),
          scholar: z.url(),
          orcid: z.url(),
        })
        .partial()
        .default({}),
      order: z.number().int().default(100),
    }),
});

const projects = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: localized,
      // Short name for member-card chips, e.g. the method name "GeoPix". Falls back to the title.
      short: z.string().max(24).optional(),
      theme: reference('themes'),
      type: z.enum(['paper', 'dataset', 'code', 'demo']),
      year: z.number().int().min(2000).max(2100),
      // Publication date, used for sorting. YYYY-MM or YYYY-MM-DD.
      date: z.coerce.date(),
      venue: z.string().optional(),
      // Full author list exactly as published, including people outside the lab.
      authors: z.string(),
      // Lab members who worked on it; ids must match files in src/content/people.
      members: z.array(reference('people')).min(1),
      summary: localized,
      cover: image(),
      coverAlt: localized.optional(),
      links: z
        .object({
          paper: z.url(),
          arxiv: z.url(),
          code: z.url(),
          dataset: z.url(),
          demo: z.url(),
          project: z.url(),
          video: z.url(),
        })
        .partial()
        .default({}),
      featured: z.boolean().default(false),
    }),
});

const news = defineCollection({
  loader: file('src/content/news.yaml'),
  schema: z.object({
    date: z.coerce.date(),
    text: localized,
    link: z.string().optional(),
  }),
});

export const collections = { themes, people, projects, news };
