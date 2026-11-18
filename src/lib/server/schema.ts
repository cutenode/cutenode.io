import { z } from 'zod';
import { STATUSES } from '#lib/project.ts';

// YAML reads an unquoted 2026-11-17 as a Date, so both spellings are accepted and stored as the ISO day.
const day = z.preprocess((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value), z.iso.date());

const text = z.string().trim().min(1);

/**
 * A project file's frontmatter. Strict, so a misspelled field fails the build instead of vanishing. The markdown
 * body below it is the page's "about": what the project is and who it's for.
 */
export const frontmatterSchema = z
	.strictObject({
		name: text,
		/** The one-line tagline. */
		description: text,
		status: z.enum(STATUSES),
		forge: z.enum(['github', 'tangled']),
		repo: z.url(),
		/** The project's own website. A project with one sends people there; it isn't a homepage here. */
		site: z.url().optional(),
		package: z.url().optional(),
		/** cutenode.io/<slug>/ is this project's homepage: it has no site of its own. */
		homepage: z.boolean().optional(),
		docs: z.url().optional(),
		changelog: z.url().optional(),
		/** Ways to get it, each a real command for its registry or tool, first one first. */
		install: z
			.array(z.strictObject({ label: text, command: text }))
			.min(1)
			.optional(),
		/** One short example of using it. */
		usage: z.strictObject({ language: text, code: text }).optional(),
		/** What it does, each a short line taken from the README. */
		features: z.array(text).min(1).optional(),
		/** Homepage tier: its configuration or options. */
		options: z
			.array(z.strictObject({ name: text, description: text, default: text.optional() }))
			.min(1)
			.optional(),
		/** Homepage tier: questions the README answers. */
		faq: z
			.array(z.strictObject({ question: text, answer: text }))
			.min(1)
			.optional(),
		/** Homepage tier: where it runs. */
		compatibility: z
			.strictObject({ node: text.optional(), platforms: z.array(text).min(1).optional() })
			.refine((value) => value.node !== undefined || value.platforms !== undefined, 'name node, platforms or both')
			.optional(),
		// Fallbacks for the build-time GitHub lookup, and the only numbers a tangled project has.
		stars: z.number().int().nonnegative().optional(),
		pushed: day.optional(),
		created: day.optional()
	})
	.superRefine((project, context) => {
		if (project.homepage && project.site) {
			context.addIssue({
				code: 'custom',
				path: ['homepage'],
				message: 'a project with its own site sends people there'
			});
		}

		for (const field of ['options', 'faq', 'compatibility'] as const) {
			if (project[field] !== undefined && !project.homepage) {
				context.addIssue({
					code: 'custom',
					path: [field],
					message: `${field} is for homepage projects (homepage: true)`
				});
			}
		}
	});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
