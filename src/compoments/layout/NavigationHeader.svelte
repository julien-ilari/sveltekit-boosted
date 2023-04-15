<script lang="ts">
	import GlobalFilterButton from '../utilities/GlobalFilterButton.svelte';

	export let items: [];
</script>

<header class="fixed-top">
	<nav aria-label="Global navigation" class="bg-dark">
		<div class=" p-0 px-2 navbar navbar-dark navbar-expand-xl">
			<o-header class="me-auto me-lg-4" />

			<div class="me-xl-auto">
				<div class="navbar-collapse collapse">
					<o-navbar {items} />
				</div>
			</div>

			<div class="navbar-nav d-flex flex-row">
				<div class="vr bg-primary" />
				<div class="d-flex flex-row align-items-center">
					<GlobalFilterButton
						title="transverse-filter-selected-entities"
						iconmoon="HEADER_FILTER"
						selectedSize={0}
						totalSize={0}
						sublabel="non-actif"
					/>
					<div class="vr" />
					<GlobalFilterButton
						title="transverse-filter-motorized-equipments"
						iconmoon="clusters_vhc"
						selectedSize={0}
						totalSize={0}
						sublabel="non-actif"
					/>
					<div class="vr" />
					<GlobalFilterButton
						title="transverse-filter-selected-personnes"
						iconmoon="Auditorium_19371"
						selectedSize={0}
						totalSize={0}
						sublabel="non-actif"
					/>
				</div>

				<div class="vr bg-primary" />

				<button type="button" class="btn btn-dark" style="text-align:start;display: block;">
					<i class="of-Adult_19371" style="float: left;" />
					<span>Julien ILARI (ENEDIS)</span> <br />
					<span style="font-weight: 100;font-size: small;">Super Utilisateur</span>
					<span class="visually-hidden">My account</span>
				</button>
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
		>
			test sfjdksfkdsjfkj
		</div>
	</nav>
</header>
<div id="transfersal-filter-offcanvas">
	<div
		style="width: 100%; height:100%;position: relative;"
		class="offcanvas offcanvas-end"
		data-bs-scroll="true"
		tabindex="-1"
		id="offcanvasWithBothOptions"
		aria-labelledby="offcanvasWithBothOptionsLabel"
	>
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>

			<button type="button" class="btn-close" data-bs-dismiss="offcanvas">
				<span class="visually-hidden">Close</span>
			</button>
		</div>
		<div class="offcanvas-body">
			<div class="charging" />
		</div>
	</div>
</div>

<style global>
	.full-screen {
		width: 100vh;
		height: 100vh;
		border-top-width: 25px;
		border-style: none;
	}

	div#transfersal-filter-offcanvas {
		display: none;
		z-index: -1;
	}
	#offcanvasWithBothOptions {
		border-top-width: 25px;
		border-style: solid;
	}

	.charging {
		width: 40px;
		height: 40px;
		border: 10px solid rgb(206, 34, 34);
		border-top-color: rgb(235, 226, 226);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	div#transfersal-filter-offcanvas:has(.show) {
		position: fixed;
		height: 100vh;
		display: block;
		z-index: 999;
		right: 0;
	}

	@media screen and (max-width: 1024px) {
		div#transfersal-filter-offcanvas {
			width: 100vw;
			height: 85vh;
			max-height: 85vh;
		}
	}

	@media screen and (min-width: 1025px) {
		div#transfersal-filter-offcanvas {
			width: 60vw;
			max-height: 87vh;
		}
	}

	[class^='of-'] {
		font-size: 2.8rem;
	}
</style>
