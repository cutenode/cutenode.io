import matter from 'gray-matter';
import { marked } from 'marked';
import { z } from 'zod';
import type { Project } from '#lib/project.ts';
import { frontmatterSchema } from './schema.ts';

/** Every project file's raw text, keyed by its path. Adding a project is adding a file here. */
export const projectFiles = import.meta.glob<string>('/src/content/projects/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

const slugOf = (path: string) => path.slice(path.lastIndexOf('/') + 1, -'.md'.length);

/** Reads one project file. A file that doesn't match the schema fails the build with its path in the message. */
export const parseProject = (path: string, raw: string): Project => {
	const { data, content } = matter(raw);
	const result = frontmatterSchema.safeParse(data);

	if (!result.success) throw new Error(`${path}: ${z.prettifyError(result.error)}`);

	// Code blocks scroll sideways on phones, so they take focus to be scrollable by keyboard.
	const html = marked.parse(content.trim(), { async: false }).replaceAll('<pre>', '<pre tabindex="0">');

	return { ...result.data, slug: slugOf(path), html };
};

export const readProjects = (files: Record<string, string> = projectFiles) =>
	Object.entries(files).map(([path, raw]) => parseProject(path, raw));
