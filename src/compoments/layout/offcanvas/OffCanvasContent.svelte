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

		const dispatchOptions = {
			id,
			hide: false,
			show: true
		};

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

<div
	bind:this={offcanvas}
	{id}
	class="mt-5 offcanvas offcanvas-{position}"
	data-bs-scroll="false"
	tabindex="-1"
>
	<div class="offcanvas-header">
		<header class="w-100">
			<o-title-bar>
				<h1>{title}</h1>
			</o-title-bar>
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas" style="position: absolute;top: 0;right:0px">
				<span class="visually-hidden">Close</span>
			</button>
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

<style>
	.offcanvas {
		border-top-width: 12px;
		border-style: solid;
		border-color: var(--bs-primary);
		width: 50%;
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

	@media screen and (max-width: 1024px) {
		[id*='offcanvas'] {
			/* width: 100vw !important; */

			/* height: 85vh !important; */
			max-height: 90vh;
			min-width: 90vh;
		}
	}
	@media screen and (min-width: 1025px) {
		[id*='offcanvas'] {
			/* width: 100vw !important; */
			/* height: 90vh !important; */
			max-height: 90vh;
			min-width: 90vh;
		}
	}
</style>
