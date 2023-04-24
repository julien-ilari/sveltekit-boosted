import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import sveltePreprocess from 'svelte-preprocess';

export default {
	plugins: [
		sveltekit({
			preprocess: sveltePreprocess({
				scss: {
					prependData: `@import 'src/scss/styles.scss';`
				}
			})
		})
	],
	resolve: {
		alias: {
			'@': path.resolve('src'),
			'~boosted': path.resolve(__dirname, 'node_modules/boosted')
		}
	},
	// root: path.resolve(__dirname, 'src'),
	server: {
		port: 4000,
		hot: true
	}
};
