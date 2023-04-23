import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: true,
			strict: true,
			prerender: {
				enabled: false
			}
		})

		// Ajoutez vos options de configuration ici
	},
	compilerOptions: {
		// Options de compilation pour Svelte
		customElement: false
	},

	// Désactiver la protection CSRF
	csrf: false,

	// Configurer la politique de sécurité du contenu
	csp: {
		directives: {
			// Autoriser uniquement les scripts provenant du domaine en cours
			'script-src': ["'self'"],
			// Autoriser les styles en ligne et les fichiers provenant du domaine en cours
			'style-src': ["'self'", "'unsafe-inline'"],
			// Autoriser les images provenant du domaine en cours et d'autres domaines spécifiés
			'img-src': ["'self'", 'example.com', 'cdn.example.com']
		},
		// Activer le mode rapport uniquement pour la politique de sécurité du contenu
		reportOnly: {
			'script-src': ["'self'"]
		}
	}
};

export default config;
