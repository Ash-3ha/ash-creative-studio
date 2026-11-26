import { defineCollection, z } from 'astro:content';

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    projectType: z.enum(['Professional Work', 'Personal Project', 'Collaborative Project']).default('Personal Project'),
    organization: z.string().optional(),
    role: z.string().optional(),
    industry: z.string().optional(),
    category: z.enum([
      'Performance Marketing',
      'Social Media',
      'Graphic Design',
      'Video Editing',
      'Website Projects',
    ]),
    year: z.string(),
    overview: z.string(),
    objective: z.string().optional(),
    myContribution: z.string().optional(),
    execution: z.string().optional(),
    deliverables: z.array(z.string()).default([]),
    outcomes: z.array(z.string()).optional(),
    featuredImage: z.string().optional(),
    images: z.array(z.string()).default([]),
    gradientFrom: z.string().default('#2a1a10'),
    gradientTo: z.string().default('#0a0a0a'),
    draft: z.boolean().default(false),
    sortOrder: z.number().default(0),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    featuredImage: z.string().optional(),
    author: z.string().default('Akash Thirumal'),
    publishDate: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
    relatedSlugs: z.array(z.string()).default([]),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    quote: z.string(),
    avatar: z.string().optional(),
    sortOrder: z.number().default(0),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    sortOrder: z.number().default(0),
    tag: z.string().default('Skill Area'),
    shortDescription: z.string(),
    heroSubtitle: z.string().optional(),
    thesisHeading: z.string().optional(),
    thesisDescription: z.string().optional(),
    capabilities: z.array(z.object({
      title: z.string(),
      desc: z.string(),
    })).default([]),
    methodologyHeading: z.string().optional(),
    methodologySteps: z.array(z.object({
      num: z.string(),
      title: z.string(),
      desc: z.string(),
    })).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = { portfolio, blog, testimonials, services };
