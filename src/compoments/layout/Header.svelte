<script lang="ts">
	import { onMount } from 'svelte';
	import OffCanvasFilterButton from './offcanvas/filter/OffCanvasFilterButton.svelte';
	import { fade } from 'svelte/transition';
	import OffCanvasGlobalFilter from './offcanvas/filter/OffCanvasGlobalFilter.svelte';
	import OffCanvasAuthentification from './offcanvas/login/OffCanvasAuthentification.svelte';
	import OffCanvasLoginButton from './offcanvas/login/OffCanvasLoginButton.svelte';

	$: activeFiltreEntities = false;
	$: activeFiltreVehicles = false;
	$: activeFiltreDrivers = false;
	function callbackFunction(event: any) {
		const show = event.detail.show;
		switch (event.detail.id) {
			case 'offcanvasEntities':
				activeFiltreEntities = show;
				break;
			case 'offcanvasVehicles':
				activeFiltreVehicles = show;
				break;
			case 'offcanvasDrivers':
				activeFiltreDrivers = show;
				break;
		}
		event.detail.setLoadingComplete(true);
	}

	onMount(() => {});

	export let items = [
		{ to: '/', value: 'Dashboard' },
		{ to: '/products', value: 'Catalogue' },
		{ to: '/api', value: 'API' },
		{ to: '/parameters/filters', value: 'Paramètres' }
	];
</script>

<header class="fixed-top" style="z-index:9999">
	<nav aria-label="Global navigation" class="bg-dark" style="z-index:9999">
		<div class=" p-0 px-2 navbar navbar-dark navbar-expand-xl">
			<o-header class="me-auto me-lg-4" />

			<div class="me-xl-auto">
				<div class="navbar-collapse collapse">
					<o-navbar {items} />
				</div>
			</div>

			<div class="navbar-nav d-flex flex-row gap-1">
				<button
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasGlobalFilter"
					aria-controls="offcanvasGlobalFilter"
					class="btn bg-primary m-1"
				>
					<div class="d-flex flex-row align-items-center gap-1 fa-beat-fade">
						<i class="fa fa-xl fa-filter" />
						<span class="">Filtre 232</span>
					</div>
				</button>

				<div transition:fade class="d-flex flex-row align-items-center">
					<div class="vr bg-primary" />
					<OffCanvasFilterButton
						controls="offcanvasEntities, offcanvasGlobalFilterSelected"
						title="transverse-filter-selected-entities"
						active={activeFiltreEntities}
						iconmoon="HEADER_FILTER"
						selectedSize={12}
						totalSize={21}
						sublabel="non-actif"
					/>
					<div class="vr" />
					<OffCanvasFilterButton
						controls="offcanvasVehicles"
						active={activeFiltreVehicles}
						title="transverse-filter-motorized-equipments"
						iconmoon="clusters_vhc"
						selectedSize={34}
						totalSize={371}
						sublabel="non-actif"
					/>
					<div class="vr" />
					<OffCanvasFilterButton
						controls="offcanvasDrivers"
						active={activeFiltreDrivers}
						title="transverse-filter-selected-personnes"
						iconmoon="Auditorium_19371"
						selectedSize={6}
						totalSize={142}
						sublabel="non-actif"
					/>
					<div class="vr bg-primary" />
				</div>

				<OffCanvasLoginButton />
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
<div style="max-width: 100%;">
	<OffCanvasGlobalFilter {callbackFunction} />
	<OffCanvasAuthentification {callbackFunction} />
</div>

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
