import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	// https://kit.svelte.dev/docs/configuration
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: true,
			strict: true,
			prerender: {
				enabled: false
			},
			
		  }),

	},
	// https://kit.svelte.dev/docs/configuration#csrf
	csrf: false,
	// Configuration de la politique de sécurité du contenu . 
	// CSP aide à protéger vos utilisateurs contre les attaques de script intersite (XSS), 
	// en limitant les endroits à partir desquels les ressources peuvent être chargées.
	csp: {
		directives: {
			'script-src': ['self']
		},
		reportOnly: {
			'script-src': ['self']
		}
	}

};

export default config;
