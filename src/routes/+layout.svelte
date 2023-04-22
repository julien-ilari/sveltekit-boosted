<script>
	// Import our custom CSS
	import '../scss/styles.scss';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	// Import all of Boosted's JS
	import * as boosted from 'boosted';

	import '../lib/elements/o-title-bar.js';
	import '../lib/elements/o-input.js';
	import '../lib/elements/ocean-logo.js';
	import '../lib/elements/o-navbar.js';
	import '../lib/elements/o-footer-legal-links.js';
	import '../lib/elements/o-header.js';

	import Footer from '../compoments/layout/Footer.svelte';
	import Header from '../compoments/layout/Header.svelte';
</script>

<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
	<symbol fill="currentColor" viewBox="0 0 1000 1000" id="user">
		<path
			fill-rule="evenodd"
			d="M656.7,422.409a229.959,229.959,0,0,1-315.39.008A224.95,224.95,0,0,0,224.064,615H224V825A100,100,0,0,0,324,925H774V620A224.944,224.944,0,0,0,656.7,422.409ZM679,255A180,180,0,1,1,499,75,180,180,0,0,1,679,255Z"
		/>
	</symbol>
</svg>


<Header />

<main class="bd-content order-1 mt-5">
	<slot />
</main>

<Footer />

<style>
</style>
