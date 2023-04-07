<script>
	// Import our custom CSS
	import '../scss/styles.scss';

	// Import all of Boosted's JS
	// @ts-ignore
	import * as boosted from 'boosted';

	import '../lib/elements/o-title-bar.js';
	import '../lib/elements/o-input.js';
	import '../lib/elements/ocean-logo.js';
	import '../lib/elements/o-navbar.js';
	import '../lib/elements/o-footer-legal-links.js';
	import '../lib/elements/o-header.js';
</script>

<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
	<symbol fill="currentColor" viewBox="0 0 1000 1000" id="user">
		<path
			fill-rule="evenodd"
			d="M656.7,422.409a229.959,229.959,0,0,1-315.39.008A224.95,224.95,0,0,0,224.064,615H224V825A100,100,0,0,0,324,925H774V620A224.944,224.944,0,0,0,656.7,422.409ZM679,255A180,180,0,1,1,499,75,180,180,0,0,1,679,255Z"
		/>
	</symbol>
</svg>

<header class="sticky-top">
	<nav class="navbar navbar-dark navbar-expand-lg bg-dark supra" aria-label="Supra navigation">
		<div class="container-fluid">
			<ul class="navbar-nav ms-auto">
				<li class="nav-item">
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a class="nav-link active" href="#" aria-label="EN English version" aria-current="true"
						>EN</a
					>
				</li>
				<li class="nav-item">
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a class="nav-link" href="#" aria-label="FR Version française" lang="fr" hreflang="fr"
						>FR</a
					>
				</li>
			</ul>
		</div>
	</nav>
	<nav class="navbar navbar-dark bg-dark navbar-expand-lg" aria-label="Global navigation">
		<div class="container-fluid" style="align-items: center;">
			
			<o-header class="me-auto me-lg-4">
				
			</o-header>
		
			<button
				class="navbar-toggler collapsed"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target=".global-header-1"
				aria-controls="global-header-1.1 global-header-1.2"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div id="global-header-1.1" class="navbar-collapse collapse me-lg-auto global-header-1">
				<o-navbar
					index={0}
					items={[
						{ to: '/', value: 'Dashboard' },
						{ to: '/params', value: 'Paramètres' }
					]}
				/>

				<ul class="navbar-nav border-top border-1 border-dark d-flex flex-row d-lg-none">
					<li class="nav-item">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a class="nav-link active" href="#" aria-label="EN English version" aria-current="true"
							>EN</a
						>
					</li>
					<li class="nav-item">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a class="nav-link" href="#" aria-label="FR Version française" lang="fr" hreflang="fr"
							>FR</a
						>
					</li>
				</ul>
			</div>
			<div id="global-header-1.2" class="navbar-collapse collapse d-sm-flex global-header-1">
				<ul class="navbar-nav flex-row">
					<li class="nav-item">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="#" class="nav-link nav-icon" style="margin:0;padding:0;">
							<svg
								width="1rem"
								height="1rem"
								fill="currentColor"
								aria-hidden="true"
								focusable="false"
								class="overflow-visible"
							>
								<use xlink:href="../assets/img/boosted-sprite.svg#buy" />
							</svg>
							<span class="visually-hidden">Basket</span>
						</a>
					</li>
					<li class="nav-item">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="#" class="nav-link nav-icon" style="margin:0;padding:0;">
							<svg
								width="1rem"
								height="1rem"
								fill="currentColor"
								aria-hidden="true"
								focusable="false"
								class="overflow-visible"
							>
								<use xlink:href="#user" />
							</svg>
							<span class="visually-hidden">My account</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>
<main class="bd-content order-1">
	<slot />
</main>

<o-footer-legal-links copyright="Orange Business Services 2023"
	items={[
		{ to: '/', value: 'Terms and conditions' },
		{ to: '/', value: 'Privacy' },
		{ to: '/', value: 'Cookie policy' },
		{ to: '/', value: 'Accessibility statement' },
		{ to: '/', value: 'Become a reseller' }
	]}
/>


<style>
	
</style>
