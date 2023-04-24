# SMUI SvelteKit Exemple

Un exemple de projet implémentant [Svelte Material UI](https://github.com/hperrin/svelte-material-ui) avec [SvelteKit](https://kit.svelte.dev/).
[Svelte Documentation](https://kit.svelte.dev/docs)

# Installation et lancement

1. Cloner le repo git.
2. `npm install`
3. `npm run dev -- --open`

# Un projet SvelteKit typique ressemble à ceci :

```
my-project/
├ src/
│ ├ lib/
│ │ ├ server/
│ │ │ └ [your server-only lib files]
│ │ └ [your lib files]
│ ├ params/
│ │ └ [your param matchers]
│ ├ routes/
│ │ └ [your routes]
│ ├ app.html
│ ├ error.html
│ ├ hooks.client.js
│ └ hooks.server.js
├ static/
│ └ [your static assets]
├ tests/
│ └ [your tests]
├ package.json
├ svelte.config.js
├ tsconfig.json
└ vite.config.js
```

<code>
Fichiers de projetlien permanent
srclien permanent
Le srcrépertoire contient la viande de votre projet. Tout sauf src/routeset src/app.htmlest facultatif.

lib contient votre code de bibliothèque (utilitaires et composants), qui peut être importé via l' $libalias, ou conditionné pour être distribué à l'aide desvelte-package

server contient votre code de bibliothèque serveur uniquement. Il peut être importé en utilisant l' $lib/serveralias. 

SvelteKit vous empêchera de les importer dans le code client.

params contient tous les param matchers dont votre application a besoin

routes contient les routes de votre application. Vous pouvez également colocaliser d'autres composants qui ne sont utilisés que dans un seul itinéraire ici

app.html est votre modèle de page — un document HTML contenant les espaces réservés suivants :
%sveltekit.head%- link et script

les éléments nécessaires à l'application, ainsi que tout <svelte:head>contenu
%sveltekit.body%— le balisage d'une page rendue. Cela devrait vivre à l'intérieur d'un <div>élément ou d'un autre, plutôt que directement à l'intérieur de <body>, pour éviter les bogues causés par les extensions de navigateur injectant des éléments qui sont ensuite détruits par le processus d'hydratation. SvelteKit vous préviendra en développement si ce n'est pas le cas
%sveltekit.assets%— soit paths.assets, si spécifié, soit un chemin relatif verspaths.base
%sveltekit.nonce%— un nonce CSP pour les liens et les scripts inclus manuellement, s'il est utilisé
%sveltekit.env.[NAME]%- ceci sera remplacé au moment du rendu par la [NAME]variable d'environnement, qui doit commencer par publicPrefix(généralement PUBLIC_). Il reviendra à ''s'il n'y a pas de correspondance.
error.htmlest la page qui est rendue quand tout le reste échoue. Il peut contenir les espaces réservés suivants :
%sveltekit.status%— le statut HTTP
%sveltekit.error.message%— le message d'erreur
hooks.client.jscontient vos hooks client
hooks.server.jscontient vos hooks de serveur
service-worker.jscontient votre agent de service
</code>

# boosted orange

# Mode mobile

à venir ...

Test Lighthouse
![image](https://user-images.githubusercontent.com/55719162/231885629-1e3dc41a-1f17-4988-b871-279e8addb048.png)

