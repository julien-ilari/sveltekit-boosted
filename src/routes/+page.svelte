<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';

	let clicked = 0;

	function handleClick(event: CustomEvent | MouseEvent) {
		event = event as MouseEvent;
		if (event.button === 0) {
			clicked++;
		}
	}

	function reset() {
		clicked = 0;
	}
</script>

<Button on:mousedown={handleClick}>
	<Icon class="material-icons">thumb_up</Icon>
	<Label>Cliquez moi !</Label>
</Button>
<p class="mdc-typography--body1">
	{#if clicked}
		Vous avez cliqué sur le bouton {clicked} fois{clicked === 1 ? '' : 's'}. Vous pouvez
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a on:click={reset} href="javascript:void(0);">le réinitialiser</a>.
	{:else}
		<span class="grayed">Vous n'avez pas cliqué sur le bouton.</span>
	{/if}
</p>

<style>
	.grayed {
		opacity: 0.6;
	}
</style>
