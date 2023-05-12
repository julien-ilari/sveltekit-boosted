<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let id: string;
	export let title: string;
	export let loading = true;
	export let position = 'end';

	let offcanvas: any;

	onMount(() => {
		offcanvas.addEventListener('hidden.bs.offcanvas', () => {
			// Transmettre l'événement à un composant parent
			dispatch('notify', {
				id,
				hide: true,
				show: false,
				setLoadingComplete: (loadingComplete: boolean) => {
					loading = !loadingComplete;
				}
			});
		});

		offcanvas.addEventListener('shown.bs.offcanvas', () => {
			// Transmettre l'événement à un composant parent
			dispatch('notify', {
				id,
				hide: false,
				show: true,
				setLoadingComplete: (loadingComplete: boolean) => {
					loading = !loadingComplete;
				}
			});
		});
	});
</script>

<div bind:this={offcanvas} {id} class="mt-3 offcanvas offcanvas-{position}" data-bs-scroll="false" tabindex="-1">
	<slot name="offcanvas-header" />
	<div class="offcanvas-header">
		<header class="w-100">
			<o-title-bar>
				<h1>{title}</h1>
			</o-title-bar>
		</header>
	</div>
	<div class="offcanvas-body">
		{#if loading}
			<div class="charging" />
		{:else}
			<slot />
		{/if}
	</div>
</div>

<style lang="scss">
	@import 'src/scss/variables.scss';
	.offcanvas {
		position: fixed;
		top: $margin-top;
		border-top-width: 12px;
		border-style: solid;
		border-color: $primary;

		.offcanvas-body {
			.charging {
				width: 40px;
				height: 40px;
				border: 10px solid rgb(206, 34, 34);
				border-top-color: rgb(235, 226, 226);
				border-radius: 50%;
				animation: spin 0.8s linear infinite;
			}
		}
	}

	@media (max-width: 1200px) {
		.offcanvas {
			width: 100%;
		}
	}

	@media (min-width: 1200px) {
		.offcanvas {
			width: 50%;
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
