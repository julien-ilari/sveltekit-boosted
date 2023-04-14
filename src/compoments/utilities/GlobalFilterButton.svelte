<script lang="ts">
	export let controls = 'offcanvasWithBothOptions';
	export let totalSize = 0;
	export let selectedSize = 0;

	export let iconmoon: string;
	export let title: string;
	export let sublabel = '';
</script>

<!-- <span class="visually-hidden">Transverse filter, selected entities</span> -->
<!-- "transverse-filter-selected-entities" -->

<button
	style="position: relative;width: 64px;height: 64px;"
	type="button"
	data-bs-toggle="offcanvas"
	data-bs-target="#{controls}"
	aria-controls={controls}
	{title}
	class="btn btn-dark"
>
	<div class="d-flex flex-row">
		<i class="of-{iconmoon}" />

		<span style="position: absolute;bottom:0;right:0.2rem;" class="badge rounded-pill p-1"
			>{selectedSize}/{totalSize}</span
		>

		<span style="position: absolute;top:0;right:0.2rem;">{sublabel}</span>

		<slot />
	</div>
</button>

<style>
	* {
		font-size: x-small;
	}
	i {
		font-size: 2rem;
		position: relative;
		top: 0;
		left: 0;
	}

	button::after {
		content: '';
		position: absolute;
		top: 62px;
		border-left: 30px solid transparent;
		border-right: 30px solid transparent;
		border-top: 20px solid #000;
	}
</style>
