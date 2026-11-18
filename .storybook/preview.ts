import type { Preview } from '@storybook/sveltekit';
import '@fontsource-variable/anybody/wdth.css';
import '@fontsource-variable/atkinson-hyperlegible-next';
import '../src/app.css';

const preview: Preview = {
	globalTypes: {
		scheme: {
			description: 'Color scheme',
			toolbar: { icon: 'mirror', items: ['light', 'dark'], dynamicTitle: true }
		}
	},
	initialGlobals: { scheme: 'light' },
	// The site's colors come from light-dark(), so switching color-scheme is all a theme needs.
	decorators: [
		(Story, { globals }) => {
			document.documentElement.style.colorScheme = globals.scheme;

			return Story();
		}
	],
	parameters: {
		layout: 'padded',
		a11y: { test: 'error' }
	}
};

export default preview;
