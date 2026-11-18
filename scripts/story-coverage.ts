/**
 * Fails when a component in src/lib, or a route's page, layout or error page, has no story. `pnpm lint` runs this,
 * so a new component or page gets its story in the same change.
 */
import { join } from 'node:path';
import { storyCoverage } from './lib/story-coverage.ts';

const problems = storyCoverage(join(import.meta.dirname, '..'));

for (const problem of problems) console.error(problem);

process.exitCode = problems.length > 0 ? 1 : 0;
