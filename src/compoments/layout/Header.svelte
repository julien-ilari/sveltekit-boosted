<script lang="ts">
	export let items = [
		{ to: '/', value: 'Portofolio' },
		{ to: '/', value: 'About' },
		{ to: '/', value: 'Contact' }
	];
</script>

<header class="bg-dark fixed-top" style="z-index:9999">
	<nav aria-label="Global navigation" class=" bg-dark" style="z-index:9999">
		<div class="  navbar navbar-dark navbar-expand-xl">
			<div class="me-xl-auto">
				<div class="navbar-collapse collapse">
					<o-navbar {items} />

					<div class="navbar-expand-lg">
						<nav id="navbar" class="navbar-nav" style="flex-direction: row;">
							<a href="/products" title="Products" class="nav-link active">Produits</a>
						</nav>
					</div>
				</div>
			</div>

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
		</div>

		<div
			id="global-header-1.2"
			class="full-screen navbar-collapse me-lg-auto bd-navbar mb-0 border-0 collapse global-header-1"
		/>
	</nav>
</header>

<style global>
	.full-screen {
		width: 100vw;
		height: 100vh;
		border-top-width: 25px;
		border-style: none;
	}

	[class^='of-'] {
		font-size: 2.8rem;
	}
</style>
