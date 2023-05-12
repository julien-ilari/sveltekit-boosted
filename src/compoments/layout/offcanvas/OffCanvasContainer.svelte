<script>
	export let id = '';
</script>

<div class:container-offcanvas={id}>
	<slot />
</div>

<style lang="scss">
	.container-offcanvas {
		max-width: 100%;
	}
</style>
