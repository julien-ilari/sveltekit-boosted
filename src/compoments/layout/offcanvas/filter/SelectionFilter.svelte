<script>
	import { onMount, onDestroy } from 'svelte';

	let isSelected = false;

	let wrapper;
	let label;
	let content;

	onMount(() => {
		wrapper.classList.toggle('move');
		content.classList.toggle('visible');
		label.classList.toggle('move');
	});

	onDestroy(() => {
		// alert("destroyed");
	});

	const toggleSelection = () => {
		wrapper.classList.toggle('move');

		if (!isSelected) {
			label.classList.add('text-bg-primary');
			label.classList.remove('text-bg-secondary');
		} else {
			label.classList.remove('text-bg-primary');
			label.classList.add('text-bg-secondary');
		}

		content.classList.toggle('visible');

		isSelected = !isSelected;
	};
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div bind:this={label} class="label text-bg-secondary" on:click={toggleSelection}>
		{isSelected ? 'Cacher sélection' : 'Voir sélection'}
	</div>

	<div bind:this={wrapper} class="wrapper move" style="width: 100%;">
		<header class="p-2 px-3">
			<o-title-bar>
				<h1>Récapitulatif de la sélection</h1>
			</o-title-bar>
		</header>

		<div bind:this={content} class="content px-3 pt-2 visible">
			<slot />
		</div>
	</div>
</div>

<style global>
	.content {
		visibility: hidden;
		display: none;
	}

	.content.visible {
		visibility: visible;
		display: block;
	}

	.wrapper {
		height: 100vh;
		max-height: 88.5vh;
		float: right;
		transition: all 0.3s ease-in-out;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		display: none;
		visibility: hidden;
		/* transform: translateX(100%); */
	}

	.label {
		position: absolute;
		display: inline-block;
		top: 5rem;
		visibility: visible;
		text-align: center;
		left: -10rem;
		height: 2rem;
		width: 10em;
		transform: translateY(-50%);
		background-color: #333;
		color: #fff;
		padding: 0.5rem;
		cursor: pointer;
		transform-origin: bottom right;
		transform: rotate(-90deg);
		transition: all 0.3s ease-in-out;
		display: none;
	}

	.offcanvas.show .label {
		display: block;
	}

	.wrapper.move {
		/* transform: translateX(0%); */
		background-color: rgb(255, 255, 255);
		z-index: 9999;
		display: block;
		visibility: visible;
	}
</style>
