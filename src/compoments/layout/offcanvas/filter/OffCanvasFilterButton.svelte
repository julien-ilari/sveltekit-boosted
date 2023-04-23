<script lang="ts">
	
	export let controls = 'offcanvasWithBothOptions';
	export let totalSize = 0;
	export let selectedSize = 0;

	export let active = false;
	export let iconmoon: string;
	export let title: string;
	export let sublabel = '';
</script>


<button
	style=""
	type="button"
	data-bs-toggle="offcanvas"
	data-bs-target="#{controls}"
	aria-controls={controls}
	{title}
	class="btn btn-dark {active ? 'active' : ''}"
>
	<div class="d-flex flex-row">
		<i class="of-{iconmoon}" />

		<span style="position: absolute;bottom:0;left:0;" class="ps-1">
			<span>{selectedSize}/{totalSize}</span>
		</span>

		<span style="position: absolute;top:0;left:0;" class="ps-1">
			<span>{sublabel}</span>
		</span>
	</div>
</button>

<style>
	i {
		font-size: 2.5rem;
		position: relative;
		top: 0;
		left: 0;
	}

	button {
		--bs-btn-font-size: x-small;
		--bs-btn-border-width: 0;
		position: relative;
		width: 90px;
		height: 100%;
	}
</style>
