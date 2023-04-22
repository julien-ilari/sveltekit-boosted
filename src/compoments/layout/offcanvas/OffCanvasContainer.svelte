<script>
	export let id = '';
</script>

<div class:container-offcanvas={id}>
	<slot />
</div>

<style>
	.container-offcanvas
	{
		max-width: 100%;
	}
	
</style>
