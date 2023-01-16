import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path'

export default {
	plugins: [sveltekit()],
	
	resolve: {
		alias: {
			'~boosted': path.resolve(__dirname, 'node_modules/boosted'),
		}
	},
	server: {
		port: 4000,
		hot: true
	}
};