import { z } from 'zod';
import { STATUSES } from '#lib/project.ts';

// YAML reads an unquoted 2026-11-17 as a Date, so both spellings are accepted and stored as the ISO day.
const day = z.preprocess((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value), z.iso.date());

/** A project file's frontmatter. Strict, so a misspelled field fails the build instead of vanishing. */
export const frontmatterSchema = z.strictObject({
	name: z.string().min(1),
	description: z.string().min(1),
	status: z.enum(STATUSES),
	forge: z.enum(['github', 'tangled']),
	repo: z.url(),
	site: z.url().optional(),
	package: z.url().optional(),
	// Fallbacks for the build-time GitHub lookup, and the only numbers a tangled project has.
	stars: z.number().int().nonnegative().optional(),
	pushed: day.optional(),
	created: day.optional()
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
