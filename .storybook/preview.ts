import type { Preview } from '@storybook/sveltekit';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/mona-sans/300.css';
import '@fontsource/mona-sans/400.css';
import '../src/app.css';

const preview: Preview = {
	globalTypes: {
		scheme: {
			description: 'Color scheme',
			toolbar: { icon: 'mirror', items: ['dark', 'light'], dynamicTitle: true }
		}
	},
	initialGlobals: { scheme: 'light' },
	// The site's colors come from light-dark(), so pinning color-scheme (src/app.css, data-scheme) is all a theme needs.
	decorators: [
		(Story, { globals }) => {
			document.documentElement.dataset.scheme = globals.scheme;

			return Story();
		}
	],
	parameters: {
		layout: 'padded',
		// Accessibility is part of done: a violation fails the story's test. axe's default run leaves out WCAG 2.2's
		// rules, so this names every level it checks, best practices included.
		a11y: {
			test: 'error',
			options: {
				runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }
			}
		}
	}
};

export default preview;
