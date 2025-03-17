import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [sveltePreprocess({ preprocess: false }), vitePreprocess()],

	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: false
		},
		alias: {
			$core: 'src/core',
			$service: 'src/service'
		}
	}
};

export default config;
